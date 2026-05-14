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
    <>
      <style>{`
        /* ── Events Section ── */
        .events-section {
          background: #fff;
          padding: 90px 0;
          border-top: 1px solid #e8e2d9;
        }
        .events-container {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 80px;
        }

        /* ── Header Row ── */
        .events-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 60px;
          gap: 24px;
        }
        .events-title-wrap {
          flex-shrink: 0;
          padding-left: 80px;
        }
        .events-title-row1 {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .events-title-line {
          width: 80px;
          height: 1px;
          background: #a0a0a0;
          flex-shrink: 0;
        }
        .events-title-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 300;
          color: #4a4540;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          line-height: 1;
          display: block;
        }
        .events-title-row2 {
          padding-left: 0;
        }
        .events-subtitle {
          max-width: 380px;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          color: #6b6560;
          line-height: 1.7;
          padding-top: 8px;
          text-align: left;
        }

        /* ── Cards Grid ── */
        .events-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .event-card {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .event-card-img-wrap {
          position: relative;
          overflow: hidden;
          aspect-ratio: 3/2.5;
          width: 100%;
        }
        .event-card-img {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform 0.8s cubic-bezier(0.25, 1, 0.35, 1);
        }
        .event-card:hover .event-card-img {
          transform: scale(1.05);
        }
        .event-card-label {
          background: #fff;
          padding: 14px 20px 16px 20px;
          position: relative;
          margin-top: -44px;
          margin-left: 30%;
          margin-right: 0;
          z-index: 2;
          box-shadow: 0 6px 24px rgba(0,0,0,0.08);
          min-height: 72px;
          display: flex;
          align-items: center;
        }
        .event-card-label p {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          font-weight: 400;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #333;
          line-height: 1.25;
          white-space: pre-line;
          margin: 0;
        }

        /* ── TABLET (768px – 1023px) ── */
        @media (max-width: 1023px) {
          .events-container {
            padding: 0 40px;
          }
          .events-title-wrap {
            padding-left: 40px;
          }
          .events-header {
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 40px;
            gap: 16px;
          }
          .events-subtitle {
            max-width: 100%;
          }
          .events-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
          }
          .event-card {
            width: calc(50% - 10px);
          }
        }

        /* ── MOBILE (< 768px) ── */
        @media (max-width: 767px) {
          .events-section {
            padding: 60px 0;
          }
          .events-container {
            padding: 0 20px;
          }
          .events-title-wrap {
            padding-left: 0;
          }
          .events-title-line {
            width: 50px;
          }
          .events-title-text {
            font-size: clamp(1.6rem, 7vw, 2.2rem);
          }
          .event-card-img-wrap {
            aspect-ratio: unset;
            height: 260px;
          }
          .events-header {
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 32px;
            gap: 12px;
          }
          .events-subtitle {
            font-size: 0.88rem;
            max-width: 100%;
          }
          .events-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .event-card {
            width: 100%;
          }
          .event-card-label {
            margin-left: 20%;
            min-height: 60px;
          }
        }
      `}</style>

      <section id="events" className="events-section">
        <div className="events-container">

          {/* ── Header Row ── */}
          <div ref={ref} className="events-header">

            {/* Left: Title */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="events-title-wrap"
            >
              {/* Row 1: Grey line + "EVENTS AND" */}
              <div className="events-title-row1">
                <div className="events-title-line" />
                <span className="events-title-text">EVENTS AND</span>
              </div>
              {/* Row 2: "CONFERENCES" below the line */}
              <div className="events-title-row2">
                <span className="events-title-text">CONFERENCES</span>
              </div>
            </motion.div>

            {/* Right: Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="events-subtitle"
            >
              Aurum Palace elevates every occasion into an awe-inspiring, immersive experience to cherish forever.
            </motion.p>
          </div>

          {/* ── 3 Cards ── */}
          <div className="events-grid">
            {EVENTS.map((e, i) => (
              <motion.div
                key={i}
                className="event-card"
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12 + 0.2, duration: 0.7 }}
              >
                {/* Image */}
                <div className="event-card-img-wrap">
                  <div
                    className="event-card-img"
                    style={{ backgroundImage: `url('${e.image}')` }}
                  />
                </div>

                {/* Floating Label */}
                <div className="event-card-label">
                  <p>{e.title}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
