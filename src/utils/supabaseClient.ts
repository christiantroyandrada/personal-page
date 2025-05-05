import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://junlrwqpluysyicxdhdt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1bmxyd3FwbHV5c3lpY3hkaGR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0MzIwMjMsImV4cCI6MjA2MjAwODAyM30.fSSRUgWzmb_WaegB4zCw2S6F-oE3v6bn1Xqh-v8S5r0";
const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
});
export default supabase;