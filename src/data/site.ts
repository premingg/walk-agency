import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";

/**
 * PLACEHOLDER CONTENT LAYER
 * Every export here maps 1:1 to a future CMS collection.
 * Phase 2 swaps these arrays for Lovable Cloud queries — component APIs stay identical.
 */

export const images = { hero1, hero2, hero3, hero4 };

export const settings = {
  name: "WALK Experiential Marketing & Management Pvt. Ltd.",
  short: "WALK",
  tagline: "The Experiential Footprint",
  phone: "+91 98110 56224",
  whatsapp: "919811056224",
  email: "info@walk-agency.in",
  emailAlt: "kanav.kohli@walk-agency.in",
  whatsappMessage: "Hi WALK, I'd like to discuss an upcoming brand experience.",
  emailSubject: "Business enquiry — WALK Experiential",
  address: "71P, Block C, Sector 55, Gurugram, Haryana 122003, India",
  mapQuery: "71P%20Block%20C%20Sector%2055%20Gurugram%20Haryana%20122003",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/walk-experiential/" },
  ],
};

export const nav = [
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Our Work", to: "/work" },
  { label: "Clients", to: "/clients" },
  { label: "Contact", to: "/contact" },
];

/** Secondary links — footer only. */
export const footerNav = [
  { label: "Insights", to: "/insights" },
  { label: "Awards", to: "/awards" },
  { label: "Careers", to: "/careers" },
];

export const secondaryNav = footerNav;

export type Slide = {
  id: string;
  image: string;
  eyebrow: string;
  title: string;
  caption: string;
  to: string;
};

export const heroSlides: Slide[] = [
  {
    id: "s1",
    image: hero1,
    eyebrow: "Live Experience",
    title: "Rooms that\nroar back",
    caption: "Placeholder case study — swap image, copy and link from the CMS.",
    to: "/work/placeholder-launch",
  },
  {
    id: "s2",
    image: hero2,
    eyebrow: "Exhibitions",
    title: "Architecture\nwith a pulse",
    caption: "Placeholder case study — swap image, copy and link from the CMS.",
    to: "/work/placeholder-pavilion",
  },
  {
    id: "s3",
    image: hero3,
    eyebrow: "Activations",
    title: "Street level,\nnational scale",
    caption: "Placeholder case study — swap image, copy and link from the CMS.",
    to: "/work/placeholder-activation",
  },
  {
    id: "s4",
    image: hero4,
    eyebrow: "Corporate",
    title: "Stages built\nfor belief",
    caption: "Placeholder case study — swap image, copy and link from the CMS.",
    to: "/work/placeholder-summit",
  },
];

export type Service = {
  slug: string;
  title: string;
  icon: string;
  short: string;
  detail: string;
  pillar: "Digital" | "Events" | "Activations" | "Relationships";
  tags: string[];
};

export const services: Service[] = [
  {
    slug: "brand-activations",
    title: "Brand Activations",
    icon: "Zap",
    short: "Street, retail and mall-level touchpoints that convert attention into action.",
    detail:
      "Concept, fabrication, manpower and multi-city rollout — engineered so every touchpoint behaves the same in Delhi as it does in Kochi.",
    pillar: "Activations",
    tags: ["activation", "retail"],
  },
  {
    slug: "events-conferences",
    title: "Events & Conferences",
    icon: "CalendarDays",
    short: "Conferences, launches, dealer meets and award nights, produced end to end.",
    detail:
      "Show flow, stage design, technical production and guest journeys held to a single creative standard.",
    pillar: "Events",
    tags: ["event", "corporate"],
  },
  {
    slug: "exhibitions",
    title: "Exhibitions & Pavilions",
    icon: "LayoutGrid",
    short: "Stands and pavilions that pull footfall and hold it.",
    detail: "Spatial design, modular build systems, on-ground crew and post-show analytics.",
    pillar: "Events",
    tags: ["exhibition"],
  },
  {
    slug: "digital-experience",
    title: "Digital Experience",
    icon: "MonitorSmartphone",
    short: "Immersive, interactive and hybrid layers that extend the room.",
    detail:
      "Projection, AR/VR moments, live streaming and content ecosystems that keep an experience alive after the lights go down.",
    pillar: "Digital",
    tags: ["digital", "hybrid"],
  },
  {
    slug: "employee-engagement",
    title: "Employee Engagement",
    icon: "Users",
    short: "Internal culture programmes, offsites and recognition platforms.",
    detail: "Programmes designed around people, not agendas — measured on participation, not attendance.",
    pillar: "Relationships",
    tags: ["engagement", "corporate"],
  },
  {
    slug: "mice-travel",
    title: "MICE & Incentive Travel",
    icon: "Plane",
    short: "Incentive journeys and offsites, logistics fully owned.",
    detail: "Destination scouting, travel desks, ground handling and on-tour experience design.",
    pillar: "Relationships",
    tags: ["mice", "travel"],
  },
];

