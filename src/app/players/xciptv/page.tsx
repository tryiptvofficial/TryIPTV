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

const title = "XCIPTV Player Guide: App Availability, Setup & Features";
const description =
  "Learn where XCIPTV Player by OTTRUN is available, how to connect with Xtream Codes or M3U, and how its ExoPlayer and VLC playback engines work.";
const canonical = "/players/xciptv";

export function generateMetadata(): Metadata {
  // Title tag and og:title only; the H1 and Article headline keep the longer wording.
  const metaTitle = "XCIPTV Player Guide: Availability & Setup";
  return {
    ...generatePageMetadata({ title: metaTitle, description, canonical }),
    title: { absolute: `${metaTitle} | TryIPTV` },
  };
}

const articleSchema = generateArticleSchema({
  headline: title,
  description,
  dateModified: getLastModified("/players/xciptv"),
  url: `${SITE_URL}${canonical}`,
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", item: `${SITE_URL}/` },
  { name: "Players", item: `${SITE_URL}/players` },
  { name: "XCIPTV", item: `${SITE_URL}${canonical}` },
]);

const headingClass = "font-headline text-2xl font-bold tracking-tight text-foreground sm:text-3xl";
const textClass = "mt-4 text-base leading-relaxed text-muted-foreground";
const listClass = "mt-4 list-decimal space-y-2 pl-6 text-base leading-relaxed text-muted-foreground";
const linkClass = "text-primary underline decoration-primary/40 underline-offset-4 hover:text-foreground";

