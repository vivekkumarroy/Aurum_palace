"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { GALLERY_ITEMS } from "@/lib/data";

const CATS = ["All", "Hotels", "Dining", "Weddings", "Spa", "Suites", "Architecture"];

export default function GallerySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [cat, setCat] = useState("All");
  const [lb, setLb] = useState<{ src: string; title: string } | null>(null);

  const filtered = cat === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(i => i.category === cat);

  return (
    <section id="gallery" className="section bg-[#080808]">
      <div className="container">
        <div ref={ref} className="text-center mb-12">
          <motion.p className="label mb-3" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>Visual Journey</motion.p>
          <motion.h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#F8F5F0]"
            initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
            The Aurum <span className="gold-text">Gallery</span>
          </motion.h2>
        </div>

        <motion.div className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`font-manrope text-xs tracking-widest uppercase px-4 py-2 rounded-full border transition-all duration-300 ${
                cat === c ? "bg-[#D4AF37] text-[#0A0A0A] border-[#D4AF37]" : "border-[#D4AF37]/18 text-[#F8F5F0]/42 hover:border-[#D4AF37]/42 hover:text-[#D4AF37]"
              }`}>
              {c}
            </button>
          ))}
        </motion.div>

        <div className="masonry">
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div key={item.src} className="masonry-item relative group cursor-pointer rounded-xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.4, delay: i * 0.04 }}
                onClick={() => setLb({ src: item.src.replace("w=800", "w=1600"), title: item.title })}>
                <div className={`relative overflow-hidden ${item.tall ? "h-80" : "h-52"}`}>
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.07]"
                    style={{ backgroundImage: `url('${item.src}')` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/68 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-11 h-11 rounded-full bg-[#D4AF37]/18 border border-[#D4AF37]/58 flex items-center justify-center backdrop-blur-sm">
                      <ZoomIn size={16} className="text-[#D4AF37]" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-playfair text-sm text-[#F8F5F0] font-semibold">{item.title}</p>
                    <p className="font-manrope text-xs text-[#D4AF37]/62 tracking-widest uppercase mt-0.5">{item.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {lb && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/96 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLb(null)}>
            <motion.div className="relative max-w-5xl w-full"
              initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }}
              onClick={e => e.stopPropagation()}>
              <button className="absolute -top-10 right-0 text-[#F8F5F0]/48 hover:text-[#D4AF37] transition-colors" onClick={() => setLb(null)}>
                <X size={22} />
              </button>
              <img src={lb.src} alt={lb.title} className="w-full rounded-xl object-cover max-h-[80vh]" />
              <p className="font-playfair text-[#F8F5F0] text-center mt-4">{lb.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

