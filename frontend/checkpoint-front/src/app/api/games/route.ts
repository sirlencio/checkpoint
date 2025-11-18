import { NextResponse } from "next/server";
import { MOCK_GAMES } from "@/mocks/data/games";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const genre = url.searchParams.get("genre");
  const limit = url.searchParams.get("limit");
  const id = url.searchParams.get("id");
  const search = url.searchParams.get("search");

  let games = [...MOCK_GAMES];

  if (id) {
    games = games.filter((g) => g.id === Number(id));
  }

  if (search) {
    const lower = search.toLowerCase();
    games = games.filter((g) =>
      g.name.toLowerCase().includes(lower)
    );
  }

  if (genre) {
    games = games.filter((g) =>
      g.genres.some((x) => x.name.toLowerCase() === genre.toLowerCase())
    );
  }

  if (limit) {
    games = games.slice(0, Number(limit));
  }

  return NextResponse.json(games);
}
