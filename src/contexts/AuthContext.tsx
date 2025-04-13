
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User, AuthChangeEvent } from '@supabase/supabase-js';
import { supabase, verifyUser, createUserRecord } from '../lib/supabase';
import { useToast } from '@/hooks/use-toast';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  userDetails: any | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      setSession(initialSession);
      setUser(initialSession?.user || null);
      
      if (initialSession?.user) {
        const userData = await verifyUser(initialSession.user.id);
        setUserDetails(userData);
      }
      
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, currentSession: Session | null) => {
        setSession(currentSession);
        setUser(currentSession?.user || null);
        setLoading(false);

        if (event === 'SIGNED_IN' && currentSession?.user) {
          const userData = await verifyUser(currentSession.user.id);
          
          // If user doesn't exist in the database, create a new record
          if (!userData) {
            const { user } = currentSession;
            const userMetadata = user.user_metadata;
            
            await createUserRecord(
              user.id,
              user.email || '',
              userMetadata.full_name || userMetadata.name || user.email?.split('@')[0] || 'User',
              userMetadata.avatar_url || ''
            );
            
            // Fetch the newly created user record
            const newUserData = await verifyUser(user.id);
            setUserDetails(newUserData);
            
            toast({
              title: "Welcome!",
              description: "Your account has been created successfully.",
            });
          } else {
            setUserDetails(userData);
            
            toast({
              title: "Welcome back!",
              description: "You've been signed in successfully.",
            });
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      
      if (error) {
        throw error;
      }
    } catch (error: any) {
      toast({
        title: "Sign-in failed",
        description: error.message || "An error occurred during sign-in.",
        variant: "destructive"
      });
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUserDetails(null);
      toast({
        title: "Signed out",
        description: "You've been signed out successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Sign-out failed",
        description: error.message || "An error occurred during sign-out.",
        variant: "destructive"
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{ session, user, userDetails, signInWithGoogle, signOut, loading }}
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
