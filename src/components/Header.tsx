'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";



export default function Header() {

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ];

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`bg-background/80 backdrop-blur-md sticky top-0 z-50 ${scrolled ? "shadow" : ""}`}>
      <nav className={`container mx-auto px-4 flex justify-between items-center transition-all duration-400 ease-in-out py-6 max-w-6xl ${scrolled ? "h-[76px]" : "h-[100px]"}`}>
        <Link href="/" className="text-xl font-bold text-foreground">Aivora</Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <div className="space-x-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="group relative text-foreground">
                {link.label}
                <span className="absolute left-1/2 -bottom-1 w-0 h-[1px] bg-foreground transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </Link>
            ))}
          </div>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button & Theme Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative w-8 h-8 flex flex-col items-end justify-center gap-[6px] focus:outline-none group"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {/* Two-bar hamburger that transforms to X */}
            <span
              className={`block h-[2px] bg-foreground transition-all duration-300 ease-in-out origin-center ${
                mobileMenuOpen ? 'w-7 rotate-45 translate-y-[4px]' : 'w-7'
              }`}
            />
            <span
              className={`block h-[2px] bg-foreground transition-all duration-300 ease-in-out origin-center ${
                mobileMenuOpen ? 'w-7 -rotate-45 -translate-y-[4px]' : 'w-6'
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden z-40"
          onClick={closeMobileMenu}
          style={{ 
            top: scrolled ? '76px' : '100px',
            animation: 'fadeIn 0.3s ease-in-out'
          }}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed right-0 w-[75%] max-w-sm shadow-md transition-all duration-500 ease-in-out md:hidden z-50 
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full !w-0 opacity-0 overflow-hidden'}
          ${scrolled ? "bg-background/80 backdrop-blur-md" : "bg-background"}  
        `}
        style={{ 
          top: scrolled ? '76px' : '100px',
          height: scrolled ? 'calc(100vh - 76px)' : 'calc(100vh - 100px)'
        }}
      >
        <nav className={`flex flex-col space-y-1 p-8`}>
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobileMenu}
              className={`group relative text-foreground text-lg py-4 px-4 rounded-lg hover:bg-accent transition-all duration-300 ${
                mobileMenuOpen ? 'animate-slideIn' : ''
              }`}
              style={{
                animationDelay: mobileMenuOpen ? `${index * 75}ms` : '0ms',
                animationFillMode: 'both'
              }}
            >
              <span className="relative inline-block">
                {link.label}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-foreground transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
          ))}
        </nav>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
      `}</style>
    </header>
  );
}
