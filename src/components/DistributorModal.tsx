"use client";

import { useEffect } from "react";

const MAPS_QUERY = encodeURIComponent("Yash Marketing, Kanpur");

export default function DistributorModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-night-950/90 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Authorized distributor"
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-night-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h3 className="text-lg font-semibold text-white">Authorized Distributor</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-lg text-white transition-colors hover:bg-flame-500"
          >
            ×
          </button>
        </div>

        <div className="px-6 py-5">
          <p className="text-base font-semibold text-white">Yash Marketing</p>
          <p className="mt-0.5 text-sm text-slate-400">Kanpur, Uttar Pradesh</p>

          <ul className="mt-4 space-y-2.5 text-sm">
            <li className="flex items-center gap-2.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f28c28" strokeWidth="1.8">
                <path d="M4 6a2 2 0 0 1 2-2h2l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v2a2 2 0 0 1-2 2A16 16 0 0 1 4 6z" />
              </svg>
              <a href="tel:+919839187898" className="text-slate-300 hover:text-flame-400">
                +91 98391 87898
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f28c28" strokeWidth="1.8">
                <path d="M4 6h16v12H4zM4 7l8 6 8-6" />
              </svg>
              <a href="mailto:yashp.marketing@gmail.com" className="text-slate-300 hover:text-flame-400">
                yashp.marketing@gmail.com
              </a>
            </li>
          </ul>

          <div className="mt-5 overflow-hidden rounded-lg border border-white/10">
            <iframe
              src={`https://maps.google.com/maps?q=${MAPS_QUERY}&output=embed`}
              className="h-52 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Yash Marketing on Google Maps"
            />
          </div>

          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-flame-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-flame-600"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            Get directions on Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
