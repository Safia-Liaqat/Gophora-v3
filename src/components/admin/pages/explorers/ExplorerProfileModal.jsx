export default function ExplorerProfileModal({ explorer, onClose }) {
  if (!explorer) return null

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString()
  }

  const getStatusColor = (status, isBlocked) => {
    if (isBlocked) return 'bg-[#FFF0E6] text-[#000000] border border-[#FF4F00]'
    
    switch(status) {
      case 'Unverified': return 'bg-[#FFF0E6] text-[#000000] border border-[#FF4F00]'
      case 'AI Verification': return 'bg-[#E6F0FF] text-[#000000] border border-[#333333]'
      case 'Human Verification': return 'bg-[#FFF8E6] text-[#000000] border border-[#FF4F00]'
      case 'Fully Verified': return 'bg-[#333333] text-white'
      default: return 'bg-[#FFF0E6] text-[#000000] border border-[#FF4F00]'
    }
  }

  return (
    <div className="fixed inset-0 bg-[#000000]/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 rounded-lg border border-[#333333] shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-[#000000]">Explorer Profile</h3>
            <p className="text-[#333333] text-sm mt-1">ID: {explorer.id || 'N/A'}</p>
            {explorer.is_blocked && (
              <span className="inline-block mt-2 px-3 py-1 bg-[#FFF0E6] text-[#000000] text-xs rounded border border-[#FF4F00]">
                ⚠️ Blocked - Access Restricted
              </span>
            )}
          </div>
          <button 
            onClick={onClose} 
            className="text-2xl text-[#333333] hover:text-[#000000]"
          >
            ×
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Basic Info & Scores */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-[#F5F5F5] p-4 rounded-lg border border-[#333333]">
              <h4 className="font-bold text-[#000000] mb-4">Explorer ID</h4>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-[#333333]">Name</p>
                  <p className="text-[#000000] font-medium">{explorer.name || 'Anonymous Explorer'}</p>
                </div>

                <div>
                  <p className="text-sm text-[#333333]">Email</p>
                  <p className="text-[#000000] break-all">{explorer.email}</p>
                </div>

                <div>
                  <p className="text-sm text-[#333333]">Joined</p>
                  <p className="text-[#000000]">{formatDate(explorer.created_at)}</p>
                </div>

                <div>
                  <p className="text-sm text-[#333333] mb-2">Status</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(explorer.verification_status, explorer.is_blocked)}`}>
                    {explorer.is_blocked ? 'Blocked' : (explorer.verification_status || 'Unverified')}
                  </span>
                </div>

                {explorer.created_by_admin && (
                  <div className="pt-2 border-t border-[#333333]">
                    <p className="text-sm text-[#333333]">Created By</p>
                    <p className="text-[#000000] font-medium">Administrator</p>
                  </div>
                )}
              </div>
            </div>

            {/* Scores Card */}
            <div className="bg-[#F5F5F5] p-4 rounded-lg border border-[#333333]">
              <h4 className="font-bold text-[#000000] mb-4">Explorer ID Scores</h4>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#333333]">Activation Readiness</span>
                    <span className="text-[#000000] font-medium">
                      {explorer.activation_readiness_score ? Math.round(explorer.activation_readiness_score * 100) : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-[#FFF0E6] rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${explorer.is_blocked ? 'bg-[#333333]' : 'bg-[#FF4F00]'}`}
                      style={{ width: `${Math.min(100, explorer.activation_readiness_score * 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#333333]">Trust Score</span>
                    <span className="text-[#000000] font-medium">
                      {explorer.trust_score ? Math.round(explorer.trust_score * 100) : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-[#F5F5F5] rounded-full h-2">
                    <div 
                      className="bg-[#333333] h-2 rounded-full" 
                      style={{ width: `${Math.min(100, explorer.trust_score * 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#333333]">Digital Consistency</span>
                    <span className="text-[#000000] font-medium">
                      {explorer.digital_consistency_score ? Math.round(explorer.digital_consistency_score * 100) : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-[#F5F5F5] rounded-full h-2">
                    <div 
                      className="bg-[#333333] h-2 rounded-full" 
                      style={{ width: `${Math.min(100, explorer.digital_consistency_score * 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-sm text-[#333333]">Total Activations</p>
                    <p className="text-[#000000] font-medium text-xl">{explorer.activations_count || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#333333]">Completed</p>
                    <p className="text-[#000000] font-medium text-xl">{explorer.completed_activations || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Columns: Signals and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Connected Signals Card */}
            <div className="bg-[#F5F5F5] p-4 rounded-lg border border-[#333333]">
              <h4 className="font-bold text-[#000000] mb-4">Connected Signals</h4>
              
              <div className="space-y-4">
                {/* Social Accounts */}
                {explorer.social_accounts?.length > 0 && (
                  <div>
                    <p className="text-sm text-[#333333] mb-2">Social Media</p>
                    <div className="flex flex-wrap gap-2">
                      {explorer.social_accounts.map((account, index) => (
                        <div key={index} className="px-3 py-2 bg-white rounded border border-[#333333]">
                          <div className="flex items-center gap-2">
                            <span className="text-[#000000] font-medium text-sm">{account.provider}</span>
                            {account.activity_score && (
                              <span className="px-1.5 py-0.5 bg-[#333333] text-white text-xs rounded">
                                {Math.round(account.activity_score * 100)}%
                              </span>
                            )}
                          </div>
                          {account.digital_age && (
                            <p className="text-[#333333] text-xs mt-1">
                              Age: {account.digital_age} months
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Wallet */}
                {explorer.wallet_address && (
                  <div>
                    <p className="text-sm text-[#333333] mb-2">Web3 Wallet</p>
                    <div className="px-3 py-2 bg-white rounded border border-[#333333]">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[#000000] font-medium text-sm">Wallet</span>
                        <span className="px-1.5 py-0.5 bg-[#FF4F00] text-white text-xs rounded">
                          {explorer.wallet_chain || 'Web3'}
                        </span>
                      </div>
                      <p className="text-[#333333] text-xs break-all">{explorer.wallet_address}</p>
                    </div>
                  </div>
                )}

                {/* Video Signal */}
                {explorer.video_signal && (
                  <div>
                    <p className="text-sm text-[#333333] mb-2">Purpose Video</p>
                    <div className="px-3 py-2 bg-white rounded border border-[#333333]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#000000] font-medium text-sm">Video Analysis</span>
                        {explorer.motivation_score && (
                          <span className="px-1.5 py-0.5 bg-[#333333] text-white text-xs rounded">
                            Motivation: {Math.round(explorer.motivation_score * 100)}%
                          </span>
                        )}
                      </div>
                      {explorer.video_transcript && (
                        <div className="mt-2">
                          <p className="text-xs text-[#333333] mb-1">Transcript Excerpt:</p>
                          <p className="text-[#000000] text-sm italic line-clamp-3">
                            "{explorer.video_transcript.substring(0, 150)}..."
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {!explorer.social_accounts?.length && !explorer.wallet_address && !explorer.video_signal && (
                  <p className="text-[#333333] text-sm italic">No signals connected yet</p>
                )}
              </div>
            </div>

            {/* AI Vectors Card */}
            {(explorer.purpose_vector || explorer.interest_vector || explorer.contribution_vector) && (
              <div className="bg-[#F5F5F5] p-4 rounded-lg border border-[#333333]">
                <h4 className="font-bold text-[#000000] mb-4">AI Analysis Vectors</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {explorer.purpose_vector && (
                    <div className="p-3 bg-white rounded border border-[#333333]">
                      <p className="text-sm text-[#333333] mb-2">Purpose Vector</p>
                      <p className="text-[#000000] text-xs font-mono truncate">
                        {Array.isArray(explorer.purpose_vector) 
                          ? `[${explorer.purpose_vector.slice(0, 3).map(v => v.toFixed(2)).join(', ')}...]`
                          : 'Vector data'}
                      </p>
                    </div>
                  )}
                  
                  {explorer.interest_vector && (
                    <div className="p-3 bg-white rounded border border-[#333333]">
                      <p className="text-sm text-[#333333] mb-2">Interest Vector</p>
                      <p className="text-[#000000] text-xs font-mono truncate">
                        {Array.isArray(explorer.interest_vector) 
                          ? `[${explorer.interest_vector.slice(0, 3).map(v => v.toFixed(2)).join(', ')}...]`
                          : 'Vector data'}
                      </p>
                    </div>
                  )}
                  
                  {explorer.contribution_vector && (
                    <div className="p-3 bg-white rounded border border-[#333333]">
                      <p className="text-sm text-[#333333] mb-2">Contribution Vector</p>
                      <p className="text-[#000000] text-xs font-mono truncate">
                        {Array.isArray(explorer.contribution_vector) 
                          ? `[${explorer.contribution_vector.slice(0, 3).map(v => v.toFixed(2)).join(', ')}...]`
                          : 'Vector data'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Recent Activations */}
            {explorer.recent_activations?.length > 0 && (
              <div className="bg-[#F5F5F5] p-4 rounded-lg border border-[#333333]">
                <h4 className="font-bold text-[#000000] mb-4">Recent Activations</h4>
                
                <div className="space-y-2">
                  {explorer.recent_activations.slice(0, 3).map((activation, index) => (
                    <div key={index} className="px-3 py-2 bg-white rounded border border-[#333333]">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[#000000] font-medium text-sm">{activation.mission_title || 'Mission'}</p>
                          <p className="text-[#333333] text-xs mt-1">
                            Compatibility: {activation.compatibility_score ? Math.round(activation.compatibility_score * 100) : 0}%
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          activation.status === 'completed' 
                            ? 'bg-[#333333] text-white' 
                            : 'bg-[#FFF0E6] text-[#000000] border border-[#FF4F00]'
                        }`}>
                          {activation.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6 pt-6 border-t border-[#333333]">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#333333] rounded text-[#000000] hover:bg-[#F5F5F5] transition-colors text-sm"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  )
}