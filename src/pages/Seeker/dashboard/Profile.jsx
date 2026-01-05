import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { APIURL } from '../../../services/api.js';
import { 
  Briefcase, 
  Award, 
  Book, 
  Globe, 
  Code,
  Heart,
  Shield,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  ChevronRight,
  User
} from "lucide-react";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    name: "",
    headline: "",
    location: "",
    email: "",
    phone: "",
    photo: "",
    bio: "",
    skills: [],
    languages: [],
    experience: [],
    education: [],
    certifications: [],
    emotionalGoal: "",
    background: { Skills: "", Hobbies: "", Experience: "" },
    educationGoals: { "Formal Education": "", "Self-Taught Education": "" },
    projects: { "Projects Completed": "", "Projects you want to contribute to": "" },
    rewards: "",
    values: "",
  });

  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Clean professional theme
  const theme = {
    bg: isDarkMode ? "bg-[#0a0514]" : "bg-white",
    text: isDarkMode ? "text-white" : "text-black",
    textSecondary: isDarkMode ? "text-gray-300" : "text-gray-600",
    textTertiary: isDarkMode ? "text-gray-500" : "text-gray-500",
    border: isDarkMode ? "border-gray-800" : "border-gray-200",
    hover: isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50",
  };

  const defaultProfileImage = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Crect width='150' height='150' fill='${isDarkMode ? '%230a0514' : '%23ffffff'}'/%3E%3Ccircle cx='75' cy='60' r='30' fill='${isDarkMode ? '%2394a3b8' : '%234b5563'}' opacity='0.2'/%3E%3Cpath d='M75,95 Q55,115 95,115 T115,95' fill='${isDarkMode ? '%2394a3b8' : '%234b5563'}' opacity='0.2'/%3E%3C/svg%3E`;

  useEffect(() => {
    const fetchAllProfileData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const [profileResponse, resumesResponse] = await Promise.all([
          fetch(`${APIURL}/user/profile`, { 
            headers: { Authorization: `Bearer ${token}` } 
          }),
          fetch(`${APIURL}/user/resumes`, { 
            headers: { Authorization: `Bearer ${token}` } 
          })
        ]);

        let profileData = {};
        let latestResume = {};

        if (profileResponse.ok) {
          profileData = await profileResponse.json();
        }

        if (resumesResponse.ok) {
          const resumesData = await resumesResponse.json();
          latestResume = resumesData.resumes?.[0] || resumesData?.[0] || {};
        }

        const safeToArray = (data) => {
          if (!data) return [];
          if (Array.isArray(data)) return data;
          if (typeof data === 'string') {
            const items = data.split(',').map(item => item.trim()).filter(item => item);
            return items.length > 0 ? items : [];
          }
          return [];
        };

        const safeArray = (data) => {
          if (!data) return [];
          if (Array.isArray(data)) return data.filter(item => 
            item && Object.values(item).some(val => val && val.toString().trim())
          );
          return [];
        };

        const safeObject = (data, defaultObj = {}) => {
          if (!data) return defaultObj;
          if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
            return data;
          }
          return defaultObj;
        };

        const getProfileImage = () => {
          const sources = [
            latestResume?.profile_photo,
            profileData.profile_photo,
            profileData.photo,
            profileData.avatar,
            profileData.profileImage
          ];
          
          for (const source of sources) {
            if (source && typeof source === 'string' && source.trim()) {
              const imgUrl = source.trim();
              if (imgUrl.startsWith('http://') || imgUrl.startsWith('https://') || imgUrl.startsWith('data:')) {
                return imgUrl;
              }
            }
          }
          return defaultProfileImage;
        };

        const onboardingMeta = latestResume?.onboarding_meta || {};
        
        const mergedData = {
          name: latestResume?.fullName || profileData.fullName || profileData.name || "Explorer",
          headline: latestResume?.headline || profileData.headline || "Mission Seeker",
          location: latestResume?.location || profileData.location || "",
          email: latestResume?.email || profileData.email || "",
          phone: latestResume?.phone || profileData.phone || "",
          photo: getProfileImage(),
          bio: latestResume?.bio || profileData.bio || "Ready to take on missions that matter.",
          
          skills: safeToArray(latestResume?.skills || profileData.skills),
          languages: safeToArray(latestResume?.languages || profileData.languages),
          experience: safeArray(latestResume?.experience || profileData.experience),
          education: safeArray(latestResume?.education || profileData.education),
          certifications: safeArray(latestResume?.certifications || profileData.certifications),
          
          emotionalGoal: onboardingMeta.emotionalGoal || profileData.emotionalGoal || "",
          background: safeObject(onboardingMeta.background || profileData.background, { Skills: "", Hobbies: "", Experience: "" }),
          educationGoals: safeObject(onboardingMeta.educationGoals || profileData.educationGoals || profileData.education, { "Formal Education": "", "Self-Taught Education": "" }),
          projects: safeObject(onboardingMeta.projects || profileData.projects, { "Projects Completed": "", "Projects you want to contribute to": "" }),
          rewards: onboardingMeta.rewards || profileData.rewards || "",
          values: onboardingMeta.values || profileData.values || "",
        };

        setProfileData(mergedData);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data!");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProfileData();
  }, []);

  const handleImageError = (e) => {
    e.target.src = defaultProfileImage;
    e.target.onerror = null;
  };

  if (loading) {
    return (
      <div className={`min-h-screen w-full p-6 flex items-center justify-center transition-colors duration-700 ${theme.bg}`}>
        <div className="text-center">
          <div className={`w-12 h-12 border-2 ${theme.border} border-t-transparent rounded-full animate-spin mx-auto mb-4`}></div>
          <div className={`text-lg ${theme.text}`}>Loading your mission profile...</div>
        </div>
      </div>
    );
  }

  const hasData = (data) => {
    if (Array.isArray(data)) return data.length > 0;
    if (typeof data === 'object' && data !== null) {
      return Object.values(data).some(val => 
        val && (typeof val === 'string' ? val.trim() !== '' : true)
      );
    }
    if (typeof data === 'string') return data.trim() !== '';
    return false;
  };

  const renderArray = (array, renderItem) => {
    if (!Array.isArray(array) || array.length === 0) return null;
    return array.map(renderItem);
  };

  return (
    <div className={`min-h-screen w-full p-4 sm:p-8 transition-colors duration-700 ${theme.bg} ${theme.text}`}>
      <Toaster position="top-right" reverseOrder={false} />

      {/* Main Container */}
      <div className="max-w-4xl mx-auto space-y-12">

        {/* Header Section */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            {/* Profile Image */}
            <div className="w-40 h-40 rounded-lg border overflow-hidden flex-shrink-0">
              <img
                src={profileData.photo}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{profileData.name}</h1>
              <p className="text-xl mb-6">{profileData.headline}</p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                {profileData.location && (
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin size={16} className={theme.textSecondary} />
                    <span className={theme.textSecondary}>{profileData.location}</span>
                  </div>
                )}
                {profileData.email && (
                  <div className="flex items-center gap-3 text-sm">
                    <Mail size={16} className={theme.textSecondary} />
                    <span className={theme.textSecondary}>{profileData.email}</span>
                  </div>
                )}
                {profileData.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone size={16} className={theme.textSecondary} />
                    <span className={theme.textSecondary}>{profileData.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          {hasData(profileData.bio) && (
            <div className="pt-4 border-t">
              <p className="text-base leading-relaxed">{profileData.bio}</p>
            </div>
          )}
        </div>

        {/* Skills Section */}
        {hasData(profileData.skills) && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b">
              <Code size={20} />
              <h2 className="text-xl font-bold">Skills & Expertise</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {renderArray(profileData.skills, (skill, i) => (
                <span
                  key={i}
                  className={`px-3 py-1.5 text-sm border ${theme.border} ${theme.hover} transition-colors`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience Section */}
        {hasData(profileData.experience) && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b">
              <Briefcase size={20} />
              <h2 className="text-xl font-bold">Professional Experience</h2>
            </div>
            <div className="space-y-6">
              {renderArray(profileData.experience, (exp, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <h3 className="text-lg font-semibold">{exp.role || "Role"}</h3>
                      {exp.organization && <p className={theme.textSecondary}>{exp.organization}</p>}
                    </div>
                    {(exp.startDate || exp.endDate) && (
                      <div className={`flex items-center gap-2 text-sm ${theme.textTertiary}`}>
                        <Calendar size={14} />
                        <span>{exp.startDate || 'Start'} - {exp.endDate || 'Present'}</span>
                      </div>
                    )}
                  </div>
                  {exp.description && (
                    <p className={`text-sm ${theme.textSecondary}`}>{exp.description}</p>
                  )}
                  <div className="h-px bg-gray-200 dark:bg-gray-800 mt-4"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {hasData(profileData.education) && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b">
              <Book size={20} />
              <h2 className="text-xl font-bold">Education</h2>
            </div>
            <div className="space-y-4">
              {renderArray(profileData.education, (edu, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      {edu.degree && <h3 className="text-lg font-semibold">{edu.degree}</h3>}
                      {edu.school && <p className={theme.textSecondary}>{edu.school}</p>}
                      {edu.field && <p className={`text-sm ${theme.textTertiary}`}>{edu.field}</p>}
                    </div>
                    {edu.year && <span className={`text-sm ${theme.textTertiary}`}>{edu.year}</span>}
                  </div>
                  <div className="h-px bg-gray-200 dark:bg-gray-800 mt-3"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages Section */}
        {hasData(profileData.languages) && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b">
              <Globe size={20} />
              <h2 className="text-xl font-bold">Languages</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {renderArray(profileData.languages, (lang, i) => (
                <span
                  key={i}
                  className={`px-3 py-1.5 text-sm border ${theme.border} ${theme.hover} transition-colors`}
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Section */}
        {hasData(profileData.certifications) && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b">
              <Award size={20} />
              <h2 className="text-xl font-bold">Certifications</h2>
            </div>
            <div className="space-y-3">
              {renderArray(profileData.certifications, (cert, idx) => (
                <div key={idx} className="space-y-1">
                  <h3 className="font-semibold">{cert.title}</h3>
                  <div className="flex justify-between items-center">
                    {cert.issuer && <span className={`text-sm ${theme.textSecondary}`}>{cert.issuer}</span>}
                    {cert.date && <span className={`text-sm ${theme.textTertiary}`}>{cert.date}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mission Fuel Section */}
        {hasData(profileData.emotionalGoal) && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b">
              <Heart size={20} />
              <h2 className="text-xl font-bold">Mission Fuel</h2>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-center italic">"{profileData.emotionalGoal}"</p>
            </div>
          </div>
        )}

        {/* Core Values Section */}
        {hasData(profileData.values) && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-2 border-b">
              <Shield size={20} />
              <h2 className="text-xl font-bold">Core Values</h2>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-center italic">"{profileData.values}"</p>
            </div>
          </div>
        )}

        {/* Edit Profile Button */}
        <div className="pt-8 border-t">
          <button 
            onClick={() => window.location.href = '/seeker/onboarding'}
            className={`group px-6 py-3 rounded-lg font-medium flex items-center gap-2 mx-auto border ${theme.border} ${theme.hover} transition-colors`}
          >
            <Edit size={18} />
            Update Mission Profile
            <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
          <p className={`text-center text-sm mt-3 ${theme.textTertiary}`}>
            Keep your profile updated for better mission matches
          </p>
        </div>

      </div>
    </div>
  );
}