import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    setStatus("sending");

    try {
      // Note: These should ideally be stored in environment variables
      // VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

      if (serviceId === "YOUR_SERVICE_ID") {
        throw new Error("EmailJS is not configured. Please set your credentials.");
      }

      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );

      setStatus("success");
      setMessage("Message sent successfully! I'll get back to you soon.");
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Failed to send message. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-32 bg-ink text-paper selection:bg-accent selection:text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="flex flex-col justify-between py-4">
            <div>
              <span className="text-accent font-bold uppercase tracking-[0.4em] text-[10px]">Inquiries / Collaboration</span>
              <h2 className="text-[clamp(3.5rem,12vw,6rem)] lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] mt-8 italic">
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
                  ref={formRef}
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

             {(status === "success" || status === "error") && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`mt-8 p-4 border text-[10px] uppercase font-bold tracking-widest text-center ${
                    status === "success" 
                      ? "bg-accent/10 border-accent/20 text-accent" 
                      : "bg-red-500/10 border-red-500/20 text-red-500"
                  }`}
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
