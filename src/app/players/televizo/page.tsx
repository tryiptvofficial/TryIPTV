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

const title = "Televizo IPTV Player Setup Guide: M3U & Xtream Codes";
const description =
  "Set up Televizo on Android with an M3U playlist or Xtream Codes login, add EPG guide data, and troubleshoot playlist, login, and playback problems.";
const canonical = "/players/televizo";

export function generateMetadata(): Metadata {
  // Title tag and og:title only; the H1 and Article headline keep the longer wording.
  const metaTitle = "Televizo IPTV Setup: M3U & Xtream Codes";
  return {
    ...generatePageMetadata({ title: metaTitle, description, canonical }),
    title: { absolute: `${metaTitle} | TryIPTV` },
  };
}

const articleSchema = generateArticleSchema({
  headline: title,
  description,
  dateModified: getLastModified("/players/televizo"),
  url: `${SITE_URL}${canonical}`,
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", item: `${SITE_URL}/` },
  { name: "Players", item: `${SITE_URL}/players` },
  { name: "Televizo", item: `${SITE_URL}${canonical}` },
]);

const headingClass = "font-headline text-2xl font-bold tracking-tight text-foreground sm:text-3xl";
const textClass = "mt-4 text-base leading-relaxed text-muted-foreground";
const listClass = "mt-4 list-decimal space-y-2 pl-6 text-base leading-relaxed text-muted-foreground";
const linkClass = "text-primary underline decoration-primary/40 underline-offset-4 hover:text-foreground";

