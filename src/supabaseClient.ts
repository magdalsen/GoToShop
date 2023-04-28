import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://llhsvhuwwzuwbaulprka.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsaHN2aHV3d3p1d2JhdWxwcmthIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI2NzQ1OTgsImV4cCI6MTk5ODI1MDU5OH0.IRpdo2P2AOLGQWEdi8lKhDJs6B-DMoJSYEcFe_nIYIo'

export const supabase = createClient(supabaseUrl, supabaseKey)