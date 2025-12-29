import { useState, useEffect } from 'react';
import { Search, Filter, Download, Plus, RefreshCw, UserCheck, UserX } from 'lucide-react';
import DataTable from '../../components/admin/ui/DataTable';
import Badge from '../../components/admin/ui/Badge';

const Users = () => {
  const [activeTab, setActiveTab] = useState('seekers'); 
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

 const fetchUsers = async () => {
  try {
    setLoading(true);
    setError(null);
    
    // Use relative URL for deployed site
    const endpoint = '/user/all';
    
    console.log('Fetching from:', endpoint);
    
    const response = await fetch(endpoint, {
      headers: {
        'Accept': 'application/json',
      }
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Received data:', data);
    
    setUsers(Array.isArray(data) ? data : []);
    
  } catch (err) {
    console.error('Error fetching users:', err);
    setError(`Error: ${err.message}. Using demo data.`);
    
    // Use mock data
    const mockUsers = [
      {
        userId: 'demo_001',
        email: 'seeker@example.com',
        name: 'Demo Seeker',
        role: 'seeker',
        status: 'active',
        skills: ['React', 'JavaScript'],
        experience: 'Intermediate',
        createdAt: '2024-01-15T10:30:00Z'
      },
      {
        userId: 'demo_002',
        email: 'provider@example.com', 
        name: 'Demo Provider',
        role: 'provider',
        status: 'verified',
        company: 'Demo Corp',
        experience: 'Expert',
        createdAt: '2024-02-01T14:20:00Z'
      }
    ];
    setUsers(mockUsers);
  } finally {
    setLoading(false);
  }
};
  // Fetch on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on role and search
  const filteredUsers = users.filter(user => {
    // Filter by role (seeker/provider)
    const isSeeker = user.role === 'seeker'; // Changed from 'explorer'
    const isProvider = user.role === 'provider';
    
    let roleMatches = false;
    if (activeTab === 'seekers') roleMatches = isSeeker; // Changed from 'explorers'
    if (activeTab === 'providers') roleMatches = isProvider;
    if (activeTab === 'suspended') roleMatches = user.status === 'suspended';
    if (activeTab === 'verification-queue') roleMatches = user.status === 'pending';
    
    // Filter by search
    const searchMatches = !searchTerm || 
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return roleMatches && searchMatches;
  });

  // Format user data for table
  const tableData = filteredUsers.map(user => ({
    id: user.userId || user.id || user._id,
    name: user.name || user.full_name || user.username || 'N/A',
    email: user.email || 'N/A',
    level: user.level || (user.role === 'seeker' ? 'New Talent' : 'Level 1'), // Changed
    reputation: user.reputation || user.rating || 0,
    missions: user.completedMissions || user.totalMissions || 0,
    status: user.status || 'active',
    trustScore: user.trustScore || user.verificationScore || 0,
    joined: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A',
    // Keep original for actions
    _original: user
  }));

  // Seeker columns
  const seekerColumns = [
    { 
      key: 'name', 
      label: 'Name'
    },
    { 
      key: 'email', 
      label: 'Email'
    },
    { 
      key: 'level', 
      label: 'Level',
      render: (value) => (
        <Badge 
          variant={
            value === 'Professional' ? 'success' : 
            value === 'Intermediate' ? 'blue' : 'warning'
          }
          size="sm"
        >
          {value}
        </Badge>
      )
    },
    { 
      key: 'reputation', 
      label: 'Rating',
      render: (value) => <span className="font-medium">{value.toFixed(1)} ★</span>
    },
    { 
      key: 'missions', 
      label: 'Missions'
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value, row) => (
        <div className="flex items-center space-x-2">
          <Badge 
            variant={
              value === 'active' ? 'success' : 
              value === 'verified' ? 'success' :
              value === 'pending' ? 'warning' : 'danger'
            }
            size="sm"
          >
            {value}
          </Badge>
          <button
            onClick={() => console.log('Toggle status for:', row.id)}
            className="p-1 hover:bg-gray-100 rounded"
            title="Toggle Status"
          >
            {value === 'active' ? (
              <UserX className="w-4 h-4 text-gray-500" />
            ) : (
              <UserCheck className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>
      )
    },
    { 
      key: 'trustScore', 
      label: 'Trust Score',
      render: (value) => (
        <div className="flex items-center">
          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
            <div 
              className={`h-full rounded-full ${value >= 70 ? 'bg-green-500' : value >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${Math.min(value, 100)}%` }}
            ></div>
          </div>
          <span>{value}</span>
        </div>
      )
    },
  ];

  // Provider columns
  const providerColumns = [
    { 
      key: 'name', 
      label: 'Name'
    },
    { 
      key: 'email', 
      label: 'Email'
    },
    { 
      key: 'level', 
      label: 'Type',
      render: (value) => (
        <Badge 
          variant={
            value === 'Level 1' ? 'purple' : 
            value === 'Level 2' ? 'blue' : 'warning'
          }
          size="sm"
        >
          {value}
        </Badge>
      )
    },
    { 
      key: 'reputation', 
      label: 'Rating',
      render: (value) => <span className="font-medium">{value.toFixed(1)} ★</span>
    },
    { 
      key: 'missions', 
      label: 'Posted'
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value, row) => (
        <div className="flex items-center space-x-2">
          <Badge 
            variant={
              value === 'verified' ? 'success' :
              value === 'active' ? 'success' : 
              value === 'pending' ? 'warning' : 'danger'
            }
            size="sm"
          >
            {value}
          </Badge>
          <button
            onClick={() => console.log('Toggle status for:', row.id)}
            className="p-1 hover:bg-gray-100 rounded"
            title="Toggle Status"
          >
            {value === 'active' || value === 'verified' ? (
              <UserX className="w-4 h-4 text-gray-500" />
            ) : (
              <UserCheck className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>
      )
    },
    { 
      key: 'trustScore', 
      label: 'Trust Score',
      render: (value) => (
        <div className="flex items-center">
          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
            <div 
              className={`h-full rounded-full ${value >= 70 ? 'bg-green-500' : value >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${Math.min(value, 100)}%` }}
            ></div>
          </div>
          <span>{value}</span>
        </div>
      )
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600">
              {loading ? 'Loading...' : `Total ${activeTab}: ${filteredUsers.length}`}
            </p>
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <button 
              onClick={fetchUsers}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="w-5 h-5 mr-2" />
              Add User
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">Error: {error}</p>
          <button
            onClick={fetchUsers}
            className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Retry
          </button>
        </div>
      )}

      {/* Tabs - UPDATED with 'seekers' */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['seekers', 'providers', 'verification-queue', 'suspended'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                py-3 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              <span className="ml-2 bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">
                {filteredUsers.length}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Search */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <Filter className="w-5 h-5 mr-2" />
              Filter
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <Download className="w-5 h-5 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      {loading ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">No users found</p>
          <button
            onClick={fetchUsers}
            className="mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
          >
            Refresh Data
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {activeTab === 'seekers' && (
            <DataTable
              columns={seekerColumns}
              data={tableData}
              onView={(user) => console.log('View seeker:', user._original)}
              onEdit={(user) => console.log('Edit seeker:', user._original)}
              onDelete={(user) => {
                if (window.confirm(`Delete seeker ${user.name}?`)) {
                  console.log('Delete seeker:', user._original);
                }
              }}
              selectable={true}
            />
          )}
          
          {activeTab === 'providers' && (
            <DataTable
              columns={providerColumns}
              data={tableData}
              onView={(user) => console.log('View provider:', user._original)}
              onEdit={(user) => console.log('Edit provider:', user._original)}
              onDelete={(user) => {
                if (window.confirm(`Delete provider ${user.name}?`)) {
                  console.log('Delete provider:', user._original);
                }
              }}
              selectable={true}
            />
          )}
          
          {(activeTab === 'verification-queue' || activeTab === 'suspended') && (
            <div className="p-8 text-center">
              <p className="text-gray-500">
                {activeTab === 'verification-queue' 
                  ? 'Users pending verification will appear here' 
                  : 'Suspended users will appear here'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Users;