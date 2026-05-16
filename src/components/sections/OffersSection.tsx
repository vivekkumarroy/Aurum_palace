"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const OFFERS = [
  { id: "aurum-club", title: "AURUM CLUB", sub: "Breakfast & Cocktail Inclusive", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=85" },
  { id: "international", title: "INTERNATIONAL", sub: "Escapes & Holiday Packages", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=85" },
  { id: "beat-the-heat", title: "BEAT THE HEAT", sub: "Summer Getaway Offers", image: "/beat_the_heat_new.png" },
  { id: "royal-heritage", title: "ROYAL HERITAGE", sub: "Udaipur Escape", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=85" },
  { id: "staycations", title: "STAYCATIONS", sub: "Perfect Summer Escapes", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=85" },
];

const N = OFFERS.length;
const ITEMS = [...OFFERS, ...OFFERS, ...OFFERS];

export default function OffersSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Responsive: detect screen size
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Different side padding based on screen
  const SIDE_VW = isMobile ? 4 : 28;
  const GAP_PX  = isMobile ? 12 : 16;
  const CARD    = `(100vw - ${SIDE_VW * 2}vw - ${GAP_PX * 2}px)`;

  function getX(i: number) {
    return `calc(${SIDE_VW}vw + ${GAP_PX}px - ${i} * (${CARD} + ${GAP_PX}px))`;
  }

  // Start at middle copy so both sides always have cards
  const [idx, setIdx] = useState(N);
  const [instant, setInstant] = useState(false);

  const next = () => {
    setInstant(false);
    setIdx((p) => {
      const nxt = p + 1;
      if (nxt >= N * 2) {
        setTimeout(() => { setInstant(false); setIdx(N); }, 10);
        setInstant(true);
        return N - 1;
      }
      return nxt;
    });
  };

  const prev = () => {
    setInstant(false);
    setIdx((p) => {
      const nxt = p - 1;
      if (nxt < N) {
        setTimeout(() => { setInstant(false); setIdx(N * 2 - 1); }, 10);
        setInstant(true);
        return N * 2;
      }
      return nxt;
    });
  };

  return (
    <>
      <style>{`
        /* ── Offers Section ── */
        .offers-section {
          background: #fff;
          padding-top: 60px;
          padding-bottom: 80px;
        }

        /* ── Header ── */
        .offers-header {
          display: flex;
          align-items: center;
          padding-bottom: 36px;
          padding-left: 0;
        }
        .offers-title-group {
          display: flex;
          align-items: center;
          gap: 18px;
          padding-left: 130px;
          flex-shrink: 0;
        }
        .offers-subtitle {
          max-width: 360px;
          font-family: 'Inter', sans-serif;
          font-size: 0.82rem;
          color: #6b6560;
          line-height: 1.55;
          margin-left: 110px;
        }

        /* ── Card Image ── */
        .offer-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
        }
        .offer-img-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform 0.7s ease;
        }

        /* ── Card Info Box ── */
        .offer-info-box {
          position: relative;
          margin-top: -55px;
          margin-left: auto;
          margin-right: 0;
          width: 55%;
          background: rgba(255,255,255,0.96);
          padding: 14px 18px 12px 16px;
          height: 110px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.12);
          border-bottom: 2px solid rgba(0,0,0,0.08);
        }
        .offer-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 200;
          text-transform: uppercase;
          color: #7a7470;
          line-height: 1.2;
          margin-bottom: 2px;
        }
        .offer-card-sub {
          font-family: 'Inter', sans-serif;
          font-size: 0.62rem;
          font-weight: 300;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #9a9490;
          line-height: 1.3;
        }
        .offer-card-more {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          font-weight: 300;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #C6A664;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          gap: 3px;
        }

        /* ── Arrows ── */
        .offers-arrow {
          position: absolute;
          top: 45%;
          transform: translateY(-50%);
          z-index: 10;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.8);
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #fff;
          transition: background 0.2s;
        }
        .offers-arrow:hover {
          background: rgba(255,255,255,0.35);
        }
        .offers-arrow-left  { left: 14px; }
        .offers-arrow-right { right: 14px; }

        /* ── TABLET (768–1023px) ── */
        @media (max-width: 1023px) {
          .offers-title-group { padding-left: 40px; }
          .offers-subtitle    { margin-left: 40px; font-size: 0.8rem; }
        }

        /* ── MOBILE (<768px) ── */
        @media (max-width: 767px) {
          .offers-section { padding-top: 48px; padding-bottom: 60px; }

          /* Stack header vertically */
          .offers-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            padding-bottom: 24px;
            padding-left: 20px;
            padding-right: 20px;
          }
          .offers-title-group {
            padding-left: 0;
            gap: 14px;
          }
          .offers-subtitle {
            margin-left: 0;
            font-size: 0.82rem;
            max-width: 100%;
          }

          /* Image: fixed height on mobile */
          .offer-img-wrap {
            aspect-ratio: unset;
            height: 250px;
          }

          /* Info box: wider on mobile */
          .offer-info-box {
            width: 70%;
            height: auto;
            min-height: 90px;
            padding: 12px 14px 10px 12px;
            margin-top: -44px;
          }
          .offer-card-title { font-size: 1.1rem; }
          .offer-card-sub   { font-size: 0.6rem; }

          /* Arrows: more visible on mobile */
          .offers-arrow {
            width: 36px;
            height: 36px;
            background: rgba(0,0,0,0.35);
            border-color: rgba(255,255,255,0.5);
          }
          .offers-arrow-left  { left: 8px; }
          .offers-arrow-right { right: 8px; }
        }
      `}</style>

      <section className="offers-section" id="offers">
        {/* ── Header ── */}
        <div className="wrap">
          <div ref={ref} className="offers-header">
            <motion.div
              className="offers-title-group"
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

            <motion.p
              className="offers-subtitle"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              Dive into cool adventures at our picture-perfect destinations with The Aurum Palace.
            </motion.p>
          </div>
        </div>

        {/* ── Carousel ── */}
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
                <div className="offer-img-wrap">
                  <div
                    className="offer-img-bg group-hover:scale-[1.04]"
                    style={{ backgroundImage: `url('${o.image}')` }}
                  />
                </div>

                {/* Info Box */}
                <div className="offer-info-box">
                  <div>
                    <p className="offer-card-title">{o.title}</p>
                    <p className="offer-card-sub">{o.sub}</p>
                  </div>
                  <Link href={`/experience/${o.id}`} style={{textDecoration: "none"}} className="offer-card-more">
                    MORE <span style={{ fontSize: "1rem" }}>›</span>
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Left Arrow */}
          <button suppressHydrationWarning onClick={prev} className="offers-arrow offers-arrow-left">
            <ChevronLeft size={18} />
          </button>

          {/* Right Arrow */}
          <button suppressHydrationWarning onClick={next} className="offers-arrow offers-arrow-right">
            <ChevronRight size={18} />
          </button>
        </div>
      </section>
    </>
  );
}