export const capabilities = [
  "Creative Strategy",
  "Show Production",
  "Set & Stage Design",
  "Fabrication",
  "Technical AV",
  "Talent & Artist Management",
  "Content & Film",
  "Digital & Hybrid",
  "Logistics",
  "Manpower Deployment",
  "Permissions & Compliance",
  "Post-Event Analytics",
];

export type Reason = { title: string; body: string };

export const whyChooseUs: Reason[] = [
  {
    title: "One Partner, Every Format",
    body: "Activations, conferences, exhibitions, digital and MICE handled by one team — no handoffs, no diluted ideas.",
  },
  {
    title: "Strategy Before Spectacle",
    body: "We start with the brief behind the brief, then build the idea that earns attention instead of buying it.",
  },
  {
    title: "Diverse Capability",
    body: "Loyalty programmes, MICE, customer experience centres and brand builds — comprehensive solutions under one roof.",
  },
  {
    title: "Proven Excellence",
    body: "20+ years on ground, partnering with category leaders to deliver impactful, unforgettable experiences.",
  },
  {
    title: "Owned Execution",
    body: "In-house production, fabrication and crew mean the same standard in Delhi as in Kochi — on time, on budget.",
  },
  {
    title: "Measured Outcomes",
    body: "Every experience is read back with footfall, engagement and reach data, so the next one performs harder.",
  },
];



export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  industry: string;
  year: string;
  city: string;
  coords: { x: number; y: number };
  image: string;
  gallery: string[];
  featured: boolean;
  serviceTags: string[];
  overview: string;
  objective: string;
  approach: string;
  highlights: string[];
};

