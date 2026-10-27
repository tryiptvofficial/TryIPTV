import { SHOW_CONFIRM_MARKERS } from "@/lib/site-data/company";

type Statement = { id: string; draft: string; confirmed: boolean; question: string };

/**
 * Lists owner-confirmed statements. Unconfirmed ones are omitted in production; on Preview/dev
 * they are shown as clearly labelled drafts with the question the owner must answer.
 */
export function ConfirmedStatements({ items }: { items: Statement[] }) {
  const visible = items.filter((i) => i.confirmed || SHOW_CONFIRM_MARKERS);
  return (
    <ul className="space-y-4">
      {visible.map((item) =>
        item.confirmed ? (
          <li key={item.id} className="text-base leading-7 text-muted-foreground">{item.draft}</li>
        ) : (
          <li key={item.id} className="rounded-lg border border-amber-400/40 bg-amber-400/[0.06] p-4 text-base leading-7">
            <p className="font-semibold text-amber-300">[CONFIRM] {item.question}</p>
            <p className="mt-1 text-muted-foreground">Draft wording (not published until confirmed): {item.draft}</p>
          </li>
        ),
      )}
    </ul>
  );
}
