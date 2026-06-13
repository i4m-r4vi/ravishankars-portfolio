import { useState, useEffect } from "react";
import api from "../services/api";
import { DEFAULT_FOOTER } from "../defaults";

export default function Footer() {
  const [data, setData] = useState<any>(DEFAULT_FOOTER);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/footer");
        if (res.data.data && Object.keys(res.data.data).length > 0) {
          setData(res.data.data);
        }
      } catch (err) {
        console.error("Using default footer data due to API error");
      }
    };
    fetchData();
  }, []);

  return (
    <footer className="px-6 md:px-12 py-12 flex flex-col md:flex-row justify-between items-center bg-ink border-t border-white/10 text-[9px] text-paper/30 uppercase tracking-[0.3em] font-bold gap-8 md:gap-0">
      <div className="hidden md:flex gap-12 text-white/30">
        <span className="hidden md:inline">Based in Tamilnadu, Karnataka</span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-paper/60 tracking-[0.5em]">{data.text}</span>
        <span className="text-[7px]">©2026 Archive</span>
      </div>

      <div className="hidden md:flex gap-12">
        {data.socialLinks?.map((social: any, idx: number) => (
          <a key={idx} href={social.url} target="_blank" rel="noreferrer" className="text-white/30 hover:text-accent transition-colors">
            {social.platform}
          </a>
        ))}
      </div>
    </footer>
  );
}
