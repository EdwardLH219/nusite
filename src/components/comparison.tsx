"use client";

import { motion } from "motion/react";
import { Heading } from "./heading";
import { Text } from "./text";
import { Eyebrow } from "./eyebrow";
import { usePreviewModal } from "./preview-modal";
import { alternatives, nuSiteBenefits } from "@/lib/content";
import { fadeInUp, staggerContainer, viewport } from "@/lib/motion";

export function Comparison() {
  const { open } = usePreviewModal();

  return (
    <div className="flex flex-col gap-16">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="max-w-3xl mx-auto text-center flex flex-col gap-5"
      >
        <Eyebrow>Your options</Eyebrow>
        <Heading level="h2">
          Three paths. Only one is built around you.
        </Heading>
        <Text size="lg" muted className="max-w-2xl mx-auto">
          You can leave your website as it is, hire a traditional agency, or
          let NuSite handle it. Here is what each path actually looks like.
        </Text>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid md:grid-cols-3 gap-6 md:gap-5 items-stretch"
      >
        {alternatives.map((alt) => (
          <motion.div
            key={alt.heading}
            variants={fadeInUp}
            className="rounded-xl border border-border bg-background p-7 md:p-8 flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1.5">
              <Text size="sm" caption className="font-medium">
                {alt.label}
              </Text>
              <Heading level="h3" as="h3">
                {alt.heading}
              </Heading>
            </div>
            <div className="flex flex-col gap-3 flex-1">
              {alt.body.map((paragraph, i) => (
                <Text key={i} size="sm" muted>
                  {paragraph}
                </Text>
              ))}
            </div>
            <div className="pt-5 border-t border-border">
              <Text size="sm" className="text-muted-foreground/70 italic">
                {alt.bottomLine}
              </Text>
            </div>
          </motion.div>
        ))}

        <motion.div
          variants={fadeInUp}
          className="rounded-xl border border-foreground/10 bg-background p-7 md:p-8 flex flex-col gap-5 shadow-md transition-shadow duration-300 hover:shadow-lg"
        >
          <div className="flex flex-col gap-1.5">
            <Text size="sm" className="text-accent font-medium">
              The NuSite approach
            </Text>
            <Heading level="h3" as="h3">
              Choose NuSite
            </Heading>
          </div>
          <div className="flex flex-col gap-3">
            <Text size="sm" muted>
              A professional, credible website — designed for your business,
              delivered in days, at a fair and transparent price. You see the
              finished result before you spend anything.
            </Text>
          </div>

          <ul className="flex flex-col gap-2.5 py-5 border-y border-border">
            {nuSiteBenefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2.5">
                <span
                  className="w-1 h-1 rounded-full bg-accent shrink-0"
                  aria-hidden="true"
                />
                <Text as="span" size="sm" className="text-foreground">
                  {benefit}
                </Text>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <button
              onClick={open}
              className="text-[0.875rem] font-medium text-foreground underline underline-offset-[3px] decoration-border decoration-1 hover:decoration-foreground transition-colors duration-200"
            >
              Get my free preview
              <span className="ml-1" aria-hidden="true">
                &rarr;
              </span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
