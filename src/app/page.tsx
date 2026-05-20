import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import SneakerCard from "@/components/SneakerCard";
import { Zap, Shield, Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";
import fs from "fs/promises";
import path from "path";

async function getTrendingProducts() {
  const dataPath = path.join(process.cwd(), "src/data/products.json");
  const data = await fs.readFile(dataPath, "utf8");
  const products = JSON.parse(data);
  return products.slice(0, 3).map((p: any) => ({ ...p, tag: p.id === 1 ? "New Arrival" : undefined }));
}

import * as motion from "framer-motion/client";

export default async function Home() {
  const trendingProducts = await getTrendingProducts();

  return (
    <main className="relative flex-1 min-h-screen overflow-hidden">
      {/* Fixed Backgrounds */}
      <div className="fixed inset-0 -z-20 animate-mesh opacity-40" />
      <div className="fixed inset-0 -z-30 bg-black" />
      
      <Navbar />
      
      <HeroSection />

      {/* Features Section */}
      <section className="py-32 bg-secondary text-secondary-foreground px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 relative">
          {[
            { icon: Zap, title: "Maximum Energy", desc: "Our proprietary B0LD-CORE™ technology returns 98% of impact energy back to your stride." },
            { icon: Shield, title: "Indestructible Build", desc: "Military-grade materials meet high-fashion aesthetics. Built to last a lifetime." },
            { icon: Rocket, title: "Hyper-Speed Launch", desc: "Limited drops every month. Get exclusive access to the most sought-after silhouettes." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group space-y-6 p-8 border border-border/10 hover:border-primary/30 transition-colors rounded-xl bg-background/5"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <feature.icon className="text-primary w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black uppercase italic tracking-tighter">{feature.title}</h3>
              <p className="text-secondary-foreground/60 leading-relaxed text-lg font-medium">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto space-y-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.9]">Trending <br /><span className="text-primary">Drops</span></h2>
            <p className="text-muted-foreground text-xl font-medium">The most popular styles this season.</p>
          </div>
          <Link href="/shop" className="group font-black uppercase tracking-[0.2em] text-sm flex items-center gap-3 hover:text-primary transition-colors border-b-2 border-primary pb-2">
            See All <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {trendingProducts.map((product: any) => (
            <SneakerCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

