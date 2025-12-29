import { 
  Home, Users, Briefcase, CreditCard, 
  FileText, AlertCircle, Settings, 
  BarChart3, Shield, MessageSquare,
  LogOut, ChevronLeft, ChevronRight,
  Clock
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Opportunities', href: '/admin/opportunities', icon: Briefcase },
  { name: 'Missions', href: '/admin/missions', icon: FileText },
   { name: 'Immediate Missions', href: '/admin/immediate-missions', icon: Clock },
  { name: 'Payments', href: '/admin/payments', icon: CreditCard },
  { name: 'Disputes', href: '/admin/disputes', icon: AlertCircle },
  { name: 'AI Monitoring', href: '/admin/ai-monitoring', icon: BarChart3 },
  { name: 'Communications', href: '/admin/communications', icon: MessageSquare },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        ${collapsed ? 'lg:w-20' : 'lg:w-64'}
      `}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
          {!collapsed && (
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">GOPHORA Admin</span>
            </div>
          )}
          
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center p-2 rounded-md hover:bg-gray-800"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
          
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-800"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => `
                group flex items-center px-3 py-2 text-sm font-medium rounded-md
                ${isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }
              `}
              end
            >
              <item.icon className="flex-shrink-0 w-6 h-6" />
              {!collapsed && <span className="ml-3">{item.name}</span>}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.name}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-gray-800 p-4">
          <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-800 hover:text-white">
            <LogOut className="w-5 h-5" />
            {!collapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;