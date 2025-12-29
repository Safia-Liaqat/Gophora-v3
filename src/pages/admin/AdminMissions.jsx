import { useState } from 'react';
import { Plus, Calendar, DollarSign, Clock, Briefcase, AlertCircle } from 'lucide-react';
import DataTable from '../../components/admin/ui/DataTable';
import Badge from '../../components/admin/ui/Badge';

const AdminMissions = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const missionsData = [
    {
      id: 'M-001',
      title: 'Website Redesign',
      explorer: 'John Doe',
      provider: 'Acme Corp',
      budget: '$2,500',
      status: 'in_progress',
      deadline: '2024-02-15',
      trustScore: 88,
      category: 'Design',
    },
    {
      id: 'M-002',
      title: 'Smart Contract Audit',
      explorer: 'Sarah Smith',
      provider: 'Tech Giants Inc',
      budget: '$5,000',
      status: 'pending',
      deadline: '2024-02-20',
      trustScore: 92,
      category: 'Blockchain',
    },
    // Add more data...
  ];

  const columns = [
    { key: 'id', label: 'Mission ID' },
    { key: 'title', label: 'Title' },
    { key: 'explorer', label: 'Explorer' },
    { key: 'provider', label: 'Provider' },
    { 
      key: 'budget', 
      label: 'Budget',
      render: (value) => (
        <div className="flex items-center">
          <DollarSign className="w-4 h-4 text-green-600 mr-1" />
          <span className="font-semibold">{value}</span>
        </div>
      )
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value) => {
        const statusConfig = {
          pending: { color: 'warning', label: 'Pending' },
          in_progress: { color: 'primary', label: 'In Progress' },
          review: { color: 'purple', label: 'Under Review' },
          completed: { color: 'success', label: 'Completed' },
          disputed: { color: 'danger', label: 'Disputed' },
        };
        
        const config = statusConfig[value] || { color: 'default', label: value };
        return <Badge variant={config.color} size="sm">{config.label}</Badge>;
      }
    },
    { 
      key: 'deadline', 
      label: 'Deadline',
      render: (value) => (
        <div className="flex items-center">
          <Calendar className="w-4 h-4 text-gray-500 mr-1" />
          <span>{value}</span>
        </div>
      )
    },
    { key: 'category', label: 'Category' },
  ];

  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mission Management</h1>
            <p className="text-gray-600">Manage and monitor all missions</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Mission
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Missions</p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-bold">$48.5K</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Avg. Duration</p>
              <p className="text-2xl font-bold">7.2 days</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Disputes</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Missions Table */}
      <DataTable
        columns={columns}
        data={missionsData}
        onView={(mission) => console.log('View', mission)}
        onEdit={(mission) => console.log('Edit', mission)}
        onDelete={(mission) => console.log('Delete', mission)}
        selectable={true}
      />

      {/* Create Mission Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Create New Mission</h3>
            </div>
            
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mission Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter mission title"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget (USDC)
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deadline
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the mission requirements..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Required Skills
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      React
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Node.js
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      Solidity
                    </span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add skills (comma separated)"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assign to Explorer (Optional)
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select explorer</option>
                    <option value="1">John Doe</option>
                    <option value="2">Sarah Smith</option>
                  </select>
                </div>
              </form>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Create Mission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMissions;