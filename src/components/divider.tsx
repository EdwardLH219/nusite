import { cn } from "@/lib/utils";
import { Container } from "./container";

interface DividerProps {
  className?: string;
  subtle?: boolean;
  contained?: boolean;
  containerSize?: "default" | "narrow" | "wide";
}

export function Divider({
  className,
  subtle = false,
  contained = true,
  containerSize = "default",
}: DividerProps) {
  const hr = (
    <hr className={cn(subtle ? "divider-subtle" : "divider", className)} />
  );

  if (contained) {
    return <Container size={containerSize}>{hr}</Container>;
  }

  return hr;
}
