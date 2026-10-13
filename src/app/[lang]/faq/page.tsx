import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { FaqTabs } from "@/components/FaqTabs";
import { JsonLd } from "@/components/JsonLd";
import Link from "@/components/LocaleLink";
import { site } from "@/data/site";
import { localizeFaq } from "@/i18n/content";
import { getT } from "@/i18n/server";
import { rich } from "@/i18n/translate";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata({
    title: "FAQ: Answers to Frequently Asked Questions",
    description:
      "Answers to common questions about prices, ordering, payment, delivery and products from 1heiz Wood Pellets.",
    path: "/faq",
  });
}

const linkClass = "font-semibold text-forest-800 underline underline-offset-4";

export default async function FaqPage() {
  const t = await getT();
  const { email, phone } = site.contact;
  const categories = localizeFaq(t);

  const intro =
    phone && email
      ? t(
          "The questions below may already answer yours. If not, call us on <phone/>, email <email/> or use the <link>contact form</link>.",
        )
      : t(
          "The questions below may already answer yours. If not, use the <link>contact form</link>.",
        );

  return (
    <>
      <Breadcrumbs items={[{ label: "FAQ", href: "/faq" }]} />
      <section className="border-b border-sand/70 bg-cream">
        <div className="site-container max-w-4xl pb-14 pt-8 lg:pb-20">
          <p className="eyebrow">{t("FAQ")}</p>
          <h1 className="mt-4 text-[2.4rem] font-semibold sm:text-5xl lg:text-[3.5rem]">
            {t("Answers to frequently asked questions")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            {rich(intro, {
              phone: () => (
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className={`whitespace-nowrap ${linkClass}`}
                >
                  {phone}
                </a>
              ),
              email: () => (
                <a href={`mailto:${email}`} className={linkClass}>
                  {email}
                </a>
              ),
              link: (text) => (
                <Link href="/contact" className={linkClass}>
                  {text}
                </Link>
              ),
            })}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact#enquiry">{t("Request a Quote")}</ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              {t("Contact Form")}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="site-container py-14 lg:py-20">
          <FaqTabs
            categories={categories}
            labels={{
              topics: t("Topics"),
              filter: t("Filter questions by topic"),
              all: t("All questions"),
            }}
          />
        </div>
      </section>

      <CtaBand
        title="Still have a question?"
        body="Tell us what you need to know and we will answer it directly."
        cta="Contact 1heiz"
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: categories.flatMap((category) =>
            category.items.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer.join(" "),
              },
            })),
          ),
        }}
      />
    </>
  );
}
