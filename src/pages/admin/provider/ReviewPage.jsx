// src/pages/providers/ReviewPage.jsx
import { useState } from 'react';
import { mockProviders } from '../../../services/providersData'
import { 
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowLeftIcon,
  InformationCircleIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const ReviewPage = () => {
  const [providers] = useState(mockProviders);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [filters, setFilters] = useState({
    minScore: 40,
    maxScore: 84,
    type: 'all'
  });

  // Filter providers that need human verification (scores 40-84 and pending review)
  const pendingProviders = providers.filter(p => 
    p.status === 'pending_review' && 
    p.trustScore >= 40 && 
    p.trustScore <= 84
  );

  const filteredProviders = pendingProviders.filter(p => {
    if (filters.type !== 'all' && p.type !== filters.type) return false;
    return true;
  });

  const handleQuickApprove = (providerId) => {
    console.log('Approve provider:', providerId);
    // Update provider status to 'verified' and score to 85+
  };

  const handleQuickDeny = (providerId) => {
    console.log('Deny provider:', providerId);
    // Update provider status to 'denied' and score to <40
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} selected providers`);
    // Implement bulk action logic
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link 
                to="/admin/providers" 
                className="text-gray-500 hover:text-gray-700"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Human Verification Queue</h1>
            </div>
            <p className="text-gray-600">
              Review and verify providers with Trust Scores between 40-84
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkAction('approve')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
            >
              <CheckCircleIcon className="h-4 w-4" />
              Bulk Approve
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-4 bg-white p-4 rounded-lg border border-amber-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-700">{filteredProviders.length}</div>
              <div className="text-sm text-gray-600">Pending Review</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {filteredProviders.filter(p => p.type === 'institutional').length}
              </div>
              <div className="text-sm text-gray-600">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {filteredProviders.filter(p => p.type === 'professional').length}
              </div>
              <div className="text-sm text-gray-600">Professionals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {filteredProviders.filter(p => p.type === 'new_talent').length}
              </div>
              <div className="text-sm text-gray-600">New Talents</div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <InformationCircleIcon className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900 mb-1">Verification Guidelines</h3>
            <p className="text-sm text-blue-800">
              Providers with scores 40-84 require human review. Check for: 
              • Website authenticity • Social media consistency • Video introduction quality • 
              Professional descriptions • User review patterns
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-900 flex items-center gap-2">
            <FunnelIcon className="h-4 w-4" />
            Filter Providers
          </h3>
          <span className="text-sm text-gray-600">
            Showing {filteredProviders.length} of {pendingProviders.length}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Provider Type</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white"
            >
              <option value="all">All Types</option>
              <option value="institutional">Institutional</option>
              <option value="professional">Professional</option>
              <option value="new_talent">New Talent</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trust Score Range</label>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">40</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-600">84</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Only providers in this range need human review</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white">
              <option>Score (Low to High)</option>
              <option>Score (High to Low)</option>
              <option>Registration Date</option>
              <option>Name (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Providers List */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        {filteredProviders.length === 0 ? (
          <div className="p-8 text-center">
            <ClockIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Providers Need Review</h3>
            <p className="text-gray-600">All providers in the 40-84 score range have been reviewed.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredProviders.map((provider) => (
              <div key={provider.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  {/* Provider Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">
                          {provider.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{provider.name}</h4>
                        <p className="text-sm text-gray-600">{provider.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full
                          ${provider.type === 'institutional' ? 'bg-blue-100 text-blue-800' : 
                            provider.type === 'professional' ? 'bg-green-100 text-green-800' : 
                            'bg-yellow-100 text-yellow-800'}`}>
                          {provider.type}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                          Score: {provider.trustScore}
                        </span>
                      </div>
                    </div>
                    
                    {/* Quick Info */}
                    <div className="ml-12 grid grid-cols-1 md:grid-cols-3 gap-4">
                      {provider.website && (
                        <div className="text-sm">
                          <span className="text-gray-500">Website: </span>
                          <a href={provider.website} className="text-purple-600 hover:text-purple-800">
                            {provider.website.replace('https://', '')}
                          </a>
                        </div>
                      )}
                      <div className="text-sm">
                        <span className="text-gray-500">Registered: </span>
                        <span>{new Date(provider.registrationDate).toLocaleDateString()}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Opportunities: </span>
                        <span className="font-medium">{provider.opportunities}</span>
                      </div>
                    </div>
                    
                    {/* Gemini Reason */}
                    <div className="ml-12 mt-3">
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                        <span className="font-medium text-gray-900">Gemini Analysis: </span>
                        {provider.geminiReason}
                      </p>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="ml-4 flex flex-col gap-2">
                    <button
                      onClick={() => handleQuickApprove(provider.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center gap-2"
                    >
                      <CheckCircleIcon className="h-4 w-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleQuickDeny(provider.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center justify-center gap-2"
                    >
                      <XCircleIcon className="h-4 w-4" />
                      Deny
                    </button>
                    <button
                      onClick={() => setSelectedProvider(provider)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;