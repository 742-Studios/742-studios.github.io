import Link from "next/link";

import LogoMark from "@/components/logo-mark";

/**
 * Site logo: the stripe "7" mark beside the extended wordmark
 * @returns Logo linking to the homepage
 */
const Logo = () => {
  return (
    <Link
      href="/"
      className="text-on-field flex items-center gap-2.5 rounded-sm"
    >
      <LogoMark className="size-8 shrink-0" />
      <span className="font-display text-[0.8125rem] tracking-[0.18em] whitespace-nowrap">
        {process.env.NEXT_PUBLIC_SITE_NAME}
      </span>
    </Link>
  );
};

Logo.displayName = "Logo";

export default Logo;
