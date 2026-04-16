"use client";

import { motion } from "motion/react";
import type { Variants } from "motion/react";
import {
  fadeIn,
  fadeInUp,
  scaleIn,
  slideInLeft,
  slideInRight,
  staggerContainer,
  staggerContainerSlow,
  viewport,
} from "@/lib/motion";

type RevealVariant = "fade" | "fadeUp" | "scaleIn" | "slideLeft" | "slideRight";

const variantMap: Record<RevealVariant, Variants> = {
  fade: fadeIn,
  fadeUp: fadeInUp,
  scaleIn,
  slideLeft: slideInLeft,
  slideRight: slideInRight,
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
}

export function Reveal({
  children,
  className,
  variant = "fadeUp",
}: RevealProps) {
  return (
    <motion.div
      variants={variantMap[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: React.ReactNode;
  className?: string;
  slow?: boolean;
}

export function RevealGroup({
  children,
  className,
  slow = false,
}: RevealGroupProps) {
  return (
    <motion.div
      variants={slow ? staggerContainerSlow : staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface RevealItemProps {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
}

export function RevealItem({
  children,
  className,
  variant = "fadeUp",
}: RevealItemProps) {
  return (
    <motion.div variants={variantMap[variant]} className={className}>
      {children}
    </motion.div>
  );
}
