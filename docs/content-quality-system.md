# Internal content quality system

This is an editorial and technical QA tool for existing indexable URLs. It creates no public pages and does not change indexability or publication automatically.

## Workflow

Search demand/topic → user problem → search intent → unique URL job → one owner URL → SERP research → purpose → outline → evidence → original value → experience → create → fact check → trust check → satisfaction check → technical SEO check → publish → internal links → real GSC measurement → diagnose → improve → measure again.

The **unique URL job** is the one task this URL solves better than another existing URL. One topic and one intent should normally have one owner URL. If two entries claim the same task, review for overlap or cannibalization before creating or changing any page. A keyword variation alone is not a page purpose.

**Search fit** validates internal architectural coherence: it connects the documented primary topic, user intent, URL job, page type, and content format within the site's information model. It is strictly separate from **SERP research**, which measures and validates external search demand and observed competitor results across search engines. **Purpose** records the user problem, purpose statement, and task. **Effort** records actual work beyond generic text; length alone is not evidence. **SERP research** requires a real search date and findings, never inferred from a title. **Originality** needs a documented contribution such as screenshots, a tested workflow, a comparison, or first-party documentation. Optimization claims are not original value. **Experience** requires evidence of actual testing or use; leave it unverified otherwise.

For **accuracy**, check business facts against `src/lib/site-config.ts` (`PRODUCT_TRUTHS`) and `src/lib/site-data/pricing.ts`, then verify external claims with dated sources. Record unsupported numbers, compatibility, performance, guarantees, legal, geographic, and technical claims. Do not silently edit content. For **trust**, review authors, testimonials, dates, statistics, schema, and guarantees for authenticity and consistency. For **satisfaction**, ask whether a visitor can complete the primary task without returning to search because essential information is missing; record those missing questions.

## Registry and publication gates

`src/lib/content-quality/registry.ts` derives one entry per indexable route from `src/lib/site-routes.ts`. The route file remains the sitemap source of truth. Legal pages have technical inventory coverage and require separate human policy review; they are exempt from editorial SERP gates. Empty editorial fields mean **NOT VERIFIED**, not a negative claim. `status` describes workflow state and is never proof of publication readiness. `canPublish` permits a content entry to be publish ready only when all editorial gates and the technical gate pass. Current entries deliberately have no invented research, sources, experience, or dates.

Edit an entry by replacing the mapped default for its route with documented fields, or by adding an override keyed by that route. Keep the URL in `site-routes.ts`; do not create a second URL list. Add source references and evidence before marking completed checks. `history.createdAt`, `reviewedAt`, and `lastMeaningfulUpdate` are manual editorial dates. A meaningful update is a real content change; builds, deploys, formatting, sitemap generation, and sitemap `lastmod` are not evidence of one.

**FAIL** means a demonstrated problem, **WARNING** means a possible concern or limited signal, **NOT VERIFIED** means the evidence is unavailable, and **PASS** means the defined gate has evidence. Publication is blocked by every non-PASS mandatory gate. Warnings include missing structured data where applicability needs review and no rendered incoming link. Human reviewers should consider whether an internal link helps the reader continue a task, not add it solely for search signals.

## Quality Readiness versus Owner Release Decisions

The system strictly decouples **Quality Assessment** from the **Owner Release Decision**.

### Evidence status is not owner preference
Evidence status reflects objective empirical verification. A claim is verified only through first-party product sources of truth, documented operational records, or verifiable empirical benchmarks. An owner preference, business desire, or executive mandate to retain specific promotional wording does not constitute verification evidence.

### Owner acceptance does not convert a failed claim into a verified claim
In practical business operations, a site owner may knowingly decide to publish content containing a documented, unverified claim (such as an unbenchmarked promotional superlative). The system models this through explicit **Owner-Accepted Risks** (`acceptedRisks`).

Key governance rules:
1. **No Conversion of Gate Results:** An owner-accepted risk does **NOT** convert `FAIL` to `PASS`. The underlying quality gate (e.g., `Trust = FAIL`) remains visibly failed in all audit reports.
2. **Never Counted as Evidence:** Owner acceptance does not delete issues, hide deficiencies, weaken validators, or count as empirical evidence.
3. **Claim-Specific Exclusivity:** Each accepted risk must explicitly bind to a specific claim and documented issue (`id`, `category`, `claim`, `reason`, `acceptedByOwner`, `acceptedAt`). Blanket owner overrides or generic waivers are strictly rejected.
4. **Persistent Visibility:** Accepted risks and their underlying failing gates remain permanently visible in quality audits until empirical benchmark evidence is supplied or the unverified wording is removed from public copy.
5. **No Cross-Route Leakage:** An accepted risk applies exclusively to the designated route and claim. No other route or claim inherits an owner-accepted risk.

