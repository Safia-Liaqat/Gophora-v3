import { useEffect, useState } from 'react'
import { explorersService } from '../../../../services/explorers.service'
import ExplorerProfileModal from './ExplorerProfileModal'

export default function ExplorersList() {
  const [explorers, setExplorers] = useState([])
  const [selectedExplorer, setSelectedExplorer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchExplorers = async () => {
      try {
        setLoading(true)
        const data = await explorersService.getAll()
        setExplorers(data || [])
      } catch (err) {
        console.error('Error fetching explorers:', err)
        setError('Failed to load explorers. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchExplorers()
  }, [])

  const toggleStatus = async (id) => {
    const explorer = explorers.find(e => e.id === id)
    const newStatus = explorer.status === 'Active' ? 'Blocked' : 'Active'

    try {
      await explorersService.updateStatus(id, newStatus)
      setExplorers(prev =>
        prev.map(e =>
          e.id === id ? { ...e, status: newStatus } : e
        )
      )
    } catch (err) {
      console.error('Failed to update status:', err)
    }
  }

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg border border-[#333333] shadow-sm">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF4F00]"></div>
            <p className="mt-3 text-[#333333]">Loading explorers...</p>
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

  if (explorers.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg border border-[#333333] shadow-sm">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-[#000000] mb-2">No Explorers Found</h2>
          <p className="text-[#333333] mb-6">There are no explorers registered yet.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-[#333333] shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#000000]">Explorers Management</h2>
          <p className="text-[#333333] text-sm mt-1">
            {explorers.length} explorer{explorers.length !== 1 ? 's' : ''} in the system
          </p>
        </div>
      </div>

      {/* Explorers Table */}
      <div className="overflow-x-auto rounded-lg border border-[#333333]">
        <table className="w-full min-w-[800px]">
          <thead className="bg-[#333333] text-white">
            <tr>
              <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Explorer</th>
              <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Contact</th>
              <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Skills</th>
              <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Applications</th>
              <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
              <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody>
            {explorers.map(explorer => (
              <tr key={explorer.id} className="border-t border-[#333333] hover:bg-[#F5F5F5] transition-colors">
                {/* Name */}
                <td className="p-3 align-top">
                  <div className="font-medium text-[#000000] text-sm">
                    {explorer.name}
                  </div>
                </td>

                {/* Email */}
                <td className="p-3 align-top">
                  <div className="text-[#000000] text-sm break-all">
                    {explorer.email}
                  </div>
                </td>

                {/* Skills */}
                <td className="p-3 align-top">
                  <div className="flex flex-wrap gap-1">
                    {explorer.skills?.slice(0, 3).map((skill, index) => (
                      <span 
                        key={index}
                        className="px-2 py-0.5 bg-[#333333] text-white text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {explorer.skills?.length > 3 && (
                      <span className="px-2 py-0.5 bg-[#FF4F00] text-white text-xs rounded-full">
                        +{explorer.skills.length - 3}
                      </span>
                    )}
                  </div>
                </td>

                {/* Applications */}
                <td className="p-3 align-top">
                  <div className="text-[#000000] font-medium text-sm">
                    {explorer.applicationsCount || 0}
                  </div>
                </td>

                {/* Status */}
                <td className="p-3 align-top">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    explorer.status === 'Active'
                      ? 'bg-[#333333] text-white' // Charcoal background → White text
                      : 'bg-[#FFF0E6] text-[#000000] border border-[#FF4F00]' // Light orange → Black text
                  }`}>
                    {explorer.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="p-3 align-top">
                  <div className="flex flex-col gap-1 w-24">
                    <button
                      onClick={() => setSelectedExplorer(explorer)}
                      className="px-1.5 py-1 border border-[#333333] rounded text-[#000000] text-xs hover:bg-[#F5F5F5] transition-colors truncate"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => toggleStatus(explorer.id)}
                      className={`px-1.5 py-1 rounded text-white text-xs transition-colors truncate ${
                        explorer.status === 'Active'
                          ? 'bg-[#333333] hover:bg-[#000000]' // Block button
                          : 'bg-[#FF4F00] hover:bg-[#E04600]' // Unblock button
                      }`}
                    >
                      {explorer.status === 'Active' ? 'Block' : 'Unblock'}
                    </button>
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
            Showing {explorers.length} explorer{explorers.length !== 1 ? 's' : ''}
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-[#333333] rounded-full"></span>
              <span>Active: {explorers.filter(e => e.status === 'Active').length}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-[#FF4F00] rounded-full"></span>
              <span>Blocked: {explorers.filter(e => e.status === 'Blocked').length}</span>
            </div>
          </div>
        </div>
      </div>

      <ExplorerProfileModal
        explorer={selectedExplorer}
        onClose={() => setSelectedExplorer(null)}
      />
    </div>
  )
}