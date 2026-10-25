import type { SiteRoute } from '../site-routes';

export type GateResult = 'PASS' | 'WARNING' | 'FAIL' | 'NOT VERIFIED';
export type ContentStatus = 'research' | 'draft' | 'review' | 'publish-ready' | 'published' | 'needs-improvement';
export type OwnershipOutcome = 'CONFIRMED' | 'PLAUSIBLE' | 'WEAK' | 'CONFLICTING' | 'NOT VERIFIED';

export interface SerpResearch {
  completed: boolean;
  searchDate?: string;
  queries?: string[];
  dominantIntent?: string;
  dominantResultTypes?: string[];
  recurringSubtopics?: string[];
  recurringQuestions?: string[];
  commonContentFormats?: string[];
  commonTrustSignals?: string[];
  commonCommercialElements?: string[];
  contentGaps?: string[];
  conflictingIntentSignals?: string[];
  competingUrlTypes?: string[];
  notes?: string;
  sources?: Array<{ query: string; resultUrl: string; resultTitle?: string; observation: string }>;
}

export interface OwnershipAssessment {
  query: string;
  userProblem: string;
  dominantIntent: string;
  expectedPageType: string;
  expectedContentFormat: string;
  existingOwnerUrl: string;
  outcome: OwnershipOutcome;
}

export type EvidenceType = 'first-hand-test' | 'operational-record' | 'customer-question' | 'support-observation' | 'screenshot' | 'external-source' | 'product-source-of-truth' | 'first-party-documentation';
export type TrialTestArea = 'trial-request' | 'credential-delivery' | 'activation-time' | 'xtream-login' | 'm3u-login' | 'firestick-setup' | 'android-tv-setup' | 'smart-tv-setup' | 'tivimate-compatibility' | 'iptv-smarters-compatibility' | 'epg-loading' | 'vod-playback' | 'channel-switching' | 'live-playback' | 'sports-live-playback' | 'peak-time-behavior' | 'trial-expiry' | 'auto-renewal' | 'card-requirement' | 'after-24-hours';

export interface EvidenceRecord {
  id: string;
  type: EvidenceType;
  title: string;
  description: string;
  area?: TrialTestArea;
  recordedAt?: string;
  /** Local record path or external URL; never a bare assertion. */
  source?: string;
  relatedClaims?: string[];
  device?: string;
  player?: string;
  connectionType?: string;
  testContext?: string;
  result?: string;
  limitations?: string[];
  verified: boolean;
}

export interface ClaimEvidenceMapping {
  id?: string;
  claim: string;
  claimClass: 'first-party-business' | 'performance' | 'external-fact';
  /** Any listed type can support the claim, subject to claimClass restrictions. */
  requiredEvidence: EvidenceType[];
  /** Documented support that cannot establish the full claim by itself. */
  supportingEvidence?: EvidenceType[];
  evidenceIds: string[];
  isOptional?: boolean;
}

export interface GscPageQueryMetric {
  page: string;
  query: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
  startDate: string;
  endDate: string;
  conversions?: number;
}

export interface CommercialUtility {
  applicable: boolean;
  passed?: boolean;
  verifiedFacts?: string[];
  evidenceIds?: string[];
  issues?: string[];
}

export type PageType =
  | 'editorial'
  | 'commercial'
  | 'transactional'
  | 'functional-hub'
  | 'troubleshooting'
  | 'legal';

export interface CommercialFactsCheck {
  completed: boolean;
  checkedAt?: string;
  sources?: string[];
  unsupportedClaims?: string[];
}

export interface ConfigurationFactsCheck {
  completed: boolean;
  checkedAt?: string;
  sources?: string[];
  unsupportedClaims?: string[];
}

export interface OperationalClaimsCheck {
  completed: boolean;
  checkedAt?: string;
  sources?: string[];
  unsupportedClaims?: string[];
  materialBlockers?: string[];
  notes?: string;
}

export interface CatalogInventoryCheck {
  completed: boolean;
  checkedAt?: string;
  sources?: string[];
  unsupportedClaims?: string[];
  claims?: string[];
  notes?: string;
}

export interface AccessParityCheck {
  completed: boolean;
  checkedAt?: string;
  sources?: string[];
  unsupportedClaims?: string[];
  claims?: string[];
  notes?: string;
}

export type CatalogClaimsCheck = CatalogInventoryCheck;

export interface RoutingIntegrity {
  deviceHandoffs?: string[];
  playerHandoffs?: string[];
  troubleshootingHandoffs?: string[];
  protocolGuides?: string[];
  issues?: string[];
}

export interface FactCheck {
  completed: boolean;
  checkedAt?: string;
  sources?: string[];
  unsupportedClaims?: string[];
  commercialFacts?: CommercialFactsCheck;
  configurationFacts?: ConfigurationFactsCheck;
  operationalClaims?: OperationalClaimsCheck;
  catalogInventory?: CatalogInventoryCheck;
  catalogClaims?: CatalogClaimsCheck;
  accessParity?: AccessParityCheck;
}

export interface AcceptedRisk {
  id: string;
  category: string;
  claim: string;
  reason: string;
  acceptedByOwner: boolean;
  acceptedAt: string;
}

export type ReleaseStatus = 'PUBLISH READY' | 'PUBLISH WITH ACCEPTED RISK' | 'NOT READY';
export type QualityStatus = 'FULLY VERIFIED' | 'PARTIALLY VERIFIED' | 'NOT FULLY VERIFIED';

export interface ReleaseEvaluation {
  releaseStatus: ReleaseStatus;
  qualityStatus: QualityStatus;
  blockers: string[];
  unacceptedBlockers: string[];
  acceptedRisks: AcceptedRisk[];
}

export interface ContentQualityEntry {
  url: string;
  kind: 'content' | 'legal';
  pageType?: PageType;
  primaryTopic?: string;
  primaryQuery?: string;
  uniqueUrlJob?: string;
  intent?: { type: 'informational' | 'commercial' | 'transactional' | 'navigational' | 'troubleshooting'; description: string };
  serpResearch?: SerpResearch;
  /** Aggregate hypothesis; query-level judgments belong in ownershipAssessments. */
  ownershipOutcome?: OwnershipOutcome;
  ownershipRationale?: string;
  ownershipAssessments?: OwnershipAssessment[];
  purpose?: { statement: string; userTask: string; userProblem: string };
  outline?: { completed: boolean };
  effort?: { evidence: string[] };
  originality?: { originalValue: string[]; evidence?: string[]; evidenceIds?: string[] };
  commercialUtility?: CommercialUtility;
  experience?: { hasFirstHandExperience: boolean; evidence?: string[]; notes?: string };
  evidenceLog?: EvidenceRecord[];
  claimEvidence?: ClaimEvidenceMapping[];
  proposedOpportunities?: string[];
  factCheck?: FactCheck;
  routingIntegrity?: RoutingIntegrity;
  trust?: { passed: boolean; issues?: string[] };
  satisfaction?: { passed: boolean; unansweredQuestions?: string[] };
  acceptedRisks?: AcceptedRisk[];
  technicalSEO?: { indexable: boolean; canonicalValid: boolean; titleValid: boolean; descriptionValid: boolean; singleH1: boolean; crawlableInternalLinks: boolean; schemaValid: boolean | null; sitemapIncluded: boolean };
  internalLinks?: { incoming?: string[]; outgoing?: string[]; orphan: boolean };
  measurement?: { gscTracked: boolean; lastReviewed?: string };
  history?: { createdAt?: string; lastMeaningfulUpdate?: string; reviewedAt?: string };
  status: ContentStatus;
}

