import { Game, SearchGame, UpcomingGame } from "@/types/game";
import { RawCompany, RawCovers, RawGame, RawInvolvedCompany, RawScreenshots, RawVideo, ResolvedCompany } from "@/types/igdb";

const BASE_URL = "https://api.igdb.com/v4";

async function igdbFetch(endpoint: string, body: string) {
    const res = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "POST",
        headers: {
            "Client-ID": process.env.TWITCH_CLIENT_ID!,
            Authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN!}`,
            Accept: "application/json",
            "Content-Type": "text/plain",
        },
        body,
    });
    if (res.status === 429) {
        throw new Error("Rate limit exceeded");
    }
    return res.json();
}

// Funciones auxiliares para resolver relaciones

// A partir de una lista de IDs de videos, obtener sus URLs completas
async function resolveVideos(videoIds: number[]): Promise<{ id: number, video_id: string }[]> {
    if (!videoIds?.length) return [];
    const body = `fields video_id; where id = (${videoIds.join(',')});`;
    const videos = await igdbFetch("game_videos", body);
    return videos.map((v: RawVideo) => (
        { id: v.id, video_id: v.video_id }
    ));
}

// A partir de una lista de IDs de screenshots, obtener sus URLs completas
async function resolveScreenshots(screenshotIds: number[]): Promise<{ id: number, url: string }[]> {
    if (!screenshotIds?.length) return [];
    const body = `fields image_id; where id = (${screenshotIds.join(',')});`;
    const screenshots = await igdbFetch("screenshots", body);
    return screenshots.map((s: RawScreenshots) => (
        { id: s.id, url: `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${s.image_id}.jpg` }
    ));
}

// A partir de una lista de IDs de compañías, obtener sus nombres y roles
async function resolveCompanies(involvedCompanyIds: number[]): Promise<ResolvedCompany[]> {
    if (!involvedCompanyIds?.length) return [];

    // 1) Obtener los involved_companies
    const bodyInvolved = `
        fields company, developer, publisher, supporting;
        where id = (${involvedCompanyIds.join(',')});
    `;
    const involved: RawInvolvedCompany[] = await igdbFetch("involved_companies", bodyInvolved);

    // 2) IDs reales de compañías
    const companyIds = [...new Set(involved.map((ic) => ic.company))];

    // 3) Obtener nombres de compañías
    const bodyCompanies = `
        fields name;
        where id = (${companyIds.join(',')});
    `;
    const companies: RawCompany[] = await igdbFetch("companies", bodyCompanies);

    const companyMap = new Map<number, string>(
        companies.map((c) => [c.id, c.name])
    );

    // 4) Combinar roles + nombre
    return involved.map((ic): ResolvedCompany => ({
        id: ic.company,
        name: companyMap.get(ic.company) ?? "Unknown",
        role:
            ic.developer ? "developer" :
                ic.publisher ? "publisher" :
                    ic.supporting ? "supporting" :
                        "unknown",
    }));
}


// A partir de una lista de IDs de covers, obtener sus URLs completas
async function resolveCover(coverID?: number): Promise<{ id: number; url: string }> {
    if (!coverID) return { id: 0, url: "" };
    const body = `fields image_id; where id = ${coverID};`;
    const covers = await igdbFetch("covers", body);
    const c: RawCovers = covers[0];
    return { id: c.id, url: `https://images.igdb.com/igdb/image/upload/t_cover_big/${c.image_id}.jpg` };
}

// A partir de una lista de IDs de plataformas, obtener sus nombres
async function resolvePlatforms(platformIds?: number[]): Promise<{ id: number; name: string }[]> {
    if (!platformIds?.length) return [];
    const body = `fields name; where id = (${platformIds.join(',')});`;
    const platforms = await igdbFetch("platforms", body);
    return platforms.map((p: { id: number; name: string }) => ({ id: p.id, name: p.name }));
}

async function resolveFranchises(franchiseIds?: number[]): Promise<{ id: number; name: string }[]> {
    if (!franchiseIds?.length) return [];
    const body = `fields id, name; where id = (${franchiseIds.join(',')});`;
    const franchises = await igdbFetch("franchises", body);
    return franchises.map((f: { id: number; name: string }) => ({ id: f.id, name: f.name }));
}


// Funciónes

