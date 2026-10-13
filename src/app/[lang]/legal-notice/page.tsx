import { Breadcrumbs } from "@/components/Breadcrumbs";
import Link from "@/components/LocaleLink";
import { site } from "@/data/site";
import { getT } from "@/i18n/server";
import { rich } from "@/i18n/translate";
import { pageMetadata } from "@/lib/metadata";
import { T } from "@/components/T";

export function generateMetadata() {
  return pageMetadata({
    title: "Legal Notice",
    description: "Legal notice and website terms for 1heiz Wood Pellets.",
    path: "/legal-notice",
  });
}

export default async function LegalNoticePage() {
  const t = await getT();
  const { legalName, address, registration, vatId } = site.company;
  const { email, phone } = site.contact;

  const details = [
    { label: "Company", value: legalName },
    { label: "Address", value: address },
    { label: "Company registration", value: registration },
    { label: "VAT ID", value: vatId },
    { label: "Email", value: email },
    { label: "Phone", value: phone },
  ].filter((detail) => detail.value);

  return (
    <>
      <Breadcrumbs items={[{ label: "Legal Notice", href: "/legal-notice" }]} />
      <section className="bg-cream">
        <div className="site-container max-w-3xl pb-12 pt-8">
          <h1 className="text-[2.4rem] font-semibold sm:text-5xl"><T>Legal Notice</T></h1>
        </div>
      </section>
      <section className="bg-paper">
        <div className="prose-1heiz site-container max-w-3xl py-12 lg:py-16">
          <h2><T>Website operator</T></h2>
          {details.length > 0 ? (
            <dl>
              {details.map((detail) => (
                <div
                  key={detail.label}
                  className="grid gap-x-4 gap-y-1 border-t border-sand py-3 sm:grid-cols-[11rem_1fr]"
                >
                  <dt className="font-display font-semibold">{t(detail.label)}</dt>
                  <dd className="whitespace-pre-line break-words">{detail.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p>
              {rich(
                t(
                  "This website is operated by {name}. To reach the operator, please use the <link>contact form</link>.",
                  { name: site.name },
                ),
                { link: (text) => <Link href="/contact">{text}</Link> },
              )}
            </p>
          )}

          <h2><T>Product information</T></h2>
          <p>
            <T>Information on this website is provided for general guidance and
            does not constitute a binding offer. Product specifications, prices,
            availability and delivery terms are confirmed individually in a
            written quote.</T>
          </p>

          <h2><T>External links</T></h2>
          <p>
            <T>This website may link to third-party websites. We have no control
            over their content and accept no responsibility for it.</T>
          </p>
        </div>
      </section>
    </>
  );
}
