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

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error searching games" }, { status: 500 });
  }
}