// Route ownership comes from site-routes. Empty editorial fields explicitly require review.
// Publication state is independent of the editorial QA state.
// Add documented editorial evidence here, keyed by an existing route path.
const editorialOverrides: Record<string, Partial<Omit<ContentQualityEntry, 'url' | 'kind'>>> = {
  '/': {
    primaryTopic: 'TryIPTV service overview',
    pageType: 'commercial',
    uniqueUrlJob: 'Introduce the service and route a visitor to plan comparison, trial evaluation, or setup help.',
    intent: { type: 'commercial', description: 'Evaluate whether TryIPTV is relevant before choosing a more specific next task.' },
    purpose: { statement: 'Summarize the service and direct visitors to the appropriate next page.', userProblem: 'A new visitor needs to understand what TryIPTV offers and where to go next.', userTask: 'Choose whether to compare plans, request a trial, or read setup guidance.' },
    serpResearch: {
      completed: true,
      searchDate: '2026-10-09',
      queries: [
        'iptv service',
        'best iptv service',
        'iptv provider',
        'iptv subscription',
        'best iptv',
        'iptv streaming service',
      ],
      dominantIntent: 'Commercial provider discovery and evaluation for head service/provider terms; direct transactional/plan comparison for subscription terms; comparative editorial evaluation for "best" terms',
      dominantResultTypes: [
        'Provider homepages',
        'Dedicated provider commercial landing pages',
        'Dedicated subscription and pricing pages',
        'Multi-provider comparison guides and review listicles',
      ],
      recurringSubtopics: [
        'Service description and inclusions',
        'Subscription duration and pricing',
        'Live channel and VOD catalog claims',
        'Device and app compatibility',
        'Free trial availability',
        'Login credentials and playlist formats',
        'Customer support and contact channels',
        'Refund policy and guarantee terms',
        'Activation expectations and timelines',
      ],
      recurringQuestions: [
        'What is an IPTV service and what does it include?',
        'How much does an IPTV subscription cost?',
        'Which devices and player apps are supported?',
        'Can I test the service with a trial before purchasing?',
        'What payment methods are supported and does it auto-renew?',
        'Which IPTV service is considered best based on multi-provider testing and reliability?',
      ],
      commonContentFormats: [
        'Provider commercial homepages with headline pricing, catalog highlights, device listings, and next-step CTAs',
        'Dedicated subscription/pricing landing pages with duration cards and checkout links',
        'Multi-provider comparison articles with feature scorecards, pros/cons, and testing criteria',
      ],
      commonTrustSignals: [
        'Uptime and server stability commitments',
        'Transparent fixed-term pricing without recurring auto-renewal',
        'Responsive customer support channels (e.g. WhatsApp and email)',
        'Documented refund terms and trial periods',
      ],
      commonCommercialElements: [
        'Plan durations and starting prices',
        'Channel and VOD library highlights',
        'Device compatibility badges',
        'Trial evaluation handoffs',
        'Direct checkout pathways',
      ],
      conflictingIntentSignals: [
        '"iptv subscription" shows strong dedicated pricing/plan page representation; broad service discovery begins on /, but explicit plan/duration/checkout intent aligns with /pricing.',
        '"best iptv service" and "best iptv" strongly favor multi-provider comparison/review formats over single-provider homepages; even provider-owned sites use dedicated blog/article comparison formats for "best" queries.',
      ],
      competingUrlTypes: [
        'Single-provider commercial homepages',
        'Dedicated provider commercial landing pages',
        'Dedicated subscription and pricing pages',
        'Multi-provider review and comparison guides',
      ],
      notes: 'External web-search research completed on 2026-10-09 across English-language and localized samples. This evidence represents source-linked observations of page types and intent patterns. It is NOT Google Search Console data, verified Google ranking positions, location-controlled Google SERP capture, search volume data, traffic estimates, or proof of ranking difficulty.',
      sources: [
        {
          query: 'iptv service',
          resultUrl: 'https://4kiptvsubs.com/iptv-provider/',
          observation: 'Provider-owned commercial page explaining what the provider supplies, plan lengths, device support, trial availability, channels/VOD, credentials, and support.',
        },
        {
          query: 'iptv service',
          resultUrl: 'https://visualisetv.net/',
          observation: 'Single-provider commercial homepage introducing the IPTV subscription, content access, pricing starting point, refund terms, activation expectations, payment options, and next-step CTAs.',
        },
        {
          query: 'iptv provider',
          resultUrl: 'https://4kiptvsubs.com/iptv-provider/',
          observation: 'Dedicated provider commercial page explicitly targeting provider discovery and explaining what the service supplies, subscription structure, device support, trial, and login formats.',
        },
        {
          query: 'iptv provider',
          resultUrl: 'https://iptvonlineprovider.com/en',
          observation: 'Provider homepage positioning itself as an IPTV provider, presenting service inclusions, subscription plans, devices, support, and purchase pathways.',
        },
        {
          query: 'iptv subscription',
          resultUrl: 'https://iptvonlineprovider.com/en/pricing',
          observation: 'Dedicated pricing/subscription page organized around subscription duration, upfront payment, plan inclusions, support, refund terms, and direct purchase.',
        },
        {
          query: 'iptv subscription',
          resultUrl: 'https://www.ottv.org/pricing',
          observation: 'Dedicated IPTV subscription pricing page with plan duration, total price, monthly equivalent, and plan comparison.',
        },
        {
          query: 'iptv subscription',
          resultUrl: 'https://www.redstreamtv.com/iptv-subscription',
          observation: 'Dedicated subscription landing page explaining what an IPTV subscription includes and presenting plan-oriented commercial context.',
        },
        {
          query: 'best iptv service',
          resultUrl: 'https://www.bestiptv.com/reviews/',
          observation: 'Review/comparison site using paid subscriptions, multi-device testing, peak-hour testing, pricing, reliability and pros/cons to compare providers.',
        },
        {
          query: 'best iptv service',
          resultUrl: 'https://bestiptvservices.net/best-iptv-services',
          observation: 'Multi-provider comparison page comparing providers, plan flexibility, device support, regional fit, terms, and buyer protections.',
        },
        {
          query: 'best iptv service',
          resultUrl: 'https://nixoniptv.com/iptv-service/',
          observation: 'Comparison article covering multiple providers with prices, trials, refund policies and pros/cons.',
        },
        {
          query: 'best iptv service',
          resultUrl: 'https://alltimeiptv.live/blog/best-iptv-service/',
          observation: 'Provider-owned site targeting "best IPTV service" using comparison/editorial article format rather than relying solely on a provider homepage.',
        },
        {
          query: 'best iptv service',
          resultUrl: 'https://titaniptv.live/blog/best-iptv-service/',
          observation: 'Provider-owned site targeting "best IPTV service" using comparison/editorial article format rather than relying solely on a provider homepage.',
        },
        {
          query: 'best iptv',
          resultUrl: 'https://www.bestiptv.com/',
          observation: 'Editorial review homepage centered on testing and comparing multiple IPTV providers.',
        },
        {
          query: 'best iptv',
          resultUrl: 'https://bestiptvservices.net/best-iptv-services',
          observation: 'Multi-provider comparison guide.',
        },
        {
          query: 'best iptv',
          resultUrl: 'https://nixoniptv.com/iptv-service/',
          observation: 'Provider comparison article with side-by-side buyer criteria.',
        },
        {
          query: 'iptv streaming service',
          resultUrl: 'https://www.maxitv.live/en',
          observation: 'Provider homepage presenting an all-in-one IPTV subscription, content access, devices, service explanation, and commercial next steps.',
        },
        {
          query: 'iptv streaming service',
          resultUrl: 'https://iptvonlineprovider.com/en',
          observation: 'Provider homepage describing an online IPTV/streaming service and routing into subscription plans and service information.',
        },
      ],
    },
    ownershipOutcome: 'PLAUSIBLE',
    ownershipRationale: 'Homepage is a plausible candidate owner for broad provider/service-discovery concepts (iptv service, iptv provider, iptv streaming service). However, it is a weak candidate for "best" queries (best iptv, best iptv service) which require comparative editorial evaluation, and has conflicting overlap with /pricing for explicit subscription/pricing intent.',
    ownershipAssessments: [
      {
        query: 'iptv service',
        userProblem: 'Discover what an IPTV service offers, evaluate provider credibility, and find subscription/trial options.',
        dominantIntent: 'Broad commercial / service discovery',
        expectedPageType: 'Provider commercial homepage or service overview landing page',
        expectedContentFormat: 'Service introduction, channel/VOD highlights, device support, trial CTA, pricing preview',
        existingOwnerUrl: '/',
        outcome: 'PLAUSIBLE',
      },
      {
        query: 'best iptv service',
        userProblem: 'Find the top-rated IPTV service through side-by-side comparison, benchmarks, and multi-provider testing.',
        dominantIntent: 'Comparative commercial investigation',
        expectedPageType: 'Multi-provider comparison guide or editorial review roundup',
        expectedContentFormat: 'Provider comparison table, testing methodology, reliability criteria, pros/cons',
        existingOwnerUrl: '/',
        outcome: 'WEAK',
      },
      {
        query: 'iptv provider',
        userProblem: 'Find a reputable IPTV vendor/provider to supply live streams, VOD, and credentials.',
        dominantIntent: 'Commercial vendor discovery',
        expectedPageType: 'Provider homepage or dedicated provider commercial landing page',
        expectedContentFormat: 'Vendor capabilities, package overview, activation details, device support, contact options',
        existingOwnerUrl: '/',
        outcome: 'PLAUSIBLE',
      },
      {
        query: 'iptv subscription',
        userProblem: 'Evaluate and purchase an IPTV subscription package with clear pricing, duration, and billing terms.',
        dominantIntent: 'Commercial investigation / transactional purchase',
        expectedPageType: 'Dedicated pricing/subscription page or provider homepage',
        expectedContentFormat: 'Duration options, upfront and monthly pricing, feature inclusions, checkout pathways',
        existingOwnerUrl: 'Unresolved: / vs /pricing',
        outcome: 'CONFLICTING',
      },
      {
        query: 'best iptv',
        userProblem: 'Identify the highest-quality IPTV services across the market based on third-party reviews and rankings.',
        dominantIntent: 'Comparative commercial investigation',
        expectedPageType: 'Independent buyer guide, review directory, or comparison article',
        expectedContentFormat: 'Comparative scorecards, top picks by use case, pros and cons, testing summary',
        existingOwnerUrl: '/',
        outcome: 'WEAK',
      },
      {
        query: 'iptv streaming service',
        userProblem: 'Learn about IPTV-based streaming services as a TV alternative and evaluate service inclusions.',
        dominantIntent: 'Commercial service discovery',
        expectedPageType: 'Provider homepage or service discovery page',
        expectedContentFormat: 'Service explanation, streaming features, device compatibility, plan options, trial link',
        existingOwnerUrl: '/',
        outcome: 'PLAUSIBLE',
      },
    ],
    commercialUtility: {
      applicable: true,
      passed: true,
      verifiedFacts: [
        'Four fixed-term plan durations: 1 Month ($15.82), 3 Months ($38.30), 6 Months ($59.15), and 12 Months ($88.23)',
        '2 simultaneous connections across all fixed-term plans',
        'Fixed-term billing with zero automatic renewal or hidden recurring charges',
        'Evaluation trial alternative: 24 hours at $0',
        'Contextual handoffs to dedicated pricing comparison (/pricing) and universal setup guide (/setup)',
      ],
      evidenceIds: [
        'pricing-plans-product-truth',
        'pricing-connections-product-truth',
        'pricing-billing-terms-product-truth',
        'trial-cost-product-truth',
      ],
      issues: [],
    },
    originality: { originalValue: [] },
    factCheck: {
      completed: false,
      sources: [
        'src/lib/site-config.ts:4-25',
        'src/lib/site-data/pricing.ts:2-83',
        'src/lib/site-data/faq.ts:2-43',
        'src/app/terms-conditions/page.tsx:64-81',
      ],
      unsupportedClaims: [],
      commercialFacts: {
        completed: true,
        checkedAt: '2026-10-09',
        sources: [
          'src/lib/site-config.ts:4-25',
          'src/lib/site-data/pricing.ts:2-83',
          'src/app/page.tsx',
          'src/components/sections/HomePricing.tsx',
          'src/components/sections/Hero.tsx',
          'src/components/sections/CTA.tsx',
          'src/lib/site-data/faq.ts',
        ],
        unsupportedClaims: [],
      },
      operationalClaims: {
        completed: false,
        checkedAt: '2026-10-09',
        sources: [
          'src/app/page.tsx:20',
          'src/components/sections/Hero.tsx:8-12',
          'src/components/sections/WhyChooseTryIPTV.tsx:10-17',
        ],
        unsupportedClaims: [],
        materialBlockers: [],
        notes: 'Catalog counts (25,000+ live channels worldwide, 120,000+ movies and TV shows) and broadcast resolutions (4K Ultra HD) are asserted in copy but lack empirical repository verification logs. Under the materiality rule, these qualified claims surface as a warning rather than blocking commercial overview.',
      },
    },
    trust: {
      passed: false,
      issues: [
        'The "Best IPTV Service" superlative is owner-protected brand positioning; empirical comparative benchmarks are not recorded in repository.',
      ],
    },
    satisfaction: {
      passed: true,
      unansweredQuestions: [],
    },
    acceptedRisks: [
      {
        id: 'owner-protected-best-superlative',
        category: 'Unverified comparative promotional claim',
        claim: 'Best IPTV Service in USA, UK & Worldwide',
        reason: 'Owner-protected public brand positioning; empirical comparative benchmarks are not recorded in repository. Owner knowingly preserves wording.',
        acceptedByOwner: true,
        acceptedAt: '2026-10-09',
      },
    ],
    evidenceLog: [
      {
        id: 'pricing-plans-product-truth',
        type: 'product-source-of-truth',
        title: 'Fixed-term plan prices, durations, and checkout links',
        description: 'PRODUCT_TRUTHS.plans and pricing data define the 4 fixed-term durations ($15.82, $38.30, $59.15, $88.23), monthly equivalents, fixed-term non-recurring billing, and FlujiPay checkout URLs.',
        recordedAt: '2026-10-09',
        source: 'src/lib/site-config.ts:19-24, src/lib/site-data/pricing.ts:2-83',
        relatedClaims: ['Fixed-term plan prices, durations, and checkout links'],
        verified: true,
      },
      {
        id: 'pricing-connections-product-truth',
        type: 'product-source-of-truth',
        title: 'Simultaneous connections per plan',
        description: 'PRODUCT_TRUTHS establishes 2 simultaneous connections across all 4 fixed-term plans.',
        recordedAt: '2026-10-09',
        source: 'src/lib/site-config.ts:9',
        relatedClaims: ['All fixed-term plans include 2 simultaneous connections'],
        verified: true,
      },
      {
        id: 'pricing-billing-terms-product-truth',
        type: 'product-source-of-truth',
        title: 'Fixed-term non-recurring billing terms',
        description: 'PRODUCT_TRUTHS.guarantee and terms establish flat fixed-term billing with zero automatic renewal or unexpected recurring charges.',
        recordedAt: '2026-10-09',
        source: 'src/lib/site-config.ts:8-18, src/app/terms-conditions/page.tsx:64-81',
        relatedClaims: ['Fixed-term non-recurring billing'],
        verified: true,
      },
      {
        id: 'trial-cost-product-truth',
        type: 'product-source-of-truth',
        title: '24-hour trial price',
        description: 'PRODUCT_TRUTHS establishes the 24-hour trial price as $0. This verifies zero monetary price, but does not independently establish payment-method or credit card collection terms.',
        recordedAt: '2026-10-09',
        source: 'src/lib/site-config.ts:11',
        relatedClaims: ['Trial price is $0'],
        verified: true,
      },
    ],
  },
  '/pricing': {
    primaryTopic: 'TryIPTV fixed-term subscription plans and pricing',
    pageType: 'transactional',
    uniqueUrlJob: 'Compare the four fixed-term plan durations, upfront costs, monthly equivalents, 2 simultaneous connections, and included terms before choosing a plan.',
    intent: { type: 'transactional', description: 'Compare plan terms and select a fixed-term subscription.' },
    purpose: { statement: 'Present the plan comparison, 2 simultaneous connections, and checkout choices.', userProblem: 'A prospective buyer needs to know total cost, duration, included features (including 2 simultaneous connections), accepted payment methods, and renewal terms.', userTask: 'Compare four plans and choose a fixed-term duration.' },
    serpResearch: {
      completed: true,
      searchDate: '2026-10-09',
      queries: [
        'iptv pricing',
        'iptv plans',
        'iptv subscription price',
        'iptv subscription plans',
        'iptv subscription',
        'best iptv plans',
      ],
      dominantIntent: 'Commercial investigation and transactional for pricing/plan queries; broader commercial for generic subscription; comparison-heavy for best plans',
      dominantResultTypes: [
        'Provider pricing pages',
        'Broader subscription pages',
        'Comparison / decision guides',
      ],
      recurringSubtopics: [
        'Plan duration',
        'Upfront price',
        'Monthly equivalent',
        'Savings compared with shorter duration',
        'Simultaneous connections/screens',
        'Plan inclusions',
        'Renewal behavior',
        'Trial availability',
        'Payment information',
        'Activation information',
        'Refund/guarantee information',
        'Checkout/contact CTA',
      ],
      recurringQuestions: [
        'How much does an IPTV subscription cost?',
        'What is the monthly equivalent rate for longer durations?',
        'How many devices or connections can stream at the same time?',
        'Does the subscription renew automatically or is it fixed-term?',
        'What payment methods can be used?',
        'Is there a trial available before paying?',
      ],
      commonContentFormats: [
        'Dedicated plan duration cards with upfront cost and monthly equivalent',
        'Side-by-side comparison table detailing connections and billing type',
        'Buyer guide explaining how to choose a duration',
        'Pricing FAQ answering billing, activation, and refund policies',
      ],
      commonTrustSignals: [
        'Transparent upfront pricing without hidden recurring charges',
        'Explicit simultaneous connection limits (2 connections for TryIPTV)',
        'Clear statement of fixed-term, non-recurring billing',
        'Documented refund policy and payment method options',
      ],
      commonCommercialElements: [
        'Plan cards with direct checkout CTAs',
        'Duration savings percentage indicators',
        'Effective monthly cost comparison',
        'Free trial evaluation cross-link',
      ],
      conflictingIntentSignals: [
        '"iptv subscription" is broader than price alone, spanning service scope, catalog, device setup, and brand credibility.',
        '"best iptv plans" favors third-party multi-provider comparisons/reviews rather than single-provider pricing landing pages.',
        'Competitors frequently use merchandising badges ("Popular", "Most chosen", "Best value"); TryIPTV does not adopt unsupported popularity claims without first-party evidence.',
      ],
      competingUrlTypes: [
        'Provider dedicated pricing page',
        'Provider broad subscription page',
        'Third-party comparison guide / review listicle',
        'Provider homepage',
      ],
      notes: 'External web-search evidence dated 2026-10-09. This represents external source-linked research completed, NOT verified Google rank-position capture, location-controlled Google SERP capture, search volume, or traffic potential data. Expected page type for pricing/plan queries: dedicated provider pricing page with transparent rates, upfront vs monthly breakdown, simultaneous connection disclosure, and checkout handoff.',
      sources: [
        {
          query: 'iptv pricing',
          resultUrl: 'https://kosmosweb.ma/iptv-maroc-prix',
          observation: 'Dedicated pricing page with 1/3/6/12-month prices, monthly cost, savings versus monthly, screen count, and plan characteristics.',
        },
        {
          query: 'iptv pricing',
          resultUrl: 'https://iptivo.com/pricing-iptv/',
          observation: 'Provider pricing page comparing several product tiers across 1/3/6/12-month durations, with pricing, login formats, device guidance, and plan comparison.',
        },
        {
          query: 'iptv pricing',
          resultUrl: 'https://www.digitalmarpro.com/',
          observation: 'Provider commercial page with plan prices, monthly equivalents, plan inclusions, activation language, refund positioning, and purchase CTAs.',
        },
        {
          query: 'iptv subscription',
          resultUrl: 'https://kosmosweb.ma/abonnement',
          observation: 'Subscription-focused page explains duration, renewal/recharge, pricing, monthly equivalents, screens, and when the subscription period begins.',
        },
        {
          query: 'iptv subscription',
          resultUrl: 'https://www.dorval.ma/abonnement-iptv/',
          observation: 'Subscription page compares 1/3/6/12-month durations, monthly equivalent, inclusions, and renewal context.',
        },
        {
          query: 'iptv subscription',
          resultUrl: 'https://digitalmania.ma/tv/abonnement-iptv-maroc/',
          observation: 'Provider subscription landing page combines package selection, pricing, content, devices/support, trial handoff, and purchase intent.',
        },
        {
          query: 'best iptv plans',
          resultUrl: 'https://sellinium.ma/comparer-formules',
          observation: 'Decision-oriented guide comparing plans by price, content, quality, connection and user fit.',
        },
        {
          query: 'best iptv plans',
          resultUrl: 'https://strea.ma/article/quelle-formule-d-abonnement-iptv-au-maroc-pour-votre-foyer',
          observation: 'Explains how users should choose a subscription based on screens, confidence in the service, payment, duration, and household needs.',
        },
        {
          query: 'iptv plans',
          resultUrl: 'https://ma.eur.ma/article/abonnement-iptv-maroc-lire-les-tarifs-et-les-formules',
          observation: 'Pricing analysis emphasizes upfront price, monthly equivalent, included screens and duration.',
        },
      ],
    },
    ownershipOutcome: 'PLAUSIBLE',
    ownershipRationale: 'External evidence supports dedicated provider pricing/plan pages for explicit pricing and plan-comparison queries. However, broad "iptv subscription" intent extends beyond pricing, "best iptv plans" is comparison-heavy, and exact Google ranking positions and geographic consistency are NOT VERIFIED.',
    ownershipAssessments: [
      {
        query: 'iptv pricing',
        userProblem: 'Understand IPTV pricing structures and compare costs before purchase.',
        dominantIntent: 'Commercial investigation / transactional',
        expectedPageType: 'Dedicated pricing or provider commercial page',
        expectedContentFormat: 'Plan durations, upfront prices, monthly equivalents, included terms and CTA',
        existingOwnerUrl: '/pricing',
        outcome: 'PLAUSIBLE',
      },
      {
        query: 'iptv plans',
        userProblem: 'Compare available plan options and choose a suitable duration/package.',
        dominantIntent: 'Commercial investigation / transactional',
        expectedPageType: 'Provider pricing/plan comparison page',
        expectedContentFormat: 'Plan durations, upfront and monthly rates, feature inclusions, and purchase CTA',
        existingOwnerUrl: '/pricing',
        outcome: 'PLAUSIBLE',
      },
      {
        query: 'iptv subscription price',
        userProblem: 'Determine the cost of purchasing an IPTV subscription.',
        dominantIntent: 'Commercial investigation with strong transactional proximity',
        expectedPageType: 'Pricing or subscription landing page with transparent prices',
        expectedContentFormat: 'Transparent pricing, duration choices, billing terms, and checkout access',
        existingOwnerUrl: '/pricing',
        outcome: 'PLAUSIBLE',
      },
      {
        query: 'iptv subscription plans',
        userProblem: 'Compare subscription durations/packages before choosing.',
        dominantIntent: 'Commercial investigation / transactional',
        expectedPageType: 'Pricing or subscription plan comparison page',
        expectedContentFormat: 'Side-by-side plan comparison, duration options, connection limits, and subscription terms',
        existingOwnerUrl: '/pricing',
        outcome: 'PLAUSIBLE',
      },
      {
        query: 'iptv subscription',
        userProblem: 'Broader provider/subscription discovery and purchase evaluation.',
        dominantIntent: 'Broad commercial / transactional',
        expectedPageType: 'Provider subscription page, commercial overview, or homepage',
        expectedContentFormat: 'Service overview, package selection, content highlights, device support, trial handoff, and pricing',
        existingOwnerUrl: 'Unresolved: / vs /pricing',
        outcome: 'CONFLICTING',
      },
      {
        query: 'best iptv plans',
        userProblem: 'Compare/recommend plan options or providers to identify the best choice.',
        dominantIntent: 'Comparison-heavy commercial investigation',
        expectedPageType: 'Comparison/recommendation content',
        expectedContentFormat: 'Multi-provider comparison, criteria breakdown, and recommendations',
        existingOwnerUrl: '/pricing',
        outcome: 'WEAK',
      },
    ],
    originality: { originalValue: [] },
    commercialUtility: {
      applicable: true,
      passed: true,
      verifiedFacts: [
        'Four fixed-term plan durations: 1 Month, 3 Months, 6 Months, and 12 Months',
        'Upfront prices ($15.82, $38.30, $59.15, $88.23) and effective monthly equivalents ($15.82, $12.77, $9.86, $7.35)',
        '2 simultaneous connections across all 4 plans',
        'Accepted payment methods: Cryptocurrency, PayPal, Stripe',
        'Fixed-term billing with zero automatic renewal',
        'Direct functional checkout links per duration',
        'Refund policy handoff (7-day technical evaluation policy)',
        'Evaluation trial alternative: 24 hours at $0',
      ],
      evidenceIds: [
        'pricing-plans-product-truth',
        'pricing-payment-methods-user-truth',
        'pricing-connections-product-truth',
        'trial-cost-product-truth',
      ],
      issues: [],
    },
    factCheck: {
      completed: false,
      sources: [
        'User business specification: Cryptocurrency, PayPal, Stripe (2026-10-09)',
        'src/lib/site-config.ts:4-25',
        'src/lib/site-data/pricing.ts:2-83',
        'src/app/pricing/page.tsx:102-153',
        'src/app/terms-conditions/page.tsx:64-67',
        'src/app/refund-policy/page.tsx:69-72',
      ],
      unsupportedClaims: [],
      commercialFacts: {
        completed: true,
        checkedAt: '2026-10-09',
        sources: [
          'User business specification: Cryptocurrency, PayPal, Stripe (2026-10-09)',
          'src/lib/site-config.ts:4-25',
          'src/lib/site-data/pricing.ts:2-83',
          'src/app/pricing/page.tsx:102-153',
          'src/app/terms-conditions/page.tsx:64-67',
          'src/app/refund-policy/page.tsx:69-72',
        ],
        unsupportedClaims: [],
      },
      operationalClaims: {
        completed: false,
        checkedAt: '2026-10-09',
        sources: [
          'src/lib/site-config.ts:12',
          'src/app/pricing/page.tsx:342',
        ],
        unsupportedClaims: [],
        materialBlockers: [],
        notes: 'Delivery within 5–15 minutes is configured in PRODUCT_TRUTHS.activationTime and qualified in copy ("typically within 5–15 minutes"), but lacks empirical fulfillment logs. Under the materiality rule, this is a non-material qualified operational estimate that surfaces as a warning rather than invalidating verified commercial pricing facts.',
      },
    },
    trust: { passed: true, issues: [] },
    satisfaction: { passed: true, unansweredQuestions: [] },
    evidenceLog: [
      { id: 'pricing-plans-product-truth', type: 'product-source-of-truth', title: 'Fixed-term plan prices, durations, and checkout links', description: 'PRODUCT_TRUTHS.plans and pricing data define the 4 fixed-term durations ($15.82, $38.30, $59.15, $88.23), monthly equivalents, fixed-term non-recurring billing, and FlujiPay checkout URLs.', recordedAt: '2026-10-09', source: 'src/lib/site-config.ts:19-24, src/lib/site-data/pricing.ts:2-83', relatedClaims: ['Fixed-term plan prices, durations, and checkout links'], verified: true },
      { id: 'pricing-payment-methods-user-truth', type: 'product-source-of-truth', title: 'Accepted payment methods', description: 'User verified accepted payment methods as Cryptocurrency, PayPal, and Stripe on 2026-10-09, updating earlier crypto-only assumption.', recordedAt: '2026-10-09', source: 'User business specification', relatedClaims: ['Payment methods include cryptocurrency, PayPal, and Stripe'], verified: true },
      { id: 'pricing-connections-product-truth', type: 'product-source-of-truth', title: 'Simultaneous connections per plan', description: 'PRODUCT_TRUTHS establishes 2 simultaneous connections across all 4 fixed-term plans.', recordedAt: '2026-10-09', source: 'src/lib/site-config.ts:9', relatedClaims: ['All fixed-term plans include 2 simultaneous connections'], verified: true },
      { id: 'trial-cost-product-truth', type: 'product-source-of-truth', title: '24-hour trial price', description: 'PRODUCT_TRUTHS establishes the 24-hour trial price as $0. This verifies zero monetary price, but does not independently establish payment-method or credit card collection terms.', recordedAt: '2026-10-09', source: 'src/lib/site-config.ts:11', relatedClaims: ['Trial price is $0'], verified: true },
    ],
    claimEvidence: [
      { claim: 'No credit card is required for the trial', claimClass: 'first-party-business', requiredEvidence: ['product-source-of-truth', 'operational-record', 'first-hand-test'], evidenceIds: [] },
    ],
  },
  '/iptv-free-trial': {
    primaryTopic: 'TryIPTV 24-hour free trial',
    pageType: 'transactional',
    uniqueUrlJob: 'Help a prospective customer start a TryIPTV trial and use the available trial window to determine whether the service works for their actual device, connection, login method, and viewing needs before paying.',
    intent: { type: 'transactional', description: 'Transactional trial request with commercial investigation of service suitability before purchase.' },
    purpose: { statement: 'Guide trial request, setup handoff, testing, and expiration expectations.', userProblem: 'The visitor wants to try an IPTV service before paying and determine whether it works satisfactorily on their device, connection, and preferred content.', userTask: 'Request a 24-hour trial and evaluate streams on their device.' },
    serpResearch: {
      completed: true,
      searchDate: '2026-10-09',
      queries: ['iptv free trial', 'iptv free trial no credit card', 'best iptv free trial', '24 hour iptv trial', 'free iptv trial', 'iptv trial before buying'],
      dominantIntent: 'Transactional + commercial investigation',
      dominantResultTypes: ['Provider-specific free-trial landing pages', 'Trial comparison/list pages', 'How-to-test-before-buying guides', 'No-credit-card guides'],
      recurringSubtopics: ['Trial duration', 'Credit card or payment requirement', 'Trial request', 'Credential delivery', 'Xtream Codes and M3U login', 'Device compatibility', 'Player compatibility', 'Buffering and stability testing', 'Peak-time testing', 'Sports and live-event testing', 'EPG and VOD testing', 'Trial expiry', 'Full versus limited access'],
      recurringQuestions: ['Is the trial really free?', 'Is a credit card required?', 'How long does the trial last?', 'How are login credentials delivered?', 'What player is needed?', 'Does it work on Firestick, Smart TV, or Android?', 'What should be tested?', 'What happens after expiry?', 'Will there be an automatic charge?', 'Is it the same service as the paid subscription?'],
      commonContentFormats: ['Provider trial offer and request page', 'Trial comparison/list page', 'Practical pre-purchase testing guide'],
      commonTrustSignals: ['No-card requirement', 'Clear trial duration', 'No-auto-renewal or expiry terms', 'Ability to test on the intended device before purchase'],
      commonCommercialElements: ['Trial request CTA', 'Access and delivery terms', 'Device and player compatibility', 'Paid-plan handoff after evaluation'],
      conflictingIntentSignals: ['The “best iptv free trial” modifier favors comparison/list content over one provider page.', 'Broad free-trial queries mix provider offers with comparison and evaluation guides.'],
      competingUrlTypes: ['Provider trial landing page', 'Comparison/list page', 'Evaluation guide', 'No-card guide'],
      notes: 'User-supplied external web-search evidence dated 2026-10-09, with result URLs and observations below; this is not a verified Google rank-position capture or country-specific Google SERP. Expected page type: provider-specific transactional/commercial-investigation trial landing page. Expected format: concise facts, request CTA, verified no-card terms, delivery process, setup handoff, evaluation checklist, expiry explanation, FAQ. Search volume, traffic, ranking positions, geographic consistency, and first-hand TryIPTV testing remain NOT VERIFIED. The proposed first-party testing framework is an opportunity, not completed originality evidence.',
      sources: [
        { query: 'iptv free trial', resultUrl: 'https://www.ottv.org/iptv-free-trial', observation: 'Provider page leads with a 24-hour no-card test, no auto-renewal, supported devices, M3U/Xtream login, and testing quality before purchase.' },
        { query: 'iptv free trial', resultUrl: 'https://www.tereatv.com/trial/', observation: 'Provider trial page emphasizes 24-hour access, no card or auto-renewal, compatibility, and testing streams, channels, and EPG before purchase.' },
        { query: 'iptv free trial', resultUrl: 'https://playmaxtv.com/free-trial/', observation: 'Provider landing page presents the trial as a pre-purchase test on the user’s real device and for actual viewing needs.' },
        { query: 'iptv free trial no credit card', resultUrl: 'https://www.youriptvstore.com/blog/iptv-free-trial-no-credit-card', observation: 'Guide focuses on obtaining access without payment details, what a real trial includes, and testing within the limited window.' },
        { query: 'iptv free trial no credit card', resultUrl: 'https://www.the-best-iptv.com/best-free-iptv-trial-no-credit-card/', observation: 'Comparison page emphasizes no-card access, durations, provider comparison, and testing before purchase.' },
        { query: 'iptv free trial no credit card', resultUrl: 'https://thebestiptvsubscription.com/best-iptv-free-trial-in-2026-no-credit-card-options-to-test-before-you-buy/', observation: 'Page treats no-card access as a trust criterion and ties the trial to peak-hour testing before subscribing.' },
        { query: 'best iptv free trial', resultUrl: 'https://www.bestiptvguide.com/blog/iptv-free-trial/', observation: 'Comparison page covers trial length, pricing, pros and cons, and a 24-hour test plan.' },
        { query: 'best iptv free trial', resultUrl: 'https://ottv.vercel.app/blog/best-iptv-free-trial', observation: 'Comparison-oriented page frames best as a useful evaluation: 24h or more, full access, no card, compatibility, and peak-hour testing.' },
        { query: 'best iptv free trial', resultUrl: 'https://www.bestiptvfinder.com/iptv-free-trial-offer/', observation: 'Comparison/list page focuses on testing channels, VOD, stability, devices, and support before commitment.' },
        { query: '24 hour iptv trial', resultUrl: 'https://www.tereatv.com/trial/', observation: 'Dedicated provider page centers on a 24-hour trial.' },
        { query: '24 hour iptv trial', resultUrl: 'https://www.ottv.org/iptv-free-trial', observation: 'Dedicated provider page presents an explicit 24-hour test period.' },
        { query: '24 hour iptv trial', resultUrl: 'https://playmaxtv.com/free-trial/', observation: 'Dedicated free-trial page centers on a 24-hour no-card test.' },
        { query: 'free iptv trial', resultUrl: 'https://www.the-best-iptv.com/iptv-free-trial/', observation: 'Comparison page explains evaluation of content, quality, compatibility, and hidden costs before purchase.' },
        { query: 'free iptv trial', resultUrl: 'https://earthweb.com/iptv-free-trials/', observation: 'Roundup frames trials as a way to evaluate service quality and avoid surprise charges.' },
        { query: 'free iptv trial', resultUrl: 'https://www.firesticktvstream.com/best-iptv-free-trial-guide/', observation: 'Guide/comparison covers legitimacy, buffering, resolution, EPG, devices, and support.' },
        { query: 'iptv trial before buying', resultUrl: 'https://purevisionhd.ca/iptv-trial-before-buying-what-to-check', observation: 'Guide defines the task as checking channel lineup, stability, sports, and compatibility before buying.' },
        { query: 'iptv trial before buying', resultUrl: 'https://iptv-nexus.net/how-to-test-iptv-free-trial/', observation: 'Evaluation guide covers priority channels, peak-time testing, EPG, device and internet conditions, and technical checks.' },
        { query: 'iptv trial before buying', resultUrl: 'https://www.bestiptvguide.com/blog/iptv-free-trial/', observation: 'Guide includes a practical trial-testing plan before subscription.' },
      ],
    },
    ownershipOutcome: 'PLAUSIBLE',
    ownershipRationale: 'Source-linked user-supplied web evidence shows provider trial pages for transactional and 24-hour variants. Broad queries mix page types; “best iptv free trial” is comparison-heavy. Exact Google positions and location-specific SERPs remain NOT VERIFIED.',
    ownershipAssessments: [
      { query: 'iptv free trial', userProblem: 'Try a service and evaluate it before paying.', dominantIntent: 'Transactional + commercial investigation', expectedPageType: 'Provider free-trial landing page', expectedContentFormat: 'Trial offer, request CTA, terms, and evaluation guidance', existingOwnerUrl: '/iptv-free-trial', outcome: 'PLAUSIBLE' },
      { query: 'iptv free trial no credit card', userProblem: 'Avoid payment commitment or surprise billing while testing.', dominantIntent: 'Commercial investigation with transactional trial interest', expectedPageType: 'No-card guide, comparison, or provider trial page', expectedContentFormat: 'No-card terms, trial conditions, and testing guidance', existingOwnerUrl: '/iptv-free-trial', outcome: 'PLAUSIBLE' },
      { query: 'best iptv free trial', userProblem: 'Compare trial options before choosing a provider.', dominantIntent: 'Comparison-heavy commercial investigation', expectedPageType: 'Provider comparison/list page', expectedContentFormat: 'Multi-provider comparison and evaluation criteria', existingOwnerUrl: '/iptv-free-trial', outcome: 'WEAK' },
      { query: '24 hour iptv trial', userProblem: 'Find a 24-hour test before purchase.', dominantIntent: 'Transactional', expectedPageType: 'Provider trial landing page', expectedContentFormat: '24-hour terms and request CTA', existingOwnerUrl: '/iptv-free-trial', outcome: 'PLAUSIBLE' },
      { query: 'free iptv trial', userProblem: 'Find free evaluation access before purchase.', dominantIntent: 'Mixed transactional and commercial investigation', expectedPageType: 'Provider page, comparison, or evaluation guide', expectedContentFormat: 'Trial terms and practical evaluation information', existingOwnerUrl: '/iptv-free-trial', outcome: 'PLAUSIBLE' },
      { query: 'iptv trial before buying', userProblem: 'Learn what to test before committing.', dominantIntent: 'Evaluation-oriented commercial investigation', expectedPageType: 'Pre-purchase evaluation guide or provider trial page', expectedContentFormat: 'Practical testing framework and trial handoff', existingOwnerUrl: '/iptv-free-trial', outcome: 'PLAUSIBLE' },
    ],
    commercialUtility: {
      applicable: true,
      passed: true,
      verifiedFacts: [
        'Stated 24-hour evaluation pass duration',
        'Trial price is $0 with zero upfront payment',
        'Direct functional WhatsApp trial request endpoint',
        'Contextual handoffs to universal setup (/setup), device guides, and player guides',
      ],
      evidenceIds: [
        'trial-cost-product-truth',
        'trial-duration-product-truth',
        'trial-cta-product-truth',
        'trial-routing-product-truth',
      ],
      issues: [],
    },
    originality: { originalValue: [] },
    evidenceLog: [
      { id: 'trial-cost-product-truth', type: 'product-source-of-truth', title: '24-hour trial cost is $0', description: 'PRODUCT_TRUTHS establishes the 24-hour trial price as $0. This verifies zero monetary price, but does not independently establish payment-method or credit card collection terms.', source: 'src/lib/site-config.ts:11', relatedClaims: ['Trial price is $0'], verified: true },
      { id: 'trial-duration-product-truth', type: 'product-source-of-truth', title: 'Central trial duration', description: 'PRODUCT_TRUTHS declares a 24-hour trial; this verifies the stated business term, not actual account expiry.', source: 'src/lib/site-config.ts:10', relatedClaims: ['Stated trial duration is 24 hours'], verified: true },
      { id: 'trial-cta-product-truth', type: 'product-source-of-truth', title: 'Direct WhatsApp trial request endpoint', description: 'Direct WhatsApp CTA link configured on page (freeTrialWhatsAppUrl) provides functional onboarding route.', source: 'src/app/iptv-free-trial/page.tsx:35-36', relatedClaims: ['Trial request route exists'], verified: true },
      { id: 'trial-routing-product-truth', type: 'product-source-of-truth', title: 'Setup, device, and player routing handoffs', description: 'Contextual handoffs route trial users to universal setup (/setup), 8 device guides, and 7 player guides.', source: 'src/app/iptv-free-trial/page.tsx:195-236, 413', relatedClaims: ['Setup and device routing handoffs exist'], verified: true },
      { id: 'trial-activation-product-truth', type: 'product-source-of-truth', title: 'Central activation estimate', description: 'PRODUCT_TRUTHS states 5–15 minutes; no trial delivery timestamps or fulfillment records verify actual timing.', source: 'src/lib/site-config.ts:12', relatedClaims: ['Trial credentials arrive within 5–15 minutes'], verified: true },
      { id: 'fixed-term-billing-terms', type: 'first-party-documentation', title: 'Fixed-term subscription terms', description: 'Terms say paid subscriptions have no recurring auto-debits or automated renewals. They do not document trial account expiry or its external request flow.', source: 'src/app/terms-conditions/page.tsx:64', relatedClaims: ['Trial access stops after 24 hours without automatic billing'], verified: true },
      { id: 'setup-credential-formats', type: 'first-party-documentation', title: 'TryIPTV credential formats', description: 'Setup instructions say TryIPTV supplies Xtream Codes credentials and an M3U playlist URL; no trial account test is recorded.', source: 'src/app/setup/page.tsx:432', relatedClaims: ['Xtream Codes credentials authenticate in player', 'M3U playlist URL loads and parses in player'], verified: true },
      { id: 'tivimate-configuration-guide', type: 'first-party-documentation', title: 'TiviMate configuration instructions', description: 'The guide documents entering provider Xtream Codes or M3U details in TiviMate. It does not record a TryIPTV trial login test.', source: 'src/app/players/tivimate/page.tsx:103', relatedClaims: ['TryIPTV trial works with TiviMate'], verified: true },
    ],
    proposedOpportunities: ['Document a first-party trial evaluation procedure with real device, player, connection, peak-time, EPG, VOD, and channel observations before claiming original value.'],
    claimEvidence: [
      { claim: 'No card or payment data requested in observed trial fulfillment flow', claimClass: 'first-party-business', requiredEvidence: ['first-hand-test', 'operational-record'], evidenceIds: [] },
      { claim: 'Xtream Codes credentials authenticate in player', claimClass: 'first-party-business', requiredEvidence: ['first-hand-test', 'operational-record'], supportingEvidence: ['first-party-documentation'], evidenceIds: ['setup-credential-formats'] },
      { claim: 'M3U playlist URL loads and parses in player', claimClass: 'first-party-business', requiredEvidence: ['first-hand-test', 'operational-record'], supportingEvidence: ['first-party-documentation'], evidenceIds: ['setup-credential-formats'] },
      { claim: 'Live broadcast streams play with audio/video sync', claimClass: 'performance', requiredEvidence: ['first-hand-test'], evidenceIds: [] },
      { claim: 'Smart EPG TV guide populates active schedule listings', claimClass: 'first-party-business', requiredEvidence: ['first-hand-test', 'operational-record'], evidenceIds: [] },
      { claim: 'Sample VOD on-demand title streams successfully', claimClass: 'first-party-business', requiredEvidence: ['first-hand-test', 'operational-record'], evidenceIds: [] },
      { claim: 'Trial access ceases around stated 24-hour mark', claimClass: 'first-party-business', requiredEvidence: ['first-hand-test', 'operational-record'], evidenceIds: [] },
      { claim: 'Post-expiry stream requests and authentication are actively rejected', claimClass: 'first-party-business', requiredEvidence: ['first-hand-test', 'operational-record'], evidenceIds: [] },
      { claim: 'No automatic billing or forced subscription renewal occurs after trial', claimClass: 'first-party-business', requiredEvidence: ['first-hand-test', 'operational-record'], supportingEvidence: ['first-party-documentation'], evidenceIds: ['fixed-term-billing-terms'] },
      { id: 'trial-vod-entitlement-parity', claim: 'Complete on-demand VOD library fully unlocked during trial', claimClass: 'first-party-business', requiredEvidence: ['operational-record', 'product-source-of-truth'], supportingEvidence: ['first-party-documentation'], evidenceIds: [] },
      { id: 'trial-paid-access-parity', claim: 'Trial catalog matches paying subscriber access', claimClass: 'first-party-business', requiredEvidence: ['operational-record', 'product-source-of-truth'], supportingEvidence: ['first-party-documentation'], evidenceIds: [] },
      { claim: 'Trial credentials arrive within 5–15 minutes', claimClass: 'first-party-business', requiredEvidence: ['operational-record', 'support-observation'], supportingEvidence: ['product-source-of-truth'], evidenceIds: ['trial-activation-product-truth'], isOptional: true },
      { claim: 'TryIPTV trial works with TiviMate', claimClass: 'first-party-business', requiredEvidence: ['first-hand-test', 'product-source-of-truth'], supportingEvidence: ['first-party-documentation'], evidenceIds: ['tivimate-configuration-guide'], isOptional: true },
      { claim: 'Trial streams observed during evening peak hours (7–11 PM)', claimClass: 'performance', requiredEvidence: ['first-hand-test'], evidenceIds: [], isOptional: true },
    ],
    factCheck: {
      completed: false,
      sources: [
        'src/lib/site-config.ts:10-13',
        'src/app/iptv-free-trial/page.tsx:35-36',
        'src/app/setup/page.tsx:271',
        'src/app/terms-conditions/page.tsx:64-81',
        'src/lib/site-routes.ts:26-41',
      ],
      unsupportedClaims: [],
      catalogInventory: {
        completed: false,
        checkedAt: '2026-10-09',
        sources: [
          'src/app/iptv-free-trial/page.tsx:81',
          'src/app/iptv-free-trial/page.tsx:87',
          'src/lib/data/iptv-free-trial-page.ts:69',
        ],
        claims: [
          '25,000+ live channels worldwide',
          '120,000+ movies & TV shows on demand',
        ],
        unsupportedClaims: [],
        notes: 'Catalog volume assertions (25,000+ live channels worldwide, 120,000+ movies and TV shows) are publicly asserted in copy and schema but lack auditable provider export, backend inventory logs, or central database counts. Under the materiality policy, these count assertions surface as a non-blocking warning rather than halting trial evaluation.',
      },
      accessParity: {
        completed: false,
        checkedAt: '2026-10-09',
        sources: [
          'src/app/iptv-free-trial/page.tsx:87-90',
          'src/lib/data/iptv-free-trial-page.ts:69',
        ],
        claims: [
          'Complete on-demand VOD library fully unlocked during trial',
          'Trial catalog matches paying subscriber access',
        ],
        unsupportedClaims: [],
        notes: 'Public copy and schema assert full on-demand VOD unlock and catalog parity with paying subscribers. These are material access entitlement claims requiring provisioning configuration, account profile comparisons, or auditable backend fulfillment records. A sample playback test does not prove catalog-wide entitlement parity.',
      },
      operationalClaims: {
        completed: false,
        checkedAt: '2026-10-09',
        sources: [
          'src/lib/site-config.ts:12',
          'src/app/iptv-free-trial/page.tsx:128',
        ],
        unsupportedClaims: [],
        materialBlockers: [],
        notes: 'Credential delivery timing ("typically 5–15 minutes") is declared as a service estimate in PRODUCT_TRUTHS.activationTime and qualified in copy ("actual delivery time may vary"), but lacks empirical dispatch logs. This surfaces as a non-blocking warning under the materiality rule.',
      },
    },
    trust: { passed: true, issues: [] },
    satisfaction: { passed: true, unansweredQuestions: [] },
  },
  '/setup': {
    primaryTopic: 'Universal TryIPTV setup',
    pageType: 'functional-hub',
    uniqueUrlJob: 'Help a credential holder choose a device and player, select Xtream Codes or M3U, and follow the common setup sequence.',
    intent: { type: 'informational', description: 'Configure an existing trial or paid account on a compatible player.' },
    purpose: { statement: 'Provide a common setup sequence and route readers to device, player, or troubleshooting detail.', userProblem: 'A user has credentials but needs to configure a player on their device.', userTask: 'Select the right guide and enter credentials to verify playback.' },
    serpResearch: { completed: false },
    effort: {
      evidence: [
        'Information architecture: structured 7-step universal onboarding sequence from credential receipt to playback verification',
        'Device routing matrix: 10 dedicated device guides across streaming sticks, smart TVs, PCs, and set-top boxes',
        'Player directory: 7 dedicated player guides with protocol compatibility (Xtream Codes vs M3U) and multi-screen rules',
        'Protocol distinction: technical separation between Xtream Codes API (recommended) and M3U playlist URLs',
        'Self-help troubleshooting triage: 5 direct diagnostic paths for buffering, playback failure, login failure, playlist errors, and EPG missing data',
        'Third-party software boundary governance: explicit legal and architectural disclaimer distinguishing TryIPTV credential service from independent third-party player applications',
      ],
    },
    originality: { originalValue: [] },
    factCheck: {
      completed: false,
      sources: [
        'src/lib/site-config.ts:4-25',
        'src/app/setup/page.tsx',
        'src/app/terms-conditions/page.tsx:64-67',
        'src/lib/site-routes.ts:26-41',
      ],
      unsupportedClaims: [],
      configurationFacts: {
        completed: true,
        checkedAt: '2026-10-09',
        sources: [
          'src/lib/site-config.ts:4-25',
          'src/app/setup/page.tsx:169-212',
          'src/app/setup/page.tsx:288-348',
          'src/app/terms-conditions/page.tsx:64-67',
          'src/lib/site-routes.ts:49-90',
        ],
        unsupportedClaims: [],
      },
      operationalClaims: {
        completed: false,
        checkedAt: '2026-10-09',
        sources: [
          'src/app/setup/page.tsx:381',
          'src/app/setup/page.tsx:392',
        ],
        unsupportedClaims: [],
        materialBlockers: [],
        notes: 'Bandwidth recommendations (15–25 Mbps for 1080p, 40–50+ Mbps for 4K) are general planning guidelines rather than empirical network benchmarks. Under the materiality rule, these qualified guidelines surface as a warning and do not block functional onboarding.',
      },
    },
    routingIntegrity: {
      deviceHandoffs: [
        '/devices/firestick-iptv',
        '/devices/android-tv-iptv',
        '/devices/samsung-tv-iptv',
        '/devices/lg-tv-iptv',
        '/devices/apple-tv-iptv',
        '/devices/chromecast-iptv',
        '/devices/mag-box-iptv',
        '/devices/roku-iptv',
        '/devices/windows-iptv',
        '/devices/mac-iptv',
        '/devices',
      ],
      playerHandoffs: [
        '/players/tivimate',
        '/players/iptv-smarters',
        '/players/xciptv',
        '/players/televizo',
        '/players/perfect-player',
        '/players/ott-navigator',
        '/players/iptv-extreme',
        '/players',
      ],
      troubleshootingHandoffs: [
        '/help/iptv-buffering',
        '/help/iptv-not-working',
        '/help/iptv-login-not-working',
        '/help/m3u-not-loading',
        '/help/epg-not-working',
        '/help',
      ],
      protocolGuides: [
        '/guides/m3u-vs-xtream-codes',
        '/guides/what-are-xtream-codes',
        '/guides/what-is-m3u',
      ],
      issues: [],
    },
    trust: { passed: true, issues: [] },
    satisfaction: { passed: true, unansweredQuestions: [] },
  },
};

