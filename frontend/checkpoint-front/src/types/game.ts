export interface Game {
    id: number;
    name: string;
    slug: string;
    summary?: string;
    storyline?: string;
    first_release_date?: string;
    rating?: number;
    total_rating?: number;

    cover_url?: string;
    release_year?: number;
}