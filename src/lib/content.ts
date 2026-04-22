/**
 * NuSite — Homepage content
 *
 * All structured copy and image references in one place.
 * Edit here to update the site without touching components.
 */

/* ─── Image paths ─── */

export const images = {
  og: "/images/og-image.png",
  logoMark: "/logo-mark.svg",
  hero: {
    before: "/images/hero/old_site.webp",
    after: "/images/hero/new_site.jpg",
  },
} as const;

/* ─── Hero stats (01) ─── */

export interface HeroStat {
  n: string;
  l: string;
}

export const heroStats: HeroStat[] = [
  { n: "24 hours", l: "From paid brief to live site." },
  { n: "$0", l: "To see the preview. If it doesn’t feel right, you walk." },
  { n: "100%", l: "You own the code, the copy, the domain. All of it." },
  { n: "One", l: "Phone call. We do the rest while you run the business." },
];

/* ─── Problem (02) ─── */

export interface ProblemPoint {
  n: string;
  heading: string;
  body: string;
}

export const problemPoints: ProblemPoint[] = [
  {
    n: "i.",
    heading: "A referral checks you online before they call.",
    body: "They open your site on their phone at a kitchen table. Whatever they see there decides whether you get the call.",
  },
  {
    n: "ii.",
    heading: "First impressions happen in silence.",
    body: "A visitor decides how they feel about your business in under a second. Before they’ve read a word. And the feeling sticks.",
  },
  {
    n: "iii.",
    heading: "The lost enquiries are invisible.",
    body: "The ones who leave don’t email. They don’t call. They quietly choose someone else, and you never know it happened.",
  },
];

/* ─── Outcomes (03) ─── */

export interface Outcome {
  idx: string;
  heading: string;
  body: string;
}

export const outcomes: Outcome[] = [
  {
    idx: "i.",
    heading: "The site stops embarrassing you in front of referrals.",
    body: "You stop apologizing before you send someone the link. It does its job on its own.",
  },
  {
    idx: "ii.",
    heading: "New clients take you seriously on the first visit.",
    body: "The people who find you already believe your work is good. Enquiries arrive warm.",
  },
  {
    idx: "iii.",
    heading: "You stop paying a web person who doesn’t return calls.",
    body: "No more waiting two weeks for a phone-number change. You get an editor you can use, and a studio that answers.",
  },
  {
    idx: "iv.",
    heading: "It’s handled. You go back to running the business.",
    body: "One conversation, one approval, one handover. Then it’s done — and it stays done.",
  },
];

/* ─── Proof / Before & After (04) ─── */

export interface ProofCase {
  id: string;
  tab: string;
  name: string;
  loc: string;
  delta_n: string;
  delta_l: string;
  url: string;
  turnaround: string;
  moved: string;
  said: string;
  /** Optional case-specific screenshots. Falls back to hero pair if absent. */
  beforeImage?: string;
  afterImage?: string;
}

export const proofCases: ProofCase[] = [
  {
    id: "studio",
    tab: "Studio",
    name: "Aesthetic Design Group",
    loc: "Portland, OR · Independent architecture practice",
    delta_n: "+2.1×",
    delta_l: "project enquiries year-on-year",
    url: "adg-architecture.com",
    turnaround: "14 hours",
    moved: "Portfolio finally did the talking",
    said: "“We stopped dreading the link.”",
    beforeImage: "/images/showcase/consulting-firm/before.png",
    afterImage: "/images/showcase/consulting-firm/after.png",
  },
  {
    id: "legal",
    tab: "Law firm",
    name: "Mason & Associates",
    loc: "Chicago, IL · Full-service law firm · est. 1998",
    delta_n: "+52%",
    delta_l: "qualified leads quarter-on-quarter",
    url: "masonlaw.com",
    turnaround: "22 hours",
    moved: "Seniority legible at a glance",
    said: "“Clients arrive already decided.”",
    beforeImage: "/images/showcase/law-firm/before.png",
    afterImage: "/images/showcase/law-firm/after.png",
  },
  {
    id: "medical",
    tab: "Medical",
    name: "Cityside Medical Care",
    loc: "Community medical practice · Family care · est. 2008",
    delta_n: "+38%",
    delta_l: "enquiries in first 30 days",
    url: "citysidemedical.com",
    turnaround: "18 hours",
    moved: "Credibility in the first scroll",
    said: "“It finally looks like us.”",
    beforeImage: "/images/showcase/medical-practice/before.png",
    afterImage: "/images/showcase/medical-practice/after.png",
  },
];

