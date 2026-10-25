import type { ComponentType } from "react";
import Link from "next/link";
import { ArrowRight, Flame, Monitor, Tv } from "lucide-react";
import {
  SiAndroid,
  SiAppletv,
  SiLg,
  SiMacos,
  SiRoku,
  SiSamsung,
} from "react-icons/si";

import { Container } from "../shared/Container";
import { SectionHeader } from "../shared/SectionHeader";
import { Section } from "../shared/Section";
import { devices } from "@/lib/site-data/devices";

const deviceIconMap: Record<string, ComponentType<{ className?: string }>> = {
  SiMacos,
  SiAndroid,
  Monitor,
  SiRoku,
  SiSamsung,
  SiLg,
  Flame,
  Tv,
  SiAppletv,
};

export function Devices() {
  return (
    <Section id="devices" variant="alt" className="border-t-0 pt-0 sm:pt-0 md:pt-0 lg:pt-0">
      <Container>
        <div className="border-t border-white/[0.07] pt-14 sm:pt-16 md:pt-20 lg:pt-24">
          <SectionHeader
            align="left"
            title="Which Devices Does TryIPTV Work On?"
            subtitle="TryIPTV works on Fire TV, Android TV, Apple TV, Samsung and LG smart TVs, MAG boxes, phones, tablets and computers. Roku works through AirPlay or screen mirroring. Each device needs a compatible IPTV player app. Choose your device for step-by-step setup."
            eyebrow="Device Compatibility"
          />

          {/* A static list answers "will it work on my device?" at a glance; no motion, every device visible. */}
          <ul aria-label="Supported devices" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {devices.map((device) => {
              const Icon = deviceIconMap[device.icon] || Tv;
              return (
                <li key={device.name}>
                  <Link
                    href={device.href}
                    className="flex min-h-14 items-center gap-3 rounded-xl border border-white/[0.07] bg-card px-4 py-3 transition-colors duration-200 hover:border-primary/40"
                    aria-label={`${device.name} IPTV setup guide`}
                  >
                    <Icon className="size-5 shrink-0 text-muted-foreground" aria-hidden />
                    <span className="text-sm font-semibold text-foreground">{device.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex flex-col items-start gap-x-8 gap-y-1 sm:flex-row sm:items-center">
            <Link href="/devices" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              View all step-by-step device setup guides <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link href="/players" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground hover:underline">
              Compare compatible IPTV players <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link href="/help" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground hover:underline">
              IPTV troubleshooting guides <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
