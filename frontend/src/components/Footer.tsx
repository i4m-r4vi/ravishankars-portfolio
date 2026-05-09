import { SOCIAL_LINKS } from "../constants";

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 py-12 flex flex-col md:flex-row justify-between items-center bg-ink border-t border-white/10 text-[9px] text-paper/30 uppercase tracking-[0.3em] font-bold gap-8 md:gap-0">
      <div className="hidden md:flex gap-12">
        <span>Available for Project JAN 2026</span>
        <span className="hidden md:inline">Based in Tamilnadu, Karnataka</span>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <span className="text-paper/60 tracking-[0.5em]">RAVISHANKAR</span>
        <span className="text-[7px]">©2026 Archive</span>
      </div>

      <div className="hidden md:flex gap-12">
        {Object.entries(SOCIAL_LINKS).map(([name, url]) => (
          <a key={name} href={url} className="hover:text-accent transition-colors">{name}</a>
        ))}
      </div>
    </footer>
  );
}
