import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getGenres } from "@/lib/igdb";
import { upsertGenres } from "@/lib/repositories/genresRepo";

export async function POST(req: NextRequest) {
    const supabase = await createClient();

    try {
        // 1. Traer géneros actuales de DB
        const { data: dbGenres, error: dbError } = await supabase.from("genres").select("*");
        if (dbError) throw dbError;

        const dbGenresMap = new Map(dbGenres?.map(g => [g.id, g]) || []);

        // 2. Traer géneros desde IGDB
        const igdbGenres = await getGenres();

        // 3. Comparar y filtrar por actualización
        const genresToUpsert = igdbGenres
            .filter(igdbG => {
                const local = dbGenresMap.get(igdbG.id);
                const igdbUpdated = Math.floor(igdbG.updated_at);
                const localUpdated = local ? Math.floor(new Date(local.updated_at).getTime() / 1000) : 0;
                return !local || igdbUpdated > localUpdated;
            })
            .map(g => ({
                id: g.id,
                name: g.name,
                updated_at: new Date(g.updated_at * 1000).toUTCString(),
            }));

        // 4. Guardar en DB
        if (genresToUpsert.length > 0) {
            await upsertGenres(supabase, genresToUpsert);
        }

        return NextResponse.json({ synced: genresToUpsert.length });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Error desconocido";
        console.error("Error sincronizando géneros:", message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
