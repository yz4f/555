import { motion } from "framer-motion";
import { Shield, Scale } from "lucide-react";

const rules = [
  "يمنع مشاركة المنتجات أو المفاتيح مع أي شخص آخر",
  "المنتج مخصص لحساب واحد فقط ولا يمكن نقله",
  "لا يوجد استرجاع بعد تسليم المفتاح واستخدامه",
  "يجب الالتزام بتعليمات الاستخدام المذكورة في الشرح",
  "الإدارة غير مسؤولة عن سوء الاستخدام",
  "يحق للإدارة إيقاف الخدمة في حال مخالفة القوانين",
];

const RulesSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-4">القوانين</h2>
        </motion.div>

        <div className="max-w-2xl mx-auto glass rounded-3xl p-8 border-glow">
          <div className="flex items-center gap-3 mb-6">
            <Scale className="w-6 h-6 text-primary" />
            <h3 className="font-display text-lg font-bold text-foreground">شروط الاستخدام</h3>
          </div>
          <ul className="space-y-4">
            {rules.map((rule, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3"
              >
                <Shield className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="font-body text-sm text-secondary-foreground">{rule}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RulesSection;
