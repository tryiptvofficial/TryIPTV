import React from "react";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArticleSummaryProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Editorial callout card placed at the top of long-form articles.
 * Preserves TryIPTV green/dark styling while elevating typography and vertical rhythm.
 */
export function ArticleSummary({
  title = "Quick Summary",
  children,
  className,
}: ArticleSummaryProps) {
  return (
    <div
      role="region"
      aria-label={title}
      className={cn(
        "mb-10 sm:mb-12 rounded-xl sm:rounded-2xl border border-primary/25 bg-primary/[0.04] p-6 sm:p-8 shadow-[inset_0_1px_0_rgba(0,240,120,0.06)] relative overflow-hidden",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary">
          <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
          Key Takeaway
        </span>
      </div>
      <h2 className="font-headline text-lg sm:text-xl font-bold text-foreground">
        {title}
      </h2>
      <div className="mt-3.5 space-y-3.5 text-base leading-relaxed text-muted-foreground [&_strong]:text-foreground [&_strong]:font-semibold [&_code]:font-mono [&_code]:text-xs sm:[&_code]:text-[13px] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:bg-white/[0.06] [&_code]:border [&_code]:border-white/[0.08] [&_code]:text-foreground">
        {children}
      </div>
    </div>
  );
}
