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
        </div>
        <nav aria-label="Footer">
          <a href="#work">Work</a>
          <a href="#process">Process</a>
          <a href="#pricing">Pricing</a>
          <a href="#reassure">Promises</a>
          <a href="mailto:studio@nusite.co">studio@nusite.co</a>
        </nav>
        <div className="legal">
          <span>&copy; {year} NuSite Studio Inc.</span>
          <span>New York, NY · United States</span>
        </div>
      </div>
    </footer>
  );
}
