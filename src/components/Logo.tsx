import Link from "next/link";
import Image from "next/image";

export default function Logo({ className = "", size = "md" }: { className?: string; size?: "md" | "lg" }) {
  const fontSize = size === "lg" ? "text-[42px]" : "text-[24px]";
  const imgSize = size === "lg" ? 44 : 36;

  return (
    <Link href="/" className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src="/media/logos/logo.png"
        alt="NightFury"
        width={imgSize}
        height={imgSize}
        className="rounded-md"
        priority
      />
      <span className={`nf-word ${fontSize}`} style={{ lineHeight: ".85" }}>
        <span className="n">Night</span>
        <span className="f">Fury</span>
        <span className="reg">&reg;</span>
      </span>
    </Link>
  );
}
