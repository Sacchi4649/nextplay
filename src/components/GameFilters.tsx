"use client";

import { CATEGORIES, PLATFORMS } from "@/lib/freetogame";
import { Search, Filter, X } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

interface GameFiltersProps {
  platform: string;
  category: string;
  sortBy: string;
  searchQuery: string;
  onPlatformChange: (platform: string) => void;
  onCategoryChange: (category: string) => void;
  onSortByChange: (sortBy: string) => void;
  onSearchChange: (query: string) => void;
}

const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "popularity", label: "Popularity" },
  { value: "release-date", label: "Release Date" },
  { value: "alphabetical", label: "Alphabetical" },
];

const POPULAR_CATEGORIES = [
  "mmorpg", "shooter", "moba", "battle-royale", "strategy", 
  "card", "racing", "sports", "anime", "fantasy", "sci-fi", "action"
];

export default function GameFilters({
  platform,
  category,
  sortBy,
  searchQuery,
  onPlatformChange,
  onCategoryChange,
  onSortByChange,
  onSearchChange,
}: GameFiltersProps) {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const displayCategories = showAllCategories ? CATEGORIES : POPULAR_CATEGORIES;

  const clearFilters = () => {
    onPlatformChange("");
    onCategoryChange("");
    onSortByChange("");
    onSearchChange("");
  };

  const hasActiveFilters = platform || category || sortBy || searchQuery;

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search games..."
          className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
        />
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap gap-4">
        {/* Platform Select */}
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm text-gray-400 mb-2">Platform</label>
          <select
            value={platform}
            onChange={(e) => onPlatformChange(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none cursor-pointer"
          >
            <option value="">All Platforms</option>
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Select */}
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm text-gray-400 mb-2">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none cursor-pointer"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Category Tags */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Filter className="w-4 h-4" />
            <span>Categories</span>
          </div>
          <button
            onClick={() => setShowAllCategories(!showAllCategories)}
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
          >
            {showAllCategories ? "Show Less" : "Show All"}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {displayCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(category === cat ? "" : cat)}
              className={clsx(
                "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                category === cat
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
