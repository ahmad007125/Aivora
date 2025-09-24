import Link from "next/link";
import CategoryBadge from "./CategoryBadge";

export default function BlogsCard({ blog }: { blog: any }) {
  return (
    <Link href={`/blog/${blog.slug}`} className="block">
      <div className="p-4 bg-netural-800 rounded-xl shadow hover:shadow-lg transition">
        <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
        <p className="text-gray-400 mb-2">{blog.description}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <CategoryBadge category={blog.category} />
          <span>{blog.date}</span>
        </div>
      </div>
    </Link>
  );
}
