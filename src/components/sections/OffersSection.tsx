"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const OFFERS = [
  { title: "AURUM CLUB",        sub: "Breakfast & Cocktail Inclusive",  image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=85" },
  { title: "INTERNATIONAL",     sub: "Escapes & Holiday Packages",      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=85" },
  { title: "BEAT THE HEAT",     sub: "Summer Getaway Offers",           image: "/beat_the_heat_new.png" },
  { title: "ROYAL HERITAGE",    sub: "Udaipur Escape",                  image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=85" },
  { title: "STAYCATIONS",       sub: "Perfect Summer Escapes",          image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=85" },
];

const N = OFFERS.length;
const ITEMS = [...OFFERS, ...OFFERS, ...OFFERS];

const SIDE_VW = 28;
const GAP_PX  = 16;
const CARD    = `(100vw - ${SIDE_VW * 2}vw - ${GAP_PX * 2}px)`;

function getX(idx: number): string {
  return `calc(${SIDE_VW}vw + ${GAP_PX}px - ${idx} * (${CARD} + ${GAP_PX}px))`;
}

export default function OffersSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  // Start at middle copy (index N) so both sides always have cards
  const [idx, setIdx] = useState(N);
  // When true, skip animation for the instant reset jump
  const [instant, setInstant] = useState(false);

  const next = () => {
    setInstant(false);
    setIdx((p) => {
      const nextIdx = p + 1;
      // Reached end of middle copy — instantly jump back to start of middle copy
      // then the animation will play from there on next click
      if (nextIdx >= N * 2) {
        // Instant jump to equivalent position in first copy, then animate to N
        setTimeout(() => {
          setInstant(false);
          setIdx(N);
        }, 10);
        setInstant(true);
        return N - 1; // jump back silently (no animation)
      }
      return nextIdx;
    });
  };

  const prev = () => {
    setInstant(false);
    setIdx((p) => {
      const nextIdx = p - 1;
      // Reached start of middle copy — instantly jump to end of middle copy
      if (nextIdx < N) {
        setTimeout(() => {
          setInstant(false);
          setIdx(N * 2 - 1);
        }, 10);
        setInstant(true);
        return N * 2; // jump forward silently (no animation)
      }
      return nextIdx;
    });
  };

  return (
    <section className="bg-white" id="offers" style={{ paddingTop: 60, paddingBottom: 80 }}>
      <div className="wrap">
        {/* Header */}
        <div ref={ref} style={{ display: "flex", alignItems: "center", paddingBottom: 36 }}>
          <motion.div
            style={{ display: "flex", alignItems: "center", gap: 18, paddingLeft: 130, flexShrink: 0 }}
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div style={{ width: 36, height: 1, background: "#9a9490", flexShrink: 0 }} />
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
              fontWeight: 400, color: "#4a4540",
              letterSpacing: "0.12em", textTransform: "uppercase",
              lineHeight: 1.1, whiteSpace: "nowrap",
            }}>
              LATEST OFFERS
            </h2>
          </motion.div>
          <div style={{ width: 110, flexShrink: 0 }} />
          <motion.p
            style={{ maxWidth: 360, fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "#6b6560", lineHeight: 1.55 }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Dive into cool adventures at our picture-perfect destinations with The Aurum Palace.
          </motion.p>
        </div>
      </div>

      {/* overflow:hidden clips side cards symmetrically */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <motion.div
          style={{ display: "flex", gap: GAP_PX }}
          animate={{ x: getX(idx) }}
          transition={instant ? { duration: 0 } : { duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
        >
          {ITEMS.map((o, i) => (
            <div
              key={i}
              className="group"
              style={{ width: `calc(${CARD})`, flexShrink: 0, cursor: "pointer", position: "relative" }}
            >
              {/* Image */}
              <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                <div
                  style={{
                    position: "absolute", inset: 0,
                    backgroundImage: `url('${o.image}')`,
                    backgroundSize: "cover", backgroundPosition: "center",
                    transition: "transform 0.7s ease",
                  }}
                  className="group-hover:scale-[1.04]"
                />
              </div>

              {/* White info box — overlaps image by 50% of its own height */}
              <div style={{
                position: "relative",
                marginTop: "-55px",
                marginLeft: "auto",
                marginRight: "0",
                width: "55%",
                background: "rgba(255,255,255,0.96)",
                padding: "14px 18px 12px 16px",
                height: "110px",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.12), 0 12px 20px -4px rgba(0,0,0,0.15)",
                borderBottom: "2px solid rgba(0,0,0,0.08)",
              }}>
                <div>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem",
                    fontWeight: 200, letterSpacing: "0", wordSpacing: "0.1em",
                    textTransform: "uppercase", color: "#7a7470",
                    lineHeight: 1.2, marginBottom: 2,
                    WebkitFontSmoothing: "antialiased",
                    MozOsxFontSmoothing: "grayscale",
                  }}>
                    {o.title}
                  </p>
                  <p style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "0.62rem",
                    fontWeight: 300, letterSpacing: "0.04em",
                    textTransform: "uppercase", color: "#9a9490",
                    lineHeight: 1.3,
                  }}>
                    {o.sub}
                  </p>
                </div>
                <button suppressHydrationWarning style={{
                  fontFamily: "'Inter', sans-serif", fontSize: "0.72rem",
                  fontWeight: 300, letterSpacing: "0.08em",
                  textTransform: "uppercase", color: "#C6A664",
                  background: "none", border: "none", cursor: "pointer",
                  padding: 0, display: "flex", alignItems: "center", gap: 3,
                }}>
                  MORE <span style={{ fontSize: "1rem" }}>›</span>
                </button>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Left arrow */}
        <button suppressHydrationWarning onClick={prev} style={{
          position: "absolute", left: 14, top: "45%", transform: "translateY(-50%)",
          zIndex: 10, width: 36, height: 36, borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "#fff",
        }}>
          <ChevronLeft size={16} />
        </button>

        {/* Right arrow */}
        <button suppressHydrationWarning onClick={next} style={{
          position: "absolute", right: 14, top: "45%", transform: "translateY(-50%)",
          zIndex: 10, width: 36, height: 36, borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "#fff",
        }}>
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}
