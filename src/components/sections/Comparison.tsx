import { Check, Minus } from "lucide-react";

import { Container } from "../shared/Container";
import { Section } from "../shared/Section";

const columns = ["Traditional Cable", "TryIPTV", "Other IPTV Providers"] as const;

const rows = [
  ["Limited portability", "Works across supported devices", "Device support varies"],
  ["Fixed channel packages", "Plans from 1 to 12 months, paid once", "Package structures vary"],
  ["Often higher monthly costs", "Plans start at $15.82", "Pricing varies by provider"],
  ["Household-focused setup", "2 simultaneous connections included", "Connection limits vary"],
  ["May require provider hardware", "M3U + Xtream Codes available", "Setup methods vary"],
  ["Recurring billing is common", "No auto-renewal", "Renewal terms vary"],
  ["—", "Activation typically within 5–15 minutes", "Activation times vary"],
  ["—", "Support available when you need help", "Support options vary"],
] as const;

function ComparisonCell({ value, emphasized }: { value: string; emphasized?: boolean }) {
  const isEmpty = value === "—";

  return (
    <div className={emphasized ? "border-primary/20 bg-primary/[0.045]" : "border-white/[0.06] bg-[#07080a]/70"}>
      <div className="flex items-start gap-2.5 px-4 py-3 sm:px-5 sm:py-4">
        {isEmpty ? (
          <Minus className="mt-0.5 size-4 shrink-0 text-muted-foreground/45" aria-hidden="true" />
        ) : emphasized ? (
          <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
        ) : (
          <Minus className="mt-0.5 size-4 shrink-0 text-muted-foreground/60" aria-hidden="true" />
        )}
        <span className={emphasized ? "text-sm leading-relaxed text-foreground/95" : "text-sm leading-relaxed text-muted-foreground/90"}>
          {value}
        </span>
      </div>
    </div>
  );
}

export function Comparison() {
  return (
    <Section id="comparison" className="border-y border-white/[0.06] bg-[#07080a] py-12 sm:py-15 lg:py-17">
      <Container>
        <div className="mx-auto mb-6 max-w-3xl text-center sm:mb-8">
          <p className="mb-2 text-xs font-mono font-bold uppercase tracking-[0.08em] text-primary">
            Stream More. Pay Less.
          </p>
          <h2 className="font-headline text-[28px] font-bold leading-[1.14] tracking-tight text-foreground sm:text-[34px] lg:text-[36px]">
            Why Choose TryIPTV Over Cable and Other IPTV Providers?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[15.5px] leading-relaxed text-muted-foreground">
            Compare TryIPTV with traditional cable and other IPTV providers based on pricing, device support, connections, setup, and renewal terms.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#050706]/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
          <div className="hidden grid-cols-3 border-b border-white/[0.08] md:grid">
            {columns.map((column, index) => (
              <div
                key={column}
                className={index === 1 ? "border-x border-primary/20 bg-primary/[0.06] px-5 py-4 text-center" : "px-5 py-4 text-center"}
              >
                <span className={index === 1 ? "font-headline text-base font-bold text-primary" : "font-headline text-base font-bold text-foreground/85"}>
                  {column}
                </span>
              </div>
            ))}
          </div>

          <div className="divide-y divide-white/[0.07]">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="grid md:grid-cols-3">
                {row.map((value, columnIndex) => (
                  <div
                    key={`${rowIndex}-${columnIndex}`}
                    className={columnIndex === 1 ? "border-primary/20 md:border-x" : undefined}
                  >
                    <div className="flex items-center gap-2 border-b border-white/[0.05] px-4 pt-3 md:hidden">
                      <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.08em] text-muted-foreground/60">
                        {columns[columnIndex]}
                      </span>
                    </div>
                    <ComparisonCell value={value} emphasized={columnIndex === 1} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-4 max-w-4xl text-center text-sm leading-relaxed text-muted-foreground/85">
          TryIPTV works with supported TVs, streaming devices, computers, and IPTV players.
        </p>
      </Container>
    </Section>
  );
}
