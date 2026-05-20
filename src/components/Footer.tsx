"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white pt-24">
      <div className="px-6 max-w-7xl mx-auto space-y-24">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-6 max-w-md">
            <div className="text-4xl font-black italic text-primary tracking-tighter">B0LD</div>
            <p className="text-lg font-medium leading-relaxed text-white/60">
              Defining the B0LD standard in footwear since 2026. Join the movement.
            </p>
            <div className="flex gap-4">
              {['TW', 'IG', 'FB'].map(sm => (
                <button key={sm} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary hover:text-white transition-all font-black text-xs">{sm}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
            <div className="space-y-6">
              <h5 className="font-black uppercase tracking-widest text-xs text-white">Shop</h5>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-wider text-white/40">
                <li><Link href="/shop" className="hover:text-primary transition-colors">All Sneakers</Link></li>
                <li><Link href="/launchpad" className="hover:text-primary transition-colors">New Arrivals</Link></li>
                <li><Link href="/shop" className="hover:text-primary transition-colors">Exclusive Drops</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h5 className="font-black uppercase tracking-widest text-xs text-white">Support</h5>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-wider text-white/40">
                <li><Link href="#" className="hover:text-primary transition-colors">Shipping</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Returns</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
          <div>© 2026 B0LD Sneaker Co. All rights reserved.</div>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Massive B0LD Text */}
      <div className="w-full overflow-hidden pt-12">
        <div className="text-[25vw] font-black italic tracking-tighter leading-none text-white/5 select-none pointer-events-none text-center">
          B0LD
        </div>
      </div>
    </footer>
  );
}
