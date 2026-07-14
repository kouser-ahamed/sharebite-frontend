import Link from "next/link";
import type { ReactNode } from "react";

import {
  FiArrowRight,
  FiCheckCircle,
  FiGift,
  FiHeart,
  FiMapPin,
  FiSend,
  FiShield,
  FiUsers,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { MdFoodBank } from "react-icons/md";

interface SharingStep {
  id: number;
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
  iconGradient: string;
  iconShadow: string;
  numberStyle: string;
}

const SHARING_STEPS: SharingStep[] = [
  {
    id: 1,
    number: "01",
    title: "Share Your Extra Food",
    description:
      "Have fresh food left after a family meal, event, restaurant service, or celebration? Post it for free instead of letting good food go to waste.",
    icon: <MdFoodBank />,
    iconGradient:
      "from-emerald-600 via-emerald-500 to-green-400",
    iconShadow:
      "shadow-emerald-500/30",
    numberStyle:
      "text-emerald-100 dark:text-emerald-950",
  },
  {
    id: 2,
    number: "02",
    title: "People Find It Nearby",
    description:
      "Community members can explore available food posts, check the location, and find a suitable meal shared near them.",
    icon: <FiMapPin />,
    iconGradient:
      "from-sky-600 via-cyan-500 to-emerald-400",
    iconShadow:
      "shadow-cyan-500/30",
    numberStyle:
      "text-cyan-100 dark:text-cyan-950",
  },
  {
    id: 3,
    number: "03",
    title: "Send a Respectful Request",
    description:
      "Someone who needs the food can send a request with their contact details, address, preferred date, and a short message.",
    icon: <FiSend />,
    iconGradient:
      "from-violet-600 via-purple-500 to-fuchsia-400",
    iconShadow:
      "shadow-purple-500/30",
    numberStyle:
      "text-purple-100 dark:text-purple-950",
  },
  {
    id: 4,
    number: "04",
    title: "Share with Care",
    description:
      "After approval, pickup details are shared securely so the food can reach another person while it is still fresh and safe.",
    icon: <FiHeart />,
    iconGradient:
      "from-rose-600 via-pink-500 to-orange-400",
    iconShadow:
      "shadow-rose-500/30",
    numberStyle:
      "text-rose-100 dark:text-rose-950",
  },
];

const HowShareBiteWorks = () => {
  return (
    <section
      id="how-it-works"
      className="relative -mt-px overflow-hidden bg-white pb-20 pt-28 dark:bg-zinc-950 sm:pb-24 sm:pt-32"
    >
      {/* Top transition wave */}
      <div className="pointer-events-none absolute -top-px left-0 right-0 z-10 overflow-hidden">
        <svg
          viewBox="0 0 1440 105"
          preserveAspectRatio="none"
          className="h-[82px] w-full sm:h-[100px]"
          aria-hidden="true"
        >
          <path
            d="M0,0 H1440 V22 C1220,65 1030,60 760,30 C520,5 260,80 0,48 Z"
            className="fill-[#F8F6EC] dark:fill-black"
          />

          <path
            d="M0,48 C260,80 520,5 760,30 C1030,60 1220,65 1440,22 V52 C1210,90 1020,84 755,56 C500,28 270,100 0,72 Z"
            className="fill-emerald-100/70 dark:fill-emerald-950/40"
          />

          <path
            d="M0,72 C270,100 500,28 755,56 C1020,84 1210,90 1440,52 V105 H0 Z"
            className="fill-white dark:fill-zinc-950"
          />
        </svg>
      </div>

      {/* Premium background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_25%,rgba(16,185,129,0.10),transparent_30%),radial-gradient(circle_at_90%_80%,rgba(132,204,22,0.08),transparent_28%)] dark:bg-[radial-gradient(circle_at_10%_25%,rgba(16,185,129,0.10),transparent_30%),radial-gradient(circle_at_90%_80%,rgba(132,204,22,0.04),transparent_28%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.025)_1px,transparent_1px)] bg-[size:52px_52px] opacity-60 dark:opacity-15" />

      <div className="pointer-events-none absolute -left-28 top-1/3 size-80 rounded-full bg-emerald-300/15 blur-3xl dark:bg-emerald-500/5" />

      <div className="pointer-events-none absolute -right-28 bottom-10 size-80 rounded-full bg-lime-300/15 blur-3xl dark:bg-lime-500/5" />

      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/90 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-emerald-800 shadow-sm dark:border-emerald-800/60 dark:bg-emerald-950/35 dark:text-emerald-300">
            <HiOutlineSparkles className="text-lg" />

            Simple, Free and Meaningful
          </div>

          <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
            Share Food. Reduce Waste.{" "}
            <span className="bg-linear-to-r from-emerald-700 via-green-600 to-lime-600 bg-clip-text text-transparent dark:from-emerald-300 dark:via-emerald-400 dark:to-lime-300">
              Spread Care.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm font-medium leading-7 text-slate-700 dark:text-zinc-300 sm:text-base">
            ShareBite helps good extra food move from one table
            to another. No selling, no service charge and no
            hidden fees—only respectful food sharing between
            people in the community.
          </p>

          {/* Free sharing highlight */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 shadow-sm dark:border-emerald-900 dark:bg-zinc-900 dark:text-zinc-100">
              <FiGift className="text-emerald-600 dark:text-emerald-400" />
              Always free to share
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 shadow-sm dark:border-emerald-900 dark:bg-zinc-900 dark:text-zinc-100">
              <FiUsers className="text-emerald-600 dark:text-emerald-400" />
              Built for the community
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 shadow-sm dark:border-emerald-900 dark:bg-zinc-900 dark:text-zinc-100">
              <FiShield className="text-emerald-600 dark:text-emerald-400" />
              Respectful request system
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="relative mt-14">
          {/* Desktop connecting line */}
          <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[59px] hidden h-[2px] bg-linear-to-r from-emerald-300 via-cyan-300 via-purple-300 to-rose-300 opacity-70 dark:from-emerald-900 dark:via-cyan-900 dark:to-rose-900 lg:block" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SHARING_STEPS.map((step) => (
              <article
                key={step.id}
                className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_20px_55px_-28px_rgba(15,23,42,0.35)] backdrop-blur-md transition-all duration-500 hover:-translate-y-3 hover:border-emerald-300 hover:shadow-[0_28px_70px_-28px_rgba(16,185,129,0.40)] dark:border-zinc-800 dark:bg-zinc-900/85 dark:shadow-[0_20px_55px_-28px_rgba(0,0,0,0.85)] dark:hover:border-emerald-800"
              >
                {/* Card glow */}
                <div
                  className={`pointer-events-none absolute -right-14 -top-14 size-40 rounded-full bg-linear-to-br ${step.iconGradient} opacity-10 blur-3xl transition duration-500 group-hover:opacity-20`}
                />

                {/* Step number */}
                <span
                  className={`absolute right-5 top-4 text-5xl font-black transition duration-300 group-hover:scale-110 ${step.numberStyle}`}
                >
                  {step.number}
                </span>

                {/* Gradient icon */}
                <div
                  className={`relative z-10 flex size-[118px] items-center justify-center self-center rounded-[32px] bg-linear-to-br ${step.iconGradient} text-[46px] text-white shadow-2xl ${step.iconShadow} transition-all duration-500 group-hover:-rotate-3 group-hover:scale-110`}
                >
                  <div className="absolute inset-[2px] rounded-[30px] border border-white/25" />

                  <div className="pointer-events-none absolute left-3 top-3 size-8 rounded-full bg-white/20 blur-md" />

                  <span className="relative z-10">
                    {step.icon}
                  </span>
                </div>

                <div className="relative z-10 mt-7 flex flex-1 flex-col text-center">
                  <h3 className="text-xl font-black text-slate-950 dark:text-white">
                    {step.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm font-medium leading-6 text-slate-600 dark:text-zinc-400">
                    {step.description}
                  </p>

                  <div className="mt-6 flex justify-center">
                    <div className="flex size-9 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 transition-all duration-300 group-hover:scale-110 group-hover:border-emerald-600 group-hover:bg-emerald-600 group-hover:text-white dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-400 dark:group-hover:bg-emerald-600 dark:group-hover:text-white">
                      <FiCheckCircle />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Meaning strip */}
        <div className="mt-12 grid overflow-hidden rounded-3xl border border-emerald-200 bg-emerald-50/70 shadow-sm dark:border-emerald-900 dark:bg-emerald-950/20 sm:grid-cols-3">
          <div className="flex items-center justify-center gap-3 border-b border-emerald-200 px-5 py-5 dark:border-emerald-900 sm:border-b-0 sm:border-r">
            <FiGift className="text-2xl text-emerald-700 dark:text-emerald-400" />

            <div>
              <p className="font-black text-slate-900 dark:text-white">
                No Selling
              </p>

              <p className="text-xs text-slate-600 dark:text-zinc-400">
                Food is shared completely free
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 border-b border-emerald-200 px-5 py-5 dark:border-emerald-900 sm:border-b-0 sm:border-r">
            <FiHeart className="text-2xl text-rose-600 dark:text-rose-400" />

            <div>
              <p className="font-black text-slate-900 dark:text-white">
                Share with Dignity
              </p>

              <p className="text-xs text-slate-600 dark:text-zinc-400">
                Every request is treated respectfully
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 px-5 py-5">
            <MdFoodBank className="text-2xl text-amber-600 dark:text-amber-400" />

            <div>
              <p className="font-black text-slate-900 dark:text-white">
                Save Good Food
              </p>

              <p className="text-xs text-slate-600 dark:text-zinc-400">
                Let food reach people, not waste
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="relative mt-14 overflow-hidden rounded-[34px] border border-emerald-300/80 bg-linear-to-r from-emerald-800 via-emerald-700 to-green-600 px-6 py-11 shadow-2xl shadow-emerald-500/20 dark:border-emerald-800/70 dark:from-emerald-950 dark:via-emerald-900 dark:to-green-950 sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-12">
          <div className="pointer-events-none absolute -left-20 -top-24 size-72 rounded-full bg-white/10 blur-2xl" />

          <div className="pointer-events-none absolute -bottom-28 right-10 size-72 rounded-full bg-lime-300/15 blur-2xl" />

          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.13),transparent_62%)]" />

          <HiOutlineSparkles className="pointer-events-none absolute right-8 top-7 text-5xl text-white/10 sm:right-14 sm:top-9 sm:text-7xl" />

          <div className="relative z-10 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-emerald-50">
              <FiGift className="text-base" />

              Free Food Sharing
            </div>

            <h3 className="mt-4 text-2xl font-black text-white sm:text-3xl lg:text-4xl">
              Your extra food could become someone&apos;s
              meaningful meal.
            </h3>

            <p className="mt-4 max-w-xl text-sm font-medium leading-7 text-emerald-50/90 sm:text-base">
              Share fresh surplus food from your home,
              restaurant, event, or celebration. Posting is
              completely free, and one simple act can bring
              comfort to someone nearby.
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-4 text-sm font-bold text-white/90 lg:justify-start">
              <span className="inline-flex items-center gap-2">
                <FiCheckCircle />
                No fees
              </span>

              <span className="inline-flex items-center gap-2">
                <FiCheckCircle />
                No selling
              </span>

              <span className="inline-flex items-center gap-2">
                <FiCheckCircle />
                Only sharing
              </span>
            </div>
          </div>

          <div className="relative z-10 mt-8 flex justify-center lg:mt-0 lg:justify-end">
            <Link
              href="/share-food"
              className="group inline-flex h-[54px] items-center justify-center gap-3 rounded-xl bg-white px-7 text-sm font-extrabold text-emerald-800 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-emerald-50 hover:shadow-2xl dark:bg-emerald-400 dark:text-emerald-950 dark:hover:bg-emerald-300"
            >
              <MdFoodBank className="text-xl" />

              Share Food for Free

              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowShareBiteWorks;