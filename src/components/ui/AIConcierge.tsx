"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Paperclip, Home } from "lucide-react";

const QUICK = ["Book a Stay", "Manage my Booking", "Reward Programs", "Ask a Query"];
const RESPONSES: Record<string, string> = {
  "book a stay": "I'd be delighted to assist. We have suites from ₹45,000/night. May I know your preferred dates and number of guests?",
  "manage my booking": "Please provide your booking reference number or email address, and I will pull up your details.",
  "reward programs": "Aurum Circle members earn 10 points for every ₹1,000 spent. Would you like to check your balance?",
  "ask a query": "I am here to help with anything. You can ask about our facilities, check-in times, or local attractions.",
  default: "Namaste. I'm IRA, your personal Aurum concierge. How may I make your experience extraordinary today?",
};

interface Msg { role: "user" | "bot"; text: string; }

export default function AIConcierge() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "bot", text: "How may I help you today?" }]);
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
          <motion.div className="fixed bottom-24 right-6 z-40 w-[360px] max-h-[580px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.25)] rounded-[20px] overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.92, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }} transition={{ type: "spring", damping: 26 }}>
            
            {/* Header */}
            <div className="px-5 py-5 bg-[#B18E3C] flex items-center justify-between relative">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-white overflow-hidden border-2 border-white shadow-sm">
                    <img src="https://img.freepik.com/free-vector/indian-woman-traditional-sari_23-2148154674.jpg?w=740&t=st=1710595000" alt="IRA" className="w-10 h-10 object-cover mx-auto mt-2" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
                </div>
                <div>
                  <p className="font-playfair text-white text-lg font-bold">IRA</p>
                  <p className="font-inter text-[11px] text-white/90 font-medium">Your Chat Assistant!</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white hover:bg-black/10 p-1.5 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 no-sb bg-white">
              {/* Today Divider */}
              <div className="flex justify-center">
                <div className="bg-[#f0ece4] px-4 py-1.5 rounded-full text-[11px] text-[#6b6560] font-medium">
                  Today
                </div>
              </div>

              {msgs.map((m, i) => (
                <div key={i} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                  <div className="flex items-start gap-2.5 max-w-[85%]">
                    {m.role === "bot" && (
                      <div className="w-8 h-8 rounded-full bg-white border border-[#e8e2d9] overflow-hidden flex-shrink-0 mt-1">
                        <img src="https://img.freepik.com/free-vector/indian-woman-traditional-sari_23-2148154674.jpg?w=740" alt="IRA" className="w-6 h-6 object-cover mx-auto mt-1" />
                      </div>
                    )}
                    <div className={`px-4 py-3 text-[13px] font-inter leading-relaxed shadow-sm ${m.role === "user" ? "bg-[#B18E3C] text-white rounded-[18px] rounded-tr-none" : "bg-[#f1f3f4] text-[#2a2520] rounded-[18px] rounded-tl-none"}`}>
                      {m.text}
                    </div>
                  </div>
                  <p className="text-[10px] text-[#8a8278] mt-1.5 px-1">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              ))}
              
              {typing && (
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#e8e2d9] overflow-hidden flex-shrink-0 mt-1">
                    <img src="https://img.freepik.com/free-vector/indian-woman-traditional-sari_23-2148154674.jpg?w=740" alt="IRA" className="w-6 h-6 object-cover mx-auto mt-1" />
                  </div>
                  <div className="bg-[#f1f3f4] rounded-[18px] rounded-tl-none px-4 py-3 flex gap-1">
                    {[0,1,2].map(i => (
                      <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-[#B18E3C]/60"
                        animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />

              {/* Quick Actions in a separate row if last message is bot */}
              {msgs[msgs.length-1].role === "bot" && !typing && (
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {QUICK.map(r => (
                    <button key={r} onClick={() => send(r)}
                      className="bg-[#f0ece4] hover:bg-[#e8e2d9] text-[#4a4540] text-[13px] font-inter px-5 py-2.5 rounded-full transition-all border border-[#e8e2d9]/50 shadow-sm">
                      {r}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-5 bg-white border-t border-[#f0ece4]">
              <div className="flex items-center gap-4">
                <button className="text-[#8a8278] hover:text-[#B18E3C] transition-colors">
                  <Home size={22} />
                </button>
                <div className="flex-1 flex items-center bg-white border border-[#e8e2d9] rounded-full px-5 py-2.5 shadow-inner">
                  <input value={input} onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && send(input)}
                    placeholder="Type your message"
                    className="flex-1 bg-transparent text-[13px] font-inter text-[#2a2520] placeholder-[#8a8278] outline-none" />
                  <button onClick={() => send(input)} className="text-[#8a8278] hover:text-[#B18E3C] transition-colors">
                    <Paperclip size={20} />
                  </button>
                </div>
              </div>
              <div className="text-center mt-4">
                <p className="text-[10px] text-[#8a8278] font-medium tracking-wide">
                  Powered by <span className="text-[#6b6560] font-bold">Yellow.ai</span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
