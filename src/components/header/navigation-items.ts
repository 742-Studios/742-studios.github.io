export interface NavigationItem {
  href: string;
  id: number;
  label: string;
}

/**
 * Header navigation items, shown in the header on desktop and in the mobile
 * menu on small screens.
 *
 * Route links (`/about`) render as anchors. Section links (`#features`) render
 * as buttons that smooth-scroll to the element with that id on the home page.
 */
export const navigationItems: NavigationItem[] = [
  { href: "#about", id: 1, label: "About" },
  { href: "#services", id: 2, label: "Services" },
  { href: "#projects", id: 3, label: "Projects" },
  { href: "#contact", id: 4, label: "Contact" },
];

/**
 * The header's call-to-action button, shown beside the theme toggle and at the
 * foot of the mobile menu. Set it to `null` to hide it.
 */
export const headerCta: NavigationItem | null = {
  href: "#contact",
  id: 0,
  label: "Start a project",
};
