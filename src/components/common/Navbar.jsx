import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

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
    const elements = [
      ".goog-te-banner-frame",
      ".skiptranslate",
      ".goog-te-gadget",
      ".VIpgJd-ZVi9od-ORHb",
      ".goog-tooltip",
      "#goog-gt-tt",
    ];
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full px-6 py-3 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-[#0a0514]/90 backdrop-blur-xl shadow-lg border-b border-fuchsia-500/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="group">
            <img
              src={logo}
              alt="Gophora Logo"
              className={`h-10 w-auto transition-all duration-500 group-hover:scale-105 ${
                isScrolled ? "" : "filter brightness-0 invert dark:brightness-100 dark:invert-0"
              }`}
            />
          </Link>
        </div>

        {/* Theme + Language */}
        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="relative flex items-center justify-center p-2.5 rounded-full transition-all duration-300 group bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 hover:bg-white/30 dark:hover:bg-black/30"
          >
            <div className="relative w-6 h-6 overflow-hidden">
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-500 transform ${
                  theme === "light" ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-0"
                }`}
              >
                <SunIcon />
              </div>
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-500 transform ${
                  theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
                }`}
              >
                <MoonIcon />
              </div>
            </div>
          </button>

          {/* Language switch */}
          <div className="flex rounded-xl p-1 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20">
            <button
              onClick={() => changeLanguage("en")}
              disabled={isTranslating}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold min-w-[60px] transition-all duration-300 ${
                currentLang === "en" ? "bg-fuchsia-500/80 text-white shadow-lg scale-105" : "text-white/90 hover:bg-white/20 dark:hover:bg-black/20"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage("es")}
              disabled={isTranslating}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold min-w-[60px] transition-all duration-300 ${
                currentLang === "es" ? "bg-fuchsia-500/80 text-white shadow-lg scale-105" : "text-white/90 hover:bg-white/20 dark:hover:bg-black/20"
              }`}
            >
              ES
            </button>
          </div>
        </div>
      </div>

      {/* Hidden Google Translate element */}
      <div
        id="google_translate_element"
        style={{ position: "absolute", top: "-100px", left: "0", width: "1px", height: "1px", opacity: 0, pointerEvents: "none", overflow: "hidden" }}
      ></div>
    </nav>
  );
}
