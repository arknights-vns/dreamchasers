"use client";

import { getProductionURL } from "@/app/web-config";
import { Button } from "@/components/ui/button";
import { createSupabase } from "@/lib/supabase/client";

export default function LoginPage() {
    const handleLogin = async () => {
        await createSupabase().auth.signInWithOAuth({
            provider: "discord",
            options: {
                redirectTo: `${getProductionURL()}/auth/callback?next=/dashboard`
            }
        });
    };

    return (
        <Button variant="default" onClick={handleLogin}>
            Login with Discord
        </Button>
    );
}
