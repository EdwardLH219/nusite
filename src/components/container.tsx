import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  size?: "default" | "narrow" | "wide";
}

const sizeMap = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

export function Container({
  children,
  className,
  as: Component = "div",
  size = "default",
}: ContainerProps) {
  return (
    <Component className={cn("mx-auto w-full px-5 sm:px-8 lg:px-12", sizeMap[size], className)}>
      {children}
    </Component>
  );
}
