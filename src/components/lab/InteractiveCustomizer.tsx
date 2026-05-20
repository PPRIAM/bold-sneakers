"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Paintbrush, Save, RotateCcw } from "lucide-react";

const PARTS = [
  { id: "sole", name: "Outsole" },
  { id: "upper", name: "Upper Mesh" },
  { id: "laces", name: "Laces" },
  { id: "accents", name: "Accents" }
];

const COLORS = [
  { name: "Stealth", hex: "#000000" },
  { name: "Electric Blue", hex: "#0047FF" },
  { name: "Lava", hex: "#FF0000" },
  { name: "Citron", hex: "#D4FF00" },
  { name: "Ghost", hex: "#FFFFFF" }
];

export default function InteractiveCustomizer() {
  const [activePart, setActivePart] = useState("upper");
  const [selections, setSelections] = useState<Record<string, string>>({
    sole: "#000000",
    upper: "#000000",
    laces: "#FFFFFF",
    accents: "#0047FF"
  });

  const updateColor = (color: string) => {
    setSelections(prev => ({ ...prev, [activePart]: color }));
  };

  const reset = () => {
    setSelections({
      sole: "#000000",
      upper: "#000000",
      laces: "#FFFFFF",
      accents: "#0047FF"
    });
  };

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto space-y-20">
      <div className="text-center space-y-4">
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">
          Custom <span className="text-primary">Configurator</span>
        </h2>
        <p className="text-muted-foreground text-xl font-medium uppercase tracking-[0.2em]">Build Your Personal B0LD Silhouette</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Visualizer */}
        <div className="relative aspect-square bg-muted/20 rounded-[3rem] border border-border/50 flex items-center justify-center p-12 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,71,255,0.1),transparent_70%)]" />
          
          <svg viewBox="0 0 100 60" className="w-full h-auto drop-shadow-[0_30px_50px_rgba(0,0,0,0.5)] scale-110">
            {/* Sole - Layered for depth */}
            <path 
              d="M5,45 Q5,55 20,55 L80,55 Q95,55 95,45 L95,40 L5,40 Z" 
              fill={selections.sole} 
              className="transition-colors duration-500 brightness-75" 
            />
            <path 
              d="M5,42 Q50,48 95,42 L95,38 Q50,44 5,38 Z" 
              fill={selections.sole} 
              className="transition-colors duration-500" 
            />
            
            {/* Upper - Main Body */}
            <path 
              d="M5,38 Q5,10 35,5 Q60,2 85,25 Q95,35 95,38 Z" 
              fill={selections.upper} 
              className="transition-colors duration-500" 
            />
            
            {/* Toe Cap */}
            <path 
              d="M5,38 Q5,25 20,20 Q25,35 25,38 Z" 
              fill={selections.accents} 
              className="transition-colors duration-500 opacity-80" 
            />

            {/* Heel Counter */}
            <path 
              d="M85,15 Q95,20 95,38 L80,38 Q75,25 85,15 Z" 
              fill={selections.accents} 
              className="transition-colors duration-500" 
            />

            {/* Lacing System */}
            <path 
              d="M35,15 L60,30" 
              stroke={selections.laces} 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              fill="none"
              className="transition-colors duration-500 opacity-60" 
            />
            <path d="M38,12 L63,27" stroke={selections.laces} strokeWidth="1.5" strokeLinecap="round" fill="none" className="transition-colors duration-500" />
            <path d="M42,9 L67,24" stroke={selections.laces} strokeWidth="1.5" strokeLinecap="round" fill="none" className="transition-colors duration-500" />
            <path d="M46,6 L71,21" stroke={selections.laces} strokeWidth="1.5" strokeLinecap="round" fill="none" className="transition-colors duration-500" />

            {/* Side Accent Line */}
            <path 
              d="M30,30 Q50,20 80,30" 
              stroke={selections.accents} 
              strokeWidth="0.5" 
              fill="none"
              className="transition-colors duration-500" 
            />
          </svg>

          <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
            <div className="bg-black/80 backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Current Config</p>
              <p className="text-sm font-bold uppercase italic">{activePart} // {COLORS.find(c => c.hex === selections[activePart])?.name}</p>
            </div>
            <button 
              onClick={reset}
              className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-xl"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-12">
          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] flex items-center gap-3">
              <Paintbrush size={16} className="text-primary" /> Select Part
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {PARTS.map(part => (
                <button 
                  key={part.id}
                  onClick={() => setActivePart(part.id)}
                  className={`py-6 px-8 text-xs font-black uppercase tracking-widest rounded-2xl border transition-all text-left ${activePart === part.id ? "bg-primary border-primary text-white shadow-[0_10px_30px_rgba(0,71,255,0.3)]" : "bg-muted/30 border-border/50 hover:border-primary/50"}`}
                >
                  {part.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.3em]">Choose Color</h3>
            <div className="flex flex-wrap gap-4">
              {COLORS.map(color => (
                <button 
                  key={color.name}
                  onClick={() => updateColor(color.hex)}
                  className={`group relative w-16 h-16 rounded-full border-2 transition-all p-1 ${selections[activePart] === color.hex ? "border-primary scale-110" : "border-transparent hover:border-white/20"}`}
                >
                  <div 
                    className="w-full h-full rounded-full shadow-inner" 
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-8">
            <button className="w-full bg-primary text-white py-6 text-sm font-black uppercase tracking-[0.3em] rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(0,71,255,0.4)]">
              <Save size={20} /> Save Configuration
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
