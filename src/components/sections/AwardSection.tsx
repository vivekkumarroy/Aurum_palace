"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function AwardSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-white" style={{ paddingTop: 64, paddingBottom: 0 }}>
      <style>{`
        .award-img-outer {
          padding: 0 200px;
          box-sizing: border-box;
        }
        .award-img-ratio {
          width: 100%;
          aspect-ratio: 21 / 8;
          position: relative;
          background: #0a0500;
        }
        @media (max-width: 1023px) {
          .award-img-outer { padding: 0 60px; }
        }
        @media (max-width: 767px) {
          .award-img-outer { padding: 0 16px; }
          .award-img-ratio {
            aspect-ratio: unset;
            height: 220px;
          }
        }
      `}</style>
      {/* Heading */}
      <motion.div
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 24, padding: "0 24px" }}
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div style={{ width: 48, height: 1, background: "#9a9490", flexShrink: 0 }} />
        <h2 className="font-playfair" style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)", fontWeight: 300, color: "#4a4540", letterSpacing: "0.08em", textTransform: "uppercase", textAlign: "center", lineHeight: 1.15 }}>
          INDIA'S PRIDE, WORLD'S STRONGEST
        </h2>
        <div style={{ width: 48, height: 1, background: "#9a9490", flexShrink: 0 }} />
      </motion.div>

      {/* Subtext */}
      <motion.p
        style={{ textAlign: "center", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#6b6560", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 48px auto", padding: "0 16px" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.15 }}
      >
        The Aurum Palace has been recognised as World's Strongest Hotel Brand and India's Strongest Brand, across sectors, by Brand Finance 2025 Reports
      </motion.p>

      {/* Image with side padding */}
      <motion.div
        className="award-img-outer"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div style={{ width: "100%", position: "relative", overflow: "hidden" }}>

          {/* Grand illuminated hotel at night — full front view */}
          <div className="award-img-ratio">
            {/* Primary image */}
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=2560&q=100"
              alt="Grand luxury hotel at night"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", display: "block" }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=2560&q=100";
              }}
            />
          </div>

          {/* Dark overlay — heavy top-left */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.18) 100%)" }} />

          {/* Award text — top left */}
          <div style={{ position: "absolute", top: "14%", left: "6%", display: "grid", gridTemplateColumns: "auto auto auto", gap: "clamp(8px, 1.5vw, 24px)", alignItems: "start" }}>
            <div>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(0.48rem, 0.85vw, 0.65rem)", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.80)", lineHeight: 1.5 }}>
                WORLD'S<br />STRONGEST<br />HOTEL BRAND 2025
              </p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(0.44rem, 0.75vw, 0.58rem)", color: "#C6A664", letterSpacing: "0.1em", marginTop: 5 }}>
                2024 • 2022 • 2021
              </p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(0.38rem, 0.6vw, 0.5rem)", color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em", marginTop: 4 }}>
                Report by BrandFinance®
              </p>
            </div>
            <div style={{ width: 1, background: "rgba(255,255,255,0.3)", alignSelf: "stretch", margin: "2px 4px" }} />
            <div>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(0.48rem, 0.85vw, 0.65rem)", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.80)", lineHeight: 1.5 }}>
                INDIA'S<br />STRONGEST<br />BRAND 2025
              </p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(0.44rem, 0.75vw, 0.58rem)", color: "#C6A664", letterSpacing: "0.1em", marginTop: 5 }}>
                2020 • 2022 • 2023 • 2024
              </p>
            </div>
          </div>

        </div>
      </motion.div>

    </section>
  );
}

