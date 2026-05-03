import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Key, Package, Shield, Clock, Search, Ban, Eye } from "lucide-react";
import t3nLogo from "@/assets/t3n-logo-new.png";

interface UserEntry {
  id: string;
  discordName: string;
  discordId: string;
  key: string;
  product: string;
  productIcon: string;
  role: string;
  status: "active" | "banned";
  timestamp: string;
}

const mockUsers: UserEntry[] = [
  { id: "1", discordName: "xDark#1234", discordId: "123456789", key: "FN-T3N-XXXX-YYYY", product: "هاك فورت نايت", productIcon: "🎮", role: "Fortnite + Customer", status: "active", timestamp: "2026-05-02 14:30" },
  { id: "2", discordName: "Shadow#5678", discordId: "987654321", key: "SP-T3N-AAAA-BBBB", product: "سبوفر تعن", productIcon: "🖥️", role: "Spoofer + Customer", status: "active", timestamp: "2026-05-02 13:15" },
  { id: "3", discordName: "Nyx#9012", discordId: "456789123", key: "UB-T3N-CCCC-DDDD", product: "فك باند", productIcon: "🛡️", role: "HWID Unban + Customer", status: "active", timestamp: "2026-05-01 22:00" },
  { id: "4", discordName: "Storm#3456", discordId: "321654987", key: "FN-T3N-EEEE-FFFF", product: "هاك فورت نايت", productIcon: "🎮", role: "Fortnite + Customer", status: "banned", timestamp: "2026-04-30 18:45" },
];

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"users" | "keys" | "products">("users");

  const filteredUsers = mockUsers.filter(
    (u) => u.discordName.toLowerCase().includes(searchQuery.toLowerCase()) || u.key.includes(searchQuery)
  );

  const stats = [
    { label: "المستخدمين", value: "156", icon: <Users className="w-5 h-5" />, change: "+12" },
    { label: "المفاتيح النشطة", value: "89", icon: <Key className="w-5 h-5" />, change: "+5" },
    { label: "المنتجات", value: "3", icon: <Package className="w-5 h-5" />, change: "" },
    { label: "الرُتب الممنوحة", value: "134", icon: <Shield className="w-5 h-5" />, change: "+8" },
  ];

  const tabs = [
    { id: "users" as const, label: "المستخدمين", icon: <Users className="w-4 h-4" /> },
    { id: "keys" as const, label: "المفاتيح", icon: <Key className="w-4 h-4" /> },
    { id: "products" as const, label: "المنتجات", icon: <Package className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero" dir="rtl">
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-strong border-b border-border/20 px-6 py-3 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <img src={t3nLogo} alt="تعن" className="w-8 h-8 rounded-full" width={32} height={32} />
          <span className="font-display text-sm font-bold text-gradient">لوحة التحكم</span>
        </div>
        <a href="/" className="font-body text-xs text-muted-foreground hover:text-primary transition-colors">
          الرئيسية ←
        </a>
      </motion.nav>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-5 border-glow"
            >
              <div className="text-primary mb-2">{stat.icon}</div>
              <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
              <div className="flex items-center justify-between">
                <p className="font-body text-xs text-muted-foreground">{stat.label}</p>
                {stat.change && <span className="font-body text-xs text-primary">{stat.change}</span>}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-full px-5 py-2 font-body text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground glow-primary"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative mb-6">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث بالاسم أو المفتاح..."
            className="w-full glass rounded-xl pr-11 pl-5 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {activeTab === "users" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl overflow-hidden border-glow">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/20">
                    <th className="px-5 py-3 text-right font-body text-xs font-semibold text-muted-foreground">المستخدم</th>
                    <th className="px-5 py-3 text-right font-body text-xs font-semibold text-muted-foreground">المفتاح</th>
                    <th className="px-5 py-3 text-right font-body text-xs font-semibold text-muted-foreground">المنتج</th>
                    <th className="px-5 py-3 text-right font-body text-xs font-semibold text-muted-foreground">الرتبة</th>
                    <th className="px-5 py-3 text-right font-body text-xs font-semibold text-muted-foreground">الحالة</th>
                    <th className="px-5 py-3 text-right font-body text-xs font-semibold text-muted-foreground">الوقت</th>
                    <th className="px-5 py-3 text-right font-body text-xs font-semibold text-muted-foreground">إجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, i) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-border/10 hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-bold text-xs">
                            {user.discordName[0]}
                          </div>
                          <span className="font-body text-xs text-foreground">{user.discordName}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 font-mono text-xs text-muted-foreground" dir="ltr">{user.key}</td>
                      <td className="px-5 py-3">
                        <span className="font-body text-xs text-secondary-foreground">{user.productIcon} {user.product}</span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-body text-xs text-primary">{user.role}</span>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`rounded-full px-2.5 py-0.5 font-body text-xs ${
                          user.status === "active" ? "bg-green-500/10 text-green-400" : "bg-destructive/10 text-destructive"
                        }`}>
                          {user.status === "active" ? "نشط" : "محظور"}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span className="font-body text-xs" dir="ltr">{user.timestamp}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex gap-1">
                          <button className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-primary">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                            <Ban className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === "keys" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-8 border-glow text-center">
            <Key className="w-10 h-10 text-primary mx-auto mb-3" />
            <p className="font-display text-sm font-bold text-foreground mb-1">إدارة المفاتيح</p>
            <p className="font-body text-xs text-muted-foreground">يتم إنشاء المفاتيح وإدارتها عند ربط Lovable Cloud</p>
          </motion.div>
        )}

        {activeTab === "products" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "هاك فورت نايت تعن", icon: "🎮", keys: 45 },
              { name: "سبوفر تعن الدائم", icon: "🖥️", keys: 32 },
              { name: "فك باند هاردوير", icon: "🛡️", keys: 12 },
            ].map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 border-glow"
              >
                <span className="text-2xl mb-3 block">{product.icon}</span>
                <p className="font-display text-sm font-bold text-foreground mb-1">{product.name}</p>
                <p className="font-body text-xs text-muted-foreground">{product.keys} مفتاح نشط</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
