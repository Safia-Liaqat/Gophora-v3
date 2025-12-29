import { Users, Briefcase, CheckCircle, BarChart3, AlertCircle } from 'lucide-react';

const RecentActivity = ({ activities = [] }) => {
  const defaultActivities = [
    { id: 1, user: 'John Doe', action: 'applied for mission', time: '5 min ago', type: 'application' },
    { id: 2, user: 'Acme Corp', action: 'posted new opportunity', time: '1 hour ago', type: 'opportunity' },
    { id: 3, user: 'Sarah Smith', action: 'completed mission #1234', time: '2 hours ago', type: 'completion' },
    { id: 4, user: 'AI System', action: 'scraped 234 new opportunities', time: '3 hours ago', type: 'ai' },
    { id: 5, user: 'Mike Johnson', action: 'raised dispute #567', time: '5 hours ago', type: 'dispute' },
  ];

  const data = activities.length > 0 ? activities : defaultActivities;

  const getIcon = (type) => {
    switch(type) {
      case 'application': return <Users className="w-5 h-5 text-blue-500" />;
      case 'opportunity': return <Briefcase className="w-5 h-5 text-green-500" />;
      case 'completion': return <CheckCircle className="w-5 h-5 text-purple-500" />;
      case 'ai': return <BarChart3 className="w-5 h-5 text-orange-500" />;
      case 'dispute': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <Briefcase className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {data.map((activity) => (
          <div key={activity.id} className="px-6 py-4 hover:bg-gray-50">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {getIcon(activity.type)}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">
                  {activity.user} <span className="font-normal text-gray-600">{activity.action}</span>
                </p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;