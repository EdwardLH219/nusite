"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { BrowserFrame } from "./browser-frame";
import { Text } from "./text";
import { showcaseItems } from "@/lib/content";
import { ease, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ─── Wireframe mockups ─── */

function BeforePlaceholder() {
  return (
    <div className="aspect-[4/3] bg-[#ecedf1] p-4 md:p-6 flex flex-col overflow-hidden">
      <div className="flex items-center gap-2 mb-3 md:mb-4">
        <div className="h-2.5 md:h-3 w-14 md:w-16 rounded-sm bg-[#6b7280]" />
        <div className="ml-auto hidden sm:flex gap-1.5">
          <div className="h-1.5 w-7 rounded-sm bg-[#9ca3af]" />
          <div className="h-1.5 w-7 rounded-sm bg-[#9ca3af]" />
          <div className="h-1.5 w-8 rounded-sm bg-[#9ca3af]" />
        </div>
      </div>
      <div className="h-[30%] rounded-sm bg-[#d1d5db]/60 mb-3 shrink-0" />
      <div className="flex gap-2 flex-1 min-h-0">
        <div className="w-[38%] flex flex-col gap-1.5">
          <div className="h-1.5 w-full rounded-sm bg-[#d1d5db]/50" />
          <div className="h-1.5 w-3/4 rounded-sm bg-[#d1d5db]/50" />
          <div className="h-1.5 w-5/6 rounded-sm bg-[#d1d5db]/50" />
          <div className="h-1.5 w-2/3 rounded-sm bg-[#d1d5db]/50" />
          <div className="h-1.5 w-full rounded-sm bg-[#d1d5db]/50 hidden md:block" />
          <div className="h-1.5 w-4/5 rounded-sm bg-[#d1d5db]/50 hidden md:block" />
        </div>
        <div className="flex-1 flex flex-col gap-1.5">
          <div className="h-1.5 w-full rounded-sm bg-[#d1d5db]/50" />
          <div className="h-1.5 w-full rounded-sm bg-[#d1d5db]/50" />
          <div className="h-1.5 w-4/5 rounded-sm bg-[#d1d5db]/50" />
          <div className="h-1.5 w-full rounded-sm bg-[#d1d5db]/50" />
          <div className="h-1.5 w-3/5 rounded-sm bg-[#d1d5db]/50" />
          <div className="h-4 w-16 rounded-sm bg-[#6b7280]/40 mt-1.5" />
        </div>
      </div>
    </div>
  );
}

function AfterPlaceholder() {
  return (
    <div className="aspect-[4/3] bg-white p-4 md:p-6 flex flex-col overflow-hidden">
      <div className="flex items-center gap-2 mb-5 md:mb-6">
        <div className="h-2.5 md:h-3 w-12 md:w-14 rounded-sm bg-[#0a0a0a]" />
        <div className="ml-auto hidden sm:flex gap-2.5">
          <div className="h-1.5 w-6 rounded-sm bg-[#e8e8e4]" />
          <div className="h-1.5 w-6 rounded-sm bg-[#e8e8e4]" />
        </div>
      </div>
      <div className="mb-5 md:mb-7 flex flex-col gap-1.5 md:gap-2">
        <div className="h-3 md:h-4 w-[80%] rounded-sm bg-[#0a0a0a]/75" />
        <div className="h-3 md:h-4 w-[55%] rounded-sm bg-[#0a0a0a]/75" />
        <div className="h-1.5 md:h-2 w-[40%] rounded-sm bg-[#52525b]/20 mt-1" />
        <div className="h-5 md:h-7 w-20 md:w-24 rounded bg-[#0a0a0a] mt-2 md:mt-3" />
      </div>
      <div className="flex gap-3 md:gap-4 flex-1 min-h-0">
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-8 md:h-10 rounded bg-[#fafaf8]" />
          <div className="h-1.5 w-3/4 rounded-sm bg-[#e8e8e4]" />
          <div className="h-1.5 w-1/2 rounded-sm bg-[#e8e8e4]" />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-8 md:h-10 rounded bg-[#fafaf8]" />
          <div className="h-1.5 w-2/3 rounded-sm bg-[#e8e8e4]" />
          <div className="h-1.5 w-2/5 rounded-sm bg-[#e8e8e4]" />
        </div>
        <div className="flex-1 hidden md:flex flex-col gap-2">
          <div className="h-8 md:h-10 rounded bg-[#fafaf8]" />
          <div className="h-1.5 w-4/5 rounded-sm bg-[#e8e8e4]" />
          <div className="h-1.5 w-3/5 rounded-sm bg-[#e8e8e4]" />
        </div>
      </div>
    </div>
  );
}

/* ─── Showcase component ─── */

export function BeforeAfterShowcase() {
  const [activeId, setActiveId] = useState(showcaseItems[0].id);
  const active = showcaseItems.find((item) => item.id === activeId)!;
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = showcaseItems.findIndex((item) => item.id === activeId);

  const setTabRef = useCallback(
    (index: number) => (el: HTMLButtonElement | null) => {
      tabsRef.current[index] = el;
    },
    []
  );

  const switchTab = useCallback((id: string, focusTab?: boolean) => {
    setActiveId(id);
    if (focusTab) {
      const index = showcaseItems.findIndex((item) => item.id === id);
      tabsRef.current[index]?.focus();
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let nextIndex: number;
      switch (e.key) {
        case "ArrowRight":
          nextIndex = (activeIndex + 1) % showcaseItems.length;
          break;
        case "ArrowLeft":
          nextIndex =
            (activeIndex - 1 + showcaseItems.length) % showcaseItems.length;
          break;
        default:
          return;
      }
      e.preventDefault();
      switchTab(showcaseItems[nextIndex].id, true);
    },
    [activeIndex, switchTab]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.6, ease: ease.out, delay: 0.1 }}
      className="flex flex-col gap-8 md:gap-10"
    >
      {/* Tab bar */}
      <div
        role="tablist"
        aria-label="Business category examples"
        className="flex justify-center"
        onKeyDown={handleKeyDown}
      >
        <div className="flex gap-0.5 sm:gap-1 rounded-lg bg-secondary/60 p-1">
          {showcaseItems.map((item, index) => (
            <button
              key={item.id}
              ref={setTabRef(index)}
              id={`showcase-tab-${item.id}`}
              role="tab"
              aria-selected={activeId === item.id}
              aria-controls={`showcase-panel-${item.id}`}
              tabIndex={activeId === item.id ? 0 : -1}
              onClick={() => switchTab(item.id)}
              className={cn(
                "relative px-3 sm:px-5 py-2 text-[0.8125rem] sm:text-[0.875rem] font-medium rounded-md transition-colors duration-200",
                activeId === item.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground/70"
              )}
            >
              {activeId === item.id && (
                <motion.div
                  layoutId="showcase-tab-bg"
                  className="absolute inset-0 bg-background rounded-md shadow-xs"
                  transition={{ duration: 0.25, ease: ease.out }}
                />
              )}
              <span className="relative z-10">{item.category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          id={`showcase-panel-${activeId}`}
          role="tabpanel"
          aria-labelledby={`showcase-tab-${activeId}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25, ease: ease.out }}
          className="flex flex-col gap-8 md:gap-10"
        >
          {/* Description */}
          <Text muted className="text-center max-w-2xl mx-auto" balance>
            {active.description}
          </Text>

          {/* Mockup pair */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            {/* Before */}
            <div className="flex flex-col gap-3">
              <BrowserFrame>
                {active.beforeImage ? (
                  <Image
                    src={active.beforeImage}
                    alt={active.beforeAlt}
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                ) : (
                  <BeforePlaceholder />
                )}
              </BrowserFrame>
              <div className="flex items-start gap-2.5 px-1">
                <span className="shrink-0 text-[0.6875rem] font-medium uppercase tracking-wider text-caption mt-[3px]">
                  Before
                </span>
                <Text size="sm" muted>
                  {active.beforeCaption}
                </Text>
              </div>
            </div>

            {/* After */}
            <div className="flex flex-col gap-3">
              <BrowserFrame>
                {active.afterImage ? (
                  <Image
                    src={active.afterImage}
                    alt={active.afterAlt}
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                ) : (
                  <AfterPlaceholder />
                )}
              </BrowserFrame>
              <div className="flex items-start gap-2.5 px-1">
                <span className="shrink-0 text-[0.6875rem] font-medium uppercase tracking-wider text-accent mt-[3px]">
                  After
                </span>
                <Text size="sm" muted>
                  {active.afterCaption}
                </Text>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
