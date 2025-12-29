// src/pages/Auth/Register.jsx - Compact Version
import React, { useState } from "react";
import RegisterForm from "../../components/forms/RegisterForm";
import { 
  UserCircleIcon, 
  BuildingOffice2Icon, 
  SparklesIcon,
  ArrowRightIcon 
} from "@heroicons/react/24/outline";

export default function Register() {
  const [role, setRole] = useState("");
  const [hoveredRole, setHoveredRole] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0A2A] via-[#0A0F2C] to-[#1A1F3C] text-white px-4 py-8">
      {/* Card - More Compact */}
      <div className="relative max-w-md w-full bg-gradient-to-br from-[#0A0F2C] via-[#1E1B4B] to-[#0A0F2C] backdrop-blur-xl border border-[#2D1B69] p-6 rounded-2xl shadow-2xl shadow-[#8B5CF6]/10">
        {/* Header - Compact */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#8B5CF6]/20 to-[#A78BFA]/20 mb-3">
            <SparklesIcon className="h-6 w-6 text-[#A78BFA]" />
          </div>
          <h1 className="text-xl font-bold mb-1 bg-gradient-to-r from-white to-[#C4B5FD] bg-clip-text text-transparent">
            Join GOPHORA
          </h1>
          <p className="text-gray-400 text-sm">
            Start your mission journey
          </p>
        </div>

        {/* Role Selection - Compact */}
        {!role && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-[#1E1B4B]/30 to-[#2D1B69]/30 border border-[#2D1B69] mb-1">
                <span className="text-xs text-[#A78BFA]">Select your path</span>
              </div>
            </div>

            {/* Compact Role Cards */}
            <div className="grid grid-cols-1 gap-3">
              {/* Explorer Card - Compact */}
              <button
                onClick={() => setRole("seeker")}
                onMouseEnter={() => setHoveredRole("seeker")}
                onMouseLeave={() => setHoveredRole("")}
                className="group relative bg-gradient-to-br from-[#1E1B4B]/30 to-[#2D1B69]/30 border border-[#2D1B69] rounded-lg p-4 transition-all duration-200 hover:border-[#A78BFA]/40 hover:bg-gradient-to-br hover:from-[#1E1B4B]/40 hover:to-[#2D1B69]/40"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-[#8B5CF6]/20 to-[#A78BFA]/20">
                      <UserCircleIcon className="h-5 w-5 text-[#A78BFA]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">Become an Explorer</h3>
                      <p className="text-xs text-gray-400">Accept missions, build reputation</p>
                    </div>
                  </div>
                  <ArrowRightIcon className={`h-4 w-4 text-[#A78BFA] opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${hoveredRole === "seeker" ? 'opacity-100' : ''}`} />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span>• 24h activation</span>
                    <span>• No CV needed</span>
                  </div>
                  <span className="text-xs text-[#A78BFA] bg-[#8B5CF6]/10 px-2 py-0.5 rounded">
                    10K+ explorers
                  </span>
                </div>
              </button>

              {/* Organization Card - Compact */}
              <button
                onClick={() => setRole("provider")}
                onMouseEnter={() => setHoveredRole("provider")}
                onMouseLeave={() => setHoveredRole("")}
                className="group relative bg-gradient-to-br from-[#1E1B4B]/30 to-[#2D1B69]/30 border border-[#2D1B69] rounded-lg p-4 transition-all duration-200 hover:border-[#7C3AED]/40 hover:bg-gradient-to-br hover:from-[#1E1B4B]/40 hover:to-[#2D1B69]/40"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-[#7C3AED]/20 to-[#6D28D9]/20">
                      <BuildingOffice2Icon className="h-5 w-5 text-[#7C3AED]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm">Organization</h3>
                      <p className="text-xs text-gray-400">Post missions, find talent</p>
                    </div>
                  </div>
                  <ArrowRightIcon className={`h-4 w-4 text-[#7C3AED] opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${hoveredRole === "provider" ? 'opacity-100' : ''}`} />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span>• Global talent</span>
                    <span>• AI matching</span>
                  </div>
                  <span className="text-xs text-[#7C3AED] bg-[#7C3AED]/10 px-2 py-0.5 rounded">
                    500+ orgs
                  </span>
                </div>
              </button>
            </div>

            {/* Divider - Thin */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#2D1B69]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gradient-to-br from-[#0A0F2C] to-[#1E1B4B] text-gray-500 text-xs">or</span>
              </div>
            </div>

            {/* Login Link - Compact */}
            <div className="text-center">
              <p className="text-sm text-gray-400">
                Already registered?{" "}
                <a 
                  href="/login" 
                  className="text-[#A78BFA] hover:text-[#C4B5FD] font-medium transition-colors duration-200"
                >
                  Sign in
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Form Section */}
        {role && (
          <div className="animate-fadeIn">
            <div className="mb-4">
              <button
                onClick={() => setRole("")}
                className="flex items-center gap-1 text-gray-400 hover:text-gray-200 transition-colors duration-200 text-sm mb-3 group"
              >
                <ArrowRightIcon className="h-3 w-3 rotate-180" />
                <span>Back</span>
              </button>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]"></div>
                <h3 className="font-semibold text-white text-sm">
                  {role === "seeker" ? "Complete Explorer Profile" : "Complete Organization Profile"}
                </h3>
              </div>
            </div>
            <RegisterForm role={role} setRole={setRole} />
          </div>
        )}
      </div>
    </div>
  );
}