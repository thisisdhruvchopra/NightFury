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

const mono = { fontFamily: "var(--font-spline), monospace" } as const;

export default function Reviews({ products }: Readonly<{ products: ProductOption[] }>) {
  const [remote, setRemote] = useState<Review[]>([]);
  const [local, setLocal] = useState<Review[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [lightbox, setLightbox] = useState<ReviewMedia | null>(null);

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

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    globalThis.addEventListener("keydown", onKey);
    return () => globalThis.removeEventListener("keydown", onKey);
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
        if (insErr && watt && /variant/i.test(insErr.message)) {
          delete row.variant;
          ({ error: insErr } = await supabase.from("reviews").insert(row));
        }
        if (insErr) throw new Error(insErr.message);
      } else {
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
    "w-full border border-border-strong bg-carbon px-3.5 py-2.5 text-sm text-chalk placeholder-dim outline-none transition-colors focus:border-accent";

  return (
    <section className="py-20" id="reviews">
      <div className="mx-auto max-w-[1280px] px-10">
        <div
          className="text-[11px] tracking-[.2em] text-accent uppercase"
          style={mono}
        >
          CUSTOMER REVIEWS
        </div>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2
            className="m-0 text-[34px] font-extrabold italic uppercase tracking-tight"
            style={{ transform: "skewX(-4deg)" }}
          >
            What Owners Say
          </h2>
          {all.length > 0 && (
            <div className="flex items-center gap-2">
              <StarRating rating={Math.round(avg)} size={18} />
              <span className="text-sm text-dim" style={mono}>
                {avg} / 5 &middot; {all.length} {all.length === 1 ? "review" : "reviews"}
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
              <article key={r.id} className="nf-card p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center bg-raised text-sm font-bold text-accent"
                      style={{ borderRadius: "2px" }}
                    >
                      {r.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-chalk">{r.name}</div>
                      <div className="text-[10px] tracking-[.12em] text-dim" style={mono}>
                        {r.location ? `${r.location} · ` : ""}{r.date}
                      </div>
                    </div>
                  </div>
                  <StarRating rating={r.rating} size={14} />
                </div>

                <h3 className="mt-4 text-sm font-bold text-chalk">{r.title}</h3>
                <p className="mt-1.5 text-[13px] leading-[1.65] text-muted" style={mono}>{r.body}</p>
                <p className="mt-3 text-[10px] tracking-[.1em] text-dim" style={mono}>
                  Product:{" "}
                  <span className="text-[#C8C8CE]">
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
                        className="group/media relative cursor-pointer overflow-hidden border border-border transition-colors hover:border-accent"
                        style={{ borderRadius: "3px" }}
                        aria-label="View media"
                      >
                        {m.type === "video" ? (
                          <>
                            <video src={m.url} muted preload="metadata" className="h-28 w-36 object-cover" />
                            <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A0A0B">
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
              <div className="nf-card p-10 text-center" style={{ borderStyle: "dashed" }}>
                <p className="text-sm font-bold text-chalk">No reviews yet</p>
                <p className="mt-1 text-[12px] text-dim" style={mono}>
                  Own one of these products? Be the first to share your experience.
                </p>
              </div>
            )}
          </div>

          {/* Review form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="nf-card sticky top-24 p-7"
            >
              <h3 className="text-lg font-bold italic uppercase text-chalk">Write a review</h3>
              <p className="mt-1 text-[11px] text-dim" style={mono}>
                Share your experience. Photos and videos welcome.
              </p>

              <div className="mt-5 space-y-4">
                <input
                  className={inputCls}
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ ...mono, borderRadius: "2px" }}
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
                  style={{ ...mono, borderRadius: "2px" }}
                >
                  {products.map((p) => (
                    <option key={p.slug} value={p.slug} className="bg-carbon">
                      {p.name}
                    </option>
                  ))}
                </select>

                {(() => {
                  const opts = products.find((p) => p.slug === productSlug)?.wattOptions;
                  if (!opts) return null;
                  return (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-dim" style={mono}>Output:</span>
                      {opts.map((w) => (
                        <button
                          key={w}
                          type="button"
                          onClick={() => setWatt(w)}
                          className="border px-3.5 py-1.5 text-xs font-bold transition-colors"
                          style={{
                            ...mono,
                            borderRadius: "2px",
                            borderColor: watt === w ? "var(--color-accent)" : "var(--color-border-strong)",
                            background: watt === w ? "rgba(255,85,0,.1)" : "transparent",
                            color: watt === w ? "var(--color-accent)" : "var(--color-chalk)",
                          }}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                  );
                })()}

                <div className="flex items-center gap-2">
                  <span className="text-sm text-dim" style={mono}>Your rating:</span>
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
                          fill={i <= (hoverRating || rating) ? "#FF5500" : "rgba(255,255,255,0.15)"}
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
                  style={{ ...mono, borderRadius: "2px" }}
                />

                <textarea
                  className={`${inputCls} min-h-28 resize-y`}
                  placeholder="Tell us about the product..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  style={{ ...mono, borderRadius: "2px" }}
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
                    className="flex cursor-pointer items-center justify-center gap-2 border border-dashed border-border-strong px-4 py-3.5 text-sm text-dim transition-colors hover:border-accent hover:text-chalk"
                    style={{ ...mono, borderRadius: "2px" }}
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
                            <video src={pf.previewUrl} className="h-16 w-16 object-cover" style={{ borderRadius: "2px" }} />
                          ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={pf.previewUrl} alt="" className="h-16 w-16 object-cover" style={{ borderRadius: "2px" }} />
                          )}
                          <button
                            type="button"
                            onClick={() => removeFile(i)}
                            aria-label="Remove file"
                            className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center bg-accent text-[11px] font-bold text-carbon"
                            style={{ borderRadius: "2px" }}
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {notice && (
                  <p
                    className={`text-xs font-bold ${
                      notice.kind === "ok" ? "text-emerald-400" : "text-redline"
                    }`}
                    style={mono}
                  >
                    {notice.text}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="nf-btn nf-btn-primary w-full justify-center disabled:opacity-60"
                  style={{ padding: "12px 20px", fontSize: "14px" }}
                >
                  <span>{submitting ? "Posting..." : "Post Review"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ============ LIGHTBOX ============ */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(10,10,11,.9)", backdropFilter: "blur(8px)" }}
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center bg-raised text-xl text-chalk transition-colors hover:bg-accent hover:text-carbon"
            style={{ borderRadius: "2px" }}
          >
            &times;
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
                className="max-h-[85vh] max-w-[90vw]"
                style={{ borderRadius: "3px" }}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={lightbox.url}
                alt="Customer upload"
                className="max-h-[85vh] max-w-[90vw] object-contain"
                style={{ borderRadius: "3px" }}
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
}: Readonly<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}>) {
  return (
    <button
      onClick={onClick}
      className="border px-4 py-1.5 text-xs font-bold uppercase tracking-[.1em] transition-colors"
      style={{
        fontFamily: "var(--font-spline), monospace",
        borderRadius: "2px",
        borderColor: active ? "var(--color-accent)" : "var(--color-border-strong)",
        background: active ? "var(--color-accent)" : "transparent",
        color: active ? "var(--color-carbon)" : "var(--color-dim)",
      }}
    >
      {children}
    </button>
  );
}
