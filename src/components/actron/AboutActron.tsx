
import React from 'react';
import { Info } from 'lucide-react';

const AboutActron: React.FC = () => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-sm text-gray-300">
      <div className="flex items-start mb-2">
        <Info className="text-terminal-blue mr-2 mt-0.5" size={16} />
        <h3 className="font-medium text-terminal-text">About Actron</h3>
      </div>
      <p className="text-gray-400 mb-2">
        Actron is a self-evolving terminal assistant that uses AI to understand and execute tasks on your local computer.
      </p>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-terminal-cyan mr-1"></div>
          <span>AI-powered planning</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-terminal-green mr-1"></div>
          <span>Local execution</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-terminal-yellow mr-1"></div>
          <span>Self-healing loops</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-terminal-magenta mr-1"></div>
          <span>Feedback learning</span>
        </div>
      </div>
    </div>
  );
};

export default AboutActron;
