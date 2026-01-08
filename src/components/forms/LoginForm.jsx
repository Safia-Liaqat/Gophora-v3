import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { onboardingUtils } from "../../contexts/onboarding.js";
import { ArrowRight, Lock, Mail } from "lucide-react";

export default function LoginForm() {
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user, login, loading: authLoading } = useAuth();
  const isDarkMode = document.documentElement.classList.contains("dark");

  useEffect(() => {
    if (!authLoading && user) {
      const userRole = user.role || localStorage.getItem("userRole");
      if (userRole === "provider") {
        navigate("/provider/dashboard", { replace: true });
      } else if (userRole === "seeker") {
        const isOnboardingCompleted = onboardingUtils.isOnboardingCompleted();
        if (isOnboardingCompleted) {
          navigate("/seeker/dashboard", { replace: true });
        } else {
          navigate("/seeker/onboarding", { replace: true });
        }
      }
    }
  }, [user, authLoading, navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!role) {
      setError("Select a role to activate.");
      return;
    }
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password, role);
      if (result.success) {
        localStorage.setItem("userRole", role);
        if (role === "seeker") {
          onboardingUtils.isOnboardingCompleted()
            ? navigate("/seeker/dashboard")
            : navigate("/seeker/onboarding");
        } else {
          navigate("/provider/dashboard");
        }
      }
    } catch (err) {
      setError(err.message || "Activation failed.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = isDarkMode
    ? "bg-white/5 border border-white/20 text-white placeholder-white/70 focus:border-[#FF4F00] focus:ring-[#FF4F00]"
    : "bg-white border-2 border-gray-300 text-black placeholder-black/50 focus:border-[#FF4F00] focus:ring-[#FF4F00]";

  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-[#FF4F00] border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-black text-sm">Checking authentication...</p>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-[#FF4F00] border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-black text-sm">Already logged in. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-[#FF4F00]/10 border border-[#FF4F00] text-[#FF4F00] p-3 rounded-xl text-[10px] text-center uppercase tracking-widest font-bold">
            {error}
          </div>
        )}

        {/* Role Selection */}
        <div
          className={`flex p-1 rounded-xl border ${
            isDarkMode
              ? "bg-black/20 border-white/10"
              : "bg-white border-gray-300"
          }`}
        >
          {["seeker", "provider"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] transition-all
                ${
                  role === r
                    ? "bg-[#FF4F00] text-white shadow-lg"
                    : "text-black hover:text-[#FF4F00]"
                }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Email Input */}
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 opacity-40 group-focus-within:text-[#FF4F00] transition-colors" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="MISSION EMAIL"
            className={`w-full pl-12 pr-4 py-4 rounded-2xl text-[10px] font-bold tracking-widest focus:outline-none focus:ring-2 transition-all uppercase ${inputClass}`}
            required
          />
        </div>

        {/* Password Input */}
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 opacity-40 group-focus-within:text-[#FF4F00] transition-colors" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="ACCESS KEY"
            className={`w-full pl-12 pr-4 py-4 rounded-2xl text-[10px] font-bold tracking-widest focus:outline-none focus:ring-2 transition-all uppercase ${inputClass}`}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 transition-all active:scale-95 bg-[#FF4F00] text-white hover:bg-[#E04600] shadow-xl"
        >
          {loading ? "Activating..." : "Activate Access"}
          {!loading && <ArrowRight size={14} />}
        </button>
      </form>
    </div>
  );
}
