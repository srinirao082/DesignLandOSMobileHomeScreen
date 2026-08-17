import { useState, useEffect, useRef } from "react";
import {
  Search, MapPin, Bell, Heart, Map,
  SlidersHorizontal, Shield, Home, User, Bookmark,
  Building2, BedDouble, Bath, TrendingUp, BookOpen,
  ChevronDown, Zap, Star,
} from "lucide-react";
import { motion } from "motion/react";

// ─── Utilities ────────────────────────────────────────────────────────────────

const px = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

// ─── Static Data ──────────────────────────────────────────────────────────────

const BANNERS = [
  {
    id: 1,
    brand: "Prestige Group",
    sub: "Ultra-Luxury Residences · Whitefield, Bengaluru",
    cta: "View Project",
    badge: "Featured Builder",
    img: "1745301558339-44eb3217d5da",
  },
  {
    id: 2,
    brand: "Godrej Properties",
    sub: "Nature Plus · 3 & 4 BHK Villas, Gurgaon",
    cta: "Explore Now",
    badge: "New Launch",
    img: "1682662046610-fbdb3db4bd74",
  },
  {
    id: 3,
    brand: "Brigade Group",
    sub: "Meadows · Integrated Township Living, Bengaluru",
    cta: "Book a Visit",
    badge: "LandOS Partner",
    img: "1785402231092-859d0a6c4397",
  },
];

const FEATURED = [
  {
    id: 1,
    img: "1745301558339-44eb3217d5da",
    name: "Prestige City Heights",
    loc: "Whitefield, Bengaluru",
    price: "₹1.85 Cr",
    beds: 3,
    baths: 2,
    area: "1,450",
    tag: "RERA Approved",
    verified: true,
    rating: 4.8,
  },
  {
    id: 2,
    img: "1682662046610-fbdb3db4bd74",
    name: "Godrej Nature Plus",
    loc: "Sector 85, Gurgaon",
    price: "₹3.20 Cr",
    beds: 4,
    baths: 3,
    area: "2,800",
    tag: "Premium Villa",
    verified: true,
    rating: 4.9,
  },
  {
    id: 3,
    img: "1785402231092-859d0a6c4397",
    name: "Lodha Palava Sky",
    loc: "Dombivli, Mumbai",
    price: "₹92 L",
    beds: 2,
    baths: 2,
    area: "980",
    tag: "New Launch",
    verified: false,
    rating: 4.6,
  },
  {
    id: 4,
    img: "1682662046426-f7589013d25e",
    name: "DLF The Crest",
    loc: "Sector 54, Gurgaon",
    price: "₹6.50 Cr",
    beds: 3,
    baths: 4,
    area: "3,200",
    tag: "Luxury",
    verified: true,
    rating: 4.9,
  },
];

const CITIES = [
  { name: "Mumbai", img: "1594146032116-80033545b0b8", count: "14,200+" },
  { name: "Bengaluru", img: "1544641058-5db1620b8419", count: "11,800+" },
  { name: "Hyderabad", img: "1630123625375-1fce99d5d0dd", count: "8,400+" },
  { name: "Delhi NCR", img: "1723719523590-d5d2e0669e2e", count: "16,500+" },
  { name: "Pune", img: "1682662046426-f7589013d25e", count: "6,200+" },
  { name: "Chennai", img: "1785402231092-859d0a6c4397", count: "4,900+" },
];

const NEARBY = [
  {
    id: 5,
    img: "1630123625375-1fce99d5d0dd",
    name: "Sobha Dream Acres",
    loc: "Panathur, Bengaluru",
    price: "₹78 L",
    beds: 2,
    area: "1,100",
  },
  {
    id: 6,
    img: "1723719523590-d5d2e0669e2e",
    name: "Brigade Meadows",
    loc: "Kanakapura Rd",
    price: "₹1.12 Cr",
    beds: 3,
    area: "1,650",
  },
  {
    id: 7,
    img: "1704281008107-8658de07715d",
    name: "The Capital",
    loc: "BKC, Mumbai",
    price: "₹1.40 Cr",
    beds: 1,
    area: "620",
  },
  {
    id: 8,
    img: "1682662046457-74fd5b199b92",
    name: "Adarsh Palm Retreat",
    loc: "Bellandur, Bengaluru",
    price: "₹2.95 Cr",
    beds: 4,
    area: "2,400",
  },
];

