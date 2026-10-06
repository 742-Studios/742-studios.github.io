/**
 * Skip to main content link for improved keyboard navigation
 * Hidden by default and becomes visible when focused
 * @returns A skip link anchor element
 */
const SkipNav = () => (
  <a
    className="bg-paper text-ink sr-only rounded-full px-5 py-3 focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60]"
    href="#main"
  >
    Skip to main content
  </a>
);

SkipNav.displayName = "SkipNav";

export default SkipNav;
