import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { articles } from "@/data/resources";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Wood Pellet Resources and Guides",
  description:
    "Practical guides from 1heiz on choosing, storing and buying wood pellets, from specifications to bagged versus bulk supply.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Resources", href: "/resources" }]} />
      <PageHero
        eyebrow="Resources"
        title="Guides to buying and using wood pellets"
        intro="Plain-language guidance on pellet quality, specifications, storage and supply formats, for households and trade buyers alike."
        image="hands"
      />
      <section className="bg-paper">
        <div className="site-container py-16 lg:py-24">
          <h2 className="sr-only">All guides</h2>
          {articles.length > 0 ? (
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <p className="text-muted">Guides will be published here soon.</p>
          )}
        </div>
      </section>
      <CtaBand
        title="Have a question we have not covered?"
        body="Ask us directly and we will help you find the right product and format."
        cta="Contact 1heiz"
      />
    </>
  );
}
