import { createClient } from '@supabase/supabase-js';

const SUPABASE_PROJECT = "https://bqsazppttutzuvzwlqfv.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxc2F6cHB0dHV0enV2endscWZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxNTEzMTksImV4cCI6MjA1OTcyNzMxOX0.pGKHWe-g7Hhd1inqPL3f62pAWPv2JoPk-FmNlwqo5Ik";
const supabase = createClient(SUPABASE_PROJECT, SUPABASE_KEY);

export default supabase;