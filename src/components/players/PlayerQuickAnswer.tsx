import Link from "next/link";

type PlayerQuickAnswerProps = {
  player: string;
  summary: string;
  devices: { href: string; label: string }[];
  guides: { href: string; label: string }[];
  help?: { href: string; label: string }[];
};

export function PlayerQuickAnswer({ player, summary, devices, guides, help = [] }: PlayerQuickAnswerProps) {
  const links = [...devices, ...guides, ...help];

  return (
    <section className="mt-8 rounded-xl border border-primary/20 bg-primary/[0.04] p-5 sm:p-6" aria-labelledby="player-quick-answer">
      <p className="font-mono text-xs font-bold uppercase tracking-wider text-primary">Quick answer</p>
      <h2 id="player-quick-answer" className="mt-2 font-headline text-xl font-bold text-foreground sm:text-2xl">
        What is {player}, and how do you use it for IPTV?
      </h2>
      <p className="mt-2 text-base leading-relaxed text-muted-foreground">{summary}</p>
      <nav className="mt-4 border-t border-primary/15 pt-4" aria-label={`${player} related setup resources`}>
        <p className="text-xs font-semibold uppercase tracking-wider text-foreground">Next setup resources</p>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="inline-flex min-h-11 items-center text-primary underline decoration-primary/40 underline-offset-4 hover:text-foreground pointer-fine:min-h-0">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
