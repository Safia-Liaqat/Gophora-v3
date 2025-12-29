import { 
  Users, Briefcase, DollarSign, AlertCircle,Clock, 
  CheckCircle
} from 'lucide-react';

import StatsCard from '../../components/admin/ui/StatsCard'
import RecentActivity from '../../components/admin/sections/RecentActivity';
import QuickActions from '../../components/admin/sections/QuickActions';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '1,254',
      change: 12.5,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Missions',
      value: '48',
      change: 8.2,
      icon: Briefcase,
      color: 'green'
    },
    {
      title: 'Revenue (7d)',
      value: '$2,850',
      change: 23.1,
      icon: DollarSign,
      color: 'purple'
    },
    {
      title: 'Pending Disputes',
      value: '3',
      change: -25,
      icon: AlertCircle,
      color: 'red'
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <QuickActions />
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </div>

      {/* Charts Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">User Growth</h3>
          <div className="h-64 flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">Chart will be implemented here</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Trends</h3>
          <div className="h-64 flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">Chart will be implemented here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;