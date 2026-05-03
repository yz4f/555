import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ShieldOff, Monitor, Gamepad2 } from "lucide-react";

const faqCategories = [
  {
    title: "فك باند فورت هاردوير",
    icon: <ShieldOff className="w-5 h-5 text-primary" />,
    items: [
      {
        q: "كيف أعرف إن جهازي مبند هاردوير؟",
        a: (
          <div>
            في حال أنك شاك مبند، تظهر لك رسالة بعد طردك من القيم. هذا يعني أن الباند على جهازك (هاردوير).
            <div className="mt-4 rounded-xl overflow-hidden border border-border/50 max-w-sm mx-auto">
              <img src="/image.png" alt="صورة توضيحية لرسالة الباند" className="w-full h-auto" />
            </div>
          </div>
        ),
      },
      {
        q: "هل يفك الباند عن الحساب؟",
        a: "لا، يفك الباند عن الجهاز فقط. أما الحساب الأساسي فلا ينفك عنه الباند.",
      },
      {
        q: "هل الاستعمال مرة واحدة؟",
        a: "صحيح، الاستعمال مرة واحدة ولا يحتاج استعماله مرة أخرى.",
      },
      {
        q: "أخاف أفرمت ويرجع الباند؟",
        a: "مستحيل يرجع الباند، ويكون جهازك مفكوك للأبد.",
      },
      {
        q: "يمديني أشغل حماية بعد ما أخلص؟",
        a: "صحيح، يمكنك تشغيلها دون أي مشاكل.",
      },
      {
        q: "هل المنتج يفك عن فورت نايت فقط؟",
        a: "صحيح، هذا المنتج يفك عن فورت نايت فقط.",
      },
      {
        q: "أقدر أدخل حسابي الأساسي المبند بعد الانتهاء؟",
        a: "يمكنك الدخول، لكن لا ننصحك بدخول حساب مبند عشان ما يرجع لك الباند. أنت تتحمل المسؤولية بالكامل وليس لنا علاقة!",
      },
    ],
  },
  {
    title: "سبوفر تعن",
    icon: <Monitor className="w-5 h-5 text-primary" />,
    items: [
      {
        q: "هل يفك الباند عن أي لعبة؟",
        a: "صحيح، يفك عن جميع الألعاب التي تستخدم باند الهاردوير فقط.",
      },
      {
        q: "هل يفك باند الحساب؟",
        a: "غير صحيح، فقط يفك باند الجهاز وتحديداً باند الهاردوير.",
      },
      {
        q: "يمديني أشغل الحماية بعد استعماله؟",
        a: "صحيح، يمكنك تشغيلها.",
      },
      {
        q: "خايف أفرمت ويرجع الباند؟",
        a: "مستحيل الباند يرجع بعد فورمات، ويمديك تدخل اللعبة وتلعب عادي.",
      },
    ],
  },
  {
    title: "هاك فورت نايت خارجي",
    icon: <Gamepad2 className="w-5 h-5 text-primary" />,
    items: [
      {
        q: "هل الهاك غير مكشوف ودقيق؟",
        a: "صحيح، الهاك غير مكشوف ودقيق ويتم تحديثه دون توقف وبشكل منظم.",
      },
      {
        q: "أقدر أشغل حماية وأنا ألعب أو مشغله؟",
        a: "لا يمكنك، لأن الحماية سوف تقوم بحذفه فورياً. ننصحك بإطفاء الحماية أثناء التشغيل.",
      },
    ],
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  return (
    <section className="py-24 relative" id="faq">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-4">الأسئلة الشائعة وتوضيح المنتجات</h2>
          <p className="font-body text-sm text-muted-foreground max-w-xl mx-auto">
            إجابات وافية لجميع استفساراتك حول منتجات تعن
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-12">
          {faqCategories.map((category, catIndex) => (
            <div key={catIndex} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 border-b border-border/50 pb-3"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center glow-primary">
                  {category.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">{category.title}</h3>
              </motion.div>

              <div className="space-y-3">
                {category.items.map((faq, itemIndex) => {
                  const id = `${catIndex}-${itemIndex}`;
                  return (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: itemIndex * 0.05 }}
                      className="glass rounded-2xl overflow-hidden border-glow transition-colors hover:bg-card/60"
                    >
                      <button
                        onClick={() => setOpenIndex(openIndex === id ? null : id)}
                        className="w-full flex items-center justify-between px-6 py-4 text-right group"
                      >
                        <span className="font-body text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                          {faq.q}
                        </span>
                        <motion.div animate={{ rotate: openIndex === id ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {openIndex === id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden bg-background/30"
                          >
                            <div className="px-6 pb-5 pt-1">
                              <div className="font-body text-sm text-muted-foreground leading-relaxed">
                                {faq.a}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
