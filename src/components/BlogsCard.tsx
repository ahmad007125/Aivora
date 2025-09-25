import Link from "next/link";
import CategoryBadge from "./CategoryBadge";
import Image from "next/image";

export default function BlogsCard({ blog }: { blog: any }) {
  return (
    <Link href={`/blog/${blog.slug}`} className="block">
      <div className="p-4 bg-card text-card-foreground rounded-xl border shadow-sm hover:shadow-lg transition">
        {(
          <Image
            src={blog.image || "/ui-ux-design.png"}
            // src={blog.image}
            alt={blog.title}
            width={800}
            height={450}
            className="mb-3 w-full h-48 object-cover rounded-lg"
          />
        )}
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
