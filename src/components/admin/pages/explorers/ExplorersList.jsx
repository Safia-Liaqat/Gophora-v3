import { useEffect, useState } from 'react'
import { explorersService } from '../../../../services/explorers.service'
import ExplorerProfileModal from './ExplorerProfileModal'

// Mock API method if it doesn't exist
const mockUpdateBlockStatus = async (id, is_blocked) => {
  console.log(`Mock: Updating block status for ${id} to ${is_blocked}`)
  return { success: true, id, is_blocked }
}

export default function ExplorersList() {
  const [explorers, setExplorers] = useState([])
  const [selectedExplorer, setSelectedExplorer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newExplorer, setNewExplorer] = useState({
    name: '',
    email: '',
    verification_status: 'Unverified'
  })
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    fetchExplorers()
  }, [])

  const fetchExplorers = async () => {
    try {
      setLoading(true)
      const data = await explorersService.getAll()
      // Ensure is_blocked field exists for all explorers
      const explorersWithBlockStatus = (data || []).map(explorer => ({
        ...explorer,
        is_blocked: explorer.is_blocked || false
      }))
      setExplorers(explorersWithBlockStatus)
    } catch (err) {
      console.error('Error fetching explorers:', err)
      setError('Failed to load explorers. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const updateVerificationStatus = async (id, newStatus) => {
    try {
      // Check if method exists, use mock if not
      if (explorersService.updateVerificationStatus) {
        await explorersService.updateVerificationStatus(id, newStatus)
      } else {
        console.log(`Mock: Updating verification status for ${id} to ${newStatus}`)
      }
      
      setExplorers(prev =>
        prev.map(e =>
          e.id === id ? { ...e, verification_status: newStatus } : e
        )
      )
    } catch (err) {
      console.error('Failed to update verification status:', err)
    }
  }

  const toggleBlockStatus = async (id) => {
    // Find the current explorer
    const explorer = explorers.find(e => e.id === id)
    if (!explorer) return
    
    // Calculate new blocked status
    const newBlockedStatus = !explorer.is_blocked
    
    try {
      // Try to call API if method exists, otherwise use mock
      if (explorersService.updateBlockStatus) {
        await explorersService.updateBlockStatus(id, newBlockedStatus)
      } else {
        // Use mock function
        await mockUpdateBlockStatus(id, newBlockedStatus)
      }
      
      // Update local state
      setExplorers(prev =>
        prev.map(e =>
          e.id === id ? { ...e, is_blocked: newBlockedStatus } : e
        )
      )
    } catch (err) {
      console.error('Failed to update block status:', err)
      // Show error message
      alert('Failed to update block status. Please try again.')
    }
  }

  const handleAddExplorer = async () => {
    if (!newExplorer.name || !newExplorer.email) {
      alert('Name and email are required')
      return
    }

    try {
      setAdding(true)
      // Check if method exists, use mock if not
      let createdExplorer
      if (explorersService.createExplorer) {
        createdExplorer = await explorersService.createExplorer({
          ...newExplorer,
          activation_readiness_score: 0.1,
          trust_score: 0.1,
          digital_consistency_score: 0,
          activations_count: 0,
          completed_activations: 0,
          is_blocked: false
        })
      } else {
        // Mock response
        console.log('Mock: Creating explorer', newExplorer)
        createdExplorer = {
          id: Date.now().toString(),
          ...newExplorer,
          activation_readiness_score: 0.1,
          trust_score: 0.1,
          digital_consistency_score: 0,
          activations_count: 0,
          completed_activations: 0,
          is_blocked: false,
          created_by_admin: true,
          created_at: new Date().toISOString()
        }
      }
      
      setExplorers(prev => [createdExplorer, ...prev])
      setNewExplorer({ name: '', email: '', verification_status: 'Unverified' })
      setShowAddModal(false)
    } catch (err) {
      console.error('Failed to create explorer:', err)
      alert('Failed to create explorer. Please try again.')
    } finally {
      setAdding(false)
    }
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

  const countConnectedSignals = (explorer) => {
    let count = 0
    if (explorer.social_accounts?.length > 0) count += explorer.social_accounts.length
    if (explorer.wallet_address) count += 1
    if (explorer.video_signal) count += 1
    return count
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
        
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[#FF4F00] text-white rounded hover:bg-[#E04600] transition-colors text-sm font-medium flex items-center gap-2"
        >
          <span>+</span>
          <span>Add Explorer</span>
        </button>
      </div>

      {/* Explorers Table */}
      {explorers.length === 0 ? (
        <div className="text-center py-12 border border-[#333333] rounded-lg">
          <h2 className="text-xl font-bold text-[#000000] mb-2">No Explorers Found</h2>
          <p className="text-[#333333] mb-4">There are no explorers registered yet.</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[#FF4F00] text-white rounded hover:bg-[#E04600] transition-colors text-sm font-medium"
          >
            Add First Explorer
          </button>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border border-[#333333]">
            <table className="w-full min-w-[900px]">
              <thead className="bg-[#333333] text-white">
                <tr>
                  <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Explorer</th>
                  <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                  <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Signals</th>
                  <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Activation Score</th>
                  <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Activations</th>
                  <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Trust Level</th>
                  <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>

              <tbody>
                {explorers.map(explorer => (
                  <tr 
                    key={explorer.id} 
                    className={`border-t border-[#333333] hover:bg-[#F5F5F5] transition-colors ${
                      explorer.is_blocked ? 'opacity-70' : ''
                    }`}
                  >
                    {/* Name & Email */}
                    <td className="p-3 align-top">
                      <div className="font-medium text-[#000000] text-sm">
                        {explorer.name || 'Anonymous Explorer'}
                      </div>
                      <div className="text-[#333333] text-xs break-all mt-1">
                        {explorer.email}
                      </div>
                      {explorer.created_by_admin && (
                        <span className="inline-block mt-1 px-1.5 py-0.5 bg-[#FFF0E6] text-[#000000] text-xs rounded border border-[#FF4F00]">
                          Admin Created
                        </span>
                      )}
                    </td>

                    {/* Status & Verification */}
                    <td className="p-3 align-top">
                      <div className="space-y-1">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(explorer.verification_status, explorer.is_blocked)}`}>
                          {explorer.is_blocked ? 'Blocked' : (explorer.verification_status || 'Unverified')}
                        </span>
                        {explorer.is_blocked && (
                          <div className="text-xs text-[#FF4F00]">
                            Access restricted
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Connected Signals */}
                    <td className="p-3 align-top">
                      <div className="flex flex-wrap gap-1">
                        {explorer.social_accounts?.slice(0, 2).map((account, index) => (
                          <span 
                            key={index}
                            className="px-2 py-0.5 bg-[#333333] text-white text-xs rounded-full"
                          >
                            {account.provider}
                          </span>
                        ))}
                        {explorer.wallet_address && (
                          <span className="px-2 py-0.5 bg-[#FF4F00] text-white text-xs rounded-full">
                            Wallet
                          </span>
                        )}
                        {explorer.video_signal && (
                          <span className="px-2 py-0.5 bg-[#333333] text-white text-xs rounded-full">
                            Video
                          </span>
                        )}
                        {countConnectedSignals(explorer) > 3 && (
                          <span className="px-2 py-0.5 bg-[#333333] text-white text-xs rounded-full">
                            +{countConnectedSignals(explorer) - 3}
                          </span>
                        )}
                      </div>
                      <div className="text-[#333333] text-xs mt-1">
                        {countConnectedSignals(explorer)} connected
                      </div>
                    </td>

                    {/* Activation Readiness Score */}
                    <td className="p-3 align-top">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-[#F5F5F5] rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              explorer.is_blocked ? 'bg-[#333333]' : 'bg-[#FF4F00]'
                            }`}
                            style={{ width: `${Math.min(100, (explorer.activation_readiness_score || 0) * 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-[#000000] font-medium text-sm">
                          {Math.round((explorer.activation_readiness_score || 0) * 100)}%
                        </span>
                      </div>
                    </td>

                    {/* Activations */}
                    <td className="p-3 align-top">
                      <div className="text-[#000000] font-medium text-sm">
                        {explorer.activations_count || 0}
                      </div>
                      <div className="text-[#333333] text-xs">
                        {explorer.completed_activations || 0} completed
                      </div>
                    </td>

                    {/* Trust Level */}
                    <td className="p-3 align-top">
                      <div className={`px-2 py-1 rounded text-xs font-medium text-center ${
                        explorer.is_blocked ? 'bg-[#FFF0E6] text-[#000000] border border-[#FF4F00] opacity-70' :
                        (explorer.trust_score || 0) >= 0.8 ? 'bg-[#333333] text-white' :
                        (explorer.trust_score || 0) >= 0.5 ? 'bg-[#FFF0E6] text-[#000000] border border-[#FF4F00]' :
                        'bg-[#FFF0E6] text-[#000000] border border-[#FF4F00] opacity-70'
                      }`}>
                        {explorer.trust_score ? `T${Math.round(explorer.trust_score * 10)}` : 'N/A'}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-3 align-top">
                      <div className="flex flex-col gap-1 w-28">
                        <button
                          onClick={() => setSelectedExplorer(explorer)}
                          className="px-1.5 py-1 border border-[#333333] rounded text-[#000000] text-xs hover:bg-[#F5F5F5] transition-colors truncate"
                        >
                          View Profile
                        </button>
                        
                        {!explorer.is_blocked && explorer.verification_status !== 'Fully Verified' && (
                          <button
                            onClick={() => updateVerificationStatus(explorer.id, 'Fully Verified')}
                            className="px-1.5 py-1 bg-[#333333] rounded text-white text-xs hover:bg-[#000000] transition-colors truncate"
                          >
                            Verify
                          </button>
                        )}
                        
                        {!explorer.is_blocked && explorer.verification_status === 'Fully Verified' && (
                          <button
                            onClick={() => updateVerificationStatus(explorer.id, 'Human Verification')}
                            className="px-1.5 py-1 bg-[#FFF0E6] border border-[#FF4F00] rounded text-[#000000] text-xs hover:bg-[#FFE6D6] transition-colors truncate"
                          >
                            Re-verify
                          </button>
                        )}

                        <button
                          onClick={() => toggleBlockStatus(explorer.id)}
                          className={`px-1.5 py-1 rounded text-white text-xs transition-colors truncate ${
                            explorer.is_blocked
                              ? 'bg-[#FF4F00] hover:bg-[#E04600]'
                              : 'bg-[#333333] hover:bg-[#000000]'
                          }`}
                        >
                          {explorer.is_blocked ? 'Unblock' : 'Block'}
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
                  <span>Active: {explorers.filter(e => !e.is_blocked).length}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#FF4F00] rounded-full"></span>
                  <span>Blocked: {explorers.filter(e => e.is_blocked).length}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#E6F0FF] rounded-full"></span>
                  <span>Verified: {explorers.filter(e => e.verification_status === 'Fully Verified').length}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Add Explorer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#000000]/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-md p-6 rounded-lg border border-[#333333] shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#000000]">Add New Explorer</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-2xl text-[#333333] hover:text-[#000000]"
              >
                ×
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">
                  Explorer Name *
                </label>
                <input
                  type="text"
                  value={newExplorer.name}
                  onChange={(e) => setNewExplorer({...newExplorer, name: e.target.value})}
                  className="w-full px-3 py-2 border border-[#333333] rounded text-[#000000] focus:outline-none focus:ring-1 focus:ring-[#FF4F00]"
                  placeholder="Enter explorer name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={newExplorer.email}
                  onChange={(e) => setNewExplorer({...newExplorer, email: e.target.value})}
                  className="w-full px-3 py-2 border border-[#333333] rounded text-[#000000] focus:outline-none focus:ring-1 focus:ring-[#FF4F00]"
                  placeholder="explorer@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333333] mb-1">
                  Initial Verification Status
                </label>
                <select
                  value={newExplorer.verification_status}
                  onChange={(e) => setNewExplorer({...newExplorer, verification_status: e.target.value})}
                  className="w-full px-3 py-2 border border-[#333333] rounded text-[#000000] focus:outline-none focus:ring-1 focus:ring-[#FF4F00]"
                >
                  <option value="Unverified">Unverified</option>
                  <option value="AI Verification">AI Verification</option>
                  <option value="Human Verification">Human Verification</option>
                  <option value="Fully Verified">Fully Verified</option>
                </select>
                <p className="text-xs text-[#333333] mt-1">
                  Note: Explorers created by admins can bypass normal onboarding flows
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-[#333333]">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-[#333333] rounded text-[#000000] hover:bg-[#F5F5F5] transition-colors text-sm"
                disabled={adding}
              >
                Cancel
              </button>
              <button
                onClick={handleAddExplorer}
                disabled={adding || !newExplorer.name || !newExplorer.email}
                className="px-4 py-2 bg-[#FF4F00] text-white rounded hover:bg-[#E04600] transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {adding ? (
                  <>
                    <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  'Create Explorer'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <ExplorerProfileModal
        explorer={selectedExplorer}
        onClose={() => setSelectedExplorer(null)}
      />
    </div>
  )
}