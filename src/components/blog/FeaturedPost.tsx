import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, ArrowRight, User, Sparkles } from "lucide-react";
import { BlogPost } from "@/lib/blog/blogTypes";

interface FeaturedPostProps {
  post: BlogPost;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col lg:flex-row overflow-hidden rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-purple-500/50 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-1"
    >
      {/* Cover Image Container */}
      <div className="relative w-full lg:w-1/2 h-64 sm:h-80 lg:h-auto min-h-[280px] overflow-hidden bg-slate-950">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-950 via-slate-950 to-indigo-950 flex items-center justify-center">
            <span className="text-6xl select-none">✨</span>
          </div>
        )}

        {/* Badges Container */}
        <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
          {/* Featured Badge */}
          {post.featured && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-amber-300 bg-amber-500/20 border border-amber-500/30 rounded-full backdrop-blur-md shadow-lg">
              <Sparkles className="w-3.5 h-3.5" />
              Featured
            </span>
          )}

          {/* Category Badge */}
          {post.category && (
            <span className="px-3 py-1 text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 rounded-full shadow-lg backdrop-blur-md">
              {post.category}
            </span>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-8 lg:p-10 space-y-6">
        <div className="space-y-4">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white group-hover:text-purple-300 transition-colors leading-tight">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-slate-300 text-base sm:text-lg line-clamp-3 font-normal leading-relaxed">
            {post.excerpt}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-medium text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-lg"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer Meta & Action */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Author, Date & Reading Time */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400 font-medium">
            {/* Author (Strictly string based) */}
            {post.author && (
              <div className="flex items-center gap-1.5 text-slate-200">
                <User className="w-4 h-4 text-purple-400" />
                <span className="font-semibold">{post.author}</span>
              </div>
            )}

            {/* Published Date */}
            {post.publishedAt && (
              <div className="flex items-center gap-1.5 text-slate-400 font-mono text-xs">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>
                {post.publishedAt}
                </span>
              </div>
            )}

            {/* Reading Time */}
            {post.readingTime && (
              <div className="flex items-center gap-1.5 text-slate-400 font-mono text-xs">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{post.readingTime}</span>
              </div>
            )}
          </div>

          {/* Read Article Button */}
          <div>
            <span className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 rounded-xl shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/30 group-hover:scale-105 transition-all duration-300">
              <span>Read Article</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}