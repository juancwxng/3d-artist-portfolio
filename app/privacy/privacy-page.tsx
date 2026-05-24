import type { Metadata } from "next";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

const BASE_URL = "https://www.anastasiamonzon.com";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for anastasiamonzon.com — how Anastasia Monzon collects, uses, and protects your personal information when you contact her studio.",
  alternates: {
    canonical: `${BASE_URL}/privacy`,
  },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/privacy`,
    title: "Privacy Policy · Anastasia Monzon",
    description:
      "How Anastasia Monzon collects, uses, and protects your personal information.",
  },
  robots: {
    index: true,
    follow: false,
  },
};

/* ── Section heading component ─────────────────────────── */
function PolicySection({
  eyebrow,
  heading,
  children,
}: {
  eyebrow: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[200px_1fr] md:gap-16 py-12 border-b border-[#d9cbbe]/40 last:border-0">
      {/* Left column — eyebrow + heading */}
      <div className="pt-1">
        <p className="text-[0.5rem] tracking-[0.32em] uppercase text-[#7a6e63] font-normal mb-3 flex items-center gap-2">
          <span className="w-4 h-px bg-[#7a6e63] opacity-40 shrink-0" />
          {eyebrow}
        </p>
        <h2 className="font-serif italic font-light text-[#2b2a27] text-[1.125rem] leading-snug">
          {heading}
        </h2>
      </div>

      {/* Right column — body */}
      <div className="space-y-4 text-[0.875rem] font-light text-[#3d3830] leading-[1.75]">
        {children}
      </div>
    </div>
  );
}

/* ── Inline link ────────────────────────────────────────── */
function PolicyLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-[#7a6e63] underline underline-offset-2 decoration-[#d9cbbe] transition-colors duration-200 hover:text-[#2b2a27] hover:decoration-[#7a6e63]"
    >
      {children}
    </a>
  );
}

/* ── Page ───────────────────────────────────────────────── */
export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />

      <main
        id="main-content"
        className="bg-[#f7f3ee] min-h-screen"
        style={{ paddingTop: "var(--header-h, 58px)" }}
      >
        {/* ── Hero banner ───────────────────────────────── */}
        <div className="px-6 pt-20 pb-14 md:px-10 md:pt-28 md:pb-18 lg:px-14 lg:pt-32 lg:pb-20 border-b border-[#d9cbbe]/40">
          <div className="max-w-[780px]">
            <p className="text-[0.5rem] tracking-[0.32em] uppercase text-[#7a6e63] font-normal mb-7 flex items-center gap-3">
              <span className="w-5 h-px bg-[#7a6e63] opacity-50 shrink-0" />
              Legal
            </p>

            <h1 className="font-serif font-light italic text-[#2b2a27] leading-[0.92] tracking-[-0.01em] mb-8 text-4xl md:text-6xl lg:text-7xl">
              Privacy
              <br />
              Policy
            </h1>

            <div className="w-10 h-px bg-[#d9cbbe] mb-8" aria-hidden="true" />

            <p className="font-serif italic font-light text-[#3d3830] leading-[1.65] max-w-md text-[0.9375rem]">
              This site is a personal professional portfolio. It collects only
              what is strictly necessary to respond to enquiries.
            </p>

            <p className="mt-6 text-[0.6875rem] tracking-[0.2em] uppercase text-[#7a6e63] font-normal">
              Last updated &nbsp;·&nbsp; May 2026
            </p>
          </div>
        </div>

        {/* ── Policy body ───────────────────────────────── */}
        <div className="px-6 pb-24 md:px-10 md:pb-32 lg:px-14 lg:pb-40 max-w-[1080px]">

          <PolicySection eyebrow="Overview" heading="Who this applies to">
            <p>
              This Privacy Policy explains how <strong className="font-normal text-[#2b2a27]">Anastasia Monzon</strong> (&ldquo;I&rdquo;, &ldquo;me&rdquo;, &ldquo;my&rdquo;) handles personal data
              submitted through{" "}
              <PolicyLink href="https://www.anastasiamonzon.com">
                anastasiamonzon.com
              </PolicyLink>{" "}
              (the &ldquo;Site&rdquo;). It applies to anyone who visits the Site or
              submits an enquiry through the contact form.
            </p>
            <p>
              The Site is operated solely by Anastasia Monzon, a freelance 3D
              architectural visualisation artist based in Mexico. No organisation,
              company, or data processor is involved in day-to-day operations beyond
              the third-party services listed below.
            </p>
          </PolicySection>

          <PolicySection eyebrow="Data collected" heading="What information is gathered">
            <p>
              The Site collects personal data only when you submit the contact form.
              The fields are:
            </p>
            <ul className="space-y-2 pl-0 list-none">
              {[
                ["Name", "To address you correctly in correspondence."],
                ["Email address", "To send a reply and manage the project conversation."],
                ["Project type", "To understand the scope of your enquiry."],
                ["Budget range", "To provide an accurate quote."],
                ["Message", "The text of your enquiry."],
              ].map(([field, purpose]) => (
                <li key={field} className="flex gap-3">
                  <span
                    className="mt-[0.45rem] w-1 h-1 rounded-full bg-[#d4a0a4] shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="text-[#2b2a27] font-normal">{field}</span>
                    {" — "}
                    {purpose}
                  </span>
                </li>
              ))}
            </ul>
            <p>
              No other personal data is collected. The Site does not use analytics
              cookies, pixel trackers, or session-recording tools. Browsing the Site
              without submitting the form generates no stored personal record.
            </p>
          </PolicySection>

          <PolicySection eyebrow="Purpose & legal basis" heading="Why your data is used">
            <p>
              Data submitted via the contact form is used for one purpose only: to
              respond to your project enquiry and manage any subsequent
              collaboration. The legal basis for processing is{" "}
              <em>legitimate interest</em> — specifically, the mutual interest of
              both parties in evaluating a potential professional engagement.
            </p>
            <p>
              Your data will never be sold, rented, or shared with third parties for
              marketing purposes. It will not be used to build advertising profiles
              or passed to data brokers.
            </p>
          </PolicySection>

          <PolicySection eyebrow="Third-party services" heading="Who processes your data">
            <p>
              Enquiry emails are delivered through{" "}
              <PolicyLink href="https://resend.com/privacy">Resend</PolicyLink>, a
              transactional email provider. Resend processes your submission data
              solely to deliver the notification email and is bound by its own
              Privacy Policy.
            </p>
            <p>
              The Site is hosted on{" "}
              <PolicyLink href="https://www.cloudflare.com/privacypolicy/">
                Cloudflare Pages
              </PolicyLink>
              . Cloudflare handles DNS, CDN delivery, and DDoS protection. It may
              log anonymised request metadata (IP address, user agent, timestamp) as
              part of standard infrastructure operation. This data is not linked to
              your form submission and is subject to Cloudflare&apos;s Privacy Policy.
            </p>
            <p>
              Spam protection on the contact form is provided by{" "}
              <PolicyLink href="https://www.cloudflare.com/privacypolicy/">
                Cloudflare Turnstile
              </PolicyLink>
              , an invisible challenge that verifies human interaction without
              tracking or storing personal data. No CAPTCHA cookies are set.
            </p>
          </PolicySection>

          <PolicySection eyebrow="Retention" heading="How long data is kept">
            <p>
              Enquiry emails are retained in my inbox for as long as reasonably
              necessary to manage the project conversation — typically no longer than
              two years after the last exchange. If a project proceeds, project
              correspondence may be kept for up to five years for contractual and
              accounting purposes.
            </p>
            <p>
              If no project results from an enquiry, the email thread will be deleted
              within 12 months of the last message.
            </p>
          </PolicySection>

          <PolicySection eyebrow="Your rights" heading="What you can request">
            <p>
              Depending on where you are located, you may have the right to:
            </p>
            <ul className="space-y-2 pl-0 list-none">
              {[
                "Access a copy of the personal data held about you.",
                "Request correction of inaccurate information.",
                "Request deletion of your data (&ldquo;right to be forgotten&rdquo;).",
                "Object to or restrict processing of your data.",
                "Withdraw consent at any time where processing is based on consent.",
              ].map((right, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    className="mt-[0.45rem] w-1 h-1 rounded-full bg-[#a8b89a] shrink-0"
                    aria-hidden="true"
                  />
                  <span dangerouslySetInnerHTML={{ __html: right }} />
                </li>
              ))}
            </ul>
            <p>
              To exercise any of these rights, email{" "}
              <PolicyLink href="mailto:hello@anastasiamonzon.com">
                hello@anastasiamonzon.com
              </PolicyLink>
              . Requests will be acknowledged within 5 business days and fulfilled
              within 30 days.
            </p>
          </PolicySection>

          <PolicySection eyebrow="Security" heading="How your data is protected">
            <p>
              All data in transit is encrypted via HTTPS/TLS. Form submissions are
              rate-limited per IP address and validated server-side before being
              forwarded via Resend. Reasonable technical and organisational measures
              are in place to prevent unauthorised access, disclosure, or loss.
            </p>
            <p>
              No system is completely secure. If you have reason to believe your data
              has been compromised, please contact me immediately at{" "}
              <PolicyLink href="mailto:hello@anastasiamonzon.com">
                hello@anastasiamonzon.com
              </PolicyLink>
              .
            </p>
          </PolicySection>

          <PolicySection eyebrow="Cookies" heading="Cookie usage">
            <p>
              This Site does not use any first-party cookies for analytics, tracking,
              or advertising. No cookie consent banner is shown because no
              consent-requiring cookies are set.
            </p>
            <p>
              Cloudflare Turnstile may set a short-lived technical cookie solely to
              verify that the contact form is submitted by a human. This cookie
              contains no personal information and expires at the end of the
              browser session.
            </p>
          </PolicySection>

          <PolicySection eyebrow="Children" heading="Minimum age">
            <p>
              This Site is intended for professional use by architects, interior
              designers, developers, and similar clients. It is not directed at
              individuals under the age of 16. If you believe a minor has submitted
              personal data through this Site, please contact me and I will delete it
              promptly.
            </p>
          </PolicySection>

          <PolicySection eyebrow="Changes" heading="Updates to this policy">
            <p>
              This policy may be updated occasionally to reflect changes in
              services or applicable law. The &ldquo;Last updated&rdquo; date at the top of the
              page will always reflect the most recent revision. Continued use of the
              Site after a change constitutes acceptance of the revised policy.
            </p>
          </PolicySection>

          <PolicySection eyebrow="Contact" heading="Questions & requests">
            <p>
              For any privacy-related questions, data requests, or concerns, please
              reach out directly:
            </p>
            <div className="mt-2 inline-flex flex-col gap-1 border border-[#d9cbbe] rounded-[4px] px-6 py-5">
              <p className="text-[0.5625rem] tracking-[0.3em] uppercase text-[#7a6e63] font-normal mb-1">
                Anastasia Monzon
              </p>
              <PolicyLink href="mailto:hello@anastasiamonzon.com">
                hello@anastasiamonzon.com
              </PolicyLink>
              <p className="text-[0.8125rem] text-[#7a6e63]">Mexico · UTC−7 · Remote worldwide</p>
            </div>
          </PolicySection>

        </div>
      </main>

      <SiteFooter />
    </>
  );
}
