"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BASE_RESTAURANTS = [
  {
    name: "MACHAN",
    desc: "Presenting a delightful blend of earthy simplicity and urban sophistication, Machan invites its guests to enjoy a diverse bill of fare in the joyful e",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85",
  },
  {
    name: "LOYA",
    desc: "LOYA takes its diners on a gastronomic journey through North India's diverse landscape, blending flavours from the Himalayan foothills, Punjab's flat",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=85",
  },
  {
    name: "GOLDEN DRAGON",
    desc: "From its first location at The Aurum Palace, Mumbai, Golden Dragon has introduced guests to rarefied, divine experiences that are unparalleled. Kn",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=85",
  },
  {
    name: "WASABI BY MORIMOTO",
    desc: "Wasabi by Morimoto offers its guests authentic Japanese culinary treasures from the repertoire of Iron Chef Morimoto. The ingredients, including seafo",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=85",
  },
  {
    name: "BOMBAY BRASSERIE",
    desc: "Ever since its inception in 1982, Bombay Brasserie has been a showcase of diverse Indian flavours, textures and fragrances that all reflect in Bombay'",
    image: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=800&q=85",
  },
  {
    name: "THAI PAVILION",
    desc: "The first Thai restaurant in India continues to be a pioneer in serving authentic cuisine from the royal kitchens of Thailand, crafted with the finest",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=85",
  },
  {
    name: "SOUTHERN SPICE",
    desc: "Experience the ultimate culinary journey through the four southern states of India, offering an array of forgotten recipes from ancestral kitchens",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=85",
  },
  {
    name: "SHAMIANA",
    desc: "The original coffee shop of the city, Shamiana offers an all-day dining experience featuring an eclectic menu of Indian and international favourites",
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=85",
  },
  {
    name: "BLUE GINGER",
    desc: "India's first Vietnamese restaurant, Blue Ginger offers a vibrant dining experience with fresh, delicate flavours and an enchanting open-air setting",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=85",
  },
  {
    name: "VARQ",
    desc: "An elegant Indian restaurant that seamlessly blends traditional flavours with modern presentation, creating a truly unforgettable dining experience",
    image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=800&q=85",
  },
];

const N = BASE_RESTAURANTS.length;
const RESTAURANTS = [...BASE_RESTAURANTS, ...BASE_RESTAURANTS, ...BASE_RESTAURANTS];

