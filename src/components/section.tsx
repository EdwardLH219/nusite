import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Hue = "blue" | "green" | "red" | "yellow";

interface SectionProps {
  id?: string;
  number: string;
  name: string;
  hue?: Hue;
  className?: string;
  children: ReactNode;
}

/**
 * Gutter-grid section.
 *
 * Renders the signature 2-column layout: a numbered eyebrow in the left
 * gutter, body content on the right, sitting against the vertical hairline
 * that runs the length of the page.
 *
 * `hue` re-tints --accent locally so every accent-using element inside
 * (gutter tick, underlines, dots, tabs, after-labels) picks up that hue.
 */
export function Section({
  id,
  number,
  name,
  hue,
  className,
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn("sec", className)} data-hue={hue}>
      <div className="gutter">
        <div className="eyebrow">
          <span className="num">{number}</span>
          <span className="name">{name}</span>
        </div>
      </div>
      <div className="sec-body">{children}</div>
    </section>
  );
}
