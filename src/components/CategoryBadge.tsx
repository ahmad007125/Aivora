export default function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="px-2 py-1 bg-primary text-black text-xs rounded-full">
      {category}
    </span>
  );
}
