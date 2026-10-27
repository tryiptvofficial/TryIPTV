import type { ReactNode } from "react";
import { SHOW_CONFIRM_MARKERS } from "@/lib/site-data/company";

/**
 * Renders `children` when the fact is confirmed. Otherwise shows a visible [CONFIRM] marker on
 * Preview/dev builds (so the owner can review drafts on the Preview URL) and nothing in production.
 */
export function Confirm({
  value,
  question,
  children,
}: {
  value: unknown;
  question: string;
  children?: ReactNode;
}) {
  if (value !== null && value !== undefined && value !== false && !(Array.isArray(value) && value.length === 0)) {
    return <>{children}</>;
  }
  if (!SHOW_CONFIRM_MARKERS) return null;
  return (
    <span className="my-1 inline-block rounded border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 text-sm font-semibold text-amber-300">
      [CONFIRM] {question}
    </span>
  );
}
