"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SUB_BRANDS } from "@/lib/products";

type Result = { name: string; detail: string; href: string };

const INDEX: Result[] = SUB_BRANDS.flatMap((b) => [
  { name: b.name, detail: b.tagline, href: `/${b.slug}` },
  ...b.products.map((p) => ({
    name: p.name,
    detail: `${b.name}${p.variant ? ` · ${p.variant}` : ""}`,
    href: `/${b.slug}#${p.slug}`,
  })),
]);

export default function SearchBar({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const blurTimer = useRef<number | null>(null);

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return INDEX.filter(
      (r) =>
        r.name.toLowerCase().includes(t) || r.detail.toLowerCase().includes(t),
    ).slice(0, 6);
  }, [q]);

  function go(href: string) {
    setQ("");
    setOpen(false);
    router.push(href);
  }

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-night-800/70 px-4 py-2.5">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-slate-500">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.5-4.5" />
        </svg>
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            blurTimer.current = window.setTimeout(() => setOpen(false), 150);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && results[0]) go(results[0].href);
            if (e.key === "Escape") setOpen(false);
          }}
          placeholder="Search products..."
          className="w-full bg-transparent text-sm text-white placeholder-slate-500 outline-none"
        />
      </div>

      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-white/10 bg-night-900 shadow-2xl">
          {results.map((r) => (
            <button
              key={r.href}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => go(r.href)}
              className="flex w-full flex-col px-4 py-3 text-left transition-colors hover:bg-night-800"
            >
              <span className="text-sm font-medium text-white">{r.name}</span>
              <span className="text-xs text-slate-500">{r.detail}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
