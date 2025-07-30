import type { ContestantInfo } from "@/lib/vns";
import { google } from "googleapis";
import { NextResponse } from "next/server";

/**
 * Get all contestant scores.
 *
 * @returns Contestant scores, sorted descending.
 */
export async function GET() {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
            client_email: process.env.GOOGLE_CLIENT_EMAIL
        },
        scopes: [
            "https://www.googleapis.com/auth/spreadsheets"
        ]
    });

    const sheets = google.sheets({
        auth,
        version: "v4"
    });

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: process.env.GOOGLE_SHEET_RANGE
    });

    let data: ContestantInfo[] = [];

    response.data.values!.forEach((x) => {
        data.push({
            number: Number.parseInt(x[0]),
            name: x[1],
            score: Number.parseFloat(x[15]),
            rank: Number.parseInt(x[16])
        });
    });

    data = data.filter(x => !Number.isNaN(x.number));
    data = data.sort((a, b) => b.score - a.score);

    return NextResponse.json(
        { message: data },
        { status: 200 }
    );
}
