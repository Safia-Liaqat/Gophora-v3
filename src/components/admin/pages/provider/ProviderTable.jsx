// src/components/providers/ProviderTable.jsx
import { useState } from 'react';
import VerificationBadge from './VerificationBadge';
import ScoreIndicator from './ScoreIndicator';
import { 
  BuildingOfficeIcon,
  UserIcon,
  RocketLaunchIcon,
  GlobeAltIcon,
  UsersIcon,
  VideoCameraIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  EyeIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const ProviderTable = ({ providers, onSelectProvider }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [quickActions, setQuickActions] = useState({});

  const getTypeIcon = (type) => {
    switch(type) {
      case 'institutional': return <BuildingOfficeIcon className="h-4 w-4 text-[#333333]" />;
      case 'professional': return <UserIcon className="h-4 w-4 text-[#333333]" />;
      case 'new_talent': return <RocketLaunchIcon className="h-4 w-4 text-[#333333]" />;
      default: return <UserIcon className="h-4 w-4 text-[#333333]" />;
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'institutional': return 'Company';
      case 'professional': return 'Freelancer';
      case 'new_talent': return 'New Talent';
      default: return type;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const toggleQuickActions = (id) => {
    setQuickActions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleQuickAction = (action, providerId, e) => {
    e.stopPropagation();
    console.log(`${action} action for provider ${providerId}`);
    setQuickActions(prev => ({ ...prev, [providerId]: false }));
  };

  return (
    <div className="bg-white rounded-lg shadow border border-[#333333] overflow-hidden">
      {/* Desktop Table View (lg and above) */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-[#333333]">
          <thead className="bg-[#333333]">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
                Provider
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
                Type
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
                Status
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
                Score
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[#333333]">
            {providers.map((provider) => (
              <tr 
                key={provider.id} 
                className="hover:bg-[#F5F5F5] transition-colors"
              >
                {/* Provider Column */}
                <td className="px-3 py-3">
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#333333] to-[#000000] rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {provider.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#000000] truncate max-w-[150px]">
                        {provider.name}
                      </p>
                      <p className="text-xs text-[#333333] truncate max-w-[150px]">{provider.email}</p>
                      
                      {/* Website - Compact View */}
                      {provider.website && (
                        <div className="mt-1 flex items-center gap-1">
                          <GlobeAltIcon className="h-3 w-3 text-[#333333]" />
                          <span className="text-xs text-[#FF4F00] truncate max-w-[120px]">
                            {provider.website.replace('https://', '').replace('http://', '')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </td>

                {/* Type Column */}
                <td className="px-3 py-3">
                  <div className="flex items-center gap-1">
                    {getTypeIcon(provider.type)}
                    <span className="text-xs text-[#000000]">
                      {getTypeLabel(provider.type)}
                    </span>
                  </div>
                </td>

                {/* Status Column */}
                <td className="px-3 py-3">
                  <VerificationBadge 
                    status={provider.status} 
                    level={null}
                  />
                </td>

                {/* Score Column */}
                <td className="px-3 py-3">
                  <div className="flex items-center justify-between">
                    <ScoreIndicator score={provider.trustScore} />
                  </div>
                </td>

                {/* Actions Column - COMPACT */}
                <td className="px-3 py-3">
                  <div className="flex items-center gap-1">
                    {/* View Details Button */}
                    <button
                      onClick={() => onSelectProvider(provider)}
                      className="p-1.5 bg-[#FF4F00] text-white rounded hover:bg-[#E04600] transition-colors"
                      title="View Details"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    
                    {/* Quick Actions Dropdown */}
                    {provider.status === 'pending_review' ? (
                      <div className="relative">
                        <button
                          onClick={() => toggleQuickActions(provider.id)}
                          className="p-1.5 bg-[#FFF0E6] text-[#FF4F00] rounded hover:bg-[#FFE0CC]"
                          title="Quick Actions"
                        >
                          <ChevronDownIcon className="h-4 w-4" />
                        </button>
                        
                        {quickActions[provider.id] && (
                          <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg border border-[#333333] z-10">
                            <button
                              onClick={(e) => handleQuickAction('approve', provider.id, e)}
                              className="w-full px-3 py-2 text-left text-xs text-[#000000] hover:bg-[#F5F5F5] flex items-center gap-2 border-b border-[#333333]"
                            >
                              <CheckCircleIcon className="h-3 w-3" />
                              Approve
                            </button>
                            <button
                              onClick={(e) => handleQuickAction('deny', provider.id, e)}
                              className="w-full px-3 py-2 text-left text-xs text-[#000000] hover:bg-[#F5F5F5] flex items-center gap-2"
                            >
                              <XCircleIcon className="h-3 w-3" />
                              Deny
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => console.log('Re-verify', provider.id)}
                        className="p-1.5 border border-[#333333] text-[#000000] rounded hover:bg-[#F5F5F5]"
                        title="Re-verify"
                      >
                        <ArrowPathIcon className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View (below lg) */}
      <div className="lg:hidden space-y-3 p-3">
        {providers.map((provider) => (
          <div 
            key={provider.id} 
            className="bg-white border border-[#333333] rounded-lg p-3 hover:border-[#FF4F00] transition-colors"
          >
            {/* Card Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#333333] to-[#000000] rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {provider.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#000000]">{provider.name}</p>
                  <p className="text-xs text-[#333333]">{provider.email}</p>
                </div>
              </div>
              
              <button
                onClick={() => toggleRow(provider.id)}
                className="text-[#333333] hover:text-[#000000]"
              >
                {expandedRow === provider.id ? (
                  <ChevronUpIcon className="h-5 w-5" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Card Body - Always Visible */}
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div className="text-center">
                <div className="text-xs text-[#333333]">Type</div>
                <div className="flex items-center justify-center gap-1">
                  {getTypeIcon(provider.type)}
                  <span className="text-xs font-medium text-[#000000]">
                    {getTypeLabel(provider.type)}
                  </span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-xs text-[#333333]">Status</div>
                <VerificationBadge status={provider.status} level={null} />
              </div>
              
              <div className="text-center">
                <div className="text-xs text-[#333333]">Score</div>
                <div className="flex justify-center">
                  <span className="text-sm font-bold text-[#000000]">{provider.trustScore}</span>
                </div>
              </div>
            </div>

            {/* Card Footer - Quick Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-[#333333]">
              <div className="text-xs text-[#333333]">
                {provider.opportunities} opportunities
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onSelectProvider(provider)}
                  className="p-1.5 bg-[#FF4F00] text-white rounded hover:bg-[#E04600]"
                  title="View Details"
                >
                  <EyeIcon className="h-4 w-4" />
                </button>
                
                {provider.status === 'pending_review' && (
                  <>
                    <button
                      onClick={() => console.log('Quick Approve', provider.id)}
                      className="p-1.5 bg-[#FFF0E6] text-[#FF4F00] rounded hover:bg-[#FFE0CC]"
                      title="Approve"
                    >
                      <CheckCircleIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => console.log('Quick Deny', provider.id)}
                      className="p-1.5 bg-[#FFF0E6] text-[#FF4F00] rounded hover:bg-[#FFE0CC]"
                      title="Deny"
                    >
                      <XCircleIcon className="h-4 w-4" />
                    </button>
                  </>
                )}
                
                <button
                  onClick={() => console.log('Re-verify', provider.id)}
                  className="p-1.5 border border-[#333333] text-[#000000] rounded hover:bg-[#F5F5F5]"
                  title="Re-verify"
                >
                  <ArrowPathIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedRow === provider.id && (
              <div className="mt-3 pt-3 border-t border-[#333333] space-y-2">
                {/* Website Details */}
                {provider.website && (
                  <div className="text-sm">
                    <div className="flex items-center gap-1 text-[#333333]">
                      <GlobeAltIcon className="h-3 w-3" />
                      <span>Website:</span>
                    </div>
                    <a 
                      href={provider.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#FF4F00] hover:text-[#E04600] text-xs truncate block"
                    >
                      {provider.website}
                    </a>
                    {provider.domainAge && (
                      <div className="text-xs text-[#333333] ml-4">
                        Domain Age: {provider.domainAge} year{provider.domainAge !== 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                )}

                {/* Social Profiles */}
                {provider.socialProfiles && provider.socialProfiles.length > 0 && (
                  <div className="text-sm">
                    <div className="flex items-center gap-1 text-[#333333]">
                      <UsersIcon className="h-3 w-3" />
                      <span>Social Profile:</span>
                    </div>
                    <div className="text-xs text-[#000000] ml-4">
                      {provider.socialProfiles[0].platform}: {provider.socialProfiles[0].followers.toLocaleString()} followers
                    </div>
                  </div>
                )}

                {/* Video Intro */}
                {provider.videoIntro && (
                  <div className="text-sm">
                    <div className="flex items-center gap-1 text-[#333333]">
                      <VideoCameraIcon className="h-3 w-3" />
                      <span>Video Introduction:</span>
                    </div>
                    <div className="text-xs text-[#000000] ml-4">Available</div>
                  </div>
                )}

                {/* Dates */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-xs text-[#333333]">Registered</div>
                    <div className="text-xs font-medium text-[#000000]">{formatDate(provider.registrationDate)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#333333]">Last Verified</div>
                    <div className="text-xs font-medium text-[#000000]">{formatDate(provider.lastVerified)}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderTable;