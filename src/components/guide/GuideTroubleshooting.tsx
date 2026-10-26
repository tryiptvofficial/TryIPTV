import React from "react";
import { AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";

interface TroubleshootingItem {
  problem: string;
  checkFirst: string;
  nextAction: string;
}

const TROUBLESHOOTING_ITEMS: TroubleshootingItem[] = [
  {
    problem: "Credentials rejected at login",
    checkFirst: "Look for typos in the server URL (ensure http:// or https:// prefix is intact), uppercase/lowercase mismatches in username, or trailing spaces copied from email.",
    nextAction: "Verify your subscription is active. If the exact same credentials fail across two independent players, contact support to confirm server status.",
  },
  {
    problem: "M3U playlist does not load",
    checkFirst: "Verify the complete URL string was pasted without truncation. M3U links embed credentials inside the URL, so any missing character breaks the load.",
    nextAction: "Paste the URL into a phone or computer browser/text editor to confirm it is intact, then re-enter it into your Fire TV player.",
  },
  {
    problem: "Channels load but EPG is missing",
    checkFirst: "Check if the player requires a manual EPG sync or a separate guide URL. Also confirm your Firestick and player timezone match your local time.",
    nextAction: "Navigate to the player's EPG settings and trigger a manual 'Refresh EPG' or 'Update Guide'. Allow several minutes for listings to populate.",
  },
  {
    problem: "One channel fails, others work",
    checkFirst: "Test other channels within the exact same bouquet or category to isolate the issue.",
    nextAction: "This indicates a stream-specific source interruption. Do not reset your account or player. Switch to an alternative channel and retry later.",
  },
  {
    problem: "All channels fail after working previously",
    checkFirst: "Test your Fire TV internet connection under Settings > Network to confirm external connectivity.",
    nextAction: "Restart your IPTV player, then restart the Fire TV device. If channels still time out, wait a few minutes before contacting support.",
  },
  {
    problem: "App closes unexpectedly or becomes unstable",
    checkFirst: "Check available device storage at Settings > My Fire TV > About > Storage.",
    nextAction: "Go to Settings > Applications > Manage Installed Applications, select the player, and choose 'Clear Cache' (avoid 'Clear Data'). Reinstall if persistent.",
  },
  {
    problem: "One player fails, another works with same details",
    checkFirst: "Verify player-specific decoder settings (Hardware vs Software) or outdated playlist cache.",
    nextAction: "Clear cache and data on the failing player and re-enter details, or reinstall from official source. If it persists, use the working player.",
  },
  {
    problem: "Downloader is not available in the Appstore",
    checkFirst: "Amazon Appstore availability varies by region and specific Fire TV model.",
    nextAction: "Do not use unverified workaround sites. Install a player available in your local Appstore, or check the player developer's official website.",
  },
];

export function GuideTroubleshooting() {
  return (
    <div id="troubleshooting" className="scroll-mt-2 my-10">
      <div className="mb-6">
        <p className="eyebrow mb-1">Diagnostic Interface</p>
        <h2 className="font-headline text-2xl sm:text-3xl font-bold text-foreground">
          Troubleshooting: IPTV Not Working on Firestick
        </h2>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground max-w-[60ch]">
          Use this diagnostic matrix to match your exact symptom with the immediate inspection step and recommended solution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TROUBLESHOOTING_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-white/[0.08] bg-[#07080a] p-4.5 sm:p-5 flex flex-col justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] hover:border-white/[0.14] transition-colors"
          >
            <div>
              <div className="flex items-start gap-2.5 mb-3.5">
                <AlertCircle className="h-4.5 w-4.5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                <h3 className="font-headline font-bold text-foreground text-base sm:text-[15px] leading-snug">
                  {item.problem}
                </h3>
              </div>

              <div className="space-y-2.5 text-base sm:text-[13px] leading-relaxed">
                <div className="rounded-lg bg-white/[0.02] border border-white/[0.06] p-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400/90 block mb-1">
                    CHECK FIRST
                  </span>
                  <p className="text-muted-foreground">{item.checkFirst}</p>
                </div>

                <div className="rounded-lg bg-primary/[0.03] border border-primary/20 p-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary block mb-1">
                    NEXT ACTION
                  </span>
                  <p className="text-foreground/90 font-normal">{item.nextAction}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
