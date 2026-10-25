
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/Container';
import { Logo } from '@/components/shared/Logo';
import dynamic from 'next/dynamic';
import { ArrowUpRight, Menu } from 'lucide-react';
import { navLinks } from '@/lib/site-data/nav';

const MobileNav = dynamic(
  () => import('@/components/shared/MobileNav').then((mod) => mod.MobileNav),
  {
    loading: () => (
      <Button variant="ghost" size="icon" className="size-11 lg:hidden" aria-label="Open navigation">
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle Navigation</span>
      </Button>
    ),
  }
);

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full py-3">
      <Container>
        <div className="mx-auto flex h-14 items-center rounded-xl border border-white/[0.08] bg-[#050606]/80 px-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_16px_48px_rgba(0,0,0,0.26)] backdrop-blur-xl sm:px-4">
          <Logo />
          {/* Links carry px-2.5 (hit area >= 44px wide) with space-x-1, keeping the original 24px visual gap. */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center space-x-1 lg:flex" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-2.5 py-3 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button asChild size="sm" variant="outline" className="hidden border-primary/30 bg-primary/[0.08] text-foreground hover:border-primary/50 hover:bg-primary/[0.14] sm:inline-flex">
              <Link href="/pricing">
                View Plans
                <ArrowUpRight />
              </Link>
            </Button>
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
