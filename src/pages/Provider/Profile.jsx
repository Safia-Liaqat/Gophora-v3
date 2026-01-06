import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { APIURL } from '../../services/api.js';
import { User, Mail, Briefcase, Globe, MapPin } from "lucide-react";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    organization: "",
    website: "",
    location: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains("dark"));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(`${APIURL}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch profile data");

        const userData = await response.json();
        setProfile({
          name: userData.name || "",
          email: userData.email || "",
          organization: userData.company || "",
          website: userData.website || "",
          location: userData.location || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data!", {
          style: {
            background: isDarkMode ? "#0a0514" : "#fff",
            color: isDarkMode ? "#fff" : "#000",
            border: "1px solid #FF6B6B",
          },
        });
      }
    };

    fetchProfileData();
  }, [isDarkMode]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication required", {
          style: {
            background: isDarkMode ? "#0a0514" : "#fff",
            color: isDarkMode ? "#fff" : "#000",
            border: "1px solid #FF6B6B",
          },
        });
        return;
      }

      const response = await fetch(`${APIURL}/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profile.name,
          company: profile.organization,
          website: profile.website,
          location: profile.location,
        }),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      setEditMode(false);

      toast.success("Profile updated successfully! 🚀", {
        style: {
          background: isDarkMode ? "#0a0514" : "#fff",
          color: isDarkMode ? "#fff" : "#000",
          border: "1px solid #C5A3FF",
          fontWeight: "500",
        },
        iconTheme: {
          primary: "#C5A3FF",
          secondary: isDarkMode ? "#0a0514" : "#fff",
        },
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile!", {
        style: {
          background: isDarkMode ? "#0a0514" : "#fff",
          color: isDarkMode ? "#fff" : "#000",
          border: "1px solid #FF6B6B",
        },
      });
    }
  };

  const theme = {
    text: isDarkMode ? "text-white" : "text-black",
    bgCard: isDarkMode ? "bg-white/5 border-white/10 backdrop-blur-lg" : "bg-white border border-fuchsia-100",
    input: isDarkMode
      ? "border-white/20 bg-white/5 text-white placeholder-gray-300 focus:ring-fuchsia-400"
      : "border-gray-300 bg-white text-black placeholder-gray-500 focus:ring-fuchsia-500",
    buttonPrimary: "bg-gradient-to-br from-fuchsia-600 to-purple-700 text-white",
    buttonSecondary: isDarkMode
      ? "bg-white/20 text-white hover:bg-white/30"
      : "bg-gray-100 text-black hover:bg-gray-200",
    label: isDarkMode ? "text-white font-medium" : "text-black font-medium",
    icon: "text-[#C5A3FF] w-5 h-5",
  };

  const InputField = ({ label, name, value, disabled, icon: Icon, type = "text" }) => (
    <div className="flex flex-col gap-2">
      <label className={`${theme.label} flex items-center gap-2`}>
        {Icon && <Icon className={theme.icon} />}
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={`w-full p-4 rounded-xl focus:outline-none focus:ring-2 ${theme.input} transition-all duration-200`}
      />
    </div>
  );

  return (
    <div className={`${theme.text} px-4 sm:px-6 lg:px-0`}>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-2xl mx-auto">
        {/* Header with icon and line */}
        <div className="flex items-center gap-3 mb-4">
          <User className={`${theme.icon} w-6 h-6`} />
          <h2 className="text-3xl font-semibold">My Profile</h2>
        </div>
        <div className="border-b border-fuchsia-300 w-24 mb-6"></div>

        <p className="text-sm mb-6">{`Manage your personal information below.`}</p>

        <div className={`${theme.bgCard} p-8 rounded-2xl shadow-[0_0_25px_rgba(158,123,255,0.2)] flex flex-col gap-6`}>
          <InputField label="Full Name" name="name" value={profile.name} disabled={!editMode} icon={User} />
          <InputField label="Email" name="email" value={profile.email} disabled type="email" icon={Mail} />
          <InputField label="Organization" name="organization" value={profile.organization} disabled={!editMode} icon={Briefcase} />
          <InputField label="Website" name="website" value={profile.website} disabled={!editMode} type="url" icon={Globe} />
          <InputField label="Location" name="location" value={profile.location} disabled={!editMode} icon={MapPin} />

          {/* ✅ Edit Profile Button updated */}
          {!editMode ? (
            <div className="flex justify-center">
              <button
                onClick={() => setEditMode(true)}
                className={`px-5 py-2 rounded-lg font-semibold ${theme.buttonPrimary} w-max hover:scale-105 transition-all`}
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSave}
                className={`flex-1 py-3 rounded-xl font-semibold ${theme.buttonPrimary} hover:opacity-90 transition-all duration-200`}
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditMode(false)}
                className={`flex-1 py-3 rounded-xl font-semibold ${theme.buttonSecondary} transition-all duration-200`}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
