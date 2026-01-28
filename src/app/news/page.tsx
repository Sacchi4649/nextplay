"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { News } from "@/lib/supabase";
import { GNewsArticle } from "@/lib/gnews";
import NewsCard from "@/components/NewsCard";
import GNewsCard from "@/components/GNewsCard";
import NewsForm from "@/components/NewsForm";
import { PageLoading } from "@/components/LoadingSpinner";
import { Newspaper, Plus, AlertCircle, Globe, Users, Loader2 } from "lucide-react";
import clsx from "clsx";

type TabType = "trending" | "community";

export default function NewsPage() {
  const { isSignedIn, user } = useUser();
  
  // Tab state
  const [activeTab, setActiveTab] = useState<TabType>("trending");
  
  // GNews state with infinite scroll
  const [gnewsArticles, setGnewsArticles] = useState<GNewsArticle[]>([]);
  const [gnewsLoading, setGnewsLoading] = useState(true);
  const [gnewsLoadingMore, setGnewsLoadingMore] = useState(false);
  const [gnewsError, setGnewsError] = useState<string | null>(null);
  const [gnewsPage, setGnewsPage] = useState(0);
  const [gnewsHasMore, setGnewsHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  
  // Community news state
  const [communityNews, setCommunityNews] = useState<News[]>([]);
  const [communityLoading, setCommunityLoading] = useState(true);
  const [communityError, setCommunityError] = useState<string | null>(null);
  
  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);

  // Fetch GNews articles
  const fetchGNews = useCallback(async (page: number, append: boolean = false) => {
    if (append) {
      setGnewsLoadingMore(true);
    } else {
      setGnewsLoading(true);
    }
    setGnewsError(null);
    
    try {
      const res = await fetch(`/api/gnews?max=10&page=${page}`);
      if (!res.ok) throw new Error("Failed to fetch gaming news");
      const data = await res.json();
      
      const newArticles = data.articles || [];
      
      if (append) {
        // Filter out duplicates based on URL
        setGnewsArticles(prev => {
          const existingUrls = new Set(prev.map(a => a.url));
          const uniqueNew = newArticles.filter((a: GNewsArticle) => !existingUrls.has(a.url));
          return [...prev, ...uniqueNew];
        });
      } else {
        setGnewsArticles(newArticles);
      }
      
      setGnewsHasMore(data.hasMore ?? false);
      setGnewsPage(page);
    } catch (err) {
      setGnewsError(err instanceof Error ? err.message : "Failed to load news");
    } finally {
      setGnewsLoading(false);
      setGnewsLoadingMore(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchGNews(0, false);
  }, [fetchGNews]);

  // Infinite scroll with Intersection Observer
  useEffect(() => {
    if (!loadMoreRef.current || activeTab !== "trending") return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && gnewsHasMore && !gnewsLoadingMore && !gnewsLoading) {
          fetchGNews(gnewsPage + 1, true);
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );
    
    observer.observe(loadMoreRef.current);
    
    return () => observer.disconnect();
  }, [gnewsHasMore, gnewsLoadingMore, gnewsLoading, gnewsPage, activeTab, fetchGNews]);

  // Fetch community news
  const fetchCommunityNews = useCallback(async () => {
    setCommunityLoading(true);
    setCommunityError(null);
    try {
      const res = await fetch("/api/news");
      if (!res.ok) throw new Error("Failed to fetch community news");
      const data = await res.json();
      setCommunityNews(data);
    } catch (err) {
      setCommunityError(err instanceof Error ? err.message : "Failed to load news");
    } finally {
      setCommunityLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCommunityNews();
  }, [fetchCommunityNews]);

  // Create or Update news
  const handleSubmit = async (data: { title: string; content: string; image_url: string }) => {
    const method = editingNews ? "PUT" : "POST";
    const body = editingNews
      ? { id: editingNews.id, ...data }
      : { ...data, author_name: user?.fullName || user?.username || "Anonymous" };

    const res = await fetch("/api/news", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to save news");
    }

    setShowForm(false);
    setEditingNews(null);
    fetchCommunityNews();
  };

  // Delete news
  const handleDelete = async (id: string) => {
    const res = await fetch("/api/news", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setCommunityNews((prev) => prev.filter((n) => n.id !== id));
    }
  };

  // Edit news
  const handleEdit = (newsItem: News) => {
    setEditingNews(newsItem);
    setShowForm(true);
  };

  const tabs = [
    { id: "trending" as TabType, label: "Trending News", icon: Globe },
    { id: "community" as TabType, label: "Community", icon: Users },
  ];

  return (
    <div className="page-transition min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full mb-4">
            <Newspaper className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">Latest Updates</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Gaming News
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stay updated with the latest gaming news from around the world and community updates
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 p-1 bg-gray-800/50 rounded-xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    "flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all",
                    activeTab === tab.id
                      ? "bg-purple-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Create News Button - Only show on Community tab */}
          {activeTab === "community" && isSignedIn && (
            <button
              onClick={() => {
                setEditingNews(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/25"
            >
              <Plus className="w-5 h-5" />
              Create News
            </button>
          )}
        </div>

        {/* Trending News Tab */}
        {activeTab === "trending" && (
          <>
            {gnewsLoading && gnewsArticles.length === 0 ? (
              <PageLoading />
            ) : gnewsError && gnewsArticles.length === 0 ? (
              <div className="text-center py-20">
                <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-white mb-2">Error Loading News</h2>
                <p className="text-gray-400">{gnewsError}</p>
              </div>
            ) : gnewsArticles.length === 0 ? (
              <div className="text-center py-20">
                <Newspaper className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-white mb-2">No News Available</h2>
                <p className="text-gray-400">Check back later for the latest gaming news</p>
              </div>
            ) : (
              <>
                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gnewsArticles.map((article, index) => (
                    <GNewsCard key={`${article.url}-${index}`} article={article} />
                  ))}
                </div>
                
                {/* Infinite Scroll Trigger & Loading Indicator */}
                <div ref={loadMoreRef} className="mt-10">
                  {gnewsLoadingMore && (
                    <div className="flex flex-col items-center justify-center py-8">
                      <Loader2 className="w-8 h-8 text-purple-500 animate-spin mb-3" />
                      <p className="text-gray-400 text-sm">Loading more news...</p>
                    </div>
                  )}
                  
                  {!gnewsHasMore && gnewsArticles.length > 10 && (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full">
                        <Newspaper className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-500 text-sm">You have reached the end</span>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            
            {/* GNews Attribution */}
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">
                Showing {gnewsArticles.length} articles • News powered by{" "}
                <a
                  href="https://gnews.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300"
                >
                  GNews API
                </a>
              </p>
            </div>
          </>
        )}

        {/* Community News Tab */}
        {activeTab === "community" && (
          <>
            {communityLoading ? (
              <PageLoading />
            ) : communityError ? (
              <div className="text-center py-20">
                <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-white mb-2">Error Loading News</h2>
                <p className="text-gray-400">{communityError}</p>
              </div>
            ) : communityNews.length === 0 ? (
              <div className="text-center py-20">
                <Newspaper className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-white mb-2">No Community News Yet</h2>
                <p className="text-gray-400 mb-6">
                  {isSignedIn
                    ? "Be the first to share some gaming news!"
                    : "Sign in to create and share gaming news"}
                </p>
                {isSignedIn && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl"
                  >
                    <Plus className="w-5 h-5" />
                    Create First News
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {communityNews.map((newsItem) => (
                  <NewsCard
                    key={newsItem.id}
                    news={newsItem}
                    isOwner={isSignedIn && user?.id === newsItem.user_id}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* News Form Modal */}
        {showForm && (
          <NewsForm
            news={editingNews}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingNews(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
