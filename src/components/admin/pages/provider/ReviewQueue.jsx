// src/components/providers/ReviewQueue.jsx
import { Link } from 'react-router-dom';
import { 
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

const ReviewQueue = ({ providers, onQuickApprove, onQuickDeny }) => {
  const pendingProviders = providers.filter(p => p.status === 'pending_review');
  const needsAttention = pendingProviders.filter(p => p.trustScore >= 40 && p.trustScore <= 84);

  if (needsAttention.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
        <div className="flex items-center justify-center gap-2 text-green-800">
          <CheckCircleIcon className="h-5 w-5" />
          <p className="font-medium">All providers are verified! No pending reviews.</p>
        </div>
      </div>
    );
  }

  // Show only 3 items max in preview
  const previewProviders = needsAttention.slice(0, 3);

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
      {/* Header with count and link */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="bg-amber-100 p-2 rounded-lg">
            <ClockIcon className="h-5 w-5 text-amber-700" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              Pending Verification ({needsAttention.length})
            </h3>
            <p className="text-sm text-gray-600">Requires human review (Score: 40-84)</p>
          </div>
        </div>
        
        <Link 
          to="/admin/providers/review" 
          className="flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-800"
        >
          <span>Review All</span>
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
      
      {/* Quick Preview List */}
      <div className="space-y-2">
        {previewProviders.map(provider => (
          <div key={provider.id} className="bg-white p-3 rounded-lg border border-amber-100 hover:border-amber-300">
            <div className="flex justify-between items-center">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-gray-900 truncate">{provider.name}</h4>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
                    {provider.trustScore}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">{provider.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                    {provider.type}
                  </span>
                  <span className="text-xs text-gray-500">
                    {provider.website ? 'Has website' : 'No website'}
                  </span>
                </div>
              </div>
              
              {/* Quick Action Buttons */}
              <div className="flex gap-1 ml-2">
                <button
                  onClick={() => onQuickApprove(provider.id)}
                  className="p-1.5 bg-green-100 text-green-700 rounded hover:bg-green-200"
                  title="Approve"
                >
                  <CheckCircleIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onQuickDeny(provider.id)}
                  className="p-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200"
                  title="Deny"
                >
                  <XCircleIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Show "View More" if there are more items */}
        {needsAttention.length > 3 && (
          <div className="pt-2 text-center">
            <Link 
              to="/admin/providers/review" 
              className="text-sm text-purple-600 hover:text-purple-800 font-medium"
            >
              + {needsAttention.length - 3} more providers need review
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewQueue;