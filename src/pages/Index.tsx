import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import KeyRedeemSection from "@/components/KeyRedeemSection";
import ProductGuideSection from "@/components/ProductGuideSection";
import ReviewsSection from "@/components/ReviewsSection";
import FAQSection from "@/components/FAQSection";
import RulesSection from "@/components/RulesSection";
import Footer from "@/components/Footer";
import { AgreementModal } from "@/components/AgreementModal";
import t3nLogo from "@/assets/t3n-logo-new.png";
import bgHero from "@/assets/bg-hero.png";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redeemStatus, setRedeemStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [productName, setProductName] = useState<string>();
  const [productType, setProductType] = useState<string>();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [userName, setUserName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    // Check if user is already logged in (localStorage)
    const storedUser = localStorage.getItem("discord_user");
    if (storedUser) {
      setIsLoggedIn(true);
      setUserName(storedUser);
    }

    // Check for Discord OAuth redirect hash
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [accessToken, tokenType] = [fragment.get("access_token"), fragment.get("token_type")];

    if (accessToken && tokenType) {
      // Clear hash from URL
      window.history.replaceState(null, "", window.location.pathname);
      
      // Fetch user profile from Discord
      fetch("https://discord.com/api/users/@me", {
        headers: {
          authorization: `${tokenType} ${accessToken}`,
        },
      })
        .then((result) => result.json())
        .then((response) => {
          const name = response.global_name || response.username;
          const id = response.id;
          setIsLoggedIn(true);
          setUserName(name);
          setUserId(id);
          localStorage.setItem("discord_user", name);
          localStorage.setItem("discord_id", id);
          showNotification(`تم تسجيل الدخول بنجاح يا ${name}!`);
        })
        .catch(console.error);
    }
  }, []);

  const showNotification = useCallback((msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  }, []);

  const handleLogin = () => {
    const clientId = "1500012521749221599";
    const redirectUri = encodeURIComponent(window.location.origin);
    const oauthUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=identify`;
    window.location.href = oauthUrl;
  };

  const handleRedeem = async (key: string) => {
    if (!isLoggedIn) {
      showNotification("يرجى تسجيل الدخول بالدسكورد أولاً!");
      return;
    }

    setRedeemStatus("loading");
    
    try {
      const response = await fetch(`/api/redeem`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, discord_id: userId || localStorage.getItem("discord_id") })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setRedeemStatus("success");
        setProductName(result.product);
        showNotification("تم التفعيل بنجاح! تفقد الدسكورد الخاص بك.");
      } else {
        setRedeemStatus("error");
        showNotification(`خطأ: ${result.message}`);
      }
    } catch (error) {
      setRedeemStatus("error");
      showNotification("فشل الاتصال بالبوت. تأكد من أن البوت أونلاين.");
    }
    
    setTimeout(() => setRedeemStatus("idle"), 6000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero" dir="rtl">
      <AgreementModal />
      {/* Toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -30, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -30, x: "-50%" }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            className="fixed top-20 left-1/2 z-[100] glass-strong rounded-xl px-5 py-2.5 border-glow"
          >
            <p className="font-body text-xs text-foreground whitespace-nowrap">{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar isLoggedIn={isLoggedIn} onLogin={handleLogin} userName={userName} />

      {/* Hero with background image */}
      <section className="relative pt-28 pb-8 overflow-hidden">
        {/* Background image with blur */}
        <div className="absolute inset-0">
          <img
            src={bgHero}
            alt=""
            className="w-full h-full object-cover opacity-15 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        {/* Subtle glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-center"
          >
            <motion.img
              src={t3nLogo}
              alt="تعن"
              className="w-20 h-20 mx-auto mb-6 rounded-full ring-2 ring-primary/20"
              width={80}
              height={80}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <h1 className="font-display text-4xl md:text-5xl font-black text-gradient-silver mb-3">
              متجر تعن
            </h1>
            <p className="font-body text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
              منتجات موثوقة بجودة عالية — استلام فوري وآمن
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Redeem - always visible at top */}
      <KeyRedeemSection
        isLoggedIn={isLoggedIn}
        onRedeem={handleRedeem}
        redeemStatus={redeemStatus}
        productName={productName}
        productType={productType}
      />

      {/* Product guides & content - only visible after login */}
      {isLoggedIn ? (
        <>
          <ProductGuideSection />
          <FAQSection />
          <RulesSection />
        </>
      ) : (
        <section className="py-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="glass rounded-2xl max-w-sm mx-auto p-8 border-glow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <h3 className="font-display text-sm font-bold text-foreground mb-2">محتوى مقفل</h3>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                سجّل دخولك بحساب Discord للوصول إلى أدلة المنتجات والأقسام التفصيلية
              </p>
            </div>
          </motion.div>
        </section>
      )}

      {/* Reviews always visible at bottom */}
      <ReviewsSection />
      <Footer />
    </div>
  );
};

export default Index;
