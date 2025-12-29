import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { APIURL } from '../../../services/api.js';
import { 
  FiBriefcase, 
  FiAward, 
  FiBook, 
  FiTarget, 
  FiGlobe, 
  FiCode,
  FiHeart,
  FiZap,
  FiUsers,
  FiDollarSign,
  FiStar,
  FiMapPin,
  FiMail,
  FiPhone,
  FiCalendar
} from "react-icons/fi";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    // Basic Info
    name: "",
    headline: "",
    location: "",
    email: "",
    phone: "",
    photo: "",
    bio: "",
    
    // Professional
    skills: [],
    languages: [],
    experience: [],
    education: [],
    certifications: [],
    
    // Onboarding-specific
    emotionalGoal: "",
    background: { Skills: "", Hobbies: "", Experience: "" },
    educationGoals: { "Formal Education": "", "Self-Taught Education": "" },
    projects: { "Projects Completed": "", "Projects you want to contribute to": "" },
    rewards: "",
    values: "",
  });

  // Safe placeholder image as SVG data URL
  const defaultProfileImage = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Crect width='150' height='150' fill='%230A0F2C'/%3E%3Ccircle cx='75' cy='60' r='30' fill='%238B5CF6' opacity='0.3'/%3E%3Cpath d='M75,95 Q55,115 95,115 T115,95' fill='%238B5CF6' opacity='0.3'/%3E%3C/svg%3E`;

  useEffect(() => {
    const fetchAllProfileData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Fetch from BOTH endpoints
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
          // Get the latest resume (if exists)
          latestResume = resumesData.resumes?.[0] || resumesData?.[0] || {};
        }

        // Helper function to safely convert to array
        const safeToArray = (data) => {
          if (!data) return [];
          if (Array.isArray(data)) return data;
          if (typeof data === 'string') {
            const items = data.split(',').map(item => item.trim()).filter(item => item);
            return items.length > 0 ? items : [];
          }
          return [];
        };

        // Helper function to safely handle arrays
        const safeArray = (data) => {
          if (!data) return [];
          if (Array.isArray(data)) return data.filter(item => 
            item && Object.values(item).some(val => val && val.toString().trim())
          );
          return [];
        };

        // Helper function to safely handle objects
        const safeObject = (data, defaultObj = {}) => {
          if (!data) return defaultObj;
          if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
            return data;
          }
          return defaultObj;
        };

        // Helper to get profile image
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

        // Extract onboarding meta data from resume
        const onboardingMeta = latestResume?.onboarding_meta || {};
        
        // Merge data from both sources
        const mergedData = {
          // Basic Info - try resume first, then profile
          name: latestResume?.fullName || profileData.fullName || profileData.name || "Explorer",
          headline: latestResume?.headline || profileData.headline || "Mission Seeker",
          location: latestResume?.location || profileData.location || "",
          email: latestResume?.email || profileData.email || "",
          phone: latestResume?.phone || profileData.phone || "",
          photo: getProfileImage(),
          bio: latestResume?.bio || profileData.bio || "Ready to take on missions that matter.",
          
          // Professional - from resume
          skills: safeToArray(latestResume?.skills || profileData.skills),
          languages: safeToArray(latestResume?.languages || profileData.languages),
          experience: safeArray(latestResume?.experience || profileData.experience),
          education: safeArray(latestResume?.education || profileData.education),
          certifications: safeArray(latestResume?.certifications || profileData.certifications),
          
          // Onboarding-specific - from resume meta or profile
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
        toast.error("Failed to load profile data!", {
          style: { background: "#0F1326", color: "#fff", border: "1px solid #FF6B6B" },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAllProfileData();
  }, []);

  // Handle image loading errors
  const handleImageError = (e) => {
    e.target.src = defaultProfileImage;
    e.target.onerror = null;
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full p-6 bg-void text-stark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-jewel border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-fuschia text-xl">Loading your mission profile...</div>
        </div>
      </div>
    );
  }

  // Helper function to check if a section has data
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

  // Helper function to safely render arrays
  const renderArray = (array, renderItem) => {
    if (!Array.isArray(array) || array.length === 0) return null;
    return array.map(renderItem);
  };

  // Helper function to safely render object entries
  const renderObjectEntries = (obj, renderEntry) => {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return null;
    const entries = Object.entries(obj).filter(([_, value]) => hasData(value));
    if (entries.length === 0) return null;
    return entries.map(renderEntry);
  };

  return (
    <div className="min-h-screen w-full p-4 sm:p-6 bg-void text-stark">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Outer Container */}
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Hero Card */}
        <div className="bg-gradient-to-br from-void to-[#0A0A2A] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_0_35px_rgba(139,92,246,0.15)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Profile Photo */}
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl border-2 border-jewel/60 shadow-[0_0_25px_rgba(0,255,198,0.3)] overflow-hidden">
                <img
                  src={profileData.photo}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-jewel to-fuschia flex items-center justify-center">
                <FiStar className="text-white text-sm" />
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{profileData.name}</h1>
                  <p className="text-jewel text-lg font-medium mb-4">{profileData.headline}</p>
                  
                  {/* Contact Info */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    {profileData.location && (
                      <div className="flex items-center gap-2 text-stark/70">
                        <FiMapPin className="text-fuschia" />
                        <span>{profileData.location}</span>
                      </div>
                    )}
                    {profileData.email && (
                      <div className="flex items-center gap-2 text-stark/70">
                        <FiMail className="text-fuschia" />
                        <span>{profileData.email}</span>
                      </div>
                    )}
                    {profileData.phone && (
                      <div className="flex items-center gap-2 text-stark/70">
                        <FiPhone className="text-fuschia" />
                        <span>{profileData.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Badge */}
                <div className="bg-jewel/10 border border-jewel/30 rounded-xl px-4 py-2 inline-flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-jewel animate-pulse"></div>
                  <span className="text-jewel font-medium">Mission Ready</span>
                </div>
              </div>

              {/* Bio */}
              {hasData(profileData.bio) && (
                <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                  <p className="text-stark/90 leading-relaxed">{profileData.bio}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column - Professional */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Skills Card */}
            {hasData(profileData.skills) && (
              <div className="bg-gradient-to-br from-void to-[#0A0A2A] backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-[0_0_25px_rgba(139,92,246,0.1)]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-jewel/20 flex items-center justify-center">
                    <FiCode className="text-jewel text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Skills & Expertise</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {renderArray(profileData.skills, (skill, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-gradient-to-r from-jewel/10 to-fuschia/10 text-jewel rounded-xl border border-jewel/30 hover:border-jewel/60 transition-all duration-300 hover:scale-105 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Experience Card */}
            {hasData(profileData.experience) && (
              <div className="bg-gradient-to-br from-void to-[#0A0A2A] backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-[0_0_25px_rgba(139,92,246,0.1)]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-jewel/20 flex items-center justify-center">
                    <FiBriefcase className="text-jewel text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Experience</h3>
                </div>
                <div className="space-y-4">
                  {renderArray(profileData.experience, (exp, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 p-5 rounded-xl border border-white/10 hover:border-jewel/30 transition-all duration-300 group"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-lg font-bold text-white group-hover:text-jewel transition-colors">
                            {exp.role || "Experience"}
                          </h4>
                          {exp.organization && <p className="text-stark/80">{exp.organization}</p>}
                        </div>
                        {(exp.startDate || exp.endDate) && (
                          <div className="flex items-center gap-2 text-stark/60 text-sm">
                            <FiCalendar />
                            <span>{exp.startDate || 'Start'} - {exp.endDate || 'Present'}</span>
                          </div>
                        )}
                      </div>
                      {exp.description && (
                        <p className="text-stark/70">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education Card */}
            {hasData(profileData.education) && (
              <div className="bg-gradient-to-br from-void to-[#0A0A2A] backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-[0_0_25px_rgba(139,92,246,0.1)]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-jewel/20 flex items-center justify-center">
                    <FiBook className="text-jewel text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Education</h3>
                </div>
                <div className="space-y-4">
                  {renderArray(profileData.education, (edu, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 p-5 rounded-xl border border-white/10 hover:border-jewel/30 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          {edu.degree && <h4 className="text-lg font-bold text-white">{edu.degree}</h4>}
                          {edu.school && <p className="text-stark/80">{edu.school}</p>}
                          {edu.field && <p className="text-stark/70 text-sm mt-1">{edu.field}</p>}
                        </div>
                        {edu.year && <span className="text-stark/60">{edu.year}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects Card */}
            {hasData(profileData.projects) && (
              <div className="bg-gradient-to-br from-void to-[#0A0A2A] backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-[0_0_25px_rgba(139,92,246,0.1)]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-jewel/20 flex items-center justify-center">
                    <FiTarget className="text-jewel text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Projects & Goals</h3>
                </div>
                <div className="space-y-4">
                  {renderObjectEntries(profileData.projects, ([key, value], idx) => (
                    <div key={idx} className="bg-white/5 p-5 rounded-xl border border-white/10">
                      <h4 className="font-bold text-white mb-2">{key}</h4>
                      <p className="text-stark/70">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Personal */}
          <div className="space-y-6">
            
            {/* Emotional Goal Card */}
            {hasData(profileData.emotionalGoal) && (
              <div className="bg-gradient-to-br from-void to-[#0A0A2A] backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-[0_0_25px_rgba(139,92,246,0.1)]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-fuschia/20 flex items-center justify-center">
                    <FiHeart className="text-fuschia text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Mission Fuel</h3>
                </div>
                <div className="bg-fuschia/10 border border-fuschia/30 rounded-xl p-4">
                  <p className="text-fuschia text-center font-medium">"{profileData.emotionalGoal}"</p>
                </div>
              </div>
            )}

            {/* Languages Card */}
            {hasData(profileData.languages) && (
              <div className="bg-gradient-to-br from-void to-[#0A0A2A] backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-[0_0_25px_rgba(139,92,246,0.1)]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-jewel/20 flex items-center justify-center">
                    <FiGlobe className="text-jewel text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Languages</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {renderArray(profileData.languages, (lang, i) => (
                    <span
                      key={i}
                      className="px-3 py-2 bg-white/5 text-stark rounded-xl border border-white/10 hover:border-jewel/30 transition-all"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications Card */}
            {hasData(profileData.certifications) && (
              <div className="bg-gradient-to-br from-void to-[#0A0A2A] backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-[0_0_25px_rgba(139,92,246,0.1)]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-jewel/20 flex items-center justify-center">
                    <FiAward className="text-jewel text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Certifications</h3>
                </div>
                <div className="space-y-3">
                  {renderArray(profileData.certifications, (cert, idx) => (
                    <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <h4 className="font-bold text-white text-sm">{cert.title}</h4>
                      <div className="flex justify-between items-center mt-2">
                        {cert.issuer && <span className="text-stark/70 text-xs">{cert.issuer}</span>}
                        {cert.date && <span className="text-stark/60 text-xs">{cert.date}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Values Card */}
            {hasData(profileData.values) && (
              <div className="bg-gradient-to-br from-void to-[#0A0A2A] backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-[0_0_25px_rgba(139,92,246,0.1)]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-fuschia/20 flex items-center justify-center">
                    <FiZap className="text-fuschia text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Core Values</h3>
                </div>
                <div className="bg-fuschia/10 border border-fuschia/30 rounded-xl p-4">
                  <p className="text-fuschia text-center font-medium">"{profileData.values}"</p>
                </div>
              </div>
            )}

            {/* Rewards Card */}
            {hasData(profileData.rewards) && (
              <div className="bg-gradient-to-br from-void to-[#0A0A2A] backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-[0_0_25px_rgba(139,92,246,0.1)]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-jewel/20 flex items-center justify-center">
                    <FiDollarSign className="text-jewel text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Mission Rewards</h3>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-center text-stark font-medium">{profileData.rewards}</p>
                </div>
              </div>
            )}

            {/* Background Card */}
            {hasData(profileData.background) && (
              <div className="bg-gradient-to-br from-void to-[#0A0A2A] backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-[0_0_25px_rgba(139,92,246,0.1)]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-jewel/20 flex items-center justify-center">
                    <FiUsers className="text-jewel text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Background</h3>
                </div>
                <div className="space-y-3">
                  {renderObjectEntries(profileData.background, ([key, value], idx) => (
                    <div key={idx} className="bg-white/5 p-3 rounded-xl">
                      <h4 className="text-sm font-medium text-white mb-1">{key}</h4>
                      <p className="text-stark/70 text-sm">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Edit Profile CTA */}
        <div className="text-center pt-8">
          <button 
            onClick={() => window.location.href = '/seeker/onboarding'}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-jewel to-fuschia text-white px-8 py-3 rounded-xl font-bold hover:shadow-[0_0_30px_rgba(0,255,198,0.3)] transition-all duration-300 hover:scale-105"
          >
            Update Mission Profile
          </button>
          <p className="text-stark/50 text-sm mt-3">Keep your profile updated for better mission matches</p>
        </div>

      </div>
    </div>
  );
}