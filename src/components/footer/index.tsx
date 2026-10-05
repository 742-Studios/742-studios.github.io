import Link from "next/link";

import LogoMark from "@/components/logo-mark";
import { contactEmail } from "@/lib/content";

/**
 * Footer component for site-wide footer content
 * Sits on the field below the last panel, like the header above the first
 * @returns Footer with the mark, contact address, copyright, and privacy link
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-on-field">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 pt-10 pb-8 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <LogoMark className="size-10" />
          <a
            href={`mailto:${contactEmail}`}
            className="rounded-sm text-lg underline-offset-[6px] hover:underline"
          >
            {contactEmail}
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm">
          <p>
            © {currentYear} {process.env.NEXT_PUBLIC_SITE_NAME}
          </p>
          {/*
            Article 13 of the UK GDPR wants the privacy notice reachable
            from wherever data is collected, which on this site is every
            page — so it lives in the footer rather than the header nav.
          */}
          <Link
            href="/privacy"
            className="rounded-sm underline underline-offset-4 hover:no-underline"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";

export default Footer;
