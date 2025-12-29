import React, { useState } from "react";
import { X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { FaRocket, FaLightbulb, FaUsers, FaGlobe, FaChartLine } from "react-icons/fa";

export default function ExploreMissions() {
  const { t } = useTranslation();

  const missions = [
    { id: 1, title: t("m1_title"), example: t("m1_ex"), icon: <FaRocket />, color: "from-purple-500 to-pink-500" },
    { id: 2, title: t("m2_title"), example: t("m2_ex"), icon: <FaLightbulb />, color: "from-blue-500 to-cyan-500" },
    { id: 3, title: t("m3_title"), example: t("m3_ex"), icon: <FaUsers />, color: "from-emerald-500 to-green-500" },
    { id: 4, title: t("m4_title"), example: t("m4_ex"), icon: <FaGlobe />, color: "from-amber-500 to-yellow-500" },
    { id: 5, title: t("m5_title"), example: t("m5_ex"), icon: <FaChartLine />, color: "from-indigo-500 to-purple-500" },
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
        background: "rgba(17, 24, 39, 0.9)",
        backdropFilter: "blur(10px)",
        color: "#fff",
        border: "1px solid rgba(139, 92, 246, 0.5)",
        fontWeight: "500",
        borderRadius: "12px",
      },
      iconTheme: {
        primary: "#8b5cf6",
        secondary: "#111827",
      },
    });
    closeModal();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24 px-4 sm:px-6 relative">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <Toaster position="top-right" reverseOrder={false} />

      {/* Header */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            {t("explore_title")}
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            {t("explore_desc")}
          </p>
        </div>

        {/* Missions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className="bg-gradient-to-b from-gray-900/80 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 group hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/10"
            >
              {/* Icon Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${mission.color} flex items-center justify-center text-white text-xl`}>
                  {mission.icon}
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-mono">Mission #{mission.id}</div>
                  <h3 className="text-xl font-bold text-white">{mission.title}</h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                {mission.example}
              </p>
              
              {/* Button */}
              <button
                onClick={() => openModal(mission)}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group-hover:shadow-purple-500/30"
              >
                {t("mission_submit_btn")}
              </button>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "24h", label: "Activation Time", color: "text-purple-400" },
            { value: "100%", label: "Mission Focus", color: "text-pink-400" },
            { value: "0", label: "CV Required", color: "text-blue-400" },
            { value: "∞", label: "Potential", color: "text-emerald-400" }
          ].map((stat, idx) => (
            <div 
              key={idx}
              className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center hover:border-purple-500/30 transition-colors duration-300"
            >
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-gradient-to-b from-gray-900/90 to-gray-800/70 backdrop-blur-md border border-gray-700/50 rounded-2xl w-full max-w-md relative shadow-2xl">
            {/* Close Button */}
            <button 
              onClick={closeModal} 
              className="absolute -top-3 -right-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 rounded-full p-2 border border-gray-600 hover:border-purple-500 transition-all duration-300 z-10"
            >
              <X size={18} className="text-gray-300 hover:text-white" />
            </button>
            
            {/* Modal Content */}
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${selectedMission?.color || 'from-purple-500 to-pink-500'} flex items-center justify-center text-white text-xl`}>
                  {selectedMission?.icon || <FaRocket />}
                </div>
                <div>
                  <div className="text-sm text-gray-400 font-mono">MISSION BRIEF</div>
                  <h3 className="text-2xl font-bold text-white">
                    Submit: <span className="text-purple-300">{selectedMission?.title}</span>
                  </h3>
                </div>
              </div>
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Your Mission Proposal
                  </label>
                  <textarea
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder={t("placeholder_idea")}
                    required
                    rows={5}
                    className="w-full p-4 bg-gradient-to-b from-gray-900/50 to-gray-800/30 border border-gray-700/50 rounded-xl text-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                    maxLength={500}
                  />
                  <div className="text-right mt-2">
                    <span className={`text-xs ${idea.length >= 490 ? 'text-red-400' : 'text-gray-500'}`}>
                      {idea.length}/500 characters
                    </span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 py-3 px-4 bg-gradient-to-b from-gray-800/50 to-gray-900/50 hover:from-gray-700/50 hover:to-gray-800/50 border border-gray-700/50 rounded-xl text-gray-300 text-sm font-medium transition-all duration-300 hover:border-gray-600 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
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