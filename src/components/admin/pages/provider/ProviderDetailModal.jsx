export default function ProviderDetailModal({ provider, onClose, onStatusUpdate }) {
  if (!provider) return null;

  const statusConfig = {
    verified: { 
      bgColor: 'bg-[#333333]', 
      textColor: 'text-white',
      label: 'Verified'
    },
    pending_review: { 
      bgColor: 'bg-[#FFF0E6]', 
      textColor: 'text-[#000000]',
      border: 'border border-[#FF4F00]',
      label: 'Pending Review'
    },
    denied: { 
      bgColor: 'bg-[#FFF0E6]', 
      textColor: 'text-[#000000]',
      border: 'border border-[#FF4F00]',
      label: 'Denied'
    }
  };

  const { bgColor, textColor, border, label } = statusConfig[provider.status] || statusConfig.pending_review;

  const getTypeLabel = (type) => {
    switch(type) {
      case 'institutional': return 'Company';
      case 'professional': return 'Freelancer';
      case 'new_talent': return 'New Talent';
      default: return 'Provider';
    }
  };

  return (
    <div className="fixed inset-0 bg-[#000000]/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg border border-[#333333] shadow-lg">
        {/* Header */}
        <div className="sticky top-0 bg-white p-6 pb-4 border-b border-[#333333]">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-[#000000]">Provider Profile</h3>
              <p className="text-sm text-[#333333] mt-1">{getTypeLabel(provider.type)}</p>
            </div>
            <button 
              onClick={onClose} 
              className="text-2xl text-[#333333] hover:text-[#000000]"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Basic Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-[#333333] mb-1">Name</p>
              <p className="text-[#000000] font-medium text-lg">{provider.name}</p>
            </div>

            <div>
              <p className="text-sm text-[#333333] mb-1">Email</p>
              <p className="text-[#000000] break-all">{provider.email}</p>
            </div>

            {provider.website && (
              <div>
                <p className="text-sm text-[#333333] mb-1">Website</p>
                <a 
                  href={provider.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF4F00] hover:text-[#E04600] break-all"
                >
                  {provider.website}
                </a>
              </div>
            )}

            <div>
              <p className="text-sm text-[#333333] mb-1">Trust Score</p>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-[#F5F5F5] rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      provider.trustScore >= 85 ? 'bg-green-500' : 
                      provider.trustScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${provider.trustScore}%` }}
                  ></div>
                </div>
                <span className={`font-bold ${
                  provider.trustScore >= 85 ? 'text-green-700' : 
                  provider.trustScore >= 40 ? 'text-yellow-700' : 'text-red-700'
                }`}>
                  {provider.trustScore}
                </span>
              </div>
            </div>
          </div>

          {/* Status and Opportunities */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#F5F5F5] p-4 rounded-lg">
              <p className="text-sm text-[#333333] mb-1">Status</p>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor} ${border}`}>
                {label}
              </span>
            </div>

            <div className="bg-[#F5F5F5] p-4 rounded-lg">
              <p className="text-sm text-[#333333] mb-1">Opportunities</p>
              <p className="text-[#000000] font-medium text-xl">{provider.opportunities || 0}</p>
            </div>

            <div className="bg-[#F5F5F5] p-4 rounded-lg">
              <p className="text-sm text-[#333333] mb-1">Rating</p>
              <p className="text-[#000000] font-medium text-xl">
                {provider.rating ? `${provider.rating}/5` : 'No ratings'}
              </p>
            </div>
          </div>

          {/* Social Profiles */}
          {provider.socialProfiles?.length > 0 && (
            <div className="mb-6">
              <p className="text-sm text-[#333333] mb-2">Social Profiles</p>
              <div className="flex flex-wrap gap-2">
                {provider.socialProfiles.map((profile, index) => (
                  <div key={index} className="bg-[#333333] text-white px-3 py-2 rounded-lg">
                    <p className="text-xs font-medium capitalize">{profile.platform}</p>
                    <p className="text-xs">{profile.followers.toLocaleString()} followers</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-[#333333] mb-1">Registration Date</p>
              <p className="text-[#000000]">
                {new Date(provider.registrationDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-[#333333] mb-1">Last Verified</p>
              <p className="text-[#000000]">
                {new Date(provider.lastVerified).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Gemini Analysis */}
          {provider.geminiReason && (
            <div className="mb-6">
              <p className="text-sm text-[#333333] mb-2">Gemini AI Analysis</p>
              <div className="bg-[#F5F5F5] p-4 rounded-lg">
                <p className="text-[#000000] text-sm italic">{provider.geminiReason}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white p-6 pt-4 border-t border-[#333333]">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {provider.status === 'pending_review' && (
                <>
                  <button
                    onClick={() => onStatusUpdate?.(provider.id, 'verified')}
                    className="px-4 py-2 bg-[#333333] text-white rounded hover:bg-[#000000] transition-colors text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => onStatusUpdate?.(provider.id, 'denied')}
                    className="px-4 py-2 bg-[#FFF0E6] text-[#000000] border border-[#FF4F00] rounded hover:bg-[#FFE0CC] transition-colors text-sm"
                  >
                    Deny
                  </button>
                </>
              )}
              {provider.status !== 'pending_review' && (
                <button
                  onClick={() => onStatusUpdate?.(provider.id, 'pending_review')}
                  className="px-4 py-2 bg-[#333333] text-white rounded hover:bg-[#000000] transition-colors text-sm"
                >
                  Re-verify
                </button>
              )}
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-[#333333] rounded text-[#000000] hover:bg-[#F5F5F5] transition-colors text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}