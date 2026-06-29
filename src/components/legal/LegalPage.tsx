import Link from "next/link";

export type LegalSection = {
  id: string;
  title: string;
  content: React.ReactNode;
};

export default function LegalPage({
  title,
  description,
  effectiveDate,
  sections,
  breadcrumb,
}: Readonly<{
  title: string;
  description: string;
  effectiveDate?: string;
  sections: LegalSection[];
  breadcrumb: string;
}>) {
  return (
    <>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1280px] px-5 pt-6 md:px-10">
        <nav
          aria-label="Breadcrumb"
          className="text-[11px] tracking-[.14em] text-dim uppercase"
          style={{ fontFamily: "var(--font-spline), monospace" }}
        >
          <Link href="/" className="nf-link">
            Home
          </Link>
          <span className="mx-2 text-border-strong">/</span>
          <span className="text-muted">{breadcrumb}</span>
        </nav>
      </div>

      {/* Header */}
      <header className="mx-auto max-w-[1280px] px-5 pt-8 pb-10 md:px-10">
        <h1
          className="text-[36px] font-extrabold italic uppercase leading-[.92] tracking-tight md:text-[48px]"
          style={{ transform: "skewX(-4deg)" }}
        >
          {title}
        </h1>
        <p
          className="mt-3 max-w-2xl text-sm leading-[1.7] text-muted"
          style={{ fontFamily: "var(--font-spline), monospace" }}
        >
          {description}
        </p>
        {effectiveDate && (
          <p
            className="mt-2 text-[11px] tracking-[.12em] text-dim"
            style={{ fontFamily: "var(--font-spline), monospace" }}
          >
            EFFECTIVE DATE: {effectiveDate}
          </p>
        )}
      </header>

      <div className="carbon-trim" />

      {/* Body: TOC + Content */}
      <div className="mx-auto flex max-w-[1280px] gap-12 px-5 py-12 md:px-10">
        {/* Sticky TOC - desktop */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <nav
            className="sticky top-24"
            aria-label="Table of contents"
          >
            <div
              className="mb-4 text-[10px] tracking-[.2em] text-accent uppercase"
              style={{ fontFamily: "var(--font-spline), monospace" }}
            >
              On this page
            </div>
            <ol className="flex flex-col gap-2 border-l border-border pl-4">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="nf-link block text-[12px] leading-[1.6] text-muted transition-colors hover:text-chalk"
                    style={{ fontFamily: "var(--font-spline), monospace" }}
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        {/* Content */}
        <article className="min-w-0 max-w-4xl flex-1">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="mb-12 scroll-mt-24">
              <h2
                className="mb-4 text-[22px] font-bold italic uppercase tracking-tight md:text-[26px]"
                style={{ transform: "skewX(-3deg)" }}
              >
                {s.title}
              </h2>
              <div
                className="legal-prose text-[13px] leading-[1.8] text-muted"
                style={{ fontFamily: "var(--font-spline), monospace" }}
              >
                {s.content}
              </div>
            </section>
          ))}
        </article>
      </div>
    </>
  );
}
