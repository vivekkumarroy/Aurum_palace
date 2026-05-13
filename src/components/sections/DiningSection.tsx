"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, Clock, MapPin, X } from "lucide-react";
import { RESTAURANTS } from "@/lib/data";

function Modal({ r, onClose }: { r: typeof RESTAURANTS[0]; onClose: () => void }) {
  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/82 backdrop-blur-sm" onClick={onClose} />
      <motion.div className="relative glass-dark rounded-2xl p-8 max-w-md w-full border border-[#D4AF37]/18 z-10"
        initial={{ scale: 0.92, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 16 }}
        transition={{ type: "spring", damping: 26 }}>
        <button onClick={onClose} className="absolute top-4 right-4 text-[#F8F5F0]/32 hover:text-[#D4AF37]"><X size={18} /></button>
        <p className="label mb-1">Reserve a Table</p>
        <h3 className="font-playfair text-2xl text-[#F8F5F0] mb-6">{r.name}</h3>
        <div className="space-y-4">
          {[
            { label: "Full Name", type: "text", placeholder: "Your name" },
          ].map(f => (
            <div key={f.label}>
              <label className="font-manrope text-xs text-[#D4AF37]/58 tracking-widest uppercase block mb-1.5">{f.label}</label>
              <input type={f.type} className="input-luxury" placeholder={f.placeholder} />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-manrope text-xs text-[#D4AF37]/58 tracking-widest uppercase block mb-1.5">Date</label>
              <input type="date" className="input-luxury" />
            </div>
            <div>
              <label className="font-manrope text-xs text-[#D4AF37]/58 tracking-widest uppercase block mb-1.5">Time</label>
              <input type="time" className="input-luxury" />
            </div>
          </div>
          <div>
            <label className="font-manrope text-xs text-[#D4AF37]/58 tracking-widest uppercase block mb-1.5">Guests</label>
            <select className="input-luxury bg-transparent">
              {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n} className="bg-[#0A0A0A]">{n} Guest{n>1?"s":""}</option>)}
            </select>
          </div>
          <div>
            <label className="font-manrope text-xs text-[#D4AF37]/58 tracking-widest uppercase block mb-1.5">Special Requests</label>
            <textarea className="input-luxury resize-none h-16" placeholder="Dietary needs, celebrations..." />
          </div>
        </div>
        <button className="w-full btn-gold mt-6">Confirm Reservation</button>
      </motion.div>
    </motion.div>
  );
}

export default function DiningSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [active, setActive] = useState(0);
  const [modal, setModal] = useState(false);
  const cur = RESTAURANTS[active];

  return (
    <section id="dining" className="section bg-[#0A0A0A] relative overflow-hidden">
      <div className="container">
        <div ref={ref} className="text-center mb-14">
          <motion.p className="label mb-3" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>Culinary Excellence</motion.p>
          <motion.h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#F8F5F0] mb-3"
            initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
            A Feast for the <span className="gold-text">Senses</span>
          </motion.h2>
          <motion.p className="font-cormorant italic text-[#F8F5F0]/42 text-xl"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
            Four extraordinary dining destinations, each a world unto itself
          </motion.p>
        </div>

        {/* tab buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {RESTAURANTS.map((r, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`font-manrope text-xs tracking-widest uppercase px-5 py-2.5 rounded-full border transition-all duration-300 ${
                active === i ? "bg-[#D4AF37] text-[#0A0A0A] border-[#D4AF37]" : "border-[#D4AF37]/20 text-[#F8F5F0]/48 hover:border-[#D4AF37]/48 hover:text-[#D4AF37]"
              }`}>
              {r.name}
            </button>
          ))}
        </div>

        {/* showcase */}
        <AnimatePresence mode="wait">
          <motion.div key={active} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45 }}>
            {/* image */}
            <div className="relative rounded-2xl overflow-hidden h-[420px]">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${cur.image}')` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/72 via-transparent to-transparent" />
              <div className="absolute top-5 right-5"><span className="badge">{cur.tag}</span></div>
              <div className="absolute bottom-5 left-5 glass rounded-xl p-4 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-cover bg-center border-2 border-[#D4AF37]/32"
                  style={{ backgroundImage: `url('${cur.chefImage}')` }} />
                <div>
                  <p className="font-manrope text-[0.56rem] text-[#D4AF37]/62 tracking-widest uppercase">Head Chef</p>
                  <p className="font-playfair text-sm text-[#F8F5F0]">{cur.chef}</p>
                </div>
              </div>
            </div>
            {/* content */}
            <div>
              <p className="label mb-2">{cur.cuisine}</p>
              <h3 className="font-playfair text-4xl font-bold text-[#F8F5F0] mb-4">{cur.name}</h3>
              <p className="font-inter text-[#F8F5F0]/52 leading-relaxed mb-7">{cur.description}</p>
              <div className="space-y-2.5 mb-8">
                {[{ icon: Clock, text: cur.hours }, { icon: MapPin, text: cur.location }, { icon: Star, text: cur.priceRange }].map(({ icon: Icon, text }, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <Icon size={13} className="text-[#D4AF37]" />
                    <span className="font-manrope text-[#F8F5F0]/52">{text}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <button onClick={() => setModal(true)} className="btn-gold">Reserve a Table</button>
                <button className="btn-outline"><span>View Menu</span></button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* thumbnails */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12">
          {RESTAURANTS.map((r, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`relative rounded-xl overflow-hidden h-28 transition-all duration-400 ${active === i ? "ring-2 ring-[#D4AF37]" : "opacity-52 hover:opacity-78"}`}>
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${r.image}')` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/88 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="font-playfair text-xs text-[#F8F5F0] font-semibold leading-tight">{r.name}</p>
              </div>
              {active === i && <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />}
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence>{modal && <Modal r={cur} onClose={() => setModal(false)} />}</AnimatePresence>
    </section>
  );
}

