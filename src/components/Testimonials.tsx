import { TESTIMONIALS } from "@/lib/reviews-seed";
import StarRating from "./StarRating";

export default function Testimonials() {
  return (
    <section className="bg-night-900 py-20">
      <div className="mx-auto max-w-7xl px-5">
        <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-flame-500">
          Trusted Across India
        </p>
        <h2 className="mt-3 text-center text-3xl font-extrabold text-white md:text-4xl">
          What Drivers &amp; Dealers Say
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-white/5 bg-night-800/60 p-7 transition-colors hover:border-flame-500/30"
            >
              <StarRating rating={t.rating} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-300">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-white/5 pt-4">
                <div className="text-sm font-bold text-white">{t.name}</div>
                <div className="mt-0.5 text-xs text-slate-400">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
