"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SLIDES = [
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=85",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=85",
];

export default function HeroSection() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden" style={{ height: "100svh", minHeight: 600 }}>
      <AnimatePresence mode="sync">
        <motion.div
          key={idx}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${SLIDES[idx]}')` }}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/25" />
    </section>
  );
}

