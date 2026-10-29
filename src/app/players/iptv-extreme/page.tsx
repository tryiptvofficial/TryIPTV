import type { Metadata } from "next";
import { TopicClusterLinks } from "@/components/shared/TopicClusterLinks";
import { GuideByline } from "@/components/shared/GuideByline";
import Link from "next/link";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Container } from "@/components/shared/Container";
import { PageSchema } from "@/components/shared/Schema";
import { Section } from "@/components/shared/Section";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { SITE_URL, generateMetadata as generatePageMetadata, FACT_TEXT } from "@/lib/site-config";
import { getLastModified } from "@/lib/site-routes";

const title = "IPTV Extreme Setup Guide: M3U, Xtream Codes & MAG/Stalker";
const description = "Learn how to set up IPTV Extreme with M3U, Xtream Codes, or MAG/Stalker, configure EPG guide data, and diagnose playlist, login, and playback problems.";
const canonical = "/players/iptv-extreme";

export function generateMetadata(): Metadata {
  // Title tag and og:title only; the H1 and Article headline keep the longer wording.
  const metaTitle = "IPTV Extreme Setup: M3U, Xtream & MAG/Stalker";
  return { ...generatePageMetadata({ title: metaTitle, description, canonical }), title: { absolute: `${metaTitle} | TryIPTV` } };
}

const articleSchema = generateArticleSchema({
  headline: title, description, dateModified: getLastModified("/players/iptv-extreme"), url: `${SITE_URL}${canonical}`,
});
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", item: `${SITE_URL}/` },
  { name: "Players", item: `${SITE_URL}/players` },
  { name: "IPTV Extreme", item: `${SITE_URL}${canonical}` },
]);
const h2 = "font-headline text-2xl font-bold tracking-tight text-foreground sm:text-3xl";
const p = "mt-4 text-base leading-7 text-muted-foreground";
const a = "text-primary underline decoration-primary/40 underline-offset-4 hover:text-primary/80";
const cases = [
  ["App does not open", "App or device"],
  ["Playlist is rejected", "URL, credentials, or chosen format"],
  ["MAG portal fails", "Portal URL, MAG MAC, or provider authorization"],
  ["Playlist loads but has no channels", "Provider response, playlist contents, or account access"],
  ["Channels appear but none play", "Streams, account limit, network, or player mode"],
  ["Advanced works but Light does not", "Playback compatibility"],
  ["Channels work but EPG is empty", "EPG source, update, or channel mapping"],
  ["Only one channel or group fails", "That stream or category source"],
];

