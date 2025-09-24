export default function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
      {category}
    </span>
  );
}
