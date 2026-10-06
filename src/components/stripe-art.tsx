import { cn } from "@/lib/utils";

export type StripeShape = "chart" | "column" | "ring" | "sphere" | "wave";

type Tone = "a" | "b" | "signal";

interface Stripe {
  id: string;
  /** Distance from the middle line, used to stagger the draw-in. */
  order: number;
  tone: Tone;
  x1: number;
  x2: number;
  y: number;
}

interface Segment {
  tone: Tone;
  x1: number;
  x2: number;
}

const WIDTH = 400;
const TONE_COLORS: Record<Tone, string> = {
  a: "var(--art-a)",
  b: "var(--art-b)",
  signal: "var(--signal)",
};

const round = (value: number) => Math.round(value * 10) / 10;

/**
 * Slices of a twisting ribbon. Each line's width follows the cosine of the
 * twist, so the form pinches where the ribbon turns edge-on; the side facing
 * away is drawn in the softer tone, and the pinch points pick up the signal
 * colour.
 */
const column = (t: number): Segment[] => {
  const centre = WIDTH / 2 + WIDTH * 0.07 * Math.sin(t * Math.PI * 1.4);
  const facing = Math.cos(t * Math.PI * 2.3 + 0.4);
  const halfWidth = WIDTH * 0.34 * (0.14 + 0.86 * Math.abs(facing));
  const tone: Tone =
    Math.abs(facing) < 0.18 ? "signal" : facing > 0 ? "a" : "b";

  return [{ tone, x1: centre - halfWidth, x2: centre + halfWidth }];
};

/** Bar heights for the chart shape, as fractions of the drawing height. */
const CHART_BARS = [0.42, 0.66, 0.5, 0.92, 0.74];

/**
 * A bar chart drawn in stripes: each line breaks into short segments, one per
 * bar tall enough to reach that line. The tallest bar is in the signal colour.
 */
const chart = (t: number): Segment[] => {
  const reach = 1 - t;
  const slot = (WIDTH * 0.8) / CHART_BARS.length;
  const tallest = Math.max(...CHART_BARS);

  return CHART_BARS.flatMap((barHeight, bar) => {
    if (reach > barHeight) return [];

    const x1 = WIDTH * 0.1 + bar * slot + slot * 0.12;
    const tone: Tone =
      barHeight === tallest ? "signal" : bar % 2 === 0 ? "a" : "b";

    return [{ tone, x1, x2: x1 + slot * 0.76 }];
  });
};

/** Horizontal slices of a tilted ring, split in two through the hole. */
const ring = (t: number): Segment[] => {
  const y = (t - 0.5) * 2;
  const outer = Math.sqrt(Math.max(0, 1 - y * y)) * WIDTH * 0.42;
  const innerRadius = 0.52;
  const centre = WIDTH / 2 + y * WIDTH * 0.06;
  const tone: Tone = y < -0.2 ? "a" : y > 0.55 ? "signal" : "b";

  if (Math.abs(y) >= innerRadius) {
    return [{ tone, x1: centre - outer, x2: centre + outer }];
  }

  const inner =
    Math.sqrt(1 - (y / innerRadius) ** 2) * innerRadius * WIDTH * 0.42;

  return [
    { tone, x1: centre - outer, x2: centre - inner },
    { tone, x1: centre + inner, x2: centre + outer },
  ];
};

/** A disc whose slices break at a curved terminator, like a lit sphere. */
const sphere = (t: number): Segment[] => {
  const y = (t - 0.5) * 2;
  const half = Math.sqrt(Math.max(0, 1 - y * y)) * WIDTH * 0.4;
  const centre = WIDTH / 2;
  const split = centre + half * (0.35 - 0.25 * y);
  const gap = 6;

  return [
    { tone: "a", x1: centre - half, x2: split - gap / 2 },
    {
      tone: t > 0.78 ? "signal" : "b",
      x1: split + gap / 2,
      x2: centre + half,
    },
  ];
};

/** Full-width lines with ragged ends and a gap that drifts down the field. */
const wave = (t: number): Segment[] => {
  const start = WIDTH * (0.08 + 0.1 * Math.sin(t * Math.PI * 2));
  const end = WIDTH * (0.9 + 0.07 * Math.sin(t * Math.PI * 2.6 + 1));
  const gapCentre = WIDTH * (0.5 + 0.28 * Math.sin(t * Math.PI * 1.8));
  const gap = WIDTH * 0.05;
  const tone: Tone = t > 0.4 && t < 0.62 ? "signal" : "a";

  return [
    { tone, x1: start, x2: gapCentre - gap },
    { tone: tone === "signal" ? "signal" : "b", x1: gapCentre + gap, x2: end },
  ];
};

const SHAPES: Record<StripeShape, typeof column> = {
  chart,
  column,
  ring,
  sphere,
  wave,
};

/**
 * Builds the stripes for a shape. Pure and deterministic, so the server
 * render and any later render always agree.
 *
 * @param shape - Which form to slice
 * @param count - Number of horizontal lines
 * @param height - Height of the drawing in viewBox units
 * @returns One entry per drawn line segment
 */
const buildStripes = (
  shape: StripeShape,
  count: number,
  height: number
): Stripe[] => {
  const middle = (count - 1) / 2;

  return Array.from({ length: count }, (_, line) => {
    const t = line / (count - 1);
    const y = round(height * 0.04 + t * height * 0.92);

    return SHAPES[shape](t)
      .filter((segment) => segment.x2 - segment.x1 > 1)
      .map((segment, part) => ({
        id: `${line}-${part}`,
        order: Math.round(Math.abs(line - middle)),
        tone: segment.tone,
        x1: round(segment.x1),
        x2: round(segment.x2),
        y,
      }));
  }).flat();
};

interface StripeArtProps {
  /** Draw the lines in on load (respects reduced motion). */
  animate?: boolean;
  className?: string;
  /** Number of horizontal lines. */
  lines?: number;
  shape: StripeShape;
  /** Height of the drawing relative to its width of 400. */
  height?: number;
}

/**
 * Generative line art: a form described entirely by horizontal strokes.
 * Used for the hero ribbon and as placeholder imagery for projects, so every
 * image on the page shares one visual language. Decorative only.
 *
 * @param animate - Whether the lines draw in on load
 * @param className - Classes for the SVG element
 * @param height - viewBox height, against a fixed width of 400
 * @param lines - How many horizontal lines to draw
 * @param shape - Which form to draw
 * @returns An SVG drawing hidden from assistive technology
 */
const StripeArt = ({
  animate = false,
  className,
  height = 400,
  lines = 48,
  shape,
}: StripeArtProps) => {
  const stripes = buildStripes(shape, lines, height);
  const strokeWidth = round(((height * 0.92) / lines) * 0.42);

  return (
    <svg
      aria-hidden="true"
      className={cn(animate && "stripe-animate", className)}
      fill="none"
      focusable="false"
      viewBox={`0 0 ${WIDTH} ${height}`}
    >
      {stripes.map((stripe) => (
        <line
          key={stripe.id}
          stroke={TONE_COLORS[stripe.tone]}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          style={
            animate
              ? ({ "--i": stripe.order } as React.CSSProperties)
              : undefined
          }
          x1={stripe.x1}
          x2={stripe.x2}
          y1={stripe.y}
          y2={stripe.y}
        />
      ))}
    </svg>
  );
};

StripeArt.displayName = "StripeArt";

export default StripeArt;
