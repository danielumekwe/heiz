"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { interpolate } from "@/i18n/translate";
import { ButtonLink } from "./ButtonLink";

export type Slide = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  /** Full-bleed photograph behind the copy. */
  background?: { src: string; alt: string };
  /** Cut-out product image shown beside the copy on a plain green field. */
  product?: { src: string; width: number; height: number; alt: string };
};

const INTERVAL = 7000;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={direction === "left" ? "M12.5 4.5 7 10l5.5 5.5" : "M7.5 4.5 13 10l-5.5 5.5"} />
    </svg>
  );
}

const controlClass =
  "inline-flex size-11 items-center justify-center border border-cream/40 text-cream transition-colors hover:bg-cream hover:text-forest-900";

export type HeroSliderLabels = {
  region: string;
  /** e.g. "{current} of {total}" */
  position: string;
  /** e.g. "Show slide {number}: {title}" */
  showSlide: string;
  pause: string;
  play: string;
  previous: string;
  next: string;
};

/** Home page hero: an accessible, auto-advancing carousel. Text arrives translated. */
export function HeroSlider({
  slides,
  labels,
}: {
  slides: Slide[];
  labels: HeroSliderLabels;
}) {
  const [index, setIndex] = useState(0);
  // Auto-advance is off by default for visitors who prefer reduced motion;
  // the play button still lets them opt in.
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
  const [choice, setChoice] = useState<boolean | null>(null);
  const playing = choice ?? !reducedMotion;
  const [hovering, setHovering] = useState(false);
  const regionRef = useRef<HTMLElement>(null);

  const count = slides.length;
  const go = useCallback(
    (next: number) => setIndex((next + count) % count),
    [count],
  );

  useEffect(() => {
    if (!playing || hovering) return;
    const timer = window.setTimeout(() => go(index + 1), INTERVAL);
    return () => window.clearTimeout(timer);
  }, [playing, hovering, index, go]);

  return (
    <section
      ref={regionRef}
      aria-roledescription="carousel"
      aria-label={labels.region}
      className="on-dark relative isolate overflow-hidden bg-forest-950"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={(event) => {
        if (!regionRef.current?.contains(event.relatedTarget)) setHovering(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") go(index - 1);
        if (event.key === "ArrowRight") go(index + 1);
      }}
    >
      {/* Slides share one grid cell, so the hero is as tall as the tallest slide. */}
      <div className="grid min-h-[36rem] sm:min-h-[38rem] lg:min-h-[calc(100svh-4.5rem)] lg:max-h-[52rem]">
        {slides.map((slide, slideIndex) => {
          const active = slideIndex === index;
          const Heading = slideIndex === 0 ? "h1" : "h2";

          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={interpolate(labels.position, {
                current: slideIndex + 1,
                total: slides.length,
              })}
              inert={!active}
              className={`relative col-start-1 row-start-1 flex items-end transition-opacity duration-700 ease-out ${
                active ? "z-10 opacity-100" : "opacity-0"
              }`}
            >
              {slide.background ? (
                <>
                  <Image
                    src={slide.background.src}
                    alt={slide.background.alt}
                    fill
                    priority={slideIndex === 0}
                    sizes="100vw"
                    className="-z-20 object-cover object-[62%_60%]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-linear-to-t from-forest-950/90 via-forest-950/55 to-forest-950/25 lg:bg-linear-to-r lg:from-forest-950/88 lg:via-forest-950/50 lg:to-transparent"
                  />
                </>
              ) : (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_55%,var(--color-forest-800)_0%,var(--color-forest-950)_62%)]"
                />
              )}

              <div className="site-container grid w-full items-center gap-6 pb-28 pt-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:pb-32 lg:pt-16">
                <div className="max-w-2xl">
                  <p className="eyebrow">{slide.eyebrow}</p>
                  <Heading className="mt-5 text-[2.3rem] font-semibold text-cream sm:text-[3.4rem] lg:text-[4.2rem]">
                    {slide.title}
                  </Heading>
                  <p className="mt-6 max-w-xl text-lg text-cream/90 sm:text-xl">
                    {slide.body}
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <ButtonLink href={slide.primary.href} variant="light">
                      {slide.primary.label}
                    </ButtonLink>
                    <ButtonLink href={slide.secondary.href} variant="outlineLight">
                      {slide.secondary.label}
                    </ButtonLink>
                  </div>
                </div>

                {slide.product ? (
                  <Image
                    src={slide.product.src}
                    alt={slide.product.alt}
                    width={slide.product.width}
                    height={slide.product.height}
                    sizes="(min-width: 1024px) 24rem, 11rem"
                    className={`order-first mx-auto h-44 w-auto drop-shadow-[0_24px_30px_rgba(0,0,0,0.5)] transition-transform duration-[900ms] ease-out sm:h-56 lg:order-none lg:h-[30rem] ${
                      active ? "translate-y-0 scale-100" : "translate-y-4 scale-95"
                    }`}
                  />
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="site-container absolute inset-x-0 bottom-7 z-20 flex items-center justify-between gap-4 lg:bottom-10">
        <div className="flex items-center gap-1">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.id}
              type="button"
              aria-label={interpolate(labels.showSlide, {
                number: slideIndex + 1,
                title: slide.title,
              })}
              aria-current={slideIndex === index ? "true" : undefined}
              onClick={() => go(slideIndex)}
              className="group flex h-11 items-center px-1"
            >
              <span
                className={`block h-[3px] transition-all duration-300 ${
                  slideIndex === index
                    ? "w-12 bg-cream"
                    : "w-7 bg-cream/40 group-hover:bg-cream/70"
                }`}
              />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setChoice(!playing)}
            className={controlClass}
          >
            <span className="sr-only">
              {playing ? labels.pause : labels.play}
            </span>
            <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4" fill="currentColor">
              {playing ? (
                <path d="M5 4h3.5v12H5zM11.5 4H15v12h-3.5z" />
              ) : (
                <path d="M6 4l10 6-10 6z" />
              )}
            </svg>
          </button>
          <button
            type="button"
            aria-label={labels.previous}
            onClick={() => go(index - 1)}
            className={controlClass}
          >
            <Chevron direction="left" />
          </button>
          <button
            type="button"
            aria-label={labels.next}
            onClick={() => go(index + 1)}
            className={controlClass}
          >
            <Chevron direction="right" />
          </button>
        </div>
      </div>
    </section>
  );
}
