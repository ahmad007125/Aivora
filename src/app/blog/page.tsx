"use client";
import { useMemo, useState } from "react";
import { blogs } from "@/data/blog";
import BlogsCard from "@/components/BlogsCard";

type SortOption = "Newest" | "Oldest" | "Featured";

export default function BlogPage() {
  const [sortBy, setSortBy] = useState<SortOption>("Newest");
  const [category, setCategory] = useState<string | "All">("All");
  const [page, setPage] = useState(1);

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

  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const current = sorted.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">All Blogs</h1>

      <div className="flex flex-wrap gap-3 items-center">
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
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => {
                setCategory(c as any);
                setPage(1);
              }}
              className={`px-3 py-1 rounded-full border ${
                category === c ? "bg-foreground text-background" : "bg-card"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {current.map((b) => (
          <BlogsCard key={b.id} blog={b} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          className="px-3 py-2 rounded border"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Previous
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          className="px-3 py-2 rounded border"
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
}