### Release status model
The system evaluates publication readiness through three distinct, non-numeric release states:
- **`PUBLISH READY`:** All universal and page-type-specific mandatory quality gates have passed (`PASS`) with zero unaccepted blocking issues. The page is fully ready for publication under applicable materiality and page-type rules.
- **`PUBLISH WITH ACCEPTED RISK`:** All universal and page-type gates pass or satisfy their applicable rules, but one or more documented blocking claims have been explicitly accepted by the site owner as a known business risk. The underlying quality gate remains `FAIL` and quality status is explicitly `NOT FULLY VERIFIED`.
- **`NOT READY`:** One or more mandatory quality gates have failed or lack required evidence without an explicit, valid owner-accepted risk.

### Quality status model (Evidence completeness)
The system models evidence completeness independently of release readiness (`PUBLISH READY ≠ FULLY VERIFIED`). A page may legitimately be `PUBLISH READY` under materiality rules while non-material operational estimates or conditional gates remain unverified:
- **`FULLY VERIFIED`:** Every applicable factual and evidence gate for that page type has passed (`PASS`) with zero warnings, zero failures, and zero unverified applicable claims.
- **`PARTIALLY VERIFIED`:** Core mandatory release facts are verified (`blockers.length === 0`), qualifying the page as `PUBLISH READY`. However, non-material applicable evidence areas have `WARNING` (e.g. `Operational Accuracy = WARNING` due to qualified delivery estimates lacking empirical dispatch logs), OR conditional applicable areas remain `NOT VERIFIED` (e.g. `SERP Research = NOT VERIFIED` on functional hubs where external search demand is non-blocking).
- **`NOT FULLY VERIFIED`:** A hard applicable quality gate remains `FAIL` (e.g. `Trust = FAIL` on `/`), an owner-accepted risk is present, or mandatory release evidence remains unresolved (`NOT READY`).

### Page-type awareness in quality verification
Non-applicable conditional gates remain visible in audit reports for transparency, but do NOT count against verification status:
- On transactional/commercial pages (e.g. `/pricing`), when commercial utility is satisfied and no original research or testing is claimed (`originalValue: []`, `hasFirstHandExperience: false`), `Effort`, `Originality`, and `Experience` are non-applicable and do not downgrade quality status.
- On functional hubs (e.g. `/setup`), when no original research or bench tests are claimed, `Originality` and `Experience` are non-applicable.
- Applicable evidence areas that prevent `FULLY VERIFIED` (placing the page in `PARTIALLY VERIFIED`) are real evidence gaps: unverified operational telemetry (`Operational Accuracy = WARNING`) or missing external search captures (`SERP Research = NOT VERIFIED`).

## Originality versus Commercial Utility

The system strictly distinguishes between original editorial contributions and verified commercial utility.

### Originality
Originality measures genuine editorial and empirical contributions that do not exist elsewhere. Qualifying originality evidence includes:
- Original empirical research or industry analysis
- Verified first-hand testing observations (hardware, players, streams)
- Original annotated screenshots tied to substantive analysis
- First-party support and customer pattern findings
- Distinctive comparison methodologies

A page cannot pass Originality merely because it includes file references, proprietary price lists, elementary arithmetic, or standard comparison tables. If a page lacks qualifying original research, its Originality gate remains **NOT VERIFIED**.

### Commercial Utility
Commercial Utility measures verified first-party transactional completeness that empowers a visitor to make an informed purchasing decision. Qualifying commercial utility includes:
- Centralized product prices and durations
- Verified connection allowances (e.g. 2 simultaneous connections)
- Accepted payment methods (Cryptocurrency, PayPal, Stripe)
- Direct functional checkout endpoints
- Transparent one-time, non-recurring billing terms
- Documented refund and trial policies

Commercial Utility passes only when all essential decision facts are documented and backed by verified first-party product truths in the evidence log.

