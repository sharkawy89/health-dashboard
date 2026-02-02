import React from 'react';
import { cn } from '../utils/cn';

export const Select = ({ 
  label, 
  error, 
  options = [],
  className,
  containerClassName,
  ...props 
}) => {
  return (
    <div className={cn('mb-4', containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label}
        </label>
      )}
      <select
        className={cn(
          'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-white',
          error ? 'border-danger' : 'border-slate-300',
          className
        )}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-danger">{error}</p>
      )}
    </div>
  );
};
