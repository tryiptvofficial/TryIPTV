import React from "react";
import { Check, Info } from "lucide-react";

interface ComparisonRow {
  feature: string;
  xtream: string;
  m3u: string;
  xtreamNote?: string;
  m3uNote?: string;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    feature: "Credential Format",
    xtream: "Server URL, Username, and Password (3 separate fields)",
    m3u: "Single comprehensive playlist URL containing embedded parameters",
  },
  {
    feature: "Fire TV Remote Typing",
    xtream: "Much easier; fields are entered individually with on-screen keyboard",
    m3u: "Error-prone; requires typing a continuous alphanumeric URL string",
  },
  {
    feature: "Bouquets & Categories",
    xtream: "Dynamically synced from server; clean live TV, VOD, and series split",
    m3u: "Static plain-text playlist downloaded and parsed entirely by the player",
  },
  {
    feature: "EPG (TV Guide) Sync",
    xtream: "Automatic integration using session authentication",
    m3u: "Often requires manual EPG URL input in player settings",
  },
  {
    feature: "Typo & Truncation Risk",
    xtream: "Low — easy to verify each field independently",
    m3u: "High — a single missing character or extra space invalidates load",
  },
  {
    feature: "Recommended Use",
    xtream: "Best choice for Fire TV Sticks when supported by player",
    m3u: "Reliable fallback for generic or older player apps",
  },
];

export function GuideComparisonTable() {
  return (
    <div className="my-8">
      {/* Desktop / Tablet Table View (hidden below md) */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-white/[0.08] bg-[#07080a] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-white/[0.08] bg-white/[0.02]">
              <th scope="col" className="py-3.5 px-4 font-bold text-foreground w-[28%]">
                Feature
              </th>
              <th scope="col" className="py-3.5 px-4 font-bold text-primary w-[36%] bg-primary/[0.02] border-x border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span>Xtream Codes API</span>
                  <span className="text-xs font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded border border-primary/30 bg-primary/[0.08] text-primary">
                    Recommended
                  </span>
                </div>
              </th>
              <th scope="col" className="py-3.5 px-4 font-bold text-muted-foreground w-[36%]">
                M3U Playlist URL
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {COMPARISON_DATA.map((row, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-transparent" : "bg-white/[0.01]"}
              >
                <th
                  scope="row"
                  className="py-3.5 px-4 font-semibold text-foreground align-top text-xs sm:text-sm"
                >
                  {row.feature}
                </th>
                <td className="py-3.5 px-4 text-muted-foreground text-xs sm:text-sm align-top leading-relaxed bg-primary/[0.015] border-x border-white/[0.06]">
                  <div className="flex items-start gap-1.5">
                    <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{row.xtream}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-muted-foreground text-xs sm:text-sm align-top leading-relaxed">
                  <div className="flex items-start gap-1.5">
                    <Info className="h-3.5 w-3.5 text-muted-foreground/70 shrink-0 mt-0.5" />
                    <span>{row.m3u}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards View (hidden md and up) - No horizontal overflow on 390px! */}
      <div className="md:hidden space-y-4">
        {/* Xtream Codes Card */}
        <div className="rounded-xl border border-primary/25 bg-[#07080a] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-white/[0.08]">
            <h3 className="font-headline font-bold text-foreground text-base">
              Xtream Codes API
            </h3>
            <span className="text-xs font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded border border-primary/30 bg-primary/[0.08] text-primary">
              Recommended
            </span>
          </div>
          <div className="space-y-3">
            {COMPARISON_DATA.map((row, idx) => (
              <div key={idx} className="text-xs">
                <span className="font-semibold text-foreground/90 block mb-0.5">
                  {row.feature}
                </span>
                <span className="text-muted-foreground leading-relaxed flex items-start gap-1.5">
                  <Check className="h-3 w-3 text-primary shrink-0 mt-0.5" />
                  {row.xtream}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* M3U Card */}
        <div className="rounded-xl border border-white/[0.08] bg-[#07080a] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-white/[0.08]">
            <h3 className="font-headline font-bold text-foreground text-base">
              M3U Playlist URL
            </h3>
            <span className="text-xs font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded border border-white/[0.08] bg-white/[0.03] text-muted-foreground">
              Standard Format
            </span>
          </div>
          <div className="space-y-3">
            {COMPARISON_DATA.map((row, idx) => (
              <div key={idx} className="text-xs">
                <span className="font-semibold text-foreground/90 block mb-0.5">
                  {row.feature}
                </span>
                <span className="text-muted-foreground leading-relaxed flex items-start gap-1.5">
                  <Info className="h-3 w-3 text-muted-foreground/70 shrink-0 mt-0.5" />
                  {row.m3u}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
