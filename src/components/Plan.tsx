
import React from 'react';
import { Check, Play, RefreshCw, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Task } from '@/contexts/TasksContext';

export type PlanStatus = 'planning' | 'approval' | 'executing' | 'feedback' | 'completed' | 'failed';

interface PlanProps {
  steps: Task[];
  status: PlanStatus;
  onApprove: () => void;
  onRetry: () => void;
  onFeedback: (success: boolean) => void;
}

const Plan: React.FC<PlanProps> = ({ steps, status, onApprove, onRetry, onFeedback }) => {
  return (
    <div className="border border-gray-700 rounded-lg bg-gray-900 shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-terminal-blue to-terminal-magenta p-4">
        <h3 className="font-bold text-white">
          {status === 'planning' && 'Planning...'}
          {status === 'approval' && 'Plan Ready for Approval'}
          {status === 'executing' && 'Executing Plan'}
          {status === 'feedback' && 'Was this successful?'}
          {status === 'completed' && 'Execution Completed'}
          {status === 'failed' && 'Execution Failed'}
        </h3>
      </div>

      <div className="p-4">
        {status === 'planning' ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="animate-spin text-terminal-blue" />
            <span className="ml-3 text-terminal-text">Generating execution plan...</span>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              {steps.map((step) => (
                <div 
                  key={step.id} 
                  className={cn("p-3 rounded-md border", {
                    "border-gray-700 bg-gray-800": step.status === 'pending',
                    "border-terminal-blue bg-blue-900/20 animate-pulse": step.status === 'running',
                    "border-terminal-green bg-green-900/20": step.status === 'completed',
                    "border-terminal-red bg-red-900/20": step.status === 'failed'
                  })}
                >
                  <div className="flex items-start">
                    <div className={cn("mt-1 mr-3 flex-shrink-0", {
                      "text-gray-500": step.status === 'pending',
                      "text-terminal-blue animate-pulse": step.status === 'running',
                      "text-terminal-green": step.status === 'completed',
                      "text-terminal-red": step.status === 'failed'
                    })}>
                      {step.status === 'running' && <RefreshCw size={16} className="animate-spin" />}
                      {step.status === 'completed' && <Check size={16} />}
                      {step.status === 'failed' && <X size={16} />}
                      {step.status === 'pending' && <div className="w-4 h-4 rounded-full border border-gray-500" />}
                    </div>
                    <div>
                      <div className="font-medium">{step.description}</div>
                      {step.command && (
                        <div className="mt-1 bg-terminal-background text-terminal-text p-2 rounded font-mono text-sm overflow-x-auto">
                          $ {step.command}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {status === 'approval' && (
              <Button onClick={onApprove} className="w-full bg-terminal-green text-black hover:bg-terminal-green/90">
                <Play size={16} className="mr-2" /> Execute Plan
              </Button>
            )}

            {status === 'feedback' && (
              <div className="flex space-x-2">
                <Button 
                  onClick={() => onFeedback(true)} 
                  className="flex-1 bg-terminal-green text-black hover:bg-terminal-green/90"
                >
                  <Check size={16} className="mr-2" /> Success
                </Button>
                <Button 
                  onClick={() => onFeedback(false)} 
                  className="flex-1 bg-terminal-red text-white hover:bg-terminal-red/90"
                >
                  <X size={16} className="mr-2" /> Failed
                </Button>
              </div>
            )}

            {status === 'failed' && (
              <Button onClick={onRetry} className="w-full bg-terminal-blue hover:bg-terminal-blue/90">
                <RefreshCw size={16} className="mr-2" /> Retry with Feedback
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Plan;
