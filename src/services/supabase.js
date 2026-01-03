import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://jykyixyislzbjdvnrbqc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5a3lpeHlpc2x6Ympkdm5yYnFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0MDAzNjAsImV4cCI6MjA4Mjk3NjM2MH0.Zc_ZCM1mvPZ2QdFRqCxs2MA1foSSKL85wYFEZ-hs1no";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
