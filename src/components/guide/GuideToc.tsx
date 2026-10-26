"use client";

import React, { useEffect, useState } from "react";
import { ListFilter, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  label: string;
}

interface GuideTocProps {
  items: TocItem[];
  className?: string;
  variant?: "desktop" | "mobile";
}

export function GuideToc({ items, className, variant = "desktop" }: GuideTocProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0% -65% 0%",
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  // Mobile Disclosure Variant
  if (variant === "mobile") {
    return (
      <div className={cn("my-6 rounded-xl border border-white/[0.08] bg-[#07080a] lg:hidden", className)}>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex w-full items-center justify-between p-3.5 text-xs font-semibold text-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-primary rounded-xl"
          aria-expanded={mobileOpen}
        >
          <span className="flex items-center gap-2">
            <ListFilter className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span>On This Page ({items.length} sections)</span>
          </span>
          <ChevronDown
            className={cn("h-4 w-4 text-muted-foreground transition-transform duration-200", mobileOpen && "rotate-180")}
            aria-hidden="true"
          />
        </button>

        {mobileOpen && (
          <nav aria-label="Table of contents" className="border-t border-white/[0.06] p-3 text-xs">
            <ul className="space-y-1">
              {items.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        // Mobile TOC: 44px rows for touch.
                        "flex min-h-11 items-center rounded-md px-2.5 py-1.5 transition-colors",
                        isActive
                          ? "bg-primary/[0.08] text-primary font-medium"
                          : "text-muted-foreground hover:bg-white/[0.03] hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    );
  }

  // Desktop Sticky Card Variant
  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        "rounded-xl border border-white/[0.08] bg-[#07080a] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        className
      )}
    >
      <div className="flex items-center gap-2 pb-3 mb-2 border-b border-white/[0.08]">
        <ListFilter className="h-4 w-4 text-primary" aria-hidden="true" />
        {/* A label, not a heading: as an h3 it showed up inside the page outline (e.g. under the FAQ h2). */}
        <p className="font-headline text-xs font-bold uppercase tracking-wider text-foreground">
          On This Page
        </p>
      </div>

      <ul className="space-y-1 text-xs [max-height:calc(100vh-14rem)] supports-[height:100dvh]:max-h-[calc(100dvh-14rem)] overflow-y-auto pr-1">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "group relative flex items-center rounded-md py-1.5 transition-all text-xs pointer-coarse:min-h-11",
                  isActive
                    ? "bg-primary/[0.08] text-primary font-semibold pl-3 pr-2.5"
                    : "text-muted-foreground hover:bg-white/[0.02] hover:text-foreground px-2.5"
                )}
              >
                {isActive && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-3.5 w-0.5 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                )}
                <span className="line-clamp-2">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
