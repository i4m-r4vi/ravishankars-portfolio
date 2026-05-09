import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import gsap from "gsap";

interface NavItem {
  label: string;
  bgColor: string;
  textColor: string;
  links: { label: string; ariaLabel: string; href?: string }[];
}

interface CardNavProps {
  logo?: string;
  logoAlt?: string;
  items: NavItem[];
  baseColor: string;
  menuColor: string;
  buttonBgColor: string;
  buttonTextColor: string;
  ease?: string;
  theme?: "light" | "dark";
}

export default function CardNav({
  logo,
  logoAlt,
  items,
  baseColor,
  menuColor,
  buttonBgColor,
  buttonTextColor,
  ease = "power3.out",
  theme = "dark",
}: CardNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 ease-in-out flex justify-center ${
        isScrolled ? "py-6" : "py-0"
      }`}
    >
      <div 
        className={`relative transition-all duration-700 ${
          isScrolled 
            ? "w-[92%] md:w-[90%] max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 shadow-2xl" 
            : "w-full max-w-7xl px-6 md:px-12 py-6 md:py-8 border-b border-white/10 bg-transparent"
        } flex items-center justify-between`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          {logo ? (
            <img src={logo} alt={logoAlt} className="h-8 w-auto" />
          ) : (
            <div className="text-xs font-black uppercase tracking-[0.4em] text-paper group-hover:text-accent transition-colors">
              RAVISHANKAR
            </div>
          )}
        </a>

        {/* Desktop Navigation (Cards) */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex gap-2">
            {items.map((item, idx) => (
              <div 
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveCard(idx)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <button 
                  className={`px-5 py-2 text-[10px] uppercase font-black tracking-widest transition-all rounded-lg flex items-center gap-2 group ${
                    isScrolled ? "text-paper/60 hover:text-white" : "text-paper/80 hover:text-accent"
                  }`}
                >
                  {item.label}
                  <ChevronDown size={10} className={`transition-transform duration-300 ${activeCard === idx ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {activeCard === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ ease: "circOut", duration: 0.3 }}
                      className="absolute top-full left-0 mt-2 w-56 p-4 rounded-xl shadow-2xl border border-white/10 overflow-hidden"
                      style={{ backgroundColor: item.bgColor, color: item.textColor }}
                    >
                      <div className="flex flex-col gap-3">
                        {item.links.map(link => (
                          <a 
                            key={link.label}
                            href={link.href || "#"}
                            aria-label={link.ariaLabel}
                            className="text-[11px] font-bold uppercase tracking-widest flex items-center justify-between group/link"
                          >
                            {link.label}
                            <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <button 
            className="ml-6 px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] transition-transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            Get In Touch
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden text-paper p-2 hover:text-accent transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[70] bg-ink/95 backdrop-blur-2xl flex flex-col p-12 md:hidden"
          >
            <div className="flex justify-between items-center mb-20">
              <span className="text-xs font-black tracking-widest">RAVISHANKAR</span>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-4 rounded-full border border-white/10 text-accent"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-12">
              {items.map((item, idx) => (
                <div key={item.label} className="flex flex-col gap-6">
                  <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-accent">0{idx + 1}</span>
                  <h3 className="text-5xl font-black uppercase tracking-tighter italic">{item.label}</h3>
                  <div className="flex flex-col gap-4 pl-4 border-l border-white/10">
                    {item.links.map(link => (
                      <a 
                        key={link.label}
                        href="#"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-lg font-serif italic text-white/60 hover:text-accent"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-12 border-t border-white/10 flex justify-between items-center">
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/30">Available Oct 2026</span>
              <button 
                 className="p-5 rounded-full bg-accent text-white"
                 onClick={() => setIsMenuOpen(false)}
              >
                <ArrowRight size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
