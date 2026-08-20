/**
 * Domain types for MoFlixx — TMDB API shapes + shared app types.
 * Replacing scattered `any` with these gives us type safety end-to-end.
 */

// ---------- Core media ----------

export interface MediaBase {
  id: number;
  backdrop_path: string | null;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  popularity: number;
  original_language: string;
}

export interface MovieSummary extends MediaBase {
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
}

export interface SeriesSummary extends MediaBase {
  name: string;
  original_name: string;
  first_air_date: string;
}

export type TrendingItem = MovieSummary | SeriesSummary;

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface MovieDetail extends MovieSummary {
  genres: Genre[];
  production_countries: ProductionCountry[];
  runtime: number;
  status: string;
  budget: number;
  revenue: number;
  tagline: string;
  homepage: string | null;
  backdrop_path: string | null;
}

export interface SeriesDetail extends SeriesSummary {
  genres: Genre[];
  production_countries: ProductionCountry[];
  status: string;
  tagline: string;
  homepage: string | null;
  episode_run_time: number[];
  networks: { id: number; name: string; logo_path: string | null }[];
  seasons: SeriesSeason[];
  type: string;
  next_episode_to_air: EpisodeAir | null;
  last_episode_to_air: EpisodeAir | null;
}

export interface SeriesSeason {
  id: number;
  name: string;
  poster_path: string | null;
  overview: string;
  air_date: string;
  vote_average: number;
  episode_count: number;
  season_number: number;
}

export interface EpisodeAir {
  id: number;
  name: string;
  air_date: string;
  episode_number: number;
  season_number: number;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  department: string;
  job: string;
  profile_path: string | null;
}

export interface Credits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface Keyword {
  id: number;
  name: string;
}

export interface ExternalIds {
  id: number;
  facebook_id: string | null;
  twitter_id: string | null;
  instagram_id: string | null;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface Review {
  author: string;
  author_details: {
    avatar_path: string | null;
    rating: number | null;
  };
  content: string;
  created_at: string;
}

export interface Paginated<T> {
  page: number;
  total_pages: number;
  total_results: number;
  results: T[];
}

// ---------- Person ----------

export interface PersonDetail {
  id: number;
  name: string;
  profile_path: string | null;
  biography: string;
  birthday: string | null;
  place_of_birth: string | null;
  gender: number;
  known_for_department: string;
  also_known_as: string[];
}

export interface PersonCreditCast {
  id: number;
  title?: string;
  name?: string;
  original_name?: string;
  character?: string;
  release_date?: string;
  first_air_date?: string;
  media_type?: string;
  poster_path?: string | null;
}

export interface PersonCredit {
  cast: PersonCreditCast[];
  crew: CrewMember[];
}

// ---------- Auth ----------

export interface LoginPayload {
  username: string;
  password: string;
}

export interface AccountDetail {
  id: number;
  name: string;
  username: string;
  iso_639_1: string;
  iso_3166_1: string;
  include_adult: boolean;
  avatar: {
    gravatar: { hash: string | null };
    tmdb: { avatar_path: string | null };
  };
}

// ---------- Shared query hook options ----------

export type MediaType = "movie" | "tv";

export interface QueryOptions<TPayload> {
  payload?: TPayload;
  onSuccess?: () => void;
  onError?: (err: unknown) => void;
  enabled?: boolean;
  type?: MediaType;
}

export type SearchPayload = {
  keyword?: string;
  adult?: boolean;
  page?: number;
};

// ---------- Shared component props ----------

export interface DetailViewProps {
  isLoading: boolean;
  id: string | string[];
  castingList?: Credits;
  externalIds?: ExternalIds;
  movieKeywords?: Keyword[];
}

