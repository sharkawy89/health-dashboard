import React from 'react';
import { cn } from '../utils/cn';

export const Table = ({ columns, data, className, onRowClick }) => {
  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className={cn('min-w-full divide-y divide-slate-200', className)}>
            <thead className="bg-slate-50">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={cn(
                    'hover:bg-slate-50 transition-colors',
                    onRowClick && 'cursor-pointer'
                  )}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-900"
                    >
                      {column.render ? column.render(row) : row[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {data.length === 0 && (
        <div className="text-center py-8 text-slate-500">
          No data available
        </div>
      )}
    </div>
  );
};
