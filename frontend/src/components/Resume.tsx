import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Download, FileText } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Resume() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray(".resume-experience");
    const progressBar = sectionRef.current?.querySelector("#progress-bar");

    // Dynamic scroll distance based on content width
    const getScrollAmount = () => {
      return (scrollContainerRef.current?.scrollWidth || 0) - window.innerWidth;
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 0.5, // Slightly smoother scrub
        start: "top top",
        end: () => `+=${getScrollAmount() + 500}`, // Extend scroll for better feel
        invalidateOnRefresh: true,
      },
    });

    tl.to(scrollContainerRef.current, {
      x: () => -getScrollAmount(),
      ease: "none",
    });

    if (progressBar) {
      tl.to(progressBar, {
        scaleX: 1,
        ease: "none",
      }, 0);
    }
  }, { scope: sectionRef, dependencies: [] });

  const experiences = [
    {
      year: "2023 - Present",
      role: "Cloud DevOps Architect",
      company: "InfraShield Systems",
      desc: "Leading the transition to a Zero Trust architecture while optimizing MERN stack deployments via automated Kubernetes pipelines."
    },
    {
      year: "2021 - 2023",
      role: "Fullstack MERN Developer",
      company: "DataVortex Labs",
      desc: "Built scalable internal tools and customer-facing dashboards with a heavy emphasis on data integrity and real-time synchronization."
    },
    {
      year: "2019 - 2021",
      role: "Security Researcher",
      company: "CyberPulse",
      desc: "Conducted vulnerability assessments and implemented security-first CI/CD workflows for fintech startups."
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="bg-[#121212] text-paper pt-20 md:pt-32 pb-40 md:pb-52 overflow-hidden min-h-screen flex flex-col justify-center border-b border-white/10 relative"
    >
      <div className="max-w-7xl mx-auto px-12 mb-16 md:mb-24 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div className="flex flex-col gap-4">
          <span className="font-bold uppercase tracking-[0.4em] text-[10px] text-accent">Career Path / Experience</span>
          <h2 className="text-5xl sm:text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none italic">The Archive</h2>
        </div>
        <a 
          href="#" 
          className="group flex items-center justify-between p-6 border border-accent/30 bg-accent/5 hover:bg-accent/10 min-w-[240px] transition-all"
        >
          <span className="text-xs uppercase font-black tracking-widest">Download Full CV</span>
          <span className="text-accent text-2xl group-hover:translate-x-2 transition-transform">→</span>
        </a>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex flex-nowrap gap-12 md:gap-32 px-6 md:px-32 w-max relative pb-20"
      >
        {experiences.map((exp, idx) => (
          <div 
            key={idx}
            className="resume-experience flex-shrink-0 w-[85vw] md:w-[45vw] flex flex-col gap-8 md:gap-10"
          >
            <div className="flex items-center gap-4 md:gap-6">
               <span className="text-5xl md:text-7xl font-black text-accent/20 leading-none">0{idx + 1}</span>
               <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className="flex flex-col gap-4 md:gap-6">
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-paper/30">{exp.year}</span>
              <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic leading-tight md:leading-none">{exp.role}</h3>
              <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-accent">{exp.company}</p>
              <p className="text-base md:text-lg text-paper/40 font-sans leading-relaxed mt-2 md:mt-4 max-w-lg">
                {exp.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-20 md:bottom-32 left-12 right-12 h-px bg-white/10 overflow-hidden">
        <div 
          className="h-full bg-accent w-full origin-left scale-x-0" 
          id="progress-bar" 
        />
      </div>
    </section>
  );
}
