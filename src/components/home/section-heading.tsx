import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
  id: string;
}

/**
 * The large accent-coloured heading that opens each landing page section.
 * Rust on the sand panels and vermilion on the inverse panel, both above
 * 4.5:1, so it passes at any size.
 *
 * @param children - Heading text
 * @param className - Extra classes
 * @param id - Id for the section's `aria-labelledby`
 * @returns An h2
 */
const SectionHeading = ({ children, className, id }: SectionHeadingProps) => (
  <h2
    className={cn(
      "text-accent text-[clamp(2.5rem,5.5vw,4.75rem)] leading-none font-medium tracking-[-0.035em]",
      className
    )}
    id={id}
  >
    {children}
  </h2>
);

SectionHeading.displayName = "SectionHeading";

export default SectionHeading;
