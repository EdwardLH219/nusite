"use client";

import { useEffect, useState } from "react";
import { Container } from "./container";
import { PreviewTrigger } from "./preview-trigger";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 10);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ease-out",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-xs"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <Container>
        <nav aria-label="Main" className="flex h-16 md:h-[4.5rem] items-center justify-between">
          <a
            href="/"
            className="text-[1.125rem] font-semibold tracking-[-0.02em] text-foreground"
          >
            NuSite
          </a>

          <PreviewTrigger size="sm">Get My Free Preview</PreviewTrigger>
        </nav>
      </Container>
    </header>
  );
}
