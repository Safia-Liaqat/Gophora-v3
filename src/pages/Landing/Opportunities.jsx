import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Opportunities() {
  const navigate = useNavigate();

  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper functions
  const stripHtml = (html) => {
    if (!html) return "";
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || "";
    return text.trim().substring(0, 150) + (text.length > 150 ? "..." : "");
  };

  const truncateText = (text, maxLength = 40) => {
    if (!text) return "";
    return text.length <= maxLength ? text : text.substring(0, maxLength) + "...";
  };

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        // Try fetching from your API
        const response = await fetch(`/api/opportunities`);
        if (!response.ok) throw new Error("Fetch failed");
        
        const data = await response.json();

        if (!data || data.length === 0) {
          // Use dummy data
          const dummyOpportunities = [
            {
              title: "Prepare Food Contribution",
              postedBy: { name: "Admin" },
              type: "Research",
              description: "Teach people to prepare healthy meals",
              tags: ["Science", "AI", "Innovation"],
            },
            {
              title: "Clean Water Project",
              postedBy: { name: "Admin" },
              type: "Development",
              description: "Collect water samples for sustainability",
              tags: ["Tech", "Software", "Collaboration"],
            },
            {
              title: "Community Garden",
              postedBy: { name: "Admin" },
              type: "Design",
              description: "Grow vegetables for local community",
              tags: ["Creativity", "UI/UX", "Projects"],
            },
          ];
          setOpportunities(dummyOpportunities);
        } else {
          const processedData = data.slice(0, 3).map(opp => ({
            ...opp,
            description: stripHtml(opp.description),
            title: truncateText(opp.title, 50)
          }));
          setOpportunities(processedData);
        }
      } catch (err) {
        // If API fails, use dummy data
        console.warn("Using fallback dummy data");
        const dummyOpportunities = [
          {
            title: "Prepare Food Contribution",
            postedBy: { name: "Admin" },
            type: "Research",
            description: "Teach people to prepare healthy meals",
            tags: ["Science", "AI", "Innovation"],
          },
          {
            title: "Clean Water Project",
            postedBy: { name: "Admin" },
            type: "Development",
            description: "Collect water samples for sustainability",
            tags: ["Tech", "Software", "Collaboration"],
          },
          {
            title: "Community Garden",
            postedBy: { name: "Admin" },
            type: "Design",
            description: "Grow vegetables for local community",
            tags: ["Creativity", "UI/UX", "Projects"],
          },
        ];
        setOpportunities(dummyOpportunities);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []); // Removed t dependency

  // Proper Loading State
  if (loading) {
    return (
      <div className="bg-[#0A0F2C] text-white text-center py-40 min-h-screen">
        <div className="animate-pulse text-xl font-medium">
          Loading Opportunities...
        </div>
      </div>
    );
  }

  return (
    <section className="relative bg-[#0A0F2C] text-white py-20 px-6 overflow-hidden">
      <div className="relative z-[2] max-w-6xl mx-auto text-center mb-14">
        <h2 className="text-4xl font-extrabold">
          Latest <span className="text-[#A28EFF]">Opportunities</span>
        </h2>
        <p className="text-gray-300 text-base mt-3">
          Explore missions and collaborations from across the globe
        </p>
      </div>

      <div className="relative z-[2] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {opportunities.map((opp, index) => (
          <div
            key={index}
            className="bg-[#161B30]/80 border border-[#1F254A] rounded-2xl p-6 flex flex-col justify-between hover:scale-[1.03] transition-all duration-300"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base truncate">{opp.title}</h3>
                  <p className="text-xs text-gray-400 truncate">
                    {opp.postedBy?.name || "Unknown"}
                  </p>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full font-medium text-[#A28EFF] border border-[#A28EFF]/30 bg-[#A28EFF]/10 whitespace-nowrap ml-2">
                  {opp.type || "General"}
                </span>
              </div>
              
              <p className="text-sm text-gray-300 leading-relaxed mb-4 line-clamp-3">
                {opp.description}
              </p>

              <div className="mt-auto">
                <button
                  onClick={() => navigate("/login")}
                  className="w-full bg-gradient-to-r from-[#6D5DD3] to-[#7E6DF4] text-white text-sm font-semibold py-2 rounded-lg hover:shadow-[0_0_20px_rgba(108,99,255,0.4)] transition-all"
                >
                   Apply to Mission
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-[2] text-center mt-12">
        <button
          onClick={() => navigate("/login")}
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#6D5DD3] to-[#7E6DF4] text-white font-semibold px-8 py-3 rounded-lg hover:scale-105 transition-all"
        >
          Explore More Missions
        </button>
        <p className="text-gray-400 text-sm mt-3">
          Login to discover hundreds of exciting opportunities
        </p>
      </div>
    </section>
  );
}