
import { Task } from '@/contexts/TasksContext';

// Demo examples to showcase in the UI
export const exampleCommands = [
  "Generate a full-stack app using Next.js, React, and Node.js",
  "Create a Python script that converts CSV files to JSON",
  "Set up a Docker container with Nginx, PostgreSQL, and Redis",
  "Build a simple portfolio website with HTML, CSS, and JavaScript"
];

// Generate demo steps based on the command
export const generateDemoSteps = (command: string): Omit<Task, 'id'>[] => {
  // Very basic demo logic - in a real implementation this would be AI-generated
  if (command.toLowerCase().includes('python')) {
    return [
      { description: "Create Python script", command: "touch convert.py", status: 'pending' },
      { description: "Install required packages", command: "pip install pandas", status: 'pending' },
      { description: "Write CSV conversion function", status: 'pending' },
      { description: "Add command-line argument handling", status: 'pending' },
      { description: "Test with sample data", status: 'pending' }
    ];
  } else if (command.toLowerCase().includes('docker')) {
    return [
      { description: "Create Dockerfile", command: "touch Dockerfile docker-compose.yml", status: 'pending' },
      { description: "Setup Nginx configuration", command: "mkdir nginx-config", status: 'pending' },
      { description: "Configure PostgreSQL service", status: 'pending' },
      { description: "Setup Redis cache service", status: 'pending' },
      { description: "Create Docker network", status: 'pending' },
      { description: "Configure environment variables", status: 'pending' }
    ];
  } else if (command.toLowerCase().includes('portfolio')) {
    return [
      { description: "Create project structure", command: "mkdir -p portfolio/{css,js,images}", status: 'pending' },
      { description: "Create HTML boilerplate", command: "touch portfolio/index.html", status: 'pending' },
      { description: "Add basic styling", command: "touch portfolio/css/style.css", status: 'pending' },
      { description: "Create JavaScript for interactions", command: "touch portfolio/js/main.js", status: 'pending' },
      { description: "Implement responsive design", status: 'pending' }
    ];
  } else {
    // Default full-stack app steps
    return [
      { description: "Initialize project structure", command: "mkdir -p my-project/{client,server}", status: 'pending' },
      { description: "Set up Next.js with React", command: "npx create-next-app@latest client", status: 'pending' },
      { description: "Set up Node.js Express backend", command: "cd server && npm init -y && npm i express mongoose cors dotenv", status: 'pending' },
      { description: "Add TailwindCSS to frontend", command: "cd client && npm i -D tailwindcss postcss autoprefixer", status: 'pending' },
      { description: "Create MongoDB connection", status: 'pending' },
      { description: "Generate login/signup components", status: 'pending' },
      { description: "Set up basic routing", status: 'pending' }
    ];
  }
};
