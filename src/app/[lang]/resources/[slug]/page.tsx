import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { images } from "@/data/images";
import { articles, getArticle } from "@/data/resources";
import { absoluteUrl, site } from "@/data/site";
import { localizePath } from "@/i18n/config";
import { getLocale, getT } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { T } from "@/components/T";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/resources/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return pageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/resources/${article.slug}`,
  });
}

export default async function ArticlePage({
  params,
}: PageProps<"/[lang]/resources/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const t = await getT();
  const locale = await getLocale();
  const more = articles.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Resources", href: "/resources" },
          { label: article.title, href: `/resources/${article.slug}` },
        ]}
      />
      <article>
        <header className="bg-cream">
          <div className="site-container max-w-4xl pb-12 pt-8 lg:pb-16">
            <p className="eyebrow">
              {t(article.topic)}
              <span className="mx-2 text-sand" aria-hidden="true">
                /
              </span>
              <span className="tracking-[0.12em]">
                {t("{minutes} min read", { minutes: article.readingMinutes })}
              </span>
            </p>
            <h1 className="mt-4 text-[2.3rem] font-semibold sm:text-5xl lg:text-[3.4rem]">
              {t(article.title)}
            </h1>
            <p className="mt-6 text-xl text-muted">{t(article.intro)}</p>
          </div>
        </header>

        <div className="bg-linear-to-b from-cream from-50% to-paper to-50%">
          <div className="site-container max-w-5xl">
            <Photo
              image={article.image}
              frame="aspect-[16/9]"
              sizes="(min-width: 1024px) 64rem, 100vw"
              priority
            />
          </div>
        </div>

        <div className="site-container max-w-3xl py-12 lg:py-16">
          <div className="prose-1heiz text-[1.07rem]">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2>{t(section.heading)}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{t(paragraph)}</p>
                ))}
                {section.list ? (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{t(item)}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
          <p className="mt-12 border-t border-sand pt-6 text-sm text-muted">
            <T>This guide offers general information. Always follow the
            instructions of your appliance and storage manufacturers.</T>
          </p>
        </div>
      </article>

      <section className="bg-cream">
        <div className="site-container py-16 lg:py-24">
          <h2 className="text-[1.9rem] font-semibold sm:text-[2.3rem]">
            <T>More guides</T>
          </h2>
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: t(article.title),
          description: t(article.excerpt),
          inLanguage: locale,
          image: absoluteUrl(images[article.image].src),
          mainEntityOfPage: absoluteUrl(localizePath(locale, `/resources/${article.slug}`)),
          author: { "@type": "Organization", name: site.name },
          publisher: { "@type": "Organization", name: site.name },
        }}
      />
    </>
  );
}
