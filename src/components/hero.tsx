"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { Container } from "./container";
import { Heading } from "./heading";
import { Text } from "./text";
import { Button } from "./ui/button";
import { PreviewTrigger } from "./preview-trigger";
import { BrowserFrame } from "./browser-frame";
import { fadeInUp, ease } from "@/lib/motion";

const heroStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export function Hero() {
  return (
    <section id="hero" className="overflow-hidden">
      {/* ─── Text zone ─── */}
      <div className="pt-24 md:pt-36 lg:pt-44 pb-16 md:pb-20">
        <Container>
          <motion.div
            variants={heroStagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center max-w-4xl mx-auto gap-6"
          >
            <motion.div variants={fadeInUp}>
              <Heading level="display">
                Your website is the first proof that your business is credible
              </Heading>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Text size="lg" muted className="max-w-2xl">
                When someone finds a business like yours, your website is where
                they decide to trust you — or move on. We transform outdated
                sites into credible first impressions that reflect the quality
                of your actual work.
              </Text>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-3 mt-4"
            >
              <PreviewTrigger size="xl">
                Get My Free Preview
              </PreviewTrigger>
              <Button
                variant="secondary"
                size="xl"
                nativeButton={false}
                render={<a href="#before-after" />}
              >
                See Before &amp; After
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Text size="sm" className="text-caption">
                No commitment. See your preview first. Pay only if it feels
                right.
              </Text>
            </motion.div>
          </motion.div>
        </Container>
      </div>

      {/* ─── Visual zone — transformation showcase ─── */}
      <div className="pb-12 md:pb-16">
        <Container size="wide">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.9,
              ease: ease.out,
              delay: 0.5,
            }}
          >
            <BrowserFrame>
              <div className="flex">
                <div className="w-1/2 relative">
                  <Image
                    src="/images/hero/old_site.webp"
                    alt="Outdated website before NuSite redesign"
                    width={960}
                    height={600}
                    className="block w-full h-auto"
                    priority
                  />
                  <span className="absolute bottom-2 left-3 text-[10px] md:text-[11px] font-medium tracking-wider uppercase text-white/70 drop-shadow-sm">
                    Before
                  </span>
                </div>
                <div className="w-px bg-border shrink-0" />
                <div className="w-1/2 relative">
                  <Image
                    src="/images/hero/new_site.jpg"
                    alt="Modern website after NuSite redesign"
                    width={960}
                    height={600}
                    className="block w-full h-auto"
                    priority
                  />
                  <span className="absolute bottom-2 right-3 text-[10px] md:text-[11px] font-medium tracking-wider uppercase text-accent drop-shadow-sm">
                    After
                  </span>
                </div>
              </div>
            </BrowserFrame>
          </motion.div>
        </Container>
      </div>

      {/* ─── Trust strip ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="border-t border-border/60 py-8 md:py-10"
      >
        <Container>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-8 gap-y-2 text-caption text-[0.8125rem]">
            <span>Free preview, no commitment</span>
            <span className="hidden sm:inline text-border" aria-hidden="true">
              ·
            </span>
            <span>Live in days, not months</span>
            <span className="hidden sm:inline text-border" aria-hidden="true">
              ·
            </span>
            <span>You own everything</span>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
