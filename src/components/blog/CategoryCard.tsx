import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  slug: string;
  postCount?: number;
}

export default function CategoryCard({
  title,
  description,
  icon,
  slug,
  postCount,
}: CategoryCardProps) {
  return (
    <Link
      href={`/blog/categories/${slug}`}
      className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-purple-500/50 shadow-xl hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
    >
      <div className="space-y-4">
        {/* Header: Icon & Post Count */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-2xl sm:text-3xl text-purple-400 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-300 shadow-inner">
            {icon}
          </div>

          {postCount !== undefined && (
            <span className="px-3 py-1 text-xs font-semibold text-slate-300 bg-slate-800/80 border border-slate-700/60 rounded-full font-mono">
              {postCount} {postCount === 1 ? "Article" : "Articles"}
            </span>
          )}
        </div>

        {/* Content: Title & Description */}
        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
            {title}
          </h3>
          <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed font-normal">
            {description}
          </p>
        </div>
      </div>

      {/* Footer: Action Arrow */}
      <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-purple-400 group-hover:text-fuchsia-400 transition-colors">
        <span>Explore Category</span>
        <div className="w-7 h-7 rounded-full bg-slate-800/80 border border-slate-700/60 flex items-center justify-center group-hover:bg-purple-600 group-hover:border-purple-500 group-hover:text-white transition-all duration-300">
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}