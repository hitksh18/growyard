"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { rememberReturnSection } from "@/lib/returnNav";

interface ReturnNavLinkProps extends Omit<ComponentProps<typeof Link>, "onClick"> {
  /** The homepage section this link originates from (used to return to it). */
  section: string;
  children: ReactNode;
}

/**
 * A next/link that records the homepage section being left before navigating
 * to a dedicated page, so the GrowthYard logo can return the user to that
 * homepage section later (skipping the intro).
 */
export default function ReturnNavLink({
  section,
  href,
  children,
  ...rest
}: ReturnNavLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => rememberReturnSection(section)}
      {...rest}
    >
      {children}
    </Link>
  );
}
