import { SupabaseClient } from "@supabase/supabase-js";

export async function insertMedia(supabase: SupabaseClient, gameId: number, media: { id: number, type: string, url: string }[]) {
  if (!media.length) return;

  const rows = media.map(m => ({
    id: m.id,
    game_id: gameId,
    type: m.type,
    url: m.url
  }));

  await supabase.from("media").upsert(rows);
}