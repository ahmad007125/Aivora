import { blogs } from "@/data/blog";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const blog = blogs.find((b) => b.slug === params.slug);
  if (!blog) return <p>Blog not found</p>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p className="text-gray-400">{blog.date} · {blog.category}</p>
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

      {/* Related posts */}
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
