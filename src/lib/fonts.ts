/**
 * Shared type roles.
 *
 * - `display` — Saira Condensed. Headlines and short labels ONLY. It is a narrow
 *   display face and becomes hard to read at paragraph sizes.
 * - `body`    — Inter. Anything a person actually has to read: descriptions,
 *   fragrance notes, specs, list copy.
 * - `mono`    — Spline Sans Mono. Short uppercase eyebrows, counters and codes.
 *   Never use it for sentences.
 */
export const display = {
  fontFamily: "var(--font-saira), 'Arial Narrow', Arial, sans-serif",
} as const;

export const body = {
  fontFamily: "var(--font-inter), system-ui, -apple-system, Segoe UI, Arial, sans-serif",
} as const;

export const mono = {
  fontFamily: "var(--font-spline), ui-monospace, SFMono-Regular, Menlo, monospace",
} as const;
