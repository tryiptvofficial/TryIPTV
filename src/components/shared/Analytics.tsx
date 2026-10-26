import Script from 'next/script';

const GA_ID = 'G-76FDX71VDQ';

/**
 * Google Analytics 4 without blocking the main thread during load.
 *
 * The inline snippet creates the dataLayer queue right away, so the `config` page_view
 * (and any events pushed before gtag.js arrives) is queued, not lost. The ~180 KB gtag.js
 * library (~400 ms of script evaluation on a mid-range phone) is added on the visitor's first
 * scroll, tap or key press, or 4 s after the load event, whichever comes first, so it stays out
 * of the page's start-up work. GA4 enhanced measurement still records client-side route changes
 * via the History API.
 */
export function Analytics() {
  return (
    <Script id="ga-init" strategy="afterInteractive">
      {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');
(function(){
  var done = false, events = ['scroll', 'pointerdown', 'keydown', 'touchstart'];
  function load(){
    if (done) return; done = true;
    events.forEach(function(e){ removeEventListener(e, load, {passive: true}); });
    var s = document.createElement('script');
    s.async = true; s.id = 'ga-lib';
    s.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_ID}';
    document.head.appendChild(s);
  }
  events.forEach(function(e){ addEventListener(e, load, {passive: true, once: true}); });
  function later(){ setTimeout(load, 4000); }
  if (document.readyState === 'complete') later(); else addEventListener('load', later, {once: true});
})();`}
    </Script>
  );
}