### Why they are separate
A pricing table can be exceptionally useful to a customer without constituting original research. Conversely, investigative research does not replace transparent checkout terms. Conflating the two either forces transactional pages to invent synthetic "editorial research" to pass audits, or debases the Originality standard by treating routine arithmetic ($90 / 12 = $7.50) as novel journalism. Keeping them separate preserves the integrity of both gates.

### Page-type-aware publication
Publication readiness (`canPublish`) is intent- and page-type-aware:
- **Informational / Troubleshooting / Guide pages (`pageType: 'editorial' | 'troubleshooting'`):** Must pass both Effort and Originality, as their user task depends directly on substantive editorial depth.
- **Transactional / Commercial pages (`pageType: 'commercial' | 'transactional'`):** Can fulfill their primary value requirement through verified Commercial Utility (`Commercial Utility = PASS`) without being penalized if editorial research is not needed (`Originality = NOT VERIFIED`). However, if a commercial page explicitly makes original research or testing claims, those claims must still be proven before publication. All universal gates (Unique URL Job, Search Fit, Purpose, SERP Research, Trust, Satisfaction, Technical SEO) remain mandatory for every published page.
- **Functional Hub pages (`pageType: 'functional-hub'`, e.g. `/setup`):** Evaluated primarily on operational task completion, configuration accuracy, and routing integrity. Universal mandatory gates: Unique URL Job, Search Fit, Purpose, Configuration Fact Accuracy, Routing Integrity, Effort (task-oriented IA), Trust, Satisfaction, and Technical SEO. SERP Research, Originality, and Experience are conditional and do not block publication unless specifically claimed.

### Page-type-aware Effort
In informational and guide articles, `Effort` requires documented investigative, research, or troubleshooting work beyond generic filler.
For commercial and transactional pages whose primary job is first-party plan comparison and checkout handoff (such as `/pricing`), requiring an editorial research dossier is a legacy artifact of informational article QA. When `Commercial Utility = PASS` and no original editorial research is claimed:
- `Effort` remains visible in audit reports (`Effort = NOT VERIFIED`).
- `Effort` does NOT block publication by itself.
- If a commercial page includes a substantive editorial guide or claims original research (`originalValue` present), `Effort` is restored as a mandatory publication requirement.

For functional hubs whose primary job is onboarding credential holders and routing them to specialized child guides (such as `/setup`), `Effort` is evaluated on task-oriented architectural completeness rather than research dossiers:
- Deliberate information architecture and sequence design (e.g. 7-step onboarding flow)
- Accurate device and player routing matrices (e.g. 10 device guides, 7 player guides)
- Protocol distinctions (Xtream Codes API vs M3U playlist URLs)
- Self-help troubleshooting coverage (buffering, playback failure, auth errors, playlist errors, EPG issues)
- Boundary governance (distinguishing credential service from third-party players)
When documented in `effort.evidence`, `Effort = PASS`. Word count or generic copy is never treated as effort.

## Functional Hubs and Task Completion Architecture

Functional hubs represent a distinct page type (`pageType: 'functional-hub'`) whose core responsibility is operational task completion and routing rather than editorial storytelling or direct commercial checkout.

### How Functional Hubs differ from Editorial Guides
An editorial guide (such as `/guides/what-is-iptv`) exists to explain a concept to an exploratory searcher. Its value comes from original editorial depth, comparative frameworks, and investigative clarity.
In contrast, a functional onboarding hub (such as `/setup`) exists to service a user who already possesses subscription or trial credentials. The visitor's goal is to successfully configure their player application, verify playback, and resolve setup hurdles. Evaluating an onboarding hub against editorial article standards leads to improper blocking.

### Why Originality is conditional
A setup hub instructs users on standard protocol configuration (Xtream Codes API server/user/pass entry and M3U playlist loading). Demanding "original research" or "novel observations" for standard credential entry forces pages to invent synthetic claims.
- If a functional hub claims original hardware lab testing or proprietary benchmarks, those claims must be evidenced before publication.
- If no original research is claimed (`originalValue: []`), `Originality = NOT VERIFIED` remains transparently visible in audit reports and does NOT block publication.

### Why Experience is conditional
Onboarding instructions can be structurally complete and technically accurate without requiring first-hand hardware bench test logs.
- If a functional hub explicitly claims hands-on hardware testing (e.g. "our team tested on 15 devices"), `Experience = PASS` is strictly required.
- Where no empirical first-hand testing is claimed (`hasFirstHandExperience: false`), `Experience = NOT VERIFIED` remains visible in audit reports without blocking publication.

