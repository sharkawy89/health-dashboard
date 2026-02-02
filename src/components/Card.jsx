import React from 'react';
import { cn } from '../utils/cn';

export const Card = ({ children, className, title, actions, ...props }) => {
  return (
    <div className={cn('bg-white rounded-lg shadow-sm border border-slate-200', className)} {...props}>
      {(title || actions) && (
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          {title && <h3 className="text-lg font-semibold text-slate-900">{title}</h3>}
          {actions && <div>{actions}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
