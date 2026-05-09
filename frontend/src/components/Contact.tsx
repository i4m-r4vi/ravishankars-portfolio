import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle2, ArrowUpRight } from "lucide-react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (result.success) {
        setStatus("success");
        setMessage(result.message);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-32 bg-ink text-paper selection:bg-accent selection:text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="flex flex-col justify-between py-4">
            <div>
              <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px]">Inquiries / Collaboration</span>
              <h2 className="text-[12vw] lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] mt-8 italic">
                Get In <br />
                Touch<span className="text-accent">.</span>
              </h2>
            </div>

            <div className="flex flex-col gap-10 mt-20">
               <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-paper/30 font-bold mb-4">Direct Communication</h4>
                  <a href="mailto:ayswarym04@gmail.com" className="text-lg sm:text-2xl md:text-4xl font-black tracking-tighter uppercase italic hover:text-accent transition-colors break-all">
                    ayswarym04@gmail.com
                  </a>
               </div>
               <div className="flex gap-12">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase font-bold text-accent tracking-widest">Local Time</span>
                    <span className="text-xs uppercase tracking-widest text-paper/60">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })} IST</span>
                  </div>
               </div>
            </div>
          </div>

          <div className="bg-[#121212] p-12 border border-white/10 flex flex-col justify-between min-h-[500px]">
             <div>
                <h4 className="text-[10px] uppercase tracking-widest text-paper/30 font-bold mb-10">Send a Brief</h4>
                <form 
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-10"
                >
                  <div className="flex flex-col gap-2 relative">
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      autoComplete="off"
                      className="bg-transparent border-b border-white/10 py-4 text-xs uppercase tracking-[0.2em] font-bold outline-none focus:border-accent transition-colors placeholder:text-paper/10"
                      placeholder="NAME"
                    />
                  </div>
                  
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    className="bg-transparent border-b border-white/10 py-4 text-xs uppercase tracking-[0.2em] font-bold outline-none focus:border-accent transition-colors placeholder:text-paper/10"
                    placeholder="EMAIL ADDRESS"
                  />

                  <textarea 
                    id="message" 
                    name="message" 
                    required 
                    rows={4}
                    className="bg-transparent border-b border-white/10 py-4 text-xs uppercase tracking-[0.2em] font-bold outline-none focus:border-accent transition-colors resize-none placeholder:text-paper/10"
                    placeholder="MESSAGE / CONCEPT"
                  />

                  <button 
                    type="submit" 
                    disabled={status === "sending" || status === "success"}
                    className={`group mt-6 p-6 border flex items-center justify-between transition-all ${
                      status === "success" 
                        ? "bg-green-600 border-green-600 text-white" 
                        : "border-accent text-accent hover:bg-accent hover:text-white"
                    }`}
                  >
                    <span className="text-[10px] uppercase font-black tracking-widest">
                      {status === "idle" && "Send Message"}
                      {status === "sending" && "Processing..."}
                      {status === "success" && "Success"}
                      {status === "error" && "Error"}
                    </span>
                    <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </form>
             </div>
             
             {status === "success" && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-8 p-4 bg-accent/10 border border-accent/20 text-accent text-[10px] uppercase font-bold tracking-widest text-center"
                >
                  {message}
                </motion.div>
             )}
          </div>
        </div>
      </div>
    </section>
  );
}