const LAND = [
  {
    id: 9,
    img: "1699387840931-fbb6a6595f82",
    type: "Agricultural Land",
    area: "5 Acres",
    loc: "Ramanagara, Karnataka",
    price: "₹45 L / Acre",
    verified: true,
  },
  {
    id: 10,
    img: "1743065528943-438a6a981631",
    type: "Residential Plot",
    area: "2,400 sq.ft",
    loc: "Sarjapur, Bengaluru",
    price: "₹1.80 Cr",
    verified: true,
  },
  {
    id: 11,
    img: "1699387948969-af05ca0cdacc",
    type: "Farm Land",
    area: "12 Acres",
    loc: "Nandi Hills, Karnataka",
    price: "₹28 L / Acre",
    verified: false,
  },
];

const ARTICLES = [
  {
    id: 1,
    cat: "Market Insights",
    title: "Bengaluru Real Estate Sees 18% Price Surge in Eastern Micro-Markets",
    img: "1544641058-5db1620b8419",
    time: "4 min",
    date: "Aug 14",
  },
  {
    id: 2,
    cat: "Buying Guide",
    title: "How to Navigate RERA Registration Before Booking Your Flat",
    img: "1594146032116-80033545b0b8",
    time: "6 min",
    date: "Aug 12",
  },
  {
    id: 3,
    cat: "Land Information",
    title: "Understanding Encumbrance Certificates and Why They Matter",
    img: "1610296863551-1be6cfefefdb",
    time: "5 min",
    date: "Aug 10",
  },
  {
    id: 4,
    cat: "Locality Spotlight",
    title: "Sarjapur Road: The Next IT Corridor and What It Means for Buyers",
    img: "1723719523590-d5d2e0669e2e",
    time: "7 min",
    date: "Aug 8",
  },
];

const PRIMARY_ACTIONS = [
  {
    id: "buy",
    label: "BUY",
    sub: "Find your dream home",
    img: "1594146032116-80033545b0b8",
    icon: Home,
    grad: "linear-gradient(160deg, rgba(26,63,181,0.88) 0%, rgba(13,37,128,0.72) 100%)",
  },
  {
    id: "rent",
    label: "RENT",
    sub: "Explore rentals near you",
    img: "1745301558339-44eb3217d5da",
    icon: Building2,
    grad: "linear-gradient(160deg, rgba(6,78,59,0.85) 0%, rgba(2,44,34,0.70) 100%)",
  },
  {
    id: "sell",
    label: "SELL",
    sub: "List your property free",
    img: "1723719523590-d5d2e0669e2e",
    icon: TrendingUp,
    grad: "linear-gradient(160deg, rgba(120,53,15,0.85) 0%, rgba(59,26,5,0.70) 100%)",
  },
  {
    id: "verify",
    label: "VERIFY",
    sub: "GIS-powered land check",
    img: "1699387948969-af05ca0cdacc",
    icon: Shield,
    grad: "linear-gradient(160deg, rgba(30,58,138,0.90) 0%, rgba(26,79,214,0.60) 100%)",
    signature: true,
  },
];

const NAV_TABS = [
  { id: "home", label: "Home", icon: Home },
  { id: "search", label: "Search", icon: Search },
  { id: "saved", label: "Saved", icon: Bookmark },
  { id: "profile", label: "Profile", icon: User },
];

// ─── Section header ───────────────────────────────────────────────────────────

function SectionHead({
  title,
  sub,
  cta = "See all",
}: {
  title: string;
  sub?: string;
  cta?: string;
}) {
  return (
    <div className="px-4 mb-3">
      <div className="flex items-end justify-between">
        <div>
          <h2
            className="text-[15px] text-[#0d0d0d]"
            style={{ fontWeight: 700, letterSpacing: "-0.2px" }}
          >
            {title}
          </h2>
          {sub && (
            <p className="text-[11px] text-[#9ca3af] mt-0.5" style={{ fontWeight: 500 }}>
              {sub}
            </p>
          )}
        </div>
        <button className="text-[12px] text-[#1a4fd6]" style={{ fontWeight: 600 }}>
          {cta}
        </button>
      </div>
    </div>
  );
}

// ─── Status Bar ───────────────────────────────────────────────────────────────

