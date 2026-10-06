import NavLink from "@/components/nav-link";
import { cn } from "@/lib/utils";

import type { NavigationItem } from "./navigation-items";

interface CtaProps {
  className?: string;
  /** Where the button goes — a section (`#getting-started`) or a route. */
  item: NavigationItem;
  /**
   * Run after the navigation is requested. The mobile menu passes its close
   * handler here — it locks body scroll while open, so the menu has to close
   * for the scroll to actually happen.
   */
  onNavigate?: () => void;
}

/**
 * Call-to-action button component for header
 * Renders the configured `headerCta`; the header omits it when that is `null`
 * @param className - Extra classes, e.g. to change visibility per breakpoint
 * @param item - The navigation item the CTA points at
 * @param onNavigate - Optional callback fired after the navigation is requested
 * @returns CTA that scrolls to a section or links to a route
 */
const Cta = ({ className, item, onNavigate }: CtaProps) => {
  return (
    <NavLink
      href={item.href}
      className={cn(
        "bg-on-field text-field rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-85",
        className
      )}
      onNavigate={onNavigate}
    >
      {item.label}
    </NavLink>
  );
};

Cta.displayName = "Cta";

export default Cta;
