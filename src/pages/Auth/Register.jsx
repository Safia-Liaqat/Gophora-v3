import React, { useEffect, useState } from "react";
import { User, Building2, ChevronLeft, Mail, Lock, Briefcase, ArrowRight } from "lucide-react";

export default function Register() {
  const [role, setRole] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    verificationCode: "",
    password: "",
    confirmPassword: "",
    skills: "",
    country: "",
    state: "",
    city: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [generatedCode, setGeneratedCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Countdown timer for verification code
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Fetch countries list
  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch("https://countriesnow.space/api/v0.1/countries/states");
        const data = await res.json();
        if (!data.error && data.data) {
          setCountries(data.data);
        }
      } catch (err) {
        console.error("Country fetch failed", err);
      }
    }
    fetchCountries();
  }, []);

  // Fetch states when country changes
  const fetchStates = async (countryName) => {
    if (!countryName) return;
    try {
      const country = countries.find(c => c.name === countryName);
      if (country && country.states) {
        setStates(country.states);
        setFormData(prev => ({ ...prev, state: "", city: "" }));
        setCities([]);
      }
    } catch (err) {
      console.error("State fetch failed", err);
      setStates([]);
    }
  };

  // Fetch cities when state changes
  const fetchCities = async (stateName) => {
    if (!stateName || !formData.country) return;
    try {
      const res = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: formData.country, state: stateName }),
      });
      const data = await res.json();
      if (!data.error && data.data) {
        setCities(data.data);
        setFormData(prev => ({ ...prev, city: "" }));
      } else {
        setCities([]);
      }
    } catch (err) {
      console.error("City fetch failed", err);
      setCities([]);
    }
  };

  const theme = {
    bg: isDarkMode ? "bg-[#0a0a0a]" : "bg-[#f8f8f8]",
    card: isDarkMode ? "bg-[#1a1a1a]" : "bg-white",
    text: isDarkMode ? "text-white" : "text-gray-900",
    textMuted: isDarkMode ? "text-gray-400" : "text-gray-500",
    input: isDarkMode
      ? "bg-[#2a2a2a] text-white border-transparent placeholder:text-gray-500"
      : "bg-[#f5f5f5] text-gray-900 border-transparent placeholder:text-gray-400",
    explorerCard: isDarkMode
      ? "bg-[#1a1a1a] border-[#FF4F00] hover:bg-[#FF4F00]/10"
      : "bg-white border-[#FF4F00] hover:bg-[#FF4F00]/5",
    providerCard: "bg-[#FF4F00] border-[#FF4F00] text-white hover:opacity-95",
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.length < 3) return "Minimum 3 characters";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Invalid email format";
        return "";
      case "verificationCode":
        if (codeSent && !value.trim()) return "Verification code is required";
        if (value && value.length !== 6) return "Code must be 6 digits";
        return "";
      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "Minimum 8 characters";
        return "";
      case "confirmPassword":
        if (!value) return "Confirm password is required";
        if (value !== formData.password) return "Passwords do not match";
        return "";
      case "skills":
        if (!value) return "Skills required";
        return "";
      case "country":
        if (!value) return "Country required";
        return "";
      case "state":
        if (!value) return "State required";
        return "";
      case "city":
        if (!value) return "City required";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: validateField(field, value) }));

    // Check verification code
    if (field === "verificationCode" && value.length === 6) {
      if (value === generatedCode) {
        setIsVerified(true);
        setErrors(prev => ({ ...prev, verificationCode: "" }));
      } else {
        setIsVerified(false);
        setErrors(prev => ({ ...prev, verificationCode: "Invalid code" }));
      }
    }

    if (field === "country") {
      fetchStates(value);
    }
    if (field === "state") {
      fetchCities(value);
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(prev => ({ ...prev, [field]: validateField(field, formData[field]) }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(f => {
      const error = validateField(f, formData[f]);
      if (error) newErrors[f] = error;
    });
    return newErrors;
  };

  const sendVerificationCode = async () => {
    if (!formData.email || validateField("email", formData.email)) {
      setErrors(prev => ({ ...prev, email: validateField("email", formData.email) }));
      return;
    }

    setIsSending(true);
    
    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);

    // Simulate sending email (1 second delay)
    setTimeout(() => {
      setCodeSent(true);
      setCountdown(60);
      setIsSending(false);
      
      // Show code in a styled alert for demo purposes
      const alertDiv = document.createElement('div');
      alertDiv.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; background: #1a1a1a; color: white; padding: 20px 30px; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.3); z-index: 10000; border: 2px solid #FF4F00; max-width: 350px;">
          <div style="font-size: 18px; font-weight: bold; margin-bottom: 10px; color: #FF4F00;">📧 Verification Code Sent!</div>
          <div style="font-size: 14px; margin-bottom: 15px; opacity: 0.8;">Sent to: ${formData.email}</div>
          <div style="background: #2a2a2a; padding: 15px; border-radius: 12px; text-align: center; margin-bottom: 10px;">
            <div style="font-size: 12px; opacity: 0.6; margin-bottom: 5px;">Your verification code is:</div>
            <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #FF4F00; font-family: monospace;">${code}</div>
          </div>
          <div style="font-size: 11px; opacity: 0.5; text-align: center;">This is a demo - in production, this would be sent to your email</div>
        </div>
      `;
      document.body.appendChild(alertDiv);
      
      // Auto remove after 10 seconds
      setTimeout(() => {
        alertDiv.remove();
      }, 10000);
    }, 1000);
  };

  const handleSubmit = () => {
    // Check if email is verified
    if (codeSent && !isVerified) {
      alert("Please verify your email first!");
      return;
    }

    setTouched(Object.keys(formData).reduce((acc, f) => ({ ...acc, [f]: true }), {}));
    const formErrors = validateForm();
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      alert("Registration successful!");
      console.log(formData);
    }
  };

  const handleSignIn = () => {
    // Navigate to login page - Update this path to match your routing
    window.location.href = '/login';
  };

  const isFieldInvalid = (field) => touched[field] && errors[field];

  return (
    <div className={`min-h-screen ${theme.bg} flex items-center justify-center px-4 py-12`}>
      <div className="max-w-3xl w-full">
        <div className="absolute top-6 right-6">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`px-4 py-2 rounded-lg ${theme.card} ${theme.text} text-sm`}
          >
            {isDarkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {!role ? (
          <div className={`${theme.card} rounded-[3rem] shadow-2xl p-12`}>
            <div className="text-center mb-12">
              <h1 className={`text-4xl font-bold ${theme.text} mb-2`}>
                Welcome! How do you want to use <span className="text-[#FF4F00]">GOPHORA</span> today?
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <button
                onClick={() => setRole("seeker")}
                className={`p-12 rounded-[2rem] border-2 text-left transition-all transform hover:scale-105 ${theme.explorerCard} min-h-[280px] flex flex-col justify-between`}
              >
                <div>
                  <User className="text-[#FF4F00] mb-8" size={48} />
                  <h3 className={`text-2xl font-bold mb-4 ${theme.text}`}>I want to be an Explorer</h3>
                </div>
                <p className={`text-sm ${theme.textMuted} leading-relaxed`}>
                  Discover personalized opportunities for growth, learning, and contribution.
                </p>
              </button>

              <button
                onClick={() => setRole("provider")}
                className={`p-12 rounded-[2rem] border-2 text-left transition-all transform hover:scale-105 ${theme.providerCard} min-h-[280px] flex flex-col justify-between`}
              >
                <div>
                  <Building2 className="mb-8" size={48} />
                  <h3 className="text-2xl font-bold mb-4">Opportunity Provider</h3>
                </div>
                <p className="text-sm opacity-90 leading-relaxed">
                  Offer projects and missions to a network of activated humans.
                </p>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-8 max-w-md mx-auto">
              <div className={`absolute inset-0 flex items-center`}>
                <div className={`w-full border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>
              </div>
              <div className="relative flex justify-center">
                <span className={`px-4 text-[10px] uppercase tracking-widest ${theme.bg} ${theme.textMuted} italic`}>
                  Mission Access
                </span>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className={`text-sm ${theme.textMuted} mb-1`}>Already registered?</p>
              <button
                onClick={handleSignIn}
                className="text-[#FF4F00] hover:text-[#FF6A33] font-bold inline-flex items-center gap-2 group transition-all"
              >
                Sign in to continue
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ) : (
          <div className={`${theme.card} rounded-3xl shadow-2xl p-8`}>
            <button
              onClick={() => setRole("")}
              className={`flex items-center gap-2 text-sm mb-6 ${theme.textMuted} hover:text-[#FF4F00] transition-colors`}
            >
              <ChevronLeft size={16} />
              BACK TO SELECTION
            </button>

            <div className="text-center mb-8">
              <h1 className={`text-3xl font-bold ${theme.text} mb-2`}>
                Join the <span className="text-[#FF4F00] italic">Mission</span>
              </h1>
              <p className={`text-xs uppercase tracking-widest ${theme.textMuted}`}>
                Select your path to activation
              </p>
            </div>

            <div className="space-y-4">
              {/* Full Name */}
              <div className="relative">
                <User className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.textMuted}`} size={18} />
                <input
                  type="text"
                  placeholder="FULL NAME"
                  className={`w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4F00] transition-all text-sm ${theme.input}`}
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                />
                {isFieldInvalid("name") && <p className="text-sm text-[#FF4F00] mt-1">⚠ {errors.name}</p>}
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.textMuted}`} size={18} />
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  className={`w-full pl-12 pr-20 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4F00] transition-all text-sm ${theme.input}`}
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                />
                {!codeSent && (
                  <button
                    onClick={sendVerificationCode}
                    disabled={isSending}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FF4F00] text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-[#FF6A33] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSending ? "Sending..." : "Send Code"}
                  </button>
                )}
                {isFieldInvalid("email") && <p className="text-sm text-[#FF4F00] mt-1">⚠ {errors.email}</p>}
              </div>

              {/* Verification Code */}
              {codeSent && (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="VERIFICATION CODE (6 DIGITS)"
                    maxLength={6}
                    className={`w-full px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4F00] transition-all text-sm ${theme.input} ${
                      isVerified ? "border-2 border-green-500" : ""
                    }`}
                    value={formData.verificationCode}
                    onChange={(e) => handleChange("verificationCode", e.target.value)}
                    onBlur={() => handleBlur("verificationCode")}
                  />
                  {isVerified && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 text-xl">✓</span>
                  )}
                  {isFieldInvalid("verificationCode") && (
                    <p className="text-sm text-[#FF4F00] mt-1">⚠ {errors.verificationCode}</p>
                  )}
                  {isVerified && (
                    <p className="text-sm text-green-500 mt-1">✓ Email verified successfully!</p>
                  )}
                  <p className={`text-xs mt-1 ${theme.textMuted}`}>
                    {countdown > 0 ? `Resend code in ${countdown}s` : (
                      <button
                        onClick={sendVerificationCode}
                        className="text-[#FF4F00] hover:underline"
                      >
                        Resend verification code
                      </button>
                    )}
                  </p>
                </div>
              )}

              {/* Password Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.textMuted}`} size={18} />
                  <input
                    type="password"
                    placeholder="PASSWORD"
                    className={`w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4F00] transition-all text-sm ${theme.input}`}
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    onBlur={() => handleBlur("password")}
                  />
                  {isFieldInvalid("password") && (
                    <p className="text-xs text-[#FF4F00] mt-1">⚠ {errors.password}</p>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="CONFIRM"
                    className={`w-full px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4F00] transition-all text-sm ${theme.input}`}
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    onBlur={() => handleBlur("confirmPassword")}
                  />
                  {isFieldInvalid("confirmPassword") && (
                    <p className="text-xs text-[#FF4F00] mt-1">⚠ {errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              {/* Skills */}
              <div className="relative">
                <Briefcase className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.textMuted}`} size={18} />
                <input
                  type="text"
                  placeholder="SKILLS (COMMAS: REACT, PYTHON...)"
                  className={`w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4F00] transition-all text-sm ${theme.input}`}
                  value={formData.skills}
                  onChange={(e) => handleChange("skills", e.target.value)}
                  onBlur={() => handleBlur("skills")}
                />
                {isFieldInvalid("skills") && <p className="text-sm text-[#FF4F00] mt-1">⚠ {errors.skills}</p>}
              </div>

              {/* Location Row */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <select
                    className={`w-full px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4F00] transition-all text-sm ${theme.input}`}
                    value={formData.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    onBlur={() => handleBlur("country")}
                  >
                    <option value="">COUNTRY</option>
                    {countries.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {isFieldInvalid("country") && (
                    <p className="text-xs text-[#FF4F00] mt-1">⚠ {errors.country}</p>
                  )}
                </div>

                <div>
                  <select
                    className={`w-full px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4F00] transition-all text-sm ${theme.input}`}
                    value={formData.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    onBlur={() => handleBlur("state")}
                    disabled={!formData.country || states.length === 0}
                  >
                    <option value="">STATE</option>
                    {states.map((s) => (
                      <option key={s.name} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  {isFieldInvalid("state") && <p className="text-xs text-[#FF4F00] mt-1">⚠ {errors.state}</p>}
                </div>

                <div>
                  <select
                    className={`w-full px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4F00] transition-all text-sm ${theme.input}`}
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    onBlur={() => handleBlur("city")}
                    disabled={!formData.state || cities.length === 0}
                  >
                    <option value="">CITY</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {isFieldInvalid("city") && <p className="text-xs text-[#FF4F00] mt-1">⚠ {errors.city}</p>}
                </div>
              </div>

              {/* Register Button */}
              <button
                onClick={handleSubmit}
                className="w-full py-4 mt-6 bg-[#FF4F00] text-white rounded-xl font-bold hover:bg-[#FF6A33] transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider shadow-lg"
              >
                REGISTER
                <span className="text-lg">→</span>
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className={`absolute inset-0 flex items-center`}>
                  <div className={`w-full border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>
                </div>
                <div className="relative flex justify-center">
                  <span className={`px-4 text-[10px] uppercase tracking-widest ${theme.bg} ${theme.textMuted} italic`}>
                    Mission Access
                  </span>
                </div>
              </div>

              {/* Sign In Link */}
              <div className="text-center">
                <p className={`text-sm ${theme.textMuted} mb-1`}>Already registered?</p>
                <button
                  onClick={handleSignIn}
                  className="text-[#FF4F00] hover:text-[#FF6A33] font-bold inline-flex items-center gap-2 group transition-all"
                >
                  Sign in to continue
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}