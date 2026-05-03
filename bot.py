import discord
from discord.ext import commands
from discord import app_commands
import json
import os
import string
import random
import asyncio
from aiohttp import web
import aiohttp_cors

# Load config
with open("config.json", "r", encoding="utf-8") as f:
    config = json.load(f)

# Load Database
DB_FILE = "database.json"

def load_db():
    if not os.path.exists(DB_FILE):
        return {"resellers": [], "keys": {}}
    with open(DB_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_db(data):
    with open(DB_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

db = load_db()

class Bot(commands.Bot):
    def __init__(self):
        super().__init__(command_prefix="!", intents=discord.Intents.all())

    async def setup_hook(self):
        await self.tree.sync()
        print("Bot is ready and slash commands synced!")
        # Start Web Server
        self.loop.create_task(self.start_webserver())

    async def start_webserver(self):
        app = web.Application()
        cors = aiohttp_cors.setup(app, defaults={
            "*": aiohttp_cors.ResourceOptions(
                allow_credentials=True,
                expose_headers="*",
                allow_headers="*",
            )
        })
        
        # API Routes
        app.router.add_post("/api/redeem", self.handle_web_redeem)
        
        # Serve Frontend Static Files
        dist_path = os.path.join(os.getcwd(), "frontend", "dist")
        if os.path.exists(dist_path):
            app.router.add_static("/", dist_path, name='static', show_index=True)
            # Add a catch-all for SPA routing
            async def index_handler(request):
                return web.FileResponse(os.path.join(dist_path, "index.html"))
            app.router.add_get("/{tail:.*}", index_handler)
        else:
            app.router.add_get("/", self.handle_home)
        
        # Setup CORS for API
        for route in list(app.router.routes()):
            if route.resource.canonical.startswith("/api"):
                cors.add(route)
            
        runner = web.AppRunner(app)
        await runner.setup()
        port = int(os.environ.get("PORT", 8080))
        site = web.TCPSite(runner, '0.0.0.0', port)
        await site.start()
        print(f"Unified Server started on port {port}")

    async def handle_home(self, request):
        return web.Response(text="T3N Bot API is Online!", status=200)

    async def handle_web_redeem(self, request):
        try:
            data = await request.json()
            key = data.get("key")
            discord_id = int(data.get("discord_id"))
            
            if key not in db["keys"]:
                return web.json_response({"status": "error", "message": "Invalid key"}, status=400)
            
            key_data = db["keys"][key]
            if key_data["status"] != "valid":
                return web.json_response({"status": "error", "message": "Key already used"}, status=400)
            
            product_info = config["products"][key_data["product_key"]]
            
            # Find User & Assign Role
            guild = self.guilds[0] # Assumes bot is in one main guild
            member = guild.get_member(discord_id)
            if not member:
                return web.json_response({"status": "error", "message": "User not found in Discord server"}, status=404)
            
            role = guild.get_role(product_info["role_id"])
            if role:
                await member.add_roles(role)
            
            # Update DB
            db["keys"][key]["status"] = "redeemed"
            db["keys"][key]["redeemed_by"] = discord_id
            save_db(db)
            
            # Send files in DM
            dm_embed = discord.Embed(title="🎉 تم التفعيل عبر الموقع!", description=f"منتجك: **{product_info['name']}**\nرابط الشرح: {product_info['salla_url']}", color=discord.Color.gold())
            files = [discord.File(f) for f in product_info["files_to_send"] if os.path.exists(f)]
            try:
                await member.send(embed=dm_embed, files=files)
            except: pass
            
            return web.json_response({"status": "success", "product": product_info["name"]})
            
        except Exception as e:
            return web.json_response({"status": "error", "message": str(e)}, status=500)

bot = Bot()

def generate_key(prefix):
    random_str = ''.join(random.choices(string.ascii_uppercase + string.digits, k=16))
    return f"T3N-{prefix}-{random_str[:4]}-{random_str[4:8]}-{random_str[8:12]}-{random_str[12:16]}"

# --- RESELLER PANEL UI ---

class ProductSelect(discord.ui.Select):
    def __init__(self):
        options = []
        for key, details in config["products"].items():
            options.append(discord.SelectOption(label=details["name"], description=f"Generate key for {details['name']}", value=key))
        super().__init__(placeholder="Select a product...", min_values=1, max_values=1, options=options)

    async def callback(self, interaction: discord.Interaction):
        product_key = self.values[0]
        product_info = config["products"][product_key]
        new_key = generate_key(product_info["prefix"])
        
        db["keys"][new_key] = {
            "product": product_info["name"],
            "product_key": product_key,
            "generated_by": interaction.user.id,
            "status": "valid",
            "redeemed_by": None,
            "hwid": None
        }
        save_db(db)

        embed = discord.Embed(title="✅ License Created", color=discord.Color.green())
        embed.add_field(name="Product", value=product_info["name"], inline=False)
        embed.add_field(name="Key", value=f"`{new_key}`", inline=False)
        await interaction.response.send_message(embed=embed, ephemeral=True)


class PanelView(discord.ui.View):
    def __init__(self):
        super().__init__(timeout=None)

    @discord.ui.button(label="Create License", style=discord.ButtonStyle.green, custom_id="btn_create", emoji="🧩")
    async def create_btn(self, interaction: discord.Interaction, button: discord.ui.Button):
        if interaction.user.id not in db["resellers"] and interaction.user.id != config["owner_id"]:
            return await interaction.response.send_message("❌ You do not have permission.", ephemeral=True)
        
        view = discord.ui.View(timeout=120)
        view.add_item(ProductSelect())
        await interaction.response.send_message("Please select a product:", view=view, ephemeral=True)

    @discord.ui.button(label="HWID Reset", style=discord.ButtonStyle.blurple, custom_id="btn_hwid", emoji="🛠️")
    async def hwid_btn(self, interaction: discord.Interaction, button: discord.ui.Button):
        if interaction.user.id not in db["resellers"] and interaction.user.id != config["owner_id"]:
            return await interaction.response.send_message("❌ You do not have permission.", ephemeral=True)
        await interaction.response.send_message("Please use `/reset_hwid <key>` command.", ephemeral=True)

    @discord.ui.button(label="List My Keys", style=discord.ButtonStyle.gray, custom_id="btn_list", emoji="🔐")
    async def list_btn(self, interaction: discord.Interaction, button: discord.ui.Button):
        if interaction.user.id not in db["resellers"] and interaction.user.id != config["owner_id"]:
            return await interaction.response.send_message("❌ You do not have permission.", ephemeral=True)
        
        my_keys = [k for k, v in db["keys"].items() if v["generated_by"] == interaction.user.id]
        if not my_keys:
            return await interaction.response.send_message("You haven't generated any keys yet.", ephemeral=True)
        
        msg = "\n".join([f"`{k}` - {db['keys'][k]['product']} ({db['keys'][k]['status']})" for k in my_keys[-10:]])
        await interaction.response.send_message(f"**Your Recent Keys:**\n{msg}", ephemeral=True)

# --- COMMANDS ---

@bot.tree.command(name="setup_panel", description="Spawn the Reseller Panel")
async def setup_panel(interaction: discord.Interaction):
    if interaction.user.id != config["owner_id"]:
        return await interaction.response.send_message("❌ Owner only.", ephemeral=True)

    embed = discord.Embed(title="🧩 Reseller Panel", color=0x2b2d31)
    embed.description = f"**Welcome!**\nUse buttons to manage keys.\n\n*Product assets are ready for delivery.*"
    embed.set_footer(text="© 2026 T3N Store")
    await interaction.channel.send(embed=embed, view=PanelView())
    await interaction.response.send_message("Panel spawned!", ephemeral=True)

@bot.tree.command(name="redeem", description="Redeem your key")
async def redeem(interaction: discord.Interaction, key: str):
    if key not in db["keys"]:
        return await interaction.response.send_message("❌ Invalid key.", ephemeral=True)
    
    key_data = db["keys"][key]
    if key_data["status"] != "valid":
        return await interaction.response.send_message("❌ Key used.", ephemeral=True)
    
    product_info = config["products"][key_data["product_key"]]
    role = interaction.guild.get_role(product_info["role_id"])
    if role:
        await interaction.user.add_roles(role)
    
    db["keys"][key]["status"] = "redeemed"
    db["keys"][key]["redeemed_by"] = interaction.user.id
    save_db(db)
    
    dm_embed = discord.Embed(title="🎉 تفعيل ناجح!", description=f"منتجك: {product_info['name']}", color=discord.Color.gold())
    files = [discord.File(f) for f in product_info["files_to_send"] if os.path.exists(f)]
    try:
        await interaction.user.send(embed=dm_embed, files=files)
    except: pass
    await interaction.response.send_message("✅ تم التفعيل!", ephemeral=True)

bot.run(config["token"])
