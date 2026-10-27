import type { Metadata } from "next";
import { TopicClusterLinks } from "@/components/shared/TopicClusterLinks";
import { GuideByline } from "@/components/shared/GuideByline";
import Link from "next/link";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Container } from "@/components/shared/Container";
import { PageSchema } from "@/components/shared/Schema";
import { Section } from "@/components/shared/Section";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { SITE_URL, generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { getLastModified } from "@/lib/site-routes";

const title = "Perfect Player IPTV Guide: Legacy Setup, M3U, EPG & Migration";
const description = "Learn how to configure legacy Perfect Player by Niklabs with M3U and EPG, troubleshoot playback issues, and migrate safely to a maintained IPTV player.";
const canonical = "/players/perfect-player";
// Shorter search-result title; `title` stays the article headline.
const seoTitle = "Perfect Player IPTV: Legacy Setup, EPG & Migration";

export function generateMetadata(): Metadata {
  return { ...generatePageMetadata({ title: seoTitle, description, canonical }), title: { absolute: `${seoTitle} | TryIPTV` } };
}

const articleSchema = generateArticleSchema({
  headline: title, description, dateModified: getLastModified("/players/perfect-player"), url: `${SITE_URL}${canonical}`,
});
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", item: `${SITE_URL}/` },
  { name: "Players", item: `${SITE_URL}/players` },
  { name: "Perfect Player", item: `${SITE_URL}${canonical}` },
]);
const h2 = "font-headline text-2xl font-bold tracking-tight text-foreground sm:text-3xl";
const p = "mt-4 text-base leading-7 text-muted-foreground";
const a = "text-primary underline decoration-primary/40 underline-offset-4 hover:text-primary/80";

