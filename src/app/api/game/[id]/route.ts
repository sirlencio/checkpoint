import { NextRequest, NextResponse } from "next/server";
import { getGameById, getPartialGameById } from "@/lib/igdb";
import { getGameRow, upsertGame, upsertPartialGame } from "@/lib/repositories/gamesRepo";
import { linkGameGenres } from "@/lib/repositories/genresRepo";
import { upsertPlatforms, linkGamePlatforms } from "@/lib/repositories/platformsRepo";
import { upsertCompanies, linkCompanies } from "@/lib/repositories/companiesRepo";
import { insertMedia } from "@/lib/repositories/mediaRepo";
import { saveRelations } from "@/lib/repositories/relationsRepo";
import { isStale } from "@/utils/isStale";
import { buildFullGameFromDB } from "@/lib/repositories/buildFullGameFromDB";
import { createClient } from "@/utils/supabase/adminServer";
import { linkFranchises, upsertFranchises } from "@/lib/repositories/franchiseRepo";

const GAME_TYPES = [
  {
    id: 0, type: "Main Game"
  },
  {
    id: 1, type: "DLC"
  },
  {
    id: 2, type: "Expansion"
  },
  {
    id: 4, type: "Standalone Expansion"
  },
  {
    id: 8, type: "Remake"
  },
  {
    id: 9, type: "Remaster"
  },
]

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  try {
    // 1. Buscar en DB
    const { data: gameInDB } = await getGameRow(supabase, id);

    // 2. Si existe, comprobar si está completo
    if (gameInDB) {
      if (gameInDB.is_completed && !isStale(gameInDB.updated_at)) {
        // Juego completo y no stale -> devolver desde DB
        const enriched = await buildFullGameFromDB(supabase, id);
        return NextResponse.json(enriched);
      }
    }

    // 3. Si no existe o no está completo -> fetch IGDB
    const game = await getGameById(id);
    if (!game) return NextResponse.json({ error: "Game not found" }, { status: 404 });

    // Si tiene parent_game, asegurarse de que está en la DB (tanto el padre como la relación)
    if (game.parent_game) {
      const typeObj = GAME_TYPES.find(gt => gt.id === game.game_type);
      const type = typeObj ? typeObj.type : "unknown";

      const parentGame = await getPartialGameById(game.parent_game);
      if (parentGame) {
        await upsertPartialGame(supabase, parentGame);
        await saveRelations(supabase, game.parent_game, [{ id: game.id, type }]);
      }
    }

    // 4. Guardar/actualizar datos principales
    await upsertGame(supabase, {
      id: game.id,
      name: game.name,
      slug: game.slug,
      summary: game.summary,
      first_release_date: game.first_release_date,
      rating: game.rating,
      total_rating: game.total_rating,
      is_completed: true,
      updated_at: game.updated_at,
    });

    // 5. Guardar relaciones con géneros
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
      ...game.videos.map(v => ({ id: v.id, type: "video", url: v.video_id })),
    ];
    await insertMedia(supabase, id, allMedia);

    // 9. Franchises
    await upsertFranchises(supabase, game.franchises);
    await linkFranchises(supabase, id, game.franchises);

    // 10. Relaciones con otros juegos
    const relations: { id: number; type: string }[] = [];

    game.expansions?.forEach(expId => relations.push({ id: expId, type: "expansion" }));
    game.remakes?.forEach(rmkId => relations.push({ id: rmkId, type: "remake" }));
    game.dlcs?.forEach(dlcId => relations.push({ id: dlcId, type: "dlc" }));
    game.remasters?.forEach(remasterId => relations.push({ id: remasterId, type: "remaster" }));
    game.standalone_expansions?.forEach(stndAloneId => relations.push({ id: stndAloneId, type: "standalone_expansion" }));

    await Promise.all(relations.map(async rel => {
      const relatedGame = await getPartialGameById(rel.id);
      if (relatedGame) await upsertPartialGame(supabase, relatedGame);
    }));

    if (relations.length) {
      await saveRelations(supabase, id, relations);
    }

    // 11. Reconstruir desde DB
    const fullGame = await buildFullGameFromDB(supabase, id);

    return NextResponse.json(fullGame);

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error desconocido";

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
