import { Game, SearchGame, UpcomingGame } from "@/types/game";

const BASE_URL = "https://api.igdb.com/v4";

interface RawVideo {
    id: number;
    video_id: string;
}
interface RawScreenshots {
    id: number;
    image_id: string;
}
interface RawCompanies {
    id: number;
    name: string;
    role: string;
}
interface RawCovers {
    id: number;
    image_id: string;
}
interface RawGame {
    id: number;
    name: string;
    slug: string;
    summary?: string;
    storyline?: string;
    first_release_date: number;
    rating?: number;
    total_rating?: number;
    hypes?: number;
    cover?: number;
    genres?: number[];
    platforms?: number[];
    involved_companies?: number[];
    screenshots?: number[];
    videos?: number[];
    remakes?: number[];
    expansions?: number[];
    franchises?: number[];
}

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
async function resolveCompanies(companyIds: number[]): Promise<{ id: number, name: string, role: string }[]> {
    if (!companyIds?.length) return [];
    const body = `fields company.name, role; where id = (${companyIds.join(',')});`;
    const companies = await igdbFetch("involved_companies", body);
    return companies.map((c: RawCompanies) => (
        { id: c.id, name: c.name, role: c.role }
    ));
}

// A partir de una lista de IDs de covers, obtener sus URLs completas
async function resolveCover(coverID?: number): Promise<{ id: number; url: string }> {
    if (!coverID) return { id: 0, url: "" };
    const body = `fields image_id; where id = ${coverID};`;
    const covers = await igdbFetch("covers", body);
    const c: RawCovers = covers[0];
    return { id: c.id, url: `https://images.igdb.com/igdb/image/upload/t_cover_big/${c.image_id}.jpg` };
}

// A partir de una lista de IDs de géneros, obtener sus nombres
async function resolveGenres(genreIds?: number[]): Promise<{ id: number; name: string }[]> {
    if (!genreIds?.length) return [];
    const body = `fields name; where id = (${genreIds.join(',')});`;
    const genres = await igdbFetch("genres", body);
    return genres.map((g: { id: number; name: string }) => ({ id: g.id, name: g.name }));
}

// A partir de una lista de IDs de plataformas, obtener sus nombres
async function resolvePlatforms(platformIds?: number[]): Promise<{ id: number; name: string }[]> {
    if (!platformIds?.length) return [];
    const body = `fields name; where id = (${platformIds.join(',')});`;
    const platforms = await igdbFetch("platforms", body);
    return platforms.map((p: { id: number; name: string }) => ({ id: p.id, name: p.name }));
}



// Funciónes

//Obtener un juego por su ID
export async function getGameById(id: number): Promise<Game | null> {
    const body = `
    fields name, slug, summary, storyline, first_release_date, rating, total_rating,
           hypes, cover, genres, platforms, involved_companies, screenshots, videos,
           remakes, expansions, franchises;
    where id = ${id};
  `;

    const games = await igdbFetch("games", body);
    if (!games.length) return null;

    const raw = games[0];

    const [videos, screenshots, companies, cover, genres, platforms] = await Promise.all([
        resolveVideos(raw.videos || []),
        resolveScreenshots(raw.screenshots || []),
        resolveCompanies(raw.involved_companies || []),
        resolveCover(raw.cover),
        resolveGenres(raw.genres),
        resolvePlatforms(raw.platforms)
    ]);

    const game: Game = {
        id: raw.id,
        name: raw.name,
        slug: raw.slug,
        summary: raw.summary ?? "",
        storyline: raw.storyline ?? "",
        first_release_date: new Date(raw.first_release_date * 1000).toISOString(),
        rating: raw.rating ?? null,
        total_rating: raw.total_rating ?? 0,
        hypes: raw.hypes,
        cover,
        genres,
        platforms,
        companies,
        screenshots,
        videos,
        remakes: raw.remakes ?? [],
        expansions: raw.expansions ?? [],
        franchises: raw.franchises ?? [],
    };


    return game;
}

// Obtener los 20 juegos mas populares que tengan un lanzamiento en los proximos 3 meses
export async function getUpcomingPopularGames(): Promise<Game[]> {
    const now = Math.floor(Date.now() / 1000);
    const threeMonths = 3 * 30 * 24 * 60 * 60;
    const future = now + threeMonths;

    const body = `
        fields name, slug, summary, storyline, first_release_date, rating, total_rating,
               hypes, cover, genres, platforms, involved_companies, screenshots, videos,
               remakes, expansions, franchises;
        where first_release_date >= ${now} & first_release_date <= ${future} & hypes != null & hypes > 0;
        sort hypes desc;
        limit 20;
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
    fields name, slug, summary, storyline, first_release_date, rating, total_rating,
           hypes, cover, genres, platforms, involved_companies, screenshots, videos,
           remakes, expansions, franchises;
    limit 20;
  `;

    const rawGames = await igdbFetch("games", body);
    if (!rawGames?.length) return [];

    const games: Game[] = await Promise.all(
        rawGames.map(async (raw: RawGame) => {
            const [cover, genres, platforms] = await Promise.all([
                resolveCover(raw.cover),
                resolveGenres(raw.genres),
                resolvePlatforms(raw.platforms)
            ]);

            return {
                id: raw.id,
                name: raw.name,
                summary: raw.summary ?? "",
                rating: raw.rating ?? 0,
                cover,
                genres,
                platforms,
            } as SearchGame;
        })
    );

    return games;
}
