"use client";
import { useMemo, useState, useEffect } from "react";
import { blogs, type Blog } from "@/data/blog";
import BlogsCard from "@/components/BlogsCard";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { slugifyCategory } from "@/lib/utils";

type SortOption = "Newest" | "Oldest" | "Featured";

export default function BlogList({ initialCategory }: { initialCategory: Blog["category"] | "All" }) {
  const [sortBy, setSortBy] = useState<SortOption>("Newest");
  const [category, setCategory] = useState<Blog["category"] | "All">(initialCategory);
  const [page, setPage] = useState(1);
  const pathname = usePathname();

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(blogs.map((b) => b.category)))],
    []
  );

  const sorted = useMemo(() => {
    let list = [...blogs];
    if (category !== "All") list = list.filter((b) => b.category === category);
    if (sortBy === "Newest") list.sort((a, b) => (a.date < b.date ? 1 : -1));
    if (sortBy === "Oldest") list.sort((a, b) => (a.date > b.date ? 1 : -1));
    if (sortBy === "Featured") list.sort((a, b) => Number(b.featured) - Number(a.featured));
    return list;
  }, [sortBy, category]);

  // Sync selected category with URL when visiting /blog/<category>
  useEffect(() => {
    if (!pathname) return;
    const parts = pathname.split("/").filter(Boolean);
    if (parts[0] === "blog") {
      if (parts.length === 2) {
        const slug = parts[1];
        const resolved = Array.from(new Set(blogs.map((b) => b.category))).find(
          (c) => slugifyCategory(c) === slug
        );
        if (resolved && resolved !== category) {
          setCategory(resolved as Blog["category"]);
          setPage(1);
        }
      } else if (parts.length === 1 && category !== "All") {
        setCategory("All");
        setPage(1);
      }
    }
  }, [pathname]);

  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const current = sorted.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6">
      <h1 className="text-6xl font-bold text-center mb-3">Blog</h1>
      <p className="text-md text-center mb-6">Explore the Latest in Design, Development and AI</p>

      <div className="flex flex-col-reverse justify-center gap-6 items-center">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="border rounded px-3 py-2 bg-background"
        >
          <option>Newest</option>
          <option>Oldest</option>
          <option>Featured</option>
        </select>

        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => {
            const slug = c === "All" ? "" : slugifyCategory(c);
            const href = slug ? `/blog/${slug}` : "/blog";
            const isActive = category === c;
            return (
              <Link
                key={c}
                href={href}
                onClick={() => {
                  setCategory(c as Blog["category"] | "All");
                  setPage(1);
                }}
                className={`px-4 py-2 rounded-full border cursor-pointer ${
                  isActive ? "bg-foreground text-background" : "bg-card"
                }`}
              >
                {c}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {current.map((b) => (
          <BlogsCard key={b.id} blog={b} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          className="px-3 py-2 rounded border cursor-pointer"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Previous
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          className="px-3 py-2 rounded border cursor-pointer"
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
}


