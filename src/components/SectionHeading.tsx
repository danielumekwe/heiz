import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  children,
  as: Tag = "h2",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Tag className="mt-3 text-[2rem] font-semibold sm:text-[2.5rem] lg:text-[2.85rem]">
        {title}
      </Tag>
      {children ? (
        <div className="mt-5 space-y-4 text-[1.05rem] text-muted">{children}</div>
      ) : null}
    </div>
  );
}
