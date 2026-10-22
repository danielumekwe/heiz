import Link from "@/components/LocaleLink";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { site } from "@/data/site";
import { getT } from "@/i18n/server";
import { rich } from "@/i18n/translate";
import { pageMetadata } from "@/lib/metadata";
import { T } from "@/components/T";

export function generateMetadata() {
  return pageMetadata({
    title: "Privacy Policy",
    description:
      "How 1heiz Wood Pellets collects, uses and protects personal data, and the rights you have under the GDPR.",
    path: "/privacy-policy",
  });
}

const LAST_UPDATED = "22 October 2026";

type Section = { id: string; title: string; body: ReactNode };

export default async function PrivacyPolicyPage() {
  const t = await getT();
  const { legalName, address } = site.company;
  const { email, phone } = site.contact;
  const operator = legalName || site.name;

  const contactLine = email ? (
    <a href={`mailto:${email}`}>{email}</a>
  ) : (
    <Link href="/contact"><T>our contact form</T></Link>
  );

  const sections: Section[] = [
    {
      id: "controller",
      title: "Controller and contact details",
      body: (
        <>
          <p>
            {t(
              "{name} processes personal data in accordance with the EU General Data Protection Regulation (GDPR). The controller responsible for this website is:",
              { name: operator },
            )}
          </p>
          <address className="not-italic">
            <strong>{operator}</strong>
            {address ? (
              <>
                <br />
                <span className="whitespace-pre-line">{address}</span>
              </>
            ) : null}
            {phone ? (
              <>
                <br />
                {t("Phone")}: <a href={`tel:${phone.replace(/\s+/g, "")}`}>{phone}</a>
              </>
            ) : null}
            {email ? (
              <>
                <br />
                {t("Email")}: <a href={`mailto:${email}`}>{email}</a>
              </>
            ) : null}
          </address>
        </>
      ),
    },
    {
      id: "purpose",
      title: "Purpose and legal basis",
      body: (
        <>
          <p><T>We process personal data for the following purposes:</T></p>
          <ul>
            <li>
              <strong><T>Contracts and pre-contractual steps.</T></strong>{" "}
<T>To prepare
              quotes, fulfil orders and issue invoices. Legal basis: Art.
              6(1)(b) GDPR, and Art. 6(1)(c) GDPR where tax and commercial law
              require us to keep records.</T>
            </li>
            <li>
              <strong><T>Enquiries.</T></strong>{" "}
<T>To answer questions you send through
              the enquiry form, by email, by phone or by post. Legal basis:
              Art. 6(1)(b) GDPR where your enquiry relates to a possible
              order, your consent under Art. 6(1)(a) GDPR, and otherwise our
              legitimate interest in answering you under Art. 6(1)(f) GDPR.</T>
            </li>
            <li>
              <strong><T>Operating the website.</T></strong>{" "}
<T>To deliver the pages you
              request and to detect faults and misuse. Legal basis: our
              legitimate interest in a stable and secure website under Art.
              6(1)(f) GDPR.</T>
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "recipients",
      title: "Recipients",
      body: (
        <>
          <p>
            <T>We do not sell personal data. It is passed on only where that is
            necessary for the purposes above.</T>
          </p>
          <h3 id="recipients-contract">
            <T>3.1 Contract performance or pre-contractual measures</T>
          </h3>
          <p>
            <T>To prepare and deliver an order, the data needed for that step may
            be passed to suppliers and carriers involved in the delivery, to
            our email and telephone providers, to the provider that hosts this
            website, and to tax advisers or authorities where the law requires
            it.</T>
          </p>
          <h3 id="recipients-contact"><T>3.2 Enquiry form or other contact</T></h3>
          <ul>
            <li>
              <strong><T>Enquiry form:</T></strong>{" "}
<T>the website host and the service
              that delivers form submissions to us.</T>
            </li>
            <li>
              <strong><T>Email:</T></strong>{" "}
<T>our email provider.</T>
            </li>
            <li>
              <strong><T>Phone and messaging:</T></strong>{" "}
<T>our telephone provider
              and, if you choose to message us, the operator of the messaging
              service, which processes your data under its own privacy terms.</T>
            </li>
            <li>
              <strong><T>Post:</T></strong>{" "}
<T>the postal operator.</T>
            </li>
          </ul>
          <p>
            <T>Service providers acting on our behalf process data only on our
            instructions. If one of them processes data outside the European
            Economic Area, we make sure an adequate level of protection
            applies, for example through an adequacy decision of the European
            Commission or standard contractual clauses.</T>
          </p>
          <h3 id="recipients-analytics">
            <T>3.3 Data analysis by third-party providers</T>
          </h3>
          <p>
            <T>We use the Google Ads tag and Shown metrics to measure and improve
            our online advertising. These optional tools are loaded only after
            you accept analytics and advertising cookies. You can change or
            withdraw your choice at any time using Cookie settings.</T>
          </p>
          <p>
            <T>This website does not embed social media plugins, maps or videos
            from third parties. The fonts are served from our own website, so
            no font provider receives your IP address.</T>
          </p>
        </>
      ),
    },
    {
      id: "cookies",
      title: "Cookies",
      body: (
        <p>
          <T>This website uses an essential cookie to remember your language
          and another to remember your cookie choice. The Google Ads tag and
          Shown metrics described in section 3.3 are loaded only if you accept
          optional analytics and advertising cookies; those providers may then
          set their own cookies. You can change your choice at any time using
          Cookie settings or delete cookies in your browser settings.</T>
        </p>
      ),
    },
    {
      id: "storage-period",
      title: "Storage period",
      body: (
        <>
          <p>
            <T>We keep enquiry data for as long as it takes to deal with your
            request and any follow-up questions. If an enquiry does not lead
            to an order, we delete it once it is no longer needed.</T>
          </p>
          <p>
            <T>Where an order is placed, we keep the related records for the
            periods required by German commercial and tax law. Server log data
            is kept only for as long as needed to operate and secure the
            website.</T>
          </p>
        </>
      ),
    },
    {
      id: "your-rights",
      title: "Data protection rights",
      body: (
        <>
          <p><T>Under the GDPR you have the right to:</T></p>
          <ul>
            <li><T>information about the personal data we hold on you (Art. 15);</T></li>
            <li><T>correction of inaccurate data (Art. 16);</T></li>
            <li><T>deletion of your data (Art. 17);</T></li>
            <li><T>restriction of processing (Art. 18);</T></li>
            <li><T>receive your data in a portable format (Art. 20);</T></li>
            <li>
              <T>lodge a complaint with a data protection supervisory authority
              (Art. 77).</T>
            </li>
          </ul>
          <p>
            {rich(
              t("To exercise these rights, write to the address in section 1 or to <contact/>."),
              { contact: () => contactLine },
            )}
          </p>
        </>
      ),
    },
    {
      id: "objection",
      title: "Right of objection and other rights",
      body: (
        <>
          <p>
            <strong><T>Withdrawing consent.</T></strong>{" "}
<T>Where processing is based on
            your consent, you can withdraw it at any time with effect for the
            future (Art. 7(3) GDPR). Processing carried out before the
            withdrawal remains lawful.</T>
          </p>
          <p>
            <strong><T>Objecting to processing.</T></strong>{" "}
<T>Where processing is
            based on our legitimate interests under Art. 6(1)(f) GDPR, you can
            object to it at any time on grounds relating to your particular
            situation (Art. 21 GDPR).</T>
          </p>
          <p>
            <strong><T>Supervisory authority.</T></strong>{" "}
<T>You may complain to any
            data protection authority, in particular in the EU member state
            where you live or work. The authority responsible for our
            registered address is the Saxon Data Protection and Transparency
            Commissioner (Sächsische Datenschutz- und
            Transparenzbeauftragte), Dresden.</T>
          </p>
        </>
      ),
    },
    {
      id: "mandatory-data",
      title: "Mandatory data provision",
      body: (
        <>
          <p>
            <T>You are not obliged to give us personal data. Without the details
            below, however, we cannot provide the service concerned.</T>
          </p>
          <h3 id="mandatory-contract"><T>8.1 Contract performance</T></h3>
          <p>
            <T>To prepare a quote and carry out an order we need your name, a way
            to reach you, the product and quantity, and the delivery address.
            Invoices additionally require the billing details the law
            prescribes.</T>
          </p>
          <h3 id="mandatory-contact"><T>8.2 Enquiry form or other enquiries</T></h3>
          <p>
            <T>The enquiry form requires your name, email address, the type of
            enquiry and your message. Company, phone number, product,
            estimated quantity and delivery location are optional.</T>
          </p>
          <h3 id="mandatory-website">
            <T>8.3 Website operation and fault detection</T>
          </h3>
          <p>
            <T>When you open a page, the hosting server automatically receives
            the technical data your browser sends: IP address, date and time
            of the request, the page requested, the referring page, and
            browser and operating system. This is needed to deliver the page
            and to trace faults.</T>
          </p>
        </>
      ),
    },
    {
      id: "accounts",
      title: "Customer account, newsletter and price alerts",
      body: (
        <p>
          <T>This website has no customer accounts, newsletter or price-alert
          service, so no data is collected for these purposes.</T>
        </p>
      ),
    },
    {
      id: "automated-decisions",
      title: "Automated decision-making",
      body: (
        <p>
          <T>We do not make decisions about you by automated means and do not
          carry out profiling.</T>
        </p>
      ),
    },
  ];

  return (
    <>
      <Breadcrumbs items={[{ label: "Privacy Policy", href: "/privacy-policy" }]} />
      <section className="border-b border-sand/70 bg-cream">
        <div className="site-container max-w-4xl pb-14 pt-8 lg:pb-20">
          <p className="eyebrow"><T>Legal</T></p>
          <h1 className="mt-4 text-[2.4rem] font-semibold sm:text-5xl lg:text-[3.5rem]">
            <T>Privacy Policy</T>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            {t(
              "This policy explains which personal data {name} processes when you use this website or contact us, why we do so, and the rights you have.",
              { name: site.name },
            )}
          </p>
          <p className="mt-4 text-sm text-muted">{t("Last updated: {date}", { date: t(LAST_UPDATED) })}</p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="site-container grid gap-10 py-14 lg:grid-cols-[16rem_1fr] lg:gap-16 lg:py-20">
          <nav
            aria-label={t("On this page")}
            className="min-w-0 lg:sticky lg:top-28 lg:self-start"
          >
            <p className="eyebrow"><T>On this page</T></p>
            <ol className="mt-4 border-l border-sand">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="-ml-px flex min-h-10 items-center gap-3 border-l border-transparent py-1.5 pl-4 text-[0.93rem] text-muted transition-colors hover:border-forest-800 hover:text-forest-800"
                  >
                    <span className="font-display text-xs font-semibold tabular-nums text-wood-700">
                      {index + 1}.
                    </span>
                    {t(section.title)}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="min-w-0 max-w-3xl">
            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 border-b border-sand py-9 first:pt-0 last:border-b-0"
              >
                <h2 className="flex items-baseline gap-4 text-[1.6rem] font-semibold">
                  <span className="font-display text-sm font-semibold tabular-nums text-wood-700">
                    {index + 1}.
                  </span>
                  {t(section.title)}
                </h2>
                <div className="prose-1heiz mt-4 text-[1.02rem] sm:pl-9">
                  {section.body}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
