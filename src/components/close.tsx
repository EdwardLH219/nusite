"use client";

import { usePreviewModal } from "./preview-modal";

export function Close() {
  const { open } = usePreviewModal();

  return (
    <section className="close" id="preview" data-hue="yellow">
      <div className="close-inner">
        <div className="gutter">
          <div className="eyebrow">
            <span className="num">08 / 08</span>
            <span className="name">Get started</span>
          </div>
        </div>
        <div className="sec-body">
          <h2>
            Send us your URL.
            <br />
            See the <span className="sun">replacement</span> in 24 hours.
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
            <a href="tel:+12125550173" className="btn btn-secondary">
              Or call us — (212) 555-0173
            </a>
          </div>
          <div className="mini">
            New York · United States · Mon–Fri, 09:00–18:00 ET · Replies
            within one business day.
          </div>
        </div>
      </div>
    </section>
  );
}
