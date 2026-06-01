import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey || supabaseAnonKey.includes("your_") || supabaseAnonKey.includes("placeholder")) {
  console.warn("[SUPABASE_INITIALIZATION_ERROR]: Missing required public api environment tokens.");
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
