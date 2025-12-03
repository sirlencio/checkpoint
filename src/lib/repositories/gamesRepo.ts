import { SupabaseClient } from "@supabase/supabase-js";

export async function getGameRow(supabase: SupabaseClient, id: number) {
    const { data, error } = await supabase
        .from("games")
        .select("*")
        .eq("id", id)
        .single();

    if (error) console.log(error);

    return data;
}

export async function searchGame(supabase: SupabaseClient, name: string) {
    const { data, error } = await supabase
        .from("games")
        .select(`
      id,
      name,
      slug,
      first_release_date,
      updated_at,
      cover:media!inner (
        id,
        url,
        type
      )
    `)
        .ilike("name", `%${name}%`)
        .eq("media.type", "cover")
        .limit(10);

    if (error) console.log(error);

    return data;
}


export async function upsertGame(supabase: SupabaseClient, game: {
    id: number,
    name: string,
    slug: string,
    summary?: string,
    first_release_date?: string | null,
    rating?: number | null,
    total_rating?: number | null,
    updated_at: string,
    is_completed: boolean,
}) {
    const { data, error } = await supabase
        .from("games")
        .upsert(game);

    if (error) console.log(error);

    return data;
}

export async function upsertPartialGame(
    supabase: SupabaseClient,
    game: {
        id: number;
        name: string;
        slug: string;
        first_release_date: string | null;
        updated_at: string;
    }
) {
    const { data, error } = await supabase.from("games").upsert({
        id: game.id,
        name: game.name,
        slug: game.slug,
        first_release_date: game.first_release_date,
        is_completed: false,
        updated_at: game.updated_at,
    });

    if (error) console.log(error);

    return data;
}

