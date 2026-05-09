import { motion } from "motion/react";

export default function About() {
  return (
    <section id="about" className="py-32 bg-ink text-paper border-b border-white/10">
      <div className="max-w-7xl mx-auto px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-accent mb-4 block">The Philosophy</span>
              <h2 className="text-5xl font-display uppercase leading-tight">
                Design <br />
                As An <br />
                Identity
              </h2>
            </div>
          </div>
          <div className="lg:col-span-8 flex flex-col gap-16">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black leading-[1.05] tracking-tighter uppercase"
            >
              I bridge the gap between complex <span className="text-accent italic font-serif font-light lowercase">codebases</span> and secure <span className="text-accent italic font-serif font-light lowercase">deployments</span>.
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-paper/50 font-sans leading-relaxed text-lg">
              <p>
                As a MERN Stack Developer and Cloud DevOps Engineer, I specialize in the full lifecycle of software products—from architectural design and database optimization to automated delivery pipelines and rigorous security auditing.
              </p>
              <p>
                My passion lies at the intersection of development and operations, ensuring that high-performance React applications are backed by resilient cloud infrastructure and protected by industry-leading security protocols.
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
