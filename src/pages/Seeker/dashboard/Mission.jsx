import React, { useState, useEffect } from "react";
import { 
  MapPin, Zap, AlertCircle, Check, X, 
  Filter, Search, TrendingUp, Users, Eye,
  ChevronLeft, ChevronRight, Briefcase, Clock, DollarSign, Globe
} from "lucide-react";

const Missions = () => {
  const [missions, setMissions] = useState([]);
  const [filteredMissions, setFilteredMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMission, setSelectedMission] = useState(null);
  const [activationRequested, setActivationRequested] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedUrgency, setSelectedUrgency] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [missionsPerPage, setMissionsPerPage] = useState(10);

  // Listen for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Theme variables - Professional color scheme
  const theme = {
    bg: isDarkMode ? "bg-[#0a0514]" : "bg-slate-50",
    card: isDarkMode ? "bg-[#0f0a1c] border border-white/10" : "bg-white border border-gray-200 shadow-sm",
    buttonPrimary: isDarkMode ? "bg-fuchsia-600 hover:bg-fuchsia-700 text-white" : "bg-[#2d124d] hover:bg-fuchsia-600 text-white",
    buttonSecondary: isDarkMode ? "bg-white/5 border border-white/10 text-white hover:bg-white/10" : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50",
    inputBg: isDarkMode ? "bg-white/5 border border-white/10" : "bg-white border border-gray-200",
    textColor: isDarkMode ? "text-white" : "text-gray-900",
    textMuted: isDarkMode ? "text-gray-400" : "text-gray-600",
    textLight: isDarkMode ? "text-gray-500" : "text-gray-500",
    accentBorder: isDarkMode ? "border-fuchsia-500/30" : "border-fuchsia-300",
    focusRing: isDarkMode ? "focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500/50" : "focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500",
    badgePrimary: isDarkMode ? "bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-400" : "bg-fuchsia-100 border-fuchsia-200 text-fuchsia-700",
    badgeSecondary: isDarkMode ? "bg-white/5 border-white/10 text-gray-300" : "bg-gray-100 border-gray-200 text-gray-700",
    badgeSuccess: isDarkMode ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-green-100 border-green-200 text-green-700",
    badgeWarning: isDarkMode ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400" : "bg-yellow-100 border-yellow-200 text-yellow-700",
    badgeDanger: isDarkMode ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-red-100 border-red-200 text-red-700",
  };

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
      <div className={`min-h-screen p-4 md:p-8 transition-colors duration-700 ${theme.bg}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className={`inline-block animate-spin rounded-full h-12 w-12 border-b-2 ${isDarkMode ? 'border-fuchsia-500' : 'border-fuchsia-600'}`}></div>
              <p className={`mt-6 text-lg ${theme.textMuted}`}>Loading Immediate Missions...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 md:p-8 transition-colors duration-700 ${theme.bg}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isDarkMode 
                    ? "bg-fuchsia-500/10 border border-fuchsia-500/20" 
                    : "bg-fuchsia-50 border border-fuchsia-200"
                }`}>
                  <Zap className={`h-6 w-6 ${isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'}`} />
                </div>
                <div>
                  <h1 className={`text-2xl md:text-3xl font-bold ${theme.textColor}`}>Immediate Missions</h1>
                  <p className={`mt-2 ${theme.textMuted}`}>Browse and activate available missions</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <div className={`flex items-center gap-2 text-sm ${theme.textMuted}`}>
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-medium">{missions.length} total missions</span>
                </div>
                <div className={`flex items-center gap-2 text-sm ${theme.textMuted}`}>
                  <Users className="h-4 w-4" />
                  <span>Showing {filteredMissions.length} filtered</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className={`rounded-2xl p-4 mb-6 border ${theme.card}`}>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme.textLight}`} />
                  <input
                    type="text"
                    placeholder="Search missions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm ${theme.textColor} placeholder:text-gray-500 focus:outline-none transition-all ${theme.inputBg} ${theme.focusRing}`}
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`px-3 py-2.5 rounded-xl text-sm focus:outline-none ${theme.inputBg} ${theme.textColor} ${theme.focusRing}`}
                >
                  <option value="all">All Categories</option>
                  {categories.filter(c => c !== "all").map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                <select
                  value={selectedUrgency}
                  onChange={(e) => setSelectedUrgency(e.target.value)}
                  className={`px-3 py-2.5 rounded-xl text-sm focus:outline-none ${theme.inputBg} ${theme.textColor} ${theme.focusRing}`}
                >
                  <option value="all">Any Urgency</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className={`px-3 py-2.5 rounded-xl text-sm focus:outline-none ${theme.inputBg} ${theme.textColor} ${theme.focusRing}`}
                >
                  <option value="all">All Locations</option>
                  {locations.filter(l => l !== "all").map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
                
                <button
                  onClick={resetFilters}
                  className={`px-3 py-2.5 rounded-xl text-sm transition flex items-center gap-2 border ${theme.buttonSecondary}`}
                >
                  <Filter className="h-4 w-4" />
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Missions Table */}
        <div className={`rounded-2xl overflow-hidden border mb-6 ${theme.card}`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                <tr className="text-left text-sm">
                  <th className={`p-4 font-medium uppercase tracking-wider ${theme.textMuted}`}>Mission</th>
                  <th className={`p-4 font-medium uppercase tracking-wider ${theme.textMuted}`}>Category</th>
                  <th className={`p-4 font-medium uppercase tracking-wider ${theme.textMuted}`}>Location</th>
                  <th className={`p-4 font-medium uppercase tracking-wider ${theme.textMuted}`}>Urgency</th>
                  <th className={`p-4 font-medium uppercase tracking-wider ${theme.textMuted}`}>Applications</th>
                  <th className={`p-4 font-medium uppercase tracking-wider ${theme.textMuted}`}>Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-white/5' : 'divide-gray-100'}`}>
                {currentMissions.map((mission) => (
                  <tr 
                    key={mission.id} 
                    className={`transition cursor-pointer ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}
                    onClick={() => handleMissionClick(mission)}
                  >
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className={`font-medium text-sm ${theme.textColor} hover:text-fuchsia-600 transition`}>
                          {mission.title}
                        </div>
                        <div className={`text-xs ${theme.textLight}`}>
                          ID: {mission.internalId}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs border ${theme.badgeSecondary}`}>
                        {mission.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <MapPin className={`h-3 w-3 ${theme.textLight}`} />
                        <span className={theme.textColor}>
                          {mission.location}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        mission.urgency === 'High' ? theme.badgeDanger :
                        mission.urgency === 'Medium' ? theme.badgeWarning :
                        theme.badgeSuccess
                      }`}>
                        {mission.urgency}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className={`flex items-center gap-2 text-sm ${theme.textColor}`}>
                        <Users className={`h-3 w-3 ${theme.textLight}`} />
                        <span>{mission.applications}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMissionClick(mission);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-2 border ${theme.badgePrimary}`}
                      >
                        <Eye className="h-3 w-3" />
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
              <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${theme.badgeSecondary}`}>
                <Search className={`h-5 w-5 ${theme.textMuted}`} />
              </div>
              <h3 className={`text-lg font-medium mb-2 ${theme.textColor}`}>No missions found</h3>
              <p className={`max-w-md mx-auto mb-4 text-sm ${theme.textMuted}`}>
                Try adjusting your filters or search terms.
              </p>
              <button
                onClick={resetFilters}
                className={`px-4 py-2 rounded-xl text-sm font-medium ${theme.buttonPrimary}`}
              >
                Reset All Filters
              </button>
            </div>
          )}

          {filteredMissions.length > 0 && (
            <div className={`px-4 py-3 border-t flex justify-between items-center text-sm ${
              isDarkMode ? 'border-white/10 text-white/60' : 'border-gray-200 text-gray-600'
            }`}>
              <div>
                Showing {indexOfFirstMission + 1}-{Math.min(indexOfLastMission, filteredMissions.length)} of {filteredMissions.length} missions
              </div>
              <div>
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
              <span className={`text-sm ${theme.textMuted}`}>Show</span>
              <select
                value={missionsPerPage}
                onChange={(e) => {
                  setMissionsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className={`px-2 py-1 rounded text-sm focus:outline-none ${theme.inputBg} ${theme.textColor} ${theme.focusRing}`}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <span className={`text-sm ${theme.textMuted}`}>missions per page</span>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-xl transition border ${
                  currentPage === 1 
                    ? isDarkMode
                      ? "border-white/10 text-white/30 cursor-not-allowed"
                      : "border-gray-300 text-gray-400 cursor-not-allowed"
                    : `border ${theme.buttonSecondary}`
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {getPageNumbers().map((number) => (
                  <button
                    key={number}
                    onClick={() => handlePageChange(number)}
                    className={`w-8 h-8 flex items-center justify-center rounded-xl border text-sm ${
                      currentPage === number
                        ? theme.buttonPrimary
                        : `border ${theme.buttonSecondary}`
                    }`}
                  >
                    {number}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-xl transition border ${
                  currentPage === totalPages
                    ? isDarkMode
                      ? "border-white/10 text-white/30 cursor-not-allowed"
                      : "border-gray-300 text-gray-400 cursor-not-allowed"
                    : `border ${theme.buttonSecondary}`
                }`}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Go to page */}
            <div className="flex items-center gap-2">
              <span className={`text-sm ${theme.textMuted}`}>Go to page</span>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={currentPage}
                onChange={(e) => {
                  const page = Math.max(1, Math.min(totalPages, Number(e.target.value)));
                  if (page) handlePageChange(page);
                }}
                className={`w-16 px-2 py-1 rounded text-sm focus:outline-none ${theme.inputBg} ${theme.textColor} ${theme.focusRing}`}
              />
            </div>
          </div>
        )}
      </div>

      {/* Mission Detail Modal */}
      {selectedMission && (
        <>
          <div 
            className={`fixed inset-0 z-50 ${isDarkMode ? 'bg-black/80' : 'bg-black/60'} backdrop-blur-sm`}
            onClick={closeModal}
          />
          
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className={`relative w-full max-w-lg max-h-[90vh] rounded-xl shadow-2xl overflow-hidden border ${theme.card}`}>
              {/* Modal Header */}
              <div className={`sticky top-0 border-b p-5 z-10 ${isDarkMode ? 'bg-[#0a0514] border-white/10' : 'bg-white border-gray-200'}`}>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h2 className={`text-lg font-bold ${theme.textColor} leading-tight`}>
                      {selectedMission.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${theme.badgePrimary}`}>
                        {selectedMission.category}
                      </span>
                      <span className={`text-xs ${theme.textLight}`}>
                        ID: {selectedMission.internalId}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className={`p-1.5 rounded-lg transition ${isDarkMode ? 'hover:bg-white/10 text-white/60 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-black'}`}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-5 space-y-5 overflow-y-auto max-h-[calc(90vh-140px)]">
                {/* Description */}
                <div>
                  <h3 className={`text-sm font-medium mb-2 ${theme.textMuted}`}>Description</h3>
                  <p className={`text-sm ${theme.textColor} ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'} p-3 rounded-lg`}>
                    {selectedMission.description}
                  </p>
                </div>

                {/* Requirements */}
                {selectedMission.requirements && selectedMission.requirements.length > 0 && (
                  <div>
                    <h3 className={`text-sm font-medium mb-2 ${theme.textMuted}`}>Requirements</h3>
                    <div className="space-y-1.5">
                      {selectedMission.requirements.map((req, index) => (
                        <div
                          key={index}
                          className={`flex items-start gap-2 p-2.5 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}
                        >
                          <Check className={`mt-0.5 flex-shrink-0 ${isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'}`} size={14} />
                          <span className={`text-sm ${theme.textColor}`}>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mission Details */}
                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                    <div className={`flex items-center gap-1.5 text-xs mb-1 ${theme.textLight}`}>
                      <AlertCircle size={12} />
                      <span>Urgency</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium inline-block border ${
                      selectedMission.urgency === 'High' ? theme.badgeDanger :
                      selectedMission.urgency === 'Medium' ? theme.badgeWarning :
                      theme.badgeSuccess
                    }`}>
                      {selectedMission.urgency}
                    </span>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                    <div className={`flex items-center gap-1.5 text-xs mb-1 ${theme.textLight}`}>
                      <MapPin size={12} />
                      <span>Location</span>
                    </div>
                    <p className={`text-sm font-medium ${theme.textColor}`}>{selectedMission.location}</p>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                    <div className={`flex items-center gap-1.5 text-xs mb-1 ${theme.textLight}`}>
                      <DollarSign size={12} />
                      <span>Reward</span>
                    </div>
                    <p className={`text-lg font-bold ${isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'}`}>{selectedMission.reward}</p>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                    <div className={`flex items-center gap-1.5 text-xs mb-1 ${theme.textLight}`}>
                      <Clock size={12} />
                      <span>Duration</span>
                    </div>
                    <p className={`text-sm font-medium ${theme.textColor}`}>{selectedMission.duration}</p>
                  </div>
                </div>

                {/* Applications */}
                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className={theme.textLight} size={14} />
                      <span className={`text-sm ${theme.textMuted}`}>Current Applications</span>
                    </div>
                    <span className={`text-lg font-bold ${isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'}`}>{selectedMission.applications}</span>
                  </div>
                </div>

                {/* Activation Section */}
                <div className="pt-4 border-t border-white/10">
                  {activationRequested ? (
                    <div className="text-center space-y-3">
                      <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${theme.badgePrimary}`}>
                        <Check className={`h-5 w-5 ${isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'}`} />
                      </div>
                      <div>
                        <h4 className={`text-base font-medium mb-1 ${theme.textColor}`}>
                          Request Submitted!
                        </h4>
                        <p className={`text-xs ${theme.textMuted}`}>
                          GOPHORA team will activate this mission within 24 hours.
                        </p>
                      </div>
                      <button
                        onClick={closeModal}
                        className={`px-4 py-2 rounded-xl text-sm font-medium w-full ${theme.buttonPrimary}`}
                      >
                        Close
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <button
                        onClick={handleActivation}
                        className={`w-full py-3 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${theme.buttonPrimary}`}
                      >
                        <Zap className="h-4 w-4" />
                        Activate Mission Request
                      </button>
                      <p className={`text-center text-xs ${theme.textMuted}`}>
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