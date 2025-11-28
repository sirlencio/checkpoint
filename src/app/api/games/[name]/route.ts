import { NextRequest, NextResponse } from "next/server";
import { searchGames } from "@/lib/igdb";
import { searchGame, upsertPartialGame } from "@/lib/repositories/gamesRepo";
import { createClient } from "@/utils/supabase/server";
import { insertMedia } from "@/lib/repositories/mediaRepo";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const supabase = await createClient();

  try {
    const { name } = await params;
    if (!name) return NextResponse.json({ error: "No search term provided" }, { status: 400 });

    // 1. Buscar en DB y en IGDB
    const { data: gamesInDB } = await searchGame(supabase, name);
    const dbGames = gamesInDB ?? [];
    const IGDBgames = await searchGames(name);

    // 2. Filtrar los juegos que ya están en DB
    const dbIds = new Set(dbGames.map(g => g.id));
    const missingGames = IGDBgames.filter(game => !dbIds.has(game.id));

    // 3. Insertar los juegos faltantes en DB
    await Promise.all(
      missingGames.map(async (g) => {
        await upsertPartialGame(supabase, {
          id: g.id,
          name: g.name,
          slug: g.slug,
          first_release_date: g.first_release_date ?? null,
          updated_at: g.updated_at ?? new Date().toISOString(),
        });

        // Insertar cover si existe
        if (g.cover?.id && g.cover?.url) {
          await insertMedia(supabase, g.id, [
            { id: g.cover.id, type: "cover", url: g.cover.url },
          ]);
        }
      })
    );

    // 4. Devolver todos los juegos encontrados
    const { data: allGamesInDB } = await searchGame(supabase, name);

    // Transformar cover de array a objeto
    const gamesWithCover = (allGamesInDB ?? []).map(game => ({
      ...game,
      cover: game.cover?.[0] ?? null
    }));


    return NextResponse.json(gamesWithCover);

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
