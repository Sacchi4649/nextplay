import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database tables
export interface Favorite {
  id: string;
  user_id: string;
  game_id: number;
  game_title: string;
  game_thumbnail: string;
  game_genre: string;
  game_platform: string;
  created_at: string;
}

export interface News {
  id: string;
  user_id: string;
  title: string;
  content: string;
  image_url: string | null;
  author_name: string;
  created_at: string;
  updated_at: string;
}

// SQL to create tables in Supabase:
/*
-- Favorites table
CREATE TABLE favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  game_id INTEGER NOT NULL,
  game_title TEXT NOT NULL,
  game_thumbnail TEXT NOT NULL,
  game_genre TEXT NOT NULL,
  game_platform TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, game_id)
);

-- News table
CREATE TABLE news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  author_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Policies for favorites (users can only manage their own favorites)
CREATE POLICY "Users can view their own favorites" ON favorites FOR SELECT USING (true);
CREATE POLICY "Users can insert their own favorites" ON favorites FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can delete their own favorites" ON favorites FOR DELETE USING (true);

-- Policies for news (anyone can read, only authors can modify)
CREATE POLICY "Anyone can view news" ON news FOR SELECT USING (true);
CREATE POLICY "Users can insert news" ON news FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own news" ON news FOR UPDATE USING (true);
CREATE POLICY "Users can delete their own news" ON news FOR DELETE USING (true);
*/
