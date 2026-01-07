import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIURL } from '../../services/api.js';

export default function VerificationForm() {
  const navigate = useNavigate();
  const [providerType, setProviderType] = useState("professional");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    provider_name: "",
    email: "",
    website_url: "",
    domain_age: "",
    social_profiles: [{ platform: "linkedin", url: "" }],
    portfolio_url: "",
    video_intro_url: "",
    user_description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSocialChange = (index, e) => {
    const updatedSocials = formData.social_profiles.map((social, i) =>
      i === index ? { ...social, [e.target.name]: e.target.value } : social
    );
    setFormData({ ...formData, social_profiles: updatedSocials });
  };

  const addSocialField = () => {
    setFormData({
      ...formData,
      social_profiles: [
        ...formData.social_profiles,
        { platform: "linkedin", url: "" },
      ],
    });
  };

  const removeSocialField = (index) => {
    const updatedSocials = formData.social_profiles.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, social_profiles: updatedSocials });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Not authenticated. Please log in again.");
      setLoading(false);
      return;
    }

    const payload = {
      provider_type: providerType,
      provider_name: formData.provider_name,
      email: formData.email,
      website_url: formData.website_url,
      domain_age: formData.domain_age ? parseInt(formData.domain_age, 10) : null,
      social_profiles: formData.social_profiles,
      portfolio_url: formData.portfolio_url,
      video_intro_url: formData.video_intro_url,
      user_description: formData.user_description,
    };

    try {
      const response = await fetch(`${APIURL}/verification/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json();
        if (response.status === 401) {
          throw new Error("Your session has expired. Please log out and log in again.");
        }
        throw new Error(errData.detail || "Verification failed");
      }

      const verificationResult = await response.json();
      setResult(verificationResult);

      localStorage.setItem("trust_score", verificationResult.trust_score);
      localStorage.setItem("provider_level", providerType);
      window.dispatchEvent(new Event("verification-updated"));

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- THEME COLORS ---
  const theme = {
    bgCard: "bg-white border border-gray-200 shadow-lg", // card background
    text: "text-black", // primary text
    label: "text-black", // label color
    input: "bg-white text-black border border-gray-300 placeholder-gray-400 focus:ring-orange-400", // input
    buttonPrimary: "bg-orange-500 text-white hover:bg-orange-600 transition-all", // submit
    buttonSecondary: "bg-white text-black hover:bg-gray-100 transition-all border border-gray-300", // cancel/back
    error: "text-red-600 bg-red-100 p-2 rounded-xl",
    accent: "text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600", // heading
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex items-center justify-center">
      <div className={`w-full max-w-3xl ${theme.bgCard} rounded-2xl p-8`}>
        <h2 className={`text-3xl font-semibold mb-2 ${theme.accent}`}>
          Provider Verification 🔍
        </h2>
        <p className="text-gray-700 mb-8">
          Complete your verification to unlock trust and visibility on GOPHORA.
        </p>

        {result ? (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-3 text-green-600">
              Verification Complete ✅
            </h3>
            <p className="text-lg mb-2 text-black">
              Trust Score: {result.trust_score} / 100
            </p>
            <p className="text-gray-700 mb-2">Reason: {result.reason}</p>
            <p className="text-sm text-orange-500 mb-4 italic">
              Verified by Gemini AI System
            </p>

            {result.trust_score < 85 && (
              <div className="bg-white/90 border border-gray-200 rounded-xl p-4 text-left max-w-md mx-auto mb-6">
                <p className="text-orange-500 font-semibold mb-1">
                  💡 How to improve your verification:
                </p>
                <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
                  {providerType === "institutional" && (
                    <>
                      <li>Add complete “About Us” and “Contact” pages on your website.</li>
                      <li>Use a corporate email (e.g., info@yourdomain.com).</li>
                    </>
                  )}
                  {providerType === "professional" && (
                    <>
                      <li>Connect more active social profiles (LinkedIn, Instagram).</li>
                      <li>Increase posting consistency and engagement rate.</li>
                    </>
                  )}
                  {providerType === "new_talent" && (
                    <>
                      <li>Upload a clear introduction video (30–60 seconds).</li>
                      <li>Ask early users for positive reviews to raise your score.</li>
                    </>
                  )}
                </ul>
              </div>
            )}

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setResult(null)}
                className={`${theme.buttonSecondary} px-6 py-2 rounded-lg font-semibold`}
              >
                Try Again
              </button>
              <button
                onClick={() => navigate("/provider/dashboard")}
                className={`${theme.buttonPrimary} px-6 py-2 rounded-lg font-semibold`}
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Provider Type */}
            <div>
              <label className={`block text-sm mb-2 ${theme.label}`}>
                Provider Type
              </label>
              <select
                name="provider_type"
                value={providerType}
                onChange={(e) => setProviderType(e.target.value)}
                className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 ${theme.input}`}
              >
                <option value="institutional">Institutional (Company / Organization)</option>
                <option value="professional">Professional / Freelancer</option>
                <option value="new_talent">New Talent / Explorer</option>
              </select>
            </div>

            {/* Common Fields */}
            <div>
              <label className={`block text-sm mb-2 ${theme.label}`}>
                Provider Name
              </label>
              <input
                type="text"
                name="provider_name"
                value={formData.provider_name}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg ${theme.input}`}
                required
              />
            </div>

            <div>
              <label className={`block text-sm mb-2 ${theme.label}`}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg ${theme.input}`}
                required
              />
            </div>

            {/* Institutional Fields */}
            {providerType === "institutional" && (
              <>
                <div>
                  <label className={`block text-sm mb-2 ${theme.label}`}>Website URL</label>
                  <input
                    type="url"
                    name="website_url"
                    value={formData.website_url}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-lg ${theme.input}`}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm mb-2 ${theme.label}`}>Domain Age (years)</label>
                  <input
                    type="number"
                    name="domain_age"
                    value={formData.domain_age}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-lg ${theme.input}`}
                  />
                </div>
              </>
            )}

            {/* Professional / Freelancer Fields */}
            {providerType === "professional" && (
              <>
                <div>
                  <label className={`block text-sm mb-2 ${theme.label}`}>Social Profiles</label>
                  {formData.social_profiles.map((social, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <select
                        name="platform"
                        value={social.platform}
                        onChange={(e) => handleSocialChange(index, e)}
                        className={`p-3 rounded-lg ${theme.input}`}
                      >
                        <option value="linkedin">LinkedIn</option>
                        <option value="instagram">Instagram</option>
                        <option value="behance">Behance</option>
                        <option value="github">GitHub</option>
                        <option value="other">Other</option>
                      </select>
                      <input
                        type="url"
                        name="url"
                        value={social.url}
                        onChange={(e) => handleSocialChange(index, e)}
                        placeholder="https://linkedin.com/in/your-profile"
                        className={`w-full p-3 rounded-lg ${theme.input}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeSocialField(index)}
                        className="p-3 bg-red-500/20 text-red-400 rounded-lg"
                      >
                        X
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={addSocialField} className="text-orange-500 font-semibold">
                    + Add another profile
                  </button>
                </div>
                <div>
                  <label className={`block text-sm mb-2 ${theme.label}`}>
                    Portfolio / Website (optional)
                  </label>
                  <input
                    type="url"
                    name="portfolio_url"
                    value={formData.portfolio_url}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-lg ${theme.input}`}
                  />
                </div>
              </>
            )}

            {/* New Talent / Explorer Fields */}
            {providerType === "new_talent" && (
              <>
                <div>
                  <label className={`block text-sm mb-2 ${theme.label}`}>
                    Video Introduction URL
                  </label>
                  <input
                    type="url"
                    name="video_intro_url"
                    value={formData.video_intro_url}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-lg ${theme.input}`}
                  />
                </div>
              </>
            )}

            {/* Description */}
            <div>
              <label className={`block text-sm mb-2 ${theme.label}`}>
                Description / Bio
              </label>
              <textarea
                name="user_description"
                value={formData.user_description}
                onChange={handleChange}
                rows={3}
                className={`w-full p-3 rounded-lg ${theme.input}`}
              />
            </div>

            {error && <p className={theme.error}>{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`${theme.buttonPrimary} w-full py-3 rounded-lg font-semibold disabled:opacity-50`}
            >
              {loading ? "Verifying..." : "Submit for Verification"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
