"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Users, MapPin, Sparkles, ChevronDown, Check } from "lucide-react";
import { useRouter } from "next/navigation";

const DESTINATIONS = ["Udaipur — Lake Palace", "Jaipur — Pink City", "Jodhpur — Blue City", "Goa — Coastal Retreat", "Maldives — Island Resort", "Dubai — Urban Luxury"];
const SUITES = ["Heritage Palace Room", "Royal Maharaja Suite", "Ocean Villa", "Sky Penthouse", "Presidential Suite"];
const EXPERIENCES = ["Spa & Wellness", "Destination Wedding", "Business Retreat", "Honeymoon Package", "Royal Heritage Tour", "Culinary Journey"];

function SelectField({ label, icon: Icon, options, placeholder }: { label: string; icon: React.ElementType; options: string[]; placeholder: string }) {
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState("");
  return (
    <div className="relative">
      <label className="font-manrope text-xs text-[#D4AF37]/58 tracking-widest uppercase block mb-2">{label}</label>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 pb-3 border-b border-[#D4AF37]/18 hover:border-[#D4AF37]/42 transition-colors group">
        <Icon size={13} className="text-[#D4AF37]/48 group-hover:text-[#D4AF37] transition-colors" />
        <span className={`font-inter text-sm flex-1 text-left ${val ? "text-[#F8F5F0]" : "text-[#F8F5F0]/32"}`}>{val || placeholder}</span>
        <ChevronDown size={11} className={`text-[#D4AF37]/32 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 z-20 mt-1 glass-dark rounded-xl border border-[#D4AF37]/16 overflow-hidden shadow-2xl">
          {options.map(o => (
            <button key={o} onClick={() => { setVal(o); setOpen(false); }}
              className="w-full text-left px-4 py-3 font-inter text-sm text-[#F8F5F0]/62 hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 transition-colors border-b border-white/5 last:border-0">
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BookingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [guests, setGuests] = useState(2);
  const router = useRouter();

  return (
    <section id="booking" className="section bg-[#080808] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80')`, backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-transparent to-[#080808]" />

      <div className="relative z-10 container">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.p className="label mb-3" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>Reserve Your Stay</motion.p>
            <motion.h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#F8F5F0] mb-5 leading-tight"
              initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
              Begin Your <span className="gold-text">Royal Journey</span>
            </motion.h2>
            <motion.p className="font-inter text-[#F8F5F0]/52 leading-relaxed mb-8"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
              Every reservation at The Aurum Palace is the beginning of an extraordinary story. Our dedicated concierge team will craft a bespoke experience tailored to your every desire.
            </motion.p>
            <motion.div className="space-y-3 mb-10"
              initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}>
              {["Complimentary airport transfer in Rolls Royce", "Daily Michelin-star breakfast included", "Personalised welcome amenities", "24/7 dedicated butler service", "Flexible cancellation policy"].map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#D4AF37]/12 border border-[#D4AF37]/32 flex items-center justify-center flex-shrink-0">
                    <Check size={9} className="text-[#D4AF37]" />
                  </div>
                  <span className="font-inter text-sm text-[#F8F5F0]/52">{p}</span>
                </div>
              ))}
            </motion.div>
            <motion.div className="glass rounded-xl p-5 border border-[#D4AF37]/10"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.45 }}>
              <p className="font-manrope text-xs text-[#D4AF37]/58 tracking-widest uppercase mb-1.5">Prefer to speak with us?</p>
              <p className="font-playfair text-[#F8F5F0] text-xl">+91 1800 000 000</p>
              <p className="font-inter text-xs text-[#F8F5F0]/32 mt-1">Available 24/7 · reservations@aurumpalace.com</p>
            </motion.div>
          </div>

          <motion.div className="glass-dark rounded-2xl p-8 border border-[#D4AF37]/12"
            initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.85, delay: 0.2 }}>
              <form onSubmit={e => { e.preventDefault(); router.push('/booking'); }} className="space-y-6">
                <div>
                  <p className="font-playfair text-xl text-[#F8F5F0] mb-0.5">Reserve Your Suite</p>
                  <p className="font-inter text-xs text-[#F8F5F0]/32">Best rate guaranteed · Instant confirmation</p>
                </div>
                <SelectField label="Destination" icon={MapPin} options={DESTINATIONS} placeholder="Select destination" />
                <div className="grid grid-cols-2 gap-5">
                  {["Check-in", "Check-out"].map(l => (
                    <div key={l}>
                      <label className="font-manrope text-xs text-[#D4AF37]/58 tracking-widest uppercase block mb-2">{l}</label>
                      <div className="flex items-center gap-2 pb-3 border-b border-[#D4AF37]/16">
                        <Calendar size={13} className="text-[#D4AF37]/48" />
                        <input type="date" className="bg-transparent text-[#F8F5F0]/68 text-sm outline-none w-full font-inter" />
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <label className="font-manrope text-xs text-[#D4AF37]/58 tracking-widest uppercase block mb-2">Guests</label>
                  <div className="flex items-center gap-4 pb-3 border-b border-[#D4AF37]/16">
                    <Users size={13} className="text-[#D4AF37]/48" />
                    <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-7 h-7 rounded-full border border-[#D4AF37]/22 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors text-sm">−</button>
                    <span className="font-inter text-[#F8F5F0] text-sm w-6 text-center">{guests}</span>
                    <button type="button" onClick={() => setGuests(Math.min(10, guests + 1))}
                      className="w-7 h-7 rounded-full border border-[#D4AF37]/22 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors text-sm">+</button>
                    <span className="font-inter text-xs text-[#F8F5F0]/32 ml-1">{guests === 1 ? "1 Guest" : `${guests} Guests`}</span>
                  </div>
                </div>
                <SelectField label="Suite Type" icon={Sparkles} options={SUITES} placeholder="Select suite" />
                <SelectField label="Experience" icon={Sparkles} options={EXPERIENCES} placeholder="Select experience (optional)" />
                <div>
                  <label className="font-manrope text-xs text-[#D4AF37]/58 tracking-widest uppercase block mb-2">Special Requests</label>
                  <textarea className="input-luxury resize-none h-16" placeholder="Celebrations, dietary needs, preferences..." />
                </div>
                <button type="submit" className="w-full btn-gold py-4 text-sm">Check Availability & Reserve</button>
                <p className="font-inter text-xs text-[#F8F5F0]/22 text-center">No payment required · Free cancellation up to 48 hours</p>
              </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

