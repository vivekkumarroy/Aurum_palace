"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Destinations", sub: ["Udaipur", "Jaipur", "Goa", "Mumbai", "Maldives", "Dubai", "London"] },
  { label: "Hotels", sub: ["Palace Hotels", "Beach Resorts", "Mountain Retreats", "Urban Luxury"] },
  { label: "Experiences", sub: ["Spa & Wellness", "Weddings", "Royal Tours", "Private Events"] },
  { label: "Offers", sub: [] },
  { label: "Memberships", sub: ["Aurum InnerCircle", "Gold Tier", "Platinum Tier"] },
  { label: "More", sub: ["About Us", "Blog", "Press", "Careers"] },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-sm" : "bg-transparent"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.8 }}
      >
        <div className="wrap flex items-center justify-between h-16">
          {/* Logo — left */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex flex-col items-start flex-shrink-0"
          >
            <span
              className="font-playfair font-bold tracking-widest transition-colors duration-300"
              style={{
                fontSize: "1.5rem",
                color: scrolled ? "#1a1a1a" : "#fff",
                lineHeight: 1,
              }}
            >
              AURUM
            </span>
            <span
              className="font-cormorant italic tracking-[0.3em] text-xs transition-colors duration-300"
              style={{ color: scrolled ? "#C6A664" : "rgba(255,255,255,0.75)" }}
            >
              Palace
            </span>
          </button>

          {/* Nav links — center */}
          <nav className="hidden lg:flex items-center">
            {NAV_LINKS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setDropdown(item.label)}
                onMouseLeave={() => setDropdown(null)}
              >
                <button className={`nav-link ${scrolled ? "dark" : ""}`}>
                  {item.label}
                  {item.sub.length > 0 && (
                    <ChevronDown size={10} className={`transition-transform ${dropdown === item.label ? "rotate-180" : ""}`} />
                  )}
                </button>
                <AnimatePresence>
                  {dropdown === item.label && item.sub.length > 0 && (
                    <motion.div
                      style={{
                        position: "absolute",
                        top: "calc(100% + 12px)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 200,
                        background: "#fff",
                        borderRadius: 10,
                        boxShadow: "0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                        overflow: "hidden",
                        zIndex: 100,
                        transformOrigin: "top center",
                      }}
                      initial={{ opacity: 0, scale: 0.95, y: -6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -6 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    >
                      {/* Caret arrow */}
                      <div style={{
                        position: "absolute", top: -7, left: "50%",
                        transform: "translateX(-50%)",
                        width: 14, height: 7,
                        overflow: "hidden",
                      }}>
                        <div style={{
                          width: 12, height: 12,
                          background: "#fff",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                          transform: "rotate(45deg)",
                          margin: "4px auto 0",
                          borderRadius: 2,
                        }} />
                      </div>

                      {/* Items */}
                      <div style={{ padding: "6px 0" }}>
                        {item.sub.map((s) => (
                          <button key={s} style={{
                            width: "100%", textAlign: "left",
                            padding: "10px 18px",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.78rem",
                            fontWeight: 400,
                            color: "#4a4540",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            transition: "background 0.15s, color 0.15s",
                            display: "block",
                            letterSpacing: "0.02em",
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLButtonElement).style.background = "#faf8f5";
                            (e.currentTarget as HTMLButtonElement).style.color = "#C6A664";
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLButtonElement).style.background = "none";
                            (e.currentTarget as HTMLButtonElement).style.color = "#4a4540";
                          }}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right — Login + Book */}
          <div className="hidden lg:flex items-center gap-4">
            <button className={`nav-link ${scrolled ? "dark" : ""}`}>
              <Search size={14} />
            </button>
            <button className={`nav-link ${scrolled ? "dark" : ""}`}>
              LOGIN / JOIN
            </button>
            <button
              onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-book"
            >
              BOOK A STAY
            </button>
          </div>

          {/* Mobile */}
          <button
            className={`lg:hidden p-2 ${scrolled ? "text-[#1a1a1a]" : "text-white"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white flex flex-col"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8e2d9]">
              <span className="font-playfair text-xl font-bold text-[#1a1a1a] tracking-widest">AURUM</span>
              <button onClick={() => setMobileOpen(false)}><X size={22} /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
              {NAV_LINKS.map((item, i) => (
                <motion.button key={item.label}
                  className="w-full text-left py-4 border-b border-[#e8e2d9] font-playfair text-xl text-[#1a1a1a] hover:text-[#C6A664] transition-colors"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  onClick={() => setMobileOpen(false)}>
                  {item.label}
                </motion.button>
              ))}
            </div>
            <div className="px-6 py-5 border-t border-[#e8e2d9]">
              <button className="w-full btn-book py-4">BOOK A STAY</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
