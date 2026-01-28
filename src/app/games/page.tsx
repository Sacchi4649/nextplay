"use client";

import { Suspense, useEffect, useState, useMemo, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { Game } from "@/lib/freetogame";
import GameCard from "@/components/GameCard";
import GameFilters from "@/components/GameFilters";
import LoadingSpinner, { PageLoading } from "@/components/LoadingSpinner";
import { Sword, AlertCircle, Ghost } from "lucide-react";

const GAMES_PER_PAGE = 40;

// Calculate columns based on window width
function useColumns() {
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setColumns(1);
      else if (width < 1024) setColumns(2);
      else if (width < 1280) setColumns(3);
      else setColumns(4);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  return columns;
}

function GamesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isSignedIn } = useUser();

  const [games, setGames] = useState<Game[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination state for infinite load
  const [displayCount, setDisplayCount] = useState(GAMES_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Refs
  const listRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Get columns based on screen size
  const columns = useColumns();

  // Filter states
  const [platform, setPlatform] = useState(searchParams.get("platform") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sort-by") || "");
  const [searchQuery, setSearchQuery] = useState("");

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(GAMES_PER_PAGE);
  }, [platform, category, sortBy, searchQuery]);

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

  // Games to display (paginated for infinite load)
  const displayedGames = useMemo(() => {
    return filteredGames.slice(0, displayCount);
  }, [filteredGames, displayCount]);

  const hasMore = displayCount < filteredGames.length;

  // Calculate rows for virtualizer
  const rowCount = Math.ceil(displayedGames.length / columns);

  // Window virtualizer - uses main window scroll
  const rowVirtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => 380,
    overscan: 3,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  });

  // Infinite scroll observer
  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setDisplayCount((prev) => prev + GAMES_PER_PAGE);
            setIsLoadingMore(false);
          }, 200);
        }
      },
      { rootMargin: "400px" }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoadingMore]);

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

  // Get games for a specific row
  const getGamesForRow = useCallback((rowIndex: number) => {
    const startIndex = rowIndex * columns;
    return displayedGames.slice(startIndex, startIndex + columns);
  }, [displayedGames, columns]);

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
                Showing <span className="text-white font-medium">{displayedGames.length}</span> of{" "}
                <span className="text-white font-medium">{filteredGames.length}</span> games
              </p>
            </div>

            {/* Virtualized Grid with Window Scroll */}
            <div ref={listRef}>
              <div
                style={{
                  height: `${rowVirtualizer.getTotalSize()}px`,
                  width: "100%",
                  position: "relative",
                }}
              >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const rowGames = getGamesForRow(virtualRow.index);
                  return (
                    <div
                      key={virtualRow.key}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${virtualRow.start - rowVirtualizer.options.scrollMargin}px)`,
                      }}
                    >
                      <div 
                        className="grid gap-6 pb-6"
                        style={{
                          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                        }}
                      >
                        {rowGames.map((game, colIndex) => (
                          <GameCard
                            key={game.id}
                            game={game}
                            isFavorite={favorites.has(game.id)}
                            onToggleFavorite={isSignedIn ? handleToggleFavorite : undefined}
                            priority={virtualRow.index < 2 && colIndex < 4}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Load more trigger */}
            {hasMore && (
              <div ref={loadMoreRef} className="flex justify-center py-8">
                {isLoadingMore ? (
                  <div className="flex items-center gap-3 text-gray-400">
                    <LoadingSpinner size="sm" />
                    <span>Loading more games...</span>
                  </div>
                ) : (
                  <div className="h-8" />
                )}
              </div>
            )}

            {!hasMore && filteredGames.length > GAMES_PER_PAGE && (
              <div className="text-center py-8 text-gray-500">
                You&apos;ve reached the end • {filteredGames.length} games total
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function GamesPage() {
  return (
    <Suspense fallback={<PageLoading />}>
      <GamesContent />
    </Suspense>
  );
}
