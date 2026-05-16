"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, ChevronDown, Plus, Minus, Shield, Car, Utensils,
  CreditCard, Building2, Gem, Download, Share2, Phone, Mail,
  ArrowUpRight, Lock
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Property {
  id: string;
  label: string;
  location: string;
}

interface Suite {
  id: string;
  category: string;
  name: string;
  line1: string;
  line2: string;
  price: number;
  img: string;
  featured?: boolean;
}

interface BookingState {
  checkIn: string;
  checkOut: string;
  property: string;
  occasion: string;
  adults: number;
  children: number;
  suite: Suite | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  requests: string;
  paymentMethod: string;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvv: string;
  promoCode: string;
  promoApplied: boolean;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const PROPERTIES: Property[] = [
  { id: "maldives-north", label: "Maldives — North Malé", location: "Maldives, North Malé" },
  { id: "udaipur-lake",   label: "Udaipur — Lake Palace",  location: "Udaipur, India" },
  { id: "jaipur-pink",   label: "Jaipur — Pink City",      location: "Jaipur, India" },
  { id: "goa-coastal",   label: "Goa — Coastal Retreat",   location: "Goa, India" },
  { id: "dubai-urban",   label: "Dubai — Urban Palace",    location: "Dubai, UAE" },
  { id: "paris-iconic",  label: "Paris — Iconic Residence",location: "Paris, France" },
];

const OCCASIONS = ["Leisure","Business","Honeymoon","Anniversary","Wedding","Family Vacation","Special Occasion"];

const SUITES: Suite[] = [
  { id:"horizon",  category:"Ocean Suite",     name:"Horizon Villa",     line1:"Ocean view · King bed",     line2:"Private pool · Butler",        price:780,  img:"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80" },
  { id:"aurum",    category:"Signature Suite", name:"Aurum Penthouse",   line1:"Panoramic view · King bed",  line2:"Infinity pool · Chef service",  price:1240, img:"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80", featured:true },
  { id:"serenity", category:"Garden Villa",    name:"Serenity Bungalow", line1:"Garden view · Queen bed",   line2:"Plunge pool · Spa access",      price:560,  img:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80" },
  { id:"lagoon",   category:"Overwater Villa", name:"Lagoon Retreat",    line1:"Lagoon · King bed",          line2:"Glass floor · Snorkel gear",   price:920,  img:"https://images.unsplash.com/photo-1439130490301-25e322d88054?w=600&q=80" },
];

const PERKS = [
  { icon:<Car size={13}/>,      text:"Complimentary airport transfer" },
  { icon:<Utensils size={13}/>, text:"Daily breakfast included" },
  { icon:<Check size={13}/>,    text:"Free cancellation until Sep 5" },
  { icon:<Gem size={13}/>,      text:"Loyalty points on this stay" },
];

const STEPS = ["Dates","Guests","Confirm"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function nights(ci: string, co: string) {
  if (!ci || !co) return 0;
  return Math.max(0, Math.floor((new Date(co).getTime() - new Date(ci).getTime()) / 86400000));
}

function fmtDisplay(d: string) {
  if (!d) return "";
  const [y,m,day] = d.split("-");
  return `${day}-${m}-${y}`;
}

function fmtRange(ci: string, co: string) {
  if (!ci || !co) return "—";
  const a = new Date(ci), b = new Date(co);
  const mo = (d: Date) => d.toLocaleDateString("en-US",{month:"short"});
  return `${mo(a)} ${a.getDate()} – ${b.getDate()}, ${b.getFullYear()}`;
}

function fmtLong(d: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
}

function genRef() {
  return "AUR-"+Math.random().toString(36).substring(2,6).toUpperCase()+"-"+Math.floor(Math.random()*9000+1000);
}

// ─── Step Indicator ───────────────────────────────────────────────────────────

function StepIndicator({ step }: { step: number }) {
  return (
    <div style={{display:"flex",alignItems:"center",marginBottom:36}}>
      {STEPS.map((label, idx) => {
        const num = idx + 1;
        const done = step > num;
        const active = step === num;
        return (
          <div key={num} style={{display:"flex",alignItems:"center",flex: idx < STEPS.length-1 ? "1" : "none"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
              <div style={{
                width:32, height:32, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
                background: done ? "#D4AF37" : "transparent",
                border: done ? "2px solid #D4AF37" : active ? "2px solid #D4AF37" : "1px solid rgba(255,255,255,0.20)",
                transition:"all 0.3s"
              }}>
                {done
                  ? <Check size={14} color="#0A0F14" strokeWidth={3}/>
                  : <span style={{fontFamily:"Inter",fontSize:12,fontWeight:600,color: active ? "#D4AF37" : "rgba(255,255,255,0.30)",lineHeight:1}}>{num}</span>
                }
              </div>
              <span style={{fontFamily:"Inter",fontSize:13,fontWeight:500,color: active ? "#F0EDE8" : done ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.25)",transition:"color 0.3s"}}>{label}</span>
            </div>
            {idx < STEPS.length - 1 && (
              <div style={{flex:1,height:1,background:"rgba(255,255,255,0.10)",margin:"0 16px"}}/>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Booking Summary Sidebar ──────────────────────────────────────────────────

function BookingSummary({
  data, onReserve, disabled,
}: {
  data: BookingState;
  onReserve: () => void;
  disabled: boolean;
}) {
  const n = nights(data.checkIn, data.checkOut);
  const rate = data.suite?.price ?? 0;
  const sub = rate * n;
  const tax = Math.round(sub * 0.1);
  const disc = data.promoApplied ? Math.round(sub * 0.1) : 0;
  const total = sub + tax - disc;
  const prop = PROPERTIES.find(p => p.id === data.property);

  const rows = [
    { label:"Property", value: prop?.location ?? "—" },
    { label:"Dates",    value: n > 0 ? fmtRange(data.checkIn, data.checkOut) : "—" },
    { label:"Duration", value: n > 0 ? `${n} nights` : "—" },
    { label:"Guests",   value: data.adults > 0 ? `${data.adults} adult${data.adults>1?"s":""}${data.children>0?`, ${data.children} child${data.children>1?"ren":""}` :""}` : "—" },
    { label:"Suite",    value: data.suite?.name ?? "—" },
  ];

  return (
    <div>
      <p style={{fontFamily:"Inter",fontSize:11,fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"#D4AF37",marginBottom:20}}>Booking Summary</p>

      <div style={{display:"flex",flexDirection:"column",gap:11,marginBottom:20}}>
        {rows.map(r => (
          <div key={r.label} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12}}>
            <span style={{fontFamily:"Inter",fontSize:13,color:"rgba(255,255,255,0.40)",flexShrink:0}}>{r.label}</span>
            <span style={{fontFamily:"Inter",fontSize:13,color:"#F0EDE8",fontWeight:500,textAlign:"right",lineHeight:1.4}}>{r.value}</span>
          </div>
        ))}
      </div>

      {rate > 0 && n > 0 && (<>
        <div style={{height:1,background:"rgba(255,255,255,0.08)",margin:"16px 0"}}/>
        <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontFamily:"Inter",fontSize:13,color:"rgba(255,255,255,0.40)"}}>Rate / night</span><span style={{fontFamily:"Inter",fontSize:13,color:"#F0EDE8"}}>${rate.toLocaleString()}</span></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontFamily:"Inter",fontSize:13,color:"rgba(255,255,255,0.40)"}}>{n} nights</span><span style={{fontFamily:"Inter",fontSize:13,color:"#F0EDE8"}}>${sub.toLocaleString()}</span></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontFamily:"Inter",fontSize:13,color:"rgba(255,255,255,0.40)"}}>Taxes & fees</span><span style={{fontFamily:"Inter",fontSize:13,color:"#F0EDE8"}}>${tax.toLocaleString()}</span></div>
          {data.promoApplied && <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontFamily:"Inter",fontSize:13,color:"#34d399"}}>Promo (AURUM10)</span><span style={{fontFamily:"Inter",fontSize:13,color:"#34d399"}}>−${disc.toLocaleString()}</span></div>}
        </div>
        <div style={{height:1,background:"rgba(255,255,255,0.08)",marginBottom:16}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <span style={{fontFamily:"Inter",fontSize:15,color:"#F0EDE8",fontWeight:500}}>Total</span>
          <span style={{fontFamily:"Inter",fontSize:22,color:"#D4AF37",fontWeight:700}}>${total.toLocaleString()}</span>
        </div>
      </>)}

      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:24}}>
        {PERKS.map((p,i) => (
          <div key={i} style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{color:"rgba(255,255,255,0.30)",flexShrink:0}}>{p.icon}</span>
            <span style={{fontFamily:"Inter",fontSize:12,color:"rgba(255,255,255,0.45)"}}>{p.text}</span>
          </div>
        ))}
      </div>

      <button onClick={onReserve} disabled={disabled} className="bk-reserve-btn">
        Reserve Now <ArrowUpRight size={14} strokeWidth={2.5}/>
      </button>

      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
        <Lock size={11} color="rgba(255,255,255,0.20)"/>
        <span style={{fontFamily:"Inter",fontSize:11,color:"rgba(255,255,255,0.25)"}}>Secured with 256-bit SSL</span>
      </div>
    </div>
  );
}

// ─── Shared label ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="bk-label">{children}</p>;
}

// ─── Dates Step ───────────────────────────────────────────────────────────────

function DatesStep({ data, update }: { data: BookingState; update: (k: keyof BookingState, v: any) => void }) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      {/* Stay Details */}
      <SectionLabel>Stay Details</SectionLabel>

