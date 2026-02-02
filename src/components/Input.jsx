import React from 'react';
import { cn } from '../utils/cn';

export const Input = ({ 
  label, 
  error, 
  className,
  containerClassName,
  type = 'text',
  ...props 
}) => {
  return (
    <div className={cn('mb-4', containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        className={cn(
          'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors',
          error ? 'border-danger' : 'border-slate-300',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-danger">{error}</p>
      )}
    </div>
  );
};
