import { useState } from 'react'
import { PencilIcon, TrashIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const initialCategories = [
  { 
    id: 1, 
    name: 'Web Development', 
    active: true,
    subcategories: [
      { id: 11, name: 'Frontend', active: true },
      { id: 12, name: 'Backend', active: true },
      { id: 13, name: 'Full Stack', active: false },
    ]
  },
  { 
    id: 2, 
    name: 'Data Science', 
    active: true,
    subcategories: [
      { id: 21, name: 'Machine Learning', active: true },
      { id: 22, name: 'Data Analysis', active: true },
    ]
  },
  { 
    id: 3, 
    name: 'Design', 
    active: false,
    subcategories: []
  },
]

export default function CategoriesSettings() {
  const [categories, setCategories] = useState(initialCategories)
  const [newCategory, setNewCategory] = useState('')
  const [newSubcategory, setNewSubcategory] = useState({ categoryId: '', name: '' })
  const [expandedCategory, setExpandedCategory] = useState(null)
  const [editingItem, setEditingItem] = useState({ type: null, id: null, parentId: null })
  const [editName, setEditName] = useState('')

  // Add new category
  const addCategory = () => {
    if (!newCategory.trim()) return

    setCategories(prev => [
      ...prev,
      { 
        id: Date.now(), 
        name: newCategory, 
        active: true,
        subcategories: [] 
      },
    ])
    setNewCategory('')
  }

  // Add new subcategory
  const addSubcategory = () => {
    if (!newSubcategory.categoryId || !newSubcategory.name.trim()) return

    setCategories(prev =>
      prev.map(cat =>
        cat.id === parseInt(newSubcategory.categoryId)
          ? {
              ...cat,
              subcategories: [
                ...cat.subcategories,
                { id: Date.now(), name: newSubcategory.name, active: true }
              ]
            }
          : cat
      )
    )
    setNewSubcategory({ categoryId: '', name: '' })
  }

  // Toggle category status
  const toggleCategory = id => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === id ? { ...cat, active: !cat.active } : cat
      )
    )
  }

  // Toggle subcategory status
  const toggleSubcategory = (categoryId, subcategoryId) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              subcategories: cat.subcategories.map(sub =>
                sub.id === subcategoryId 
                  ? { ...sub, active: !sub.active }
                  : sub
              )
            }
          : cat
      )
    )
  }

  // Toggle category expansion
  const toggleExpanded = (id) => {
    setExpandedCategory(expandedCategory === id ? null : id)
  }

  // Start editing
  const startEditing = (type, id, parentId, currentName) => {
    setEditingItem({ type, id, parentId })
    setEditName(currentName)
  }

  // Save edit
  const saveEdit = () => {
    if (!editName.trim()) return

    setCategories(prev =>
      prev.map(cat => {
        if (editingItem.type === 'category' && cat.id === editingItem.id) {
          return { ...cat, name: editName }
        }
        if (editingItem.type === 'subcategory' && cat.id === editingItem.parentId) {
          return {
            ...cat,
            subcategories: cat.subcategories.map(sub =>
              sub.id === editingItem.id ? { ...sub, name: editName } : sub
            )
          }
        }
        return cat
      })
    )
    setEditingItem({ type: null, id: null, parentId: null })
    setEditName('')
  }

  // Cancel edit
  const cancelEdit = () => {
    setEditingItem({ type: null, id: null, parentId: null })
    setEditName('')
  }

  // Remove category
  const removeCategory = (id) => {
    if (!window.confirm('Remove this category and all its subcategories?')) return
    setCategories(prev => prev.filter(cat => cat.id !== id))
  }

  // Remove subcategory
  const removeSubcategory = (categoryId, subcategoryId) => {
    if (!window.confirm('Remove this subcategory?')) return
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              subcategories: cat.subcategories.filter(sub => sub.id !== subcategoryId)
            }
          : cat
      )
    )
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#000000]">Categories Management</h2>
        <p className="text-[#333333] text-sm mt-1">Manage categories and subcategories for opportunities</p>
      </div>

      {/* Add Category Section */}
      <div className="bg-[#F5F5F5] border border-[#333333] rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-[#000000] mb-3">Add New Category</h3>
        <div className="flex gap-2">
          <input
            className="border border-[#333333] p-2 flex-1 rounded text-[#000000] bg-white"
            placeholder="Enter category name"
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCategory()}
          />
          <button
            onClick={addCategory}
            className="px-4 py-2 bg-[#FF4F00] text-white rounded hover:bg-[#E04600] transition-colors"
          >
            Add Category
          </button>
        </div>
      </div>

      {/* Add Subcategory Section */}
      <div className="bg-[#F5F5F5] border border-[#333333] rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-[#000000] mb-3">Add New Subcategory</h3>
        <div className="flex flex-col sm:flex-row gap-3 mb-3">
          <select
            className="border border-[#333333] p-2 rounded text-[#000000] bg-white flex-1"
            value={newSubcategory.categoryId}
            onChange={e => setNewSubcategory({...newSubcategory, categoryId: e.target.value})}
          >
            <option value="">Select Category</option>
            {categories.filter(cat => cat.active).map(cat => (
              <option key={cat.id} value={cat.id} className="text-[#000000]">
                {cat.name}
              </option>
            ))}
          </select>
          <input
            className="border border-[#333333] p-2 rounded text-[#000000] bg-white flex-1"
            placeholder="Enter subcategory name"
            value={newSubcategory.name}
            onChange={e => setNewSubcategory({...newSubcategory, name: e.target.value})}
            onKeyPress={(e) => e.key === 'Enter' && addSubcategory()}
          />
        </div>
        <button
          onClick={addSubcategory}
          disabled={!newSubcategory.categoryId || !newSubcategory.name.trim()}
          className={`px-4 py-2 rounded transition-colors ${
            newSubcategory.categoryId && newSubcategory.name.trim()
              ? 'bg-[#333333] text-white hover:bg-[#000000]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Add Subcategory
        </button>
      </div>

      {/* Categories Table */}
      <div className="overflow-x-auto rounded-lg border border-[#333333]">
        <table className="w-full min-w-[800px]">
          <thead className="bg-[#333333] text-white">
            <tr>
              <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Category / Subcategory</th>
              <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
              <th className="p-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map(cat => (
              <>
                {/* Category Row */}
                <tr key={cat.id} className="border-t border-[#333333] bg-white hover:bg-[#F5F5F5] transition-colors">
                  <td className="p-3 align-top">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleExpanded(cat.id)}
                        className="text-[#333333] hover:text-[#000000]"
                      >
                        {expandedCategory === cat.id ? (
                          <ChevronDownIcon className="h-4 w-4" />
                        ) : (
                          <ChevronRightIcon className="h-4 w-4" />
                        )}
                      </button>
                      {editingItem.type === 'category' && editingItem.id === cat.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            className="border border-[#333333] p-1.5 rounded text-[#000000] text-sm w-48"
                            value={editName}
                            onChange={e => setEditName(e.target.value)}
                            autoFocus
                          />
                          <button
                            onClick={saveEdit}
                            className="px-2 py-1 bg-[#333333] text-white text-xs rounded hover:bg-[#000000] transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="px-2 py-1 border border-[#333333] text-[#000000] text-xs rounded hover:bg-[#F5F5F5] transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="font-medium text-[#000000] text-sm">
                          {cat.name}
                          <div className="text-xs text-[#333333] font-normal">
                            {cat.subcategories.length} subcategor{cat.subcategories.length !== 1 ? 'ies' : 'y'}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="p-3 align-top">
                    <button
                      onClick={() => toggleCategory(cat.id)}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                        cat.active
                          ? 'bg-[#FF4F00] text-white hover:bg-[#E04600]'
                          : 'bg-[#333333] text-white hover:bg-[#000000]'
                      }`}
                    >
                      {cat.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>

                  <td className="p-3 align-top">
                    <div className="flex gap-1">
                      <button
                        onClick={() => startEditing('category', cat.id, null, cat.name)}
                        className="p-1.5 border border-[#333333] rounded text-[#000000] hover:bg-[#F5F5F5] transition-colors"
                        title="Edit"
                      >
                        <PencilIcon className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => removeCategory(cat.id)}
                        className="p-1.5 bg-[#000000] text-white rounded hover:bg-[#333333] transition-colors"
                        title="Remove"
                      >
                        <TrashIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Subcategory Rows (when expanded) */}
                {expandedCategory === cat.id && cat.subcategories.map(sub => (
                  <tr key={sub.id} className="border-t border-[#333333] bg-[#FAFAFA] hover:bg-[#F0F0F0]">
                    <td className="p-3 align-top pl-12">
                      {editingItem.type === 'subcategory' && editingItem.id === sub.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            className="border border-[#333333] p-1.5 rounded text-[#000000] text-sm w-48"
                            value={editName}
                            onChange={e => setEditName(e.target.value)}
                            autoFocus
                          />
                          <button
                            onClick={saveEdit}
                            className="px-2 py-1 bg-[#333333] text-white text-xs rounded hover:bg-[#000000] transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="px-2 py-1 border border-[#333333] text-[#000000] text-xs rounded hover:bg-[#F5F5F5] transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="text-[#000000] text-sm">
                          <span className="text-[#333333] mr-2">↳</span>
                          {sub.name}
                        </div>
                      )}
                    </td>

                    <td className="p-3 align-top">
                      <button
                        onClick={() => toggleSubcategory(cat.id, sub.id)}
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                          sub.active
                            ? 'bg-[#FF4F00] text-white hover:bg-[#E04600]'
                            : 'bg-[#333333] text-white hover:bg-[#000000]'
                        }`}
                      >
                        {sub.active ? 'Active' : 'Inactive'}
                      </button>
                    </td>

                    <td className="p-3 align-top">
                      <div className="flex gap-1">
                        <button
                          onClick={() => startEditing('subcategory', sub.id, cat.id, sub.name)}
                          className="p-1.5 border border-[#333333] rounded text-[#000000] hover:bg-[#F5F5F5] transition-colors"
                          title="Edit"
                        >
                          <PencilIcon className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => removeSubcategory(cat.id, sub.id)}
                          className="p-1.5 bg-[#000000] text-white rounded hover:bg-[#333333] transition-colors"
                          title="Remove"
                        >
                          <TrashIcon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {categories.length === 0 && (
        <div className="p-8 text-center border border-[#333333] rounded-lg mt-4">
          <p className="text-lg text-[#000000] mb-2">No categories found</p>
          <p className="text-[#333333]">Add your first category above</p>
        </div>
      )}

      {/* Stats Footer */}
      {categories.length > 0 && (
        <div className="mt-4 pt-4 border-t border-[#333333] text-xs text-[#333333]">
          <div className="flex justify-between items-center">
            <div>
              {categories.length} categor{categories.length !== 1 ? 'ies' : 'y'} • 
              {' '}{categories.reduce((sum, cat) => sum + cat.subcategories.length, 0)} total subcategories
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-[#FF4F00] rounded-full"></span>
                <span>
                  Active: {categories.filter(c => c.active).length} cat,{' '}
                  {categories.reduce((sum, cat) => sum + cat.subcategories.filter(s => s.active).length, 0)} sub
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-[#333333] rounded-full"></span>
                <span>
                  Inactive: {categories.filter(c => !c.active).length} cat,{' '}
                  {categories.reduce((sum, cat) => sum + cat.subcategories.filter(s => !s.active).length, 0)} sub
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}