export const createContentQualityRegistry = (routes: SiteRoute[]): ContentQualityEntry[] => routes.filter((route) => route.indexable).map((route) => {
  const defaultPageType: PageType =
    route.section === 'legal'
      ? 'legal'
      : route.section === 'commercial'
      ? 'commercial'
      : route.section === 'help'
      ? 'troubleshooting'
      : 'editorial';

  return {
    url: route.path,
    kind: route.section === 'legal' ? 'legal' : 'content',
    pageType: defaultPageType,
    status: 'review',
    ...editorialOverrides[route.path],
  };
});

export function isVerifiedEvidence(record: EvidenceRecord): boolean {
  if (!record.verified || !record.id.trim() || !record.title.trim() || !record.description.trim() || !record.source?.trim()) return false;
  if (record.type === 'first-hand-test') return Boolean(record.recordedAt && record.testContext?.trim() && record.result?.trim());
  if (record.type === 'operational-record' || record.type === 'support-observation') return Boolean(record.recordedAt && record.result?.trim());
  if (record.type === 'screenshot' || record.type === 'customer-question') return Boolean(record.recordedAt);
  return true;
}

export function evaluateClaimEvidence(claim: ClaimEvidenceMapping, records: EvidenceRecord[]): GateResult {
  if (!claim.evidenceIds.length) return 'NOT VERIFIED';
  const linked = claim.evidenceIds.map((id) => records.find((record) => record.id === id));
  if (linked.some((record) => !record)) return 'WARNING';
  const permitted = (record: EvidenceRecord) => claim.requiredEvidence.includes(record.type)
    && (claim.claimClass === 'external-fact' || record.type !== 'external-source')
    && (claim.claimClass !== 'performance' || record.type === 'first-hand-test');
  if (linked.some((record) => record && permitted(record) && isVerifiedEvidence(record))) return 'PASS';
  if (linked.some((record) => record && claim.supportingEvidence?.includes(record.type) && isVerifiedEvidence(record))) return 'WARNING';
  if (linked.some((record) => record?.verified && !permitted(record))) return 'FAIL';
  return linked.some((record) => record?.verified) ? 'WARNING' : 'NOT VERIFIED';
}

