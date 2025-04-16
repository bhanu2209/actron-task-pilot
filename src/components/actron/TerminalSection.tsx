
import React from 'react';
import Terminal from '../Terminal';
import ModelSelector from '../ModelSelector';
import { AIModel } from '../ModelSelector';
import ExampleCommands from './ExampleCommands';
import ExecutionLog from './ExecutionLog';

interface TerminalSectionProps {
  models: AIModel[];
  selectedModel: AIModel;
  onSelectModel: (model: AIModel) => void;
  onSubmit: (command: string) => void;
  isProcessing: boolean;
  exampleCommands: string[];
  executionHistory: string[];
}

const TerminalSection: React.FC<TerminalSectionProps> = ({
  models,
  selectedModel,
  onSelectModel,
  onSubmit,
  isProcessing,
  exampleCommands,
  executionHistory
}) => {
  return (
    <div className="lg:col-span-3 space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-terminal-text">Command Terminal</h2>
        <div className="w-48">
          <ModelSelector 
            models={models} 
            selectedModel={selectedModel}
            onSelectModel={onSelectModel}
          />
        </div>
      </div>
      
      <Terminal 
        onSubmit={onSubmit} 
        isProcessing={isProcessing}
        className="min-h-[400px]"
      />
      
      <ExampleCommands 
        exampleCommands={exampleCommands}
        onCommandSelect={onSubmit}
        isProcessing={isProcessing}
      />
      
      <ExecutionLog executionHistory={executionHistory} />
    </div>
  );
};

export default TerminalSection;
