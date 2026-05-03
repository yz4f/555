import { motion } from "framer-motion";
import t3nLogo from "@/assets/t3n-logo-new.png";

const Footer = () => {
  return (
    <footer className="border-t border-border/20 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-3">
          <img src={t3nLogo} alt="تعن" className="w-8 h-8 rounded-full opacity-50" width={32} height={32} loading="lazy" />
          <p className="font-body text-xs text-muted-foreground">
            © 2026 تعن — جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
