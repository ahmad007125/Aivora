'use client';

import { Blog, blogs } from "@/data/blog";
import BlogsCard from "../components/BlogsCard";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function FeaturedSection() {
  // Prepare data inside the component instead of props
  const featuredThree: Blog[] = blogs.filter((b) => b.featured).slice(0, 3);
  const latestThree: Blog[] = [...blogs]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3);
  const categories: string[] = Array.from(new Set(blogs.map((b) => b.category)));

  // Safety check
  if (!featuredThree || featuredThree.length < 3) return null;

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="grid md:gap-x-4 gap-y-4 md:grid-cols-3 grid-cols-1">
        {/* Left Large Card */}
        <Link href={`/blog/${featuredThree[0].slug}`} className="underline col-span-2">
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <Image
              src={featuredThree[0].image || "/ui-ux-design.png"}
              alt={featuredThree[0].title}
              fill
              className="mb-3 w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white max-w-[90%]">
              <Badge variant="secondary" className="mb-2 bg-yellow-400/90 text-black">
                {featuredThree[0].category || "Recipe"}
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                {featuredThree[0].title}
              </h2>
              <p className="text-sm mt-2 opacity-90 line-clamp-2">
                {featuredThree[0].description}
              </p>
            </div>
          </div>
        </Link>

        {/* Right Side (2 smaller cards) */}
        <div className="flex flex-col gap-4">
          {featuredThree.slice(1, 3).map((b) => (
            <Link key={b.slug} href={`/blog/${b.slug}`} className="underline">
              <div className="relative h-[190px] rounded-2xl overflow-hidden">
                <Image
                  src={b.image || "/ui-ux-design.png"}
                  alt={b.title}
                  width={800}
                  height={450}
                  className="mb-3 w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold leading-snug">{b.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

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
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <CategoriesSection categories={categories} />
    </div>
  );
}

function CategoriesSection({ categories }: { categories: string[] }) {
  const [selected, setSelected] = useState<string | null>(categories[0] ?? null);
  const filtered = selected
    ? blogs
        .filter((b) => b.category === selected)
        .sort((a, b) => (a.date < b.date ? 1 : -1))
        .slice(0, 4)
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((b) => (
              <BlogsCard key={b.id} blog={b} />
            ))}
          </div>
          <div className="text-center">
            <Link href="/blog" className="underline">
              View More
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
