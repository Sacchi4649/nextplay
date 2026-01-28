// FreeToGame API types and functions
export interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

export interface GameDetails extends Game {
  description: string;
  status: string;
  screenshots: { id: number; image: string }[];
  minimum_system_requirements?: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
}

const BASE_URL = "https://www.freetogame.com/api";

export async function getAllGames(): Promise<Game[]> {
  const res = await fetch(`${BASE_URL}/games`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch games");
  return res.json();
}

export async function getGamesByPlatform(platform: "pc" | "browser" | "all"): Promise<Game[]> {
  const res = await fetch(`${BASE_URL}/games?platform=${platform}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch games");
  return res.json();
}

export async function getGamesByCategory(category: string): Promise<Game[]> {
  const res = await fetch(`${BASE_URL}/games?category=${category}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch games");
  return res.json();
}

export async function getGameById(id: number): Promise<GameDetails> {
  const res = await fetch(`${BASE_URL}/game?id=${id}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch game details");
  return res.json();
}

export async function getGamesSorted(sortBy: "release-date" | "popularity" | "alphabetical" | "relevance"): Promise<Game[]> {
  const res = await fetch(`${BASE_URL}/games?sort-by=${sortBy}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch games");
  return res.json();
}

export async function getFilteredGames(params: {
  platform?: string;
  category?: string;
  sortBy?: string;
}): Promise<Game[]> {
  const searchParams = new URLSearchParams();
  if (params.platform) searchParams.set("platform", params.platform);
  if (params.category) searchParams.set("category", params.category);
  if (params.sortBy) searchParams.set("sort-by", params.sortBy);
  
  const res = await fetch(`${BASE_URL}/games?${searchParams.toString()}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch games");
  return res.json();
}

export const CATEGORIES = [
  "mmorpg", "shooter", "strategy", "moba", "racing", "sports", "social", 
  "sandbox", "open-world", "survival", "pvp", "pve", "pixel", "voxel", 
  "zombie", "turn-based", "first-person", "third-person", "top-down", 
  "tank", "space", "sailing", "side-scroller", "superhero", "permadeath", 
  "card", "battle-royale", "mmo", "mmofps", "mmotps", "3d", "2d", "anime", 
  "fantasy", "sci-fi", "fighting", "action-rpg", "action", "military", 
  "martial-arts", "flight", "low-spec", "tower-defense", "horror", "mmorts"
];

export const PLATFORMS = ["all", "pc", "browser"];
