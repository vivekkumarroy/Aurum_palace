"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function WellnessBanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <>
      <style>{`
        .wellness-sec {
          background-color: #fff;
        }

        /* ── Top text row ── */
        .wellness-text-wrap {
          max-width: 1320px;
          margin: 0 auto;
          padding-left: 80px;
          padding-right: 80px;
          padding-top: 70px;
          padding-bottom: 60px;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 200px;
        }

        .wellness-title-box {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
        }

        .wellness-title-line-group {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .wellness-title-line {
          width: 80px;
          height: 1px;
          background: #a0a0a0;
          flex-shrink: 0;
        }

        .wellness-title-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 300;
          color: #4a4540;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          line-height: 1;
        }

        .wellness-title-flex {
          display: flex;
          align-items: baseline;
          gap: 10px;
        }

        .wellness-title-a {
          color: #A88548;
          font-style: italic;
          font-size: clamp(2.5rem, 4vw, 3.4rem);
        }

        .wellness-desc-box {
          max-width: 380px;
          padding-top: 20px;
        }

        .wellness-desc-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          color: #6b6560;
          line-height: 1.7;
          margin-bottom: 16px;
        }

        .wellness-explore-btn {
          font-family: 'Inter', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #A88548;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* ── Image ── */
        .wellness-img-wrap {
          width: 100%;
          overflow: hidden;
          aspect-ratio: 16/7;
        }

        /* ── TABLET (768px – 1023px) ── */
        @media (max-width: 1023px) {
          .wellness-text-wrap {
            padding-left: 40px;
            padding-right: 40px;
            gap: 50px;
          }
        }

        /* ── MOBILE (< 768px) ── */
        @media (max-width: 767px) {
          .wellness-text-wrap {
            flex-direction: column;
            padding-left: 20px;
            padding-right: 20px;
            padding-top: 50px;
            padding-bottom: 40px;
            gap: 24px;
          }
          
          .wellness-title-line {
            width: 40px;
          }

          .wellness-desc-box {
            padding-top: 0;
            max-width: 100%;
          }

          .wellness-img-wrap {
            aspect-ratio: unset;
            height: 300px;
          }
        }
      `}</style>

      <section className="wellness-sec" id="wellness-circle">

        {/* ── Top text row — white bg ── */}
        <div ref={ref} className="wellness-text-wrap">
          {/* Left: Title */}
          <motion.div
            className="wellness-title-box"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Row 1: —— 𝒜 WELLNESS (line aligned with A) */}
            <div className="wellness-title-line-group">
              <div className="wellness-title-line" />
              <span className="wellness-title-text wellness-title-flex">
                <span className="wellness-title-a">𝒜</span>
                WELLNESS
              </span>
            </div>
            {/* Row 2: CIRCLE — under the grey line on left */}
            <span 
              className="wellness-title-text"
              style={{ display: "block", marginTop: -6 }}
            >
              CIRCLE
            </span>
          </motion.div>

          {/* Right: Description + Explore */}
          <motion.div
            className="wellness-desc-box"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className="wellness-desc-text">
              Welcome to a sanctuary that seamlessly blends Indian heritage healing with serene contemporary comforts for the mind, body and soul.
            </p>
            <button suppressHydrationWarning className="wellness-explore-btn">
              EXPLORE <span style={{ fontSize: "1rem" }}>›</span>
            </button>
          </motion.div>
        </div>

        {/* ── Full-width panoramic image ── */}
        <motion.div
          className="wellness-img-wrap"
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
    </>
  );
}
