export default function ExplorerProfileModal({ explorer, onClose }) {
  if (!explorer) return null

  return (
    <div className="fixed inset-0 bg-[#000000]/50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg border border-[#333333] shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-[#000000]">Explorer Profile</h3>
          <button 
            onClick={onClose} 
            className="text-2xl text-[#333333] hover:text-[#000000]"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-[#333333]">Name</p>
            <p className="text-[#000000] font-medium">{explorer.name}</p>
          </div>

          <div>
            <p className="text-sm text-[#333333]">Email</p>
            <p className="text-[#000000] break-all">{explorer.email}</p>
          </div>

          <div>
            <p className="text-sm text-[#333333]">Education</p>
            <p className="text-[#000000]">{explorer.education || 'Not specified'}</p>
          </div>

          <div>
            <p className="text-sm text-[#333333]">Experience</p>
            <p className="text-[#000000]">{explorer.experience || 'Not specified'}</p>
          </div>

          <div>
            <p className="text-sm text-[#333333] mb-1">Skills</p>
            <div className="flex flex-wrap gap-1">
              {explorer.skills?.map((skill, index) => (
                <span 
                  key={index}
                  className="px-2 py-0.5 bg-[#333333] text-white text-xs rounded-full"
                >
                  {skill}
                </span>
              )) || 'No skills listed'}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-[#333333]">Applications</p>
              <p className="text-[#000000] font-medium">{explorer.applicationsCount || 0}</p>
            </div>
            <div>
              <p className="text-sm text-[#333333]">Status</p>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                explorer.status === 'Active'
                  ? 'bg-[#333333] text-white'
                  : 'bg-[#FFF0E6] text-[#000000] border border-[#FF4F00]'
              }`}>
                {explorer.status}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6 pt-6 border-t border-[#333333]">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#333333] rounded text-[#000000] hover:bg-[#F5F5F5] transition-colors text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}