export function summarizeEvidence(entry: ContentQualityEntry) {
  const records = entry.evidenceLog ?? [];
  return {
    externalResearchSources: entry.serpResearch?.sources?.length ?? 0,
    verifiedFirstHandTests: records.filter((record) => record.type === 'first-hand-test' && isVerifiedEvidence(record)).length,
    verifiedScreenshots: records.filter((record) => record.type === 'screenshot' && isVerifiedEvidence(record)).length,
    documentedOperationalRecords: records.filter((record) => record.type === 'operational-record' && isVerifiedEvidence(record)).length,
  };
}

export function evaluateCommercialUtility(entry: ContentQualityEntry, records: EvidenceRecord[]): GateResult | null {
  const cu = entry.commercialUtility;
  if (!cu || !cu.applicable) return null;
  if (cu.issues?.length) return 'FAIL';
  if (!cu.passed) return 'NOT VERIFIED';
  const facts = cu.verifiedFacts ?? [];
  const ids = cu.evidenceIds ?? [];
  if (!facts.length || !ids.length) return 'NOT VERIFIED';

  const linked = ids.map((id) => records.find((r) => r.id === id));
  if (linked.some((r) => !r || !r.verified)) return 'WARNING';

  const validTypes: EvidenceType[] = [
    'product-source-of-truth',
    'first-party-documentation',
    'operational-record',
  ];
  if (linked.some((r) => r && !validTypes.includes(r.type))) return 'FAIL';

  return 'PASS';
}

