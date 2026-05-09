import { motion } from "motion/react";
import { PROJECTS } from "../constants";
import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  return (
    <section id="projects" className="py-32 bg-ink text-paper border-b border-white/10">
      <div className="max-w-7xl mx-auto px-12">
        <div className="flex flex-col gap-4 mb-32">
          <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px]">Work / Projects</span>
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none italic">
            Visual <br />
            Archive<span className="text-accent">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {PROJECTS.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-ink group relative flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 z-20">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-accent bg-black/40 backdrop-blur-md px-3 py-1 border border-white/10">
                     0{idx + 1}
                   </span>
                </div>
              </div>

              <div className="p-6 md:p-10 flex flex-col gap-6 flex-1">
                <div className="flex flex-col gap-2">
                   <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic leading-none">{project.title}</h3>
                   <p className="text-paper/40 text-xs md:text-sm leading-relaxed max-w-sm mt-2">{project.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 border border-white/10 text-[9px] uppercase tracking-widest font-bold text-paper/30">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex gap-6 pt-6 border-t border-white/5">
                   <a href="#" className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest hover:text-accent transition-colors">
                     Case Study <ExternalLink size={12} />
                   </a>
                   <a href="#" className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest hover:text-accent transition-colors">
                     Github <Github size={12} />
                   </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
