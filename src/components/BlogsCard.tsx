import Link from "next/link";
import CategoryBadge from "./CategoryBadge";
import Image from "next/image";
import type { Blog } from "@/data/blog";

export default function BlogsCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/blog/${blog.slug}`} className="block">
      <div className="group bg-card text-card-foreground rounded-xl border shadow-sm hover:shadow-lg transition overflow-hidden">
        <div className="overflow-hidden">
          {(
            <Image
              src={blog.image || "/no-img.jpg"}
              alt={blog.title}
              width={800}
              height={450}
              className="w-full h-48 object-cover rounded-tl-lg rounded-tr-lg transition-transform duration-500 ease-in-out transform group-hover:scale-110"
            />
          )}
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
          <p className="text-gray-400 mb-2">{blog.description}</p>
          <div className="flex justify-between text-sm text-gray-500">
            <CategoryBadge category={blog.category} />
            <span>{blog.date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
