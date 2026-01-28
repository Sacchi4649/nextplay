import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://gnews.io/api/v4";

// Different gaming topics for pagination effect
const GAMING_TOPICS = [
  "gaming OR video games",
  "esports tournament",
  "PlayStation Xbox Nintendo",
  "game release 2024 2025",
  "PC gaming Steam",
  "mobile gaming",
  "MMO MMORPG online",
  "indie games",
  "gaming industry news",
  "game developers studio",
];

export async function GET(request: NextRequest) {
  const apiKey = process.env.NEXT_GNEWS_SECRET_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "GNews API key not configured" },
      { status: 500 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const max = searchParams.get("max") || "10";
  const page = parseInt(searchParams.get("page") || "0");
  const customQuery = searchParams.get("q");
  
  // Use different topic based on page number for variety
  const query = customQuery || GAMING_TOPICS[page % GAMING_TOPICS.length];

  try {
    const params = new URLSearchParams({
      q: query,
      lang: "en",
      max: max,
      apikey: apiKey,
    });

    const res = await fetch(`${BASE_URL}/search?${params.toString()}`, {
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("GNews API error:", errorText);
      return NextResponse.json(
        { error: "Failed to fetch news from GNews" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({
      ...data,
      page,
      hasMore: page < GAMING_TOPICS.length - 1,
    });
  } catch (error) {
    console.error("Error fetching from GNews:", error);
    return NextResponse.json(
      { error: "Failed to fetch gaming news" },
      { status: 500 }
    );
  }
}