      {/* Check-in / Check-out */}
      <div className="bk-grid-2" style={{marginBottom:12}}>
        {/* Check-in */}
        <div>
          <p className="bk-field-label">Check In</p>
          <div className="bk-field">
            <input
              type="date"
              min={today}
              value={data.checkIn}
              onChange={e => update("checkIn", e.target.value)}
              className="bk-input cursor-pointer"
            />
          </div>
        </div>
        {/* Check-out */}
        <div>
          <p className="bk-field-label">Check Out</p>
          <div className="bk-field">
            <input
              type="date"
              min={data.checkIn || today}
              value={data.checkOut}
              onChange={e => update("checkOut", e.target.value)}
              className="bk-input cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Property / Occasion */}
      <div className="bk-grid-2" style={{marginBottom:24}}>
        <div>
          <p className="bk-field-label">Property</p>
          <div className="bk-field">
            <select
              value={data.property}
              onChange={e => update("property", e.target.value)}
              className="bk-select"
            >
              <option value="" disabled>Select property</option>
              {PROPERTIES.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/35 pointer-events-none"/>
          </div>
        </div>
        <div>
          <p className="bk-field-label">Occasion</p>
          <div className="bk-field">
            <select
              value={data.occasion}
              onChange={e => update("occasion", e.target.value)}
              className="bk-select"
            >
              {OCCASIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/35 pointer-events-none"/>
          </div>
        </div>
      </div>

      {/* Guests */}
      <SectionLabel>Guests</SectionLabel>
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:28}}>
        {/* Adults */}
        <div className="bk-counter-row">
          <div>
            <p style={{fontFamily:"Inter",fontSize:14,color:"#F0EDE8",fontWeight:500,lineHeight:1.2}}>Adults</p>
            <p style={{fontFamily:"Inter",fontSize:11,color:"rgba(255,255,255,0.30)",marginTop:2}}>Age 13+</p>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <button onClick={() => update("adults", Math.max(1, data.adults - 1))} className="bk-counter-btn"><Minus size={12}/></button>
            <span style={{fontFamily:"Inter",fontSize:15,color:"#F0EDE8",fontWeight:500,width:16,textAlign:"center"}}>{data.adults}</span>
            <button onClick={() => update("adults", Math.min(10, data.adults + 1))} className="bk-counter-btn"><Plus size={12}/></button>
          </div>
        </div>
        {/* Children */}
        <div className="bk-counter-row">
          <div>
            <p style={{fontFamily:"Inter",fontSize:14,color:"#F0EDE8",fontWeight:500,lineHeight:1.2}}>Children</p>
            <p style={{fontFamily:"Inter",fontSize:11,color:"rgba(255,255,255,0.30)",marginTop:2}}>Age 2–12</p>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <button onClick={() => update("children", Math.max(0, data.children - 1))} className="bk-counter-btn"><Minus size={12}/></button>
            <span style={{fontFamily:"Inter",fontSize:15,color:"#F0EDE8",fontWeight:500,width:16,textAlign:"center"}}>{data.children}</span>
            <button onClick={() => update("children", Math.min(8, data.children + 1))} className="bk-counter-btn"><Plus size={12}/></button>
          </div>
        </div>
      </div>

