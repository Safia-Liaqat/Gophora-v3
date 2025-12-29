import React from "react";
import LoginForm from "../../components/forms/LoginForm";
import { Link } from "react-router-dom";
import { ArrowRightIcon, LockClosedIcon } from "@heroicons/react/24/outline";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0A2A] via-[#0A0F2C] to-[#1A1F3C] text-white px-4 py-8">
      {/* Card */}
      <div className="relative max-w-md w-full bg-gradient-to-br from-[#0A0F2C] via-[#1E1B4B] to-[#0A0F2C] backdrop-blur-xl border border-[#2D1B69] p-6 rounded-2xl shadow-2xl shadow-[#8B5CF6]/10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#8B5CF6]/20 to-[#A78BFA]/20 mb-3">
            <LockClosedIcon className="h-6 w-6 text-[#A78BFA]" />
          </div>
          <h1 className="text-xl font-bold mb-1 bg-gradient-to-r from-white to-[#C4B5FD] bg-clip-text text-transparent">
            Welcome Back Explorer
          </h1>
          <p className="text-gray-400 text-sm">
            Sign in to continue your mission journey
          </p>
        </div>

        {/* Login Form */}
        <LoginForm />

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#2D1B69]"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 bg-gradient-to-br from-[#0A0F2C] to-[#1E1B4B] text-gray-500 text-xs">or</span>
          </div>
        </div>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            New to GOPHORA?{" "}
            <Link
              to="/register"
              className="text-[#A78BFA] hover:text-[#C4B5FD] font-medium transition-colors duration-200 inline-flex items-center gap-1 group"
            >
              Start your mission
              <ArrowRightIcon className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Get activated in less than 24 hours
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 pt-4 border-t border-[#2D1B69]/30">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-lg bg-gradient-to-b from-[#1E1B4B]/10 to-transparent">
              <div className="text-xs font-medium text-[#A78BFA]">10K+</div>
              <div className="text-[10px] text-gray-500">Explorers</div>
            </div>
            <div className="p-2 rounded-lg bg-gradient-to-b from-[#1E1B4B]/10 to-transparent">
              <div className="text-xs font-medium text-[#A78BFA]">500+</div>
              <div className="text-[10px] text-gray-500">Organizations</div>
            </div>
            <div className="p-2 rounded-lg bg-gradient-to-b from-[#1E1B4B]/10 to-transparent">
              <div className="text-xs font-medium text-[#A78BFA]">24h</div>
              <div className="text-[10px] text-gray-500">Activation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}