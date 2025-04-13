
import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase URL and anon key once you've set up your project
// These will be available in your Supabase dashboard
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

// Function to verify if user exists in the database
export const verifyUser = async (userId: string) => {
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
