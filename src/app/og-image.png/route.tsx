import { ImageResponse } from "next/og";

import { LOGO_BARS } from "@/components/logo-mark";
import { ogImage } from "@/lib/og-image";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "";
const siteDescription = process.env.NEXT_PUBLIC_SITE_META_DESCRIPTION ?? "";

// Rendered once at build time and exported as `out/og-image.png`;
// `output: "export"` rejects dynamic routes.
export const dynamic = "force-static";

/**
 * The default link-preview image for every page: the stripe mark and site
 * name in ink on a sand panel, framed by the vermilion field like the site.
 * See `src/lib/og-image.ts` for why this is a route handler.
 * @returns The 1200×630 PNG
 */
export function GET() {
  return new ImageResponse(
    <div
      style={{
        background: "#ff4a1c",
        display: "flex",
        height: "100%",
        padding: "28px",
        width: "100%",
      }}
    >
      <div
        style={{
          background: "#e9ded0",
          borderRadius: 32,
          color: "#1d1a17",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "64px 72px",
          width: "100%",
        }}
      >
        <svg height="112" viewBox="0 0 32 32" width="112">
          {LOGO_BARS.map((bar) => (
            <line
              key={bar.id}
              stroke="#1d1a17"
              strokeLinecap="round"
              strokeWidth={3}
              x1={bar.x1}
              x2={bar.x2}
              y1={bar.y}
              y2={bar.y}
            />
          ))}
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {siteName}
          </div>
          <div style={{ color: "#5c534a", fontSize: 32, maxWidth: 900 }}>
            {siteDescription}
          </div>
        </div>
      </div>
    </div>,
    { height: ogImage.height, width: ogImage.width }
  );
}
