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

const title = "OTT Navigator IPTV Setup Guide: M3U, Xtream Codes & Fixes";
const description =
  "Set up OTT Navigator with an M3U playlist or Xtream Codes login, check EPG and connection limits, and diagnose 401, 403, playlist, and playback errors.";
const canonical = "/players/ott-navigator";

export function generateMetadata(): Metadata {
  // Title tag and og:title only; the H1 and Article headline keep the longer wording.
  const metaTitle = "OTT Navigator Setup: M3U, Xtream Codes & Fixes";
  return {
    ...generatePageMetadata({ title: metaTitle, description, canonical }),
    title: { absolute: `${metaTitle} | TryIPTV` },
  };
}

const articleSchema = generateArticleSchema({
  headline: title,
  description,
  dateModified: getLastModified("/players/ott-navigator"),
  url: `${SITE_URL}${canonical}`,
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", item: `${SITE_URL}/` },
  { name: "Players", item: `${SITE_URL}/players` },
  { name: "OTT Navigator", item: `${SITE_URL}${canonical}` },
]);

const headingClass = "font-headline text-2xl font-bold tracking-tight text-foreground sm:text-3xl";
const textClass = "mt-4 text-base leading-relaxed text-muted-foreground";
const listClass = "mt-4 list-decimal space-y-2 pl-6 text-base leading-relaxed text-muted-foreground";
const linkClass = "text-primary underline decoration-primary/40 underline-offset-4 hover:text-foreground";

