import { Bell, Search, Menu, User } from 'lucide-react';
import { useState } from 'react';

const Navbar = ({ setSidebarOpen }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New dispute requires attention', time: '5 min ago', read: false },
    { id: 2, text: 'Mission #1234 completed', time: '1 hour ago', read: true },
    { id: 3, text: '3 new users registered', time: '2 hours ago', read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-500 rounded-md lg:hidden hover:bg-gray-100"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="relative ml-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search admin panel..."
              className="pl-10 pr-4 py-2 w-64 lg:w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button className="p-2 text-gray-500 hover:text-gray-700 relative">
              <Bell className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* User Menu */}
          <div className="relative group">
            <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
            </button>
            
            {/* Dropdown menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-2">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile Settings
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Activity Log
                </a>
                <div className="border-t border-gray-200 my-1"></div>
                <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;