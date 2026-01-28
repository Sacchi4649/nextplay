"use client";

import { GNewsArticle } from "@/lib/gnews";
import { Calendar, ExternalLink, Newspaper } from "lucide-react";
import Image from "next/image";

interface GNewsCardProps {
  article: GNewsArticle;
}

export default function GNewsCard({ article }: GNewsCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="group bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300">
      {/* Image */}
      {article.image ? (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-purple-900/30 to-pink-900/30 flex items-center justify-center">
          <Newspaper className="w-16 h-16 text-purple-500/50" />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <Newspaper className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400">{article.source.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-purple-400 transition-colors">
          {article.title}
        </h2>

        <p className="text-gray-400 text-sm line-clamp-3 mb-4">
          {article.description}
        </p>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium text-sm transition-colors"
        >
          Read Full Article
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
}