### Product-Task Necessity versus Search Demand Validation
For top-of-funnel acquisition content, external Google SERP research is mandatory to validate that genuine search demand exists before creating a URL.
For functional hubs, the page's necessity is derived from **product-task necessity**: the service delivers credentials that require configuration guidance, device selection, and troubleshooting handoffs. The URL is structurally required by the product workflow even if third-party search demand is unmeasured.
Therefore:
- `SERP Research` remains evaluated and visible in audit reports (`NOT VERIFIED` until external search captures are recorded).
- For functional hubs (`pageType: 'functional-hub'`), `SERP Research` does NOT block publication in `canPublish`.

### Routing Integrity as a Core Quality Gate
For a routing hub, links to child resources are not decorative navigational aids; they constitute the primary operational utility of the page.
The system implements a dedicated `Routing Integrity` gate (`evaluateRoutingIntegrity`) that evaluates:
1. **Device handoffs:** Dedicated links to platform guides (e.g. Firestick, Android TV, Samsung, LG, Apple TV, PC, Mac, MAG).
2. **Player handoffs:** Dedicated links to player tutorials (e.g. TiviMate, IPTV Smarters, XCIPTV, Televizo, Perfect Player, OTT Navigator, IPTV Extreme).
3. **Troubleshooting handoffs:** Dedicated links to self-help resolution guides (e.g. buffering, playback failures, login errors, playlist issues, EPG errors).
4. **Protocol handoffs:** Dedicated links explaining Xtream Codes API vs M3U playlist URLs.
`Routing Integrity = PASS` is mandatory for functional hubs to publish.

## Split Accuracy and the Materiality Rule

The system avoids monolithic page-level accuracy booleans that conflate distinct classes of evidence.

### Why monolithic accuracy fails
On a transactional pricing page, all commercial facts (plan prices, durations, monthly equivalents, 2 simultaneous connections, Cryptocurrency/PayPal/Stripe, one-time non-recurring billing, checkout links) may be verified against first-party code and business truth. However, a qualified operational delivery expectation ("credentials typically arrive within 5–15 minutes") may lack empirical fulfillment dispatch telemetry in the repository. A monolithic accuracy gate would mark the entire page `NOT VERIFIED`, falsely implying that verified pricing data is untrustworthy.

### Accuracy sub-gates
For pages using the structured accuracy model, accuracy is split into distinct sub-gates:
1. **Commercial Fact Accuracy:**
   - Evaluates direct commercial terms: prices, plan durations, connection allowances, accepted payment methods, one-time vs. recurring billing, functional checkout endpoints, trial monetary costs, and refund policy handoffs.
   - Sourced from first-party business truths (`PRODUCT_TRUTHS`), central data files, and explicit business specifications.
   - Mandatory for commercial pages: must be **PASS** to publish.
2. **Configuration Fact Accuracy:**
   - Evaluates deterministic technical setup parameters: Xtream Codes API structure (Server URL, Username, Password), M3U playlist format, simultaneous connection rules (2 connections), and available device/player/help handoff routes.
   - Sourced from first-party configuration code (`PRODUCT_TRUTHS`), site routes, and product setup specifications.
   - Mandatory for functional hubs: must be **PASS** to publish.
3. **Operational Claim Accuracy (Operational Accuracy):**
   - Evaluates empirical execution claims: credential delivery timing, streaming performance, peak-hour stability, actual fulfillment telemetry, hardware/player runtime behavior, and automated expiration mechanisms.
   - Sourced from operational records, fulfillment logs, and first-hand test records.
   - Evaluates to **PASS** when supported by verified records, **WARNING** when qualified first-party estimates lack empirical logs, **NOT VERIFIED** when unevidenced, and **FAIL** when contradicted by evidence.

### Materiality rule: Material blocking claims vs. non-blocking qualified estimates
The system differentiates between claims that are essential to the purchasing transaction and operational estimates that do not alter the core transaction terms:
- **Material Blocking Claims:** Claims that directly define the customer's financial or contractual commitment:
  - Price and total upfront cost
  - Billing frequency and non-recurring status
  - Automatic renewal behavior
  - Accepted payment methods
  - Refund eligibility and evaluation terms
  - Simultaneous connection limits (2 connections)
  If any material claim is unverified, conflicting, or unsupported, publication is strictly **BLOCKED**.
