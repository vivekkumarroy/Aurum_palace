"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Wifi, Wind, Coffee, Bath, Eye } from "lucide-react";
import { ROOMS } from "@/lib/data";

function RoomCard({ room, index }: { room: typeof ROOMS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [night, setNight] = useState(false);
  const flip = index % 2 !== 0;

  return (
    <motion.div ref={ref}
      className="group grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-[#D4AF37]/10 bg-[#111111] hover:border-[#D4AF37]/28 transition-colors duration-500"
      initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.08, ease: [0.23,1,0.32,1] }}>

      {/* image */}
      <div className={`relative h-72 md:h-auto overflow-hidden ${flip ? "md:order-2" : ""}`}>
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.05]"
          style={{ backgroundImage: `url('${night ? room.imageNight : room.image}')` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/55 to-transparent md:hidden" />
        {room.badge && <div className="absolute top-4 left-4"><span className="badge">{room.badge}</span></div>}
        <button onClick={() => setNight(!night)}
          className="absolute top-4 right-4 glass rounded-full px-3 py-1.5 flex items-center gap-1.5 text-xs font-manrope text-[#F8F5F0]/65 hover:text-[#D4AF37] transition-colors">
          <span>{night ? "🌙" : "☀️"}</span><span>{night ? "Night" : "Day"}</span>
        </button>
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="glass rounded-full p-2 text-[#D4AF37]"><Eye size={13} /></div>
        </div>
      </div>

      {/* content */}
      <div className={`flex flex-col justify-center p-8 md:p-10 ${flip ? "md:order-1" : ""}`}>
        <p className="label text-[0.58rem] mb-2">{room.category}</p>
        <h3 className="font-playfair text-2xl md:text-3xl text-[#F8F5F0] font-bold mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">{room.name}</h3>
        <p className="font-inter text-sm text-[#F8F5F0]/48 leading-relaxed mb-4">{room.description}</p>
        <p className="font-manrope text-xs text-[#D4AF37]/55 mb-4 tracking-wider">{room.size} · Private Balcony · City / Lake View</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {room.amenities.map(a => (
            <span key={a} className="font-manrope text-xs text-[#F8F5F0]/42 bg-white/5 rounded px-2.5 py-1 border border-white/5">{a}</span>
          ))}
        </div>
        <div className="flex items-center gap-4 mb-6 text-[#D4AF37]/32">
          <Wifi size={13} /><Wind size={13} /><Coffee size={13} /><Bath size={13} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-playfair text-2xl text-[#D4AF37] font-bold">₹{room.price.toLocaleString("en-IN")}</p>
            <p className="font-manrope text-xs text-[#F8F5F0]/32 mt-0.5">per night · taxes extra</p>
          </div>
          <button onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-2 btn-outline text-xs py-3 px-6">
            <span>Reserve</span><ArrowRight size={11} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function HotelsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="hotels" className="section bg-[#080808] relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-[0.022] pointer-events-none"
        style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)" }} />
      <div className="container">
        <div ref={ref} className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <motion.p className="label mb-3" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>Accommodations</motion.p>
            <motion.h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#F8F5F0]"
              initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
              Suites Fit for <span className="gold-text">Royalty</span>
            </motion.h2>
          </div>
          <motion.p className="font-cormorant italic text-[#F8F5F0]/40 text-lg max-w-xs"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
            Each suite is a private sanctuary designed to transport you beyond imagination
          </motion.p>
        </div>
        <div className="space-y-5">
          {ROOMS.map((r, i) => <RoomCard key={r.id} room={r} index={i} />)}
        </div>
      </div>
    </section>
  );
}

