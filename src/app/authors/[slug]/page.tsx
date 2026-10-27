import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { PageSchema } from "@/components/shared/Schema";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { siteConfig, generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { AUTHORS, GUIDE_AUTHORS, GUIDE_REVIEWERS, GUIDE_TITLES, personId } from "@/lib/site-data/authors";
import { COMPANY } from "@/lib/site-data/company";

// Only confirmed, real authors get a profile page (see src/lib/site-data/authors.ts).
export const dynamicParams = false;

export function generateStaticParams() {
  return AUTHORS.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = AUTHORS.find((a) => a.slug === slug);
  if (!author) return {};
  const title = `${author.name}, ${author.role} | TryIPTV`;
  const reviewedCount = Object.values(GUIDE_REVIEWERS).filter((s) => s === slug).length;
  const description = reviewedCount
    ? `${author.name}, ${author.role} at TryIPTV, has reviewed ${reviewedCount} device, player, IPTV and troubleshooting guides. See the full list of reviewed guides.`
    : author.bio.slice(0, 155);
  return {
    ...generatePageMetadata({ title, description, canonical: `/authors/${slug}` }),
    // The layout's title template would append "| TryIPTV" a second time.
    title: { absolute: title },
  };
}

// Groups on the profile page, in the order the site's sections appear.
const guideSections = [
  { prefix: "/devices/", label: "Device setup guides" },
  { prefix: "/players/", label: "IPTV player guides" },
  { prefix: "/guides/", label: "IPTV guides" },
  { prefix: "/help/", label: "Troubleshooting guides" },
] as const;

const link = "font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary";

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = AUTHORS.find((a) => a.slug === slug);
  if (!author) notFound();
  const base = siteConfig.url;
  const url = `${base}/authors/${author.slug}`;
  const guides = Object.entries(GUIDE_AUTHORS).filter(([, s]) => s === author.slug).map(([path]) => path);
  const reviewed = Object.entries(GUIDE_REVIEWERS).filter(([, s]) => s === author.slug).map(([path]) => path);

  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url,
    dateModified: author.updated,
    mainEntity: {
      "@type": "Person",
      "@id": personId(base, author.slug),
      name: author.name,
      url,
      jobTitle: author.role,
      description: author.bio,
      ...(author.expertise.length ? { knowsAbout: author.expertise } : {}),
      worksFor: { "@id": `${base}/#organization` },
      ...(author.image ? { image: `${base}${author.image}` } : {}),
      ...(author.sameAs?.length ? { sameAs: author.sameAs } : {}),
    },
  };
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: `${base}/` },
    { name: "About TryIPTV", item: `${base}/about` },
    { name: author.name, item: url },
  ]);

  return (
    <>
      <PageSchema
        path={`/authors/${author.slug}`}
        name={`${author.name}, ${author.role}`}
        nodes={[profileSchema, breadcrumbSchema]}
      />
      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <Container className="relative text-center">
          <Breadcrumb items={[{ label: "About TryIPTV", href: "/about" }, { label: author.name }]} align="center" />
          <SectionHeader as="h1" eyebrow={author.role} title={author.name} subtitle={author.bio} />
        </Container>
      </Section>
      <Section className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <div className="space-y-6 text-base leading-7 text-muted-foreground">
            {author.role.startsWith("Founder") && (
              <p>
                See <Link href="/about" className={link}>About TryIPTV</Link> for the company details.
              </p>
            )}
            {reviewed.length > 0 && (
              <p>
                {author.name} has reviewed {reviewed.length} TryIPTV guides, listed below. Each one names the reviewer under its
                headline.
              </p>
            )}
            {author.since && <p>Writing and reviewing TryIPTV guides since {author.since}.</p>}
            {author.expertise.length > 0 && <p>Areas covered: {author.expertise.join(", ")}.</p>}
            {guides.length > 0 && (
              <div>
                <h2 className="font-headline text-xl font-bold text-foreground">Guides by {author.name}</h2>
                <ul className="mt-3 list-disc space-y-1 pl-6">
                  {guides.map((g) => <li key={g}><Link href={g} className={link}>{GUIDE_TITLES[g] ?? g}</Link></li>)}
                </ul>
              </div>
            )}
            {reviewed.length > 0 && (
              <div>
                <h2 className="font-headline text-xl font-bold text-foreground">Guides reviewed by {author.name}</h2>
                {guideSections.map(({ prefix, label }) => {
                  const items = reviewed.filter((g) => g.startsWith(prefix));
                  if (!items.length) return null;
                  return (
                    <div key={prefix} className="mt-5">
                      <h3 className="font-headline text-base font-bold text-foreground">{label}</h3>
                      <ul className="mt-2 list-disc space-y-1 pl-6">
                        {items.map((g) => <li key={g}><Link href={g} className={link}>{GUIDE_TITLES[g] ?? g}</Link></li>)}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
            {author.sameAs?.length ? (
              <p>Elsewhere: {author.sameAs.map((s, i) => <span key={s}>{i ? ", " : ""}<a href={s} className={link} rel="noopener noreferrer" target="_blank">{new URL(s).hostname}</a></span>)}</p>
            ) : null}
          </div>
        </Container>
      </Section>
    </>
  );
}
