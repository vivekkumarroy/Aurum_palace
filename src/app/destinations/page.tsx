"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search, List, Map, ChevronDown } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const ALL_REGIONS = ["All", "India", "The Maldives", "Bhutan", "Sri Lanka"];

const DESTINATIONS_DATA = [
  // India
  { name: "Ahmedabad", region: "India", img: "https://loremflickr.com/600/450/hotel,resort?lock=1" },
  { name: "Ajmer", region: "India", img: "https://loremflickr.com/600/450/hotel,resort?lock=2" },
  { name: "Alibaug", region: "India", img: "https://loremflickr.com/600/450/hotel,resort?lock=3" },
  { name: "Alleppey", region: "India", img: "https://loremflickr.com/600/450/hotel,resort?lock=4" },
  { name: "Amritsar", region: "India", img: "https://loremflickr.com/600/450/hotel,resort?lock=5" },
  { name: "Agra", region: "India", img: "https://loremflickr.com/600/450/hotel,resort?lock=6" },
  { name: "Jaipur", region: "India", img: "https://loremflickr.com/600/450/hotel,resort?lock=7" },
  { name: "Udaipur", region: "India", img: "https://loremflickr.com/600/450/hotel,resort?lock=8" },
  
  // Maldives
  { name: "Male", region: "The Maldives", img: "https://loremflickr.com/600/450/hotel,resort?lock=9" },
  { name: "Maafushi", region: "The Maldives", img: "https://loremflickr.com/600/450/hotel,resort?lock=10" },
  { name: "Hulhumale", region: "The Maldives", img: "https://loremflickr.com/600/450/hotel,resort?lock=11" },
  { name: "Baa Atoll", region: "The Maldives", img: "https://loremflickr.com/600/450/hotel,resort?lock=12" },
  { name: "Ari Atoll", region: "The Maldives", img: "https://loremflickr.com/600/450/hotel,resort?lock=13" },
  { name: "Dhigurah", region: "The Maldives", img: "https://loremflickr.com/600/450/hotel,resort?lock=14" },

  // Bhutan
  { name: "Paro", region: "Bhutan", img: "https://loremflickr.com/600/450/hotel,resort?lock=15" },
  { name: "Thimphu", region: "Bhutan", img: "https://loremflickr.com/600/450/hotel,resort?lock=16" },
  { name: "Punakha", region: "Bhutan", img: "https://loremflickr.com/600/450/hotel,resort?lock=17" },
  { name: "Wangdue", region: "Bhutan", img: "https://loremflickr.com/600/450/hotel,resort?lock=18" },
  { name: "Bumthang", region: "Bhutan", img: "https://loremflickr.com/600/450/hotel,resort?lock=19" },
  
  // Sri Lanka
  { name: "Colombo", region: "Sri Lanka", img: "https://loremflickr.com/600/450/hotel,resort?lock=20" },
  { name: "Kandy", region: "Sri Lanka", img: "https://loremflickr.com/600/450/hotel,resort?lock=21" },
  { name: "Galle", region: "Sri Lanka", img: "https://loremflickr.com/600/450/hotel,resort?lock=22" },
  { name: "Sigiriya", region: "Sri Lanka", img: "https://loremflickr.com/600/450/hotel,resort?lock=23" },
  { name: "Ella", region: "Sri Lanka", img: "https://loremflickr.com/600/450/hotel,resort?lock=24" },
  { name: "Nuwara Eliya", region: "Sri Lanka", img: "https://loremflickr.com/600/450/hotel,resort?lock=25" },
];

