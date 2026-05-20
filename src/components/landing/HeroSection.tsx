"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { getAssetPath } from "@/utils/paths";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function HeroSection() {
  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden px-6 pt-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(0,71,255,0.15),transparent_70%)]" />
      
      <motion.div 
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="text-center space-y-8 max-w-5xl z-10"
      >
        <motion.h1 variants={fadeInUp} className="text-5xl md:text-8xl lg:text-[11rem] font-black tracking-tighter uppercase italic leading-[0.85] drop-shadow-2xl">
          B0ldness in <br /> 
          <span className="text-primary drop-shadow-[0_0_30px_rgba(0,71,255,0.3)]">Every Step.</span>
        </motion.h1>
        
        <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
          Experience the future of athletic footwear. Engineered for performance, 
          designed for the b0ld urban explorer.
        </motion.p>
        
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              href="/shop" 
              className="group relative flex items-center gap-3 bg-primary text-primary-foreground px-10 py-5 text-sm font-black uppercase tracking-[0.2em] hover:shadow-[0_0_30px_rgba(0,71,255,0.8)] transition-all rounded-[1rem] overflow-hidden"
            >
              <motion.span whileHover={{ x: -5 }}>Shop the Drop</motion.span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              href="/collections" 
              className="galaxy-btn-neon px-10 py-5 text-sm font-black uppercase tracking-[0.2em] rounded-[1rem] inline-block"
            >
              View Collections
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: -5 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="relative w-full max-w-6xl aspect-[16/9] mt-[-60px] md:mt-[-180px] -z-10 pointer-events-none select-none"
      >
        <Image
          src={getAssetPath("/hero.png")}
          alt="B0LD Sneaker V1"
          fill
          sizes="100vw"
          className="object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
          priority
          loading="eager"
        />
      </motion.div>
    </section>
  );
}
