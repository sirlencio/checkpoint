import { NextRequest, NextResponse } from "next/server";
import { getGameById } from "@/lib/igdb";
import { getGameRow, upsertGame } from "@/lib/repositories/gamesRepo";
import { upsertGenres, linkGameGenres } from "@/lib/repositories/genresRepo";
import { upsertPlatforms, linkGamePlatforms } from "@/lib/repositories/platformsRepo";
import { upsertCompanies, linkCompanies } from "@/lib/repositories/companiesRepo";
import { insertMedia } from "@/lib/repositories/mediaRepo";
import { saveRelations } from "@/lib/repositories/relationsRepo";
import { isStale } from "@/utils/isStale";
import { buildFullGameFromDB } from "@/lib/repositories/buildFullGameFromDB";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  const {id} = await params;

  const supabase = await createClient();

  try {
    // 1. Buscar en DB
    const { data: gameInDB } = await getGameRow(supabase, id);

    // 2. Si existe y no está viejo -> reconstruir y devolver
    if (gameInDB && !isStale(gameInDB.updated_at)) {
      const enriched = await buildFullGameFromDB(supabase, id);
      return NextResponse.json(enriched);
    }
    
    // 3. Sino -> fetch IGDB
    const game = await getGameById(id);
    if (!game) return NextResponse.json({ error: "Game not found" }, { status: 404 });

    // 4. Guardar datos principales
    const a = await upsertGame(supabase,{
      id: game.id,
      name: game.name,
      slug: game.slug,
      summary: game.summary,
      first_release_date: game.first_release_date,
      rating: game.rating,
      total_rating: game.total_rating,
    });

    console.log(a)
    // 5. Guardar géneros
    await upsertGenres(supabase, game.genres);
    await linkGameGenres(supabase, id, game.genres.map(g => g.id));

    // 6. Plataformas
    await upsertPlatforms(supabase, game.platforms);
    await linkGamePlatforms(supabase, id, game.platforms.map(p => p.id));

    // 7. Compañías
    await upsertCompanies(supabase, game.companies);
    await linkCompanies(supabase, id, game.companies);

    // 8. Media (cover, screenshots, videos)
    const allMedia = [
      ...(game.cover?.id ? [{ id: game.cover.id, type: "cover", url: game.cover.url }] : []),
      ...game.screenshots.map(s => ({ id: s.id, type: "screenshot", url: s.url })),
      ...game.videos.map(v => ({ id: v.id, type: "video", url: v.video_id }))
    ];
    await insertMedia(supabase, id, allMedia);

    // 9. Relaciones extra
    await saveRelations(supabase, id, "game_remakes", game.remakes);
    await saveRelations(supabase, id, "game_expansions", game.expansions);
    await saveRelations(supabase, id, "game_franchises", game.franchises);

    // 10. Reconstruir desde DB
    const fullGame = await buildFullGameFromDB(supabase, id);

    return NextResponse.json(fullGame);

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
