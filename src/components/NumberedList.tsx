import { getT } from "@/i18n/server";

export type NumberedItem = { title: string; body: string };

/** Hairline-ruled numbered list used for strengths, steps and checklists. */
export async function NumberedList({
  items,
  columns = 1,
  tone = "dark",
}: {
  items: NumberedItem[];
  columns?: 1 | 2;
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  const t = await getT();

  return (
    <ol className={`grid gap-x-12 ${columns === 2 ? "md:grid-cols-2" : ""}`}>
      {items.map((item, index) => (
        <li
          key={item.title}
          className={`grid grid-cols-[2.75rem_1fr] gap-x-3 border-t py-6 ${
            light ? "border-cream/20" : "border-sand"
          }`}
        >
          <span
            aria-hidden="true"
            className={`font-display text-sm font-semibold tabular-nums ${
              light ? "text-wood-400" : "text-wood-700"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3
              className={`text-[1.15rem] font-semibold ${light ? "text-cream" : ""}`}
            >
              {t(item.title)}
            </h3>
            <p
              className={`mt-1.5 text-[0.97rem] ${
                light ? "text-cream/75" : "text-muted"
              }`}
            >
              {t(item.body)}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
