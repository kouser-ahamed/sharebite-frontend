"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  FiArrowDown,
  FiArrowLeft,
  FiArrowRight,
  FiChevronRight,
  FiHeart,
  FiMapPin,
  FiShield,
} from "react-icons/fi";
import { MdFoodBank } from "react-icons/md";

interface HeroSlide {
  id: number;
  image: string;
  badge: string;
  title: string;
  highlightedText: string;
  description: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    image:
      "/assets/sharebite/heroimg-1.png",
    badge: "From One Table to Another",
    title: "Let Good Food Reach",
    highlightedText: "Another Home",
    description:
      "When fresh food remains after a family meal, celebration, restaurant service, or community event, share it through ShareBite. Someone nearby can request it and receive a good meal with dignity instead of letting it go to waste.",
  },
  {
    id: 2,
    image:
      "/assets/sharebite/heroimg-2.png",
    badge: "Good Food Should Be Shared",
    title: "Share What Is Extra,",
    highlightedText:
      "Care for Someone Nearby",
    description:
      "A meal that is extra for one person may be valuable to another. Post safe and fresh surplus food for free, allow people who need it to send a request, and help meaningful food sharing grow within the community.",
  },
  {
    id: 3,
    image:
      "/assets/sharebite/heroimg-3.png",
    badge: "Food for People, Not Waste",
    title: "Together We Can Turn",
    highlightedText:
      "Surplus Into Support",
    description:
      "ShareBite brings food owners and community members together through a respectful request system. By sharing good food from homes, programmes, restaurants, and gatherings, we can reduce waste and help more people enjoy a proper meal.",
  },
];

const AUTO_SLIDE_INTERVAL = 5000;

