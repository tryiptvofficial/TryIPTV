"use client";

import { useEffect, useState } from "react";

import { lowestMonthly } from "@/lib/plan-pricing";

/**
 * Mobile-only bottom bar ("From $X/mo" + "Buy Now") that scrolls to #pricing.
 * Hidden at the top of the page, while the pricing section is on screen, and on larger screens.
 * It stops short of the fixed chat button (bottom-right, 48px on phones) so it never covers it.
 */
export function MobileBuyBar() {
  const [pricingVisible, setPricingVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const pricing = document.getElementById("pricing");
    const observer = pricing
      ? new IntersectionObserver(([entry]) => setPricingVisible(entry.isIntersecting), { threshold: 0.05 })
      : null;
    if (pricing && observer) observer.observe(pricing);

    const onScroll = () => setScrolled(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const visible = scrolled && !pricingVisible;

  return (
    <div
      aria-hidden={!visible}
      className={`fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] left-3 right-[calc(1rem+3rem+0.75rem+env(safe-area-inset-right,0px))] z-40 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] sm:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <div className="flex h-12 items-center justify-between gap-3 rounded-xl border border-white/[0.1] bg-[#050606] pl-4 pr-0.5 shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
        <p className="text-sm font-semibold leading-tight text-foreground">
          From <span className="text-primary">{lowestMonthly}/mo</span>
          <span className="block text-xs font-medium text-muted-foreground">12-month plan</span>
        </p>
        <a
          href="#pricing"
          tabIndex={visible ? 0 : -1}
          className="inline-flex h-11 items-center rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground"
        >
          Buy Now
        </a>
      </div>
    </div>
  );
}
