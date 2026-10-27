import { FACT_TEXT, PRODUCT_TRUTHS } from "@/lib/site-config";
import { COMPANY } from "@/lib/site-data/company";

// Topic and question order follow the owner-supplied FAQ (2026-10-20). Every answer opens with a
// one-sentence direct answer, then the detail. TryIPTV facts come from PRODUCT_TRUTHS / COMPANY only.

const T = PRODUCT_TRUTHS;
const a = (href: string, text: string) => `<a href="${href}" class="text-primary hover:underline">${text}</a>`;
const pay = COMPANY.paymentMethods ?? "the methods support lists when you order";

export interface FaqTopic {
  id: string;
  eyebrow: string;
  title: string;
  items: { question: string; answer: string }[];
}

export const faqTopics: FaqTopic[] = [
  {
    id: "basics",
    eyebrow: "The Basics",
    title: "Getting Started With IPTV",
    items: [
      {
        question: "What is IPTV?",
        answer: `IPTV is television delivered over the internet instead of cable or satellite. Live channels and on-demand titles stream to an app on your TV, streaming stick, phone or computer, using your home broadband. ${a("/guides/what-is-iptv", "Read the full guide to what IPTV is")}.`,
      },
      {
        question: "What does IPTV stand for?",
        answer: "IPTV stands for Internet Protocol Television. Internet Protocol (IP) is the same system that carries web pages and video calls; IPTV uses it to carry TV channels.",
      },
      {
        question: "How does IPTV work?",
        answer: `A provider sends TV streams over the internet, and an IPTV player app on your device plays them. You enter your login (an Xtream Codes server, username and password, or an M3U playlist URL) in the player, and it loads the channel list, the TV guide and the on-demand library. ${a("/guides/how-does-iptv-work", "See how IPTV works step by step")}.`,
      },
      {
        question: "How do I get IPTV?",
        answer: `You need three things: a compatible device, an IPTV player app, and a subscription. With TryIPTV you can start with a ${a("/iptv-free-trial", "24-hour free trial")} on WhatsApp, then choose a ${a("/pricing", "IPTV plan")} if you want to keep it.`,
      },
      {
        question: "Does IPTV work anywhere?",
        answer: `IPTV works anywhere you have a stable internet connection fast enough for the picture quality you want. Around 25 Mbps is comfortable for one HD stream and 50 Mbps for 4K. ${a("/guides/iptv-internet-speed", "Check how much speed IPTV needs")}.`,
      },
      {
        question: "What is the difference between IPTV and regular streaming apps?",
        answer: "IPTV gives you live TV channels on a schedule, with a TV guide, much like cable. Streaming apps such as Netflix are mostly on-demand libraries from one company. Many IPTV services, TryIPTV included, offer both live channels and an on-demand library in one login, watched through a player app you choose.",
      },
    ],
  },
  {
    id: "vs-cable",
    eyebrow: "Making The Call",
    title: "IPTV vs Cable and Satellite",
    items: [
      {
        question: "Is IPTV cheaper than cable?",
        answer: `Usually, yes. TryIPTV costs ${FACT_TEXT.fromPrice} for one month and works out to ${FACT_TEXT.lowestMonthly} a month on the 12-month plan, with no box rental or installation. Compare that with your current cable bill. ${a("/guides/iptv-vs-cable", "Read IPTV vs cable")}.`,
      },
      {
        question: "IPTV vs satellite: which is better?",
        answer: "IPTV is better if you have good broadband and want to watch on several kinds of device; satellite is better where internet is slow or unreliable, because it does not depend on your connection. Satellite also needs a dish and installation; IPTV only needs an app.",
      },
      {
        question: "Why is IPTV so much cheaper than cable?",
        answer: "IPTV has no cables to lay, no dishes or boxes to install, and no technicians to send out: the stream reaches you over the internet you already pay for. Pricing also depends on how a service obtains its channels, so a very low price is worth asking questions about (see the legality answers below).",
      },
      {
        question: "Is IPTV worth it if I barely watch TV?",
        answer: `It can be: a 1-month plan at ${FACT_TEXT.fromPrice} covers the months you do watch, such as a tournament or a season finale, and nothing renews automatically. If you watch only a handful of shows, one streaming app may be cheaper.`,
      },
      {
        question: "What should I check before switching from cable?",
        answer: `Check four things during a ${a("/iptv-free-trial", "free trial")}: that your must-have channels are there, that streams stay smooth at peak evening hours, that the player works on every TV you use, and that your internet speed is enough for everyone watching at once. Also check any cable contract end date and cancellation fee.`,
      },
      {
        question: "What are the drawbacks of IPTV?",
        answer: `IPTV depends on your internet: a slow or busy connection means buffering. Channel line-ups can change, setup takes a few minutes with a player app, and there is no technician visit. Legality also depends on the provider (see below). Test first with the ${a("/iptv-free-trial", "free trial")}.`,
      },
    ],
  },
  {
    id: "trial-plans",
    eyebrow: "Try It, Buy It",
    title: "Free Trial, Plans and Payment",
    items: [
      {
        question: "Can I get a free trial of IPTV?",
        answer: `Yes. TryIPTV offers a ${FACT_TEXT.trialHours}-hour free trial for $0, with no credit card. Request it on WhatsApp and your login usually arrives within ${T.activationTime}. One trial per household. ${a("/iptv-free-trial", "Start the free trial")}.`,
      },
      {
        question: "How much does IPTV cost?",
        answer: `TryIPTV ${a("/pricing", "plans")} cost ${FACT_TEXT.priceList}. Every plan includes ${T.connections} simultaneous connections and none renews automatically. The 12-month plan is the cheapest per month at ${FACT_TEXT.lowestMonthly}.`,
      },
      {
        question: "Is there a contract or cancellation fee with TryIPTV?",
        answer: "No. Plans run for 1, 3, 6 or 12 months, paid once, with no contract and no cancellation fee. When your plan ends, access simply stops unless you buy another one.",
      },
      {
        question: "Which payment methods does TryIPTV accept?",
        answer: `You can pay by ${pay}. Support sends the payment instructions on WhatsApp when you order. For cryptocurrency, use the exact network and wallet address you are given.`,
      },
      {
        question: "How long does IPTV activation take after payment?",
        answer: `Your login details are typically delivered on WhatsApp within ${T.activationTime} after payment is confirmed, ${T.activationHours}.`,
      },
      {
        question: "Can I get my money back if TryIPTV does not suit me?",
        answer: `No unconditional one. ${T.refund.summary} ${T.refund.exclusions} That is why the free trial exists: test first. ${a("/refund-policy", "Read the refund policy")}.`,
      },
    ],
  },
  {
    id: "account",
    eyebrow: "Your Account",
    title: "Account, Renewal and Billing",
    items: [
      {
        question: "How do I renew my IPTV subscription with TryIPTV?",
        answer: `Order a new plan the same way you ordered the first one: tap a plan on the ${a("/pricing", "pricing page")} to open WhatsApp and say you are renewing. Nothing renews automatically, so you are never charged without asking.`,
      },
      {
        question: "How do I pay for an IPTV subscription?",
        answer: `With TryIPTV you choose a plan, tap its button to open WhatsApp, and support sends payment instructions for ${pay}. You pay once for the whole term, and your login arrives within ${T.activationTime} of payment confirmation.`,
      },
      {
        question: "Can I upgrade my plan or add more devices later?",
        answer: `Yes. Message support on WhatsApp to change your plan, and pay by ${pay}. Every plan includes ${T.connections} simultaneous connections. ${T.extraConnections} Ask support for the price.`,
      },
      {
        question: "What happens when my IPTV subscription expires?",
        answer: `${T.expiry.summary} ${T.expiry.nextStep}`,
      },
      {
        question: "I lost my IPTV login details. What do I do?",
        answer: `Message support on WhatsApp or email ${T.support.email} from the number or address you ordered with, and support can resend your details. Support answers ${COMPANY.support.hours}. Never share your login publicly. ${a("/help/iptv-login-not-working", "Login not working? See the fix guide")}.`,
      },
      {
        question: "Why does TryIPTV's WhatsApp number start with +212?",
        answer: `+212 is Morocco's country code, and the TryIPTV support team works from Morocco. The company, ${COMPANY.legalName ?? "TryIPTV"}, is based in ${COMPANY.location ?? "New York, United States"}. Messages over WhatsApp use the internet, so you can write from any country.`,
      },
      {
        question: "How do I cancel my IPTV subscription, and is there a refund?",
        answer: `There is nothing to cancel: plans are paid once and stop on their own at the end of the term. Refunds are limited: ${T.refund.summary.charAt(0).toLowerCase() + T.refund.summary.slice(1)} ${a("/refund-policy", "Read the refund policy")}.`,
      },
    ],
  },
  {
    id: "channels",
    eyebrow: "What You Can Watch",
    title: "Channels and Content",
    items: [
      {
        question: "What channels do you get with IPTV?",
        answer: `TryIPTV includes ${T.channels} live channels from around the world, including news, sports, movies and entertainment. Line-ups change over time, so use the ${a("/iptv-free-trial", "free trial")} to check the exact channels you care about before you pay.`,
      },
      {
        question: "Does IPTV have international channels like French, South Asian, Arabic, Filipino and Chinese?",
        answer: `Yes. TryIPTV has ${T.languages}, including French, South Asian, Arabic, Filipino and Chinese channels. Specific channels can change, so open the ones you need during the ${a("/iptv-free-trial", "24-hour trial")} before buying.`,
      },
      {
        question: "What is an EPG on IPTV?",
        answer: `The EPG (electronic programme guide) is the TV guide grid inside your player: what is on now and next on each channel. It loads separately from the video, so a channel can play even when its guide is empty. ${a("/guides/what-is-epg", "Read what an EPG is")}.`,
      },
      {
        question: "Does IPTV have movies and shows on demand?",
        answer: `Yes. TryIPTV includes ${T.vod} movies and TV shows on demand (VOD), in the same login as the live channels. You can pause, rewind and resume them like any streaming app.`,
      },
      {
        question: "Can I watch IPTV in 4K?",
        answer: `Yes, where a channel or title is available in 4K. You also need a 4K screen, a 4K-capable device and about 50 Mbps of stable internet. ${a("/guides/iptv-internet-speed", "Check the speed guide")}.`,
      },
      {
        question: "Can I get local channels on IPTV?",
        answer: `Local and regional coverage varies by area and changes over time. Check your local channels during the ${a("/iptv-free-trial", "free trial")} before choosing a plan.`,
      },
      {
        question: "How do I get more channels on IPTV?",
        answer: "Every TryIPTV plan already includes the full line-up; plans differ only in length and price, so there are no channel packs to add. If a channel seems missing, refresh the playlist in your player, check hidden groups, or ask support.",
      },
    ],
  },
  {
    id: "sports",
    eyebrow: "Game Night",
    title: "Live Sports",
    items: [
      {
        question: "Can I watch live sports with IPTV?",
        answer: `Yes. TryIPTV includes sports channels and PPV events among its ${T.channels} live channels. Test your sports channels during a live game in the ${a("/iptv-free-trial", "free trial")}.`,
      },
      {
        question: "Does IPTV handle game nights without buffering?",
        answer: `It depends mostly on your connection at peak time. Big games are when networks are busiest, so use Ethernet instead of Wi-Fi where you can, keep 25 Mbps free per HD stream, and test during a real evening game in the trial. ${a("/help/iptv-buffering", "See the buffering fixes")}.`,
      },
      {
        question: "Can I watch hockey, soccer and combat sports in 4K?",
        answer: "Some live sports are available in 4K, where the broadcaster produces a 4K feed; many games are HD or Full HD. You need a 4K screen, a 4K-capable device and about 50 Mbps for 4K.",
      },
      {
        question: "Do I get sports channels from other countries?",
        answer: `Yes, the line-up includes international channels, which carry sports from other countries. Specific channels change over time, so check the ones you follow during the ${a("/iptv-free-trial", "free trial")}.`,
      },
    ],
  },
  {
    id: "devices",
    eyebrow: "Your Screens",
    title: "Devices and Setup",
    items: [
      {
        question: "What devices can I use for IPTV?",
        answer: `TryIPTV works on Amazon Firestick and Fire TV, Android TV and Google TV, Samsung and LG smart TVs, Apple TV, iPhone and iPad, Windows and Mac computers, Chromecast with Google TV and MAG boxes. Roku works through AirPlay or screen mirroring. ${a("/devices", "Browse the device setup guides")}.`,
      },
      {
        question: "Do I need a box for IPTV?",
        answer: "No. If your smart TV can install an IPTV player app, you need nothing else. A streaming stick such as a Firestick helps if your TV is older or its app store has no IPTV player.",
      },
      {
        question: "What is an IPTV box?",
        answer: `An IPTV box is a small set-top device that plugs into your TV's HDMI port and runs IPTV player apps, for example an Android TV box or a ${a("/devices/mag-box-iptv", "MAG box")}. Any compatible streaming device does the same job.`,
      },
      {
        question: "How do I set up IPTV step by step?",
        answer: `1) Install a compatible IPTV player on your device. 2) Open it and choose Xtream Codes login (or M3U). 3) Enter the server URL, username and password from your TryIPTV login. 4) Let the channels and guide load. ${a("/setup", "Follow the universal setup guide")}.`,
      },
      {
        question: "Can I use one IPTV subscription on multiple devices?",
        answer: `Yes. You can install your login on as many of your own devices as you like, but only ${T.connections} can stream at the same time on one TryIPTV plan. Sharing a subscription with other households is not allowed.`,
      },
      {
        question: "What internet speed do I need for IPTV?",
        answer: `Plan on a stable 25 Mbps for one Full HD stream and 50 Mbps for 4K; two streams at once need roughly double. Stability matters as much as speed. ${a("/guides/iptv-internet-speed", "Read the internet speed guide")}.`,
      },
      {
        question: "What is the best streaming device for IPTV?",
        answer: `For most people, a recent Amazon Fire TV Stick (4K) or a Google TV / Android TV device: they are affordable, fast and run the most popular player apps such as TiviMate. Apple TV is a good choice in Apple households. ${a("/devices", "Compare device guides")}.`,
      },
      {
        question: "Can I install IPTV on an Amazon Fire TV Stick?",
        answer: `Yes. Install an IPTV player from the Amazon Appstore, or sideload one with Downloader if it is not in the Appstore, then enter your login. ${a("/devices/firestick-iptv", "Follow the Firestick setup guide")}.`,
      },
      {
        question: "Is a Fire TV Stick good enough for IPTV?",
        answer: "Yes, for most homes. A Fire TV Stick 4K or 4K Max handles HD and 4K streams well; older basic models can feel slow with large channel lists. Use Ethernet (via an adapter) or strong Wi-Fi for the smoothest picture.",
      },
    ],
  },
  {
    id: "apps",
    eyebrow: "Power Users",
    title: "Apps and Advanced Setup",
    items: [
      {
        question: "Which IPTV player app should I use?",
        answer: `TiviMate is the most popular choice on Android TV and Firestick; IPTV Smarters works on almost every platform; Televizo, OTT Navigator and XCIPTV are good alternatives. Perfect Player is a legacy option that is no longer listed on Google Play; see the ${a("/players/perfect-player", "Perfect Player setup and migration guide")}. All of them accept Xtream Codes logins. ${a("/players", "Compare IPTV players")}.`,
      },
      {
        question: "Can I use IPTV on a smart TV without a box or stick?",
        answer: `Yes, if your TV's app store offers an IPTV player. Samsung and LG smart TVs and Android/Google TVs have compatible players. ${a("/devices/samsung-tv-iptv", "Samsung guide")} · ${a("/devices/lg-tv-iptv", "LG guide")}.`,
      },
      {
        question: "Can I use IPTV on my phone or tablet?",
        answer: `Yes. Install an IPTV player on Android or iPhone/iPad and enter your login; each phone counts as one of your ${T.connections} connections while it streams. ${a("/devices/iphone-iptv", "iPhone and iPad setup")}.`,
      },
      {
        question: "Does my subscription work when I travel?",
        answer: `Yes, your subscription ${T.travel}. Hotel and public Wi-Fi can be slow or block streaming; test before you rely on it.`,
      },
      {
        question: "Can I use one subscription at home and at a second home?",
        answer: `Yes, for your own household: install it in both places, and up to ${T.connections} devices can stream at the same time. Sharing a subscription with other people is not allowed under the ${a("/terms-conditions", "Terms")}.`,
      },
    ],
  },
  {
    id: "quality",
    eyebrow: "Under The Hood",
    title: "Quality, Data and Performance",
    items: [
      {
        question: "Is IPTV really 4K quality?",
        answer: "Only on channels and titles produced in 4K; most live TV is HD or Full HD. Real 4K also needs a 4K screen, a 4K device and about 50 Mbps of stable internet.",
      },
      {
        question: "How much data does IPTV use?",
        answer: `Roughly 1.4–2.7 GB per hour for 720p, 3–7 GB per hour for 1080p and 8–16 GB per hour for 4K, depending on the stream's bitrate. Check your internet plan's data cap if you watch a lot. ${a("/guides/iptv-internet-speed", "See the speed and data guide")}.`,
      },
      {
        question: "Can I record shows or watch ones I missed?",
        answer: "Catch-up (replay) is offered on channels where it is available, through players that support it. Recording depends on your player app: TiviMate, for example, offers recording in its premium version. Check catch-up on your favourite channels during the free trial.",
      },
      {
        question: "Can several people watch different channels at once?",
        answer: `Yes, up to ${T.connections} at the same time on a standard TryIPTV plan, each on a different channel. ${T.extraConnections}`,
      },
      {
        question: "Does IPTV work on slow internet?",
        answer: `It can at lower quality: around 5–8 Mbps is enough for one SD or 720p stream, but expect buffering in Full HD below about 25 Mbps. Use Ethernet and pick lower-quality streams where your player offers them. ${a("/guides/iptv-internet-speed", "Speed guide")}.`,
      },
    ],
  },
  {
    id: "troubleshooting",
    eyebrow: "When Something Misbehaves",
    title: "Troubleshooting",
    items: [
      {
        question: "Why is my IPTV not working?",
        answer: `Most often it is the login, the player, or the home network. Check that your details are entered exactly, restart the device and router, and try another channel. If nothing plays, contact support. ${a("/help/iptv-not-working", "Follow the IPTV not working guide")}.`,
      },
      {
        question: "How do I fix IPTV buffering or freezing?",
        answer: `Switch to Ethernet or move closer to the router, restart the router and device, close other heavy downloads, and clear the player's cache. If it only happens at peak hours, your connection is the likely bottleneck. ${a("/help/iptv-buffering", "Read the full buffering guide")}.`,
      },
      {
        question: "Is TryIPTV down?",
        answer: `First check whether other apps and websites work, then try a second device. If your internet is fine but no TryIPTV channel plays, message support on WhatsApp or email ${T.support.email} and they will check the service. Support answers ${COMPANY.support.hours}; messages sent outside those hours are answered when support reopens.`,
      },
      {
        question: "How do I reset or reinstall my IPTV app?",
        answer: "Clear the app's cache and data in your device settings (Android TV and Firestick: Settings > Applications > Manage installed applications), or uninstall and reinstall it, then enter your login again. Note your login details first.",
      },
      {
        question: "Why does my channel guide not match what is playing?",
        answer: `Usually the guide is out of date or offset by time zone. Refresh the EPG in your player and check the player's time-shift setting. ${a("/help/epg-not-working", "See the EPG troubleshooting guide")}.`,
      },
      {
        question: "Why is the audio out of sync with the video?",
        answer: "Try another channel first: if only one channel is off, it is that stream. Otherwise adjust audio delay in your player's settings, turn off audio passthrough or Dolby processing on the TV or soundbar, or switch the player's video decoder (hardware/software).",
      },
      {
        question: "How do I turn on subtitles?",
        answer: "While a programme is playing, open the player's menu (often the OK or menu button) and choose Subtitles or CC. Subtitles are available only where the broadcast or title includes them, more often on on-demand titles than live TV.",
      },
      {
        question: "Why does my app keep crashing?",
        answer: "Usually the device is low on storage or memory, or the app needs an update. Clear the app's cache, close background apps, update or reinstall the player, and restart the device. Very large channel lists can strain older sticks.",
      },
      {
        question: "Is Amazon Firestick blocking IPTV?",
        answer: `Amazon restricts some sideloaded apps from unknown sources, and it has warned users about certain unverified apps. Installing your player from the Amazon Appstore is the simplest route; if it was sideloaded, check the ${a("/devices/firestick-iptv", "Firestick guide")} for current install options.`,
      },
    ],
  },
  {
    id: "legality",
    eyebrow: "The Honest Answers",
    title: "Legality and Safety",
    items: [
      {
        question: "Is IPTV legal?",
        answer: `IPTV as a technology is legal: many TV operators and broadcasters use it. Whether a particular service is legal depends on whether it has the rights to the channels and content it streams, and on the law where you live. This is general information, not legal advice. ${a("/disclaimer", "Read our disclaimer")}.`,
      },
      {
        question: "What makes an IPTV service illegal?",
        answer: "Streaming channels or content without the rights holders' permission. The technology is the same either way; what matters is licensing. Laws on providing and watching unlicensed streams differ by country.",
      },
      {
        question: "Are IPTV boxes legal?",
        answer: "Yes, the boxes themselves are ordinary streaming hardware. What can be illegal is a box sold pre-loaded with unlicensed services, or using one to watch content without the rights holders' permission.",
      },
      {
        question: "Is IPTV safe to use?",
        answer: "It is as safe as the provider and the apps you use. Install players from official app stores where possible, never share your login, avoid providers with no contact details or refund terms, and do not enter payment details outside the provider's official channels.",
      },
      {
        question: "Do I need a VPN for IPTV?",
        answer: `No, a VPN is not required to use TryIPTV. Some people use one for privacy or if their internet provider slows down streaming. Using a VPN is permitted under the ${a("/terms-conditions", "Terms")}, but it can lower your speed.`,
      },
      {
        question: "How do I know an IPTV provider is legit?",
        answer: "Look for whether it holds the rights to its channels, clear published prices, a written refund policy and terms, a working way to contact support, a free trial, and no pressure to pay upfront for long plans.",
      },
      {
        question: "Are there legal IPTV providers?",
        answer: "Yes. Many broadcasters and TV operators deliver licensed live TV over the internet through their own apps and services. Whether any service is licensed for your country is something to check with the provider.",
      },
      {
        question: "What happens if you don't use a VPN with IPTV?",
        answer: "Usually nothing: IPTV works normally without a VPN. Your internet provider can see that you are streaming and how much data you use, as with any streaming app, and some providers slow down heavy video traffic.",
      },
      {
        question: "Are free VPNs safe to use with IPTV?",
        answer: "Often not a good idea. Free VPNs tend to be slow, have data caps that run out quickly with video, and some log or sell user data. If you want a VPN, choose a reputable paid one with a no-logs policy.",
      },
    ],
  },
];

/** Flat list for the FAQPage schema and any page that needs all questions. */
export const faqs = faqTopics.flatMap((t) => t.items);
