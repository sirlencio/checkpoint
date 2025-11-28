export interface RawVideo {
    id: number;
    video_id: string;
}

export interface RawScreenshots {
    id: number;
    image_id: string;
}

export interface RawInvolvedCompany {
    id: number;
    company: number;          // ID real de la compañía (tabla companies)
    developer?: boolean;
    publisher?: boolean;
    supporting?: boolean;
}

export interface RawCompany {
    id: number;
    name: string;
}

export interface ResolvedCompany {
    id: number;
    name: string;
    role: "developer" | "publisher" | "supporting" | "unknown";
}

export interface RawCovers {
    id: number;
    image_id: string;
}

export interface RawGame {
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
    updated_at: number;
}
