
import React from 'react';

interface ExampleCommandsProps {
  exampleCommands: string[];
  onCommandSelect: (command: string) => void;
  isProcessing: boolean;
}

const ExampleCommands: React.FC<ExampleCommandsProps> = ({ 
  exampleCommands, 
  onCommandSelect, 
  isProcessing 
}) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-400 mb-2">Try these example prompts:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {exampleCommands.map((cmd, idx) => (
          <button
            key={idx}
            onClick={() => !isProcessing && onCommandSelect(cmd)}
            disabled={isProcessing}
            className="text-sm text-left p-2 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 truncate"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExampleCommands;
