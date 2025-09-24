import Link from "next/link";

export default function FeaturedBlog({ blog }: { blog: any }) {
  return (
    <section className="p-6 bg-blue-700 text-white rounded-xl shadow">
      <h2 className="text-lg uppercase mb-2">Featured</h2>
      <h1 className="text-3xl font-bold mb-3">{blog.title}</h1>
      <p className="mb-4">{blog.description}</p>
      <Link href={`/blog/${blog.slug}`} className="underline">
        Read More →
      </Link>
    </section>
  );
}
