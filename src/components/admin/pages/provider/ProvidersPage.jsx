import { useEffect, useState } from 'react'
import ProviderProfileModal from './ProviderDetailModal'

export default function ProvidersList() {
  const [providers, setProviders] = useState([])
  const [filteredProviders, setFilteredProviders] = useState([])
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    search: ''
  })

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true)
        // This would be replaced with your actual API call
        const mockProviders = [
          {
            id: 1,
            name: 'Tech Corp Inc',
            email: 'contact@techcorp.com',
            type: 'institutional',
            status: 'verified',
            trustScore: 92,
            website: 'https://techcorp.com',
            opportunities: 15,
            rating: 4.8,
            socialProfiles: [
              { platform: 'linkedin', followers: 25000 },
              { platform: 'twitter', followers: 18000 }
            ],
            registrationDate: '2023-01-15',
            lastVerified: '2024-01-10',
            geminiReason: 'Strong domain history and professional social presence.'
          },
          {
            id: 2,
            name: 'John Doe',
            email: 'john@example.com',
            type: 'professional',
            status: 'pending_review',
            trustScore: 65,
            website: null,
            opportunities: 3,
            rating: 4.5,
            socialProfiles: [
              { platform: 'github', followers: 1200 }
            ],
            registrationDate: '2024-02-01',
            lastVerified: '2024-02-01',
            geminiReason: 'Limited online presence, requires manual review.'
          },
          {
            id: 3,
            name: 'Sarah Smith',
            email: 'sarah@example.com',
            type: 'new_talent',
            status: 'denied',
            trustScore: 28,
            website: null,
            opportunities: 0,
            rating: null,
            socialProfiles: [],
            registrationDate: '2024-01-20',
            lastVerified: '2024-01-22',
            geminiReason: 'Insufficient verification data.'
          }
        ]
        setProviders(mockProviders)
        setFilteredProviders(mockProviders)
      } catch (err) {
        console.error('Error fetching providers:', err)
        setError('Failed to load providers. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchProviders()
  }, [])

  useEffect(() => {
    let filtered = providers
    
    if (filters.status !== 'all') {
      filtered = filtered.filter(p => p.status === filters.status)
    }
    
    if (filters.type !== 'all') {
      filtered = filtered.filter(p => p.type === filters.type)
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.email.toLowerCase().includes(searchTerm)
      )
    }

    setFilteredProviders(filtered)
  }, [filters, providers])

  const updateStatus = async (id, newStatus) => {
    try {
      // This would be replaced with your actual API call
      setProviders(prev =>
        prev.map(p =>
          p.id === id ? { ...p, status: newStatus } : p
        )
      )
    } catch (err) {
      console.error('Failed to update status:', err)
    }
  }

  const getTypeLabel = (type) => {
    switch(type) {
      case 'institutional': return 'Company';
      case 'professional': return 'Freelancer';
      case 'new_talent': return 'New Talent';
      default: return type;
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'verified': return 'bg-[#333333] text-white';
      case 'pending_review': return 'bg-[#FFF0E6] text-[#000000] border border-[#FF4F00]';
      case 'denied': return 'bg-[#FFF0E6] text-[#000000] border border-[#FF4F00]';
      default: return 'bg-[#F5F5F5] text-[#000000]';
    }
  }

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg border border-[#333333] shadow-sm">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF4F00]"></div>
            <p className="mt-3 text-[#333333]">Loading providers...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg border border-[#333333] shadow-sm">
        <div className="p-4 bg-[#FFF0E6] border border-[#FF4F00] rounded-lg">
          <p className="text-[#000000]">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-[#FF4F00] text-white rounded hover:bg-[#E04600] transition-colors text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const stats = {
    total: filteredProviders.length,
    verified: filteredProviders.filter(p => p.status === 'verified').length,
    pending: filteredProviders.filter(p => p.status === 'pending_review').length,
    denied: filteredProviders.filter(p => p.status === 'denied').length,
    avgScore: filteredProviders.length > 0 
      ? Math.round(filteredProviders.reduce((sum, p) => sum + p.trustScore, 0) / filteredProviders.length)
      : 0
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-[#333333] shadow-sm">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#000000]">Providers Management</h2>
          <p className="text-[#333333] text-sm mt-1">
            Manage and verify all providers in the system
          </p>
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

      {/* Filters */}
      <div className="mb-6 p-4 bg-[#F5F5F5] rounded-lg border border-[#333333]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-[#333333] mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="w-full p-2 border border-[#333333] rounded text-[#000000] bg-white"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending_review">Pending Review</option>
              <option value="denied">Denied</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-[#333333] mb-1">Type</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
              className="w-full p-2 border border-[#333333] rounded text-[#000000] bg-white"
            >
              <option value="all">All Types</option>
              <option value="institutional">Company</option>
              <option value="professional">Freelancer</option>
              <option value="new_talent">New Talent</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-[#333333] mb-1">Search</label>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="w-full p-2 border border-[#333333] rounded text-[#000000]"
            />
          </div>
        </div>
      </div>

      {/* Providers Table */}
      <div className="overflow-x-auto rounded-lg border border-[#333333]">
        <table className="w-full min-w-[800px]">
          <thead className="bg-[#333333] text-white">
            <tr>
              <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Provider</th>
              <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Type</th>
              <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Trust Score</th>
              <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Opportunities</th>
              <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
              <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProviders.map(provider => (
              <tr key={provider.id} className="border-t border-[#333333] hover:bg-[#F5F5F5] transition-colors">
                {/* Provider */}
                <td className="p-3 align-top">
                  <div className="font-medium text-[#000000] text-sm">
                    {provider.name}
                  </div>
                  <div className="text-[#333333] text-xs break-all">
                    {provider.email}
                  </div>
                  {provider.website && (
                    <div className="text-[#FF4F00] text-xs truncate max-w-[200px]">
                      {provider.website.replace('https://', '').replace('http://', '')}
                    </div>
                  )}
                </td>

                {/* Type */}
                <td className="p-3 align-top">
                  <div className="text-[#000000] text-sm">
                    {getTypeLabel(provider.type)}
                  </div>
                </td>

                {/* Trust Score */}
                <td className="p-3 align-top">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-[#F5F5F5] rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          provider.trustScore >= 85 ? 'bg-green-500' : 
                          provider.trustScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(provider.trustScore, 100)}%` }}
                      ></div>
                    </div>
                    <span className={`font-bold text-sm ${
                      provider.trustScore >= 85 ? 'text-green-700' : 
                      provider.trustScore >= 40 ? 'text-yellow-700' : 'text-red-700'
                    }`}>
                      {provider.trustScore}
                    </span>
                  </div>
                </td>

                {/* Opportunities */}
                <td className="p-3 align-top">
                  <div className="text-[#000000] font-medium text-sm">
                    {provider.opportunities || 0}
                  </div>
                </td>

                {/* Status */}
                <td className="p-3 align-top">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(provider.status)}`}>
                    {provider.status === 'verified' ? 'Verified' : 
                     provider.status === 'pending_review' ? 'Pending Review' : 'Denied'}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-3 align-top">
                  <div className="flex flex-col gap-1 w-24">
                    <button
                      onClick={() => setSelectedProvider(provider)}
                      className="px-1.5 py-1 border border-[#333333] rounded text-[#000000] text-xs hover:bg-[#F5F5F5] transition-colors truncate"
                    >
                      View Profile
                    </button>
                    {provider.status === 'pending_review' ? (
                      <>
                        <button
                          onClick={() => updateStatus(provider.id, 'verified')}
                          className="px-1.5 py-1 bg-[#333333] text-white rounded text-xs hover:bg-[#000000] transition-colors truncate"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(provider.id, 'denied')}
                          className="px-1.5 py-1 bg-[#FFF0E6] text-[#000000] border border-[#FF4F00] rounded text-xs hover:bg-[#FFE0CC] transition-colors truncate"
                        >
                          Deny
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => updateStatus(provider.id, 'pending_review')}
                        className="px-1.5 py-1 bg-[#333333] text-white rounded text-xs hover:bg-[#000000] transition-colors truncate"
                      >
                        Re-verify
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stats Footer */}
      <div className="mt-4 pt-4 border-t border-[#333333] text-xs text-[#333333]">
        <div className="flex justify-between items-center">
          <div>
            Showing {filteredProviders.length} provider{filteredProviders.length !== 1 ? 's' : ''}
            {filters.status !== 'all' && ` (${filters.status})`}
            {filters.type !== 'all' && ` (${getTypeLabel(filters.type)})`}
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-[#333333] rounded-full"></span>
              <span>Verified: {stats.verified}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-[#FF4F00] rounded-full"></span>
              <span>Pending: {stats.pending}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-[#666666] rounded-full"></span>
              <span>Denied: {stats.denied}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredProviders.length === 0 && (
        <div className="text-center py-12 border-t border-[#333333]">
          <h2 className="text-xl font-bold text-[#000000] mb-2">No Providers Found</h2>
          <p className="text-[#333333]">
            {providers.length === 0 
              ? 'There are no providers registered yet.' 
              : 'Try changing your filters or search term.'}
          </p>
        </div>
      )}

      <ProviderProfileModal
        provider={selectedProvider}
        onClose={() => setSelectedProvider(null)}
        onStatusUpdate={updateStatus}
      />
    </div>
  )
}