import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ title, value, change, icon: Icon, color = 'blue' }) => {
  const colorConfig = {
    blue: { bg: 'bg-blue-100', iconColor: 'text-blue-600' },
    green: { bg: 'bg-green-100', iconColor: 'text-green-600' },
    purple: { bg: 'bg-purple-100', iconColor: 'text-purple-600' },
    orange: { bg: 'bg-orange-100', iconColor: 'text-orange-600' },
    red: { bg: 'bg-red-100', iconColor: 'text-red-600' },
  };

  const config = colorConfig[color] || colorConfig.blue;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium" style={{ color: '#000000' }}>{title}</p>
          <p className="mt-2 text-3xl font-semibold" style={{ color: '#000000' }}>{value}</p>
          <div className="flex items-center mt-2">
            {change >= 0 ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? '+' : ''}{change}%
            </span>
            <span className="text-sm ml-2" style={{ color: '#000000' }}>from last month</span>
          </div>
        </div>
        <div className={`p-3 rounded-full ${config.bg}`}>
          <Icon className={`w-6 h-6 ${config.iconColor}`} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;