import Link from "next/link";

import DotLabel from "@/components/home/dot-label";
import Panel from "@/components/panel";
import StripeArt from "@/components/stripe-art";

/**
 * Custom 404 Not Found page component
 * @returns 404 error page
 */
const NotFound = () => {
  return (
    <div className="mx-auto max-w-[1440px] px-2 sm:px-4 lg:px-6">
      <Panel
        as="main"
        className="grid min-h-[min(40rem,calc(100svh-12rem))] items-center gap-10 px-6 py-16 sm:px-10 md:grid-cols-2 lg:px-14"
        id="main"
      >
        <div>
          <h2 className="text-accent text-[clamp(2.5rem,5.5vw,4.75rem)] leading-none font-medium tracking-[-0.035em]">
            404 - Not Found
          </h2>
          <p className="text-muted mt-6 max-w-[40ch] text-lg">
            This page doesn’t exist. It may have moved, or the link may have a
            typo.
          </p>
          <Link
            className="group mt-10 inline-block rounded-sm text-xl"
            href="/"
          >
            <DotLabel>Go to the home page</DotLabel>
          </Link>
        </div>
        <StripeArt
          className="mx-auto hidden h-80 w-auto md:block"
          lines={36}
          shape="ring"
        />
      </Panel>
    </div>
  );
};

NotFound.displayName = "NotFound";

export default NotFound;
