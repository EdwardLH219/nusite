"use client";

import { usePreviewModal } from "./preview-modal";

export function Close() {
  const { open } = usePreviewModal();

  return (
    <section className="close" id="preview">
      <div className="close-inner">
        <div className="gutter">
          <div className="eyebrow">
            <span className="num">08 / 08</span>
            <span className="name">Close</span>
          </div>
        </div>
        <div className="sec-body">
          <h2>
            Send us your URL.
            <br />
            See the replacement in seven days.
          </h2>
          <p className="lede">
            If the preview is good, we go live. If it’s not, you walk away{" "}
            <em>owing nothing</em>. That’s the whole deal.
          </p>
          <div className="cta-row">
            <button
              type="button"
              onClick={open}
              className="btn btn-primary"
            >
              Get my free preview <span className="arr">→</span>
            </button>
            <a href="tel:+442079460000" className="btn btn-secondary">
              Or call us — 020 7946 0000
            </a>
          </div>
          <div className="mini">
            London · United Kingdom · Mon–Fri, 09:00–18:00 GMT · Replies
            within one working day.
          </div>
        </div>
      </div>
    </section>
  );
}
