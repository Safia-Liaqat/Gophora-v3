import React, { useState, useEffect } from "react";
import { ChevronDown, Star } from "lucide-react"; // Added Star icon
import OpportunityForm from "../../components/forms/OpportunityForm";
import { APIURL } from "../../services/api.js";

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [editingOp, setEditingOp] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
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

  const fetchOpportunities = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${APIURL}/opportunities/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch opportunities");
      const data = await response.json();
      setOpportunities(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const handleEdit = (op) => setEditingOp(op);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this opportunity?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${APIURL}/opportunities/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to delete opportunity");
        setOpportunities(opportunities.filter((op) => op.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleUpdate = async (updatedOp) => {
    try {
      const token = localStorage.getItem("token");
      const processedData = {
        ...updatedOp,
        tags: updatedOp.tags ? updatedOp.tags.split(",").map((tag) => tag.trim()) : [],
      };
      const response = await fetch(`${APIURL}/opportunities/${updatedOp.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(processedData),
      });
      if (!response.ok) throw new Error("Failed to update opportunity");
      const data = await response.json();
      setOpportunities(opportunities.map((op) => (op.id === data.id ? data : op)));
      setEditingOp(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredOpportunities = opportunities.filter((op) => {
    const matchesSearch =
      (op.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (op.tags?.join(", ") || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || op.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const theme = {
    bgCard: isDarkMode ? "bg-white/[0.02] border-white/10" : "bg-white border-fuchsia-100 shadow-lg",
    text: isDarkMode ? "text-white" : "text-black",
    accent: "text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-400",
    input: isDarkMode
      ? "bg-white/5 text-white border-white/10 placeholder-gray-400 focus:ring-fuchsia-400"
      : "bg-white text-black border-fuchsia-100 placeholder-gray-500 focus:ring-fuchsia-500",
    buttonPrimary: isDarkMode
      ? "bg-gradient-to-br from-fuchsia-600 to-purple-700 text-white hover:scale-105 transition-all"
      : "bg-gradient-to-br from-fuchsia-500 to-indigo-600 text-white hover:scale-105 transition-all",
    buttonSecondary: isDarkMode
      ? "bg-fuchsia-500/20 text-white hover:bg-fuchsia-500/30 transition-all"
      : "bg-fuchsia-100 text-black hover:bg-fuchsia-200 transition-all",
    tableHeader: isDarkMode ? "bg-white/5 text-white" : "bg-fuchsia-100 text-black",
    tableRowHover: isDarkMode ? "hover:bg-white/5" : "hover:bg-fuchsia-50",
    tableText: isDarkMode ? "text-white" : "text-black",
    error: isDarkMode ? "text-red-500 bg-red-500/10" : "text-red-600 bg-red-100",
    optionBg: isDarkMode ? "bg-[#161B30] text-white" : "bg-white text-black",
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header with new logo */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Star className="w-6 h-6 text-[#C5A3FF]" /> {/* New logo */}
          <h2 className={`text-3xl font-bold ${theme.text}`}>My Opportunities</h2>
        </div>
        <div className="border-b border-fuchsia-300 w-36"></div>
        <p className={`text-sm ${theme.text}`}>Manage and track all your posted opportunities.</p>
      </div>

      {error && <p className={`p-3 rounded-2xl ${theme.error}`}>{error}</p>}

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by title or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`flex-1 p-3 rounded-xl border focus:outline-none focus:ring-2 ${theme.input} shadow-sm`}
        />

        <div className="relative w-full md:w-60">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={`w-full p-3 pr-10 rounded-xl border appearance-none focus:outline-none focus:ring-2 ${theme.input} shadow-sm`}
          >
            {[ 
              { value: "all", label: "All Types" },
              { value: "job", label: "Job" },
              { value: "internship", label: "Internship" },
              { value: "hackathon", label: "Hackathon" },
              { value: "project", label: "Project" },
              { value: "collaboration", label: "Collaboration" },
              { value: "other", label: "Other" },
            ].map((opt) => (
              <option key={opt.value} value={opt.value} className={theme.optionBg}>
                {opt.label}
              </option>
            ))}
          </select>

          <ChevronDown
            size={18}
            className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${theme.text}`}
          />
        </div>
      </div>

      {/* Edit Form */}
      {editingOp && (
        <div className={`${theme.bgCard} border p-6 rounded-2xl shadow-lg`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme.accent}`}>Edit Opportunity</h3>
          <OpportunityForm
            onSubmit={(data) => handleUpdate({ ...editingOp, ...data })}
            initialData={editingOp}
          />
          <button
            onClick={() => setEditingOp(null)}
            className={`mt-4 px-4 py-2 rounded-lg ${theme.buttonSecondary}`}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Opportunities Table */}
      {filteredOpportunities.length === 0 ? (
        <p className={`italic ${theme.tableText}`}>No opportunities found.</p>
      ) : (
        <div className={`${theme.bgCard} border rounded-2xl overflow-x-auto shadow-lg`}>
          <table className="min-w-full text-left text-sm">
            <thead className={`${theme.tableHeader} rounded-t-xl`}>
              <tr>
                {["Title", "Type", "Status", "Tags", "Actions"].map((header) => (
                  <th key={header} className="p-4 font-semibold">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOpportunities.map((op) => (
                <tr
                  key={op.id}
                  className={`border-t border-white/10 ${theme.tableRowHover} transition`}
                >
                  <td className={`p-4 ${theme.tableText}`}>{op.title}</td>
                  <td className={`p-4 capitalize ${theme.tableText}`}>{op.type}</td>
                  <td className={`p-4 capitalize ${theme.tableText}`}>{op.status}</td>
                  <td className={`p-4 ${theme.tableText}`}>{(op.tags || []).join(", ")}</td>
                  <td className="p-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(op)}
                      className={`px-4 py-1 rounded-lg ${theme.buttonPrimary}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(op.id)}
                      className="px-4 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
                    >
                      Delete
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
