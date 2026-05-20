"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface SneakerCardProps {
  product: {
    id: number;
    name: string;
    price: number | string;
    color: string;
    image: string;
    category?: string;
    tag?: string;
  };
}

export default function SneakerCard({ product }: SneakerCardProps) {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <motion.div 
      variants={fadeInUp}
      whileHover={{ y: -10 }}
      className="group space-y-6 cursor-pointer"
    >
      <div className="relative aspect-[4/5] bg-muted/30 overflow-hidden rounded-2xl border border-border/50">
        <Image 
          src={product.image} 
          alt={product.name} 
          fill 
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain p-6 group-hover:scale-110 transition-transform duration-700" 
        />
        {product.tag && (
          <div className="absolute top-6 left-6 bg-primary text-primary-foreground px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl">
            {product.tag}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute bottom-6 left-6 right-6 bg-white text-black py-4 font-black uppercase tracking-widest text-xs opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 rounded-lg shadow-2xl"
        >
          Quick Add
        </motion.button>
      </div>
      <div className="flex justify-between items-start px-2">
        <div className="space-y-1">
          <h4 className="text-2xl font-black uppercase italic tracking-tighter group-hover:text-primary transition-colors">{product.name}</h4>
          <p className="text-muted-foreground font-semibold text-sm uppercase tracking-wider">{product.color} {product.category && `// ${product.category}`}</p>
        </div>
        <p className="text-2xl font-black tracking-tighter">${product.price}</p>
      </div>
    </motion.div>
  );
}
