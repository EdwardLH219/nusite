"use client";

import { usePreviewModal } from "./preview-modal";
import { compareOptions } from "@/lib/content";

export function Comparison() {
  const { open } = usePreviewModal();

  return (
    <>
      <h2 className="h1" style={{ maxWidth: "18ch" }}>
        Three paths. Only one is built around you.
      </h2>
      <p
        className="body-copy"
        style={{ marginTop: 18, maxWidth: "56ch" }}
      >
        We’re not trying to beat the cheapest option. We’re trying to be the
        one you don’t think about again.
      </p>

      <div className="grid">
        {compareOptions.map((opt) => (
          <div
            key={opt.heading}
            className={opt.featured ? "card featured" : "card"}
          >
            <div className="cap">{opt.cap}</div>
            <h4>{opt.heading}</h4>
            <div className="cost">
              <span className="amt">{opt.amt}</span>
              <span className="term">{opt.term}</span>
            </div>
            <ul>
              {opt.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="foot">
              {opt.featured ? (
                <button
                  type="button"
                  onClick={open}
                  className="btn btn-primary"
                >
                  Get my free preview <span className="arr">→</span>
                </button>
              ) : (
                <span
                  className="body-sm"
                  style={{ color: "var(--caption)" }}
                >
                  {opt.footer}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <p
        className="body-sm"
        style={{
          marginTop: 24,
          color: "var(--caption)",
          letterSpacing: "0.01em",
        }}
      >
        The price you see is the price you pay. No add-ons. No “premium” tier.
        No upsell.
      </p>
    </>
  );
}
