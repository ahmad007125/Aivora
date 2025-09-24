import { blogs } from "@/data/blog";
import BlogsCard from "@/components/BlogsCard";

export default function BlogPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((b) => (
          <BlogsCard key={b.id} blog={b} />
        ))}
      </div>
    </div>
  );
}
