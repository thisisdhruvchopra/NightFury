import type { CoreType } from "@/data/products";

const TYPES: { k: CoreType; label: string }[] = [
  { k: "organic", label: "Organic" },
  { k: "gel", label: "Gel" },
];

/**
 * Organic | Gel segmented control for the Aroma Core stage. The active side
 * follows the current scent; clicking a side jumps to that group's first scent.
 */
export default function TypeToggle({
  active,
  onPick,
}: Readonly<{ active?: CoreType; onPick: (t: CoreType) => void }>) {
  return (
    <div
      role="group"
      aria-label="Aroma Core type"
      className="mt-4 inline-flex overflow-hidden rounded-[2px] border-2 border-navy bg-white"
    >
      {TYPES.map((t) => {
        const on = t.k === active;
        return (
          <button
            key={t.k}
            type="button"
            aria-pressed={on}
            onClick={() => onPick(t.k)}
            className="nf-tint inline-flex min-h-11 cursor-pointer items-center gap-2 border-none px-5 font-mono text-[12px] font-bold tracking-[0.16em] uppercase"
            style={{
              background: on ? "#020F26" : "#FFFFFF",
              color: on ? "#F4F5F7" : "#3A3D46",
              transitionDuration: "0.35s",
            }}
          >
            <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: on ? "#FF5500" : "#C9CCD3" }} />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
