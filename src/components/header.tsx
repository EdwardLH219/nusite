"use client";

import Link from "next/link";
import { usePreviewModal } from "./preview-modal";

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

export function Header() {
  const { open } = usePreviewModal();

  return (
    <header className="hdr">
      <div className="hdr-inner">
        <div className="gutter">
          <span
            className="mono"
            style={{
              color: "var(--caption)",
              fontSize: 11,
              letterSpacing: "0.08em",
            }}
          >
            NU · 01
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(16px, 3vw, 40px)",
          }}
        >
          <Link href="/" className="brand" aria-label="NuSite home">
            <BrandMark />
            <span>NuSite</span>
          </Link>
          <nav aria-label="Main">
            <a href="#work">Work</a>
            <a href="#process">Process</a>
            <a href="#pricing">Pricing</a>
            <a href="#reassure">Studio</a>
          </nav>
        </div>

        <div className="hdr-cta">
          <span className="loc">New York · US</span>
          <button
            type="button"
            onClick={open}
            className="btn btn-primary btn-sm"
          >
            Get my free preview <span className="arr">→</span>
          </button>
        </div>
      </div>
    </header>
  );
}
