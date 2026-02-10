import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../utils/cn';

export const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = 'primary' }) => {
  const colors = {
    primary: 'bg-primary-50 text-primary-600',
    success: 'bg-success-50 text-success-600',
    warning: 'bg-warning-50 text-warning-600',
    danger: 'bg-danger-50 text-danger-600',
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs sm:text-sm font-medium text-slate-600">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend === 'up' ? (
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-success" />
              ) : (
                <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-danger" />
              )}
              <span className={cn(
                'text-xs sm:text-sm font-medium',
                trend === 'up' ? 'text-success' : 'text-danger'
              )}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        <div className={cn('p-2.5 sm:p-3 rounded-full', colors[color])}>
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
      </div>
    </div>
  );
};
