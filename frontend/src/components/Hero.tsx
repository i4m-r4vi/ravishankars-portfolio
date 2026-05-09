import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import api from "../services/api";
import { DEFAULT_HERO } from "../defaults";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<any>(DEFAULT_HERO);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/hero");
        if (res.data.data && Object.keys(res.data.data).length > 0) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error("Using default hero data due to API error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useGSAP(() => {
    if (loading) return;
    // Parallax effect
    gsap.to(textRef.current, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(imageRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: containerRef, dependencies: [loading] });

  const year = new Date().getFullYear();

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen grid grid-cols-12 overflow-hidden border-b border-white/10"
    >
      {/* Left Section: Large Hero Text */}
      <div className="col-span-12 lg:col-span-7 p-6 md:p-12 lg:p-16 flex flex-col justify-between border-r border-white/10 pt-24 md:pt-32 lg:pt-40 pb-12">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-accent text-[10px] tracking-[0.4em] uppercase mb-8 font-bold"
          >
            Ravishankar's Portfolio {year}
          </motion.p>
          <h1
            ref={textRef}
            className="text-[16vw] md:text-[14vw] lg:text-[110px] xl:text-[130px] leading-[0.82] font-black tracking-tighter text-paper uppercase"
          >
            {data.heading.split(' ').map((word: string, i: number) => (
              <span key={i}>{word}<br/></span>
            ))}
            <span className="text-accent">.</span>
          </h1>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-end gap-12 mt-16 md:mt-20">
          <div className="max-w-xs">
            <p className="text-sm text-paper/40 leading-relaxed font-sans mb-2">
              {data.subheading}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[9px] uppercase tracking-widest text-paper/30 font-bold">Domain Expertise</span>
            <div className="flex flex-wrap gap-2">
              {data.typingTexts?.map((text: string, i: number) => (
                <span key={i} className="px-4 py-1.5 border border-white/10 text-[9px] uppercase tracking-widest font-bold">{text}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Image & Tech Visual */}
      <div className="col-span-12 lg:col-span-5 flex flex-col pt-12 lg:pt-0">
        <div
          ref={imageRef}
          className="flex-1 bg-ink relative group overflow-hidden flex items-center justify-center p-6 md:p-12 mb-0"
        >
          {/* Tech Grid Background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="w-full h-full grid grid-cols-12 grid-rows-12">
              {Array.from({ length: 144 }).map((_, i) => (
                <div key={i} className="border-[0.5px] border-white/5" />
              ))}
            </div>
          </div>

          <div className="relative aspect-[3/4] w-full max-w-sm overflow-hidden bg-ink border border-white/10 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
             {/* Security/DevOps Concept Image */}
             <img
               src={"https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800&h=1200"}
               alt="DevSecOps Concept"
               className="w-full h-full object-cover grayscale brightness-50 transition-all duration-1000 group-hover:grayscale-0 group-hover:brightness-75"
               referrerPolicy="no-referrer"
             />

             {/* Technical Overlays */}
             <div className="absolute inset-0 p-6 flex flex-col justify-between font-mono pointer-events-none">
                <div className="flex justify-between items-start">
                   <div className="bg-accent/80 text-ink text-[8px] px-2 py-1 font-bold">LIVE_ENCRYPTION_ACTIVE</div>
                   <div className="text-white/40 text-[8px]">SEQ_004921</div>
                </div>

                <div className="space-y-2">
                   <div className="flex flex-col gap-1">
                      <div className="w-full h-1 bg-white/10 overflow-hidden">
                        <motion.div
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                          className="h-full w-1/3 bg-accent"
                        />
                      </div>
                      <span className="text-[6px] text-white/40">BUFFERING_METRICS...</span>
                   </div>
                   <div className="text-[10px] text-white/60 leading-tight">
                      root@i4m-r4vi:~$ nmap -sV 192.168.1.1<br/>
                      root@i4m-r4vi:~$ ls -la /etc/security<br/>
                      root@i4m-r4vi:~$ npm run deploy:prod<br/>
                      root@i4m-r4vi:~$ node server.js --secure
                   </div>
                </div>
             </div>
             <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-60" />
          </div>
        </div>

        {/* Bottom Bar Info */}
        <div className="p-6 md:p-12 border-t border-white/10 flex justify-between items-center bg-white/[0.02]">
           <div className="flex flex-col gap-1">
             <span className="text-[10px] uppercase font-bold text-accent tracking-widest">Availability</span>
             <span className="text-xs uppercase tracking-widest text-paper/60">JAN 2026</span>
           </div>
           <motion.div
             animate={{ y: [0, 5, 0] }}
             transition={{ repeat: Infinity, duration: 2 }}
             className="text-[10px] uppercase font-bold tracking-[0.3em] flex items-center gap-4"
           >
             Scroll <span>↓</span>
           </motion.div>
        </div>
      </div>
    </section>
  );
}
