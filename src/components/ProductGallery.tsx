"use client";

import { useCallback, useEffect, useState } from "react";

type MediaItem = { src: string; type: "image" | "video" };

const mono = { fontFamily: "var(--font-spline), monospace" } as const;

const EXTENSIONS = ["png", "jpg", "jpeg", "webp", "mp4", "mov", "webm"];
const VIDEO_EXT = new Set(["mp4", "mov", "webm"]);
const MAX_FILES = 10;

function buildMediaList(mediaDir: string): MediaItem[] {
  const items: MediaItem[] = [];
  for (let i = 1; i <= MAX_FILES; i++) {
    for (const ext of EXTENSIONS) {
      items.push({
        src: `/media/products/${mediaDir}/${i}.${ext}`,
        type: VIDEO_EXT.has(ext) ? "video" : "image",
      });
    }
  }
  return items;
}

export default function ProductGallery({
  mediaDir,
  productName,
}: Readonly<{
  mediaDir: string;
  productName: string;
}>) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    const candidates = buildMediaList(mediaDir);
    const found: MediaItem[] = [];
    let pending = candidates.length;

    candidates.forEach((item) => {
      if (item.type === "video") {
        const video = document.createElement("video");
        video.preload = "metadata";
        video.onloadedmetadata = () => {
          found.push(item);
          if (--pending === 0) finalize();
        };
        video.onerror = () => {
          if (--pending === 0) finalize();
        };
        video.src = item.src;
      } else {
        const img = new Image();
        img.onload = () => {
          found.push(item);
          if (--pending === 0) finalize();
        };
        img.onerror = () => {
          if (--pending === 0) finalize();
        };
        img.src = item.src;
      }
    });

    function finalize() {
      const sorted = found.sort((a, b) => {
        const numA = parseInt(a.src.match(/\/(\d+)\./)?.[1] ?? "0");
        const numB = parseInt(b.src.match(/\/(\d+)\./)?.[1] ?? "0");
        return numA - numB || a.src.localeCompare(b.src);
      });
      const unique = sorted.filter(
        (item, i, arr) =>
          arr.findIndex(
            (x) => x.src.replace(/\.[^.]+$/, "") === item.src.replace(/\.[^.]+$/, "")
          ) === i
      );
      setMedia(unique);
    }
  }, [mediaDir]);

  const go = useCallback(
    (dir: 1 | -1) => {
      setActive((prev) => (prev + dir + media.length) % media.length);
    },
    [media.length]
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    globalThis.addEventListener("keydown", onKey);
    return () => globalThis.removeEventListener("keydown", onKey);
  }, [lightbox, go]);

  if (media.length === 0) {
    return (
      <div
        className="ph flex h-full w-full items-center justify-center"
        style={{ borderRadius: "4px" }}
      >
        <div className="text-center">
          <div className="text-accent text-[10px] tracking-[.18em] uppercase">&#9679; COMING SOON</div>
          <div className="mt-1 text-dim text-[10px] tracking-[.14em] uppercase">PRODUCT IMAGERY ON ITS WAY</div>
        </div>
      </div>
    );
  }

  const current = media[active];

  return (
    <div className="flex h-full w-full flex-col">
      {/* Main display */}
      <button
        type="button"
        onClick={() => setLightbox(true)}
        className="relative flex flex-1 cursor-zoom-in items-center justify-center overflow-hidden"
        style={{ borderRadius: "4px", background: "rgba(255,255,255,.02)", minHeight: "300px" }}
        aria-label={`View ${productName} media`}
      >
        {current.type === "video" ? (
          <video
            src={current.src}
            className="max-h-full max-w-full object-contain"
            muted
            autoPlay
            loop
            playsInline
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={current.src}
            alt={`${productName} ${active + 1}`}
            className="max-h-full max-w-full object-contain"
          />
        )}

        {media.length > 1 && (
          <>
            <span
              className="absolute bottom-3 right-3 bg-carbon/70 px-2 py-1 text-[10px] tracking-[.12em] text-muted"
              style={{ ...mono, borderRadius: "2px" }}
            >
              {active + 1} / {media.length}
            </span>
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center bg-carbon/60 text-chalk transition-colors hover:bg-accent hover:text-carbon"
              style={{ borderRadius: "2px", cursor: "pointer" }}
              onClick={(e) => { e.stopPropagation(); go(-1); }}
              role="button"
              aria-label="Previous"
            >
              &#8249;
            </span>
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center bg-carbon/60 text-chalk transition-colors hover:bg-accent hover:text-carbon"
              style={{ borderRadius: "2px", cursor: "pointer" }}
              onClick={(e) => { e.stopPropagation(); go(1); }}
              role="button"
              aria-label="Next"
            >
              &#8250;
            </span>
          </>
        )}
      </button>

      {/* Thumbnail strip */}
      {media.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {media.map((m, i) => (
            <button
              key={m.src}
              type="button"
              onClick={() => setActive(i)}
              className="relative shrink-0 overflow-hidden transition-all"
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "3px",
                border: i === active ? "2px solid var(--color-accent)" : "1px solid var(--color-border-strong)",
                opacity: i === active ? 1 : 0.6,
              }}
              aria-label={`View image ${i + 1}`}
            >
              {m.type === "video" ? (
                <video src={m.src} muted preload="metadata" className="h-full w-full object-cover" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.src} alt="" className="h-full w-full object-cover" />
              )}
              {m.type === "video" && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <span className="text-[10px] text-white">&#9654;</span>
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(10,10,11,.92)", backdropFilter: "blur(8px)" }}
          onClick={() => setLightbox(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center bg-raised text-xl text-chalk transition-colors hover:bg-accent hover:text-carbon"
            style={{ borderRadius: "2px" }}
          >
            &times;
          </button>

          {media.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); go(-1); }}
                className="absolute left-5 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center bg-raised text-2xl text-chalk transition-colors hover:bg-accent hover:text-carbon"
                style={{ borderRadius: "2px" }}
                aria-label="Previous"
              >
                &#8249;
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); go(1); }}
                className="absolute right-5 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center bg-raised text-2xl text-chalk transition-colors hover:bg-accent hover:text-carbon"
                style={{ borderRadius: "2px" }}
                aria-label="Next"
              >
                &#8250;
              </button>
            </>
          )}

          <div
            className="max-h-[85vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            {current.type === "video" ? (
              <video
                src={current.src}
                controls
                autoPlay
                className="max-h-[85vh] max-w-[90vw]"
                style={{ borderRadius: "3px" }}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={current.src}
                alt={`${productName} ${active + 1}`}
                className="max-h-[85vh] max-w-[90vw] object-contain"
                style={{ borderRadius: "3px" }}
              />
            )}
          </div>

          <span
            className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-carbon/70 px-3 py-1 text-[11px] tracking-[.12em] text-muted"
            style={{ ...mono, borderRadius: "2px" }}
          >
            {active + 1} / {media.length}
          </span>
        </div>
      )}
    </div>
  );
}
