
import React, { createContext, useContext } from 'react';
import { useToast } from '@/hooks/use-toast';

// Simple context without authentication functionality
type AuthContextType = {
  user: null;
  userDetails: null;
  signInWithGoogle: () => void;
  signOut: () => void;
  loading: boolean;
  isSupabaseConfigured: boolean;
  session: null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();

  // Placeholder functions that do nothing
  const signInWithGoogle = () => {
    toast({
      title: "Authentication Removed",
      description: "Authentication functionality has been removed from this application.",
    });
  };

  const signOut = () => {
    toast({
      title: "Authentication Removed",
      description: "Authentication functionality has been removed from this application.",
    });
  };

  return (
    <AuthContext.Provider
      value={{ 
        session: null, 
        user: null, 
        userDetails: null, 
        signInWithGoogle, 
        signOut, 
        loading: false,
        isSupabaseConfigured: false
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
