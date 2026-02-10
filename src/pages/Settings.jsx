import React from 'react';
import { Card } from '../components/Card';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-1">Manage system configuration</p>
      </div>
      
      <Card>
        <div className="text-center py-16">
          <SettingsIcon className="h-24 w-24 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 mb-2">Settings Module</h3>
          <p className="text-slate-500">This feature is coming soon...</p>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
