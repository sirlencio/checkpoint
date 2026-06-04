import { SupabaseClient } from "@supabase/supabase-js";

export async function upsertPlatforms(supabase: SupabaseClient, platforms: { id: number, name: string }[]) {
  if (!platforms.length) return;
  const { error } = await supabase.from("platforms").upsert(platforms);
  if (error) console.log(error);
}

export async function linkGamePlatforms(supabase: SupabaseClient, gameId: number, platformIds: number[]) {
  if (!platformIds.length) return;
  const { error } = await supabase
    .from("game_platforms")
    .upsert(platformIds.map(id => ({ game_id: gameId, platform_id: id })));
  if (error) console.log(error);
}
