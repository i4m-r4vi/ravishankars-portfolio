import { motion } from "motion/react";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../services/api";
import { DEFAULT_NAVBAR } from "../defaults";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<any>(DEFAULT_NAVBAR);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/navbar");
        if (res.data.data && Object.keys(res.data.data).length > 0) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error("Using default navbar data due to API error");
      }
    };
    fetchData();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    if (url.startsWith("#")) {
      e.preventDefault();
      const targetId = url.replace("#", "");
      const elem = document.getElementById(targetId);
      setIsOpen(false);
      
      if (elem) {
        elem.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-ink/80 backdrop-blur-md border-b border-white/10 h-24 flex items-center">
      <div className="max-w-7xl mx-auto px-12 w-full flex items-center justify-between">
        <motion.a
          href="#"
          onClick={(e) => handleNavClick(e, "#hero")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-bold uppercase tracking-[0.4em] text-white"
        >
          {data.logoText}
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {data.links?.map((item: any, idx: number) => (
            <motion.a
              key={idx}
              href={item.url}
              onClick={(e) => handleNavClick(e, item.url)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="text-[10px] uppercase tracking-[0.3em] font-semibold text-white/80 hover:text-accent transition-colors"
            >
              {item.label}
            </motion.a>
          ))}
          <div className="flex items-center gap-6 border-l border-white/10 pl-6 h-6">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-white hover:text-accent transition-colors">
              <Github size={14} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-accent hover:text-accent transition-colors">
              <Linkedin size={14} />
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden absolute top-24 left-0 w-full bg-ink border-b border-white/10 px-6 py-8 flex flex-col gap-6"
        >
          {data.links?.map((item: any) => (
            <a
              key={item.label}
              href={item.url}
              onClick={(e) => handleNavClick(e, item.url)}
              className="text-xl font-display uppercase tracking-widest text-white"
            >
              {item.label}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
