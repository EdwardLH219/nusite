"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium tracking-[-0.01em] select-none transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 hover:shadow-sm hover:-translate-y-px active:translate-y-0",
        secondary:
          "border border-border bg-background text-foreground hover:bg-secondary hover:border-border hover:shadow-xs hover:-translate-y-px active:translate-y-0",
        ghost: "text-foreground hover:bg-secondary",
        accent:
          "bg-accent text-accent-foreground shadow-xs hover:bg-accent/90 hover:shadow-sm hover:-translate-y-px active:translate-y-0",
        link: "text-foreground underline underline-offset-[3px] decoration-border decoration-1 hover:decoration-foreground p-0 h-auto font-normal",
        "link-accent":
          "text-accent underline underline-offset-[3px] decoration-transparent decoration-1 hover:decoration-accent p-0 h-auto font-normal",
      },
      size: {
        sm: "h-9 px-4 text-[0.8125rem] rounded-md",
        default: "h-11 px-6 text-[0.875rem] rounded-lg",
        lg: "h-12 px-8 text-[0.9375rem] rounded-lg",
        xl: "h-14 px-10 text-[0.9375rem] rounded-[0.625rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
