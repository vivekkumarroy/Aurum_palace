"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function WellnessBanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="bg-white" id="wellness-circle">

      {/* ── Top text row — white bg ── */}
      <div
        ref={ref}
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          paddingLeft: 80,
          paddingRight: 80,
          paddingTop: 70,
          paddingBottom: 60,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: 200,
        }}
      >
        {/* Left: Title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ flexShrink: 0, paddingLeft: 0 }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {/* Row 1: —— 𝒜 WELLNESS (line aligned with A) */}
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ width: 80, height: 1, background: "#a0a0a0", flexShrink: 0 }} />
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                fontWeight: 300, color: "#4a4540",
                letterSpacing: "0.02em", textTransform: "uppercase",
                lineHeight: 1, display: "flex", alignItems: "baseline", gap: 10,
              }}>
                <span style={{ color: "#A88548", fontStyle: "italic", fontSize: "clamp(2.5rem, 4vw, 3.4rem)" }}>𝒜</span>
                WELLNESS
              </span>
            </div>
            {/* Row 2: CIRCLE — under the grey line on left */}
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
              fontWeight: 300, color: "#4a4540",
              letterSpacing: "0.02em", textTransform: "uppercase",
              lineHeight: 1, display: "block",
              paddingLeft: 0,
              marginTop: -6,
            }}>
              CIRCLE
            </span>
          </div>
        </motion.div>

        {/* Right: Description + Explore */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{ maxWidth: 380, paddingTop: 20 }}
        >
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.95rem",
            color: "#6b6560",
            lineHeight: 1.7,
            marginBottom: 16,
          }}>
            Welcome to a sanctuary that seamlessly blends Indian heritage healing with serene contemporary comforts for the mind, body and soul.
          </p>
          <button
            suppressHydrationWarning
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.82rem",
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#A88548",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            EXPLORE <span style={{ fontSize: "1rem" }}>›</span>
          </button>
        </motion.div>
      </div>

      {/* ── Full-width panoramic image ── */}
      <motion.div
        className="w-full overflow-hidden"
        style={{ aspectRatio: "16/7" }}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.9 }}
      >
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-[8000ms] hover:scale-105"
          style={{
            backgroundImage: `url('/luxury_spa_hot_stone.png')`,
            backgroundPosition: "center 70%",
            backgroundSize: "cover",
          }}
        />
      </motion.div>

    </section>
  );
}
