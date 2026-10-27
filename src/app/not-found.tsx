import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { Home, Compass, HelpCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404: Page Not Found',
  // null drops the layout's "index, follow" (and googlebot) tags; Next.js adds its own
  // <meta name="robots" content="noindex"> to 404 responses, so that is the only robots tag left.
  robots: null,
};

export default function NotFound() {
  return (
    <Section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <p className="font-headline text-7xl font-extrabold text-primary sm:text-8xl">
            404
          </p>
          <h1 className="mt-4 font-headline text-3xl font-extrabold text-foreground sm:text-4xl">
            Page Not Found
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Back to Homepage
              </Link>
            </Button>
          </div>

          <div className="mt-12 border-t border-white/[0.08] pt-8">
            <p className="text-xs font-extrabold uppercase text-muted-foreground">Or explore helpful destinations</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Button asChild variant="outline" size="sm">
                <Link href="/pricing">
                  <Compass className="mr-2 h-3.5 w-3.5" />
                  View Pricing
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/iptv-free-trial">
                  <Compass className="mr-2 h-3.5 w-3.5" />
                  Free Trial
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/faq">
                  <HelpCircle className="mr-2 h-3.5 w-3.5" />
                  Read FAQ
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
