export interface Game {
  id: number;
  name: string;
  slug: string;
  summary: string;
  storyline: string;
  first_release_date: string;
  rating: number;
  total_rating: number;
  hypes?: number;
  cover: { id: number; url: string };
  genres: { id: number; name: string }[];
  platforms: { id: number; name: string }[];
  companies: { id: number; name: string; role: string }[];
  screenshots: { id: number; url: string }[];
  videos: { id: number; video_id: string }[];
  remakes: number[];
  expansions: number[];
  franchises: number[];
}
