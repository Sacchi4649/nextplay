import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch user's favorites
export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST - Add to favorites
export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { game_id, game_title, game_thumbnail, game_genre, game_platform } = body;

  if (!game_id || !game_title) {
    return NextResponse.json({ error: "Game ID and title are required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("favorites")
    .insert({
      user_id: userId,
      game_id,
      game_title,
      game_thumbnail,
      game_genre,
      game_platform,
    })
    .select()
    .single();

  if (error) {
    // Check if it's a duplicate error
    if (error.code === "23505") {
      return NextResponse.json({ error: "Game already in favorites" }, { status: 409 });
    }
    console.error("Supabase error:", error);
    return NextResponse.json({ error: "Failed to add favorite" }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

// DELETE - Remove from favorites
export async function DELETE(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { game_id } = body;

  if (!game_id) {
    return NextResponse.json({ error: "Game ID is required" }, { status: 400 });
  }

  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", userId)
    .eq("game_id", game_id);

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: "Failed to remove favorite" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
