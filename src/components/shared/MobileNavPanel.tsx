"use client"

import type { RefObject } from 'react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/shared/Logo';
import { navLinks } from '@/lib/site-data/nav';

/** The menu sheet itself; MobileNav loads it on the first tap so pages don't ship Radix up front. */
export function MobileNavPanel({
  open,
  onOpenChange,
  triggerRef,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {/* Dialog needs an accessible name; the title is visually hidden so the design is unchanged. */}
      <SheetContent
        side="right"
        className="flex flex-col border-white/[0.08] bg-[#07080a]"
        aria-describedby={undefined}
        // There is no Radix trigger, so return focus to the menu button by hand.
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          triggerRef.current?.focus();
        }}
      >
        <SheetTitle className="sr-only">Site navigation</SheetTitle>
        <Logo />
        <nav className="mt-8 flex flex-1 flex-col gap-4" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
            className="rounded-md border-b border-white/[0.06] px-1 py-4 text-lg font-semibold transition-colors hover:text-foreground"
              onClick={() => onOpenChange(false)}
            >
              {link.name}
            </Link>))}
        </nav>
        <Button asChild className="mt-auto">
          <Link href="/pricing" onClick={() => onOpenChange(false)}>View Plans</Link>
        </Button>
      </SheetContent>
    </Sheet>
  );
}
