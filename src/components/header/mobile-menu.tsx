"use client";

import { X } from "lucide-react";
import { useEffect, useEffectEvent } from "react";

import NavLink from "@/components/nav-link";

import Cta from "./cta";
import { headerCta, navigationItems } from "./navigation-items";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Mobile navigation menu: a panel that slides in over the field
 * @param isOpen - Whether the menu is open
 * @param onClose - Function to close the menu
 * @returns Mobile menu overlay with navigation links
 */
const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  // Effect Event: always sees the latest onClose without being an effect
  // dependency, so the keydown subscription below doesn't re-run every time
  // the parent re-renders.
  const onCloseEvent = useEffectEvent(onClose);

  // Close menu on escape key + lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseEvent();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#1d1a17]/40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile menu panel */}
      <div
        className={`bg-paper text-ink fixed inset-y-2 right-2 z-50 flex w-[min(20rem,calc(100vw-1rem))] flex-col rounded-[20px] transition-transform duration-300 ease-out md:hidden ${
          isOpen ? "translate-x-0" : "invisible translate-x-[110%]"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="flex shrink-0 justify-end p-4">
          <button
            type="button"
            onClick={onClose}
            className="border-line flex size-10 items-center justify-center rounded-full border"
            aria-label="Close menu"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6">
          <ul className="divide-line border-line divide-y border-y">
            {navigationItems.map((navItem) => (
              <li key={navItem.id}>
                <NavLink
                  href={navItem.href}
                  onNavigate={onClose}
                  className="block w-full py-4 text-left text-2xl tracking-tight"
                >
                  {navItem.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {headerCta ? (
          <div className="shrink-0 p-6 [--field:var(--paper)] [--on-field:var(--ink)]">
            <Cta
              item={headerCta}
              onNavigate={onClose}
              className="block w-full py-3.5 text-center text-base"
            />
          </div>
        ) : null}
      </div>
    </>
  );
};

MobileMenu.displayName = "MobileMenu";

export default MobileMenu;
