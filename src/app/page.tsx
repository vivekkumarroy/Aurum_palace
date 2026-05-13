"use client";

import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AwardSection from "@/components/sections/AwardSection";
import OffersSection from "@/components/sections/OffersSection";
import ExclusivelySection from "@/components/sections/ExclusivelySection";
import ExploreMoreSection from "@/components/sections/ExploreMoreSection";
import RestaurantsSection from "@/components/sections/RestaurantsSection";
import EventsSection from "@/components/sections/EventsSection";
import WellnessBanner from "@/components/sections/WellnessBanner";
import Footer from "@/components/layout/Footer";
import AIConcierge from "@/components/ui/AIConcierge";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AwardSection />
        <OffersSection />
        <ExclusivelySection />
        <ExploreMoreSection />
        <RestaurantsSection />
        <EventsSection />
        <WellnessBanner />
      </main>
      <Footer />
      <AIConcierge />
    </>
  );
}