function StatusBar() {
  return (
    <div
      className="flex items-center justify-between z-20"
      style={{ padding: "14px 28px 8px 28px" }}
    >
      <span className="text-[13.5px] text-[#0d0d0d]" style={{ fontWeight: 700 }}>
        9:41
      </span>
      <div style={{ width: 120 }} />
      <div className="flex items-center gap-1.5">
        {/* Signal bars */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="6" width="3" height="6" rx="0.8" fill="#0d0d0d" />
          <rect x="4.5" y="3.5" width="3" height="8.5" rx="0.8" fill="#0d0d0d" />
          <rect x="9" y="1.5" width="3" height="10.5" rx="0.8" fill="#0d0d0d" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.8" fill="#0d0d0d" />
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <circle cx="8" cy="10.5" r="1.5" fill="#0d0d0d" />
          <path
            d="M3.8 6.8C5.1 5.3 6.5 4.5 8 4.5s2.9.8 4.2 2.3"
            stroke="#0d0d0d"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M1 3.5C3.2 1.3 5.5 0 8 0s4.8 1.3 7 3.5"
            stroke="#0d0d0d"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        {/* Battery */}
        <div className="flex items-center gap-[1px]">
          <div
            className="flex items-center p-[1.5px]"
            style={{
              width: 24,
              height: 12,
              border: "1px solid #0d0d0d",
              borderRadius: 3,
            }}
          >
            <div
              style={{
                width: "80%",
                height: "100%",
                background: "#0d0d0d",
                borderRadius: 1.5,
              }}
            />
          </div>
          <div
            style={{ width: 2, height: 5, background: "#0d0d0d", borderRadius: "0 1px 1px 0" }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── App Header ───────────────────────────────────────────────────────────────

function AppHeader() {
  return (
    <div
      className="sticky top-0 bg-white z-20 flex items-center justify-between"
      style={{
        padding: "10px 16px 10px 16px",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div
          className="flex items-center justify-center"
          style={{ width: 34, height: 34, background: "#1a4fd6", borderRadius: 10 }}
        >
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
            <path
              d="M4 14.5V9L9.5 5.5 15 9v5.5"
              stroke="white"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="7"
              y="10"
              width="5"
              height="4.5"
              rx="0.8"
              stroke="white"
              strokeWidth="1.4"
            />
            <circle cx="14" cy="5" r="3.2" fill="#93c5fd" />
            <path
              d="M14 3.6v1.5l1.1 1.1"
              stroke="white"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div style={{ lineHeight: 1 }}>
          <span
            className="text-[#0d0d0d]"
            style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px" }}
          >
            Land
          </span>
          <span
            className="text-[#1a4fd6]"
            style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px" }}
          >
            OS
          </span>
        </div>
      </div>

      {/* Location */}
      <button
        className="flex items-center gap-1"
        style={{
          background: "#f3f4f8",
          borderRadius: 99,
          padding: "7px 12px",
        }}
      >
        <MapPin style={{ width: 12, height: 12, color: "#1a4fd6" }} />
        <span className="text-[#0d0d0d]" style={{ fontSize: 12, fontWeight: 600 }}>
          Mumbai, MH
        </span>
        <ChevronDown style={{ width: 11, height: 11, color: "#9ca3af" }} />
      </button>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          className="relative flex items-center justify-center"
          style={{ width: 34, height: 34, background: "#f3f4f8", borderRadius: 99 }}
        >
          <Bell style={{ width: 16, height: 16, color: "#0d0d0d" }} />
          <span
            className="absolute border-[1.5px] border-white"
            style={{
              top: 7,
              right: 7,
              width: 8,
              height: 8,
              background: "#1a4fd6",
              borderRadius: 99,
            }}
          />
        </button>
        <button
          className="flex items-center justify-center text-[#1a4fd6]"
          style={{
            width: 34,
            height: 34,
            background: "#dbeafe",
            borderRadius: 99,
            fontSize: 12,
            fontWeight: 800,
          }}
        >
          RK
        </button>
      </div>
    </div>
  );
}

// ─── Search Bar ───────────────────────────────────────────────────────────────

function SearchBar() {
  return (
    <div className="flex gap-2.5" style={{ padding: "14px 16px 0 16px" }}>
      <div
        className="flex flex-1 items-center gap-2.5"
        style={{ background: "#f3f4f8", borderRadius: 18, padding: "11px 14px" }}
      >
        <Search style={{ width: 16, height: 16, color: "#9ca3af", flexShrink: 0 }} />
        <input
          className="flex-1 bg-transparent outline-none text-[#0d0d0d] placeholder:text-[#9ca3af]"
          style={{ fontSize: 13, fontWeight: 500 }}
          placeholder="Search properties, localities, cities..."
        />
      </div>
      <button
        className="flex items-center justify-center"
        style={{
          width: 46,
          height: 46,
          background: "#1a4fd6",
          borderRadius: 16,
          flexShrink: 0,
          boxShadow: "0 4px 14px rgba(26,79,214,0.38)",
        }}
      >
        <SlidersHorizontal style={{ width: 17, height: 17, color: "white" }} />
      </button>
    </div>
  );
}

// ─── Primary Actions ──────────────────────────────────────────────────────────

function PrimaryActions() {
  return (
    <div style={{ padding: "20px 16px 0 16px" }}>
      <p
        className="text-[#9ca3af] uppercase mb-3"
        style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.8px" }}
      >
        What are you looking for?
      </p>
      <div className="grid grid-cols-2 gap-2.5">
        {PRIMARY_ACTIONS.map((action, i) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07, duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden text-left"
              style={{ height: 120, borderRadius: 20 }}
            >
              <img
                src={px(action.img, 380, 240)}
                alt={action.label}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: action.grad }} />
              <div className="relative h-full flex flex-col justify-between" style={{ padding: 14 }}>
                <div className="flex items-start justify-between">
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 10,
                      background: "rgba(255,255,255,0.18)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <Icon style={{ width: 15, height: 15, color: "white" }} />
                  </div>
                  {action.signature && (
                    <span
                      className="text-white"
                      style={{
                        fontSize: 8,
                        fontWeight: 800,
                        letterSpacing: "0.8px",
                        background: "rgba(26,79,214,0.9)",
                        padding: "3px 7px",
                        borderRadius: 99,
                      }}
                    >
                      LANDOS
                    </span>
                  )}
                </div>
                <div>
                  <div
                    className="text-white"
                    style={{ fontSize: 17, fontWeight: 800, letterSpacing: "0.2px" }}
                  >
                    {action.label}
                  </div>
                  <div
                    className="text-white/65 leading-tight"
                    style={{ fontSize: 10, fontWeight: 500, marginTop: 2 }}
                  >
                    {action.sub}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Promo Banner Carousel ────────────────────────────────────────────────────

function PromoBanner() {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(
      () => setIdx((i) => (i + 1) % BANNERS.length),
      4200
    );
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div style={{ marginTop: 24, marginBottom: 0 }}>
      <SectionHead title="Featured Builders" cta="View All" />
      <div style={{ padding: "0 16px" }}>
        <div className="relative overflow-hidden" style={{ borderRadius: 20, height: 178 }}>
          {BANNERS.map((b, i) => (
            <div
              key={b.id}
              className="absolute inset-0 transition-all duration-500"
              style={{ opacity: i === idx ? 1 : 0, pointerEvents: i === idx ? "auto" : "none" }}
            >
              <img
                src={px(b.img, 800, 356)}
                alt={b.brand}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.28) 55%, transparent 100%)",
                }}
              />
              <div className="absolute inset-0 flex flex-col justify-between" style={{ padding: 18 }}>
                <span
                  className="self-start text-white"
                  style={{
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: "0.8px",
                    background: "#1a4fd6",
                    padding: "4px 10px",
                    borderRadius: 99,
                  }}
                >
                  {b.badge.toUpperCase()}
                </span>
                <div>
                  <div
                    className="text-white"
                    style={{ fontSize: 18, fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.3px" }}
                  >
                    {b.brand}
                  </div>
                  <div className="text-white/70" style={{ fontSize: 11, fontWeight: 500, marginTop: 4 }}>
                    {b.sub}
                  </div>
                  <button
                    className="text-[#0d0d0d] bg-white"
                    style={{
                      marginTop: 12,
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "7px 16px",
                      borderRadius: 99,
                    }}
                  >
                    {b.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Dots */}
        <div className="flex justify-center gap-1.5" style={{ marginTop: 10 }}>
          {BANNERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              style={{
                height: 6,
                width: i === idx ? 20 : 6,
                borderRadius: 99,
                background: i === idx ? "#1a4fd6" : "#d1d5db",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Featured Properties (horizontal scroll) ──────────────────────────────────

function FeaturedProperties({
  liked,
  onToggle,
}: {
  liked: Set<number>;
  onToggle: (id: number) => void;
}) {
  return (
    <div style={{ marginTop: 24 }}>
      <SectionHead title="Featured Properties" />
      <div
        className="flex overflow-x-auto"
        style={{ gap: 12, padding: "0 16px 2px 16px", scrollbarWidth: "none" }}
      >
        {FEATURED.map((p) => (
          <div
            key={p.id}
            className="shrink-0 bg-white overflow-hidden"
            style={{
              width: 200,
              borderRadius: 18,
              boxShadow: "0 2px 18px rgba(0,0,0,0.08)",
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <div className="relative bg-gray-100" style={{ height: 132 }}>
              <img
                src={px(p.img, 400, 264)}
                alt={p.name}
                className="w-full h-full object-cover"
              />
              {/* Like */}
              <button
                onClick={() => onToggle(p.id)}
                className="absolute flex items-center justify-center"
                style={{
                  top: 10,
                  right: 10,
                  width: 28,
                  height: 28,
                  background: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(4px)",
                  borderRadius: 99,
                }}
              >
                <Heart
                  style={{
                    width: 14,
                    height: 14,
                    color: liked.has(p.id) ? "#ef4444" : "#9ca3af",
                    fill: liked.has(p.id) ? "#ef4444" : "transparent",
                  }}
                />
              </button>
              {/* Tag */}
              {p.tag && (
                <span
                  className="absolute text-[#0d0d0d]"
                  style={{
                    bottom: 10,
                    left: 10,
                    fontSize: 9,
                    fontWeight: 700,
                    background: "rgba(255,255,255,0.92)",
                    padding: "3px 8px",
                    borderRadius: 99,
                  }}
                >
                  {p.tag}
                </span>
              )}
              {/* Verified badge */}
              {p.verified && (
                <div
                  className="absolute flex items-center gap-0.5 text-white"
                  style={{
                    top: 10,
                    left: 10,
                    fontSize: 8,
                    fontWeight: 700,
                    background: "#1a4fd6",
                    padding: "3px 7px",
                    borderRadius: 99,
                  }}
                >
                  <Shield style={{ width: 9, height: 9 }} /> Verified
                </div>
              )}
            </div>
            <div style={{ padding: 12 }}>
              <div
                className="text-[#0d0d0d] truncate"
                style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.3 }}
              >
                {p.name}
              </div>
              <div className="flex items-center gap-1" style={{ marginTop: 3 }}>
                <MapPin style={{ width: 10, height: 10, color: "#9ca3af", flexShrink: 0 }} />
                <span
                  className="text-[#9ca3af] truncate"
                  style={{ fontSize: 10, fontWeight: 500 }}
                >
                  {p.loc}
                </span>
              </div>
              {/* Rating */}
              <div className="flex items-center gap-1" style={{ marginTop: 5 }}>
                <Star
                  style={{ width: 10, height: 10, color: "#f59e0b", fill: "#f59e0b" }}
                />
                <span
                  className="text-[#0d0d0d]"
                  style={{ fontSize: 10, fontWeight: 700 }}
                >
                  {p.rating}
                </span>
              </div>
              <div
                className="text-[#1a4fd6]"
                style={{ fontSize: 16, fontWeight: 800, marginTop: 6 }}
              >
                {p.price}
              </div>
              <div
                className="flex items-center gap-2.5 text-[#9ca3af]"
                style={{
                  marginTop: 8,
                  paddingTop: 8,
                  borderTop: "1px solid rgba(0,0,0,0.06)",
                  fontSize: 10,
                  fontWeight: 500,
                }}
              >
                <span className="flex items-center gap-0.5">
                  <BedDouble style={{ width: 11, height: 11 }} />
                  {p.beds} Bd
                </span>
                <span className="flex items-center gap-0.5">
                  <Bath style={{ width: 11, height: 11 }} />
                  {p.baths} Ba
                </span>
                <span>{p.area} sqft</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Popular Cities ───────────────────────────────────────────────────────────

function PopularCities() {
  return (
    <div style={{ marginTop: 24 }}>
      <SectionHead title="Popular Cities" cta="View all" />
      <div
        className="flex overflow-x-auto"
        style={{ gap: 14, padding: "0 16px 2px 16px", scrollbarWidth: "none" }}
      >
        {CITIES.map((c) => (
          <button key={c.name} className="shrink-0 flex flex-col items-center gap-1.5">
            <div
              className="overflow-hidden bg-gray-100"
              style={{ width: 64, height: 64, borderRadius: 20 }}
            >
              <img
                src={px(c.img, 128, 128)}
                alt={c.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[#0d0d0d]" style={{ fontSize: 11, fontWeight: 700 }}>
              {c.name}
            </span>
            <span
              className="text-[#9ca3af]"
              style={{ fontSize: 9.5, fontWeight: 500, marginTop: -4 }}
            >
              {c.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Promo Strip ──────────────────────────────────────────────────────────────

function PromoStrip() {
  return (
    <div
      className="flex items-center gap-3"
      style={{
        margin: "20px 16px 0 16px",
        padding: "14px 16px",
        background: "linear-gradient(130deg, #eef2ff 0%, #f0f9ff 100%)",
        border: "1px solid #c7d7fd",
        borderRadius: 18,
      }}
    >
      <div
        className="flex items-center justify-center shrink-0"
        style={{ width: 42, height: 42, background: "#1a4fd6", borderRadius: 13 }}
      >
        <Zap style={{ width: 20, height: 20, color: "white" }} />
      </div>
      <div className="flex-1">
        <div className="text-[#1a4fd6]" style={{ fontSize: 12, fontWeight: 700 }}>
          Post Your Property FREE
        </div>
        <div className="text-[#6b7280]" style={{ fontSize: 10, fontWeight: 500, marginTop: 2 }}>
          Reach 2 Lakh+ verified buyers today
        </div>
      </div>
      <button
        className="text-white whitespace-nowrap"
        style={{
          fontSize: 11,
          fontWeight: 700,
          background: "#1a4fd6",
          padding: "7px 14px",
          borderRadius: 99,
        }}
      >
        List Now
      </button>
    </div>
  );
}

// ─── Nearby Properties ────────────────────────────────────────────────────────

function NearbyProperties({
  liked,
  onToggle,
}: {
  liked: Set<number>;
  onToggle: (id: number) => void;
}) {
  return (
    <div style={{ marginTop: 24 }}>
      <SectionHead title="Near You" sub="Properties within 5 km of your location" />
      <div className="grid grid-cols-2 gap-2.5" style={{ padding: "0 16px" }}>
        {NEARBY.map((p) => (
          <div
            key={p.id}
            className="overflow-hidden bg-white"
            style={{
              borderRadius: 16,
              boxShadow: "0 2px 14px rgba(0,0,0,0.07)",
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <div className="relative bg-gray-100" style={{ height: 96 }}>
              <img
                src={px(p.img, 300, 192)}
                alt={p.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => onToggle(p.id)}
                className="absolute flex items-center justify-center"
                style={{
                  top: 8,
                  right: 8,
                  width: 24,
                  height: 24,
                  background: "rgba(255,255,255,0.9)",
                  borderRadius: 99,
                }}
              >
                <Heart
                  style={{
                    width: 11,
                    height: 11,
                    color: liked.has(p.id) ? "#ef4444" : "#9ca3af",
                    fill: liked.has(p.id) ? "#ef4444" : "transparent",
                  }}
                />
              </button>
            </div>
            <div style={{ padding: "10px 10px 12px 10px" }}>
              <div
                className="text-[#0d0d0d] truncate"
                style={{ fontSize: 11, fontWeight: 700, lineHeight: 1.3 }}
              >
                {p.name}
              </div>
              <div className="text-[#9ca3af] truncate" style={{ fontSize: 10, marginTop: 2 }}>
                {p.loc}
              </div>
              <div
                className="text-[#1a4fd6]"
                style={{ fontSize: 13, fontWeight: 800, marginTop: 5 }}
              >
                {p.price}
              </div>
              <div className="text-[#9ca3af]" style={{ fontSize: 9.5, marginTop: 2 }}>
                {p.beds} Bd · {p.area} sqft
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Newly Listed ─────────────────────────────────────────────────────────────

function NewlyListed() {
  const props = [...FEATURED].reverse();
  return (
    <div style={{ marginTop: 24 }}>
      <SectionHead title="Newly Listed" sub="Added in the last 48 hours" />
      <div
        className="flex overflow-x-auto"
        style={{ gap: 10, padding: "0 16px 2px 16px", scrollbarWidth: "none" }}
      >
        {props.map((p) => (
          <div
            key={p.id}
            className="shrink-0 flex gap-2.5 bg-white"
            style={{
              width: 222,
              padding: 10,
              borderRadius: 16,
              boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <div
              className="overflow-hidden bg-gray-100 shrink-0"
              style={{ width: 66, height: 66, borderRadius: 12 }}
            >
              <img
                src={px(p.img, 132, 132)}
                alt={p.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span
                className="text-green-700"
                style={{
                  fontSize: 8,
                  fontWeight: 800,
                  background: "#d1fae5",
                  padding: "2px 7px",
                  borderRadius: 99,
                }}
              >
                NEW
              </span>
              <div
                className="text-[#0d0d0d] truncate"
                style={{ fontSize: 11, fontWeight: 700, marginTop: 4, lineHeight: 1.3 }}
              >
                {p.name}
              </div>
              <div className="text-[#9ca3af] truncate" style={{ fontSize: 10, marginTop: 2 }}>
                {p.loc}
              </div>
              <div
                className="text-[#1a4fd6]"
                style={{ fontSize: 12, fontWeight: 800, marginTop: 5 }}
              >
                {p.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Land & Plots ─────────────────────────────────────────────────────────────

function LandAndPlots() {
  return (
    <div style={{ marginTop: 24 }}>
      <SectionHead title="Land & Plots" sub="Agriculture, residential & farm lands" />
      <div className="flex flex-col" style={{ gap: 10, padding: "0 16px" }}>
        {LAND.map((p) => (
          <div
            key={p.id}
            className="flex overflow-hidden bg-white"
            style={{
              borderRadius: 16,
              boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <div
              className="relative bg-gray-100 shrink-0"
              style={{ width: 96, height: 88 }}
            >
              <img
                src={px(p.img, 192, 176)}
                alt={p.type}
                className="w-full h-full object-cover"
              />
              {p.verified && (
                <div
                  className="absolute flex items-center gap-0.5 text-white"
                  style={{
                    bottom: 6,
                    left: 6,
                    fontSize: 7.5,
                    fontWeight: 700,
                    background: "#1a4fd6",
                    padding: "2px 6px",
                    borderRadius: 99,
                  }}
                >
                  <Shield style={{ width: 8, height: 8 }} /> Verified
                </div>
              )}
            </div>
            <div
              className="flex flex-col justify-between flex-1 min-w-0"
              style={{ padding: "12px 12px 12px 12px" }}
            >
              <div>
                <span
                  className="text-[#9ca3af] uppercase"
                  style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.5px" }}
                >
                  {p.type}
                </span>
                <div
                  className="text-[#0d0d0d]"
                  style={{ fontSize: 13, fontWeight: 700, marginTop: 2, lineHeight: 1.2 }}
                >
                  {p.area}
                </div>
                <div className="flex items-center gap-1" style={{ marginTop: 3 }}>
                  <MapPin style={{ width: 10, height: 10, color: "#9ca3af", flexShrink: 0 }} />
                  <span className="text-[#9ca3af] truncate" style={{ fontSize: 10 }}>
                    {p.loc}
                  </span>
                </div>
              </div>
              <div className="text-[#1a4fd6]" style={{ fontSize: 13, fontWeight: 800 }}>
                {p.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Explore on Map ───────────────────────────────────────────────────────────

function ExploreOnMap() {
  return (
    <div style={{ margin: "24px 16px 0 16px" }}>
      <div
        className="relative overflow-hidden"
        style={{ borderRadius: 22, height: 136 }}
      >
        <img
          src={px("1544641058-5db1620b8419", 800, 272)}
          alt="Explore properties on map"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(13,42,122,0.90) 0%, rgba(26,79,214,0.48) 65%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0 flex items-center justify-between"
          style={{ padding: "0 20px" }}
        >
          <div>
            <p
              className="text-blue-300 uppercase"
              style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "1px" }}
            >
              Interactive GIS
            </p>
            <h3
              className="text-white"
              style={{ fontSize: 19, fontWeight: 800, lineHeight: 1.2, marginTop: 4, letterSpacing: "-0.3px" }}
            >
              Explore on Map
            </h3>
            <p className="text-white/55" style={{ fontSize: 10.5, marginTop: 4 }}>
              Search properties by drawing on the map
            </p>
          </div>
          <button
            className="flex items-center gap-1.5 bg-white text-[#1a4fd6]"
            style={{
              fontSize: 11.5,
              fontWeight: 700,
              padding: "9px 14px",
              borderRadius: 16,
              boxShadow: "0 4px 16px rgba(0,0,0,0.22)",
              flexShrink: 0,
            }}
          >
            <Map style={{ width: 14, height: 14 }} /> Open Map
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Insights & Articles ──────────────────────────────────────────────────────

function Insights() {
  return (
    <div style={{ marginTop: 24 }}>
      {/* Section header */}
      <div className="px-4 mb-3 flex items-end justify-between">
        <div className="flex items-center gap-2">
          <BookOpen style={{ width: 15, height: 15, color: "#1a4fd6" }} />
          <h2
            className="text-[#0d0d0d]"
            style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.2px" }}
          >
            LandOS Insights
          </h2>
        </div>
        <button className="text-[#1a4fd6]" style={{ fontSize: 12, fontWeight: 600 }}>
          All articles
        </button>
      </div>

      {/* Hero article card */}
      <div className="relative overflow-hidden" style={{ margin: "0 16px", borderRadius: 20, height: 152 }}>
        <img
          src={px("1594146032116-80033545b0b8", 800, 304)}
          alt="India Real Estate Q3 Market Report"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.12) 55%, transparent 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0" style={{ padding: 16 }}>
          <span
            className="text-blue-300 uppercase"
            style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.8px" }}
          >
            Market Report · Q3 2024
          </span>
          <p
            className="text-white"
            style={{ fontSize: 13.5, fontWeight: 700, lineHeight: 1.35, marginTop: 4 }}
          >
            India Real Estate: Q3 Outlook and Where Prices Are Headed
          </p>
          <p className="text-white/50" style={{ fontSize: 10, marginTop: 5 }}>
            Aug 15 · 8 min read
          </p>
        </div>
      </div>

      {/* Horizontal scroll promo between featured and article list */}
      <div
        className="flex overflow-x-auto"
        style={{ gap: 10, padding: "14px 16px 0 16px", scrollbarWidth: "none" }}
      >
        {["Buyer's Guide 2024", "Plot Investment 101", "RERA Explained"].map((t) => (
          <button
            key={t}
            className="shrink-0 flex items-center gap-1.5"
            style={{
              background: "#f3f4f8",
              padding: "8px 14px",
              borderRadius: 99,
              fontSize: 11,
              fontWeight: 600,
              color: "#0d0d0d",
              whiteSpace: "nowrap",
            }}
          >
            <BookOpen style={{ width: 11, height: 11, color: "#1a4fd6" }} />
            {t}
          </button>
        ))}
      </div>

      {/* Article list */}
      <div style={{ padding: "8px 16px 0 16px" }}>
        {ARTICLES.map((a, i) => (
          <div
            key={a.id}
            className="flex gap-3"
            style={{
              paddingTop: 14,
              paddingBottom: 14,
              borderBottom:
                i < ARTICLES.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
            }}
          >
            <div className="flex-1 min-w-0">
              <span
                className="text-[#1a4fd6] uppercase"
                style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.5px" }}
              >
                {a.cat}
              </span>
              <p
                className="text-[#0d0d0d]"
                style={{
                  fontSize: 12.5,
                  fontWeight: 700,
                  lineHeight: 1.4,
                  marginTop: 3,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical" as const,
                  overflow: "hidden",
                }}
              >
                {a.title}
              </p>
              <p className="text-[#9ca3af]" style={{ fontSize: 10, fontWeight: 500, marginTop: 5 }}>
                {a.date} · {a.time} read
              </p>
            </div>
            <div
              className="overflow-hidden bg-gray-100 shrink-0"
              style={{ width: 80, height: 68, borderRadius: 12 }}
            >
              <img
                src={px(a.img, 160, 136)}
                alt={a.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Bottom Navigation ────────────────────────────────────────────────────────

function BottomNav({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div
      className="shrink-0 flex bg-white"
      style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
    >
      {NAV_TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            className="flex-1 flex flex-col items-center"
            style={{ paddingTop: 10, paddingBottom: 22, gap: 3 }}
          >
            <Icon
              style={{
                width: 21,
                height: 21,
                color: isActive ? "#1a4fd6" : "#9ca3af",
                strokeWidth: isActive ? 2.2 : 1.8,
              }}
            />
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: isActive ? "#1a4fd6" : "#9ca3af",
              }}
            >
              {tab.label}
            </span>
            {isActive && (
              <span
                style={{
                  position: "absolute",
                  width: 4,
                  height: 4,
                  borderRadius: 99,
                  background: "#1a4fd6",
                  marginTop: 34,
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeNav, setActiveNav] = useState("home");
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const toggleLike = (id: number) =>
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "linear-gradient(145deg, #080e1e 0%, #0d1f3c 50%, #0a1225 100%)",
        padding: "16px",
      }}
    >
      {/* Phone Frame */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-white flex flex-col overflow-hidden"
        style={{
          width: 390,
          height: "min(844px, 92vh)",
          borderRadius: 48,
          boxShadow:
            "0 0 0 10px #111827, 0 0 0 11px #1f2937, 0 40px 100px rgba(0,0,0,0.75)",
        }}
      >
        {/* Dynamic Island */}
        <div
          className="absolute bg-black z-30"
          style={{
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            width: 122,
            height: 34,
            borderRadius: 99,
          }}
        />

        {/* Status Bar */}
        <div className="shrink-0 z-20">
          <StatusBar />
        </div>

        {/* Scrollable Content */}
        <div
          className="flex-1 overflow-y-auto"
          style={{ scrollbarWidth: "none" }}
        >
          <AppHeader />
          <SearchBar />
          <PrimaryActions />
          <PromoBanner />
          <FeaturedProperties liked={liked} onToggle={toggleLike} />
          <PopularCities />
          <PromoStrip />
          <NearbyProperties liked={liked} onToggle={toggleLike} />
          <NewlyListed />
          <LandAndPlots />
          <ExploreOnMap />
          <Insights />

          {/* Bottom spacer so last content clears nav */}
          <div style={{ height: 16 }} />
        </div>

        {/* Bottom Navigation */}
        <BottomNav active={activeNav} onSelect={setActiveNav} />
      </motion.div>

      {/* Label under phone */}
      <div
        className="absolute text-white/30 text-center"
        style={{
          bottom: 12,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 11,
          fontWeight: 500,
          whiteSpace: "nowrap",
        }}
      >
        LandOS · Premium Indian Real Estate · iOS & Android
      </div>
    </div>
  );
}
