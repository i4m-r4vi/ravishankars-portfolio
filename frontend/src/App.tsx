/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import CardNav from "./components/CardNav";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export default function App() {
  const [loading, setLoading] = useState(true);

  const navItems = [
    {
      label: "Profile",
      bgColor: "#1B1722",
      textColor: "#fff",
      links: [
        { label: "About Me", ariaLabel: "Learn about Ravishankar", href: "#about" },
        { label: "Experience", ariaLabel: "Work history", href: "#resume" }
      ]
    },
    {
      label: "Portfolio", 
      bgColor: "#2F293A",
      textColor: "#fff",
      links: [
        { label: "Selected Works", ariaLabel: "Featured Projects", href: "#projects" },
        { label: "Tech Stack", ariaLabel: "Technical Skills", href: "#skills" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#80ADA0", 
      textColor: "#121212",
      links: [
        { label: "Email Me", ariaLabel: "Send an email", href: "mailto:ayswarym04@gmail.com" },
        { label: "GitHub", ariaLabel: "View GitHub profile", href: "#" },
        { label: "LinkedIn", ariaLabel: "Connect on LinkedIn", href: "#" }
      ]
    }
  ];

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading ? (
        <motion.div 
          key="loader"
          exit={{ opacity: 0, scale: 1.1 }}
          className="fixed inset-0 z-[100] bg-ink flex flex-col items-center justify-center p-12 font-mono"
        >
          {/* ... existing splash screen content ... */}
          <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
            <div className="absolute top-10 left-10 text-[10px] space-y-1">
              <p>SYS_INIT: BOOT_SEQUENCE_09X</p>
              <p>AUTH_PROTOCOL: SECURE_SHELL</p>
              <p>KERNEL_REVISION: 5.15.0-DEV</p>
            </div>
            <div className="absolute bottom-10 right-10 text-[10px] space-y-1 text-right">
              <p>LAT: 12.9716° N</p>
              <p>LONG: 77.5946° E</p>
              <p>STATUS: DEPLOYING_I4M_R4VI</p>
            </div>
            <div className="w-full h-full border-[1px] border-white/5 grid grid-cols-12 grid-rows-12">
              {Array.from({ length: 144 }).map((_, i) => (
                <div key={i} className="border-[0.5px] border-white/5" />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-12 relative">
             <div className="flex flex-col items-center">
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.5, 1] }}
                  transition={{ duration: 0.2, repeat: 3 }}
                  className="text-accent text-[10px] tracking-[0.6em] mb-4 font-black"
                >
                  INITIALIZING_QUANTUM_CORE
                </motion.span>
                <div className="overflow-hidden">
                  <motion.h2 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="text-[12vw] lg:text-[8vw] font-black text-paper uppercase leading-none tracking-tighter"
                  >
                    RAVISHANKAR
                  </motion.h2>
                </div>
             </div>
             
             <div className="flex flex-col items-center gap-4 w-80">
                <div className="w-full h-[2px] bg-white/5 relative overflow-hidden">
                    <motion.div 
                      initial={{ x: "-100%" }}
                      animate={{ x: "0%" }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className="absolute inset-0 bg-accent"
                    />
                </div>
                <div className="flex justify-between w-full text-[8px] uppercase tracking-widest text-paper/30 font-bold">
                   <span>Root_Access_Granted</span>
                   <motion.span
                     animate={{ opacity: [1, 0] }}
                     transition={{ repeat: Infinity, duration: 0.5 }}
                   >
                     System_Active_
                   </motion.span>
                </div>
             </div>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative overflow-x-hidden w-full"
        >
          <CardNav 
            items={navItems}
            baseColor="#fff"
            menuColor="#000"
            buttonBgColor="#80ADA0"
            buttonTextColor="#121212"
            ease="power3.out"
            theme="dark"
          />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Resume />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

