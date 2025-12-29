import React, { useState, useEffect } from "react";
import { 
  FiMapPin, FiZap, FiAlertCircle, FiCheck, FiX, 
  FiFilter, FiSearch, FiTrendingUp, FiUsers, FiEye,
  FiChevronLeft, FiChevronRight
} from "react-icons/fi";

const Missions = () => {
  const [missions, setMissions] = useState([]);
  const [filteredMissions, setFilteredMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMission, setSelectedMission] = useState(null);
  const [activationRequested, setActivationRequested] = useState(false);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedUrgency, setSelectedUrgency] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [missionsPerPage, setMissionsPerPage] = useState(10);

  // Get unique values for filters
  const categories = ["all", ...new Set(missions.map(m => m.category))];
  const urgencies = ["all", "High", "Medium", "Low"];
  const locations = ["all", ...new Set(missions.map(m => m.location))];

  const PUBLISHED_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQwlhj4i-AT6GT8Zq80nyvvzB0YQEKsqp89et8dzuV6v-c_gl9nPtdJL21iI64TFJk5TuYXQQYHq7SJ/pubhtml";

  const fetchMissionsFromPublishedSheet = async () => {
    try {
      const csvUrl = PUBLISHED_SHEET_URL.replace('/pubhtml', '/pub?output=csv');
      const response = await fetch(csvUrl);
      const csvText = await response.text();
      
      const rows = csvText.split('\n');
      const processedMissions = rows.slice(1).filter(row => row.trim()).map((row, index) => {
        const columns = row.split(',').map(c => c.trim());
        
        return {
          id: index + 1,
          title: columns[0] || "Mission",
          description: columns[1] || "No description available",
          category: columns[2] || "General",
          requirements: columns[3] ? columns[3].split('•').filter(r => r.trim()) : [],
          reward: columns[4] || "$15",
          duration: columns[5] || "1 hr",
          location: columns[6] || "Remote",
          urgency: columns[7] || "Medium",
          internalId: `GOPHORA-${String(index + 1).padStart(3, '0')}`,
          applications: Math.floor(Math.random() * 50),
          status: "Active"
        };
      });
      
      setMissions(processedMissions);
      setFilteredMissions(processedMissions);
    } catch (error) {
      console.error("Error fetching missions:", error);
      const fallback = getFallbackMissions();
      setMissions(fallback);
      setFilteredMissions(fallback);
    } finally {
      setLoading(false);
    }
  };

  const getFallbackMissions = () => {
    // Create 25 sample missions for pagination testing
    const sampleMissions = [];
    for (let i = 1; i <= 25; i++) {
      sampleMissions.push({
        id: i,
        title: `Mission ${i} - Sample Title`,
        description: `This is a sample mission description for mission ${i}.`,
        category: i % 3 === 0 ? "Technology" : i % 3 === 1 ? "Services" : "Education",
        requirements: ["Requirement 1", "Requirement 2", "Requirement 3"],
        reward: `$${10 + i * 5}`,
        duration: `${i % 4 + 1} hrs`,
        location: i % 2 === 0 ? "Remote" : "On-site",
        urgency: i % 3 === 0 ? "High" : i % 3 === 1 ? "Medium" : "Low",
        internalId: `GOPHORA-${String(i).padStart(3, '0')}`,
        applications: Math.floor(Math.random() * 50),
        status: "Active"
      });
    }
    return sampleMissions;
  };

  // Apply filters
  useEffect(() => {
    if (missions.length === 0) return;
    
    let result = [...missions];
    
    // Apply filters
    if (searchQuery) {
      result = result.filter(mission =>
        mission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mission.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mission.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory !== "all") {
      result = result.filter(mission => mission.category === selectedCategory);
    }
    
    if (selectedUrgency !== "all") {
      result = result.filter(mission => mission.urgency === selectedUrgency);
    }
    
    if (selectedLocation !== "all") {
      result = result.filter(mission => mission.location === selectedLocation);
    }
    
    setFilteredMissions(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [missions, searchQuery, selectedCategory, selectedUrgency, selectedLocation]);

  useEffect(() => {
    fetchMissionsFromPublishedSheet();
  }, []);

  // Calculate pagination values
  const totalPages = Math.ceil(filteredMissions.length / missionsPerPage);
  const indexOfLastMission = currentPage * missionsPerPage;
  const indexOfFirstMission = indexOfLastMission - missionsPerPage;
  const currentMissions = filteredMissions.slice(indexOfFirstMission, indexOfLastMission);

  const handleMissionClick = (mission) => {
    setSelectedMission(mission);
    setActivationRequested(false);
  };

  const closeModal = () => {
    setSelectedMission(null);
  };

  const handleActivation = async () => {
    if (!selectedMission) return;

    try {
      const activationData = {
        missionId: selectedMission.internalId,
        missionTitle: selectedMission.title,
        explorerId: "USER_ID_HERE",
        timestamp: new Date().toISOString(),
        status: "pending"
      };

      console.log("Activation request sent:", activationData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setActivationRequested(true);
      
    } catch (error) {
      console.error("Activation error:", error);
    }
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedUrgency("all");
    setSelectedLocation("all");
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    
    return pageNumbers;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0A0714] to-[#1A1525] p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-jewel mx-auto"></div>
              <p className="mt-6 text-stark/70 text-lg">Loading Immediate Missions...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0714] to-[#1A1525] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-jewel/20 rounded-xl">
                  <FiZap className="text-3xl text-jewel" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-stark">Immediate Missions</h1>
                  <p className="text-stark/60 mt-2">Browse and activate available missions</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2 text-jewel">
                  <FiTrendingUp />
                  <span className="text-sm font-medium">{missions.length} total missions</span>
                </div>
                <div className="flex items-center gap-2 text-stark/60">
                  <FiUsers />
                  <span className="text-sm">Showing {filteredMissions.length} filtered</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-[#0F0C19]/50 border border-white/10 rounded-xl p-4 mb-6 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stark/40" />
                  <input
                    type="text"
                    placeholder="Search missions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-2.5 bg-[#0A0714] border border-white/10 rounded-lg text-stark placeholder-stark/40 focus:outline-none focus:border-jewel/50"
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2.5 bg-[#0A0714] border border-white/10 rounded-lg text-stark text-sm focus:outline-none focus:border-jewel/50"
                >
                  <option value="all">All Categories</option>
                  {categories.filter(c => c !== "all").map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                <select
                  value={selectedUrgency}
                  onChange={(e) => setSelectedUrgency(e.target.value)}
                  className="px-3 py-2.5 bg-[#0A0714] border border-white/10 rounded-lg text-stark text-sm focus:outline-none focus:border-jewel/50"
                >
                  <option value="all">Any Urgency</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-3 py-2.5 bg-[#0A0714] border border-white/10 rounded-lg text-stark text-sm focus:outline-none focus:border-jewel/50"
                >
                  <option value="all">All Locations</option>
                  {locations.filter(l => l !== "all").map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
                
                <button
                  onClick={resetFilters}
                  className="px-3 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-stark text-sm transition flex items-center gap-2"
                >
                  <FiFilter />
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Missions Table - Simplified */}
        <div className="bg-[#0F0C19]/50 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr className="text-left text-sm text-stark/60">
                  <th className="p-4 font-semibold">Mission</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold">Location</th>
                  <th className="p-4 font-semibold">Urgency</th>
                  <th className="p-4 font-semibold">Applications</th>
                  <th className="p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {currentMissions.map((mission) => (
                  <tr 
                    key={mission.id} 
                    className="hover:bg-white/5 transition group cursor-pointer"
                    onClick={() => handleMissionClick(mission)}
                  >
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="font-semibold text-stark group-hover:text-jewel transition">
                          {mission.title}
                        </div>
                        <div className="text-xs text-stark/60">
                          ID: {mission.internalId}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-white/5 rounded-full text-sm text-stark">
                        {mission.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <FiMapPin className="text-stark/60 text-sm" />
                        <span className={mission.location === "Remote" ? "text-jewel" : "text-stark"}>
                          {mission.location}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        mission.urgency === 'High'
                          ? 'bg-fuschia/20 text-fuschia'
                          : mission.urgency === 'Medium'
                          ? 'bg-jewel/20 text-jewel'
                          : 'bg-stark/20 text-stark/60'
                      }`}>
                        {mission.urgency}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-stark">
                        <FiUsers className="text-stark/60 text-sm" />
                        <span>{mission.applications}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMissionClick(mission);
                        }}
                        className="px-3 py-1.5 bg-jewel/10 hover:bg-jewel/20 text-jewel rounded-lg text-sm transition-all flex items-center gap-2"
                      >
                        <FiEye className="text-xs" />
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredMissions.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-jewel/10 to-fuschia/10 flex items-center justify-center">
                <FiSearch className="text-2xl text-stark/40" />
              </div>
              <h3 className="text-xl font-bold text-stark mb-2">No missions found</h3>
              <p className="text-stark/60 max-w-md mx-auto mb-4">
                Try adjusting your filters or search terms.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-gradient-to-r from-jewel to-fuschia text-stark rounded-lg font-medium hover:opacity-90 transition text-sm"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {filteredMissions.length > 0 && (
            <div className="px-4 py-3 border-t border-white/10 flex justify-between items-center">
              <div className="text-sm text-stark/60">
                Showing {indexOfFirstMission + 1}-{Math.min(indexOfLastMission, filteredMissions.length)} of {filteredMissions.length} missions
              </div>
              <div className="text-sm text-stark/60">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredMissions.length > missionsPerPage && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Rows per page selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-stark/60">Show</span>
              <select
                value={missionsPerPage}
                onChange={(e) => {
                  setMissionsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 bg-[#0A0714] border border-white/10 rounded text-stark text-sm focus:outline-none focus:border-jewel/50"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <span className="text-sm text-stark/60">missions per page</span>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg border border-white/10 transition ${
                  currentPage === 1 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-white/5 hover:border-jewel/30'
                }`}
              >
                <FiChevronLeft className="text-stark" />
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {getPageNumbers().map((number) => (
                  <button
                    key={number}
                    onClick={() => handlePageChange(number)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg border transition text-sm ${
                      currentPage === number
                        ? 'bg-jewel border-jewel text-stark font-bold'
                        : 'border-white/10 hover:bg-white/5 text-stark/80'
                    }`}
                  >
                    {number}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg border border-white/10 transition ${
                  currentPage === totalPages 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-white/5 hover:border-jewel/30'
                }`}
              >
                <FiChevronRight className="text-stark" />
              </button>
            </div>

            {/* Go to page */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-stark/60">Go to page</span>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={currentPage}
                onChange={(e) => {
                  const page = Math.max(1, Math.min(totalPages, Number(e.target.value)));
                  if (page) handlePageChange(page);
                }}
                className="w-16 px-2 py-1 bg-[#0A0714] border border-white/10 rounded text-stark text-sm focus:outline-none focus:border-jewel/50"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mission Detail Modal */}
      {selectedMission && (
        <>
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={closeModal}
          />
          
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="relative w-full max-w-lg max-h-[90vh] bg-gradient-to-b from-[#0F0C19] to-[#1A1525] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
              {/* Modal Header */}
              <div className="sticky top-0 bg-[#0F0C19] border-b border-white/10 p-5 z-10">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-stark leading-tight">
                      {selectedMission.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 bg-jewel/20 text-jewel rounded-full">
                        {selectedMission.category}
                      </span>
                      <span className="text-xs text-stark/60">
                        ID: {selectedMission.internalId}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="flex-shrink-0 p-1.5 hover:bg-white/10 rounded-lg transition text-stark/60 hover:text-stark"
                  >
                    <FiX size={20} />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-5 space-y-5 overflow-y-auto max-h-[calc(90vh-140px)]">
                {/* Description */}
                <div>
                  <h3 className="text-sm font-semibold text-stark/70 mb-2">Description</h3>
                  <p className="text-stark/80 text-sm bg-white/5 p-3 rounded-lg">
                    {selectedMission.description}
                  </p>
                </div>

                {/* Requirements */}
                {selectedMission.requirements && selectedMission.requirements.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-stark/70 mb-2">Requirements</h3>
                    <div className="space-y-1.5">
                      {selectedMission.requirements.map((req, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 p-2.5 bg-white/5 rounded-lg"
                        >
                          <FiCheck className="text-jewel mt-0.5 flex-shrink-0" size={14} />
                          <span className="text-sm text-stark/80">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mission Details */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 p-3 rounded-lg">
                    <div className="flex items-center gap-1.5 text-stark/50 text-xs mb-1">
                      <FiAlertCircle size={12} />
                      <span>Urgency</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold inline-block ${
                      selectedMission.urgency === 'High'
                        ? 'bg-fuschia text-stark'
                        : selectedMission.urgency === 'Medium'
                        ? 'bg-jewel text-stark'
                        : 'bg-stark/30 text-stark'
                    }`}>
                      {selectedMission.urgency}
                    </span>
                  </div>
                  
                  <div className="bg-white/5 p-3 rounded-lg">
                    <div className="flex items-center gap-1.5 text-stark/50 text-xs mb-1">
                      <FiMapPin size={12} />
                      <span>Location</span>
                    </div>
                    <p className="text-sm font-semibold text-stark">{selectedMission.location}</p>
                  </div>
                  
                  <div className="bg-white/5 p-3 rounded-lg">
                    <div className="flex items-center gap-1.5 text-stark/50 text-xs mb-1">
                      <FiZap size={12} />
                      <span>Reward</span>
                    </div>
                    <p className="text-lg font-bold text-jewel">{selectedMission.reward}</p>
                  </div>
                  
                  <div className="bg-white/5 p-3 rounded-lg">
                    <div className="flex items-center gap-1.5 text-stark/50 text-xs mb-1">
                      <FiUsers size={12} />
                      <span>Duration</span>
                    </div>
                    <p className="text-sm font-semibold text-stark">{selectedMission.duration}</p>
                  </div>
                </div>

                {/* Applications */}
                <div className="bg-white/5 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FiUsers className="text-stark/60" size={14} />
                      <span className="text-sm text-stark/70">Current Applications</span>
                    </div>
                    <span className="text-lg font-bold text-jewel">{selectedMission.applications}</span>
                  </div>
                </div>

                {/* Activation Section */}
                <div className="pt-4 border-t border-white/10">
                  {activationRequested ? (
                    <div className="text-center space-y-3">
                      <div className="w-10 h-10 mx-auto rounded-full bg-jewel/20 flex items-center justify-center">
                        <FiCheck className="text-xl text-jewel" />
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-stark mb-1">
                          Request Submitted!
                        </h4>
                        <p className="text-xs text-stark/60">
                          GOPHORA team will activate this mission within 24 hours.
                        </p>
                      </div>
                      <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-gradient-to-r from-jewel to-fuschia hover:opacity-90 text-stark rounded-lg font-medium transition w-full text-sm"
                      >
                        Close
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <button
                        onClick={handleActivation}
                        className="w-full py-3 bg-gradient-to-r from-jewel to-fuschia hover:from-jewel/90 hover:to-fuschia/90 text-stark rounded-lg font-bold transition-all shadow-lg hover:shadow-jewel/30 flex items-center justify-center gap-2 text-sm"
                      >
                        <FiZap />
                        Activate Mission Request
                      </button>
                      <p className="text-center text-xs text-stark/50">
                        Click to send activation request
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Missions;