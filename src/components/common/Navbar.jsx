import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/gophora-plomo-logo.png";
import { Sun, Moon } from "lucide-react"; // You'll need to install lucide-react: npm install lucide-react

// If you don't want to install lucide-react, you can use these SVG icons instead
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

  useEffect(() => {
    // Set HTML language to prevent auto-translation
    document.documentElement.lang = 'en';
    
    // Add scroll listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Check for language preference
    const savedLang = localStorage.getItem('siteLanguage');
    if (savedLang) {
      setCurrentLang(savedLang);
      if (savedLang === 'es') {
        // If Spanish is saved, trigger translation after page loads
        setTimeout(() => {
          applyGoogleTranslate('es');
        }, 1500);
      }
    }

    // Apply theme
    applyTheme(theme);

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [theme]);

  // Apply theme to document
  const applyTheme = (newTheme) => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('theme', newTheme);
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  // Load Google Translate
  const loadGoogleTranslate = () => {
    return new Promise((resolve) => {
      if (window.google && window.google.translate) {
        resolve();
        return;
      }

      window.googleTranslateElementInit = () => {
        if (!window.google || !window.google.translate) return;
        
        // Create translation element
        const translateElement = document.getElementById('google_translate_element');
        if (!translateElement) return;

        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,es',
          autoDisplay: false,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');
        
        // Wait a bit then resolve
        setTimeout(() => resolve(), 500);
      };

      // Load script if not already loaded
      if (!document.querySelector('script[src*="translate.google"]')) {
        const script = document.createElement('script');
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
      } else {
        setTimeout(() => resolve(), 500);
      }
    });
  };

  // Apply translation
  const applyGoogleTranslate = async (lang) => {
    setIsTranslating(true);
    
    try {
      // First load Google Translate
      await loadGoogleTranslate();
      
      // Wait for the select element to appear
      let attempts = 0;
      const maxAttempts = 30; // 3 seconds max
      
      const tryToTranslate = () => {
        const select = document.querySelector('.goog-te-combo');
        if (select) {
          // Set language and trigger change
          select.value = lang;
          select.dispatchEvent(new Event('change'));
          
          // Hide UI elements after translation
          setTimeout(hideGoogleUI, 1000);
          setIsTranslating(false);
          return true;
        }
        
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(tryToTranslate, 100);
        } else {
          setIsTranslating(false);
          console.error('Could not find translation select element');
        }
        return false;
      };
      
      tryToTranslate();
    } catch (error) {
      console.error('Translation error:', error);
      setIsTranslating(false);
    }
  };

  // Hide Google UI elements
  const hideGoogleUI = () => {
    const elements = [
      '.goog-te-banner-frame',
      '.skiptranslate',
      '.goog-te-gadget',
      '.VIpgJd-ZVi9od-ORHb',
      '.goog-tooltip',
      '#goog-gt-tt'
    ];
    
    elements.forEach(selector => {
      const el = document.querySelector(selector);
      if (el) {
        el.style.display = 'none';
        el.style.visibility = 'hidden';
        el.style.opacity = '0';
        el.style.height = '0';
        el.style.width = '0';
      }
    });
    
    // Fix body position
    document.body.style.top = '0';
    document.body.style.position = 'static';
  };

  const changeLanguage = async (lng) => {
    if (lng === currentLang || isTranslating) return;
    
    // Update state immediately
    setCurrentLang(lng);
    localStorage.setItem('siteLanguage', lng);
    
    if (lng === 'es') {
      // Set Spanish cookie
      document.cookie = `googtrans=/en/es; path=/; max-age=31536000`;
      
      // Apply translation
      await applyGoogleTranslate('es');
      
    } else {
      // Switch to English
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      
      // If Google Translate is loaded, switch back to English
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.value = 'en';
        select.dispatchEvent(new Event('change'));
        setTimeout(hideGoogleUI, 500);
      } else {
        // If not loaded, just reload the page
        window.location.reload();
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 lg:px-8 py-3 transition-all duration-500 ease-out ${
      isScrolled 
        ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg border-b border-gray-200 dark:border-gray-800' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="group">
            <img 
              src={logo} 
              alt="Gophora Logo" 
              className={`h-8 w-auto transition-all duration-500 group-hover:scale-105 ${
                isScrolled 
                  ? '' 
                  : 'filter brightness-0 invert dark:brightness-100 dark:invert-0'
              }`}
            />
          </Link>
        </div>

        {/* Theme Toggle and Language Switcher */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button - IMPROVED */}
          <button
            onClick={toggleTheme}
            className={`relative flex items-center justify-center p-2.5 rounded-xl transition-all duration-300 group ${
              isScrolled
                ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                : 'bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/30 dark:border-black/30 hover:bg-white/30 dark:hover:bg-black/30'
            }`}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <div className="relative w-6 h-6 overflow-hidden">
              {/* Sun Icon */}
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 transform ${
                theme === 'light' 
                  ? 'opacity-100 rotate-0 scale-100' 
                  : 'opacity-0 rotate-90 scale-0'
              }`}>
                <SunIcon />
              </div>
              {/* Moon Icon */}
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 transform ${
                theme === 'dark' 
                  ? 'opacity-100 rotate-0 scale-100' 
                  : 'opacity-0 -rotate-90 scale-0'
              }`}>
                <MoonIcon />
              </div>
            </div>
            
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 via-purple-500/0 to-pink-400/0 group-hover:from-blue-400/10 group-hover:via-purple-500/10 group-hover:to-pink-400/10 transition-all duration-500"></div>
          </button>
          
          {/* Language Toggle */}
          <div className={`flex rounded-xl p-1 transition-all duration-300 ${
            isScrolled 
              ? 'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700' 
              : 'bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/30 dark:border-black/30'
          }`}>
            <button
              onClick={() => changeLanguage("en")}
              disabled={isTranslating}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 min-w-[60px] ${
                currentLang === "en" 
                  ? "bg-blue-600 text-white shadow-lg transform scale-105" 
                  : isScrolled 
                    ? "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                    : "text-white/90 hover:text-white hover:bg-white/20 dark:hover:bg-black/20"
              } ${isTranslating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {isTranslating && currentLang === "en" ? (
                <div className="flex items-center justify-center gap-1.5">
                  <div className="h-1.5 w-1.5 bg-current rounded-full animate-pulse"></div>
                  <div className="h-1.5 w-1.5 bg-current rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="h-1.5 w-1.5 bg-current rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              ) : (
                "EN"
              )}
            </button>
            <button
              onClick={() => changeLanguage("es")}
              disabled={isTranslating}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 min-w-[60px] ${
                currentLang === "es" 
                  ? "bg-blue-600 text-white shadow-lg transform scale-105" 
                  : isScrolled 
                    ? "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                    : "text-white/90 hover:text-white hover:bg-white/20 dark:hover:bg-black/20"
              } ${isTranslating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {isTranslating && currentLang === "es" ? (
                <div className="flex items-center justify-center gap-1.5">
                  <div className="h-1.5 w-1.5 bg-current rounded-full animate-pulse"></div>
                  <div className="h-1.5 w-1.5 bg-current rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="h-1.5 w-1.5 bg-current rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              ) : (
                "ES"
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Google Translate element - hidden but functional */}
      <div id="google_translate_element" style={{ 
        position: 'absolute',
        top: '-100px',
        left: '0',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        opacity: '0',
        pointerEvents: 'none'
      }}></div>
    </nav>
  );
}