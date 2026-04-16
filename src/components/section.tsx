import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionBackground = "white" | "surface" | "muted" | "dark";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerSize?: "default" | "narrow" | "wide";
  padding?: "default" | "lg" | "xl" | "none";
  background?: SectionBackground;
  id?: string;
}

const paddingMap = {
  none: "",
  default: "py-24 md:py-32",
  lg: "py-28 md:py-40",
  xl: "py-32 md:py-44",
} as const;

const backgroundMap: Record<SectionBackground, string> = {
  white: "bg-background text-foreground",
  surface: "bg-surface text-foreground",
  muted: "bg-muted text-foreground",
  dark: "bg-foreground text-background",
};

export function Section({
  children,
  className,
  containerSize = "default",
  padding = "default",
  background = "white",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(paddingMap[padding], backgroundMap[background], className)}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}
