"use client";

import { useState } from "react";

import Cta from "./cta";
import Logo from "./logo";
import MobileMenu from "./mobile-menu";
import ModeToggle from "./mode-toggle";
import Navigation from "./navigation";
import { headerCta } from "./navigation-items";

/**
 * Header component for site-wide navigation and branding
 * Sits on the vermilion field and stays pinned while the panels scroll
 * beneath it, so the field keeps framing the page.
 * @returns Header with logo, navigation, CTA, and theme toggle
 */
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-field sticky top-0 z-50">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Logo />

        <Navigation />

        <div className="flex items-center gap-2">
          {headerCta ? (
            <Cta item={headerCta} className="hidden sm:block" />
          ) : null}

          <ModeToggle />

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-on-field flex size-10 items-center justify-center rounded-full md:hidden"
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="size-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeWidth={1.75}
                d="M4 8h16M4 16h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};

Header.displayName = "Header";

export default Header;
