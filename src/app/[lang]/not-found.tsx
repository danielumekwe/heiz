import { ButtonLink } from "@/components/ButtonLink";
import { T } from "@/components/T";

export default function NotFound() {
  return (
    <section className="bg-cream">
      <div className="site-container py-24 lg:py-36">
        <p className="eyebrow"><T>Page not found</T></p>
        <h1 className="mt-4 max-w-2xl text-[2.4rem] font-semibold sm:text-5xl">
          <T>We could not find that page</T>
        </h1>
        <p className="mt-5 max-w-xl text-lg text-muted">
          <T>The link may be out of date. Try the products page or get in touch
          and we will help.</T>
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/products"><T>View Products</T></ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            <T>Contact 1heiz</T>
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
