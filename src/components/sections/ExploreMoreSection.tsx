"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const EXPLORE_ITEMS = [
  { title: "ENCHANTING SAFARIS",  image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=85" },
  { title: "LIVING PALACES",      image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=85" },
  { title: "CITY HOTELS",         image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800&q=85" },
  { title: "BEACH RESORTS",       image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=85" },
  { title: "MOUNTAIN RETREATS",   image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85" },
];

const N = EXPLORE_ITEMS.length;
const ITEMS = [...EXPLORE_ITEMS, ...EXPLORE_ITEMS, ...EXPLORE_ITEMS];

export default function ExploreMoreSection() {
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

  // Start at middle copy (index N) so both sides always have cards
  const [idx, setIdx] = useState(N);
  const [instant, setInstant] = useState(false);

  const next = () => {
    setInstant(false);
    setIdx((p) => {
      const nextIdx = p + 1;
      if (nextIdx >= N * 2) {
        setTimeout(() => { setInstant(false); setIdx(N); }, 10);
        setInstant(true);
        return N - 1; 
      }
      return nextIdx;
    });
  };

  const prev = () => {
    setInstant(false);
    setIdx((p) => {
      const nextIdx = p - 1;
      if (nextIdx < N) {
        setTimeout(() => { setInstant(false); setIdx(N * 2 - 1); }, 10);
        setInstant(true);
        return N * 2; 
      }
      return nextIdx;
    });
  };

  return (
    <>
      <style>{`
        /* ── Explore Section ── */
        .explore-section {
          padding-bottom: 80px;
        }

        /* ── Header ── */
        .explore-header {
          display: flex;
          align-items: flex-end;
          padding-top: 35px;
          padding-bottom: 60px;
          padding-left: 20px;
          padding-right: 20px;
        }
        .explore-title-group {
          padding-left: 110px;
          flex-shrink: 0;
        }
        .explore-subtitle {
          max-width: 380px;
          margin-right: 50px;
          align-self: flex-end;
          font-family: 'Inter', sans-serif;
          font-size: 0.82rem;
          color: #6b6560;
          line-height: 1.7;
          margin-left: 210px; /* Instead of the empty div width */
        }

        /* ── Card Image ── */
        .explore-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
        }
        .explore-img-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform 0.7s ease;
        }

        /* ── Card Info Box ── */
        .explore-info-box {
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
        .explore-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 200;
          letter-spacing: 0;
          word-spacing: 0.1em;
          text-transform: uppercase;
          color: #7a7470;
          line-height: 1.2;
          margin-bottom: 2px;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .explore-card-more {
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
        .explore-arrow {
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
        .explore-arrow:hover {
          background: rgba(255,255,255,0.35);
        }
        .explore-arrow-left  { left: 14px; }
        .explore-arrow-right { right: 14px; }

        /* ── TABLET (768–1023px) ── */
        @media (max-width: 1023px) {
          .explore-title-group { padding-left: 40px; }
          .explore-subtitle    { margin-left: 40px; margin-right: 20px; font-size: 0.8rem; }
        }

        /* ── MOBILE (<768px) ── */
        @media (max-width: 767px) {
          .explore-section { padding-bottom: 60px; }

          /* Stack header vertically and reduce top gap */
          .explore-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            padding-top: 10px; /* Reduced from 35px */
            padding-bottom: 24px; /* Reduced from 60px */
            padding-left: 20px;
            padding-right: 20px;
          }
          .explore-title-group {
            padding-left: 0;
          }
          .explore-subtitle {
            margin-left: 0;
            margin-right: 0;
            align-self: flex-start;
            font-size: 0.82rem;
            max-width: 100%;
          }

          /* Image: fixed height on mobile */
          .explore-img-wrap {
            aspect-ratio: unset;
            height: 250px;
          }

          /* Info box: wider on mobile */
          .explore-info-box {
            width: 70%;
            height: auto;
            min-height: 90px;
            padding: 12px 14px 10px 12px;
            margin-top: -44px;
          }
          .explore-card-title { font-size: 1.1rem; }

          /* Arrows: more visible on mobile */
          .explore-arrow {
            width: 36px;
            height: 36px;
            background: rgba(0,0,0,0.35);
            border-color: rgba(255,255,255,0.5);
          }
          .explore-arrow-left  { left: 8px; }
          .explore-arrow-right { right: 8px; }
        }
      `}</style>

      <section className="sec bg-explore explore-section" id="explore">
        <div className="wrap">
          {/* Header */}
          <div ref={ref} className="explore-header">
            <motion.div
              className="explore-title-group"
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 0 }}>
                <div style={{ width: 36, height: 1, background: "#9a9490", flexShrink: 0 }} />
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 4vw, 3.4rem)", fontWeight: 400, color: "#4a4540", letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1.1 }}>
                  EXPLORE
                </span>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 4vw, 3.4rem)", fontWeight: 400, color: "#4a4540", letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1.1 }}>
                MORE
              </h2>
            </motion.div>

            <motion.p
              className="explore-subtitle"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              Relaxing beach paradises, thrilling urban getaways, exotic hill stations and historic homes of royalty are all within reach.
            </motion.p>
          </div>
        </div>

        {/* Carousel */}
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
                <div className="explore-img-wrap">
                  <div
                    className="explore-img-bg group-hover:scale-[1.04]"
                    style={{ backgroundImage: `url('${o.image}')` }}
                  />
                </div>

                {/* Info Box */}
                <div className="explore-info-box">
                  <div>
                    <p className="explore-card-title">{o.title}</p>
                  </div>
                  <button suppressHydrationWarning className="explore-card-more">
                    MORE <span style={{ fontSize: "1rem" }}>›</span>
                  </button>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Left Arrow */}
          <button suppressHydrationWarning onClick={prev} className="explore-arrow explore-arrow-left">
            <ChevronLeft size={18} />
          </button>

          {/* Right Arrow */}
          <button suppressHydrationWarning onClick={next} className="explore-arrow explore-arrow-right">
            <ChevronRight size={18} />
          </button>
        </div>
      </section>
    </>
  );
}
