"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Theme toggle component for switching between light and dark modes
 * @returns Toggle button with tooltip for theme switching
 */
const ModeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  // Use useSyncExternalStore to check if we're mounted (avoids setState in useEffect)
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Hold the space while unmounted so the header doesn't shift on hydration.
  if (!mounted) return <div className="size-10" />;

  const isDark = resolvedTheme === "dark";
  const label = `Switch to ${isDark ? "light" : "dark"} mode`;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={label}
            className="border-on-field/30 text-on-field hover:border-on-field flex size-10 items-center justify-center rounded-full border transition-colors"
            id="themeToggle"
          >
            {isDark ? (
              <Sun className="size-4" aria-hidden="true" />
            ) : (
              <Moon className="size-4" aria-hidden="true" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

ModeToggle.displayName = "ModeToggle";

export default ModeToggle;
