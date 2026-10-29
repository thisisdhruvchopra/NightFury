import { Breadcrumb, Eyebrow } from "@/components/ui";

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
      <section className="bg-white">
        <Breadcrumb current={breadcrumb} />
        <header className="nf-container pt-10 pb-12">
          <Eyebrow>{"// Legal"}</Eyebrow>
          <h1 className="nf-display mt-4" style={{ fontSize: "clamp(44px, 6vw, 80px)" }}>{title}</h1>
          <p className="nf-body mt-4 max-w-2xl">{description}</p>
          {effectiveDate && (
            <p className="nf-label mt-3">Effective date: {effectiveDate}</p>
          )}
        </header>
        <div aria-hidden="true" className="flex flex-col gap-1">
          <div className="h-[10px] bg-fury" />
          <div className="h-[4px] bg-navy" />
        </div>
      </section>

      <div className="bg-chalk">
        <div className="nf-container flex gap-12 py-14">
          <aside className="hidden w-60 shrink-0 lg:block">
            <nav className="sticky top-[108px]" aria-label="On this page">
              <p className="nf-label mb-4 text-fury-sm">On this page</p>
              <ol className="m-0 flex list-none flex-col gap-2 border-l-2 border-navy p-0 pl-4">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="block font-mono text-[12px] leading-[1.6] text-muted no-underline hover:text-fury-sm">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="min-w-0 max-w-4xl flex-1">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="nf-anchor mb-12">
                <h2 className="nf-display mb-4 text-[clamp(24px,2.4vw,30px)]" style={{ letterSpacing: 0, lineHeight: 1 }}>{s.title}</h2>
                <div className="legal-prose font-mono text-[13px] leading-[1.8] text-muted">{s.content}</div>
              </section>
            ))}
          </article>
        </div>
      </div>
    </>
  );
}
