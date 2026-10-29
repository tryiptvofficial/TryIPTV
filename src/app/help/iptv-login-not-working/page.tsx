import type { Metadata } from "next";
import { TopicClusterLinks } from "@/components/shared/TopicClusterLinks";
import { GuideByline } from "@/components/shared/GuideByline";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileKey,
  Globe,
  HelpCircle,
  KeyRound,
  Lock,
  Network,
  RefreshCw,
  Server,
  ShieldAlert,
  Smartphone,
  Tv,
} from "lucide-react";
import { FaqList } from "@/components/sections/FAQ";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Container } from "@/components/shared/Container";
import { PageSchema } from "@/components/shared/Schema";
import { Section } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import {
  ArticleProse,
  ArticleSummary,
} from "@/components/guide";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema";
import { SITE_URL, generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { getLastModified } from "@/lib/site-routes";

const title = "IPTV Login Not Working? How to Diagnose Authentication Errors";
const description =
  "A systematic troubleshooting guide to diagnose IPTV login failures, understand HTTP 401 and 403 response codes, verify server URLs, and restore access.";
const canonical = "/help/iptv-login-not-working";
// Shorter search-result title; `title` stays the article headline.
const seoTitle = "IPTV Login Not Working? Diagnose Authentication Errors";
const modifiedDate = getLastModified("/help/iptv-login-not-working");

/**
 * IPTV Login Troubleshooting Guide
 * Canonical: https://www.tryiptv.com/help/iptv-login-not-working
 * Source of truth: src/lib/site-routes.ts (indexable: true)
 */
export function generateMetadata(): Metadata {
  // Title tag and og:title only; the H1 and Article headline keep the longer wording.
  const metaTitle = "IPTV Login Not Working? Fix Login Errors";
  return {
    ...generatePageMetadata({
      title: metaTitle,
      description,
      canonical,
    }),
    title: {
      absolute: `${metaTitle} | TryIPTV`,
    },
  };
}

const faqs = [
  {
    question: "What does 'HTTP 401 Unauthorized' mean on an IPTV login screen?",
    answer:
      "Under RFC 9110 HTTP standards, a 401 Unauthorized status indicates that the request lacks valid authentication credentials for the requested resource. In an IPTV setup, this typically means the server rejected the username and password combination. Possible causes include a mistyped character, accidental whitespace copied from a mobile clipboard, or credentials that have been deactivated or expired by the provider.",
  },
  {
    question: "What does 'HTTP 403 Forbidden' mean when connecting to an IPTV server?",
    answer:
      "Under RFC 9110, a 403 Forbidden status indicates that the server understood the request but refuses to authorize access. Unlike a 401 error, the server recognized the client, but access permissions are denied. In IPTV environments, possible causes can include an expired subscription, reaching your plan's maximum allowed simultaneous connections, or an IP address restriction configured on the provider's server.",
  },
  {
    question: "Why does my IPTV login work on my phone but fail on my television?",
    answer:
      "If the same credentials succeed on one device but fail on another, the issue is usually localized to input formatting, app configuration, or active connection limits. On TV remotes, it is easy to mistype similar characters (such as capital 'I', lowercase 'l', and number '1') or inadvertently include a trailing space. Additionally, if your plan permits only one active connection and your phone app remains connected in the background, the server may reject the TV's login attempt.",
  },
  {
    question: "Should I test my IPTV credentials in an online web validator?",
    answer:
      "No. You should never paste private IPTV login details or credential-bearing URLs into third-party online validator websites or public forums. Entering your credentials into unverified web tools exposes your private account details and password to unknown operators. Instead, verify your credentials by testing them inside a trusted local media player or by contacting your service provider directly.",
  },
  {
    question: "Does a successful ping test prove my IPTV streaming server is operational?",
    answer:
      "No. A ping command uses the Internet Control Message Protocol (ICMP) to verify basic network echo reachability to an IP address. It does not test whether the web server daemon, HTTP API endpoints (like /player_api.php), or media streaming services are functioning. Many production streaming servers intentionally block ICMP ping requests for security, yet their HTTP and streaming ports operate normally.",
  },
];

const articleSchema = generateArticleSchema({
  headline: title,
  description,
  dateModified: modifiedDate,
  url: `${SITE_URL}${canonical}`,
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", item: `${SITE_URL}/` },
  { name: "Help", item: `${SITE_URL}/help` },
  { name: "IPTV Login Troubleshooting", item: `${SITE_URL}${canonical}` },
]);


export default function IptvLoginNotWorkingPage() {
  return (
    <>
      <PageSchema nodes={[articleSchema, breadcrumbSchema]} />

      {/* Hero Header */}
      <Section className="border-b border-white/[0.07] pt-10 pb-14 sm:pt-14 sm:pb-20">
        <Container>
          <Breadcrumb
            items={[
              { label: "Help", href: "/help" },
              { label: "IPTV Login Troubleshooting" },
            ]}
            align="center"
          />
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-3">Authentication Diagnostics</p>
            <h1 className="font-headline text-3xl font-extrabold leading-[1.15] text-foreground sm:text-4xl lg:text-5xl">
              IPTV Login Not Working? How to Diagnose Authentication Errors
            </h1>
            <p className="mx-auto mt-5 max-w-[60ch] text-base leading-7 text-muted-foreground sm:text-lg">
              An IPTV login usually fails for one of four reasons: a typing mistake in the server URL,
              username, or password; a server that cannot be reached; an expired or suspended account; or too
              many devices streaming at once. Re-copy your details exactly, then follow the six checks below
              in order.
            </p>
            <GuideByline path="/help/iptv-login-not-working" />
          </div>
        </Container>
      </Section>

      {/* Main Content Article */}
      <Section className="pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pb-16">
        <Container>
          <article className="mx-auto max-w-3xl">
            {/* Quick Answer Callout */}
            <ArticleSummary
              title="Immediate Triage: How to Approach Login Failures"
              className="mb-10 sm:mb-12"
            >
              <p>
                An IPTV login failure means your media player was unable to complete an authentication
                handshake with your provider&apos;s server. In most setups, this involves an{" "}
                <Link href="/guides/what-are-xtream-codes" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  Xtream-compatible API login
                </Link>{" "}
                using a Server URL, Username, and Password. With TryIPTV, these credentials are
                provided after activation — enter them exactly as received into your player app.
              </p>
              <p className="mt-3">
                Instead of making repeated rapid login attempts—which can trigger automated security lockouts
                on some server firewalls—follow a methodical diagnosis: first verify input precision, then
                isolate whether the issue is local to the player, examine HTTP response status codes, and
                finally test server reachability.
              </p>
            </ArticleSummary>

            <ArticleProse>
              <h2>Step 1: Recheck Entered Credentials for Subtle Formatting Errors</h2>
              <p>
                The vast majority of login rejections are caused by minor formatting discrepancies. On
                television interfaces navigated via remote control, typing errors are particularly common:
              </p>
              <ul>
                <li>
                  <strong>Hidden Whitespace:</strong> When copying and pasting credentials from emails or
                  messaging apps on mobile devices, clipboards frequently append a trailing space at the end of
                  a username or password. To an authentication server, <code>&quot;user123 &quot;</code> is a
                  completely different string than <code>&quot;user123&quot;</code>.
                </li>
                <li>
                  <strong>Case Sensitivity:</strong> Most IPTV middleware databases treat usernames and
                  passwords as strictly case-sensitive. Verify that your device&apos;s software keyboard did
                  not automatically capitalize the first letter.
                </li>
                <li>
                  <strong>Similar Characters:</strong> Carefully verify visually ambiguous characters:
                  uppercase <code>I</code>, lowercase <code>l</code>, the numeral <code>1</code>, uppercase{" "}
                  <code>O</code>, and the numeral <code>0</code>.
                </li>
                <li>
                  <strong>URL Structure and Port Numbers:</strong> Verify whether your provider&apos;s Server
                  URL requires an explicit port (e.g., <code>http://tv.example.com:8080</code>). Ensure you have
                  not included a trailing slash (<code>/</code>) after the port if your player app expects only
                  the base hostname.
                </li>
              </ul>

              <h2>Step 2: Isolate the Application from the Credentials</h2>
              <p>
                Before assuming your subscription has expired or the provider is offline, determine whether
                the problem belongs to the specific player app or to the account itself:
              </p>
              <ul>
                <li>
                  <strong>Test in an Alternate Player:</strong> If you are experiencing login errors in an app
                  like IPTV Smarters on your TV, test the exact same credentials in another trusted player (such
                  as TiviMate, Televizo, or a desktop client) on another device.
                </li>
                <li>
                  <strong>Interpreting the Result:</strong>
                  <ul>
                    <li>
                      <em>If the login succeeds in the second app:</em> Your subscription and credentials are
                      valid. The issue is localized to the first app—such as an input typo, corrupted local app
                      cache, or an unsupported protocol option in that player.
                    </li>
                    <li>
                      <em>If the login fails across multiple independent apps:</em> The issue is outside the
                      player application. Investigate network reachability, account status, or server
                      middleware responses.
                    </li>
                  </ul>
                </li>
              </ul>
              <p className="text-base sm:text-sm text-muted-foreground">
                <em>Safety Precaution:</em> Avoid making dozen rapid consecutive login attempts if errors
                persist. Some intermediate web firewalls (such as Cloudflare or fail2ban rules) temporarily block
                IP addresses that generate excessive failed authentications within a short window.
              </p>

              <h2 id="http-status-codes" className="scroll-mt-4">Step 3: Understand HTTP Response Codes (Standards-Based Meanings)</h2>
              <p>
                Seeing a code or message that is not covered here? Look it up in the{" "}
                <Link href="/help/iptv-error-codes" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">IPTV error codes list</Link>.
              </p>
              <p>
                When an IPTV player attempts an API login, the server responds with a standard HTTP status
                code as defined by Internet standards (RFC 9110). Understanding the formal meaning of these
                codes clarifies what the server is communicating:
              </p>
            </ArticleProse>

            {/* HTTP Code Cards */}
            <div className="my-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/[0.08] bg-[#07080a] p-6 shadow-sm transition-all hover:border-white/[0.14]">
                <div className="flex items-center gap-2 text-base font-bold text-foreground">
                  <KeyRound className="h-4 w-4 text-amber-400" />
                  HTTP 401 Unauthorized
                </div>
                <div className="mt-3 space-y-2 text-base sm:text-sm leading-6 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Standard Meaning (RFC 9110):</strong> The request lacks
                    valid authentication credentials for the target resource.
                  </p>
                  <p>
                    <strong className="text-foreground">In an IPTV Context:</strong> The server actively
                    evaluated the submitted username and password and rejected them. Possible causes may include
                    a mistyped password, an accidental trailing space, or deactivated account credentials.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#07080a] p-6 shadow-sm transition-all hover:border-white/[0.14]">
                <div className="flex items-center gap-2 text-base font-bold text-foreground">
                  <Lock className="h-4 w-4 text-rose-400" />
                  HTTP 403 Forbidden
                </div>
                <div className="mt-3 space-y-2 text-base sm:text-sm leading-6 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Standard Meaning (RFC 9110):</strong> The server
                    understood the request, but refuses to authorize access.
                  </p>
                  <p>
                    <strong className="text-foreground">In an IPTV Context:</strong> The credentials may be
                    recognized, but access is blocked. Possible causes may include an expired subscription date,
                    reaching simultaneous connection limits, or an IP geolocation block on the server.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#07080a] p-6 shadow-sm transition-all hover:border-white/[0.14]">
                <div className="flex items-center gap-2 text-base font-bold text-foreground">
                  <Globe className="h-4 w-4 text-sky-400" />
                  HTTP 404 Not Found
                </div>
                <div className="mt-3 space-y-2 text-base sm:text-sm leading-6 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Standard Meaning (RFC 9110):</strong> The origin server
                    did not find a current representation for the target URI.
                  </p>
                  <p>
                    <strong className="text-foreground">In an IPTV Context:</strong> The player reached a web
                    server, but the expected API script (e.g., <code>/player_api.php</code>) does not exist at
                    that path. Possible causes may include a mistyped Server URL, wrong port, or migrated domain.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-[#07080a] p-6 shadow-sm transition-all hover:border-white/[0.14]">
                <div className="flex items-center gap-2 text-base font-bold text-foreground">
                  <Server className="h-4 w-4 text-purple-400" />
                  HTTP 5xx Server Errors (500, 502, 503)
                </div>
                <div className="mt-3 space-y-2 text-base sm:text-sm leading-6 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Standard Meaning (RFC 9110):</strong> The server
                    encountered an unexpected condition or failed to fulfill an apparently valid request.
                  </p>
                  <p>
                    <strong className="text-foreground">In an IPTV Context:</strong> The provider&apos;s
                    backend database, reverse proxy, or streaming middleware is temporarily overloaded or
                    undergoing maintenance. This indicates an upstream issue rather than a client-side error.
                  </p>
                </div>
              </div>
            </div>

            <ArticleProse>
              <h2>Step 4: Distinguish Transport and Reachability Failures</h2>
              <p>
                If your player app displays an error such as &quot;Connection Failed,&quot; &quot;Server Not
                Found,&quot; or &quot;Cannot Connect to Server,&quot; the client never received an HTTP response
                code. These errors indicate a failure at the network transport layer:
              </p>
              <ul>
                <li>
                  <strong>DNS Resolution Failure:</strong> Your device could not translate the server&apos;s
                  domain name into an IP address. This can happen if your local router&apos;s DNS cache is
                  stale or if your provider recently changed server IP addresses.
                </li>
                <li>
                  <strong>Connection Refused:</strong> The server IP was found, but nothing is listening on the
                  specified port (e.g., entering port <code>8080</code> when the server uses port <code>8000</code>).
                </li>
                <li>
                  <strong>TLS / SSL Certificate Errors:</strong> If connecting over <code>https://</code>, an
                  invalid, expired, or self-signed certificate on the server—or an incorrect system clock on your
                  streaming box—can cause the TLS handshake to fail before authentication data is sent.
                </li>
              </ul>
              <p>
                <strong>Important Note on Ping Tests:</strong> Some online guides suggest using a <code>ping</code>{" "}
                command to verify server status. While ping tests basic ICMP reachability to an IP address, it
                does <em>not</em> verify whether the web server daemon or IPTV streaming service is active. Many
                production servers intentionally disable ICMP response packets for security reasons, yet their
                HTTP services function normally. A failed ping test does not prove the streaming server is down.
              </p>

              <h2 id="account-status" className="scroll-mt-4">Step 5: Verify Account Status and Concurrent Connection Limits</h2>
              <p>
                If your entered credentials are confirmed accurate and the server is reachable, consider
                account-level limitations configured in the provider&apos;s middleware:
              </p>
              <ul>
                <li>
                  <strong>Active Subscription Validity:</strong> Confirm that your subscription or free trial
                  period has not lapsed. Most IPTV panels automatically revoke API access the moment an
                  expiration timestamp passes.
                </li>
                <li>
                  <strong>Concurrent Stream Limits:</strong> Most subscriptions permit a specific number of
                  simultaneous connections (e.g., 1, 2, or 3 devices). If family members are currently
                  watching or if an app on another device is running in the background, subsequent connection
                  requests may be refused.
                </li>
                <li>
                  <strong>ISP or Device Locks:</strong> Some providers lock accounts to a single public IP
                  address or require MAC address registration. If you attempt to connect from a secondary
                  location or a different device, the server may refuse authorization. On a MAG box, the
                  box&apos;s MAC address must be registered first; see the{" "}
                  <Link href="/devices/mag-box-iptv">MAG box setup guide</Link>.
                </li>
              </ul>

              <h2>Step 6: Diagnostic Isolation via an Alternate Network Path</h2>
              <p>
                To determine whether your local home router, local Wi-Fi, or home ISP routing path is
                interfering with communication to the provider&apos;s authentication server:
              </p>
              <ul>
                <li>
                  <strong>Mobile Cellular Hotspot Test:</strong> Temporarily enable a 4G or 5G hotspot on your
                  smartphone and connect your streaming device to that mobile network.
                </li>
                <li>
                  <strong>Evaluating the Test:</strong> If the player authenticates immediately over cellular data
                  while failing on your home broadband, the issue is localized to your home network environment—such
                  as router firewall rules, parental control filters, local DNS blocking, or ISP-level transit
                  routing issues.
                </li>
              </ul>
              <p>
                <strong>Diagnostic Restraint:</strong> A performance difference between networks demonstrates
                that the two paths experience different routing, peering, or filtering conditions. It does not
                conclusively prove deliberate ISP blocking.
              </p>

              <h2>Important Security Practices for Credentials</h2>
              <p>
                When troubleshooting IPTV authentication problems, adhere to basic security practices:
              </p>
              <ul>
                <li>
                  <strong>Never Use Public Online Validators:</strong> Third-party websites that claim to
                  &quot;check if your M3U or Xtream link is active&quot; capture your private URL, username, and
                  password in their server access logs.
                </li>
                <li>
                  <strong>Never Post Credentials in Public Forums:</strong> When asking for assistance in
                  community groups or forums, redact your username, password, and full server domain.
                </li>
                <li>
                  <strong>Contact Provider Support Securely:</strong> If all diagnostic steps fail and you have
                  confirmed your network reachability, contact your provider&apos;s official support channel to
                  verify account standing.
                </li>
              </ul>
            </ArticleProse>

            {/* Contextual TryIPTV Note */}
            <div className="mt-12 sm:mt-14 mb-0 rounded-2xl border border-white/[0.08] bg-[#07080a] p-6 sm:p-8">
              <h3 className="text-lg font-bold text-foreground">
                Account Activation & Support
              </h3>
              <p className="mt-2 text-base sm:text-sm leading-6 text-muted-foreground">
                Before seeking new services, systematically verify your login formatting, server ports, and
                network connection. If you are setting up with TryIPTV, credentials are typically delivered
                within 5–15 minutes after order confirmation, and our support team is available to assist
                with account activation questions.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild size="sm" variant="outline">
                  <Link href="/iptv-free-trial">
                    Test With a Free Trial <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
                <Button asChild size="sm" variant="ghost">
                  <Link href="/help/iptv-buffering">Troubleshoot Buffering Issues</Link>
                </Button>
                <Button asChild size="sm" variant="ghost">
                  <Link href="/help">Back to Help Directory</Link>
                </Button>
              </div>
            </div>
          </article>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="border-t border-white/[0.07] bg-black/20 pt-12 pb-16 sm:pt-14 sm:pb-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center sm:text-left">
              <p className="eyebrow mb-2">Frequently Asked Questions</p>
              <h2 className="font-headline text-2xl font-bold text-foreground sm:text-3xl">
                Common Questions About IPTV Login Errors
              </h2>
            </div>
            <FaqList items={faqs} />
          </div>
        </Container>
      </Section>
      <TopicClusterLinks path="/help/iptv-login-not-working" />
    </>
  );
}
