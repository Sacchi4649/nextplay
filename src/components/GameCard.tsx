"use client";

import { memo, useState, useCallback } from "react";
import { Game } from "@/lib/freetogame";
import { Heart, Monitor, Globe, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import clsx from "clsx";

interface GameCardProps {
  game: Game;
  isFavorite?: boolean;
  onToggleFavorite?: (game: Game) => Promise<void>;
  priority?: boolean;
}

function GameCard({ game, isFavorite = false, onToggleFavorite, priority = false }: GameCardProps) {
  const { isSignedIn } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [favorite, setFavorite] = useState(isFavorite);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleFavoriteClick = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isSignedIn || !onToggleFavorite || isLoading) return;

    setIsLoading(true);
    try {
      await onToggleFavorite(game);
      setFavorite(!favorite);
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isSignedIn, onToggleFavorite, isLoading, game, favorite]);

  const PlatformIcon = game.platform.toLowerCase().includes("windows") ? Monitor : Globe;

  return (
    <article className="game-card group relative bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 h-full">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-gray-900">
        {/* Placeholder skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse" />
        )}
        <Image
          src={game.thumbnail}
          alt={game.title}
          fill
          className={clsx(
            "object-cover transition-all duration-300 ease-out group-hover:scale-105",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          loading={priority ? "eager" : "lazy"}
          priority={priority}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 pointer-events-none" />
        
        {/* Platform Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg">
          <PlatformIcon className="w-3 h-3 text-purple-400" />
          <span className="text-xs text-gray-200">{game.platform}</span>
        </div>

        {/* Favorite Button */}
        {isSignedIn && onToggleFavorite && (
          <button
            onClick={handleFavoriteClick}
            disabled={isLoading}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            className={clsx(
              "absolute top-3 right-3 p-2 rounded-lg backdrop-blur-sm transition-colors duration-200",
              favorite
                ? "bg-pink-500/80 text-white"
                : "bg-black/60 text-gray-300 hover:text-pink-400 hover:bg-black/80"
            )}
          >
            <Heart className={clsx("w-4 h-4", favorite && "fill-current")} />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors duration-200 line-clamp-1">
            {game.title}
          </h3>
          <span className="shrink-0 px-2 py-0.5 text-xs font-medium bg-purple-600/20 text-purple-400 rounded-full">
            {game.genre}
          </span>
        </div>
        
        <p className="text-gray-400 text-sm line-clamp-2 mb-4">
          {game.short_description}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            <span>{game.publisher}</span>
          </div>
          
          <Link
            href={`/games/${game.id}`}
            className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
          >
            Details
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(GameCard, (prevProps, nextProps) => {
  return (
    prevProps.game.id === nextProps.game.id &&
    prevProps.isFavorite === nextProps.isFavorite &&
    prevProps.priority === nextProps.priority
  );
});
