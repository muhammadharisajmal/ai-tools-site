import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { BlogPost } from "@/lib/blog/blogTypes";

export interface RelatedArticlesProps {
  posts: BlogPost[];
  currentSlug: string;
}

export default function RelatedArticles({
  posts,
  currentSlug,
}: RelatedArticlesProps) {
  const filteredPosts = posts
    .filter((post) => post.slug !== currentSlug)
    .slice(0, 3);

  if (filteredPosts.length === 0) {
    return null;
  }

  return (
    <section className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 space-y-8">
      {/* Section Heading */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <span>📚</span> Related Articles
        </h2>
        <Link
          href="/blog"
          className="text-xs sm:text-sm font-bold text-purple-400 hover:text-fuchsia-400 transition-colors flex items-center gap-1"
        >
          <span>View All Posts</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredPosts.map((post) => (
          <Link
            key={post.id || post.slug}
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
                <div className="w-full h-full bg-gradient-to-br from-purple-950 via-slate-950 to-indigo-950 flex items-center justify-center text-3xl">
                  📚
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

            {/* Content Body */}
            <div className="flex flex-1 flex-col p-5 sm:p-6 justify-between space-y-4">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed font-normal">
                  {post.excerpt}
                </p>
              </div>

              {/* Card Footer Metadata */}
              <div className="pt-4 border-t border-slate-800/80 space-y-3 mt-auto">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                {post.publishedAt && (
  <span className="flex items-center gap-1">
    <Calendar className="w-3.5 h-3.5 text-purple-400" />
    {post.publishedAt}
  </span>
)}
                  {post.readingTime && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-purple-400" />
                      {post.readingTime}
                    </span>
                  )}
                </div>

                {/* Navigation CTA */}
                <div className="flex items-center text-xs font-bold text-purple-400 group-hover:text-fuchsia-400 transition-colors pt-1">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}