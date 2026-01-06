import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoLight from "../../assets/new-logolight.png";
import logoDark from "../../assets/new-logo.png";

// Icons
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);

export default function Navbar() {
  const [currentLang, setCurrentLang] = useState("en");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  const [theme, setTheme] = useState("light");

  // ---------- Theme & Scroll Initialization ----------
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const initialTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light");
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
    setTheme(initialTheme);
    localStorage.setItem("theme", initialTheme);
    setIsThemeLoaded(true);

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const savedLang = localStorage.getItem("siteLanguage");
    if (savedLang) setCurrentLang(savedLang);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ---------- Theme Toggle ----------
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // ---------- Google Translate ----------
  const loadGoogleTranslate = () =>
    new Promise((resolve) => {
      if (window.google && window.google.translate) resolve();
      else {
        window.googleTranslateElementInit = () => {
          if (!window.google || !window.google.translate) return;
          new window.google.translate.TranslateElement(
            { pageLanguage: "en", includedLanguages: "en,es", autoDisplay: false },
            "google_translate_element"
          );
          setTimeout(resolve, 500);
        };
        if (!document.querySelector('script[src*="translate.google"]')) {
          const script = document.createElement("script");
          script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
          script.async = true;
          document.body.appendChild(script);
        } else setTimeout(resolve, 500);
      }
    });

  const hideGoogleUI = () => {
    const elements = [".goog-te-banner-frame", ".skiptranslate", ".goog-te-gadget", ".VIpgJd-ZVi9od-ORHb", ".goog-tooltip", "#goog-gt-tt"];
    elements.forEach((selector) => {
      const el = document.querySelector(selector);
      if (el) el.style.display = "none";
    });
    document.body.style.top = "0";
    document.body.style.position = "static";
  };

  const applyGoogleTranslate = async (lang) => {
    setIsTranslating(true);
    try {
      await loadGoogleTranslate();
      let attempts = 0;
      const tryTranslate = () => {
        const select = document.querySelector(".goog-te-combo");
        if (select) {
          select.value = lang;
          select.dispatchEvent(new Event("change"));
          setTimeout(hideGoogleUI, 1000);
          setIsTranslating(false);
        } else if (attempts < 30) {
          attempts++;
          setTimeout(tryTranslate, 100);
        } else setIsTranslating(false);
      };
      tryTranslate();
    } catch {
      setIsTranslating(false);
    }
  };

  const changeLanguage = async (lng) => {
    if (lng === currentLang || isTranslating) return;
    setCurrentLang(lng);
    localStorage.setItem("siteLanguage", lng);

    if (lng === "es") {
      document.cookie = "googtrans=/en/es; path=/; max-age=31536000";
      await applyGoogleTranslate("es");
    } else {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      const select = document.querySelector(".goog-te-combo");
      if (select) {
        select.value = "en";
        select.dispatchEvent(new Event("change"));
        setTimeout(hideGoogleUI, 500);
      } else window.location.reload();
    }
  };

  if (!isThemeLoaded) return null;

  const isDark = theme === "dark";
  const textColor = isDark ? "text-white/90" : "text-black";
  const navBg = isDark ? "bg-black/90 border-white/10" : "bg-white/90 border-fuchsia-100 shadow-sm";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-12 py-3 backdrop-blur-md border-b transition-all duration-500 ${navBg}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center flex-shrink-0">
          <Link to="/" className="flex items-center">
            <img
              src={isDark ? logoLight : logoDark}
              alt="Logo"
              className="h-16 md:h-20 w-auto transition-all duration-500"
            />
          </Link>
        </div>

        {/* NAV LINKS */}
        <div className={`hidden lg:flex gap-10 text-[12px] uppercase tracking-[0.25em] font-bold ${textColor}`}>
          <Link to="/about" className="hover:text-[#FF4F00] transition-colors">About</Link>
          <Link to="/faq" className="hover:text-[#FF4F00] transition-colors">FAQ</Link>
          <Link to="/organizations" className="hover:text-[#FF4F00] transition-colors">Organizations</Link>
        </div>

        {/* UTILITIES */}
        <div className="flex items-center gap-4">

          {/* Language Switch */}
          <div className={`hidden sm:flex rounded-xl p-1 border transition-colors ${isDark ? "bg-white/5 border-white/10" : "bg-[#FF4F00]/10 border-[#FF4F00]/30"}`}>
            <button
              onClick={() => changeLanguage("en")}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold tracking-widest transition-all ${currentLang === "en" ? "bg-[#FF4F00] text-white shadow-sm" : isDark ? "text-white/40 hover:text-white" : "text-[#FF4F00]/60 hover:text-[#FF4F00]"}`}
            >
              English
            </button>
            <button
              onClick={() => changeLanguage("es")}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold tracking-widest transition-all ${currentLang === "es" ? "bg-[#FF4F00] text-white shadow-sm" : isDark ? "text-white/40 hover:text-white" : "text-[#FF4F00]/60 hover:text-[#FF4F00]"}`}
            >
              Español
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full border transition-all ${isDark ? "border-white/10 bg-white/5 hover:bg-white/10 text-white" : "border-[#FF4F00]/30 bg-[#FF4F00]/10 text-[#FF4F00] hover:bg-[#FF4F00]/20"}`}
          >
            {isDark ? <MoonIcon /> : <SunIcon />}
          </button>

          {/* Launch Button */}
          <Link
            to="/register"
            className={`hidden sm:block px-5 py-2 border rounded-full text-[10px] uppercase tracking-widest transition-all ${isDark ? "border-[#FF4F00]/50 text-white hover:bg-[#FF4F00]" : "border-[#FF4F00] bg-[#FF4F00] text-white hover:shadow-lg"}`}
          >
            Launch Mission
          </Link>

          {/* Mobile Menu Toggle */}
          <button className={`lg:hidden transition-colors ${isDark ? "text-white" : "text-black"}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className={`absolute top-full left-0 w-full backdrop-blur-xl border-b p-6 flex flex-col gap-6 lg:hidden animate-in slide-in-from-top duration-300 ${isDark ? "bg-black/90 border-white/10 text-white" : "bg-white border-[#FF4F00]/20 text-black"}`}>
          <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold uppercase tracking-widest hover:text-[#FF4F00]">About</Link>
          <Link to="/faq" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold uppercase tracking-widest hover:text-[#FF4F00]">FAQ</Link>
          <Link to="/organizations" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold uppercase tracking-widest hover:text-[#FF4F00]">Organizations</Link>
          <hr className={isDark ? "border-white/5" : "border-[#FF4F00]/30"} />

          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase tracking-widest opacity-40">Language</span>
            <div className="flex gap-2">
              <button onClick={() => changeLanguage("en")} className={`px-4 py-2 rounded-lg text-xs font-bold ${currentLang === 'en' ? 'bg-[#FF4F00] text-white' : 'opacity-40'}`}>English</button>
              <button onClick={() => changeLanguage("es")} className={`px-4 py-2 rounded-lg text-xs font-bold ${currentLang === 'es' ? 'bg-[#FF4F00] text-white' : 'opacity-40'}`}>Español</button>
            </div>
          </div>
        </div>
      )}

      <div id="google_translate_element" style={{ display: "none" }}></div>
    </nav>
  );
}
