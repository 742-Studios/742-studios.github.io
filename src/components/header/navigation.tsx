import NavLink from "@/components/nav-link";

import { navigationItems } from "./navigation-items";

/**
 * Main navigation component for header
 * Renders navigation items that either scroll to a section or link to a route
 * @returns Navigation menu (hidden on mobile)
 */
const Navigation = () => {
  return (
    <nav aria-label="Main" className="hidden md:block">
      <ul className="flex items-center gap-7">
        {navigationItems.map((navItem) => (
          <li key={navItem.id}>
            <NavLink
              href={navItem.href}
              className="text-on-field rounded-sm text-[0.9375rem] underline-offset-[6px] hover:underline"
            >
              {navItem.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Navigation.displayName = "Navigation";

export default Navigation;
