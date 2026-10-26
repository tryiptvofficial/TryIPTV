import React from "react";
import { CheckCircle2 } from "lucide-react";

interface BufferingStep {
  step: string;
  title: string;
  description: string;
}

const BUFFERING_STEPS: BufferingStep[] = [
  {
    step: "01",
    title: "Test Connection Speed",
    description: "Confirm your network provides stable throughput (standard HD streams typically require at least 10 Mbps; 4K streams need significantly more). Run a speed test from a device near the Firestick.",
  },
  {
    step: "02",
    title: "Check Wi-Fi Signal Strength",
    description: "Move the Fire TV closer to your router or use a Wi-Fi extender. For high-bitrate live sports or 4K playback, a compatible Ethernet adapter provides a much more stable connection than Wi-Fi.",
  },
  {
    step: "03",
    title: "Close Background Applications",
    description: "Fire TV Stick devices have limited RAM. Hold down the Home button to view and close active background apps, or force-stop them under Settings > Applications > Manage Installed Applications.",
  },
  {
    step: "04",
    title: "Clear Player Application Cache",
    description: "Navigate to Settings > Applications > Manage Installed Applications, select your IPTV player, and choose 'Clear Cache'. Avoid 'Clear Data' unless you are prepared to re-enter your login credentials.",
  },
  {
    step: "05",
    title: "Free Up Internal Storage",
    description: "Low storage causes video decoders to stutter. Go to Settings > My Fire TV > About > Storage. Delete unused apps and remove leftover APK installer files saved inside Downloader.",
  },
  {
    step: "06",
    title: "Test an Alternative Stream",
    description: "Check if buffering affects only a single channel or across multiple categories. If only one channel buffers, the issue is stream-specific rather than your connection or Firestick.",
  },
  {
    step: "07",
    title: "Adjust Hardware/Software Decoder",
    description: "Open your player settings and look for the video decoder option. Switch between Hardware and Software decoding to find which mode your specific Fire TV generation handles best.",
  },
  {
    step: "08",
    title: "Restart the Fire TV Device",
    description: "If buffering appeared suddenly across all channels after working smoothly, perform a full restart (Settings > My Fire TV > Restart) to clear cached operating system memory.",
  },
];

export function GuideBufferingChecklist() {
  return (
    <div id="buffering" className="scroll-mt-2 my-10">
      <div className="mb-6">
        <p className="eyebrow mb-1">Performance Tuning</p>
        <h2 className="font-headline text-2xl sm:text-3xl font-bold text-foreground">
          How to Reduce IPTV Buffering on Firestick
        </h2>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground max-w-[60ch]">
          Work through these 8 diagnostic checks in order before adjusting multiple player configurations at once.
        </p>
      </div>

      <div className="rounded-xl border border-white/[0.08] bg-[#07080a] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] divide-y divide-white/[0.06] overflow-hidden">
        {BUFFERING_STEPS.map((item, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-4.5 flex items-start gap-3.5 hover:bg-white/[0.015] transition-colors"
          >
            <span className="font-mono text-xs font-bold text-primary bg-primary/[0.08] border border-primary/20 rounded px-2 py-0.5 shrink-0 mt-0.5">
              {item.step}
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-headline font-bold text-foreground text-base sm:text-[15px] sm:leading-[calc(1.25/0.875)] mb-1">
                {item.title}
              </h3>
              <p className="text-base sm:text-[13px] leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
