import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { History, Target, Users, MapPin } from "lucide-react";
import * as motion from "framer-motion/client"; // Use framer-motion/client for server components

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="px-6 py-24 max-w-7xl mx-auto space-y-32">
        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.85]">
              Born in the <br /><span className="text-primary">Trenches.</span>
            </h1>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed">
              B0LD was founded in 2026 with a single mission: to create footwear that can 
              withstand the chaos of the modern world without sacrificing high-fashion aesthetics.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border">
              <div className="space-y-2">
                <div className="text-4xl font-black italic">2026</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-primary">Year Founded</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-black italic">500K+</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-primary">Guests Served</div>
              </div>
            </div>
          </motion.div>
          <div className="relative aspect-square bg-muted/20 rounded-3xl overflow-hidden border border-border/50">
            <Image 
              src="/hero.png" 
              alt="Brand Story" 
              fill 
              className="object-contain p-12 -rotate-12 hover:rotate-0 transition-transform duration-700" 
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="space-y-16">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-center">Our <span className="text-primary">Coordinates</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Precision", desc: "Every stitch is placed with mathematical intent." },
              { icon: Users, title: "Community", desc: "We build for the b0ld, the outsiders, and the dreamers." },
              { icon: MapPin, title: "Global", desc: "Headquartered in Neo-Tokyo, operating worldwide." }
            ].map((v, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-secondary/50 backdrop-blur-sm border border-border/50 rounded-3xl space-y-6 hover:border-primary/50 transition-colors"
              >
                <v.icon className="text-primary w-10 h-10" />
                <h3 className="text-2xl font-black uppercase italic tracking-tighter">{v.title}</h3>
                <p className="text-secondary-foreground/60 font-medium italic">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
