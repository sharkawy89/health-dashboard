import React, { useState } from 'react';
import { Search, Bell, Menu, X, Calendar, Users, Activity } from 'lucide-react';

const Header = ({ onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: 'appointment',
      icon: Calendar,
      title: 'New Appointment',
      message: 'John Doe scheduled for tomorrow at 10:00 AM',
      time: '5 min ago',
      unread: true
    },
    {
      id: 2,
      type: 'patient',
      icon: Users,
      title: 'New Patient Registration',
      message: 'Sarah Smith has been registered',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      type: 'system',
      icon: Activity,
      title: 'System Update',
      message: 'New features available in the dashboard',
      time: '2 hours ago',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="fixed top-0 lg:left-64 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-20">
      <div className="flex items-center gap-2 sm:gap-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="lg:hidden text-slate-600 hover:text-slate-900 p-2 hover:bg-slate-100 rounded-lg"
        >
          <Menu className="h-6 w-6" />
        </button>
        
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 bg-danger rounded-full"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <>
              {/* Backdrop for mobile */}
              <div 
                className="fixed inset-0 z-30 lg:hidden" 
                onClick={() => setShowNotifications(false)}
              />
              
              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-lg border border-slate-200 z-40 max-h-[80vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <p className="text-xs text-slate-500">{unreadCount} unread</p>
                    )}
                  </div>
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="lg:hidden text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Notifications List */}
                <div className="overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => {
                      const Icon = notification.icon;
                      return (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors ${
                            notification.unread ? 'bg-primary-50' : ''
                          }`}
                        >
                          <div className="flex gap-3">
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                                <Icon className="h-5 w-5 text-primary" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-900">
                                {notification.title}
                              </p>
                              <p className="text-sm text-slate-600 mt-0.5">
                                {notification.message}
                              </p>
                              <p className="text-xs text-slate-500 mt-1">
                                {notification.time}
                              </p>
                            </div>
                            {notification.unread && (
                              <div className="flex-shrink-0">
                                <div className="h-2 w-2 bg-primary rounded-full"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="px-4 py-8 text-center text-slate-500">
                      <Bell className="h-12 w-12 mx-auto mb-2 text-slate-300" />
                      <p>No notifications</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t border-slate-200 bg-slate-50">
                  <button className="text-sm text-primary hover:text-primary-700 font-medium w-full text-center">
                    View all notifications
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-slate-900">Dr. Ahmed Hassan</p>
          <p className="text-xs text-slate-500">Administrator</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
