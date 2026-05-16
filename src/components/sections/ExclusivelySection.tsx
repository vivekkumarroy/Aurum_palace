"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const SLIDES = [
  {
    id: "perfect-staycations",
    label: "PERFECT STAYCATIONS",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=85",
    title: "PERFECT STAYCATIONS – SUMMER ESCAPES",
    desc: "Escape into brighter days without stepping out of your city. Enjoy stays designed for comfort and the simple joy of being away, yet beautifully close to home.",
  },
  {
    id: "family-escapes",
    label: "FAMILY ESCAPES",
    image: "/family_hotel_sofa.png",
    title: "FAMILY RETREATS",
    desc: "Create unforgettable memories with your loved ones in our spacious family suites. Reconnect and relax in the elegant ambiance of our grand lobby.",
  },
  {
    id: "game-room",
    label: "GAME ROOM FUN",
    image: "/playing_billiards.png",
    title: "LEISURE & ENTERTAINMENT",
    desc: "Challenge your friends to a game of pool in our lively, luxurious game room. The perfect place to unwind and socialize during your stay.",
  },
  {
    id: "ocean-views",
    label: "OCEAN VIEWS",
    image: "/luxury_room_view.png",
    title: "STUNNING OCEAN VIEWS",
    desc: "Wake up to breathtaking ocean panoramas from your private balcony. Witness glorious sunsets that paint the sky in vibrant, unforgettable colors.",
  },
  {
    id: "holidays",
    label: "AURUM PALACE HOLIDAYS",
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=1200&q=85",
    title: "AURUM PALACE HOLIDAYS",
    desc: "Go beyond the ordinary and craft enduring memories with a perfectly curated Aurum Palace Holiday.",
  },
  {
    id: "heritage-escape",
    label: "ROYAL HERITAGE",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=85",
    title: "ROYAL HERITAGE ESCAPE",
    desc: "Step into the grandeur of India's most iconic palaces. Every corridor whispers stories of royalty and timeless elegance.",
  },
  {
    id: "epic-dining",
    label: "FINE DINING",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85",
    title: "EPICURE – FINE DINING",
    desc: "A world of benefits designed to indulge with member-only savings, unique vouchers, exclusive benefits and more.",
  },
  {
    id: "spa-wellness",
    label: "SPA & WELLNESS",
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&q=85",
    title: "AURUM WELLNESS CIRCLE",
    desc: "Immerse yourself in ancient Ayurvedic rituals and modern wellness therapies at our award-winning spa sanctuaries.",
  },
];

