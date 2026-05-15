"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, CheckCircle2, ChevronRight, MapPin, Sparkles, User, Mail, Phone, ChevronLeft } from "lucide-react";

// Mock Data
const DESTINATIONS = ["Udaipur — Lake Palace", "Jaipur — Pink City", "Jodhpur — Blue City", "Goa — Coastal Retreat"];
const ROOMS = [
  {
    id: "heritage",
    name: "Heritage Palace Room",
    sqft: "650 sq.ft.",
    bed: "1 King Bed",
    capacity: "2 Adults",
    view: "Courtyard View",
    price: "$450",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80"
  },
  {
    id: "ocean",
    name: "Ocean Villa",
    sqft: "1,200 sq.ft.",
    bed: "1 King Bed",
    capacity: "2 Adults, 1 Child",
    view: "Panoramic Ocean",
    price: "$850",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80"
  },
  {
    id: "penthouse",
    name: "Sky Penthouse",
    sqft: "2,400 sq.ft.",
    bed: "2 King Beds",
    capacity: "4 Adults",
    view: "360° Cityscape",
    price: "$1,800",
    image: "https://images.unsplash.com/photo-1502672260266-1c1de2d9d000?w=800&q=80"
  }
];

export default function BookingFlow() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
    room: null as any,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    requests: ""
  });

  const updateForm = (key: string, value: any) => setFormData(prev => ({ ...prev, [key]: value }));

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
  };

  return (
    <div className="w-full max-w-5xl mx-auto min-h-[70vh]">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10 -z-10" />
        {[1, 2, 3, 4].map(s => (
          <div key={s} className={`flex flex-col items-center gap-2 bg-[var(--dark)] px-4 transition-colors ${step >= s ? 'text-[var(--gold)]' : 'text-white/30'}`}>
            <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm font-playfair ${step >= s ? 'border-[var(--gold)] bg-[var(--gold)]/10' : 'border-white/20'}`}>
              {step > s ? <CheckCircle2 size={16} /> : s}
            </div>
            <span className="font-inter text-[10px] tracking-widest uppercase hidden md:block">
              {s === 1 ? 'Search' : s === 2 ? 'Select Room' : s === 3 ? 'Guest Details' : 'Confirmation'}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" variants={variants} initial="initial" animate="animate" exit="exit" className="glass-dark border border-[var(--border)] rounded-2xl p-8 md:p-12">
            <h2 className="font-playfair text-3xl mb-8 text-[#F8F5F0]">Find Your Sanctuary</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="font-manrope text-xs text-[var(--gold)] tracking-widest uppercase block mb-3">Destination</label>
                <select 
                  className="w-full bg-transparent border-b border-white/20 pb-3 text-[#F8F5F0] font-inter outline-none focus:border-[var(--gold)] transition-colors appearance-none"
                  value={formData.destination}
                  onChange={e => updateForm("destination", e.target.value)}
                >
                  <option value="" className="bg-[var(--dark)] text-white/50">Select Destination</option>
                  {DESTINATIONS.map(d => <option key={d} value={d} className="bg-[var(--dark)]">{d}</option>)}
                </select>
              </div>
              
              <div>
                <label className="font-manrope text-xs text-[var(--gold)] tracking-widest uppercase block mb-3">Guests</label>
                <div className="flex items-center gap-4 pb-3 border-b border-white/20">
                  <button onClick={() => updateForm("guests", Math.max(1, formData.guests - 1))} className="w-8 h-8 rounded-full border border-white/20 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors flex items-center justify-center">−</button>
                  <span className="w-8 text-center font-inter">{formData.guests}</span>
                  <button onClick={() => updateForm("guests", Math.min(10, formData.guests + 1))} className="w-8 h-8 rounded-full border border-white/20 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors flex items-center justify-center">+</button>
                </div>
              </div>

              <div>
                <label className="font-manrope text-xs text-[var(--gold)] tracking-widest uppercase block mb-3">Check-in</label>
                <input 
                  type="date" 
                  className="w-full bg-transparent border-b border-white/20 pb-3 text-[#F8F5F0] font-inter outline-none focus:border-[var(--gold)] transition-colors"
                  value={formData.checkIn}
                  onChange={e => updateForm("checkIn", e.target.value)}
                />
              </div>

              <div>
                <label className="font-manrope text-xs text-[var(--gold)] tracking-widest uppercase block mb-3">Check-out</label>
                <input 
                  type="date" 
                  className="w-full bg-transparent border-b border-white/20 pb-3 text-[#F8F5F0] font-inter outline-none focus:border-[var(--gold)] transition-colors"
                  value={formData.checkOut}
                  onChange={e => updateForm("checkOut", e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end mt-12">
              <button 
                onClick={nextStep}
                disabled={!formData.destination || !formData.checkIn || !formData.checkOut}
                className="btn-book flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Check Availability <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" variants={variants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            <div className="flex items-center justify-between mb-8">
              <button onClick={prevStep} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-inter uppercase tracking-widest">
                <ChevronLeft size={16} /> Back to Search
              </button>
              <span className="font-inter text-sm text-white/50">{formData.checkIn} — {formData.checkOut} · {formData.guests} Guests</span>
            </div>

            {ROOMS.map(room => (
              <div key={room.id} className="glass-dark border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--gold)]/50 transition-colors group cursor-pointer" onClick={() => { updateForm("room", room); nextStep(); }}>
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
                    <img src={room.image} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="w-full md:w-3/5 p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="font-playfair text-2xl text-[#F8F5F0] mb-4">{room.name}</h3>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex flex-col">
                          <span className="font-manrope text-[10px] text-[var(--gold)] uppercase tracking-widest mb-1">Space</span>
                          <span className="font-inter text-sm text-white/80">{room.sqft}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-manrope text-[10px] text-[var(--gold)] uppercase tracking-widest mb-1">Bed Configuration</span>
                          <span className="font-inter text-sm text-white/80">{room.bed}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-manrope text-[10px] text-[var(--gold)] uppercase tracking-widest mb-1">Max Guests</span>
                          <span className="font-inter text-sm text-white/80">{room.capacity}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-manrope text-[10px] text-[var(--gold)] uppercase tracking-widest mb-1">View</span>
                          <span className="font-inter text-sm text-white/80">{room.view}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-end justify-between border-t border-white/10 pt-6 mt-6">
                      <div>
                        <span className="font-inter text-xs text-white/50 block mb-1">From</span>
                        <span className="font-playfair text-2xl text-[var(--gold)]">{room.price} <span className="text-sm font-inter text-white/50">/ night</span></span>
                      </div>
                      <button className="btn-book opacity-0 group-hover:opacity-100 transition-opacity">Select Suite</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" variants={variants} initial="initial" animate="animate" exit="exit" className="glass-dark border border-[var(--border)] rounded-2xl p-8 md:p-12">
             <div className="flex items-center justify-between mb-12">
              <button onClick={prevStep} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-inter uppercase tracking-widest">
                <ChevronLeft size={16} /> Back to Rooms
              </button>
              <span className="font-inter text-sm text-white/50">{formData.room?.name}</span>
            </div>

            <h2 className="font-playfair text-3xl mb-8 text-[#F8F5F0]">Guest Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="font-manrope text-xs text-[var(--gold)] tracking-widest uppercase block mb-3">First Name</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b border-white/20 pb-3 text-[#F8F5F0] font-inter outline-none focus:border-[var(--gold)] transition-colors"
                  value={formData.firstName}
                  onChange={e => updateForm("firstName", e.target.value)}
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="font-manrope text-xs text-[var(--gold)] tracking-widest uppercase block mb-3">Last Name</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b border-white/20 pb-3 text-[#F8F5F0] font-inter outline-none focus:border-[var(--gold)] transition-colors"
                  value={formData.lastName}
                  onChange={e => updateForm("lastName", e.target.value)}
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <label className="font-manrope text-xs text-[var(--gold)] tracking-widest uppercase block mb-3">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-transparent border-b border-white/20 pb-3 text-[#F8F5F0] font-inter outline-none focus:border-[var(--gold)] transition-colors"
                  value={formData.email}
                  onChange={e => updateForm("email", e.target.value)}
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <label className="font-manrope text-xs text-[var(--gold)] tracking-widest uppercase block mb-3">Phone Number</label>
                <input 
                  type="tel" 
                  className="w-full bg-transparent border-b border-white/20 pb-3 text-[#F8F5F0] font-inter outline-none focus:border-[var(--gold)] transition-colors"
                  value={formData.phone}
                  onChange={e => updateForm("phone", e.target.value)}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div className="col-span-1 md:col-span-2 mt-4">
                <label className="font-manrope text-xs text-[var(--gold)] tracking-widest uppercase block mb-3">Special Requests (Optional)</label>
                <textarea 
                  className="w-full bg-transparent border-b border-white/20 pb-3 text-[#F8F5F0] font-inter outline-none focus:border-[var(--gold)] transition-colors resize-none h-24"
                  value={formData.requests}
                  onChange={e => updateForm("requests", e.target.value)}
                  placeholder="Celebrations, dietary needs, arrival time..."
                />
              </div>
            </div>

            <div className="flex justify-end mt-12 border-t border-white/10 pt-8">
              <button 
                onClick={nextStep}
                disabled={!formData.firstName || !formData.lastName || !formData.email}
                className="btn-book flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Reservation <CheckCircle2 size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="step4" variants={variants} initial="initial" animate="animate" exit="exit" className="glass-dark border border-[var(--border)] rounded-2xl p-12 text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)] flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 size={40} className="text-[var(--gold)]" />
            </div>
            <h2 className="font-playfair text-4xl mb-4 text-[#F8F5F0]">Reservation Confirmed</h2>
            <p className="font-inter text-white/60 mb-8 leading-relaxed">
              Thank you, {formData.firstName}. Your reservation at {formData.destination} for the {formData.room?.name} has been confirmed. A detailed itinerary has been sent to {formData.email}.
            </p>
            <div className="bg-black/30 rounded-xl p-6 mb-10 text-left border border-white/5">
              <div className="grid grid-cols-2 gap-y-4">
                <div>
                  <span className="font-manrope text-[10px] text-[var(--gold)] uppercase tracking-widest block mb-1">Check-in</span>
                  <span className="font-inter text-sm text-white">{formData.checkIn}</span>
                </div>
                <div>
                  <span className="font-manrope text-[10px] text-[var(--gold)] uppercase tracking-widest block mb-1">Check-out</span>
                  <span className="font-inter text-sm text-white">{formData.checkOut}</span>
                </div>
                <div>
                  <span className="font-manrope text-[10px] text-[var(--gold)] uppercase tracking-widest block mb-1">Guests</span>
                  <span className="font-inter text-sm text-white">{formData.guests}</span>
                </div>
                <div>
                  <span className="font-manrope text-[10px] text-[var(--gold)] uppercase tracking-widest block mb-1">Confirmation #</span>
                  <span className="font-inter text-sm text-white">AURUM-{Math.floor(Math.random() * 90000) + 10000}</span>
                </div>
              </div>
            </div>
            <a href="/" className="btn-book inline-block">Return to Homepage</a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
