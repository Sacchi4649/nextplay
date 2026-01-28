"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Game } from "@/lib/freetogame";
import GameCard from "@/components/GameCard";
import GameFilters from "@/components/GameFilters";
import { PageLoading } from "@/components/LoadingSpinner";
import { Sword, AlertCircle, Ghost } from "lucide-react";

export default function GamesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isSignedIn, user } = useUser();

  const [games, setGames] = useState<Game[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [platform, setPlatform] = useState(searchParams.get("platform") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sort-by") || "");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch games
  useEffect(() => {
    async function fetchGames() {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (platform) params.set("platform", platform);
        if (category) params.set("category", category);
        if (sortBy) params.set("sort-by", sortBy);

        const url = params.toString()
          ? `/api/games?${params.toString()}`
          : "/api/games";

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch games");
        const data = await res.json();
        setGames(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load games");
      } finally {
        setIsLoading(false);
      }
    }

    fetchGames();
  }, [platform, category, sortBy]);

  // Fetch user favorites
  useEffect(() => {
    async function fetchFavorites() {
      if (!isSignedIn) return;
      try {
        const res = await fetch("/api/favorites");
        if (res.ok) {
          const data = await res.json();
          setFavorites(new Set(data.map((f: { game_id: number }) => f.game_id)));
        }
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
      }
    }

    fetchFavorites();
  }, [isSignedIn]);

  // Update URL with filters
  useEffect(() => {
    const params = new URLSearchParams();
    if (platform) params.set("platform", platform);
    if (category) params.set("category", category);
    if (sortBy) params.set("sort-by", sortBy);
    
    const newUrl = params.toString() ? `/games?${params.toString()}` : "/games";
    router.replace(newUrl, { scroll: false });
  }, [platform, category, sortBy, router]);

  // Filter games by search query
  const filteredGames = useMemo(() => {
    if (!searchQuery) return games;
    const query = searchQuery.toLowerCase();
    return games.filter(
      (game) =>
        game.title.toLowerCase().includes(query) ||
        game.short_description.toLowerCase().includes(query) ||
        game.genre.toLowerCase().includes(query) ||
        game.publisher.toLowerCase().includes(query)
    );
  }, [games, searchQuery]);

  // Toggle favorite
  const handleToggleFavorite = useCallback(async (game: Game) => {
    if (!isSignedIn) return;

    const isFavorite = favorites.has(game.id);
    const method = isFavorite ? "DELETE" : "POST";

    const res = await fetch("/api/favorites", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        game_id: game.id,
        game_title: game.title,
        game_thumbnail: game.thumbnail,
        game_genre: game.genre,
        game_platform: game.platform,
      }),
    });

    if (res.ok) {
      setFavorites((prev) => {
        const newSet = new Set(prev);
        if (isFavorite) {
          newSet.delete(game.id);
        } else {
          newSet.add(game.id);
        }
        return newSet;
      });
    }
  }, [isSignedIn, favorites]);

  return (
    <div className="page-transition min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full mb-4">
            <Sword className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">Game Library</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Explore Free Games
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Browse our collection of {games.length}+ free-to-play games. 
            Filter by platform, category, or search for your next favorite.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10 p-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50">
          <GameFilters
            platform={platform}
            category={category}
            sortBy={sortBy}
            searchQuery={searchQuery}
            onPlatformChange={setPlatform}
            onCategoryChange={setCategory}
            onSortByChange={setSortBy}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Content */}
        {isLoading ? (
          <PageLoading />
        ) : error ? (
          <div className="text-center py-20">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Error Loading Games</h2>
            <p className="text-gray-400">{error}</p>
          </div>
        ) : filteredGames.length === 0 ? (
          <div className="text-center py-20">
            <Ghost className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">No Games Found</h2>
            <p className="text-gray-400">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-400">
                Showing <span className="text-white font-medium">{filteredGames.length}</span> games
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  isFavorite={favorites.has(game.id)}
                  onToggleFavorite={isSignedIn ? handleToggleFavorite : undefined}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
