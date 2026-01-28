# NextPlay - Free-to-Play Games Discovery Platform

A modern, fullstack gaming platform built with Next.js 14, featuring game discovery, favorites management, and community news sharing. Powered by the FreeToGame API.

![NextPlay](https://img.shields.io/badge/NextPlay-Gaming%20Platform-purple)

## Features

- **Game Discovery**: Browse 400+ free-to-play games with advanced filtering
- **Detailed Game Info**: View game details, screenshots, and system requirements
- **Favorites System**: Save your favorite games (requires authentication)
- **Gaming News**: Create, read, update, and delete news articles
- **Modern UI**: Beautiful, responsive gaming-themed design
- **Authentication**: Secure user authentication via Clerk
- **Database**: Persistent data storage with Supabase

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS 4
- **Authentication**: Clerk
- **Database**: Supabase
- **API**: FreeToGame API
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Clerk account (free tier available)
- Supabase account (free tier available)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd nextplay
pnpm install
```

### 2. Set Up Clerk Authentication

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application
3. Copy your API keys

### 3. Set Up Supabase Database

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Go to **SQL Editor** and run the following SQL:

```sql
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

-- Enable Row Level Security
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Policies for favorites
CREATE POLICY "Anyone can view favorites" ON favorites FOR SELECT USING (true);
CREATE POLICY "Users can insert favorites" ON favorites FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can delete favorites" ON favorites FOR DELETE USING (true);

-- Policies for news
CREATE POLICY "Anyone can view news" ON news FOR SELECT USING (true);
CREATE POLICY "Users can insert news" ON news FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update news" ON news FOR UPDATE USING (true);
CREATE POLICY "Users can delete news" ON news FOR DELETE USING (true);
```

4. Go to **Settings > API** and copy your project URL and anon key

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
CLERK_SECRET_KEY=sk_test_your_secret_key

# Clerk URLs (optional - these are defaults)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── favorites/    # Favorites CRUD API
│   │   └── news/         # News CRUD API
│   ├── games/
│   │   ├── [id]/         # Game detail page
│   │   └── page.tsx      # Games listing
│   ├── news/             # News page
│   ├── favorites/        # User favorites
│   ├── about/            # About page
│   ├── sign-in/          # Clerk sign-in
│   ├── sign-up/          # Clerk sign-up
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── Navbar.tsx        # Navigation bar
│   ├── Footer.tsx        # Footer
│   ├── GameCard.tsx      # Game card component
│   ├── NewsCard.tsx      # News card component
│   ├── NewsForm.tsx      # News form modal
│   ├── GameFilters.tsx   # Game filtering UI
│   └── LoadingSpinner.tsx
└── lib/
    ├── freetogame.ts     # FreeToGame API functions
    └── supabase.ts       # Supabase client & types
```

## Pages

| Page | Path | Description |
|------|------|-------------|
| Home | `/` | Landing page with featured games |
| Games | `/games` | Browse all games with filters |
| Game Details | `/games/[id]` | Individual game information |
| News | `/news` | Gaming news and announcements |
| Favorites | `/favorites` | User's saved games (auth required) |
| About | `/about` | About the platform |

## API Endpoints

### Favorites API (`/api/favorites`)
- `GET` - Get user's favorites (authenticated)
- `POST` - Add game to favorites (authenticated)
- `DELETE` - Remove game from favorites (authenticated)

### News API (`/api/news`)
- `GET` - Get all news (public)
- `POST` - Create news (authenticated)
- `PUT` - Update news (authenticated, owner only)
- `DELETE` - Delete news (authenticated, owner only)

## Game Data

All game data is provided by the [FreeToGame API](https://www.freetogame.com/api-doc), a free and open database of F2P games.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect to [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Environment Variables for Production

Make sure to add all environment variables in your deployment platform:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [FreeToGame](https://www.freetogame.com) for the amazing free API
- [Clerk](https://clerk.com) for authentication
- [Supabase](https://supabase.com) for database hosting
- [Vercel](https://vercel.com) for hosting
