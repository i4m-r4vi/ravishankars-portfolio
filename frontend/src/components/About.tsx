import { motion } from "motion/react";
import { useState, useEffect } from "react";
import api from "../services/api";
import { DEFAULT_ABOUT } from "../defaults";

export default function About() {
  const [data, setData] = useState<any>(DEFAULT_ABOUT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/about");
        if (res.data.data && Object.keys(res.data.data).length > 0) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error("Using default about data due to API error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="about" className="py-32 bg-ink text-paper border-b border-white/10">
      <div className="max-w-7xl mx-auto px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-12">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-accent mb-4 block">The Philosophy</span>
                <h2 className="text-5xl font-display uppercase leading-tight">
                  Design <br />
                  As An <br />
                  Identity
                </h2>
              </div>
              
              <div className="relative group max-w-[280px]">
                <div className="absolute -inset-2 bg-accent/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  <img 
                    src={data.imageUrl || "https://placehold.co/800x1000?text=IDENTITY"} 
                    alt="Technical Identity" 
                    className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-1000"
                  />
                  {/* Technical Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 py-2 px-3 bg-black/40 backdrop-blur-md border border-white/5 rounded flex justify-between items-center">
                    <span className="text-[8px] font-mono text-accent uppercase tracking-widest">ID_VERIFIED</span>
                    <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8 flex flex-col gap-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black leading-[1.05] tracking-tighter uppercase"
            >
              {data.title}
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-paper/50 font-sans leading-relaxed text-lg">
              <p className="whitespace-pre-line">
                {data.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-16 border-t border-white/10">
              <div className="flex flex-col gap-3">
                <span className="text-accent font-bold text-[9px] uppercase tracking-[0.3em]">Base Location</span>
                <span className="text-xl uppercase tracking-tighter font-black">Tamilnadu, Karnataka</span>
              </div>
              <div className="flex flex-col gap-3 text-white">
                <span className="text-accent font-bold text-[9px] uppercase tracking-[0.3em]">Core Focus</span>
                <span className="text-xl uppercase tracking-tighter font-black">MERN / DevOps</span>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-accent font-bold text-[9px] uppercase tracking-[0.3em]">Current Status</span>
                <span className="text-xl uppercase tracking-tighter font-black">Securing Clouds</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
