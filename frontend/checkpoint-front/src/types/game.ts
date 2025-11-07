export interface Game {
    id: number;
    name: string;
    slug: string;
    summary: string | null;
    storyline: string | null;
    first_release_date: string | null;
    rating: number | null;
    total_rating: number | null;

    cover: {
        id: number;
        url: string;
    };

    genres: {
        id: number;
        name: string;
    }[];

    platforms: {
        id: number;
        name: string;
    }[];

    companies: {
        id: number;
        name: string;
        role: "dev" | "publisher";
    }[];

    screenshots: {
        id: number;
        url: string;
    }[];

    videos: {
        id: number;
        url: string;
    }[];

    remakes: number[];
    expansions: number[];
    franchises: number[];
}