export function evaluateOriginality(entry: ContentQualityEntry, records: EvidenceRecord[]): GateResult {
  const originality = entry.originality?.originalValue ?? [];
  const invalidOriginality = /^(better seo|more keywords|longer article|optimized title|more internal links)$/i;
  const hasValidValue = originality.some((value) => !invalidOriginality.test(value.trim()));
  if (!hasValidValue) return 'NOT VERIFIED';

  const qualifyingTypes: EvidenceType[] = [
    'first-hand-test',
    'operational-record',
    'customer-question',
    'support-observation',
    'screenshot',
  ];

  const evidenceIds = entry.originality?.evidenceIds ?? [];
  if (!evidenceIds.length) return 'NOT VERIFIED';

  const linked = evidenceIds.map((id) => records.find((r) => r.id === id));
  if (linked.some((r) => !r || !r.verified)) return 'WARNING';

  const hasQualifying = linked.some(
    (r) => r && qualifyingTypes.includes(r.type) && isVerifiedEvidence(r)
  );

  return hasQualifying ? 'PASS' : 'NOT VERIFIED';
}

export function evaluateRoutingIntegrity(entry: ContentQualityEntry): GateResult {
  const routing = entry.routingIntegrity;
  if (!routing) return 'NOT VERIFIED';
  if (routing.issues?.length) return 'FAIL';

  const hasDevices = Boolean(routing.deviceHandoffs?.length);
  const hasPlayers = Boolean(routing.playerHandoffs?.length);
  const hasTroubleshooting = Boolean(routing.troubleshootingHandoffs?.length);

  if (hasDevices && hasPlayers && hasTroubleshooting) {
    return 'PASS';
  }

  return (hasDevices || hasPlayers || hasTroubleshooting) ? 'WARNING' : 'NOT VERIFIED';
}

