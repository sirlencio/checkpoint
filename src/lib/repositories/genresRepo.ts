import { SupabaseClient } from "@supabase/supabase-js";

export async function upsertGenres(supabase: SupabaseClient, genres: { id: number, name: string, updated_at: string }[]) {
    if (!genres.length) return;
    const { error } = await supabase.from("genres").upsert(genres);
    if (error) console.log(error);
}

export async function linkGameGenres(supabase: SupabaseClient, gameId: number, genreIds: number[]) {
    if (!genreIds.length) return;
    const rows = genreIds.map(id => ({ game_id: gameId, genre_id: id }));
    const { error } = await supabase.from("game_genres").upsert(rows);
    if (error) console.log(error);
}
