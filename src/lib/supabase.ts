
import { createClient } from '@supabase/supabase-js';

// Check if Supabase URL and key are available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a Supabase client only if both URL and key are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Function to verify if user exists in the database
export const verifyUser = async (userId: string) => {
  if (!supabase) {
    console.error('Supabase client is not initialized. Please check your environment variables.');
    return null;
  }

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error verifying user:', error);
    return null;
  }

  return data;
};

// Function to create a new user record in the database
export const createUserRecord = async (
  id: string,
  email: string,
  full_name: string,
  avatar_url: string
) => {
  if (!supabase) {
    console.error('Supabase client is not initialized. Please check your environment variables.');
    return null;
  }

  const { data, error } = await supabase.from('users').insert([
    {
      id,
      email,
      full_name,
      avatar_url,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error('Error creating user record:', error);
    return null;
  }

  return data;
};
