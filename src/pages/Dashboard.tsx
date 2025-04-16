
import React from 'react';
import { UserProfile } from '@/components/auth/UserProfile';
import { Terminal, Cpu } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-terminal-background text-terminal-text pb-16">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col items-center justify-center py-8 mb-8">
          <div className="flex items-center mb-2">
            <Terminal className="w-10 h-10 text-terminal-cyan mr-2" />
            <h1 className="text-4xl font-bold gradient-text">ACTRON</h1>
          </div>
          <p className="text-terminal-text text-lg mb-2">
            Welcome to your <span className="text-terminal-cyan">Dashboard</span>
          </p>
          <div className="flex items-center mt-2 text-sm text-gray-400 bg-gray-800/30 px-4 py-1 rounded-full">
            <Cpu size={12} className="mr-2" /> 
            <span>AI-Powered Task Execution</span>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 shadow-lg max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-6 text-terminal-cyan">Dashboard</h2>
          
          <div className="mb-6">
            <UserProfile />
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-md font-medium mb-2">Personal Dashboard</h3>
              <p className="text-sm text-gray-400">
                This is your dashboard where you can manage your tasks and preferences.
              </p>
            </div>
            
            <div className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-md font-medium mb-2">Recent Activity</h3>
              <p className="text-sm text-gray-400">
                You don't have any recent activity yet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
