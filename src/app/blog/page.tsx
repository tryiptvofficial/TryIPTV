import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateMetadata as generatePageMetadata } from "@/lib/site-config";

/**
 * Blog — returns a real 404 until substantive content is published, so crawlers never see an
 * empty 200 page (soft 404). Keep the metadata for when the page goes live.
 * Canonical: https://www.tryiptv.com/blog
 * Source of truth: src/lib/site-routes.ts (indexable: false)
 */
export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: "TryIPTV Blog — IPTV News, Guides & Tips",
    description: "The TryIPTV blog covering IPTV news, setup guides, player reviews, streaming tips, and industry updates.",
    canonical: "/blog",
    noIndex: true,
  });
}

export default function BlogPage() {
  notFound();
}
