import { useState, useEffect } from 'react';
import { Plus, Calendar, DollarSign, Clock, Edit, Trash2, CheckCircle, XCircle, Play, X } from 'lucide-react';
import DataTable from '../../components/admin/ui/DataTable';
import Badge from '../../components/admin/ui/Badge';

const ImmediateMissions = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'development',
    skills: [],
    budget: 0,
    deadline: '',
    targetSeeker: '',
    activationType: 'manual',
    activationDelay: 24,
    status: 'draft'
  });

  // Fetch missions
  const fetchMissions = async () => {
    try {
      setLoading(true);
      const mockMissions = [
        {
          id: 'M-001',
          title: 'Website Redesign',
          description: 'Redesign company website with modern UI',
          category: 'design',
          skills: ['React', 'Tailwind', 'Figma'],
          budget: 2500,
          deadline: '2024-03-30',
          status: 'active',
          assignedTo: 'John Doe',
          createdAt: '2024-03-20',
          activatedAt: '2024-03-21'
        },
        {
          id: 'M-002',
          title: 'Mobile App Development',
          description: 'Build a React Native mobile app',
          category: 'development',
          skills: ['React Native', 'Firebase', 'TypeScript'],
          budget: 5000,
          deadline: '2024-04-15',
          status: 'draft',
          assignedTo: '',
          createdAt: '2024-03-25',
          activatedAt: null
        },
      ];
      setMissions(mockMissions);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'development',
      skills: [],
      budget: 0,
      deadline: '',
      targetSeeker: '',
      activationType: 'manual',
      activationDelay: 24,
      status: 'draft'
    });
  };

  const createMission = async () => {
    const newMission = {
      id: `M-${Date.now()}`,
      ...formData,
      createdAt: new Date().toISOString(),
      createdBy: 'admin'
    };
    
    setMissions([...missions, newMission]);
    setShowCreateModal(false);
    resetForm();
  };

  const updateMission = async (id, updates) => {
    setMissions(missions.map(mission => 
      mission.id === id ? { ...mission, ...updates } : mission
    ));
    setShowEditModal(false);
  };

  const deleteMission = async (id) => {
    if (window.confirm('Delete this mission?')) {
      setMissions(missions.filter(mission => mission.id !== id));
    }
  };

  const activateMission = async (id) => {
    const mission = missions.find(m => m.id === id);
    const activatedMission = {
      ...mission,
      status: 'active',
      activatedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };
    
    updateMission(id, activatedMission);
  };

  const columns = [
    { 
      key: 'id', 
      label: 'ID',
      render: (value) => <span style={{color: '#000'}}>{value}</span>
    },
    { 
      key: 'title', 
      label: 'Title',
      render: (value) => <span style={{color: '#000', fontWeight: 500}}>{value}</span>
    },
    { 
      key: 'category', 
      label: 'Category',
      render: (value) => (
        <Badge variant={
          value === 'design' ? 'purple' :
          value === 'development' ? 'blue' :
          value === 'writing' ? 'green' : 'default'
        }>
          <span style={{color: '#000'}}>{value}</span>
        </Badge>
      )
    },
    { 
      key: 'budget', 
      label: 'Budget',
      render: (value) => <span style={{color: '#000', fontWeight: 600}}>${value}</span>
    },
    { 
      key: 'deadline', 
      label: 'Deadline',
      render: (value) => <span style={{color: '#000'}}>{value}</span>
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => (
        <Badge variant={
          value === 'active' ? 'success' :
          value === 'draft' ? 'warning' :
          value === 'completed' ? 'primary' : 'default'
        }>
          <span style={{color: '#000'}}>{value}</span>
        </Badge>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value, row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => activateMission(row.id)}
            disabled={row.status === 'active'}
            className="p-1 text-green-600 hover:text-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Activate Mission"
          >
            <Play className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setSelectedMission(row);
              setFormData(row);
              setShowEditModal(true);
            }}
            className="p-1 text-blue-600 hover:text-blue-800"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => deleteMission(row.id)}
            className="p-1 text-red-600 hover:text-red-800"
            title="Delete"
          >
            <Trash2 className="w-4 h-5" />
          </button>
        </div>
      )
    }
  ];

  // Fixed Modal Component
  const MissionModal = ({ isOpen, onClose, title, onSubmit, formData, setFormData, isEdit = false }) => {
    if (!isOpen) return null;

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
      <div className="fixed inset-0 z-[1000]">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        />
        
        {/* Modal Content */}
        <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between z-10">
              <h3 style={{color: '#000', fontWeight: 600}} className="text-lg">{title}</h3>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full"
                style={{color: '#000'}}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label style={{color: '#000', fontWeight: 500}} className="block text-sm mb-2">
                    Mission Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    style={{color: '#000'}}
                    placeholder="e.g., Website Redesign"
                  />
                </div>

                <div>
                  <label style={{color: '#000', fontWeight: 500}} className="block text-sm mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    style={{color: '#000'}}
                    placeholder="Describe the mission requirements..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={{color: '#000', fontWeight: 500}} className="block text-sm mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      style={{color: '#000'}}
                    >
                      <option value="development" style={{color: '#000'}}>Development</option>
                      <option value="design" style={{color: '#000'}}>Design</option>
                      <option value="writing" style={{color: '#000'}}>Writing</option>
                      <option value="marketing" style={{color: '#000'}}>Marketing</option>
                      <option value="blockchain" style={{color: '#000'}}>Blockchain</option>
                    </select>
                  </div>

                  <div>
                    <label style={{color: '#000', fontWeight: 500}} className="block text-sm mb-2">
                      Budget (USDC) *
                    </label>
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      style={{color: '#000'}}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={{color: '#000', fontWeight: 500}} className="block text-sm mb-2">
                      Deadline *
                    </label>
                    <input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      style={{color: '#000'}}
                    />
                  </div>

                  <div>
                    <label style={{color: '#000', fontWeight: 500}} className="block text-sm mb-2">
                      Activation Delay (hours)
                    </label>
                    <input
                      type="number"
                      name="activationDelay"
                      value={formData.activationDelay}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      style={{color: '#000'}}
                      placeholder="24"
                    />
                  </div>
                </div>

                <div>
                  <label style={{color: '#000', fontWeight: 500}} className="block text-sm mb-2">
                    Required Skills
                  </label>
                  <input
                    type="text"
                    value={formData.skills?.join(', ') || ''}
                    onChange={(e) => {
                      const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                      setFormData(prev => ({ ...prev, skills }));
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    style={{color: '#000'}}
                    placeholder="React, Node.js, Solidity (comma separated)"
                  />
                </div>

                <div>
                  <label style={{color: '#000', fontWeight: 500}} className="block text-sm mb-2">
                    Assign to Specific Seeker (Optional)
                  </label>
                  <input
                    type="text"
                    name="targetSeeker"
                    value={formData.targetSeeker}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    style={{color: '#000'}}
                    placeholder="Enter seeker email or ID"
                  />
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                style={{color: '#000'}}
              >
                Cancel
              </button>
              <button
                onClick={onSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isEdit ? 'Update' : 'Create'} Mission
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{backgroundColor: '#ffffff', minHeight: '100vh'}}>
      <div className="mb-8" style={{padding: '0 1rem'}}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 style={{color: '#000', fontWeight: 700, fontSize: '1.5rem'}}>Immediate Missions</h1>
            <p style={{color: '#000', marginTop: '0.25rem'}}>Create and manage urgent missions for seekers</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Mission
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" style={{padding: '0 1rem'}}>
        <div className="p-6 rounded-lg shadow border border-gray-200" style={{backgroundColor: '#ffffff'}}>
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p style={{color: '#000', fontWeight: 500, fontSize: '0.875rem'}}>Active Missions</p>
              <p style={{color: '#000', fontWeight: 700, fontSize: '1.5rem'}}>{missions.filter(m => m.status === 'active').length}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 rounded-lg shadow border border-gray-200" style={{backgroundColor: '#ffffff'}}>
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p style={{color: '#000', fontWeight: 500, fontSize: '0.875rem'}}>Total Budget</p>
              <p style={{color: '#000', fontWeight: 700, fontSize: '1.5rem'}}>
                ${missions.reduce((sum, m) => sum + (m.budget || 0), 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-6 rounded-lg shadow border border-gray-200" style={{backgroundColor: '#ffffff'}}>
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p style={{color: '#000', fontWeight: 500, fontSize: '0.875rem'}}>Expiring Soon</p>
              <p style={{color: '#000', fontWeight: 700, fontSize: '1.5rem'}}>3</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 rounded-lg shadow border border-gray-200" style={{backgroundColor: '#ffffff'}}>
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p style={{color: '#000', fontWeight: 500, fontSize: '0.875rem'}}>Completed</p>
              <p style={{color: '#000', fontWeight: 700, fontSize: '1.5rem'}}>{missions.filter(m => m.status === 'completed').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Missions Table */}
      <div style={{padding: '0 1rem'}}>
        <div className="rounded-lg shadow border border-gray-200" style={{backgroundColor: '#ffffff'}}>
          <DataTable
            columns={columns}
            data={missions}
            loading={loading}
          />
        </div>
      </div>

      {/* Create Mission Modal */}
      <MissionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Immediate Mission"
        onSubmit={createMission}
        formData={formData}
        setFormData={setFormData}
      />

      {/* Edit Mission Modal */}
      {selectedMission && (
        <MissionModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          title="Edit Mission"
          onSubmit={() => updateMission(selectedMission.id, formData)}
          formData={formData}
          setFormData={setFormData}
          isEdit={true}
        />
      )}
    </div>
  );
};

export default ImmediateMissions;