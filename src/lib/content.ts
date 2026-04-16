/**
 * NuSite — Homepage content
 *
 * All structured copy and image references in one place.
 * Edit here to update the site without touching components.
 */

/* ─── Image paths ─── */

export const images = {
  og: "/images/og-image.png",
  hero: {
    before: "/images/hero/old_site.webp",
    after: "/images/hero/new_site.jpg",
  },
} as const;

/* ─── Problem section ─── */

export interface ProblemPoint {
  heading: string;
  body: string;
}

export const problemPoints: ProblemPoint[] = [
  {
    heading: "People judge in under a second",
    body: "Research consistently shows that people form an opinion about a website almost instantly. That opinion transfers directly to the business behind it — before they read a word.",
  },
  {
    heading: "The lost enquiries are invisible",
    body: "The customers who leave because your website does not feel trustworthy never tell you. They do not email. They do not call. They simply choose someone else.",
  },
];

/* ─── Outcomes section ─── */

export interface Outcome {
  heading: string;
  body: string;
}

export const outcomes: Outcome[] = [
  {
    heading: "Visitors trust you before they call",
    body: "A clean, modern website tells people your business is established and professional — before they read a single word. First impressions happen in silence.",
  },
  {
    heading: "Enquiries arrive with confidence",
    body: "When your website builds trust, people are far more likely to pick up the phone or fill out a form. They reach out already feeling good about the decision.",
  },
  {
    heading: "Your online presence finally matches your reputation",
    body: "When someone searches your name, your website is the first thing they judge. Make sure it tells the story your work has already earned.",
  },
];

/* ─── Before / After showcase ─── */

export interface ShowcaseItem {
  id: string;
  category: string;
  description: string;
  beforeImage?: string;
  afterImage?: string;
  beforeAlt: string;
  afterAlt: string;
  beforeCaption: string;
  afterCaption: string;
}

export const showcaseItems: ShowcaseItem[] = [
  {
    id: "medical-practice",
    category: "Medical Practice",
    description:
      "A physiotherapy clinic with 12 years of patient trust — but a website that looked like it was built on a free template in 2012.",
    beforeImage: "/images/showcase/medical-practice/before.png",
    afterImage: "/images/showcase/medical-practice/after.png",
    beforeAlt: "Outdated medical practice website before NuSite redesign",
    afterAlt: "Modern medical practice website after NuSite redesign",
    beforeCaption:
      "Outdated layout, stock imagery, hard to navigate on mobile",
    afterCaption:
      "Clean, professional, mobile-first — built to reflect clinical excellence",
  },
  {
    id: "law-firm",
    category: "Law Firm",
    description:
      "A family law firm known for personal service and strong local reputation — let down by a website that felt generic and impersonal.",
    beforeImage: "/images/showcase/law-firm/before.png",
    afterImage: "/images/showcase/law-firm/after.png",
    beforeAlt: "Outdated law firm website before NuSite redesign",
    afterAlt: "Modern law firm website after NuSite redesign",
    beforeCaption: "Dense text, dated design, no clear path to make contact",
    afterCaption:
      "Authoritative and warm — the trust their clients already feel, now visible online",
  },
  {
    id: "consulting-firm",
    category: "Consulting Firm",
    description:
      "A management consulting practice competing against larger firms — their expertise was world-class, but their website told a different story.",
    beforeImage: "/images/showcase/consulting-firm/before.png",
    afterImage: "/images/showcase/consulting-firm/after.png",
    beforeAlt: "Outdated consulting firm website before NuSite redesign",
    afterAlt: "Modern consulting firm website after NuSite redesign",
    beforeCaption: "Template-based, no differentiation, weak first impression",
    afterCaption:
      "Premium positioning that matches the calibre of their advisory work",
  },
];

/* ─── How It Works ─── */

export interface Step {
  number: string;
  heading: string;
  body: string;
}

export const steps: Step[] = [
  {
    number: "01",
    heading: "Send us your website",
    body: "Share your URL and tell us a little about your business. We take it from there — no questionnaires, no workshops, no homework.",
  },
  {
    number: "02",
    heading: "See your new site — free",
    body: "We build a complete preview of your new website. You review it on your own time. If it is not right, you walk away with nothing owed.",
  },
  {
    number: "03",
    heading: "Approve and go live",
    body: "Happy with what you see? We handle the launch. Your new website is live and working for your business — typically within days.",
  },
];

/* ─── Comparison ─── */

export interface Alternative {
  label: string;
  heading: string;
  body: string[];
  bottomLine: string;
}

export const alternatives: Alternative[] = [
  {
    label: "The cost of waiting",
    heading: "Do nothing",
    body: [
      "No cost and no effort — but the gap between your reputation and your online presence grows wider every month.",
      "The enquiries you never receive are invisible. You cannot measure what a dated website is quietly costing — but your competitors benefit from every customer who looks elsewhere.",
    ],
    bottomLine: "Your website ages. Your competitors invest in theirs.",
  },
  {
    label: "The traditional route",
    heading: "Hire an agency",
    body: [
      "Traditional agencies produce quality work. But expect to invest several thousand upfront, navigate weeks of discovery, and manage multiple revision cycles before anything goes live.",
      "For most service businesses, this is significantly more time, cost, and complexity than the problem actually requires.",
    ],
    bottomLine:
      "Excellent results — if you have the budget and the patience.",
  },
];

export const nuSiteBenefits: string[] = [
  "Free preview before any commitment",
  "Live in days, not months",
  "One transparent price, no hidden fees",
  "Everything is yours — no lock-in, ever",
];

/* ─── Trust / Reassurance ─── */

export interface Reassurance {
  heading: string;
  body: string;
  detail: string;
}

export const reassurances: Reassurance[] = [
  {
    heading: "Preview first, always",
    body: "You see your new website before any commitment. No deposit, no obligation, no credit card. If it is not right for your business, walk away with nothing owed.",
    detail:
      "Your preview is built specifically for your business — not a template.",
  },
  {
    heading: "Clear, honest pricing",
    body: "One fair price, stated upfront before we begin. No hidden fees, no surprise invoices, no ongoing retainers that quietly accumulate.",
    detail: "The price you see is the price you pay. Full stop.",
  },
  {
    heading: "You own everything",
    body: "Your website is fully yours. We hand over the code, the content, the domain — everything. No lock-in, no proprietary platform, no dependency on us.",
    detail: "Move, modify, or manage it however you choose.",
  },
  {
    heading: "Real people, real responses",
    body: "Questions are answered by a real person, clearly and promptly. We will never chase you, rush you, or pressure you into a decision.",
    detail: "Take your time. We are here when you are ready.",
  },
];
