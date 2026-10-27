import type React from "react";

/**
 * Wraps content in Cloudflare's email_off markers so addresses stay plain text and mailto links,
 * instead of being rewritten to /cdn-cgi/l/email-protection links that crawlers can't read.
 */
export function EmailOff({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span hidden dangerouslySetInnerHTML={{ __html: "<!--email_off-->" }} />
      {children}
      <span hidden dangerouslySetInnerHTML={{ __html: "<!--/email_off-->" }} />
    </>
  );
}
