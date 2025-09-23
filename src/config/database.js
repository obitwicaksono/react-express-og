const { createClient } = require('@supabase/supabase-js');

// Konfigurasi koneksi ke Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = supabase;
