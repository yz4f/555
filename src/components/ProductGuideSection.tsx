import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Monitor, ShieldOff, ChevronLeft, BookOpen, Wrench, AlertTriangle, CheckCircle, Settings, Download, Cpu, Globe, Lock, HardDrive, RotateCcw } from "lucide-react";

interface GuideStep {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: string;
}

interface ProductGuide {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  sections: {
    title: string;
    steps: GuideStep[];
  }[];
}

const productGuides: ProductGuide[] = [
  {
    id: "fortnite",
    name: "هاك فورت نايت",
    icon: <Gamepad2 className="w-6 h-6" />,
    description: "دليل شامل لتشغيل واستخدام هاك فورت نايت تعن",
    sections: [
      {
        title: "التثبيت",
        steps: [
          {
            id: "fn-windows",
            title: "نظام الويندوز",
            icon: <Settings className="w-4 h-4" />,
            content: "يدعم هاك فورت نايت تعن نظام ويندوز 10 حتى ويندوز 11 الإصدار 25H2. ننصح بشدة بعدم استخدام نسخ ويندوز معدّلة لأنها قد تسبب مشاكل غير متوقعة. للحصول على أفضل أداء، استخدم نسخة ويندوز رسمية نظيفة.",
          },
          {
            id: "fn-deps",
            title: "المتطلبات الأساسية",
            icon: <Download className="w-4 h-4" />,
            content: "١. حمّل حزمة Visual C++ Redistributable Runtimes من الرابط الرسمي.\n٢. فك الضغط عن الملف، ثم اضغط بالزر الأيمن على install_all.bat واختر «تشغيل كمسؤول».\n٣. أعد تشغيل الجهاز بعد اكتمال التثبيت.\n٤. حمّل DirectX Runtime من مايكروسوفت وثبّته مع إلغاء تحديد شريط Bing.",
          },
          {
            id: "fn-tools",
            title: "أداة SDL3.dll",
            icon: <Wrench className="w-4 h-4" />,
            content: "هذا الملف يحل مشكلة نافذة SDL3.dll المنبثقة عند تشغيل اللودر، وهو مطلوب لدعم أذرع التحكم.\n\n١. حمّل ملف SDL3.dll.\n٢. ضعه في نفس مجلد اللودر (Loader.exe).\n\n⚠️ يجب أن يكون الملف في نفس مجلد اللودر وإلا ستستمر المشكلة.",
          },
          {
            id: "fn-load",
            title: "تشغيل الهاك",
            icon: <CheckCircle className="w-4 h-4" />,
            content: "١. شغّل اللودر كمسؤول (كليك يمين → تشغيل كمسؤول).\n٢. أدخل مفتاح الترخيص واضغط Enter.\n٣. انتظر حتى تظهر رسالة «Waiting for Fortnite».\n٤. افتح فورت نايت واستمتع باللعب! 🎮\n\nفي حال أُغلق اللودر: أعد فتحه. إذا لم تظهر الميزات: تأكد أن فورت نايت يعمل وأعد تشغيل الجهاز.",
          },
          {
            id: "fn-mouse",
            title: "تعريف الماوس",
            icon: <Settings className="w-4 h-4" />,
            content: "لضمان عمل الماوس بشكل صحيح مع الهاك:\n١. حمّل تعريف الماوس المتوافق من الرابط المرفق.\n٢. ثبّته على جهازك.\n٣. أعد تشغيل الجهاز لتفعيل التعريف.\n\n⚠️ استخدم التعريف المحدد فقط لتجنب مشاكل التوافق.",
          },
        ],
      },
      {
        title: "حل المشاكل",
        steps: [
          {
            id: "fn-err1",
            title: "فشل تحميل التعريف",
            icon: <AlertTriangle className="w-4 h-4" />,
            content: "إذا ظهرت رسالة «Failed To Load Driver»:\n١. تأكد من تشغيل اللودر كمسؤول.\n٢. عطّل برنامج الحماية مؤقتاً.\n٣. تأكد من تحديث الويندوز لآخر إصدار.\n٤. أعد تشغيل الجهاز وحاول مرة أخرى.\n٥. إذا استمرت المشكلة، تواصل مع الدعم الفني.",
          },
          {
            id: "fn-err2",
            title: "طرد بسبب أداة محظورة",
            icon: <AlertTriangle className="w-4 h-4" />,
            content: "إذا تم طردك بسبب «Forbidden Tool Kick»:\n١. أغلق جميع البرامج المفتوحة غير الضرورية.\n٢. تأكد من عدم تشغيل أي برامج مراقبة أو تصحيح.\n٣. أعد تشغيل الجهاز وشغّل اللودر قبل فتح اللعبة.\n٤. تحقق من قائمة البرامج المتوافقة في الدعم الفني.",
          },
        ],
      },
    ],
  },
  {
    id: "spoofer",
    name: "سبوفر تعن",
    icon: <Monitor className="w-6 h-6" />,
    description: "دليل شامل لاستخدام سبوفر تعن الدائم لتغيير معرّفات الجهاز",
    sections: [
      {
        title: "البداية",
        steps: [
          {
            id: "sp-bios",
            title: "تفليش البايوس (VGC)",
            icon: <Cpu className="w-4 h-4" />,
            content: "الخطوة الأولى والأهم هي تفليش البايوس:\n١. حمّل أداة VGC المتوافقة مع لوحتك الأم.\n٢. شغّل الأداة كمسؤول واتبع التعليمات.\n٣. أعد تشغيل الجهاز بعد التفليش.\n\n⚠️ هذه الخطوة حساسة — اتبع التعليمات بدقة.",
          },
          {
            id: "sp-biosconfig",
            title: "إعدادات البايوس",
            icon: <Settings className="w-4 h-4" />,
            content: "بعد التفليش، ادخل إلى إعدادات البايوس:\n١. اضغط Del أو F2 عند بدء التشغيل.\n٢. عطّل Secure Boot.\n٣. فعّل TPM إذا كان متاحاً.\n٤. احفظ الإعدادات وأعد التشغيل.",
          },
          {
            id: "sp-windows",
            title: "إعادة تثبيت الويندوز",
            icon: <HardDrive className="w-4 h-4" />,
            content: "يُنصح بإعادة تثبيت ويندوز نظيف:\n١. حمّل أداة Windows Media Creation Tool.\n٢. أنشئ فلاشة USB قابلة للإقلاع.\n٣. ثبّت ويندوز 10 أو 11 نسخة نظيفة.\n٤. لا تسجل دخول بحساب مايكروسوفت أثناء الإعداد الأولي.",
          },
        ],
      },
      {
        title: "إعداد السبوفر",
        steps: [
          {
            id: "sp-msinfo",
            title: "التحقق من MSINFO32",
            icon: <CheckCircle className="w-4 h-4" />,
            content: "تحقق من معلومات النظام:\n١. اضغط Win+R واكتب msinfo32.\n٢. تأكد من أن معرّفات الجهاز تغيرت.\n٣. قارن المعلومات مع البيانات السابقة.\n٤. التقط صورة للنتائج للمرجعية.",
          },
          {
            id: "sp-setup",
            title: "إعداد الويندوز للسبوفر",
            icon: <Settings className="w-4 h-4" />,
            content: "جهّز الويندوز للسبوفر:\n١. عطّل تحديثات الويندوز التلقائية.\n٢. عطّل Windows Defender.\n٣. عطّل جميع خدمات التتبع.\n٤. امسح سجلات النظام القديمة.",
          },
          {
            id: "sp-perm",
            title: "تشغيل السبوفر الدائم",
            icon: <Lock className="w-4 h-4" />,
            content: "١. شغّل أداة سبوفر تعن كمسؤول.\n٢. أدخل مفتاح الترخيص.\n٣. اختر الإعدادات المناسبة لجهازك.\n٤. اضغط «بدء السبوفر» وانتظر اكتمال العملية.\n٥. أعد تشغيل الجهاز.\n\n✅ السبوفر دائم — لن يحتاج إعادة تشغيل بعد كل إقلاع.",
          },
          {
            id: "sp-monitor",
            title: "سبوفر الشاشة",
            icon: <Monitor className="w-4 h-4" />,
            content: "لتغيير معرّف الشاشة:\n١. افتح قسم سبوفر الشاشة.\n٢. اتبع الخطوات المعروضة.\n٣. أعد تشغيل الجهاز بعد الانتهاء.\n\n⚠️ هذه الخطوة اختيارية لكن منصوح بها.",
          },
          {
            id: "sp-network",
            title: "إلغاء تعليم الشبكة",
            icon: <Globe className="w-4 h-4" />,
            content: "لإزالة علامات الشبكة:\n١. افتح إعدادات الشبكة.\n٢. غيّر عنوان MAC.\n٣. أعد تشغيل الراوتر.\n٤. تحقق من تغيّر المعرّفات.",
          },
          {
            id: "sp-vpn",
            title: "استخدام VPN",
            icon: <Globe className="w-4 h-4" />,
            content: "يُنصح باستخدام VPN إضافي:\n١. استخدم VPN موثوق (مثل NordVPN أو ExpressVPN).\n٢. اتصل بسيرفر قريب.\n٣. تأكد من عدم وجود تسريب DNS.\n٤. شغّل VPN قبل فتح اللعبة.",
          },
          {
            id: "sp-final",
            title: "الخطوة النهائية",
            icon: <RotateCcw className="w-4 h-4" />,
            content: "للتأكد من نجاح العملية:\n١. أعد تشغيل الجهاز.\n٢. تحقق من MSINFO32 مرة أخرى.\n٣. جرّب الدخول للعبة.\n٤. إذا نجح كل شيء — تهانينا! 🎉\n\n⚠️ لا تحاول تعديل أي إعدادات بعد النجاح.",
          },
        ],
      },
    ],
  },
  {
    id: "hwid-unban",
    name: "فك باند هاردوير",
    icon: <ShieldOff className="w-6 h-6" />,
    description: "دليل فك حظر الأجهزة من فورت نايت باستخدام سبوفر تعن",
    sections: [
      {
        title: "التحضير",
        steps: [
          {
            id: "ub-bios",
            title: "تفليش البايوس",
            icon: <Cpu className="w-4 h-4" />,
            content: "لفك الباند يجب تغيير معرّف البايوس:\n١. حمّل أداة VGC للوحة الأم.\n٢. شغّلها كمسؤول.\n٣. اتبع التعليمات بدقة.\n٤. أعد التشغيل.\n\n⚠️ خطوة إلزامية لفك الباند بنجاح.",
          },
          {
            id: "ub-format",
            title: "فورمات الجهاز",
            icon: <HardDrive className="w-4 h-4" />,
            content: "يُنصح بتنظيف الجهاز بالكامل:\n١. انسخ ملفاتك المهمة احتياطياً.\n٢. أعد تثبيت ويندوز نظيف.\n٣. لا تسجل بنفس حساب مايكروسوفت القديم.\n٤. لا تثبت أي برامج قبل تشغيل السبوفر.",
          },
        ],
      },
      {
        title: "تشغيل السبوفر",
        steps: [
          {
            id: "ub-spoof",
            title: "تشغيل سبوفر تعن",
            icon: <Lock className="w-4 h-4" />,
            content: "بعد تنظيف الجهاز:\n١. حمّل سبوفر تعن.\n٢. شغّله كمسؤول.\n٣. أدخل المفتاح.\n٤. اختر «سبوفر دائم».\n٥. انتظر اكتمال العملية.\n٦. أعد التشغيل.",
          },
          {
            id: "ub-verify",
            title: "التحقق والاختبار",
            icon: <CheckCircle className="w-4 h-4" />,
            content: "للتأكد من نجاح فك الباند:\n١. تحقق من MSINFO32 (يجب أن تتغير المعرّفات).\n٢. أنشئ حساب Epic Games جديد.\n٣. سجّل دخول وادخل فورت نايت.\n٤. إذا دخلت بنجاح — تم فك الباند! 🎉\n\n⚠️ لا تستخدم الحساب القديم المحظور.",
          },
        ],
      },
    ],
  },
];

