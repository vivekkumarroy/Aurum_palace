"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EVENTS = [
  {
    title: "MEETINGS &\nCONFERENCES",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=85",
  },
  {
    title: "EVENTS",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=900&q=85",
  },
  {
    title: "TIMELESS\nWEDDINGS",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=85",
  },
];

export default function EventsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="events"
      style={{
        background: "#fff",
        paddingTop: 90,
        paddingBottom: 90,
        borderTop: "1px solid #e8e2d9",
      }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto", paddingLeft: 80, paddingRight: 80 }}>

        {/* ── Header Row ── */}
        <div
          ref={ref}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 60,
            gap: 24,
          }}
        >
          {/* Left: Title */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ flexShrink: 0, paddingLeft: 80 }}
          >
            {/* Row 1: Grey line + Title block */}
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <div style={{ width: 80, height: 1, background: "#a0a0a0", flexShrink: 0 }} />
              {/* Title: both lines in a tight flex column */}
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                  fontWeight: 300, color: "#4a4540",
                  letterSpacing: "0.02em", textTransform: "uppercase",
                  lineHeight: 1, display: "block",
                }}>EVENTS AND</span>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                  fontWeight: 300, color: "#4a4540",
                  letterSpacing: "0.02em", textTransform: "uppercase",
                  lineHeight: 1, display: "block",
                }}>CONFERENCES</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              maxWidth: 380,
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.95rem",
              color: "#6b6560",
              lineHeight: 1.7,
              paddingTop: 8,
              textAlign: "left",
            }}
          >
            Aurum Palace elevates every occasion into an awe-inspiring, immersive experience to cherish forever.
          </motion.p>
        </div>

        {/* ── 3 Cards ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {EVENTS.map((e, i) => (
            <motion.div
              key={i}
              className="group"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12 + 0.2, duration: 0.7 }}
              style={{ cursor: "pointer", display: "flex", flexDirection: "column", position: "relative" }}
            >
              {/* Image */}
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  aspectRatio: "3/2.5",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url('${e.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transition: "transform 0.8s cubic-bezier(0.25, 1, 0.35, 1)",
                  }}
                  className="group-hover:scale-[1.05]"
                />
              </div>

              {/* White floating label at bottom - starts 30% from left, flush right */}
              <div
                style={{
                  background: "#fff",
                  padding: "14px 20px 16px 20px",
                  position: "relative",
                  marginTop: "-44px",
                  marginLeft: "30%",
                  marginRight: "0",
                  zIndex: 2,
                  boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
                  minHeight: 72,        // Same height for all 3 cards
                  display: "flex",
                  alignItems: "center", // Vertically center single-line text
                }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1rem",
                    fontWeight: 400,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: "#333",
                    lineHeight: 1.25,
                    whiteSpace: "pre-line",
                    margin: 0,
                  }}
                >
                  {e.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
