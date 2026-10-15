import type { AnimeDetail, AnimeSummary } from "../types/anime";

const API_URL = "https://graphql.anilist.co";

interface GraphQLResponse<T> {
  data: T | null;
  errors?: { message: string }[];
}

export class ApiError extends Error {
  status: number | null;
  retryAfter: number | null;

  constructor(message: string, status: number | null, retryAfter: number | null = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.retryAfter = retryAfter;
  }
}

const getRetryAfter = (res: Response): number | null => {
  const reset = Number(res.headers.get("X-RateLimit-Reset"));
  if (!reset) return null;
  return Math.max(1, Math.ceil(reset - Date.now() / 1000));
};

const request = async <T>(
  query: string,
  variables: Record<string, unknown>,
  signal?: AbortSignal
): Promise<T> => {
  let res: Response;

  try {
    res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query, variables }),
      signal,
    });
  } catch (error) {
    if (signal?.aborted) throw error;
    throw new ApiError("Network error", null);
  }

  const json = (await res.json().catch(() => null)) as GraphQLResponse<T> | null;

  if (!res.ok || json?.errors?.length || !json?.data) {
    const message = json?.errors?.[0]?.message ?? res.statusText;
    const retryAfter = res.status === 429 ? getRetryAfter(res) : null;
    throw new ApiError(message, res.status, retryAfter);
  }

  return json.data;
};

export type ErrorKind = "network" | "not_found" | "rate_limit" | "server" | "unknown";

export interface ErrorInfo {
  kind: ErrorKind;
  title: string;
  description: string;
}

export const ANIME_NOT_FOUND: ErrorInfo = {
  kind: "not_found",
  title: "Anime not found",
  description: "We couldn't find this anime. It may have been removed.",
};

export const getErrorInfo = (error: unknown): ErrorInfo => {
  if (error instanceof ApiError) {
    if (error.status === null) {
      return {
        kind: "network",
        title: "You're offline",
        description: "Check your internet connection and try again.",
      };
    }
    if (error.status === 404) return ANIME_NOT_FOUND;
    if (error.status === 429) {
      return {
        kind: "rate_limit",
        title: "Slow down a little",
        description: error.retryAfter
          ? `Too many searches. Try again in ${error.retryAfter} seconds.`
          : "Too many searches. Wait a moment and try again.",
      };
    }
    if (error.status >= 500) {
      return {
        kind: "server",
        title: "AniList is down",
        description: "The anime database is unavailable right now. Please try again later.",
      };
    }
  }

  return {
    kind: "unknown",
    title: "Something went wrong",
    description: "An unexpected error happened. Please try again.",
  };
};

const SEARCH_QUERY = `
  query ($search: String, $perPage: Int) {
    Page(perPage: $perPage) {
      media(search: $search, type: ANIME, isAdult: false, sort: SEARCH_MATCH) {
        id
        title { romaji english }
        coverImage { large }
      }
    }
  }
`;

const DETAIL_QUERY = `
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title { romaji english }
      coverImage { extraLarge }
      startDate { year month day }
      endDate { year month day }
      description(asHtml: false)
      episodes
      format
      status
      averageScore
      popularity
      genres
      studios(isMain: true) { nodes { name } }
      staff(sort: RELEVANCE, perPage: 25) {
        edges {
          role
          node { name { full } }
        }
      }
      rankings { rank type allTime }
      trailer { id site }
    }
  }
`;

export const searchAnime = async (
  search: string,
  signal?: AbortSignal
): Promise<AnimeSummary[]> => {
  const data = await request<{ Page: { media: AnimeSummary[] } }>(
    SEARCH_QUERY,
    { search, perPage: 24 },
    signal
  );
  return data.Page.media;
};

export const getAnimeDetail = async (
  id: number,
  signal?: AbortSignal
): Promise<AnimeDetail> => {
  const data = await request<{ Media: AnimeDetail }>(DETAIL_QUERY, { id }, signal);
  return data.Media;
};
