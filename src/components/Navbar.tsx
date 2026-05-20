"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, User, Ruler } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import SizingGuide from "./SizingGuide";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSizingOpen, setIsSizingOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Shop", href: "/shop" },
    { name: "Launchpad", href: "/launchpad" },
    { name: "The Lab", href: "/the-lab" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-6 flex justify-center pointer-events-none">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`
          pointer-events-auto
          flex items-center gap-8 px-8 py-4 
          bg-primary text-primary-foreground
          rounded-full shadow-[0_20px_50px_rgba(0,71,255,0.3)]
          backdrop-blur-xl border border-white/20
          transition-all duration-500 ease-out
          ${scrolled ? "scale-95 py-3 px-6 opacity-90" : "scale-100"}
        `}
      >
        {/* Logo */}
        <Link href="/" className="text-2xl font-black italic tracking-tighter hover:scale-105 transition-transform">
          B0LD
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`
                relative text-[10px] font-black uppercase tracking-[0.2em] py-1
                transition-colors hover:text-white/80
                ${pathname === link.href ? "text-white" : "text-white/60"}
              `}
            >
              {link.name}
              {pathname === link.href && (
                <motion.span 
                  layoutId="nav-pill-active"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Icons */}
        <div className="flex items-center gap-5 pl-4 border-l border-white/20">
          <button 
            onClick={() => setIsSizingOpen(true)}
            className="hover:scale-110 transition-transform group relative"
            title="Sizing Guide"
          >
            <Ruler size={18} />
          </button>
          <button className="hover:scale-110 transition-transform"><User size={18} /></button>
          <button className="relative hover:scale-110 transition-transform">
            <ShoppingCart size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full" />
          </button>
          <button 
            className="md:hidden hover:scale-110 transition-transform"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.div>

      {/* Sizing Guide Modal */}
      <SizingGuide isOpen={isSizingOpen} onClose={() => setIsSizingOpen(false)} />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute top-24 left-6 right-6 p-8 bg-primary text-white rounded-[2rem] shadow-2xl z-40 flex flex-col items-center gap-8 pointer-events-auto border border-white/10"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-2xl font-black uppercase italic tracking-tighter hover:text-white/70 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
