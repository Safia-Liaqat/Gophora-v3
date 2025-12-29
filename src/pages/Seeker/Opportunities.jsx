import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

// List of all countries (you can expand or reduce this list as needed)
const ALL_COUNTRIES = [
  // Popular countries
  "United States", "United Kingdom", "Canada", "Australia", "Germany", 
  "France", "Spain", "Italy", "Netherlands", "Sweden", "Norway", 
  "Denmark", "Finland", "Switzerland", "Austria", "Belgium", 
  "Portugal", "Ireland", "Japan", "South Korea", "Singapore", 
  "India", "China", "Brazil", "Mexico", "Argentina", "Chile", 
  "Colombia", "Peru", "South Africa", "Nigeria", "Kenya", "Egypt",
  "United Arab Emirates", "Saudi Arabia", "Qatar", "Israel", 
  "Turkey", "Russia", "Ukraine", "Poland", "Czech Republic", 
  "Hungary", "Romania", "Greece", "Thailand", "Vietnam", 
  "Indonesia", "Malaysia", "Philippines", "New Zealand",
  
  // More countries
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", 
  "Antigua and Barbuda", "Armenia", "Azerbaijan", "Bahamas", 
  "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belize", 
  "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", 
  "Botswana", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", 
  "Cabo Verde", "Cambodia", "Cameroon", "Central African Republic", 
  "Chad", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", 
  "Cyprus", "Djibouti", "Dominica", "Dominican Republic", 
  "East Timor", "Ecuador", "El Salvador", "Equatorial Guinea", 
  "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Gabon", 
  "Gambia", "Georgia", "Ghana", "Grenada", "Guatemala", "Guinea", 
  "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Iceland", 
  "Iran", "Iraq", "Jamaica", "Jordan", "Kazakhstan", "Kiribati", 
  "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", 
  "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", 
  "Luxembourg", "Madagascar", "Malawi", "Maldives", "Mali", 
  "Malta", "Marshall Islands", "Mauritania", "Mauritius", 
  "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", 
  "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", 
  "Nicaragua", "Niger", "North Korea", "North Macedonia", "Oman", 
  "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", 
  "Paraguay", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", 
  "Saint Vincent and the Grenadines", "Samoa", "San Marino", 
  "Sao Tome and Principe", "Senegal", "Serbia", "Seychelles", 
  "Sierra Leone", "Slovakia", "Slovenia", "Solomon Islands", 
  "Somalia", "Sri Lanka", "Sudan", "Suriname", "Syria", "Taiwan", 
  "Tajikistan", "Tanzania", "Togo", "Tonga", "Trinidad and Tobago", 
  "Tunisia", "Turkmenistan", "Tuvalu", "Uganda", "Uruguay", 
  "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", 
  "Yemen", "Zambia", "Zimbabwe"
];

