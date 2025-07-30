import type { NextRequest } from "next/server";
import type { ApiElevatedBody } from "@/lib/vns";
import { NextResponse } from "next/server";
import { getHighestVotedOperator } from "@/app/api/operator/utils/operator-utils";
import { elevatedSupabase } from "@/lib/supabase/elevated-client";

/**
 * Delete operator with highest votes.
 *
 * @param request The request body.
 * @returns The deleted operator.
 */
export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json() as ApiElevatedBody;

        if (!body.token || body.token !== process.env.SECRET_CODE) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Get the operator with highest vote count
        const highestVoted = await getHighestVotedOperator();

        // Add to banned_operators table
        const { data: bannedOperator, error: banError } = await elevatedSupabase
            .from("banned_operators")
            .insert({ id: highestVoted.charid })
            .select()
            .single();

        if (banError) {
            throw banError;
        }

        const { data: votes } = await elevatedSupabase
            .from("member_vote")
            .select("id");

        if (votes) {
            await elevatedSupabase.from("old_member_vote").insert(votes);
        }

        await elevatedSupabase
            .from("member_vote")
            .delete()
            .neq("vote_number", 0);

        return NextResponse.json(bannedOperator, { status: 201 });
    } catch (error) {
        console.error("Operator ban API error:", error);

        if (error instanceof Error && error.message === "No votes found") {
            return NextResponse.json(
                { error: "No votes found to ban" },
                { status: 412 }
            );
        }

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
