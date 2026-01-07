import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, MapPin, Filter, X, Globe, Briefcase } from "lucide-react";
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
    <div className="bg-white text-black">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#FF4F00]">
            <Briefcase className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Opportunities</h2>
            <p className="text-sm text-gray-600">Find missions that match your skills</p>
          </div>
        </div>
      </div>

      {userLocation && (
        <div className="mb-6 p-4 rounded-lg bg-white border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3">
            <MapPin className="text-[#FF4F00]" size={18} />
            <div>
              <p className="text-sm text-black">
                <span className="font-medium text-[#FF4F00]">Your location:</span> {userLocation}
                {selectedLocation === userLocation && " (currently viewing)"}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Showing opportunities in your location by default. Use filters to explore worldwide missions.
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Filters Section */}
      <div className="mb-8 p-4 rounded-lg bg-white border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={18} className="text-[#FF4F00]" />
          <h3 className="font-medium">Filter Opportunities</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block mb-2 text-sm font-medium text-black">Category</label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full p-3 rounded-lg appearance-none bg-white border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-[#FF4F00] focus:border-[#FF4F00]"
              >
                <option value="">All Categories</option>
                <option value="job">Job</option>
                <option value="internship">Internship</option>
                <option value="hackathon">Hackathon</option>
                <option value="project">Project</option>
                <option value="collaboration">Collaboration</option>
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FF4F00] pointer-events-none" />
            </div>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block mb-2 text-sm font-medium text-black">Location</label>
            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => {
                  setSelectedLocation(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full p-3 rounded-lg appearance-none bg-white border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-[#FF4F00] focus:border-[#FF4F00]"
              >
                <option value={userLocation || ""}>
                  {userLocation ? `My Location (${userLocation})` : "Select Location"}
                </option>
                <option value="Remote/Worldwide">🌐 Remote / Worldwide</option>
                <option value="All Locations">🌍 All Locations (Global)</option>
                
                <option disabled>────────── Countries ──────────</option>
                
                {SORTED_COUNTRIES.map((country) => {
                  const hasOpportunities = actualOpportunityLocations.some(loc => 
                    loc.toLowerCase().includes(country.toLowerCase()) || 
                    country.toLowerCase().includes(loc.toLowerCase())
                  );
                  return (
                    <option key={country} value={country} className={hasOpportunities ? "text-black" : "text-gray-500"}>
                      {country} {hasOpportunities ? "" : " (No current opportunities)"}
                    </option>
                  );
                })}
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FF4F00] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          {selectedLocation !== userLocation && userLocation && (
            <button 
              onClick={resetToUserLocation}
              className="px-4 py-2 rounded-lg text-sm border bg-[#FF4F00]/10 border-[#FF4F00]/30 text-[#FF4F00] hover:bg-[#FF4F00]/20 transition-all"
              title="Show opportunities in my location"
            >
              <MapPin size={14} className="inline mr-1" /> My Location
            </button>
          )}
          <button 
            onClick={showRemoteOnly}
            className="px-4 py-2 rounded-lg text-sm border bg-blue-100 border-blue-200 text-blue-600 hover:bg-blue-200 transition-all"
            title="Show remote/worldwide opportunities"
          >
            <Globe size={14} className="inline mr-1" /> Remote Only
          </button>
          <button 
            onClick={showAllLocations}
            className="px-4 py-2 rounded-lg text-sm border bg-green-100 border-green-200 text-green-600 hover:bg-green-200 transition-all"
            title="Show all opportunities worldwide"
          >
            <Globe size={14} className="inline mr-1" /> Worldwide
          </button>
          <button 
            onClick={clearFilters} 
            className="px-4 py-2 rounded-lg text-sm border bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200 transition-all"
          >
            <X size={14} className="inline mr-1" /> Clear Filters
          </button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          {loading ? "Loading opportunities..." : 
           `Showing ${indexOfFirstItem + 1}-${Math.min(indexOfLastItem, filteredOpportunities.length)} of ${filteredOpportunities.length} opportunities`}
          {selectedLocation && selectedLocation !== "" && (
            <span className="text-[#FF4F00]">
              {selectedLocation === userLocation ? " in your location" : 
               selectedLocation === "All Locations" ? " worldwide" : 
               selectedLocation === "Remote/Worldwide" ? " (remote/worldwide)" : 
               ` in ${selectedLocation}`}
            </span>
          )}
        </p>
      </div>

      {/* Opportunities Table */}
      <div className="overflow-x-auto mb-8">
        {loading ? (
          <div className="text-center py-10 text-black">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF4F00]"></div>
            <p className="mt-4 text-sm text-gray-600">Loading opportunities...</p>
          </div>
        ) : (
          <>
            <div className="rounded-lg border overflow-hidden bg-white border-gray-200 shadow-sm">
              <div className="overflow-x-auto bg-gray-50">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-4 px-4 text-left text-xs font-medium uppercase tracking-wider text-[#FF4F00]">
                        Title
                      </th>
                      <th className="py-4 px-4 text-left text-xs font-medium uppercase tracking-wider text-[#FF4F00]">
                        Type
                      </th>
                      <th className="py-4 px-4 text-left text-xs font-medium uppercase tracking-wider text-[#FF4F00]">
                        Location
                      </th>
                      <th className="py-4 px-4 text-left text-xs font-medium uppercase tracking-wider text-[#FF4F00]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOpportunities.map((op) => (
                      <tr 
                        key={op.id} 
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4 font-medium text-sm">
                          {op.title}
                        </td>
                        <td className="py-4 px-4 text-sm capitalize">
                          <span className="inline-block px-2 py-1 rounded-full text-xs bg-[#FF4F00]/10 text-[#FF4F00]">
                            {op.type}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-[#FF4F00]" />
                            <span className="text-gray-600">{op.location}</span>
                            {userLocation && op.location && op.location.toLowerCase().includes(userLocation.toLowerCase()) && (
                              <span className="ml-2 text-xs px-2 py-1 rounded-full bg-[#FF4F00]/10 text-[#FF4F00]">
                                Your Location
                              </span>
                            )}
                            {op.location && (op.location.toLowerCase().includes("remote") || op.location.toLowerCase().includes("worldwide")) && (
                              <span className="ml-2 text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600">
                                Remote
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleApply(op)}
                            disabled={appliedIds.includes(op.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all active:scale-95 ${
                              appliedIds.includes(op.id) 
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-[#FF4F00] text-white hover:bg-[#FF4F00]/90"
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
            </div>
            
            {filteredOpportunities.length === 0 && !loading && (
              <div className="text-center py-12 rounded-lg border bg-white border-gray-200 shadow-sm">
                <MapPin size={48} className="mx-auto mb-4 text-gray-600" />
                <p className="text-lg font-medium mb-2 text-black">No opportunities found</p>
                <p className="text-sm text-gray-600 mb-4">
                  Try adjusting your filters or check back later for new missions.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-[#FF4F00] text-white hover:bg-[#FF4F00]/90"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Pagination */}
      {filteredOpportunities.length > itemsPerPage && !loading && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg transition-all ${
                currentPage === 1 
                  ? "text-gray-400 cursor-not-allowed bg-gray-100"
                  : "text-black hover:bg-gray-100"
              }`}
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-1">
              {getPageNumbers().map((pageNum, index) => (
                pageNum === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-600">
                    ...
                  </span>
                ) : (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      currentPage === pageNum
                        ? "bg-[#FF4F00] text-white font-medium"
                        : "text-gray-700 hover:bg-gray-100"
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
              className={`p-2 rounded-lg transition-all ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed bg-gray-100"
                  : "text-black hover:bg-gray-100"
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="text-sm text-gray-600 hidden sm:block">
            {itemsPerPage} per page
          </div>
        </div>
      )}
    </div>
  );
}