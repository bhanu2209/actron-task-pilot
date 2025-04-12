
import React from 'react';
import Header from '@/components/Header';
import ActronDemo from '@/components/ActronDemo';
import { Github, ExternalLink } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-terminal-background text-terminal-text pb-16">
      <Header />
      
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">
            Your Personal <span className="text-terminal-cyan">DevOps Co-Pilot</span>
          </h2>
          <p className="text-gray-400 mb-6">
            Actron is an AI-powered automation agent that understands natural language,
            creates execution plans, and runs them on your local machine with feedback loops.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="default" className="bg-terminal-cyan text-black hover:bg-terminal-cyan/90">
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </Button>
            <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
              <ExternalLink className="mr-2 h-4 w-4" />
              Documentation
            </Button>
          </div>
        </div>
        
        <Separator className="my-8 bg-gray-700" />
        
        <ActronDemo />
      </div>
      
      <footer className="mt-16 py-6 border-t border-gray-800">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          <p>Actron Task Pilot — The Self-Evolving Terminal Assistant</p>
          <p className="mt-1">Powered by AI • Local-first • Free & Open Source</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
