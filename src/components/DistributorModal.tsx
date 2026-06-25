"use client";

import { useEffect } from "react";

const MAPS_QUERY = encodeURIComponent("Yash Marketing, Kanpur");

export default function DistributorModal({ onClose }: Readonly<{ onClose: () => void }>) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(10,10,11,.9)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Authorized distributor"
    >
      <div
        className="nf-card w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h3 className="text-lg font-bold italic uppercase text-chalk">Authorized Distributor</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center bg-raised text-lg text-chalk transition-colors hover:bg-accent hover:text-carbon"
            style={{ borderRadius: "2px" }}
          >
            &times;
          </button>
        </div>

        <div className="px-6 py-5">
          <p className="text-base font-bold text-chalk">Yash Marketing</p>
          <p
            className="mt-1 text-[11px] tracking-[.12em] text-dim"
            style={{ fontFamily: "var(--font-spline), monospace" }}
          >
            KANPUR, UTTAR PRADESH
          </p>

          <ul className="mt-4 space-y-3">
            <li className="flex items-center gap-3">
              <span className="text-accent">&#9742;</span>
              <a
                href="tel:+919839187898"
                className="nf-link text-sm text-[#C8C8CE]"
                style={{ fontFamily: "var(--font-spline), monospace" }}
              >
                +91 98391 87898
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-accent">&#9993;</span>
              <a
                href="mailto:yashp.marketing@gmail.com"
                className="nf-link text-sm text-[#C8C8CE]"
                style={{ fontFamily: "var(--font-spline), monospace" }}
              >
                yashp.marketing@gmail.com
              </a>
            </li>
          </ul>

          <div className="mt-5 overflow-hidden border border-border" style={{ borderRadius: "3px" }}>
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
            className="nf-btn nf-btn-primary mt-5 w-full justify-center"
            style={{ padding: "12px 20px", fontSize: "14px" }}
          >
            <span>Get Directions on Google Maps</span>
          </a>
        </div>
      </div>
    </div>
  );
}
