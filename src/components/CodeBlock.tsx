
import React from 'react';
import { cn } from '@/lib/utils';
import { Clipboard, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language, className }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("relative group rounded-md overflow-hidden", className)}>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={copyToClipboard}
          className="p-2 rounded bg-gray-800 hover:bg-gray-700 text-gray-300"
          aria-label="Copy code"
        >
          {copied ? <Check size={16} /> : <Clipboard size={16} />}
        </button>
      </div>
      <div className="flex items-center text-xs text-gray-400 bg-gray-800/50 px-4 py-1 border-b border-gray-700">
        {language || 'bash'}
      </div>
      <pre className="bg-gray-900 overflow-x-auto p-4 text-sm">
        <code className="text-terminal-text font-mono">
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
