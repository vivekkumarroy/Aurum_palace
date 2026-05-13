"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Leaf, Droplets, Sun, Moon, Wind, Flower2 } from "lucide-react";

const TREATMENTS = [
  { icon: Leaf, name: "Panchakarma Detox", dur: "3–7 Days", desc: "Ancient Ayurvedic purification therapy to restore balance and vitality", price: "From ₹45,000" },
  { icon: Droplets, name: "Royal Hammam", dur: "120 min", desc: "Traditional Turkish bath ritual with gold-infused oils and marble steam", price: "From ₹12,000" },
  { icon: Sun, name: "Sunrise Yoga", dur: "60 min", desc: "Private yoga sessions on our rooftop terrace as the sun rises over the Aravallis", price: "From ₹5,000" },
  { icon: Moon, name: "Moonlight Meditation", dur: "90 min", desc: "Guided meditation under the stars with sound healing and crystal therapy", price: "From ₹8,000" },
  { icon: Wind, name: "Abhyanga Massage", dur: "90 min", desc: "Four-hand warm oil massage using rare herbs and precious botanical extracts", price: "From ₹15,000" },
  { icon: Flower2, name: "Floral Immersion", dur: "180 min", desc: "Signature rose and saffron bath ritual followed by a full-body rejuvenation", price: "From ₹22,000" },
];

export default function WellnessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="wellness" className="section bg-emerald relative overflow-hidden">
      <div className="absolute inset-0 opacity-12"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80')`, backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0a1f1f]/38 to-[#0A0A0A]" />

      <div className="relative z-10 container">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-16">
          <div>
            <motion.p className="label mb-3" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>Spa & Wellness</motion.p>
            <motion.h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#F8F5F0] mb-5 leading-tight"
              initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
              Restore Your <span className="gold-text">Inner Radiance</span>
            </motion.h2>
            <motion.p className="font-inter text-[#F8F5F0]/52 leading-relaxed mb-8"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
              Our 40,000 sq ft wellness sanctuary draws from 5,000 years of Ayurvedic wisdom, blended with the finest modern therapies. Every treatment is a ritual, every moment a meditation.
            </motion.p>
            <motion.div className="grid grid-cols-3 gap-3 mb-8"
              initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}>
              {[{ v: "40K", l: "Sq Ft" }, { v: "60+", l: "Treatments" }, { v: "12", l: "Rooms" }].map((s, i) => (
                <div key={i} className="text-center glass rounded-xl p-4">
                  <p className="font-playfair text-2xl font-bold gold-text">{s.v}</p>
                  <p className="font-manrope text-xs text-[#F8F5F0]/42 tracking-wider mt-0.5">{s.l}</p>
                </div>
              ))}
            </motion.div>
            <motion.button className="btn-gold"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}>
              Book a Treatment
            </motion.button>
          </div>

          <motion.div className="relative h-[460px] rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, delay: 0.2 }}>
            <div className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&q=85')` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/42 to-transparent" />
            <motion.div className="absolute bottom-5 left-5 right-5 glass rounded-xl p-4"
              animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="font-manrope text-xs text-[#D4AF37] tracking-widest uppercase">Available Today</span>
              </div>
              <p className="font-playfair text-[#F8F5F0] font-semibold text-sm">Signature Aurum Ritual</p>
              <p className="font-inter text-xs text-[#F8F5F0]/42 mt-0.5">3-hour full-body rejuvenation · ₹28,000</p>
            </motion.div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TREATMENTS.map((t, i) => (
            <motion.div key={i}
              className="glass rounded-xl p-6 border border-[#0F3D3E]/55 hover:border-[#D4AF37]/24 transition-all duration-400 group cursor-pointer"
              initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06 + 0.4 }} whileHover={{ y: -4 }}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-9 h-9 rounded-full bg-[#0F3D3E]/65 border border-[#D4AF37]/18 flex items-center justify-center">
                  <t.icon size={15} className="text-[#D4AF37]" />
                </div>
                <span className="font-manrope text-xs text-[#D4AF37]/52 tracking-wider">{t.dur}</span>
              </div>
              <h4 className="font-playfair text-lg text-[#F8F5F0] font-semibold mb-2 group-hover:text-[#D4AF37] transition-colors">{t.name}</h4>
              <p className="font-inter text-xs text-[#F8F5F0]/42 leading-relaxed mb-4">{t.desc}</p>
              <div className="flex items-center justify-between">
                <span className="font-playfair text-[#D4AF37] font-semibold text-sm">{t.price}</span>
                <button className="font-manrope text-xs text-[#F8F5F0]/32 hover:text-[#D4AF37] transition-colors tracking-widest uppercase">Book →</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