      {/* Select Your Suite */}
      <SectionLabel>Select Your Suite</SectionLabel>
      <div className="bk-suite-grid">
        {SUITES.map(suite => {
          const sel = data.suite?.id === suite.id;
          return (
            <button
              key={suite.id}
              onClick={() => update("suite", suite)}
              style={{
                position:"relative",height:180,borderRadius:12,overflow:"hidden",
                border: sel ? "2px solid #D4AF37" : "1px solid rgba(255,255,255,0.10)",
                cursor:"pointer",textAlign:"left",padding:0,transition:"border-color 0.2s",
              }}
            >
              {/* Background image */}
              <img src={suite.img} alt={suite.name} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}} />
              {/* Dark overlay */}
              <div style={{position:"absolute",inset:0,background: sel ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.65)"}} />
              {/* Gold top border when selected */}
              {sel && <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"#D4AF37"}} />}
              {/* Content */}
              <div style={{position:"relative",zIndex:1,padding:16,height:"100%",display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
                <p style={{fontFamily:"Inter",fontSize:10,fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",marginBottom:4,color: sel ? "#D4AF37" : "rgba(255,255,255,0.70)"}}>{suite.category}</p>
                <p style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:500,color:"#F0EDE8",marginBottom:4,lineHeight:1.2}}>{suite.name}</p>
                <p style={{fontFamily:"Inter",fontSize:11,color:"rgba(255,255,255,0.55)",lineHeight:1.5,marginBottom:8}}>{suite.line1} · {suite.line2}</p>
                <p style={{fontFamily:"Inter",fontSize:14,fontWeight:700,color:"#D4AF37"}}>
                  ${suite.price.toLocaleString()}<span style={{fontWeight:400,fontSize:11,color:"rgba(255,255,255,0.50)",marginLeft:3}}>/ night</span>
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Guests Step ──────────────────────────────────────────────────────────────

function GuestsStep({ data, update }: { data: BookingState; update: (k: keyof BookingState, v: any) => void }) {
  return (
    <div>
      <p style={{fontFamily:"Inter",fontSize:11,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"#D4AF37",marginBottom:28}}>Primary Guest</p>

      {/* First + Last Name */}
      <div className="bk-grid-2" style={{marginBottom:20}}>
        <div>
          <p style={{fontFamily:"Inter",fontSize:10,fontWeight:600,letterSpacing:"0.16em",textTransform:"uppercase",color:"rgba(255,255,255,0.40)",marginBottom:8}}>First Name</p>
          <div className="bk-field">
            <input type="text" value={data.firstName} onChange={e => update("firstName", e.target.value)} placeholder="Jane"
              style={{width:"100%",background:"transparent",padding:"16px 20px",fontFamily:"Inter",fontSize:14,color:"#F0EDE8",outline:"none",border:"none"}} />
          </div>
        </div>
        <div>
          <p style={{fontFamily:"Inter",fontSize:10,fontWeight:600,letterSpacing:"0.16em",textTransform:"uppercase",color:"rgba(255,255,255,0.40)",marginBottom:8}}>Last Name</p>
          <div className="bk-field">
            <input type="text" value={data.lastName} onChange={e => update("lastName", e.target.value)} placeholder="Doe"
              style={{width:"100%",background:"transparent",padding:"16px 20px",fontFamily:"Inter",fontSize:14,color:"#F0EDE8",outline:"none",border:"none"}} />
          </div>
        </div>
      </div>

      {/* Email */}
      <div style={{marginBottom:20}}>
        <p style={{fontFamily:"Inter",fontSize:10,fontWeight:600,letterSpacing:"0.16em",textTransform:"uppercase",color:"rgba(255,255,255,0.40)",marginBottom:8}}>Email Address</p>
        <div className="bk-field">
          <input type="email" value={data.email} onChange={e => update("email", e.target.value)} placeholder="jane@example.com"
            style={{width:"100%",background:"transparent",padding:"16px 20px",fontFamily:"Inter",fontSize:14,color:"#F0EDE8",outline:"none",border:"none"}} />
        </div>
      </div>

      {/* Phone */}
      <div style={{marginBottom:20}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:8}}>
          <p style={{fontFamily:"Inter",fontSize:10,fontWeight:600,letterSpacing:"0.16em",textTransform:"uppercase",color:"rgba(255,255,255,0.40)",margin:0}}>Phone Number</p>
          <p style={{fontFamily:"Inter",fontSize:10,fontWeight:600,color:data.phone.length===10?"rgba(52,211,153,0.8)":data.phone.length>0?"rgba(239,68,68,0.8)":"rgba(255,255,255,0.25)",margin:0}}>
            {data.phone.length} / 10
          </p>
        </div>
        <div className="bk-field" style={{border: data.phone.length > 0 && data.phone.length !== 10 ? "1px solid rgba(239, 68, 68, 0.4)" : undefined}}>
          <input type="tel" value={data.phone} onChange={e => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 10);
              update("phone", val);
            }} placeholder="5550000000"
            style={{width:"100%",background:"transparent",padding:"16px 20px",fontFamily:"Inter",fontSize:14,color:"#F0EDE8",outline:"none",border:"none"}} />
        </div>
      </div>

      {/* Special Requests */}
      <div style={{marginBottom:28}}>
        <p style={{fontFamily:"Inter",fontSize:10,fontWeight:600,letterSpacing:"0.16em",textTransform:"uppercase",color:"rgba(255,255,255,0.40)",marginBottom:8}}>Special Requests</p>
        <div className="bk-field">
          <textarea value={data.requests} onChange={e => update("requests", e.target.value)}
            placeholder="Dietary requirements, room preferences, celebration arrangements..."
            rows={5}
            style={{width:"100%",background:"transparent",padding:"16px 20px",fontFamily:"Inter",fontSize:14,color:"#F0EDE8",outline:"none",border:"none",resize:"none",lineHeight:1.7}} />
        </div>
      </div>

      {/* Privacy notice */}
      <div style={{display:"flex",alignItems:"flex-start",gap:14,padding:"16px 20px",background:"#1E2130",border:"1px solid rgba(255,255,255,0.08)",borderRadius:8}}>
        <Shield size={14} color="rgba(255,255,255,0.25)" style={{flexShrink:0,marginTop:2}}/>
        <p style={{fontFamily:"Inter",fontSize:12,color:"rgba(255,255,255,0.35)",lineHeight:1.7,margin:0}}>
          Your information is protected and used only to manage your reservation and enhance your stay.
        </p>
      </div>
    </div>
  );
}

// ─── Confirm Step ─────────────────────────────────────────────────────────────

function ConfirmStep({ data, update }: { data: BookingState; update: (k: keyof BookingState, v: any) => void }) {
  const applyPromo = () => {
    if (data.promoCode.toUpperCase() === "AURUM10") update("promoApplied", true);
  };

  const inputStyle: React.CSSProperties = {
    width:"100%", background:"transparent", padding:"16px 20px",
    fontFamily:"Inter", fontSize:14, color:"#F0EDE8", outline:"none", border:"none",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily:"Inter", fontSize:10, fontWeight:600, letterSpacing:"0.16em",
    textTransform:"uppercase", color:"rgba(255,255,255,0.40)", marginBottom:8,
  };

  const METHODS = [
    { id:"card",   label:"Credit Card",   icon:<CreditCard size={16}/> },
    { id:"bank",   label:"Bank Transfer", icon:<Building2 size={16}/> },
    { id:"crypto", label:"Crypto",        icon:<Gem size={16}/> },
  ];

  return (
    <div>
      {/* Payment Method */}
      <p style={{fontFamily:"Inter",fontSize:11,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"#D4AF37",marginBottom:20}}>Payment Method</p>
      <div className="bk-payment-grid">
        {METHODS.map(m => {
          const active = data.paymentMethod === m.id;
          return (
            <button key={m.id} onClick={() => update("paymentMethod", m.id)}
              style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10,padding:"18px 12px",borderRadius:10,border: active ? "1.5px solid rgba(212,175,55,0.7)" : "1px solid rgba(255,255,255,0.10)",background:"#1E2130",cursor:"pointer",transition:"border-color 0.2s",color: active ? "#D4AF37" : "rgba(255,255,255,0.30)"}}>
              {m.icon}
              <span style={{fontFamily:"Inter",fontSize:10,fontWeight:600,letterSpacing:"0.14em",textTransform:"uppercase"}}>{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Card Fields */}
      {data.paymentMethod === "card" && (
        <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} style={{display:"flex",flexDirection:"column",gap:16,marginBottom:28}}>
          {[
            { label:"Cardholder Name", key:"cardName",   ph:"Jane Doe",            type:"text" },
            { label:"Card Number",     key:"cardNumber", ph:"•••• •••• •••• ••••", type:"text" },
          ].map(f => (
            <div key={f.key}>
              <p style={labelStyle}>{f.label}</p>
              <div className="bk-field">
                <input type={f.type} value={(data as any)[f.key]} onChange={e => update(f.key as keyof BookingState, e.target.value)} placeholder={f.ph} style={inputStyle}/>
              </div>
            </div>
          ))}
          <div className="bk-grid-2">
            {[
              { label:"Expiry", key:"cardExpiry", ph:"MM / YY" },
              { label:"CVV",    key:"cardCvv",    ph:"•••" },
            ].map(f => (
              <div key={f.key}>
                <p style={labelStyle}>{f.label}</p>
                <div className="bk-field">
                  <input type="text" value={(data as any)[f.key]} onChange={e => update(f.key as keyof BookingState, e.target.value)} placeholder={f.ph} style={inputStyle}/>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Bank info */}
      {data.paymentMethod === "bank" && (
        <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} style={{marginBottom:28}}>
          <div style={{padding:"18px 20px",background:"#1E2130",border:"1px solid rgba(255,255,255,0.08)",borderRadius:8}}>
            <p style={{fontFamily:"Inter",fontSize:13,color:"rgba(255,255,255,0.50)",lineHeight:1.7}}>
              Our reservations team will contact you within 2 hours with secure bank transfer details. Your suite will be held for 24 hours.
            </p>
          </div>
        </motion.div>
      )}

      {/* Crypto info */}
      {data.paymentMethod === "crypto" && (
        <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} style={{marginBottom:28}}>
          <div style={{padding:"18px 20px",background:"#1E2130",border:"1px solid rgba(255,255,255,0.08)",borderRadius:8}}>
            <p style={{fontFamily:"Inter",fontSize:13,color:"rgba(255,255,255,0.50)",lineHeight:1.7}}>
              We accept Bitcoin, Ethereum, and USDC. A payment link will be sent to your email after confirmation.
            </p>
          </div>
        </motion.div>
      )}

      {/* Promo Code */}
      <p style={{fontFamily:"Inter",fontSize:11,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"#D4AF37",marginBottom:16}}>Promo Code</p>
      {data.promoApplied ? (
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"14px 18px",background:"rgba(52,211,153,0.06)",border:"1px solid rgba(52,211,153,0.20)",borderRadius:8}}>
          <Check size={13} color="#34d399"/>
          <span style={{fontFamily:"Inter",fontSize:13,color:"#34d399"}}>AURUM10 applied — 10% discount</span>
        </div>
      ) : (
        <div style={{display:"flex",gap:10}}>
          <div className="bk-field" style={{flex:1}}>
            <input type="text" value={data.promoCode} onChange={e => update("promoCode", e.target.value.toUpperCase())}
              placeholder="Enter promo code" style={{...inputStyle,textTransform:"uppercase"}}/>
          </div>
          <button onClick={applyPromo}
            style={{padding:"0 24px",background:"#1E2130",border:"1px solid rgba(255,255,255,0.10)",borderRadius:8,fontFamily:"Inter",fontSize:11,fontWeight:600,letterSpacing:"0.14em",textTransform:"uppercase",color:"rgba(255,255,255,0.40)",cursor:"pointer",transition:"all 0.2s",whiteSpace:"nowrap"}}>
            Apply
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Confirmation Screen ──────────────────────────────────────────────────────

function ConfirmationScreen({ data }: { data: BookingState }) {
  const n = nights(data.checkIn, data.checkOut);
  const sub = (data.suite?.price ?? 0) * n;
  const tax = Math.round(sub * 0.1);
  const disc = data.promoApplied ? Math.round(sub * 0.1) : 0;
  const total = sub + tax - disc;
  const ref = useRef(genRef());
  const prop = PROPERTIES.find(p => p.id === data.property);

  const capitalize = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : "";

  const detailRows = [
    { label:"Property",  value: prop?.location ?? "—" },
    { label:"Suite",     value: data.suite?.name ?? "—" },
    { label:"Check-in",  value: fmtLong(data.checkIn) },
    { label:"Check-out", value: fmtLong(data.checkOut) },
    { label:"Duration",  value: `${n} night${n !== 1 ? "s" : ""}` },
    { label:"Guests",    value: `${data.adults} adult${data.adults > 1 ? "s" : ""}${data.children > 0 ? `, ${data.children} child${data.children > 1 ? "ren" : ""}` : ""}` },
  ];

  const handleDownload = () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Aurum Palace — Booking Confirmation ${ref.current}</title>
  <style>
    body { margin: 0; padding: 40px; background: #0A0F14; color: #F0EDE8; font-family: Georgia, serif; }
    .card { max-width: 600px; margin: 0 auto; background: #111620; border: 1px solid rgba(212,175,55,0.3); border-radius: 16px; overflow: hidden; }
    .gold-bar { height: 3px; background: linear-gradient(to right, transparent, #D4AF37, transparent); }
    .inner { padding: 32px; }
    .logo { font-size: 28px; font-weight: 700; letter-spacing: 0.15em; color: #D4AF37; margin-bottom: 4px; }
    .logo-sub { font-size: 13px; letter-spacing: 0.3em; color: rgba(255,255,255,0.35); margin-bottom: 32px; }
    .confirmed { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #D4AF37; margin-bottom: 10px; }
    h1 { font-size: 30px; font-weight: 300; margin: 0 0 6px; }
    .sub { font-size: 13px; color: rgba(255,255,255,0.40); margin-bottom: 32px; }
    .ref-row { display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.10); padding-bottom: 20px; margin-bottom: 20px; }
    .ref-label { font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.30); margin-bottom: 6px; }
    .ref-val { font-size: 20px; color: #D4AF37; letter-spacing: 0.1em; }
    .total-val { font-size: 22px; font-weight: 600; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px 24px; border-bottom: 1px solid rgba(255,255,255,0.10); padding-bottom: 20px; margin-bottom: 20px; }
    .dl { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.30); margin-bottom: 5px; }
    .dv { font-size: 14px; }
    .assist { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.30); margin-bottom: 12px; }
    .link { color: rgba(255,255,255,0.45); font-size: 13px; text-decoration: none; display: block; margin-bottom: 8px; }
    .footer { text-align: center; padding: 16px; font-size: 11px; color: rgba(255,255,255,0.20); border-top: 1px solid rgba(255,255,255,0.08); margin-top: 8px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="gold-bar"></div>
    <div class="inner">
      <div class="logo">AURUM</div>
      <div class="logo-sub">Palace</div>
      <div class="confirmed">✓ Reservation Confirmed</div>
      <h1>Welcome, ${capitalize(data.firstName)} ${capitalize(data.lastName)}</h1>
      <div class="sub">A confirmation has been sent to ${data.email}</div>
      <div class="ref-row">
        <div><div class="ref-label">Booking Reference</div><div class="ref-val">${ref.current}</div></div>
        <div style="text-align:right"><div class="ref-label">Total Paid</div><div class="total-val">$${total.toLocaleString()}</div></div>
      </div>
      <div class="grid">
        ${detailRows.map(r => `<div><div class="dl">${r.label}</div><div class="dv">${r.value}</div></div>`).join('')}
      </div>
      <div class="assist">Need Assistance?</div>
      <a class="link" href="tel:+918001234567">📞 +91 800 123 4567 (24/7 Concierge)</a>
      <a class="link" href="mailto:reservations@aurumpalace.com">✉ reservations@aurumpalace.com</a>
    </div>
    <div class="footer">Aurum Palace — Luxury Hotels &amp; Resorts · aurumpalace.com</div>
  </div>
</body>
</html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Aurum-Palace-Booking-${ref.current}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const [shareLabel, setShareLabel] = useState("Share");
  const handleShare = async () => {
    const text = `Aurum Palace Reservation\nRef: ${ref.current}\nGuest: ${capitalize(data.firstName)} ${capitalize(data.lastName)}\nSuite: ${data.suite?.name ?? "—"}\nDates: ${fmtLong(data.checkIn)} → ${fmtLong(data.checkOut)}\nTotal: $${total.toLocaleString()}`;
    if (navigator.share) {
      try { await navigator.share({ title: "Aurum Palace Booking", text }); } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      setShareLabel("Copied!");
      setTimeout(() => setShareLabel("Share"), 2500);
    }
  };

  return (
    <div style={{minHeight:"100vh",background:"#0A0F14",display:"flex",alignItems:"center",justifyContent:"center",padding:"80px 24px",position:"relative",overflow:"hidden"}}>
      {/* Falling gold lines */}
      {[...Array(10)].map((_,i) => (
        <motion.div key={i}
          style={{position:"absolute",width:1,height:48,background:"linear-gradient(to bottom, #D4AF37, transparent)",left:`${8+i*9}%`,top:"-5%",opacity:0.15}}
          animate={{y:["0vh","110vh"],opacity:[0,0.25,0]}}
          transition={{duration:3+Math.random()*2,delay:Math.random()*2,repeat:Infinity,ease:"linear"}}
        />
      ))}

      <motion.div
        initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5}}
        style={{width:"100%",maxWidth:640,position:"relative",zIndex:10}}
      >
        {/* Header */}
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:36}}>
          <motion.div
            initial={{scale:0,rotate:-90}} animate={{scale:1,rotate:0}}
            transition={{type:"spring",stiffness:220,damping:16,delay:0.15}}
            style={{width:72,height:72,borderRadius:"50%",background:"#D4AF37",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 50px rgba(212,175,55,0.35)",marginBottom:20}}
          >
            <Check size={32} color="#0A0F14" strokeWidth={2.5}/>
          </motion.div>
          <p style={{fontFamily:"Inter",fontSize:10,fontWeight:700,letterSpacing:"0.3em",textTransform:"uppercase",color:"#D4AF37",marginBottom:10}}>
            Reservation Confirmed
          </p>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:36,color:"#F0EDE8",fontWeight:300,textAlign:"center",lineHeight:1.2,marginBottom:8}}>
            Welcome, {capitalize(data.firstName)} {capitalize(data.lastName)}
          </h2>
          <p style={{fontFamily:"Inter",fontSize:13,color:"rgba(255,255,255,0.35)",textAlign:"center"}}>
            A confirmation has been sent to {data.email}
          </p>
        </div>

        {/* Card */}
        <div style={{background:"#111620",border:"1px solid rgba(255,255,255,0.12)",borderRadius:16,overflow:"hidden",marginBottom:20,boxShadow:"0 8px 40px rgba(0,0,0,0.6)"}}>
          {/* Gold top line */}
          <div style={{height:2,background:"linear-gradient(to right, transparent, #D4AF37 40%, rgba(212,175,55,0.3) 100%)"}}/>

          <div style={{padding:"28px 28px 24px"}}>
            {/* Ref + Total row */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24,paddingBottom:24,borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
              <div>
                <p style={{fontFamily:"Inter",fontSize:10,fontWeight:600,letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(255,255,255,0.25)",marginBottom:6}}>Booking Reference</p>
                <p style={{fontFamily:"'Courier New',monospace",fontSize:18,color:"#D4AF37",fontWeight:700,letterSpacing:"0.12em"}}>{ref.current}</p>
              </div>
              <div style={{textAlign:"right"}}>
                <p style={{fontFamily:"Inter",fontSize:10,fontWeight:600,letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(255,255,255,0.25)",marginBottom:6}}>Total Paid</p>
                <p style={{fontFamily:"Inter",fontSize:22,color:"#F0EDE8",fontWeight:600}}>${total.toLocaleString()}</p>
              </div>
            </div>

            {/* Detail grid */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px 32px",marginBottom:24,paddingBottom:24,borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
              {detailRows.map(r => (
                <div key={r.label}>
                  <p style={{fontFamily:"Inter",fontSize:10,fontWeight:600,letterSpacing:"0.14em",textTransform:"uppercase",color:"rgba(255,255,255,0.25)",marginBottom:5}}>{r.label}</p>
                  <p style={{fontFamily:"Inter",fontSize:14,color:"#F0EDE8",lineHeight:1.4}}>{r.value}</p>
                </div>
              ))}
            </div>

            {/* Assistance */}
            <div>
              <p style={{fontFamily:"Inter",fontSize:10,fontWeight:600,letterSpacing:"0.14em",textTransform:"uppercase",color:"rgba(255,255,255,0.25)",marginBottom:14}}>Need Assistance?</p>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                <a href="tel:+918001234567" style={{display:"flex",alignItems:"center",gap:10,fontFamily:"Inter",fontSize:13,color:"rgba(255,255,255,0.40)",textDecoration:"none"}}>
                  <Phone size={13} color="rgba(255,255,255,0.40)"/> +91 800 123 4567 (24/7 Concierge)
                </a>
                <a href="mailto:reservations@aurumpalace.com" style={{display:"flex",alignItems:"center",gap:10,fontFamily:"Inter",fontSize:13,color:"rgba(255,255,255,0.40)",textDecoration:"none"}}>
                  <Mail size={13} color="rgba(255,255,255,0.40)"/> reservations@aurumpalace.com
                </a>
              </div>
            </div>
          </div>

          {/* Gold bottom line */}
          <div style={{height:1,background:"linear-gradient(to right, transparent, rgba(212,175,55,0.25), transparent)"}}/>
        </div>

        {/* Action buttons */}
        <div style={{display:"flex",gap:12,marginBottom:24}}>
          <button onClick={handleDownload} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"15px",background:"#D4AF37",color:"#0A0F14",fontFamily:"Inter",fontSize:12,fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",border:"none",borderRadius:10,cursor:"pointer"}}>
            <Download size={14}/> Download
          </button>
          <button onClick={handleShare} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"15px",background:"transparent",color:"rgba(255,255,255,0.45)",fontFamily:"Inter",fontSize:12,fontWeight:500,letterSpacing:"0.15em",textTransform:"uppercase",border:"1px solid rgba(255,255,255,0.15)",borderRadius:10,cursor:"pointer"}}>
            <Share2 size={14}/> {shareLabel}
          </button>
        </div>

        {/* Return link */}
        <div style={{textAlign:"center"}}>
          <a href="/" style={{fontFamily:"Inter",fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:"rgba(255,255,255,0.22)",textDecoration:"none"}}>
            Return to Aurum Palace
          </a>
        </div>
      </motion.div>
    </div>
  );
}


export default function BookingFlow() {
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  const [data, setData] = useState<BookingState>({
    checkIn:"", checkOut:"", property:"", occasion:"Leisure",
    adults:2, children:0, suite:null,
    firstName:"", lastName:"", email:"", phone:"", requests:"",
    paymentMethod:"card", cardNumber:"", cardName:"", cardExpiry:"", cardCvv:"",
    promoCode:"", promoApplied:false,
  });

  const update = (key: keyof BookingState, value: any) =>
    setData(prev => ({ ...prev, [key]: value }));

  const n = nights(data.checkIn, data.checkOut);
  const step1Ok = !!data.checkIn && !!data.checkOut && !!data.property && !!data.suite && n > 0;
  const step2Ok = step1Ok && !!data.firstName && !!data.lastName && !!data.email && data.phone.length === 10;
  const step3Ok = step2Ok;

  const isDisabled =
    step === 1 ? !step1Ok :
    step === 2 ? !step2Ok :
    !step3Ok;

  const handleReserve = () => {
    if (step < 3 && !isDisabled) setStep(s => s + 1);
    else if (step === 3 && !isDisabled) setConfirmed(true);
  };

  if (confirmed) return <ConfirmationScreen data={data}/>;

  return (
    <>
      <style>{`
        .bk-page-wrap {
          width: 100%;
          min-height: 100vh;
          background: #0A0F14;
          padding: 96px 60px 80px 60px;
        }
        .bk-layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 20px;
          align-items: start;
        }
        .bk-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .bk-suite-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .bk-payment-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
          margin-bottom: 28px;
        }
        .bk-panel-pad {
          padding: 36px;
        }
        @media (max-width: 900px) {
          .bk-layout {
            grid-template-columns: 1fr;
          }
          .bk-page-wrap {
            padding: 120px 30px 60px 30px;
          }
        }
        @media (max-width: 600px) {
          .bk-page-wrap {
            padding: 120px 20px 40px 20px;
          }
          .bk-panel-pad {
            padding: 24px;
          }
          .bk-grid-2 {
            grid-template-columns: 1fr;
          }
          .bk-suite-grid {
            grid-template-columns: 1fr;
          }
          .bk-payment-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <div className="bk-page-wrap">
        <div style={{maxWidth:1280,margin:"0 auto"}}>

          {/* Page header */}
          <div style={{marginBottom:32}}>
            <p style={{fontFamily:"Inter",fontSize:11,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:"#D4AF37",marginBottom:8,opacity:0.9}}>
              Exclusive Reservation
            </p>
            <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(2rem, 5vw, 3.25rem)",color:"#F0EDE8",fontWeight:300,lineHeight:1.1,marginBottom:8}}>
              Reserve your suite
            </h1>
            <p style={{fontFamily:"Inter",fontSize:14,color:"rgba(255,255,255,0.35)",fontWeight:300}}>
              Complimentary concierge · Private check-in · 24h butler service
            </p>
          </div>

          <StepIndicator step={step}/>

          {/* Two-column layout */}
          <div className="bk-layout">

            {/* Left panel */}
            <div className="bk-panel bk-panel-pad">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="s1" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.3}}>
                  <DatesStep data={data} update={update}/>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="s2" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.3}}>
                  <GuestsStep data={data} update={update}/>
                </motion.div>
              )}
              {step === 3 && (
                <motion.div key="s3" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.3}}>
                  <ConfirmStep data={data} update={update}/>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom nav */}
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:32,paddingTop:24,borderTop:"1px solid rgba(255,255,255,0.08)"}}>
              {step > 1 ? (
                <button onClick={() => setStep(s => s - 1)} style={{fontFamily:"Inter",fontSize:12,letterSpacing:"0.12em",textTransform:"uppercase",color:"rgba(255,255,255,0.30)",background:"none",border:"none",cursor:"pointer"}}>
                  ← Back
                </button>
              ) : <div/>}
              <button
                onClick={handleReserve}
                disabled={isDisabled}
                style={{display:"flex",alignItems:"center",gap:8,background:"#D4AF37",color:"#0A0F14",fontFamily:"Inter",fontSize:12,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",padding:"14px 28px",border:"none",borderRadius:8,cursor:isDisabled?"not-allowed":"pointer",opacity:isDisabled?0.35:1,transition:"background 0.2s"}}
              >
                {step < 3 ? "Continue" : "Confirm Reservation"}
                <ArrowUpRight size={14} strokeWidth={2.5}/>
              </button>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="bk-panel" style={{padding:24,position:"sticky",top:112}}>
            <BookingSummary data={data} onReserve={handleReserve} disabled={isDisabled}/>
          </div>

        </div>
        </div>
      </div>
    </>
  );
}
