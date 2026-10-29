import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TopicClusterLinks } from "@/components/shared/TopicClusterLinks";
import { GuideByline } from "@/components/shared/GuideByline";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Container } from "@/components/shared/Container";
import { PageSchema } from "@/components/shared/Schema";
import { Section } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import { ArticleProse, ArticleSummary } from "@/components/guide";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { SITE_URL, generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { getLastModified } from "@/lib/site-routes";

/**
 * IPTV error codes: a lookup index, not a fix guide. Each row gives the verified meaning in one
 * sentence and links to the step of the existing /help page that fixes it.
 * Only codes and messages with an official or standards source are listed
 * (seo-reports/www.tryiptv.com/topical-map-2026-10-27/error-codes-research.md). Player messages that
 * only blogs quote (TiviMate, IPTV Smarters…) are left out on purpose.
 */

const title = "IPTV Error Codes Explained";
const description =
  "What IPTV error codes mean: HTTP 401, 403, 404 and 5xx, Cloudflare 52x, Formuler Code 7, MAG portal messages, Android and VLC errors, with a link to each fix.";
const canonical = "/help/iptv-error-codes";
const modifiedDate = getLastModified(canonical);
const link = "text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary";

export function generateMetadata(): Metadata {
  const metaTitle = "IPTV Error Codes Explained: Meanings and Fixes";
  return {
    ...generatePageMetadata({ title: metaTitle, description, canonical }),
    title: { absolute: `${metaTitle} | TryIPTV` },
  };
}

const FIX = {
  login: { href: "/help/iptv-login-not-working#http-status-codes", label: "Login errors, step 3" },
  account: { href: "/help/iptv-login-not-working#account-status", label: "Account and connection checks" },
  loginTop: { href: "/help/iptv-login-not-working", label: "Login troubleshooting" },
  m3u: { href: "/help/m3u-not-loading#http-error-codes", label: "Playlist errors, step 3" },
  m3uTop: { href: "/help/m3u-not-loading", label: "Playlist not loading" },
  triage: { href: "/help/iptv-not-working#triage", label: "Match your symptom" },
  upstream: { href: "/help/iptv-not-working#local-vs-upstream", label: "Local or provider problem?" },
  buffering: { href: "/help/iptv-buffering", label: "Buffering fixes" },
  mag: { href: "/devices/mag-box-iptv", label: "MAG box setup" },
} as const;

type Row = { code: string; where?: string; meaning: string; fix: (typeof FIX)[keyof typeof FIX] };

const httpRows: Row[] = [
  { code: "400 Bad Request", meaning: "The server would not process the request because it looked malformed.", fix: FIX.m3u },
  { code: "401 Unauthorized", meaning: "The request did not carry valid login details for this server.", fix: FIX.login },
  { code: "403 Forbidden", meaning: "The server understood the request but refused it. Sending the same details again will not help.", fix: FIX.login },
  { code: "404 Not Found", meaning: "The server has nothing at that address: the playlist, guide or stream URL points nowhere.", fix: FIX.m3u },
  { code: "405 Method Not Allowed", meaning: "The server does not accept this kind of request at that address.", fix: FIX.triage },
  { code: "429 Too Many Requests", meaning: "Too many requests were sent in a short time, so the server is limiting them.", fix: FIX.account },
  { code: "451 Unavailable For Legal Reasons", meaning: "The server is refusing access because of a legal demand.", fix: FIX.triage },
  { code: "500 Internal Server Error", meaning: "The server hit an unexpected problem and could not answer.", fix: FIX.upstream },
  { code: "502 Bad Gateway", meaning: "A server in the middle got an invalid answer from the server behind it.", fix: FIX.upstream },
  { code: "503 Service Unavailable", meaning: "The server is temporarily overloaded or down for maintenance.", fix: FIX.upstream },
  { code: "504 Gateway Timeout", meaning: "A server in the middle did not get an answer in time from the server behind it.", fix: FIX.upstream },
  {
    code: "511 Network Authentication Required",
    meaning: "Your network wants you to sign in first, as hotel and airport Wi-Fi do. It is not an IPTV account error.",
    fix: FIX.triage,
  },
];

const cloudflareRows: Row[] = [
  { code: "520", meaning: "The provider's server sent Cloudflare an empty or unexpected response.", fix: FIX.upstream },
  { code: "521", meaning: "The provider's server refused Cloudflare's connection (the server is down).", fix: FIX.upstream },
  { code: "522", meaning: "Cloudflare could not connect to the provider's server in time.", fix: FIX.upstream },
  { code: "523", meaning: "Cloudflare could not reach the provider's server, for example because of a routing or DNS problem.", fix: FIX.upstream },
  { code: "524", meaning: "Cloudflare connected, but the provider's server did not answer before the timeout.", fix: FIX.upstream },
  { code: "525", meaning: "The secure (SSL) handshake between Cloudflare and the provider's server failed.", fix: FIX.upstream },
  { code: "526", meaning: "Cloudflare could not validate the provider's SSL certificate.", fix: FIX.upstream },
];

const deviceRows: Row[] = [
  { code: "Error Code 7", where: "Formuler, MyTVOnline", meaning: "A connection failure between the box and the service.", fix: FIX.loginTop },
  { code: "Error Code 11", where: "Formuler, MyTVOnline", meaning: "The M3U playlist URL is wrong or no longer active.", fix: FIX.m3uTop },
  { code: "“Your STB blocked, call the provider”", where: "MAG portal", meaning: "Sent by the provider's portal. Most often the account has expired or is not activated.", fix: FIX.account },
  { code: "“Page loading error”", where: "MAG portal", meaning: "The box has no internet, or the portal URL is unavailable.", fix: FIX.triage },
  { code: "“STB is not supported”", where: "MAG portal", meaning: "This box model is not on the provider's list of allowed models.", fix: FIX.mag },
  { code: "“The time on the device is not synchronized”", where: "MAG portal", meaning: "The box clock is wrong. Set a time (NTP) server in the box's system settings.", fix: FIX.mag },
  { code: "“Error playing content” / “Connection problem”", where: "MAG", meaning: "An unstable connection on your side, or a problem at the provider.", fix: FIX.buffering },
  { code: "“File not found”", where: "MAG", meaning: "The provider's server cannot find the requested video.", fix: FIX.triage },
];

const androidRows: Row[] = [
  { code: "“Source error”", where: "Android / Fire TV apps", meaning: "Loading the stream failed. The app's details or log usually show the underlying code.", fix: FIX.triage },
  { code: "“Response code: NNN”", where: "Android / Fire TV apps", meaning: "The server answered with HTTP status NNN. Look the number up in the HTTP table above.", fix: FIX.login },
  { code: "1002", where: "Android / Fire TV apps", meaning: "Playback fell behind the part of the live stream that is still available.", fix: FIX.buffering },
  { code: "2001", where: "Android / Fire TV apps", meaning: "The network connection failed: no internet, a wrong address, or an unreachable server.", fix: FIX.triage },
  { code: "2004", where: "Android / Fire TV apps", meaning: "The server returned an unexpected HTTP status.", fix: FIX.login },
  { code: "4004", where: "Android / Fire TV apps", meaning: "The stream's format exceeds what this device can decode, for example 4K or HEVC on an older stick.", fix: FIX.triage },
  { code: "“Your input can't be opened”", where: "VLC", meaning: "VLC could not open or recognise the URL or stream. VLC's log (Tools > Messages) shows the cause.", fix: FIX.m3uTop },
  { code: "PLAYER_ERROR_CONNECTION_FAILED", where: "Samsung Tizen apps", meaning: "Several attempts to connect to the content server failed.", fix: FIX.triage },
  { code: "PLAYER_ERROR_INVALID_URI", where: "Samsung Tizen apps", meaning: "The stream or playlist address is not in a valid format.", fix: FIX.m3uTop },
  { code: "PLAYER_ERROR_NOT_SUPPORTED_FORMAT", where: "Samsung Tizen apps", meaning: "The media format is not supported on this TV.", fix: FIX.triage },
];

const stacked =
  "text-muted-foreground before:block before:text-xs before:font-semibold before:uppercase before:tracking-wider before:text-foreground/60 before:content-[attr(data-label)] sm:before:content-none";

/** Table that stacks into one card per row below 640px, so it reads at 375px without sideways scrolling. */
function CodeTable({ caption, rows, codeLabel = "Code" }: { caption: string; rows: Row[]; codeLabel?: string }) {
  return (
    <table className="my-8 block w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#070908] text-left">
      <caption className="sr-only">{caption}</caption>
      <thead className="hidden sm:block">
        <tr className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)_minmax(0,1fr)] gap-4 border-b border-white/[0.08] bg-white/[0.02] px-4 py-3 font-mono text-xs uppercase tracking-wider text-primary">
          <th scope="col" className="font-normal">{codeLabel}</th>
          <th scope="col" className="font-normal">What it means</th>
          <th scope="col" className="font-normal">Fix it</th>
        </tr>
      </thead>
      <tbody className="block divide-y divide-white/[0.06]">
        {rows.map((r) => (
          <tr
            key={r.code + (r.where ?? "")}
            className="grid grid-cols-1 gap-2 px-4 py-4 text-base leading-6 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)_minmax(0,1fr)] sm:gap-4 sm:text-sm"
          >
            <th scope="row" className="break-words font-semibold text-foreground">
              {r.code}
              {r.where && <span className="mt-0.5 block text-xs font-normal text-muted-foreground">{r.where}</span>}
            </th>
            <td data-label="What it means" className={stacked}>{r.meaning}</td>
            <td data-label="Fix it" className={stacked}>
              <Link href={r.fix.href} className={`font-semibold ${link}`}>
                {r.fix.label}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const articleSchema = generateArticleSchema({
  headline: title,
  description,
  dateModified: modifiedDate,
  url: `${SITE_URL}${canonical}`,
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", item: `${SITE_URL}/` },
  { name: "Help", item: `${SITE_URL}/help` },
  { name: "IPTV Error Codes", item: `${SITE_URL}${canonical}` },
]);

export default function IptvErrorCodesPage() {
  return (
    <>
      <PageSchema nodes={[articleSchema, breadcrumbSchema]} />

      {/* Hero Header */}
      <Section className="border-b border-white/[0.07] pt-10 pb-14 sm:pt-14 sm:pb-20">
        <Container>
          <Breadcrumb items={[{ label: "Help", href: "/help" }, { label: "IPTV Error Codes" }]} align="center" />
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-3">Error Code Lookup</p>
            <h1 className="font-headline text-3xl font-extrabold leading-[1.15] text-foreground sm:text-4xl lg:text-5xl">{title}</h1>
            <p className="mx-auto mt-5 max-w-[60ch] text-base leading-7 text-muted-foreground sm:text-lg">
              Find the code or message your player shows, read what it means, then follow the link to the fix.
            </p>
            <GuideByline path={canonical} />
          </div>
        </Container>
      </Section>

      <Section className="pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pb-16">
        <Container>
          <article className="mx-auto max-w-3xl">
            <ArticleSummary title="The Direct Answer">
              <p>
                An IPTV error code tells you where the problem comes from: the provider&apos;s server, the network in between, or
                the app on your device. Find your code in the tables below. Each row gives its meaning in one sentence and links to
                the step that fixes it. This page lists only codes with an official or standards source.
              </p>
            </ArticleSummary>

            <ArticleProse>
              <h2 id="http-status-codes" className="scroll-mt-4">HTTP status codes from the server</h2>
              <p>
                When a player shows a number like 401 or 503, it is passing on the status the provider&apos;s server sent back. The
                meanings below come from the HTTP standards (
                <a href="https://www.rfc-editor.org/rfc/rfc9110.html#section-15" target="_blank" rel="noopener noreferrer">RFC 9110</a>,{" "}
                <a href="https://www.rfc-editor.org/rfc/rfc6585.html" target="_blank" rel="noopener noreferrer">RFC 6585</a> and{" "}
                <a href="https://www.rfc-editor.org/rfc/rfc7725.html" target="_blank" rel="noopener noreferrer">RFC 7725</a>). They
                say what the server answered, not why a particular provider chose to answer that way.
              </p>
            </ArticleProse>
            <CodeTable caption="HTTP status codes in IPTV players" rows={httpRows} />

            <ArticleProse>
              <h2 id="cloudflare-codes" className="scroll-mt-4">Cloudflare codes (520 to 526)</h2>
              <p>
                These appear when a provider&apos;s server sits behind Cloudflare. All of them are problems between Cloudflare and the
                provider, so there is nothing to fix on your device: wait and retry, or contact support. Meanings from{" "}
                <a href="https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/" target="_blank" rel="noopener noreferrer">
                  Cloudflare&apos;s documentation
                </a>
                .
              </p>
            </ArticleProse>
            <CodeTable caption="Cloudflare 5xx codes" rows={cloudflareRows} />

            <ArticleProse>
              <h2 id="device-codes" className="scroll-mt-4">Formuler and MAG box messages</h2>
              <p>
                Meanings from the{" "}
                <a href="https://support.formuler.tv/kb/article/65-how-to-resolve-error-code-7-403/" target="_blank" rel="noopener noreferrer">Formuler support knowledge base</a>{" "}
                and the{" "}
                <a href="https://wiki.infomir.eu/eng/faq" target="_blank" rel="noopener noreferrer">Infomir (MAG) FAQ</a>.
              </p>
            </ArticleProse>
            <CodeTable caption="Formuler and MAG error codes and messages" rows={deviceRows} codeLabel="Code or message" />

            <ArticleProse>
              <h2 id="app-codes" className="scroll-mt-4">Android, Fire TV, VLC and Samsung TV messages</h2>
              <p>
                Many Android and Fire TV players are built on Google&apos;s Media3 (ExoPlayer) library, which defines the numbered codes
                below (
                <a href="https://developer.android.com/reference/androidx/media3/common/PlaybackException" target="_blank" rel="noopener noreferrer">Android developer reference</a>
                ). Not every app shows these numbers; some show only a short message. The VLC message comes from VLC&apos;s source
                code, and the Samsung codes from{" "}
                <a href="https://developer.samsung.com/smarttv/develop/api-references/samsung-product-api-references/avplay-api.html" target="_blank" rel="noopener noreferrer">
                  Samsung&apos;s AVPlay reference
                </a>
                .
              </p>
            </ArticleProse>
            <CodeTable caption="Android, Fire TV, VLC and Samsung TV error messages" rows={androidRows} codeLabel="Code or message" />

            <ArticleProse>
              <h2 id="456-458" className="scroll-mt-4">Codes with no official meaning: 456 and 458</h2>
              <p>
                Error 456 and 458 come up in IPTV searches. Neither is an HTTP status code (
                <a href="https://www.iana.org/assignments/http-status-codes" target="_blank" rel="noopener noreferrer">IANA registry</a>
                ), and no IPTV player we checked documents what they mean. We do not guess a meaning.
              </p>
              <p>If you see one of them:</p>
              <ol>
                <li>Write down the app name, the app version and the full message on screen.</li>
                <li>
                  Run the checks in{" "}
                  <Link href="/help/iptv-not-working#triage" className={link}>match your symptom to the right fix</Link>.
                </li>
                <li>
                  If it continues, send those details to support:{" "}
                  <Link href="/help/iptv-not-working#contact-support" className={link}>what to include in your message</Link>.
                </li>
              </ol>

              <h2 id="not-listed" className="scroll-mt-4">Code not listed here?</h2>
              <p>
                Some apps, including TiviMate and IPTV Smarters, do not publish what their messages mean, so they are not listed
                here. Start with the{" "}
                <Link href="/help/iptv-not-working" className={link}>IPTV not working checklist</Link>, and tell support the exact
                message when you{" "}
                <Link href="/help/iptv-not-working#contact-support" className={link}>contact us</Link>.
              </p>
            </ArticleProse>

            <div className="mt-12 rounded-xl border border-primary/25 bg-[#0b100d] p-6 sm:p-8">
              <span className="eyebrow mb-2">Still Stuck?</span>
              <h2 className="font-headline text-xl sm:text-2xl font-extrabold text-foreground">Get Help From Support</h2>
              <p className="mt-2 text-base sm:text-sm leading-relaxed text-muted-foreground">
                Send the app name, the device and the exact code or message. Support answers on WhatsApp and by email.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/contact-us">
                    Contact Support <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/help">All Troubleshooting Guides</Link>
                </Button>
              </div>
            </div>
          </article>
        </Container>
      </Section>
      <TopicClusterLinks path={canonical} />
    </>
  );
}
