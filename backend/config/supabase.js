const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Check if Supabase credentials are properly configured
if (!supabaseUrl || !supabaseKey || 
    supabaseUrl === 'your_supabase_url_here' || 
    supabaseKey === 'your_supabase_anon_key_here') {
  console.warn('⚠️  Supabase credentials not configured. Please update your .env file with real Supabase credentials.');
  console.warn('   The server will start but database operations will fail until configured.');
  
  // Create a mock client for development
  module.exports = {
    auth: {
      signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signOut: () => Promise.resolve({ error: { message: 'Supabase not configured' } }),
      getUser: () => Promise.resolve({ data: { user: null }, error: { message: 'Supabase not configured' } })
    },
    from: () => ({
      select: () => ({ error: { message: 'Supabase not configured' } }),
      insert: () => ({ error: { message: 'Supabase not configured' } }),
      update: () => ({ error: { message: 'Supabase not configured' } }),
      delete: () => ({ error: { message: 'Supabase not configured' } }),
      upsert: () => ({ error: { message: 'Supabase not configured' } })
    })
  };
} else {
  const supabase = createClient(supabaseUrl, supabaseKey);
  module.exports = supabase;
}
