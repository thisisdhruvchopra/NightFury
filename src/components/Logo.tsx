import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-baseline gap-1 ${className}`}>
      <span className="font-display text-2xl font-extrabold italic tracking-tight text-white">
        Night<span className="text-flame-500">Fury</span>
      </span>
    </Link>
  );
}
