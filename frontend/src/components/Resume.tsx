import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react";
import api from "../services/api";
import { DEFAULT_RESUME } from "../defaults";

gsap.registerPlugin(ScrollTrigger);

export default function Resume() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<any>(DEFAULT_RESUME);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/resume");
        if (res.data.data && Object.keys(res.data.data).length > 0) {
          // Assuming the API returns experiences or we might need to adjust based on real data structure
          setData({ ...DEFAULT_RESUME, ...res.data.data });
        }
      } catch (err) {
        console.error("Using default resume data due to API error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useGSAP(() => {
    if (loading) return;
    
    // Dynamic scroll distance based on content width
    const getScrollAmount = () => {
      return (scrollContainerRef.current?.scrollWidth || 0) - window.innerWidth;
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 0.5,
        start: "top top",
        end: () => `+=${getScrollAmount() + 500}`,
        invalidateOnRefresh: true,
      },
    });

    tl.to(scrollContainerRef.current, {
      x: () => -getScrollAmount(),
      ease: "none",
    });

    const progressBar = sectionRef.current?.querySelector("#progress-bar");
    if (progressBar) {
      tl.to(progressBar, {
        scaleX: 1,
        ease: "none",
      }, 0);
    }
  }, { scope: sectionRef, dependencies: [loading] });

  return (
    <section
      id="resume"
      ref={sectionRef}
      className="bg-[#121212] text-paper overflow-hidden h-screen flex flex-col border-b border-white/10 relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 mb-4 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0 z-20">
        <div className="flex flex-col gap-2">
          <span className="font-bold uppercase tracking-[0.4em] text-[10px] text-accent">Career Path / Experience</span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none italic">The Archive</h2>
        </div>
        <a
          href={data.resumeUrl || "#"}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-between p-4 md:p-5 border border-accent/30 bg-accent/5 hover:bg-accent/10 min-w-[200px] md:min-w-[240px] transition-all"
        >
          <span className="text-[10px] md:text-xs uppercase font-black tracking-widest">Download Full CV</span>
          <span className="text-accent text-xl group-hover:translate-x-2 transition-transform">→</span>
        </a>
      </div>

      <div className="flex-1 relative flex items-center overflow-visible">
        <div
          ref={scrollContainerRef}
          className="flex flex-nowrap items-center gap-12 md:gap-24 px-6 md:px-32 w-max relative h-[100%]"
        >
          {data.experiences?.map((exp: any, idx: number) => (
            <div
              key={`exp-${idx}`}
              className="resume-experience flex-shrink-0 w-[80vw] md:w-[40vw] h-[55vh] flex flex-col gap-6 md:gap-8 border border-white/5 bg-white/[0.02] p-6 md:p-10 rounded-3xl backdrop-blur-sm shadow-2xl relative"
            >
              <div className="flex items-center gap-6 shrink-0">
                 <span className="text-3xl md:text-5xl font-black text-accent/20 italic leading-none">0{idx + 1}</span>
                 <div className="h-px flex-1 bg-white/10" />
              </div>
              <div className="flex flex-col gap-4 md:gap-6 flex-1 overflow-hidden">
                <div className="space-y-1">
                  <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.3em] text-paper/30">{exp.year}</span>
                  <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic leading-[0.9]">{exp.role}</h3>
                  <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-accent">{exp.company}</p>
                </div>
                <div className="flex-1 overflow-y-auto pr-4 no-scrollbar">
                  <p className="text-sm md:text-base text-paper/40 font-sans leading-relaxed">
                    {exp.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Courses Separation Node */}
          {data.courses?.length > 0 && (
            <div className="flex-shrink-0 w-[30vw] flex items-center justify-center h-full">
               <div className="flex flex-col items-center gap-6">
                  <div className="w-px h-24 bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
                  <span className="text-[10px] font-black uppercase tracking-[0.6em] text-accent rotate-90 whitespace-nowrap">CERTIFICATIONS_ARCHIVE</span>
                  <div className="w-px h-24 bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
               </div>
            </div>
          )}

          {/* Courses Nodes */}
          {data.courses?.map((course: any, idx: number) => (
            <div
              key={`course-${idx}`}
              className="resume-course flex-shrink-0 w-[80vw] md:w-[40vw] h-[55vh] flex flex-col gap-6 md:gap-8 border border-white/5 bg-white/[0.02] p-6 md:p-10 rounded-3xl backdrop-blur-sm shadow-2xl relative"
            >
              <div className="flex items-center gap-6 shrink-0">
                 <span className="text-3xl md:text-5xl font-black text-accent/20 italic leading-none">C{idx + 1}</span>
                 <div className="h-px flex-1 bg-white/10" />
              </div>
              <div className="flex flex-col gap-4 md:gap-6 flex-1 overflow-hidden">
                <div className="space-y-1">
                  <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.3em] text-accent">{course.year}</span>
                  <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic leading-[0.9]">{course.title}</h3>
                  <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-paper/40">{course.platform}</p>
                </div>
                
                <div className="flex-1 overflow-y-auto pr-4 no-scrollbar">
                  <p className="text-sm md:text-base text-paper/40 font-sans leading-relaxed">
                    {course.desc}
                  </p>
                </div>

                {course.certificateUrl && (
                  <div className="pt-4 border-t border-white/5 shrink-0">
                    <a 
                      href={course.certificateUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-accent border border-accent/20 px-5 py-2.5 rounded-full hover:bg-accent/10 transition-all"
                    >
                      Verify_Credential <span>→</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 md:bottom-12 left-6 md:left-12 right-6 md:right-12 h-px bg-white/10 overflow-hidden">
        <div
          className="h-full bg-accent w-full origin-left scale-x-0"
          id="progress-bar"
        />
      </div>
    </section>
  );
}
