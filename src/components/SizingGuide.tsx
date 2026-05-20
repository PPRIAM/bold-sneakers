"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Ruler, CheckCircle2 } from "lucide-react";

export default function SizingGuide({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [brandSize, setBrandSize] = useState("");
  const [recommendedSize, setRecommendedSize] = useState<string | null>(null);

  const handleCalculate = () => {
    if (!selectedBrand || !brandSize) return;
    
    // Simple logic for recommendation
    const sizeNum = parseFloat(brandSize);
    let recommendation = sizeNum;
    
    if (selectedBrand === "Nike") recommendation += 0.5;
    if (selectedBrand === "Adidas") recommendation -= 0.5;
    
    setRecommendedSize(recommendation.toFixed(1));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-secondary border border-border/50 p-10 rounded-3xl z-[101] shadow-2xl"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-muted-foreground hover:text-white transition-colors">
              <X size={24} />
            </button>

            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Ruler className="text-primary" size={24} />
                </div>
                <div>
                  <h2 className="text-3xl font-black uppercase italic tracking-tighter">B0LD Sizing <span className="text-primary">Engine</span></h2>
                  <p className="text-muted-foreground text-sm font-medium">Find your perfect fit in seconds.</p>
                </div>
              </div>

              {!recommendedSize ? (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Select a brand you wear</label>
                    <div className="grid grid-cols-3 gap-3">
                      {["Nike", "Adidas", "New Balance"].map(brand => (
                        <button 
                          key={brand}
                          onClick={() => setSelectedBrand(brand)}
                          className={`py-3 text-xs font-bold rounded-lg border transition-all ${selectedBrand === brand ? "bg-primary border-primary text-white" : "bg-background/50 border-border/50 hover:border-primary/50"}`}
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">What is your size in that brand?</label>
                    <input 
                      type="number" 
                      step="0.5"
                      placeholder="e.g. 10.5"
                      value={brandSize}
                      onChange={(e) => setBrandSize(e.target.value)}
                      className="w-full bg-background/50 border border-border/50 rounded-lg py-4 px-6 text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <button 
                    onClick={handleCalculate}
                    disabled={!selectedBrand || !brandSize}
                    className="w-full bg-foreground text-background py-5 font-black uppercase tracking-[0.2em] text-xs rounded-lg hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Calculate My B0LD Size
                  </button>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center space-y-6 py-4"
                >
                  <div className="flex justify-center">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
                      <CheckCircle2 size={40} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Your Recommended B0LD Size</p>
                    <h3 className="text-7xl font-black italic tracking-tighter text-primary">{recommendedSize}</h3>
                  </div>
                  <button 
                    onClick={() => setRecommendedSize(null)}
                    className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-white transition-colors"
                  >
                    Start Over
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
