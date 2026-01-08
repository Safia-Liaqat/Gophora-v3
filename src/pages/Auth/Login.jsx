import React, { useEffect } from "react";
import LoginForm from "../../components/forms/LoginForm";
import { Link } from "react-router-dom";
import { ArrowRight, Lock } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Login() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-sans flex items-center justify-center px-4 py-12 relative overflow-hidden">

      {/* ORANGE BACKGROUND GLOWS */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[40%] rounded-full blur-[120px] bg-[#FF4F00]/10" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[40%] rounded-full blur-[120px] bg-[#FF4F00]/10" />
      </div>

      <div className="max-w-md w-full relative z-10" data-aos="zoom-in">

        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 bg-[#FF4F00]/10 text-[#FF4F00]">
            <Lock className="h-7 w-7" />
          </div>

          <h1 className="text-3xl md:text-4xl font-serif mb-2">
            Welcome Back
          </h1>

          <p className="text-xs uppercase tracking-[0.3em] text-black">
            Sign in to continue your mission
          </p>
        </div>

        {/* CARD */}
        <div className="p-8 rounded-[2.5rem] bg-white border border-[#FF4F00]/30 shadow-xl backdrop-blur-xl transition-all">

          <LoginForm />

          {/* DIVIDER */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#FF4F00]/30"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 text-[10px] uppercase tracking-widest bg-white text-[#FF4F00] italic">
                Mission Access
              </span>
            </div>
          </div>

          {/* REGISTER */}
          <div className="text-center">
            <p className="text-sm text-black mb-1">New to GOPHORA?</p>

            <Link
              to="/register"
              className="text-[#FF4F00] hover:text-black font-bold inline-flex items-center gap-2 group transition-all"
            >
              Start your mission
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* FOOTER */}
        <p className="text-center mt-8 text-[10px] uppercase tracking-[0.4em] text-[#333333] font-bold">
          Human Activation Infrastructure
        </p>
      </div>
    </div>
  );
}
