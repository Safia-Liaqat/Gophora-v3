import React, { useState } from "react";
import { X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { FaRocket, FaLightbulb, FaUsers, FaGlobe, FaChartLine } from "react-icons/fa";

export default function ExploreMissions() {
  const { t } = useTranslation();

  const missions = [
    { id: 1, title: t("m1_title"), example: t("m1_ex"), icon: <FaRocket />, color: "bg-[#FF4F00]" },
    { id: 2, title: t("m2_title"), example: t("m2_ex"), icon: <FaLightbulb />, color: "bg-[#FF4F00]" },
    { id: 3, title: t("m3_title"), example: t("m3_ex"), icon: <FaUsers />, color: "bg-[#FF4F00]" },
    { id: 4, title: t("m4_title"), example: t("m4_ex"), icon: <FaGlobe />, color: "bg-[#FF4F00]" },
    { id: 5, title: t("m5_title"), example: t("m5_ex"), icon: <FaChartLine />, color: "bg-[#FF4F00]" },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);
  const [idea, setIdea] = useState("");

  const openModal = (mission) => {
    setSelectedMission(mission);
    setIdea("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedMission(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(t("toast_success"), {
      style: {
        background: "#FFFFFF",
        color: "#000000",
        border: "1px solid #FF4F00",
        fontWeight: "500",
        borderRadius: "12px",
      },
      iconTheme: {
        primary: "#FF4F00",
        secondary: "#000000",
      },
    });
    closeModal();
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-black pt-24 px-4 sm:px-6 relative">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Header */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-black tracking-tight">
            {t("explore_title")}
          </h2>
          <div className="w-24 h-1 bg-[#FF4F00] mx-auto mb-6 rounded-full"></div>
          <p className="text-[#333333] text-lg max-w-3xl mx-auto leading-relaxed">
            {t("explore_desc")}
          </p>
        </div>

        {/* Missions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className="bg-white border border-[#333333]/20 rounded-2xl p-6 shadow-md hover:shadow-xl hover:border-[#FF4F00] transition-all duration-300 group hover:scale-[1.02]"
            >
              {/* Icon Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl ${mission.color} flex items-center justify-center text-white text-xl shadow-md`}>
                  {mission.icon}
                </div>
                <div>
                  <div className="text-xs text-[#333333]/70 font-mono">Mission #{mission.id}</div>
                  <h3 className="text-xl font-bold text-black">{mission.title}</h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-[#333333] mb-6 text-sm leading-relaxed">
                {mission.example}
              </p>
              
              {/* Button */}
              <button
                onClick={() => openModal(mission)}
                className="w-full py-3 bg-[#FF4F00] hover:bg-[#E04600] text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {t("mission_submit_btn")}
              </button>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "24h", label: "Activation Time" },
            { value: "100%", label: "Mission Focus" },
            { value: "0", label: "CV Required" },
            { value: "∞", label: "Potential" }
          ].map((stat, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-2xl p-6 text-center border-2 border-[#333333]/20 shadow-sm hover:shadow-lg hover:border-[#FF4F00] transition-all duration-300 group"
            >
              {/* Accent bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-[#FF4F00] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Value */}
              <div className="text-4xl font-extrabold text-black mb-3 tracking-tight">
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-sm font-semibold text-[#333333] uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-[#FFFFFF] border border-[#333333]/30 rounded-2xl w-full max-w-md relative shadow-2xl">
            {/* Close Button */}
            <button 
              onClick={closeModal} 
              className="absolute -top-3 -right-3 bg-[#FFFFFF] hover:bg-[#FF4F00]/10 rounded-full p-2 border border-[#FF4F00] transition-all duration-300 z-10"
            >
              <X size={18} className="text-[#333333]" />
            </button>
            
            {/* Modal Content */}
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-[#FF4F00] flex items-center justify-center text-white text-xl shadow-md">
                  {selectedMission?.icon || <FaRocket />}
                </div>
                <div>
                  <div className="text-sm text-[#333333] font-mono">MISSION BRIEF</div>
                  <h3 className="text-2xl font-bold text-black">
                    Submit: <span className="text-[#FF4F00]">{selectedMission?.title}</span>
                  </h3>
                </div>
              </div>
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-3">
                    Your Mission Proposal
                  </label>
                  <textarea
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder={t("placeholder_idea")}
                    required
                    rows={5}
                    className="w-full p-4 bg-[#FFFFFF] border border-[#333333]/30 rounded-xl text-black placeholder-[#333333]/60 focus:outline-none focus:border-[#FF4F00] focus:ring-2 focus:ring-[#FF4F00] transition-all duration-300 resize-none"
                    maxLength={500}
                  />
                  <div className="text-right mt-2">
                    <span className={`text-xs ${idea.length >= 490 ? 'text-[#FF4F00]' : 'text-[#333333]/70'}`}>
                      {idea.length}/500 characters
                    </span>
                  </div>
                </div>
                
                {/* Action Buttons */}
<div className="flex gap-4 pt-4">
  <button
    type="button"
    onClick={closeModal}
    className="flex-1 py-3 px-4 bg-[#FFFFFF] border-2 border-[#333333]/30 rounded-xl text-[#333333] text-sm font-semibold transition-all duration-300 hover:border-[#FF4F00] hover:text-[#000000] hover:shadow-md"
  >
    Cancel
  </button>
  <button
    type="submit"
    className="flex-1 py-3 px-4 bg-[#FF4F00] hover:bg-[#E04600] rounded-xl text-white text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#FF4F00]/30"
  >
    {t("btn_submit")}
  </button>
</div>

              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
