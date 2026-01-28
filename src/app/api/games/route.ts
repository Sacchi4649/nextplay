import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://www.freetogame.com/api";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const platform = searchParams.get("platform");
  const category = searchParams.get("category");
  const sortBy = searchParams.get("sort-by");

  try {
    const params = new URLSearchParams();
    if (platform) params.set("platform", platform);
    if (category) params.set("category", category);
    if (sortBy) params.set("sort-by", sortBy);

    const url = params.toString()
      ? `${BASE_URL}/games?${params.toString()}`
      : `${BASE_URL}/games`;

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`API responded with status ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching games:", error);
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    );
  }
}
