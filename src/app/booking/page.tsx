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
      <main className="min-h-screen relative overflow-hidden bg-[var(--dark)]">
        <BookingFlow />
      </main>
      <Footer />
    </>
  );
}
