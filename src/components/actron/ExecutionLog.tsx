
import React from 'react';

interface ExecutionLogProps {
  executionHistory: string[];
}

const ExecutionLog: React.FC<ExecutionLogProps> = ({ executionHistory }) => {
  if (executionHistory.length === 0) return null;
  
  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-gray-400 mb-2">Execution Log:</h3>
      <div className="bg-gray-900 border border-gray-700 rounded-md p-3 font-mono text-sm max-h-[200px] overflow-y-auto">
        {executionHistory.map((line, i) => (
          <div 
            key={i} 
            className={`mb-1 ${
              line.includes('[EXECUTING]') ? 'text-terminal-yellow' : 
              line.includes('[PLANNING]') ? 'text-terminal-cyan' : 
              line.includes('[FEEDBACK]') ? 'text-terminal-magenta' : 
              line.startsWith('>') ? 'text-terminal-green' : 
              'text-terminal-text'
            }`}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExecutionLog;
