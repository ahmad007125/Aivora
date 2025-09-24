import { blogs } from "@/data/blog";

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
      <p className="text-gray-300">{blog.description}</p>
      <div className="text-gray-200 leading-relaxed">{blog.content}</div>
    </div>
  );
}
