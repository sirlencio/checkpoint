import { Game } from "@/types/game";
import { SupabaseClient } from "@supabase/supabase-js";

export async function buildFullGameFromDB(supabase: SupabaseClient, id: number): Promise<Game | null> {
  // ===========================
  // 1. Game principal
  // ===========================
  const { data: game, error } = await supabase
    .from("games")
    .select("*")
    .eq("id", id)
    .single();

  if (!game) return null;

  // ===========================
  // 2. Géneros
  // ===========================
  const { data: genres } = await supabase
    .from("genres")
    .select("id, name, game_genres!inner(game_id)")
    .eq("game_genres.game_id", id);

  const formattedGenres =
    genres?.map((g) => ({ id: g.id, name: g.name })) ?? [];

  // ===========================
  // 3. Plataformas
  // ===========================
  const { data: platforms } = await supabase
    .from("platforms")
    .select("id, name, game_platforms!inner(game_id)")
    .eq("game_platforms.game_id", id);

  const formattedPlatforms =
    platforms?.map((p) => ({ id: p.id, name: p.name })) ?? [];

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
  const { data: media } = await supabase
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

  // ===========================
  // 6. Relaciones extra
  // ===========================
  const { data: remakes } = await supabase
    .from("game_remakes")
    .select("remake_id")
    .eq("game_id", id);

  const { data: expansions } = await supabase
    .from("game_expansions")
    .select("expansion_id")
    .eq("game_id", id);

  const { data: franchises } = await supabase
    .from("game_franchises")
    .select("franchise_id")
    .eq("game_id", id);


  return {
    id: game.id,
    name: game.name,
    slug: game.slug,
    summary: game.summary ?? "",
    storyline: game.storyline ?? "",
    first_release_date: game.first_release_date
      ? new Date(game.first_release_date).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : null,
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
  };
}
