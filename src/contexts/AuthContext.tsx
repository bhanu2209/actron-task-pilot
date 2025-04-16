
import React, { createContext, useContext } from 'react';

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
  // Placeholder functions that do nothing
  const signInWithGoogle = () => {};
  const signOut = () => {};

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
