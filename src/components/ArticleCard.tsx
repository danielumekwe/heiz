import Link from "@/components/LocaleLink";
import type { Article } from "@/data/resources";
import { getT } from "@/i18n/server";
import { Photo } from "./Photo";

export async function ArticleCard({ article }: { article: Article }) {
  const t = await getT();

  return (
    <article className="group relative flex flex-col">
      <Photo
        image={article.image}
        frame="aspect-[3/2]"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        alt=""
        imageClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
      <div className="flex flex-1 flex-col border-b border-sand pb-6 pt-5">
        <p className="eyebrow">
          {t(article.topic)}
          <span className="mx-2 text-sand" aria-hidden="true">
            /
          </span>
          <span className="tracking-[0.12em]">{t("{minutes} min read", { minutes: article.readingMinutes })}</span>
        </p>
        <h3 className="mt-3 text-[1.3rem] font-semibold">
          <Link
            href={`/resources/${article.slug}`}
            className="after:absolute after:inset-0 group-hover:text-forest-800"
          >
            {t(article.title)}
          </Link>
        </h3>
        <p className="mt-2 text-[0.97rem] text-muted">{t(article.excerpt)}</p>
      </div>
    </article>
  );
}
