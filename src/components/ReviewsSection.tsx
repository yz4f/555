import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "تركي الشلوي",
    rating: 5,
    text: "متجر ثقة متجر موثوق",
  },
  {
    name: "محمد باسم",
    rating: 5,
    text: "أقسم بالله أرجل متجر، رحت عن متاجر قديمة يدفعوني ١٥٠ ويقولون ما يدعم المذر بورد حقك. المتجر ذا بخمسين وساعدني مع إني ما دفعت حق مساعدة. رجال ونعم!",
  },
  {
    name: "Ahmed Salem",
    rating: 5,
    text: "أقسم بالله أقوى سبوفر، رخيص ويفك كل الباندات. كان عندي باند حماية في بوليتو وانفك، وكان عندي باند TX أدمن وانفك حتى بدون فورمات 🔥",
  },
  {
    name: "Ahmed Alkhair",
    rating: 5,
    text: "والله المتجر ثقة ماشاء الله تبارك الله، أسعار رمزية وكويسة ما تحصلها عند أي أحد ومضمون ١٠٠٪",
  },
  {
    name: "سلطان الشهري",
    rating: 5,
    text: "والله شي أسطوري ومبلغ قليل على الخدمة هذي. الله يعطيكم ألف عافية على المصداقية",
  },
];

const ReviewsSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-3">آراء العملاء</h2>
          <p className="font-body text-muted-foreground text-sm">تقييمات حقيقية من عملاء متجر تعن</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-5 border-glow shine-effect"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-display text-xs font-bold text-primary">{review.name[0]}</span>
                  </div>
                  <p className="font-body text-sm font-semibold text-foreground">{review.name}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="w-3 h-3 fill-primary text-primary" />
                  ))}
                </div>
              </div>
              <p className="font-body text-xs text-secondary-foreground leading-relaxed">{review.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
