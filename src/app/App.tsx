import { useState, useEffect, useRef } from "react";
import {
  Search, MapPin, Bell, Heart, Map, SlidersHorizontal, Shield,
  Home, User, Bookmark, Building2, BedDouble, Bath, TrendingUp,
  BookOpen, ChevronDown, Zap, Star,
  ArrowLeft, ChevronRight, Check, X, HardHat, TreePine,
  Sprout, Leaf, Factory, Briefcase, ShoppingBag, Store,
  Warehouse, LayoutGrid, Landmark, Crown, Headphones, Lock,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// ─── Utility ─────────────────────────────────────────────────────────────────

const px = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

// ─── Home Screen Data ─────────────────────────────────────────────────────────

const BANNERS = [
  { id: 1, brand: "Prestige Group", sub: "Ultra-Luxury Residences · Whitefield, Bengaluru", cta: "View Project", badge: "Featured Builder", img: "1745301558339-44eb3217d5da" },
  { id: 2, brand: "Godrej Properties", sub: "Nature Plus · 3 & 4 BHK Villas, Gurgaon", cta: "Explore Now", badge: "New Launch", img: "1682662046610-fbdb3db4bd74" },
  { id: 3, brand: "Brigade Group", sub: "Meadows · Integrated Township Living, Bengaluru", cta: "Book a Visit", badge: "LandOS Partner", img: "1785402231092-859d0a6c4397" },
];

const FEATURED = [
  { id: 1, img: "1745301558339-44eb3217d5da", name: "Prestige City Heights", loc: "Whitefield, Bengaluru", price: "₹1.85 Cr", beds: 3, baths: 2, area: "1,450", tag: "RERA Approved", verified: true, rating: 4.8 },
  { id: 2, img: "1682662046610-fbdb3db4bd74", name: "Godrej Nature Plus", loc: "Sector 85, Gurgaon", price: "₹3.20 Cr", beds: 4, baths: 3, area: "2,800", tag: "Premium Villa", verified: true, rating: 4.9 },
  { id: 3, img: "1785402231092-859d0a6c4397", name: "Lodha Palava Sky", loc: "Dombivli, Mumbai", price: "₹92 L", beds: 2, baths: 2, area: "980", tag: "New Launch", verified: false, rating: 4.6 },
  { id: 4, img: "1682662046426-f7589013d25e", name: "DLF The Crest", loc: "Sector 54, Gurgaon", price: "₹6.50 Cr", beds: 3, baths: 4, area: "3,200", tag: "Luxury", verified: true, rating: 4.9 },
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
  { id: 5, img: "1630123625375-1fce99d5d0dd", name: "Sobha Dream Acres", loc: "Panathur, Bengaluru", price: "₹78 L", beds: 2, baths: 2, area: "1,100", verified: true },
  { id: 6, img: "1723719523590-d5d2e0669e2e", name: "Brigade Meadows", loc: "Kanakapura Rd", price: "₹1.12 Cr", beds: 3, baths: 2, area: "1,650", verified: true },
  { id: 7, img: "1704281008107-8658de07715d", name: "The Capital", loc: "BKC, Mumbai", price: "₹1.40 Cr", beds: 1, baths: 1, area: "620", verified: false },
  { id: 8, img: "1682662046457-74fd5b199b92", name: "Adarsh Palm Retreat", loc: "Bellandur, Bengaluru", price: "₹2.95 Cr", beds: 4, baths: 3, area: "2,400", verified: true },
];

const LAND = [
  { id: 9, img: "1699387840931-fbb6a6595f82", type: "Agricultural Land", area: "5 Acres", loc: "Ramanagara, Karnataka", price: "₹45 L / Acre", verified: true },
  { id: 10, img: "1743065528943-438a6a981631", type: "Residential Plot", area: "2,400 sq.ft", loc: "Sarjapur, Bengaluru", price: "₹1.80 Cr", verified: true },
  { id: 11, img: "1699387948969-af05ca0cdacc", type: "Farm Land", area: "12 Acres", loc: "Nandi Hills, Karnataka", price: "₹28 L / Acre", verified: false },
];

const ARTICLES = [
  { id: 1, cat: "Market Insights", title: "Bengaluru Real Estate Sees 18% Price Surge in Eastern Micro-Markets", img: "1544641058-5db1620b8419", time: "4 min", date: "Aug 14" },
  { id: 2, cat: "Buying Guide", title: "How to Navigate RERA Registration Before Booking Your Flat", img: "1594146032116-80033545b0b8", time: "6 min", date: "Aug 12" },
  { id: 3, cat: "Land Information", title: "Understanding Encumbrance Certificates and Why They Matter", img: "1610296863551-1be6cfefefdb", time: "5 min", date: "Aug 10" },
  { id: 4, cat: "Locality Spotlight", title: "Sarjapur Road: The Next IT Corridor and What It Means for Buyers", img: "1723719523590-d5d2e0669e2e", time: "7 min", date: "Aug 8" },
];

const HOME_ACTIONS = [
  { id: "buy", label: "BUY", sub: "Find your dream home", img: "1594146032116-80033545b0b8", icon: Home, grad: "linear-gradient(160deg,rgba(26,63,181,.88),rgba(13,37,128,.72))" },
  { id: "rent", label: "RENT", sub: "Explore rentals near you", img: "1745301558339-44eb3217d5da", icon: Building2, grad: "linear-gradient(160deg,rgba(6,78,59,.85),rgba(2,44,34,.70))" },
  { id: "sell", label: "SELL", sub: "List your property free", img: "1723719523590-d5d2e0669e2e", icon: TrendingUp, grad: "linear-gradient(160deg,rgba(120,53,15,.85),rgba(59,26,5,.70))" },
  { id: "verify", label: "VERIFY", sub: "GIS-powered land check", img: "1699387948969-af05ca0cdacc", icon: Shield, grad: "linear-gradient(160deg,rgba(30,58,138,.90),rgba(26,79,214,.60))", sig: true },
];

const NAV_TABS = [
  { id: "home", label: "Home", icon: Home },
  { id: "search", label: "Search", icon: Search },
  { id: "saved", label: "Saved", icon: Bookmark },
  { id: "profile", label: "Profile", icon: User },
];

// ─── Buy Flow Data ────────────────────────────────────────────────────────────

const HERO_HOUSE = "1613490493576-7fde63acd811";

const RESIDENTIAL_TYPES = [
  { id: "Apartment", label: "Apartment", sub: "Flats & Apartments", img: "1594146032116-80033545b0b8", icon: Building2, iconBg: "#DBEAFE", iconColor: "#2563EB", popular: true, wide: false },
  { id: "Independent House", label: "Independent House", sub: "Homes & Bungalows", img: "1580587771525-78b9dba3b914", icon: Home, iconBg: "#D1FAE5", iconColor: "#059669", wide: false },
  { id: "Villa", label: "Villa", sub: "Luxury Villas", img: "1600596542815-ffad4c1539a9", icon: Crown, iconBg: "#EDE9FE", iconColor: "#7C3AED", wide: false },
  { id: "Farmhouse", label: "Farmhouse", sub: "Weekend Homes", img: "1628012209120-d9db7abf7eab", icon: TreePine, iconBg: "#FEF3C7", iconColor: "#D97706", wide: false },
  { id: "New Project", label: "New Project", sub: "Under Construction", img: "1527335988388-b40ee248d80c", icon: HardHat, iconBg: "#FEE2E2", iconColor: "#DC2626", wide: true },
];

const LAND_TYPES = [
  { id: "Residential Plot", label: "Residential Plot", sub: "Plots in Layouts", img: "1699387840931-fbb6a6595f82", icon: LayoutGrid, iconBg: "#FEF3C7", iconColor: "#D97706", wide: false },
  { id: "Agricultural Land", label: "Agricultural Land", sub: "Fertile & Productive", img: "1743065528943-438a6a981631", icon: Sprout, iconBg: "#D1FAE5", iconColor: "#059669", wide: false },
  { id: "Farm Land", label: "Farm Land", sub: "Farms & Plantations", img: "1699387948969-af05ca0cdacc", icon: Leaf, iconBg: "#D1FAE5", iconColor: "#16a34a", wide: false },
  { id: "Commercial Plot", label: "Commercial Plot", sub: "Commercial Land", img: "1544641058-5db1620b8419", icon: Landmark, iconBg: "#FEF3C7", iconColor: "#D97706", wide: false },
  { id: "Industrial Land", label: "Industrial Land", sub: "Industrial & Warehouse Land", img: "1592385456792-dfef3ae5fa87", icon: Factory, iconBg: "#F3F4F6", iconColor: "#4B5563", wide: true },
];

const COMMERCIAL_TYPES = [
  { id: "Office", label: "Office", sub: "Office Spaces", img: "1723719523590-d5d2e0669e2e", icon: Briefcase, iconBg: "#DBEAFE", iconColor: "#2563EB", wide: false },
  { id: "Shop", label: "Shop", sub: "Retail Shops", img: "1785402231092-859d0a6c4397", icon: ShoppingBag, iconBg: "#FEE2E2", iconColor: "#DC2626", wide: false },
  { id: "Showroom", label: "Showroom", sub: "Showrooms", img: "1682662046610-fbdb3db4bd74", icon: Store, iconBg: "#EDE9FE", iconColor: "#7C3AED", wide: false },
  { id: "Warehouse", label: "Warehouse", sub: "Warehouses", img: "1669003152272-c97a577284ad", icon: Warehouse, iconBg: "#DBEAFE", iconColor: "#2563EB", wide: false },
];

const BUDGET_OPTIONS = ["Under ₹50 L", "₹50 L – 1 Cr", "₹1 Cr – 2 Cr", "₹2 Cr – 5 Cr", "Above ₹5 Cr"];
const BHK_OPTIONS = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"];
const POSSESSION_OPTIONS = ["Ready to Move", "Under Construction", "New Launch"];
const AMENITIES = ["Parking", "Lift", "Gym", "Swimming Pool", "24/7 Security", "Power Backup", "Clubhouse", "Children Play Area"];

const BROWSE_STATES = [
  { state: "Karnataka", cities: "Bengaluru, Mysuru, Mangaluru" },
  { state: "Maharashtra", cities: "Mumbai, Pune, Nagpur, Nashik" },
  { state: "Telangana", cities: "Hyderabad, Secunderabad, Warangal" },
  { state: "Delhi NCR", cities: "Delhi, Gurgaon, Noida, Faridabad" },
  { state: "Tamil Nadu", cities: "Chennai, Coimbatore, Madurai" },
  { state: "Gujarat", cities: "Ahmedabad, Surat, Vadodara" },
  { state: "Rajasthan", cities: "Jaipur, Jodhpur, Udaipur" },
];

const RESULTS = [
  { id: 1, img: "1745301558339-44eb3217d5da", name: "Prestige City Heights", loc: "Whitefield, Bengaluru", price: "₹1.85 Cr", beds: 3, baths: 2, area: "1,450", tag: "RERA Approved", verified: true, rating: 4.8, builder: "Prestige Group" },
  { id: 2, img: "1682662046610-fbdb3db4bd74", name: "Godrej Nature Plus", loc: "Sector 85, Gurgaon", price: "₹3.20 Cr", beds: 4, baths: 3, area: "2,800", tag: "Premium Villa", verified: true, rating: 4.9, builder: "Godrej Properties" },
  { id: 3, img: "1600596542815-ffad4c1539a9", name: "Sobha Royal Pavilion", loc: "Panathur, Bengaluru", price: "₹78 L", beds: 2, baths: 2, area: "1,100", tag: "Ready to Move", verified: true, rating: 4.5, builder: "Sobha Limited" },
  { id: 4, img: "1785402231092-859d0a6c4397", name: "Lodha Palava Sky", loc: "Dombivli, Mumbai", price: "₹92 L", beds: 2, baths: 2, area: "980", tag: "New Launch", verified: false, rating: 4.6, builder: "Lodha Group" },
  { id: 5, img: "1580587771525-78b9dba3b914", name: "Brigade Meadows", loc: "Kanakapura Rd, Bengaluru", price: "₹1.12 Cr", beds: 3, baths: 2, area: "1,650", tag: "New Launch", verified: true, rating: 4.7, builder: "Brigade Group" },
  { id: 6, img: "1628012209120-d9db7abf7eab", name: "DLF The Crest", loc: "Sector 54, Gurgaon", price: "₹6.50 Cr", beds: 4, baths: 4, area: "3,200", tag: "Luxury", verified: true, rating: 4.9, builder: "DLF Limited" },
];

// ─── Shared ───────────────────────────────────────────────────────────────────

function SectionHead({ title, sub, cta = "See all" }: { title: string; sub?: string; cta?: string }) {
  return (
    <div className="px-4 mb-3">
      <div className="flex items-end justify-between">
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.2px", color: "#0d0d0d", margin: 0 }}>{title}</h2>
          {sub && <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>{sub}</p>}
        </div>
        <button style={{ fontSize: 12, fontWeight: 600, color: "#1a4fd6" }}>{cta}</button>
      </div>
    </div>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────

function StatusBar() {
  return (
    <div className="flex items-center justify-between" style={{ padding: "14px 28px 8px 28px" }}>
      <span style={{ fontSize: 13.5, fontWeight: 700, color: "#0d0d0d" }}>9:41</span>
      <div style={{ width: 120 }} />
      <div className="flex items-center gap-1.5">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="6" width="3" height="6" rx="0.8" fill="#0d0d0d" />
          <rect x="4.5" y="3.5" width="3" height="8.5" rx="0.8" fill="#0d0d0d" />
          <rect x="9" y="1.5" width="3" height="10.5" rx="0.8" fill="#0d0d0d" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.8" fill="#0d0d0d" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <circle cx="8" cy="10.5" r="1.5" fill="#0d0d0d" />
          <path d="M3.8 6.8C5.1 5.3 6.5 4.5 8 4.5s2.9.8 4.2 2.3" stroke="#0d0d0d" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          <path d="M1 3.5C3.2 1.3 5.5 0 8 0s4.8 1.3 7 3.5" stroke="#0d0d0d" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        </svg>
        <div className="flex items-center gap-[1px]">
          <div style={{ width: 24, height: 12, border: "1px solid #0d0d0d", borderRadius: 3, padding: 1.5, display: "flex", alignItems: "center" }}>
            <div style={{ width: "80%", height: "100%", background: "#0d0d0d", borderRadius: 1.5 }} />
          </div>
          <div style={{ width: 2, height: 5, background: "#0d0d0d", borderRadius: "0 1px 1px 0" }} />
        </div>
      </div>
    </div>
  );
}

function AppHeader() {
  return (
    <div className="sticky top-0 bg-white z-20 flex items-center justify-between" style={{ padding: "10px 16px", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center" style={{ width: 34, height: 34, background: "#1a4fd6", borderRadius: 10 }}>
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
            <path d="M4 14.5V9L9.5 5.5 15 9v5.5" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="7" y="10" width="5" height="4.5" rx="0.8" stroke="white" strokeWidth="1.4" />
            <circle cx="14" cy="5" r="3.2" fill="#93c5fd" />
            <path d="M14 3.6v1.5l1.1 1.1" stroke="white" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ lineHeight: 1 }}>
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", color: "#0d0d0d" }}>Land</span>
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", color: "#1a4fd6" }}>OS</span>
        </div>
      </div>
      <button className="flex items-center gap-1" style={{ background: "#f3f4f8", borderRadius: 99, padding: "7px 12px" }}>
        <MapPin style={{ width: 12, height: 12, color: "#1a4fd6" }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: "#0d0d0d" }}>Mumbai, MH</span>
        <ChevronDown style={{ width: 11, height: 11, color: "#9ca3af" }} />
      </button>
      <div className="flex items-center gap-2">
        <button className="relative flex items-center justify-center" style={{ width: 34, height: 34, background: "#f3f4f8", borderRadius: 99 }}>
          <Bell style={{ width: 16, height: 16, color: "#0d0d0d" }} />
          <span className="absolute border-[1.5px] border-white" style={{ top: 7, right: 7, width: 8, height: 8, background: "#1a4fd6", borderRadius: 99 }} />
        </button>
        <button className="flex items-center justify-center" style={{ width: 34, height: 34, background: "#dbeafe", borderRadius: 99, fontSize: 12, fontWeight: 800, color: "#1a4fd6" }}>RK</button>
      </div>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="flex gap-2.5" style={{ padding: "14px 16px 0 16px" }}>
      <div className="flex flex-1 items-center gap-2.5" style={{ background: "#f3f4f8", borderRadius: 18, padding: "11px 14px" }}>
        <Search style={{ width: 16, height: 16, color: "#9ca3af", flexShrink: 0 }} />
        <input className="flex-1 bg-transparent outline-none text-[#0d0d0d] placeholder:text-[#9ca3af]" style={{ fontSize: 13, fontWeight: 500 }} placeholder="Search properties, localities, cities..." />
      </div>
      <button className="flex items-center justify-center" style={{ width: 46, height: 46, background: "#1a4fd6", borderRadius: 16, flexShrink: 0, boxShadow: "0 4px 14px rgba(26,79,214,.38)" }}>
        <SlidersHorizontal style={{ width: 17, height: 17, color: "white" }} />
      </button>
    </div>
  );
}

function PrimaryActions({ onAction }: { onAction?: (id: string) => void }) {
  return (
    <div style={{ padding: "20px 16px 0 16px" }}>
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.8px", color: "#9ca3af", textTransform: "uppercase", marginBottom: 12 }}>What are you looking for?</p>
      <div className="grid grid-cols-2 gap-2.5">
        {HOME_ACTIONS.map((action, i) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07, duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onAction?.(action.id)}
              className="relative overflow-hidden text-left"
              style={{ height: 120, borderRadius: 20 }}
            >
              <img src={px(action.img, 380, 240)} alt={action.label} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: action.grad }} />
              <div className="relative h-full flex flex-col justify-between" style={{ padding: 14 }}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center justify-center" style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(255,255,255,.18)", backdropFilter: "blur(8px)" }}>
                    <Icon style={{ width: 15, height: 15, color: "white" }} />
                  </div>
                  {action.sig && <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: "0.8px", background: "rgba(26,79,214,.9)", color: "white", padding: "3px 7px", borderRadius: 99 }}>LANDOS</span>}
                </div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: "0.2px", color: "white" }}>{action.label}</div>
                  <div style={{ fontSize: 10, fontWeight: 500, marginTop: 2, color: "rgba(255,255,255,.65)" }}>{action.sub}</div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function PromoBanner() {
  const [idx, setIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    timer.current = setInterval(() => setIdx((i) => (i + 1) % BANNERS.length), 4200);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, []);
  return (
    <div style={{ marginTop: 24 }}>
      <SectionHead title="Featured Builders" cta="View All" />
      <div style={{ padding: "0 16px" }}>
        <div className="relative overflow-hidden" style={{ borderRadius: 20, height: 178 }}>
          {BANNERS.map((b, i) => (
            <div key={b.id} className="absolute inset-0 transition-all duration-500" style={{ opacity: i === idx ? 1 : 0, pointerEvents: i === idx ? "auto" : "none" }}>
              <img src={px(b.img, 800, 356)} alt={b.brand} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(0,0,0,.78) 0%,rgba(0,0,0,.28) 55%,transparent 100%)" }} />
              <div className="absolute inset-0 flex flex-col justify-between" style={{ padding: 18 }}>
                <span className="self-start text-white" style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.8px", background: "#1a4fd6", padding: "4px 10px", borderRadius: 99 }}>{b.badge.toUpperCase()}</span>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.3px", color: "white" }}>{b.brand}</div>
                  <div style={{ fontSize: 11, fontWeight: 500, marginTop: 4, color: "rgba(255,255,255,.70)" }}>{b.sub}</div>
                  <button style={{ marginTop: 12, fontSize: 11, fontWeight: 700, padding: "7px 16px", borderRadius: 99, background: "white", color: "#0d0d0d" }}>{b.cta}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-1.5" style={{ marginTop: 10 }}>
          {BANNERS.map((_, i) => <button key={i} onClick={() => setIdx(i)} style={{ height: 6, width: i === idx ? 20 : 6, borderRadius: 99, background: i === idx ? "#1a4fd6" : "#d1d5db", transition: "all .3s" }} />)}
        </div>
      </div>
    </div>
  );
}

function FeaturedProperties({ liked, onToggle }: { liked: Set<number>; onToggle: (id: number) => void }) {
  return (
    <div style={{ marginTop: 24 }}>
      <SectionHead title="Featured Properties" />
      <div className="flex overflow-x-auto" style={{ gap: 12, padding: "0 16px 2px 16px", scrollbarWidth: "none" }}>
        {FEATURED.map((p) => (
          <div key={p.id} className="shrink-0 bg-white overflow-hidden" style={{ width: 200, borderRadius: 18, boxShadow: "0 2px 18px rgba(0,0,0,.08)", border: "1px solid rgba(0,0,0,.05)" }}>
            <div className="relative bg-gray-100" style={{ height: 132 }}>
              <img src={px(p.img, 400, 264)} alt={p.name} className="w-full h-full object-cover" />
              <button onClick={() => onToggle(p.id)} className="absolute flex items-center justify-center" style={{ top: 10, right: 10, width: 28, height: 28, background: "rgba(255,255,255,.9)", backdropFilter: "blur(4px)", borderRadius: 99 }}>
                <Heart style={{ width: 14, height: 14, color: liked.has(p.id) ? "#ef4444" : "#9ca3af", fill: liked.has(p.id) ? "#ef4444" : "transparent" }} />
              </button>
              {p.tag && <span style={{ position: "absolute", bottom: 10, left: 10, fontSize: 9, fontWeight: 700, background: "rgba(255,255,255,.92)", color: "#0d0d0d", padding: "3px 8px", borderRadius: 99 }}>{p.tag}</span>}
              {p.verified && <div className="absolute flex items-center gap-0.5" style={{ top: 10, left: 10, fontSize: 8, fontWeight: 700, background: "#1a4fd6", color: "white", padding: "3px 7px", borderRadius: 99 }}><Shield style={{ width: 9, height: 9 }} /> Verified</div>}
            </div>
            <div style={{ padding: 12 }}>
              <div className="truncate" style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.3, color: "#0d0d0d" }}>{p.name}</div>
              <div className="flex items-center gap-1" style={{ marginTop: 3 }}>
                <MapPin style={{ width: 10, height: 10, color: "#9ca3af", flexShrink: 0 }} />
                <span className="truncate" style={{ fontSize: 10, color: "#9ca3af" }}>{p.loc}</span>
              </div>
              <div className="flex items-center gap-1" style={{ marginTop: 5 }}>
                <Star style={{ width: 10, height: 10, color: "#f59e0b", fill: "#f59e0b" }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: "#0d0d0d" }}>{p.rating}</span>
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, marginTop: 6, color: "#1a4fd6" }}>{p.price}</div>
              <div className="flex items-center gap-2.5" style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid rgba(0,0,0,.06)", fontSize: 10, color: "#9ca3af" }}>
                <span className="flex items-center gap-0.5"><BedDouble style={{ width: 11, height: 11 }} />{p.beds} Bd</span>
                <span className="flex items-center gap-0.5"><Bath style={{ width: 11, height: 11 }} />{p.baths} Ba</span>
                <span>{p.area} sqft</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PopularCities() {
  return (
    <div style={{ marginTop: 24 }}>
      <SectionHead title="Popular Cities" cta="View all" />
      <div className="flex overflow-x-auto" style={{ gap: 14, padding: "0 16px 2px 16px", scrollbarWidth: "none" }}>
        {CITIES.map((c) => (
          <button key={c.name} className="shrink-0 flex flex-col items-center gap-1.5">
            <div className="overflow-hidden bg-gray-100" style={{ width: 64, height: 64, borderRadius: 20 }}>
              <img src={px(c.img, 128, 128)} alt={c.name} className="w-full h-full object-cover" />
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#0d0d0d" }}>{c.name}</span>
            <span style={{ fontSize: 9.5, color: "#9ca3af", marginTop: -4 }}>{c.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function PromoStrip() {
  return (
    <div className="flex items-center gap-3" style={{ margin: "20px 16px 0 16px", padding: "14px 16px", background: "linear-gradient(130deg,#eef2ff,#f0f9ff)", border: "1px solid #c7d7fd", borderRadius: 18 }}>
      <div className="flex items-center justify-center shrink-0" style={{ width: 42, height: 42, background: "#1a4fd6", borderRadius: 13 }}>
        <Zap style={{ width: 20, height: 20, color: "white" }} />
      </div>
      <div className="flex-1">
        <div style={{ fontSize: 12, fontWeight: 700, color: "#1a4fd6" }}>Post Your Property FREE</div>
        <div style={{ fontSize: 10, fontWeight: 500, marginTop: 2, color: "#6b7280" }}>Reach 2 Lakh+ verified buyers today</div>
      </div>
      <button style={{ fontSize: 11, fontWeight: 700, background: "#1a4fd6", color: "white", padding: "7px 14px", borderRadius: 99, whiteSpace: "nowrap" }}>List Now</button>
    </div>
  );
}

function NearbyProperties({ liked, onToggle }: { liked: Set<number>; onToggle: (id: number) => void }) {
  return (
    <div style={{ marginTop: 24 }}>
      <SectionHead title="Near You" sub="Properties within 5 km of your location" />
      <div className="grid grid-cols-2 gap-2.5" style={{ padding: "0 16px" }}>
        {NEARBY.map((p) => (
          <div key={p.id} className="overflow-hidden bg-white" style={{ borderRadius: 16, boxShadow: "0 2px 14px rgba(0,0,0,.07)", border: "1px solid rgba(0,0,0,.05)" }}>
            <div className="relative bg-gray-100" style={{ height: 96 }}>
              <img src={px(p.img, 300, 192)} alt={p.name} className="w-full h-full object-cover" />
              <button onClick={() => onToggle(p.id)} className="absolute flex items-center justify-center" style={{ top: 8, right: 8, width: 24, height: 24, background: "rgba(255,255,255,.9)", borderRadius: 99 }}>
                <Heart style={{ width: 11, height: 11, color: liked.has(p.id) ? "#ef4444" : "#9ca3af", fill: liked.has(p.id) ? "#ef4444" : "transparent" }} />
              </button>
            </div>
            <div style={{ padding: "10px 10px 12px 10px" }}>
              <div className="truncate" style={{ fontSize: 11, fontWeight: 700, lineHeight: 1.3, color: "#0d0d0d" }}>{p.name}</div>
              <div className="truncate" style={{ fontSize: 10, marginTop: 2, color: "#9ca3af" }}>{p.loc}</div>
              <div style={{ fontSize: 13, fontWeight: 800, marginTop: 5, color: "#1a4fd6" }}>{p.price}</div>
              <div style={{ fontSize: 9.5, marginTop: 2, color: "#9ca3af" }}>{p.beds} Bd · {p.area} sqft</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NewlyListed() {
  return (
    <div style={{ marginTop: 24 }}>
      <SectionHead title="Newly Listed" sub="Added in the last 48 hours" />
      <div className="flex overflow-x-auto" style={{ gap: 10, padding: "0 16px 2px 16px", scrollbarWidth: "none" }}>
        {[...FEATURED].reverse().map((p) => (
          <div key={p.id} className="shrink-0 flex gap-2.5 bg-white" style={{ width: 222, padding: 10, borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,.07)", border: "1px solid rgba(0,0,0,.05)" }}>
            <div className="overflow-hidden bg-gray-100 shrink-0" style={{ width: 66, height: 66, borderRadius: 12 }}>
              <img src={px(p.img, 132, 132)} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <span style={{ fontSize: 8, fontWeight: 800, background: "#d1fae5", color: "#059669", padding: "2px 7px", borderRadius: 99 }}>NEW</span>
              <div className="truncate" style={{ fontSize: 11, fontWeight: 700, marginTop: 4, lineHeight: 1.3, color: "#0d0d0d" }}>{p.name}</div>
              <div className="truncate" style={{ fontSize: 10, marginTop: 2, color: "#9ca3af" }}>{p.loc}</div>
              <div style={{ fontSize: 12, fontWeight: 800, marginTop: 5, color: "#1a4fd6" }}>{p.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LandAndPlots() {
  return (
    <div style={{ marginTop: 24 }}>
      <SectionHead title="Land & Plots" sub="Agriculture, residential & farm lands" />
      <div className="flex flex-col" style={{ gap: 10, padding: "0 16px" }}>
        {LAND.map((p) => (
          <div key={p.id} className="flex overflow-hidden bg-white" style={{ borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,.07)", border: "1px solid rgba(0,0,0,.05)" }}>
            <div className="relative bg-gray-100 shrink-0" style={{ width: 96, height: 88 }}>
              <img src={px(p.img, 192, 176)} alt={p.type} className="w-full h-full object-cover" />
              {p.verified && <div className="absolute flex items-center gap-0.5 text-white" style={{ bottom: 6, left: 6, fontSize: 7.5, fontWeight: 700, background: "#1a4fd6", padding: "2px 6px", borderRadius: 99 }}><Shield style={{ width: 8, height: 8 }} /> Verified</div>}
            </div>
            <div className="flex flex-col justify-between flex-1 min-w-0" style={{ padding: 12 }}>
              <div>
                <span style={{ fontSize: 9, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.5px" }}>{p.type}</span>
                <div style={{ fontSize: 13, fontWeight: 700, marginTop: 2, lineHeight: 1.2, color: "#0d0d0d" }}>{p.area}</div>
                <div className="flex items-center gap-1" style={{ marginTop: 3 }}>
                  <MapPin style={{ width: 10, height: 10, color: "#9ca3af", flexShrink: 0 }} />
                  <span className="truncate" style={{ fontSize: 10, color: "#9ca3af" }}>{p.loc}</span>
                </div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#1a4fd6" }}>{p.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExploreOnMap() {
  return (
    <div style={{ margin: "24px 16px 0 16px" }}>
      <div className="relative overflow-hidden" style={{ borderRadius: 22, height: 136 }}>
        <img src={px("1544641058-5db1620b8419", 800, 272)} alt="Explore on map" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(13,42,122,.90) 0%,rgba(26,79,214,.48) 65%,transparent 100%)" }} />
        <div className="absolute inset-0 flex items-center justify-between" style={{ padding: "0 20px" }}>
          <div>
            <p style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "1px", color: "#93c5fd", textTransform: "uppercase" }}>Interactive GIS</p>
            <h3 style={{ fontSize: 19, fontWeight: 800, lineHeight: 1.2, marginTop: 4, letterSpacing: "-0.3px", color: "white" }}>Explore on Map</h3>
            <p style={{ fontSize: 10.5, marginTop: 4, color: "rgba(255,255,255,.55)" }}>Search by drawing on the map</p>
          </div>
          <button className="flex items-center gap-1.5 bg-white text-[#1a4fd6]" style={{ fontSize: 11.5, fontWeight: 700, padding: "9px 14px", borderRadius: 16, boxShadow: "0 4px 16px rgba(0,0,0,.22)", flexShrink: 0 }}>
            <Map style={{ width: 14, height: 14 }} /> Open Map
          </button>
        </div>
      </div>
    </div>
  );
}

function Insights() {
  return (
    <div style={{ marginTop: 24 }}>
      <div className="px-4 mb-3 flex items-end justify-between">
        <div className="flex items-center gap-2">
          <BookOpen style={{ width: 15, height: 15, color: "#1a4fd6" }} />
          <h2 style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.2px", color: "#0d0d0d", margin: 0 }}>LandOS Insights</h2>
        </div>
        <button style={{ fontSize: 12, fontWeight: 600, color: "#1a4fd6" }}>All articles</button>
      </div>
      <div className="relative overflow-hidden" style={{ margin: "0 16px", borderRadius: 20, height: 152 }}>
        <img src={px("1594146032116-80033545b0b8", 800, 304)} alt="Featured insight" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg,rgba(0,0,0,.82) 0%,rgba(0,0,0,.12) 55%,transparent 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0" style={{ padding: 16 }}>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.8px", color: "#93c5fd", textTransform: "uppercase" }}>Market Report · Q3 2024</span>
          <p style={{ fontSize: 13.5, fontWeight: 700, lineHeight: 1.35, marginTop: 4, color: "white" }}>India Real Estate: Q3 Outlook and Where Prices Are Headed</p>
          <p style={{ fontSize: 10, marginTop: 5, color: "rgba(255,255,255,.50)" }}>Aug 15 · 8 min read</p>
        </div>
      </div>
      <div className="flex overflow-x-auto" style={{ gap: 10, padding: "14px 16px 0 16px", scrollbarWidth: "none" }}>
        {["Buyer's Guide 2024", "Plot Investment 101", "RERA Explained"].map((t) => (
          <button key={t} className="shrink-0 flex items-center gap-1.5" style={{ background: "#f3f4f8", padding: "8px 14px", borderRadius: 99, fontSize: 11, fontWeight: 600, color: "#0d0d0d", whiteSpace: "nowrap" }}>
            <BookOpen style={{ width: 11, height: 11, color: "#1a4fd6" }} />{t}
          </button>
        ))}
      </div>
      <div style={{ padding: "8px 16px 0 16px" }}>
        {ARTICLES.map((a, i) => (
          <div key={a.id} className="flex gap-3" style={{ paddingTop: 14, paddingBottom: 14, borderBottom: i < ARTICLES.length - 1 ? "1px solid rgba(0,0,0,.06)" : "none" }}>
            <div className="flex-1 min-w-0">
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.5px", color: "#1a4fd6", textTransform: "uppercase" }}>{a.cat}</span>
              <p style={{ fontSize: 12.5, fontWeight: 700, lineHeight: 1.4, marginTop: 3, color: "#0d0d0d", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>{a.title}</p>
              <p style={{ fontSize: 10, marginTop: 5, color: "#9ca3af" }}>{a.date} · {a.time} read</p>
            </div>
            <div className="overflow-hidden bg-gray-100 shrink-0" style={{ width: 80, height: 68, borderRadius: 12 }}>
              <img src={px(a.img, 160, 136)} alt={a.title} className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BottomNav({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <div className="shrink-0 flex bg-white" style={{ borderTop: "1px solid rgba(0,0,0,.07)" }}>
      {NAV_TABS.map((tab) => {
        const Icon = tab.icon;
        const on = tab.id === active;
        return (
          <button key={tab.id} onClick={() => onSelect(tab.id)} className="flex-1 flex flex-col items-center" style={{ paddingTop: 10, paddingBottom: 22, gap: 3 }}>
            <Icon style={{ width: 21, height: 21, color: on ? "#1a4fd6" : "#9ca3af", strokeWidth: on ? 2.2 : 1.8 }} />
            <span style={{ fontSize: 10, fontWeight: 600, color: on ? "#1a4fd6" : "#9ca3af" }}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Buy Flow ─────────────────────────────────────────────────────────────────

function StepProgress({ step, onBack }: { step: number; onBack: () => void }) {
  const steps = [{ n: 1, label: "Type" }, { n: 2, label: "Location" }, { n: 3, label: "Preferences" }];
  return (
    <div className="flex items-center shrink-0" style={{ padding: "10px 12px", borderBottom: "1px solid rgba(0,0,0,.06)", gap: 8 }}>
      <button onClick={onBack} className="flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: 99, border: "1px solid rgba(0,0,0,.1)", flexShrink: 0 }}>
        <ArrowLeft style={{ width: 15, height: 15, color: "#0d0d0d" }} />
      </button>
      <div className="flex items-center justify-center flex-1" style={{ gap: 3 }}>
        {steps.map((s, i) => (
          <div key={s.n} className="flex items-center" style={{ gap: 3 }}>
            {i > 0 && <span style={{ color: "#d1d5db", fontSize: 13 }}>›</span>}
            <span style={{
              fontSize: 11.5, fontWeight: s.n === step ? 700 : 500,
              color: s.n < step ? "#059669" : s.n === step ? "white" : "#9ca3af",
              background: s.n < step ? "#D1FAE5" : s.n === step ? "#1a4fd6" : "transparent",
              padding: s.n === step || s.n < step ? "3px 9px" : "3px 2px",
              borderRadius: 99, transition: "all .3s",
            }}>
              {s.n < step ? "✓" : s.n} {s.label}
            </span>
          </div>
        ))}
      </div>
      <button className="flex items-center gap-1" style={{ padding: "6px 10px", border: "1px solid rgba(0,0,0,.1)", borderRadius: 99, fontSize: 11, fontWeight: 600, color: "#0d0d0d", flexShrink: 0 }}>
        <Headphones style={{ width: 13, height: 13 }} /> Help
      </button>
    </div>
  );
}

type PropType = { id: string; label: string; sub: string; img: string; icon: React.ElementType; iconBg: string; iconColor: string; popular?: boolean; wide: boolean };

function TypeCard({ type, isSelected, onSelect }: { type: PropType; isSelected: boolean; onSelect: () => void }) {
  const Icon = type.icon;
  return (
    <button
      onClick={onSelect}
      className="text-left bg-white overflow-hidden"
      style={{
        borderRadius: 12,
        border: `2px solid ${isSelected ? "#1a4fd6" : "rgba(0,0,0,.09)"}`,
        gridColumn: type.wide ? "span 2" : "span 1",
        transition: "border-color .15s",
      }}
    >
      <div className="relative bg-gray-100" style={{ height: 60 }}>
        <img src={px(type.img, type.wide ? 340 : 160, 120)} alt={type.label} className="w-full h-full object-cover" />
        {type.popular && <span style={{ position: "absolute", top: 5, left: 5, fontSize: 8, fontWeight: 800, background: "#1a4fd6", color: "white", padding: "2px 6px", borderRadius: 99 }}>Popular</span>}
        {isSelected && (
          <div className="absolute flex items-center justify-center" style={{ top: 5, right: 5, width: 18, height: 18, borderRadius: 99, background: "#1a4fd6" }}>
            <Check style={{ width: 10, height: 10, color: "white", strokeWidth: 3 }} />
          </div>
        )}
      </div>
      <div style={{ padding: "6px 7px 9px 7px" }}>
        <div className="flex items-center justify-center" style={{ width: 22, height: 22, borderRadius: 6, background: type.iconBg, marginBottom: 4 }}>
          <Icon style={{ width: 12, height: 12, color: type.iconColor }} />
        </div>
        <div style={{ fontSize: 10.5, fontWeight: 700, lineHeight: 1.2, color: "#0d0d0d" }}>{type.label}</div>
        <div style={{ fontSize: 9, marginTop: 1.5, lineHeight: 1.2, color: "#9ca3af" }}>{type.sub}</div>
      </div>
    </button>
  );
}

function CatHeader({ icon: Icon, iconBg, iconColor, title, sub }: { icon: React.ElementType; iconBg: string; iconColor: string; title: string; sub: string }) {
  return (
    <div className="flex items-center" style={{ marginBottom: 10 }}>
      <div className="flex items-center justify-center" style={{ width: 34, height: 34, borderRadius: 10, background: iconBg, marginRight: 10, flexShrink: 0 }}>
        <Icon style={{ width: 16, height: 16, color: iconColor }} />
      </div>
      <div className="flex-1">
        <div style={{ fontSize: 14, fontWeight: 700, color: "#0d0d0d" }}>{title}</div>
        <div style={{ fontSize: 10.5, color: "#9ca3af" }}>{sub}</div>
      </div>
      <button className="flex items-center gap-0.5" style={{ fontSize: 12, fontWeight: 600, color: "#1a4fd6" }}>
        View all <ChevronRight style={{ width: 13, height: 13 }} />
      </button>
    </div>
  );
}

// Step 1 — Type

function BuyStep1({ selectedType, onSelect, onBack, onContinue }: { selectedType: string; onSelect: (t: string) => void; onBack: () => void; onContinue: () => void }) {
  return (
    <div className="flex flex-col" style={{ height: "100%" }}>
      <StepProgress step={1} onBack={onBack} />
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>

        {/* Hero */}
        <div className="flex items-start overflow-hidden" style={{ padding: "18px 16px 14px 16px" }}>
          <div className="flex-1">
            <h1 style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.12, color: "#0d0d0d", margin: 0 }}>
              What are you<br />looking <span style={{ color: "#1a4fd6" }}>to buy?</span>
            </h1>
            <p style={{ fontSize: 12, color: "#6b7280", margin: "7px 0 0 0" }}>Choose a property type to get started.</p>
            <div className="flex items-center flex-wrap" style={{ marginTop: 9, gap: 5 }}>
              <Shield style={{ width: 11, height: 11, color: "#1a4fd6", flexShrink: 0 }} />
              <span style={{ fontSize: 10.5, color: "#6b7280" }}>Verified listings</span>
              <span style={{ color: "#d1d5db" }}>•</span>
              <span style={{ fontSize: 10.5, color: "#6b7280" }}>Trusted info</span>
              <span style={{ color: "#d1d5db" }}>•</span>
              <span style={{ fontSize: 10.5, color: "#1a4fd6", fontWeight: 700 }}>LandOS Verify</span>
            </div>
          </div>
          <div className="overflow-hidden shrink-0" style={{ width: 118, height: 118, borderRadius: 99, background: "#EEF2FF", marginLeft: 12 }}>
            <img src={px(HERO_HOUSE, 236, 236)} alt="Modern luxury home" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Residential */}
        <div style={{ padding: "0 16px 16px 16px" }}>
          <CatHeader icon={Home} iconBg="#EEF2FF" iconColor="#1a4fd6" title="Residential" sub="Find your perfect home" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 7 }}>
            {RESIDENTIAL_TYPES.map((t) => <TypeCard key={t.id} type={t} isSelected={selectedType === t.id} onSelect={() => onSelect(t.id)} />)}
          </div>
        </div>

        {/* Land */}
        <div style={{ padding: "0 16px 16px 16px", borderTop: "1px solid rgba(0,0,0,.05)", paddingTop: 14 }}>
          <CatHeader icon={TreePine} iconBg="#D1FAE5" iconColor="#059669" title="Land / Plot" sub="Invest in land & build your future" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 7 }}>
            {LAND_TYPES.map((t) => <TypeCard key={t.id} type={t} isSelected={selectedType === t.id} onSelect={() => onSelect(t.id)} />)}
          </div>
        </div>

        {/* Commercial */}
        <div style={{ padding: "0 16px 16px 16px", borderTop: "1px solid rgba(0,0,0,.05)", paddingTop: 14 }}>
          <CatHeader icon={Landmark} iconBg="#EDE9FE" iconColor="#7C3AED" title="Commercial" sub="Grow your business" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 7 }}>
            {COMMERCIAL_TYPES.map((t) => <TypeCard key={t.id} type={t} isSelected={selectedType === t.id} onSelect={() => onSelect(t.id)} />)}
          </div>
        </div>

        {/* Trust footer */}
        <div className="flex" style={{ padding: "14px 16px 18px 16px", borderTop: "1px solid rgba(0,0,0,.06)" }}>
          {[
            { Icon: Shield, color: "#1a4fd6", label: "100% Verified Listings", sub: "Trusted & authentic" },
            { Icon: Check, color: "#059669", label: "LandOS Verify", sub: "Real data. Real transparency." },
            { Icon: Lock, color: "#0d0d0d", label: "Your Data is Safe", sub: "Privacy & security first" },
          ].map((item, i, arr) => (
            <div key={item.label} className="flex-1 flex flex-col items-center text-center" style={{ padding: "0 4px", borderRight: i < arr.length - 1 ? "1px solid rgba(0,0,0,.08)" : "none" }}>
              <div className="flex items-center justify-center" style={{ width: 30, height: 30, borderRadius: 9, background: "#F3F4F8", marginBottom: 5 }}>
                <item.Icon style={{ width: 14, height: 14, color: item.color }} />
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, lineHeight: 1.2, color: "#0d0d0d" }}>{item.label}</div>
              <div style={{ fontSize: 8.5, marginTop: 2, lineHeight: 1.2, color: "#9ca3af" }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="shrink-0 flex items-center gap-2" style={{ padding: "10px 12px 18px 12px", borderTop: "1px solid rgba(0,0,0,.08)", background: "white" }}>
        <button className="flex items-center gap-2 shrink-0" style={{ padding: "9px 10px", border: "1px solid rgba(0,0,0,.09)", borderRadius: 13 }}>
          <div className="flex items-center justify-center" style={{ width: 30, height: 30, borderRadius: 9, background: "#EEF2FF" }}>
            <Map style={{ width: 14, height: 14, color: "#1a4fd6" }} />
          </div>
          <div className="text-left">
            <div style={{ fontSize: 11, fontWeight: 700, lineHeight: 1, color: "#0d0d0d" }}>Explore on Map</div>
            <div style={{ fontSize: 9, marginTop: 2, color: "#9ca3af" }}>Choose on map & see</div>
          </div>
          <ChevronRight style={{ width: 12, height: 12, color: "#9ca3af" }} />
        </button>
        <button onClick={onContinue} className="flex-1 flex flex-col items-center text-white" style={{ background: "#1a4fd6", borderRadius: 15, padding: "11px 12px", boxShadow: "0 4px 18px rgba(26,79,214,.35)" }}>
          <span style={{ fontSize: 13, fontWeight: 700 }}>Continue with {selectedType} →</span>
          <span style={{ fontSize: 9, opacity: 0.7, marginTop: 2 }}>You can change this later</span>
        </button>
      </div>
    </div>
  );
}

// Step 2 — Location

function BuyStep2({ selectedLocation, onSelect, onBack, onContinue }: { selectedLocation: string; onSelect: (loc: string) => void; onBack: () => void; onContinue: () => void }) {
  const [query, setQuery] = useState("");
  const cities = ["Mumbai", "Bengaluru", "Hyderabad", "Delhi NCR", "Pune", "Chennai", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow"];
  const filtered = cities.filter((c) => c.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="flex flex-col" style={{ height: "100%" }}>
      <StepProgress step={2} onBack={onBack} />
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div style={{ padding: "18px 16px 12px 16px" }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.15, color: "#0d0d0d", margin: 0 }}>
            Where do you<br />want to <span style={{ color: "#1a4fd6" }}>buy?</span>
          </h1>
          <p style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>Search a city, locality or landmark</p>
        </div>

        <div style={{ padding: "0 16px 14px 16px" }}>
          <div className="flex items-center gap-2.5" style={{ background: "#f3f4f8", borderRadius: 15, padding: "10px 14px", border: `1.5px solid ${query ? "#1a4fd6" : "transparent"}`, transition: "border-color .2s" }}>
            <Search style={{ width: 15, height: 15, color: "#9ca3af", flexShrink: 0 }} />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Mumbai, Whitefield, HSR Layout..." className="flex-1 bg-transparent outline-none text-[#0d0d0d] placeholder:text-[#9ca3af]" style={{ fontSize: 12.5, fontWeight: 500 }} autoFocus />
            {query && <button onClick={() => setQuery("")}><X style={{ width: 14, height: 14, color: "#9ca3af" }} /></button>}
          </div>
        </div>

        <div style={{ padding: "0 16px 16px 16px" }}>
          <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.6px", color: "#9ca3af", textTransform: "uppercase", marginBottom: 10 }}>Popular Cities</p>
          <div className="flex flex-wrap" style={{ gap: 8 }}>
            {filtered.map((city) => (
              <button key={city} onClick={() => onSelect(city)} style={{ padding: "8px 14px", borderRadius: 99, fontSize: 12.5, fontWeight: 600, border: `1.5px solid ${selectedLocation === city ? "#1a4fd6" : "rgba(0,0,0,.1)"}`, background: selectedLocation === city ? "#EEF2FF" : "white", color: selectedLocation === city ? "#1a4fd6" : "#0d0d0d", transition: "all .15s" }}>
                {city}
              </button>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(0,0,0,.06)" }}>
          <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.6px", color: "#9ca3af", textTransform: "uppercase", padding: "14px 16px 8px 16px" }}>Browse by State</p>
          {BROWSE_STATES.map((s) => (
            <button key={s.state} onClick={() => onSelect(s.state)} className="flex items-center w-full" style={{ padding: "11px 16px", borderBottom: "1px solid rgba(0,0,0,.04)", gap: 12 }}>
              <div className="flex items-center justify-center shrink-0" style={{ width: 36, height: 36, borderRadius: 10, background: selectedLocation === s.state ? "#EEF2FF" : "#F3F4F8" }}>
                <MapPin style={{ width: 15, height: 15, color: selectedLocation === s.state ? "#1a4fd6" : "#6b7280" }} />
              </div>
              <div className="flex-1 text-left">
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0d0d0d" }}>{s.state}</div>
                <div style={{ fontSize: 10.5, marginTop: 1, color: "#9ca3af" }}>{s.cities}</div>
              </div>
              <ChevronRight style={{ width: 15, height: 15, color: "#d1d5db", flexShrink: 0 }} />
            </button>
          ))}
          <div style={{ height: 8 }} />
        </div>
      </div>
      <div className="shrink-0" style={{ padding: "12px 16px 20px 16px", borderTop: "1px solid rgba(0,0,0,.08)", background: "white" }}>
        <button onClick={onContinue} className="w-full text-white" style={{ background: "#1a4fd6", borderRadius: 15, padding: "14px", fontSize: 15, fontWeight: 700, boxShadow: "0 4px 18px rgba(26,79,214,.35)" }}>
          Continue to Preferences →
        </button>
      </div>
    </div>
  );
}

// Step 3 — Preferences

function BuyStep3({
  budget, setBudget, bhk, setBhk, possession, setPossession, amenities, setAmenities, onBack, onContinue,
}: {
  budget: string[]; setBudget: (v: string[]) => void;
  bhk: string[]; setBhk: (v: string[]) => void;
  possession: string[]; setPossession: (v: string[]) => void;
  amenities: string[]; setAmenities: (v: string[]) => void;
  onBack: () => void; onContinue: () => void;
}) {
  const toggle = (arr: string[], item: string, set: (v: string[]) => void) =>
    set(arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item]);

  return (
    <div className="flex flex-col" style={{ height: "100%" }}>
      <StepProgress step={3} onBack={onBack} />
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div style={{ padding: "18px 16px 12px 16px" }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.15, color: "#0d0d0d", margin: 0 }}>
            Set your<br /><span style={{ color: "#1a4fd6" }}>preferences</span>
          </h1>
          <p style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>Help us find the perfect match for you</p>
        </div>

        <div style={{ padding: "0 16px 16px 16px", borderBottom: "1px solid rgba(0,0,0,.06)" }}>
          <p style={{ fontSize: 13.5, fontWeight: 700, color: "#0d0d0d", marginBottom: 10 }}>Budget Range</p>
          <div className="flex flex-wrap" style={{ gap: 8 }}>
            {BUDGET_OPTIONS.map((b) => (
              <button key={b} onClick={() => toggle(budget, b, setBudget)} style={{ padding: "8px 13px", borderRadius: 99, fontSize: 11.5, fontWeight: 600, border: `1.5px solid ${budget.includes(b) ? "#1a4fd6" : "rgba(0,0,0,.1)"}`, background: budget.includes(b) ? "#EEF2FF" : "white", color: budget.includes(b) ? "#1a4fd6" : "#0d0d0d", transition: "all .15s" }}>{b}</button>
            ))}
          </div>
        </div>

        <div style={{ padding: "14px 16px 16px 16px", borderBottom: "1px solid rgba(0,0,0,.06)" }}>
          <p style={{ fontSize: 13.5, fontWeight: 700, color: "#0d0d0d", marginBottom: 10 }}>BHK Configuration</p>
          <div className="flex" style={{ gap: 7 }}>
            {BHK_OPTIONS.map((b) => (
              <button key={b} onClick={() => toggle(bhk, b, setBhk)} className="flex-1" style={{ padding: "10px 2px", borderRadius: 11, fontSize: 11, fontWeight: 700, border: `1.5px solid ${bhk.includes(b) ? "#1a4fd6" : "rgba(0,0,0,.1)"}`, background: bhk.includes(b) ? "#1a4fd6" : "white", color: bhk.includes(b) ? "white" : "#0d0d0d", transition: "all .15s" }}>{b}</button>
            ))}
          </div>
        </div>

        <div style={{ padding: "14px 16px 16px 16px", borderBottom: "1px solid rgba(0,0,0,.06)" }}>
          <p style={{ fontSize: 13.5, fontWeight: 700, color: "#0d0d0d", marginBottom: 10 }}>Possession Status</p>
          <div className="flex flex-col" style={{ gap: 8 }}>
            {POSSESSION_OPTIONS.map((p) => (
              <button key={p} onClick={() => toggle(possession, p, setPossession)} className="flex items-center gap-2.5" style={{ padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${possession.includes(p) ? "#1a4fd6" : "rgba(0,0,0,.09)"}`, background: possession.includes(p) ? "#EEF2FF" : "white", transition: "all .15s" }}>
                <div className="flex items-center justify-center" style={{ width: 20, height: 20, borderRadius: 99, border: `2px solid ${possession.includes(p) ? "#1a4fd6" : "#d1d5db"}`, background: possession.includes(p) ? "#1a4fd6" : "white", transition: "all .15s", flexShrink: 0 }}>
                  {possession.includes(p) && <Check style={{ width: 10, height: 10, color: "white", strokeWidth: 3 }} />}
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: possession.includes(p) ? "#1a4fd6" : "#0d0d0d" }}>{p}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: "14px 16px 20px 16px" }}>
          <p style={{ fontSize: 13.5, fontWeight: 700, color: "#0d0d0d", marginBottom: 10 }}>
            Key Amenities <span style={{ fontSize: 11, fontWeight: 500, color: "#9ca3af" }}>(optional)</span>
          </p>
          <div className="flex flex-wrap" style={{ gap: 8 }}>
            {AMENITIES.map((a) => (
              <button key={a} onClick={() => toggle(amenities, a, setAmenities)} style={{ padding: "7px 13px", borderRadius: 99, fontSize: 11.5, fontWeight: 600, border: `1.5px solid ${amenities.includes(a) ? "#1a4fd6" : "rgba(0,0,0,.1)"}`, background: amenities.includes(a) ? "#EEF2FF" : "white", color: amenities.includes(a) ? "#1a4fd6" : "#0d0d0d", transition: "all .15s" }}>{a}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="shrink-0" style={{ padding: "12px 16px 20px 16px", borderTop: "1px solid rgba(0,0,0,.08)", background: "white" }}>
        <button onClick={onContinue} className="w-full text-white" style={{ background: "#1a4fd6", borderRadius: 15, padding: "14px", fontSize: 15, fontWeight: 700, boxShadow: "0 4px 18px rgba(26,79,214,.35)" }}>
          Show Properties →
        </button>
      </div>
    </div>
  );
}

// Step 4 — Results

function BuyStep4({ selectedType, selectedLocation, onBack }: { selectedType: string; selectedLocation: string; onBack: () => void }) {
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [activeFilter, setActiveFilter] = useState("Relevance ↓");
  const toggle = (id: number) => setLiked((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <div className="flex flex-col" style={{ height: "100%" }}>
      <div className="flex items-center shrink-0" style={{ padding: "10px 16px", borderBottom: "1px solid rgba(0,0,0,.06)", gap: 10 }}>
        <button onClick={onBack} className="flex items-center justify-center shrink-0" style={{ width: 36, height: 36, borderRadius: 99, border: "1px solid rgba(0,0,0,.1)" }}>
          <ArrowLeft style={{ width: 15, height: 15, color: "#0d0d0d" }} />
        </button>
        <div className="flex flex-1 items-center gap-2" style={{ background: "#f3f4f8", borderRadius: 12, padding: "9px 12px" }}>
          <Search style={{ width: 13, height: 13, color: "#9ca3af" }} />
          <span style={{ fontSize: 12, fontWeight: 500, color: "#0d0d0d" }}>{selectedType} in {selectedLocation}</span>
        </div>
        <button className="flex items-center justify-center shrink-0" style={{ width: 36, height: 36, background: "#f3f4f8", borderRadius: 10 }}>
          <SlidersHorizontal style={{ width: 15, height: 15, color: "#0d0d0d" }} />
        </button>
      </div>

      <div className="shrink-0" style={{ padding: "10px 16px 0 16px" }}>
        <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 9 }}>
          <span style={{ fontWeight: 700, color: "#0d0d0d" }}>2,450 properties</span> found in {selectedLocation}
        </p>
        <div className="flex overflow-x-auto" style={{ gap: 8, paddingBottom: 10, scrollbarWidth: "none" }}>
          {["Relevance ↓", "Budget", "BHK", "Area", "More Filters"].map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)} className="shrink-0" style={{ padding: "6px 12px", borderRadius: 99, fontSize: 11, fontWeight: 600, border: `1.5px solid ${activeFilter === f ? "#1a4fd6" : "rgba(0,0,0,.1)"}`, background: activeFilter === f ? "#EEF2FF" : "white", color: activeFilter === f ? "#1a4fd6" : "#0d0d0d", whiteSpace: "nowrap" }}>{f}</button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ padding: "0 16px 16px 16px", scrollbarWidth: "none" }}>
        {RESULTS.map((p) => (
          <div key={p.id} className="bg-white overflow-hidden" style={{ marginBottom: 14, borderRadius: 18, boxShadow: "0 2px 16px rgba(0,0,0,.08)", border: "1px solid rgba(0,0,0,.05)" }}>
            <div className="relative bg-gray-100" style={{ height: 176 }}>
              <img src={px(p.img, 700, 352)} alt={p.name} className="w-full h-full object-cover" />
              <button onClick={() => toggle(p.id)} className="absolute flex items-center justify-center" style={{ top: 12, right: 12, width: 32, height: 32, background: "rgba(255,255,255,.9)", backdropFilter: "blur(4px)", borderRadius: 99 }}>
                <Heart style={{ width: 16, height: 16, color: liked.has(p.id) ? "#ef4444" : "#9ca3af", fill: liked.has(p.id) ? "#ef4444" : "transparent" }} />
              </button>
              {p.tag && <span style={{ position: "absolute", bottom: 12, left: 12, fontSize: 10, fontWeight: 700, background: "rgba(255,255,255,.92)", color: "#0d0d0d", padding: "3px 10px", borderRadius: 99 }}>{p.tag}</span>}
              {p.verified && (
                <div className="absolute flex items-center gap-1" style={{ top: 12, left: 12, fontSize: 9, fontWeight: 700, background: "#1a4fd6", color: "white", padding: "4px 8px", borderRadius: 99 }}>
                  <Shield style={{ width: 9, height: 9 }} /> LandOS Verified
                </div>
              )}
            </div>
            <div style={{ padding: 14 }}>
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="truncate" style={{ fontSize: 15, fontWeight: 700, color: "#0d0d0d" }}>{p.name}</div>
                  <div className="flex items-center gap-1" style={{ marginTop: 3 }}>
                    <MapPin style={{ width: 11, height: 11, color: "#9ca3af", flexShrink: 0 }} />
                    <span className="truncate" style={{ fontSize: 11, color: "#9ca3af" }}>{p.loc}</span>
                  </div>
                  <div className="flex items-center gap-1" style={{ marginTop: 3 }}>
                    <Star style={{ width: 11, height: 11, color: "#f59e0b", fill: "#f59e0b" }} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#0d0d0d" }}>{p.rating}</span>
                    <span style={{ fontSize: 10, color: "#9ca3af" }}>· {p.builder}</span>
                  </div>
                </div>
                <div style={{ fontSize: 17, fontWeight: 800, marginLeft: 8, color: "#1a4fd6", flexShrink: 0 }}>{p.price}</div>
              </div>
              <div className="flex items-center" style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid rgba(0,0,0,.06)", gap: 14 }}>
                <span className="flex items-center gap-1.5" style={{ fontSize: 11, color: "#6b7280" }}><BedDouble style={{ width: 13, height: 13 }} />{p.beds} Bedrooms</span>
                <span className="flex items-center gap-1.5" style={{ fontSize: 11, color: "#6b7280" }}><Bath style={{ width: 13, height: 13 }} />{p.baths} Baths</span>
                <span style={{ fontSize: 11, color: "#6b7280" }}>{p.area} sqft</span>
              </div>
              <button className="flex items-center justify-center w-full" style={{ marginTop: 12, padding: "10px", border: "1.5px solid #1a4fd6", borderRadius: 12, fontSize: 13, fontWeight: 700, color: "#1a4fd6" }}>
                View Details →
              </button>
            </div>
          </div>
        ))}
        <div style={{ textAlign: "center", fontSize: 12, color: "#9ca3af", paddingBottom: 8 }}>Showing 6 of 2,450 properties</div>
      </div>
    </div>
  );
}

// Buy Flow Container

function BuyFlow({ onBack: goHome }: { onBack: () => void }) {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState("Apartment");
  const [selectedLocation, setSelectedLocation] = useState("Mumbai");
  const [budget, setBudget] = useState<string[]>([]);
  const [bhk, setBhk] = useState<string[]>([]);
  const [possession, setPossession] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [dir, setDir] = useState(1);

  const goTo = (n: number) => { setDir(n > step ? 1 : -1); setStep(n); };
  const next = () => goTo(step + 1);
  const back = () => (step === 1 ? goHome() : goTo(step - 1));

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={step}
        initial={{ x: dir > 0 ? "100%" : "-80%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: dir > 0 ? "-60%" : "80%", opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col"
        style={{ height: "100%" }}
      >
        {step === 1 && <BuyStep1 selectedType={selectedType} onSelect={setSelectedType} onBack={back} onContinue={next} />}
        {step === 2 && <BuyStep2 selectedLocation={selectedLocation} onSelect={setSelectedLocation} onBack={back} onContinue={next} />}
        {step === 3 && <BuyStep3 budget={budget} setBudget={setBudget} bhk={bhk} setBhk={setBhk} possession={possession} setPossession={setPossession} amenities={amenities} setAmenities={setAmenities} onBack={back} onContinue={next} />}
        {step === 4 && <BuyStep4 selectedType={selectedType} selectedLocation={selectedLocation} onBack={back} />}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<"home" | "buy">("home");
  const [activeNav, setActiveNav] = useState("home");
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const toggleLike = (id: number) =>
    setLiked((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(145deg,#080e1e 0%,#0d1f3c 50%,#0a1225 100%)", padding: 16 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-white overflow-hidden flex flex-col"
        style={{ width: 390, height: "min(844px, 92vh)", borderRadius: 48, boxShadow: "0 0 0 10px #111827, 0 0 0 11px #1f2937, 0 40px 100px rgba(0,0,0,.75)" }}
      >
        {/* Dynamic Island */}
        <div className="absolute bg-black z-30" style={{ top: 12, left: "50%", transform: "translateX(-50%)", width: 122, height: 34, borderRadius: 99 }} />

        <AnimatePresence mode="wait">
          {screen === "home" ? (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: "-25%" }} transition={{ duration: 0.25 }} className="flex flex-col" style={{ height: "100%" }}>
              <div className="shrink-0" style={{ paddingTop: 46 }}><StatusBar /></div>
              <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
                <AppHeader />
                <SearchBar />
                <PrimaryActions onAction={(id) => { if (id === "buy") setScreen("buy"); }} />
                <PromoBanner />
                <FeaturedProperties liked={liked} onToggle={toggleLike} />
                <PopularCities />
                <PromoStrip />
                <NearbyProperties liked={liked} onToggle={toggleLike} />
                <NewlyListed />
                <LandAndPlots />
                <ExploreOnMap />
                <Insights />
                <div style={{ height: 16 }} />
              </div>
              <BottomNav active={activeNav} onSelect={setActiveNav} />
            </motion.div>
          ) : (
            <motion.div key="buy" initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col" style={{ height: "100%", paddingTop: 46 }}>
              <BuyFlow onBack={() => setScreen("home")} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="absolute text-center" style={{ bottom: 12, left: "50%", transform: "translateX(-50%)", fontSize: 11, color: "rgba(255,255,255,.28)", whiteSpace: "nowrap" }}>
        LandOS · Premium Indian Real Estate · iOS & Android
      </div>
    </div>
  );
}
