import { NextRequest, NextResponse } from "next/server";
import { searchGames } from "@/lib/igdb";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;

    if (!name) return NextResponse.json({ error: "No search term provided" }, { status: 400 });

    const games = await searchGames(name);
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
