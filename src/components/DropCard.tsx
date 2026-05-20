"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

interface DropCardProps {
  name: string;
  price: string;
  date: Date;
  image: string;
  colorway: string;
  priority?: boolean;
}

export default function DropCard({ name, price, date, image, colorway, priority }: DropCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group relative bg-secondary p-1 rounded-2xl overflow-hidden border border-border/10 hover:shadow-[0_0_50px_rgba(0,71,255,0.15)] transition-all duration-500"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-background">
        <Image 
          src={image} 
          alt={name} 
          fill 
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
          priority={priority}
        />
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
          <div className="bg-primary text-primary-foreground px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full shadow-2xl group-hover:shadow-[0_0_20px_rgba(0,71,255,0.6)] transition-all">
            Upcoming Drop
          </div>
          <button className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors shadow-2xl">
            <Bell size={20} />
          </button>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-8 left-8 right-8 space-y-6">
          <div className="space-y-1">
            <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white">{name}</h3>
            <p className="text-white/60 font-bold text-xs uppercase tracking-[0.2em]">{colorway}</p>
          </div>
          <div className="pt-4 border-t border-white/10 text-white">
            <CountdownTimer targetDate={date} />
          </div>
        </div>
      </div>
      
      <div className="p-6 flex justify-between items-center">
        <div className="text-2xl font-black tracking-tighter text-secondary-foreground">{price}</div>
        <button className="text-xs font-black uppercase tracking-widest border-b-2 border-primary pb-1 hover:text-primary transition-colors">
          Remind Me
        </button>
      </div>
    </motion.div>
  );
}
