import React from 'react';
import { cn } from '../utils/cn';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  disabled,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-primary hover:bg-primary-600 text-white focus:ring-primary',
    secondary: 'bg-slate-200 hover:bg-slate-300 text-slate-700 focus:ring-slate-400',
    success: 'bg-success hover:bg-success-700 text-white focus:ring-success',
    danger: 'bg-danger hover:bg-danger-700 text-white focus:ring-danger',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], disabledStyles, className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
