import { getUpcomingPopularGames } from "@/lib/igdb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const games = await getUpcomingPopularGames();

        return NextResponse.json(games);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Error al obtener el juego" },
            { status: 500 }
        );
    }
}
