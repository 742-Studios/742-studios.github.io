import Panel from "@/components/panel";
import { about } from "@/lib/content";

import SectionHeading from "./section-heading";

/**
 * About section: who the studio is, with a few plain facts beneath
 * @returns The about panel
 */
const About = () => {
  return (
    <Panel
      aria-labelledby="about-heading"
      className="grid gap-10 px-6 py-16 sm:px-10 lg:grid-cols-12 lg:gap-8 lg:px-14 lg:py-24"
      id="about"
    >
      <SectionHeading className="lg:col-span-4" id="about-heading">
        About
      </SectionHeading>

      <div className="lg:col-span-7 lg:col-start-6">
        <p className="text-3xl leading-tight tracking-tight sm:text-4xl">
          {about.lead}
        </p>

        <div className="text-muted mt-8 max-w-[60ch] space-y-5 text-lg leading-relaxed">
          {about.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <dl className="border-line mt-12 grid grid-cols-2 gap-x-8 border-t sm:grid-cols-4">
          {about.facts.map((fact) => (
            <div
              className="border-line border-b py-5 sm:border-b-0"
              key={fact.label}
            >
              <dt className="text-muted text-sm">{fact.label}</dt>
              <dd className="mt-1 text-lg">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Panel>
  );
};

About.displayName = "About";

export default About;
