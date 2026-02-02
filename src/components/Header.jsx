import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10">
      <div className="flex items-center gap-4 flex-1">
        <button className="lg:hidden text-slate-600">
          <Menu className="h-6 w-6" />
        </button>
        
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search patients, appointments..."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-danger rounded-full"></span>
        </button>
        
        <div className="text-right">
          <p className="text-sm font-medium text-slate-900">Dr. Ahmed Hassan</p>
          <p className="text-xs text-slate-500">Administrator</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
