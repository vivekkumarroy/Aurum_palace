"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  { name: "Priya & Arjun Mehta", role: "Destination Wedding Guests", location: "Mumbai", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=85", text: "The Aurum Palace didn't just host our wedding — it became the most magical chapter of our love story. Every detail was perfection. The palace courtyard at sunset, the floral arrangements, the cuisine — we still dream about it.", stay: "Royal Wedding · 5 Nights" },
  { name: "James Whitfield", role: "CEO, Whitfield Capital", location: "London, UK", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=85", text: "I have stayed at the finest hotels across six continents. The Aurum Palace stands alone. The Presidential Suite is a masterpiece of design, the butler service is telepathic, and the Golden Ember restaurant is worth the flight alone.", stay: "Presidential Suite · 7 Nights" },
  { name: "Aisha Al-Rashid", role: "Fashion Designer", location: "Dubai, UAE", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=85", text: "As someone who lives and breathes aesthetics, The Aurum Palace is a revelation. Every corner is a photograph, every moment is a memory. The spa treatments left me feeling reborn. I return every year without fail.", stay: "Royal Maharaja Suite · 4 Nights" },
  { name: "Sophie Laurent", role: "Travel Writer, Condé Nast", location: "Paris, France", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=85", text: "In 20 years of luxury travel writing, I have never encountered a property that so perfectly balances heritage and modernity. The Aurum Palace is not just a hotel — it is a living, breathing work of art.", stay: "Sky Penthouse · 5 Nights" },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [cur, setCur] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const t = setInterval(() => { setDir(1); setCur(p => (p + 1) % TESTIMONIALS.length); }, 6000);
    return () => clearInterval(t);
  }, []);

  const go = (d: number) => { setDir(d); setCur(p => (p + d + TESTIMONIALS.length) % TESTIMONIALS.length); };
  const t = TESTIMONIALS[cur];

  return (
    <section className="sec bg-white border-t border-[#e8e2d9]">
      <div className="wrap">
        <div ref={ref} className="text-center mb-12">
          <motion.p className="eyebrow mb-3" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>Guest Stories</motion.p>
          <motion.h2 className="sec-heading" initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
            Voices of Distinction
          </motion.h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={cur}
              className="bg-[#f8f5f0] border border-[#e8e2d9] rounded-sm p-8 md:p-12 relative"
              initial={{ opacity: 0, x: dir * 40 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }} transition={{ duration: 0.45 }}>
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-[#C6A664]" fill="#C6A664" />)}
              </div>
              <p className="font-cormorant italic text-[#4a4540] text-xl md:text-2xl leading-relaxed mb-8">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-cover bg-center border-2 border-[#C6A664]/30 flex-shrink-0"
                  style={{ backgroundImage: `url('${t.avatar}')` }} />
                <div className="flex-1">
                  <p className="font-playfair text-[#1a1a1a] font-semibold">{t.name}</p>
                  <p className="font-manrope text-xs text-[#C6A664] tracking-wider">{t.role}</p>
                  <p className="font-manrope text-xs text-[#8a8278] mt-0.5">{t.location}</p>
                </div>
                <span className="font-manrope text-xs bg-[#C6A664] text-white px-3 py-1 hidden md:block">{t.stay}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-6">
            <button onClick={() => go(-1)} className="w-10 h-10 border border-[#e8e2d9] flex items-center justify-center text-[#8a8278] hover:border-[#C6A664] hover:text-[#C6A664] transition-colors">
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => { setDir(i > cur ? 1 : -1); setCur(i); }}
                  className={`transition-all duration-300 rounded-full ${i === cur ? "w-6 h-2 bg-[#C6A664]" : "w-2 h-2 bg-[#e8e2d9]"}`} />
              ))}
            </div>
            <button onClick={() => go(1)} className="w-10 h-10 border border-[#e8e2d9] flex items-center justify-center text-[#8a8278] hover:border-[#C6A664] hover:text-[#C6A664] transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

