"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

const QUICK = ["Book a suite", "Dining reservations", "Spa treatments", "Wedding inquiry"];
const RESPONSES: Record<string, string> = {
  "book a suite": "I'd be delighted to assist. We have suites from ₹45,000/night. May I know your preferred dates and number of guests?",
  "dining reservations": "We have four restaurants — Golden Ember (Michelin ★★), The Sapphire Lounge, Maharaja Courtyard, and Skyfire Rooftop. Which would you prefer?",
  "spa treatments": "Our Aurum Wellness Circle offers 60+ treatments. The signature Aurum Ritual (3 hours, ₹28,000) is very popular. Shall I check availability?",
  "wedding inquiry": "Congratulations! The Aurum Palace is India's most coveted wedding destination. May I connect you with our Wedding Director?",
  default: "Namaste. I'm Aria, your personal Aurum concierge. How may I make your experience extraordinary today?",
};

interface Msg { role: "user" | "bot"; text: string; }

export default function AIConcierge() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "bot", text: "Namaste. I'm Aria, your personal Aurum concierge. How may I make your experience extraordinary today?" }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs(p => [...p, { role: "user", text }]);
    setInput(""); setTyping(true);
    setTimeout(() => {
      const key = text.toLowerCase();
      const reply = Object.entries(RESPONSES).find(([k]) => key.includes(k))?.[1] || RESPONSES.default;
      setMsgs(p => [...p, { role: "bot", text: reply }]);
      setTyping(false);
    }, 1000);
  };

  return (
    <>
      <motion.button
        suppressHydrationWarning
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#C6A664] text-white flex items-center justify-center shadow-xl"
        onClick={() => setOpen(!open)} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={20} /></motion.div>
            : <motion.div key="c" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><MessageCircle size={20} /></motion.div>
          }
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed bottom-24 right-6 z-40 w-[320px] max-h-[480px] bg-white border border-[#e8e2d9] shadow-2xl rounded-sm overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.92, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }} transition={{ type: "spring", damping: 26 }}>
            <div className="px-5 py-4 bg-[#1a1a1a] flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#C6A664] flex items-center justify-center text-white text-xs font-bold font-playfair">A</div>
              <div>
                <p className="font-playfair text-white text-sm font-semibold">Aria</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <p className="font-manrope text-xs text-white/45">Aurum Concierge · Online</p>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 no-sb bg-[#f8f5f0]">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-4 py-3 text-xs font-inter leading-relaxed ${m.role === "user" ? "bg-[#C6A664] text-white" : "bg-white border border-[#e8e2d9] text-[#4a4540]"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-white border border-[#e8e2d9] px-4 py-3 flex gap-1">
                    {[0,1,2].map(i => (
                      <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-[#C6A664]/60"
                        animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>
            <div className="px-4 py-2 flex gap-2 overflow-x-auto no-sb border-t border-[#e8e2d9] bg-white">
              {QUICK.map(r => (
                <button key={r} onClick={() => send(r)}
                  className="flex-shrink-0 font-manrope text-xs text-[#C6A664] border border-[#C6A664]/30 px-3 py-1.5 hover:bg-[#C6A664]/8 transition-colors whitespace-nowrap">
                  {r}
                </button>
              ))}
            </div>
            <div className="px-4 pb-4 pt-2 bg-white border-t border-[#e8e2d9]">
              <div className="flex gap-2 border border-[#e8e2d9] px-3 py-2">
                <input value={input} onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && send(input)}
                  placeholder="Ask Aria anything..."
                  className="flex-1 bg-transparent text-xs font-inter text-[#4a4540] placeholder-[#8a8278] outline-none" />
                <button onClick={() => send(input)} className="text-[#C6A664] hover:text-[#d9bc7e] transition-colors">
                  <Send size={13} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
