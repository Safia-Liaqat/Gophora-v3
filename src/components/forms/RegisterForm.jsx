import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onboardingUtils } from '../../contexts/onboarding.js';
import { APIURL } from '../../services/api.js';
import { User, Mail, Lock, Briefcase, Globe, ArrowRight, Loader2, ChevronDown, Building2 } from "lucide-react";

export default function RegisterForm({ role, setRole }) {
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", confirmPassword: "",
    country: "", state: "", city: "", skills: "",
    organizationName: "", website: ""
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [geoLoading, setGeoLoading] = useState({ states: false, cities: false });
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const isDarkMode = document.documentElement.classList.contains('dark');

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/states")
      .then(res => res.json())
      .then(data => setCountries(data.data || []))
      .catch(() => setError("Geography service unavailable."));
  }, []);

  useEffect(() => {
    if (!formData.country) return;
    const selected = countries.find(c => c.name === formData.country);
    setStates(selected?.states || []);
    setFormData(prev => ({ ...prev, state: "", city: "" }));
  }, [formData.country, countries]);

  useEffect(() => {
    if (!formData.state || !formData.country) return;
    setGeoLoading(prev => ({ ...prev, cities: true }));
    fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: formData.country, state: formData.state })
    })
      .then(res => res.json())
      .then(data => setCities(data.data || []))
      .finally(() => setGeoLoading(prev => ({ ...prev, cities: false })));
  }, [formData.state, formData.country]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return setError("Passwords mismatch.");
    setLoading(true);

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        full_name: formData.name,
        skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : [],
        role: role
      };

      console.log('Registration payload:', payload); // Debug log

      const response = await fetch(`${APIURL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      console.log('Response status:', response.status); // Debug log

      if (!response.ok) {
        let errorMessage = "Registration failed.";
        try {
          const errorData = await response.json();
          console.log('Error response:', errorData); // Debug log
          errorMessage = errorData.message || errorData.detail || JSON.stringify(errorData);
        } catch (parseError) {
          console.log('Could not parse error response');
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('Registration success:', result); // Debug log
      
      localStorage.setItem('user_id', result.user?.id || result.user_id);
      onboardingUtils.resetOnboarding();
      
      role === "seeker" ? navigate('/seeker/onboarding') : navigate('/provider/dashboard');
    } catch (err) {
      console.error('Registration error:', err); // Debug log
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fixed dropdown logic: ensure text and background contrast in light mode
  const inputClass = isDarkMode 
    ? "bg-white/5 border-white/10 text-white placeholder-gray-500" 
    : "bg-white border-slate-200 text-[#2d124d] placeholder-slate-400 shadow-sm";

  const optionClass = isDarkMode ? "bg-[#1a1625] text-white" : "bg-white text-[#2d124d]";

  // Get unique countries (remove duplicates)
  const uniqueCountries = [...new Set(countries.map(c => c.name))];
  const uniqueStates = [...new Set(states.map(s => s.name))];
  const uniqueCities = [...new Set(cities)];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-[10px] text-red-500 font-bold uppercase tracking-widest text-center bg-red-50/50 py-2 rounded-lg">{error}</div>}

      <div className="grid grid-cols-1 gap-4">
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 opacity-30 group-focus-within:text-fuchsia-500 transition-colors" />
          <input 
            name="name" 
            value={formData.name}
            onChange={handleChange} 
            placeholder="FULL NAME" 
            required 
            className={`w-full pl-12 pr-4 py-3 rounded-2xl text-[10px] font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 border uppercase ${inputClass}`} 
          />
        </div>

        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 opacity-30 group-focus-within:text-fuchsia-500 transition-colors" />
          <input 
            type="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange} 
            placeholder="EMAIL ADDRESS" 
            required 
            className={`w-full pl-12 pr-4 py-3 rounded-2xl text-[10px] font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 border uppercase ${inputClass}`} 
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 opacity-30 group-focus-within:text-fuchsia-500 transition-colors" />
            <input 
              type="password" 
              name="password" 
              value={formData.password}
              onChange={handleChange} 
              placeholder="PASSWORD" 
              required 
              className={`w-full pl-12 pr-4 py-3 rounded-2xl text-[10px] font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 border uppercase ${inputClass}`} 
            />
          </div>
          <div className="relative group">
            <input 
              type="password" 
              name="confirmPassword" 
              value={formData.confirmPassword}
              onChange={handleChange} 
              placeholder="CONFIRM" 
              required 
              className={`w-full px-5 py-3 rounded-2xl text-[10px] font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 border uppercase ${inputClass}`} 
            />
          </div>
        </div>

        {/* Location Selects with FIX for duplicate keys */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { 
              name: 'country', 
              label: 'COUNTRY', 
              options: uniqueCountries, 
              disabled: false 
            },
            { 
              name: 'state', 
              label: 'STATE', 
              options: uniqueStates, 
              disabled: !states.length 
            },
            { 
              name: 'city', 
              label: 'CITY', 
              options: uniqueCities, 
              disabled: !cities.length, 
              isLoading: geoLoading.cities 
            }
          ].map((field) => (
            <div key={field.name} className="relative">
              <select 
                name={field.name} 
                onChange={handleChange} 
                value={formData[field.name]}
                disabled={field.disabled}
                required 
                className={`w-full px-2 py-3 rounded-xl text-[9px] font-bold border focus:outline-none appearance-none cursor-pointer transition-all ${inputClass} ${field.disabled ? 'opacity-50' : ''}`}
              >
                <option value="" className={optionClass}>
                  {field.isLoading ? '...' : field.label}
                </option>
                {field.options.map((opt, index) => (
                  <option 
                    key={`${field.name}-${opt}-${index}`} 
                    value={opt} 
                    className={optionClass}
                  >
                    {opt.toUpperCase()}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 opacity-30 pointer-events-none" />
            </div>
          ))}
        </div>

        {role === "seeker" ? (
          <div className="relative group">
            <Briefcase className="absolute left-4 top-4 h-4 w-4 opacity-30 group-focus-within:text-fuchsia-500 transition-colors" />
            <textarea 
              name="skills" 
              value={formData.skills}
              onChange={handleChange} 
              placeholder="SKILLS (COMMAS: REACT, PYTHON...)" 
              rows="2" 
              className={`w-full pl-12 pr-4 py-3 rounded-2xl text-[10px] font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 border uppercase ${inputClass}`} 
            />
          </div>
        ) : (
          <div className="space-y-4 animate-in slide-in-from-bottom-2">
            <div className="relative group">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 opacity-30 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                name="organizationName" 
                value={formData.organizationName}
                onChange={handleChange} 
                placeholder="ORGANIZATION NAME" 
                required 
                className={`w-full pl-12 pr-4 py-3 rounded-2xl text-[10px] font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500/20 border uppercase ${inputClass}`} 
              />
            </div>
            <div className="relative group">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 opacity-30 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="url" 
                name="website" 
                value={formData.website}
                onChange={handleChange} 
                placeholder="WEBSITE URL (OPTIONAL)" 
                className={`w-full pl-12 pr-4 py-3 rounded-2xl text-[10px] font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500/20 border uppercase ${inputClass}`} 
              />
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-4 rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl mt-2
          ${isDarkMode ? 'bg-fuchsia-600 text-white hover:bg-fuchsia-500' : 'bg-[#2d124d] text-white hover:bg-[#3d1a66]'}`}
      >
        {loading ? <Loader2 className="animate-spin" size={16} /> : "Initialize Profile"}
        {!loading && <ArrowRight size={14} />}
      </button>
    </form>
  );
}