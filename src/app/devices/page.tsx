import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageSchema } from "@/components/shared/Schema";
import { generateBreadcrumbSchema, generateItemListSchema } from "@/lib/schema";
import { siteConfig, generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { howToArticles, getDeviceSlug } from "@/lib/how-to";
import { ArrowRight, Clock, Tv, CheckCircle2 } from "lucide-react";

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: "IPTV Setup Guides for All Compatible Devices",
    description: "Step-by-step setup guides to install and configure TryIPTV on Amazon Fire TV Stick, Android TV, Apple TV, Smart TVs, Windows, macOS, and MAG boxes.",
    canonical: "/devices",
  });
}

export default function DevicesPage() {
  const baseUrl = siteConfig.url;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: `${baseUrl}/` },
    { name: "Devices", item: `${baseUrl}/devices` },
  ]);

  return (
    <>
      <PageSchema
        path="/devices"
        name="IPTV Setup Guides for All Compatible Devices"
        description="Step-by-step setup guides to install and configure TryIPTV on Amazon Fire TV Stick, Android TV, Apple TV, Smart TVs, Windows, macOS, and MAG boxes."
        type="CollectionPage"
        nodes={[
          breadcrumbSchema,
          generateItemListSchema(
            "IPTV device setup guides",
            howToArticles.map((a) => ({ name: a.title, path: `/devices/${getDeviceSlug(a.id)}` })),
          ),
        ]}
      />

      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <Container className="relative text-center">
          <Breadcrumb items={[{ label: "Devices" }]} align="center" />
          <SectionHeader
            as="h1"
            eyebrow="Device Compatibility & Setup"
            title="IPTV Setup Guides for All Compatible Devices"
            subtitle="Follow our tested step-by-step installation guides to configure TryIPTV on your streaming hardware. Every plan includes 2 simultaneous connections."
          />
        </Container>
      </Section>

      <Section className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {howToArticles.map((article) => {
              const totalTimeInMinutes = article.totalTime?.replace('PT', '').replace('M', '');

              return (
                <Card key={article.id} className="flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:bg-card/80">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-xs font-semibold text-primary">
                        <Tv className="h-3 w-3" />
                        {article.primaryKeyword}
                      </span>
                      {totalTimeInMinutes && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 text-primary" />
                          {totalTimeInMinutes} min
                        </span>
                      )}
                    </div>
                    <CardTitle as="h2" className="font-headline text-lg sm:text-xl font-extrabold leading-snug">
                      <Link href={`/devices/${getDeviceSlug(article.id)}`} className="tap-target hover:text-primary transition-colors">
                        {article.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 flex flex-col justify-between flex-1">
                    {/* Full description below 640px: at 16px a 3-line clamp hid most of it. */}
                    <p className="text-base sm:text-sm text-muted-foreground leading-relaxed sm:line-clamp-3 mb-6">
                      {article.description}
                    </p>
                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {article.steps.length} setup steps
                      </span>
                      <Link
                        href={`/devices/${getDeviceSlug(article.id)}`}
                        className="tap-target inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:underline"
                      >
                        {article.primaryKeyword} setup guide <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-10 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6 text-center max-w-2xl mx-auto">
            <h3 className="font-headline text-base sm:text-lg font-bold text-foreground">
              New to IPTV or need a general installation overview?
            </h3>
            <p className="mt-1.5 text-base sm:text-sm text-muted-foreground leading-relaxed">
              Check our <Link href="/setup" className="text-primary font-semibold hover:underline">universal IPTV setup hub</Link> for general walkthroughs and credential tips, or <Link href="/players" className="text-primary font-semibold hover:underline">browse player guides</Link> to configure apps like TiviMate, IPTV Smarters Pro, and XCIPTV.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-[#0b100d] p-8 sm:p-10 my-16 text-center">
            <div className="absolute inset-x-0 top-0 h-1 bg-primary sm:inset-y-0 sm:left-0 sm:h-full sm:w-1" />
            <p className="eyebrow mb-2">Ready to Stream</p>
            <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-foreground">
              Ready to Start Watching on a Compatible Device?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-6 text-muted-foreground">
              Get access to 25,000+ live channels worldwide and 120,000+ movies and TV shows with 2 simultaneous connections on compatible devices and supported player apps.{" "}
              <Link href="/guides/iptv-connections" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                How many devices can watch at once?
              </Link>
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/pricing">View Subscription Plans</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/iptv-free-trial">Start 24-Hour Free Trial</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
