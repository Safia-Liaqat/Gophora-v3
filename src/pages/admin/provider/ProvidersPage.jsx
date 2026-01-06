// src/pages/admin/ProvidersPage.jsx
import { useState } from 'react';
import { mockProviders, verificationStats } from '../../../services/providersData'
import FilterBar from '../../../components/admin/pages/provider/FilterBar';
import ProviderTable from '../../../components/admin/pages/provider/ProviderTable';
import ReviewQueue from '../../../components/admin/pages/provider/ReviewQueue';

const ProvidersPage = () => {
  const [providers, setProviders] = useState(mockProviders);
  const [filteredProviders, setFilteredProviders] = useState(mockProviders);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilter = (filters) => {
    let filtered = providers;
    
    if (filters.status !== 'all') {
      filtered = filtered.filter(p => p.status === filters.status);
    }
    
    if (filters.type !== 'all') {
      filtered = filtered.filter(p => p.type === filters.type);
    }
    
    filtered = filtered.filter(p => 
      p.trustScore >= filters.minScore && p.trustScore <= filters.maxScore
    );

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProviders(filtered);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filters = {
      status: 'all',
      type: 'all',
      minScore: 0,
      maxScore: 100
    };
    handleFilter(filters);
  };

  const handleQuickApprove = (providerId) => {
    setProviders(prev => prev.map(p => 
      p.id === providerId ? { ...p, status: 'verified', trustScore: 85 } : p
    ));
  };

  const handleQuickDeny = (providerId) => {
    setProviders(prev => prev.map(p => 
      p.id === providerId ? { ...p, status: 'denied', trustScore: 39 } : p
    ));
  };

  // Simple stats calculation
  const calculateStats = () => {
    const total = filteredProviders.length;
    const verified = filteredProviders.filter(p => p.status === 'verified').length;
    const pending = filteredProviders.filter(p => p.status === 'pending_review').length;
    const denied = filteredProviders.filter(p => p.status === 'denied').length;
    const avgScore = total > 0 
      ? Math.round(filteredProviders.reduce((sum, p) => sum + p.trustScore, 0) / total)
      : 0;
    
    return { total, verified, pending, denied, avgScore };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-[#FFFFFF] p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#000000] mb-2">Provider Management</h1>
            <p className="text-[#333333]">Manage and verify all providers in the GOPHORA ecosystem</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-[#333333] rounded-lg text-[#000000] hover:bg-gray-50">
              Export CSV
            </button>
            <button className="px-4 py-2 bg-[#FF4F00] text-white rounded-lg hover:bg-[#E04600]">
              Add Provider
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        <div className="bg-[#333333] p-4 rounded-xl border border-[#000000] shadow-sm">
          <p className="text-sm text-white">Total Providers</p>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </div>
        
        <div className="bg-[#333333] p-4 rounded-xl border border-[#000000] shadow-sm">
          <p className="text-sm text-white">Verified</p>
          <p className="text-2xl font-bold text-white">{stats.verified}</p>
        </div>
        
        <div className="bg-[#333333] p-4 rounded-xl border border-[#000000] shadow-sm">
          <p className="text-sm text-white">Pending Review</p>
          <p className="text-2xl font-bold text-white">{stats.pending}</p>
        </div>
        
        <div className="bg-[#333333] p-4 rounded-xl border border-[#000000] shadow-sm">
          <p className="text-sm text-white">Denied</p>
          <p className="text-2xl font-bold text-white">{stats.denied}</p>
        </div>
        
        <div className="bg-[#333333] p-4 rounded-xl border border-[#000000] shadow-sm">
          <p className="text-sm text-white">Avg Trust Score</p>
          <p className="text-2xl font-bold text-white">{stats.avgScore}</p>
        </div>
      </div>

      {/* Review Queue */}
      <ReviewQueue 
        providers={filteredProviders}
        onQuickApprove={handleQuickApprove}
        onQuickDeny={handleQuickDeny}
      />

      {/* Filter Bar */}
      <FilterBar 
        onFilter={handleFilter}
        onSearch={handleSearch}
      />

      {/* Providers Table */}
      <div className="bg-white rounded-lg shadow border border-[#333333] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-[#333333]">
          <h2 className="text-lg font-semibold text-[#000000]">
            All Providers ({filteredProviders.length})
          </h2>
          <div className="flex items-center gap-2 text-sm text-[#333333]">
            <span>Auto-refresh: </span>
            <span className="font-medium">30s</span>
            <button className="text-[#FF4F00] hover:text-[#E04600] ml-2">Pause</button>
          </div>
        </div>
        
        <ProviderTable 
          providers={filteredProviders}
          onSelectProvider={(provider) => {
            // You can handle provider selection here if needed
            console.log('Selected provider:', provider);
          }}
        />
      </div>
    </div>
  );
};

export default ProvidersPage;