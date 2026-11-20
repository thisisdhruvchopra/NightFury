/**
 * Owner placeholders.
 *
 * Any content string that starts with "[" (for example "[To be confirmed]")
 * is unfinished. On the live site (production build) it is hidden, so
 * visitors never see half-written copy. While you run `npm run dev` it shows
 * as an orange dashed tag, so you can see exactly what still needs filling in.
 *
 * To fill one in: find the bracketed text in src/data/site.ts or
 * src/data/products.ts and replace it with the real value.
 */

export const SHOW_TODOS = process.env.NODE_ENV !== "production";

/** True when a value is still a placeholder (empty or bracketed). */
export const isTodo = (v?: string | null) => !v || v.trim().startsWith("[");

/** True when a value is real, finished content. */
export const ready = (v?: string | null): v is string => !isTodo(v);

/**
 * Renders finished content as-is. A placeholder renders as a highlighted tag
 * in development, and as `fallback` (or nothing) on the live site.
 */
export function Todo({
  value,
  fallback = null,
  children,
}: Readonly<{ value?: string | null; fallback?: React.ReactNode; children?: React.ReactNode }>) {
  if (ready(value)) return <>{children ?? value}</>;
  if (SHOW_TODOS) return <mark className="nf-todo">{value || "[Fill in]"}</mark>;
  return <>{fallback}</>;
}
