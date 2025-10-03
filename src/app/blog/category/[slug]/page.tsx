// import { blogs } from "@/data/blog";
// import Link from "next/link";
import { redirect } from "next/navigation";
import { slugifyCategory } from "@/lib/utils";

export async function generateStaticParams() {
  return [];
}

export default async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  redirect(`/blog/${slugifyCategory(slug)}`);
}

// export async function generateStaticParams() {
//   const categories = Array.from(new Set(blogs.map((b) => b.category.toLowerCase())));
//   return categories.map((c) => ({ slug: c }));
// }

// export default function CategoryPage({ params }: { params: { slug: string } }) {
//   const slug = params.slug.toLowerCase();
//   const categoryTitle = blogs.find((b) => b.category.toLowerCase() === slug)?.category || slug;
//   const inCategory = blogs
//     .filter((b) => b.category.toLowerCase() === slug)
//     .sort((a, b) => (a.date < b.date ? 1 : -1));

//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold">Category: {categoryTitle}</h1>

//       {inCategory.length === 0 ? (
//         <p>No posts found in this category.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {inCategory.map((b) => (
//             <div key={b.id} className="p-4 bg-card rounded-xl border">
//               <Link href={`/blog/${b.slug}`} className="font-semibold underline">
//                 {b.title}
//               </Link>
//               <p className="text-sm text-muted-foreground">{b.date}</p>
//               <p className="text-muted-foreground">{b.description}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


