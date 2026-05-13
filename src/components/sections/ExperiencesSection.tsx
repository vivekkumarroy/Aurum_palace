"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Bed, Waves, UtensilsCrossed, Sparkles, Plane, Heart, Briefcase, Crown } from "lucide-react";

const EXPERIENCES = [
  { icon: Bed, title: "Royal Suites", desc: "120+ meticulously designed suites blending Mughal grandeur with contemporary luxury", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=700&q=80" },
  { icon: Waves, title: "Infinity Pools", desc: "Three infinity pools overlooking the Aravalli hills, open under the stars", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=700&q=80" },
  { icon: UtensilsCrossed, title: "Fine Dining", desc: "Four Michelin-starred restaurants celebrating the finest Indian and global cuisines", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80" },
  { icon: Sparkles, title: "Spa & Wellness", desc: "Ancient Ayurvedic rituals meet modern wellness science in our 40,000 sq ft sanctuary", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=700&q=80" },
  { icon: Plane, title: "Private Jet", desc: "Seamless private aviation services with dedicated concierge from door to destination", image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=700&q=80" },
  { icon: Heart, title: "Luxury Weddings", desc: "Craft your forever in our palace courtyards — India's most coveted wedding destination", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=80" },
  { icon: Briefcase, title: "Business Lounges", desc: "State-of-the-art boardrooms and executive lounges for the world's most discerning leaders", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80" },
  { icon: Crown, title: "Royal Experiences", desc: "Elephant safaris, heritage walks, private palace dinners — curated exclusively for you", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=700&q=80" },
];

export default function ExperiencesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experiences" className="section bg-[#0A0A0A]">
      <div className="container">
        <div ref={ref} className="text-center mb-16">
          <motion.p className="label mb-3" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>Curated Experiences</motion.p>
          <motion.h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#F8F5F0] mb-4"
            initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
            A World of <span className="gold-text">Extraordinary</span>
          </motion.h2>
          <motion.p className="font-cormorant italic text-[#F8F5F0]/45 text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
            Every experience at The Aurum Palace is a masterpiece — designed to awaken your senses and create memories that last a lifetime
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {EXPERIENCES.map((exp, i) => (
            <motion.div key={i} className="group relative rounded-2xl overflow-hidden cursor-pointer card-lift"
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: (i % 4) * 0.09, ease: [0.23,1,0.32,1] }}>
              <div className="relative h-72 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.07]"
                  style={{ backgroundImage: `url('${exp.image}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/25 to-transparent" />
                <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 flex items-center justify-center">
                  <exp.icon size={16} className="text-[#D4AF37]" />
                </div>
              </div>
              <div className="p-5 bg-[#111111] border border-[#D4AF37]/8 border-t-0 rounded-b-2xl">
                <h3 className="font-playfair text-lg text-[#F8F5F0] font-semibold mb-2 group-hover:text-[#D4AF37] transition-colors">{exp.title}</h3>
                <p className="font-inter text-xs text-[#F8F5F0]/45 leading-relaxed">{exp.desc}</p>
                <div className="mt-3 flex items-center gap-2 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-manrope text-xs tracking-widest uppercase">Discover</span>
                  <div className="h-px w-6 bg-[#D4AF37]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

