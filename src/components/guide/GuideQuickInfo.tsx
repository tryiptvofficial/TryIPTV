import React from "react";
import { Tv, KeyRound, Wrench, ShieldCheck } from "lucide-react";

interface GuideQuickInfoProps {
  device?: string;
  setupMethod?: string;
  loginFormat?: string;
  difficulty?: string;
  className?: string;
}

export function GuideQuickInfo({
  device = "Amazon Fire TV Stick",
  setupMethod = "IPTV Player + Credentials",
  loginFormat = "Xtream Codes or M3U",
  difficulty = "Simple Guided Setup",
  className,
}: GuideQuickInfoProps) {
  const items = [
    { label: "Device", value: device, icon: Tv },
    { label: "Setup Method", value: setupMethod, icon: Wrench },
    { label: "Login Format", value: loginFormat, icon: KeyRound },
    { label: "Difficulty", value: difficulty, icon: ShieldCheck },
  ];

  return (
    <div
      className={`grid grid-cols-2 lg:grid-cols-4 gap-3 my-6 rounded-xl border border-white/[0.08] bg-[#07080a] p-3.5 sm:p-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${className || ""}`}
      role="group"
      aria-label="Quick setup specifications"
    >
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <div key={index} className="flex flex-col justify-start py-0.5">
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-primary/80 mb-1">
              <Icon className="h-3 w-3 shrink-0 text-primary" aria-hidden="true" />
              {item.label}
            </span>
            {/* Wrap instead of truncating: the title tooltip is unreachable on touch screens. */}
            <span className="text-xs sm:text-sm font-semibold text-foreground break-words">
              {item.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}
