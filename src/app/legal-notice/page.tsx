import { Breadcrumbs } from "@/components/Breadcrumbs";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Legal Notice",
  description: "Legal notice and website terms for 1heiz Wood Pellets.",
  path: "/legal-notice",
});

export default function LegalNoticePage() {
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
          <h1 className="text-[2.4rem] font-semibold sm:text-5xl">Legal Notice</h1>
        </div>
      </section>
      <section className="bg-paper">
        <div className="prose-1heiz site-container max-w-3xl py-12 lg:py-16">
          <h2>Website operator</h2>
          {details.length > 0 ? (
            <dl>
              {details.map((detail) => (
                <div
                  key={detail.label}
                  className="grid gap-x-4 gap-y-1 border-t border-sand py-3 sm:grid-cols-[11rem_1fr]"
                >
                  <dt className="font-display font-semibold">{detail.label}</dt>
                  <dd className="whitespace-pre-line break-words">{detail.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p>
              This website is operated by {site.name}. To reach the operator,
              please use the <a href="/contact">contact form</a>.
            </p>
          )}

          <h2>Product information</h2>
          <p>
            Information on this website is provided for general guidance and
            does not constitute a binding offer. Product specifications, prices,
            availability and delivery terms are confirmed individually in a
            written quote.
          </p>

          <h2>Images</h2>
          <p>
            Some photographs on this website are illustrative and do not show
            1heiz premises or equipment. Branded packaging images are design
            concepts. Sources and licences are listed on the{" "}
            <a href="/image-credits">image credits</a> page.
          </p>

          <h2>External links</h2>
          <p>
            This website may link to third-party websites. We have no control
            over their content and accept no responsibility for it.
          </p>
        </div>
      </section>
    </>
  );
}
