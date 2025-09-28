'use client';

import Link from "next/link";
import { useEffect, useState } from "react";



export default function Header() {

  const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
      const handleScroll = () => {
        if(window.scrollY > 0) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.addEventListener('scroll', handleScroll);
      }
    }, 
  []);

  return (
    <header className="bg-background/80 backdrop-blur-md shadow sticky top-0 z-1">
      <nav className={`container mx-auto px-4 flex justify-between items-center transition-all duration-400 ease-in-out py-6 max-w-6xl ${scrolled ? "h-[76px]" : "h-[100px]"}`}>
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
