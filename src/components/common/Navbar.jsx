import React, { useState, useEffect } from "react";
import { Link, Links } from "react-router-dom";
import { Menu, X } from 'lucide-react';
import logo from "../../assets/gophora-plomo-logo.png";

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
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  // ---------- Scroll & Theme ----------
  useEffect(() => {
    document.documentElement.lang = "en";
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    applyTheme(theme);

    const savedLang = localStorage.getItem("siteLanguage");
    if (savedLang) {
      setCurrentLang(savedLang);
      if (savedLang === "es") setTimeout(() => applyGoogleTranslate("es"), 1500);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [theme]);

  const applyTheme = (newTheme) => {
    if (newTheme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  // ---------- Google Translate Logic (Keeping your exact logic) ----------
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

  return (
    
    <nav className={`fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-12 py-4 transition-all duration-500 border-b ${
      isScrolled ? "backdrop-blur-md bg-black/40 border-white/10 shadow-lg" : "bg-transparent border-transparent"
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO & BRAND */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="Gophora Logo"
              className={`h-8 w-auto transition-all duration-500 group-hover:scale-105 ${
                isScrolled ? "" : "filter brightness-0 invert dark:brightness-100 dark:invert-0"
              }`}
            />
           </Link>
        </div>

        {/* DESKTOP NAV LINKS (Requested section) */}
        <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.3em] font-bold text-white/80">
          <Link to="/about" className="hover:text-fuchsia-400 transition-colors">About</Link>
          <Link to="/faq" className="hover:text-fuchsia-400 transition-colors">FAQ</Link>
          <Link to="/organizations" className="hover:text-fuchsia-400 transition-colors">Organizations</Link>
        </div>

        {/* UTILITIES (Theme, Language, Mobile Menu) */}
        <div className="flex items-center gap-4">
          
          {/* Language switch */}
          <div className="hidden sm:flex rounded-xl p-1 bg-white/5 border border-white/10">
            <button
              onClick={() => changeLanguage("en")}
              disabled={isTranslating}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold tracking-widest transition-all ${
                currentLang === "en" ? "bg-fuchsia-500 text-white" : "text-white/40 hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage("es")}
              disabled={isTranslating}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold tracking-widest transition-all ${
                currentLang === "es" ? "bg-fuchsia-500 text-white" : "text-white/40 hover:text-white"
              }`}
            >
              ES
            </button>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all"
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>

          {/* Accept Mission Button (From Landing version) */}
          <Link to='/register' className="hidden lg:block px-5 py-2 border border-fuchsia-500/50 rounded-full text-[10px] uppercase tracking-widest text-white hover:bg-fuchsia-500 transition-all">
            Launch Your Mission
          </Link>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0a0514]/fb backdrop-blur-xl border-b border-white/10 p-8 flex flex-col gap-6 md:hidden animate-in slide-in-from-top duration-300">
          <a href="#vision" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold uppercase tracking-widest text-white">Vision</a>
          <a href="#process" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold uppercase tracking-widest text-white">Activation</a>
          <a href="#phora" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold uppercase tracking-widest text-white">PHORA</a>
          <hr className="border-white/5" />
          <div className="flex justify-between items-center">
             <span className="text-[10px] uppercase tracking-widest text-white/40">Language</span>
             <div className="flex gap-2">
                <button onClick={() => changeLanguage("en")} className={`px-4 py-2 rounded-lg text-xs font-bold ${currentLang === 'en' ? 'bg-fuchsia-500 text-white' : 'text-white/40'}`}>EN</button>
                <button onClick={() => changeLanguage("es")} className={`px-4 py-2 rounded-lg text-xs font-bold ${currentLang === 'es' ? 'bg-fuchsia-500 text-white' : 'text-white/40'}`}>ES</button>
             </div>
          </div>
        </div>
      )}

      {/* Hidden Google Translate element */}
      <div id="google_translate_element" style={{ display: "none" }}></div>
    </nav>
  );
}