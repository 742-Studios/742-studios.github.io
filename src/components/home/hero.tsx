import NavLink from "@/components/nav-link";
import Panel from "@/components/panel";
import StripeArt from "@/components/stripe-art";
import { hero } from "@/lib/content";

import DotLabel from "./dot-label";

/**
 * Landing page hero: the studio name set wide across the foot of the panel,
 * with the twisting stripe ribbon rising behind it on the right.
 * @returns The hero panel
 */
const Hero = () => {
  return (
    <Panel
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[min(52rem,calc(100svh-6rem))] flex-col overflow-hidden px-6 pt-8 pb-6 sm:px-10 sm:pt-10 lg:px-14 lg:pb-10"
      id="top"
    >
      <p className="text-muted text-[0.9375rem]">{hero.intro}</p>

      <StripeArt
        animate
        className="pointer-events-none mx-auto mt-8 h-64 w-auto sm:h-80 lg:absolute lg:top-6 lg:right-[4%] lg:-z-10 lg:mt-0 lg:h-[78%]"
        height={620}
        lines={70}
        shape="column"
      />

      <div className="mt-auto max-w-xl pt-10 lg:max-w-2xl lg:pt-24">
        <p className="text-2xl leading-snug tracking-tight text-balance sm:text-[1.75rem] lg:text-[2rem]">
          {hero.lead}
        </p>

        <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4 text-lg">
          <NavLink href="#contact" className="group rounded-sm">
            <DotLabel>Start a project</DotLabel>
          </NavLink>
          <NavLink href="#projects" className="group rounded-sm">
            <DotLabel>See my work</DotLabel>
          </NavLink>
        </div>
      </div>

      <h1
        className="font-display text-ink mt-12 text-[clamp(2.1rem,10vw,9.5rem)] leading-[0.95] tracking-[-0.02em] lg:mt-16"
        id="hero-heading"
      >
        {process.env.NEXT_PUBLIC_SITE_NAME}
      </h1>
    </Panel>
  );
};

Hero.displayName = "Hero";

export default Hero;
