
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

export const AuthButtons: React.FC = () => {
  return (
    <Button 
      variant="outline" 
      className="bg-terminal-cyan hover:bg-terminal-cyan/90 text-black" 
    >
      <LogIn className="mr-2 h-4 w-4" />
      Sign In
    </Button>
  );
};
