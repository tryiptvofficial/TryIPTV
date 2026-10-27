"use client"

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

// The Radix sheet loads on first use (hover/focus/touch starts the download early), so pages
// don't download or hydrate it up front.
const loadPanel = () => import('@/components/shared/MobileNavPanel');
const MobileNavPanel = dynamic(() => loadPanel().then((mod) => mod.MobileNavPanel), { ssr: false });

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        ref={triggerRef}
        variant="ghost"
        size="icon"
        className="size-11 lg:hidden"
        aria-label="Open navigation"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onPointerEnter={loadPanel}
        onFocus={loadPanel}
        onTouchStart={loadPanel}
        onClick={() => {
          setHasOpened(true);
          setIsOpen(true);
        }}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle Navigation</span>
      </Button>
      {hasOpened && <MobileNavPanel open={isOpen} onOpenChange={setIsOpen} triggerRef={triggerRef} />}
    </>
  );
}
