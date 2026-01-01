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
  FaMapMarkerAlt,
  FaQuestionCircle,
  FaBuilding,
  FaTelegramPlane,
} from 'react-icons/fa';
import { FaRegPaperPlane } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative bg-black text-white py-12 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-gray-800">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px),
                            linear-gradient(to bottom, #333 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="cursor-pointer select-none">
              <ScrollLink to='/'>
                <img src={logo} alt="Gophora Logo" className="h-8 w-auto" />
              </ScrollLink>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Activating human talent through real missions. GOPHORA connects people with purpose-driven opportunities that matter — from innovation to global impact.
            </p>
            
            {/* Social Links */}
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
                  className="w-9 h-9 flex items-center justify-center bg-gray-900 border border-gray-700 rounded-lg hover:bg-white hover:text-black transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            {/* Newsletter for desktop */}
            <div className="hidden lg:block space-y-2 pt-4">
              <p className="text-sm text-gray-400">Get mission updates & opportunities</p>
              <div className="flex group max-w-xs">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-l-lg bg-gray-900 border border-gray-700 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition-all"
                />
                <button className="bg-gray-200 text-black hover:bg-white px-4 py-3 rounded-r-lg text-sm font-medium transition-all duration-300 flex items-center gap-2">
                  <FaRegPaperPlane className="text-xs" />
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="space-y-6">
            <h3 className="font-semibold text-white text-lg flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              Navigation
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              {[
                { name: "Home", path: "/" },
                { name: "Explore Missions", path: "/explore-missions" },
                { name: "For Organizations", path: "/organizations" },
                { name: "About", path: "/about" },
                { name: "FAQ", path: "/faq" },
              ].map((item, index) => (
                <li key={index}>
                  <ScrollLink 
                    to={item.path} 
                    className="hover:text-white transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-xs">→</span>
                    {item.name}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-6">
            <h3 className="font-semibold text-white text-lg flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              Legal
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              {[
                { name: "Terms of Service", path: "/terms-of-service", external: true },
                { name: "Privacy Policy", path: "/privacy-policy", external: true },
                { name: "Cookie Policy", path: "/cookie-policy", external: true },
                { name: "Legal Notices", path: "/legal-notices", external: true },
                { name: "Contact Us", path: "/contact" },
              ].map((item, index) => (
                <li key={index}>
                  {item.external ? (
                    <a 
                      href={item.path}
                      className="hover:text-white transition-all duration-300 flex items-center gap-2 group"
                    >
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-xs">→</span>
                      {item.name}
                    </a>
                  ) : (
                    <ScrollLink 
                      to={item.path} 
                      className="hover:text-white transition-all duration-300 flex items-center gap-2 group"
                    >
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-xs">→</span>
                      {item.name}
                    </ScrollLink>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h3 className="font-semibold text-white text-lg flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              Contact
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-gray-300 text-sm" />
                <span>contact@gophora.com</span>
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-gray-300 text-sm" />
                <span>Florida, USA</span>
              </li>
            </ul>
            
            {/* Resources */}
            <div className="pt-4 border-t border-gray-800">
              <h4 className="font-medium text-gray-400 text-sm mb-3">Resources</h4>
              <ul className="space-y-2">
                {[
                  { icon: <FaQuestionCircle className="text-gray-300 text-sm" />, name: "Help Center", path: "/help-center" },
                  { icon: <FaBuilding className="text-gray-300 text-sm" />, name: "For Companies", path: "/enterprise" },
                ].map((item, index) => (
                  <li key={index}>
                    <ScrollLink 
                      to={item.path} 
                      className="hover:text-white transition-all duration-300 flex items-center gap-2 group"
                    >
                      {item.icon}
                      <span className="text-sm">{item.name}</span>
                    </ScrollLink>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Newsletter for mobile */}
            <div className="lg:hidden space-y-2 pt-4">
              <p className="text-sm text-gray-400">Get mission updates</p>
              <div className="flex group">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 rounded-l-lg bg-gray-900 border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 transition-all"
                />
                <button className="bg-gray-200 text-black hover:bg-white px-3 py-2 rounded-r-lg text-xs font-medium transition-all duration-300">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-6"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-gray-500 text-xs">© 2025 GOPHORA INC. All rights reserved.</p>
            <p className="text-gray-600 text-[10px] mt-1">
              Activating talent. Accepting missions. Building the future.
            </p>
          </div>
          
          {/* Slogan */}
          <div className="mb-4 md:mb-0">
            <span className="text-xs tracking-wider text-gray-400 uppercase">
              <span className="text-white">Nobody is Ordinary</span> when given a mission
            </span>
          </div>
          
          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <a href="/terms-of-service" className="text-gray-500 hover:text-white transition-colors">
              Terms
            </a>
            <span className="text-gray-700">•</span>
            <a href="/privacy-policy" className="text-gray-500 hover:text-white transition-colors">
              Privacy
            </a>
            <span className="text-gray-700">•</span>
            <a href="/cookie-policy" className="text-gray-500 hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;