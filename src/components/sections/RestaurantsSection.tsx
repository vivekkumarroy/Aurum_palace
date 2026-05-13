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
  
  // Start at the middle copy (index N) for infinite scrolling
  const [idx, setIdx] = useState(N);
  const [instant, setInstant] = useState(false);

  // Constants for carousel sizing to perfectly center 2 cards with partial edges
  const CARD_VW = 38; 
  const GAP_VW = 1.5; 
  const OFFSET_VW = 11.25; // (100 - (38*2) - 1.5) / 2 = 11.25vw left padding

  const getX = (i: number) => `calc(${OFFSET_VW}vw - ${i * (CARD_VW + GAP_VW)}vw)`;

  const next = () => {
    setInstant(false);
    setIdx((p) => {
      const nextIdx = p + 1;
      // Reached end of middle copy
      if (nextIdx >= N * 2) {
        setTimeout(() => {
          setInstant(true);
          setIdx(N);
        }, 700); // match transition duration
        return nextIdx;
      }
      return nextIdx;
    });
  };

  const prev = () => {
    setInstant(false);
    setIdx((p) => {
      const nextIdx = p - 1;
      // Reached start of middle copy
      if (nextIdx < N) {
        setTimeout(() => {
          setInstant(true);
          setIdx(N * 2 - 1);
        }, 700);
        return nextIdx;
      }
      return nextIdx;
    });
  };

  return (
    <section className="bg-[#f8f7f5]" id="dining" style={{ paddingTop: 100, paddingBottom: 100, position: "relative", overflow: "hidden" }}>
      
      {/* Header Container - Pushed to the right to align with the first full card */}
      <div style={{ width: "100%", paddingLeft: `${OFFSET_VW}vw`, paddingRight: `${OFFSET_VW}vw`, margin: "0 auto" }}>
        
        {/* Header - Matching Exact Screenshots */}
        <div ref={ref} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 50 }}>
          <motion.div
            style={{ display: "flex", flexDirection: "column", gap: 8 }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <div style={{ width: 80, height: 1, background: "#a0a0a0", flexShrink: 0 }} />
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 3.5vw, 2.6rem)",
                fontWeight: 300, color: "#4a4540",
                letterSpacing: "0.02em", textTransform: "uppercase",
                lineHeight: 1,
              }}>
                OUR LEGENDARY
              </span>
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 3.5vw, 2.6rem)",
              fontWeight: 300, color: "#4a4540",
              letterSpacing: "0.02em", textTransform: "uppercase",
              lineHeight: 1,
              paddingLeft: 0, // Shifted left to sit directly under the grey line
            }}>
              RESTAURANT BRANDS
            </h2>
          </motion.div>

          <motion.p 
            style={{ 
              maxWidth: 400, 
              fontFamily: "'Inter', sans-serif", 
              fontSize: "0.95rem", 
              color: "#6b6560", 
              lineHeight: 1.6,
              paddingTop: 4,
              textAlign: "left"
            }}
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
        <button suppressHydrationWarning onClick={prev} style={{
          position: "absolute", left: `calc(${OFFSET_VW}vw - 24px)`, top: "32%", transform: "translateY(-50%)",
          zIndex: 10, width: 50, height: 50, borderRadius: "50%",
          border: "1px solid rgba(0,0,0,0.08)", background: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "#333",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        }}
        className="hover:scale-105"
        >
          <ChevronLeft size={22} strokeWidth={1.2} />
        </button>

        {/* Right Navigation Arrow */}
        <button suppressHydrationWarning onClick={next} style={{
          position: "absolute", right: `calc(${OFFSET_VW}vw - 24px)`, top: "32%", transform: "translateY(-50%)",
          zIndex: 10, width: 50, height: 50, borderRadius: "50%",
          border: "1px solid rgba(0,0,0,0.08)", background: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "#333",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        }}
        className="hover:scale-105"
        >
          <ChevronRight size={22} strokeWidth={1.2} />
        </button>

        {/* Sliding Track */}
        <div style={{ overflow: "hidden", paddingBottom: 60 }}>
          <motion.div
            style={{ 
              display: "flex", 
              width: "max-content",
            }}
            animate={{ x: getX(idx) }}
            transition={instant ? { duration: 0 } : { duration: 0.7, ease: [0.25, 1, 0.35, 1] }}
          >
            {RESTAURANTS.map((r, i) => (
              <div
                key={i}
                className="group"
                style={{ 
                  width: `${CARD_VW}vw`, 
                  marginRight: `${GAP_VW}vw`,
                  flexShrink: 0, 
                  cursor: "pointer", 
                  display: "flex", 
                  flexDirection: "column",
                  position: "relative",
                  opacity: (i >= idx && i < idx + 2) ? 1 : 0.35,
                  transition: "opacity 0.6s ease"
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", aspectRatio: "1.5/1", overflow: "hidden" }}>
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
                <div style={{
                  background: "#fff",
                  padding: "16px 24px 18px 24px", // Extremely reduced padding
                  display: "flex", flexDirection: "column",
                  textAlign: "left",
                  position: "relative",
                  marginTop: "-50px", // Overlaps the image
                  marginLeft: "24px", // Indented from left
                  marginRight: "0",   // Flush with right edge
                  boxShadow: "0 10px 40px rgba(0,0,0,0.08)", // Soft shadow
                  border: "1px solid rgba(0,0,0,0.03)",
                  zIndex: 2,
                }}>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif", fontSize: "1.35rem", // Smaller title
                    fontWeight: 400, letterSpacing: "0.02em",
                    textTransform: "uppercase", color: "#333",
                    lineHeight: 1.1, marginBottom: 6, // Very small margin
                  }}>
                    {r.name}
                  </p>
                  
                  <p style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", // Smaller text
                    fontWeight: 300, color: "#666",
                    lineHeight: 1.4, marginBottom: 12, // Very small margin
                  }}>
                    {r.desc}<span style={{ color: "#A88548", letterSpacing: "-1px" }}>...»</span>
                  </p>
                  
                  <button suppressHydrationWarning style={{
                    fontFamily: "'Inter', sans-serif", fontSize: "0.75rem",
                    fontWeight: 500, letterSpacing: "0.15em",
                    textTransform: "uppercase", color: "#A88548",
                    background: "none", border: "none", cursor: "pointer",
                    padding: 0, display: "flex", alignItems: "center", gap: 6,
                    marginTop: "auto",
                  }}>
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
  );
}



