
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn, LogOut } from 'lucide-react';

export const AuthButtons: React.FC = () => {
  const { user, signInWithGoogle, signOut } = useAuth();

  return (
    <div className="flex items-center gap-2">
      {user ? (
        <Button 
          variant="outline" 
          className="bg-gray-800 hover:bg-gray-700 text-terminal-text" 
          onClick={signOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      ) : (
        <Button 
          className="bg-terminal-cyan text-black hover:bg-terminal-cyan/90" 
          onClick={signInWithGoogle}
        >
          <LogIn className="mr-2 h-4 w-4" />
          Sign In with Google
        </Button>
      )}
    </div>
  );
};
