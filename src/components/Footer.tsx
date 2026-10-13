import Link from "next/link";
import { brochure, legalNav, mainNav, site, supplyNav, type NavItem } from "@/data/site";
import { Wordmark } from "./Wordmark";

function FooterList({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div>
      <h2 className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-wood-400">
        {title}
      </h2>
      <ul className="mt-4 space-y-1">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-flex min-h-9 items-center text-[0.95rem] text-cream/85 transition-colors hover:text-white hover:underline hover:underline-offset-4"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const { email, phone } = site.contact;
  const { legalName, address } = site.company;

  return (
    <footer className="on-dark bg-forest-950 text-cream">
      <div className="site-container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10 lg:py-20">
        <div className="max-w-sm">
          <Wordmark tone="light" />
          <p className="mt-5 text-[0.95rem] text-cream/75">
            Wood pellets for biomass heating, supplied bagged, in bulk and to
            wholesale buyers. Enquiries are handled personally, with product
            details and pricing confirmed in your quote.
          </p>
        </div>

        <FooterList title="Products & supply" items={supplyNav} />
        <FooterList title="Company" items={mainNav.slice(3)} />

        <div>
          <h2 className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-wood-400">
            Get in touch
          </h2>
          <ul className="mt-4 space-y-1 text-[0.95rem] text-cream/85">
            {address ? <li className="whitespace-pre-line pb-2">{address}</li> : null}
            {email ? (
              <li>
                <a
                  href={`mailto:${email}`}
                  className="inline-flex min-h-9 items-center hover:text-white hover:underline hover:underline-offset-4"
                >
                  {email}
                </a>
              </li>
            ) : null}
            {phone ? (
              <li>
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="inline-flex min-h-9 items-center hover:text-white hover:underline hover:underline-offset-4"
                >
                  {phone}
                </a>
              </li>
            ) : null}
            <li>
              <a
                href={brochure.href}
                download={brochure.downloadName}
                className="inline-flex min-h-9 items-center hover:text-white hover:underline hover:underline-offset-4"
              >
                Download brochure (PDF)
              </a>
            </li>
            <li>
              <Link
                href="/contact"
                className="inline-flex min-h-9 items-center hover:text-white hover:underline hover:underline-offset-4"
              >
                Send an enquiry
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="site-container flex flex-col gap-3 py-6 text-sm text-cream/65 md:flex-row md:items-center md:justify-between">
          <p>
            © {site.copyrightYear} {legalName || site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-9 items-center hover:text-white hover:underline hover:underline-offset-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
