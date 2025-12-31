import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://odizfzxiuweblftjhefa.supabase.co";
const supabaseKey = "sb_publishable_nOdmBNtFR96sNvGriZyMHw_NnHdmiz0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
