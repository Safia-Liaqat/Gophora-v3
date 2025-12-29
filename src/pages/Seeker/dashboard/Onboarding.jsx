import React, { useState } from "react";
// Replace Font Awesome with react-icons/fi:
import { 
  FiZap,      // Changed from FiRocket to FiZap (FiRocket doesn't exist in Feather icons)
  FiUser, 
  FiCode, 
  FiTarget, 
  FiHeart, 
  FiAward,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";

const initialForm = {
  fullName: "",
  skills: "",
  motivation: "",
  stressLevel: 5,
  strengths: "",
  wellnessRating: 5,
};

export default function Onboarding() {
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", form);
    alert("Onboarding Complete!");
  };

  return (
    <div className="min-h-screen bg-[#0E0B16] text-stark flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#0D0D0F]/70 backdrop-blur-xl p-6 md:p-10 rounded-2xl w-full max-w-3xl shadow-lg space-y-6"
      >
        <div className="flex items-center gap-3">
          {/* Changed from FiRocket to FiZap */}
          <FiZap className="text-jewel text-2xl" />
          <h1 className="text-2xl md:text-3xl font-bold text-jewel drop-shadow-md">
            Welcome to GOPHORA
          </h1>
        </div>
        <p className="text-stark/70 text-sm md:text-base">
          Let's get to know you better and match you with the right missions.
        </p>

        {/* Stepper */}
        <div className="flex gap-2 mb-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 rounded-full ${
                step >= s ? "bg-jewel" : "bg-white/20"
              } transition`}
            ></div>
          ))}
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-4">
            <label className="block">
              <div className="flex items-center gap-2 mb-1">
                <FiUser className="text-jewel text-sm" />
                <span>Full Name</span>
              </div>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="mt-1 w-full p-3 rounded-xl bg-[#0E0B16]/50 border border-white/20 text-stark focus:ring-jewel focus:ring-2 outline-none"
                placeholder="Your Name"
                required
              />
            </label>

            <label className="block">
              <div className="flex items-center gap-2 mb-1">
                <FiCode className="text-jewel text-sm" />
                <span>Skills & Expertise</span>
              </div>
              <input
                type="text"
                name="skills"
                value={form.skills}
                onChange={handleChange}
                className="mt-1 w-full p-3 rounded-xl bg-[#0E0B16]/50 border border-white/20 text-stark focus:ring-jewel focus:ring-2 outline-none"
                placeholder="E.g., Surveying, Delivery, Coding"
                required
              />
            </label>
          </div>
        )}

        {/* Step 2: Motivation & Mental Wellness */}
        {step === 2 && (
          <div className="space-y-4">
            <label className="block">
              <div className="flex items-center gap-2 mb-1">
                <FiTarget className="text-jewel text-sm" />
                <span>Motivation</span>
              </div>
              <textarea
                name="motivation"
                value={form.motivation}
                onChange={handleChange}
                className="mt-1 w-full p-3 rounded-xl bg-[#0E0B16]/50 border border-white/20 text-stark focus:ring-jewel focus:ring-2 outline-none"
                placeholder="Why do you want to join missions?"
                rows={3}
                required
              ></textarea>
            </label>

            <label className="block">
              <div className="flex items-center gap-2 mb-1">
                <FiHeart className="text-jewel text-sm" />
                <span>Stress Level (1 = Low, 10 = High)</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                name="stressLevel"
                value={form.stressLevel}
                onChange={handleChange}
                className="w-full"
              />
              <span className="text-stark/70">{form.stressLevel}</span>
            </label>

            <label className="block">
              <div className="flex items-center gap-2 mb-1">
                <FiAward className="text-jewel text-sm" />
                <span>Personal Strengths</span>
              </div>
              <input
                type="text"
                name="strengths"
                value={form.strengths}
                onChange={handleChange}
                className="mt-1 w-full p-3 rounded-xl bg-[#0E0B16]/50 border border-white/20 text-stark focus:ring-jewel focus:ring-2 outline-none"
                placeholder="E.g., Fast learner, Team player"
              />
            </label>
          </div>
        )}

        {/* Step 3: Wellness & Confirmation */}
        {step === 3 && (
          <div className="space-y-4">
            <label className="block">
              <div className="flex items-center gap-2 mb-1">
                <FiHeart className="text-jewel text-sm" />
                <span>Mental Wellness Rating (1 = Poor, 10 = Excellent)</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                name="wellnessRating"
                value={form.wellnessRating}
                onChange={handleChange}
                className="w-full"
              />
              <span className="text-stark/70">{form.wellnessRating}</span>
            </label>

            <p className="text-stark/70 text-sm mt-2">
              Review your info and click "Complete Onboarding" to finish.
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handleBack}
            className="px-5 py-2 rounded-xl bg-white/20 hover:bg-white/30 transition flex items-center gap-2"
            disabled={step === 1}
          >
            <FiChevronLeft />
            Back
          </button>
          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2 rounded-xl bg-jewel text-stark hover:shadow-[0_0_12px_rgba(71,23,246,0.25)] transition flex items-center gap-2"
            >
              Next
              <FiChevronRight />
            </button>
          ) : (
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-fuschia text-stark hover:shadow-[0_0_12px_rgba(162,57,202,0.25)] transition flex items-center gap-2"
            >
              <FiCheckCircle />
              Complete Onboarding
            </button>
          )}
        </div>
      </form>
    </div>
  );
}