export default function TelevizoPage() {
  return (
    <>
      <PageSchema nodes={[articleSchema, breadcrumbSchema]} />

      <Section className="border-b border-white/[0.07] py-12 sm:py-16">
        <Container>
          <Breadcrumb items={[{ label: "Players", href: "/players" }, { label: "Televizo" }]} />
          <div className="mt-8 max-w-3xl">
            <h1 className="font-headline text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Televizo IPTV Player Setup Guide: M3U &amp; Xtream Codes
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Televizo is an IPTV media player; it does not include channels. To use it, get an M3U playlist URL or Xtream Codes server URL, username, and password from your IPTV provider. Install Televizo, add the playlist or credentials, save the entry, and allow the channels and any available EPG data to load.
            </p>
            <GuideByline path="/players/televizo" />
          </div>
        </Container>
      </Section>

      <Section className="py-12 sm:py-16">
        <Container>
          <article className="max-w-3xl space-y-12">
            <section>
              <h2 className={headingClass}>What Is Televizo?</h2>
              <p className={textClass}>
                Televizo plays and organizes IPTV playlists supplied by the user. The app does not sell or supply channels, so have your provider&apos;s complete M3U URL or Xtream Codes details ready before setup. Your provider also controls account access, available channels, and the program data attached to the service.
              </p>
              <p className={textClass}>
                If you are unsure which details you received, compare <Link href="/guides/m3u-vs-xtream-codes" className={linkClass}>M3U and Xtream Codes login formats</Link> before adding a playlist.
              </p>
            </section>

            <section>
              <h2 className={headingClass}>How to Install Televizo</h2>
              <p className={textClass}>
                On a compatible Android phone, tablet, or Android-based TV, search Google Play for “Televizo - IPTV player” by Andrey Menscikov and install it. Check the developer name before installing. Open the app after installation and keep your provider&apos;s playlist or login details nearby; installation alone does not add channels.
              </p>
              <ol className={listClass}>
                <li>Open Google Play on the device and find the official Televizo listing.</li>
                <li>Install and launch Televizo.</li>
                <li>Choose the playlist method that matches the details supplied by your provider.</li>
              </ol>
            </section>

            <section>
              <h2 className={headingClass}>How to Set Up Televizo with Xtream Codes</h2>
              <p className={textClass}>
                To configure Televizo with Xtream Codes, add a playlist using the server URL, username, and password supplied by your IPTV provider. The server URL identifies the provider&apos;s service; the username and password identify your account. Enter all three exactly as supplied, save the playlist, and wait for its categories and channels to load.
              </p>
              <ol className={listClass}>
                <li>Open Televizo&apos;s playlist area and choose to add a playlist.</li>
                <li>Select the Xtream Codes login option.</li>
                <li>Enter a name for the playlist, then paste the complete server URL, username, and password into their matching fields.</li>
                <li>Save the playlist and let Televizo load the provider&apos;s channel list.</li>
              </ol>
              <p className={textClass}>
                The server URL is not your username, and a web account password may differ from the IPTV login password. See <Link href="/guides/what-are-xtream-codes" className={linkClass}>what Xtream Codes credentials mean</Link> if the fields are unfamiliar.
              </p>
            </section>

            <section>
              <h2 className={headingClass}>How to Add an M3U Playlist to Televizo</h2>
              <p className={textClass}>
                An M3U setup uses one complete playlist URL supplied by your IPTV provider instead of three separate Xtream Codes fields. In Televizo, add an M3U playlist, paste the URL without shortening or changing it, save, and wait for channels to appear. The URL may contain account details, so treat it like a password.
              </p>
              <ol className={listClass}>
                <li>Open the playlist area and choose to add a new M3U playlist.</li>
                <li>Give the playlist a recognizable name and paste the full M3U URL.</li>
                <li>Save it and allow the channel list to load before testing playback.</li>
              </ol>
              <p className={textClass}>
                For the format itself, see <Link href="/guides/what-is-m3u" className={linkClass}>what an M3U playlist contains</Link>.
              </p>
            </section>

            <section>
              <h2 className={headingClass}>How to Add EPG in Televizo</h2>
              <p className={textClass}>
                EPG is the electronic program guide that shows schedule information beside channels. Televizo supports EPG, but schedule data depends on what your provider supplies. If the playlist already includes a working guide source, allow it time to load. If the guide stays empty and your provider supplied a separate XMLTV or EPG URL, add that URL in Televizo&apos;s EPG settings.
              </p>
              <p className={textClass}>
                Check that the EPG URL is current and that its channel IDs match your playlist. An empty guide with working channels usually points to the guide source or mapping rather than the video player. Read the <Link href="/help/epg-not-working" className={linkClass}>EPG troubleshooting guide</Link> for further checks.
              </p>
            </section>

            <section>
              <h2 className={headingClass}>Televizo on Android TV and Google TV</h2>
              <p className={textClass}>
                Televizo&apos;s Google Play listing describes support for Android TVs as well as phones and tablets. Install it from Google Play when the listing is available on your TV, then use the remote to move between fields and confirm selections. Entering a long M3U URL with a TV remote can be error prone, so double-check every character before saving.
              </p>
              <p className={textClass}>
                For device preparation, see the <Link href="/devices/android-tv-iptv" className={linkClass}>Android TV IPTV setup guide</Link>.
              </p>
            </section>

            <section>
              <h2 className={headingClass}>Televizo on Fire TV / Firestick</h2>
              <p className={textClass}>
                Fire TV runs an Android-based system, but the Google Play installation route above does not apply to it. If you install Televizo on Fire TV, obtain the Android APK only from the developer&apos;s official site and follow your Fire TV model&apos;s current instructions for installing apps from outside the Amazon Appstore. Availability and permissions can vary by device and Fire OS version.
              </p>
              <p className={textClass}>
                Once Televizo opens, add the same M3U URL or Xtream Codes credentials described above. The <Link href="/devices/firestick-iptv" className={linkClass}>Firestick IPTV setup guide</Link> covers the device setup steps.
              </p>
            </section>

            <section>
              <h2 className={headingClass}>Televizo Troubleshooting</h2>
              <p className={textClass}>
                Start by separating three failures: the playlist cannot be fetched, the provider rejects a login, or a loaded channel fails to play. Recheck the supplied details and try more than one channel before changing player settings. If the same account fails elsewhere, ask the provider to check the account or stream, with the error message and affected channel names ready.
              </p>
              <div className="mt-6 space-y-7">
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">Playlist Not Loading</h3>
                  <p className={textClass}>Check the complete M3U URL for missing characters or expired credentials, then test your connection and refresh the playlist. If the URL fails on another compatible player too, contact the provider. See <Link href="/help/m3u-not-loading" className={linkClass}>M3U playlist loading fixes</Link>.</p>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">Xtream Codes Login Not Working</h3>
                  <p className={textClass}>Check the server URL, including its protocol and port if supplied, and re-enter the exact username and password. Confirm that the account is active with the provider. See <Link href="/help/iptv-login-not-working" className={linkClass}>IPTV login troubleshooting</Link>.</p>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">Channels Not Loading</h3>
                  <p className={textClass}>If categories appear but channels do not play, try several channels and restart the app. A single failed channel may be a source issue; widespread failures may indicate an account, provider, or connection problem. See <Link href="/help/iptv-not-working" className={linkClass}>IPTV service checks</Link>.</p>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">EPG Not Working</h3>
                  <p className={textClass}>Confirm that the provider supplies guide data, refresh it, and check any separate XMLTV URL. If only some schedules are missing, ask the provider whether guide channel IDs match the playlist. See <Link href="/guides/what-is-epg" className={linkClass}>how IPTV EPG works</Link>.</p>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">Buffering or Playback Problems</h3>
                  <p className={textClass}>Test another channel and another app or network activity to narrow down whether the issue is one stream or the connection. Restart Televizo and the device; if the same stream fails across players, report it to the provider. See <Link href="/help/iptv-buffering" className={linkClass}>IPTV buffering checks</Link>.</p>
                </div>
              </div>
              <div className="mt-8 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 text-base sm:text-sm text-muted-foreground">
                Need IPTV credentials? <Link href="/iptv-free-trial" className={linkClass}>Start with a 24-hour IPTV trial</Link>.
              </div>
            </section>
          </article>
        </Container>
      </Section>
      <TopicClusterLinks path="/players/televizo" />
    </>
  );
}
