"use client";

import { useState } from "react";
import type { FaqCategory } from "@/data/faq";
import Link from "./LocaleLink";

const ALL = "__all";

/** Category filter and question list for the FAQ page. Content arrives translated. */
export function FaqTabs({
  categories,
  labels,
}: {
  categories: FaqCategory[];
  labels: { topics: string; filter: string; all: string };
}) {
  const [active, setActive] = useState(ALL);
  const total = categories.reduce((sum, category) => sum + category.items.length, 0);
  const tabs = [
    { id: ALL, label: labels.all, count: total },
    ...categories.map((category) => ({
      id: category.id,
      label: category.label,
      count: category.items.length,
    })),
  ];
  const visible =
    active === ALL ? categories : categories.filter((category) => category.id === active);

  return (
    <div className="grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-16">
      <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
        <p className="eyebrow">{labels.topics}</p>
        <div
          role="group"
          aria-label={labels.filter}
          className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-2 lg:overflow-visible lg:pb-0"
        >
          {tabs.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(tab.id)}
                className={`flex min-h-12 w-max shrink-0 items-center justify-between gap-5 border px-4 text-left font-display text-sm font-semibold transition-colors lg:w-full ${
                  selected
                    ? "border-forest-800 bg-forest-800 text-cream"
                    : "border-sand bg-white text-charcoal hover:border-forest-800 hover:text-forest-800"
                }`}
              >
                {tab.label}
                <span
                  className={`font-sans text-xs font-normal ${
                    selected ? "text-cream/80" : "text-muted"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div aria-live="polite" className="min-w-0">
        {visible.map((category) => (
          <section key={category.id} className="mb-14 last:mb-0">
            <h2 className="border-b border-charcoal/80 pb-3 text-[1.6rem] font-semibold">
              {category.label}
            </h2>
            <dl>
              {category.items.map((item) => (
                <div key={item.question} className="border-b border-sand py-6">
                  <dt className="font-display text-[1.12rem] font-semibold text-charcoal">
                    {item.question}
                  </dt>
                  <dd className="mt-2 max-w-2xl space-y-3 text-[0.98rem] text-muted">
                    {item.answer.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {item.link ? (
                      <p>
                        <Link
                          href={item.link.href}
                          className="font-semibold text-forest-800 underline underline-offset-4"
                        >
                          {item.link.label}
                        </Link>
                      </p>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
