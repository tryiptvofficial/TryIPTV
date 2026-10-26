"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

// The Radix sheet and the form state are only needed once the chat opens, so they are code-split
// off the bundle every page loads; hovering/focusing/touching the button starts the download early.
const loadPanel = () => import("@/components/shared/ContactSheetPanel");
const ContactSheetPanel = dynamic(() => loadPanel().then((mod) => mod.ContactSheetPanel), { ssr: false });

// Plan card sections. Below xl the button would sit over card text and "Choose" buttons, so it
// steps aside while one of them is on screen (every card button opens WhatsApp support anyway).
const PLAN_SECTIONS = "#pricing, #pricing-plans";

export function ContactSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [overPlans, setOverPlans] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const sections = document.querySelectorAll(PLAN_SECTIONS);
    const belowXl = window.matchMedia("(max-width: 1279.98px)");
    const visible = new Set<Element>();
    const update = () => setOverPlans(belowXl.matches && visible.size > 0);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      update();
    });
    sections.forEach((section) => observer.observe(section));
    belowXl.addEventListener("change", update);
    return () => {
      observer.disconnect();
      belowXl.removeEventListener("change", update);
      // A client-side route change starts the next page with the button shown.
      setOverPlans(false);
    };
  }, [pathname]);

  const onOpenChange = useCallback((open: boolean) => setIsOpen(open), []);
  const hidden = overPlans && !isOpen;

  return (
    <>
      {/* Offset by the safe-area insets so the button clears the iPhone home indicator / notch.
          48px on phones so it covers less text; 56px from sm up. */}
      <Button
        ref={triggerRef}
        className={`fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] right-[calc(1rem+env(safe-area-inset-right,0px))] z-50 h-12 w-12 rounded-full shadow-lg transition-[opacity,translate] duration-200 sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] sm:right-[calc(1.5rem+env(safe-area-inset-right,0px))] sm:h-14 sm:w-14 ${
          hidden ? "pointer-events-none translate-y-4 opacity-0" : ""
        }`}
        aria-label="Open contact form"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        tabIndex={hidden ? -1 : undefined}
        onPointerEnter={loadPanel}
        onFocus={loadPanel}
        onTouchStart={loadPanel}
        onClick={() => {
          setHasOpened(true);
          setIsOpen(true);
        }}
      >
        <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>
      {hasOpened && <ContactSheetPanel open={isOpen} onOpenChange={onOpenChange} triggerRef={triggerRef} />}
    </>
  );
}