export default function PerfectPlayerPage() {
  return <>
    <PageSchema nodes={[articleSchema, breadcrumbSchema]} />
    <Section className="border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20"><Container>
      <Breadcrumb items={[{ label: "Players", href: "/players" }, { label: "Perfect Player" }]} />
      <div className="mt-8 max-w-4xl">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400">Legacy player guide</span>
        <h1 className="mt-3 font-headline text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">Perfect Player IPTV Guide: Legacy Setup, M3U, EPG &amp; Migration</h1>
        <p className="mt-4 text-base leading-8 text-muted-foreground sm:text-lg">Perfect Player IPTV by Niklabs Software is a legacy media player with no channels included. Existing installations can still load an M3U playlist and a separate EPG source. The original Niklabs Android app is no longer available on Google Play, so verify the developer before trusting a similarly named app or download.</p>
        <GuideByline path="/players/perfect-player" />
      </div>
    </Container></Section>
    <Section className="py-12 sm:py-16"><Container><article className="mx-auto max-w-4xl space-y-12">
      <section><h2 className={h2}>Is Perfect Player Still Available?</h2>
        <p className={p}>The original Perfect Player IPTV was developed by Niklabs Software. <a href="https://www.appbrain.com/app/perfect-player-iptv/com.niklabs.pp" target="_blank" rel="noopener noreferrer" className={a}>AppBrain&apos;s historical record</a> lists package <code>com.niklabs.pp</code>, last recorded Android version 1.6.0.1, last update in October 2021, and removal from Google Play on December 16, 2021. That record does not establish an active distribution channel today. This guide covers an existing installation, not a fresh APK download.</p>
      </section>
      <section><h2 className={h2}>How to Identify the Original Perfect Player</h2>
        <p className={p}>Check three things together: the developer name <strong className="text-foreground">Niklabs Software</strong>, Android package <code>com.niklabs.pp</code>, and the source of the app. A current listing with “Perfect Player” in its title may belong to another developer. Do not treat a similar name as proof it is the Niklabs app, and do not install a random APK just to follow an old setup guide.</p>
      </section>
      <section><h2 className={h2}>If Perfect Player Is Already Installed</h2>
        <p className={p}>You can keep configuring an existing Niklabs installation with a playlist and guide source you are authorized to use. Record or back up the source details before changing settings. Avoid uninstalling merely to troubleshoot a playlist: obtaining the original app again may be difficult. First determine whether the failure is in the playlist download, playback, or EPG stage.</p>
      </section>
      <section><h2 className={h2}>How to Add an M3U Playlist to Perfect Player</h2>
        <p className={p}>In the original Niklabs Android app, the historical path is <strong className="text-foreground">Settings → General → Playlist</strong>. Enter the complete M3U URL supplied by your provider, give it a recognizable name if prompted, select M3U when a format choice appears, and save. Return to the main interface and allow the channel list to load. Menu wording can differ between legacy versions.</p>
        <ol className="mt-4 list-decimal space-y-2 pl-6 text-base leading-7 text-muted-foreground">
          <li>Confirm that your provider supplied an M3U URL rather than only separate account credentials.</li>
          <li>Open Settings, General, then Playlist; enter the URL exactly and save the entry.</li>
          <li>Return to the channel view. If groups or channels appear, the playlist was likely downloaded and parsed; test a stream next.</li>
        </ol>
        <p className={p}>See <Link href="/guides/what-is-m3u" className={a}>what an M3U playlist contains</Link> if you need to identify the correct link. Do not guess a provider-specific URL from a username and password.</p>
      </section>
      <section><h2 className={h2}>How to Add EPG to Perfect Player</h2>
        <p className={p}>The guide is separate from the channel playlist. The original app supports XMLTV and JTV EPG formats; XMLTV is common for provider guide URLs. In the historical interface, open <strong className="text-foreground">Settings → General → EPG</strong>, enter the supplied guide URL, select its format if prompted, and allow it to load. Working video does not prove the guide source is valid. Missing listings can also mean channel identifiers or names do not match the EPG entries.</p>
        <p className={p}>Read <Link href="/guides/what-is-epg" className={a}>what EPG data does</Link> for the distinction between streams and schedules.</p>
      </section>
      <section><h2 className={h2}>How Channel Groups Work in Perfect Player</h2>
        <p className={p}>Perfect Player reads channel groups from the playlist. A legacy GUI option called <strong className="text-foreground">Show channels groups as folder</strong> can display those categories as folders, which helps with large playlists. It changes navigation, not which channels your provider includes.</p>
      </section>
      <section><h2 className={h2}>Perfect Player Decoder Settings</h2>
        <p className={p}>Decoder selection changes how the device processes video, not the speed of your internet connection. The historical app exposes decoder choices in <strong className="text-foreground">Settings → Playback → Decoder</strong>. If a stream freezes, shows a black screen, or renders incorrectly, comparing hardware and software decoding can help isolate a device playback problem. A different decoder cannot repair a provider outage or insufficient bandwidth.</p>
      </section>
      <section><h2 className={h2}>What Buffer Settings Can and Cannot Do</h2>
        <p className={p}>Where the installed version exposes buffering controls, a larger buffer may absorb short network fluctuations but can delay startup. Persistent stalls can still come from an unstable connection, provider stream, overloaded server, device limits, or playback compatibility. Test several channels and the network before treating the buffer setting as the cause. See <Link href="/help/iptv-buffering" className={a}>IPTV buffering checks</Link>.</p>
      </section>
      <section><h2 className={h2}>How to Diagnose Perfect Player Setup Problems</h2>
        <p className={p}>Follow the loading sequence: playlist configuration → playlist download → channel groups → stream playback → EPG mapping. If the playlist URL is rejected, check the URL, format, provider response, and account. If channels appear, parsing likely succeeded; a failed stream points next to playback, provider, or network checks. If channels play but schedules are empty, check the EPG source and mapping separately.</p>
      </section>
      <section><h2 className={h2}>Perfect Player Troubleshooting</h2>
        <p className={p}>Use the first stage that fails to narrow the investigation. Avoid deleting an existing installation until you have saved its settings and confirmed a trusted way to restore the app.</p>
        <div className="mt-5 space-y-6">
          <div><h3 className="font-headline text-lg font-semibold text-foreground">Playlist Will Not Load</h3><p className={p}>Check the full M3U URL, subscription status, accidental spaces, provider response, and device network access. A URL that fails outside the app may be a source problem. See <Link href="/help/m3u-not-loading" className={a}>M3U loading troubleshooting</Link>.</p></div>
          <div><h3 className="font-headline text-lg font-semibold text-foreground">Channels Appear but Do Not Play</h3><p className={p}>Try several channels. Check provider stream availability, account status, network stability, and device decoder compatibility. A visible channel list does not guarantee a working stream. See <Link href="/help/iptv-not-working" className={a}>IPTV service checks</Link>.</p></div>
          <div><h3 className="font-headline text-lg font-semibold text-foreground">EPG Is Empty</h3><p className={p}>Verify the EPG URL and XMLTV or JTV format, then check whether the provider has guide data and whether channel names or IDs match. See <Link href="/help/epg-not-working" className={a}>EPG troubleshooting</Link>.</p></div>
          <div><h3 className="font-headline text-lg font-semibold text-foreground">Video Freezes or Displays Incorrectly</h3><p className={p}>Compare decoder options on the same channel, if your version offers them. If several channels stall in every mode, test the network and ask the provider about stream health; decoder switching alone will not resolve those causes.</p></div>
          <div><h3 className="font-headline text-lg font-semibold text-foreground">Perfect Player Is No Longer Available</h3><p className={p}>Do not assume a similarly named app is Niklabs Perfect Player or download an unverified APK. If a fresh installation is required, consider moving your authorized playlist to a currently distributed player instead.</p></div>
        </div>
      </section>
      <section><h2 className={h2}>Moving from Perfect Player to a Modern IPTV Player</h2>
        <p className={p}>Changing player apps does not usually require a new IPTV subscription. Save your provider-issued M3U URL or account details first, then check which formats the replacement accepts. An M3U URL may work in another compatible player; Xtream Codes credentials may be accepted directly where that method is supported. Provider restrictions can still apply, and features will differ between apps.</p>
        <p className={p}>Compare setup guides for <Link href="/players/tivimate" className={a}>TiviMate</Link>, <Link href="/players/ott-navigator" className={a}>OTT Navigator</Link>, and <Link href="/players/iptv-smarters" className={a}>IPTV Smarters</Link>. Confirm availability and compatibility for your device before removing the legacy app.</p>
        <div tabIndex={0} role="region" aria-label="Player migration table" className="mt-5 overflow-x-auto rounded-xl border border-white/[0.08]"><table className="w-full min-w-[520px] text-left text-sm"><thead className="bg-white/[0.05] text-foreground"><tr><th className="p-3">Aspect</th><th className="p-3">Original Perfect Player</th><th className="p-3">Currently distributed compatible player</th></tr></thead><tbody className="divide-y divide-white/[0.08] text-muted-foreground">
          <tr><td className="p-3">Status</td><td className="p-3">Legacy Niklabs app</td><td className="p-3">Check current developer releases</td></tr>
          <tr><td className="p-3">Setup</td><td className="p-3">M3U playlist and separate EPG</td><td className="p-3">Choose a player supporting your provider format</td></tr>
          <tr><td className="p-3">Installation</td><td className="p-3">Existing installs may remain usable; original Play listing unavailable</td><td className="p-3">Use a verified official listing or developer source</td></tr>
        </tbody></table></div>
      </section>
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 text-base sm:text-sm text-muted-foreground">Need IPTV credentials for an existing player or a replacement? <Link href="/iptv-free-trial" className={a}>Start with a 24-hour IPTV trial</Link>. TryIPTV is independent of Niklabs.</div>
    </article></Container></Section>
    <TopicClusterLinks path="/players/perfect-player" />
  </>;
}
