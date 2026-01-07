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
      <div className="bg-[#F5F5F5] border border-[#333333] rounded-lg p-4 text-center">
        <div className="flex items-center justify-center gap-2 text-[#000000]">
          <CheckCircleIcon className="h-5 w-5" />
          <p className="font-medium">All providers are verified! No pending reviews.</p>
        </div>
      </div>
    );
  }

  // Show only 3 items max in preview
  const previewProviders = needsAttention.slice(0, 3);

  return (
    <div className="bg-[#FFF0E6] border border-[#FF4F00] rounded-lg p-4 mb-6">
      {/* Header with count and link */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="bg-[#FFE0CC] p-2 rounded-lg">
            <ClockIcon className="h-5 w-5 text-[#FF4F00]" />
          </div>
          <div>
            <h3 className="font-semibold text-[#000000]">
              Pending Verification ({needsAttention.length})
            </h3>
            <p className="text-sm text-[#333333]">Requires human review (Score: 40-84)</p>
          </div>
        </div>
        
        <Link 
          to="/admin/providers/review" 
          className="flex items-center gap-1 text-sm font-medium text-[#000000] hover:text-[#333333]"
        >
          <span>Review All</span>
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
      
      {/* Quick Preview List */}
      <div className="space-y-2">
        {previewProviders.map(provider => (
          <div key={provider.id} className="bg-white p-3 rounded-lg border border-[#FFE0CC] hover:border-[#FF4F00]">
            <div className="flex justify-between items-center">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-[#000000] truncate">{provider.name}</h4>
                  <span className="text-xs px-2 py-0.5 bg-[#F5F5F5] text-[#000000] rounded">
                    {provider.trustScore}
                  </span>
                </div>
                <p className="text-sm text-[#333333] truncate">{provider.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 bg-[#F5F5F5] text-[#000000] rounded">
                    {provider.type}
                  </span>
                  <span className="text-xs text-[#333333]">
                    {provider.website ? 'Has website' : 'No website'}
                  </span>
                </div>
              </div>
              
              {/* Quick Action Buttons */}
              <div className="flex gap-1 ml-2">
                <button
                  onClick={() => onQuickApprove(provider.id)}
                  className="p-1.5 bg-[#333333] text-white rounded hover:bg-[#000000] transition-colors"
                  title="Approve"
                >
                  <CheckCircleIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onQuickDeny(provider.id)}
                  className="p-1.5 bg-[#FF4F00] text-white rounded hover:bg-[#E04600] transition-colors"
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
              className="text-sm text-[#000000] hover:text-[#333333] font-medium"
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