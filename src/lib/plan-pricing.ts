import { PRODUCT_TRUTHS } from "@/lib/site-config";

const oneMonthPrice = PRODUCT_TRUTHS.plans[0].price;

export const usd = (n: number) => `$${n.toFixed(2)}`;

/** Number of months in a plan name such as "12 Months" or "12-months". */
export const planMonths = (name: string) => parseInt(name, 10);

/** What the same term costs at the 1-month price (1-month price × months), or null for the 1-month plan. */
export const payingMonthlyTotal = (months: number) => (months > 1 ? Math.round(oneMonthPrice * months * 100) / 100 : null);

/** Lowest monthly equivalent, e.g. "$7.35", for "From $7.35/mo" calls to action. */
export const lowestMonthly = usd(Math.min(...PRODUCT_TRUTHS.plans.map((p) => p.monthlyEquivalent)));

/** Display order for plan cards: the 12-month plan sits third of four and is the featured card. */
export const PLAN_DISPLAY_ORDER = [1, 3, 12, 6] as const;
export const FEATURED_MONTHS = 12;
