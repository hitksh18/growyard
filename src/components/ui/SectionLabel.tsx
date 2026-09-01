import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: string;
  className?: string;
  number?: string;
}

export default function SectionLabel({
  children,
  className,
  number,
}: SectionLabelProps) {
  return (
    <span
      className={cn(
        "label-uppercase inline-flex items-center gap-3 text-paper/50",
        className
      )}
    >
      {number && (
        <span className="font-medium text-accent" aria-hidden="true">
          {number}
        </span>
      )}
      <span className="h-px w-8 bg-paper/30" aria-hidden="true" />
      {children}
    </span>
  );
}