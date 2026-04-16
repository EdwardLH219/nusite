"use client";

import type { VariantProps } from "class-variance-authority";
import { usePreviewModal } from "./preview-modal";
import { Button, buttonVariants } from "./ui/button";

export function PreviewTrigger({
  children,
  className,
  variant,
  size,
}: {
  children: React.ReactNode;
  className?: string;
} & VariantProps<typeof buttonVariants>) {
  const { open } = usePreviewModal();

  return (
    <Button onClick={open} variant={variant} size={size} className={className}>
      {children}
    </Button>
  );
}
