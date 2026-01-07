import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { APIURL } from "../../services/api.js";
import { User, Mail, Briefcase, Globe, MapPin } from "lucide-react";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    organization: "",
    website: "",
    location: "",
  });

  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
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
            border: "1px solid #FF4F00",
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
            border: "1px solid #FF4F00",
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

      toast.success("Profile updated successfully! 🚀", {
        style: {
          background: isDarkMode ? "#0a0514" : "#fff",
          color: isDarkMode ? "#fff" : "#000",
          border: "1px solid #FF4F00",
          fontWeight: "500",
        },
        iconTheme: {
          primary: "#FF4F00",
          secondary: isDarkMode ? "#0a0514" : "#fff",
        },
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile!", {
        style: {
          background: isDarkMode ? "#0a0514" : "#fff",
          color: isDarkMode ? "#fff" : "#000",
          border: "1px solid #FF4F00",
        },
      });
    }
  };

  const theme = {
    text: isDarkMode ? "text-white" : "text-black",
    bgCard: isDarkMode
      ? "bg-white/5 border-white/10 backdrop-blur-lg"
      : "bg-white border border-gray-200",
    input: isDarkMode
      ? "border-2 border-gray-400 bg-white/5 text-white placeholder-gray-300 focus:border-[#FF4F00] focus:ring-[#FF4F00]"
      : "border-2 border-gray-400 bg-white text-black placeholder-gray-500 focus:border-[#FF4F00] focus:ring-[#FF4F00]",
    buttonPrimary: "bg-[#FF4F00] text-white hover:bg-[#E04600]",
    buttonSecondary: isDarkMode
      ? "bg-white/20 text-white hover:bg-white/30"
      : "bg-gray-100 text-black hover:bg-gray-200",
    label: isDarkMode ? "text-white font-medium" : "text-black font-medium",
    icon: "text-[#FF4F00] w-5 h-5",
  };

  const InputField = ({
    label,
    name,
    value,
    icon: Icon,
    type = "text",
  }) => (
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
        className={`w-full p-4 rounded-xl focus:outline-none focus:ring-2 ${theme.input} transition-all duration-200`}
      />
    </div>
  );

  return (
    <div className={`${theme.text} px-4 sm:px-6 lg:px-0`}>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <User className={`${theme.icon} w-6 h-6`} />
          <h2 className="text-3xl font-semibold">My Profile</h2>
        </div>
        <div className="border-b border-[#FF4F00] w-24 mb-6"></div>

        <p className="text-sm mb-6">Manage your personal information below.</p>

        <div
          className={`${theme.bgCard} p-8 rounded-2xl shadow-[0_0_25px_rgba(255,79,0,0.2)] flex flex-col gap-6`}
        >
          <InputField label="Full Name" name="name" value={profile.name} icon={User} />
          <InputField label="Email" name="email" value={profile.email} type="email" icon={Mail} />
          <InputField label="Organization" name="organization" value={profile.organization} icon={Briefcase} />
          <InputField label="Website" name="website" value={profile.website} type="url" icon={Globe} />
          <InputField label="Location" name="location" value={profile.location} icon={MapPin} />

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleSave}
              className={`flex-1 py-3 rounded-xl font-semibold ${theme.buttonPrimary} transition-all duration-200`}
            >
              Save Changes
            </button>
            <button
              onClick={() => setProfile(profile)} // reset to current state
              className={`flex-1 py-3 rounded-xl font-semibold ${theme.buttonSecondary} transition-all duration-200`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
