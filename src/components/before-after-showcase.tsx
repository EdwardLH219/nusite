"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { proofCases, images } from "@/lib/content";

export function Proof() {
  const [activeId, setActiveId] = useState(proofCases[0].id);
  const active = proofCases.find((c) => c.id === activeId) ?? proofCases[0];
  const beforeSrc = active.beforeImage ?? images.hero.before;
  const afterSrc = active.afterImage ?? images.hero.after;

  return (
    <div className="proof-inner">
      <div className="proof-head">
        <div>
          <h2 className="h1" style={{ maxWidth: "14ch" }}>
            A before. And the after we built.
          </h2>
          <p className="body-copy" style={{ marginTop: 18 }}>
            Three recent clients. Same businesses. Same reputations. New first
            impression.
          </p>
        </div>
        <div role="tablist" aria-label="Case studies" className="tabs">
          {proofCases.map((c) => (
            <button
              key={c.id}
              role="tab"
              type="button"
              aria-selected={activeId === c.id}
              aria-controls={`proof-panel-${c.id}`}
              id={`proof-tab-${c.id}`}
              className={activeId === c.id ? "active" : undefined}
              onClick={() => setActiveId(c.id)}
            >
              {c.tab}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          id={`proof-panel-${activeId}`}
          role="tabpanel"
          aria-labelledby={`proof-tab-${activeId}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="caseline">
            <span className="name">{active.name}</span>
            <span className="loc">{active.loc}</span>
            <span className="delta">
              <b>{active.delta_n}</b> {active.delta_l}
            </span>
          </div>

          <div className="frame">
            <div className="bar">
              <div className="dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="url">{active.url}</div>
            </div>
            <div className="split">
              <div className="half">
                <Image
                  src={beforeSrc}
                  alt={`Before — outdated ${active.name} website`}
                  width={960}
                  height={720}
                  priority={active.id === proofCases[0].id}
                />
                <span className="tag">Before</span>
              </div>
              <div className="half">
                <Image
                  src={afterSrc}
                  alt={`After — redesigned ${active.name} website`}
                  width={960}
                  height={720}
                  priority={active.id === proofCases[0].id}
                />
                <span className="tag after">After</span>
              </div>
            </div>
          </div>

          <div className="meta-row">
            <div className="cell">
              <div className="k">Turnaround</div>
              <div className="v">{active.turnaround}</div>
            </div>
            <div className="cell">
              <div className="k">What moved</div>
              <div className="v">{active.moved}</div>
            </div>
            <div className="cell">
              <div className="k">What they said</div>
              <div className="v">{active.said}</div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