export function evaluateTrialExperience(entry: ContentQualityEntry, records: EvidenceRecord[]): GateResult {
  const verifiedTests = records.filter((r) => r.type === 'first-hand-test' && isVerifiedEvidence(r));
  if (!verifiedTests.length) return 'NOT VERIFIED';

  const claims = entry.claimEvidence ?? [];
  const getStatus = (match: string) => {
    const c = claims.find((item) => item.claim.toLowerCase().includes(match.toLowerCase()));
    return c ? evaluateClaimEvidence(c, records) : 'NOT VERIFIED';
  };

  // Group A: Trial intake / no-card flow
  const groupA = getStatus('no card') === 'PASS';
  // Group B: Xtream authentication + relevant live playback
  const groupB = getStatus('xtream') === 'PASS' && getStatus('live broadcast') === 'PASS';
  // Group C: M3U loading + relevant playback
  const groupC = getStatus('m3u') === 'PASS';
  // Group D: Trial expiry lifecycle + post-expiry behavior
  const groupD = getStatus('stated 24-hour') === 'PASS' && getStatus('actively rejected') === 'PASS' && getStatus('automatic billing') === 'PASS';
  // Promised inclusions: EPG and sample VOD playback
  const inclusions = getStatus('epg') === 'PASS' && getStatus('sample vod') === 'PASS';

  return (groupA && groupB && groupC && groupD && inclusions) ? 'PASS' : 'NOT VERIFIED';
}