- **Non-Blocking Qualified Operational Estimates:** Qualified operational expectations that are clearly framed as non-contractual estimates rather than absolute guarantees:
  - Example: "Receive your Xtream Codes and M3U details by email typically within 5–15 minutes"
  - Because this is qualified in page copy ("typically") and declared as a service expectation in `PRODUCT_TRUTHS.activationTime`, but lacks empirical dispatch logs, it surfaces as `Operational Accuracy = WARNING`.
  - Under the materiality rule, this warning does not invalidate verified pricing facts and does not block publication of the commercial page.

### When operational claims block publication
Operational claims block publication in three explicit situations:
1. **Outright falsity:** If an operational claim is contradicted or unsupported (`Operational Accuracy = FAIL`), publication is blocked.
2. **Material blockers:** If an operational claim is designated as a material transaction condition in `operationalClaims.materialBlockers` (e.g. an SLA guarantee, guaranteed delivery window, or cross-IP streaming promise) and is not fully verified (`PASS`), publication is blocked.
3. **Operational evaluation pages:** On pages whose primary URL job is operational evaluation (such as `/iptv-free-trial`), empirical testing of the service is the core user task. On such pages, `Operational Evidence = PASS` and full empirical testing remain mandatory blockers.

## CLI and technical scope

Run `npm run build` and then `npm run content:audit`. The CLI reads the route inventory and built HTML in `.next/server/app`. It checks route files, sitemap inventory coverage, duplicate entries, rendered title, description, canonical, robots noindex, H1 count, structured-data presence, and internal `<a href>` links. It reports incoming/outgoing links, orphans, self and duplicate links, route-inventory broken targets, redirects declared in `next.config.js`, duplicate canonical targets, and click depth from the home page. Without built HTML, rendered checks are **NOT VERIFIED**. The offline audit cannot prove HTTP 200 responses, live redirects, crawler treatment, or contextual link quality. It does not change metadata, sitemap, robots, schema, links, or pages.

Commercial fact contradictions require human review against both existing fact sources. An absence of conflict in this CLI is not a product-truth certification. Likewise, search intent, ownership, SERP results, usefulness, originality, first-hand experience, external claims, trust, and satisfaction remain human checks. Record findings in the registry; do not fabricate evidence to clear a gate.

## GSC measurement

`GscPageQueryMetric` defines the shape for future real page/query metrics. There is no GSC integration or production data in this system. After publication, collect real queries, identify unexpected queries and high-impression low-CTR cases, diagnose intent gaps and missing subtopics, make a meaningful improvement, record its date, then measure again. Never enter mock metrics as real measurements.

## SERP research checklist for the first four pages

The URL jobs below are **ownership hypotheses**, derived from existing page content. They are not verified search demand. A user-supplied summary dated 2026-10-09 now records aggregate findings for `/iptv-free-trial`; its `completed` flag reflects that reported research, while its missing result URLs keep the automated SERP evidence gate **NOT VERIFIED**. The other three pages remain incomplete. A researcher should record the exact query, search date, result URL, title when visible, and a concrete observation for every finding. Do not infer volume, popularity, difficulty, rankings, SERP features, or AI Overview behavior from page copy.

### `/` — service overview hypothesis

- Is there meaningful non-brand demand for a generic service homepage? Keep demand **NOT VERIFIED** until supported by real query data.
- For actual branded and plausible generic queries, what user problem and intent dominate?
- Are observed results provider homepages, category/list pages, reviews, comparisons, or informational pages?
- Do generic queries such as “IPTV service” map to this homepage, `/pricing`, or another existing commercial page? Do not presume that “best IPTV” belongs here.
- Does the homepage have a distinct search role beyond branded navigation?

### `/pricing` — plan comparison hypothesis

- For researched pricing queries, does the SERP show transactional, commercial-investigation, or informational intent?
- Do results primarily use dedicated pricing pages or broader subscription pages?
- Which elements recur: price tables, durations, connections, renewals, refunds, payment methods, trial availability, and activation details?
- Does “IPTV subscription” intent belong to `/pricing`, `/`, or another existing URL according to the observed task and page types, rather than keyword wording alone?

### `/iptv-free-trial` — request and evaluation hypothesis

