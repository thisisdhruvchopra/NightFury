"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const mono = { fontFamily: "var(--font-spline), monospace" } as const;

export default function ProductRating({ slug }: Readonly<{ slug: string }>) {
  const [avg, setAvg] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("reviews")
      .select("rating")
      .eq("product_slug", slug)
      .then(({ data }) => {
        if (!data || data.length === 0) return;
        setCount(data.length);
        setAvg(
          Math.round(
            (data.reduce((s, r) => s + r.rating, 0) / data.length) * 10
          ) / 10
        );
      });
  }, [slug]);

  const hasReviews = count > 0;
  const noun = count === 1 ? "review" : "reviews";
  const summary = hasReviews ? `${avg} / 5 · ${count} ${noun}` : "Be the first to review";

  return (
    <a
      href="#reviews"
      className="mt-3 inline-flex items-center gap-2 transition-opacity hover:opacity-80"
      aria-label={
        hasReviews
          ? `Rated ${avg} out of 5 from ${count} reviews. Jump to reviews.`
          : "No reviews yet. Jump to reviews and write the first one."
      }
    >
      <span className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg
            key={i}
            width={16}
            height={16}
            viewBox="0 0 20 20"
            aria-hidden="true"
            fill={hasReviews && i <= Math.round(avg) ? "#FF5500" : "rgba(255,255,255,0.15)"}
          >
            <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
          </svg>
        ))}
      </span>
      <span className="text-[12px] font-medium tracking-[.06em] text-muted underline decoration-dotted underline-offset-4" style={mono}>
        {summary}
      </span>
    </a>
  );
}