// Sort countries alphabetically
const SORTED_COUNTRIES = [...ALL_COUNTRIES].sort();

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [appliedIds, setAppliedIds] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [userLocation, setUserLocation] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // Try to fetch user profile
          const userRes = await fetch(`/api/user/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          
          if (userRes.ok) {
            const userData = await userRes.json();
            const location = userData.location || userData.country || userData.city || "";
            if (location) {
              setUserLocation(location);
              // Auto-select user's location as initial filter
              setSelectedLocation(location);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching user location:", err);
      }
    };

    fetchUserLocation();
  }, []);

  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        
        // 1. Try Personalized Recommendations first
        const personalizedResponse = await fetch(`/api/opportunities/recommend?t=${Date.now()}`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        if (personalizedResponse.ok) {
          const personalizedData = await personalizedResponse.json();
          if (Array.isArray(personalizedData) && personalizedData.length > 0) {
            setOpportunities(personalizedData);
            setLoading(false);
            return;
          }
        }

        // 2. FALLBACK: Fetch general opportunities if personalized is empty or fails
        const generalResponse = await fetch(`/api/opportunities?t=${Date.now()}`);
        if (generalResponse.ok) {
          const generalData = await generalResponse.json();
          setOpportunities(Array.isArray(generalData) ? generalData : []);
        } else {
          throw new Error("Failed to load general opportunities");
        }

      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Unable to load opportunities. Showing general listings...");
        
        try {
          const res = await fetch(`/api/opportunities?t=${Date.now()}`);
          const data = await res.json();
          setOpportunities(Array.isArray(data) ? data : []);
        } catch (fErr) {
          setError("Service temporarily unavailable.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  const handleApply = (opportunity) => {
    if (opportunity.sourceLink) {
      window.open(opportunity.sourceLink, '_blank');
      setAppliedIds((prev) => [...prev, opportunity.id]);
      localStorage.setItem("applicationsSentDelta", String(parseInt(localStorage.getItem("applicationsSentDelta") || "0") + 1));
    } else {
      setError("No application link available");
    }
  };

  const safeOpportunities = Array.isArray(opportunities) ? opportunities : [];
  
  // Get actual locations from opportunities (for highlighting)
  const actualOpportunityLocations = [...new Set(safeOpportunities.map((op) => op.location).filter(Boolean))];
  
  // Filter opportunities based on selected filters
  const filteredOpportunities = safeOpportunities.filter((op) => {
    const matchesCategory = selectedCategory ? op.type === selectedCategory : true;
    
    if (!selectedLocation || selectedLocation === "") {
      // No location selected - show opportunities in user's location by default
      return userLocation ? 
        (op.location && (op.location.includes(userLocation) || userLocation.includes(op.location))) || 
        op.location.toLowerCase().includes("remote") || 
        op.location.toLowerCase().includes("worldwide") :
        true;
    }
    
    const matchesLocation = selectedLocation === "Remote/Worldwide" ? 
      op.location.toLowerCase().includes("remote") || 
      op.location.toLowerCase().includes("worldwide") ||
      op.location.toLowerCase().includes("global") :
    selectedLocation === "All Locations" ? 
      true : // Show everything
      op.location && (
        op.location.includes(selectedLocation) || 
        selectedLocation.includes(op.location) ||
        op.location.toLowerCase().includes(selectedLocation.toLowerCase()) ||
        selectedLocation.toLowerCase().includes(op.location.toLowerCase())
      );
    
    return matchesCategory && matchesLocation;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredOpportunities.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOpportunities = filteredOpportunities.slice(indexOfFirstItem, indexOfLastItem);

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedLocation(userLocation || "");
    setCurrentPage(1);
  };

  const resetToUserLocation = () => {
    setSelectedLocation(userLocation || "");
    setCurrentPage(1);
  };

  const showAllLocations = () => {
    setSelectedLocation("All Locations");
    setCurrentPage(1);
  };

  const showRemoteOnly = () => {
    setSelectedLocation("Remote/Worldwide");
    setCurrentPage(1);
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  return (
    <div className="text-white">
      <h2 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#C5A3FF] to-[#9E7BFF] drop-shadow-[0_0_10px_rgba(158,123,255,0.6)]">
        Recommended Opportunities
      </h2>

      {userLocation && (
        <div className="mb-4 p-4 bg-gradient-to-r from-[#1E1B4B]/30 to-[#2D1B69]/30 rounded-xl border border-[#2D1B69]">
          <div className="flex items-center gap-3">
            <MapPin className="text-[#C5A3FF]" size={18} />
            <div>
              <p className="text-sm text-gray-300">
                <span className="text-[#C5A3FF] font-medium">Your location:</span> {userLocation}
                {selectedLocation === userLocation && " (currently viewing)"}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Showing opportunities in your location by default. Use filters to explore worldwide opportunities.
              </p>
            </div>
          </div>
        </div>
      )}

      {error && <p className="text-red-400 bg-red-500/10 p-3 rounded-lg mb-4 text-sm">{error}</p>}

      <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl">
        <div className="flex-1">
          <label className="block mb-2 font-medium text-gray-300 text-sm">Category</label>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-white/20 p-3 pr-10 rounded-xl w-full bg-[#161B30] text-white appearance-none focus:ring-2 focus:ring-[#C5A3FF]"
            >
              <option value="">All Categories</option>
              <option value="job">Job</option>
              <option value="internship">Internship</option>
              <option value="hackathon">Hackathon</option>
              <option value="project">Project</option>
              <option value="collaboration">Collaboration</option>
            </select>
            <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C5A3FF] pointer-events-none" />
          </div>
        </div>

        <div className="flex-1">
          <label className="block mb-2 font-medium text-gray-300 text-sm">Location</label>
          <div className="relative">
            <select
              value={selectedLocation}
              onChange={(e) => {
                setSelectedLocation(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-white/20 p-3 pr-10 rounded-xl w-full bg-[#161B30] text-white appearance-none focus:ring-2 focus:ring-[#C5A3FF]"
            >
              {/* Default and special options */}
              <option value={userLocation || ""}>
                {userLocation ? `My Location (${userLocation})` : "Select Location"}
              </option>
              <option value="Remote/Worldwide">🌐 Remote / Worldwide</option>
              <option value="All Locations">🌍 All Locations (Global)</option>
              
              {/* Divider */}
              <option disabled>────────── Countries ──────────</option>
              
              {/* All countries */}
              {SORTED_COUNTRIES.map((country) => {
                const hasOpportunities = actualOpportunityLocations.some(loc => 
                  loc.toLowerCase().includes(country.toLowerCase()) || 
                  country.toLowerCase().includes(loc.toLowerCase())
                );
                return (
                  <option key={country} value={country} className={hasOpportunities ? "text-white" : "text-gray-500"}>
                    {country} {hasOpportunities ? "" : " (No current opportunities)"}
                  </option>
                );
              })}
            </select>
            <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C5A3FF] pointer-events-none" />
          </div>
        </div>

        <div className="flex items-end gap-2">
          {selectedLocation !== userLocation && userLocation && (
            <button 
              onClick={resetToUserLocation}
              className="py-3 px-4 bg-gradient-to-r from-[#1E1B4B]/50 to-[#2D1B69]/50 border border-[#2D1B69] text-[#C5A3FF] rounded-xl hover:bg-[#2D1B69]/70 transition-all text-sm whitespace-nowrap"
              title="Show opportunities in my location"
            >
              My Location
            </button>
          )}
          <button 
            onClick={showRemoteOnly}
            className="py-3 px-4 bg-gradient-to-r from-[#1E3A8A]/50 to-[#1E40AF]/50 border border-[#1E40AF] text-blue-300 rounded-xl hover:bg-[#1E40AF]/70 transition-all text-sm whitespace-nowrap"
            title="Show remote/worldwide opportunities"
          >
            Remote Only
          </button>
          <button 
            onClick={showAllLocations}
            className="py-3 px-4 bg-gradient-to-r from-[#065F46]/50 to-[#047857]/50 border border-[#047857] text-emerald-300 rounded-xl hover:bg-[#047857]/70 transition-all text-sm whitespace-nowrap"
            title="Show all opportunities worldwide"
          >
            Worldwide
          </button>
          <button 
            onClick={clearFilters} 
            className="py-3 px-4 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all text-sm whitespace-nowrap"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Quick filter buttons */}
      <div className="mb-6 flex flex-wrap gap-2">
        <span className="text-sm text-gray-400 mr-2">Quick filters:</span>
        <button
          onClick={() => {
            setSelectedCategory("job");
            setSelectedLocation(userLocation || "");
            setCurrentPage(1);
          }}
          className="px-3 py-1.5 text-xs bg-gradient-to-r from-[#1E1B4B]/30 to-[#2D1B69]/30 border border-[#2D1B69] text-gray-300 rounded-lg hover:bg-[#2D1B69]/50 transition-all"
        >
          Jobs in {userLocation || "My Location"}
        </button>
        <button
          onClick={() => {
            setSelectedCategory("internship");
            setSelectedLocation("");
            setCurrentPage(1);
          }}
          className="px-3 py-1.5 text-xs bg-gradient-to-r from-[#1E1B4B]/30 to-[#2D1B69]/30 border border-[#2D1B69] text-gray-300 rounded-lg hover:bg-[#2D1B69]/50 transition-all"
        >
          Internships
        </button>
        <button
          onClick={() => {
            setSelectedLocation("Remote/Worldwide");
            setSelectedCategory("");
            setCurrentPage(1);
          }}
          className="px-3 py-1.5 text-xs bg-gradient-to-r from-[#1E3A8A]/30 to-[#1E40AF]/30 border border-[#1E40AF] text-blue-300 rounded-lg hover:bg-[#1E40AF]/50 transition-all"
        >
          Remote Positions
        </button>
      </div>

      {/* Results counter */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-gray-400 text-sm">
          {loading ? "Loading opportunities..." : 
           `Showing ${indexOfFirstItem + 1}-${Math.min(indexOfLastItem, filteredOpportunities.length)} of ${filteredOpportunities.length} opportunities`}
          {selectedLocation && selectedLocation !== "" && (
            <span className="text-[#C5A3FF] ml-1">
              {selectedLocation === userLocation ? " in your location" : 
               selectedLocation === "All Locations" ? " worldwide" : 
               selectedLocation === "Remote/Worldwide" ? " (remote/worldwide)" : 
               ` in ${selectedLocation}`}
            </span>
          )}
        </p>
      </div>

      <div className="overflow-x-auto mb-6">
        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#C5A3FF]"></div>
            <p className="mt-4 text-gray-400">Loading opportunities...</p>
          </div>
        ) : (
          <>
            <table className="min-w-full border border-white/10 rounded-2xl bg-white/5 backdrop-blur-lg">
              <thead className="bg-white/10 text-[#C5A3FF] uppercase text-xs tracking-wider">
                <tr>
                  <th className="py-4 px-4 text-left">Title</th>
                  <th className="py-4 px-4 text-left">Type</th>
                  <th className="py-4 px-4 text-left">Location</th>
                  <th className="py-4 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentOpportunities.map((op) => (
                  <tr key={op.id} className="border-t border-white/10 hover:bg-white/5">
                    <td className="py-4 px-4 font-medium">{op.title}</td>
                    <td className="py-4 px-4 capitalize text-gray-400">{op.type}</td>
                    <td className="py-4 px-4 text-gray-400">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-[#C5A3FF]" />
                        {op.location}
                        {userLocation && op.location && op.location.toLowerCase().includes(userLocation.toLowerCase()) && (
                          <span className="ml-2 text-xs bg-gradient-to-r from-[#1E1B4B]/50 to-[#2D1B69]/50 text-[#C5A3FF] px-2 py-1 rounded-full">
                            Your Location
                          </span>
                        )}
                        {op.location && (op.location.toLowerCase().includes("remote") || op.location.toLowerCase().includes("worldwide")) && (
                          <span className="ml-2 text-xs bg-gradient-to-r from-[#1E3A8A]/50 to-[#1E40AF]/50 text-blue-300 px-2 py-1 rounded-full">
                            Remote
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleApply(op)}
                        disabled={appliedIds.includes(op.id)}
                        className={`py-2 px-5 rounded-lg font-bold transition-all ${
                          appliedIds.includes(op.id) 
                            ? "bg-gray-600 cursor-not-allowed" 
                            : "bg-gradient-to-r from-[#C5A3FF] to-[#9E7BFF] hover:scale-105 hover:shadow-[0_0_15px_rgba(158,123,255,0.4)]"
                        }`}
                      >
                        {appliedIds.includes(op.id) ? "Applied" : "Apply"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredOpportunities.length === 0 && !loading && (
              <div className="text-center py-12 bg-gradient-to-br from-[#0A0A2A]/50 to-[#0A0F2C]/50 rounded-2xl border border-white/10">
                <MapPin size={48} className="mx-auto text-gray-500 mb-4" />
                <p className="text-gray-400 mb-2">No opportunities found matching your filters.</p>
                <p className="text-sm text-gray-500 mb-4">
                  Try selecting a different location or category.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-gradient-to-r from-[#1E1B4B] to-[#2D1B69] text-[#C5A3FF] rounded-lg hover:opacity-90 transition-all"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Pagination Controls */}
      {filteredOpportunities.length > itemsPerPage && !loading && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${
                currentPage === 1 
                  ? "text-gray-600 cursor-not-allowed bg-white/5" 
                  : "text-white hover:bg-white/10"
              }`}
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-1">
              {getPageNumbers().map((pageNum, index) => (
                pageNum === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                    ...
                  </span>
                ) : (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      currentPage === pageNum
                        ? "bg-gradient-to-r from-[#C5A3FF] to-[#9E7BFF] text-white font-bold"
                        : "text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              ))}
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg ${
                currentPage === totalPages
                  ? "text-gray-600 cursor-not-allowed bg-white/5"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="text-sm text-gray-400 hidden sm:block">
            {itemsPerPage} per page
          </div>
        </div>
      )}
    </div>
  );
}