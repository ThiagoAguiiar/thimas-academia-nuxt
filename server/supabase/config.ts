import { createClient } from "@supabase/supabase-js";

export const createInstance = () => {
  const runtime = useRuntimeConfig();
  const url = "https://hobygydkvuueavhuqjsv.supabase.co";

  const supabase = createClient(url, runtime.public.supabaseAccessKey);

  return supabase;
};
