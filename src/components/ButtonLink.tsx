import Link from "@/components/LocaleLink";
import type { ReactNode } from "react";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 font-display text-[0.95rem] font-semibold tracking-[-0.005em] transition-colors duration-200";

const variants = {
  primary: "bg-forest-800 text-cream hover:bg-forest-900",
  outline:
    "border border-forest-800 text-forest-800 hover:bg-forest-800 hover:text-cream",
  light: "bg-cream text-forest-900 hover:bg-white",
  outlineLight:
    "border border-cream/70 text-cream hover:bg-cream hover:text-forest-900",
} as const;

export const buttonClass = (variant: keyof typeof variants = "primary") =>
  `${base} ${variants[variant]}`;

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
}: {
  href: string;
  variant?: keyof typeof variants;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`${buttonClass(variant)} ${className}`}>
      {children}
    </Link>
  );
}

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M3 10h13M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Understated text link with an arrow, used inside cards and editorial sections. */
export function ArrowLink({
  href,
  children,
  tone = "dark",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const colour =
    tone === "dark"
      ? "text-forest-800 decoration-forest-800/30 hover:decoration-forest-800"
      : "text-cream decoration-cream/40 hover:decoration-cream";

  return (
    <Link
      href={href}
      className={`group inline-flex min-h-11 items-center gap-2 font-display text-[0.95rem] font-semibold underline underline-offset-[6px] transition-colors ${colour} ${className}`}
    >
      {children}
      <Arrow />
    </Link>
  );
}
