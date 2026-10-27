import Link from "next/link";
import { getAuthorForPath, getReviewerForPath } from "@/lib/site-data/authors";
import { Confirm } from "@/components/shared/Confirm";
import { getLastModified } from "@/lib/site-routes";

const link = "font-semibold text-foreground underline decoration-primary/40 underline-offset-4 hover:decoration-primary";

/**
 * Byline for guides. Credits a confirmed author (linked to their profile) or, until one is confirmed,
 * the TryIPTV team (an honest organisation byline linked to /about). Inherits the hero's text alignment.
 * Shows the "Updated" date from site-routes.ts (the same date as the Article schema, sitemap and feeds);
 * device pages show it in their own badge instead.
 */
export function GuideByline({ path }: { path: string }) {
  const author = getAuthorForPath(path);
  const reviewer = getReviewerForPath(path);
  const updated = path.startsWith("/devices/") ? undefined : getLastModified(path);
  return (
    <p className="mt-4 text-sm leading-6 text-muted-foreground">
      {author ? (
        <>By <Link href={`/authors/${author.slug}`} className={link}>{author.name}</Link>, {author.role}</>
      ) : (
        <>By the <Link href="/about" className={link}>TryIPTV team</Link></>
      )}
      {reviewer && (
        <> · Reviewed by <Link href={`/authors/${reviewer.slug}`} className={link}>{reviewer.name}</Link>, {reviewer.role}</>
      )}
      {updated && (
        <>
          {" "}· Updated:{" "}
          <time dateTime={updated} className="font-semibold text-foreground">
            {new Date(updated).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}
          </time>
        </>
      )}
      {!author && !reviewer && (
        <>
          {" "}
          <Confirm value={null} question={`Which real person writes or reviews ${path}? Add them to src/lib/site-data/authors.ts.`} />
        </>
      )}
    </p>
  );
}
