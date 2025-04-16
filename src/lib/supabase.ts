import { createClient } from '@supabase/supabase-js';

// Directly use environment variables from Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Ensure both URL and key are present before creating the client
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Placeholder functions that return null instead of accessing Supabase
export const verifyUser = async () => null;
export const createUserRecord = async () => null;
