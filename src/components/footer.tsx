import Link from "next/link";

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="12" />
        <text
          x="32"
          y="44"
          textAnchor="middle"
          fontSize="30"
          letterSpacing="-0.04em"
        >
          Nu
        </text>
      </svg>
    </span>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="foot">
      <div className="foot-inner">
        <div className="gutter">
          <div className="eyebrow">
            <span>NU · {year}</span>
            <span style={{ color: "var(--muted-foreground)" }}>Studio</span>
          </div>
          <Link href="/" className="foot-sig-lockup" aria-label="NuSite home">
            <BrandMark />
            <span className="foot-wordmark">NuSite</span>
          </Link>
        </div>
        <nav aria-label="Footer">
          <a href="#work">Work</a>
          <a href="#process">Process</a>
          <a href="#pricing">Pricing</a>
          <a href="#reassure">Promises</a>
          <a href="mailto:studio@nusite.ai">studio@nusite.ai</a>
        </nav>
        <div className="legal">
          <span>&copy; {year} NuSite</span>
          <span>New York, NY · United States</span>
        </div>
      </div>
    </footer>
  );
}
