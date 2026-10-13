"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { mainNav, quoteHref } from "@/data/site";
import { buttonClass } from "./ButtonLink";

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopLinks({ pathname }: { pathname: string | null }) {
  return (
    <ul className="hidden items-center gap-x-7 xl:flex">
      {mainNav.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`relative py-2 font-display text-[0.93rem] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-forest-800 after:transition-transform after:duration-200 hover:text-forest-800 hover:after:scale-x-100 ${
                active
                  ? "text-forest-800 after:scale-x-100"
                  : "text-charcoal after:scale-x-0"
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Primary navigation: desktop links plus an accessible mobile menu. */
export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the menu whenever the route changes.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 80rem)");
    const onDesktop = () => desktop.matches && setOpen(false);

    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <DesktopLinks pathname={pathname} />

      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className="-mr-2 inline-flex size-12 items-center justify-center text-charcoal xl:hidden"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M3 7h18M3 12h18M3 17h18" />
          )}
        </svg>
      </button>

      <div
        id={menuId}
        hidden={!open}
        className="absolute inset-x-0 top-full h-[calc(100dvh-100%)] overflow-y-auto border-t border-sand bg-paper xl:hidden"
      >
        <nav aria-label="Mobile" className="site-container py-6">
          <ul className="divide-y divide-sand/70">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`flex min-h-14 items-center font-display text-xl font-medium ${
                      active ? "text-forest-800" : "text-charcoal"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={quoteHref}
            onClick={() => setOpen(false)}
            className={`${buttonClass("primary")} mt-8 w-full`}
          >
            Request a Quote
          </Link>
        </nav>
      </div>
    </>
  );
}
