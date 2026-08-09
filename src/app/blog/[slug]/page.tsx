import { notFound } from "next/navigation";
import ArticleHero from "@/components/blog/ArticleHero";
import ArticleContent from "@/components/blog/ArticleContent";
import RelatedArticles from "@/components/blog/RelatedArticles";
import { blogPosts } from "@/lib/blog/blogData";
import { articleContent } from "@/lib/blog/articleContent";
import { BlogPost } from "@/lib/blog/blogTypes";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post: BlogPost) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const post = blogPosts.find((item: BlogPost) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const markdown = articleContent[post.slug]?.content ?? "";

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white font-sans antialiased pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        {/* Article Hero Header */}
        <ArticleHero
          title={post.title}
          excerpt={post.excerpt}
          author={post.author}
          publishedAt={post.publishedAt}
          readingTime={post.readingTime}
          category={post.category}
          coverImage={post.coverImage}
          tags={post.tags}
        />

        {/* Markdown Content Section */}
        <ArticleContent content={markdown} />

        {/* Related Articles Footer Grid */}
        <RelatedArticles posts={blogPosts} currentSlug={post.slug} />
      </div>
    </main>
  );
}