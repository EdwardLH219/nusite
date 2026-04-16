import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}

export function Eyebrow({ children, className, accent = false }: EyebrowProps) {
  return (
    <span
      className={cn(
        "text-eyebrow",
        accent ? "text-accent" : "text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}
