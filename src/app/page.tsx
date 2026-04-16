import { Section } from "@/components/section";
import { Heading } from "@/components/heading";
import { Text } from "@/components/text";
import { Eyebrow } from "@/components/eyebrow";
import { PreviewTrigger } from "@/components/preview-trigger";
import { Hero } from "@/components/hero";
import { BeforeAfterShowcase } from "@/components/before-after-showcase";
import { Comparison } from "@/components/comparison";
import { TrustSection } from "@/components/trust-section";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { problemPoints, outcomes, steps } from "@/lib/content";

export default function Home() {
  return (
    <main className="flex-1">
      {/* ────────────────────────────────────────────
          1. HERO
          Hook — make the visitor feel understood instantly
       ──────────────────────────────────────────── */}
      <Hero />

      {/* ────────────────────────────────────────────
          2. PROBLEM — The trust cost
          Agitate — name the pain they already feel
       ──────────────────────────────────────────── */}
      <Section background="surface" id="problem">
        <div className="flex flex-col gap-16">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center flex flex-col gap-5">
              <Heading level="h2">
                An outdated website quietly costs your business trust
              </Heading>
              <Text size="lg" muted className="max-w-2xl mx-auto">
                You may not notice it happening. But when potential customers
                visit your website and it looks dated, slow, or unprofessional —
                they form an opinion about your business instantly. Most leave
                without saying a word.
              </Text>
            </div>
          </Reveal>

          <RevealGroup className="grid md:grid-cols-2 gap-8 md:gap-16">
            {problemPoints.map((point) => (
              <RevealItem key={point.heading} className="flex flex-col gap-3">
                <Heading level="h4" as="h3">
                  {point.heading}
                </Heading>
                <Text muted>{point.body}</Text>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ────────────────────────────────────────────
          3. OUTCOMES — What a credible website does
          Promise — paint the picture of the better state
       ──────────────────────────────────────────── */}
      <Section id="outcomes">
        <div className="flex flex-col gap-16">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center flex flex-col gap-5">
              <Heading level="h2">
                Look as good online as you do in person
              </Heading>
              <Text size="lg" muted className="max-w-2xl mx-auto">
                Your business has earned its reputation through years of real
                work. Your website should reflect that — not undermine it.
              </Text>
            </div>
          </Reveal>

          <RevealGroup
            slow
            className="grid sm:grid-cols-2 gap-y-12 gap-x-10 md:gap-x-16"
          >
            {outcomes.map((outcome) => (
              <RevealItem key={outcome.heading} className="flex flex-col gap-3">
                <Heading level="h3">{outcome.heading}</Heading>
                <Text muted>{outcome.body}</Text>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ────────────────────────────────────────────
          4. BEFORE / AFTER — Visual proof
          Prove — let the transformation speak for itself
       ──────────────────────────────────────────── */}
      <Section background="surface" id="before-after">
        <div className="flex flex-col gap-12">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto flex flex-col gap-5">
              <Eyebrow>Before &amp; After</Eyebrow>
              <Heading level="h2">
                The same business. A different first impression.
              </Heading>
            </div>
          </Reveal>

          <BeforeAfterShowcase />
        </div>
      </Section>

      {/* ────────────────────────────────────────────
          5. HOW IT WORKS
          Clarify — make the process feel simple, fast, and safe
       ──────────────────────────────────────────── */}
      <Section id="how-it-works">
        <div className="flex flex-col gap-16">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center flex flex-col gap-5">
              <Eyebrow>How it works</Eyebrow>
              <Heading level="h2">Simple process. Serious result.</Heading>
              <Text size="lg" muted className="max-w-2xl mx-auto">
                You should not need a project manager, a six-week timeline, or a
                design degree to get a professional website. Here is how it
                works.
              </Text>
            </div>
          </Reveal>

          <RevealGroup className="grid md:grid-cols-3 gap-10 md:gap-12">
            {steps.map((step) => (
              <RevealItem key={step.number} className="flex flex-col gap-4">
                <span aria-hidden="true" className="text-[3.5rem] font-semibold leading-none tracking-[-0.04em] text-foreground/[0.08]">
                  {step.number}
                </span>
                <Heading level="h3" as="h3">
                  {step.heading}
                </Heading>
                <Text muted>{step.body}</Text>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ────────────────────────────────────────────
          6. COMPARISON — Why NuSite vs the alternatives
          Differentiate — position against inertia and agencies
       ──────────────────────────────────────────── */}
      <Section background="surface" id="comparison">
        <Comparison />
      </Section>

      {/* ────────────────────────────────────────────
          7. TRUST / REASSURANCE
          De-risk — answer every unspoken objection
       ──────────────────────────────────────────── */}
      <Section id="trust">
        <TrustSection />
      </Section>

      {/* ────────────────────────────────────────────
          8. FINAL CTA
          Close — calm, direct, one clear next step
       ──────────────────────────────────────────── */}
      <Section background="dark" padding="lg" id="preview">
        <Reveal variant="fade">
          <div className="max-w-3xl mx-auto text-center flex flex-col gap-6 items-center">
            <Heading level="h2" className="text-background">
              Your website could look this good by next week
            </Heading>
            <Text size="lg" className="text-background/60 max-w-2xl">
              Send us your current site and we will build a free preview of your
              new one. No cost, no commitment — just a clear picture of what
              your business could look like online.
            </Text>
            <PreviewTrigger
              size="xl"
              className="bg-background text-foreground hover:bg-background/90 mt-2"
            >
              Get My Free Preview
            </PreviewTrigger>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
