import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";

import { Container } from "./Container";
import { Logo } from "./Logo";
import { BRAND } from "@/lib/site-data/brand";
import { COMPANY } from "@/lib/site-data/company";
import { footerLinks } from "@/lib/site-data/footer";
import { socialLinks } from "@/lib/site-data/socials";

type SocialIconName = "x" | "instagram" | "facebook" | "whatsapp";

const socialFooterLinks: {
  name: string;
  href: string;
  ariaLabel: string;
  icon: SocialIconName;
}[] = [
  {
    name: "X",
    href: socialLinks.x,
    ariaLabel: "Follow TryIPTV on X",
    icon: "x",
  },
  {
    name: "Instagram",
    href: socialLinks.instagram,
    ariaLabel: "Follow TryIPTV on Instagram",
    icon: "instagram",
  },
  {
    name: "Facebook",
    href: socialLinks.facebook,
    ariaLabel: "Follow TryIPTV on Facebook",
    icon: "facebook",
  },
  {
    name: "WhatsApp",
    href: socialLinks.whatsapp,
    ariaLabel: "Contact TryIPTV on WhatsApp",
    icon: "whatsapp",
  },
];

function SocialIcon({ name }: { name: SocialIconName }) {
  const iconClassName = "h-4 w-4";

  if (name === "x") {
    return (
      <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M17.53 3h3.18l-6.95 7.94L21.94 21h-6.4l-5.02-6.56L4.78 21H1.58l7.44-8.5L1.18 3h6.57l4.53 5.99L17.53 3Zm-1.12 16.23h1.76L6.8 4.68H4.91l11.5 14.55Z"
        />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm8.7 1.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
        />
      </svg>
    );
  }

  if (name === "facebook") {
    return (
      <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.48H15.2c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22C18.34 21.24 22 17.08 22 12.06Z"
        />
      </svg>
    );
  }

  return (
    <svg className={iconClassName} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.52 3.48A11.8 11.8 0 0 0 12.08 0C5.52 0 .18 5.34.18 11.9c0 2.1.55 4.15 1.6 5.96L.08 24l6.28-1.65a11.9 11.9 0 0 0 5.72 1.46h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.47-8.43ZM12.09 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.73.98 1-3.64-.23-.37a9.86 9.86 0 0 1-1.51-5.27C2.21 6.46 6.64 2.03 12.1 2.03a9.82 9.82 0 0 1 6.98 2.9 9.82 9.82 0 0 1 2.9 6.98c0 5.45-4.44 9.89-9.89 9.89Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47a8.9 8.9 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.1 4.5.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#040506] pt-14 pb-[calc(6rem+env(safe-area-inset-bottom,0px))] sm:pt-16 sm:pb-8">
      {/* Extra bottom padding on phones so the fixed chat button never covers the last footer row. */}

      <Container>
        {/* Touch phones (<640px): link lists sit two per row (the footer's own sm layout) so the
            44px touch rows don't make the footer taller than the original; mouse layouts unchanged. */}
        <div className="grid gap-8 pointer-coarse:max-sm:grid-cols-2 pointer-coarse:max-sm:gap-x-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 lg:gap-8">
          {/* Brand statement */}
          <div className="pointer-coarse:max-sm:col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-4">
            <Logo />
            <p className="mt-3.5 max-w-sm text-base leading-relaxed text-muted-foreground/90 sm:text-[13.5px]">
              {BRAND.description}
            </p>
            <div className="mt-4 flex flex-col items-start text-sm">
              <span
                dangerouslySetInnerHTML={{
                  __html: `<!--email_off--><a href="mailto:${footerLinks.contact.email}" class="group/email inline-flex min-h-11 items-center gap-2 py-1 font-medium pointer-fine:min-h-0 text-muted-foreground/90 transition-colors hover:text-primary"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5 text-primary shrink-0"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>${footerLinks.contact.email}<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-3.5 transition-transform group-hover/email:translate-x-0.5 group-hover/email:-translate-y-0.5"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg></a><!--/email_off-->`,
                }}
              />
              <a
                href="https://wa.me/212694833293"
                target="_blank"
                rel="noopener noreferrer"
                className="group/wa inline-flex min-h-11 items-center gap-2 py-1 font-medium pointer-fine:min-h-0 text-muted-foreground/90 transition-colors hover:text-primary"
              >
                <MessageCircle className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>WhatsApp Support</span>
                <span className="sr-only"> (opens WhatsApp in a new tab)</span>
                <ArrowUpRight className="size-3.5 transition-transform group-hover/wa:translate-x-0.5 group-hover/wa:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <p className="mb-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-foreground/80">
              Explore
            </p>
            <ul className="space-y-0.5">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 min-w-11 items-center text-[15px] text-muted-foreground sm:text-[13.5px] transition-colors duration-150 hover:text-foreground pointer-fine:min-h-0 pointer-fine:min-w-0 pointer-fine:py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Learn: shares the Explore column so the 12-column grid stays intact. */}
            <p className="mt-6 mb-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-foreground/80">
              Learn
            </p>
            <ul className="space-y-0.5">
              {footerLinks.learnLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 min-w-11 items-center text-[15px] text-muted-foreground sm:text-[13.5px] transition-colors duration-150 hover:text-foreground pointer-fine:min-h-0 pointer-fine:min-w-0 pointer-fine:py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Device Guides */}
          <div className="lg:col-span-2">
            <p className="mb-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-foreground/80">
              Device Guides
            </p>
            <ul className="space-y-0.5">
              {footerLinks.supportedLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 min-w-11 items-center text-[15px] text-muted-foreground sm:text-[13.5px] transition-colors duration-150 hover:text-foreground pointer-fine:min-h-0 pointer-fine:min-w-0 pointer-fine:py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Trust */}
          <div className="lg:col-span-2">
            <p className="mb-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-foreground/80">
              Legal &amp; Trust
            </p>
            <ul className="space-y-0.5">
              {footerLinks.legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 min-w-11 items-center text-[15px] text-muted-foreground sm:text-[13.5px] transition-colors duration-150 hover:text-foreground pointer-fine:min-h-0 pointer-fine:min-w-0 pointer-fine:py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Social */}
          <div className="lg:col-span-2">
            <p className="mb-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-foreground/80">
              Social
            </p>
            <ul className="flex flex-wrap gap-1.5" aria-label="TryIPTV social links">
              {socialFooterLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    aria-label={`${link.ariaLabel} (opens in a new tab)`}
                    title={link.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-11 items-center justify-center rounded-xl border border-white/[0.07] pointer-fine:size-10 pointer-fine:lg:size-9 bg-white/[0.03] text-muted-foreground transition-colors duration-150 hover:border-primary/30 hover:text-primary"
                  >
                    <SocialIcon name={link.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom copyright and legal bar */}
        <div className="mt-10 flex flex-col-reverse gap-4 border-t border-white/[0.06] pt-6 text-xs text-muted-foreground/80 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} TryIPTV (TryIPTV.com). All rights reserved.
            {COMPANY.legalName ? ` TryIPTV is operated by ${COMPANY.legalName}${COMPANY.location ? `, ${COMPANY.location.replace("United States", "USA")}` : ""}.` : ""}
          </p>
        </div>
      </Container>
    </footer>
  );
}
