"use client";

import { X } from "lucide-react";
import { useEffect, useEffectEvent, useRef } from "react";

import NavLink from "@/components/nav-link";

import Cta from "./cta";
import { headerCta, navigationItems } from "./navigation-items";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Matches Tailwind's `md` breakpoint, where the desktop nav takes over. */
const DESKTOP_QUERY = "(min-width: 48rem)";

/**
 * Mobile navigation menu: a native modal `<dialog>` that slides in over the
 * field. `showModal()` gives focus trapping, Escape to close, an inert page
 * behind it, and focus restoration to the trigger, so none of that is hand-rolled here.
 * @param isOpen - Whether the menu is open
 * @param onClose - Function to close the menu
 * @returns Mobile menu dialog with navigation links
 */
const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Effect Event: always sees the latest onClose without being an effect
  // dependency, so the subscriptions below don't re-run every time the
  // parent re-renders.
  const onCloseEvent = useEffectEvent(onClose);

  // Keep the dialog in sync with `isOpen`, lock body scroll while open, and
  // close it if the viewport grows past the breakpoint: the dialog is hidden
  // there, but a modal dialog would still make the rest of the page inert.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!isOpen) {
      if (dialog.open) dialog.close();
      return;
    }

    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";

    const desktop = window.matchMedia(DESKTOP_QUERY);
    const handleBreakpoint = () => {
      if (desktop.matches) onCloseEvent();
    };
    desktop.addEventListener("change", handleBreakpoint);

    return () => {
      desktop.removeEventListener("change", handleBreakpoint);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    // Native Escape (and any other close) fires `close`, which syncs the
    // parent's state back to closed. The dialog itself is a transparent,
    // full-screen layer; the panel and the dimmed scrim are its children.
    <dialog
      ref={dialogRef}
      className="group fixed inset-0 m-0 size-full max-h-none max-w-none bg-transparent transition-[display,overlay] transition-discrete duration-300 backdrop:bg-transparent md:hidden"
      aria-label="Menu"
      onClose={onClose}
    >
      <div className="bg-paper text-ink absolute inset-y-2 right-2 z-10 flex w-[min(20rem,calc(100vw-1rem))] translate-x-[110%] flex-col rounded-[20px] transition-transform duration-300 ease-out group-open:translate-x-0 starting:group-open:translate-x-[110%]">
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

      {/*
        Scrim: tapping outside the panel closes the menu. It comes after the
        panel so the dialog's initial focus lands on the close button, and it
        stays out of the tab order and accessibility tree because that close
        button already does the same job for keyboard and screen reader users.
      */}
      <button
        type="button"
        className="absolute inset-0 size-full cursor-default bg-[#1d1a17]/40 opacity-0 transition-opacity duration-300 group-open:opacity-100 starting:group-open:opacity-0"
        aria-hidden="true"
        aria-label="Close menu"
        tabIndex={-1}
        onClick={onClose}
      />
    </dialog>
  );
};

MobileMenu.displayName = "MobileMenu";

export default MobileMenu;
