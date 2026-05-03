# T3N Unified System (Bot + Website) 🚀

This is the unified build of the T3N store, combining the Discord Bot and the React Website into a single integrated system.

## 📁 Project Structure
- `bot.py`: The main server (Runs the Discord Bot AND serves the Website).
- `frontend/`: The React website source code.
- `assets/`: Product files (.zip) for the bot to send to customers.
- `config.json`: Bot configuration (Token, Owner ID, etc).
- `database.json`: Key database.

## 🚀 Deployment Instructions (Railway)

1. **GitHub:** Upload this entire `t3n-unified` folder to a **Private** GitHub repository.
2. **Railway:**
   - Go to [Railway.app](https://railway.app/) and create a new project from your GitHub repo.
   - Railway will detect the Python environment.
3. **Settings:**
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Start Command:** `python bot.py`
4. **Environment Variables:**
   - Add a variable `PORT` with value `8080` (Railway usually does this automatically).

## ✅ Features
- **Integrated:** The website and bot share the same server. No more complex URLs to link!
- **Automatic:** Website activation immediately triggers the bot to send roles and files in Discord.
- **Persistent:** The bot stays online 24/7 on Railway.

---
© 2026 T3N Store. All Rights Reserved.
