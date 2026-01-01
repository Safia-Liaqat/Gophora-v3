import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/gophora-plomo-logo.png";
import ThemeToggle from "./ThemeToggle"; 

export default function Navbar() {
  const [currentLang, setCurrentLang] = useState("en");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Initialize Google Translate with autoDisplay: false
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,es',
        autoDisplay: false,
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
      }, 'google_translate_element');
    };

    // Add script if it doesn't exist
    const existingScript = document.getElementById('google-translate-script');
    if (!existingScript) {
      const addScript = document.createElement('script');
      addScript.id = 'google-translate-script';
      addScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      addScript.async = true; 
      document.body.appendChild(addScript);
    }

    // Add scroll listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    
    // IMPORTANT: Hide Google Translate banner
    const hideTranslateBanner = () => {
      const banner = document.querySelector('.goog-te-banner-frame');
      if (banner) {
        banner.style.display = 'none';
      }
      
      // Also hide any iframes that might appear
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        if (iframe.src.includes('translate.google')) {
          iframe.style.display = 'none';
        }
      });
    };

    // Run immediately and set interval to keep hiding it
    hideTranslateBanner();
    const interval = setInterval(hideTranslateBanner, 1000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const changeLanguage = (lng) => {
    const googleCombo = document.querySelector(".goog-te-combo");
    
    if (googleCombo) {
      // Hide banner before changing language
      const hideBanner = () => {
        const banner = document.querySelector('.goog-te-banner-frame');
        if (banner) {
          banner.style.display = 'none';
        }
      };

      // Update the dropdown value
      googleCombo.value = lng;
      googleCombo.dispatchEvent(new Event("change"));
      setCurrentLang(lng);

      // Hide banner after change
      setTimeout(hideBanner, 100);

      // Clear cookies if switching to English
      if (lng === 'en') {
        setTimeout(() => {
          document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + document.domain;
        }, 150);
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] w-full px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background-secondary/90 backdrop-blur-md border-b border-border-color' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img 
              src={logo} 
              alt="Gophora Logo" 
              className={`h-7 w-auto transition-all duration-300 ${
                isScrolled ? '' : 'brightness-0 invert dark:invert-0'
              }`}
            />
          </Link>
        </div>

        {/* Theme Toggle and Language Switcher */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <div className={isScrolled ? '' : 'bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-xl p-1 border border-white/20 dark:border-black/20'}>
            <ThemeToggle transparent={!isScrolled} />
          </div>
          
          {/* Language Toggle */}
          <div className={`flex rounded-xl p-1 transition-all duration-300 ${
            isScrolled 
              ? 'bg-background-tertiary border border-border-color' 
              : 'bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-black/20'
          }`}>
            <button
              onClick={() => changeLanguage("en")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                currentLang === "en" 
                  ? "bg-accent text-white shadow-lg" 
                  : isScrolled 
                    ? "text-text-tertiary hover:text-text-secondary bg-background-secondary"
                    : "text-white/80 hover:text-white bg-transparent"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage("es")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                currentLang === "es" 
                  ? "bg-accent text-white shadow-lg" 
                  : isScrolled 
                    ? "text-text-tertiary hover:text-text-secondary bg-background-secondary"
                    : "text-white/80 hover:text-white bg-transparent"
              }`}
            >
              ES
            </button>
          </div>
        </div>

        {/* Hidden element for Google Translate injection */}
        <div id="google_translate_element" style={{ display: 'none' }}></div>
      </div>
    </nav>
  );
}