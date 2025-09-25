import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-md shadow sticky top-0">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-foreground">Aivora</Link>
        <div className="space-x-4">
          <Link href="/" className="hover:text-blue-400">Home</Link>
          <Link href="/blog" className="hover:text-blue-400">Blog</Link>
          <Link href="/about" className="hover:text-blue-400">About</Link>
          <Link href="/contact" className="hover:text-blue-400">Contact</Link>
        </div>
      </nav>
    </header>
  );
}
