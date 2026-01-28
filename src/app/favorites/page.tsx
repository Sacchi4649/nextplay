"use client";

import { useEffect, useState, useCallback } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { Favorite } from "@/lib/supabase";
import { Game } from "@/lib/freetogame";
import GameCard from "@/components/GameCard";
import { PageLoading } from "@/components/LoadingSpinner";
import { Heart, AlertCircle, LogIn } from "lucide-react";

export default function FavoritesPage() {
  const { isSignedIn, isLoaded } = useUser();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch favorites
  const fetchFavorites = useCallback(async () => {
    if (!isSignedIn) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/favorites");
      if (!res.ok) throw new Error("Failed to fetch favorites");
      const data = await res.json();
      setFavorites(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load favorites");
    } finally {
      setIsLoading(false);
    }
  }, [isSignedIn]);

  useEffect(() => {
    if (isLoaded) {
      fetchFavorites();
    }
  }, [isLoaded, fetchFavorites]);

  // Remove from favorites
  const handleToggleFavorite = async (game: Game) => {
    const res = await fetch("/api/favorites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ game_id: game.id }),
    });

    if (res.ok) {
      setFavorites((prev) => prev.filter((f) => f.game_id !== game.id));
    }
  };

  // Convert favorite to game format for GameCard
  const favoriteToGame = (favorite: Favorite): Game => ({
    id: favorite.game_id,
    title: favorite.game_title,
    thumbnail: favorite.game_thumbnail,
    genre: favorite.game_genre,
    platform: favorite.game_platform,
    short_description: "",
    game_url: "",
    publisher: "",
    developer: "",
    release_date: "",
    freetogame_profile_url: "",
  });

  // Not signed in
  if (isLoaded && !isSignedIn) {
    return (
      <div className="page-transition min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-purple-600/20 flex items-center justify-center">
            <Heart className="w-10 h-10 text-purple-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Sign In Required</h1>
          <p className="text-gray-400 mb-8">
            Please sign in to view and manage your favorite games. 
            Create a free account to start building your collection!
          </p>
          <SignInButton mode="modal">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/25">
              <LogIn className="w-5 h-5" />
              Sign In
            </button>
          </SignInButton>
        </div>
      </div>
    );
  }

  return (
    <div className="page-transition min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-600/20 border border-pink-500/30 rounded-full mb-4">
            <Heart className="w-4 h-4 text-pink-400" />
            <span className="text-pink-300 text-sm font-medium">Your Collection</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My Favorites
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Your personal collection of favorite games. 
            Quick access to the games you love most.
          </p>
        </div>

        {/* Content */}
        {isLoading ? (
          <PageLoading />
        ) : error ? (
          <div className="text-center py-20">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Error Loading Favorites</h2>
            <p className="text-gray-400">{error}</p>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">No Favorites Yet</h2>
            <p className="text-gray-400 mb-6">
              Start exploring games and save your favorites for quick access!
            </p>
            <a
              href="/games"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl"
            >
              Browse Games
            </a>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-400">
                <span className="text-white font-medium">{favorites.length}</span> games saved
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((favorite) => (
                <GameCard
                  key={favorite.id}
                  game={favoriteToGame(favorite)}
                  isFavorite={true}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
