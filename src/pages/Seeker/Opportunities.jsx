import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { APIURL } from "../../services/api.js";

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [appliedIds, setAppliedIds] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOpportunities = async () => {
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in to see opportunities.");
          return;
        }

        const personalizedResponse = await fetch(
          `${APIURL}/api/opportunities/recommend`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!personalizedResponse.ok)
          throw new Error("Failed to fetch opportunities");

        let personalizedData = await personalizedResponse.json();

        if (!personalizedData || personalizedData.length === 0) {
          const generalResponse = await fetch(`${APIURL}/api/opportunities`);
          if (generalResponse.ok) {
            const generalData = await generalResponse.json();
            setOpportunities(Array.isArray(generalData) ? generalData : []);
          } else {
            setOpportunities([]);
          }
        } else {
          setOpportunities(
            Array.isArray(personalizedData) ? personalizedData : []
          );
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message || "Failed to load opportunities");

        try {
          const generalResponse = await fetch(`${APIURL}/api/opportunities`);
          if (generalResponse.ok) {
            const generalData = await generalResponse.json();
            setOpportunities(Array.isArray(generalData) ? generalData : []);
            setError("");
          }
        } catch (fallbackErr) {
          console.error("Fallback also failed:", fallbackErr);
        }
      }
    };
    fetchOpportunities();
  }, []);

  const handleApply = (opportunity) => {
    if (opportunity.sourceLink) {
      window.open(opportunity.sourceLink, "_blank");
      setAppliedIds((prev) => [...prev, opportunity.id]);
      const key = "applicationsSentDelta";
      const current = parseInt(localStorage.getItem(key) || "0", 10);
      localStorage.setItem(key, String(current + 1));
    } else {
      setError("No application link available for this opportunity");
    }
  };

  const safeOpportunities = Array.isArray(opportunities) ? opportunities : [];
  const availableLocations = [
    ...new Set(safeOpportunities.map((op) => op.location).filter(Boolean)),
  ];

  const filteredOpportunities = safeOpportunities.filter((op) => {
    const matchesCategory = selectedCategory
      ? op.type === selectedCategory
      : true;
    const matchesLocation = selectedLocation
      ? op.location === selectedLocation
      : true;
    return matchesCategory && matchesLocation;
  });

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedLocation("");
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen p-6 text-black">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold tracking-tight">
          Opportunities
        </h2>
        <p className="text-[#333333]/70 mt-1">
          Find missions that match your skills
        </p>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-6 rounded-xl border border-[#FF4F00]/30 bg-[#FF4F00]/10 px-4 py-3 text-[#FF4F00] font-medium">
          Unable to load opportunities. Showing general listings…
        </div>
      )}

      {/* Filters Card */}
      <div className="mb-8 max-w-5xl rounded-2xl border border-[#333333]/20 bg-[#FFFFFF] p-6 shadow-sm">
        <h3 className="mb-4 font-semibold text-[#333333]">
          Filter Opportunities
        </h3>

        <div className="flex flex-col gap-4 md:flex-row">
          {/* Category */}
          <div className="flex-1">
            <label className="mb-2 block font-medium text-[#333333]">
              Category
            </label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none rounded-xl border-2 border-[#333333]/30 bg-[#FFFFFF] p-3 pr-10 focus:border-[#FF4F00] focus:outline-none focus:ring-2 focus:ring-[#FF4F00]"
              >
                <option value="">All Categories</option>
                <option value="job">Job</option>
                <option value="internship">Internship</option>
                <option value="hackathon">Hackathon</option>
                <option value="project">Project</option>
                <option value="collaboration">Collaboration</option>
                <option value="other">Other</option>
              </select>
              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#FF4F00]"
              />
            </div>
          </div>

          {/* Location */}
          <div className="flex-1">
            <label className="mb-2 block font-medium text-[#333333]">
              Location
            </label>
            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                disabled={safeOpportunities.length === 0}
                className={`w-full appearance-none rounded-xl border-2 border-[#333333]/30 bg-[#FFFFFF] p-3 pr-10 focus:border-[#FF4F00] focus:outline-none focus:ring-2 focus:ring-[#FF4F00] ${
                  safeOpportunities.length === 0
                    ? "cursor-not-allowed opacity-60"
                    : ""
                }`}
              >
                <option value="">Select Location</option>
                {availableLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#FF4F00]"
              />
            </div>
          </div>

          {/* Clear */}
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="rounded-xl border-2 border-[#333333]/30 bg-[#FFFFFF] px-6 py-3 text-[#333333] transition hover:border-[#FF4F00]"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <p className="mb-3 text-sm text-[#333333]/70">
        Showing {filteredOpportunities.length} of{" "}
        {safeOpportunities.length} opportunities
      </p>

      {/* Empty State */}
      {filteredOpportunities.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[#333333]/20 bg-[#FFFFFF] py-20 text-center shadow-sm">
          <div className="mb-4 text-4xl text-[#333333]/40">📍</div>
          <h4 className="mb-2 text-lg font-semibold">
            No opportunities found
          </h4>
          <p className="mb-4 text-sm text-[#333333]/70">
            Try adjusting your filters or check back later for new missions.
          </p>
          <button
            onClick={clearFilters}
            className="rounded-full bg-[#FF4F00] px-6 py-2 font-semibold text-white hover:bg-[#E04600]"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Opportunities Table */}
      {filteredOpportunities.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-[#333333]/20 bg-[#FFFFFF] shadow-sm">
          <table className="min-w-full text-left text-[#333333]">
            <thead className="border-b border-[#333333]/20 bg-[#333333] text-white uppercase text-sm tracking-wide">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Tags</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOpportunities.map((op) => (
                <tr
                  key={op.id}
                  className="border-t border-[#333333]/10 transition hover:bg-[#FF4F00]/5"
                >
                  <td className="px-4 py-3">{op.title}</td>
                  <td className="px-4 py-3 capitalize">{op.type}</td>
                  <td className="px-4 py-3">{op.location}</td>
                  <td className="px-4 py-3">
                    {(op.tags || []).join(", ")}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleApply(op)}
                      disabled={appliedIds.includes(op.id)}
                      className={`rounded-xl px-4 py-2 font-semibold transition ${
                        appliedIds.includes(op.id)
                          ? "cursor-not-allowed bg-[#333333]/10 text-[#333333]/50"
                          : "bg-[#FF4F00] text-white hover:bg-[#E04600]"
                      }`}
                    >
                      {appliedIds.includes(op.id) ? "Applied" : "Apply"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}