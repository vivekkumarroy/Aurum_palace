"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X } from "lucide-react";

export default function FloatingCTA() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const fn = () => {
      if (!dismissed && window.scrollY > window.innerHeight * 0.75) setShow(true);
      else if (window.scrollY < window.innerHeight * 0.4) setShow(false);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [dismissed]);

  return (
    <AnimatePresence>
      {show && !dismissed && (
        <motion.div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-lg"
          initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }} transition={{ type: "spring", damping: 26, stiffness: 200 }}>
          <div className="glass-dark rounded-2xl px-5 py-4 flex items-center gap-4 border border-[#D4AF37]/18 shadow-2xl">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37]/18 flex items-center justify-center flex-shrink-0">
              <Calendar size={14} className="text-[#D4AF37]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-playfair text-[#F8F5F0] text-sm font-semibold leading-none">Reserve Your Suite</p>
              <p className="font-manrope text-xs text-[#F8F5F0]/38 mt-0.5 truncate">Best rates · Complimentary Rolls Royce transfer</p>
            </div>
            <button onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-gold text-xs py-2.5 px-5 flex-shrink-0">
              Book Now
            </button>
            <button onClick={() => setDismissed(true)} className="text-[#F8F5F0]/28 hover:text-[#F8F5F0]/55 transition-colors flex-shrink-0">
              <X size={15} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
