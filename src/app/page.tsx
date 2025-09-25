'use client';

import { blogs } from "@/data/blog";
// import FeaturedBlog from "../components/FeaturedBlog";
import BlogsCard from "../components/BlogsCard";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const featuredThree = blogs.filter((b) => b.featured).slice(0, 3);
  const latestThree = [...blogs]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3);
  const categories = Array.from(new Set(blogs.map((b) => b.category)));

  // Interactive category selection (Client Component needed)
  // Convert this page to a Client Component for interactivity
  // by adding "use client" and using useState
  // We'll render a categories row and filter results on click

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border bg-card">
        <div className="absolute inset-0 opacity-10">
          <Image src="/ui-ux-design.png" alt="Hero Background" fill className="object-cover" />
        </div>
        <div className="relative p-10 md:p-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Design. Develop. Share.</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Short introduction or tagline about your blog. Insights on UI/UX, React, and modern web.
          </p>
        </div>
      </section>

      {/* Featured */}
      {featuredThree.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Featured</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredThree.map((b) => (
              <BlogsCard key={b.id} blog={b} />
            ))}
          </div>
        </section>
      )}

      {/* Latest Posts */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestThree.map((b) => (
            <BlogsCard key={b.id} blog={b} />
          ))}
        </div>
      </section>

      {/* Categories Row */}
      <CategoriesSection categories={categories} />
    </div>
  );
}

function CategoriesSection({ categories }: { categories: string[] }) {
  const [selected, setSelected] = useState<string | null>(categories[0] ?? null);
  const filtered = selected
    ? blogs.filter((b) => b.category === selected).sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 4)
    : [];

  return (
    <section className="space-y-6">
      <div className="flex gap-3 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-4 py-2 rounded-full border transition ${
              selected === cat ? "bg-foreground text-background" : "bg-card hover:bg-accent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {selected && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((b) => (
              <BlogsCard key={b.id} blog={b} />
            ))}
          </div>
          <div className="text-center">
            {/* <Link href={`/blog/category/${encodeURIComponent(selected.toLowerCase())}`} className="underline"> */}
            <Link href='/blog' className="underline">
              View More
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
