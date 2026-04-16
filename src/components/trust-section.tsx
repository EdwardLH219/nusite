"use client";

import { motion } from "motion/react";
import { Heading } from "./heading";
import { Text } from "./text";
import { Eyebrow } from "./eyebrow";
import { reassurances } from "@/lib/content";
import { fadeIn, fadeInUp, staggerContainer, viewport } from "@/lib/motion";

export function TrustSection() {
  return (
    <div className="flex flex-col gap-16">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="max-w-3xl mx-auto text-center flex flex-col gap-5"
      >
        <Eyebrow>Our promise</Eyebrow>
        <Heading level="h2">Designed around your confidence</Heading>
        <Text size="lg" muted className="max-w-2xl mx-auto">
          Every part of the NuSite process puts you in control. No pressure,
          no fine print, no surprises.
        </Text>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid sm:grid-cols-2 gap-x-12 md:gap-x-20"
      >
        {reassurances.map((item) => (
          <motion.div
            key={item.heading}
            variants={fadeInUp}
            className="border-t border-border/50 pt-8 pb-10 flex flex-col gap-3"
          >
            <Heading level="h3" as="h3">
              {item.heading}
            </Heading>
            <Text muted>{item.body}</Text>
            <Text size="sm" className="text-foreground font-medium mt-1">
              {item.detail}
            </Text>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="text-center"
      >
        <Text muted className="max-w-xl mx-auto" balance>
          We built NuSite for people who are ready to invest in how their
          business looks online — but only when it feels right. There is no
          rush.
        </Text>
      </motion.div>
    </div>
  );
}
