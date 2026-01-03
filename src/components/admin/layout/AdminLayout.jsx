import { useState } from 'react';
import { Outlet } from 'react-router-dom'; // ADD THIS IMPORT
import Sidebar from './Sidebar';
import Header from './Header';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className={`lg:pl-64 flex flex-col flex-1 ${sidebarOpen ? 'overflow-hidden' : ''}`}>
        <Header setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
         
  <Outlet />

          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;