import BookingFlow from "@/components/booking/BookingFlow";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Reserve Your Stay | Aurum Palace",
  description: "Book your luxury stay directly at Aurum Palace for the best rates and personalized service."
};

export default function BookingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 min-h-screen relative overflow-hidden bg-[var(--dark)]">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none"
             style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80')`, backgroundSize: "cover", backgroundPosition: "center" }} />
        
        <div className="container relative z-10">
          <BookingFlow />
        </div>
      </main>
      <Footer />
    </>
  );
}
