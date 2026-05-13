"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const iv = setInterval(() => {
      setPct(p => {
        const next = Math.min(p + Math.random() * 14 + 5, 100);
        if (next >= 100) { clearInterval(iv); setTimeout(() => setDone(true), 400); }
        return next;
      });
    }, 55);
    return () => clearInterval(iv);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="loading-screen"
          exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
          <motion.div className="flex flex-col items-center gap-5"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* ornament */}
            <motion.div className="flex items-center gap-3"
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C6A664]" />
              <div className="w-1 h-1 rounded-full bg-[#C6A664]" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C6A664]" />
            </motion.div>
            {/* brand */}
            <div className="text-center">
              <motion.h1
                className="font-playfair font-bold tracking-[0.22em]"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#1a1a1a" }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                THE AURUM
              </motion.h1>
              <motion.p className="font-cormorant italic text-[#8a8278] tracking-[0.5em] text-xl mt-1"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                Palace
              </motion.p>
            </div>
            {/* ornament */}
            <motion.div className="flex items-center gap-3"
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C6A664]" />
              <div className="w-1 h-1 rounded-full bg-[#C6A664]" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C6A664]" />
            </motion.div>
            {/* progress */}
            <div className="w-40">
              <div className="h-px bg-[#e8e2d9] relative overflow-hidden">
                <motion.div className="absolute inset-y-0 left-0 bg-[#C6A664]"
                  style={{ width: `${Math.min(pct, 100)}%` }} />
              </div>
              <p className="text-center text-[#C6A664]/60 text-xs font-manrope tracking-widest mt-2">
                {Math.min(Math.round(pct), 100)}%
              </p>
            </div>
            <motion.p className="font-cormorant italic text-[#8a8278] text-sm tracking-widest"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              Where Timeless Luxury Meets Royal Hospitality
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
