import React from "react";
import Image from "next/image";
import { Calendar, Clock, User, Tag } from "lucide-react";

export interface ArticleHeroProps {
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  category: string;
  coverImage: string;
  tags: string[];
}

export default function ArticleHero({
  title,
  excerpt,
  author,
  publishedAt,
  readingTime,
  category,
  coverImage,
  tags,
}: ArticleHeroProps) {
  return (
    <section className="relative w-full max-w-4xl mx-auto space-y-8 pt-6 pb-4">
      {/* Category Badge */}
      <div className="flex items-center justify-center sm:justify-start">
        <span className="px-4 py-1.5 text-xs font-bold tracking-wide text-white uppercase bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 rounded-full shadow-lg shadow-purple-500/20 backdrop-blur-md">
          {category}
        </span>
      </div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight text-center sm:text-left">
        {title}
      </h1>

      {/* Excerpt */}
      <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed text-center sm:text-left">
        {excerpt}
      </p>

      {/* Author & Article Metadata Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-800 text-sm text-slate-400 font-medium">
        {/* Author */}
        <div className="flex items-center gap-2 text-slate-200">
          <div className="p-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <User className="w-4 h-4" />
          </div>
          <span className="font-semibold text-slate-100">{author}</span>
        </div>

        {/* Date & Reading Time */}
        <div className="flex items-center gap-6 font-mono text-xs">
          {publishedAt && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>
                {new Date(publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          )}

          {readingTime && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>{readingTime}</span>
            </div>
          )}
        </div>
      </div>

      {/* Large Cover Image */}
      <div className="relative w-full h-64 sm:h-96 lg:h-[450px] overflow-hidden rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            priority
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-950 via-slate-950 to-indigo-950 flex items-center justify-center text-4xl">
            📚
          </div>
        )}
      </div>

      {/* Tags Row */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <Tag className="w-4 h-4 text-purple-400 mr-1" />
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-lg hover:bg-purple-500/20 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}