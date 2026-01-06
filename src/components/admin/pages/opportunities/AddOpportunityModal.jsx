import { useState } from "react"

export default function AddOpportunityModal({ show, onClose, onSave }) {
  const [newOpportunity, setNewOpportunity] = useState({
    title: '',
    company: '',
    status: 'Pending',
    positionStatus: 'Open',
    applicants: 0,
    featured: false,
    tags: '',
    comments: '',
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  if (!show) return null

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case 'title':
        if (!value.trim()) return 'Title is required'
        if (value.length < 3) return 'Title must be at least 3 characters'
        if (value.length > 100) return 'Title cannot exceed 100 characters'
        return ''
      
      case 'company':
        if (!value.trim()) return 'Company is required'
        if (value.length < 2) return 'Company must be at least 2 characters'
        if (value.length > 50) return 'Company cannot exceed 50 characters'
        return ''
      
      case 'tags':
        if (value) {
          const tagArray = value.split(',').map(t => t.trim())
          const invalidTags = tagArray.filter(tag => tag.length > 20)
          if (invalidTags.length > 0) return 'Each tag cannot exceed 20 characters'
          if (tagArray.length > 10) return 'Maximum 10 tags allowed'
        }
        return ''
      
      case 'comments':
        if (value.length > 500) return 'Comments cannot exceed 500 characters'
        return ''
      
      default:
        return ''
    }
  }

  const validateForm = () => {
    const newErrors = {}
    const fields = ['title', 'company', 'tags', 'comments']
    
    fields.forEach(field => {
      const error = validateField(field, newOpportunity[field])
      if (error) newErrors[field] = error
    })
    
    return newErrors
  }

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const error = validateField(field, newOpportunity[field])
    setErrors(prev => ({ ...prev, [field]: error }))
  }

  const handleChange = (field, value) => {
    setNewOpportunity(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      const error = validateField(field, value)
      setErrors(prev => ({ ...prev, [field]: error }))
    }
  }

  const handleSave = () => {
    // Mark all fields as touched
    const allTouched = {
      title: true,
      company: true,
      tags: true,
      comments: true
    }
    setTouched(allTouched)
    
    // Validate all fields
    const formErrors = validateForm()
    setErrors(formErrors)
    
    // Check if form is valid
    if (Object.keys(formErrors).length === 0) {
      const op = {
        ...newOpportunity,
        id: Date.now(),
        tags: newOpportunity.tags ? newOpportunity.tags.split(',').map(t => t.trim()).filter(t => t) : [],
      }
      onSave(op)
      setNewOpportunity({
        title: '',
        company: '',
        status: 'Pending',
        positionStatus: 'Open',
        applicants: 0,
        featured: false,
        tags: '',
        comments: '',
      })
      setErrors({})
      setTouched({})
    }
  }

  const isFieldInvalid = (field) => touched[field] && errors[field]

  return (
    <div className="fixed inset-0 bg-[#000000]/50 flex items-center justify-center z-50">
      <div className="bg-[#FFFFFF] p-6 rounded-lg w-full max-w-lg relative border border-[#333333] shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white pb-4">
          <h3 className="text-xl font-bold text-[#000000]">Add New Opportunity</h3>
          <button
            onClick={onClose}
            className="text-[#333333] hover:text-[#000000] text-2xl"
          >
            ×
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Title Field */}
          <div>
            <label className="block text-[#000000] text-sm font-medium mb-1">
              Title <span className="text-[#FF4F00]">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Frontend Developer"
              className={`w-full border p-3 rounded text-[#000000] focus:outline-none focus:ring-2 ${
                isFieldInvalid('title') 
                  ? 'border-[#FF4F00] focus:ring-[#FF4F00]' 
                  : 'border-[#333333] focus:ring-[#FF4F00]'
              }`}
              value={newOpportunity.title}
              onChange={e => handleChange('title', e.target.value)}
              onBlur={() => handleBlur('title')}
            />
            {isFieldInvalid('title') && (
              <p className="mt-1 text-sm text-[#FF4F00] flex items-center gap-1">
                <span>⚠</span> {errors.title}
              </p>
            )}
          </div>

          {/* Company Field */}
          <div>
            <label className="block text-[#000000] text-sm font-medium mb-1">
              Company <span className="text-[#FF4F00]">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., TechCorp Inc."
              className={`w-full border p-3 rounded text-[#000000] focus:outline-none focus:ring-2 ${
                isFieldInvalid('company') 
                  ? 'border-[#FF4F00] focus:ring-[#FF4F00]' 
                  : 'border-[#333333] focus:ring-[#FF4F00]'
              }`}
              value={newOpportunity.company}
              onChange={e => handleChange('company', e.target.value)}
              onBlur={() => handleBlur('company')}
            />
            {isFieldInvalid('company') && (
              <p className="mt-1 text-sm text-[#FF4F00] flex items-center gap-1">
                <span>⚠</span> {errors.company}
              </p>
            )}
          </div>

          {/* Status Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#000000] text-sm font-medium mb-1">Status</label>
              <select
                className="w-full border border-[#333333] p-3 rounded text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#FF4F00]"
                value={newOpportunity.status}
                onChange={e => handleChange('status', e.target.value)}
              >
                <option value="Pending" className="text-[#000000]">Pending</option>
                <option value="Approved" className="text-[#000000]">Approved</option>
                <option value="Rejected" className="text-[#000000]">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-[#000000] text-sm font-medium mb-1">Position Status</label>
              <select
                className="w-full border border-[#333333] p-3 rounded text-[#000000] focus:outline-none focus:ring-2 focus:ring-[#FF4F00]"
                value={newOpportunity.positionStatus}
                onChange={e => handleChange('positionStatus', e.target.value)}
              >
                <option value="Open" className="text-[#000000]">Open</option>
                <option value="Closed" className="text-[#000000]">Closed</option>
                <option value="Paused" className="text-[#000000]">Paused</option>
              </select>
            </div>
          </div>

          {/* Tags Field */}
          <div>
            <label className="block text-[#000000] text-sm font-medium mb-1">
              Tags <span className="text-[#333333]">(comma separated)</span>
            </label>
            <input
              type="text"
              placeholder="e.g., React, JavaScript, Tailwind"
              className={`w-full border p-3 rounded text-[#000000] focus:outline-none focus:ring-2 ${
                isFieldInvalid('tags') 
                  ? 'border-[#FF4F00] focus:ring-[#FF4F00]' 
                  : 'border-[#333333] focus:ring-[#FF4F00]'
              }`}
              value={newOpportunity.tags}
              onChange={e => handleChange('tags', e.target.value)}
              onBlur={() => handleBlur('tags')}
            />
            {isFieldInvalid('tags') && (
              <p className="mt-1 text-sm text-[#FF4F00] flex items-center gap-1">
                <span>⚠</span> {errors.tags}
              </p>
            )}
            <p className="mt-1 text-xs text-[#333333]">
              Enter up to 10 tags, each up to 20 characters
            </p>
          </div>

          {/* Comments Field */}
          <div>
            <label className="block text-[#000000] text-sm font-medium mb-1">
              Comments <span className="text-[#333333] text-xs">(optional)</span>
            </label>
            <textarea
              placeholder="Add any additional comments or notes..."
              className={`w-full border p-3 rounded text-[#000000] focus:outline-none focus:ring-2 ${
                isFieldInvalid('comments') 
                  ? 'border-[#FF4F00] focus:ring-[#FF4F00]' 
                  : 'border-[#333333] focus:ring-[#FF4F00]'
              } min-h-[80px]`}
              value={newOpportunity.comments}
              onChange={e => handleChange('comments', e.target.value)}
              onBlur={() => handleBlur('comments')}
            />
            <div className="flex justify-between items-center mt-1">
              {isFieldInvalid('comments') ? (
                <p className="text-sm text-[#FF4F00] flex items-center gap-1">
                  <span>⚠</span> {errors.comments}
                </p>
              ) : (
                <div></div> // Spacer to maintain layout
              )}
              <p className="text-xs text-[#333333]">
                {newOpportunity.comments.length}/500 characters
              </p>
            </div>
          </div>

          {/* Featured Checkbox */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={newOpportunity.featured}
                onChange={e => handleChange('featured', e.target.checked)}
                className="w-4 h-4 text-[#FF4F00] focus:ring-[#FF4F00]"
              />
              <span className="text-[#000000]">Feature this opportunity</span>
            </label>
          </div>
        </div>

        {/* Form Validation Summary */}
        {Object.keys(errors).length > 0 && Object.keys(touched).length > 0 && (
          <div className="mt-4 p-3 bg-[#FFF0E6] border border-[#FF4F00] rounded">
            <p className="text-[#000000] text-sm font-medium mb-1 flex items-center gap-1">
              <span>⚠</span> Please fix the following errors:
            </p>
            <ul className="text-sm text-[#000000] list-disc pl-5 space-y-1">
              {Object.entries(errors)
                .filter(([field, error]) => error && touched[field])
                .map(([field, error]) => (
                  <li key={field}>{error}</li>
                ))}
            </ul>
          </div>
        )}

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-[#333333] sticky bottom-0 bg-white">
          <button
            className="px-5 py-2.5 border border-[#333333] rounded-lg text-[#000000] hover:bg-[#F5F5F5] transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2.5 bg-[#FF4F00] rounded-lg text-[#FFFFFF] hover:bg-[#E04600] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSave}
            disabled={Object.keys(errors).some(field => errors[field])}
          >
            Save Opportunity
          </button>
        </div>
      </div>
    </div>
  )
}