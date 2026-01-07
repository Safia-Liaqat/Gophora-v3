import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  ChevronDownIcon, 
  ChevronUpIcon,
  HomeIcon,
  BriefcaseIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  RocketLaunchIcon,
  Cog6ToothIcon,
  ArrowRightStartOnRectangleIcon
} from '@heroicons/react/24/outline';

const navItems = [
  { 
    name: 'Dashboard', 
    path: '/admin',
    icon: <HomeIcon className="h-5 w-5" />
  },
  { 
    name: 'Opportunities', 
    path: '/admin/opportunities',
    icon: <BriefcaseIcon className="h-5 w-5" />
  },
  { 
    name: 'Explorers', 
    path: '/admin/explorers',
    icon: <UserGroupIcon className="h-5 w-5" />
  },
  { 
    name: 'Provider',
    icon: <BuildingOfficeIcon className="h-5 w-5" />,
    subItems: [
      { name: 'Provider Management', path: '/admin/provider' },
      { name: 'Review Queue', path: '/admin/providers/review' }
    ]
  },
  { 
    name: 'Missions', 
    path: '/admin/missions',
    icon: <RocketLaunchIcon className="h-5 w-5" />
  },
  { 
    name: 'Settings', 
    path: '/admin/settings',
    icon: <Cog6ToothIcon className="h-5 w-5" />
  },
]

export default function Sidebar() {
  const navigate = useNavigate();
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (itemName) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const isActivePath = (path) => {
    return window.location.pathname === path;
  };

  const isActiveSubItem = (subItems) => {
    return subItems?.some(item => isActivePath(item.path));
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
    // Example: clear auth tokens, etc.
    // navigate('/login');
  };

  return (
    <aside className="w-64 bg-[#333333] text-white flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 font-bold text-lg border-b border-[#000000]">
        GOPHORA Admin
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map(item => (
          <div key={item.name} className="relative">
            {item.subItems ? (
              // Dropdown item
              <>
                <button
                  onClick={() => toggleDropdown(item.name)}
                  className={`w-full flex items-center justify-between px-4 py-2 rounded transition ${
                    isActiveSubItem(item.subItems)
                      ? 'bg-[#FF4F00] text-white'
                      : 'text-white hover:bg-[#FF4F00] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                  {openDropdowns[item.name] ? (
                    <ChevronUpIcon className="h-4 w-4" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4" />
                  )}
                </button>
                
                {/* Dropdown content */}
                {openDropdowns[item.name] && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.subItems.map(subItem => (
                      <NavLink
                        key={subItem.name}
                        to={subItem.path}
                        className={({ isActive }) =>
                          `block px-4 py-2 rounded text-sm transition ${
                            isActive
                              ? 'bg-[#FF4F00]/20 text-white border-l-2 border-[#FF4F00]'
                              : 'text-white/70 hover:text-white hover:bg-white/10'
                          }`
                        }
                      >
                        {subItem.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            ) : (
              // Regular navigation item
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded transition ${
                    isActive
                      ? 'bg-[#FF4F00] text-white'
                      : 'text-white hover:bg-[#FF4F00] hover:text-white'
                  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            )}
          </div>
        ))}
      </nav>

      {/* Footer with Logout */}
      <div className="p-4 border-t border-[#000000]">
        <div className="px-4 py-2 text-sm text-white/70 mb-2">
          Version 1.0.0
        </div>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded text-white hover:bg-[#FF4F00] hover:text-white transition-colors"
        >
          <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}