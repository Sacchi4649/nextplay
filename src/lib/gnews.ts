// GNews API types and functions
export interface GNewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string | null;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

export interface GNewsResponse {
  totalArticles: number;
  articles: GNewsArticle[];
}

const BASE_URL = "https://gnews.io/api/v4";

export async function searchGamingNews(max: number = 10): Promise<GNewsResponse> {
  const apiKey = process.env.NEXT_GNEWS_SECRET_KEY;
  
  if (!apiKey) {
    throw new Error("GNews API key not configured");
  }

  const params = new URLSearchParams({
    q: "gaming OR video games OR esports OR game release",
    lang: "en",
    max: max.toString(),
    apikey: apiKey,
  });

  const res = await fetch(`${BASE_URL}/search?${params.toString()}`, {
    next: { revalidate: 1800 }, // Cache for 30 minutes
  });

  if (!res.ok) {
    throw new Error(`GNews API error: ${res.status}`);
  }

  return res.json();
}

export async function getTopGamingHeadlines(max: number = 10): Promise<GNewsResponse> {
  const apiKey = process.env.NEXT_GNEWS_SECRET_KEY;
  
  if (!apiKey) {
    throw new Error("GNews API key not configured");
  }

  const params = new URLSearchParams({
    category: "technology",
    q: "gaming OR video games",
    lang: "en",
    max: max.toString(),
    apikey: apiKey,
  });

  const res = await fetch(`${BASE_URL}/top-headlines?${params.toString()}`, {
    next: { revalidate: 1800 },
  });

  if (!res.ok) {
    throw new Error(`GNews API error: ${res.status}`);
  }

  return res.json();
}