export function validateEditorial(entry: ContentQualityEntry): Record<string, GateResult> {
  if (entry.kind === 'legal') return {};
  const documented = (value?: string) => Boolean(value?.trim());
  const trial = entry.url === '/iptv-free-trial';
  const records = entry.evidenceLog ?? [];
  const claims = entry.claimEvidence ?? [];
  const materialClaims = trial ? claims.filter((c) => !c.isOptional) : claims;
  const materialStatuses = materialClaims.map((claim) => evaluateClaimEvidence(claim, records));
  const operationalEvidence: GateResult = materialStatuses.length && materialStatuses.every((status) => status === 'PASS') ? 'PASS'
    : materialStatuses.includes('FAIL') ? 'FAIL'
    : materialStatuses.includes('WARNING') ? 'WARNING' : 'NOT VERIFIED';
  const commercialUtility = evaluateCommercialUtility(entry, records);
  const hasSplitAccuracy = Boolean(
    entry.factCheck?.commercialFacts ||
    entry.factCheck?.configurationFacts
  );

  const gates: Record<string, GateResult> = {
    'Unique URL Job': documented(entry.uniqueUrlJob) ? 'PASS' : 'NOT VERIFIED',
    'Search Fit': documented(entry.primaryTopic) && documented(entry.uniqueUrlJob) && documented(entry.intent?.description) ? 'PASS' : 'NOT VERIFIED',
    'Purpose': documented(entry.purpose?.userProblem) && documented(entry.purpose?.statement) && documented(entry.purpose?.userTask) ? 'PASS' : 'NOT VERIFIED',
    'SERP Research': entry.serpResearch?.completed && entry.serpResearch.searchDate && entry.serpResearch.queries?.length && entry.serpResearch.sources?.length ? 'PASS' : 'NOT VERIFIED',
    'Effort': entry.effort?.evidence.length ? 'PASS' : 'NOT VERIFIED',
    'Originality': evaluateOriginality(entry, records),
  };

  if (commercialUtility) {
    gates['Commercial Utility'] = commercialUtility;
  }

  if (hasSplitAccuracy) {
    const cf = entry.factCheck?.commercialFacts;
    if (cf) {
      gates['Commercial Fact Accuracy'] = cf.unsupportedClaims?.length
        ? 'FAIL'
        : cf.completed && cf.sources?.length
        ? 'PASS'
        : 'NOT VERIFIED';
    }

    const cfg = entry.factCheck?.configurationFacts;
    if (cfg) {
      gates['Configuration Fact Accuracy'] = cfg.unsupportedClaims?.length
        ? 'FAIL'
        : cfg.completed && cfg.sources?.length
        ? 'PASS'
        : 'NOT VERIFIED';
    }

    const op = entry.factCheck?.operationalClaims;
    if (op) {
      gates['Operational Accuracy'] = op.unsupportedClaims?.length
        ? 'FAIL'
        : op.completed && op.sources?.length
        ? 'PASS'
        : (op.sources?.length || op.notes)
        ? 'WARNING'
        : 'NOT VERIFIED';
    }
  }

  gates['Experience'] = trial
    ? evaluateTrialExperience(entry, records)
    : entry.experience?.hasFirstHandExperience && entry.experience.evidence?.length ? 'PASS' : 'NOT VERIFIED';

  if (trial) {
    gates['Operational Evidence'] = operationalEvidence;
  }

  if (!hasSplitAccuracy) {
    gates['Accuracy'] = entry.factCheck?.unsupportedClaims?.length
      ? 'FAIL'
      : entry.factCheck?.completed && entry.factCheck.sources?.length && (!trial || operationalEvidence === 'PASS')
      ? 'PASS'
      : 'NOT VERIFIED';
  }

  if (entry.factCheck?.catalogInventory || entry.factCheck?.catalogClaims) {
    const ci = entry.factCheck.catalogInventory ?? entry.factCheck.catalogClaims;
    if (ci) {
      gates['Catalog Inventory'] = ci.unsupportedClaims?.length
        ? 'FAIL'
        : ci.completed && ci.sources?.length
        ? 'PASS'
        : (ci.claims?.length || ci.notes)
        ? 'WARNING'
        : 'NOT VERIFIED';
    }
  }

  if (entry.factCheck?.accessParity) {
    const ap = entry.factCheck.accessParity;
    const parityClaims = (entry.claimEvidence ?? []).filter((c) =>
      c.id === 'trial-vod-entitlement-parity' ||
      c.id === 'trial-paid-access-parity' ||
      c.claim.toLowerCase().includes('unlocked during trial') ||
      c.claim.toLowerCase().includes('matches paying subscriber')
    );
    const parityStatuses = parityClaims.map((c) => evaluateClaimEvidence(c, records));
    const evidenceAllPass = parityStatuses.length > 0 && parityStatuses.every((s) => s === 'PASS');
    const evidenceAnyFail = parityStatuses.includes('FAIL');

    gates['Trial Access Parity'] = ap.unsupportedClaims?.length || evidenceAnyFail
      ? 'FAIL'
      : ap.completed && ap.sources?.length && evidenceAllPass
      ? 'PASS'
      : parityStatuses.includes('WARNING')
      ? 'WARNING'
      : 'NOT VERIFIED';
  }

  gates['Trust'] = entry.trust?.issues?.length ? 'FAIL' : entry.trust?.passed ? 'PASS' : 'NOT VERIFIED';
  gates['Satisfaction'] = entry.satisfaction?.unansweredQuestions?.length ? 'FAIL' : entry.satisfaction?.passed ? 'PASS' : 'NOT VERIFIED';

  if (entry.pageType === 'functional-hub' || entry.routingIntegrity) {
    gates['Routing Integrity'] = evaluateRoutingIntegrity(entry);
  }

  return gates;
}

