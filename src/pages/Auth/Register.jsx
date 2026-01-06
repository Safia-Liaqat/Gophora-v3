import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User, Building2 } from "lucide-react";
import AOS from "aos";

export default function Register() {
  const [role, setRole] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains("dark"));

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    verificationCode: "",
    password: "",
    confirmPassword: "",
    skills: "",
    dob: "",
    country: "",
    city: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Initialize AOS and dark mode observer
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

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
        const res = await fetch("https://countriesnow.space/api/v0.1/countries/positions");
        const data = await res.json();
        if (!data.error && data.data) {
          const countryNames = data.data.map(c => c.name).sort();
          setCountries(countryNames);
        }
      } catch (err) {
        console.error("Country fetch failed", err);
      }
    }
    fetchCountries();
  }, []);

  // Fetch cities when country changes
  const fetchCities = async (country) => {
    if (!country) return;
    try {
      const res = await fetch("https://countriesnow.space/api/v0.1/countries/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country }),
      });
      const data = await res.json();
      if (!data.error && data.data) {
        const sortedCities = data.data.sort();
        setCities(sortedCities);
        setFormData(prev => ({ ...prev, city: sortedCities[0] || "" }));
      } else {
        setCities([]);
        setFormData(prev => ({ ...prev, city: "" }));
      }
    } catch (err) {
      console.error("City fetch failed", err);
      setCities([]);
      setFormData(prev => ({ ...prev, city: "" }));
    }
  };

  const theme = {
    bg: isDarkMode ? "bg-[#000000] text-white" : "bg-[#FFFFFF] text-black",
    card: isDarkMode
      ? "bg-[#333333]/20 border-white/10 shadow-2xl"
      : "bg-white border-[#333333]/10 shadow-xl",
    explorerCard: isDarkMode
      ? "bg-[#111111] border-[#FF4F00] hover:bg-[#FF4F00]/10"
      : "bg-white border-[#FF4F00] hover:bg-[#FF4F00]/5",
    providerCard: "bg-[#FF4F00] border-[#FF4F00] text-white hover:opacity-95",
    input: isDarkMode
      ? "bg-[#333333] text-white border-white/20 placeholder:text-white/50"
      : "bg-white text-black border-[#333333] placeholder:text-black/40",
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
      case "dob":
        if (!value) return "DOB required";
        return "";
      case "country":
        if (!value) return "Country required";
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

    if (field === "country") {
      fetchCities(value);
      setFormData(prev => ({ ...prev, city: "" }));
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

  const sendVerificationCode = () => {
    if (!formData.email || validateField("email", formData.email)) {
      setErrors(prev => ({ ...prev, email: validateField("email", formData.email) }));
      return;
    }
    setCodeSent(true);
    setCountdown(60);
    alert(`Verification code sent to ${formData.email} (Demo)`);
  };

  const handleSubmit = () => {
    setTouched(Object.keys(formData).reduce((acc, f) => ({ ...acc, [f]: true }), {}));
    const formErrors = validateForm();
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      alert("Registration successful! (Demo)");
      console.log(formData);
    }
  };

  const isFieldInvalid = (field) => touched[field] && errors[field];

  return (
    <div className={`min-h-screen ${theme.bg} flex items-center justify-center px-4 py-12`}>
      <div className="max-w-2xl w-full">
        {!role && (
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold">
              Welcome! How do you want to use <span className="text-[#FF4F00]">GOPHORA</span> today?
            </h1>
          </div>
        )}

        <div className={`p-8 rounded-[2.5rem] border ${theme.card}`}>
          {!role ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setRole("seeker")}
                className={`p-8 rounded-3xl border text-left transition-all ${theme.explorerCard}`}
              >
                <User className="text-[#FF4F00] mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">I want to be an Explorer</h3>
                <p className="text-sm opacity-70">
                  Discover personalized opportunities for growth, learning, and contribution.
                </p>
              </button>

              <button
                onClick={() => setRole("provider")}
                className={`p-8 rounded-3xl border text-left transition-all ${theme.providerCard}`}
              >
                <Building2 className="mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Opportunity Provider</h3>
                <p className="text-sm opacity-90">
                  Offer projects and missions to a network of activated humans.
                </p>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className={`w-full p-3 rounded border focus:outline-none focus:ring-2 ${
                    isFieldInvalid("name") ? "border-[#FF4F00] focus:ring-[#FF4F00]" : "border-[#333333] focus:ring-[#FF4F00]"
                  } ${theme.input}`}
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                />
                {isFieldInvalid("name") && <p className="text-sm text-[#FF4F00]">⚠ {errors.name}</p>}
              </div>

              {/* Email */}
              <div className="relative">
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className={`w-full p-3 rounded border focus:outline-none focus:ring-2 ${
                    isFieldInvalid("email") ? "border-[#FF4F00] focus:ring-[#FF4F00]" : "border-[#333333] focus:ring-[#FF4F00]"
                  } ${theme.input}`}
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                />
                {!codeSent && (
                  <button
                    onClick={sendVerificationCode}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FF4F00] text-white px-3 py-1 rounded text-xs"
                  >
                    Send Code
                  </button>
                )}
                {isFieldInvalid("email") && <p className="text-sm text-[#FF4F00]">⚠ {errors.email}</p>}
              </div>

              {/* Verification Code */}
              {codeSent && (
                <div>
                  <label className="block text-sm font-medium mb-1">Verification Code *</label>
                  <input
                    type="text"
                    placeholder="6-digit code"
                    maxLength={6}
                    className={`w-full p-3 rounded border focus:outline-none focus:ring-2 ${
                      isFieldInvalid("verificationCode")
                        ? "border-[#FF4F00] focus:ring-[#FF4F00]"
                        : "border-[#333333] focus:ring-[#FF4F00]"
                    } ${theme.input}`}
                    value={formData.verificationCode}
                    onChange={(e) => handleChange("verificationCode", e.target.value)}
                    onBlur={() => handleBlur("verificationCode")}
                  />
                  {isFieldInvalid("verificationCode") && <p className="text-sm text-[#FF4F00]">⚠ {errors.verificationCode}</p>}
                  <p className="text-xs opacity-50">{countdown > 0 ? `Resend code in ${countdown}s` : "You can resend code now."}</p>
                </div>
              )}

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-1">Password *</label>
                <input
                  type="password"
                  placeholder="********"
                  className={`w-full p-3 rounded border focus:outline-none focus:ring-2 ${
                    isFieldInvalid("password") ? "border-[#FF4F00] focus:ring-[#FF4F00]" : "border-[#333333] focus:ring-[#FF4F00]"
                  } ${theme.input}`}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  onBlur={() => handleBlur("password")}
                />
                {isFieldInvalid("password") && <p className="text-sm text-[#FF4F00]">⚠ {errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium mb-1">Confirm Password *</label>
                <input
                  type="password"
                  placeholder="********"
                  className={`w-full p-3 rounded border focus:outline-none focus:ring-2 ${
                    isFieldInvalid("confirmPassword") ? "border-[#FF4F00] focus:ring-[#FF4F00]" : "border-[#333333] focus:ring-[#FF4F00]"
                  } ${theme.input}`}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  onBlur={() => handleBlur("confirmPassword")}
                />
                {isFieldInvalid("confirmPassword") && <p className="text-sm text-[#FF4F00]">⚠ {errors.confirmPassword}</p>}
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-medium mb-1">Skills *</label>
                <input
                  type="text"
                  placeholder="e.g., React, Node, Design"
                  className={`w-full p-3 rounded border focus:outline-none focus:ring-2 ${
                    isFieldInvalid("skills") ? "border-[#FF4F00] focus:ring-[#FF4F00]" : "border-[#333333] focus:ring-[#FF4F00]"
                  } ${theme.input}`}
                  value={formData.skills}
                  onChange={(e) => handleChange("skills", e.target.value)}
                  onBlur={() => handleBlur("skills")}
                />
                {isFieldInvalid("skills") && <p className="text-sm text-[#FF4F00]">⚠ {errors.skills}</p>}
              </div>

              {/* DOB */}
              <div>
                <label className="block text-sm font-medium mb-1">Date of Birth *</label>
                <input
                  type="date"
                  className={`w-full p-3 rounded border focus:outline-none focus:ring-2 ${
                    isFieldInvalid("dob") ? "border-[#FF4F00] focus:ring-[#FF4F00]" : "border-[#333333] focus:ring-[#FF4F00]"
                  } ${theme.input}`}
                  value={formData.dob}
                  onChange={(e) => handleChange("dob", e.target.value)}
                  onBlur={() => handleBlur("dob")}
                />
                {isFieldInvalid("dob") && <p className="text-sm text-[#FF4F00]">⚠ {errors.dob}</p>}
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium mb-1">Country *</label>
                <select
                  className={`w-full p-3 rounded border focus:outline-none focus:ring-2 ${
                    isFieldInvalid("country") ? "border-[#FF4F00] focus:ring-[#FF4F00]" : "border-[#333333] focus:ring-[#FF4F00]"
                  } ${theme.input}`}
                  value={formData.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  onBlur={() => handleBlur("country")}
                >
                  <option value="">Select Country</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {isFieldInvalid("country") && <p className="text-sm text-[#FF4F00]">⚠ {errors.country}</p>}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium mb-1">City *</label>
                <select
                  className={`w-full p-3 rounded border focus:outline-none focus:ring-2 ${
                    isFieldInvalid("city") ? "border-[#FF4F00] focus:ring-[#FF4F00]" : "border-[#333333] focus:ring-[#FF4F00]"
                  } ${theme.input}`}
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  onBlur={() => handleBlur("city")}
                  disabled={!formData.country || cities.length === 0}
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {isFieldInvalid("city") && <p className="text-sm text-[#FF4F00]">⚠ {errors.city}</p>}
              </div>

              {/* Register button */}
              <button
                onClick={handleSubmit}
                className="w-full py-3 mt-4 bg-[#FF4F00] text-white rounded-full font-bold hover:opacity-90 transition-all"
              >
                Register
              </button>

              {/* Footer */}
              <p className="text-xs mt-4 opacity-60 text-center">
                Already registered?{" "}
                <Link to="/login" className="text-[#FF4F00] font-bold hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