const HeroSection = () => {
  const [
    activeSlide,
    setActiveSlide,
  ] = useState(0);

  const goToNextSlide =
    useCallback(() => {
      setActiveSlide(
        (currentSlide) =>
          (currentSlide + 1) %
          HERO_SLIDES.length,
      );
    }, []);

  const goToPreviousSlide = () => {
    setActiveSlide(
      (currentSlide) =>
        currentSlide === 0
          ? HERO_SLIDES.length - 1
          : currentSlide - 1,
    );
  };

  useEffect(() => {
    const sliderInterval =
      window.setInterval(
        goToNextSlide,
        AUTO_SLIDE_INTERVAL,
      );

    return () => {
      window.clearInterval(
        sliderInterval,
      );
    };
  }, [goToNextSlide]);

  const currentSlide =
    HERO_SLIDES[activeSlide];

  return (
    <section
      id="home"
      className="relative min-h-[620px] overflow-hidden bg-[#F7F8F3] dark:bg-black lg:h-[68vh] lg:min-h-[650px]"
    >
      {/* Background slider images */}
      <div className="absolute inset-0">
        {HERO_SLIDES.map(
          (slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                activeSlide === index
                  ? "scale-100 opacity-100"
                  : "scale-105 opacity-0"
              }`}
            >
              <Image
                src={slide.image}
                alt="People respectfully sharing fresh surplus food through ShareBite"
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-[64%_center] brightness-[1.02] contrast-[1.02] saturate-[1.06] dark:brightness-[0.8] dark:contrast-[1.05] dark:saturate-[0.95] lg:object-[72%_center]"
              />
            </div>
          ),
        )}

        {/* Light full-screen overlay */}
        <div className="absolute inset-0 bg-white/10 dark:bg-black/15 lg:bg-white/5 lg:dark:bg-black/10" />

        {/* Light mode left-side gradient */}
        <div className="absolute inset-0 bg-linear-to-r from-[#FAFAF7]/98 via-[#FAFAF7]/82 to-transparent dark:hidden lg:from-[#FAFAF7]/96 lg:via-[#FAFAF7]/68 lg:to-transparent" />

        {/* Dark mode left-side gradient */}
        <div className="absolute inset-0 hidden bg-linear-to-r from-black/96 via-black/76 to-black/5 dark:block lg:from-black/94 lg:via-black/64 lg:to-transparent" />

        {/* Soft bottom depth */}
        <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent dark:from-black/30" />
      </div>

      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-24 top-20 size-72 rounded-full bg-emerald-400/10 blur-3xl dark:bg-emerald-500/10" />

      <div className="pointer-events-none absolute bottom-10 left-[35%] size-64 rounded-full bg-lime-300/10 blur-3xl dark:bg-lime-400/5" />

      {/* Main content */}
      <div className="relative z-10 mx-auto flex h-full min-h-[620px] w-full max-w-7xl items-center px-4 py-20 sm:px-6 lg:min-h-[650px] lg:px-4 lg:py-16">
        <div className="w-full max-w-2xl">
          {/* Badge */}
          <div
            key={`badge-${activeSlide}`}
            className="inline-flex animate-[fadeInUp_0.6s_ease-out] items-center gap-2 rounded-full border border-emerald-300 bg-white/95 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-emerald-800 shadow-sm dark:border-emerald-700/70 dark:bg-zinc-950/90 dark:text-emerald-300"
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-emerald-100 text-sm text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              <FiHeart />
            </span>

            {currentSlide.badge}
          </div>

          {/* Heading */}
          <div
            key={`heading-${activeSlide}`}
            className="animate-[fadeInUp_0.7s_ease-out]"
          >
            <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight text-slate-950 [text-shadow:0_1px_2px_rgba(255,255,255,0.35)] dark:text-white dark:[text-shadow:0_2px_16px_rgba(0,0,0,0.95)] sm:text-5xl lg:text-6xl">
              {currentSlide.title}{" "}

              <span className="text-emerald-800 dark:bg-linear-to-r dark:from-emerald-300 dark:via-emerald-400 dark:to-lime-300 dark:bg-clip-text dark:text-transparent">
                {
                  currentSlide.highlightedText
                }
              </span>
            </h1>
          </div>

          {/* Description */}
          <p
            key={`description-${activeSlide}`}
            className="mt-6 max-w-xl animate-[fadeInUp_0.8s_ease-out] text-base font-semibold leading-7 text-slate-900 [text-shadow:0_1px_1px_rgba(255,255,255,0.3)] dark:text-zinc-100 dark:[text-shadow:0_1px_12px_rgba(0,0,0,0.95)] sm:text-lg"
          >
            {currentSlide.description}
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/all-foods"
              className="group inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-700 via-emerald-600 to-green-600 px-7 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-1 hover:from-emerald-800 hover:via-emerald-700 hover:to-green-700 hover:shadow-xl hover:shadow-emerald-500/30 dark:from-emerald-600 dark:via-emerald-500 dark:to-green-500 dark:hover:from-emerald-500 dark:hover:via-emerald-400 dark:hover:to-green-400"
            >
              <MdFoodBank className="text-xl" />

              Explore Shared Foods

              <FiChevronRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <a
              href="#how-it-works"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-slate-400 bg-white/95 px-7 text-sm font-extrabold text-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-600 hover:bg-white hover:text-emerald-800 dark:border-zinc-600 dark:bg-zinc-900/90 dark:text-white dark:hover:border-emerald-500 dark:hover:bg-zinc-900 dark:hover:text-emerald-300"
            >
              How Sharing Works

              <FiArrowDown />
            </a>
          </div>

          {/* Trust information */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <span className="flex size-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 shadow-sm dark:bg-emerald-950/80 dark:text-emerald-300">
                <FiShield />
              </span>

              Respectful request system
            </div>

            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <span className="flex size-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 shadow-sm dark:bg-emerald-950/80 dark:text-emerald-300">
                <FiMapPin />
              </span>

              Share within your community
            </div>

            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <span className="flex size-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 shadow-sm dark:bg-emerald-950/80 dark:text-emerald-300">
                <FiHeart />
              </span>

              Free food sharing
            </div>
          </div>
        </div>
      </div>

      {/* Slider controls */}
      <div className="absolute bottom-8 right-4 z-20 hidden items-center gap-3 sm:right-6 lg:right-10 lg:flex">
        <button
          type="button"
          onClick={goToPreviousSlide}
          className="flex size-11 items-center justify-center rounded-full border border-slate-300 bg-white/90 text-slate-900 shadow-md transition hover:scale-105 hover:border-emerald-700 hover:bg-emerald-700 hover:text-white dark:border-white/40 dark:bg-black/55 dark:text-white dark:hover:border-emerald-500 dark:hover:bg-emerald-600"
          aria-label="Previous hero slide"
        >
          <FiArrowLeft />
        </button>

        <button
          type="button"
          onClick={goToNextSlide}
          className="flex size-11 items-center justify-center rounded-full border border-slate-300 bg-white/90 text-slate-900 shadow-md transition hover:scale-105 hover:border-emerald-700 hover:bg-emerald-700 hover:text-white dark:border-white/40 dark:bg-black/55 dark:text-white dark:hover:border-emerald-500 dark:hover:bg-emerald-600"
          aria-label="Next hero slide"
        >
          <FiArrowRight />
        </button>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 lg:left-auto lg:right-36 lg:translate-x-0">
        {HERO_SLIDES.map(
          (slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() =>
                setActiveSlide(index)
              }
              className={`h-2.5 rounded-full shadow-sm transition-all duration-300 ${
                activeSlide === index
                  ? "w-9 bg-emerald-700 dark:bg-emerald-400"
                  : "w-2.5 bg-slate-600/70 hover:bg-slate-900 dark:bg-white/70 dark:hover:bg-white"
              }`}
              aria-label={`Open slide ${
                index + 1
              }`}
            />
          ),
        )}
      </div>

      {/* Scroll indicator */}
      <a
        href="#how-it-works"
        aria-label="Scroll to next section"
        className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-900 transition hover:text-emerald-800 dark:text-white/90 dark:hover:text-white xl:flex"
      >
        <span>Scroll</span>

        <span className="flex h-9 w-6 justify-center rounded-full border border-slate-700 pt-1.5 dark:border-white/70">
          <span className="h-2 w-1 animate-bounce rounded-full bg-slate-900 dark:bg-white" />
        </span>
      </a>

      {/* Bottom curve */}
      <div className="pointer-events-none absolute -bottom-px left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 70"
          preserveAspectRatio="none"
          className="h-12 w-full fill-white dark:fill-zinc-950 sm:h-16"
        >
          <path d="M0,48 C260,80 520,5 760,30 C1030,60 1220,65 1440,22 L1440,70 L0,70 Z" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;