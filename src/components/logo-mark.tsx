/**
 * The 742 Studios mark: a "7" built from horizontal stripes, the same
 * language as the line art across the site. The crossbar is one long stripe;
 * the stem is five short ones stepping down and to the left.
 *
 * Kept in sync by hand with `src/app/icon.svg`, which draws the same bars on a
 * vermilion tile for the favicon.
 */
export const LOGO_BARS = [
  { id: "bar", x1: 5, x2: 27, y: 7 },
  { id: "stem-1", x1: 19, x2: 26, y: 11.5 },
  { id: "stem-2", x1: 16.5, x2: 23.5, y: 16 },
  { id: "stem-3", x1: 14, x2: 21, y: 20.5 },
  { id: "stem-4", x1: 11.5, x2: 18.5, y: 25 },
] as const;

interface LogoMarkProps {
  className?: string;
}

/**
 * Renders the stripe "7" in the current text colour.
 *
 * @param className - Classes for the SVG element (size it with these)
 * @returns The logo mark, hidden from assistive technology
 */
const LogoMark = ({ className }: LogoMarkProps) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    focusable="false"
    viewBox="0 0 32 32"
  >
    {LOGO_BARS.map((bar) => (
      <line
        key={bar.id}
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={3}
        x1={bar.x1}
        x2={bar.x2}
        y1={bar.y}
        y2={bar.y}
      />
    ))}
  </svg>
);

LogoMark.displayName = "LogoMark";

export default LogoMark;
