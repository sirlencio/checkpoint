export interface Game {
  id: number;
  name: string;
  slug: string;
  summary: string;
  first_release_date: string | null;
  rating: number;
  total_rating: number;
  hypes?: number;
  cover: { id: number; url: string } | null;
  genres: { id: number; name: string }[];
  platforms: { id: number; name: string }[];
  companies: { id: number; name: string; role: string }[];
  screenshots: { id: number; url: string }[];
  videos: { id: number; video_id: string }[];
  parent_game?: number;
  remakes: number[];
  expansions: number[];
  dlcs?: number[];
  remasters?: number[];
  standalone_expansions?: number[];
  franchises: { id: number; name: string }[];
  updated_at: string;
  game_type: number;
}

export interface UpcomingGame {
  id: number;
  name: string;
  slug: string;
  cover: { id: number; url: string } | null;
  updated_at: number;
}

export interface SearchGame {
  id: number;
  name: string;
  slug: string;
  first_release_date: string | null;
  cover: { id: number; url: string } | null;
  updated_at: string;
}