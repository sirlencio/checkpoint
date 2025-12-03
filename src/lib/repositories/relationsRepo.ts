import { SupabaseClient } from "@supabase/supabase-js";

export async function saveRelations(supabase: SupabaseClient,
  gameId: number,
  relations: { id: number; type: string }[]
) {
  if (!relations.length) return;
  const { error } = await supabase
    .from("game_relations")
    .upsert(
      relations.map(rel => ({
        game_id: gameId,
        related_id: rel.id,
        type: rel.type
      }))
    );
  if (error) {
    console.log(error)
  }

}

