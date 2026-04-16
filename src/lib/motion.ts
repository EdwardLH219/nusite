import type { Transition, Variants } from "motion/react";

/**
 * NuSite motion system.
 *
 * Every animation is restrained and purposeful — subtle reveals,
 * gentle lifts. No bounces, no dramatic swooshes.
 */

/* ─── Easing curves ─── */

export const ease = {
  out: [0.16, 1, 0.3, 1] as [number, number, number, number],
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
  subtle: [0.4, 0, 0.2, 1] as [number, number, number, number],
};

/* ─── Transition presets ─── */

export const transition = {
  fast: { duration: 0.15, ease: ease.out } satisfies Transition,
  default: { duration: 0.35, ease: ease.out } satisfies Transition,
  slow: { duration: 0.5, ease: ease.out } satisfies Transition,
  slower: { duration: 0.7, ease: ease.out } satisfies Transition,
  spring: {
    type: "spring" as const,
    stiffness: 260,
    damping: 28,
  } satisfies Transition,
};

/* ─── Animation variants ─── */

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition.slow },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: ease.out },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: ease.out },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: ease.out },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: ease.out },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: ease.out },
  },
};

/* ─── Container variants (for staggered children) ─── */

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

/* ─── Viewport trigger defaults ─── */

export const viewport = {
  once: true,
  margin: "-80px",
} as const;
