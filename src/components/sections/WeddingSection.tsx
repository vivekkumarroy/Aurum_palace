"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Users, Camera, Music, Flower2, Star } from "lucide-react";

const FEATURES = [
  { icon: Heart, title: "Royal Ceremonies", desc: "Mandap setups in our 16th-century palace courtyard" },
  { icon: Users, title: "Up to 2,000 Guests", desc: "Grand ballrooms and outdoor lawns for every scale" },
  { icon: Camera, title: "Cinematic Memories", desc: "In-house photography and videography team" },
  { icon: Music, title: "Live Entertainment", desc: "Classical musicians, folk performers, and DJs" },
  { icon: Flower2, title: "Floral Artistry", desc: "Bespoke floral installations by master florists" },
  { icon: Star, title: "Dedicated Planner", desc: "Personal wedding concierge from first call to farewell" },
];
const STATS = [{ v: "500+", l: "Royal Weddings" }, { v: "98%", l: "Satisfaction Rate" }, { v: "25+", l: "Venue Options" }, { v: "₹50L+", l: "Avg. Budget" }];
const VENUES = [
  { name: "Palace Courtyard", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=85" },
  { name: "Grand Ballroom", image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=85" },
  { name: "Garden Ceremony", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=85" },
];

export default function WeddingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="weddings" className="section bg-burgundy relative overflow-hidden">
      <div className="absolute inset-0 opacity-14"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80')`, backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#1a0a0d]/72 to-[#0A0A0A]" />

      <div className="relative z-10 container">
        <div ref={ref} className="text-center mb-16">
          <motion.div className="flex items-center justify-center gap-3 mb-5"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            <div className="h-px w-10 bg-[#D4AF37]/48" />
            <Heart size={13} className="text-[#D4AF37]" />
            <span className="label">Destination Weddings</span>
            <Heart size={13} className="text-[#D4AF37]" />
            <div className="h-px w-10 bg-[#D4AF37]/48" />
          </motion.div>
          <motion.h2 className="font-playfair text-5xl md:text-6xl font-bold text-[#F8F5F0] mb-5 leading-tight"
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.85 }}>
            Celebrate Forever in <span className="gold-text">Royal Grandeur</span>
          </motion.h2>
          <motion.p className="font-cormorant italic text-[#F8F5F0]/52 text-xl md:text-2xl max-w-2xl mx-auto"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.25 }}>
            "In the grandeur of our palace, love stories become legends."
          </motion.p>
        </div>

        {/* venues */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {VENUES.map((v, i) => (
            <motion.div key={i} className="group relative rounded-2xl overflow-hidden h-72 cursor-pointer"
              initial={{ opacity: 0, y: 26 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.2 }} whileHover={{ y: -5 }}>
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.06]"
                style={{ backgroundImage: `url('${v.image}')` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/82 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5"><span className="badge">{v.name}</span></div>
            </motion.div>
          ))}
        </div>

        {/* stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {STATS.map((s, i) => (
            <motion.div key={i} className="text-center glass rounded-xl p-5"
              initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 + 0.4 }}>
              <p className="font-playfair text-3xl font-bold gold-text mb-1">{s.v}</p>
              <p className="font-manrope text-xs text-[#F8F5F0]/42 tracking-widest uppercase">{s.l}</p>
            </motion.div>
          ))}
        </div>

        {/* features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {FEATURES.map((f, i) => (
            <motion.div key={i} className="flex items-start gap-4 glass rounded-xl p-5 border border-[#D4AF37]/10 hover:border-[#D4AF37]/24 transition-colors"
              initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.06 + 0.5 }}>
              <div className="w-9 h-9 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/24 flex items-center justify-center flex-shrink-0">
                <f.icon size={15} className="text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="font-playfair text-[#F8F5F0] font-semibold mb-0.5">{f.title}</h4>
                <p className="font-inter text-xs text-[#F8F5F0]/42">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="btn-gold min-w-[220px]">Plan Your Wedding</button>
            <button className="btn-outline min-w-[220px]"><span>View Wedding Gallery</span></button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

