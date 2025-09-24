import { blogs } from "@/data/blog";
import FeaturedBlog from "../components/FeaturedBlog";
import BlogsCard from "../components/BlogsCard";

export default function HomePage() {
  const featured = blogs.find((b) => b.featured);
  const latest = [...blogs].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3);

  return (
    <div className="space-y-10">
      {featured && <FeaturedBlog blog={featured} />}

      <section>
        <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latest.map((b) => (
            <BlogsCard key={b.id} blog={b} />
          ))}
        </div>
      </section>
    </div>
  );
}
