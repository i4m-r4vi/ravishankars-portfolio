import { motion } from "motion/react";
import { Github, Linkedin, Twitter, FileText, Menu, X } from "lucide-react";
import { useState } from "react";
import { SOCIAL_LINKS } from "../constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-ink/80 backdrop-blur-md border-b border-white/10 h-24 flex items-center">
      <div className="max-w-7xl mx-auto px-12 w-full flex items-center justify-between">
        <motion.a 
          href="#"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-bold uppercase tracking-[0.4em]"
        >
          RAVISHANKAR
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {navItems.map((item, idx) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="text-[10px] uppercase tracking-[0.3em] font-semibold hover:text-accent transition-colors"
            >
              {item.name}
            </motion.a>
          ))}
          <div className="flex items-center gap-6 border-l border-white/10 pl-6 h-6">
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
              <Github size={14} />
            </a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors text-accent">
              <Linkedin size={14} />
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-paper border-b border-ink/10 px-6 py-8 flex flex-col gap-6"
        >
          {navItems.map((item) => (
            <a 
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-xl font-display uppercase tracking-widest"
            >
              {item.name}
            </a>
          ))}
          <div className="flex gap-6 pt-4 border-t border-ink/10">
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer"><Github size={24} /></a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer"><Linkedin size={24} /></a>
            <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noreferrer"><Twitter size={24} /></a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
