import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/gophora-plomo-logo.png";

export default function Navbar() {
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    // 1. Define the initialization function for Google
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,es',
        autoDisplay: false
      }, 'google_translate_element');
    };

    // 2. Add script if it doesn't exist
    const existingScript = document.getElementById('google-translate-script');
    if (!existingScript) {
      const addScript = document.createElement('script');
      addScript.id = 'google-translate-script';
      addScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      // Loading without async can sometimes help stability in React
      addScript.async = true; 
      document.body.appendChild(addScript);
    }
  }, []);

  const changeLanguage = (lng) => {
    const googleCombo = document.querySelector(".goog-te-combo");
    
    if (googleCombo) {
      // --- THE RESET LOGIC ---
      
      // If switching to English, we try to trigger Google's internal "Restore Original"
      if (lng === 'en') {
        const showOriginal = document.querySelector('.goog-te-banner-frame iframe');
        if (showOriginal && showOriginal.contentDocument) {
          const btn = showOriginal.contentDocument.getElementById(':1.restore');
          if (btn) btn.click();
        }
      }

      // Update the dropdown value
      googleCombo.value = lng;
      googleCombo.dispatchEvent(new Event("change"));
      setCurrentLang(lng);

      // --- COOKIE CLEANUP ---
      // We clear the googtrans cookie to prevent the engine from getting "stuck"
      setTimeout(() => {
        if (lng === 'en') {
          document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + document.domain;
        }
      }, 150);

    } else {
      console.warn("Translator engine still warming up...");
      // Optional: if it's really stuck, a quick refresh helps
      // window.location.reload(); 
    }
  };

  return (
    <nav className="w-full bg-[#0A0F2C] border-b border-[#1F254A] px-4 py-4 flex justify-between items-center sticky top-0 z-[100]">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="Gophora Logo" className="h-8 w-auto" />
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex bg-[#161B30] rounded-xl p-1 border border-[#1F254A]">
          <button
            onClick={() => changeLanguage("en")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
              currentLang === "en" 
                ? "bg-gradient-to-r from-[#6D5DD3] to-[#7E6DF4] text-white shadow-lg" 
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => changeLanguage("es")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
              currentLang === "es" 
                ? "bg-gradient-to-r from-[#6D5DD3] to-[#7E6DF4] text-white shadow-lg" 
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            ES
          </button>
        </div>
      </div>

      {/* Hidden element for Google Translate injection */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>
    </nav>
  );
}