//Obtener un juego por su ID
export async function getGameById(id: number): Promise<Game | null> {
    const body = `
    fields name, slug, summary, first_release_date, rating, total_rating, hypes,
           cover, genres, platforms, involved_companies, screenshots, videos, parent_game,
           remakes, expansions, dlcs, remasters, standalone_expansions, franchises, updated_at, game_type;
    where id = ${id};
  `;

    const games = await igdbFetch("games", body);
    if (!games.length) return null;

    const raw = games[0];

    const [videos, screenshots, companies, cover, platforms, franchises] = await Promise.all([
        resolveVideos(raw.videos),
        resolveScreenshots(raw.screenshots),
        resolveCompanies(raw.involved_companies),
        resolveCover(raw.cover),
        resolvePlatforms(raw.platforms),
        resolveFranchises(raw.franchises)
    ]);

    const game: Game = {
        id: raw.id,
        name: raw.name,
        slug: raw.slug,
        summary: raw.summary ?? "",
        first_release_date: new Date(raw.first_release_date * 1000).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }),
        rating: raw.rating ?? 0,
        total_rating: raw.total_rating ?? 0,
        hypes: raw.hypes,
        cover: cover,
        genres: raw.genres?.map((gId: number) => ({ id: gId, name: "" })) || [],
        platforms: platforms,
        companies: companies ?? [],
        screenshots: screenshots ?? [],
        videos: videos ?? [],
        parent_game: raw.parent_game,
        remakes: raw.remakes ?? [],
        expansions: raw.expansions ?? [],
        dlcs: raw.dlcs ?? [],
        remasters: raw.remasters ?? [],
        standalone_expansions: raw.standalone_expansions ?? [],
        franchises: franchises ?? [],
        updated_at: new Date(raw.updated_at * 1000).toUTCString(),
        game_type: raw.game_type
    };

    return game;
}

export async function getPartialGameById(id: number): Promise<SearchGame | null> {
    const body = `
    where id = ${id};
    fields id, name, slug, first_release_date, cover, updated_at;
    limit 1;
  `;

    const rawGames = await igdbFetch("games", body);
    if (!rawGames?.length) return null;

    const raw = rawGames[0];
    const cover = await resolveCover(raw.cover);

    const game: SearchGame = {
        id: raw.id,
        name: raw.name,
        slug: raw.slug,
        first_release_date: raw.first_release_date
            ? new Date(raw.first_release_date * 1000).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })
            : null,
        cover,
        updated_at: new Date(raw.updated_at * 1000).toUTCString()
    };

    return game;
}

// Obtener los 20 juegos mas populares que tengan un lanzamiento en los proximos 3 meses
export async function getUpcomingPopularGames(): Promise<Game[]> {
    const now = Math.floor(Date.now() / 1000);
    const threeMonths = 3 * 30 * 24 * 60 * 60;
    const future = now + threeMonths;

    const body = `
        fields name, slug, hypes, cover, first_release_date;
        where first_release_date >= ${now} & first_release_date <= ${future} & hypes != null & hypes > 0 & game_type = (0,1,2,4,8,9);
        sort hypes desc;
        limit 14;
    `;

    const rawGames = await igdbFetch("games", body);
    if (!rawGames?.length) return [];

    const games: Game[] = await Promise.all(
        rawGames.map(async (raw: RawGame) => {
            const cover = await resolveCover(raw.cover);

            return {
                id: raw.id,
                name: raw.name,
                cover,
            } as UpcomingGame;
        })
    );


    return games;
}

// Buscar juegos por nombre
export async function searchGames(search: string): Promise<Game[]> {
    const body = `
    search "${search}";
    where game_type = (0,1,2,4,8,9);
    fields id, name, slug, first_release_date, cover, updated_at;
    limit 10;
  `;

    const rawGames = await igdbFetch("games", body);
    if (!rawGames?.length) return [];

    const games: Game[] = await Promise.all(
        rawGames.map(async (raw: RawGame) => {
            const cover = await resolveCover(raw.cover);
            return {
                id: raw.id,
                name: raw.name,
                slug: raw.slug,
                first_release_date: raw.first_release_date
                    ? new Date(raw.first_release_date * 1000).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })
                    : null,
                cover,
                updated_at: new Date(raw.updated_at * 1000).toUTCString()
            } as SearchGame;
        })
    );

    return games;
}

/**
 * Obtiene todos los géneros disponibles de IGDB
 * @returns Una promesa que resuelve a una lista de géneros con sus IDs, nombres y timestamps de actualización
 */
export async function getGenres(): Promise<{ id: number, name: string, updated_at: number }[]> {
    const body = `fields id, name, updated_at; limit 500;`;
    const genres = await igdbFetch("genres", body);
    return genres.map((g: { id: number, name: string, updated_at: number }) => (
        { id: g.id, name: g.name, updated_at: g.updated_at }
    ));
}