/* ─── Process (05) ─── */

export interface Step {
  number: string;
  heading: string;
  time: string;
  body: string;
}

export const steps: Step[] = [
  {
    number: "01",
    heading: "Send us the URL you’re tired of looking at.",
    time: "Hour 0 · 20-minute call",
    body: "We ask ten questions about your clients and your work. You don’t prepare anything. Logo or no logo — we’ve got it.",
  },
  {
    number: "02",
    heading: "We build the replacement. Quietly.",
    time: "Hours 1–20 · No back-and-forth",
    body: "No Slack channel. No Figma link. No status updates. You run your business; we build the site. When it’s ready, we send one link.",
  },
  {
    number: "03",
    heading: "Approve it, or walk away owing nothing.",
    time: "Hour 24 · Your call",
    body: "You see the finished site on a staging link. If it feels right, you pay once and we go live. If it doesn’t, we part on good terms.",
  },
];

/* ─── Comparison (06) ─── */

export interface CompareOption {
  cap: string;
  heading: string;
  amt: string;
  term: string;
  bullets: string[];
  footer: string;
  featured?: boolean;
}

export const compareOptions: CompareOption[] = [
  {
    cap: "Option A",
    heading: "Do nothing",
    amt: "$0",
    term: "/ upfront",
    bullets: [
      "Current site keeps losing referrals, quietly.",
      "You keep apologizing before you send the link.",
      "The cost shows up as enquiries that never arrive.",
      "No invoice — the bill is paid in missed clients.",
    ],
    footer: "Free today. Expensive over a year.",
  },
  {
    cap: "Option B",
    heading: "Hire a web agency",
    amt: "$8,000 – $25,000",
    term: "+ retainer",
    bullets: [
      "Six weeks of kick-off calls and mood boards.",
      "Three designers, a project manager, and a brief.",
      "Change requests billed at hourly rates.",
      "The good ones are booked. The rest are a gamble.",
    ],
    footer: "Fine, if you enjoy meetings.",
  },
  {
    cap: "Option C · Recommended",
    heading: "NuSite",
    amt: "$299",
    term: "/ flat, one-time",
    bullets: [
      "Free preview. You see the site before you pay.",
      "Live in days, not months.",
      "You own the code, copy, domain, and photos outright.",
      "One studio. One number. Calls returned the same day.",
    ],
    footer: "",
    featured: true,
  },
];

/* ─── Reassurance (07) ─── */

export interface Reassurance {
  k: string;
  heading: string;
  body: string;
}

export const reassurances: Reassurance[] = [
  {
    k: "I.",
    heading: "You approve before you pay.",
    body: "No deposit. No retainer. You see the finished site on your domain, in private, before a single dollar changes hands.",
  },
  {
    k: "II.",
    heading: "You own everything at the end.",
    body: "The domain, the hosting login, the source code, the copy we wrote. We hand over the keys, not a licence.",
  },
  {
    k: "III.",
    heading: "Calls answered the same day.",
    body: "One number. One studio. No ticket queue. If you need to change a phone number at 4pm on a Tuesday, it’s live by 5pm.",
  },
  {
    k: "IV.",
    heading: "Quiet by design.",
    body: "No newsletter sign-ups. No upsell emails. We build it, hand it over, and disappear.",
  },
];
