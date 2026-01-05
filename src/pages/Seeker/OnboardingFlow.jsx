import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../components/onboarding/ProgressBar";
import { onboardingUtils } from "../../contexts/onboarding";
import { FiPlus, FiTrash2, FiUpload } from "react-icons/fi";
import { Bolt, Signal, Clock, Trophy, UserCheck, ArrowRight } from "lucide-react";
import { APIURL } from '../../services/api.js';

// Compact FounderMessage component
const FounderMessage = ({ messageText, isDarkMode }) => (
  <div className={`my-4 p-3 rounded-lg flex items-center gap-3 text-sm ${
    isDarkMode 
      ? "bg-white/[0.02] border border-white/5" 
      : "bg-fuchsia-50/50 border border-fuchsia-100"
  }`}>
    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
      isDarkMode ? "bg-fuchsia-500" : "bg-fuchsia-500"
    }`} />
    <p className={`italic ${isDarkMode ? "text-white" : "text-black"}`}>
      "{messageText}"
    </p>
  </div>
);

// Compact Progress Display
const ProgressDisplay = ({ current, total, isDarkMode }) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-3">
      <div className={`w-8 h-[2px] ${isDarkMode ? 'bg-gradient-to-r from-fuchsia-500 to-transparent' : 'bg-fuchsia-500'}`} />
      <span className={`text-xs uppercase tracking-[0.3em] font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
        Step {current}/{total}
      </span>
    </div>
    <div className="flex items-center gap-2">
      <div className={`text-xs ${isDarkMode ? 'text-white' : 'text-black'}`}>
        {Math.round((current / total) * 100)}%
      </div>
    </div>
  </div>
);