export default function ExclusivelySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  const prev = () => { setDir(-1); setIdx((p) => (p - 1 + SLIDES.length) % SLIDES.length); };
  const next = () => { setDir(1);  setIdx((p) => (p + 1) % SLIDES.length); };

  const slide     = SLIDES[idx];
  const leftSlide = SLIDES[(idx - 1 + SLIDES.length) % SLIDES.length];
  const rightSlide= SLIDES[(idx + 1) % SLIDES.length];

  return (
    <>
      <style>{`
        .exclusively-sec {
          position: relative;
          overflow: hidden;
          min-height: 520px;
        }

        /* ── Header ── */
        .exc-header-wrap {
          padding-top: 50px;
          padding-bottom: 40px;
        }
        .exc-header-flex {
          display: flex;
          align-items: flex-end;
          gap: 50px;
        }
        .exc-title-box {
          padding-left: 90px;
          flex-shrink: 0;
        }
        .exc-subtitle {
          font-size: 0.82rem;
          line-height: 1.6;
          color: #ffffff;
          margin-left: 85px;
          max-width: 28rem;
        }

        /* ── Carousel Container ── */
        .exc-carousel {
          display: flex;
          align-items: stretch;
          padding-bottom: 40px;
        }
        .exc-side-panel {
          width: 20%;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .exc-center-card {
          flex: 1;
          display: flex;
          flex-direction: column;
          max-width: 46%;
          margin: 0 auto;
        }
        
        .exc-center-img-wrap {
          position: relative;
          overflow: hidden;
          aspect-ratio: 16/9;
          max-height: 240px;
        }

        .exc-center-info {
          background: #fff;
          padding: 24px 32px;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          /* Min height to prevent jumpy arrows */
          min-height: 170px; 
        }

        /* Mobile specific styles */
        .exc-mobile-arrows {
          display: none;
        }

        @media (max-width: 1023px) {
          .exc-title-box { padding-left: 40px; }
          .exc-subtitle { margin-left: 40px; }
          .exc-center-card { max-width: 55%; }
        }

        @media (max-width: 767px) {
          .exc-header-flex {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 20px;
          }
          .exc-title-box {
            padding-left: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .exc-title-box > div {
            justify-content: center;
          }
          .exc-subtitle {
            margin-left: 0;
            text-align: center;
            padding: 0 20px;
          }
          .exc-side-panel { display: none; }
          .exc-center-card { max-width: 90%; margin: 0 auto; }
          
          .exc-mobile-arrows {
            display: flex;
            justify-content: center;
            gap: 16px;
            padding-top: 16px;
            padding-bottom: 30px;
            position: relative;
            z-index: 5;
          }
        }
      `}</style>

      <section id="exclusively" className="exclusively-sec">

        {/* ── Blurred dynamic background — all slides stacked, active one visible ── */}
        {SLIDES.map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute", inset: 0, zIndex: 0,
              backgroundImage: `url('${s.image}')`,
              backgroundSize: "cover", backgroundPosition: "center",
              filter: "blur(24px) brightness(0.25)",
              transform: "scale(1.15)",
              opacity: i === idx ? 1 : 0,
              transition: "opacity 0.9s ease",
            }}
          />
        ))}

        {/* ── Gradient overlay ── */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(to right, rgba(5,12,10,0.82) 0%, rgba(10,25,20,0.45) 40%, rgba(10,25,20,0.45) 60%, rgba(5,12,10,0.82) 100%)",
        }} />

        {/* ── Content ── */}
        <div style={{ position: "relative", zIndex: 2 }}>

          {/* Header */}
          <div ref={ref} className="wrap exc-header-wrap">
            <div className="exc-header-flex">
              <motion.div className="exc-title-box"
                initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-0.5 bg-white flex-shrink-0" />
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 400, color: "#fff", letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1.1 }}>
                      EXCLUSIVELY
                    </span>
                  </div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 400, color: "#fff", letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1.1 }}>
                    FOR YOU
                  </h2>
                </div>
              </motion.div>
              <motion.p className="exc-subtitle"
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
                Refinement and creativity intertwine with dreamlike destinations and soulful moments on each sojourn with The Aurum Palace.
              </motion.p>
            </div>
          </div>

          {/* Carousel */}
          <div className="exc-carousel">

            {/* Left panel (hidden on mobile) */}
            <div className="exc-side-panel">
              <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${leftSlide.image}')`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.5 }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(5,12,10,0.55)" }} />
              <button suppressHydrationWarning onClick={prev} className="carousel-arrow" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 2 }}>
                <ChevronLeft size={18} />
              </button>
              <p style={{ position: "absolute", bottom: "30%", left: 0, right: 0, textAlign: "center", fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", zIndex: 2 }}>
                {leftSlide.label}
              </p>
            </div>

            {/* Center card */}
            <div className="exc-center-card">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={idx}
                  custom={dir}
                  variants={{
                    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
                    center: { x: 0, opacity: 1 },
                    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
                  }}
                  initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="exc-center-img-wrap"
                >
                  <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: `url('${slide.image}')`,
                    backgroundSize: "cover", backgroundPosition: "center",
                  }} />
                </motion.div>
              </AnimatePresence>

              {/* White info card */}
              <div className="exc-center-info">
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2a2520", marginBottom: 8 }}>
                  {slide.title}
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "#6b6560", lineHeight: 1.6, maxWidth: 480, margin: "0 auto 12px" }}>
                  {slide.desc}
                </p>
                <Link href={`/experience/${slide.id}`} style={{ textDecoration: "none", fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C6A664" }}>
                  MORE ›
                </Link>
              </div>
            </div>

            {/* Right panel (hidden on mobile) */}
            <div className="exc-side-panel">
              <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${rightSlide.image}')`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.5 }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(5,12,10,0.55)" }} />
              <button suppressHydrationWarning onClick={next} className="carousel-arrow" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 2 }}>
                <ChevronRight size={18} />
              </button>
              <p style={{ position: "absolute", bottom: "30%", left: 0, right: 0, textAlign: "center", fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", zIndex: 2 }}>
                {rightSlide.label}
              </p>
            </div>
          </div>

          {/* Mobile arrows */}
          <div className="exc-mobile-arrows">
            <button suppressHydrationWarning onClick={prev} className="carousel-arrow dark"><ChevronLeft size={16} /></button>
            <button suppressHydrationWarning onClick={next} className="carousel-arrow dark"><ChevronRight size={16} /></button>
          </div>

        </div>
      </section>
    </>
  );
}
