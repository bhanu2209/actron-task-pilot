
import React from 'react';
import { Terminal, Cpu, Zap } from 'lucide-react';
import { AuthButtons } from './auth/AuthButtons';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const { user } = useAuth();
  
  return (
    <header className="flex flex-col items-center justify-center py-8 mb-8">
      <div className="w-full flex justify-end mb-4 px-4">
        <AuthButtons />
      </div>
      
      <div className="flex items-center mb-2">
        <Terminal className="w-10 h-10 text-terminal-cyan mr-2" />
        <Link to="/" className="text-4xl font-bold gradient-text">ACTRON</Link>
        <Zap className="w-6 h-6 text-terminal-yellow ml-1" />
      </div>
      
      <p className="text-terminal-text text-lg">
        The Self-Evolving <span className="text-terminal-cyan">Terminal Assistant</span>
      </p>
      
      {user && (
        <Link 
          to="/dashboard" 
          className="mt-2 text-terminal-cyan hover:text-terminal-cyan/80 underline text-sm"
        >
          Go to Dashboard
        </Link>
      )}
      
      <div className="flex items-center mt-2 text-sm text-gray-400 bg-gray-800/30 px-4 py-1 rounded-full">
        <Cpu size={12} className="mr-2" /> 
        <span>AI-Powered Task Execution</span>
      </div>
    </header>
  );
};

export default Header;
