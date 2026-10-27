import type { Metadata } from "next";
import { TopicClusterLinks } from "@/components/shared/TopicClusterLinks";
import { GuideByline } from "@/components/shared/GuideByline";
import Link from "next/link";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Container } from "@/components/shared/Container";
import { PageSchema } from "@/components/shared/Schema";
import { Section } from "@/components/shared/Section";
import { GuideScreenshot } from "@/components/guide";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { SITE_URL, generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { getLastModified } from "@/lib/site-routes";

const title = "How to Install IPTV on TiviMate";
const description =
  "Step-by-step guide to install and set up IPTV on TiviMate for Android TV and Fire TV Stick using Xtream Codes or an M3U playlist, plus EPG setup and fixes.";
const canonical = "/players/tivimate";
// Shorter search-result title; `title` stays the article headline.
const seoTitle = "TiviMate Setup Guide: M3U, Xtream Codes & EPG on Fire TV";

export function generateMetadata(): Metadata {
  // Title tag and og:title only; the H1 and Article headline keep the longer wording.
  const metaTitle = "TiviMate Setup: M3U, Xtream Codes & EPG on Fire TV";
  return {
    ...generatePageMetadata({ title: metaTitle, description, canonical }),
    title: { absolute: `${metaTitle} | TryIPTV` },
  };
}

const articleSchema = generateArticleSchema({
  headline: title,
  description,
  dateModified: getLastModified("/players/tivimate"),
  url: `${SITE_URL}${canonical}`,
  // Owner's own capture (1280x720); the install-iptv.com screenshots were removed 2026-10-24.
  image: `${SITE_URL}/images/tivimate/playlist-epg-settings.jpg`,
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", item: `${SITE_URL}/` },
  { name: "Players", item: `${SITE_URL}/players` },
  { name: "TiviMate", item: `${SITE_URL}${canonical}` },
]);

const headingClass = "font-headline text-2xl font-bold tracking-tight text-foreground sm:text-3xl";
const textClass = "mt-4 text-base leading-relaxed text-muted-foreground";
const listClass = "mt-4 list-decimal space-y-2 pl-6 text-base leading-relaxed text-muted-foreground";
const linkClass = "text-primary underline decoration-primary/40 underline-offset-4 hover:text-foreground";

export default function TivimatePage() {
  return (
    <>
      <PageSchema nodes={[articleSchema, breadcrumbSchema]} />

      <Section className="border-b border-white/[0.07] py-12 sm:py-16">
        <Container>
          <Breadcrumb items={[{ label: "Players", href: "/players" }, { label: "TiviMate" }]} />
          <div className="mt-8 max-w-3xl">
            <h1 className="font-headline text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              How to Install IPTV on TiviMate
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Step-by-step guide to install and set up IPTV on TiviMate for Android TV and Fire TV Stick, using Xtream Codes or an M3U playlist.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              TiviMate is one of the most advanced and easiest IPTV players to use, with a smooth, modern interface built for big-screen Android devices, and a top choice among Android IPTV apps. It is a player, not a source of channels: you add the playlist or login details from your IPTV provider. Its focus is live TV; movies and series depend on your app version and your provider&apos;s playlist, so check them on your setup.
            </p>
            <GuideByline path="/players/tivimate" />
          </div>
        </Container>
      </Section>

      <Section className="py-12 sm:py-16">
        <Container>
          <article className="max-w-3xl space-y-12">
            <section>
              <h2 className={headingClass}>What Is TiviMate?</h2>
              <p className={textClass}>
                TiviMate is a TV-focused IPTV player by Armobsoft FZE. It organizes playlists you supply; it does not provide streams or endorse a provider. Before setup, get a direct M3U URL, Xtream Codes server URL and account details, or a Stalker Portal address if your provider supports that method. These are separate from any TiviMate Premium account.
              </p>
              <p className={textClass}>
                The official app listing confirms support for M3U, Xtream Codes, and Stalker Portal. If you only have a provider website login, ask the provider which playlist method to use. <Link href="/guides/what-are-xtream-codes" className={linkClass}>Xtream Codes credentials</Link> are one common option.
              </p>
            </section>

            <section>
              <h2 className={headingClass}>TiviMate Key Features</h2>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-muted-foreground">
                <li>Modern user interface built for large screens and remote control</li>
                <li>Multiple playlist support</li>
                <li>Scheduled TV guide (EPG) updates</li>
                <li>Favorite channels</li>
                <li>Catch-up support, where your provider offers it</li>
                <li>Subtitles and audio track switching</li>
                <li>Program recording</li>
              </ul>
              <p className={textClass}>Some of these, such as recording and multiple playlists, need TiviMate Premium (see below).</p>
              {/* TODO(owner): your own screenshot here (tivimate-player-menu-recording-multiview.webp was removed: install-iptv.com). */}
            </section>

            <section>
              <h2 className={headingClass}>TiviMate Download and Pricing</h2>
              <p className={textClass}>
                TiviMate is available for Android TV, Google TV, and Fire TV Stick devices. A free, limited version is in the Google Play Store, and Fire TV users install the official APK (steps below). TiviMate Premium is a paid upgrade, sold yearly or as a one-time lifetime purchase, that unlocks features such as recording and multiple playlists. Prices vary by region and change over time, so check the current price in TiviMate&apos;s own purchase flow before buying. Premium is paid to TiviMate&apos;s developer and is separate from your IPTV subscription.
              </p>
            </section>

            <section>
              <h2 className={headingClass}>How to Install TiviMate on Android TV and Google TV</h2>
              <p className={textClass}>
                TiviMate is designed for Android TV and remote control navigation. On an Android TV or Google TV device with Google Play, install “TiviMate IPTV Player” from the listing by Armobsoft FZE. Launch it with your TV remote and have your provider&apos;s playlist details ready. The app is not optimized for touch-only phones or tablets.
              </p>
              <ol className={listClass}>
                <li>Open Google Play on the TV and search for TiviMate IPTV Player.</li>
                <li>Check that Armobsoft FZE is the developer, then install and open the app.</li>
                <li>Select Add Playlist and choose the format your provider supplied.</li>
              </ol>
              <p className={textClass}>For TV preparation, see the <Link href="/devices/android-tv-iptv" className={linkClass}>Android TV setup guide</Link>.</p>
            </section>

            <section>
              <h2 className={headingClass}>How to Install TiviMate on Firestick / Fire TV</h2>
              <p className={textClass}>
                For a compatible Android-based Fire TV device, TiviMate provides an official APK at <a href="https://tivimate.com/apk" className={linkClass} target="_blank" rel="noopener noreferrer">tivimate.com/apk</a>. Use the Downloader app to open that address, then install the APK. Fire TV menus vary by model and Fire OS version; use the device&apos;s current app-installation permission flow rather than an unofficial APK or a copied short code.
              </p>
              <ol className={listClass}>
                <li>Install Downloader from the Amazon Appstore if it is available on your device.</li>
                <li>Where your Fire TV offers it, open Settings → My Fire TV (or Device &amp; Software) → Developer Options → Install Unknown Apps and allow Downloader. If Developer Options is hidden, check the device&apos;s About screen and current Amazon instructions for your model.</li>
                <li>In Downloader, enter <code className="break-all text-foreground">https://tivimate.com/apk</code>, follow the official download, and approve installation.</li>
                <li>Open TiviMate and add the playlist details from your IPTV provider.</li>
              </ol>
              <p className={textClass}>See the <Link href="/devices/firestick-iptv" className={linkClass}>Firestick setup guide</Link> for device-specific preparation. Some newer Fire OS interfaces use different controls, so follow the settings shown on your device.</p>
            </section>

            <section>
              <h2 className={headingClass}>How to Set Up TiviMate in 3 Steps</h2>
              <ol className={listClass}>
                <li><strong className="text-foreground">Add a playlist.</strong> Launch the app and select <strong className="text-foreground">Add Playlist</strong>. Choose a local M3U file, a remote playlist by URL, or log in with Xtream Codes.</li>
                <li><strong className="text-foreground">Enter your connection details.</strong> Type the Xtream Codes server URL, username and password (or the M3U URL) from your IPTV provider and continue.</li>
                <li><strong className="text-foreground">Name your playlist.</strong> TiviMate fills in the server domain as the playlist name; change it to anything you like, then finish setup.</li>
              </ol>
              {/* TODO(owner): your own screenshot here (tivimate-add-playlist-options.webp was removed: install-iptv.com). */}
              {/* TODO(owner): your own screenshot here (tivimate-playlist-name.webp was removed: install-iptv.com). */}
              <p className={textClass}>
                Once added, you can browse the channel list, open the full program guide, switch audio tracks, turn on subtitles, and manage your channels. The sections below cover each login method in detail.
              </p>
            </section>

            <section>
              <h2 className={headingClass}>How to Set Up TiviMate with Xtream Codes</h2>
              <p className={textClass}>
                To connect TiviMate with Xtream Codes, select Add Playlist and choose Xtream Codes. Enter the server URL, username, and password supplied by your IPTV provider, then save the playlist and wait for channels to load. The server URL identifies the service endpoint; the username and password identify your IPTV account. TiviMate does not issue those credentials.
              </p>
              <ol className={listClass}>
                <li>From the first-run screen, select Add Playlist. For an existing setup, open Settings → Playlists → Add playlist.</li>
                <li>Choose Xtream Codes and enter the complete server URL, including the protocol and port if supplied.</li>
                <li>Enter the provider-issued username and password exactly, checking for spaces and mistyped characters.</li>
                <li>Continue, name the playlist, save it, and allow the channel list to load.</li>
              </ol>
              {/* TODO(owner): your own screenshot here (tivimate-xtream-codes-login.webp was removed: install-iptv.com). */}
              <p className={textClass}>A provider website password may differ from the IPTV password. If the details work in one player but fail here, compare the exact server address and port used in both apps.</p>
            </section>

            <section>
              <h2 className={headingClass}>How to Add an M3U Playlist to TiviMate</h2>
              <p className={textClass}>
                M3U setup uses one direct playlist URL instead of separate Xtream Codes fields. Choose an M3U playlist in TiviMate, paste the full URL provided by your IPTV provider, and save it. Do not paste a provider homepage or shorten the address. Because an M3U URL may contain account information, keep it private.
              </p>
              <ol className={listClass}>
                <li>Select Add Playlist, then choose M3U playlist.</li>
                <li>Enter the complete provider-issued playlist URL.</li>
                <li>Save the playlist and wait for its channels to load before testing playback.</li>
              </ol>
              <p className={textClass}>For help identifying the URL, see <Link href="/guides/what-is-m3u" className={linkClass}>what an M3U playlist is</Link>.</p>
            </section>

            <section>
              <h2 className={headingClass}>TiviMate Stalker Portal Setup</h2>
              <p className={textClass}>
                TiviMate&apos;s official Google Play listing includes Stalker Portal among its supported playlist formats. Choose this method only when your provider specifically gives you a Stalker Portal address and any required device or MAC-related details. A regular Xtream Codes server address is not interchangeable with a Stalker Portal URL.
              </p>
              <ol className={listClass}>
                <li>Select Add Playlist, then Stalker Portal.</li>
                <li>Enter the exact portal URL from your provider.</li>
                <li>Enter or confirm MAC-related details only as directed by your provider and the fields shown in your app version, then save.</li>
              </ol>
            </section>

            <section>
              <h2 className={headingClass}>How to Configure EPG in TiviMate</h2>
              <p className={textClass}>
                EPG is the electronic program guide that displays schedules beside channels. TiviMate supports an EPG grid, but guide entries depend on the provider&apos;s data and channel mapping. A playlist may already carry an associated guide source. If schedules stay blank and your provider supplied a separate EPG or XMLTV URL, add it in TiviMate&apos;s EPG source settings and update the guide.
              </p>
              <p className={textClass}>
                Check the URL, source assignment, update status, and channel IDs before changing playback settings. Channels can work while EPG data fails independently. See the <Link href="/help/epg-not-working" className={linkClass}>EPG troubleshooting guide</Link> for missing or stale schedules.
              </p>
              {/* TODO(owner): your own screenshot here (tivimate-epg-tv-guide-grid.webp was removed: install-iptv.com). */}
            </section>

            <section>
              <h2 className={headingClass}>TiviMate Free vs Premium</h2>
              <p className={textClass}>
                TiviMate can be installed and used as a player without buying a channel subscription from its developer. Premium is an upgrade for app features; it does not include IPTV content. TiviMate officially lists multiple playlists, favorites, catch-up, recording, search, parental controls, personalization, and multiview as app capabilities, but access to individual features may depend on the current app version and entitlement.
              </p>
              <p className={textClass}>
                To activate Premium, use TiviMate&apos;s own purchase or sign-in flow and follow its on-screen instructions. Check the current feature list, device terms, and price in that official flow before purchasing; published prices and entitlements can change. Your IPTV provider login remains separate from the TiviMate account.
              </p>
            </section>

            <section>
              <h2 className={headingClass}>Useful TiviMate Settings</h2>
              <p className={textClass}>
                There is no single best TiviMate setting for every stream. Start with default playback settings, then change one control at a time for a specific problem. Use playlist and EPG update controls when channels or guide data are stale; use favorites and group organization to make navigation easier. TiviMate also lists personalization and parental controls among its app features.
              </p>
              <GuideScreenshot
                src="/images/tivimate/playlist-epg-settings.jpg"
                alt="TiviMate playlist settings screen showing EPG sources and playlist options"
                caption="TiviMate playlist settings with EPG source and playlist controls."
                note="The supplied capture was taken in BlueStacks App Player; menu placement may differ by device and app version."
                width={1280}
                height={720}
              />
              <p className={textClass}>
                If only one channel fails, test another channel before altering playback. If every stream buffers, check the network and provider status first. A player setting cannot restore a provider outage or an expired account. The <Link href="/help/iptv-buffering" className={linkClass}>IPTV buffering guide</Link> helps separate network and source problems.
              </p>
            </section>

            <section>
              <h2 className={headingClass}>How to Add or Organize Channels in TiviMate</h2>
              <p className={textClass}>
                You normally do not install channels individually in TiviMate. Channels arrive through the M3U, Xtream Codes, or Stalker Portal playlist supplied by your IPTV provider. Refresh the playlist when the provider changes its lineup; if a channel is still absent, ask the provider whether it belongs to your account. TiviMate can help you navigate the channels it receives with favorites and playlist organization.
              </p>
              {/* TODO(owner): your own screenshot here (tivimate-channel-list-programme-schedule.webp was removed: install-iptv.com). */}
            </section>

            <section>
              <h2 className={headingClass}>TiviMate Troubleshooting</h2>
              <p className={textClass}>
                First identify whether TiviMate cannot load the playlist, can load it but cannot authenticate or play streams, or can play streams without guide data. Record the error text, playlist type, device model, and a few affected channel names before contacting support. If the same playlist fails in another compatible player, the provider or connection is a stronger suspect than TiviMate.
              </p>
              <div className="mt-6 space-y-7">
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">Playlist Not Loading</h3>
                  <p className={textClass}>Check the complete M3U or portal URL and your internet connection, then refresh the playlist. An expired URL or unavailable provider endpoint can prevent loading. See <Link href="/help/m3u-not-loading" className={linkClass}>M3U playlist loading fixes</Link>.</p>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">Xtream Codes Login Not Working</h3>
                  <p className={textClass}>Re-enter the exact server URL, port, username, and password supplied by the provider. Check whether the account is active; the TiviMate Premium login is a different account. See <Link href="/help/iptv-login-not-working" className={linkClass}>IPTV login troubleshooting</Link>.</p>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">Channels Not Loading</h3>
                  <p className={textClass}>If the playlist appears but channels fail, test several streams and refresh the playlist. One broken channel may be a source issue; widespread failures may involve provider access or the network. See <Link href="/help/iptv-not-working" className={linkClass}>IPTV service checks</Link>.</p>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">EPG Not Updating</h3>
                  <p className={textClass}>Update the guide source and verify its URL and assignment to the playlist. Working video with missing schedules points to guide data or channel mapping. See <Link href="/guides/what-is-epg" className={linkClass}>how IPTV EPG works</Link>.</p>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">Buffering or Playback Problems</h3>
                  <p className={textClass}>Compare multiple channels and test the network connection. Restart the app and device before changing playback options; persistent failure across players should be reported to the provider. A larger buffer cannot fix an unavailable stream.</p>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">TiviMate App Not Opening or Updating</h3>
                  <p className={textClass}>Restart the device, check available storage, and update through Google Play or the official TiviMate site, matching the installation method you used. If an update fails, note the app version and device model before contacting TiviMate support.</p>
                </div>
              </div>
              <div className="mt-8 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 text-base sm:text-sm text-muted-foreground">
                Need IPTV credentials for TiviMate? <Link href="/iptv-free-trial" className={linkClass}>Start with a 24-hour IPTV trial</Link>. TryIPTV is an independent IPTV provider, not the developer of TiviMate.
              </div>
            </section>
          </article>
        </Container>
      </Section>
      <TopicClusterLinks path="/players/tivimate" />
    </>
  );
}
