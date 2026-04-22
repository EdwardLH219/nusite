import { Section } from "@/components/section";
import { Hero } from "@/components/hero";
import { Proof } from "@/components/before-after-showcase";
import { Comparison } from "@/components/comparison";
import { Reassure } from "@/components/trust-section";
import { Close } from "@/components/close";
import { problemPoints, outcomes, steps } from "@/lib/content";

export default function Home() {
  return (
    <>
      <main className="page">
        {/* 01 · HOOK — blue */}
        <Hero />

        {/* 02 · PROBLEM — red */}
        <Section
          id="problem"
          number="02 / 08"
          name="The problem"
          hue="red"
          className="problem"
        >
          <p className="lead">
            Your website is the first thing a new client sees.{" "}
            <b>
              Right now, it’s <em className="un">working against you</em>
            </b>
            , and the people it’s losing will never tell you they left.
          </p>
          <div className="problem-points">
            {problemPoints.map((p) => (
              <div key={p.heading} className="pt">
                <div className="n">{p.n}</div>
                <h4>{p.heading}</h4>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 03 · OUTCOMES — green */}
        <Section
          id="outcomes"
          number="03 / 08"
          name="What changes"
          hue="green"
          className="outcomes"
        >
          <h2 className="h1" style={{ maxWidth: "18ch" }}>
            Look as good online as you do <em className="un">in person</em>.
          </h2>
          <p className="lede" style={{ marginTop: 24 }}>
            Here’s what changes the week the new site goes live. Not features —
            consequences.
          </p>
          <div style={{ marginTop: 56 }}>
            {outcomes.map((o) => (
              <div key={o.heading} className="row">
                <h3>
                  <span className="idx">{o.idx}</span>
                  {o.heading}
                </h3>
                <p>{o.body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 04 · PROOF — blue */}
        <Section
          id="work"
          number="04 / 08"
          name="Our work"
          hue="blue"
          className="proof"
        >
          <Proof />
        </Section>

        {/* 05 · PROCESS — green */}
        <Section
          id="process"
          number="05 / 08"
          name="How it works"
          hue="green"
          className="process"
        >
          <h2 className="h1" style={{ maxWidth: "16ch" }}>
            Simple process. <em className="un">Serious result.</em>
          </h2>
          <p className="body-copy" style={{ marginTop: 18 }}>
            One conversation, one preview, one handover.
            <br />
            No retainer. No agency run-around. No surprise invoice.
          </p>
          <div className="steps" style={{ marginTop: 40 }}>
            {steps.map((s) => (
              <div key={s.number} className="step">
                <div className="n">{s.number}</div>
                <div>
                  <h3>{s.heading}</h3>
                  <div className="time">{s.time}</div>
                </div>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 06 · COMPARISON — red */}
        <Section
          id="pricing"
          number="06 / 08"
          name="Pricing"
          hue="red"
          className="compare"
        >
          <Comparison />
        </Section>

        {/* 07 · REASSURANCE — blue */}
        <Section
          id="reassure"
          number="07 / 08"
          name="No surprises"
          hue="blue"
          className="reassure"
        >
          <Reassure />
        </Section>
      </main>
      {/* 08 · CLOSE — yellow, full-bleed dark block */}
      <Close />
    </>
  );
}
