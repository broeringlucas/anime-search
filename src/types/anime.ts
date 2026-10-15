export interface AnimeTitle {
  romaji: string;
  english: string | null;
}

export interface FuzzyDate {
  year: number | null;
  month: number | null;
  day: number | null;
}

export interface AnimeSummary {
  id: number;
  title: AnimeTitle;
  coverImage: {
    large: string;
  };
}

export type MediaStatus =
  | "FINISHED"
  | "RELEASING"
  | "NOT_YET_RELEASED"
  | "CANCELLED"
  | "HIATUS";

export interface AnimeDetail {
  id: number;
  title: AnimeTitle;
  coverImage: {
    extraLarge: string;
  };
  startDate: FuzzyDate;
  endDate: FuzzyDate;
  description: string | null;
  episodes: number | null;
  format: string | null;
  status: MediaStatus | null;
  averageScore: number | null;
  popularity: number | null;
  genres: string[];
  studios: {
    nodes: { name: string }[];
  };
  staff: {
    edges: {
      role: string;
      node: { name: { full: string } };
    }[];
  };
  rankings: {
    rank: number;
    type: "RATED" | "POPULAR";
    allTime: boolean;
  }[];
  trailer: {
    id: string;
    site: string;
  } | null;
}
