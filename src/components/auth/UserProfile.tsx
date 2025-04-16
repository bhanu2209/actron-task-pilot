
import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const UserProfile: React.FC = () => {
  return (
    <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-800/40">
      <AlertTriangle className="h-5 w-5 text-amber-400" />
      <div>
        <p className="text-sm font-medium text-terminal-text">Authentication Removed</p>
        <p className="text-xs text-gray-400">User authentication has been disabled</p>
      </div>
    </div>
  );
};
