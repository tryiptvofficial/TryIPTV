import { cn } from '@/lib/utils';
import type React from 'react';

interface SectionHeaderProps {
  title: string;
  /** Text, or nodes when part of it needs markup (e.g. an email kept out of Cloudflare obfuscation). */
  subtitle?: React.ReactNode;
  className?: string;
  eyebrow?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  badge?: React.ReactNode;
  /** Polished pages (home, /pricing): sentence-case muted label and a 600-weight heading. Other pages keep the default. */
  quiet?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  className,
  eyebrow,
  align = 'center',
  as: Heading = 'h2',
  badge,
  quiet = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 sm:mb-12 lg:mb-14 max-w-3xl",
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {badge && <div className="mb-3.5">{badge}</div>}
      {eyebrow && (
        <p className={quiet ? "mb-3 text-sm font-medium text-muted-foreground" : "text-xs font-mono font-bold uppercase tracking-[0.08em] text-primary mb-3"}>
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          quiet ? "font-headline font-semibold text-foreground tracking-tight" : "font-headline font-bold text-foreground tracking-tight",
          Heading === 'h1'
            ? "text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.08]"
            : "text-[1.75rem] sm:text-[2.125rem] lg:text-[2.25rem] xl:text-[2.375rem] leading-[1.14]"
        )}
      >
        {title}
      </Heading>
      {subtitle && (
        <p
          className={cn(
            quiet
              ? "mt-4 max-w-[60ch] text-base sm:text-lg leading-relaxed text-muted-foreground"
              : "mt-4 max-w-[60ch] text-base sm:text-[1.03125rem] leading-relaxed text-muted-foreground",
            align === 'center' && 'mx-auto'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
