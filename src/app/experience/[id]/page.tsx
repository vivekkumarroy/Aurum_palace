"use client";
import { useEffect, useState, use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Star } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Massive mock database for all experiences across the landing page
const EXPERIENCES: Record<string, { title: string; subtitle: string; description: string; image: string; price: string; rating: number }> = {
  // --- OFFERS ---
  "aurum-club": {
    title: "AURUM CLUB", subtitle: "Breakfast & Cocktail Inclusive", price: "$450 / Night", rating: 5,
    description: "Experience the pinnacle of luxury with our Aurum Club access. Enjoy exclusive daily breakfasts, evening cocktails, and private lounge access. This package is designed to provide you with an uninterrupted, opulent stay.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=2000&q=85"
  },
  "international": {
    title: "INTERNATIONAL", subtitle: "Escapes & Holiday Packages", price: "$850 / Night", rating: 5,
    description: "Discover the world's most breathtaking destinations. Our international holiday packages offer curated itineraries, luxury transfers, and accommodations in top-tier suites with panoramic views.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=2000&q=85"
  },
  "beat-the-heat": {
    title: "BEAT THE HEAT", subtitle: "Summer Getaway Offers", price: "$320 / Night", rating: 4,
    description: "Cool off this summer in our exclusive private pools and shaded cabanas. This offer includes complimentary iced refreshments, spa credits, and priority access to all water activities.",
    image: "/beat_the_heat_new.png"
  },
  "royal-heritage": {
    title: "ROYAL HERITAGE", subtitle: "Udaipur Escape", price: "$1,200 / Night", rating: 5,
    description: "Step back in time and live like royalty. Located in the heart of Udaipur, this heritage escape offers grand palace suites, private butler service, and authentic royal dining experiences.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=2000&q=85"
  },
  "staycations": {
    title: "STAYCATIONS", subtitle: "Perfect Summer Escapes", price: "$280 / Night", rating: 4,
    description: "Escape the routine without traveling far. Our staycation package provides the perfect blend of relaxation and luxury, including late checkout, dining credits, and complimentary spa access.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=2000&q=85"
  },

  // --- RESTAURANTS ---
  "machan": {
    title: "MACHAN", subtitle: "International Cuisine", price: "$120 / Person", rating: 5,
    description: "Presenting a delightful blend of earthy simplicity and urban sophistication, Machan invites its guests to enjoy a diverse bill of fare in a joyful environment. Perfect for both intimate dinners and large gatherings.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=2000&q=85"
  },
  "loya": {
    title: "LOYA", subtitle: "North Indian Journey", price: "$150 / Person", rating: 5,
    description: "LOYA takes its diners on a gastronomic journey through North India's diverse landscape, blending flavours from the Himalayan foothills, Punjab's flatlands, and Kashmir's pristine valleys.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=2000&q=85"
  },
  "golden-dragon": {
    title: "GOLDEN DRAGON", subtitle: "Authentic Chinese", price: "$140 / Person", rating: 5,
    description: "Golden Dragon has introduced guests to rarefied, divine experiences that are unparalleled. Known for its exquisite dim sum and Peking duck, prepared by master chefs.",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=2000&q=85"
  },
  "wasabi": {
    title: "WASABI BY MORIMOTO", subtitle: "Japanese Culinary Treasures", price: "$250 / Person", rating: 5,
    description: "Wasabi by Morimoto offers its guests authentic Japanese culinary treasures from the repertoire of Iron Chef Morimoto. The ingredients, including seafood, are flown in directly from Japan.",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=2000&q=85"
  },
  "bombay-brasserie": {
    title: "BOMBAY BRASSERIE", subtitle: "Indian Flavours", price: "$110 / Person", rating: 4,
    description: "Ever since its inception, Bombay Brasserie has been a showcase of diverse Indian flavours, textures and fragrances that all reflect the vibrant culture of Bombay.",
    image: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=2000&q=85"
  },
  "thai-pavilion": {
    title: "THAI PAVILION", subtitle: "Royal Thai Kitchens", price: "$130 / Person", rating: 5,
    description: "The first Thai restaurant in India continues to be a pioneer in serving authentic cuisine from the royal kitchens of Thailand, crafted with the finest ingredients.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=2000&q=85"
  },
  "southern-spice": {
    title: "SOUTHERN SPICE", subtitle: "South Indian Delicacies", price: "$100 / Person", rating: 5,
    description: "Experience the ultimate culinary journey through the four southern states of India, offering an array of forgotten recipes from ancestral kitchens.",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=2000&q=85"
  },
  "shamiana": {
    title: "SHAMIANA", subtitle: "All-Day Dining", price: "$85 / Person", rating: 4,
    description: "The original coffee shop of the city, Shamiana offers an all-day dining experience featuring an eclectic menu of Indian and international favourites in a relaxed setting.",
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=2000&q=85"
  },
  "blue-ginger": {
    title: "BLUE GINGER", subtitle: "Vietnamese Restaurant", price: "$120 / Person", rating: 4,
    description: "India's first Vietnamese restaurant, Blue Ginger offers a vibrant dining experience with fresh, delicate flavours and an enchanting open-air setting.",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=2000&q=85"
  },
  "varq": {
    title: "VARQ", subtitle: "Modern Indian", price: "$160 / Person", rating: 5,
    description: "An elegant Indian restaurant that seamlessly blends traditional flavours with modern presentation, creating a truly unforgettable dining experience.",
    image: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=2000&q=85"
  },

  // --- EXPLORE ---
  "enchanting-safaris": {
    title: "ENCHANTING SAFARIS", subtitle: "Wilderness Adventure", price: "$1,500 / Tour", rating: 5,
    description: "Embark on a guided luxury safari through the most pristine wilderness reserves. Encounter majestic wildlife while enjoying five-star accommodations in the heart of nature.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=2000&q=85"
  },
  "living-palaces": {
    title: "LIVING PALACES", subtitle: "Heritage Stays", price: "$2,000 / Night", rating: 5,
    description: "Stay in painstakingly restored historic palaces. These properties offer a glimpse into the opulent lifestyles of past royalty, complete with modern luxury amenities.",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=2000&q=85"
  },
  "city-hotels": {
    title: "CITY HOTELS", subtitle: "Urban Luxury", price: "$400 / Night", rating: 4,
    description: "Located in the vibrant heart of the world's most exciting cities, our urban properties offer a serene sanctuary amidst the bustling energy of the metropolis.",
    image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=2000&q=85"
  },
  "beach-resorts": {
    title: "BEACH RESORTS", subtitle: "Coastal Paradises", price: "$650 / Night", rating: 5,
    description: "Pristine white sands and crystal-clear waters await. Our beach resorts provide the ultimate tropical escape with private villas and overwater bungalows.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=2000&q=85"
  },
  "mountain-retreats": {
    title: "MOUNTAIN RETREATS", subtitle: "Alpine Escapes", price: "$550 / Night", rating: 5,
    description: "Breathe in the crisp alpine air at our luxury mountain retreats. Perfect for both winter sports enthusiasts and summer hikers seeking a tranquil, elevated experience.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&q=85"
  },

  // --- EXCLUSIVELY ---
  "perfect-staycations": {
    title: "PERFECT STAYCATIONS", subtitle: "Summer Escapes", price: "$280 / Night", rating: 4,
    description: "Escape into brighter days without stepping out of your city. Enjoy stays designed for comfort and the simple joy of being away, yet beautifully close to home.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=2000&q=85"
  },
  "family-escapes": {
    title: "FAMILY RETREATS", subtitle: "Family Escapes", price: "$450 / Night", rating: 5,
    description: "Create unforgettable memories with your loved ones in our spacious family suites. Reconnect and relax in the elegant ambiance of our grand properties.",
    image: "/family_hotel_sofa.png"
  },
  "game-room": {
    title: "LEISURE & ENTERTAINMENT", subtitle: "Game Room Fun", price: "Complimentary", rating: 4,
    description: "Challenge your friends to a game of pool in our lively, luxurious game room. The perfect place to unwind and socialize during your stay.",
    image: "/playing_billiards.png"
  },
  "ocean-views": {
    title: "STUNNING OCEAN VIEWS", subtitle: "Ocean Views", price: "$750 / Night", rating: 5,
    description: "Wake up to breathtaking ocean panoramas from your private balcony. Witness glorious sunsets that paint the sky in vibrant, unforgettable colors.",
    image: "/luxury_room_view.png"
  },
  "holidays": {
    title: "AURUM PALACE HOLIDAYS", subtitle: "Curated Vacations", price: "$1,800 / Package", rating: 5,
    description: "Go beyond the ordinary and craft enduring memories with a perfectly curated Aurum Palace Holiday, tailored specifically to your unique preferences.",
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=2000&q=85"
  },
  "heritage-escape": {
    title: "ROYAL HERITAGE ESCAPE", subtitle: "Historic Luxury", price: "$1,200 / Night", rating: 5,
    description: "Step into the grandeur of India's most iconic palaces. Every corridor whispers stories of royalty and timeless elegance.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=2000&q=85"
  },
  "epic-dining": {
    title: "EPICURE – FINE DINING", subtitle: "Culinary Excellence", price: "$180 / Person", rating: 5,
    description: "A world of benefits designed to indulge with member-only savings, unique vouchers, exclusive benefits and more at our top-tier dining establishments.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=2000&q=85"
  },
  "spa-wellness": {
    title: "AURUM WELLNESS CIRCLE", subtitle: "Spa & Wellness", price: "$200 / Session", rating: 5,
    description: "Immerse yourself in ancient Ayurvedic rituals and modern wellness therapies at our award-winning spa sanctuaries. Rejuvenate your mind, body, and soul.",
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=2000&q=85"
  }
};

