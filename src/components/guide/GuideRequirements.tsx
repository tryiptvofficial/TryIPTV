import React from "react";
import { Tv, Wifi, Layers, KeyRound } from "lucide-react";

export interface RequirementItem {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
  tag: string;
}

interface GuideRequirementsProps {
  primaryKeyword?: string;
  className?: string;
  items?: RequirementItem[];
}

export function GuideRequirements({
  primaryKeyword = "Fire TV Stick",
  className,
  items,
}: GuideRequirementsProps) {
  const defaultRequirements: RequirementItem[] = [
    {
      title: `${primaryKeyword} Device`,
      desc: "Connected to power, display output, and signed into your account.",
      icon: Tv,
      tag: "Hardware",
    },
    {
      title: "Stable Internet Connection",
      desc: "Ethernet adapter (recommended for 4K) or reliable 5 GHz Wi-Fi signal.",
      icon: Wifi,
      tag: "Network",
    },
    {
      title: "Compatible IPTV Player",
      desc: "Platform-compatible player from the official app store or developer website.",
      icon: Layers,
      tag: "Application",
    },
    {
      title: "TryIPTV Credentials",
      desc: "Xtream Codes (server, user, pass) or M3U playlist URL.",
      icon: KeyRound,
      tag: "Service",
    },
  ];

  const requirements = items && items.length > 0 ? items : defaultRequirements;

  return (
    <div id="what-you-need" className={`scroll-mt-2 my-8 ${className || ""}`}>
      <div className="mb-4">
        <p className="eyebrow mb-1">Prerequisites</p>
        <h2 className="font-headline text-xl sm:text-2xl font-extrabold text-foreground">
          What You&apos;ll Need Before Setup
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {requirements.map((req, idx) => {
          const Icon = req.icon;
          return (
            <div
              key={idx}
              className="rounded-xl border border-white/[0.08] bg-[#07080a] p-4 flex items-start gap-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-white/[0.12] transition-colors"
            >
              <div className="h-9 w-9 rounded-lg bg-primary/[0.08] border border-primary/20 flex items-center justify-center shrink-0 text-primary mt-0.5">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-headline text-base sm:text-[15px] sm:leading-[calc(1.25/0.875)] font-bold text-foreground">
                    {req.title}
                  </h3>
                  <span className="text-xs font-medium text-muted-foreground/75 px-1.5 py-0.5 rounded border border-white/[0.06] bg-white/[0.02]">
                    {req.tag}
                  </span>
                </div>
                <p className="text-base sm:text-[13px] text-muted-foreground leading-relaxed">
                  {req.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
