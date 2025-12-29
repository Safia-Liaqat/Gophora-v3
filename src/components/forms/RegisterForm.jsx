// src/pages/RegisterForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  UserIcon, 
  EnvelopeIcon, 
  LockClosedIcon, 
  MapPinIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  LinkIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import { APIURL } from '../../services/api.js'
import { onboardingUtils } from '../../contexts/onboarding.js'
import { useAuth } from "../../contexts/AuthContext.jsx";

export default function RegisterForm({ role, setRole }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    state: "",
    city: "",
    skills: "",
    organizationName: "",
    website: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [error, setError] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formFilled, setFormFilled] = useState(false);

  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  // Check if user is already logged in
  useEffect(() => {
    if (!authLoading && user) {
      // User is already logged in, redirect to appropriate dashboard
      const userRole = user.role || localStorage.getItem('userRole');
      
      if (userRole === 'provider') {
        navigate('/provider/dashboard', { replace: true });
      } else if (userRole === 'seeker') {
        const isOnboardingCompleted = onboardingUtils.isOnboardingCompleted();
        if (isOnboardingCompleted) {
          navigate('/seeker/dashboard', { replace: true });
        } else {
          navigate('/seeker/onboarding', { replace: true });
        }
      }
    }
  }, [user, authLoading, navigate]);

  // Show loading while auth context is initializing
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // If user is already logged in, show redirecting message
  if (user) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-white">Already logged in. Redirecting...</div>
      </div>
    );
  }

  // ✅ Check if form is sufficiently filled
  useEffect(() => {
    const requiredFields = ["name", "email", "password", "confirmPassword", "country", "state", "city"];
    const isFilled = requiredFields.every(field => formData[field]?.trim());
    setFormFilled(isFilled);
  }, [formData]);

  // ✅ Fetch countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://countriesnow.space/api/v0.1/countries/states");
        if (!res.ok) throw new Error("Failed to fetch countries.");
        const data = await res.json();
        if (data.data) {
          setCountries(data.data);
        }
      } catch (err) {
        console.error("Error fetching countries:", err);
        setError("Unable to load countries. Please refresh.");
      }
    };
    fetchCountries();
  }, []);

  // ✅ Update states when a country is selected
  useEffect(() => {
    if (!formData.country) {
      setStates([]);
      return;
    }
    setLoadingStates(true);
    const selectedCountry = countries.find(
      (c) => c.name === formData.country
    );
    if (selectedCountry && selectedCountry.states) {
      setStates(selectedCountry.states);
    } else {
      setStates([]);
    }
    setLoadingStates(false);
  }, [formData.country, countries]);

  // ✅ Update cities when a state is selected
  useEffect(() => {
    if (!formData.state || !formData.country) {
      setCities([]);
      return;
    }
    
    const fetchCities = async () => {
      setLoadingCities(true);
      try {
        const res = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country: formData.country,
            state: formData.state,
          }),
        });
        const data = await res.json();
        if (data.data) {
          setCities(data.data.sort());
        } else {
          setCities([]);
        }
      } catch (err) {
        console.error("Error fetching cities:", err);
        setCities([]);
      } finally {
        setLoadingCities(false);
      }
    };
    
    fetchCities();
  }, [formData.state, formData.country]);

  // ✅ Check password strength
  useEffect(() => {
    const password = formData.password;
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
  }, [formData.password]);

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "from-gray-600 to-gray-600";
    if (passwordStrength === 1) return "from-red-500 to-red-600";
    if (passwordStrength === 2) return "from-yellow-500 to-yellow-600";
    if (passwordStrength === 3) return "from-blue-500 to-blue-600";
    return "from-green-500 to-emerald-600";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "Weak";
    if (passwordStrength === 1) return "Too weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    return "Strong";
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Validate password strength
    if (passwordStrength < 2) {
      setError("Please use a stronger password (min. 8 chars with mix of letters, numbers)");
      setLoading(false);
      return;
    }

    const payload = {
      email: formData.email,
      password: formData.password,
      full_name: formData.name,
      skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : [],
      interests: [],
      experience: "Entry Level"
    };

    try {
      const response = await fetch(`${APIURL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Registration failed. Please try again.");
      }

      const result = await response.json();
      console.log('Registration successful:', result);
      
      // Store user ID from registration response
      if (result.user?.id) {
        localStorage.setItem('user_id', result.user.id);
      } else if (result.user_id) {
        localStorage.setItem('user_id', result.user_id);
      }
      
      // NEW USER - ALWAYS REDIRECT TO ONBOARDING FOR SEEKERS
      // Reset any previous onboarding completion for this user
      onboardingUtils.resetOnboarding();
      
      if (role === "seeker") {
        // New seeker must complete onboarding first
        navigate('/seeker/onboarding');
      } else {
        // Provider goes directly to dashboard
        navigate('/provider/dashboard');
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    {
      name: "name",
      type: "text",
      placeholder: "Full Name",
      icon: <UserIcon className="h-5 w-5" />,
      colSpan: "col-span-1"
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email Address",
      icon: <EnvelopeIcon className="h-5 w-5" />,
      colSpan: "col-span-1"
    },
    {
      name: "password",
      type: "password",
      placeholder: "Create Password",
      icon: <LockClosedIcon className="h-5 w-5" />,
      colSpan: "col-span-1 md:col-span-2"
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      icon: <LockClosedIcon className="h-5 w-5" />,
      colSpan: "col-span-1 md:col-span-2"
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-[#8B5CF6]/20 to-[#A78BFA]/20 mb-3">
            <SparklesIcon className="h-6 w-6 text-[#A78BFA]" />
          </div>
          <h2 className="text-xl font-bold text-white mb-1">
            {role === "seeker" ? "Become an Explorer" : "Register Organization"}
          </h2>
          <p className="text-gray-400 text-sm">
            {role === "seeker" 
              ? "Start your first mission in 24 hours" 
              : "Access activated talent worldwide"}
          </p>
        </div>

        {error && (
          <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/30 text-red-300 p-3 rounded-lg text-sm flex items-center gap-2 animate-fade-in">
            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
              <span className="text-xs">!</span>
            </div>
            {error}
          </div>
        )}

        {/* Common Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {inputFields.map((field) => (
            <div key={field.name} className={`relative group ${field.colSpan}`}>
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#A78BFA] transition-colors duration-300">
                {field.icon}
              </div>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
                className="w-full bg-gradient-to-br from-[#1E1B4B]/30 to-[#2D1B69]/20 border border-[#2D1B69] text-white placeholder-gray-500 
                           pl-10 pr-3 py-2.5 rounded-lg focus:outline-none focus:border-[#A78BFA]/50 
                           focus:ring-1 focus:ring-[#A78BFA]/20 transition-all duration-300 text-sm"
              />
            </div>
          ))}
        </div>

        {/* Password Strength */}
        {formData.password && (
          <div className="space-y-1 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">Password strength:</span>
              <span className={`text-xs font-medium ${
                passwordStrength >= 4 ? "text-green-400" : 
                passwordStrength >= 3 ? "text-blue-400" : 
                passwordStrength >= 2 ? "text-yellow-400" : "text-red-400"
              }`}>
                {getPasswordStrengthText()}
              </span>
            </div>
            <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${getPasswordStrengthColor()} transition-all duration-500`}
                style={{ width: `${passwordStrength * 25}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Location Fields - Compact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              name: "country",
              label: "Country",
              icon: <MapPinIcon className="h-4 w-4" />,
              disabled: false,
              options: countries.map(c => c.name),
              loading: false
            },
            {
              name: "state",
              label: "State",
              icon: <MapPinIcon className="h-4 w-4" />,
              disabled: !formData.country || loadingStates,
              options: states.map(s => s.name),
              loading: loadingStates
            },
            {
              name: "city",
              label: "City",
              icon: <MapPinIcon className="h-4 w-4" />,
              disabled: !formData.state || loadingCities,
              options: cities,
              loading: loadingCities
            }
          ].map((location) => (
            <div key={location.name} className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {location.icon}
              </div>
              <select
                name={location.name}
                value={formData[location.name]}
                onChange={(e) => {
                  if (location.name === "country") {
                    setFormData({ ...formData, country: e.target.value, state: "", city: "" });
                  } else if (location.name === "state") {
                    setFormData({ ...formData, state: e.target.value, city: "" });
                  } else {
                    handleChange(e);
                  }
                }}
                required
                disabled={location.disabled}
                className="w-full bg-gradient-to-br from-[#1E1B4B]/30 to-[#2D1B69]/20 border border-[#2D1B69] text-white text-sm
                           pl-9 pr-7 py-2.5 rounded-lg focus:outline-none focus:border-[#A78BFA]/50 
                           focus:ring-1 focus:ring-[#A78BFA]/20 transition-all duration-300 disabled:opacity-50
                           appearance-none cursor-pointer [&>option]:bg-gray-900 [&>option]:text-white"
              >
                <option value="" className="bg-gray-900 text-gray-400">
                  {location.loading 
                    ? "Loading..." 
                    : location.disabled && location.name !== "country"
                    ? "Select first"
                    : location.label}
                </option>
                {location.options.map((option, index) => (
                  <option key={`${option}-${index}`} value={option} className="bg-gray-900 text-white">
                    {option}
                  </option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Conditional Fields */}
        {role === "seeker" && (
          <div className="relative group">
            <div className="absolute left-3 top-3 text-gray-400">
              <BriefcaseIcon className="h-4 w-4" />
            </div>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Skills (comma separated) - e.g. React, Python, Design"
              rows="2"
              className="w-full bg-gradient-to-br from-[#1E1B4B]/30 to-[#2D1B69]/20 border border-[#2D1B69] text-white placeholder-gray-500 text-sm
                         pl-10 pr-3 py-2.5 rounded-lg focus:outline-none focus:border-[#A78BFA]/50 
                         focus:ring-1 focus:ring-[#A78BFA]/20 transition-all duration-300"
            />
          </div>
        )}

        {role === "provider" && (
          <div className="space-y-3">
            <div className="relative group">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <BuildingOfficeIcon className="h-4 w-4" />
              </div>
              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                placeholder="Organization Name"
                required
                className="w-full bg-gradient-to-br from-[#1E1B4B]/30 to-[#2D1B69]/20 border border-[#2D1B69] text-white placeholder-gray-500 text-sm
                           pl-10 pr-3 py-2.5 rounded-lg focus:outline-none focus:border-[#A78BFA]/50 
                           focus:ring-1 focus:ring-[#A78BFA]/20 transition-all duration-300"
              />
            </div>
            <div className="relative group">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <LinkIcon className="h-4 w-4" />
              </div>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="Website (optional)"
                className="w-full bg-gradient-to-br from-[#1E1B4B]/30 to-[#2D1B69]/20 border border-[#2D1B69] text-white placeholder-gray-500 text-sm
                           pl-10 pr-3 py-2.5 rounded-lg focus:outline-none focus:border-[#A78BFA]/50 
                           focus:ring-1 focus:ring-[#A78BFA]/20 transition-all duration-300"
              />
            </div>
          </div>
        )}

        {/* Terms */}
        <div className="flex items-start gap-2 p-3 bg-gradient-to-r from-[#1E1B4B]/10 to-[#2D1B69]/10 rounded-lg border border-[#2D1B69]/30">
          <CheckCircleIcon className="h-4 w-4 text-[#A78BFA] mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-400 leading-relaxed">
            By registering, you agree to our Terms & Privacy Policy.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Form Progress</span>
          <span>{formFilled ? "Ready to submit" : "Fill required fields"}</span>
        </div>
        <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] transition-all duration-500`}
            style={{ width: formFilled ? '100%' : '50%' }}
          ></div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !formFilled}
          className={`group relative w-full py-3 rounded-lg font-semibold text-white
                     bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#C4B5FD]
                     transition-all duration-300 overflow-hidden ${
                       loading ? "opacity-70 cursor-not-allowed" : 
                       !formFilled ? "opacity-50 cursor-not-allowed" : 
                       "hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:scale-[1.01]"
                     }`}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          
          <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                {role === "seeker" ? "Start Mission Now" : "Register Organization"}
                <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </span>
        </button>

        {/* Login Link */}
        <div className="text-center pt-4 border-t border-[#2D1B69]/30">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="text-[#A78BFA] hover:text-[#C4B5FD] font-medium transition-colors duration-300 inline-flex items-center gap-1"
            >
              Sign in here
              <ArrowRightIcon className="h-3 w-3" />
            </Link>
          </p>
        </div>

        {/* Back Button */}
        <button
          type="button"
          onClick={() => setRole("")}
          className="w-full text-center text-gray-400 hover:text-gray-200 transition-colors duration-300 flex items-center justify-center gap-1.5 text-sm"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          Back to role selection
        </button>
      </form>

      {/* Add to your CSS */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}