import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Monitor, Shield, Wrench, ChevronDown, HelpCircle, BookOpen } from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  subcategories: SubCategory[];
}

interface SubCategory {
  id: string;
  name: string;
  description: string;
  image?: string;
}

const categories: Category[] = [
  {
    id: "fortnite",
    name: "فورت نايت",
    icon: <Gamepad2 className="w-5 h-5" />,
    subcategories: [
      { id: "fn-guide", name: "شرح المنتج", description: "شرح كامل لطريقة تشغيل واستخدام منتج فورت نايت مع جميع الإعدادات المطلوبة" },
      { id: "fn-drivers", name: "شرح التعريفات", description: "طريقة تثبيت وتحديث التعريفات المطلوبة لتشغيل المنتج بشكل صحيح" },
      { id: "fn-fix", name: "حل المشاكل", description: "حلول لجميع المشاكل الشائعة التي قد تواجهك أثناء الاستخدام" },
    ],
  },
  {
    id: "spoofer",
    name: "سبوفر",
    icon: <Monitor className="w-5 h-5" />,
    subcategories: [
      { id: "sp-guide", name: "شرح السبوفر", description: "شرح مفصل لطريقة استخدام السبوفر وتغيير المعرفات" },
      { id: "sp-mouse", name: "شرح تعريف الماوس", description: "إعداد تعريفات الماوس المتوافقة مع السبوفر" },
      { id: "sp-fix", name: "حل المشاكل", description: "حلول للمشاكل المتعلقة بالسبوفر وطرق إصلاحها" },
    ],
  },
  {
    id: "valorant",
    name: "فالورانت",
    icon: <Shield className="w-5 h-5" />,
    subcategories: [
      { id: "val-guide", name: "شرح المنتج", description: "دليل شامل لاستخدام منتج فالورانت بجميع مميزاته" },
      { id: "val-fix", name: "حل المشاكل", description: "إصلاح المشاكل الشائعة في منتج فالورانت" },
    ],
  },
  {
    id: "tools",
    name: "أدوات مساعدة",
    icon: <Wrench className="w-5 h-5" />,
    subcategories: [
      { id: "tool-setup", name: "إعداد الجهاز", description: "تجهيز الجهاز وتحسين الأداء قبل استخدام المنتجات" },
      { id: "tool-clean", name: "تنظيف النظام", description: "أدوات وطرق تنظيف النظام من الملفات المؤقتة والبيانات القديمة" },
    ],
  },
];

const CircularMenuSection = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSub, setActiveSub] = useState<string | null>(null);

  const activeData = categories.find((c) => c.id === activeCategory);
  const activeSubData = activeData?.subcategories.find((s) => s.id === activeSub);

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-4">الأقسام</h2>
          <p className="font-body text-muted-foreground">اختر القسم المطلوب للوصول للشرح وحل المشاكل</p>
        </motion.div>

        {/* Circular category buttons */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring" }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveCategory(activeCategory === cat.id ? null : cat.id);
                setActiveSub(null);
              }}
              className={`flex flex-col items-center gap-3 group`}
            >
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground glow-primary"
                    : "glass hover:border-primary/40 text-muted-foreground hover:text-primary"
                }`}
              >
                {cat.icon}
              </div>
              <span
                className={`font-body text-sm font-medium transition-colors ${
                  activeCategory === cat.id ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {cat.name}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Subcategory pills */}
        <AnimatePresence mode="wait">
          {activeData && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {activeData.subcategories.map((sub, i) => (
                  <motion.button
                    key={sub.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveSub(activeSub === sub.id ? null : sub.id)}
                    className={`rounded-full px-6 py-3 font-body text-sm font-medium transition-all ${
                      activeSub === sub.id
                        ? "bg-primary text-primary-foreground glow-primary"
                        : "glass text-secondary-foreground hover:border-primary/30"
                    }`}
                  >
                    {sub.name}
                  </motion.button>
                ))}
              </div>

              {/* Subcategory detail card */}
              <AnimatePresence mode="wait">
                {activeSubData && (
                  <motion.div
                    key={activeSub}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="max-w-2xl mx-auto glass rounded-3xl p-8 border-glow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-foreground mb-2">
                          {activeSubData.name}
                        </h3>
                        <p className="font-body text-sm text-muted-foreground leading-relaxed">
                          {activeSubData.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CircularMenuSection;