export default function XciptvPage() {
  return (
    <>
      <PageSchema nodes={[articleSchema, breadcrumbSchema]} />

      <Section className="border-b border-white/[0.07] py-12 sm:py-16">
        <Container>
          <Breadcrumb items={[{ label: "Players", href: "/players" }, { label: "XCIPTV" }]} />
          <div className="mt-8 max-w-3xl">
            <h1 className="font-headline text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              XCIPTV Player: App Availability, Setup &amp; Features
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              XCIPTV is an IPTV media player and does not include channels or subscriptions. You need an M3U playlist URL or compatible login details from your IPTV provider. Install XCIPTV, enter those details, allow the available channels and EPG data to load, then test playback on several channels.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              To use XCIPTV with a <Link href="/iptv-free-trial" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">TryIPTV subscription</Link>, add your Xtream Codes credentials (server URL, username, and password) or M3U URL when the app prompts for a provider. TryIPTV is the subscription service supplying those credentials; XCIPTV is the player that reads them.
            </p>
            <GuideByline path="/players/xciptv" />
          </div>
        </Container>
      </Section>

      <Section className="py-12 sm:py-16">
        <Container>
          <article className="max-w-3xl space-y-12">
            <section>
              <h2 className={headingClass}>What Is XCIPTV?</h2>
              <p className={textClass}>
                XCIPTV Player by OTTRUN is a media player interface designed to organize and stream IPTV content supplied by users. It provides an interface tailored for television screens and remote-control navigation, as well as touchscreen mobile devices. Like other standalone IPTV players, XCIPTV contains no built-in channels, media playlists, or streaming servers.
              </p>
              <p className={textClass}>
                Users connect XCIPTV to their chosen service using standard credentials—either Xtream Codes API (server URL, username, and password) or an M3U playlist URL. The app then parses the channel list, categories, on-demand libraries, and electronic program guide (EPG) schedules supplied by that provider.
              </p>
            </section>

            <section>
              <h2 className={headingClass}>XCIPTV Platform Availability &amp; App Stores</h2>
              <p className={textClass}>
                App store availability varies across operating systems. When searching for XCIPTV, verify the publisher name to ensure you install the genuine application rather than an unverified copy.
              </p>
              <div tabIndex={0} role="region" aria-label="XCIPTV comparison table" className="mt-5 overflow-x-auto rounded-xl border border-white/[0.08]">
                <table className="w-full min-w-[32rem] text-left text-sm text-muted-foreground">
                  <thead className="bg-white/[0.03] text-foreground">
                    <tr>
                      <th className="p-3 font-semibold">Platform / Store</th>
                      <th className="p-3 font-semibold">Availability Status</th>
                      <th className="p-3 font-semibold">Notes &amp; Publisher Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    <tr>
                      <td className="p-3 font-medium text-foreground">Google Play Store (Android TV, Google TV, Android Phones &amp; Tablets)</td>
                      <td className="p-3 font-semibold text-emerald-400">Available</td>
                      <td className="p-3">Official listing titled &ldquo;XCIPTV PLAYER&rdquo; published by OTTRUN. Supports remote navigation and touchscreens.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-foreground">Apple App Store (iOS, iPadOS, Apple TV)</td>
                      <td className="p-3 font-semibold text-amber-400">Not Available</td>
                      <td className="p-3">No official OTTRUN Apple App Store listing was identified during this review. Be cautious of unrelated third-party apps using similar names.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-foreground">Amazon Fire TV / Firestick</td>
                      <td className="p-3 font-semibold text-amber-400">Documented by Developer</td>
                      <td className="p-3">OTTRUN documents Fire TV support, but no verified public Amazon Appstore listing exists. Avoid third-party APK mirrors or untrusted Downloader codes. See the <Link href="/devices/firestick-iptv" className={linkClass}>Firestick setup guide</Link>.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-foreground">Smart TVs (Samsung Tizen, LG webOS)</td>
                      <td className="p-3 font-semibold text-rose-400">Not Supported</td>
                      <td className="p-3">XCIPTV is an Android application and is not natively available on Samsung Tizen or LG webOS. Requires an external streaming device such as an Android TV box or Fire TV.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className={textClass}>
                <strong className="text-foreground">Brand &amp; publisher note:</strong> OTTRUN documentation also references &ldquo;OTR Player&rdquo; across some materials. On Google Play, the official package remains titled &ldquo;XCIPTV PLAYER&rdquo; with developer &ldquo;OTTRUN&rdquo;. Verify the publisher details prior to installing.
              </p>
            </section>

            <section>
              <h2 className={headingClass}>How to Install XCIPTV on Android and Android TV</h2>
              <p className={textClass}>
                Install “XCIPTV PLAYER” by OTTRUN from Google Play when it is available on your Android phone, tablet, Android TV, or Google TV device. Confirm the publisher before installing. On a TV, use the remote&apos;s directional controls to enter provider details and check long URLs carefully before saving them.
              </p>
              <ol className={listClass}>
                <li>Open Google Play on the Android device and find XCIPTV PLAYER by OTTRUN.</li>
                <li>Install and open the app.</li>
                <li>Choose the provider login or M3U URL method that matches the details you received.</li>
              </ol>
              <p className={textClass}>For device preparation, see the <Link href="/devices/android-tv-iptv" className={linkClass}>Android TV setup guide</Link>.</p>
            </section>

            <section>
              <h2 className={headingClass}>How to Install XCIPTV on Firestick / Fire TV</h2>
              <p className={textClass}>
                OTTRUN documents Fire TV support, but its current public Android page directs users to Google Play and does not provide a stable Fire TV APK address that we can verify. Check the Amazon Appstore for a listing from OTTRUN on your device. If none appears, ask OTTRUN for its current official Fire TV installation source before sideloading; avoid APK mirrors and copied Downloader codes.
              </p>
              <p className={textClass}>
                If OTTRUN supplies an official APK for your model, follow the Fire TV installation prompts and allow installation by the download app where the device requires it. Developer Options and “Install Unknown Apps” menus vary by Fire OS version. The <Link href="/devices/firestick-iptv" className={linkClass}>Firestick setup guide</Link> covers device preparation.
              </p>
            </section>

            <section>
              <h2 className={headingClass}>How to Set Up XCIPTV with Xtream Codes</h2>
              <p className={textClass}>
                To set up XCIPTV with Xtream Codes, enter the server or portal address, username, and password supplied by your IPTV provider. OTTRUN&apos;s documentation confirms these login fields for compatible server connections. A profile label may appear in some versions, but it is only a name for the entry. XCIPTV does not issue the IPTV credentials or control the provider account. XCIPTV works with any Xtream Codes login, including our <Link href="/pricing" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">IPTV plans from {FACT_TEXT.fromPrice}</Link> a month.
              </p>
              <ol className={listClass}>
                <li>Choose the Xtream Codes or compatible API login in your XCIPTV version.</li>
                <li>Enter the complete server address, including its protocol and port if your provider supplied one.</li>
                <li>Enter the provider-issued username and password exactly and submit the login.</li>
                <li>Wait for categories and channels to load before testing streams.</li>
              </ol>
              <p className={textClass}>If login fails, compare the server address, protocol, port, account status, and any spaces copied with the credentials. Do not put a complete M3U URL in the server-address field. See <Link href="/guides/what-are-xtream-codes" className={linkClass}>what Xtream Codes login details mean</Link>.</p>
            </section>

            <section>
              <h2 className={headingClass}>How to Add an M3U Playlist to XCIPTV</h2>
              <p className={textClass}>
                XCIPTV supports M3U URLs in addition to compatible server logins. Use M3U when your IPTV provider gives you one direct playlist link instead of a server address, username, and password. OTTRUN&apos;s documentation directs users to select M3U URL from Settings and enter the URL; the exact screen labels may vary by app version.
              </p>
              <ol className={listClass}>
                <li>Open XCIPTV Settings and select the M3U URL option.</li>
                <li>Paste the complete provider-issued playlist URL; use a profile name if your version asks for one.</li>
                <li>Save the playlist and allow the channel list to load.</li>
              </ol>
              <p className={textClass}>Treat an M3U URL as private account information if it contains credentials. See <Link href="/guides/what-is-m3u" className={linkClass}>what an M3U playlist contains</Link> for help identifying the correct link.</p>
            </section>

            <section>
              <h2 className={headingClass}>Core Features &amp; Multi-Screen Streaming</h2>
              <p className={textClass}>
                XCIPTV provides interface features tailored for remote-control and touch-based IPTV navigation:
              </p>
              <div className="mt-5 space-y-4">
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 text-base sm:text-sm leading-relaxed text-muted-foreground">
                  <h3 className="font-headline text-base font-semibold text-foreground">Multi-Screen Viewing</h3>
                  <p className="mt-2">
                    XCIPTV includes a multi-screen grid feature that lets you display multiple live channels simultaneously on compatible screens. Opening multiple live streams at the same time may use multiple concurrent connections, depending on the IPTV provider&apos;s connection policy. TryIPTV includes 2 simultaneous connections.
                  </p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 text-base sm:text-sm leading-relaxed text-muted-foreground">
                  <h3 className="font-headline text-base font-semibold text-foreground">Dual Built-in Players (ExoPlayer &amp; VLC)</h3>
                  <p className="mt-2">
                    XCIPTV integrates two major Android media frameworks: ExoPlayer and VLC. Users can test playback across both engines if a specific stream format or audio codec encounters decoding issues.
                  </p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 text-base sm:text-sm leading-relaxed text-muted-foreground">
                  <h3 className="font-headline text-base font-semibold text-foreground">EPG Guide &amp; Catch-Up Support</h3>
                  <p className="mt-2">
                    The interface supports XMLTV-formatted program guides and past broadcast catch-up when provided by your subscription. Guide schedules load independently from live stream connections.
                  </p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 text-base sm:text-sm leading-relaxed text-muted-foreground">
                  <h3 className="font-headline text-base font-semibold text-foreground">VOD Management &amp; DVR Recording</h3>
                  <p className="mt-2">
                    Video on demand (movies and series) is organized with category listings, episode details, and artwork when connected via Xtream Codes. Scheduled recording functionality requires sufficient local device storage and appropriate operating system storage permissions.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className={headingClass}>What XCIPTV Loads After You Sign In</h2>
              <p className={textClass}>
                XCIPTV first checks the provider login or playlist URL, then loads the available categories and channel entries. Live streams, movies, series, and EPG schedules are separate data or playback stages supplied by the provider. A successful login does not guarantee working streams, and playable channels do not guarantee valid guide data.
              </p>
              <div className="mt-5 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 text-base sm:text-sm leading-relaxed text-muted-foreground">
                <p><strong className="text-foreground">Login rejected:</strong> check credentials, server address, and account access.</p>
                <p className="mt-2"><strong className="text-foreground">Login accepted, empty library:</strong> check provider playlist data, permissions, or sync.</p>
                <p className="mt-2"><strong className="text-foreground">Channels listed, no playback:</strong> test the stream source, device/network, account limit, and player engine.</p>
                <p className="mt-2"><strong className="text-foreground">Channels play, EPG empty:</strong> check guide availability and channel mapping.</p>
              </div>
            </section>

            <section>
              <h2 className={headingClass}>ExoPlayer vs VLC in XCIPTV</h2>
              <p className={textClass}>
                OTTRUN confirms that XCIPTV includes ExoPlayer and VLC playback engines. If a channel appears in the list but fails to play, test that same channel with the other engine where your XCIPTV version exposes a player choice. A difference between the two is useful evidence of stream-format or device-decoding compatibility; it does not prove the provider is healthy or guarantee a fix.
              </p>
              <p className={textClass}>
                Keep the stream and network unchanged for the comparison, then note whether the failure is video, audio, or both. If both engines fail on the same channel, test another channel and another compatible player before changing more settings. Neither engine is universally better, and switching engines does not repair buffering caused by a weak connection or unavailable stream.
              </p>
            </section>

            <section>
              <h2 className={headingClass}>XCIPTV: Player, Provider, or Network?</h2>
              <p className={textClass}>
                Use the first failing stage to choose a test, not to declare a definite cause. Compare several channels and, when possible, the same provider details in another compatible player. If credentials fail everywhere, contact the provider. If they work elsewhere but fail in XCIPTV, compare the XCIPTV login format, app version, and copied fields.
              </p>
              <div tabIndex={0} role="region" aria-label="XCIPTV troubleshooting table" className="mt-5 overflow-x-auto rounded-xl border border-white/[0.08]">
                <table className="w-full min-w-[32rem] text-left text-sm text-muted-foreground">
                  <thead className="bg-white/[0.03] text-foreground"><tr><th className="p-3 font-semibold">Symptom</th><th className="p-3 font-semibold">Likely area to check</th></tr></thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    <tr><td className="p-3">App will not open</td><td className="p-3">App version or device</td></tr>
                    <tr><td className="p-3">Login rejected</td><td className="p-3">Credentials, server, or account</td></tr>
                    <tr><td className="p-3">Login accepted, no content</td><td className="p-3">Provider playlist or sync</td></tr>
                    <tr><td className="p-3">Channels listed, none play</td><td className="p-3">Streams, network, account limit, or engine</td></tr>
                    <tr><td className="p-3">Only some channels fail</td><td className="p-3">Provider channel sources</td></tr>
                    <tr><td className="p-3">Channels play, EPG missing</td><td className="p-3">EPG source or mapping</td></tr>
                    <tr><td className="p-3">Only one engine fails</td><td className="p-3">Playback compatibility or stream format</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className={headingClass}>XCIPTV Troubleshooting</h2>
              <p className={textClass}>
                Diagnose the first point of failure and record the exact error, device model, app version, playlist type, and affected channels. XCIPTV can display a provider&apos;s content, but it cannot restore a failed provider server or fix expired credentials. Separate playlist, playback, EPG, and network problems before reinstalling the app.
              </p>
              <div className="mt-6 space-y-7">
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">Login Failed</h3>
                  <p className={textClass}>Recheck the server URL, protocol, port if supplied, exact username and password, accidental spaces, and account status. Ask the provider whether its endpoint is available. See <Link href="/help/iptv-login-not-working" className={linkClass}>IPTV login troubleshooting</Link>.</p>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">Login Works but No Channels Appear</h3>
                  <p className={textClass}>Refresh the playlist and check whether your account has channel categories assigned. If another compatible player is also empty, report the provider playlist or sync issue. See <Link href="/help/m3u-not-loading" className={linkClass}>playlist loading checks</Link>.</p>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">Channels Appear but Do Not Play</h3>
                  <p className={textClass}>Test multiple channels, the network, and the account&apos;s permitted connections. A failed stream source, device limitation, or player-engine mismatch may also matter. See <Link href="/help/iptv-not-working" className={linkClass}>IPTV service checks</Link>.</p>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">One Player Engine Works but the Other Does Not</h3>
                  <p className={textClass}>Keep the same channel and connection while comparing ExoPlayer with VLC. If only one fails, record the engine and whether audio or video is affected for support; stream-format or decoder compatibility is a possible cause. Do not treat the working engine as proof that every provider stream is healthy.</p>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">EPG Is Empty or Wrong</h3>
                  <p className={textClass}>EPG data loads separately from channels. Refresh the guide if your version offers that control and ask the provider whether its guide source and channel mapping are current. See <Link href="/help/epg-not-working" className={linkClass}>EPG troubleshooting</Link>.</p>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">Buffering or Stuttering</h3>
                  <p className={textClass}>Compare channels, test Wi-Fi or wired network stability, and check device resources. The provider stream or playback engine may also matter. Switching engines is one diagnostic test, not a cure for all buffering. See <Link href="/help/iptv-buffering" className={linkClass}>IPTV buffering checks</Link>.</p>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">App Crashes or Freezes</h3>
                  <p className={textClass}>Restart the device, check free storage, and update XCIPTV from the verified source you used to install it. If it still crashes, record the app version and device model before contacting OTTRUN. Preserve your provider details before considering a reinstall.</p>
                </div>
              </div>
              <div className="mt-8 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 text-base sm:text-sm text-muted-foreground">
                Need IPTV credentials for XCIPTV? <Link href="/iptv-free-trial" className={linkClass}>Start with a 24-hour IPTV trial</Link>. TryIPTV is an independent provider, not the developer of XCIPTV.
              </div>
            </section>
          </article>
        </Container>
      </Section>
      <TopicClusterLinks path="/players/xciptv" />
    </>
  );
}
