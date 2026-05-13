"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { DESTINATIONS } from "@/lib/data";

export default function DestinationsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canL, setCanL] = useState(false);
  const [canR, setCanR] = useState(true);

  const onScroll = () => {
    if (!scrollRef.current) return;
    setCanL(scrollRef.current.scrollLeft > 10);
    setCanR(scrollRef.current.scrollLeft + scrollRef.current.clientWidth < scrollRef.current.scrollWidth - 10);
  };
  const scroll = (d: "l" | "r") => scrollRef.current?.scrollBy({ left: d === "l" ? -320 : 320, behavior: "smooth" });

  return (
    <section id="destinations" className="section bg-[#0A0A0A]">
      <div className="container">
        {/* header */}
        <div ref={ref} className="flex items-end justify-between mb-12">
          <div>
            <motion.p className="label mb-3" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>Our Destinations</motion.p>
            <motion.h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#F8F5F0]"
              initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
              Discover the <span className="gold-text">World</span>
            </motion.h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button onClick={() => scroll("l")} disabled={!canL}
              className="w-10 h-10 rounded-full border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors disabled:opacity-25">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => scroll("r")} disabled={!canR}
              className="w-10 h-10 rounded-full border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors disabled:opacity-25">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* horizontal scroll */}
        <div ref={scrollRef} onScroll={onScroll} className="flex gap-5 overflow-x-auto no-scrollbar pb-2">
          {DESTINATIONS.map((d, i) => (
            <motion.div key={i} className="group relative flex-shrink-0 w-64 rounded-2xl overflow-hidden cursor-pointer img-zoom"
              initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07 }} whileHover={{ y: -6 }}>
              <div className="relative h-88 overflow-hidden" style={{ height: 360 }}>
                <div className="bg-img absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.06]"
                  style={{ backgroundImage: `url('${d.image}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/92 via-[#0A0A0A]/15 to-transparent" />
                <div className="absolute top-4 left-4"><span className="badge">{d.tag}</span></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-manrope text-[0.58rem] text-[#D4AF37]/65 tracking-widest uppercase mb-1">{d.properties} {d.properties === 1 ? "Property" : "Properties"} · {d.country}</p>
                  <h3 className="font-playfair text-2xl text-[#F8F5F0] font-bold leading-tight">{d.name}</h3>
                  <p className="font-cormorant italic text-[#F8F5F0]/55 text-sm mt-0.5">{d.tagline}</p>
                  <div className="flex items-center gap-1.5 mt-3 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-manrope text-xs tracking-widest uppercase">Explore</span>
                    <ArrowRight size={11} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* view all */}
        <motion.div className="text-center mt-12"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}>
          <button className="btn-outline px-12"><span>View All Destinations</span></button>
        </motion.div>
      </div>
    </section>
  );
}

