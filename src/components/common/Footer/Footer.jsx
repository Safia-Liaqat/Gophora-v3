import React from "react";
import logo from "../../../assets/gophora-plomo-logo.png"
import { Link } from "react-router-dom";
import ScrollLink from "../ScrollLink";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaTiktok,
  FaEnvelope,
  FaGlobeAmericas,
  FaBrain,
  FaRocket,
  FaStar,
  FaMapMarkerAlt,
  FaHeadphonesAlt,
  FaQuestionCircle,
  FaBuilding,
  FaTelegramPlane,
} from 'react-icons/fa';
import { FaRegPaperPlane } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-t from-[#0A0A2A] to-[#0A0F2C] text-white py-12 px-4 sm:px-6 overflow-hidden border-t border-[#2D1B69]">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8B5CF6]/5 to-transparent"></div>
      
      <div className="relative z-[2] max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
          {/* --- Brand & Social --- */}
          <div className="space-y-4">
            <div className="cursor-pointer select-none">
              <ScrollLink to='/'>
                <img src={logo} alt="Gophora Logo" className="h-7 w-auto brightness-125" />
              </ScrollLink>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Activating human talent through real missions. GOPHORA connects people with purpose-driven opportunities that matter — from innovation to global impact.
            </p>
            <div className="flex space-x-3 pt-2">
              {[
                { icon: <FaTwitter className="text-gray-300 text-sm" />, href: "https://x.com/GophoraOfficial" },
                { icon: <FaInstagram className="text-gray-300 text-sm" />, href: "https://www.instagram.com/gophoraofficial" },
                { icon: <FaFacebookF className="text-gray-300 text-sm" />, href: "https://www.facebook.com/profile.php?id=100091940694658" },
                { icon: <FaTiktok className="text-gray-300 text-sm" />, href: "https://www.tiktok.com/@gophora" },
                { icon: <FaTelegramPlane className="text-gray-300 text-sm" />, href: "https://t.me/gophoraofficial" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-[#1E1B4B]/50 to-[#2D1B69]/50 border border-[#2D1B69] rounded-lg hover:bg-gradient-to-r hover:from-[#8B5CF6] hover:to-[#A78BFA] hover:border-transparent transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* --- Navigation --- */}
          <div>
            <h3 className="font-semibold mb-5 text-lg text-white flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]"></div>
              Navigation
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              {[
                { name: "Home", path: "/" },
                { name: "Contribute to solving global challenges", path: "/explore-missions" },
                { name: "For Organizations", path: "/organizations" },
                { name: "About", path: "/about" },
                { name: "FAQ", path: "/faq" },
              ].map((item, index) => (
                <li key={index}>
                  <ScrollLink 
                    to={item.path} 
                    className="hover:text-[#A78BFA] transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="text-[#A78BFA] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    {item.name}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          {/* --- About GOPHORA (Legal Section) --- */}
          <div>
            <h3 className="font-semibold mb-5 text-lg text-white flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]"></div>
              About GOPHORA
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              {[
                { name: "About GOPHORA", path: "/about" },
                { name: "Terms of Service", path: "/terms-of-service", external: true },
                { name: "Privacy Policy", path: "/privacy-policy", external: true },
                { name: "Cookie Policy", path: "/cookie-policy", external: true },
                { name: "Legal Notices", path: "/legal-notices", external: true },
              ].map((item, index) => (
                <li key={index}>
                  {item.external ? (
                    <a 
                      href={item.path}
                      className="hover:text-[#A78BFA] transition-all duration-300 flex items-center gap-2 group"
                    >
                      <span className="text-[#A78BFA] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      {item.name}
                    </a>
                  ) : (
                    <ScrollLink 
                      to={item.path} 
                      className="hover:text-[#A78BFA] transition-all duration-300 flex items-center gap-2 group"
                    >
                      <span className="text-[#A78BFA] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      {item.name}
                    </ScrollLink>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* --- Resources / More --- */}
          <div>
            <h3 className="font-semibold mb-5 text-lg text-white flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]"></div>
              Resources
            </h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              {[
                { 
                  icon: <FaQuestionCircle className="text-[#A78BFA] text-sm" />, 
                  name: "Help Center",
                  description: "Get support and answers",
                  path: "/help-center" 
                },
                { 
                  icon: <FaBuilding className="text-[#A78BFA] text-sm" />, 
                  name: "GOPHORA for Companies",
                  description: "Enterprise solutions",
                  path: "/enterprise" 
                },
              ].map((item, index) => (
                <li key={index}>
                  <ScrollLink 
                    to={item.path} 
                    className="group block hover:text-[#A78BFA] transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">{item.icon}</div>
                      <div>
                        <div className="font-medium group-hover:text-[#A78BFA]">{item.name}</div>
                        <div className="text-gray-500 text-xs mt-1">{item.description}</div>
                      </div>
                    </div>
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Contact & Newsletter --- */}
          <div>
            <h3 className="font-semibold mb-5 text-lg text-white flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]"></div>
              Stay Connected
            </h3>
            
            {/* Contact Info */}
            <ul className="space-y-3 text-gray-400 text-sm mb-6">
              {[
                { icon: <FaEnvelope className="text-[#A78BFA] text-sm" />, text: "contact@gophora.com" },
                { icon: <FaMapMarkerAlt className="text-[#A78BFA] text-sm" />, text: "Florida, USA" },
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div className="space-y-2">
              <p className="text-sm text-gray-300 mb-3">Get mission updates & opportunities</p>
              <div className="flex group">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-l-lg bg-gradient-to-r from-[#1E1B4B]/30 to-[#2D1B69]/30 border border-r-0 border-[#2D1B69] text-sm text-white focus:outline-none focus:border-[#A78BFA] transition-all"
                />
                <button className="bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white px-4 py-3 rounded-r-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                  <FaRegPaperPlane className="text-xs" />
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- Divider --- */}
        <div className="border-t border-[#2D1B69] mb-6"></div>

        {/* --- Bottom Bar with Legal Links --- */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <div className="mb-4 md:mb-0">
            <p>© 2025 GOPHORA INC. All rights reserved.</p>
            <p className="text-gray-600 text-[10px] mt-1">
              Activating talent. Accepting missions. Building the future.
            </p>
          </div>
          
          {/* Legal Links in a Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <a href="/terms-of-service" className="text-gray-400 hover:text-[#A78BFA] transition-colors">
              Terms of Service
            </a>
            <span className="text-gray-600">•</span>
            <a href="/privacy-policy" className="text-gray-400 hover:text-[#A78BFA] transition-colors">
              Privacy Policy
            </a>
            <span className="text-gray-600">•</span>
            <a href="/cookie-policy" className="text-gray-400 hover:text-[#A78BFA] transition-colors">
              Cookie Policy
            </a>
            <span className="text-gray-600">•</span>
            <a href="/legal-notices" className="text-gray-400 hover:text-[#A78BFA] transition-colors">
              Legal Notices
            </a>
          </div>
          
          <div className="mt-4 md:mt-0">
            <span className="text-[10px] tracking-wider text-gray-400 uppercase">
              <span className="text-[#A78BFA]">Nobody is Ordinary</span> when given a mission
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;