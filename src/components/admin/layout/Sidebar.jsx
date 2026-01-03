import { 
  Home, 
  Users, 
  Briefcase, 
  CreditCard, 
  FileText, 
  AlertCircle, 
  Settings, 
  BarChart3, 
  Shield, 
  MessageSquare,
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  UserCog,
  UserCheck,
  Compass,
  ChevronDown,
  ChevronUp,
  Building,
  UserCircle,
  Star,
  Circle
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    admin: true,
    providers: true,
    explorers: true
  });
  const location = useLocation();

  // Main navigation items
  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/admin', 
      icon: Home,
      section: 'admin'
    },
    { 
      name: 'AI Monitoring', 
      href: '/admin/ai-monitoring', 
      icon: BarChart3,
      section: 'admin'
    },
    { 
      name: 'Communications', 
      href: '/admin/communications', 
      icon: MessageSquare,
      section: 'admin'
    },
    { 
      name: 'Settings', 
      href: '/admin/settings', 
      icon: Settings,
      section: 'admin'
    },
  ];

  // Provider management items
  const providerNavigation = [
    { 
      name: 'All Providers', 
      href: '/admin/provider', 
      icon: Users,
      description: 'View and manage all providers',
      count: 156
    },
    { 
      name: 'Pending Verification', 
      href: '/admin/providers/review', 
      icon: UserCheck,
      description: 'Review pending applications',
      count: 8,
      badgeColor: 'bg-yellow-500'
    },
    { 
      name: 'Opportunities', 
      href: '/admin/opportunities', 
      icon: Briefcase,
      description: 'Manage opportunities created',
      count: 42
    },
    { 
      name: 'Missions', 
      href: '/admin/missions', 
      icon: FileText,
      description: 'View provider missions',
      count: 89
    },
    { 
      name: 'Immediate Missions', 
      href: '/admin/immediate-missions', 
      icon: Clock,
      description: 'Quick action missions',
      count: 12
    },
    { 
      name: 'Disputes', 
      href: '/admin/disputes', 
      icon: AlertCircle,
      description: 'Handle provider disputes',
      count: 3,
      badgeColor: 'bg-red-500'
    },
  ];

  // Explorer (Seeker) management items
  const explorerNavigation = [
    { 
      name: 'All Explorers', 
      href: '/admin/explorers', 
      icon: Compass,
      description: 'View all seekers/explorers',
      count: 342
    },
    { 
      name: 'Active Explorers', 
      href: '/admin/explorers/active', 
      icon: Star,
      description: 'Currently active seekers',
      count: 156
    },
    { 
      name: 'Mission History', 
      href: '/admin/explorers/missions', 
      icon: FileText,
      description: 'Explorer mission history',
      count: 1247
    },
    { 
      name: 'Payments', 
      href: '/admin/payments', 
      icon: CreditCard,
      description: 'Explorer payment history',
      count: 89
    },
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const isActivePath = (path) => {
    return location.pathname.startsWith(path);
  };

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
        fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 text-white transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        ${collapsed ? 'lg:w-20' : 'lg:w-72'}
        shadow-2xl
      `}>
        {/* Logo/Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-purple-700">
          {!collapsed && (
            <div className="flex items-center">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-300 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-purple-900"></div>
              </div>
              <div className="ml-3">
                <span className="text-xl font-bold bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent">
                  GOPHORA
                </span>
                <span className="block text-xs text-purple-300 font-medium">Space Admin Panel</span>
              </div>
            </div>
          )}
          
          {collapsed && (
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-300 rounded-xl flex items-center justify-center shadow-lg mx-auto">
              <Shield className="h-6 w-6 text-white" />
            </div>
          )}
          
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center p-2 rounded-lg hover:bg-purple-700/50 transition-colors border border-purple-600"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
          
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-purple-700"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto max-h-[calc(100vh-8rem)]">
          {/* Admin Section */}
          <div className={`${collapsed ? 'px-2' : 'px-1'}`}>
            <div 
              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 
                ${expandedSections.admin ? 'bg-purple-700/30 border-l-4 border-purple-400' : 'hover:bg-purple-700/20'}`} 
              onClick={() => toggleSection('admin')}
            >
              <div className="flex items-center">
                <div className="p-2 bg-purple-600/30 rounded-lg">
                  <UserCog className="w-5 h-5 text-purple-300" />
                </div>
                {!collapsed && <span className="ml-3 font-semibold text-purple-100">Admin Panel</span>}
              </div>
              {!collapsed && (
                expandedSections.admin ? <ChevronUp size={18} className="text-purple-300" /> : <ChevronDown size={18} className="text-purple-300" />
              )}
            </div>
            
            {(!collapsed && expandedSections.admin) && (
              <div className="ml-4 mt-2 space-y-1 pl-6 border-l border-purple-700/50">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) => `
                      group flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 my-1
                      ${isActive 
                        ? 'bg-gradient-to-r from-purple-600/80 to-purple-500/80 text-white shadow-lg border-l-4 border-purple-300' 
                        : 'text-purple-100 hover:bg-purple-700/40 hover:text-white hover:border-l-4 hover:border-purple-500/50'
                      }
                    `}
                    end
                  >
                    <item.icon className="flex-shrink-0 w-5 h-5" />
                    <span className="ml-3 font-medium text-sm">{item.name}</span>
                    <div className="ml-auto">
                      <Circle className="w-2 h-2 text-purple-400 opacity-0 group-hover:opacity-100" />
                    </div>
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Providers Section */}
          <div className={`${collapsed ? 'px-2' : 'px-1'}`}>
            <div 
              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 
                ${expandedSections.providers ? 'bg-blue-900/20 border-l-4 border-blue-400' : 'hover:bg-blue-900/10'}`} 
              onClick={() => toggleSection('providers')}
            >
              <div className="flex items-center">
                <div className="p-2 bg-blue-600/30 rounded-lg">
                  <Building className="w-5 h-5 text-blue-300" />
                </div>
                {!collapsed && (
                  <div className="ml-3">
                    <span className="font-semibold text-blue-100">Providers</span>
                    <div className="text-xs text-blue-300 mt-0.5">Manage service providers</div>
                  </div>
                )}
              </div>
              {!collapsed && (
                expandedSections.providers ? <ChevronUp size={18} className="text-blue-300" /> : <ChevronDown size={18} className="text-blue-300" />
              )}
            </div>
            
            {(!collapsed && expandedSections.providers) && (
              <div className="ml-4 mt-3 space-y-2 pl-6 border-l border-blue-700/50">
                {providerNavigation.map((item) => {
                  const isActive = isActivePath(item.href);
                  return (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={`
                        group flex items-center px-4 py-3 rounded-xl transition-all duration-200 my-1.5
                        ${isActive 
                          ? 'bg-gradient-to-r from-blue-600/90 to-blue-500/90 text-white shadow-lg border-l-4 border-blue-300' 
                          : 'bg-blue-900/10 text-blue-100 hover:bg-blue-800/30 hover:text-white hover:border-l-4 hover:border-blue-400/50'
                        }
                      `}
                    >
                      <item.icon className="flex-shrink-0 w-5 h-5" />
                      <div className="ml-3 flex-1">
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-blue-300/80 mt-0.5">{item.description}</div>
                      </div>
                      {item.count > 0 && (
                        <div className={`ml-2 px-2 py-1 rounded-full text-xs font-bold min-w-[2rem] text-center ${item.badgeColor || 'bg-blue-600/80'} text-white`}>
                          {item.count}
                        </div>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>

          {/* Explorers Section */}
          <div className={`${collapsed ? 'px-2' : 'px-1'}`}>
            <div 
              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 
                ${expandedSections.explorers ? 'bg-green-900/20 border-l-4 border-green-400' : 'hover:bg-green-900/10'}`} 
              onClick={() => toggleSection('explorers')}
            >
              <div className="flex items-center">
                <div className="p-2 bg-green-600/30 rounded-lg">
                  <Compass className="w-5 h-5 text-green-300" />
                </div>
                {!collapsed && (
                  <div className="ml-3">
                    <span className="font-semibold text-green-100">Explorers</span>
                    <div className="text-xs text-green-300 mt-0.5">Manage seekers/explorers</div>
                  </div>
                )}
              </div>
              {!collapsed && (
                expandedSections.explorers ? <ChevronUp size={18} className="text-green-300" /> : <ChevronDown size={18} className="text-green-300" />
              )}
            </div>
            
            {(!collapsed && expandedSections.explorers) && (
              <div className="ml-4 mt-3 space-y-2 pl-6 border-l border-green-700/50">
                {explorerNavigation.map((item) => {
                  const isActive = isActivePath(item.href);
                  return (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={`
                        group flex items-center px-4 py-3 rounded-xl transition-all duration-200 my-1.5
                        ${isActive 
                          ? 'bg-gradient-to-r from-green-600/90 to-green-500/90 text-white shadow-lg border-l-4 border-green-300' 
                          : 'bg-green-900/10 text-green-100 hover:bg-green-800/30 hover:text-white hover:border-l-4 hover:border-green-400/50'
                        }
                      `}
                    >
                      <item.icon className="flex-shrink-0 w-5 h-5" />
                      <div className="ml-3 flex-1">
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-green-300/80 mt-0.5">{item.description}</div>
                      </div>
                      {item.count > 0 && (
                        <div className="ml-2 px-2 py-1 rounded-full text-xs font-bold min-w-[2rem] text-center bg-green-600/80 text-white">
                          {item.count > 999 ? '999+' : item.count}
                        </div>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* User Profile & Logout */}
        <div className="border-t border-purple-700 p-4">
          {!collapsed && (
            <div className="flex items-center mb-4 p-3 rounded-xl bg-purple-800/30">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                  <UserCircle className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-purple-600 rounded-full border-2 border-purple-900 flex items-center justify-center">
                  <Shield className="w-2 h-2 text-white" />
                </div>
              </div>
              <div className="ml-3 flex-1">
                <div className="text-sm font-semibold text-white">Space Administrator</div>
                <div className="text-xs text-purple-300">Super Admin Access</div>
              </div>
            </div>
          )}
          
          {collapsed && (
            <div className="flex justify-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                <UserCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          )}
          
          <button className="flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl">
            <LogOut className="w-4 h-4" />
            {!collapsed && <span className="ml-3">Logout</span>}
          </button>
          
          {!collapsed && (
            <div className="mt-3 text-center">
              <div className="text-xs text-purple-400">Version 2.1.0</div>
              <div className="text-xs text-purple-500">© 2024 GOPHORA</div>
            </div>
          )}
        </div>
      </div>

      {/* Collapsed Hover Tooltips */}
      {collapsed && (
        <div className="fixed inset-y-0 left-20 z-40 w-64 pointer-events-none">
          <div className="h-full flex flex-col py-4">
            {/* Tooltips for sections */}
            <div className="relative">
              <div className="absolute left-2 mt-10 px-3 py-2 bg-purple-800 text-white text-sm rounded-lg shadow-lg opacity-0 hover:opacity-100 transition-opacity pointer-events-auto border border-purple-700">
                <div className="font-semibold">Admin Panel</div>
                <div className="text-xs text-purple-300 mt-1">System settings & monitoring</div>
              </div>
              <div className="absolute left-2 mt-28 px-3 py-2 bg-blue-800 text-white text-sm rounded-lg shadow-lg opacity-0 hover:opacity-100 transition-opacity pointer-events-auto border border-blue-700">
                <div className="font-semibold">Providers</div>
                <div className="text-xs text-blue-300 mt-1">Manage service providers</div>
              </div>
              <div className="absolute left-2 mt-46 px-3 py-2 bg-green-800 text-white text-sm rounded-lg shadow-lg opacity-0 hover:opacity-100 transition-opacity pointer-events-auto border border-green-700">
                <div className="font-semibold">Explorers</div>
                <div className="text-xs text-green-300 mt-1">Manage seekers/explorers</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;