import type { ReactNode } from "react";
import { getT } from "@/i18n/server";
import type { Vars } from "@/i18n/translate";

/** Section title block. `eyebrow` and `title` are given in English and translated here. */
export async function SectionHeading({
  eyebrow,
  title,
  titleVars,
  children,
  as: Tag = "h2",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  /** Values for {placeholders} in `title`. */
  titleVars?: Vars;
  children?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}) {
  const t = await getT();

  return (
    <div className={`max-w-2xl ${className}`}>
      {eyebrow ? <p className="eyebrow">{t(eyebrow)}</p> : null}
      <Tag className="mt-3 text-[2rem] font-semibold sm:text-[2.5rem] lg:text-[2.85rem]">
        {t(title, titleVars)}
      </Tag>
      {children ? (
        <div className="mt-5 space-y-4 text-[1.05rem] text-muted">{children}</div>
      ) : null}
    </div>
  );
}
