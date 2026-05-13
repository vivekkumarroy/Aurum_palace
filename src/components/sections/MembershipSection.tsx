"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Crown, Diamond, Gem, Check, Sparkles } from "lucide-react";

const TIERS = [
  {
    name: "Aurum Select", icon: Gem, price: "₹2,50,000", period: "per year",
    color: "#C0C0C0", border: "border-[#C0C0C0]/22", bg: "rgba(192,192,192,0.06)",
    badge: "Silver",
    features: ["Priority room reservations", "15% dining discount", "Monthly spa session", "Airport lounge access", "Dedicated concierge line", "Early check-in / late check-out"],
  },
  {
    name: "Aurum Prestige", icon: Diamond, price: "₹6,00,000", period: "per year",
    color: "#D4AF37", border: "border-[#D4AF37]/42", bg: "rgba(212,175,55,0.08)",
    badge: "Gold · Most Popular", featured: true,
    features: ["All Select benefits", "Guaranteed suite upgrades", "25% dining & spa discount", "Private jet assistance", "Exclusive member events", "Complimentary anniversary stay", "Personal lifestyle manager"],
  },
  {
    name: "Aurum Royale", icon: Crown, price: "₹15,00,000", period: "per year",
    color: "#E8CC6A", border: "border-[#E8CC6A]/32", bg: "rgba(90,30,42,0.12)",
    badge: "Platinum · By Invitation",
    features: ["All Prestige benefits", "Permanent suite reservation", "Unlimited complimentary stays", "Private helicopter transfers", "Bespoke travel planning", "All Aurum properties access", "NFT membership certificate", "Royal Gala invitations"],
  },
];

export default function MembershipSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="membership" className="section bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: `repeating-linear-gradient(45deg, #D4AF37 0px, #D4AF37 1px, transparent 1px, transparent 60px)` }} />

      <div className="relative z-10 container">
        <div ref={ref} className="text-center mb-14">
          <motion.p className="label mb-3" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>Exclusive Membership</motion.p>
          <motion.h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#F8F5F0] mb-3"
            initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
            Join the <span className="gold-text">Inner Circle</span>
          </motion.h2>
          <motion.p className="font-cormorant italic text-[#F8F5F0]/42 text-xl max-w-xl mx-auto"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
            Unlock a world of privileges reserved for the most discerning guests
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {TIERS.map((tier, i) => (
            <motion.div key={i}
              className={`relative rounded-2xl p-8 border overflow-hidden nft-card ${tier.border} ${tier.featured ? "md:-mt-4 md:mb-4" : ""}`}
              style={{ background: `linear-gradient(135deg, ${tier.bg} 0%, rgba(17,17,17,0.98) 100%)` }}
              initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.3, duration: 0.8 }} whileHover={{ y: -5 }}>

              {tier.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="badge flex items-center gap-1"><Sparkles size={9} />{tier.badge}</span>
                </div>
              )}

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5 border"
                  style={{ background: `${tier.color}12`, borderColor: `${tier.color}32` }}>
                  <tier.icon size={22} style={{ color: tier.color }} />
                </div>
                {!tier.featured && (
                  <span className="font-manrope text-xs tracking-widest uppercase mb-2 block" style={{ color: `${tier.color}68` }}>{tier.badge}</span>
                )}
                <h3 className="font-playfair text-2xl text-[#F8F5F0] font-bold mb-2">{tier.name}</h3>
                <div className="mb-5">
                  <span className="font-playfair text-3xl font-bold" style={{ color: tier.color }}>{tier.price}</span>
                  <span className="font-manrope text-xs text-[#F8F5F0]/32 ml-2">{tier.period}</span>
                </div>
                <div className="divider mb-5" />
                <ul className="space-y-2.5 mb-7">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <Check size={12} style={{ color: tier.color }} className="mt-0.5 flex-shrink-0" />
                      <span className="font-inter text-sm text-[#F8F5F0]/52">{f}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 font-manrope text-xs tracking-widest uppercase font-semibold rounded transition-all duration-300 ${
                  tier.featured ? "bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#E8CC6A]" : "border text-[#F8F5F0]/58 hover:text-[#D4AF37]"
                }`} style={!tier.featured ? { borderColor: `${tier.color}22` } : {}}>
                  {tier.badge.includes("Invitation") ? "Request Invitation" : "Join Now"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center glass rounded-2xl p-8 border border-[#D4AF37]/10 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.7 }}>
          <Sparkles size={22} className="text-[#D4AF37] mx-auto mb-3" />
          <h4 className="font-playfair text-xl text-[#F8F5F0] mb-2">Digital Membership Certificate</h4>
          <p className="font-inter text-sm text-[#F8F5F0]/42">
            Every Aurum Royale membership comes with an exclusive NFT certificate — a unique digital asset that serves as your permanent proof of membership and unlocks special privileges across our global properties.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

