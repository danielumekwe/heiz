import Link from "next/link";
import type { Article } from "@/data/resources";
import { Photo } from "./Photo";

export function ArticleCard({ article }: { article: Article }) {
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
          {article.topic}
          <span className="mx-2 text-sand" aria-hidden="true">
            /
          </span>
          <span className="tracking-[0.12em]">{article.readingMinutes} min read</span>
        </p>
        <h3 className="mt-3 text-[1.3rem] font-semibold">
          <Link
            href={`/resources/${article.slug}`}
            className="after:absolute after:inset-0 group-hover:text-forest-800"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 text-[0.97rem] text-muted">{article.excerpt}</p>
      </div>
    </article>
  );
}
