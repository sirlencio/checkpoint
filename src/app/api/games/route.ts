import { NextRequest, NextResponse } from "next/server";
import { searchGames } from "@/lib/igdb";

export async function GET(req: NextRequest) {
  try {
    const search = req.nextUrl.searchParams.get("search");
    console.log("Search term:", search);

    if (!search) return NextResponse.json({ error: "No search term provided" }, { status: 400 });

    const games = await searchGames(search);
    return NextResponse.json(games);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error searching games" }, { status: 500 });
  }
}
