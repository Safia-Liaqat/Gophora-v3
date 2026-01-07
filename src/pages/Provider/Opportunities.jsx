import React, { useState, useEffect } from "react";
import OpportunityForm from "../../components/forms/OpportunityForm";
import { APIURL } from "../../services/api";

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [editingOp, setEditingOp] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* =========================
     FETCH OPPORTUNITIES
  ========================= */
  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      const res = await fetch(`${APIURL}/opportunities/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch opportunities");

      const data = await res.json();
      setOpportunities(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  /* =========================
     EDIT
  ========================= */
  const handleEdit = (op) => {
    setEditingOp({
      ...op,
      tags: (op.tags || []).join(", "),
    });
  };

  /* =========================
     DELETE
  ========================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this opportunity?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${APIURL}/opportunities/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete opportunity");

      setOpportunities((prev) => prev.filter((op) => op.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  /* =========================
     UPDATE
  ========================= */
  const handleUpdate = async (updatedData) => {
    try {
      const token = localStorage.getItem("token");

      const payload = {
        ...updatedData,
        tags: updatedData.tags
          ? updatedData.tags.split(",").map((t) => t.trim())
          : [],
      };

      const res = await fetch(`${APIURL}/opportunities/${editingOp.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update opportunity");

      const data = await res.json();

      setOpportunities((prev) =>
        prev.map((op) => (op.id === data.id ? data : op))
      );
      setEditingOp(null);
    } catch (err) {
      setError(err.message);
    }
  };

  /* =========================
     FILTER
  ========================= */
  const filteredOpportunities = opportunities.filter((op) => {
    const matchesSearch =
      op.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (op.tags || []).join(", ").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === "all" || op.type === filterType;

    return matchesSearch && matchesType;
  });

  const getStatusBadge = (status) => {
    const styles = {
      approved: "bg-[#333333] text-white",
      pending: "bg-[#FF4F00] text-white",
      rejected: "bg-[#666666] text-white",
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="bg-white p-6 rounded-lg border border-[#333333] shadow-sm">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#000000]">My Opportunities</h2>
        <p className="text-[#333333] text-sm mt-1">
          Manage and track all your posted opportunities
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-[#FFF0E6] border border-[#FF4F00] rounded text-[#000000]">
          {error}
        </div>
      )}

      {/* FILTERS */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by title or tags"
          className="flex-1 border border-[#333333] p-2 rounded text-[#000000] focus:outline-none focus:ring-1 focus:ring-[#FF4F00]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="border border-[#333333] p-2 rounded text-[#000000] focus:outline-none focus:ring-1 focus:ring-[#FF4F00]"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="job">Job</option>
          <option value="internship">Internship</option>
          <option value="hackathon">Hackathon</option>
          <option value="project">Project</option>
          <option value="collaboration">Collaboration</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* EDIT FORM */}
      {editingOp && (
        <div className="mb-6 p-6 border border-[#333333] rounded-lg bg-[#F5F5F5]">
          <h3 className="text-lg font-bold text-[#000000] mb-4">
            Edit Opportunity
          </h3>

          <OpportunityForm
            initialData={editingOp}
            onSubmit={handleUpdate}
          />

          <button
            onClick={() => setEditingOp(null)}
            className="mt-4 px-5 py-2.5 border border-[#333333] rounded-lg text-[#000000] hover:bg-[#E5E5E5]"
          >
            Cancel
          </button>
        </div>
      )}

      {/* TABLE */}
      {loading ? (
        <p className="text-[#333333]">Loading opportunities...</p>
      ) : filteredOpportunities.length === 0 ? (
        <p className="text-[#333333]">No opportunities found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#333333]">
          <table className="w-full min-w-[800px]">
            <thead className="bg-[#333333] text-white">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Tags</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredOpportunities.map((op) => (
                <tr
                  key={op.id}
                  className="border-t border-[#333333] hover:bg-[#F5F5F5]"
                >
                  <td className="p-3">{op.title}</td>
                  <td className="p-3 capitalize">{op.type}</td>
                  <td className="p-3">{getStatusBadge(op.status)}</td>
                  <td className="p-3">{(op.tags || []).join(", ")}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleEdit(op)}
                      className="px-3 py-1 bg-[#FF4F00] text-white rounded hover:bg-[#E04600]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(op.id)}
                      className="px-3 py-1 bg-black text-white rounded hover:bg-[#333333]"
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