const ProductGuideSection = () => {
  const [activeProduct, setActiveProduct] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const product = productGuides.find((p) => p.id === activeProduct);
  const currentSection = product?.sections[activeSection];
  const currentStep = currentSection?.steps.find((s) => s.id === activeStep);

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-3">أدلة المنتجات</h2>
          <p className="font-body text-muted-foreground text-sm">اختر المنتج للوصول إلى الدليل الكامل</p>
        </motion.div>

        {/* Product circles */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {productGuides.map((pg, i) => (
            <motion.button
              key={pg.id}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring" }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveProduct(activeProduct === pg.id ? null : pg.id);
                setActiveSection(0);
                setActiveStep(null);
              }}
              className="flex flex-col items-center gap-3"
            >
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  activeProduct === pg.id
                    ? "bg-primary text-primary-foreground glow-primary"
                    : "glass hover:border-primary/40 text-muted-foreground hover:text-primary"
                }`}
              >
                {pg.icon}
              </div>
              <span className={`font-body text-sm font-medium transition-colors ${activeProduct === pg.id ? "text-primary" : "text-muted-foreground"}`}>
                {pg.name}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Guide content */}
        <AnimatePresence mode="wait">
          {product && (
            <motion.div
              key={activeProduct}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto"
            >
              {/* Description */}
              <div className="text-center mb-8">
                <p className="font-body text-sm text-secondary-foreground">{product.description}</p>
              </div>

              {/* Section tabs */}
              <div className="flex justify-center gap-3 mb-8">
                {product.sections.map((sec, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setActiveSection(i); setActiveStep(null); }}
                    className={`rounded-full px-5 py-2 font-body text-xs font-semibold transition-all ${
                      activeSection === i
                        ? "bg-primary text-primary-foreground glow-primary"
                        : "glass text-secondary-foreground hover:border-primary/30"
                    }`}
                  >
                    {sec.title}
                  </motion.button>
                ))}
              </div>

              {/* Steps */}
              {currentSection && (
                <div className="grid gap-3">
                  {currentSection.steps.map((step, i) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <button
                        onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                        className={`w-full glass rounded-2xl px-5 py-4 flex items-center gap-4 text-right transition-all hover:border-primary/30 ${
                          activeStep === step.id ? "border-primary/40 glow-primary" : ""
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                          activeStep === step.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}>
                          {step.icon}
                        </div>
                        <span className="font-body text-sm font-medium text-foreground flex-1">{step.title}</span>
                        <motion.div animate={{ rotate: activeStep === step.id ? 90 : 0 }}>
                          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {activeStep === step.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="glass rounded-2xl p-6 mt-2 mr-14 border-glow">
                              <p className="font-body text-sm text-secondary-foreground leading-relaxed whitespace-pre-line">
                                {step.content}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProductGuideSection;
