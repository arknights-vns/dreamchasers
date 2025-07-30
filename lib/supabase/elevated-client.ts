import type { Terra } from "@/lib/supabase/terra";
import { createClient } from "@supabase/supabase-js";
/**
 * An **ELEVATED** Supabase instance.
 *
 * Use this when you are dying inside from RLS
 * and you are ***explicitly*** instructed by Đụt.
 *
 * Otherwise, prepare to get roasted hard.
 */
export const elevatedSupabase = createClient<Terra>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);
