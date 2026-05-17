"use client";
import { useState } from "react";

const QUICK_LINKS_COL1 = ["Hotels", "Dining", "Wellness", "Timeless Weddings", "Event Venues", "Aurum Magazine", "Sitemap"];
const QUICK_LINKS_COL2 = ["About Aurum", "Holidays", "Offers", "Gifting", "Aurum InnerCircle", "Epicure", "Blog"];

const DESTINATIONS = [
  "Udaipur", "Jaipur", "Goa", "Mumbai", "Maldives", "Dubai", "London", "Paris",
  "Singapore", "New York", "Bangkok", "Bali", "Vienna", "Rome", "Tokyo",
];

// Social icons as inline SVG
const SocialIcons = {
  facebook: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  twitter: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 4l16 16M4 20L20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  instagram: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  youtube: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#1a1a1a" />
    </svg>
  ),
  linkedin: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);
  const [destOpen, setDestOpen] = useState(false);

  return (
    <>
      <style>{`
        .footer-sec {
          background: #111;
          color: #fff;
          font-family: 'Inter', sans-serif;
        }

        .footer-wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding: 60px 40px 0;
        }

        .footer-main-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr 0.8fr;
          gap: 60px;
          padding-bottom: 48px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .footer-contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px 24px;
        }

        .footer-form {
          display: flex;
          margin-bottom: 36px;
        }

        .footer-form input {
          flex: 1;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          border-right: none;
          padding: 11px 16px;
          font-size: 0.8rem;
          color: #fff;
          font-family: 'Inter', sans-serif;
          outline: none;
          min-width: 0; /* Prevents overflow in flex */
        }

        .footer-form button {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          padding: 11px 20px;
          color: rgba(255,255,255,0.7);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          white-space: nowrap;
          transition: all 0.2s;
        }

        .footer-form button:hover {
          background: #C6A664;
          border-color: #C6A664;
          color: #fff;
        }

        .footer-quick-links-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 16px;
        }

        .footer-bottom-bar {
          max-width: 1280px;
          margin: 0 auto;
          padding: 20px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        /* ── TABLET & MOBILE RESPONSIVE ── */
        @media (max-width: 1023px) {
          .footer-main-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .footer-quick-links-grid {
            max-width: 400px;
          }
        }

        @media (max-width: 767px) {
          .footer-wrap {
            padding: 50px 20px 0;
          }
          
          .footer-main-grid {
            gap: 40px;
            padding-bottom: 40px;
          }

          /* Stack contact items */
          .footer-contact-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          /* Stack email input and button to prevent cutoff */
          .footer-form {
            flex-direction: column;
            gap: 10px;
          }
          .footer-form input {
            border-right: 1px solid rgba(255,255,255,0.2); /* Restore right border */
            width: 100%;
          }
          .footer-form button {
            width: 100%;
            text-align: center;
          }

          /* Bottom bar */
          .footer-bottom-bar {
            padding: 20px 20px;
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
        }
      `}</style>

      <footer className="footer-sec">

        {/* ── TOP: Logo + Main grid ── */}
        <div className="footer-wrap">

          {/* Logo */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, letterSpacing: "0.12em", color: "#fff", lineHeight: 1 }}>
              AURUM
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "0.85rem", letterSpacing: "0.3em", color: "#C6A664", marginTop: 2 }}>
              Palace
            </div>
          </div>

          {/* Main grid */}
          <div className="footer-main-grid">

            {/* Column 1: Subscribe + Contacts */}
            <div>
              {/* Subscribe */}
              <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 16 }}>
                Subscribe for Latest Updates
              </p>
              {subbed ? (
                <p style={{ fontSize: "0.85rem", color: "#C6A664", marginBottom: 36 }}>Thank you for subscribing!</p>
              ) : (
                <form onSubmit={(e) => { 
                  e.preventDefault(); 
                  if (email.toLowerCase().endsWith("@gmail.com")) {
                    setSubbed(true); 
                  } else {
                    alert("Please use a valid @gmail.com address.");
                  }
                }} className="footer-form">
                  <input
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                    placeholder="Enter your email Address"
                  />
                  <button type="submit">SUBSCRIBE</button>
                </form>
              )}

              {/* For Bookings */}
              <div className="footer-contact-grid">
                <div>
                  <p style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>
                    For Bookings Contact
                  </p>
                  <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.65)", marginBottom: 4 }}>1-800-111-825</p>
                  <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.65)" }}>reservations@aurumpalace.com</p>
                </div>
                
                <div>
                  <p style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>
                    Customer Support
                  </p>
                  <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.65)", marginBottom: 4 }}>contactaurum@aurumpalace.com</p>
                  <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.65)" }}>feedback@aurumpalace.com</p>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 20 }}>
                Quick Links
              </p>
              <div className="footer-quick-links-grid">
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {QUICK_LINKS_COL1.map((l) => (
                    <a key={l} href="#" style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color 0.15s" }}
                      onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#C6A664"}
                      onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)"}
                    >{l}</a>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {QUICK_LINKS_COL2.map((l) => (
                    <a key={l} href="#" style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color 0.15s" }}
                      onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#C6A664"}
                      onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)"}
                    >{l}</a>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 3: Connect With Us */}
            <div>
              <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 20 }}>
                Connect With Us
              </p>
              <div style={{ display: "flex", gap: 12, marginBottom: 36 }}>
                {(Object.keys(SocialIcons) as Array<keyof typeof SocialIcons>).map((key) => (
                  <a key={key} href="#" style={{
                    width: 36, height: 36, borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(255,255,255,0.5)", textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.borderColor = "#C6A664";
                      el.style.color = "#C6A664";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.borderColor = "rgba(255,255,255,0.2)";
                      el.style.color = "rgba(255,255,255,0.5)";
                    }}
                  >
                    {SocialIcons[key]}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── DESTINATIONS expandable row ── */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>
            <button
              onClick={() => setDestOpen(!destOpen)}
              style={{
                width: "100%", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "space-between",
                padding: "18px 0", background: "none", border: "none", cursor: "pointer", color: "#fff",
              }}
            >
              <span style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
                Destinations
              </span>
              <span style={{
                fontSize: "1.4rem", color: "rgba(255,255,255,0.45)", lineHeight: 1,
                transform: destOpen ? "rotate(45deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
                display: "inline-block",
              }}>+</span>
            </button>
            {destOpen && (
              <div style={{ paddingBottom: 20, display: "flex", flexWrap: "wrap", gap: "8px 24px" }}>
                {DESTINATIONS.map((d) => (
                  <a key={d} href="#" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.15s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#C6A664"}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)"}
                  >{d}</a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── BOTTOM bar ── */}
        <div className="footer-bottom-bar">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 20px" }}>
            {["Corporate", "Pressroom", "Work With Us", "Terms of Service", "Privacy Policy", "Accessibility"].map((l) => (
              <a key={l} href="#" style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#C6A664"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.3)"}
              >{l}</a>
            ))}
          </div>
          <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.25)" }}>
            © 2026 The Aurum Palace. All Rights Reserved.
          </p>
        </div>

      </footer>
    </>
  );
}
