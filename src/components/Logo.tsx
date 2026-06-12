import Link from "next/link";
import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/media/logos/logo.png"
        alt="NightFury"
        width={38}
        height={38}
        className="rounded-md"
        priority
      />
      <span className="font-display text-2xl font-bold italic tracking-tight text-white">
        Night<span className="text-flame-500">Fury</span>
      </span>
    </Link>
  );
}
