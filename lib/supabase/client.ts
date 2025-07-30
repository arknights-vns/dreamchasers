import type { Terra } from "@/lib/supabase/terra";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient<Terra>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