export default function IptvExtremePage() {
  return <>
    <PageSchema nodes={[articleSchema, breadcrumbSchema]} />
    <Section className="border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20"><Container>
      <Breadcrumb items={[{ label: "Players", href: "/players" }, { label: "IPTV Extreme" }]} />
      <div className="mt-8 max-w-4xl">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">IPTV Extreme guide</span>
        <h1 className="mt-3 font-headline text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">IPTV Extreme Setup Guide: M3U, Xtream Codes &amp; MAG/Stalker</h1>
        <p className="mt-4 text-base leading-8 text-muted-foreground sm:text-lg">IPTV Extreme is a playlist player; it does not include channels or a subscription. Add your own compatible M3U playlist or, on supported versions, an Xtream Codes or MAG/Stalker configuration. The app can then load the channels, on-demand items, and EPG data available from that source. Check each stage separately if setup stops working. IPTV Extreme is free to install; what you pay for is the subscription, and our <Link href="/pricing" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">IPTV plans with no auto-renewal</Link> start at {FACT_TEXT.fromPrice}.</p>
        <p className="mt-4 text-base leading-8 text-muted-foreground sm:text-lg">To use IPTV Extreme with a <Link href="/iptv-free-trial" className="text-primary font-semibold underline decoration-primary/40 underline-offset-4 hover:decoration-primary">TryIPTV subscription</Link>, add your TryIPTV M3U playlist URL or Xtream Codes credentials (server URL, username, and password) through the app&apos;s portal. TryIPTV is the subscription service that supplies those credentials; IPTV Extreme is the player that loads them.</p>
        <GuideByline path="/players/iptv-extreme" />
      </div>
    </Container></Section>
    <Section className="py-12 sm:py-16"><Container><article className="mx-auto max-w-4xl space-y-12">
      <section><h2 className={h2}>What Is IPTV Extreme?</h2>
        <p className={p}>IPTV Extreme is Paolo Turatti&apos;s Android playlist and media player. The official <a href="https://play.google.com/store/apps/details?id=com.pecana.iptvextreme" target="_blank" rel="noopener noreferrer" className={a}>Google Play listing for package com.pecana.iptvextreme</a> says a playlist is required and no channels are included. Confirm the developer and package on the listing before installing; similarly named apps are not necessarily the same product.</p>
      </section>
      <section><h2 className={h2}>How to Install IPTV Extreme on Android / Android TV</h2>
        <p className={p}>On an Android phone, tablet, Android TV, or Google TV, open the official Google Play listing for <strong className="text-foreground">IPTV Extreme by Paolo Turatti</strong> and install it if your device offers it. Store availability and compatibility can vary by device. After launch, keep the app&apos;s displayed MAC address available if you plan to use its web portal.</p>
        <p className={p}>See the <Link href="/devices/android-tv-iptv" className={a}>Android TV setup guide</Link> for device basics.</p>
      </section>
      <section><h2 className={h2}>IPTV Extreme on Firestick / Fire TV</h2>
        <p className={p}>Check the Amazon Appstore on your Fire TV first. If the app is unavailable there, the developer&apos;s <a href="https://react.iptvextreme.eu/downloads" target="_blank" rel="noopener noreferrer" className={a}>official APK downloads page</a> is the source to check for an Android package. Fire TV permits installation of compatible Android apps outside the Appstore, but compatibility can vary. Follow your device&apos;s current installation prompts and use the <Link href="/devices/firestick-iptv" className={a}>Firestick setup guide</Link> for device preparation. Avoid unverified Downloader codes and APK mirrors.</p>
      </section>
      <section><h2 className={h2}>M3U, Xtream Codes or MAG/Stalker?</h2>
        <p className={p}>Choose the format that matches what your provider supplied. An M3U source is a playlist link or file. Xtream Codes normally uses a server URL, username, and password. MAG/Stalker uses a portal URL and a MAG MAC address authorized by the provider. IPTV Extreme&apos;s official portal has separate forms for these methods; choosing the wrong one can fail even with an active account. Setting up the MAG box itself? See the <Link href="/devices/mag-box-iptv" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">MAG box setup guide</Link>.</p>
        <div tabIndex={0} role="region" aria-label="Playlist format comparison table" className="mt-5 overflow-x-auto rounded-xl border border-white/[0.08]"><table className="w-full min-w-[580px] text-left text-sm"><thead className="bg-white/[0.05] text-foreground"><tr><th className="p-3">What you received</th><th className="p-3">Setup path</th><th className="p-3">Key check</th></tr></thead><tbody className="divide-y divide-white/[0.08] text-muted-foreground">
          <tr><td className="p-3">Playlist URL or file</td><td className="p-3">M3U</td><td className="p-3">Complete, reachable playlist</td></tr>
          <tr><td className="p-3">Server URL, username, password</td><td className="p-3">Xtream Codes</td><td className="p-3">Exact credentials and active account</td></tr>
          <tr><td className="p-3">Portal URL and authorized MAG MAC</td><td className="p-3">MAG/Stalker</td><td className="p-3">Provider has registered the MAG MAC</td></tr>
        </tbody></table></div>
      </section>
      <section><h2 className={h2}>How to Add an M3U Playlist to IPTV Extreme</h2>
        <p className={p}>The official portal&apos;s <strong className="text-foreground">Add Playlist</strong> form accepts a device MAC address, playlist name, and playlist link. A direct M3U URL is easiest to enter there. If your provider gave you a local file, use the app&apos;s playlist import option when available; the portal asks for a link. Labels inside the app may differ by version.</p>
        <ol className="mt-4 list-decimal space-y-2 pl-6 text-base leading-7 text-muted-foreground">
          <li>Copy the MAC address shown by IPTV Extreme and open the <a href="https://react.iptvextreme.eu/" target="_blank" rel="noopener noreferrer" className={a}>official IPTV Extreme portal</a>.</li>
          <li>Choose <strong className="text-foreground">Add Playlist</strong>, enter that device MAC, give the playlist a recognizable name, and paste the complete M3U link.</li>
          <li>Save the playlist, then return to the app and allow it to load or refresh its playlists. Confirm that channel groups and channels appear before testing playback.</li>
        </ol><p className={p}>For the link format, see <Link href="/guides/what-is-m3u" className={a}>what an M3U playlist contains</Link>.</p>
      </section>
      <section><h2 className={h2}>How to Add Xtream Codes to IPTV Extreme</h2>
        <p className={p}>IPTV Extreme&apos;s official portal offers an <strong className="text-foreground">Add Xtream Codes Playlist</strong> form for app version 107 and later. It asks for the IPTV Extreme device MAC, a playlist name, server URL, username, and password. These credentials are different from the MAC used to identify the device in the portal.</p>
        <ol className="mt-4 list-decimal space-y-2 pl-6 text-base leading-7 text-muted-foreground">
          <li>Open the official portal and choose <strong className="text-foreground">Add Xtream Codes Playlist</strong>.</li>
          <li>Enter the MAC displayed in IPTV Extreme, a playlist name, and the provider&apos;s server URL, username, and password.</li>
          <li>Save, then refresh or reopen the app and check whether channels load. If rejected, verify the provider type, server URL, account status, exact credentials, and accidental spaces.</li>
        </ol><p className={p}>Read <Link href="/guides/what-are-xtream-codes" className={a}>what Xtream Codes credentials mean</Link> if you are unsure which details you received.</p>
      </section>
      <section><h2 className={h2}>How MAG / Stalker Setup Works in IPTV Extreme</h2>
        <p className={p}>IPTV Extreme&apos;s official portal lists a <strong className="text-foreground">MAG / Stalker Playlist</strong> form for app version 109 and later. It has separate fields for the IPTV Extreme device MAC, playlist name, MAG portal URL, and MAG MAC address. The device MAC identifies where the portal sends the configuration; the MAG MAC is the identity the provider may need to authorize. Confirm the portal and authorized MAG MAC with your provider before saving. Not every provider supports this format.</p>
      </section>
      <section><h2 className={h2}>Why IPTV Extreme Shows a MAC Address</h2>
        <p className={p}>The IPTV Extreme portal uses the MAC address displayed by the app to target a device when adding playlists. MAG/Stalker can additionally require a <em>different</em> MAG MAC address for provider authorization. Copy each value into its matching portal field. If your provider gave you a server URL, username, and password, do not assume you also need provider-side MAC activation.</p>
      </section>
      <section><h2 className={h2}>What IPTV Extreme Loads After You Add a Playlist</h2>
        <p className={p}>Saving a configuration is only the first check. The app must then download the playlist or authenticate with the provider, read any channel groups and channels, and load available on-demand and EPG data before you test a stream. A saved playlist with no channels points to a different stage than channels that appear but will not play. Working channels with an empty guide point to EPG data or matching instead.</p>
        <p className="mt-4 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-base sm:text-sm leading-7 text-muted-foreground">Configuration → playlist download or authentication → channel groups → channels → on-demand content where supplied → EPG → playback test</p>
      </section>
      <section><h2 className={h2}>Advanced vs Light Player in IPTV Extreme</h2>
        <p className={p}>Google Play lists two integrated player modes, <strong className="text-foreground">Advanced</strong> and <strong className="text-foreground">Light</strong>. If a channel plays in one mode but not the other, that is useful evidence of playback compatibility. It does not prove a particular codec problem, and switching modes is not a universal cure for buffering. Compare the same channel in both modes before changing provider settings.</p>
      </section>
      <section><h2 className={h2}>EPG Setup and EPG Alias Problems</h2>
        <p className={p}>IPTV Extreme lists Multi EPG support, automatic EPG updates, and EPG alias management. A channel can play while its schedule remains empty because guide data is a separate source. Check that an EPG source is configured and updated, then compare missing channels with guide entries. Aliases can help match a playlist channel to a guide entry when their names or identifiers differ. See the <Link href="/guides/what-is-epg" className={a}>EPG guide</Link> for the basics.</p>
      </section>
      <section><h2 className={h2}>Useful IPTV Extreme Features After Setup</h2>
        <p className={p}>The official listing confirms settings backup and restore, remote control support, live recording with a time limit, and recording timers. A backup can spare you from re-entering settings after changing devices or reinstalling. Recording still depends on a playable stream and suitable device storage; first confirm normal playback before diagnosing a recording failure.</p>
      </section>
      <section><h2 className={h2}>IPTV Extreme Free vs Pro</h2>
        <p className={p}>Paolo Turatti&apos;s <a href="https://play.google.com/store/apps/details?id=com.pecana.iptvextremepro" target="_blank" rel="noopener noreferrer" className={a}>official IPTV Extreme Pro listing</a> is a separate app in the same developer family. The developer describes Pro as ad free. Check the store in your region for current price and availability, and verify the developer before purchasing a similarly named app.</p>
      </section>
      <section><h2 className={h2}>IPTV Extreme: Player, Provider or Network?</h2>
        <p className={p}>Use the stage that failed to choose your next check. These are likely areas, not definite causes: a rejected configuration differs from a loaded channel that will not play, and both differ from a missing schedule.</p>
        <div tabIndex={0} role="region" aria-label="IPTV Extreme troubleshooting table" className="mt-5 overflow-x-auto rounded-xl border border-white/[0.08]"><table className="w-full min-w-[580px] text-left text-sm"><thead className="bg-white/[0.05] text-foreground"><tr><th className="p-3">Symptom</th><th className="p-3">Likely area to check</th></tr></thead><tbody className="divide-y divide-white/[0.08] text-muted-foreground">{cases.map(([symptom, area]) => <tr key={symptom}><td className="p-3">{symptom}</td><td className="p-3">{area}</td></tr>)}</tbody></table></div>
      </section>
      <section><h2 className={h2}>IPTV Extreme Troubleshooting</h2>
        <p className={p}>First note whether the app opens, accepts the playlist, shows channels, plays a channel, and displays EPG. That sequence keeps a login or source problem separate from a playback or guide problem.</p>
        <div className="mt-5 space-y-6">
          <div><h3 className="font-headline text-lg font-semibold text-foreground">Playlist Will Not Add</h3><p className={p}>Confirm M3U, Xtream, or MAG/Stalker was selected to match your provider details. Recheck the complete link or portal/server URL, credentials, account status, and provider availability. For login checks, see <Link href="/help/iptv-login-not-working" className={a}>IPTV login troubleshooting</Link>.</p></div>
          <div><h3 className="font-headline text-lg font-semibold text-foreground">Playlist Loads but No Channels Appear</h3><p className={p}>The source response may be empty, malformed, or limited by account permissions or categories. Refresh once and confirm what the provider actually supplies. See <Link href="/help/m3u-not-loading" className={a}>M3U loading checks</Link> for a playlist URL.</p></div>
          <div><h3 className="font-headline text-lg font-semibold text-foreground">Channels Appear but Do Not Play</h3><p className={p}>Try several channels, check account connection limits and network stability, then compare Advanced and Light playback. If the same channels fail elsewhere, ask the provider about the streams. See <Link href="/help/iptv-not-working" className={a}>IPTV service checks</Link>.</p></div>
          <div><h3 className="font-headline text-lg font-semibold text-foreground">Advanced Works but Light Does Not</h3><p className={p}>That difference narrows the investigation toward playback compatibility for that stream and device. Keep the working mode for the test and report the specific channel and mode behavior if requesting support.</p></div>
          <div><h3 className="font-headline text-lg font-semibold text-foreground">EPG Missing</h3><p className={p}>Check the EPG source, its update state, provider guide availability, and channel mapping or aliases. Working video alone does not establish that EPG data exists. See <Link href="/help/epg-not-working" className={a}>EPG troubleshooting</Link>.</p></div>
          <div><h3 className="font-headline text-lg font-semibold text-foreground">Only Some Channels Fail</h3><p className={p}>Test another channel in the same group and one in a different group. A limited failure points toward individual streams or category data more than complete installation failure.</p></div>
          <div><h3 className="font-headline text-lg font-semibold text-foreground">App Is Slow, Freezes or Crashes</h3><p className={p}>Check for an app update, available device storage and memory, and whether a very large playlist is slowing loading. Restart the app and device. Consider reinstalling only after preserving settings with backup if available. For stuttering video after the app opens, see <Link href="/help/iptv-buffering" className={a}>buffering checks</Link>.</p></div>
        </div>
        <div className="mt-8 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 text-base sm:text-sm text-muted-foreground">Need IPTV credentials for IPTV Extreme? <Link href="/iptv-free-trial" className={a}>Start with a 24-hour IPTV trial</Link>. TryIPTV is independent of IPTV Extreme and Paolo Turatti.</div>
      </section>
    </article></Container></Section>
    <TopicClusterLinks path="/players/iptv-extreme" />
  </>;
}
