"use client";

import { useEffect } from "react";

import { consumePendingScrollTarget } from "@/lib/use-scroll-to-section";
import { scrollToSection } from "@/lib/utils";

/**
 * Finishes a section link clicked on another route. The nav stashes the
 * target and navigates home; this scrolls to it once the page has mounted.
 * @returns Nothing visible
 */
const PendingScroll = () => {
  useEffect(() => {
    const sectionId = consumePendingScrollTarget();

    if (sectionId) scrollToSection(sectionId);
  }, []);

  return null;
};

PendingScroll.displayName = "PendingScroll";

export default PendingScroll;
