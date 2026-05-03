import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Key, CheckCircle, AlertCircle, Loader2, Gamepad2, Monitor, ShieldOff } from "lucide-react";

interface KeyRedeemSectionProps {
  isLoggedIn: boolean;
  onRedeem: (key: string) => void;
  redeemStatus: "idle" | "loading" | "success" | "error";
  productName?: string;
  productType?: string;
}

const productIcons: Record<string, React.ReactNode> = {
  fortnite: <Gamepad2 className="w-10 h-10 text-primary" />,
  spoofer: <Monitor className="w-10 h-10 text-primary" />,
  "hwid-unban": <ShieldOff className="w-10 h-10 text-primary" />,
};

const KeyRedeemSection = ({ isLoggedIn, onRedeem, redeemStatus, productName, productType }: KeyRedeemSectionProps) => {
  const [keyValue, setKeyValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyValue.trim() && isLoggedIn) {
      onRedeem(keyValue.trim());
    }
  };

  return (
    <section className="relative py-12">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-md mx-auto"
        >
          <div className="glass rounded-3xl p-8 border-glow shine-effect">
            <div className="text-center mb-6">
              <motion.div
                className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Key className="w-6 h-6 text-primary" />
              </motion.div>
              <h2 className="font-display text-xl font-bold text-gradient mb-2">تفعيل المفتاح</h2>
              <p className="font-body text-xs text-muted-foreground">أدخل مفتاحك لاستلام المنتج فوراً</p>
            </div>

            {!isLoggedIn && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-xl bg-primary/5 border border-primary/20 p-4 mb-5 text-center"
              >
                <AlertCircle className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="font-body text-xs text-secondary-foreground">
                  سجّل دخولك بحساب Discord أولاً لتتمكن من التفعيل
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                value={keyValue}
                onChange={(e) => setKeyValue(e.target.value)}
                placeholder="XXXX-XXXX-XXXX-XXXX"
                disabled={!isLoggedIn}
                className="w-full rounded-xl bg-muted/50 border border-border/50 px-5 py-3.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 disabled:opacity-40 text-center tracking-widest transition-all"
                dir="ltr"
              />
              <motion.button
                type="submit"
                disabled={!isLoggedIn || !keyValue.trim() || redeemStatus === "loading"}
                whileHover={{ scale: isLoggedIn ? 1.02 : 1 }}
                whileTap={{ scale: isLoggedIn ? 0.98 : 1 }}
                className="w-full rounded-xl bg-primary px-6 py-3.5 font-display text-xs font-bold text-primary-foreground transition-all glow-primary disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {redeemStatus === "loading" ? (
                  <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                ) : (
                  "تفعيل المفتاح"
                )}
              </motion.button>
            </form>

            <AnimatePresence>
              {redeemStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="mt-5 rounded-xl bg-primary/5 border border-primary/25 p-5 text-center"
                >
                  {productType && productIcons[productType] ? (
                    <div className="mb-3">{productIcons[productType]}</div>
                  ) : (
                    <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" />
                  )}
                  <p className="font-display text-sm font-bold text-primary mb-1">تم التفعيل بنجاح!</p>
                  {productName && (
                    <p className="font-body text-xs text-secondary-foreground">
                      المنتج: {productName}
                    </p>
                  )}
                  <p className="font-body text-xs text-muted-foreground mt-1">
                    تم إرسال الرتبة لحسابك في Discord
                  </p>
                </motion.div>
              )}
              {redeemStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="mt-5 rounded-xl bg-destructive/5 border border-destructive/25 p-5 text-center"
                >
                  <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-3" />
                  <p className="font-display text-sm font-bold text-destructive mb-1">مفتاح غير صالح</p>
                  <p className="font-body text-xs text-muted-foreground">تأكد من المفتاح وحاول مرة أخرى</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default KeyRedeemSection;
