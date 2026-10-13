import Image from "next/image";
import Link from "next/link";

const logo = {
  src: "/images/brand/1heiz-wood-pellets-logo.webp",
  width: 800,
  height: 283,
};

/**
 * Official 1heiz Wood Pellets logo, linked to the home page.
 * The artwork is dark green, so on dark backgrounds it sits on a cream plate
 * rather than being recoloured.
 */
export function Wordmark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      aria-label="1heiz Wood Pellets, home"
      className={`inline-flex shrink-0 items-center ${
        tone === "light" ? "bg-cream px-4 py-3" : ""
      }`}
    >
      <Image
        src={logo.src}
        alt="1heiz Wood Pellets"
        width={logo.width}
        height={logo.height}
        sizes="170px"
        priority={tone === "dark"}
        className={tone === "light" ? "h-12 w-auto" : "h-11 w-auto sm:h-[3.25rem]"}
      />
    </Link>
  );
}
