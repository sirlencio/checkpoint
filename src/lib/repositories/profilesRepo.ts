import { SupabaseClient } from "@supabase/supabase-js";

export async function getProfileWithUsername(supabase: SupabaseClient, username: string) {
    if (!username) return;
    try {
        const { data, error } = await supabase.from("profiles")
            .select(`
                *,
                user_games (
                    status,
                    start_date,
                    end_date,
                    games (
                        id,
                        name,
                        slug,
                        summary,
                        first_release_date
                    )
                )
            `)
            .eq("username", username)
            .single();
        if (error) throw error;
        return data;
    } catch (error) {
        console.error(error)
    }

}

export async function getProfileWithId(supabase: SupabaseClient, id: string) {
    if (!id) return;
    try {
        const { data, error } = await supabase.from("profiles")
            .select("*")
            .eq("id", id)
            .single();
        if (error) throw error;
        return data;
    } catch (error) {
        console.error(error)
    }
}

export async function getEmailWithUsername(supabase: SupabaseClient, username: string) {
    if (!username) return;
    try {
        const { data, error } = await supabase.from("profiles")
            .select("email")
            .eq("username", username)
            .single();
        if (error) throw error;
        return data.email as string;
    } catch (error) {
        console.error(error)
        return undefined;
    }
}

