import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import StatusBadge from '../../ui/StatusBadge'
import ApplicationDetailsModal from './ApplicationDetailsModal' // Add this import
import { applicationsService } from '../../../../services/applications.service'

export default function ApplicationsList({ opportunityId }) {
  const { id } = useParams()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editNotes, setEditNotes] = useState('')
  const [selectedApp, setSelectedApp] = useState(null) // Add state for modal
  const navigate = useNavigate()

  // Fetch applications on mount
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true)
        const data = await applicationsService.getByOpportunity(opportunityId || id)
        setApplications(data || [])
      } catch (err) {
        console.error('Error fetching applications:', err)
        setError('Failed to load applications. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchApplications()
  }, [opportunityId, id])

  // ---------- Approve / Reject ----------
  const updateStatus = async (id, status) => {
    const allowed = ['Pending', 'Approved', 'Rejected']
    if (!allowed.includes(status)) return
    
    try {
      await applicationsService.updateStatus(id, status)
      setApplications(prev =>
        prev.map(app => (app.id === id ? { ...app, status } : app))
      )
    } catch (err) {
      console.error('Failed to update status:', err)
      // Update locally if service fails
      setApplications(prev =>
        prev.map(app => (app.id === id ? { ...app, status } : app))
      )
    }
  }

  // ---------- Edit Admin Notes ----------
  const startEditing = (app) => {
    setEditingId(app.id)
    setEditNotes(app.adminNotes || '')
  }

  const saveNotes = async (appId) => {
    try {
      await applicationsService.update(appId, { adminNotes: editNotes })
      setApplications(prev =>
        prev.map(app => 
          app.id === appId ? { ...app, adminNotes: editNotes } : app
        )
      )
      setEditingId(null)
    } catch (err) {
      console.error('Failed to update notes:', err)
      // Update locally if service fails
      setApplications(prev =>
        prev.map(app => 
          app.id === appId ? { ...app, adminNotes: editNotes } : app
        )
      )
      setEditingId(null)
    }
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditNotes('')
  }

  // ---------- Format Date ----------
  const formatDate = (dateString) => {
    if (!dateString) return '—'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  // ---------- Modal Handlers ----------
  const openModal = (app) => {
    setSelectedApp(app)
  }

  const closeModal = () => {
    setSelectedApp(null)
  }

  const refreshApplications = async () => {
    try {
      const data = await applicationsService.getByOpportunity(opportunityId || id)
      setApplications(data || [])
    } catch (err) {
      console.error('Failed to refresh applications:', err)
    }
  }

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg border border-[#333333] shadow-sm">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF4F00]"></div>
            <p className="mt-3 text-[#333333]">Loading applications...</p>
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

  if (applications.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg border border-[#333333] shadow-sm">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-[#000000] mb-2">No Applications Found</h2>
          <p className="text-[#333333] mb-6">There are no applications for this opportunity yet.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-[#333333] text-white rounded hover:bg-[#000000] transition-colors"
          >
            ← Back to Opportunities
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
          <h2 className="text-2xl font-bold text-[#000000]">Applications Management</h2>
          <p className="text-[#333333] text-sm mt-1">
            {applications.length} application{applications.length !== 1 ? 's' : ''} for this opportunity
          </p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-[#333333] text-white rounded hover:bg-[#000000] transition-colors text-sm font-medium self-start sm:self-auto"
        >
          ← Back to Opportunities
        </button>
      </div>

      {/* Applications Table */}
      <div className="overflow-x-auto rounded-lg border border-[#333333]">
        <table className="w-full min-w-[800px]">
          <thead className="bg-[#333333] text-white">
            <tr>
              <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Explorer</th>
              <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Contact</th>
              <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Applied</th>
              <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
              <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Skills</th>
              <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Admin Notes</th>
              <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map(app => (
              <tr key={app.id} className="border-t border-[#333333] hover:bg-[#F5F5F5] transition-colors">
                {/* Explorer Name */}
                <td className="p-3 align-top">
                  <div className="font-medium text-[#000000] text-sm">
                    {app.explorer?.name || 'Unknown Explorer'}
                  </div>
                </td>

                {/* Email */}
                <td className="p-3 align-top">
                  <div className="text-[#000000] text-sm break-all">
                    {app.explorer?.email || '—'}
                  </div>
                </td>

                {/* Applied Date */}
                <td className="p-3 align-top">
                  <div className="text-[#000000] text-sm">
                    {formatDate(app.appliedAt)}
                  </div>
                </td>

                {/* Status */}
                <td className="p-3 align-top">
                  <div className="space-y-2 max-w-[140px]">
                    <StatusBadge status={app.status} />
                    {app.status === 'Pending' && (
                      <div className="flex gap-1 mt-1">
                        <button
                          onClick={() => updateStatus(app.id, 'Approved')}
                          className="px-2 py-0.5 bg-[#FF4F00] text-white text-xs rounded hover:bg-[#E04600] transition-colors flex-1 min-w-0 truncate"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(app.id, 'Rejected')}
                          className="px-2 py-0.5 bg-[#333333] text-white text-xs rounded hover:bg-[#000000] transition-colors flex-1 min-w-0 truncate"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </td>

                {/* Skills */}
                <td className="p-3 align-top">
                  <div className="flex flex-wrap gap-1">
                    {app.explorer?.skills?.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-2 py-0.5 bg-[#333333] text-white text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    )) || '—'}
                  </div>
                </td>

                {/* Admin Notes */}
                <td className="p-3 align-top">
                  {editingId === app.id ? (
                    <div className="space-y-2">
                      <textarea
                        className="w-full border border-[#333333] p-2 rounded text-[#000000] text-sm focus:outline-none focus:ring-1 focus:ring-[#FF4F00] min-h-[80px]"
                        value={editNotes}
                        onChange={e => setEditNotes(e.target.value)}
                        placeholder="Add admin notes..."
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveNotes(app.id)}
                          className="px-3 py-1 bg-[#FF4F00] text-white text-xs rounded hover:bg-[#E04600] transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="px-3 py-1 border border-[#333333] text-[#000000] text-xs rounded hover:bg-[#F5F5F5] transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-[#000000] text-sm mb-2">{app.adminNotes || 'No notes'}</div>
                      <button
                        onClick={() => startEditing(app)}
                        className="text-xs text-[#FF4F00] hover:text-[#E04600] transition-colors underline"
                      >
                        Edit Notes
                      </button>
                    </div>
                  )}
                </td>

                {/* Actions */}
                <td className="p-3 align-top">
                  <div className="flex flex-col gap-1 w-28">
                    {/* View Details Button - Opens Modal */}
                    <button
                      onClick={() => openModal(app)}
                      className="px-1.5 py-1 bg-[#333333] text-white text-xs rounded hover:bg-[#000000] transition-colors truncate"
                    >
                      View Details
                    </button>
                    
                    <button
                      onClick={() => window.location.href = `mailto:${app.explorer?.email}`}
                      disabled={!app.explorer?.email}
                      className={`px-1.5 py-1 border border-[#333333] rounded text-xs hover:bg-[#F5F5F5] transition-colors truncate ${
                        !app.explorer?.email ? 'opacity-50 cursor-not-allowed' : 'text-[#000000]'
                      }`}
                    >
                      Email Explorer
                    </button>

                    <button
                      onClick={() => navigate(`/admin/explorers/${app.explorer?.id || app.id}`)}
                      className="px-1.5 py-1 bg-[#FF4F00] text-white text-xs rounded hover:bg-[#E04600] transition-colors truncate"
                    >
                      View Profile
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
            Showing {applications.length} application{applications.length !== 1 ? 's' : ''}
          </div>
          <div className="flex gap-4">
            {['Pending', 'Approved', 'Rejected'].map(status => {
              const count = applications.filter(app => app.status === status).length
              if (count === 0) return null
              
              const color = {
                'Pending': '#FF4F00',
                'Approved': '#333333',
                'Rejected': '#000000'
              }[status]
              
              return (
                <div key={status} className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></span>
                  <span>{status}: {count}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Application Details Modal */}
      {selectedApp && (
        <ApplicationDetailsModal
          application={selectedApp}
          onClose={closeModal}
          onUpdate={refreshApplications}
        />
      )}
    </div>
  )
}