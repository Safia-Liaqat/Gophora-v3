import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2, FiDownload, FiArrowLeft } from "react-icons/fi";
import api from "../../../services/api";

export default function ShowResume() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResume();
  }, [id]);

  const fetchResume = async () => {
    try {
      const res = await api.get(`/user/resumes/${id}`);
      setResume(res.data.resume);
    } catch (err) {
      console.error("Failed to load resume", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async () => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return;

    try {
      await api.delete(`/user/resumes/${id}`);
      navigate("/resume-builder"); // or resumes list page
    } catch {
      alert("Failed to delete resume");
    }
  };

  const downloadPDF = () => {
    // placeholder – integrate html2pdf or backend PDF later
    alert("PDF download will be implemented here");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-900">
        <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!resume) return null;

  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Top Actions */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white"
          >
            <FiArrowLeft /> Back
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/resume-builder/${id}`)}
              className="flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/40 px-4 py-2 rounded-lg"
            >
              <FiEdit2 /> Edit
            </button>

            <button
              onClick={downloadPDF}
              className="flex items-center gap-2 bg-green-500/20 hover:bg-green-500/40 px-4 py-2 rounded-lg"
            >
              <FiDownload /> Download PDF
            </button>

            <button
              onClick={deleteResume}
              className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/40 px-4 py-2 rounded-lg"
            >
              <FiTrash2 /> Delete
            </button>
          </div>
        </div>

        {/* Resume Preview */}
        <div className="bg-white text-black rounded-2xl p-10 shadow-xl">

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">{resume.fullName}</h1>
            <p className="text-gray-600">{resume.headline}</p>
            <p className="text-sm text-gray-500">
              {resume.email} · {resume.phone}
            </p>
          </div>

          {/* Summary */}
          {resume.bio && (
            <section className="mb-6">
              <h2 className="font-bold text-lg mb-2">Summary</h2>
              <p>{resume.bio}</p>
            </section>
          )}

          {/* Skills */}
          {resume.skills?.length > 0 && (
            <section className="mb-6">
              <h2 className="font-bold text-lg mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Experience */}
          {resume.experience?.length > 0 && (
            <section className="mb-6">
              <h2 className="font-bold text-lg mb-2">Experience</h2>
              {resume.experience.map((exp, idx) => (
                <div key={idx} className="mb-4">
                  <p className="font-semibold">{exp.role} — {exp.company}</p>
                  <p className="text-sm text-gray-600">{exp.duration}</p>
                  <p>{exp.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {resume.education?.length > 0 && (
            <section>
              <h2 className="font-bold text-lg mb-2">Education</h2>
              {resume.education.map((edu, idx) => (
                <p key={idx}>
                  <strong>{edu.degree}</strong> — {edu.institution}
                </p>
              ))}
            </section>
          )}

        </div>
      </div>
    </div>
  );
}
