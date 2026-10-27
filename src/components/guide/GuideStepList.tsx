export interface StepItem {
  title: string;
  description: string;
  screenshot?: {
    src?: string;
    alt?: string;
    caption?: string;
  };
}

interface GuideStepListProps {
  steps: StepItem[];
  primaryKeyword?: string;
  /** Replaces the generated summary when the "steps" are alternatives rather than a sequence. */
  intro?: string;
  className?: string;
}

export function GuideStepList({
  steps,
  primaryKeyword = "Fire TV Stick",
  intro,
  className,
}: GuideStepListProps) {
  // Answer-first summary built from the real step titles, so the count and order always match the list.
  const lower = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);
  const titles = steps.map((s) => lower(s.title));
  const summary =
    titles.length > 1
      ? `${titles.slice(0, -1).join("; ")}; and ${titles[titles.length - 1]}`
      : titles[0] ?? "";

  return (
    <div id="setup-steps" className={`scroll-mt-6 my-10 ${className || ""}`}>
      <div className="mb-8">
        <p className="eyebrow mb-1.5">Step-by-Step Walkthrough</p>
        <h2 className="font-headline text-2xl sm:text-3xl font-bold text-foreground">
          Step-by-Step Installation Guide for {primaryKeyword}
        </h2>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground max-w-[60ch]">
          {intro ?? `Setting up IPTV on ${primaryKeyword} takes ${steps.length} steps: ${summary}.`}
        </p>
      </div>

      <ol className="relative list-none">
        {steps.map((step, index) => {
          const stepNumber = String(index + 1).padStart(2, "0");
          const isLast = index === steps.length - 1;

          return (
            <li
              key={index}
              id={`step-${index + 1}`}
              className="group relative flex items-start gap-4 sm:gap-6 scroll-mt-6"
            >
              {/* Timeline indicator & vertical rail */}
              <div className="flex flex-col items-center self-stretch shrink-0">
                <div
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-primary/30 bg-[#07080a] text-primary font-mono text-xs font-bold shadow-[0_0_10px_rgba(0,240,120,0.06)] group-hover:border-primary/60 transition-colors"
                  aria-hidden="true"
                >
                  {stepNumber}
                </div>
                {!isLast && (
                  <div className="w-px flex-1 bg-white/[0.08] my-2 group-hover:bg-primary/20 transition-colors" />
                )}
              </div>

              {/* Step content */}
              <div className={`min-w-0 flex-1 max-w-[740px] ${isLast ? "pb-2" : "pb-8 sm:pb-11"}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-extrabold uppercase text-primary tracking-wider bg-primary/[0.08] border border-primary/20 rounded px-1.5 py-0.5">
                    STEP {stepNumber}
                  </span>
                  <h3 className="font-headline text-base sm:text-lg font-bold text-foreground">
                    {step.title}
                  </h3>
                </div>

                <div
                  className="text-base sm:text-sm leading-relaxed text-muted-foreground space-y-2.5 [&>p]:leading-relaxed [&>ul]:space-y-1.5 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:space-y-1.5 [&>ol]:list-decimal [&>ol]:pl-5 [&>strong]:text-foreground [&>strong]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4"
                  dangerouslySetInnerHTML={{ __html: step.description }}
                />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
