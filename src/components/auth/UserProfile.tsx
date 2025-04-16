
import React from 'react';
import { User } from 'lucide-react';

export const UserProfile: React.FC = () => {
  return (
    <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-800/40">
      <User className="h-5 w-5 text-terminal-cyan" />
      <div>
        <p className="text-sm font-medium text-terminal-text">Guest User</p>
        <p className="text-xs text-gray-400">Welcome to your dashboard</p>
      </div>
    </div>
  );
};
