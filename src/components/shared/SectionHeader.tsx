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
}

export function SectionHeader({
  title,
  subtitle,
  className,
  eyebrow,
  align = 'center',
  as: Heading = 'h2',
  badge,
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
        <p className="text-xs font-mono font-bold uppercase tracking-[0.08em] text-primary mb-3">
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          "font-headline font-bold text-foreground tracking-tight",
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
            "mt-4 max-w-[60ch] text-base sm:text-[1.03125rem] leading-relaxed text-muted-foreground",
            align === 'center' && 'mx-auto'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
