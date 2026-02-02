import React from 'react';
import { Card } from '../components/Card';
import { BarChart } from 'lucide-react';

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
        <p className="text-slate-600 mt-1">Advanced analytics and reporting</p>
      </div>
      
      <Card>
        <div className="text-center py-16">
          <BarChart className="h-24 w-24 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 mb-2">Analytics Module</h3>
          <p className="text-slate-500">This feature is coming soon...</p>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
