"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { NavItem } from "@/data/site";
import { stripLocale } from "@/i18n/config";
import { interpolate } from "@/i18n/translate";
import { buttonClass } from "./ButtonLink";
import { LanguageSwitcher } from "./LanguageSwitcher";
import Link from "./LocaleLink";

/** A navigation entry, optionally with grouped links shown in a dropdown. */
export type SiteNavItem = NavItem & {
  groups?: { label: string; items: NavItem[] }[];
};

export type SiteNavLabels = {
  quote: string;
  openMenu: string;
  closeMenu: string;
  mobile: string;
  language: string;
  viewAll: string;
  /** e.g. "Show {name} menu" */
  showSubmenu: string;
  hideSubmenu: string;
};

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  const path = stripLocale(pathname);
  return path === href || path.startsWith(`${href}/`);
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 7.5l5 5 5-5" />
    </svg>
  );
}

const desktopLinkClass = (active: boolean) =>
  `relative inline-flex items-center gap-1.5 whitespace-nowrap py-2 font-display text-[0.9rem] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-forest-800 after:transition-transform after:duration-200 hover:text-forest-800 hover:after:scale-x-100 2xl:text-[0.93rem] ${
    active ? "text-forest-800 after:scale-x-100" : "text-charcoal after:scale-x-0"
  }`;

/** Desktop entry with a dropdown panel that opens on hover, focus or tap. */
function DesktopDropdown({
  item,
  active,
  pathname,
  viewAllLabel,
}: {
  item: SiteNavItem;
  active: boolean;
  pathname: string | null;
  viewAllLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const panelId = useId();
  const itemRef = useRef<HTMLLIElement>(null);

  // Close after following a link.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <li
      ref={itemRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!itemRef.current?.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          itemRef.current?.querySelector("a")?.focus();
        }
      }}
      className="flex h-[4.5rem] items-center"
    >
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(false)}
        className={desktopLinkClass(active)}
      >
        {item.label}
        <Chevron open={open} />
      </Link>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full z-50 border border-t-0 border-sand bg-paper shadow-[0_28px_50px_-30px_rgba(16,33,26,0.45)]"
      >
        <div className="gap-x-10 px-8 pb-2 pt-7 [column-count:3] 2xl:[column-count:4]">
          {item.groups?.map((group) => (
            <div key={group.label} className="mb-6 break-inside-avoid">
              <p className="eyebrow">{group.label}</p>
              <ul className="mt-2">
                {group.items.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-9 items-center text-[0.93rem] text-charcoal transition-colors hover:text-forest-800 hover:underline hover:underline-offset-4"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-sand px-8 py-4">
          <Link
            href={item.href}
            onClick={() => setOpen(false)}
            className="inline-flex min-h-9 items-center gap-2 font-display text-[0.9rem] font-semibold text-forest-800 underline decoration-forest-800/30 underline-offset-[6px] hover:decoration-forest-800"
          >
            {viewAllLabel}
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M3 10h13M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </li>
  );
}

export function DesktopLinks({
  items,
  pathname,
  viewAllLabel,
}: {
  items: SiteNavItem[];
  pathname: string | null;
  viewAllLabel: string;
}) {
  return (
    <ul className="hidden items-center gap-x-5 xl:flex 2xl:gap-x-7">
      {items.map((item) => {
        const active = isActive(pathname, item.href);

        if (item.groups?.length) {
          return (
            <DesktopDropdown
              key={item.href}
              item={item}
              active={active}
              pathname={pathname}
              viewAllLabel={viewAllLabel}
            />
          );
        }

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={desktopLinkClass(active)}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Primary navigation: desktop links plus an accessible mobile menu. Text arrives translated. */
export function SiteNav({
  items,
  quoteHref,
  labels,
}: {
  items: SiteNavItem[];
  quoteHref: string;
  labels: SiteNavLabels;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [lastPath, setLastPath] = useState(pathname);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the menu whenever the route changes.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setExpanded(null);
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

  const close = () => setOpen(false);

  return (
    <>
      <DesktopLinks items={items} pathname={pathname} viewAllLabel={labels.viewAll} />

      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className="-mr-2 inline-flex size-12 items-center justify-center text-charcoal xl:hidden"
      >
        <span className="sr-only">{open ? labels.closeMenu : labels.openMenu}</span>
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
        <nav aria-label={labels.mobile} className="site-container py-6">
          <ul className="divide-y divide-sand/70">
            {items.map((item) => {
              const active = isActive(pathname, item.href);
              const hasGroups = Boolean(item.groups?.length);
              const isExpanded = expanded === item.href;
              const submenuId = `${menuId}-${item.href.slice(1)}`;

              return (
                <li key={item.href}>
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={close}
                      className={`flex min-h-14 flex-1 items-center font-display text-xl font-medium ${
                        active ? "text-forest-800" : "text-charcoal"
                      }`}
                    >
                      {item.label}
                    </Link>
                    {hasGroups ? (
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        aria-controls={submenuId}
                        onClick={() => setExpanded(isExpanded ? null : item.href)}
                        className="inline-flex size-12 shrink-0 items-center justify-center text-charcoal"
                      >
                        <span className="sr-only">
                          {interpolate(
                            isExpanded ? labels.hideSubmenu : labels.showSubmenu,
                            { name: item.label },
                          )}
                        </span>
                        <span className="scale-150">
                          <Chevron open={isExpanded} />
                        </span>
                      </button>
                    ) : null}
                  </div>

                  {hasGroups ? (
                    <div id={submenuId} hidden={!isExpanded} className="pb-5">
                      {item.groups?.map((group) => (
                        <div key={group.label} className="mt-4 first:mt-1">
                          <p className="eyebrow">{group.label}</p>
                          <ul className="mt-1">
                            {group.items.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={close}
                                  className="flex min-h-11 items-center text-[1.02rem] text-charcoal"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-sand pt-5">
            <p className="font-display text-sm font-semibold text-charcoal">
              {labels.language}
            </p>
            <LanguageSwitcher label={labels.language} />
          </div>
          <Link
            href={quoteHref}
            onClick={close}
            className={`${buttonClass("primary")} mt-6 w-full`}
          >
            {labels.quote}
          </Link>
        </nav>
      </div>
    </>
  );
}
