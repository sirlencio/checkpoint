import { NextResponse } from "next/server";
import { MOCK_GAMES } from "@/mocks/data/games";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const genre = url.searchParams.get("genre");
  const limit = url.searchParams.get("limit");

  let games = [...MOCK_GAMES];

  if (genre) {
    games = games.filter(g =>
      g.genres.some(x => x.name.toLowerCase() === genre.toLowerCase())
    );
  }

  if (limit) {
    games = games.slice(0, Number(limit));
  }

  return NextResponse.json(games);
}
