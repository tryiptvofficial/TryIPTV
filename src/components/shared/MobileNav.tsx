"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/shared/Logo';
import { navLinks } from '@/lib/site-data/nav';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="size-11 lg:hidden" aria-label="Open navigation">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Navigation</span>
        </Button>
      </SheetTrigger>
      {/* Dialog needs an accessible name; the title is visually hidden so the design is unchanged. */}
      <SheetContent side="right" className="flex flex-col border-white/[0.08] bg-[#07080a]" aria-describedby={undefined}>
        <SheetTitle className="sr-only">Site navigation</SheetTitle>
        <Logo />
        <nav className="mt-8 flex flex-1 flex-col gap-4" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
            className="rounded-md border-b border-white/[0.06] px-1 py-4 text-lg font-semibold transition-colors hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>))}
        </nav>
        <Button asChild className="mt-auto">
          <Link href="/pricing" onClick={() => setIsOpen(false)}>View Plans</Link>
        </Button>
      </SheetContent>
    </Sheet>
  );
}
