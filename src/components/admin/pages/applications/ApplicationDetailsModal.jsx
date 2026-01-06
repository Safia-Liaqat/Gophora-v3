import { useState } from 'react'
import { applicationsService } from '../../../../services/applications.service'

export default function ApplicationDetailsModal({ application, onClose, onUpdate }) {
  const [notes, setNotes] = useState(application.adminNotes)

  const updateStatus = async (status) => {
    await applicationsService.updateStatus(application.id, status)
    onUpdate()
    onClose() // Close modal after status update
  }

  const saveNotes = async () => {
    await applicationsService.updateNotes(application.id, notes)
    onUpdate()
    // Don't close modal when saving notes - user might want to continue editing
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-xl p-6 rounded border border-[#333333]">

        <div className="flex justify-between mb-4">
          <h3 className="text-xl font-bold">Application Details</h3>
          <button onClick={onClose} className="text-xl">×</button>
        </div>

        <div className="space-y-3">
          <p><strong>Name:</strong> {application.explorer.name}</p>
          <p><strong>Email:</strong> {application.explorer.email}</p>
          <p><strong>Skills:</strong> {application.explorer.skills.join(', ')}</p>
          <p><strong>Applied On:</strong> {application.appliedAt}</p>

          <div>
            <strong>Cover Letter</strong>
            <p className="border p-3 mt-1">{application.coverLetter}</p>
          </div>

          <div>
            <strong>Admin Notes</strong>
            <textarea
              className="w-full border p-2 mt-1"
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
            <button
              onClick={saveNotes}
              className="mt-2 px-3 py-1 bg-[#FF4F00] text-white rounded"
            >
              Save Notes
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={() => updateStatus('Shortlisted')}
            className="px-3 py-1 bg-[#FF4F00] text-white rounded"
          >
            Shortlist
          </button>
          <button
            onClick={() => updateStatus('Rejected')}
            className="px-3 py-1 bg-[#333333] text-white rounded"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  )
}