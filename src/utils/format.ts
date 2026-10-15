import type { AnimeDetail, AnimeTitle, FuzzyDate } from "../types/anime";

export const displayTitle = (title: AnimeTitle): string =>
  title.english ?? title.romaji;

const formatDate = ({ year, month, day }: FuzzyDate): string | null => {
  if (!year) return null;
  if (!month) return String(year);

  return new Date(year, month - 1, day ?? 1).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    ...(day ? { day: "numeric" } : {}),
  });
};

export const formatAired = (start: FuzzyDate, end: FuzzyDate): string => {
  const from = formatDate(start);
  const to = formatDate(end);

  if (!from) return "Not available";
  if (!to) return `${from} to ?`;
  return from === to ? from : `${from} to ${to}`;
};

const FORMAT_LABELS: Record<string, string> = {
  TV: "TV",
  TV_SHORT: "TV Short",
  MOVIE: "Movie",
  SPECIAL: "Special",
  OVA: "OVA",
  ONA: "ONA",
  MUSIC: "Music",
};

export const formatType = (format: string | null): string =>
  format ? FORMAT_LABELS[format] ?? format : "Unknown";

export const formatStatus = (status: string | null): string => {
  if (!status) return "Unknown";
  const text = status.replace(/_/g, " ").toLowerCase();
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const cleanDescription = (description: string | null): string[] => {
  if (!description) return ["No synopsis available."];

  return description
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\(Source:[^)]*\)\s*$/i, "")
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
};

export const getDirector = (anime: AnimeDetail): string | null =>
  anime.staff.edges.find((edge) => /^director(\s*\(.*\))?$/i.test(edge.role))?.node.name
    .full ?? null;

export const getRank = (anime: AnimeDetail): number | null =>
  anime.rankings.find((ranking) => ranking.type === "RATED" && ranking.allTime)
    ?.rank ?? null;
