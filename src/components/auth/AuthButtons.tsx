
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export const AuthButtons: React.FC = () => {
  return (
    <Button 
      variant="outline" 
      className="bg-amber-700 hover:bg-amber-600 text-white" 
      disabled
    >
      <AlertTriangle className="mr-2 h-4 w-4" />
      Authentication Disabled
    </Button>
  );
};
