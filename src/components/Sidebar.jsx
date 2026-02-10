import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Settings,
  Activity,
  X
} from 'lucide-react';
import { cn } from '../utils/cn';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Patients', path: '/patients' },
    { icon: Calendar, label: 'Appointments', path: '/appointments' },
    { icon: FileText, label: 'Medical Records', path: '/records' },
    { icon: Activity, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];
  
  return (
    <aside className={cn(
      "fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 flex flex-col z-40 transition-transform duration-300 ease-in-out",
      "lg:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Activity className="h-8 w-8" />
            EL3eyada
          </h1>
          <p className="text-sm text-slate-500 mt-1">Clinic Management</p>
        </div>
        <button 
          onClick={onClose}
          className="lg:hidden text-slate-600 hover:text-slate-900"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                    isActive 
                      ? 'bg-primary text-white' 
                      : 'text-slate-700 hover:bg-slate-100'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-200">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="text-primary font-semibold">DR</span>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">Dr. Ahmed Hassan</p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
