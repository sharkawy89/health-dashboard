import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <Header onMenuClick={toggleSidebar} />
      
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={closeSidebar}
        />
      )}
      
      <main className="lg:ml-64 mt-16 p-4 sm:p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
