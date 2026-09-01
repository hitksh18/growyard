import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "soft" | "ghost" | "link";
type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  icon?: boolean;
  iconDirection?: "right" | "up";
  className?: string;
  ariaLabel?: string;
}

interface AsLinkProps extends BaseProps {
  href: string;
}

interface AsButtonProps extends BaseProps {
  href?: undefined;
  type?: "button" | "submit";
  onClick?: () => void;
}

type ButtonProps = AsLinkProps | AsButtonProps;

const base =
  "group inline-flex items-center justify-center gap-2.5 text-ink uppercase tracking-[0.14em] font-medium transition-colors duration-300 disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "rounded-full bg-paper text-ink hover:bg-accent hover:text-paper",
  outline:
    "rounded-full border border-paper/25 text-paper hover:border-accent hover:text-accent",
  soft: "rounded-full bg-charcoal text-paper hover:bg-paper/10",
  ghost: "rounded-full text-paper hover:bg-paper/5 hover:text-accent",
  link: "link-underline p-0 uppercase text-paper/70 tracking-[0.14em] hover:text-paper",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-5 text-[0.7rem]",
  md: "h-12 px-7 text-[0.7rem]",
  lg: "h-14 px-9 text-[0.72rem]",
};

function Icon({ direction }: { direction: "right" | "up" }) {
  const cls =
    "h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5";
  if (direction === "up") {
    return (
      <ArrowUpRight
        className={cn(cls, "group-hover:-translate-y-0.5")}
        strokeWidth={2}
      />
    );
  }
  return <ArrowRight className={cls} strokeWidth={2} />;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  external,
  icon = true,
  iconDirection = "right",
  className,
  ariaLabel,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
        {icon && <Icon direction={iconDirection} />}
      </Link>
    );
  }

  const { type = "button" } = rest as AsButtonProps;

  return (
    <button type={type} className={classes} {...(rest as object)}>
      {children}
      {icon && <Icon direction={iconDirection} />}
    </button>
  );
}