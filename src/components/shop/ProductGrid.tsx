"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import SneakerCard from "@/components/SneakerCard";

interface ProductGridProps {
  products: any[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(300);
  const [selectedColor, setSelectedColor] = useState("All");

  const colors = ["All", ...Array.from(new Set(products.map(p => p.color)))];

  const filteredProducts = products.filter(p => {
    const matchesFilter = filter === "All" || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.color.toLowerCase().includes(search.toLowerCase());
    const matchesPrice = p.price <= maxPrice;
    const matchesColor = selectedColor === "All" || p.color === selectedColor;
    return matchesFilter && matchesSearch && matchesPrice && matchesColor;
  });

  return (
    <div className="space-y-16">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/10 pb-8">
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2">
            {["All", "Performance", "Lifestyle", "Tactical"].map((cat) => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded-full border whitespace-nowrap ${filter === cat ? "bg-primary text-primary-foreground border-primary shadow-[0_0_20px_rgba(0,71,255,0.4)]" : "border-border/50 hover:border-primary/50 text-muted-foreground hover:text-white"}`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative group w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search Silhouette..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-muted/20 border border-border/50 rounded-xl py-4 pl-12 pr-6 text-sm font-medium focus:outline-none focus:border-primary/50 focus:bg-muted/40 transition-all"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-8 bg-muted/10 p-6 rounded-2xl border border-border/30 overflow-hidden">
          <div className="flex flex-wrap items-center gap-6">
            <div className="space-y-3 min-w-[200px]">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <span>Max Price</span>
                <span className="text-primary font-bold">${maxPrice}</span>
              </div>
              <input 
                type="range" 
                min="100" 
                max="300" 
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div className="h-10 w-px bg-border/50 mx-4 hidden md:block" />

            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide w-full max-w-full no-scrollbar">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground whitespace-nowrap">Color:</span>
              <div className="flex items-center gap-3">
                {colors.map(color => (
                  <button 
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-1.5 text-[10px] font-bold uppercase rounded-md border transition-all whitespace-nowrap ${selectedColor === color ? "bg-white text-black border-white" : "bg-black/20 border-border/50 hover:border-white/30"}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
            <span className="text-muted-foreground">Sort By:</span>
            <button className="flex items-center gap-2 hover:text-primary transition-colors">
              Newest <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16"
      >
        <AnimatePresence mode='popLayout'>
          {filteredProducts.map((product) => (
            <SneakerCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
        
        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full py-32 text-center space-y-4"
          >
            <h3 className="text-4xl font-black uppercase italic tracking-tighter opacity-20">No silhouettes found</h3>
            <p className="text-muted-foreground font-medium uppercase tracking-[0.2em] text-xs">Try adjusting your filters or search terms.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
