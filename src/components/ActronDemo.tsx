
import React, { useState } from 'react';
import Terminal from './Terminal';
import Plan, { Step, PlanStatus } from './Plan';
import FeedbackForm from './FeedbackForm';
import ModelSelector, { AIModel } from './ModelSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Info } from 'lucide-react';

const models: AIModel[] = [
  { id: 'gpt35', name: 'GPT-3.5 Turbo', provider: 'OpenAI', type: 'cloud' },
  { id: 'codellama', name: 'CodeLlama', provider: 'Ollama', type: 'local' },
  { id: 'mistral', name: 'Mistral', provider: 'Ollama', type: 'local' },
  { id: 'llama3', name: 'Llama 3', provider: 'Ollama', type: 'local' }
];

// Demo examples to showcase in the UI
const exampleCommands = [
  "Generate a full-stack app using Next.js, React, and Node.js",
  "Create a Python script that converts CSV files to JSON",
  "Set up a Docker container with Nginx, PostgreSQL, and Redis",
  "Build a simple portfolio website with HTML, CSS, and JavaScript"
];

const ActronDemo: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<AIModel>(models[1]); // Local model default
  const [planStatus, setPlanStatus] = useState<PlanStatus>('planning');
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [executionHistory, setExecutionHistory] = useState<string[]>([]);
  const { toast } = useToast();

  // Initial demo steps
  const [steps, setSteps] = useState<Step[]>([
    { id: 1, description: "Initialize project structure", command: "mkdir -p my-project/{client,server}", status: 'pending' },
    { id: 2, description: "Set up Next.js with React", command: "npx create-next-app@latest client", status: 'pending' },
    { id: 3, description: "Set up Node.js Express backend", command: "cd server && npm init -y && npm i express mongoose cors dotenv", status: 'pending' },
    { id: 4, description: "Add TailwindCSS to frontend", command: "cd client && npm i -D tailwindcss postcss autoprefixer", status: 'pending' },
    { id: 5, description: "Create MongoDB connection", status: 'pending' },
    { id: 6, description: "Generate login/signup components", status: 'pending' },
    { id: 7, description: "Set up basic routing", status: 'pending' }
  ]);

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
    
    // Reset steps first
    setSteps(prevSteps => 
      prevSteps.map(step => ({
        ...step,
        status: 'pending'
      }))
    );
    
    // Simulate AI processing with delays
    setTimeout(() => {
      // Generate steps based on command (simplified for demo)
      const newSteps = generateDemoSteps(command);
      setSteps(newSteps);
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
    for (let i = 0; i < steps.length; i++) {
      setActiveStep(i);
      
      // Update current step to running
      setSteps(prevSteps => 
        prevSteps.map((step, idx) => ({
          ...step,
          status: idx === i ? 'running' : step.status
        }))
      );
      
      // Add execution message to history
      setExecutionHistory(prev => [
        ...prev, 
        `[EXECUTING] ${steps[i].description}`
      ]);
      
      // Simulate execution time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Randomly succeed or fail for demo purposes (95% success rate)
      const isSuccess = Math.random() > 0.05;
      
      // Update step status based on success/failure
      setSteps(prevSteps => 
        prevSteps.map((step, idx) => ({
          ...step,
          status: idx === i ? (isSuccess ? 'completed' : 'failed') : step.status
        }))
      );
      
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
      // For demo purposes, just reset the failed steps to pending
      setSteps(prevSteps => 
        prevSteps.map(step => ({
          ...step,
          status: step.status === 'failed' ? 'pending' : step.status
        }))
      );
      
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

  // Generate demo steps based on the command
  const generateDemoSteps = (command: string): Step[] => {
    // Very basic demo logic - in a real implementation this would be AI-generated
    if (command.toLowerCase().includes('python')) {
      return [
        { id: 1, description: "Create Python script", command: "touch convert.py", status: 'pending' },
        { id: 2, description: "Install required packages", command: "pip install pandas", status: 'pending' },
        { id: 3, description: "Write CSV conversion function", status: 'pending' },
        { id: 4, description: "Add command-line argument handling", status: 'pending' },
        { id: 5, description: "Test with sample data", status: 'pending' }
      ];
    } else if (command.toLowerCase().includes('docker')) {
      return [
        { id: 1, description: "Create Dockerfile", command: "touch Dockerfile docker-compose.yml", status: 'pending' },
        { id: 2, description: "Setup Nginx configuration", command: "mkdir nginx-config", status: 'pending' },
        { id: 3, description: "Configure PostgreSQL service", status: 'pending' },
        { id: 4, description: "Setup Redis cache service", status: 'pending' },
        { id: 5, description: "Create Docker network", status: 'pending' },
        { id: 6, description: "Configure environment variables", status: 'pending' }
      ];
    } else if (command.toLowerCase().includes('portfolio')) {
      return [
        { id: 1, description: "Create project structure", command: "mkdir -p portfolio/{css,js,images}", status: 'pending' },
        { id: 2, description: "Create HTML boilerplate", command: "touch portfolio/index.html", status: 'pending' },
        { id: 3, description: "Add basic styling", command: "touch portfolio/css/style.css", status: 'pending' },
        { id: 4, description: "Create JavaScript for interactions", command: "touch portfolio/js/main.js", status: 'pending' },
        { id: 5, description: "Implement responsive design", status: 'pending' }
      ];
    } else {
      // Default full-stack app steps
      return steps;
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left side (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-terminal-text">Command Terminal</h2>
            <div className="w-48">
              <ModelSelector 
                models={models} 
                selectedModel={selectedModel}
                onSelectModel={setSelectedModel}
              />
            </div>
          </div>
          
          <Terminal 
            onSubmit={handleCommandSubmit} 
            isProcessing={isProcessing}
            className="min-h-[400px]"
          />
          
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Try these example prompts:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {exampleCommands.map((cmd, idx) => (
                <button
                  key={idx}
                  onClick={() => !isProcessing && handleCommandSubmit(cmd)}
                  disabled={isProcessing}
                  className="text-sm text-left p-2 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 truncate"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
          
          {executionHistory.length > 0 && (
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
          )}
        </div>
        
        {/* Right side (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-terminal-text mb-2">Execution Plan</h2>
          
          <Plan 
            steps={steps}
            status={planStatus}
            onApprove={handleApprove}
            onRetry={handleRetry}
            onFeedback={handleExecutionFeedback}
          />
          
          {showFeedback && (
            <FeedbackForm onSubmit={handleFeedbackSubmit} />
          )}
          
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
        </div>
      </div>
    </div>
  );
};

export default ActronDemo;
