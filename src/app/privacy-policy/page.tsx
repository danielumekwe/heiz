import { Breadcrumbs } from "@/components/Breadcrumbs";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How 1heiz Wood Pellets handles personal data submitted through this website.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  const { legalName, address } = site.company;
  const { email } = site.contact;

  return (
    <>
      <Breadcrumbs items={[{ label: "Privacy Policy", href: "/privacy-policy" }]} />
      <section className="bg-cream">
        <div className="site-container max-w-3xl pb-12 pt-8">
          <h1 className="text-[2.4rem] font-semibold sm:text-5xl">Privacy Policy</h1>
          <p className="mt-5 text-lg text-muted">
            This policy explains what personal data this website collects and
            how it is used.
          </p>
        </div>
      </section>
      <section className="bg-paper">
        <div className="prose-1heiz site-container max-w-3xl py-12 lg:py-16">
          <h2>Who is responsible</h2>
          <p>
            This website is operated by {legalName || site.name}
            {address ? `, ${address.replace(/\n/g, ", ")}` : ""}.{" "}
            {email ? (
              <>
                For any privacy question, contact{" "}
                <a href={`mailto:${email}`}>{email}</a>.
              </>
            ) : (
              <>
                For any privacy question, please use the{" "}
                <a href="/contact">contact form</a>.
              </>
            )}
          </p>

          <h2>Data you send us</h2>
          <p>
            When you submit the enquiry form we receive the details you enter:
            your name, email address, and any company name, phone number,
            estimated quantity, delivery location and message you choose to
            provide.
          </p>
          <p>
            We use this information only to respond to your enquiry and, if you
            go on to order, to prepare and fulfil that order. The legal basis is
            your consent and the steps needed before entering into a contract
            with you.
          </p>

          <h2>Cookies and tracking</h2>
          <p>
            This website does not set advertising or analytics cookies and does
            not embed third-party trackers. If that changes, this policy will be
            updated and consent will be requested where the law requires it.
          </p>

          <h2>Server logs</h2>
          <p>
            Like most websites, the hosting provider may record technical
            request data such as IP address, time of access and browser type in
            server logs, in order to keep the service secure and working.
          </p>

          <h2>Sharing and retention</h2>
          <p>
            We do not sell personal data. Enquiry details are shared only with
            service providers that help us operate the website and handle
            correspondence, and are kept only for as long as needed to deal with
            your enquiry and to meet legal record-keeping duties.
          </p>

          <h2>Your rights</h2>
          <p>
            Depending on where you live, you may have the right to access,
            correct or delete your personal data, to restrict or object to its
            processing, to withdraw consent, and to complain to your data
            protection authority. To exercise these rights, contact us using the
            details above.
          </p>
        </div>
      </section>
    </>
  );
}