const AURUM_HOTELS = [
  { name: "AURUM LAKE PALACE", location: "UDAIPUR", desc: "Live the royal fantasy in Udaipur's heritage gem — ornate architecture, stunning lake views, and impeccable service await.", img: "https://images.unsplash.com/photo-1559762717-99c81ac85459?w=900&q=80" },
  { name: "AURUM SAFARI LODGE", location: "BANDHAVGARH", desc: "Venture into the wild at Aurum Safari Lodge, where nature's majesty reigns, offering enthralling safaris and luxury tents.", img: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=900&q=80" },
  { name: "AURUM BEACH RESORT", location: "GOA", desc: "Relax in the serene atmosphere of our luxury beach resort. Sun-kissed beaches, private villas, and an unmatched tropical paradise.", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80" },
  { name: "AURUM MOUNTAIN RETREAT", location: "SHIMLA", desc: "Escape to the hills. A sanctuary in the Himalayas offering panoramic views, elegant dining, and unforgettable experiences.", img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=900&q=80" },
  { name: "AURUM PALACE", location: "JAIPUR", desc: "Step into the Pink City's grandeur. Regal suites, curated heritage walks, and the finest Rajasthani cuisine await you.", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=900&q=80" },
  { name: "AURUM WELLNESS RETREAT", location: "KERALA", desc: "Surrender to serenity amid Kerala's backwaters. Ayurvedic therapies, yoga pavilions, and lush tropical gardens restore the soul.", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=900&q=80" },
];

const OTHER_HOTELS = [
  { name: "THE CLARIDGES", location: "NEW DELHI", desc: "A timeless colonial landmark in the heart of Lutyens' Delhi, offering gracious hospitality since 1952.", img: "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=700&q=80" },
  { name: "BRIJ ANAYRA", location: "DHARAMSHALA", desc: "Perched above the Kangra Valley with sweeping Himalayan vistas and a warm, intimate atmosphere.", img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=700&q=80" },
  { name: "BRIJ ATMANYA", location: "NAINITAL", desc: "A heritage bungalow retreat nestled in the oak forests above Naini Lake, perfect for quiet escapes.", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80" },
  { name: "BRIJ BAGEECHA", location: "JAIPUR", desc: "A garden haveli in the Pink City blending Rajput architecture with contemporary comforts.", img: "https://images.unsplash.com/photo-1564507592208-528eb318263e?w=700&q=80" },
  { name: "BRIJ CASA SUSEGAD", location: "GOA", desc: "A Portuguese-era villa retreat in South Goa where susegad — the art of slow living — is perfected.", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=700&q=80" },
  { name: "BRIJ LAKSHMAN SAGAR", location: "PALI", desc: "Rustic luxury cottages beside a private lake in the Aravalli hills — a true off-grid sanctuary.", img: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=700&q=80" },
];

const TRAVEL_STORIES = [
  { title: "RETREAT TO THE HILLS", desc: "Discover the magic of mountain escapes — crisp air, pine forests, and luxury lodges that redefine highland living.", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" },
  { title: "EXPLORE TOP INTERNATIONAL DESTINATIONS", desc: "From the Maldives to Bhutan, our curated international collection brings the world's finest addresses to your fingertips.", img: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=80" },
  { title: "LUXURY ESCAPES TO BEACH DESTINATIONS", desc: "Turquoise waters, powdery sands, and overwater villas — the ultimate guide to India's most coveted coastal retreats.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" },
  { title: "EXPLORE TEA ESTATES OF INDIA", desc: "Wander through emerald tea gardens in Darjeeling, Munnar, and Assam, staying in restored colonial bungalows.", img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
      <div style={{ flex: 1, maxWidth: 120, height: 1, background: "#e6e2dd" }} />
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 400, color: "#2a2520", letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap", margin: 0 }}>
        {children}
      </h2>
      <div style={{ flex: 1, maxWidth: 120, height: 1, background: "#e6e2dd" }} />
    </div>
  );
}

function HotelCard({ name, location, desc, img, small = false }: { name: string; location: string; desc: string; img: string; small?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", background: "#fff", border: "1px solid #ede9e3", overflow: "hidden" }}>
      <div style={{ position: "relative", overflow: "hidden", height: small ? 200 : 280 }}>
        <img src={img} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease" }} />
      </div>
      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.18em", color: "#C6A664", textTransform: "uppercase", marginBottom: 4 }}>— {location}</p>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.85rem", letterSpacing: "0.1em", color: "#2a2520", textTransform: "uppercase", fontWeight: 600, margin: 0 }}>{name}</h3>
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "#6b6560", lineHeight: 1.75, margin: 0 }}>{desc}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 16, paddingTop: 4 }}>
          <button style={{ padding: "10px 20px", fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, color: "#fff", background: "#2a2520", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>Book Now</button>
          <a href="#" style={{ fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, color: "#C6A664", fontFamily: "'Inter', sans-serif", textDecoration: "none" }}>Visit Hotel ›</a>
        </div>
      </div>
    </div>
  );
}

function LoadMoreBtn({ onClick }: { onClick?: () => void }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
      <button onClick={onClick} style={{ border: "1px solid #2a2520", padding: "12px 32px", fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, color: "#2a2520", background: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
        Load More
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DestinationsPage() {
  const [regionOffset, setRegionOffset] = useState(3);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [aurumVisible, setAurumVisible] = useState(4);
  const [otherVisible, setOtherVisible] = useState(3);
  const [destination, setDestination] = useState("");
  const [brand, setBrand] = useState("");
  const [theme, setTheme] = useState("");
  const cityScrollRef = useRef<HTMLDivElement>(null);

  const activeRegion = ALL_REGIONS[(regionOffset + 2) % ALL_REGIONS.length];

  // Center the infinite gallery on mount and region change
  useEffect(() => {
    const container = document.getElementById('dest-gallery');
    if (container) {
      setTimeout(() => {
        container.scrollLeft = container.scrollWidth / 3;
      }, 100);
    }
  }, [activeRegion]);

  const scrollCities = (dir: "left" | "right") => {
    const el = cityScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 220 : -220, behavior: "smooth" });
  };

  return (
    <main style={{ minHeight: "100vh", background: "#fff" }}>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", width: "100%", height: "88vh", minHeight: 560, overflow: "hidden" }}>
        <img
          src="/destinations-hero-v7.png"
          alt="Our Destinations"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transform: "scale(1.05)" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)" }} />

        <div style={{ position: "absolute", bottom: 112, left: 0, width: "100%", padding: "0 64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 40, height: 1, background: "rgba(255,255,255,0.6)" }} />
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "#fff", letterSpacing: "0.06em", fontWeight: 300, textTransform: "uppercase", margin: 0 }}>
              Our Destinations
            </h1>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", width: "90%", maxWidth: 900, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 999, height: 58, display: "flex", alignItems: "center", padding: "0 8px", zIndex: 10 }}>
          <input type="text" placeholder="Click here to search for Destinations or Hotels." style={{ flex: 1, outline: "none", background: "transparent", color: "#fff", fontSize: "0.85rem", letterSpacing: "0.02em", textAlign: "center", padding: "0 16px", fontFamily: "'Inter', sans-serif" }} />
          <button style={{ width: 44, height: 44, borderRadius: "50%", background: "#C6A664", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
            <Search size={18} color="#fff" strokeWidth={2} />
          </button>
        </div>
      </section>

      {/* ── THE WORLD AWAITS ─────────────────────────────────────────────────── */}
      <section style={{ background: "#e8e4df", paddingTop: 51.5, paddingBottom: 51.5, overflow: "visible" }}>

        <div style={{ textAlign: "center", paddingBottom: 80 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, marginBottom: 20 }}>
            <div style={{ width: 60, height: 1, background: "#c8c4be" }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 400, color: "#2a2520", letterSpacing: "0.14em", textTransform: "uppercase", lineHeight: 1, margin: 0 }}>
              THE WORLD AWAITS
            </h2>
            <div style={{ width: 60, height: 1, background: "#c8c4be" }} />
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "#6b6560", lineHeight: 1.8, maxWidth: 480, margin: "0 auto" }}>
            The world is full of amazing experiences. Allow us to show you just how<br />
            wonderful they can be with our luxury hotels.
          </p>
        </div>

        <div style={{ position: "relative", display: "flex", alignItems: "stretch", justifyContent: "center" }}>
          <button suppressHydrationWarning onClick={() => setRegionOffset((p) => (p - 1 + ALL_REGIONS.length) % ALL_REGIONS.length)}
            style={{ position: "absolute", left: "calc(50% - 520px)", zIndex: 10, width: 38, height: 38, borderRadius: "50%", background: "#fff", border: "1px solid #e0dcd6", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#888", top: "50%", transform: "translateY(-50%)" }}>
            <ChevronLeft size={16} strokeWidth={1.5} />
          </button>

          {[0, 1, 2, 3, 4].map((slot) => {
            const region = ALL_REGIONS[(regionOffset + slot) % ALL_REGIONS.length];
            const isCenter = slot === 2;
            return (
              <div key={slot} style={{ flex: isCenter ? "0 0 150px" : "0 0 200px", height: isCenter ? "85px" : "auto", borderLeft: slot > 0 ? "2px solid #e0dcd6" : "none", background: isCenter ? "#fff" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: isCenter ? "0" : "20px", paddingBottom: isCenter ? "0" : "20px", boxShadow: isCenter ? "0 6px 24px rgba(0,0,0,0.10)" : "none", position: "relative", zIndex: isCenter ? 10 : 1 }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", letterSpacing: "0.08em", textTransform: "uppercase", color: isCenter ? "#C6A664" : "#6b6560", cursor: "default" }}>
                  {region}
                </span>
              </div>
            );
          })}

          <button suppressHydrationWarning onClick={() => setRegionOffset((p) => (p + 1) % ALL_REGIONS.length)}
            style={{ position: "absolute", right: "calc(50% - 520px)", zIndex: 10, width: 38, height: 38, borderRadius: "50%", background: "#fff", border: "1px solid #e0dcd6", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#888", top: "50%", transform: "translateY(-50%)" }}>
            <ChevronRight size={16} strokeWidth={1.5} />
          </button>
        </div>

      </section>

      {/* ── FEATURED DESTINATIONS ──────────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "40px 0 100px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 24px" }}>
          
          <SectionTitle>Featured Destinations</SectionTitle>

          <SectionTitle>Featured Destinations</SectionTitle>

          {/* Destination Gallery (Infinite Carousel) */}
          <div style={{ position: "relative", marginTop: 50, padding: "0 40px" }}>
            
            {/* Navigation Buttons — Positioned higher and visible */}
            <button 
              suppressHydrationWarning
              onClick={() => {
                const el = document.getElementById('dest-track');
                if (el) el.scrollBy({ left: -el.clientWidth / 5 * 1.05, behavior: 'smooth' });
              }}
              style={{ position: "absolute", left: 0, top: "32%", transform: "translateY(-50%)", zIndex: 100, width: 48, height: 48, borderRadius: "50%", background: "#fff", border: "1px solid #C6A664", boxShadow: "0 4px 15px rgba(198, 166, 100, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#C6A664", transition: "all 0.3s ease" }}
              className="hover:scale-110 active:scale-95"
            >
              <ChevronLeft size={24} strokeWidth={2} />
            </button>
            
            <button 
              suppressHydrationWarning
              onClick={() => {
                const el = document.getElementById('dest-track');
                if (el) el.scrollBy({ left: el.clientWidth / 5 * 1.05, behavior: 'smooth' });
              }}
              style={{ position: "absolute", right: 0, top: "32%", transform: "translateY(-50%)", zIndex: 100, width: 48, height: 48, borderRadius: "50%", background: "#fff", border: "1px solid #C6A664", boxShadow: "0 4px 15px rgba(198, 166, 100, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#C6A664", transition: "all 0.3s ease" }}
              className="hover:scale-110 active:scale-95"
            >
              <ChevronRight size={24} strokeWidth={2} />
            </button>

            {/* Gallery Track */}
            <div 
              id="dest-track"
              onScroll={(e) => {
                const el = e.currentTarget;
                const scrollWidth = el.scrollWidth;
                const clientWidth = el.clientWidth;
                const third = scrollWidth / 3;
                
                if (el.scrollLeft < 10) {
                  el.scrollLeft = third + el.scrollLeft;
                } else if (el.scrollLeft > (third * 2) - clientWidth - 10) {
                  el.scrollLeft = el.scrollLeft - third;
                }
              }}
              style={{ 
                display: "flex", 
                gap: 20, 
                overflowX: "hidden", // Disable mouse scroll/drag
                scrollBehavior: "smooth",
                padding: "20px 0",
                userSelect: "none",
                pointerEvents: "auto"
              }}
            >
              {(() => {
                const filtered = DESTINATIONS_DATA.filter(d => activeRegion === "All" || d.region === activeRegion);
                // Triple for infinite effect
                const tripled = [...filtered, ...filtered, ...filtered];
                
                // Initialize scroll position to middle on mount
                setTimeout(() => {
                  const el = document.getElementById('dest-track');
                  if (el && el.scrollLeft === 0) el.scrollLeft = el.scrollWidth / 3;
                }, 100);

                return tripled.map((city, idx) => (
                  <div 
                    key={`${city.name}-${idx}`} 
                    style={{ 
                      textAlign: "center", 
                      flexShrink: 0, 
                      width: "calc((100% - 80px) / 5)", // Proper 5 cards
                      transition: "transform 0.4s ease"
                    }}
                    className="group"
                  >
                    <div style={{ width: "100%", height: 180, background: "#f5f2ee", overflow: "hidden", marginBottom: 18, borderRadius: 4, border: "1px solid #ede9e3", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
                      <img 
                        src={city.img} 
                        alt={city.name} 
                        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.8s ease" }} 
                        className="group-hover:scale-110"
                      />
                    </div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#4a4540", margin: 0, fontWeight: 500 }}>
                      {city.name}
                    </p>
                    <div style={{ width: 20, height: 1, background: "#C6A664", margin: "10px auto 0", opacity: 0.4 }} />
                  </div>
                ));
              })()}
            </div>
          </div>

          {/* List/Map View Toggle */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 20, transform: "translateX(240px)" }}>
            <div style={{ display: "flex", background: "#f5f2ee", borderRadius: 40, padding: 4, width: 420 }}>
              <button 
                onClick={() => setViewMode("list")}
                style={{ 
                  flex: 1, 
                  height: 48, 
                  borderRadius: 40, 
                  border: "none", 
                  background: viewMode === "list" ? "#fff" : "transparent",
                  fontFamily: "'Playfair Display', serif", 
                  fontSize: "0.75rem", 
                  letterSpacing: "0.14em", 
                  textTransform: "uppercase",
                  color: viewMode === "list" ? "#C6A664" : "#6b6560",
                  cursor: "pointer",
                  boxShadow: viewMode === "list" ? "0 4px 12px rgba(0,0,0,0.06)" : "none",
                  transition: "all 0.3s ease"
                }}
              >
                List View
              </button>
              <button 
                onClick={() => setViewMode("map")}
                style={{ 
                  flex: 1, 
                  height: 48, 
                  borderRadius: 40, 
                  border: "none", 
                  background: viewMode === "map" ? "#fff" : "transparent",
                  fontFamily: "'Playfair Display', serif", 
                  fontSize: "0.75rem", 
                  letterSpacing: "0.14em", 
                  textTransform: "uppercase",
                  color: viewMode === "map" ? "#C6A664" : "#6b6560",
                  cursor: "pointer",
                  boxShadow: viewMode === "map" ? "0 4px 12px rgba(0,0,0,0.06)" : "none",
                  transition: "all 0.3s ease"
                }}
              >
                Map View
              </button>
            </div>
          </div>

          {/* Filters Bar */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 30, marginTop: 80, borderBottom: "1px solid #e6e2dd", paddingBottom: 15 }}>
            {/* Search */}
            <div style={{ flex: "1 1 300px", display: "flex", alignItems: "center", gap: 12 }}>
              <Search size={18} color="#888" strokeWidth={1.5} />
              <input 
                type="text" 
                placeholder="Destination / City" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                style={{ flex: 1, border: "none", outline: "none", fontSize: "1rem", color: "#2a2520", fontFamily: "'Inter', sans-serif" }} 
              />
            </div>

            {/* Brands */}
            <div style={{ flex: "1 1 250px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
              <span style={{ fontSize: "1rem", color: "#6b6560", fontFamily: "'Inter', sans-serif" }}>Brands</span>
              <ChevronDown size={18} color="#888" />
            </div>

            {/* Themes */}
            <div style={{ flex: "1 1 250px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
              <span style={{ fontSize: "1rem", color: "#6b6560", fontFamily: "'Inter', sans-serif" }}>Themes</span>
              <ChevronDown size={18} color="#888" />
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
