import { blogs } from "@/data/blog";
import Image from "next/image";
import Link from "next/link";
import BlogList from "../BlogList";
import { slugifyCategory } from "@/lib/utils";

export async function generateStaticParams() {
  const postSlugs = blogs.map((b) => ({ slug: b.slug }));
  const categorySlugs = Array.from(new Set(blogs.map((b) => slugifyCategory(b.category)))).map(
    (c) => ({ slug: c })
  );
  // Deduplicate in case a post slug equals a category slug
  const seen = new Set<string>();
  const combined: { slug: string }[] = [];
  for (const entry of [...postSlugs, ...categorySlugs]) {
    if (!seen.has(entry.slug)) {
      seen.add(entry.slug);
      combined.push(entry);
    }
  }
  return combined;
}

export default async function BlogPostOrCategory(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;

  // Try resolving as a post first
  const blog = blogs.find((b) => b.slug === slug);
  if (blog) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <p className="text-gray-400">
          {blog.date} · {blog.category}
        </p>

        {blog.image && (
          <Image
            src={blog.image}
            alt={blog.title}
            width={1200}
            height={630}
            className="w-full h-auto rounded-lg"
          />
        )}

        <p className="text-gray-300">{blog.description}</p>
        <div className="text-gray-200 leading-relaxed">{blog.content}</div>

        <div className="pt-6 border-t">
          <h3 className="text-xl font-semibold mb-4">Related posts</h3>
          <div className="flex flex-wrap gap-3">
            {blogs
              .filter((b) => b.category === blog.category && b.slug !== blog.slug)
              .slice(0, 3)
              .map((r) => (
                <Link key={r.id} href={`/blog/${r.slug}`} className="underline">
                  {r.title}
                </Link>
              ))}
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, treat as a category slug and render same BlogList UI
  const categoryMatch = Array.from(new Set(blogs.map((b) => b.category))).find(
    (c) => slugifyCategory(c) === slug
  );
  if (categoryMatch) {
    return <BlogList initialCategory={categoryMatch} />;
  }

  return <p>Not found</p>;
}
