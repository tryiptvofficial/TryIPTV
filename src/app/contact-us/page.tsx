import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { ContactForm } from '@/components/shared/ContactForm';
import { FaqList } from '@/components/sections/FAQ';
import { getContactPageData } from '@/lib/data/contact-page';
import { PageSchema } from '@/components/shared/Schema';
import { PRODUCT_TRUTHS, generateMetadata as generatePageMetadata } from '@/lib/site-config';
import { AppWindow, ArrowRight, Check, Clock, KeyRound, LifeBuoy, MessageCircle, ShieldCheck, Wrench, X } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { COMPANY } from '@/lib/site-data/company';
import { Confirm } from '@/components/shared/Confirm';

export function generateMetadata(): Metadata {
    return {
      ...generatePageMetadata({
          title: "Contact Support: WhatsApp, Email & Setup Help",
          description: "Contact TryIPTV support on WhatsApp, by email, or with the form. Check the quick fixes first: app says expired, login missing, wrong details, setup help.",
          canonical: "/contact-us",
      }),
      title: { absolute: "Contact Support: WhatsApp, Email & Setup Help | TryIPTV" },
    };
}

const link = "font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary";
const a = (href: string, text: string) => `<a href="${href}" class="text-primary hover:underline">${text}</a>`;
const email = COMPANY.support.email;
const T = PRODUCT_TRUTHS;

const appSide = [
  { title: "Made by another company", text: "TiviMate, IPTV Smarters, IBO Player and others. We don't own or control them." },
  { title: "Can ask you to pay", text: "Some apps ask for a payment after a free period. That money goes to the app, not to TryIPTV." },
  { title: "Can say “expired”", text: "That message comes from the app, not from your subscription." },
] as const;

const subscriptionSide = [
  { title: "Sold by us", text: "Your channels and your login." },
  { title: "Already paid for", text: "We are not asking you to pay again." },
  { title: "Active for the full time you paid for", text: "No matter what the app shows." },
] as const;

const quickFixes = [
  {
    icon: AppWindow,
    title: "App not working?",
    text: <>Try another supported player first. Most playback issues come from the app, not your subscription. <Link href="/players" className={link}>See player guides</Link>.</>,
  },
  {
    icon: MessageCircle,
    title: "Didn't receive your login?",
    text: <>Login details are sent on WhatsApp, typically within {T.activationTime} after payment is confirmed, {T.activationHours}. Check the chat you ordered in, and that you ordered from the number you are checking.</>,
  },
  {
    icon: Wrench,
    title: "Need setup help?",
    text: <>Read the <Link href="/setup" className={link}>setup guide</Link> before you message us. Most devices can be set up in a few steps.</>,
  },
  {
    icon: KeyRound,
    title: "Wrong login details?",
    text: <>Copy and paste your username, password and server URL exactly as sent. Extra spaces and typing errors are the most common cause of failed logins.</>,
  },
];

const supportFaqs = [
  {
    question: "I placed an order. When will I receive my subscription?",
    answer: `Your login details are sent on WhatsApp, typically within ${T.activationTime} after payment is confirmed, ${T.activationHours}. Check the WhatsApp chat you ordered in. If nothing has arrived after that, reply in the same chat with the number or email you ordered with.`,
  },
  {
    question: "My app is not working. Does that mean my subscription is not working?",
    answer: `Not always. In most cases the issue comes from the player app, not the subscription. Try another supported app, such as TiviMate or IPTV Smarters, before contacting us. ${a("/players", "Compare IPTV players")}.`,
  },
  {
    question: "Why do some or all channels show “No Information” in the EPG?",
    answer: `The EPG (electronic programme guide) is the on-screen TV schedule inside your player app. Some channels do not provide complete guide information. If this is your first time setting up IPTV, allow a few minutes for the guide to download and sync, then refresh it. ${a("/help/epg-not-working", "EPG troubleshooting guide")}.`,
  },
  {
    question: "Do you provide apps with the subscription?",
    answer: `No. TryIPTV provides the IPTV subscription and your login details. You can use any compatible player app supported by your device. ${a("/players", "See supported players")}.`,
  },
  {
    question: "Live TV works, but movies or series do not. What should I do?",
    answer: "Try a different player app first. Some apps have problems with on-demand (VOD) content while live channels keep working normally. If another app has the same problem, message support.",
  },
  {
    question: "I entered my login details and it says invalid. Why?",
    answer: `An invalid login almost always means a small typing error. Check the username, the password and the server (portal) URL, and make sure each is entered exactly as provided, with no extra spaces. Copying and pasting is recommended. ${a("/help/iptv-login-not-working", "Login troubleshooting guide")}.`,
  },
  {
    question: "Can I use my subscription on more than one device?",
    answer: `Yes. Every TryIPTV plan includes ${T.connections} simultaneous connections: you can install your login on several of your own devices, but only ${T.connections} can stream at the same time. Using more may cause connection problems.`,
  },
  {
    question: "Where can I find the installation guide?",
    answer: `The ${a("/setup", "setup guide")} covers supported devices and apps, and each device has its own guide on the ${a("/devices", "devices page")}.`,
  },
  {
    question: "I want faster support. What should I include in my message?",
    answer: "The fastest messages to resolve include the WhatsApp number or email you ordered with, your device name, the app you are using, a short description of the problem, and a screenshot if possible.",
  },
];

