import { cn } from "@/lib/utils";

interface DotLabelProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * The vermilion dot that marks an action, as in "• Start a project". Wrap it
 * in whatever element does the work — a link, a button, a submit.
 *
 * @param children - The action text
 * @param className - Extra classes for the wrapper
 * @returns The label with its leading dot
 */
const DotLabel = ({ children, className }: DotLabelProps) => (
  <span className={cn("inline-flex items-center gap-3", className)}>
    <span
      aria-hidden="true"
      className="bg-signal size-2 shrink-0 rounded-full"
    />
    <span className="underline-offset-[6px] group-hover:underline">
      {children}
    </span>
  </span>
);

DotLabel.displayName = "DotLabel";

export default DotLabel;
