"use client";

import { News } from "@/lib/supabase";
import { Calendar, User, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface NewsCardProps {
  news: News;
  isOwner?: boolean;
  onEdit?: (news: News) => void;
  onDelete?: (id: string) => Promise<void>;
}

export default function NewsCard({ news, isOwner = false, onEdit, onDelete }: NewsCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleDelete = async () => {
    if (!onDelete || isDeleting) return;
    if (!confirm("Are you sure you want to delete this news?")) return;

    setIsDeleting(true);
    try {
      await onDelete(news.id);
    } catch (error) {
      console.error("Failed to delete news:", error);
      setIsDeleting(false);
    }
  };

  const formattedDate = new Date(news.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300">
      {/* Image */}
      {news.image_url && (
        <div className="relative aspect-video">
          <Image
            src={news.image_url}
            alt={news.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-40" />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{news.author_name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-3 hover:text-purple-400 transition-colors">
          {news.title}
        </h2>

        <div className="text-gray-300 mb-4">
          {expanded ? (
            <div className="whitespace-pre-wrap">{news.content}</div>
          ) : (
            <p className="line-clamp-3">{news.content}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-purple-400 hover:text-purple-300 font-medium text-sm transition-colors"
          >
            {expanded ? "Show Less" : "Read More"}
          </button>

          {isOwner && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit?.(news)}
                className="p-2 text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg transition-colors"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
