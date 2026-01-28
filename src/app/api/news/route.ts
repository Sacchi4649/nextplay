import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

// GET - Fetch all news (public)
export async function GET() {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST - Create news
export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, content, image_url, author_name } = body;

  if (!title || !content) {
    return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("news")
    .insert({
      user_id: userId,
      title,
      content,
      image_url: image_url || null,
      author_name: author_name || "Anonymous",
    })
    .select()
    .single();

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: "Failed to create news" }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

// PUT - Update news
export async function PUT(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, title, content, image_url } = body;

  if (!id || !title || !content) {
    return NextResponse.json({ error: "ID, title, and content are required" }, { status: 400 });
  }

  // Verify ownership
  const { data: existing } = await supabase
    .from("news")
    .select("user_id")
    .eq("id", id)
    .single();

  if (!existing || existing.user_id !== userId) {
    return NextResponse.json({ error: "Not authorized to edit this news" }, { status: 403 });
  }

  const { data, error } = await supabase
    .from("news")
    .update({
      title,
      content,
      image_url: image_url || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: "Failed to update news" }, { status: 500 });
  }

  return NextResponse.json(data);
}

// DELETE - Delete news
export async function DELETE(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: "News ID is required" }, { status: 400 });
  }

  // Verify ownership
  const { data: existing } = await supabase
    .from("news")
    .select("user_id")
    .eq("id", id)
    .single();

  if (!existing || existing.user_id !== userId) {
    return NextResponse.json({ error: "Not authorized to delete this news" }, { status: 403 });
  }

  const { error } = await supabase
    .from("news")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: "Failed to delete news" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
