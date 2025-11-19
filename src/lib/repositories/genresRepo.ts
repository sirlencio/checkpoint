import { SupabaseClient } from "@supabase/supabase-js";

export async function upsertGenres(supabase: SupabaseClient, genres: { id: number, name: string }[]) {
    if (!genres.length) return;
    await supabase.from("genres").upsert(genres);
}

export async function linkGameGenres(supabase: SupabaseClient, gameId: number, genreIds: number[]) {
    if (!genreIds.length) return;
    const rows = genreIds.map(id => ({ game_id: gameId, genre_id: id }));
    await supabase.from("game_genres").upsert(rows);
}
