import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../components/onboarding/ProgressBar";
import { onboardingUtils } from "../../contexts/onboarding";
import { FiPlus, FiTrash2, FiUpload } from "react-icons/fi";
import { APIURL } from '../../services/api.js';

// Updated helper component with "Audio Inactive" state
const FounderMessage = ({ messageText }) => (
  <div className="my-6 p-4 bg-jewel/5 border border-jewel/20 rounded-xl flex flex-col sm:flex-row items-center gap-4 group">
    <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg cursor-not-allowed opacity-60">
      <div className="w-3 h-3 bg-gray-500 rounded-full" />
      <span className="text-[10px] uppercase tracking-tighter text-stark/50 font-bold">Audio Coming Soon</span>
    </div>
    <p className="text-jewel italic text-sm text-center sm:text-left flex-1">
      "{messageText}"
    </p>
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
    message: "Your purpose is your superpower. – Andrea Covarrubias"
  },
  {
    id: 2,
    title: "The 24-Hour Flame",
    quote: "Time is not your enemy, it's your window of power.",
    text: "You have something to offer today — a skill, a voice, a story. Let's define your explorer toolkit.",
    question: "List your Skills, Hobbies, and Experiences:",
    type: "profile_input",
    fields: ["Skills", "Hobbies", "Experience"],
    message: "In just 24 hours, your life can begin to change."
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
    message: "Your identity is the first chapter of your journey."
  },
  {
    id: 4,
    title: "Awakening Purpose",
    quote: "The future is created by humans who awaken.",
    text: "Purpose is not found, it's activated. Let's document your educational journey and background.",
    question: "Education & Growth:",
    type: "education",
    fields: ["Formal Education", "Self-Taught Education"],
    message: "Purpose isn't something you find. It's something you activate."
  },
  {
    id: 5,
    title: "Career Journey",
    quote: "Your experiences shape your capabilities.",
    text: "Share your professional journey and achievements.",
    question: "Tell us about your work experience:",
    type: "experience",
    message: "Every role you've played adds to your unique story."
  },
  {
    id: 6,
    title: "The Digital Society",
    quote: "We don't work alone, we build together.",
    text: "Everyone has a role. Tell us about the impact you've made and where you want to go.",
    question: "Projects & Contributions:",
    type: "profile_input",
    fields: ["Projects Completed", "Projects you want to contribute to"],
    message: "Your role here is vital. Together, we shape a new civilization."
  },
  {
    id: 7,
    title: "Certifications & Achievements",
    quote: "Your credentials tell a story of dedication.",
    text: "Share your certifications and professional achievements.",
    question: "List your certifications:",
    type: "certifications",
    message: "Every certificate is a milestone in your growth journey."
  },
  {
    id: 8,
    title: "The Economy of Purpose",
    quote: "Money is the energy of human exchange.",
    text: "Every idea shared is energy that transforms into resources or collaboration.",
    question: "What would you like to receive in exchange for your energy?",
    type: "choice",
    options: ["Learning & Growth", "Recognition & Badges", "Direct Income", "Global Opportunities", "All of the above"],
    message: "Every effort you make fuels a new economy."
  },
  {
    id: 9,
    title: "The Interplanetary Leap",
    quote: "Preparing for space starts with understanding Earth.",
    text: "You are training for the next era. Empathy and sustainability are key to expanding life beyond our planet.",
    question: "What would you carry with you beyond Earth?",
    type: "choice",
    options: ["My Purpose", "My Energy", "My Humanity", "My Desire to Connect", "Everything I Am"],
    message: "You are a pioneer of the future."
  },
  {
    id: 10,
    title: "Profile Completion",
    quote: "Your profile is your mission statement.",
    text: "Add a professional photo and bio to complete your profile.",
    question: "Complete your professional profile:",
    type: "profile_completion",
    message: "A complete profile attracts meaningful missions."
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
  const navigate = useNavigate();

  const chapter = chapters[currentStep];

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
          <div className="grid grid-cols-1 gap-3">
            {chapter.options.map(opt => (
              <button
                key={opt}
                onClick={() => setAnswers({...answers, [chapter.id]: opt})}
                className={`p-5 rounded-2xl text-left border transition-all duration-300 ${
                  answers[chapter.id] === opt 
                    ? "bg-jewel border-jewel text-void font-bold shadow-[0_0_20px_rgba(0,255,198,0.3)]" 
                    : "bg-white/5 border-white/10 hover:bg-white/10 text-stark/70"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        );

      case "profile_input":
        return (
          <div className="space-y-6">
            {chapter.fields.map(field => (
              <div key={field} className="flex flex-col">
                <label className="text-[10px] uppercase tracking-[0.2em] text-stark/40 mb-2 ml-1">
                  {field}
                </label>
                <textarea 
                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-stark placeholder:text-stark/20 focus:border-jewel/50 focus:ring-1 focus:ring-jewel/20 outline-none transition-all resize-none"
                  rows="3"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chapter.fields.map(field => (
              <div key={field.key} className={field.key === "fullName" || field.key === "headline" || field.key === "languages" ? "md:col-span-2" : ""}>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-stark/40 mb-2 ml-1">
                  {field.label} {field.required && <span className="text-jewel">*</span>}
                </label>
                <input
                  type={field.type}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-stark placeholder:text-stark/20 focus:border-jewel/50 focus:ring-1 focus:ring-jewel/20 outline-none transition-all"
                  placeholder={`Enter your ${field.label.toLowerCase()}...`}
                  onChange={(e) => updateBasicInfo(field.key, e.target.value)}
                  value={answers[chapter.id]?.[field.key] || ""}
                />
              </div>
            ))}
          </div>
        );

      case "experience":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-stark/70">Add your work experience</p>
              <button
                onClick={addExperience}
                className="flex items-center gap-2 bg-jewel/20 hover:bg-jewel/40 text-jewel px-4 py-2 rounded-xl transition-all"
              >
                <FiPlus size={18} /> Add Experience
              </button>
            </div>
            {experience.map((exp, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    placeholder="Job Title / Role"
                    value={exp.role}
                    onChange={(e) => handleExperienceChange(idx, 'role', e.target.value)}
                    className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-stark placeholder:text-stark/20 focus:border-jewel/50 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Company / Organization"
                    value={exp.organization}
                    onChange={(e) => handleExperienceChange(idx, 'organization', e.target.value)}
                    className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-stark placeholder:text-stark/20 focus:border-jewel/50 outline-none"
                  />
                </div>
                <textarea
                  placeholder="Job description and key achievements..."
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(idx, 'description', e.target.value)}
                  rows="2"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-stark placeholder:text-stark/20 focus:border-jewel/50 mb-3 outline-none resize-none"
                />
                <div className="flex gap-3 items-center">
                  <input
                    type="month"
                    placeholder="Start Date"
                    value={exp.startDate}
                    onChange={(e) => handleExperienceChange(idx, 'startDate', e.target.value)}
                    className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-stark focus:border-jewel/50 outline-none"
                  />
                  <span className="text-white/50">—</span>
                  <input
                    type="month"
                    placeholder="End Date"
                    value={exp.endDate}
                    onChange={(e) => handleExperienceChange(idx, 'endDate', e.target.value)}
                    className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-stark focus:border-jewel/50 outline-none"
                  />
                  {experience.length > 1 && (
                    <button
                      onClick={() => removeExperience(idx)}
                      className="bg-red-500/20 hover:bg-red-500/40 text-red-300 p-3 rounded-xl"
                      title="Remove"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      case "education":
        return (
          <div className="space-y-4">
            <div className="space-y-4 mb-4">
              {chapter.fields.map(field => (
                <div key={field} className="flex flex-col">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-stark/40 mb-2 ml-1">
                    {field}
                  </label>
                  <textarea 
                    className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-stark placeholder:text-stark/20 focus:border-jewel/50 focus:ring-1 focus:ring-jewel/20 outline-none transition-all resize-none"
                    rows="2"
                    placeholder={`Describe your ${field.toLowerCase()}...`}
                    onChange={(e) => updateProfileAnswer(field, e.target.value)}
                    value={answers[chapter.id]?.[field] || ""}
                  />
                </div>
              ))}
            </div>
            
            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between items-center mb-4">
                <p className="text-stark/70">Add formal education details</p>
                <button
                  onClick={addEducation}
                  className="flex items-center gap-2 bg-jewel/20 hover:bg-jewel/40 text-jewel px-4 py-2 rounded-xl transition-all"
                >
                  <FiPlus size={18} /> Add Education
                </button>
              </div>
              {education.map((edu, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      placeholder="Degree (e.g. Bachelor of Science)"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(idx, 'degree', e.target.value)}
                      className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-stark placeholder:text-stark/20 focus:border-jewel/50 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="School / University"
                      value={edu.school}
                      onChange={(e) => handleEducationChange(idx, 'school', e.target.value)}
                      className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-stark placeholder:text-stark/20 focus:border-jewel/50 outline-none"
                    />
                  </div>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Field of Study"
                      value={edu.field}
                      onChange={(e) => handleEducationChange(idx, 'field', e.target.value)}
                      className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-stark placeholder:text-stark/20 focus:border-jewel/50 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Year (e.g. 2023)"
                      value={edu.year}
                      onChange={(e) => handleEducationChange(idx, 'year', e.target.value)}
                      className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-stark placeholder:text-stark/20 focus:border-jewel/50 outline-none"
                    />
                    {education.length > 1 && (
                      <button
                        onClick={() => removeEducation(idx)}
                        className="bg-red-500/20 hover:bg-red-500/40 text-red-300 p-3 rounded-xl"
                        title="Remove"
                      >
                        <FiTrash2 size={16} />
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
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-stark/70">Add your certifications and achievements</p>
              <button
                onClick={addCertification}
                className="flex items-center gap-2 bg-jewel/20 hover:bg-jewel/40 text-jewel px-4 py-2 rounded-xl transition-all"
              >
                <FiPlus size={18} /> Add Certificate
              </button>
            </div>
            {certifications.map((cert, idx) => (
              <div key={idx} className="flex gap-3 items-center bg-white/5 border border-white/10 rounded-2xl p-4">
                <input
                  type="text"
                  placeholder="Certification Title"
                  value={cert.title}
                  onChange={(e) => handleCertificationChange(idx, 'title', e.target.value)}
                  className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-stark placeholder:text-stark/20 focus:border-jewel/50 outline-none"
                />
                <input
                  type="text"
                  placeholder="Issuing Organization"
                  value={cert.issuer}
                  onChange={(e) => handleCertificationChange(idx, 'issuer', e.target.value)}
                  className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-stark placeholder:text-stark/20 focus:border-jewel/50 outline-none"
                />
                <input
                  type="month"
                  placeholder="Date"
                  value={cert.date}
                  onChange={(e) => handleCertificationChange(idx, 'date', e.target.value)}
                  className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-stark focus:border-jewel/50 outline-none"
                />
                {certifications.length > 1 && (
                  <button
                    onClick={() => removeCertification(idx)}
                    className="bg-red-500/20 hover:bg-red-500/40 text-red-300 p-3 rounded-xl"
                    title="Remove"
                  >
                    <FiTrash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        );

      case "profile_completion":
        return (
          <div className="space-y-6">
            {/* Profile Photo Upload */}
            <div className="p-6 bg-gradient-to-br from-jewel/10 to-fuschia/10 border border-jewel/20 rounded-2xl">
              <label className="block text-stark font-semibold mb-4 text-lg">Profile Photo</label>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Profile Preview"
                    className="w-32 h-32 rounded-full object-cover border-4 border-jewel shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-jewel/20 border-4 border-dashed border-jewel flex items-center justify-center">
                    <FiUpload className="text-jewel" size={40} />
                  </div>
                )}
                <label className="cursor-pointer flex-1 w-full">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <div className="bg-jewel/20 hover:bg-jewel/40 border-2 border-dashed border-jewel rounded-2xl p-6 text-center transition-all hover:scale-105">
                    <FiUpload className="text-jewel mx-auto mb-3" size={28} />
                    <p className="text-jewel font-semibold text-lg">Upload Photo</p>
                    <p className="text-jewel/70 text-sm mt-1">PNG, JPG up to 5MB</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Professional Bio */}
            <div className="flex flex-col">
              <label className="text-[10px] uppercase tracking-[0.2em] text-stark/40 mb-2 ml-1">
                Professional Bio
              </label>
              <textarea 
                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-stark placeholder:text-stark/20 focus:border-jewel/50 focus:ring-1 focus:ring-jewel/20 outline-none transition-all resize-none"
                rows="4"
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
    <div className="min-h-screen bg-void flex items-center justify-center p-6 text-stark font-sans">
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl transition-all">
        <ProgressBar currentStep={currentStep + 1} totalSteps={chapters.length} theme="gophora" />

        <div className="mt-8">
          <span className="text-jewel font-mono text-xs tracking-widest uppercase opacity-70">
            Chapter 0{chapter.id}
          </span>
          <h2 className="text-4xl font-bold text-fuschia mb-2 mt-1 leading-tight">{chapter.title}</h2>
          <p className="text-jewel italic mb-6 border-l-2 border-jewel/30 pl-4 py-1">"{chapter.quote}"</p>
          <p className="text-stark/80 text-lg leading-relaxed mb-8">{chapter.text}</p>

          <FounderMessage messageText={chapter.message} />

          <div className="space-y-6 pt-4 border-t border-white/5">
            <h3 className="text-xl font-medium text-stark">{chapter.question}</h3>
            {renderChapterContent()}
          </div>
        </div>

        <div className="mt-12 flex justify-between items-center">
          <button 
            onClick={() => setCurrentStep(prev => prev - 1)} 
            disabled={currentStep === 0 || loading} 
            className="px-8 py-3 rounded-full bg-white/5 text-stark/50 hover:bg-white/10 disabled:opacity-0 transition-all font-medium"
          >
            Back
          </button>
          
          <button 
            onClick={handleNext} 
            disabled={loading}
            className="px-10 py-4 rounded-full bg-gradient-to-r from-jewel to-fuschia text-white font-bold shadow-[0_10px_30px_rgba(255,0,128,0.2)] hover:scale-105 active:scale-95 transition-all"
          >
            {loading ? "Saving Profile..." : currentStep === chapters.length - 1 ? "Complete Journey" : "Next Chapter"}
          </button>
        </div>
      </div>
    </div>
  );
}