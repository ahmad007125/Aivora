import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-800 mt-12 py-6">
      <div className="container mx-auto px-4 flex flex-wrap gap-4 justify-between text-sm text-gray-400 container max-w-6xl">
        <p>© {new Date().getFullYear()} Aivora. All rights reserved.</p>
        <div className="space-x-4">
          <Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
