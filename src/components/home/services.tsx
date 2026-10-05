import Panel from "@/components/panel";
import { services } from "@/lib/content";

import SectionHeading from "./section-heading";

/**
 * Services section, on the inverse panel: one row per service with what it
 * covers and what it includes
 * @returns The services panel
 */
const Services = () => {
  return (
    <Panel
      aria-labelledby="services-heading"
      className="px-6 py-16 sm:px-10 lg:px-14 lg:py-24"
      id="services"
      inverse
    >
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <SectionHeading className="lg:col-span-5" id="services-heading">
          Services
        </SectionHeading>
        {/* <p className="text-muted max-w-[46ch] text-lg leading-relaxed lg:col-span-6 lg:col-start-7 lg:self-end">
          Most projects combine two or three of these. I scope each one around
          what you actually need, not a fixed package.
        </p> */}
      </div>

      <ul className="border-line mt-14 border-t lg:mt-20">
        {services.map((service) => (
          <li
            className="border-line grid gap-4 border-b py-8 lg:grid-cols-12 lg:gap-8 lg:py-10"
            key={service.id}
          >
            <h3 className="text-3xl tracking-tight lg:col-span-4 lg:text-4xl">
              {service.name}
            </h3>
            <p className="text-muted max-w-[52ch] text-lg leading-relaxed lg:col-span-5">
              {service.description}
            </p>
            <ul
              aria-label={`${service.name} includes`}
              className="flex flex-wrap content-start gap-2 lg:col-span-3"
            >
              {service.includes.map((item) => (
                <li
                  className="border-line rounded-full border px-3 py-1 text-sm"
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Panel>
  );
};

Services.displayName = "Services";

export default Services;
