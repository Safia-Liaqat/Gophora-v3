import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  
  // KEY FIX: Initialize theme to 'light' by default
  const [theme, setTheme] = useState("light");

  // ---------- Theme Synchronization ----------
  useEffect(() => {
    // Determine initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    
    let initialTheme;
    if (savedTheme) {
      // Use saved theme if exists
      initialTheme = savedTheme;
    } else {
      // Otherwise use system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      initialTheme = systemPrefersDark ? "dark" : "light";
      localStorage.setItem("theme", initialTheme);
    }
    
    // Apply to DOM immediately
    const html = document.documentElement;
    if (initialTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    
    // Update state
    setTheme(initialTheme);
    setIsThemeLoaded(true);
    
    // Rest of your existing code
    document.documentElement.lang = "en";
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const savedLang = localStorage.getItem("siteLanguage");
    if (savedLang) {
      setCurrentLang(savedLang);
      if (savedLang === "es") setTimeout(() => applyGoogleTranslate("es"), 1500);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme toggle function
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    
    // Apply immediately to DOM
    const html = document.documentElement;
    if (newTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    
    // Update state and localStorage
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // ---------- Google Translate Logic ----------
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

  // Don't render until theme is loaded to prevent mismatch
  if (!isThemeLoaded) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-12 py-4 transition-all duration-500 border-b backdrop-blur-md bg-white/70 border-fuchsia-100 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Gophora Logo" className="h-8 w-auto" />
          </div>
          {/* Show sun icon during loading */}
          <button className="p-2 rounded-full border border-fuchsia-100 bg-fuchsia-50 text-fuchsia-600">
            <SunIcon />
          </button>
        </div>
      </nav>
    );
  }

  // --- Theme Variables ---
  const isDark = theme === "dark";
  const textColor = isDark ? "text-white/80" : "text-[#2d124d]";
  const navBg = isDark 
    ? "backdrop-blur-md bg-black/40 border-white/10" 
    : "backdrop-blur-md bg-white/70 border-fuchsia-100 shadow-sm";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-12 py-4 transition-all duration-500 border-b ${navBg}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="Gophora Logo"
              className={`h-8 w-auto transition-all duration-500 group-hover:scale-105 ${
                isDark ? "" : "brightness-0" 
              }`}
            />
          </Link>
        </div>

        {/* DESKTOP NAV LINKS */}
        <div className={`hidden lg:flex gap-8 text-[10px] uppercase tracking-[0.3em] font-bold ${textColor}`}>
          <Link to="/about" className="hover:text-fuchsia-500 transition-colors">About</Link>
          <Link to="/faq" className="hover:text-fuchsia-500 transition-colors">FAQ</Link>
          <Link to="/organizations" className="hover:text-fuchsia-500 transition-colors">Organizations</Link>
        </div>

        {/* UTILITIES */}
        <div className="flex items-center gap-4">
          
          {/* Language Switch */}
          <div className={`hidden sm:flex rounded-xl p-1 border transition-colors ${
            isDark ? "bg-white/5 border-white/10" : "bg-fuchsia-50 border-fuchsia-100"
          }`}>
            <button
              onClick={() => changeLanguage("en")}
              disabled={isTranslating}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold tracking-widest transition-all ${
                currentLang === "en" 
                  ? "bg-fuchsia-500 text-white shadow-sm" 
                  : isDark ? "text-white/40 hover:text-white" : "text-fuchsia-900/40 hover:text-fuchsia-900"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage("es")}
              disabled={isTranslating}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold tracking-widest transition-all ${
                currentLang === "es" 
                  ? "bg-fuchsia-500 text-white shadow-sm" 
                  : isDark ? "text-white/40 hover:text-white" : "text-fuchsia-900/40 hover:text-fuchsia-900"
              }`}
            >
              ES
            </button>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full border transition-all ${
              isDark 
                ? "border-white/10 bg-white/5 hover:bg-white/10 text-white" 
                : "border-fuchsia-100 bg-fuchsia-50 text-fuchsia-600 hover:bg-fuchsia-100"
            }`}
          >
            {/* Standard: Moon in dark mode, Sun in light mode */}
            {isDark ? <MoonIcon /> : <SunIcon />}
          </button>

          {/* Launch Button */}
          <Link to='/register' className={`hidden sm:block px-5 py-2 border rounded-full text-[10px] uppercase tracking-widest transition-all ${
            isDark 
              ? "border-fuchsia-500/50 text-white hover:bg-fuchsia-500" 
              : "border-fuchsia-600 bg-fuchsia-600 text-white hover:shadow-lg"
          }`}>
            Launch Mission
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className={`lg:hidden transition-colors ${isDark ? "text-white" : "text-[#2d124d]"}`} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className={`absolute top-full left-0 w-full backdrop-blur-xl border-b p-8 flex flex-col gap-6 lg:hidden animate-in slide-in-from-top duration-300 ${
          isDark ? "bg-[#0a0514]/90 border-white/10 text-white" : "bg-white border-fuchsia-100 text-[#2d124d]"
        }`}>
          <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold uppercase tracking-widest">About</Link>
          <Link to="/faq" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold uppercase tracking-widest">FAQ</Link>
          <Link to="/organizations" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold uppercase tracking-widest">Organizations</Link>
          <hr className={isDark ? "border-white/5" : "border-fuchsia-100"} />
          
          <div className="flex justify-between items-center">
             <span className="text-[10px] uppercase tracking-widest opacity-40">Language</span>
             <div className="flex gap-2">
                <button onClick={() => changeLanguage("en")} className={`px-4 py-2 rounded-lg text-xs font-bold ${currentLang === 'en' ? 'bg-fuchsia-500 text-white' : 'opacity-40'}`}>EN</button>
                <button onClick={() => changeLanguage("es")} className={`px-4 py-2 rounded-lg text-xs font-bold ${currentLang === 'es' ? 'bg-fuchsia-500 text-white' : 'opacity-40'}`}>ES</button>
             </div>
          </div>
        </div>
      )}

      <div id="google_translate_element" style={{ display: "none" }}></div>
    </nav>
  );
}