import { cn } from "@/lib/utils";

interface PanelProps {
  "aria-labelledby"?: string;
  as?: "div" | "main" | "section";
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Flip to the dark panel. Children pick up the swapped palette. */
  inverse?: boolean;
}

/**
 * A rounded content panel set into the vermilion field. Every section of the
 * site sits in one, so the field reads as a frame around the work.
 *
 * @param props - Panel props; `as` picks the element, `inverse` the palette
 * @returns The panel element
 */
const Panel = ({
  as: Element = "section",
  children,
  className,
  inverse = false,
  ...rest
}: PanelProps) => (
  <Element
    className={cn(
      "bg-paper text-ink scroll-mt-24 rounded-[20px] sm:rounded-[28px]",
      inverse && "panel-inverse",
      className
    )}
    {...rest}
  >
    {children}
  </Element>
);

Panel.displayName = "Panel";

export default Panel;
