import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ShieldCheck, Zap, ArrowRight } from "lucide-react";

interface GuideCtaProps {
  primaryKeyword?: string;
  className?: string;
  description?: string;
}

export function GuideCta({
  primaryKeyword = "Fire TV Stick",
  className,
  description,
}: GuideCtaProps) {
  const highlights = [
    "24-Hour Free Trial",
    "No Credit Card Required",
    "2 Simultaneous Connections",
    "5–15 Min Activation",
  ];

  return (
    <div
      className={`my-12 rounded-2xl border border-white/[0.1] bg-[#07080a] p-6 sm:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] text-left ${className || ""}`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <p className="eyebrow mb-2">Test Before Subscribing</p>
          <h2 className="font-headline text-xl sm:text-2xl font-extrabold text-foreground">
            Test TryIPTV on Your {primaryKeyword}
          </h2>
          <p className="mt-2 text-base sm:text-sm leading-relaxed text-muted-foreground">
            {description || `Verify channel loading speed, electronic programme guide (EPG) stability, and remote navigation on your device with our full-access 24-hour trial.`}
          </p>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
            {highlights.map((item, idx) => (
              <span key={idx} className="flex items-center gap-1.5 font-medium text-foreground/90">
                <Check className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
          <Button asChild size="lg" className="w-full sm:w-auto font-semibold">
            <Link href="/iptv-free-trial">
              <span>Start 24-Hour Free Trial</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link href="/pricing">View IPTV Plans</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