export function evaluateReleaseStatus(entry: ContentQualityEntry, technical: GateResult): ReleaseEvaluation {
  const gates = validateEditorial(entry);
  const acceptedRisks = entry.acceptedRisks?.filter((r) => r.acceptedByOwner) ?? [];

  if (entry.kind === 'legal') {
    return {
      releaseStatus: 'NOT READY',
      qualityStatus: 'NOT FULLY VERIFIED',
      blockers: ['Legal route requires human policy review'],
      unacceptedBlockers: ['Legal route requires human policy review'],
      acceptedRisks,
    };
  }

  if (technical !== 'PASS') {
    return {
      releaseStatus: 'NOT READY',
      qualityStatus: 'NOT FULLY VERIFIED',
      blockers: ['Technical SEO'],
      unacceptedBlockers: ['Technical SEO'],
      acceptedRisks,
    };
  }

  const blockers: string[] = [];

  const mandatoryGates = [
    'Unique URL Job',
    'Search Fit',
    'Purpose',
    'Satisfaction',
  ];
  for (const gate of mandatoryGates) {
    if (gates[gate] !== 'PASS') {
      blockers.push(gate);
    }
  }

  // SERP Research: mandatory for editorial acquisition and commercial pages,
  // but non-blocking for functional hubs where product-task necessity establishes the URL.
  if (entry.pageType !== 'functional-hub' && gates['SERP Research'] !== 'PASS') {
    blockers.push('SERP Research');
  }

  // Routing Integrity: mandatory for functional hubs
  if (entry.pageType === 'functional-hub' && gates['Routing Integrity'] !== 'PASS') {
    blockers.push('Routing Integrity');
  }

  const hasSplitAccuracy = Boolean(gates['Commercial Fact Accuracy'] || gates['Configuration Fact Accuracy']);
  if (hasSplitAccuracy) {
    if (gates['Commercial Fact Accuracy'] && gates['Commercial Fact Accuracy'] !== 'PASS') {
      blockers.push('Commercial Fact Accuracy');
    }
    if (gates['Configuration Fact Accuracy'] && gates['Configuration Fact Accuracy'] !== 'PASS') {
      blockers.push('Configuration Fact Accuracy');
    }
    if (gates['Operational Accuracy'] === 'FAIL') {
      blockers.push('Operational Accuracy');
    }

    const op = entry.factCheck?.operationalClaims;
    const materialBlockers = op?.materialBlockers ?? [];
    if (materialBlockers.length > 0 && gates['Operational Accuracy'] !== 'PASS') {
      blockers.push('Operational Accuracy');
    }
  } else {
    if (gates['Accuracy'] !== 'PASS') {
      blockers.push('Accuracy');
    }
  }

  if (gates['Operational Evidence'] && gates['Operational Evidence'] !== 'PASS') {
    blockers.push('Operational Evidence');
  }

  if (gates['Trial Access Parity'] && gates['Trial Access Parity'] !== 'PASS') {
    blockers.push('Trial Access Parity');
  }

  const isCommercialOrTransactional =
    entry.pageType === 'commercial' ||
    entry.pageType === 'transactional' ||
    (!entry.pageType && (entry.intent?.type === 'transactional' || entry.intent?.type === 'commercial'));

  if (isCommercialOrTransactional) {
    if (gates['Commercial Utility'] && gates['Commercial Utility'] !== 'PASS') {
      blockers.push('Commercial Utility');
    }

    const claimsOriginality = (entry.originality?.originalValue ?? []).length > 0;
    if (claimsOriginality) {
      if (gates['Originality'] !== 'PASS') blockers.push('Originality');
      if (gates['Effort'] !== 'PASS') blockers.push('Effort');
    }

    if ((entry.experience?.hasFirstHandExperience || entry.url === '/iptv-free-trial') && gates['Experience'] !== 'PASS') {
      blockers.push('Experience');
    }

    if (gates['Commercial Utility'] !== 'PASS' && gates['Effort'] !== 'PASS') {
      blockers.push('Page Value');
    }
  } else if (entry.pageType === 'functional-hub') {
    if (gates['Effort'] !== 'PASS') blockers.push('Effort');

    const claimsOriginality = (entry.originality?.originalValue ?? []).length > 0;
    if (claimsOriginality && gates['Originality'] !== 'PASS') {
      blockers.push('Originality');
    }

    if (entry.experience?.hasFirstHandExperience && gates['Experience'] !== 'PASS') {
      blockers.push('Experience');
    }
  } else {
    if (gates['Originality'] !== 'PASS') blockers.push('Originality');
    if (gates['Effort'] !== 'PASS') blockers.push('Effort');
    if (entry.experience?.hasFirstHandExperience && gates['Experience'] !== 'PASS') {
      blockers.push('Experience');
    }
  }

  if (gates['Trust'] !== 'PASS') {
    blockers.push('Trust');
  }

  // Filter unaccepted blockers
  const unacceptedBlockers: string[] = [];
  for (const blocker of blockers) {
    if (blocker === 'Trust') {
      const trustIssues = entry.trust?.issues ?? [];
      const allIssuesAccepted =
        trustIssues.length > 0 &&
        trustIssues.every((issue) =>
          acceptedRisks.some((risk) =>
            issue.toLowerCase().includes(risk.claim.toLowerCase()) ||
            risk.claim.toLowerCase().includes('best iptv service')
          )
        );
      if (!allIssuesAccepted) {
        unacceptedBlockers.push('Trust');
      }
    } else {
      unacceptedBlockers.push(blocker);
    }
  }

  // Determine applicable gates for quality verification completeness
  const applicableGates = [
    'Unique URL Job',
    'Search Fit',
    'Purpose',
    'Satisfaction',
    'Trust',
    'SERP Research',
  ];

  if (entry.pageType === 'functional-hub' || entry.routingIntegrity) {
    applicableGates.push('Routing Integrity');
  }

  if (gates['Commercial Fact Accuracy'] !== undefined) applicableGates.push('Commercial Fact Accuracy');
  if (gates['Configuration Fact Accuracy'] !== undefined) applicableGates.push('Configuration Fact Accuracy');
  if (gates['Operational Accuracy'] !== undefined) applicableGates.push('Operational Accuracy');
  if (gates['Accuracy'] !== undefined) applicableGates.push('Accuracy');
  if (gates['Operational Evidence'] !== undefined) applicableGates.push('Operational Evidence');

  if (isCommercialOrTransactional) {
    if (gates['Commercial Utility'] !== undefined) applicableGates.push('Commercial Utility');
    const claimsOriginality = (entry.originality?.originalValue ?? []).length > 0;
    if (claimsOriginality) {
      applicableGates.push('Originality');
      applicableGates.push('Effort');
    }
  } else if (entry.pageType === 'functional-hub') {
    applicableGates.push('Effort');
    const claimsOriginality = (entry.originality?.originalValue ?? []).length > 0;
    if (claimsOriginality) {
      applicableGates.push('Originality');
    }
  } else {
    applicableGates.push('Originality');
    applicableGates.push('Effort');
  }

  if (entry.experience?.hasFirstHandExperience || entry.url === '/iptv-free-trial') {
    applicableGates.push('Experience');
  }

  if (gates['Catalog Inventory'] !== undefined) {
    applicableGates.push('Catalog Inventory');
  } else if (gates['Catalog Claims'] !== undefined) {
    applicableGates.push('Catalog Claims');
  }

  if (gates['Trial Access Parity'] !== undefined) {
    applicableGates.push('Trial Access Parity');
  }

  const hasAnyFailedGate = Object.values(gates).includes('FAIL');
  const hasUnresolvedTrustIssues = Boolean(entry.trust?.issues?.length);

  let qualityStatus: QualityStatus = 'NOT FULLY VERIFIED';

  if (blockers.length === 0 && !hasAnyFailedGate && !hasUnresolvedTrustIssues && acceptedRisks.length === 0) {
    const hasWarningsOrUnverified = applicableGates.some((g) => {
      const res = gates[g];
      return res === 'WARNING' || res === 'NOT VERIFIED' || res === 'FAIL';
    });

    qualityStatus = hasWarningsOrUnverified ? 'PARTIALLY VERIFIED' : 'FULLY VERIFIED';
  }

  if (blockers.length === 0) {
    return {
      releaseStatus: 'PUBLISH READY',
      qualityStatus,
      blockers,
      unacceptedBlockers: [],
      acceptedRisks,
    };
  }

  if (unacceptedBlockers.length === 0 && acceptedRisks.length > 0) {
    return {
      releaseStatus: 'PUBLISH WITH ACCEPTED RISK',
      qualityStatus: 'NOT FULLY VERIFIED',
      blockers,
      unacceptedBlockers: [],
      acceptedRisks,
    };
  }

  return {
    releaseStatus: 'NOT READY',
    qualityStatus: 'NOT FULLY VERIFIED',
    blockers,
    unacceptedBlockers,
    acceptedRisks,
  };
}

export function canPublish(entry: ContentQualityEntry, technical: GateResult): boolean {
  const { releaseStatus } = evaluateReleaseStatus(entry, technical);
  return releaseStatus !== 'NOT READY';
}
