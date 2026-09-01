import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import SectionLabel from "./SectionLabel";
import Reveal from "@/components/animations/Reveal";

interface SectionHeadingProps {
  label: string;
  number?: string;
  children: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  size?: "md" | "lg";
}

export default function SectionHeading({
  label,
  number,
  children,
  description,
  align = "left",
  className,
  size = "lg",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal
      className={cn(
        "flex flex-col gap-8",
        centered && "items-center text-center",
        className
      )}
    >
      <SectionLabel number={number}>{label}</SectionLabel>
      <h2
        className={cn(
          "text-balance font-medium tracking-tight text-paper",
          size === "lg"
            ? "text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.04]"
            : "text-3xl leading-[1.1] sm:text-4xl md:text-5xl",
          centered && "mx-auto"
        )}
      >
        {children}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-xl text-base leading-relaxed text-paper/55 sm:text-lg",
            centered && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}