const includeList = [
  "The WhatsApp number or email you ordered with",
  "Your device and app name",
  "A clear description of the issue",
  "A screenshot, if available",
];

export default async function ContactPage() {
    const { breadcrumbSchema } = await getContactPageData();

    return (
        <>
            <PageSchema path="/contact-us" name="Contact TryIPTV Support: WhatsApp, Email & Setup Help" type="ContactPage" nodes={[breadcrumbSchema]} />

            {/* Hero */}
            <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
                <Container className="relative text-center">
                    <Breadcrumb items={[{ label: "Contact Us" }]} align="center" />
                    <SectionHeader as="h1" eyebrow="TryIPTV" title="Support Center" />
                    <p className="mx-auto -mt-2 max-w-[60ch] text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                        TryIPTV handles customer support on WhatsApp, by email, and through the form below. Check the quick answers and FAQ
                        first: most questions about setup, logins and delivery are solved in a few minutes. If you still need help, message
                        us and we reply on the same channel you used.
                    </p>
                    <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                        <Button asChild size="lg">
                            <a href={COMPANY.support.whatsappUrl} target="_blank" rel="noopener noreferrer">
                                <SiWhatsapp aria-hidden="true" className="mr-2 h-4 w-4" /> Message us on WhatsApp
                                <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                            </a>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <a href="#contact-support">Email or send a message</a>
                        </Button>
                    </div>
                </Container>
            </Section>

            {/* The app expired. Your subscription didn't. */}
            <Section className="border-b border-white/[0.06] py-10 sm:py-14">
                <Container>
                    <div className="mx-auto max-w-4xl">
                        <SectionHeader
                            eyebrow="Read this first"
                            title="The App Expired. Your Subscription Didn't."
                            subtitle="Your subscription comes from us. The app you watch it on comes from another company."
                        />
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="rounded-lg border border-white/[0.09] bg-card p-6">
                                <h3 className="font-headline text-lg font-extrabold text-foreground">The app you watch on</h3>
                                <ul className="mt-4 space-y-3">
                                    {appSide.map((i) => (
                                        <li key={i.title} className="flex items-start gap-2.5">
                                            <X className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                                            <span className="text-base sm:text-sm leading-6 text-muted-foreground">
                                                <strong className="block text-foreground">{i.title}</strong>
                                                {i.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-lg border border-primary/30 bg-[#0b100d] p-6">
                                <h3 className="font-headline text-lg font-extrabold text-foreground">Your TryIPTV subscription</h3>
                                <ul className="mt-4 space-y-3">
                                    {subscriptionSide.map((i) => (
                                        <li key={i.title} className="flex items-start gap-2.5">
                                            <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />
                                            <span className="text-base sm:text-sm leading-6 text-muted-foreground">
                                                <strong className="block text-foreground">{i.title}</strong>
                                                {i.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <p className="mt-6 rounded-lg border border-white/[0.09] bg-card p-5 text-base sm:text-sm leading-6 text-muted-foreground">
                            <strong className="text-foreground">Your app says &ldquo;expired&rdquo; or asks you to pay?</strong> Your TryIPTV
                            subscription is still active. Install another <Link href="/players" className={link}>supported app</Link> and log
                            in with the same details. Everything you paid for is still there.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* Before you contact us */}
            <Section variant="alt" className="border-b border-white/[0.06] bg-[#070a08] py-10 sm:py-14">
                <Container>
                    <div className="mx-auto max-w-4xl">
                        <SectionHeader
                            eyebrow="Quick fixes"
                            title="Before You Contact Us"
                            subtitle="These quick answers cover the most common IPTV support issues and can save you a message entirely."
                        />
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {quickFixes.map(({ icon: Icon, title, text }) => (
                                <div key={title} className="rounded-lg border border-white/[0.09] bg-card p-5">
                                    <Icon className="h-5 w-5 text-primary" aria-hidden />
                                    <h3 className="mt-3 font-headline text-lg font-extrabold text-foreground">{title}</h3>
                                    <p className="mt-2 text-base sm:text-sm leading-6 text-muted-foreground">{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </Section>

            {/* FAQ */}
            <Section className="border-b border-white/[0.06] py-10 sm:py-14">
                <Container>
                    <SectionHeader
                        eyebrow="Support FAQ"
                        title="Frequently Asked Questions"
                        subtitle="Please read these answers before contacting support."
                    />
                    <FaqList items={supportFaqs} />
                    <p className="mt-6 text-center text-base sm:text-sm text-muted-foreground">
                        More answers in the <Link href="/faq" className={link}>full IPTV FAQ</Link> and the{" "}
                        <Link href="/help" className={link}>Help Center</Link>. Journalists: see the{" "}
                        <Link href="/press" className={link}>press kit</Link>.
                    </p>
                </Container>
            </Section>

            {/* Contact support */}
            <Section id="contact-support" variant="alt" className="scroll-mt-0 bg-[#070a08] py-10 sm:py-14">
                <Container>
                    <SectionHeader
                        eyebrow="Contact support"
                        title="Message Our Support Team"
                        subtitle="If your question is not answered above, contact us on WhatsApp, by email, or with the form. We reply on the same channel you used."
                    />
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-12">
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <p className="eyebrow mb-1">Direct support</p>
                                    <CardTitle as="h3" className="font-headline text-2xl font-extrabold">Customer Support</CardTitle>
                                    <CardDescription className="text-base sm:text-sm">Setup, billing, login and technical help.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <a
                                        href={COMPANY.support.whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-start gap-4 rounded-lg border border-white/[0.08] bg-[#101512] p-4 transition-all duration-200 motion-safe:hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/[0.05]"
                                    >
                                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-primary/20 bg-primary/[0.06] text-primary">
                                            <MessageCircle className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-base sm:text-sm font-extrabold text-foreground group-hover:text-primary">WhatsApp Live Chat</p>
                                            <p className="mt-1 text-xs text-muted-foreground">{COMPANY.support.whatsappDisplay} • The fastest way to reach us.</p>
                                        </div>
                                    </a>

                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: `<!--email_off--><a href="mailto:${email}" class="group flex items-start gap-4 rounded-lg border border-white/[0.08] bg-[#101512] p-4 transition-all duration-200 motion-safe:hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/[0.05]"><div class="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-primary/20 bg-primary/[0.06] text-primary"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></div><div class="flex-1"><p class="text-sm font-extrabold text-foreground group-hover:text-primary">Email Support</p><p class="mt-1 text-xs text-muted-foreground">${email} • Billing and account questions.</p></div></a><!--/email_off-->`,
                                        }}
                                    />
                                </CardContent>
                            </Card>

                            <div className="space-y-4 rounded-lg border border-white/[0.09] bg-card p-6">
                                <p className="flex items-center gap-2 font-semibold text-foreground">
                                    <LifeBuoy className="h-4 w-4 text-primary" aria-hidden /> Include in your message
                                </p>
                                <ul className="space-y-2 text-base sm:text-sm text-muted-foreground">
                                    {includeList.map((i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />
                                            {i}
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-base sm:text-sm leading-6 text-muted-foreground">
                                    Please send each issue once, on one channel. Repeating the same message on several channels slows down
                                    replies for everyone.
                                </p>
                                {/* Hours and response time come from company.ts and show only once confirmed. */}
                                <div className="space-y-3 border-t border-white/[0.08] pt-4">
                                    <div className="flex items-start gap-3 text-xs font-semibold text-muted-foreground">
                                        <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                        <span>
                                            Support for account, setup, and service questions
                                            {COMPANY.support.hours ? <>: {COMPANY.support.hours}</> : null}
                                            <Confirm value={COMPANY.support.hours} question="Support hours with time zone (WhatsApp and email)." />
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-3 text-xs font-semibold text-muted-foreground">
                                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                        <span>
                                            {COMPANY.support.responseTime ?? "We reply to every message from the same channel you used."}
                                            {COMPANY.support.outOfHours ? `. ${COMPANY.support.outOfHours}` : ""}
                                            {COMPANY.support.coverage ? ` ${COMPANY.support.coverage}` : ""}
                                            <Confirm value={COMPANY.support.responseTime} question="Typical response time for WhatsApp and for email (measured, not hoped)." />
                                        </span>
                                    </div>
                                </div>
                                <div className="border-t border-white/[0.08] pt-4">
                                    <Link
                                        href="/iptv-free-trial"
                                        className="tap-target inline-flex items-center gap-2 text-xs font-extrabold text-primary hover:underline"
                                    >
                                        Looking for a trial? Request 24h access <ArrowRight className="h-3 w-3" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Card>
                                <CardHeader>
                                    <p className="eyebrow mb-1">Send a message</p>
                                    <CardTitle as="h3" className="font-headline text-2xl font-extrabold">Send Us a Message</CardTitle>
                                    <CardDescription className="text-base sm:text-sm">
                                        Prefer a form? Describe the issue and we&apos;ll reply by email.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ContactForm />
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <p className="mx-auto mt-8 max-w-[60ch] rounded-lg border border-white/[0.09] bg-card p-5 text-center text-base sm:text-sm leading-6 text-muted-foreground">
                        <strong className="text-foreground">Support reminder:</strong> for common questions about setup, apps, login details and
                        delivery, please read the FAQ above first. It reduces wait times and gets you the answer faster.
                    </p>
                </Container>
            </Section>
        </>
    );
}
