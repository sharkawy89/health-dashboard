import React from 'react';
import { cn } from '../utils/cn';

export const Loading = ({ className }) => {
  return (
    <div className={cn('flex items-center justify-center p-8', className)}>
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
};
