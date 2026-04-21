"use client";

import Image from "next/image";
import Link from "next/link";
import { usePreviewModal } from "./preview-modal";
import { images } from "@/lib/content";

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
            <Image src={images.logoMark} alt="" width={22} height={22} priority />
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
