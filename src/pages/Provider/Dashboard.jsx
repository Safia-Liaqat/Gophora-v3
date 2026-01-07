import React, { useState, useEffect } from "react";
import { Briefcase, Users, Activity, ShieldCheck } from "lucide-react";
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

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-[#000000] mb-6">
        Provider Dashboard
      </h1>

      {error && (
        <p className="text-red-500 bg-red-500/10 p-3 rounded-lg mb-6">{error}</p>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          title="Total Opportunities"
          value={stats.totalOpportunities}
          subtitle="All opportunities you have posted"
          icon={<Briefcase className="w-5 h-5 text-[#333333]" />}
          onClick={() => navigate("/provider/opportunities")}
        />

        <StatCard
          title="Applications Received"
          value={stats.applicationsReceived}
          subtitle="Across all your opportunities"
          icon={<Users className="w-5 h-5 text-[#333333]" />}
          onClick={() => navigate("/provider/applications")}
        />

        <StatCard
          title="Active Listings"
          value={stats.activeListings}
          subtitle="Currently open opportunities"
          icon={<Activity className="w-5 h-5 text-[#333333]" />}
          onClick={() => navigate("/provider/opportunities")}
        />
      </div>

      {/* Verification Section */}
      <div className="border border-[#333333] rounded-lg p-6 bg-white hover:shadow-md transition">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-[#333333]" />
          <h3 className="text-lg font-semibold text-[#000000]">Verification Status</h3>
        </div>

        {verification.status === "verified" ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-600 font-semibold flex items-center gap-2">
              <FiCheck /> AI Verified – Professional Level
            </p>
            <p className="text-[#000000] font-medium mt-2">
              Trust Score: {verification.trustScore}%
            </p>
            <p className="text-sm text-[#333333]">Reason: {verification.reason}</p>
            <button
              onClick={() => navigate("/provider/verify")}
              className="mt-4 px-5 py-2 rounded bg-[#FF4F00] text-white hover:bg-[#e64400] transition"
            >
              Re-verify
            </button>
          </div>
        ) : (
          <div>
            <p className="text-sm text-[#333333] mb-3">
              Your profile is not yet verified. Complete verification to increase trust and visibility on GOPHORA.
            </p>
            <button
              onClick={() => navigate("/provider/verify")}
              className="px-5 py-2 rounded bg-[#FF4F00] text-white hover:bg-[#e64400] transition"
            >
              Start Verification
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* Reusable StatCard component */
function StatCard({ title, value, subtitle, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer border border-[#333333] rounded-lg p-6 bg-white hover:shadow-md transition hover:bg-[#F5F5F5]"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm text-[#333333]">{title}</h3>
        {icon}
      </div>
      <p className="text-3xl font-bold text-[#000000]">{value}</p>
      {subtitle && <p className="mt-2 text-sm text-[#333333]">{subtitle}</p>}
    </div>
  );
}
