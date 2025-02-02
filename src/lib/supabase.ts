import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://dbmoabncnezbvwnmiism.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRibW9hYm5jbmV6YnZ3bm1paXNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1MTA4MDgsImV4cCI6MjA1NDA4NjgwOH0.Hyxd6Sy1qx9efwSX9mVa_AXQKXY8aUAYAyfrw1ifJj4";

export const supabase = createClient(supabaseUrl, supabaseKey);