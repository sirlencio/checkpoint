import { getUpcomingPopularGames } from "@/lib/igdb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const games = await getUpcomingPopularGames();

        return NextResponse.json(games);
    } catch (err: unknown) {
        const message =
            err instanceof Error ? err.message : "Error desconocido";

        if (message === "Rate limit exceeded") {
            return new NextResponse(
                JSON.stringify({ error: "Rate limit exceeded" }),
                { status: 429 }
            );
        }

        return new NextResponse(
            JSON.stringify({ error: message }),
            { status: 500 }
        );
    }
}
