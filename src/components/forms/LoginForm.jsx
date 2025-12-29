// src/pages/LoginForm.jsx - FIXED VERSION
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { APIURL } from '../../services/api.js';
import { onboardingUtils } from '../../contexts/onboarding.js'

export default function LoginForm() {
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, login, loading: authLoading } = useAuth(); // Get loading state too
  
  // Check if user is already logged in - USE THE USER FROM AUTH CONTEXT
  useEffect(() => {
    // Only run this check when authLoading is false (auth context has loaded)
    if (!authLoading && user) {
      // User is already logged in, redirect to appropriate dashboard
      const userRole = user.role || localStorage.getItem('userRole');
      
      console.log('User already logged in, redirecting:', { 
        user, 
        userRole,
        hasToken: !!localStorage.getItem('token')
      });
      
      if (userRole === 'provider') {
        navigate('/provider/dashboard', { replace: true });
      } else if (userRole === 'seeker') {
        // For seekers, check onboarding status
        const isOnboardingCompleted = onboardingUtils.isOnboardingCompleted();
        if (isOnboardingCompleted) {
          navigate('/seeker/dashboard', { replace: true });
        } else {
          navigate('/seeker/onboarding', { replace: true });
        }
      }
    }
  }, [user, authLoading, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Helper function to handle pending applications
  const handlePendingApplication = async (token) => {
    const pendingAppId = localStorage.getItem("pending_application_id");
    
    if (pendingAppId) {
      try {
        const res = await fetch(`${APIURL}/applications/apply?opportunity_id=${pendingAppId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!res.ok) {
          throw new Error("Failed to submit pending application after login.");
        }
        
        const key = "applicationsSentDelta";
        const current = parseInt(localStorage.getItem(key) || "0", 10);
        localStorage.setItem(key, String(current + 1));
        
      } catch (err) {
        console.error("Error submitting pending application:", err);
      } finally {
        localStorage.removeItem("pending_application_id");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!role) {
      setError("Please select a role before logging in.");
      return;
    }

    setLoading(true);

    try {
      const result = await login(formData.email, formData.password, role);
      
      if (result.success) {
        // Store user role in localStorage for consistency
        localStorage.setItem('userRole', role);
        
        if (role === "seeker") {
          await handlePendingApplication(localStorage.getItem('token'));
          
          // Check if user needs to complete onboarding
          const isOnboardingCompleted = onboardingUtils.isOnboardingCompleted();
          console.log('Onboarding status after login:', {
            userId: localStorage.getItem('user_id'),
            isCompleted: isOnboardingCompleted,
            role: role
          });
          
          // Redirect based on onboarding status
          if (!isOnboardingCompleted) {
            console.log('Redirecting to onboarding for seeker');
            navigate("/seeker/onboarding");
          } else {
            console.log('Onboarding already completed, going to dashboard');
            navigate("/seeker/dashboard");
          }
        } else if (role === "provider") {
          console.log('Provider login, going to dashboard');
          navigate("/provider/dashboard");
        }
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Show loading while auth context is initializing
  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-[#7F4DFF] border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-gray-400 text-sm">Checking authentication...</p>
      </div>
    );
  }

  // If user is already logged in, show redirecting message
  if (user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-[#7F4DFF] border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-gray-400 text-sm">Already logged in. Redirecting...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
       {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg text-center">
          {error}
        </div>
      )}
      {/* Role Selection */}
      <div className="flex gap-3 mb-2">
        {["seeker", "provider"].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={`flex-1 py-2 rounded-xl font-medium transition-all duration-300
              ${
                role === r
                  ? "bg-gradient-to-r from-[#7F4DFF] to-[#9E7BFF] text-white shadow-[0_0_20px_rgba(158,123,255,0.5)]"
                  : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
              }`}
          >
            {r === "seeker" ? "Seeker" : "Provider"}
          </button>
        ))}
      </div>

      {/* Email */}
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email Address"
        required
        className="bg-white/5 border border-white/10 text-white placeholder-gray-400 
                   p-3 rounded-xl focus:outline-none focus:ring-2 
                   focus:ring-[#9E7BFF] transition-all duration-300"
      />

      {/* Password */}
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
        className="bg-white/5 border border-white/10 text-white placeholder-gray-400 
                   p-3 rounded-xl focus:outline-none focus:ring-2 
                   focus:ring-[#9E7BFF] transition-all duration-300"
      />

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl font-semibold text-white tracking-wide
                   bg-gradient-to-r from-[#7F4DFF] to-[#9E7BFF]
                   hover:shadow-[0_0_30px_rgba(158,123,255,0.6)]
                   transition-all duration-300
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );
}