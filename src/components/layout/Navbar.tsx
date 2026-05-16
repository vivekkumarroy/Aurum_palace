"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "The Palace", href: "/#explore" },
  { label: "Suites", href: "/#exclusively" },
  { label: "Experiences", href: "/#wellness-circle" },
  { label: "Dining", href: "/#dining" },
  { label: "Offers", href: "/#offers" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  
  // Force dark text on booking route
  const forceDark = pathname === '/booking';
  const isDark = scrolled || forceDark;

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
          overflow-y: auto;
          padding: 10px 28px;
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
          padding: 20px 28px;
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
          scrolled ? "bg-white shadow-sm" : forceDark ? "bg-[#FDFCF9]/80 backdrop-blur-md" : "bg-transparent"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.8 }}
      >
        <div className="wrap flex items-center justify-between h-16">
          {/* Logo — left */}
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex flex-col items-start flex-shrink-0"
          >
            <span
              className="font-playfair font-bold tracking-widest transition-colors duration-300"
              style={{
                fontSize: "1.5rem",
                color: isDark ? "#1a1a1a" : "#fff",
                lineHeight: 1,
              }}
            >
              AURUM
            </span>
            <span
              className="font-cormorant italic tracking-[0.3em] text-xs transition-colors duration-300"
              style={{ color: isDark ? "#C6A664" : "rgba(255,255,255,0.75)" }}
            >
              Palace
            </span>
          </Link>

          {/* Nav links — center */}
          <nav className="hidden lg:flex items-center">
            {NAV_LINKS.map((item) => (
              <div key={item.label} className="relative">
                <Link 
                  href={item.href}
                  className={`nav-link ${isDark ? "dark" : ""}`}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* Right — Login + Book */}
          <div className="hidden lg:flex items-center gap-4">
            <button 
              onClick={() => {
                if (isLoggedIn) setIsLoggedIn(false);
                else setLoginOpen(true);
              }} 
              className={`nav-link ${isDark ? "dark" : ""}`}
            >
              {isLoggedIn ? "LOGOUT" : "LOGIN / JOIN"}
            </button>
            <Link href="/booking" className="btn-book text-center inline-block">
              BOOK A STAY
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button 
              onClick={() => {
                if (isLoggedIn) setIsLoggedIn(false);
                else setLoginOpen(true);
              }} 
              style={{ 
                fontFamily: "'Inter', sans-serif", 
                fontSize: "0.65rem", 
                letterSpacing: "0.15em", 
                fontWeight: 700, 
                textTransform: "uppercase",
                border: `1px solid ${isDark ? "rgba(198, 166, 100, 0.5)" : "rgba(255, 255, 255, 0.3)"}`,
                padding: "6px 14px",
                borderRadius: "20px",
                marginLeft: "8px",
                whiteSpace: "nowrap"
              }}
              className={`${isDark ? "text-[#1a1a1a]" : "text-white"}`}
            >
              {isLoggedIn ? "Logout" : "Login / Join"}
            </button>
            <button
              className={`p-2 ${isDark ? "text-[#1a1a1a]" : "text-white"}`}
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
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
                {NAV_LINKS.map((item) => (
                  <div key={item.label} className="mobile-nav-item">
                    <Link 
                      href={item.href}
                      className="mobile-nav-btn"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
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

      {/* ── Login Modal ── */}
      <AnimatePresence>
        {loginOpen && (
          <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: "absolute", inset: 0, background: "rgba(10, 15, 20, 0.85)", backdropFilter: "blur(8px)" }}
              onClick={() => setLoginOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
              style={{ width: "100%", maxWidth: 420, background: "#111620", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, position: "relative", zIndex: 101, overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}
            >
              {/* Gold top line */}
              <div style={{ height: 2, background: "linear-gradient(to right, transparent, #D4AF37 50%, transparent)" }}/>
              
              <div style={{ padding: "32px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: "#F0EDE8", margin: 0, fontWeight: 400 }}>
                    {isSignup ? "Join Aurum" : "Sign In"}
                  </h3>
                  <button onClick={() => setLoginOpen(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", display: "flex", padding: 4 }}>
                    <X size={20} />
                  </button>
                </div>

                {isSignup && (
                  <div style={{ marginBottom: 16 }}>
                    <p style={{ fontFamily: "Inter", fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.40)", marginBottom: 8 }}>Full Name</p>
                    <div style={{ background: "#1E2130", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, transition: "border-color 0.2s" }}>
                      <input type="text" placeholder="Jane Doe" style={{ width: "100%", background: "transparent", border: "none", outline: "none", padding: "14px 16px", color: "#F0EDE8", fontFamily: "Inter", fontSize: 14 }} />
                    </div>
                  </div>
                )}

                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontFamily: "Inter", fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.40)", marginBottom: 8 }}>Email Address</p>
                  <div style={{ background: "#1E2130", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}>
                    <input type="email" placeholder="name@example.com" style={{ width: "100%", background: "transparent", border: "none", outline: "none", padding: "14px 16px", color: "#F0EDE8", fontFamily: "Inter", fontSize: 14 }} />
                  </div>
                </div>

                <div style={{ marginBottom: 28 }}>
                  <p style={{ fontFamily: "Inter", fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.40)", marginBottom: 8 }}>Password</p>
                  <div style={{ background: "#1E2130", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}>
                    <input type="password" placeholder="••••••••" style={{ width: "100%", background: "transparent", border: "none", outline: "none", padding: "14px 16px", color: "#F0EDE8", fontFamily: "Inter", fontSize: 14, letterSpacing: 2 }} />
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setIsLoggedIn(true);
                    setLoginOpen(false);
                  }}
                  style={{ width: "100%", padding: "16px", background: "#D4AF37", border: "none", borderRadius: 8, color: "#0A0F14", fontFamily: "Inter", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", marginBottom: 24, transition: "background 0.2s" }}
                >
                  {isSignup ? "Create Account" : "Sign In"}
                </button>

                <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 14 }}>
                  {!isSignup && (
                    <button style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontFamily: "Inter", fontSize: 12, cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 4 }}>
                      Forgot your password?
                    </button>
                  )}
                  <button 
                    onClick={() => setIsSignup(!isSignup)} 
                    style={{ background: "none", border: "none", color: "#D4AF37", fontFamily: "Inter", fontSize: 12, cursor: "pointer", fontWeight: 500 }}
                  >
                    {isSignup ? "Already have an account? Sign In" : "Don't have an account? Join Now"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
