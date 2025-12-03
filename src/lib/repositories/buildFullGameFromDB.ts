import { Game } from "@/types/game";
import { SupabaseClient } from "@supabase/supabase-js";

export async function buildFullGameFromDB(supabase: SupabaseClient, id: number): Promise<Game | null> {
  // ===========================
  // 1. Game principal
  // ===========================
  const { data: game, error: errorMainGame } = await supabase
    .from("games")
    .select("*")
    .eq("id", id)
    .single();

  if (!game) return null;
  if (errorMainGame) console.log(errorMainGame);

  // ===========================
  // 2. Géneros
  // ===========================
  const { data: genres, error: errorGenres } = await supabase
    .from("genres")
    .select("id, name, game_genres!inner(game_id)")
    .eq("game_genres.game_id", id);

  const formattedGenres =
    genres?.map((g) => ({ id: g.id, name: g.name })) ?? [];

  if (errorGenres) console.log(errorGenres);
  // ===========================
  // 3. Plataformas
  // ===========================
  const { data: platforms, error: errorPlatforms } = await supabase
    .from("platforms")
    .select("id, name, game_platforms!inner(game_id)")
    .eq("game_platforms.game_id", id);

  const formattedPlatforms =
    platforms?.map((p) => ({ id: p.id, name: p.name })) ?? [];

  if (errorPlatforms) console.log(errorPlatforms);
  // ===========================
  // 4. Compañías
  // ===========================
  const { data: companies } = await supabase
    .from("companies")
    .select("id, name, involved_companies!inner(role, game_id)")
    .eq("involved_companies.game_id", id);

  const formattedCompanies =
    companies?.map((c) => ({
      id: c.id,
      name: c.name,
      role: c.involved_companies[0].role,
    })) ?? [];

  // ===========================
  // 5. Media (cover, screenshots, videos)
  // ===========================
  const { data: media, error: errorMedia } = await supabase
    .from("media")
    .select("*")
    .eq("game_id", id);

  let cover = null;
  const screenshots: { id: number; url: string }[] = [];
  const videos: { id: number; video_id: string }[] = [];

  media?.forEach((m) => {
    if (m.type === "cover") {
      cover = {
        id: m.id,
        url: m.url,
      };
    }
    if (m.type === "screenshot") {
      screenshots.push({
        id: m.id,
        url: m.url,
      });
    }
    if (m.type === "video") {
      videos.push({
        id: m.id,
        video_id: m.url,
      });
    }
  });

  if (errorMedia) console.log(errorMedia);

  // ===========================
  // 6. Relaciones extra
  // ===========================
  const { data: remakes, error: errorRemake } = await supabase
    .from("game_remakes")
    .select("remake_id")
    .eq("game_id", id);

  const { data: expansions,  error: errorExpansion} = await supabase
    .from("game_expansions")
    .select("expansion_id")
    .eq("game_id", id);

  const { data: franchises, error: errorFranchise } = await supabase
    .from("game_franchises")
    .select("franchise_id")
    .eq("game_id", id);

  if (errorRemake) console.log(errorRemake);
  if (errorExpansion) console.log(errorExpansion);
  if (errorFranchise) console.log(errorFranchise);

  return {
    id: game.id,
    name: game.name,
    slug: game.slug,
    summary: game.summary ?? "",
    first_release_date: game.first_release_date,
    rating: game.rating ?? null,
    total_rating: game.total_rating ?? 0,
    cover,
    genres: formattedGenres,
    platforms: formattedPlatforms,
    companies: formattedCompanies,
    screenshots,
    videos,
    remakes: remakes?.map((r) => r.remake_id) ?? [],
    expansions: expansions?.map((e) => e.expansion_id) ?? [],
    franchises: franchises?.map((f) => f.franchise_id) ?? [],
    updated_at: game.updated_at,
    game_type: game.game_type
  };
}