- Are results mostly provider trial pages, comparison articles, listicles, forum discussions, or generic homepages?
- Which questions recur, and which tasks dominate: immediate signup, card requirement, trial duration, device support, what to test, activation time, or cancellation and expiry?
- Does the evidence favor transactional or commercial-investigation intent?
- Which useful SERP elements are missing from this page, and would filling them add genuine value rather than generic filler?

### `/setup` — universal configuration hypothesis

- Is “IPTV setup” a broad credential-entry task or a collection of device- and player-specific tasks?
- Do results focus on IPTV Smarters, TiviMate, Firestick, Android TV, Xtream Codes, M3U, or generic credential entry?
- Does a universal page satisfy the observed task, or should `/setup` chiefly route visitors to a specific guide?
- For each observed task, is the natural existing owner `/setup`, `/devices/*`, `/players/*`, or `/guides/*`? Is `/setup` attempting too many downstream tasks?

### Ownership test after evidence arrives

For each researched query, record **query → user problem → dominant intent → expected page type → expected content format → existing TryIPTV owner URL → outcome** in `ownershipAssessments` once query-level evidence is available. `ownershipOutcome` holds an aggregate hypothesis when only a summary is supplied. Allowed outcomes are `CONFIRMED`, `PLAUSIBLE`, `WEAK`, `CONFLICTING`, and `NOT VERIFIED`. No numeric confidence is used. Keep the proposed URL jobs revisable. `serpResearch.completed` may reflect a dated user-supplied research summary, but the automated SERP gate requires recorded queries and source URLs as well as the completion flag and date.

Classify overlap by task. The homepage showing brief prices, the trial page mentioning paid plans, and commercial pages linking to setup are **normal supporting overlap** when they help the reader move on. Two pages both trying to fully answer the same pricing, trial-request, or credential-setup task could be **competing primary intent**. Do not remove useful supporting information merely because one URL owns the full task.

## First-Hand Evidence and Claim Verification

The `/iptv-free-trial` entry has a separate `evidenceLog`, `claimEvidence` map, and `proposedOpportunities` list. The log is currently empty. The 18 URLs in `serpResearch.sources` are **external SERP evidence** about search expectations and competing page types; they are not evidence of TryIPTV performance or operations. Do not duplicate those SERP entries in the evidence log.

Evidence records distinguish **first-party business evidence** (`product-source-of-truth` and `operational-record`), **first-hand testing** (`first-hand-test` and actual screenshots), **customer/support evidence** (`customer-question` and `support-observation`), and sourced external facts (`external-source`). Proposed opportunities are stored separately and never count as evidence. A competitor claim, a proposed test, page copy, or an AI-generated statement does not prove a TryIPTV claim.

To record a real test, add an `EvidenceRecord` with a unique ID, trial test area, actual date, device and player where relevant, connection, test context, observed result, limitations, and a local source path to the test notes. Set `verified: true` only after reviewing that record. A verified first-hand test needs a date, source, context, and observed result; an empty or merely planned test cannot pass. The `TrialTestArea` type covers request, credential delivery, activation, Xtream/M3U login, Firestick/Android TV/Smart TV setup, TiviMate/IPTV Smarters, EPG, VOD, channel switching, live and sports playback, peak-time behavior, expiry, auto-renewal, card requirement, and post-24-hour behavior.

For a screenshot, reference its actual local file path in `source`, describe what it shows, date it, and state any device or player limitations. For an operational record, reference the real internal record or export, date it, describe the workflow or sample, record the observed result, and note limitations. A code constant may be linked as `product-source-of-truth` for a documented business term, but that alone does not demonstrate real-world delivery time or playback quality. Do not include credentials, customer identifiers, or payment details in evidence descriptions.

Each `claimEvidence` item identifies the claim, allowed evidence types, and linked record IDs. `evaluateClaimEvidence` computes `PASS`, `WARNING`, `FAIL`, or `NOT VERIFIED` from the actual linked records; it does not trust a stored status. Missing evidence stays **NOT VERIFIED**. A verified record of the wrong type fails the mapping, and an incomplete verified record warns. External SERP sources cannot pass a first-party business claim; performance claims require a verified first-hand test. In the trial registry, experience requires a verified first-hand record, originality requires documented original value linked to verified first-party evidence, and accuracy cannot pass while mapped operational claims remain unresolved. The current proposed testing framework is an idea only, so it does not change any gate.
