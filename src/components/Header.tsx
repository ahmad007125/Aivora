'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";



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
        <div className="flex items-center gap-4">
          <div className="space-x-4">
            <Link href="/" className="hover:text-primary">Home</Link>
            <Link href="/blog" className="hover:text-primary">Blog</Link>
            <Link href="/about" className="hover:text-primary">About</Link>
            <Link href="/contact" className="hover:text-primary">Contact</Link>
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
