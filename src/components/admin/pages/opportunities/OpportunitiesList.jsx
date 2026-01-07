import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBadge from '../../ui/StatusBadge'
import AddOpportunityModal from './AddOpportunityModal'
import { opportunitiesService } from '../../../../services/opportunities.service'

// Import Heroicons
import { 
  EyeIcon,
  PencilIcon,
  ArchiveBoxIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  StarIcon
} from '@heroicons/react/24/outline'

const initialOpportunities = [
  {
    id: 1,
    title: 'Frontend Intern',
    company: 'TechCorp',
    status: 'Pending',
    positionStatus: 'Open',
    applicants: 5,
    featured: true,
    tags: ['React', 'Tailwind'],
    comments: '',
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'StartupX',
    status: 'Approved',
    positionStatus: 'Paused',
    applicants: 2,
    featured: false,
    tags: ['Node.js', 'Express'],
    comments: 'Good candidate pool',
  },
]

export default function OpportunitiesList() {
  const navigate = useNavigate()
  const [opportunities, setOpportunities] = useState(initialOpportunities)
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})
  const [showAddModal, setShowAddModal] = useState(false)

  // Filters
  const [statusFilter, setStatusFilter] = useState('All')
  const [positionFilter, setPositionFilter] = useState('All')
  const [search, setSearch] = useState('')

  // -------- FILTER LOGIC --------
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(op => {
      const statusMatch =
        statusFilter === 'All' || op.status === statusFilter

      const positionMatch =
        positionFilter === 'All' || op.positionStatus === positionFilter

      const searchMatch =
        op.title.toLowerCase().includes(search.toLowerCase()) ||
        op.company.toLowerCase().includes(search.toLowerCase())

      return statusMatch && positionMatch && searchMatch
    })
  }, [opportunities, statusFilter, positionFilter, search])

  // -------- STATUS --------
  const updateStatus = async (id, status) => {
    await opportunitiesService.updateStatus(id, status)
    setOpportunities(prev =>
      prev.map(op =>
        op.id === id ? { ...op, status } : op
      )
    )
  }

  // -------- POSITION --------
  const updatePositionStatus = async (id, positionStatus) => {
    await opportunitiesService.update(id, { positionStatus })
    setOpportunities(prev =>
      prev.map(op =>
        op.id === id ? { ...op, positionStatus } : op
      )
    )
  }

  // -------- ARCHIVE --------
  const archiveOpportunity = async (id) => {
    await opportunitiesService.archive(id)
    setOpportunities(prev => prev.filter(op => op.id !== id))
  }

  // -------- DELETE (HARD) --------
  const deleteOpportunity = async (id) => {
    const confirm = window.confirm(
      'This will permanently delete this opportunity. Continue?'
    )
    if (!confirm) return

    await opportunitiesService.delete(id)
    setOpportunities(prev => prev.filter(op => op.id !== id))
  }

  // -------- EDIT --------
  const startEditing = (op) => {
    setEditingId(op.id)
    setEditData({
      ...op,
      tags: op.tags.join(', '),
    })
  }

  const saveEdit = async (id) => {
    const updated = {
      ...editData,
      tags: editData.tags.split(',').map(t => t.trim()),
    }

    await opportunitiesService.update(id, updated)

    setOpportunities(prev =>
      prev.map(op => (op.id === id ? updated : op))
    )
    setEditingId(null)
  }

  // -------- FEATURED --------
  const toggleFeatured = async (id) => {
    const target = opportunities.find(op => op.id === id)
    await opportunitiesService.update(id, {
      featured: !target.featured,
    })

    setOpportunities(prev =>
      prev.map(op =>
        op.id === id
          ? { ...op, featured: !op.featured }
          : op
      )
    )
  }

  // -------- ADD --------
  const handleAddOpportunity = async (op) => {
    const saved = await opportunitiesService.create(op)
    setOpportunities(prev => [saved, ...prev])
    setShowAddModal(false)
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-[#333333] shadow-sm">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#000000]">Opportunity Management</h2>
          <p className="text-[#333333] text-sm mt-1">Manage and track all opportunities in the system</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[#FF4F00] text-white rounded-lg hover:bg-[#E04600] transition-colors text-sm font-medium self-start sm:self-auto"
        >
          + Add Opportunity
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          placeholder="Search by title or company"
          className="flex-1 border border-[#333333] p-2 rounded text-[#000000] focus:outline-none focus:ring-1 focus:ring-[#FF4F00] text-sm"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div className="flex gap-2">
          <select
            className="flex-1 sm:w-auto border border-[#333333] p-2 rounded text-[#000000] focus:outline-none focus:ring-1 focus:ring-[#FF4F00] text-sm min-w-[100px]"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="All" className="text-[#000000]">All Status</option>
            <option value="Pending" className="text-[#000000]">Pending</option>
            <option value="Approved" className="text-[#000000]">Approved</option>
            <option value="Rejected" className="text-[#000000]">Rejected</option>
          </select>

          <select
            className="flex-1 sm:w-auto border border-[#333333] p-2 rounded text-[#000000] focus:outline-none focus:ring-1 focus:ring-[#FF4F00] text-sm min-w-[100px]"
            value={positionFilter}
            onChange={e => setPositionFilter(e.target.value)}
          >
            <option value="All" className="text-[#000000]">All Positions</option>
            <option value="Open" className="text-[#000000]">Open</option>
            <option value="Closed" className="text-[#000000]">Closed</option>
            <option value="Paused" className="text-[#000000]">Paused</option>
          </select>
        </div>
      </div>

      {/* EMPTY STATE */}
      {filteredOpportunities.length === 0 ? (
        <div className="p-8 text-center border border-[#333333] rounded-lg">
          <p className="text-lg text-[#000000] mb-2">No opportunities found</p>
          <p className="text-[#333333]">Try adjusting your filters or add a new opportunity</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#333333]">
          <table className="w-full min-w-[800px]">
            <thead className="bg-[#333333] text-white">
              <tr>
                <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Title</th>
                <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Company</th>
                <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Position</th>
                <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Applicants</th>
                <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Featured</th>
                <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredOpportunities.map(op => (
                <tr key={op.id} className="border-t border-[#333333] hover:bg-[#F5F5F5] transition-colors">
                  {/* Title */}
                  <td className="p-3 align-top">
                    <div className="font-medium text-[#000000] text-sm">{op.title}</div>
                    {op.tags && op.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {op.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="px-1.5 py-0.5 bg-[#333333] text-white text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>

                  {/* Company */}
                  <td className="p-3 align-top">
                    <div className="text-[#000000] text-sm">{op.company}</div>
                  </td>

                  {/* Status - WITH SPACE BETWEEN BADGE AND BUTTONS */}
                  <td className="p-3 align-top">
                    <div className="max-w-[120px]">
                      <div className="mb-2">
                        <StatusBadge status={op.status} />
                      </div>
                      {op.status === 'Pending' && (
                        <div className="flex gap-1">
                          <button
                            onClick={() => updateStatus(op.id, 'Approved')}
                            className="flex items-center justify-center gap-1 px-2 py-1 bg-[#FF4F00] text-white text-xs rounded hover:bg-[#E04600] transition-colors flex-1"
                            title="Approve"
                          >
                            <CheckCircleIcon className="h-3 w-3" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => updateStatus(op.id, 'Rejected')}
                            className="flex items-center justify-center gap-1 px-2 py-1 bg-[#333333] text-white text-xs rounded hover:bg-[#000000] transition-colors flex-1"
                            title="Reject"
                          >
                            <XCircleIcon className="h-3 w-3" />
                            <span>Reject</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Position Status */}
                  <td className="p-3 align-top">
                    <div className="w-20">
                      <select
                        value={op.positionStatus}
                        onChange={e => updatePositionStatus(op.id, e.target.value)}
                        className="w-full border border-[#333333] p-1.5 rounded text-[#000000] text-xs focus:outline-none focus:ring-1 focus:ring-[#FF4F00]"
                      >
                        <option value="Open" className="text-[#000000]">Open</option>
                        <option value="Closed" className="text-[#000000]">Closed</option>
                        <option value="Paused" className="text-[#000000]">Paused</option>
                      </select>
                    </div>
                  </td>

                  {/* Applicants */}
                  <td className="p-3 align-top">
                    <div className="text-[#000000] font-medium text-sm">{op.applicants}</div>
                  </td>

                  {/* Featured - ICON ONLY */}
                  <td className="p-3 align-top">
                    <button
                      onClick={() => toggleFeatured(op.id)}
                      className={`p-2 rounded transition-colors ${
                        op.featured 
                          ? 'bg-[#FFF0E6] text-[#FF4F00] border border-[#FF4F00]' 
                          : 'bg-[#333333] text-white hover:bg-[#000000]'
                      }`}
                      title={op.featured ? 'Remove from featured' : 'Mark as featured'}
                    >
                      <StarIcon className="h-4 w-4" />
                    </button>
                  </td>

                  {/* Actions - REMOVED NUMBER FROM VIEW BUTTON */}
                  <td className="p-3 align-top">
                    <div className="space-y-2 w-28">
                      {/* View Applications - WITHOUT NUMBER */}
                      <button
                        onClick={() => navigate(`/admin/opportunities/${op.id}/applications`)}
                        className="w-full px-2 py-1.5 bg-[#FF4F00] text-white text-xs rounded hover:bg-[#E04600] transition-colors flex items-center justify-center gap-1"
                        title="View Applications"
                      >
                        <EyeIcon className="h-3 w-3" />
                        <span>View Apps</span>
                      </button>
                      
                      {/* Action Buttons Grid */}
                      <div className="grid grid-cols-3 gap-1">
                        <button
                          onClick={() => startEditing(op)}
                          className="p-1.5 border border-[#333333] rounded text-[#000000] hover:bg-[#F5F5F5] transition-colors flex items-center justify-center"
                          title="Edit"
                        >
                          <PencilIcon className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => archiveOpportunity(op.id)}
                          className="p-1.5 bg-[#333333] text-white rounded hover:bg-[#000000] transition-colors flex items-center justify-center"
                          title="Archive"
                        >
                          <ArchiveBoxIcon className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => deleteOpportunity(op.id)}
                          className="p-1.5 bg-[#000000] text-white rounded hover:bg-[#333333] transition-colors flex items-center justify-center"
                          title="Delete"
                        >
                          <TrashIcon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stats Footer */}
      {filteredOpportunities.length > 0 && (
        <div className="mt-4 pt-4 border-t border-[#333333] text-xs text-[#333333]">
          <div className="flex justify-between items-center">
            <div>
              Showing {filteredOpportunities.length} of {opportunities.length} opportunities
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-[#333333] rounded-full"></span>
                <span>Approved: {opportunities.filter(o => o.status === 'Approved').length}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-[#FF4F00] rounded-full"></span>
                <span>Pending: {opportunities.filter(o => o.status === 'Pending').length}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-[#666666] rounded-full"></span>
                <span>Rejected: {opportunities.filter(o => o.status === 'Rejected').length}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <AddOpportunityModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddOpportunity}
      />
    </div>
  )
}