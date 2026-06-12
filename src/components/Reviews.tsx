"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { supabase, REVIEW_MEDIA_BUCKET } from "@/lib/supabase";
import StarRating from "./StarRating";

type ProductOption = { slug: string; name: string; wattOptions?: string[] };

type ReviewMedia = { type: "image" | "video"; url: string };

type Review = {
  id: string;
  productSlug: string;
  name: string;
  location?: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  media: ReviewMedia[];
  variant?: string;
};

type PendingFile = { file: File; previewUrl: string; type: "image" | "video" };

const MAX_FILES = 4;
const MAX_FILE_MB = 25;

export default function Reviews({ products }: { products: ProductOption[] }) {
  const [remote, setRemote] = useState<Review[]>([]);
  const [local, setLocal] = useState<Review[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [lightbox, setLightbox] = useState<ReviewMedia | null>(null);

  // form state
  const [name, setName] = useState("");
  const [productSlug, setProductSlug] = useState(products[0]?.slug ?? "");
  const [watt, setWatt] = useState<string | null>(
    products[0]?.wattOptions?.[0] ?? null,
  );
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [files, setFiles] = useState<PendingFile[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const slugs = useMemo(() => products.map((p) => p.slug), [products]);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("reviews")
      .select("*")
      .in("product_slug", slugs)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error || !data) return;
        setRemote(
          data.map((r) => ({
            id: String(r.id),
            productSlug: r.product_slug,
            name: r.name,
            location: r.location ?? undefined,
            rating: r.rating,
            title: r.title,
            body: r.body,
            date: (r.created_at as string).slice(0, 10),
            media: (r.media as ReviewMedia[]) ?? [],
            variant: r.variant ?? undefined,
          })),
        );
      });
  }, [slugs]);

  // close lightbox on Escape
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const totalCount = local.length + remote.length;

  const all = useMemo(() => {
    const merged = [...local, ...remote];
    return filter === "all" ? merged : merged.filter((r) => r.productSlug === filter);
  }, [local, remote, filter]);

  const avg = useMemo(() => {
    if (all.length === 0) return 0;
    return Math.round((all.reduce((s, r) => s + r.rating, 0) / all.length) * 10) / 10;
  }, [all]);

  function productName(slug: string) {
    return products.find((p) => p.slug === slug)?.name ?? slug;
  }

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next: PendingFile[] = [];
    for (const file of Array.from(list)) {
      if (files.length + next.length >= MAX_FILES) break;
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        setNotice({ kind: "err", text: `"${file.name}" is over ${MAX_FILE_MB} MB and was skipped.` });
        continue;
      }
      const type = file.type.startsWith("video") ? "video" : "image";
      next.push({ file, previewUrl: URL.createObjectURL(file), type });
    }
    setFiles((f) => [...f, ...next]);
  }

  function removeFile(i: number) {
    setFiles((f) => {
      URL.revokeObjectURL(f[i].previewUrl);
      return f.filter((_, j) => j !== i);
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !title.trim() || !body.trim()) {
      setNotice({ kind: "err", text: "Please fill in your name, a title and your review." });
      return;
    }
    setSubmitting(true);
    setNotice(null);

    try {
      let media: ReviewMedia[] = [];

      if (supabase) {
        for (const pf of files) {
          const path = `${productSlug}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${pf.file.name.replace(/[^\w.\-]/g, "_")}`;
          const { error: upErr } = await supabase.storage
            .from(REVIEW_MEDIA_BUCKET)
            .upload(path, pf.file, { contentType: pf.file.type });
          if (upErr) throw new Error(`Upload failed: ${upErr.message}`);
          const { data: pub } = supabase.storage.from(REVIEW_MEDIA_BUCKET).getPublicUrl(path);
          media.push({ type: pf.type, url: pub.publicUrl });
        }

        const row: Record<string, unknown> = {
          product_slug: productSlug,
          name: name.trim(),
          rating,
          title: title.trim(),
          body: body.trim(),
          media,
        };
        if (watt) row.variant = watt;
        let { error: insErr } = await supabase.from("reviews").insert(row);
        // Retry without variant if the column doesn't exist yet.
        if (insErr && watt && /variant/i.test(insErr.message)) {
          delete row.variant;
          ({ error: insErr } = await supabase.from("reviews").insert(row));
        }
        if (insErr) throw new Error(insErr.message);
      } else {
        // Demo mode: keep media as local object URLs for this session.
        media = files.map((pf) => ({ type: pf.type, url: pf.previewUrl }));
      }

      const newReview: Review = {
        id: `local-${Date.now()}`,
        productSlug,
        name: name.trim(),
        rating,
        title: title.trim(),
        body: body.trim(),
        date: new Date().toISOString().slice(0, 10),
        media,
        variant: watt ?? undefined,
      };
      setLocal((l) => [newReview, ...l]);
      setName("");
      setTitle("");
      setBody("");
      setRating(5);
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setNotice({ kind: "ok", text: "Thank you! Your review has been posted." });
    } catch (err) {
      setNotice({ kind: "err", text: err instanceof Error ? err.message : "Something went wrong." });
    } finally {
      setSubmitting(false);
    }
  }

  const inputCls =
    "w-full rounded-lg border border-white/10 bg-night-950/60 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-flame-500";

  return (
    <section className="py-20" id="reviews">
      <div className="mx-auto max-w-7xl px-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-flame-400">
          Customer reviews
        </p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-bold md:text-4xl">
            What owners say
          </h2>
          {all.length > 0 && (
            <div className="flex items-center gap-2">
              <StarRating rating={Math.round(avg)} size={18} />
              <span className="text-sm text-slate-400">
                {avg} / 5 · {all.length} {all.length === 1 ? "review" : "reviews"}
              </span>
            </div>
          )}
        </div>

        {products.length > 1 && totalCount > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
              All products
            </FilterChip>
            {products.map((p) => (
              <FilterChip key={p.slug} active={filter === p.slug} onClick={() => setFilter(p.slug)}>
                {p.name}
              </FilterChip>
            ))}
          </div>
        )}

        <div className="mt-10 grid gap-10 lg:grid-cols-5">
          {/* Review list */}
          <div className="space-y-5 lg:col-span-3">
            {all.map((r) => (
              <article
                key={r.id}
                className="rounded-2xl border border-white/5 bg-night-800/50 p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-flame-500/15 text-sm font-semibold text-flame-400">
                      {r.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{r.name}</div>
                      <div className="text-xs text-slate-500">
                        {r.location ? `${r.location} · ` : ""}{r.date}
                      </div>
                    </div>
                  </div>
                  <StarRating rating={r.rating} size={14} />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-white">{r.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{r.body}</p>
                <p className="mt-3 text-xs text-slate-500">
                  Product:{" "}
                  <span className="text-slate-400">
                    {productName(r.productSlug)}
                    {r.variant ? ` · ${r.variant}` : ""}
                  </span>
                </p>

                {r.media.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {r.media.map((m, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setLightbox(m)}
                        className="group/media relative cursor-pointer overflow-hidden rounded-lg border border-white/10 transition-colors hover:border-flame-500/60"
                        aria-label="View media"
                      >
                        {m.type === "video" ? (
                          <>
                            <video src={m.url} muted preload="metadata" className="h-28 w-36 object-cover" />
                            <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#0a1622">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </span>
                            </span>
                          </>
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={m.url}
                            alt="Customer upload"
                            className="h-28 w-28 object-cover transition-transform group-hover/media:scale-105"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </article>
            ))}
            {all.length === 0 && (
              <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center">
                <p className="text-sm font-medium text-slate-300">No reviews yet</p>
                <p className="mt-1 text-sm text-slate-500">
                  Own one of these products? Be the first to share your experience.
                </p>
              </div>
            )}
          </div>

          {/* Review form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="sticky top-24 rounded-2xl border border-white/5 bg-night-800/50 p-7"
            >
              <h3 className="text-lg font-semibold text-white">Write a review</h3>
              <p className="mt-1 text-xs text-slate-400">
                Share your experience. Photos and videos welcome.
              </p>

              <div className="mt-5 space-y-4">
                <input
                  className={inputCls}
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <select
                  className={inputCls}
                  value={productSlug}
                  onChange={(e) => {
                    setProductSlug(e.target.value);
                    setWatt(
                      products.find((p) => p.slug === e.target.value)
                        ?.wattOptions?.[0] ?? null,
                    );
                  }}
                >
                  {products.map((p) => (
                    <option key={p.slug} value={p.slug} className="bg-night-900">
                      {p.name}
                    </option>
                  ))}
                </select>

                {(() => {
                  const opts = products.find((p) => p.slug === productSlug)?.wattOptions;
                  if (!opts) return null;
                  return (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-400">Output:</span>
                      {opts.map((w) => (
                        <button
                          key={w}
                          type="button"
                          onClick={() => setWatt(w)}
                          className={`rounded-md border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                            watt === w
                              ? "border-flame-500 bg-flame-500/10 text-flame-400"
                              : "border-white/15 text-slate-300 hover:border-flame-500/50"
                          }`}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                  );
                })()}

                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400">Your rating:</span>
                  <span className="inline-flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRating(i)}
                        onMouseEnter={() => setHoverRating(i)}
                        onMouseLeave={() => setHoverRating(0)}
                        aria-label={`${i} stars`}
                        className="p-0.5"
                      >
                        <svg
                          width={22}
                          height={22}
                          viewBox="0 0 20 20"
                          fill={i <= (hoverRating || rating) ? "#f2b705" : "rgba(255,255,255,0.15)"}
                        >
                          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                        </svg>
                      </button>
                    ))}
                  </span>
                </div>

                <input
                  className={inputCls}
                  placeholder="Review title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                  className={`${inputCls} min-h-28 resize-y`}
                  placeholder="Tell us about the product..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />

                {/* Media upload */}
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    className="hidden"
                    id="review-media"
                    onChange={(e) => addFiles(e.target.files)}
                  />
                  <label
                    htmlFor="review-media"
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-white/15 px-4 py-3.5 text-sm text-slate-400 transition-colors hover:border-flame-500/50 hover:text-slate-300"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M4 16l4.6-4.6a2 2 0 0 1 2.8 0L16 16M14 14l1.6-1.6a2 2 0 0 1 2.8 0L20 14M4 8V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z" />
                      <circle cx="9" cy="9" r="1.2" fill="currentColor" stroke="none" />
                    </svg>
                    Add photos or videos (up to {MAX_FILES})
                  </label>

                  {files.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {files.map((pf, i) => (
                        <div key={i} className="relative">
                          {pf.type === "video" ? (
                            <video src={pf.previewUrl} className="h-16 w-16 rounded-md object-cover" />
                          ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={pf.previewUrl} alt="" className="h-16 w-16 rounded-md object-cover" />
                          )}
                          <button
                            type="button"
                            onClick={() => removeFile(i)}
                            aria-label="Remove file"
                            className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-flame-500 text-[11px] font-bold text-white"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {notice && (
                  <p
                    className={`text-xs font-medium ${
                      notice.kind === "ok" ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {notice.text}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-lg bg-flame-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-flame-600 disabled:opacity-60"
                >
                  {submitting ? "Posting..." : "Post review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ============ LIGHTBOX ============ */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-night-950/90 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl text-white transition-colors hover:bg-flame-500"
          >
            ×
          </button>
          <div
            className="max-h-[85vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            {lightbox.type === "video" ? (
              <video
                src={lightbox.url}
                controls
                autoPlay
                className="max-h-[85vh] max-w-[90vw] rounded-xl"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={lightbox.url}
                alt="Customer upload"
                className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
        active
          ? "bg-flame-500 text-white"
          : "border border-white/10 text-slate-400 hover:border-flame-500/40 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
