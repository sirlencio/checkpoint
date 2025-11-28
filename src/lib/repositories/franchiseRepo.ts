import { SupabaseClient } from "@supabase/supabase-js";

export async function upsertFranchises(supabase: SupabaseClient, franchises: { id: number; name: string }[]) {
    if (!franchises.length) return;
    await supabase.from("franchises").upsert(franchises);
}

export async function linkFranchises(supabase: SupabaseClient, gameId: number, franchiseIds: { id: number; name: string }[]) {
    if (!franchiseIds.length) return;

    await supabase
        .from("game_franchises")
        .upsert(
            franchiseIds.map(f => ({
                game_id: gameId,
                franchise_id: f.id
            })),
            { onConflict: "game_id,franchise_id" }
        );
}