const FALLBACK = {
  title: "Exclusive Experience",
  subtitle: "Aurum Palace Signature",
  price: "Price upon request",
  rating: 5,
  description: "Discover a tailored experience designed specifically for our most discerning guests. Prepare to be immersed in an environment of total luxury and relaxation.",
  image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=2000"
};

export default function ExperienceDetails({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const data = EXPERIENCES[unwrappedParams.id] || FALLBACK;

  if (!mounted) return null;

  return (
    <div style={{ background: "#0A0F14", minHeight: "100vh", color: "#F0EDE8", overflow: "hidden" }}>
      <Navbar />
      
      {/* Hero Section (Untouched Design) */}
      <div style={{ position: "relative", height: "70vh", width: "100%", display: "flex", alignItems: "flex-end" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src={data.image} alt={data.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,15,20,0.2) 0%, #0A0F14 100%)" }} />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ position: "relative", zIndex: 1, padding: "0 60px 80px 60px", maxWidth: 1200, margin: "0 auto", width: "100%" }}
        >
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.4)", fontFamily: "Inter", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none", marginBottom: 24, transition: "color 0.3s" }}>
            <ArrowLeft size={14} /> Return
          </Link>
          <p style={{ fontFamily: "Inter", fontSize: 12, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#D4AF37", marginBottom: 12 }}>
            {data.subtitle}
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "4rem", fontWeight: 300, lineHeight: 1.1, margin: 0 }}>
            {data.title}
          </h1>
        </motion.div>
      </div>

      {/* Content Section (Updated with Price and Rating) */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 60px 120px 60px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 40 }}>
            <div>
              <div style={{ width: 40, height: 2, background: "#D4AF37", marginBottom: 20 }} />
              <div style={{ display: "flex", gap: 4 }}>
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    fill={i < data.rating ? "#D4AF37" : "transparent"} 
                    color={i < data.rating ? "#D4AF37" : "rgba(255,255,255,0.2)"} 
                  />
                ))}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontFamily: "Inter", fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", margin: "0 0 4px 0" }}>Starting From</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "#D4AF37", margin: 0 }}>{data.price}</p>
            </div>
          </div>

          <p style={{ fontFamily: "Inter", fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.7)", fontWeight: 300, marginBottom: 20 }}>
            {data.description}
          </p>
          <p style={{ fontFamily: "Inter", fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.7)", fontWeight: 300, marginBottom: 40 }}>
            Immerse yourself in unparalleled elegance, where every detail is curated to provide a seamless and unforgettable experience. From bespoke amenities to world-class service, your time with us is designed to elevate your senses and leave you with cherished memories that will last a lifetime.
          </p>

          <div style={{ width: "100%", borderRadius: 8, overflow: "hidden", marginBottom: 60 }}>
            <img src={data.image} alt={data.title} style={{ width: "100%", height: "auto", objectFit: "cover", display: "block" }} />
          </div>
          
          <div style={{ display: "flex", gap: 24 }}>
            <Link 
              href="/booking"
              style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "#D4AF37", color: "#0A0F14", padding: "18px 36px", fontFamily: "Inter", fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none", borderRadius: 4, transition: "background 0.3s" }}
            >
              Reserve Now <ArrowUpRight size={16} strokeWidth={2.5} />
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
