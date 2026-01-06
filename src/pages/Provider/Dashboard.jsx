import React, { useState, useEffect } from "react";
import { Briefcase, Users, Activity, ShieldCheck } from "lucide-react"; // Activity = flash
import { FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { APIURL } from "../../services/api.js";

export default function ProviderDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalOpportunities: 0,
    applicationsReceived: 0,
    activeListings: 0,
  });

  const [verification, setVerification] = useState({
    status: "not_verified",
    trustScore: null,
    reason: "",
  });

  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found.");

        const oppsRes = await fetch(`${APIURL}/opportunities/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (oppsRes.ok) {
          const opportunities = await oppsRes.json();
          let totalApplications = 0;

          for (const op of opportunities) {
            const appsRes = await fetch(`${APIURL}/opportunities/${op.id}/applications`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (appsRes.ok) {
              const applications = await appsRes.json();
              totalApplications += applications.length;
            }
          }

          setStats({
            totalOpportunities: opportunities.length,
            activeListings: opportunities.filter((op) => op.status === "open").length,
            applicationsReceived: totalApplications,
          });
        }

        const verifyRes = await fetch(`${APIURL}/api/verification/status`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (verifyRes.ok) {
          const data = await verifyRes.json();
          setVerification({
            status: data.status,
            trustScore: data.trust_score,
            reason: data.reason,
          });
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDashboardData();
  }, []);

  const theme = {
    card: isDarkMode ? "bg-white/[0.02] border-white/5 rounded-2xl shadow-lg p-6" : "bg-white border-fuchsia-100 rounded-2xl shadow-lg p-6",
    text: isDarkMode ? "text-white" : "text-black",
    subtitle: isDarkMode ? "text-gray-300" : "text-gray-700",
    buttonPrimary: isDarkMode
      ? "bg-gradient-to-br from-fuchsia-600 to-purple-700 text-white hover:scale-105 transition-all"
      : "bg-gradient-to-br from-fuchsia-500 to-indigo-600 text-white hover:scale-105 transition-all",
    statIcon: "w-6 h-6 text-[#C5A3FF]",
  };

  return (
    <div className="flex flex-col gap-10 px-4 sm:px-6 lg:px-0">
      {/* Welcome Header with Flash Icon and Line */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-[#C5A3FF]" /> {/* Flash icon on left */}
          <h2 className={`text-3xl font-semibold ${theme.text}`}>
            Welcome, Opportunity Provider
          </h2>
        </div>
        <div className="border-b border-fuchsia-300 w-36"></div> {/* Line under header */}
        <p className={`${theme.subtitle} mt-2`}>
          Manage your posted opportunities and track engagement here.
        </p>
      </div>

      {error && (
        <p className="text-red-500 bg-red-500/10 p-3 rounded-2xl">{error}</p>
      )}

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Total Opportunities", value: stats.totalOpportunities, icon: <Briefcase className={theme.statIcon} /> },
          { title: "Applications Received", value: stats.applicationsReceived, icon: <Users className={theme.statIcon} /> },
          { title: "Active Listings", value: stats.activeListings, icon: <Activity className={theme.statIcon} /> },
        ].map((stat) => (
          <div key={stat.title} className={theme.card}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-semibold ${theme.text}`}>{stat.title}</h3>
              <div>{stat.icon}</div>
            </div>
            <p className={`text-4xl font-bold ${theme.text}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Verification Section */}
      <div className={theme.card}>
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-6 h-6 text-[#C5A3FF]" />
          <h3 className={`text-lg font-semibold ${theme.text}`}>Verification Status</h3>
        </div>

        {verification.status === "verified" ? (
          <div className="bg-green-500/10 border border-green-400/40 rounded-xl p-5 flex flex-col gap-3">
            <p className="text-green-400 font-semibold text-lg flex items-center gap-2">
              <FiCheck /> AI Verified – Professional Level
            </p>
            <p className={`${theme.text} font-medium`}>Trust Score: {verification.trustScore}%</p>
            <p className="text-gray-300 text-sm">Reason: {verification.reason}</p>
            <button
              onClick={() => navigate("/provider/verify")}
              className={`mt-4 px-5 py-2 rounded-lg ${theme.buttonPrimary} w-max`}
            >
              Re-verify
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className={`${theme.subtitle}`}>
              Your profile is not yet verified. Complete verification to increase trust and visibility on GOPHORA.
            </p>
            <button
              onClick={() => navigate("/provider/verify")}
              className={`px-5 py-2 rounded-lg ${theme.buttonPrimary} w-max`}
            >
              Start Verification
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
