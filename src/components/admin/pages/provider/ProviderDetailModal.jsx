// src/components/providers/ProviderDetailModal.jsx
import {
  BuildingOfficeIcon,
  UserIcon,
  RocketLaunchIcon,
  GlobeAltIcon,
  CalendarIcon,
  UsersIcon,
  VideoCameraIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const ProviderDetailModal = ({ provider, onClose, onAction }) => {
  if (!provider) return null;

  const getTypeInfo = (type) => {
    switch(type) {
      case 'institutional': 
        return { 
          icon: <BuildingOfficeIcon className="h-6 w-6 text-blue-600" />, 
          label: 'Institutional', 
          color: 'blue',
          description: 'Registered company with website'
        };
      case 'professional': 
        return { 
          icon: <UserIcon className="h-6 w-6 text-green-600" />, 
          label: 'Professional', 
          color: 'green',
          description: 'Freelancer or instructor'
        };
      case 'new_talent': 
        return { 
          icon: <RocketLaunchIcon className="h-6 w-6 text-yellow-600" />, 
          label: 'New Talent', 
          color: 'yellow',
          description: 'New user without established presence'
        };
      default: 
        return { 
          icon: <UserIcon className="h-6 w-6 text-gray-600" />, 
          label: 'Unknown', 
          color: 'gray',
          description: ''
        };
    }
  };

  const typeInfo = getTypeInfo(provider.type);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-lg">
              {typeInfo.icon}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{provider.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs px-2 py-1 rounded-full bg-${typeInfo.color}-100 text-${typeInfo.color}-800`}>
                  {typeInfo.label}
                </span>
                {provider.rating && (
                  <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 flex items-center gap-1">
                    <StarIcon className="h-3 w-3" />
                    Rating: {provider.rating}/5
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {/* Key Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Verification Card */}
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <h3 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                <CheckCircleIcon className="h-5 w-5" />
                Verification Status
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Trust Score:</span>
                  <span className="font-bold text-lg text-purple-700">{provider.trustScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">Level:</span>
                  <span className="text-sm font-medium text-gray-900">{provider.verificationLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">Last Verified:</span>
                  <span className="text-sm text-gray-900">
                    {new Date(provider.lastVerified).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Activity Card */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <ClockIcon className="h-5 w-5" />
                Activity
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">Opportunities Created:</span>
                  <span className="font-bold text-lg text-blue-700">{provider.opportunities}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">Registration Date:</span>
                  <span className="text-sm text-gray-900">
                    {new Date(provider.registrationDate).toLocaleDateString()}
                  </span>
                </div>
                {provider.rating && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Average Rating:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {provider.rating}/5 from users
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                <EnvelopeIcon className="h-5 w-5" />
                Contact Information
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <EnvelopeIcon className="h-4 w-4 text-gray-500 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-gray-700">Email</div>
                    <div className="text-sm text-gray-900">{provider.email}</div>
                  </div>
                </div>
                {provider.website && (
                  <div className="flex items-start gap-2">
                    <GlobeAltIcon className="h-4 w-4 text-gray-500 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-700">Website</div>
                      <a 
                        href={provider.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-purple-600 hover:text-purple-800"
                      >
                        {provider.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Data Sources Section - CLEARLY VISIBLE */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <DocumentTextIcon className="h-5 w-5" />
              Verification Data Sources
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Website Information */}
              {provider.website && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <GlobeAltIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Website Information</h4>
                      <div className="text-sm text-gray-600">Primary verification source</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Website URL</div>
                      <a 
                        href={provider.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                      >
                        {provider.website}
                      </a>
                    </div>
                    {provider.domainAge && (
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Domain History</div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-900">
                            Domain age: {provider.domainAge} year{provider.domainAge !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Social Profiles */}
              {provider.socialProfiles && provider.socialProfiles.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <UsersIcon className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Social Profiles</h4>
                      <div className="text-sm text-gray-600">Professional presence</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {provider.socialProfiles.map((profile, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded">
                        <div className="text-sm font-medium text-gray-900 mb-1">
                          {profile.platform.charAt(0).toUpperCase() + profile.platform.slice(1)}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <div className="text-gray-500">Followers</div>
                            <div className="font-medium">{profile.followers.toLocaleString()}</div>
                          </div>
                          {profile.accountAge && (
                            <div>
                              <div className="text-gray-500">Account Age</div>
                              <div className="font-medium">{profile.accountAge} years</div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Video Introduction */}
              {provider.videoIntro && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <VideoCameraIcon className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Video Introduction</h4>
                      <div className="text-sm text-gray-600">Personal authenticity check</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">
                    Provider has submitted a video introduction for verification.
                    This helps establish authenticity and build trust with users.
                  </div>
                </div>
              )}

              {/* Gemini Analysis */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 md:col-span-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <DocumentTextIcon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Gemini AI Analysis</h4>
                    <div className="text-sm text-gray-600">Trust score reasoning</div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 italic">{provider.geminiReason}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Management Actions</h3>
            <div className="flex flex-wrap gap-2">
              {provider.status === 'pending_review' ? (
                <>
                  <button
                    onClick={() => onAction('approve', provider.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
                  >
                    <CheckCircleIcon className="h-4 w-4" />
                    Approve Verification
                  </button>
                  <button
                    onClick={() => onAction('deny', provider.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
                  >
                    <XCircleIcon className="h-4 w-4" />
                    Deny Verification
                  </button>
                  <button
                    onClick={() => onAction('request_info', provider.id)}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                  >
                    Request Additional Information
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onAction('reverify', provider.id)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Re-verify with Gemini AI
                </button>
              )}
              
              <button
                onClick={() => onAction('view_history', provider.id)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                View Verification History
              </button>
              
              <button
                onClick={() => onAction('contact', provider.id)}
                className="px-4 py-2 border border-purple-300 text-purple-700 rounded-md hover:bg-purple-50"
              >
                Contact Provider
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetailModal;