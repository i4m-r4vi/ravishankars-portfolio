import { motion } from "motion/react";
import { useState, useEffect } from "react";
import api from "../services/api";
import { DEFAULT_SKILLS } from "../defaults";

export default function Skills() {
  const [categories, setCategories] = useState<any[]>(DEFAULT_SKILLS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/skills");
        if (res.data.data && res.data.data.length > 0) {
          setCategories(res.data.data);
        }
      } catch (err) {
        console.error("Using default skills due to API error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="skills" className="py-32 bg-ink text-paper border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col gap-4 mb-20 md:mb-32">
          <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px]">Technical Stack / Arsenal</span>
          <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none italic">
            Core <br />
            Craft<span className="text-accent">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {categories.map((cat, catIdx) => (
            <div key={cat._id || catIdx} className="bg-ink p-8 md:p-10 flex flex-col gap-10">
              <div className="flex items-center gap-6">
                <span className="text-4xl md:text-5xl font-black text-accent/20 italic leading-none">0{catIdx + 1}</span>
                <h3 className="text-lg md:text-xl font-bold uppercase tracking-widest text-paper/80">{cat.category}</h3>
              </div>

              <div className="flex flex-col gap-8">
                {cat.skills?.map((skill: any, idx: number) => (
                  <div key={skill.name} className="flex flex-col gap-3">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-paper/40">{skill.name}</span>
                      <span className="text-[9px] font-bold text-accent">{skill.level}%</span>
                    </div>
                    <div className="h-px bg-white/5 w-full relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: idx * 0.1 }}
                        className="absolute inset-y-0 left-0 bg-accent"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
