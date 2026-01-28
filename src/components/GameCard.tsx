"use client";

import { Game } from "@/lib/freetogame";
import { Heart, Monitor, Globe, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import clsx from "clsx";

interface GameCardProps {
  game: Game;
  isFavorite?: boolean;
  onToggleFavorite?: (game: Game) => Promise<void>;
}

export default function GameCard({ game, isFavorite = false, onToggleFavorite }: GameCardProps) {
  const { isSignedIn } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
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
  };

  const PlatformIcon = game.platform.toLowerCase().includes("windows") ? Monitor : Globe;

  return (
    <div className="group relative bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={game.thumbnail}
          alt={game.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
        
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
            className={clsx(
              "absolute top-3 right-3 p-2 rounded-lg backdrop-blur-sm transition-all duration-200",
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
          <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-1">
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
            className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors"
          >
            Details
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
