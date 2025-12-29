import { 
  UserPlus, 
  Briefcase, 
  DollarSign, 
  MessageSquare,
  Shield,
  Settings
} from 'lucide-react';

const QuickActions = () => {
  const actions = [
    { icon: UserPlus, label: 'Add User', color: 'blue', iconColor: 'text-blue-600', bgColor: 'bg-blue-100' },
    { icon: Briefcase, label: 'Create Mission', color: 'green', iconColor: 'text-green-600', bgColor: 'bg-green-100' },
    { icon: DollarSign, label: 'Process Payment', color: 'purple', iconColor: 'text-purple-600', bgColor: 'bg-purple-100' },
    { icon: MessageSquare, label: 'Review Dispute', color: 'red', iconColor: 'text-red-600', bgColor: 'bg-red-100' },
    { icon: Shield, label: 'Verify Provider', color: 'orange', iconColor: 'text-orange-600', bgColor: 'bg-orange-100' },
    { icon: Settings, label: 'System Settings', color: 'gray', iconColor: 'text-gray-600', bgColor: 'bg-gray-100' },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              <div className={`p-3 rounded-full mb-2 ${action.bgColor}`}>
                <action.icon className={`w-6 h-6 ${action.iconColor}`} />
              </div>
              <span className="text-sm font-medium text-gray-700">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;