export default function RestaurantsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  
  // Responsive check
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const [idx, setIdx] = useState(N);
  const [instant, setInstant] = useState(false);

  // Responsive padding/sizing
  const SIDE_VW = isMobile ? 4 : 11.25; 
  const GAP_PX = isMobile ? 12 : 24; // Use px for gap to be safe
  const CARD = isMobile ? `(100vw - ${SIDE_VW * 2}vw - ${GAP_PX * 2}px)` : `(38vw)`;

  function getX(i: number) {
    return `calc(${SIDE_VW}vw - ${i} * (${CARD} + ${GAP_PX}px))`;
  }

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
        .resto-section {
          background-color: #f8f7f5;
          padding-top: 100px;
          padding-bottom: 100px;
          position: relative;
          overflow: hidden;
        }
        
        .resto-header-wrap {
          max-width: 1320px;
          margin: 0 auto;
          padding-left: 11.25vw;
          padding-right: 11.25vw;
        }

        .resto-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 50px;
          gap: 40px;
        }

        .resto-title-box {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex-shrink: 0;
        }

        .resto-title-line-group {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .resto-title-line {
          width: 80px;
          height: 1px;
          background: #a0a0a0;
          flex-shrink: 0;
        }

        .resto-title-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3.5vw, 2.6rem);
          font-weight: 300;
          color: #4a4540;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          line-height: 1;
        }

        .resto-subtitle {
          max-width: 400px;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          color: #6b6560;
          line-height: 1.6;
          padding-top: 4px;
          text-align: left;
        }

        .resto-img-wrap {
          position: relative;
          aspect-ratio: 1.5/1;
          overflow: hidden;
        }

        .resto-info-box {
          background: #fff;
          padding: 16px 24px 18px 24px;
          display: flex;
          flex-direction: column;
          text-align: left;
          position: relative;
          margin-top: -50px;
          margin-left: 24px;
          margin-right: 0;
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
          border: 1px solid rgba(0,0,0,0.03);
          z-index: 2;
          min-height: 160px;
        }

        .resto-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          font-weight: 400;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: #333;
          line-height: 1.1;
          margin-bottom: 6px;
        }

        .resto-card-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem;
          font-weight: 300;
          color: #666;
          line-height: 1.4;
          margin-bottom: 12px;
        }

        .resto-card-more {
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
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
          margin-top: auto;
        }

        /* ── Arrows ── */
        .resto-arrow {
          position: absolute;
          top: 35%;
          transform: translateY(-50%);
          z-index: 10;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.08);
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #333;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .resto-arrow-left { left: calc(11.25vw - 24px); }
        .resto-arrow-right { right: calc(11.25vw - 24px); }

        /* ── MOBILE (<768px) ── */
        @media (max-width: 767px) {
          .resto-section {
            padding-top: 60px;
            padding-bottom: 60px;
          }
          .resto-header-wrap {
            padding-left: 20px;
            padding-right: 20px;
          }
          .resto-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            padding-bottom: 30px;
          }
          .resto-title-line {
            width: 40px;
          }
          .resto-subtitle {
            max-width: 100%;
            padding-top: 0;
          }

          /* Image sizing */
          .resto-img-wrap {
            aspect-ratio: unset;
            height: 240px;
          }
          .resto-info-box {
            margin-left: 16px;
            padding: 16px;
          }

          /* Arrows positioned over the card like other sections */
          .resto-arrow {
            width: 36px;
            height: 36px;
            background: rgba(255,255,255,0.9);
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            top: 45%;
          }
          .resto-arrow-left { left: 8px; }
          .resto-arrow-right { right: 8px; }
        }
      `}</style>

      <section className="resto-section" id="dining">
        
        {/* Header Container */}
        <div className="resto-header-wrap">
          <div ref={ref} className="resto-header">
            <motion.div
              className="resto-title-box"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="resto-title-line-group">
                <div className="resto-title-line" />
                <span className="resto-title-text">
                  OUR LEGENDARY
                </span>
              </div>
              <h2 className="resto-title-text" style={{ paddingLeft: 0 }}>
                RESTAURANT BRANDS
              </h2>
            </motion.div>

            <motion.p 
              className="resto-subtitle"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Step into the realm of our culinary legends where a symphony of flavours enchants your taste buds, ambience embraces you in a tapestry of elegance and the genuine warmth of our service leaves you feeling truly indulged.
            </motion.p>
          </div>
        </div>

        {/* Full-width Carousel Container */}
        <div style={{ position: "relative", width: "100%", overflow: "visible", marginTop: 20 }}>
          
          {/* Left Navigation Arrow */}
          <button suppressHydrationWarning onClick={prev} className="resto-arrow resto-arrow-left">
            <ChevronLeft size={22} strokeWidth={1.2} />
          </button>

          {/* Right Navigation Arrow */}
          <button suppressHydrationWarning onClick={next} className="resto-arrow resto-arrow-right">
            <ChevronRight size={22} strokeWidth={1.2} />
          </button>

          {/* Sliding Track */}
          <div style={{ overflow: "hidden", paddingBottom: 60 }}>
            <motion.div
              style={{ display: "flex", width: "max-content", gap: GAP_PX }}
              animate={{ x: getX(idx) }}
              transition={instant ? { duration: 0 } : { duration: 0.55, ease: [0.25, 1, 0.35, 1] }}
            >
              {RESTAURANTS.map((r, i) => (
                <div
                  key={i}
                  className="group"
                  style={{ 
                    width: `calc(${CARD})`, 
                    flexShrink: 0, 
                    cursor: "pointer", 
                    display: "flex", 
                    flexDirection: "column",
                    position: "relative",
                    opacity: isMobile ? 1 : ((i >= idx && i < idx + 2) ? 1 : 0.35),
                    transition: "opacity 0.6s ease"
                  }}
                >
                  {/* Image */}
                  <div className="resto-img-wrap">
                    <div
                      style={{
                        position: "absolute", inset: 0,
                        backgroundImage: `url('${r.image}')`,
                        backgroundSize: "cover", backgroundPosition: "center",
                        transition: "transform 0.8s cubic-bezier(0.25, 1, 0.35, 1)",
                      }}
                      className="group-hover:scale-[1.04]"
                    />
                  </div>

                  {/* Text Box - Floating Overlap */}
                  <div className="resto-info-box">
                    <p className="resto-card-title">{r.name}</p>
                    
                    <p className="resto-card-desc">
                      {r.desc}<span style={{ color: "#A88548", letterSpacing: "-1px" }}>...»</span>
                    </p>
                    
                    <button suppressHydrationWarning className="resto-card-more">
                      <span style={{ borderBottom: "1px solid #A88548", paddingBottom: "2px" }}>MORE</span> 
                      <span style={{ fontSize: "1rem", fontWeight: 300, transform: "translateY(-1px)" }}>›</span>
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