export const projects: Project[] = [
  {
    slug: "placeholder-launch",
    title: "Nationwide Product Launch",
    client: "Placeholder Client",
    category: "Events",
    industry: "Technology",
    year: "2025",
    city: "Mumbai",
    coords: { x: 26, y: 63 },
    image: hero1,
    gallery: [hero1, hero4, hero2],
    featured: true,
    serviceTags: ["event", "digital"],
    overview: "Placeholder overview copy — a single launch moment carried across a live room and a national stream.",
    objective: "Placeholder objective — land a new category story with press, partners and internal teams at once.",
    approach: "Placeholder approach — one narrative spine, three formats, a single production crew.",
    highlights: ["Placeholder highlight one", "Placeholder highlight two", "Placeholder highlight three"],
  },
  {
    slug: "placeholder-pavilion",
    title: "Flagship Expo Pavilion",
    client: "Placeholder Client",
    category: "Exhibitions",
    industry: "Manufacturing",
    year: "2025",
    city: "Delhi NCR",
    coords: { x: 33, y: 38 },
    image: hero2,
    gallery: [hero2, hero1, hero3],
    featured: true,
    serviceTags: ["exhibition"],
    overview: "Placeholder overview copy — a pavilion built to be walked through, not looked at.",
    objective: "Placeholder objective — convert expo footfall into qualified conversations.",
    approach: "Placeholder approach — spatial storytelling with a guided route and interactive nodes.",
    highlights: ["Placeholder highlight one", "Placeholder highlight two", "Placeholder highlight three"],
  },
  {
    slug: "placeholder-activation",
    title: "Multi-City Street Activation",
    client: "Placeholder Client",
    category: "Activations",
    industry: "FMCG",
    year: "2024",
    city: "Bengaluru",
    coords: { x: 31, y: 76 },
    image: hero3,
    gallery: [hero3, hero1],
    featured: true,
    serviceTags: ["activation", "retail"],
    overview: "Placeholder overview copy — a repeatable kiosk system deployed across markets.",
    objective: "Placeholder objective — sampling at scale without losing brand control.",
    approach: "Placeholder approach — one modular unit, trained crews, live reporting.",
    highlights: ["Placeholder highlight one", "Placeholder highlight two"],
  },
  {
    slug: "placeholder-summit",
    title: "Annual Leadership Summit",
    client: "Placeholder Client",
    category: "Events",
    industry: "Financial Services",
    year: "2024",
    city: "Hyderabad",
    coords: { x: 34, y: 70 },
    image: hero4,
    gallery: [hero4, hero2],
    featured: false,
    serviceTags: ["event", "corporate"],
    overview: "Placeholder overview copy — a two-day summit with a single visual language.",
    objective: "Placeholder objective — align a distributed leadership group.",
    approach: "Placeholder approach — content design first, production second.",
    highlights: ["Placeholder highlight one", "Placeholder highlight two"],
  },
  {
    slug: "placeholder-dealer-meet",
    title: "Regional Dealer Meet",
    client: "Placeholder Client",
    category: "Events",
    industry: "Automotive",
    year: "2024",
    city: "Kolkata",
    coords: { x: 45, y: 55 },
    image: hero1,
    gallery: [hero1, hero3],
    featured: false,
    serviceTags: ["event"],
    overview: "Placeholder overview copy.",
    objective: "Placeholder objective.",
    approach: "Placeholder approach.",
    highlights: ["Placeholder highlight one"],
  },
  {
    slug: "placeholder-hybrid",
    title: "Hybrid Customer Conclave",
    client: "Placeholder Client",
    category: "Digital",
    industry: "Technology",
    year: "2023",
    city: "Pune",
    coords: { x: 27, y: 66 },
    image: hero2,
    gallery: [hero2, hero4],
    featured: false,
    serviceTags: ["digital", "hybrid"],
    overview: "Placeholder overview copy.",
    objective: "Placeholder objective.",
    approach: "Placeholder approach.",
    highlights: ["Placeholder highlight one"],
  },
];

export const industries = [
  "Technology",
  "Automotive",
  "FMCG",
  "Financial Services",
  "Pharma & Healthcare",
  "Manufacturing",
  "Retail",
  "Energy",
];

export type Client = { id: string; name: string; mark: string };

export const clients: Client[] = [
  "Aurora Labs",
  "Northwind",
  "Vertex Auto",
  "Bluepeak",
  "Solstice",
  "Kinetic",
  "Meridian",
  "Ironwood",
  "Lumen Bank",
  "Corvus",
  "Halcyon",
  "Terrafirma",
  "Novena",
  "Skyline Co",
].map((name, i) => ({ id: `client-${i + 1}`, name, mark: name.slice(0, 2).toUpperCase() }));

