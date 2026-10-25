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
            ? "text-4xl sm:text-5xl lg:text-[52px] leading-[1.08]"
            : "text-[28px] sm:text-[34px] lg:text-[36px] xl:text-[38px] leading-[1.14]"
        )}
      >
        {title}
      </Heading>
      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base sm:text-[16.5px] leading-relaxed text-muted-foreground",
            align === 'center' && 'mx-auto'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
