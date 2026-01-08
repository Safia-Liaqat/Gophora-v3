import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function OpportunityForm({ onSubmit, initialData = {} }) {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [errorCities, setErrorCities] = useState(null);

  const [formData, setFormData] = useState({
    title: initialData.title || "",
    type: initialData.type || "job",
    description: initialData.description || "",
    workMode: initialData.workMode || "remote",
    country: initialData.country || "",
    city: initialData.city || "",
    lat: initialData.lat || null,
    lng: initialData.lng || null,
    tags: initialData.tags || "",
  });

  // Fetch countries once
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://countriesnow.space/api/v0.1/countries");
        if (!res.ok) throw new Error("Failed to fetch countries");
        const data = await res.json();
        const countryList = data.data.map((c) => ({
          name: c.country,
          cities: c.cities,
        }));
        setCountries(countryList);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCountries();
  }, []);

  // Update cities when country changes
  useEffect(() => {
    if (!formData.country) {
      setCities([]);
      return;
    }
    const countryObj = countries.find((c) => c.name === formData.country);
    if (countryObj) {
      setCities(countryObj.cities.map((cityName) => ({ name: cityName })));
    }
  }, [formData.country, countries]);

  // Geocode location when city or country changes
  useEffect(() => {
    if (formData.city && formData.country) {
      const location = `${formData.city}, ${formData.country}`;
      const apiKey = import.meta.env.GEOAPIFY_API_KEY;
      if (!apiKey) {
        console.error("Geoapify API key not found.");
        return;
      }
      fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${location}&apiKey=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.features.length > 0) {
            const { lat, lon } = data.features[0].properties;
            setFormData((prev) => ({ ...prev, lat, lng: lon }));
          }
        })
        .catch((error) =>
          console.error("Error fetching geocoding data:", error)
        );
    }
  }, [formData.city, formData.country]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCityChange = (e) => {
    const cityName = e.target.value;
    setFormData((prev) => ({ ...prev, city: cityName }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.workMode === "onsite" &&
      (!formData.country || !formData.city)
    ) {
      alert("Please select a valid country and city!");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 bg-white border border-gray-200 p-8 rounded-2xl shadow-[0_0_25px_rgba(255,79,0,0.2)] max-w-2xl mx-auto"
    >
      <h3 className="text-2xl font-semibold mb-4 text-[#FF4F00]">
        Post a New Opportunity
      </h3>

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Opportunity Title"
        required
        className="border-2 border-gray-300 p-3 rounded-xl bg-white text-black placeholder-black/50 focus:outline-none focus:border-[#FF4F00] focus:ring-2 focus:ring-[#FF4F00]"
      />

      <div className="relative">
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border-2 border-gray-300 p-3 pr-10 rounded-xl bg-white text-black w-full appearance-none focus:outline-none focus:border-[#FF4F00] focus:ring-2 focus:ring-[#FF4F00]"
        >
          <option value="job">Job</option>
          <option value="internship">Internship</option>
          <option value="hackathon">Hackathon</option>
          <option value="project">Project</option>
          <option value="collaboration">Collaboration</option>
          <option value="education">Education</option>
          <option value="hobby">Hobby</option>
        </select>
        <ChevronDown
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FF4F00]"
          size={18}
        />
      </div>

      <div className="relative">
        <select
          name="workMode"
          value={formData.workMode}
          onChange={handleChange}
          className="border-2 border-gray-300 p-3 pr-10 rounded-xl bg-white text-black w-full appearance-none focus:outline-none focus:border-[#FF4F00] focus:ring-2 focus:ring-[#FF4F00]"
        >
          <option value="remote">Remote</option>
          <option value="onsite">Onsite</option>
        </select>
        <ChevronDown
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FF4F00]"
          size={18}
        />
      </div>

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        rows="5"
        required
        className="border-2 border-gray-300 p-3 rounded-xl bg-white text-black placeholder-black/50 focus:outline-none focus:border-[#FF4F00] focus:ring-2 focus:ring-[#FF4F00]"
      />

      {formData.workMode === "onsite" && (
        <>
          <div className="relative">
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="border-2 border-gray-300 p-3 pr-10 rounded-xl bg-white text-black w-full appearance-none focus:outline-none focus:border-[#FF4F00] focus:ring-2 focus:ring-[#FF4F00]"
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FF4F00]"
              size={18}
            />
          </div>

          <div className="relative">
            <select
              name="city"
              value={formData.city}
              onChange={handleCityChange}
              required
              className="border-2 border-gray-300 p-3 pr-10 rounded-xl bg-white text-black w-full appearance-none focus:outline-none focus:border-[#FF4F00] focus:ring-2 focus:ring-[#FF4F00]"
            >
              <option value="">Select City</option>
              {cities.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FF4F00]"
              size={18}
            />
          </div>
        </>
      )}

      <input
        type="text"
        name="tags"
        value={formData.tags}
        onChange={handleChange}
        placeholder="Tags / Skills (comma separated)"
        className="border-2 border-gray-300 p-3 rounded-xl bg-white text-black placeholder-black/50 focus:outline-none focus:border-[#FF4F00] focus:ring-2 focus:ring-[#FF4F00]"
      />

      <button
        type="submit"
        className="w-full py-3 bg-[#FF4F00] text-white rounded-xl font-semibold hover:bg-[#E04600] transition-colors"
      >
        Post Opportunity
      </button>
    </form>
  );
}
