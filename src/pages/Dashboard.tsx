
import React from 'react';
import { Terminal, Cpu, Trash2, ArrowLeft } from 'lucide-react';
import { useTasks } from '@/contexts/TasksContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { tasks, clearTasks } = useTasks();

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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-terminal-cyan">Task Dashboard</h2>
            <div className="flex space-x-2">
              <Link to="/">
                <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-800">
                  <ArrowLeft size={16} className="mr-1" /> Back to Home
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-terminal-red border-gray-700 hover:bg-gray-800"
                onClick={clearTasks}
                disabled={tasks.length === 0}
              >
                <Trash2 size={16} className="mr-1" /> Clear Tasks
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`p-4 rounded-lg ${
                    task.status === 'pending' ? 'bg-gray-800' : 
                    task.status === 'running' ? 'bg-blue-900/20' : 
                    task.status === 'completed' ? 'bg-green-900/20' : 
                    'bg-red-900/20'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      task.status === 'pending' ? 'bg-gray-500' : 
                      task.status === 'running' ? 'bg-terminal-blue' : 
                      task.status === 'completed' ? 'bg-terminal-green' : 
                      'bg-terminal-red'
                    }`}></div>
                    <div>
                      <h3 className="font-medium">{task.description}</h3>
                      {task.command && (
                        <p className="text-sm text-gray-400 mt-1 font-mono">$ {task.command}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 bg-gray-800 rounded-lg">
                <p className="text-gray-400">No tasks available. Go to the home page to create some!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