const chapters = [
  {
    id: 1,
    title: "The Call",
    quote: "Everything begins with a question: Why are you here?",
    text: "At some point, you felt you could do more — your energy, your mind, your emotions could change something. GOPHORA turns pain into purpose.",
    question: "What emotion do you want to transform into creative energy?",
    type: "choice",
    options: ["Fear", "Doubt", "Sadness", "Stress", "All of the above"],
    message: "Your purpose is your superpower. – Andrea Covarrubias",
    icon: <Bolt className="h-4 w-4" />
  },
  {
    id: 2,
    title: "The 24-Hour Flame",
    quote: "Time is not your enemy, it's your window of power.",
    text: "You have something to offer today — a skill, a voice, a story. Let's define your explorer toolkit.",
    question: "List your Skills, Hobbies, and Experiences:",
    type: "profile_input",
    fields: ["Skills", "Hobbies", "Experience"],
    message: "In just 24 hours, your life can begin to change.",
    icon: <Clock className="h-4 w-4" />
  },
  {
    id: 3,
    title: "Personal Identity",
    quote: "Your story begins with who you are.",
    text: "Let's build the foundation of your professional identity.",
    question: "Tell us about yourself:",
    type: "basic_info",
    fields: [
      { key: "fullName", label: "Full Name", type: "text", required: true },
      { key: "headline", label: "Professional Headline", type: "text", required: true },
      { key: "email", label: "Email Address", type: "email", required: true },
      { key: "phone", label: "Phone Number", type: "tel" },
      { key: "location", label: "Location", type: "text" },
      { key: "languages", label: "Languages (comma separated)", type: "text" }
    ],
    message: "Your identity is the first chapter of your journey.",
    icon: <UserCheck className="h-4 w-4" />
  },
  {
    id: 4,
    title: "Awakening Purpose",
    quote: "The future is created by humans who awaken.",
    text: "Purpose is not found, it's activated. Let's document your educational journey and background.",
    question: "Education & Growth:",
    type: "education",
    fields: ["Formal Education", "Self-Taught Education"],
    message: "Purpose isn't something you find. It's something you activate.",
    icon: <Signal className="h-4 w-4" />
  },
  {
    id: 5,
    title: "Career Journey",
    quote: "Your experiences shape your capabilities.",
    text: "Share your professional journey and achievements.",
    question: "Tell us about your work experience:",
    type: "experience",
    message: "Every role you've played adds to your unique story.",
    icon: <Trophy className="h-4 w-4" />
  },
  {
    id: 6,
    title: "The Digital Society",
    quote: "We don't work alone, we build together.",
    text: "Everyone has a role. Tell us about the impact you've made and where you want to go.",
    question: "Projects & Contributions:",
    type: "profile_input",
    fields: ["Projects Completed", "Projects you want to contribute to"],
    message: "Your role here is vital. Together, we shape a new civilization.",
    icon: <Signal className="h-4 w-4" />
  },
  {
    id: 7,
    title: "Certifications & Achievements",
    quote: "Your credentials tell a story of dedication.",
    text: "Share your certifications and professional achievements.",
    question: "List your certifications:",
    type: "certifications",
    message: "Every certificate is a milestone in your growth journey.",
    icon: <Trophy className="h-4 w-4" />
  },
  {
    id: 8,
    title: "The Economy of Purpose",
    quote: "Money is the energy of human exchange.",
    text: "Every idea shared is energy that transforms into resources or collaboration.",
    question: "What would you like to receive in exchange for your energy?",
    type: "choice",
    options: ["Learning & Growth", "Recognition & Badges", "Direct Income", "Global Opportunities", "All of the above"],
    message: "Every effort you make fuels a new economy.",
    icon: <Bolt className="h-4 w-4" />
  },
  {
    id: 9,
    title: "The Interplanetary Leap",
    quote: "Preparing for space starts with understanding Earth.",
    text: "You are training for the next era. Empathy and sustainability are key to expanding life beyond our planet.",
    question: "What would you carry with you beyond Earth?",
    type: "choice",
    options: ["My Purpose", "My Energy", "My Humanity", "My Desire to Connect", "Everything I Am"],
    message: "You are a pioneer of the future.",
    icon: <Bolt className="h-4 w-4" />
  },
  {
    id: 10,
    title: "Profile Completion",
    quote: "Your profile is your mission statement.",
    text: "Add a professional photo and bio to complete your profile.",
    question: "Complete your professional profile:",
    type: "profile_completion",
    message: "A complete profile attracts meaningful missions.",
    icon: <UserCheck className="h-4 w-4" />
  }
];

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [experience, setExperience] = useState([{ role: "", organization: "", description: "", startDate: "", endDate: "" }]);
  const [education, setEducation] = useState([{ degree: "", school: "", field: "", year: "" }]);
  const [certifications, setCertifications] = useState([{ title: "", issuer: "", date: "" }]);
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));
  const navigate = useNavigate();

  const chapter = chapters[currentStep];

  // Listen for theme changes
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

  // Theme variables
  const theme = {
    bg: isDarkMode ? "bg-[#0a0514]" : "bg-slate-50",
    card: isDarkMode ? "bg-white/[0.02] border-white/5" : "bg-white border-fuchsia-100 shadow-sm",
    buttonPrimary: isDarkMode ? "bg-fuchsia-600 hover:bg-fuchsia-700 text-white" : "bg-[#2d124d] hover:bg-fuchsia-600 text-white",
    buttonSecondary: isDarkMode ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-white border-fuchsia-100 text-black hover:bg-fuchsia-50",
    inputBg: isDarkMode ? "bg-white/5 border-white/10" : "bg-white border-fuchsia-100",
    textColor: isDarkMode ? "text-white" : "text-black",
    textMuted: isDarkMode ? "text-gray-300" : "text-gray-600",
    accentBorder: isDarkMode ? "border-fuchsia-500/30" : "border-fuchsia-300",
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhotoFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePhoto(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...experience];
    newExperience[index][field] = value;
    setExperience(newExperience);
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...education];
    newEducation[index][field] = value;
    setEducation(newEducation);
  };

  const handleCertificationChange = (index, field, value) => {
    const newCertifications = [...certifications];
    newCertifications[index][field] = value;
    setCertifications(newCertifications);
  };

  const addExperience = () => {
    setExperience([...experience, { role: "", organization: "", description: "", startDate: "", endDate: "" }]);
  };

  const addEducation = () => {
    setEducation([...education, { degree: "", school: "", field: "", year: "" }]);
  };

  const addCertification = () => {
    setCertifications([...certifications, { title: "", issuer: "", date: "" }]);
  };

  const removeExperience = (index) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  const removeEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const removeCertification = (index) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    // Validation based on chapter type
    switch (chapter.type) {
      case "choice":
        if (!answers[chapter.id]) {
          alert("Please select an option to move forward.");
          return;
        }
        break;
      
      case "profile_input":
        const currentChapterAnswers = answers[chapter.id] || {};
        const hasContent = Object.values(currentChapterAnswers).some(val => val && val.trim().length > 0);
        if (!hasContent) {
          alert("Please share a little bit about yourself to continue.");
          return;
        }
        break;
      
      case "basic_info":
        // Validate required fields
        const basicInfo = answers[chapter.id] || {};
        if (!basicInfo.fullName || !basicInfo.headline || !basicInfo.email) {
          alert("Please fill in all required fields (Full Name, Professional Headline, and Email).");
          return;
        }
        break;
      
      case "experience":
        // At least one experience should have a role
        const hasValidExperience = experience.some(exp => exp.role.trim());
        if (!hasValidExperience) {
          alert("Please add at least one work experience.");
          return;
        }
        break;
      
      default:
        break;
    }
    
    if (currentStep === chapters.length - 1) {
      handleCompleteOnboarding();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const updateBasicInfo = (field, value) => {
    setAnswers(prev => ({
      ...prev,
      [chapter.id]: { ...(prev[chapter.id] || {}), [field]: value }
    }));
  };

  const updateProfileAnswer = (field, value) => {
    setAnswers(prev => ({
      ...prev,
      [chapter.id]: { ...(prev[chapter.id] || {}), [field]: value }
    }));
  };

  const handleCompleteOnboarding = async () => {
    setLoading(true);
    try {
      // Extract skills from chapter 2
      const skillsText = answers[2]?.Skills || "";
      const skills = skillsText.split(',').map(s => s.trim()).filter(s => s);
      
      // Extract languages from basic info
      const languagesText = answers[3]?.languages || "";
      const languages = languagesText.split(',').map(l => l.trim()).filter(l => l);
      
      // Extract bio from chapter 10 or create one from education/projects
      const bio = answers[10]?.bio || "";
      const educationText = answers[4] ? Object.values(answers[4]).join(' ') : "";
      const projectsText = answers[6] ? Object.values(answers[6]).join(' ') : "";
      const finalBio = bio || `Education: ${educationText}. Projects: ${projectsText}`;
      
      // Build the complete resume data (matching Resume Builder structure)
      const resumeData = {
        fullName: answers[3]?.fullName || "",
        headline: answers[3]?.headline || "",
        location: answers[3]?.location || "",
        email: answers[3]?.email || "",
        phone: answers[3]?.phone || "",
        bio: finalBio,
        skills: skills,
        languages: languages,
        experience: experience.filter(exp => exp.role.trim()),
        education: education.filter(edu => edu.degree.trim()),
        certifications: certifications.filter(cert => cert.title.trim()),
        profile_photo: profilePhoto,
        
        // Also include onboarding-specific data in a meta field
        onboarding_meta: {
          emotionalGoal: answers[1],
          background: answers[2],
          educationGoals: answers[4],
          projects: answers[6],
          rewards: answers[8],
          values: answers[9],
          completedAt: new Date().toISOString()
        }
      };

      console.log("Saving resume data:", resumeData);
      
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      // Check if user already has a resume
      const checkResponse = await fetch(`${APIURL}/user/resumes`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      let saveResponse;
      
      if (checkResponse.ok) {
        const existingResumes = await checkResponse.json();
        const resumes = existingResumes.resumes || existingResumes;
        
        if (resumes && resumes.length > 0) {
          // Update existing resume
          const existingResumeId = resumes[0].id;
          saveResponse = await fetch(`${APIURL}/user/resumes/${existingResumeId}`, {
            method: "PUT",
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(resumeData)
          });
          console.log("Updating existing resume");
        } else {
          // Create new resume
          saveResponse = await fetch(`${APIURL}/user/resumes`, {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(resumeData)
          });
          console.log("Creating new resume");
        }
      } else {
        // Create new resume if check fails
        saveResponse = await fetch(`${APIURL}/user/resumes`, {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(resumeData)
        });
        console.log("Creating new resume (check failed)");
      }

      if (!saveResponse.ok) {
        const errorText = await saveResponse.text();
        console.error("Save failed:", errorText);
        throw new Error(`Failed to save: ${saveResponse.status}`);
      }

      const result = await saveResponse.json();
      console.log("Save successful:", result);
      
      // Also try to save to user/profile endpoint for backwards compatibility
      try {
        const profileSaveResponse = await fetch(`${APIURL}/user/profile`, {
          method: "PUT",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: resumeData.fullName,
            headline: resumeData.headline,
            location: resumeData.location,
            email: resumeData.email,
            phone: resumeData.phone,
            bio: resumeData.bio,
            skills: resumeData.skills,
            languages: resumeData.languages,
            experience: resumeData.experience,
            education: resumeData.education,
            certifications: resumeData.certifications,
            photo: resumeData.profile_photo
          })
        });
        
        if (profileSaveResponse.ok) {
          console.log("Also saved to user/profile");
        }
      } catch (profileError) {
        console.log("Could not save to user/profile, but resume was saved");
      }
      
      // Mark onboarding as complete
      if (onboardingUtils.completeOnboarding) {
        onboardingUtils.completeOnboarding();
      } else {
        localStorage.setItem('onboarding_completed', 'true');
      }
      
      alert("Profile saved successfully!");
      navigate("/seeker/dashboard");
    } catch (err) {
      console.error("Failed to save profile:", err);
      alert("Failed to save your profile. Please try again.");
    } finally { 
      setLoading(false); 
    }
  };

  const renderChapterContent = () => {
    switch (chapter.type) {
      case "choice":
        return (
          <div className="grid grid-cols-1 gap-2">
            {chapter.options.map(opt => (
              <button
                key={opt}
                onClick={() => setAnswers({...answers, [chapter.id]: opt})}
                className={`p-3 rounded-xl text-left border transition-all duration-200 text-sm ${theme.textColor} ${
                  answers[chapter.id] === opt 
                    ? isDarkMode
                      ? "bg-fuchsia-500/20 border-fuchsia-500/60"
                      : "bg-fuchsia-50 border-fuchsia-300"
                    : `${theme.inputBg} hover:bg-white/5`
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        );

      case "profile_input":
        return (
          <div className="space-y-4">
            {chapter.fields.map(field => (
              <div key={field} className="flex flex-col">
                <label className={`text-xs uppercase tracking-[0.1em] mb-1.5 ml-1 ${theme.textMuted}`}>
                  {field}
                </label>
                <textarea 
                  className={`w-full border rounded-xl p-3 text-sm ${theme.textColor} placeholder:text-gray-400 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/20 outline-none transition-all resize-none ${theme.inputBg}`}
                  rows="2"
                  placeholder={`Share your ${field.toLowerCase()}...`}
                  onChange={(e) => updateProfileAnswer(field, e.target.value)}
                  value={answers[chapter.id]?.[field] || ""}
                />
              </div>
            ))}
          </div>
        );

      case "basic_info":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {chapter.fields.map(field => (
              <div key={field.key} className={field.key === "fullName" || field.key === "headline" || field.key === "languages" ? "md:col-span-2" : ""}>
                <label className={`block text-xs uppercase tracking-[0.1em] mb-1.5 ml-1 ${theme.textMuted}`}>
                  {field.label} {field.required && <span className="text-fuchsia-500">*</span>}
                </label>
                <input
                  type={field.type}
                  className={`w-full border rounded-xl p-3 text-sm ${theme.textColor} placeholder:text-gray-400 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/20 outline-none transition-all ${theme.inputBg}`}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  onChange={(e) => updateBasicInfo(field.key, e.target.value)}
                  value={answers[chapter.id]?.[field.key] || ""}
                />
              </div>
            ))}
          </div>
        );

      case "experience":
        return (
          <div className="space-y-3">
            <div className="flex justify-between items-center mb-3">
              <p className={`text-sm ${theme.textMuted}`}>Work experience</p>
              <button
                onClick={addExperience}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${
                  isDarkMode 
                    ? "bg-fuchsia-500/20 hover:bg-fuchsia-500/40 text-white" 
                    : "bg-fuchsia-100 hover:bg-fuchsia-200 text-black"
                }`}
              >
                <FiPlus size={14} /> Add
              </button>
            </div>
            {experience.map((exp, idx) => (
              <div key={idx} className={`border rounded-xl p-3 ${theme.card}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={exp.role}
                    onChange={(e) => handleExperienceChange(idx, 'role', e.target.value)}
                    className={`border rounded-lg px-3 py-2 text-sm ${theme.textColor} placeholder:text-gray-400 focus:border-fuchsia-500/50 outline-none ${theme.inputBg}`}
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={exp.organization}
                    onChange={(e) => handleExperienceChange(idx, 'organization', e.target.value)}
                    className={`border rounded-lg px-3 py-2 text-sm ${theme.textColor} placeholder:text-gray-400 focus:border-fuchsia-500/50 outline-none ${theme.inputBg}`}
                  />
                </div>
                <textarea
                  placeholder="Description and achievements..."
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(idx, 'description', e.target.value)}
                  rows="1"
                  className={`w-full border rounded-lg px-3 py-2 text-sm mb-2 ${theme.textColor} placeholder:text-gray-400 focus:border-fuchsia-500/50 outline-none resize-none ${theme.inputBg}`}
                />
                <div className="flex gap-2 items-center text-sm">
                  <input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => handleExperienceChange(idx, 'startDate', e.target.value)}
                    className={`flex-1 border rounded-lg px-3 py-2 ${theme.textColor} focus:border-fuchsia-500/50 outline-none ${theme.inputBg}`}
                  />
                  <span className={theme.textMuted}>—</span>
                  <input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => handleExperienceChange(idx, 'endDate', e.target.value)}
                    className={`flex-1 border rounded-lg px-3 py-2 ${theme.textColor} focus:border-fuchsia-500/50 outline-none ${theme.inputBg}`}
                  />
                  {experience.length > 1 && (
                    <button
                      onClick={() => removeExperience(idx)}
                      className={`p-2 rounded-lg ${
                        isDarkMode 
                          ? "bg-red-500/20 hover:bg-red-500/40 text-white" 
                          : "bg-red-100 hover:bg-red-200 text-black"
                      }`}
                    >
                      <FiTrash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      case "education":
        return (
          <div className="space-y-3">
            <div className="space-y-3 mb-3">
              {chapter.fields.map(field => (
                <div key={field} className="flex flex-col">
                  <label className={`text-xs uppercase tracking-[0.1em] mb-1.5 ml-1 ${theme.textMuted}`}>
                    {field}
                  </label>
                  <textarea 
                    className={`w-full border rounded-xl p-3 text-sm ${theme.textColor} placeholder:text-gray-400 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/20 outline-none transition-all resize-none ${theme.inputBg}`}
                    rows="2"
                    placeholder={`Describe your ${field.toLowerCase()}...`}
                    onChange={(e) => updateProfileAnswer(field, e.target.value)}
                    value={answers[chapter.id]?.[field] || ""}
                  />
                </div>
              ))}
            </div>
            
            <div className={`border-t pt-3 ${isDarkMode ? 'border-white/10' : 'border-fuchsia-100'}`}>
              <div className="flex justify-between items-center mb-3">
                <p className={`text-sm ${theme.textMuted}`}>Formal education</p>
                <button
                  onClick={addEducation}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${
                    isDarkMode 
                      ? "bg-fuchsia-500/20 hover:bg-fuchsia-500/40 text-white" 
                      : "bg-fuchsia-100 hover:bg-fuchsia-200 text-black"
                  }`}
                >
                  <FiPlus size={14} /> Add
                </button>
              </div>
              {education.map((edu, idx) => (
                <div key={idx} className={`border rounded-xl p-3 mb-2 ${theme.card}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(idx, 'degree', e.target.value)}
                      className={`border rounded-lg px-3 py-2 text-sm ${theme.textColor} placeholder:text-gray-400 focus:border-fuchsia-500/50 outline-none ${theme.inputBg}`}
                    />
                    <input
                      type="text"
                      placeholder="School"
                      value={edu.school}
                      onChange={(e) => handleEducationChange(idx, 'school', e.target.value)}
                      className={`border rounded-lg px-3 py-2 text-sm ${theme.textColor} placeholder:text-gray-400 focus:border-fuchsia-500/50 outline-none ${theme.inputBg}`}
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Field of Study"
                      value={edu.field}
                      onChange={(e) => handleEducationChange(idx, 'field', e.target.value)}
                      className={`flex-1 border rounded-lg px-3 py-2 text-sm ${theme.textColor} placeholder:text-gray-400 focus:border-fuchsia-500/50 outline-none ${theme.inputBg}`}
                    />
                    <input
                      type="text"
                      placeholder="Year"
                      value={edu.year}
                      onChange={(e) => handleEducationChange(idx, 'year', e.target.value)}
                      className={`flex-1 border rounded-lg px-3 py-2 text-sm ${theme.textColor} placeholder:text-gray-400 focus:border-fuchsia-500/50 outline-none ${theme.inputBg}`}
                    />
                    {education.length > 1 && (
                      <button
                        onClick={() => removeEducation(idx)}
                        className={`p-2 rounded-lg ${
                          isDarkMode 
                            ? "bg-red-500/20 hover:bg-red-500/40 text-white" 
                            : "bg-red-100 hover:bg-red-200 text-black"
                        }`}
                      >
                        <FiTrash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "certifications":
        return (
          <div className="space-y-3">
            <div className="flex justify-between items-center mb-3">
              <p className={`text-sm ${theme.textMuted}`}>Certifications</p>
              <button
                onClick={addCertification}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${
                  isDarkMode 
                    ? "bg-fuchsia-500/20 hover:bg-fuchsia-500/40 text-white" 
                    : "bg-fuchsia-100 hover:bg-fuchsia-200 text-black"
                }`}
              >
                <FiPlus size={14} /> Add
              </button>
            </div>
            {certifications.map((cert, idx) => (
              <div key={idx} className="space-y-2">
                <div className={`flex flex-col sm:flex-row gap-2 items-center border rounded-xl p-3 ${theme.card}`}>
                  <input
                    type="text"
                    placeholder="Title"
                    value={cert.title}
                    onChange={(e) => handleCertificationChange(idx, 'title', e.target.value)}
                    className={`w-full sm:flex-1 border rounded-lg px-3 py-2 text-sm ${theme.textColor} placeholder:text-gray-400 focus:border-fuchsia-500/50 outline-none ${theme.inputBg}`}
                  />
                  <input
                    type="text"
                    placeholder="Issuer"
                    value={cert.issuer}
                    onChange={(e) => handleCertificationChange(idx, 'issuer', e.target.value)}
                    className={`w-full sm:flex-1 border rounded-lg px-3 py-2 text-sm ${theme.textColor} placeholder:text-gray-400 focus:border-fuchsia-500/50 outline-none ${theme.inputBg}`}
                  />
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <input
                      type="month"
                      value={cert.date}
                      onChange={(e) => handleCertificationChange(idx, 'date', e.target.value)}
                      className={`flex-1 border rounded-lg px-3 py-2 text-sm ${theme.textColor} focus:border-fuchsia-500/50 outline-none ${theme.inputBg}`}
                    />
                    {certifications.length > 1 && (
                      <button
                        onClick={() => removeCertification(idx)}
                        className={`p-2 rounded-lg ${
                          isDarkMode 
                            ? "bg-red-500/20 hover:bg-red-500/40 text-white" 
                            : "bg-red-100 hover:bg-red-200 text-black"
                        }`}
                      >
                        <FiTrash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "profile_completion":
        return (
          <div className="space-y-4">
            {/* Profile Photo Upload - Compact */}
            <div className={`p-4 rounded-xl border ${
              isDarkMode 
                ? "bg-gradient-to-br from-fuchsia-500/10 to-indigo-500/10 border-fuchsia-500/20" 
                : "bg-gradient-to-br from-fuchsia-50 to-indigo-50 border-fuchsia-200"
            }`}>
              <label className={`block font-medium mb-3 text-sm ${theme.textColor}`}>
                Profile Photo
              </label>
              <div className="flex items-center gap-4">
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Profile Preview"
                    className="w-20 h-20 rounded-full object-cover border-2 border-fuchsia-500"
                  />
                ) : (
                  <div className={`w-20 h-20 rounded-full border-2 border-dashed flex items-center justify-center ${
                    isDarkMode 
                      ? "bg-fuchsia-500/20 border-fuchsia-500" 
                      : "bg-fuchsia-100 border-fuchsia-300"
                  }`}>
                    <FiUpload className={isDarkMode ? "text-white" : "text-black"} size={24} />
                  </div>
                )}
                <label className="cursor-pointer flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <div className={`border border-dashed rounded-lg p-3 text-center transition-all hover:scale-[1.02] ${
                    isDarkMode 
                      ? "bg-fuchsia-500/10 hover:bg-fuchsia-500/20 border-fuchsia-500/30" 
                      : "bg-white hover:bg-fuchsia-50 border-fuchsia-200"
                  }`}>
                    <FiUpload className={`mx-auto mb-1 ${isDarkMode ? "text-white" : "text-black"}`} size={18} />
                    <p className={`text-xs font-medium ${isDarkMode ? "text-white" : "text-black"}`}>
                      Upload Photo
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Professional Bio */}
            <div className="flex flex-col">
              <label className={`text-xs uppercase tracking-[0.1em] mb-1.5 ml-1 ${theme.textMuted}`}>
                Professional Bio
              </label>
              <textarea 
                className={`w-full border rounded-xl p-3 text-sm ${theme.textColor} placeholder:text-gray-400 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/20 outline-none transition-all resize-none ${theme.inputBg}`}
                rows="3"
                placeholder="Write a compelling professional summary about yourself..."
                onChange={(e) => updateProfileAnswer("bio", e.target.value)}
                value={answers[chapter.id]?.bio || ""}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 font-sans transition-colors duration-700 ${theme.bg}`}>
      {/* Background Elements - Subtle */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className={`absolute top-[-10%] left-[-10%] w-[60%] h-[30%] blur-[80px] rounded-full ${
          isDarkMode ? 'bg-fuchsia-900/10' : 'bg-fuchsia-500/5'
        }`} />
      </div>

      <div className={`w-full max-w-lg backdrop-blur-sm rounded-2xl p-6 border transition-all duration-500 ${theme.card}`}>
        <ProgressDisplay current={currentStep + 1} total={chapters.length} isDarkMode={isDarkMode} />

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            {React.cloneElement(chapter.icon, { 
              className: `h-4 w-4 ${isDarkMode ? 'text-white' : 'text-black'}`
            })}
            <span className={`text-xs font-medium uppercase tracking-wider ${theme.textColor}`}>
              Chapter {String(chapter.id).padStart(2, '0')}
            </span>
          </div>
          
          <h2 className={`text-2xl font-bold mb-2 leading-tight ${theme.textColor}`}>
            {chapter.title}
          </h2>
          
          <p className={`italic mb-3 text-sm border-l pl-3 py-0.5 ${theme.textColor} ${
            isDarkMode ? 'border-fuchsia-500/30' : 'border-fuchsia-300'
          }`}>
            "{chapter.quote}"
          </p>
          
          <p className={`text-sm leading-relaxed mb-4 ${theme.textColor}`}>
            {chapter.text}
          </p>

          <FounderMessage messageText={chapter.message} isDarkMode={isDarkMode} />

          <div className={`space-y-4 pt-3 border-t ${
            isDarkMode ? 'border-white/5' : 'border-fuchsia-100'
          }`}>
            <h3 className={`text-base font-medium ${theme.textColor}`}>
              {chapter.question}
            </h3>
            {renderChapterContent()}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button 
            onClick={() => setCurrentStep(prev => prev - 1)} 
            disabled={currentStep === 0 || loading} 
            className={`px-6 py-2.5 rounded-lg transition-all text-sm font-medium ${
              isDarkMode 
                ? 'bg-white/5 text-white hover:bg-white/10 disabled:opacity-0' 
                : 'bg-fuchsia-50 text-black hover:bg-fuchsia-100 disabled:opacity-0'
            }`}
          >
            Back
          </button>
          
          <button 
            onClick={handleNext} 
            disabled={loading}
            className={`group px-8 py-3 rounded-xl font-medium flex items-center gap-2 transition-all active:scale-95 shadow-md text-sm ${
              isDarkMode 
                ? 'bg-fuchsia-600 text-white hover:bg-fuchsia-700' 
                : 'bg-[#2d124d] text-white hover:bg-fuchsia-600'
            }`}
          >
            {loading ? "Saving..." : currentStep === chapters.length - 1 ? "Complete" : "Continue"}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}