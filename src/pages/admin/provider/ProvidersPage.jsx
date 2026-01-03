// src/pages/admin/ProvidersPage.jsx
import { useState } from 'react';
import { mockProviders, verificationStats } from '../../../services/providersData'
import FilterBar from '../../../components/admin/provider/FilterBar';
import ProviderTable from '../../../components/admin/provider/ProviderTable';
import ReviewQueue from '../../../components/admin/provider/ReviewQueue';

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
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Provider Management</h1>
            <p className="text-gray-600">Manage and verify all providers in the GOPHORA ecosystem</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Export CSV
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Add Provider
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards - Simple inline version */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        <div className="bg-white p-4 rounded-xl border border-purple-100 shadow-sm">
          <p className="text-sm text-gray-600">Total Providers</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-green-100 shadow-sm">
          <p className="text-sm text-gray-600">Verified</p>
          <p className="text-2xl font-bold text-green-700">{stats.verified}</p>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-yellow-100 shadow-sm">
          <p className="text-sm text-gray-600">Pending Review</p>
          <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm">
          <p className="text-sm text-gray-600">Denied</p>
          <p className="text-2xl font-bold text-red-700">{stats.denied}</p>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
          <p className="text-sm text-gray-600">Avg Trust Score</p>
          <p className="text-2xl font-bold text-blue-700">{stats.avgScore}</p>
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
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            All Providers ({filteredProviders.length})
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Auto-refresh: </span>
            <span className="font-medium">30s</span>
            <button className="text-purple-600 hover:text-purple-800 ml-2">Pause</button>
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