import { createClient } from '@supabase/supabase-js';

const SUPABASE_PROJECT = "https://vvxoegwtbubegxlivhct.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2eG9lZ3d0YnViZWd4bGl2aGN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5ODgzMjMsImV4cCI6MjA2MjU2NDMyM30.DlWRKUpshrahJdLtDW19uWExUhf_vIjMUVO_-PDw_AM";
const supabase = createClient(SUPABASE_PROJECT, SUPABASE_KEY);

export default supabase;