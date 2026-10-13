import { ButtonLink } from "@/components/ButtonLink";

export default function NotFound() {
  return (
    <section className="bg-cream">
      <div className="site-container py-24 lg:py-36">
        <p className="eyebrow">Page not found</p>
        <h1 className="mt-4 max-w-2xl text-[2.4rem] font-semibold sm:text-5xl">
          We could not find that page
        </h1>
        <p className="mt-5 max-w-xl text-lg text-muted">
          The link may be out of date. Try the products page or get in touch
          and we will help.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/products">View Products</ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Contact 1heiz
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
