export default function TopBar() {
  return (
    <div className="border-b border-white/5 bg-night-900 text-xs text-slate-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-2">
        <span className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f28c28" strokeWidth="2">
            <path d="M12 2 3 6v6c0 5 3.8 9 9 10 5.2-1 9-5 9-10V6l-9-4zM8.5 12l2.5 2.5L16 9.5" />
          </svg>
          100% Genuine Products
        </span>
        <span className="hidden items-center gap-2 md:flex">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f28c28" strokeWidth="2">
            <path d="M12 8v5l3 2M21 12a9 9 0 1 1-9-9 9 9 0 0 1 9 9z" />
          </svg>
          18-Month Warranty on LED Lighting
        </span>
        <a href="tel:+919839600197" className="hidden items-center gap-2 hover:text-flame-400 sm:flex">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f28c28" strokeWidth="2">
            <path d="M4 6a2 2 0 0 1 2-2h2l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v2a2 2 0 0 1-2 2A16 16 0 0 1 4 6z" />
          </svg>
          Support: +91 98396 00197
        </a>
      </div>
    </div>
  );
}
