import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DropCard from "@/components/DropCard";
import SubscribeForm from "@/components/launchpad/SubscribeForm";
import { Rocket } from "lucide-react";
import fs from "fs/promises";
import path from "path";

async function getDrops() {
  const dataPath = path.join(process.cwd(), "src/data/drops.json");
  const data = await fs.readFile(dataPath, "utf8");
  const json = JSON.parse(data);
  return json.map((d: any) => ({ ...d, date: new Date(d.date) }));
}

export default async function LaunchpadPage() {
  const drops = await getDrops();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto space-y-16 md:space-y-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12">
          <div className="space-y-6 max-w-2xl">
            <div className="flex items-center gap-4 text-primary">
              <Rocket size={32} strokeWidth={3} />
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.4em]">Operational Status: Active</span>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase italic leading-[0.8] md:leading-[0.85]">
              The <br /><span className="text-primary">Launchpad</span>
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground font-medium leading-relaxed">
              Our most exclusive silhouettes, engineered for the b0ld. Set your coordinates 
              and prepare for the drop.
            </p>
          </div>
          
          <div className="hidden md:block p-8 border-l border-border/50 bg-secondary/10">
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-4">Live Statistics</div>
            <div className="grid grid-cols-2 gap-12">
              <div>
                <div className="text-3xl font-black italic tracking-tighter">1.2M</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-primary">Waitlisted</div>
              </div>
              <div>
                <div className="text-3xl font-black italic tracking-tighter">03</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-primary">Drops Scheduled</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
          {drops.map((drop: any, i: number) => (
            <div key={drop.name}>
              <DropCard {...drop} priority={i === 0} />
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter / Hype signup */}
      <section className="px-6 py-20 md:py-32 bg-primary text-primary-foreground overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-12 relative z-10">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">
            Don't miss the <br />next descent.
          </h2>
          <p className="text-xl font-medium opacity-80">
            Join 50,000+ guests on the B0LD VIP list for 15-minute early access to all drops.
          </p>
          <SubscribeForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
