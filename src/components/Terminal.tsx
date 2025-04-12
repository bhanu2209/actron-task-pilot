
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TerminalProps {
  onSubmit: (command: string) => void;
  isProcessing: boolean;
  className?: string;
}

const Terminal: React.FC<TerminalProps> = ({ onSubmit, isProcessing, className }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'Welcome to Actron, your personal AI Command Agent.',
    'Type your task in natural language and hit Enter...',
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    
    const newHistory = [...history, `$ ${input}`];
    setHistory(newHistory);
    onSubmit(input);
    setInput('');
  };

  return (
    <div className={cn("terminal-window flex flex-col", className)}>
      <div className="terminal-header">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
          <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
          <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
        </div>
        <div className="text-xs text-center text-gray-400 flex-grow">actron ~ bash</div>
      </div>
      <div 
        ref={terminalRef}
        className="terminal-body flex-1 overflow-auto min-h-[300px] max-h-[500px] p-4"
      >
        {history.map((line, i) => (
          <div key={i} className={cn("mb-1 whitespace-pre-wrap", {
            "text-terminal-blue": line.startsWith("$"),
            "text-terminal-green": line.startsWith(">"),
            "text-terminal-yellow": line.includes("[EXECUTING]"),
            "text-terminal-cyan": line.includes("[PLANNING]"),
            "text-terminal-magenta": line.includes("[FEEDBACK]"),
            "animate-slide-in": i === history.length - 1
          })}>
            {line}
          </div>
        ))}
        <form onSubmit={handleSubmit} className="flex items-center mt-2">
          <span className="text-terminal-green mr-2">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isProcessing}
            className="flex-1 bg-transparent outline-none border-none"
            placeholder={isProcessing ? "Processing..." : "Enter your command..."}
            autoFocus
          />
          <span className={cn("w-2 h-4 bg-terminal-text animate-cursor-blink", {
            "opacity-0": isProcessing
          })}></span>
        </form>
      </div>
    </div>
  );
};

export default Terminal;
