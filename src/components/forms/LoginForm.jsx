import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { onboardingUtils } from '../../contexts/onboarding.js';
import { ArrowRight, Lock, Mail } from 'lucide-react';

export default function LoginForm() {
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();
  const isDarkMode = document.documentElement.classList.contains('dark');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!role) { setError("Select a role to activate."); return; }
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password, role);
      if (result.success) {
        localStorage.setItem('userRole', role);
        if (role === "seeker") {
          onboardingUtils.isOnboardingCompleted() ? navigate("/seeker/dashboard") : navigate("/seeker/onboarding");
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
    ? "bg-white/5 border-white/10 text-white placeholder-gray-500" 
    : "bg-slate-50 border-fuchsia-100 text-[#2d124d] placeholder-slate-400";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3 rounded-xl text-[10px] text-center uppercase tracking-widest font-bold">
          {error}
        </div>
      )}

      {/* Role Toggle */}
      <div className={`flex p-1 rounded-xl border ${isDarkMode ? 'bg-black/20 border-white/5' : 'bg-slate-100 border-fuchsia-50'}`}>
        {["seeker", "provider"].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] transition-all
              ${role === r 
                ? "bg-fuchsia-600 text-white shadow-lg" 
                : "text-gray-500 hover:text-fuchsia-500"}`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="relative group">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 opacity-30 group-focus-within:text-fuchsia-500 transition-colors" />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="MISSION EMAIL"
          className={`w-full pl-12 pr-4 py-4 rounded-2xl text-[10px] font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 transition-all border uppercase ${inputClass}`}
          required
        />
      </div>

      <div className="relative group">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 opacity-30 group-focus-within:text-fuchsia-500 transition-colors" />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="ACCESS KEY"
          className={`w-full pl-12 pr-4 py-4 rounded-2xl text-[10px] font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 transition-all border uppercase ${inputClass}`}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-4 rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 transition-all active:scale-95
          ${isDarkMode ? 'bg-fuchsia-600 text-white shadow-fuchsia-900/20' : 'bg-[#2d124d] text-white hover:bg-fuchsia-600'} shadow-xl`}
      >
        {loading ? 'Activating...' : 'Activate Access'}
        {!loading && <ArrowRight size={14} />}
      </button>
    </form>
  );
}