export const stats = [
  { label: "Years in the game", value: 20, suffix: "+", note: "Two decades of producing brand experiences across formats and cities." },
  { label: "Experiences delivered", value: 100, suffix: "+", note: "From flagship launches to multi-city activations and corporate summits." },
  { label: "People reached", value: 250000, suffix: "+", note: "Real audiences touched through live, digital and hybrid touchpoints." },
  { label: "Cities activated", value: 45, suffix: "+", note: "National footprint with consistent execution standards everywhere." },
  { label: "Brands served", value: 60, suffix: "+", note: "Long-term partners across technology, auto, FMCG and finance." },
  { label: "Countries", value: 6, suffix: "", note: "Cross-border programmes handled with local insight and global polish." },
];




export const testimonials = [
  {
    id: "t1",
    quote: "Placeholder testimonial — replace with a real client quote from the CMS.",
    author: "Client Name",
    role: "Designation, Company",
  },
  {
    id: "t2",
    quote: "Placeholder testimonial — replace with a real client quote from the CMS.",
    author: "Client Name",
    role: "Designation, Company",
  },
  {
    id: "t3",
    quote: "Placeholder testimonial — replace with a real client quote from the CMS.",
    author: "Client Name",
    role: "Designation, Company",
  },
];

export const timeline = [
  { year: "Year 1", title: "WALK begins", body: "Placeholder milestone copy." },
  { year: "Year 2", title: "First national rollout", body: "Placeholder milestone copy." },
  { year: "Year 3", title: "In-house production", body: "Placeholder milestone copy." },
  { year: "Today", title: "The Experiential Footprint", body: "Placeholder milestone copy." },
];

export const team = Array.from({ length: 4 }, (_, i) => ({
  id: `team-${i + 1}`,
  name: `Team Member ${i + 1}`,
  title: "Designation",
  image: "",
}));

export const awards = Array.from({ length: 6 }, (_, i) => ({
  id: `award-${i + 1}`,
  title: `Award Placeholder ${i + 1}`,
  body: "Category placeholder",
  year: "—",
}));

export const galleryItems = [
  { id: "g1", type: "photo" as const, category: "Events", src: hero1, alt: "Live stage with crowd" },
  { id: "g2", type: "photo" as const, category: "Exhibitions", src: hero2, alt: "Exhibition pavilion interior" },
  { id: "g3", type: "photo" as const, category: "Activations", src: hero3, alt: "Street activation kiosk at night" },
  { id: "g4", type: "photo" as const, category: "Events", src: hero4, alt: "Conference stage keynote" },
  {
    id: "g5",
    type: "video" as const,
    category: "Events",
    youtubeId: "aqz-KE-bpKQ",
    poster: hero1,
    alt: "Event film placeholder",
  },
  {
    id: "g6",
    type: "video" as const,
    category: "Activations",
    youtubeId: "aqz-KE-bpKQ",
    poster: hero3,
    alt: "Activation film placeholder",
  },
];

export const insights = [
  {
    slug: "placeholder-article-one",
    title: "What makes an experience stick",
    excerpt: "Placeholder excerpt — short-form, swappable from the CMS.",
    category: "Perspective",
    date: "2026-06-12",
    image: hero2,
    body: "Placeholder article body. Replace with real editorial content via the CMS.",
  },
  {
    slug: "placeholder-article-two",
    title: "Hybrid is not a compromise",
    excerpt: "Placeholder excerpt — short-form, swappable from the CMS.",
    category: "Industry",
    date: "2026-05-02",
    image: hero4,
    body: "Placeholder article body. Replace with real editorial content via the CMS.",
  },
  {
    slug: "placeholder-article-three",
    title: "Designing for the second row",
    excerpt: "Placeholder excerpt — short-form, swappable from the CMS.",
    category: "Craft",
    date: "2026-03-21",
    image: hero1,
    body: "Placeholder article body. Replace with real editorial content via the CMS.",
  },
];

export const jobs = [
  { id: "j1", title: "Project Manager — Events", location: "Gurugram", type: "Full time" },
  { id: "j2", title: "3D Set Designer", location: "Gurugram", type: "Full time" },
  { id: "j3", title: "Client Servicing Intern", location: "Gurugram", type: "Internship" },
];
