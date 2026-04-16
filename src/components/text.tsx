import { cn } from "@/lib/utils";

type TextTag = "p" | "span" | "div" | "li" | "blockquote";

interface TextProps {
  children: React.ReactNode;
  as?: TextTag;
  size?: "sm" | "base" | "lg";
  muted?: boolean;
  caption?: boolean;
  className?: string;
  balance?: boolean;
}

const sizeStyles = {
  sm: "text-body-sm",
  base: "text-body",
  lg: "text-body-lg",
} as const;

export function Text({
  children,
  as: Component = "p",
  size = "base",
  muted = false,
  caption = false,
  className,
  balance = false,
}: TextProps) {
  return (
    <Component
      className={cn(
        sizeStyles[size],
        caption
          ? "text-caption"
          : muted
            ? "text-muted-foreground"
            : "text-foreground",
        balance && "text-balance",
        className
      )}
    >
      {children}
    </Component>
  );
}
