import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-netural-800 mt-12 py-6">
      <div className="container mx-auto px-4 flex justify-between text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Aivora. All rights reserved.</p>
        <div className="space-x-4">
          <Link href="/privacy-policy" className="hover:text-blue-400">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-blue-400">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
