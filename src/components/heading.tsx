import { cn } from "@/lib/utils";

type HeadingLevel = "display" | "h1" | "h2" | "h3" | "h4";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "p" | "span";

interface HeadingProps {
  children: React.ReactNode;
  as?: HeadingTag;
  level?: HeadingLevel;
  className?: string;
  balance?: boolean;
  muted?: boolean;
}

const levelStyles: Record<HeadingLevel, string> = {
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
};

const defaultTag: Record<HeadingLevel, HeadingTag> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
};

export function Heading({
  children,
  as,
  level = "h2",
  className,
  balance = true,
  muted = false,
}: HeadingProps) {
  const Component: HeadingTag = as || defaultTag[level];
  return (
    <Component
      className={cn(
        "font-heading",
        muted ? "text-muted-foreground" : "text-foreground",
        levelStyles[level],
        balance && "text-balance",
        className
      )}
    >
      {children}
    </Component>
  );
}
