import { SupabaseClient } from "@supabase/supabase-js";

export async function saveRelations(supabase: SupabaseClient,
  gameId: number,
  table: "game_remakes" | "game_expansions" | "game_franchises",
  ids: number[]
) {
  if (!ids.length) return;

  await supabase
    .from(table)
    .upsert(ids.map(id => ({
      game_id: gameId,
      [`${table.split("_")[1]}_id`]: id
    })));
}
