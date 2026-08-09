import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, ArrowRight, User } from "lucide-react";
import { BlogPost } from "@/lib/blog/blogTypes";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  // Author information normalization helper
  const authorName = post.author;
const authorAvatar = undefined;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-purple-500/50 shadow-xl hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1.5"
    >
      {/* Cover Image */}
      <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-950">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-950 via-slate-950 to-indigo-950 flex items-center justify-center">
            <span className="text-4xl select-none">📚</span>
          </div>
        )}

        {/* Category Badge */}
        {post.category && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-3 py-1 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full shadow-md backdrop-blur-md">
              {post.category}
            </span>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col p-5 sm:p-6 justify-between space-y-4">
        <div className="space-y-3">
          {/* Blog Title */}
          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h3>

          {/* Blog Excerpt */}
          <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed font-normal">
            {post.excerpt}
          </p>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[11px] font-medium text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Card Footer Info */}
        <div className="pt-4 border-t border-slate-800/80 space-y-3 mt-auto">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 font-medium">
            {/* Author */}
            {authorName && (
              <div className="flex items-center gap-1.5 text-slate-300">
                {authorAvatar ? (
                  <Image
                    src={authorAvatar}
                    alt={authorName}
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <User className="w-3.5 h-3.5 text-purple-400" />
                )}
                <span className="truncate max-w-[120px] font-semibold">{authorName}</span>
              </div>
            )}

            {/* Date & Reading Time */}
            <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
              {post.publishedAt && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  {post.publishedAt}
                </span>
              )}
              {post.readingTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {post.readingTime}
                </span>
              )}
            </div>
          </div>

          {/* Action Link */}
          <div className="flex items-center text-xs font-bold text-purple-400 group-hover:text-fuchsia-400 transition-colors pt-1">
            <span>Read Article</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}