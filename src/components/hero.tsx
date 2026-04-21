"use client";

import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { usePreviewModal } from "./preview-modal";
import { heroStats } from "@/lib/content";

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero() {
  const { open } = usePreviewModal();

  return (
    <section id="hero" className="sec hero">
      <div className="gutter">
        <div className="eyebrow">
          <span className="num">01 / 08</span>
          <span className="name">Hook</span>
        </div>
      </div>
      <motion.div
        className="sec-body"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={fadeUp} className="headline">
          The same business.{" "}
          <span className="soft">A different first impression.</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="lede sub">
          You already run the business. We build the website that finally looks
          like it. Send us the URL you’re not proud of — we’ll quietly build
          the replacement and show it to you, free, before you decide anything.
        </motion.p>

        <motion.div variants={fadeUp} className="cta-row">
          <button
            type="button"
            onClick={open}
            className="btn btn-primary"
          >
            Get my free preview <span className="arr">→</span>
          </button>
          <a href="#work" className="btn btn-secondary">
            See before &amp; after
          </a>
        </motion.div>

        <motion.div variants={fadeUp} className="promise">
          <span className="dot" aria-hidden="true" />
          <span>
            No commitment. See your preview first. Pay only if it feels right.
          </span>
        </motion.div>

        <motion.div variants={fadeUp} className="hero-strip">
          {heroStats.map((stat) => (
            <div key={stat.n} className="stat">
              <div className="n">{stat.n}</div>
              <div className="l">{stat.l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
