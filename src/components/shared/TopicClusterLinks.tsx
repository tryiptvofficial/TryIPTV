import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { findCluster } from "@/lib/site-data/topic-map";

/**
 * "More in this topic" block for cluster pages: links back to the pillar and to 2–4 sibling
 * clusters with descriptive anchors (src/lib/site-data/topic-map.ts).
 */
export function TopicClusterLinks({ path }: { path: string }) {
  const found = findCluster(path);
  if (!found) return null;
  const { pillar, cluster } = found;
  const siblings = cluster.siblings
    .map((p) => pillar.clusters.find((c) => c.path === p))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .slice(0, 4);

  return (
    <Section className="border-t border-white/[0.07] pt-12 pb-14 sm:pt-14 sm:pb-16">
      <Container>
        <aside aria-labelledby="topic-links-heading" className="mx-auto max-w-3xl">
          <p className="eyebrow mb-2">Keep learning</p>
          <h2 id="topic-links-heading" className="font-headline text-2xl font-bold text-foreground sm:text-3xl">
            More in {pillar.anchor}
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {siblings.map((s) => (
              <li key={s.path}>
                <Link
                  href={s.path}
                  className="group block h-full rounded-xl border border-white/[0.08] bg-[#07080a] p-4 transition-colors hover:border-primary/40"
                >
                  <span className="font-semibold text-foreground group-hover:text-primary">{s.anchor}</span>
                  <span className="mt-1 block text-base leading-relaxed text-muted-foreground sm:text-sm">{s.blurb}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <Link
              href={pillar.path}
              className="tap-target inline-flex items-center gap-2 font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
            >
              All {pillar.anchor} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </p>
        </aside>
      </Container>
    </Section>
  );
}
