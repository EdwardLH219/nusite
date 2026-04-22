"use client";

import Image from "next/image";
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
    <section id="hero" className="sec hero" data-hue="blue">
      <div className="gutter">
        <div className="eyebrow">
          <span className="num">01 / 08</span>
          <span className="name">Welcome</span>
        </div>
      </div>
      <motion.div
        className="sec-body"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Floated first so the headline + body copy wrap around it */}
        <motion.div
          className="hero-mock"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <div className="hero-image">
            <Image
              src="/images/hero/hero.png"
              alt="A NuSite redesign in action"
              width={1402}
              height={1122}
              priority
            />
          </div>
        </motion.div>

        <motion.h1 variants={fadeUp} className="headline">
          The same business.{" "}
          <span className="soft">
            {"A "}
            <em className="un">different</em> first impression.
          </span>
        </motion.h1>

        <motion.p variants={fadeUp} className="lede sub">
          You run the business. We build the website that finally looks like
          it. Send us the URL — we’ll show you the replacement,{" "}
          <em className="un">free</em>.
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
            No commitment. See your preview first.
            <br className="promise-break" />
            {" "}Pay only if it feels right.
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
