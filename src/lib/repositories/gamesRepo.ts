import { SupabaseClient } from "@supabase/supabase-js";

export async function getGameRow(supabase: SupabaseClient, id: number) {
    return await supabase
        .from("games")
        .select("*")
        .eq("id", id)
        .single();
}

export async function upsertGame(supabase: SupabaseClient, game: {
    id: number,
    name: string,
    slug: string,
    summary?: string,
    first_release_date?: string | null,
    rating?: number | null,
    total_rating?: number | null,
}) {
    return await supabase
        .from("games")
        .upsert({
            ...game,
            updated_at: new Date().toISOString()
        });
}
