import { SupabaseClient } from "@supabase/supabase-js";

export async function upsertPlatforms(supabase: SupabaseClient, platforms: { id: number, name: string }[]) {
  if (!platforms.length) return;
  await supabase.from("platforms").upsert(platforms);
}

export async function linkGamePlatforms(supabase: SupabaseClient, gameId: number, platformIds: number[]) {
  if (!platformIds.length) return;
  await supabase
    .from("game_platforms")
    .upsert(platformIds.map(id => ({ game_id: gameId, platform_id: id })));
}