export default function OttNavigatorPage() {
  return (
    <>
      <PageSchema nodes={[articleSchema, breadcrumbSchema]} />

      <Section className="border-b border-white/[0.07] py-12 sm:py-16">
        <Container>
          <Breadcrumb items={[{ label: "Players", href: "/players" }, { label: "OTT Navigator" }]} />
          <div className="mt-8 max-w-3xl">
            <h1 className="font-headline text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              OTT Navigator IPTV Setup Guide: M3U, Xtream Codes &amp; Fixes
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              OTT Navigator is an IPTV media player; it supplies no channels or subscription. Add your IPTV provider inside the app using an M3U/M3U8 playlist or Xtream Codes details supplied by that provider. OTT Navigator then loads the available channel list, on-demand content, and EPG data, which you should check separately before testing playback.
            </p>
            <GuideByline path="/players/ott-navigator" />
          </div>
        </Container>
      </Section>

      <Section className="py-12 sm:py-16">
        <Container>
          <article className="max-w-3xl space-y-12">
            <section>
              <h2 className={headingClass}>What Is OTT Navigator?</h2>
              <p className={textClass}>
                OTT Navigator plays live and on-demand media from a provider you configure. Its official FAQ says the app contains no service or content of its own. It is an Android app available for Android phones and tablets, Android TV, and Google TV; Fire TV can use its standalone Android build. Samsung Tizen and LG webOS do not run the native OTT Navigator app.
              </p>
            </section>

            <section>
              <h2 className={headingClass}>How to Install OTT Navigator on Android TV / Google TV / Android</h2>
              <p className={textClass}>
                OTT Navigator&apos;s official FAQ links to separate Google Play listings for TV and for phones or tablets. On a compatible Android device, use the appropriate listing from the FAQ and install the app. You can also use the official standalone build if a store listing is unavailable for your device. Keep your provider URL or credentials ready for first launch.
              </p>
              <ol className={listClass}>
                <li>Open the <a href="https://ottnav.github.io/faq.html" target="_blank" rel="noopener noreferrer" className={linkClass}>official OTT Navigator FAQ</a> and choose the Google Play link for TV or phone/tablet.</li>
                <li>Install and open the app on the Android device.</li>
                <li>Go to provider settings and choose the configuration type that matches what your IPTV provider supplied.</li>
              </ol>
              <p className={textClass}>For television setup, see the <Link href="/devices/android-tv-iptv" className={linkClass}>Android TV IPTV guide</Link>.</p>
            </section>

            <section>
              <h2 className={headingClass}>How to Install OTT Navigator on Firestick / Fire TV</h2>
              <p className={textClass}>
                Fire TV is an Android-based device, and OTT Navigator&apos;s official FAQ provides a standalone APK at <a href="https://app.ott-nav.com/dist/std/latest.apk" target="_blank" rel="noopener noreferrer" className={linkClass}>app.ott-nav.com/dist/std/latest.apk</a>. The FAQ currently also lists Downloader code <strong>982469</strong>. Use the official URL or confirm the code on the FAQ before installing, because a short code can change.
              </p>
              <ol className={listClass}>
                <li>Install Downloader from the Amazon Appstore if available on your Fire TV.</li>
                <li>Where your Fire OS version offers it, allow Downloader under Developer Options → Install Unknown Apps. Menu names can differ by model.</li>
                <li>Enter the official standalone APK URL in Downloader, approve installation, and open OTT Navigator.</li>
              </ol>
              <p className={textClass}>See the <Link href="/devices/firestick-iptv" className={linkClass}>Firestick IPTV setup guide</Link> for device preparation.</p>
            </section>

            <section>
              <h2 className={headingClass}>How to Add an IPTV Provider in OTT Navigator</h2>
              <p className={textClass}>
                OTT Navigator needs a provider configuration before it can show channels. Open Settings → Provider, add a provider, and choose the template that matches the information your IPTV service supplied. The app supports playlist links and provider-specific templates, so the right choice depends on whether you received a direct M3U URL, separate Xtream Codes credentials, or another supported portal address.
              </p>
              <ol className={listClass}>
                <li>Open Settings and the Provider area.</li>
                <li>Add a provider and select its configuration type.</li>
                <li>Enter the provider-issued URL or credentials, save, and let OTT Navigator load the playlist.</li>
              </ol>
            </section>

            <section>
              <h2 className={headingClass}>M3U, Xtream Codes or Another Provider Type?</h2>
              <p className={textClass}>
                Choose the provider template from the details you received, not from the app name. OTT Navigator&apos;s FAQ says a URL shaped like <code className="break-all text-foreground">https://example.com/get.php?username=USER&amp;password=PASS&amp;type=m3u_plus</code> may indicate the Xtream Codes template. A direct M3U/M3U8 URL normally fits Playlist; a URL containing <code className="text-foreground">/stalker_portal/c/</code> may require a MAC or Stalker portal template.
              </p>
              <p className={textClass}>
                Those examples are fictional patterns, not credentials. Selecting the wrong template can fail even when the username and password are correct. Ask your provider which method it supports if the format is unclear.
              </p>
            </section>

            <section>
              <h2 className={headingClass}>How to Set Up OTT Navigator with Xtream Codes</h2>
              <p className={textClass}>
                If your IPTV provider supplies a server URL, username, and password, choose OTT Navigator&apos;s Xtream Codes template and enter those three values. The server URL identifies the provider endpoint; the other fields identify your IPTV account. Check the protocol and port exactly as provided, save the configuration, and allow channel groups to load before testing a stream.
              </p>
              <ol className={listClass}>
                <li>In Settings → Provider, add a provider using the Xtream Codes template.</li>
                <li>Enter the complete server address, including <code className="text-foreground">http://</code> or <code className="text-foreground">https://</code> and the port if provided.</li>
                <li>Enter the exact username and password, then save and wait for categories and channels.</li>
              </ol>
              <p className={textClass}>If setup fails, check for copied spaces, an expired account, or an unavailable provider server. See <Link href="/guides/what-are-xtream-codes" className={linkClass}>what Xtream Codes details mean</Link>.</p>
            </section>

            <section>
              <h2 className={headingClass}>How to Add an M3U Playlist to OTT Navigator</h2>
              <p className={textClass}>
                OTT Navigator supports M3U and M3U8 playlist links. Choose the Playlist provider type and enter the direct URL supplied by your IPTV provider. Its FAQ also documents Playlist File, but recommends links where practical: Android file-access restrictions can make local files awkward, particularly on TV devices. A provider-supplied URL is usually the simpler option when available.
              </p>
              <ol className={listClass}>
                <li>In Settings → Provider, add a provider using Playlist.</li>
                <li>Paste the complete M3U or M3U8 URL and save it.</li>
                <li>If you only have a local file, use Playlist File in a supported location or ask the provider for a URL.</li>
              </ol>
              <p className={textClass}>See <Link href="/guides/what-is-m3u" className={linkClass}>what an M3U playlist contains</Link> if you need to identify the correct link.</p>
            </section>

            <section>
              <h2 className={headingClass}>What OTT Navigator Loads After You Add a Provider</h2>
              <p className={textClass}>
                After you save a provider, OTT Navigator requests the provider data, then builds groups and channel entries. On-demand items and EPG schedules load where supplied, while stream playback is a further request to the source. These stages can fail independently: accepting a provider configuration does not guarantee populated channels, playable streams, or a working guide.
              </p>
              <div className="mt-5 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 text-base sm:text-sm leading-relaxed text-muted-foreground">
                <p><strong className="text-foreground">Cannot add provider:</strong> check template, URL, and credentials.</p>
                <p className="mt-2"><strong className="text-foreground">Provider added, no channels:</strong> check playlist response and account permissions.</p>
                <p className="mt-2"><strong className="text-foreground">Channels listed, HTTP playback error:</strong> check provider stream access.</p>
                <p className="mt-2"><strong className="text-foreground">Channels play, EPG empty:</strong> inspect the separate guide source and mapping.</p>
              </div>
            </section>

            <section>
              <h2 className={headingClass}>What 401, 403 and Other Stream Errors Mean</h2>
              <p className={textClass}>
                A 401, 403, or other 4xx/5xx error during playback is an HTTP response from a provider resource, not proof that OTT Navigator itself is broken. The official FAQ lists authorization, an expired subscription, provider restrictions, required request headers, and misconfigured stream sources as possibilities. The same code can have different causes across providers.
              </p>
              <p className={textClass}>
                Note whether the error occurs on every channel or only one, then ask the provider to check the account and affected stream. Do not enter a guessed User-Agent or other header value; the provider should specify any requirement.
              </p>
            </section>

            <section>
              <h2 className={headingClass}>Connection Limits and OTT Navigator</h2>
              <p className={textClass}>
                Your IPTV provider sets the allowed number of simultaneous streams. OTT Navigator&apos;s picture-in-picture, preview, and Studio modes may open additional streams, so a limit mismatch can contribute to provider blocking or a 403 response. The official FAQ says to match the app&apos;s provider connection setting to the limit your provider actually grants.
              </p>
              <p className={textClass}>
                Check the permitted count with your provider, then review Settings → Provider → your provider → Properties → Connections. Disable extra previews or multiview while testing a single channel. A connection-limit error is different from ordinary network buffering.
              </p>
            </section>

            <section>
              <h2 className={headingClass}>How to Configure and Troubleshoot EPG in OTT Navigator</h2>
              <p className={textClass}>
                EPG is schedule data and can fail even when live channels play. OTT Navigator&apos;s FAQ directs users to Settings → EPG → Reload, where the app reports how many sources it processed and each result. If your provider supplies a separate guide URL that is absent from the playlist, add it under Settings → Provider → your provider → Parameters → EPG.
              </p>
              <p className={textClass}>
                If the source processes but some channels still lack schedules, ask whether the guide identifiers or names match those channels. See <Link href="/help/epg-not-working" className={linkClass}>EPG troubleshooting</Link> for further checks.
              </p>
            </section>

            <section>
              <h2 className={headingClass}>How to Organize Channels in OTT Navigator</h2>
              <p className={textClass}>
                Once channels load, OTT Navigator can hide categories you do not use and group channels for easier navigation. Its FAQ also documents favorites and options for managing channels from multiple providers. These controls organize the channels already supplied by your provider; they do not add missing channels to your account.
              </p>
            </section>

            <section>
              <h2 className={headingClass}>OTT Navigator: Player, Provider, or Network?</h2>
              <p className={textClass}>
                Treat the first failing stage as a clue. Compare another channel and, when possible, another compatible player or network activity. If the same provider fails everywhere, ask the provider to check its service or your account. If it works elsewhere, compare OTT Navigator&apos;s template, URL, and device-specific settings.
              </p>
              <div tabIndex={0} role="region" aria-label="OTT Navigator comparison table" className="mt-5 overflow-x-auto rounded-xl border border-white/[0.08]">
                <table className="w-full min-w-[32rem] text-left text-sm text-muted-foreground">
                  <thead className="bg-white/[0.03] text-foreground"><tr><th className="p-3 font-semibold">Symptom</th><th className="p-3 font-semibold">Likely area to check</th></tr></thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    <tr><td className="p-3">App will not open</td><td className="p-3">App or device</td></tr>
                    <tr><td className="p-3">Provider cannot be added</td><td className="p-3">Template, URL, credentials</td></tr>
                    <tr><td className="p-3">Provider added, no channels</td><td className="p-3">Playlist or provider response</td></tr>
                    <tr><td className="p-3">Channels listed, 401/403</td><td className="p-3">Authorization, restrictions, headers, limit</td></tr>
                    <tr><td className="p-3">Only some channels fail</td><td className="p-3">Individual provider sources</td></tr>
                    <tr><td className="p-3">Channels play, EPG empty</td><td className="p-3">EPG source or mapping</td></tr>
                    <tr><td className="p-3">All players fail</td><td className="p-3">Provider, account, or network</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className={headingClass}>OTT Navigator Troubleshooting</h2>
              <p className={textClass}>
                Check the first step that fails and record the provider type, device, error text, and affected channels. A correct playlist can still contain unavailable streams; a working stream can still lack EPG data. OTT Navigator cannot restore a provider outage, so use another channel or compatible player to narrow down where to seek help.
              </p>
              <div className="mt-6 space-y-7">
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">Provider Will Not Add</h3>
                  <p className={textClass}>Check the chosen template, complete URL, protocol, port if supplied, exact credentials, account status, and provider availability. See <Link href="/help/iptv-login-not-working" className={linkClass}>IPTV login troubleshooting</Link>.</p>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">Provider Loads but No Channels Appear</h3>
                  <p className={textClass}>Reload the provider and check whether the playlist response contains categories allowed for your account. An empty result across players points toward provider data or permissions. See <Link href="/help/m3u-not-loading" className={linkClass}>M3U playlist loading checks</Link>.</p>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">Channels Appear but Do Not Play</h3>
                  <p className={textClass}>Try several channels and check the exact error, network, device playback, and provider connection limit. A listed channel is not proof that its source is currently available. See <Link href="/help/iptv-not-working" className={linkClass}>IPTV service checks</Link>.</p>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">401 or 403 Error</h3>
                  <p className={textClass}>Ask the provider to check authorization, subscription status, any required request headers, source configuration, and simultaneous connections. The HTTP response alone cannot identify which one applies.</p>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">EPG Missing</h3>
                  <p className={textClass}>Use Settings → EPG → Reload and inspect the processed-source results. A successful channel stream does not prove the guide URL or mapping is valid.</p>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">Only Some Channels Fail</h3>
                  <p className={textClass}>Compare a working and failing channel from the same provider. Isolated failures more often point to individual stream sources or access rules than to a complete app installation problem.</p>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">Buffering or Playback Stuttering</h3>
                  <p className={textClass}>Compare channels, check Wi-Fi or wired network stability, and consider device playback limits. If the same source stutters elsewhere, ask the provider about stream health. See <Link href="/help/iptv-buffering" className={linkClass}>IPTV buffering checks</Link>.</p>
                </div>
              </div>
              <div className="mt-8 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 text-base sm:text-sm text-muted-foreground">
                Need IPTV credentials for OTT Navigator? <Link href="/iptv-free-trial" className={linkClass}>Start with a 24-hour IPTV trial</Link>. TryIPTV is independent of OTT Navigator.
              </div>
            </section>
          </article>
        </Container>
      </Section>
      <TopicClusterLinks path="/players/ott-navigator" />
    </>
  );
}
