// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dbmoabncnezbvwnmiism.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRibW9hYm5jbmV6YnZ3bm1paXNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1MTA4MDgsImV4cCI6MjA1NDA4NjgwOH0.Hyxd6Sy1qx9efwSX9mVa_AXQKXY8aUAYAyfrw1ifJj4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);