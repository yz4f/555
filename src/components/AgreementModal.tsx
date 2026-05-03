import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export const AgreementModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    // Check if the user has already agreed
    const hasAgreed = localStorage.getItem("t3n_agreement_accepted");
    if (!hasAgreed) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    if (isVisible && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, timeLeft]);

  const handleAccept = () => {
    if (timeLeft === 0) {
      localStorage.setItem("t3n_agreement_accepted", "true");
      setIsVisible(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/95 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full max-w-md bg-card border border-primary/20 rounded-3xl shadow-2xl overflow-hidden relative"
            dir="rtl"
          >
            {/* Top decorative bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
            
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-5 border border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                <AlertTriangle className="w-8 h-8 text-yellow-500" />
              </div>
              
              <h2 className="font-display text-2xl font-black text-foreground mb-4">
                إشعار الأمان واتفاقية الاستخدام
              </h2>
              
              <div className="space-y-4 font-body text-base text-muted-foreground leading-relaxed font-semibold">
                <p className="text-foreground">
                  هذه البرمجيات محمية بموجب قوانين الملكية الفكرية وتبقى ملكاً حصرياً لمتجر تعن.
                </p>
                
                <p>
                  يُحظر تماماً <span className="text-red-400 font-bold">الهندسة العكسية</span>، أو فحص الكود، أو محاولة التحايل على أنظمة الأمان بأي شكل من الأشكال.
                </p>

                <p className="text-sm">
                  الاستمرار يعني إقرارك بالالتزام التام، وأي انتهاك يعرضك للمساءلة وفقدان الوصول.
                </p>
              </div>

              <div className="mt-8">
                <button
                  onClick={handleAccept}
                  disabled={timeLeft > 0}
                  className={`w-full px-8 py-3.5 rounded-xl font-body font-bold text-lg transition-all duration-300 ${
                    timeLeft > 0 
                      ? "bg-muted text-muted-foreground cursor-not-allowed" 
                      : "bg-primary text-primary-foreground hover:shadow-[0_0_25px_rgba(var(--primary),0.4)] hover:scale-[1.02]"
                  }`}
                >
                  {timeLeft > 0 ? `يرجى الانتظار (${timeLeft})` : "أوافق على الشروط"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
