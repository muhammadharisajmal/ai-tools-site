"use client";

import React, { useState, useMemo } from "react";
import BlogCard from "@/components/blog/BlogCard";
import FeaturedPost from "@/components/blog/FeaturedPost";
import CategoryCard from "@/components/blog/CategoryCard";
import SearchBar from "@/components/blog/SearchBar";
import Newsletter from "@/components/blog/Newsletter";
import { blogPosts } from "@/lib/blog/blogData";
import { BlogPost } from "@/lib/blog/blogTypes";

/* ==========================================================================
   STATIC CATEGORIES DEFINITION
   ========================================================================== */

const CATEGORIES = [
  {
    title: "AI Tools",
    slug: "ai-tools",
    description: "Discover cutting-edge AI software and tools for academic excellence.",
    icon: "⚡",
  },
  {
    title: "Programming",
    slug: "programming",
    description: "Master algorithms, modern frameworks, and software development practices.",
    icon: "💻",
  },
  {
    title: "Study Tips",
    slug: "study-tips",
    description: "Optimize learning efficiency using active recall and cognitive techniques.",
    icon: "📚",
  },
  {
    title: "Research",
    slug: "research",
    description: "Guides on literature reviews, citation analysis, and paper structuring.",
    icon: "🔬",
  },
  {
    title: "Productivity",
    slug: "productivity",
    description: "Boost focus, time management, and workload prioritization strategies.",
    icon: "🚀",
  },
];

/* ==========================================================================
   BLOG HOME PAGE COMPONENT
   ========================================================================== */

export default function BlogHomePage() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Identify the primary featured article
  const featuredArticle = useMemo(() => {
    return blogPosts.find((post) => post.featured) || blogPosts[0];
  }, []);

  // Filter posts based on search input across title, excerpt, category, and tags
  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return blogPosts.filter((post) => post.id !== featuredArticle?.id);
    }

    return blogPosts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(query);
      const excerptMatch = post.excerpt.toLowerCase().includes(query);
      const categoryMatch = post.category?.toLowerCase().includes(query);
      const tagMatch = post.tags?.some((tag) => tag.toLowerCase().includes(query));

      return titleMatch || excerptMatch || categoryMatch || tagMatch;
    });
  }, [searchQuery, featuredArticle]);

  // Compute category article counts dynamically
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    blogPosts.forEach((post) => {
      if (post.category) {
        const normalized = post.category.toLowerCase().replace(/\s+/g, "-");
        counts[normalized] = (counts[normalized] || 0) + 1;
      }
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white font-sans antialiased pb-20">
      
      {/* HERO SECTION */}
      <header className="relative overflow-hidden bg-gradient-to-b from-purple-900/20 via-slate-950 to-slate-950 border-b border-purple-500/10 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-purple-600/10 via-fuchsia-600/10 to-indigo-600/10 blur-3xl rounded-full opacity-50 pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300">
            <span>✨ AI Study Hub Journal & Resources</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
            AI Study Hub <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">Blog</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Discover AI tools, coding tutorials, study strategies, research guides, productivity tips, and educational resources.
          </p>

          {/* STATS STRIP */}
          <div className="pt-6 grid grid-cols-3 max-w-lg mx-auto gap-4 border-t border-slate-800/80 text-center">
            <div>
              <span className="block text-xl sm:text-2xl font-extrabold text-purple-400">500+</span>
              <span className="text-xs text-slate-400 font-medium">Articles</span>
            </div>
            <div>
              <span className="block text-xl sm:text-2xl font-extrabold text-fuchsia-400">Weekly</span>
              <span className="text-xs text-slate-400 font-medium">Updates</span>
            </div>
            <div>
              <span className="block text-xl sm:text-2xl font-extrabold text-indigo-400">AI Powered</span>
              <span className="text-xs text-slate-400 font-medium">Learning</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        
        {/* SEARCH BAR SECTION */}
        <section className="relative z-10">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by title, excerpt, category, or #tags..."
          />
        </section>

        {/* FEATURED POST SECTION (Hidden when active search query exists) */}
        {!searchQuery && featuredArticle && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span>⭐</span> Featured Article
              </h2>
            </div>
            <FeaturedPost post={featuredArticle} />
          </section>
        )}

        {/* CATEGORIES SECTION (Hidden when active search query exists) */}
        {!searchQuery && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span>🏷️</span> Explore Categories
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORIES.map((cat) => (
                <CategoryCard
                  key={cat.slug}
                  title={cat.title}
                  description={cat.description}
                  icon={cat.icon}
                  slug={cat.slug}
                  postCount={categoryCounts[cat.slug] || 0}
                />
              ))}
            </div>
          </section>
        )}

        {/* LATEST ARTICLES GRID */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>📖</span> {searchQuery ? "Search Results" : "Latest Articles"}
            </h2>
            {searchQuery && (
              <span className="text-xs text-slate-400 font-mono">
                Found {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
              </span>
            )}
          </div>

          {filteredPosts.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-3">
              <span className="text-4xl block">🔍</span>
              <h3 className="text-lg font-bold text-slate-200">No articles matched your search</h3>
              <p className="text-sm text-slate-400 max-w-sm mx-auto">
                Try adjusting your search terms or clearing filters to view all available resources.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-2 px-4 py-2 text-xs font-bold text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-xl hover:bg-purple-500/20 transition"
              >
                Clear Search Query
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post: BlogPost) => (
                <BlogCard key={post.id || post.slug} post={post} />
              ))}
            </div>
          )}
        </section>

        {/* NEWSLETTER SUBSCRIPTION COMPONENT */}
        <section className="pt-8">
          <Newsletter />
        </section>

      </main>
    </div>
  );
}