import React from "react";
import { Lightbulb, AlertTriangle, ShieldAlert, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutType = "tip" | "important" | "security" | "info";

interface GuideCalloutProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const CALLOUT_CONFIG: Record<
  CalloutType,
  {
    icon: React.ElementType;
    defaultTitle: string;
    borderClass: string;
    bgClass: string;
    iconClass: string;
    badgeClass: string;
  }
> = {
  tip: {
    icon: Lightbulb,
    defaultTitle: "Helpful Tip",
    borderClass: "border-primary/25",
    bgClass: "bg-primary/[0.04]",
    iconClass: "text-primary",
    badgeClass: "text-primary border-primary/25 bg-primary/[0.08]",
  },
  important: {
    icon: AlertTriangle,
    defaultTitle: "Important Note",
    borderClass: "border-amber-500/30",
    bgClass: "bg-amber-500/[0.04]",
    iconClass: "text-amber-400",
    badgeClass: "text-amber-400 border-amber-500/30 bg-amber-500/[0.08]",
  },
  security: {
    icon: ShieldAlert,
    defaultTitle: "Security Notice",
    borderClass: "border-emerald-500/30",
    bgClass: "bg-emerald-500/[0.04]",
    iconClass: "text-emerald-400",
    badgeClass: "text-emerald-400 border-emerald-500/30 bg-emerald-500/[0.08]",
  },
  info: {
    icon: Info,
    defaultTitle: "Information",
    borderClass: "border-white/[0.1]",
    bgClass: "bg-white/[0.02]",
    iconClass: "text-muted-foreground",
    badgeClass: "text-muted-foreground border-white/[0.1] bg-white/[0.04]",
  },
};

export function GuideCallout({
  type,
  title,
  children,
  className,
}: GuideCalloutProps) {
  const config = CALLOUT_CONFIG[type] || CALLOUT_CONFIG.info;
  const Icon = config.icon;

  return (
    <div
      role="note"
      className={cn(
        "my-5 rounded-xl border p-4 sm:p-4.5 flex items-start gap-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]",
        config.borderClass,
        config.bgClass,
        className
      )}
    >
      <div className={cn("mt-0.5 shrink-0", config.iconClass)}>
        <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1 text-base sm:text-sm leading-relaxed text-muted-foreground">
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className={cn(
              "text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border",
              config.badgeClass
            )}
          >
            {type}
          </span>
          <span className="font-bold text-foreground text-base sm:text-sm">
            {title || config.defaultTitle}
          </span>
        </div>
        <div className="space-y-1.5 [&>p]:leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
