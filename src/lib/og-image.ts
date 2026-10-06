const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "";
const siteDescription = process.env.NEXT_PUBLIC_SITE_META_DESCRIPTION ?? "";

/**
 * The default link-preview image, rendered by `src/app/og-image.png/route.tsx`
 * and referenced from the root layout's `openGraph` and `twitter` metadata.
 *
 * It is a route handler in a folder named with the extension, rather than the
 * `opengraph-image.tsx` file convention, because the static export writes that
 * convention to an extensionless file. GitHub Pages then serves it as
 * `application/octet-stream`, which some link-preview crawlers reject.
 */
export const ogImage = {
  alt: siteDescription ? `${siteName} — ${siteDescription}` : siteName,
  height: 630,
  type: "image/png",
  url: "/og-image.png",
  width: 1200,
};
