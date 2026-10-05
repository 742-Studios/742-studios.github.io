/**
 * Landing page copy.
 *
 * Projects are real; the rest is still placeholder content for establishing
 * the design and layout. It lives in one file so it can be replaced without
 * touching any component markup.
 */

export const contactEmail = "hello@742studios.dev";

export const hero = {
  intro: "Independent design and engineering studio",
  lead: "I design and build websites and web apps for small teams who need them to look sharp, load fast, and keep working long after launch.",
};

export const about = {
  body: [
    "742 Studios is a one-person studio. I build full-stack web and mobile applications, and I handle every stage myself: architecture, development, testing, and deployment.",
    "Working with one developer keeps things simple. You talk directly to the person writing the code, nothing gets lost in hand-offs between teams, and the person who built your app is the one who keeps it running.",
  ],
  facts: [
    { label: "Founded", value: "2026" },
    { label: "Based in", value: "Toronto, ON" },
    // { label: "Accessibility", value: "WCAG 2.1 AA" },
    { label: "Core stack", value: "Next.js, TypeScript" },
  ],
  lead: "One developer, from architecture to deployment.",
};

export interface Service {
  description: string;
  id: string;
  includes: string[];
  name: string;
}

export const services: Service[] = [
  {
    description:
      "Marketing sites and portfolios designed around your content, built to score well on speed and accessibility from day one.",
    id: "websites",
    includes: ["Content planning", "Visual design", "Next.js build", "SEO"],
    name: "Websites",
  },
  {
    description:
      "Interfaces for new products and redesigns of existing ones, tested extensively before launch.",
    id: "product-design",
    includes: ["UI design", "Wireframes", "Prototypes", "Design systems"],
    name: "Product design",
  },
  {
    description:
      "Dashboards, booking tools, and internal apps, with the integrations, authentication, and data handling they need.",
    id: "web-apps",
    includes: ["React apps", "APIs", "Payments", "Analytics"],
    name: "Web apps",
  },
  // {
  //   description:
  //     "Ongoing updates, monitoring, and small improvements once you are live, on a monthly plan you can cancel any time.",
  //   id: "care",
  //   includes: ["Hosting", "Updates", "Performance checks", "Support"],
  //   name: "Care plans",
  // },
];

export interface Project {
  /** One-line summary of what the project is. */
  summary: string;
  /** Short facts shown as a definition list beside the summary. */
  details: { label: string; value: string }[];
  highlights: string[];
  id: string;
  image: { alt: string; height: number; src: string; width: number };
  link: { href: string; label: string };
  title: string;
}

export const projects: Project[] = [
  {
    details: [
      { label: "Type", value: "Own product" },
      { label: "Licence", value: "MIT core, paid Pro" },
      { label: "Stack", value: "Next.js 16, TypeScript, Tailwind CSS" },
    ],
    highlights: [
      "WCAG 2.1 AA accessibility, verified with Axe-core scans in light and dark mode",
      "Lighthouse scores and Playwright tests across Chromium, Firefox, and WebKit, enforced in CI",
      "A $199 Pro version that adds authentication, Stripe billing, a database, an admin dashboard, and right-to-left languages",
    ],
    id: "nextstarter",
    image: {
      alt: "The NextStarter home page: the headline “Ship accessible Next.js apps in minutes” on a dark background, with buttons to get started free or upgrade to Pro.",
      height: 1102,
      src: "/projects/nextstarter.png",
      width: 2204,
    },
    link: {
      href: "https://www.nextstarter.app/",
      label: "Visit nextstarter.app",
    },
    summary:
      "A free, open-source Next.js boilerplate that hands developers a configured project with accessibility, end-to-end tests, and CI already set up. This site is built on it.",
    title: "NextStarter",
  },
];
