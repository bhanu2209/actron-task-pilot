
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useTasks } from '@/contexts/TasksContext';
import { AIModel } from '../ModelSelector';
import { PlanStatus } from '../Plan';
import TerminalSection from './TerminalSection';
import PlanSection from './PlanSection';
import { exampleCommands, generateDemoSteps } from '@/services/TaskExecutor';

const models: AIModel[] = [
  { id: 'gpt35', name: 'GPT-3.5 Turbo', provider: 'OpenAI', type: 'cloud' },
  { id: 'codellama', name: 'CodeLlama', provider: 'Ollama', type: 'local' },
  { id: 'mistral', name: 'Mistral', provider: 'Ollama', type: 'local' },
  { id: 'llama3', name: 'Llama 3', provider: 'Ollama', type: 'local' }
];

const ActronDemo: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<AIModel>(models[1]); // Local model default
  const [planStatus, setPlanStatus] = useState<PlanStatus>('approval');
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [executionHistory, setExecutionHistory] = useState<string[]>([]);
  const { toast } = useToast();
  
  // Use our tasks context
  const { tasks, addTask, removeTask, updateTaskStatus, clearTasks } = useTasks();

  // Function to handle command submission from terminal
  const handleCommandSubmit = (command: string) => {
    // Skip if already processing
    if (isProcessing) return;

    setIsProcessing(true);
    setExecutionHistory([]);
    
    // Demo simulation of planning phase
    toast({
      title: "Processing task",
      description: "Analyzing input and generating execution plan...",
    });
    
    setPlanStatus('planning');
    
    // Clear existing tasks first
    clearTasks();
    
    // Simulate AI processing with delays
    setTimeout(() => {
      // Generate steps based on command (simplified for demo)
      const newSteps = generateDemoSteps(command);
      
      // Add each step as a task
      newSteps.forEach(step => {
        addTask(step);
      });
      
      setPlanStatus('approval');
      setIsProcessing(false);
      
      toast({
        title: "Plan ready",
        description: "Execution plan has been generated and is ready for approval.",
      });
    }, 2000);
  };

  // Function to handle plan approval
  const handleApprove = () => {
    setPlanStatus('executing');
    executeSteps();
  };

  // Function to execute steps one by one
  const executeSteps = async () => {
    // Execute each step with a delay to simulate processing
    for (let i = 0; i < tasks.length; i++) {
      setActiveStep(i);
      
      // Update current step to running
      updateTaskStatus(tasks[i].id, 'running');
      
      // Add execution message to history
      setExecutionHistory(prev => [
        ...prev, 
        `[EXECUTING] ${tasks[i].description}`
      ]);
      
      // Simulate execution time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Randomly succeed or fail for demo purposes (95% success rate)
      const isSuccess = Math.random() > 0.05;
      
      // Update step status based on success/failure
      updateTaskStatus(tasks[i].id, isSuccess ? 'completed' : 'failed');
      
      // Add result message
      setExecutionHistory(prev => [
        ...prev, 
        isSuccess 
          ? `> Command executed successfully` 
          : `> Error: Execution failed`
      ]);
      
      // If this step failed, stop execution and request feedback
      if (!isSuccess) {
        setPlanStatus('failed');
        setShowFeedback(true);
        toast({
          title: "Execution failed",
          description: `Step ${i + 1} encountered an error.`,
          variant: "destructive"
        });
        return;
      }
      
      // Short pause between steps
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // All steps completed successfully
    setPlanStatus('feedback');
    setActiveStep(null);
    toast({
      title: "Execution complete",
      description: "All steps were executed successfully.",
    });
  };

  // Handle retry with feedback
  const handleRetry = () => {
    setShowFeedback(true);
  };

  // Handle feedback submission
  const handleFeedbackSubmit = (feedback: string) => {
    toast({
      title: "Feedback received",
      description: "Generating improved plan based on your feedback...",
    });
    
    setShowFeedback(false);
    setPlanStatus('planning');
    
    // Simulate processing feedback and creating a new plan
    setTimeout(() => {
      // Reset failed tasks to pending
      tasks.forEach(task => {
        if (task.status === 'failed') {
          updateTaskStatus(task.id, 'pending');
        }
      });
      
      setPlanStatus('approval');
      
      setExecutionHistory(prev => [
        ...prev,
        `[FEEDBACK] Processing "${feedback.substring(0, 30)}${feedback.length > 30 ? '...' : ''}"`,
        `[PLANNING] Improved execution strategy generated`
      ]);
      
      toast({
        title: "Plan updated",
        description: "A new execution plan has been created based on your feedback.",
      });
    }, 2000);
  };

  // Handle final feedback on task completion
  const handleExecutionFeedback = (success: boolean) => {
    if (success) {
      setPlanStatus('completed');
      toast({
        title: "Task completed successfully",
        description: "All operations were executed as expected.",
      });
    } else {
      setPlanStatus('failed');
      setShowFeedback(true);
      toast({
        title: "Task failed",
        description: "Please provide feedback on what went wrong.",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left side - Terminal Section */}
        <TerminalSection
          models={models}
          selectedModel={selectedModel}
          onSelectModel={setSelectedModel}
          onSubmit={handleCommandSubmit}
          isProcessing={isProcessing}
          exampleCommands={exampleCommands}
          executionHistory={executionHistory}
        />
        
        {/* Right side - Plan Section */}
        <PlanSection
          tasks={tasks}
          planStatus={planStatus}
          onApprove={handleApprove}
          onRetry={handleRetry}
          onFeedback={handleExecutionFeedback}
          showFeedback={showFeedback}
          onFeedbackSubmit={handleFeedbackSubmit}
        />
      </div>
    </div>
  );
};

export default ActronDemo;
