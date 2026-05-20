"use client";

import { useRef } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Zap, Wind, Cpu } from "lucide-react";

export default function TheLabPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const shoeScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);
  const shoeRotate = useTransform(scrollYProgress, [0, 0.5], [-5, 10]);
  const shoeOpacity = useTransform(scrollYProgress, [0.4, 0.6], [1, 0]);

  const techFeatures = [
    { icon: Cpu, title: "B0LD-CORE™", desc: "A liquid-polymer cushioning system that adapts to your unique foot shape in real-time.", y: 0 },
    { icon: Zap, title: "KINETIC-GRID", desc: "Energy-returning mesh upper that provides 360° support while maintaining extreme flexibility.", y: 400 },
    { icon: Wind, title: "AERO-VENT", desc: "Strategically placed ventilation ports that use movement to pull cool air through the chassis.", y: 800 },
    { icon: Shield, title: "TITAN-SHIELD", desc: "An abrasion-resistant outer shell designed to withstand urban environments and tactical use.", y: 1200 }
  ];

  return (
    <main ref={containerRef} className="relative min-h-[400vh] bg-black text-white">
      <Navbar />
      
      {/* Introduction */}
      <section className="h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="text-center space-y-8 z-10">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[12vw] font-black tracking-tighter uppercase italic leading-none"
          >
            THE <span className="text-primary">LAB</span>
          </motion.h1>
          <p className="text-xl md:text-2xl font-bold uppercase tracking-[0.3em] text-white/40">
            Precision Engineering // Human Motion
          </p>
        </div>
      </section>

      {/* Hero Sneaker Scroll Reveal */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.div 
          style={{ scale: shoeScale, rotate: shoeRotate, opacity: shoeOpacity }}
          className="relative w-full max-w-5xl aspect-square"
        >
          <Image
            src="/hero.png"
            alt="Sneaker Anatomy"
            fill
            sizes="100vw"
            className="object-contain filter drop-shadow-[0_0_100px_rgba(0,71,255,0.4)]"
          />
        </motion.div>
      </div>

      {/* Tech Breakdown Sections */}
      <div className="relative z-20">
        {techFeatures.map((feature, i) => (
          <section key={i} className="min-h-screen flex items-center justify-start px-6 md:px-24 py-24">
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-20%" }}
              className="max-w-xl space-y-6"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/20 border border-primary/40 rounded-2xl md:rounded-3xl flex items-center justify-center">
                <feature.icon size={32} className="md:size-[40px] text-primary" />
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">{feature.title}</h2>
              <p className="text-xl md:text-2xl text-white/60 font-medium leading-relaxed italic">
                {feature.desc}
              </p>
              <div className="w-12 h-1 bg-primary" />
            </motion.div>
          </section>
        ))}
      </div>

      {/* Interactive Customizer Section */}
      <InteractiveCustomizer />

      {/* Conclusion / CTA */}
      <section className="h-screen flex flex-col items-center justify-center px-6 text-center space-y-12">
        <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter max-w-4xl">
          Engineered for the <br /><span className="text-primary">Indestructible.</span>
        </h2>
        <Link 
          href="/launchpad"
          className="bg-white text-black px-16 py-6 text-xl font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all rounded-sm shadow-[0_0_50px_rgba(255,255,255,0.2)]"
        >
          Explore Launchpad
        </Link>
      </section>

      <Footer />
    </main>
  );
}

// Imports
import Link from "next/link";
import InteractiveCustomizer from "@/components/lab/InteractiveCustomizer";
