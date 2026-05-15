"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Menu, X } from "lucide-react";
import Link from "next/link";

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
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  return (
    <>
      <style>{`
        /* Mobile Menu Animations & Styles */
        .mobile-menu-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          z-index: 60;
          backdrop-filter: blur(4px);
        }
        
        .mobile-menu-panel {
          position: fixed;
          top: 0;
          bottom: 0;
          right: 0;
          width: 100%;
          max-width: 400px;
          background: #fdfcf9;
          z-index: 61;
          display: flex;
          flex-direction: column;
          box-shadow: -10px 0 40px rgba(0,0,0,0.1);
        }

        .mobile-menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 28px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }

        .mobile-menu-body {
          flex: 1;
          overflow-y: auto;
          padding: 20px 28px;
        }

        .mobile-nav-item {
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }

        .mobile-nav-btn {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          background: none;
          border: none;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          color: #2a2520;
          cursor: pointer;
          transition: color 0.3s;
        }
        
        .mobile-nav-btn:hover, .mobile-nav-btn.active {
          color: #C6A664;
        }

        .mobile-sub-list {
          overflow: hidden;
        }

        .mobile-sub-item {
          display: block;
          width: 100%;
          text-align: left;
          padding: 12px 0 12px 16px;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          color: #6b6560;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s;
        }

        .mobile-sub-item:hover {
          color: #C6A664;
        }

        .mobile-menu-footer {
          padding: 28px;
          background: #fff;
          border-top: 1px solid rgba(0,0,0,0.06);
        }

        .mobile-socials {
          display: flex;
          gap: 16px;
          margin-top: 24px;
          justify-content: center;
        }
        .mobile-socials a {
          color: #4a4540;
          transition: color 0.3s;
        }
        .mobile-socials a:hover {
          color: #C6A664;
        }
      `}</style>

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
            <Link href="/booking" className="btn-book text-center inline-block">
              BOOK A STAY
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className={`lg:hidden p-2 ${scrolled ? "text-[#1a1a1a]" : "text-white"}`}
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide Panel */}
            <motion.div
              className="mobile-menu-panel"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.35, 1] }}
            >
              <div className="mobile-menu-header">
                <div className="flex flex-col items-start">
                  <span className="font-playfair font-bold tracking-widest" style={{ fontSize: "1.4rem", color: "#1a1a1a", lineHeight: 1 }}>
                    AURUM
                  </span>
                  <span className="font-cormorant italic tracking-[0.3em] text-[10px]" style={{ color: "#C6A664" }}>
                    Palace
                  </span>
                </div>
                <button onClick={() => setMobileOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#1a1a1a" }}>
                  <X size={26} strokeWidth={1.5} />
                </button>
              </div>

              <div className="mobile-menu-body">
                {NAV_LINKS.map((item, i) => (
                  <div key={item.label} className="mobile-nav-item">
                    <button 
                      className={`mobile-nav-btn ${mobileExpanded === item.label ? 'active' : ''}`}
                      onClick={() => {
                        if (item.sub.length > 0) {
                          setMobileExpanded(mobileExpanded === item.label ? null : item.label);
                        } else {
                          setMobileOpen(false);
                        }
                      }}
                    >
                      {item.label}
                      {item.sub.length > 0 && (
                        <motion.div
                          animate={{ rotate: mobileExpanded === item.label ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown size={18} strokeWidth={1.5} />
                        </motion.div>
                      )}
                    </button>
                    
                    <AnimatePresence>
                      {mobileExpanded === item.label && item.sub.length > 0 && (
                        <motion.div
                          className="mobile-sub-list"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div style={{ paddingBottom: 16 }}>
                            {item.sub.map((s) => (
                              <button key={s} className="mobile-sub-item" onClick={() => setMobileOpen(false)}>
                                {s}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <div className="mobile-menu-footer">
                <Link 
                  href="/booking"
                  className="w-full btn-book text-center inline-block" 
                  style={{ padding: "14px", fontSize: "0.85rem", letterSpacing: "0.2em" }}
                  onClick={() => setMobileOpen(false)}
                >
                  BOOK A STAY
                </Link>
                
                <div className="mobile-socials">
                  <a href="#">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4.5" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  </a>
                  <a href="#">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M4 4l16 16M4 20L20 4" />
                    </svg>
                  </a>
                  <a href="#">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
