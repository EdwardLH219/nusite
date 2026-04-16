import { Container } from "./container";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12 md:py-16">
      <Container>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div className="flex flex-col gap-3 max-w-sm">
              <a
                href="/"
                className="text-[1.125rem] font-semibold tracking-[-0.02em] text-foreground"
              >
                NuSite
              </a>
              <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
                A better first impression for businesses that have earned it.
              </p>
            </div>

            <div className="flex flex-col gap-1.5 text-[0.875rem] md:text-right">
              <a
                href="mailto:hello@nusite.com"
                className="text-foreground hover:text-accent transition-colors duration-200"
              >
                hello@nusite.com
              </a>
              <span className="text-caption">London, United Kingdom</span>
            </div>
          </div>

          <div className="border-t border-border pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-caption text-[0.8125rem]">
              &copy; {new Date().getFullYear()} NuSite. All rights reserved.
            </p>
            <div className="flex gap-5 text-[0.8125rem]">
              <a
                href="/privacy"
                className="text-caption hover:text-foreground transition-colors duration-200"
              >
                Privacy
              </a>
              <a
                href="/terms"
                className="text-caption hover:text-foreground transition-colors duration-200"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
