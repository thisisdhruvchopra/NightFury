import { getGoogleReviews, type GoogleReview } from "@/lib/googleReviews";
import { GOOGLE_REVIEW_URL } from "@/lib/socials";
import { ready } from "@/lib/todo";

function Stars({ value, size = 16 }: Readonly<{ value: number; size?: number }>) {
  return (
    <span className="inline-flex gap-[2px]" role="img" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill={i <= Math.round(value) ? "#F2B705" : "#D6DEE6"}>
          <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
        </svg>
      ))}
    </span>
  );
}

function ReviewCard({ r }: Readonly<{ r: GoogleReview }>) {
  const name = r.authorUrl ? (
    <a href={r.authorUrl} target="_blank" rel="noopener noreferrer" className="text-navy no-underline hover:text-fury">{r.author}</a>
  ) : (
    r.author
  );
  return (
    <li className="flex w-[85%] flex-none snap-start flex-col rounded-[4px] border border-navy/15 bg-white p-6 sm:w-[60%] lg:w-auto">
      <Stars value={r.rating} />
      <p className="nf-body mt-4 line-clamp-6 text-[15px] text-carbon">{r.text}</p>
      <div className="mt-auto flex items-center gap-3 pt-6">
        {r.authorPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element -- Google profile photo, attribution required
          <img src={r.authorPhoto} alt="" width={36} height={36} referrerPolicy="no-referrer" loading="lazy" className="h-9 w-9 rounded-full" />
        ) : (
          <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-navy font-bold text-chalk">{r.author.charAt(0)}</span>
        )}
        <div className="min-w-0">
          <p className="m-0 truncate text-[14px] font-semibold text-navy">{name}</p>
          <p className="m-0 font-mono text-[11px] text-muted">{r.when}</p>
        </div>
      </div>
    </li>
  );
}

const writeHref = ready(GOOGLE_REVIEW_URL) ? GOOGLE_REVIEW_URL : undefined;

/**
 * Live reviews from the Nightfury Google Business Profile. Shows up to the 5 reviews
 * Google provides, with the overall rating. Without reviews (or before the API key is
 * set) it shrinks to a short prompt asking buyers to leave the first ones.
 */
export default async function GoogleReviews({
  tone = "chalk",
  prompt = true,
}: Readonly<{ tone?: "chalk" | "white"; prompt?: boolean }>) {
  const data = await getGoogleReviews();
  const bg = tone === "white" ? "bg-white" : "bg-chalk";

  if (!data || data.reviews.length === 0) {
    if (!writeHref || !prompt) return null;
    return (
      <section className={`border-t border-navy/15 ${bg}`} aria-label="Google reviews">
        <div className="nf-container flex flex-wrap items-center justify-between gap-x-8 gap-y-4 py-10">
          <div className="min-w-0">
            <Stars value={5} size={18} />
            <p className="m-0 mt-3 font-display text-[22px] font-bold text-navy">Bought Nightfury? Tell other drivers what you think.</p>
            <p className="nf-body mt-1">Your review on Google helps people choose with confidence.</p>
          </div>
          <a href={writeHref} target="_blank" rel="noopener noreferrer" className="nf-btn nf-btn--dark">Write a Google review</a>
        </div>
      </section>
    );
  }

  return (
    <section className={`border-t border-navy/15 ${bg}`} aria-labelledby="google-reviews-title">
      <div className="nf-container nf-section">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
          <div className="min-w-0">
            <p className="m-0 font-mono text-[12px] font-bold tracking-[0.2em] text-fury uppercase">{"// Reviews"}</p>
            <h2 id="google-reviews-title" className="nf-display nf-h2-sm mt-[14px]">What drivers say.</h2>
            {data.rating !== undefined && data.count > 0 && (
              <p className="m-0 mt-4 flex flex-wrap items-center gap-3 text-[15px] text-carbon">
                <span className="font-display text-[28px] leading-none font-bold text-navy">{data.rating.toFixed(1)}</span>
                <Stars value={data.rating} size={18} />
                <span className="text-muted">
                  {data.count} {data.count === 1 ? "review" : "reviews"} on Google
                </span>
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            {data.mapsUrl && (
              <a href={data.mapsUrl} target="_blank" rel="noopener noreferrer" className="nf-btn nf-btn--outline">
                Read all on Google
              </a>
            )}
            {writeHref && (
              <a href={writeHref} target="_blank" rel="noopener noreferrer" className="nf-btn nf-btn--dark">
                Write a review
              </a>
            )}
          </div>
        </div>

        <ul className="-mx-5 mt-10 flex list-none snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 md:-mx-10 md:scroll-px-10 md:px-10 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0 lg:pb-0">
          {data.reviews.slice(0, 6).map((r, i) => (
            <ReviewCard key={`${r.author}-${i}`} r={r} />
          ))}
        </ul>
        <p className="m-0 mt-5 font-mono text-[11px] text-muted">Reviews from Google Maps. Shown as written by the reviewers.</p>
      </div>
    </section>
  );
}
