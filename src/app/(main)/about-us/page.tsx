import type { Metadata } from "next";
import type { ReactNode } from "react";

import Link from "next/link";

import {
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiHeart,
  FiMapPin,
  FiMessageCircle,
  FiPackage,
  FiSearch,
  FiShield,
  FiTrendingDown,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";

import {
  HiOutlineHandRaised,
  HiOutlineSparkles,
} from "react-icons/hi2";

import {
  MdFoodBank,
  MdOutlineArticle,
  MdOutlineDashboard,
  MdOutlineRestaurant,
  MdOutlineVolunteerActivism,
} from "react-icons/md";

import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa6";

/* =========================================================
   Metadata
========================================================= */

export const metadata: Metadata = {
  title: "About Us | ShareBite",
  description:
    "Learn about ShareBite, our motivation, developed features, mission, vision and commitment to reducing food waste through responsible community sharing.",
};

/* =========================================================
   Types
========================================================= */

interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
  iconStyle: string;
}

interface ProcessItem {
  id: number;
  step: string;
  title: string;
  description: string;
  icon: ReactNode;
  iconStyle: string;
}

interface PrincipleItem {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
  iconStyle: string;
}

interface CommunityItem {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
}

/* =========================================================
   Developed features
========================================================= */

const DEVELOPED_FEATURES: FeatureItem[] = [
  {
    id: 1,
    title: "Secure User Authentication",
    description:
      "Users can create accounts, log in securely and access protected food-sharing and request-management features.",
    icon: <FiUserCheck />,
    iconStyle:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400",
  },
  {
    id: 2,
    title: "Share Food",
    description:
      "Registered users can publish surplus food with its name, image, quantity, location, preparation date, expiry date, category and halal status.",
    icon: <FiPackage />,
    iconStyle:
      "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400",
  },
  {
    id: 3,
    title: "Explore Available Foods",
    description:
      "Community members can browse available food posts and view complete information before sending a request.",
    icon: <FiSearch />,
    iconStyle:
      "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400",
  },
  {
    id: 4,
    title: "Food Request System",
    description:
      "Users can submit food requests, while food owners can review, approve or reject each request.",
    icon: <FiMessageCircle />,
    iconStyle:
      "bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-400",
  },
  {
    id: 5,
    title: "My Shared Foods",
    description:
      "Food owners can view and manage the food posts they have created from their personal account.",
    icon: <MdOutlineDashboard />,
    iconStyle:
      "bg-teal-100 text-teal-700 dark:bg-teal-950/60 dark:text-teal-400",
  },
  {
    id: 6,
    title: "Urgent Food Pickup",
    description:
      "Foods with the nearest expiry dates are highlighted so they can be collected before their usable period ends.",
    icon: <FiClock />,
    iconStyle:
      "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400",
  },
  {
    id: 7,
    title: "Volunteer Opportunities",
    description:
      "Community members can support collection, delivery coordination, awareness activities and local food-sharing programmes.",
    icon: <MdOutlineVolunteerActivism />,
    iconStyle:
      "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950/60 dark:text-fuchsia-400",
  },
  {
    id: 8,
    title: "Blogs and Resources",
    description:
      "Helpful resources provide guidance about food safety, storage, sustainability, waste reduction and responsible sharing.",
    icon: <MdOutlineArticle />,
    iconStyle:
      "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400",
  },
];

/* =========================================================
   How ShareBite works
========================================================= */

const PROCESS_ITEMS: ProcessItem[] = [
  {
    id: 1,
    step: "01",
    title: "Post Available Food",
    description:
      "A food owner shares accurate food, quantity, preparation, expiry and pickup information.",
    icon: <FiPackage />,
    iconStyle:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400",
  },
  {
    id: 2,
    step: "02",
    title: "Explore and Request",
    description:
      "Community members browse available posts and request food they are able to collect.",
    icon: <FiSearch />,
    iconStyle:
      "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400",
  },
  {
    id: 3,
    step: "03",
    title: "Review the Request",
    description:
      "The food owner reviews submitted requests and selects a suitable requester.",
    icon: <FiUserCheck />,
    iconStyle:
      "bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-400",
  },
  {
    id: 4,
    step: "04",
    title: "Arrange Collection",
    description:
      "The owner and approved requester coordinate a suitable pickup time and location.",
    icon: <FiMapPin />,
    iconStyle:
      "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400",
  },
];

/* =========================================================
   Core principles
========================================================= */

const PRINCIPLES: PrincipleItem[] = [
  {
    id: 1,
    title: "Food Safety",
    description:
      "Only safe and properly stored food should be shared. Preparation, storage and expiry information must be accurate.",
    icon: <FiShield />,
    iconStyle:
      "from-sky-600 via-cyan-500 to-blue-400",
  },
  {
    id: 2,
    title: "Free Sharing",
    description:
      "ShareBite is designed for sharing suitable surplus food freely, not for selling food or operating as a marketplace.",
    icon: <FiHeart />,
    iconStyle:
      "from-rose-600 via-pink-500 to-orange-400",
  },
  {
    id: 3,
    title: "Respect and Dignity",
    description:
      "Food sharers and requesters are equal community members who communicate and participate with mutual respect.",
    icon: <FiUsers />,
    iconStyle:
      "from-violet-600 via-purple-500 to-fuchsia-400",
  },
  {
    id: 4,
    title: "Waste Reduction",
    description:
      "The platform helps suitable food reach another table before it becomes unnecessary waste.",
    icon: <FiTrendingDown />,
    iconStyle:
      "from-emerald-700 via-green-600 to-lime-500",
  },
];

/* =========================================================
   Community participants
========================================================= */

const COMMUNITY_PARTICIPANTS: CommunityItem[] = [
  {
    id: 1,
    title: "Individuals and Families",
    description:
      "Share extra homemade meals, fruits, vegetables and properly stored food.",
    icon: <FiUsers />,
  },
  {
    id: 2,
    title: "Restaurants and Cafés",
    description:
      "Offer suitable surplus items instead of allowing good food to become waste.",
    icon: <MdOutlineRestaurant />,
  },
  {
    id: 3,
    title: "Events and Organisations",
    description:
      "Coordinate responsible sharing of surplus food from programmes and events.",
    icon: <MdFoodBank />,
  },
  {
    id: 4,
    title: "Community Volunteers",
    description:
      "Support pickup, delivery coordination, awareness and local activities.",
    icon: <HiOutlineHandRaised />,
  },
];

/* =========================================================
   Social links
========================================================= */

const SOCIAL_LINKS = [
  {
    id: 1,
    label: "Facebook",
    href: "https://www.facebook.com/kouserahamed420",
    icon: <FaFacebookF />,
    className:
      "hover:border-blue-400 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-400",
  },
  {
    id: 2,
    label: "GitHub",
    href: "https://github.com/kouser-ahamed",
    icon: <FaGithub />,
    className:
      "hover:border-slate-900 hover:text-slate-950 dark:hover:border-white dark:hover:text-white",
  },
  {
    id: 3,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kouser-ahamed",
    icon: <FaLinkedinIn />,
    className:
      "hover:border-sky-500 hover:text-sky-700 dark:hover:border-sky-500 dark:hover:text-sky-400",
  },
];

/* =========================================================
   About Us page
========================================================= */

const AboutUsPage = () => {
  return (
    <main className="overflow-hidden bg-white dark:bg-[#050706]">
      {/* =====================================================
          Hero section
      ====================================================== */}

      <section className="relative overflow-hidden border-b border-slate-200 py-20 dark:border-zinc-800 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_20%,rgba(16,185,129,0.14),transparent_30%),radial-gradient(circle_at_92%_80%,rgba(14,165,233,0.10),transparent_30%)] dark:bg-[radial-gradient(circle_at_8%_20%,rgba(16,185,129,0.07),transparent_30%),radial-gradient(circle_at_92%_80%,rgba(14,165,233,0.05),transparent_30%)]" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-emerald-800 shadow-sm backdrop-blur-md dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
              <HiOutlineSparkles className="text-lg" />
              About ShareBite
            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
              Connecting Surplus Food With{" "}
              <span className="bg-linear-to-r from-emerald-700 via-green-600 to-lime-600 bg-clip-text text-transparent dark:from-emerald-300 dark:via-green-400 dark:to-lime-300">
                People Who Can Use It
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm font-medium leading-8 text-slate-600 dark:text-zinc-300 sm:text-base lg:mx-0">
              ShareBite is a community-based food-sharing platform
              created to reduce avoidable food waste and make
              responsible food sharing easier. It connects people who
              have safe surplus food with nearby community members who
              can collect and use it.
            </p>

            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-8 text-slate-600 dark:text-zinc-400 sm:text-base lg:mx-0">
              ShareBite promotes cooperation, sustainability and
              mutual respect. It is not based on charity or commercial
              food sales. It helps equal community members share usable
              extra food freely and responsibly.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                href="/all-foods"
                className="group inline-flex h-[54px] w-full items-center justify-center gap-3 rounded-xl bg-emerald-700 px-7 text-sm font-extrabold text-white shadow-lg shadow-emerald-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-800 hover:shadow-xl dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400 sm:w-auto"
              >
                Explore Available Foods
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/share-food"
                className="group inline-flex h-[54px] w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white/80 px-7 text-sm font-extrabold text-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:text-emerald-700 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-white dark:hover:border-emerald-800 dark:hover:text-emerald-400 sm:w-auto"
              >
                Share Food
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="pointer-events-none absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/10" />

            <div className="relative overflow-hidden rounded-[34px] border border-emerald-200 bg-linear-to-br from-emerald-50 via-white to-sky-50/80 p-7 shadow-[0_35px_90px_-42px_rgba(16,185,129,0.55)] dark:border-emerald-900/70 dark:from-emerald-950/35 dark:via-zinc-900 dark:to-sky-950/20 sm:p-9">
              <div className="mx-auto flex size-24 items-center justify-center rounded-[28px] bg-linear-to-br from-emerald-700 via-green-600 to-lime-500 text-5xl text-white shadow-xl shadow-emerald-600/25 dark:from-emerald-500 dark:via-green-500 dark:to-lime-400 dark:text-emerald-950">
                <MdFoodBank />
              </div>

              <h2 className="mt-6 text-center text-2xl font-black text-slate-950 dark:text-white sm:text-3xl">
                Share Food. Share Care.
              </h2>

              <p className="mx-auto mt-3 max-w-md text-center text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400">
                A single food post can connect suitable surplus food
                with another community member and prevent unnecessary
                waste.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="text-center">
                  <FiHeart className="mx-auto text-3xl text-emerald-600 dark:text-emerald-400" />

                  <h3 className="mt-3 text-sm font-black text-slate-950 dark:text-white">
                    Care
                  </h3>

                  <p className="mt-1 text-xs font-medium text-slate-500 dark:text-zinc-500">
                    Support locally
                  </p>
                </div>

                <div className="text-center">
                  <FiShield className="mx-auto text-3xl text-sky-600 dark:text-sky-400" />

                  <h3 className="mt-3 text-sm font-black text-slate-950 dark:text-white">
                    Safety
                  </h3>

                  <p className="mt-1 text-xs font-medium text-slate-500 dark:text-zinc-500">
                    Share responsibly
                  </p>
                </div>

                <div className="text-center">
                  <FiUsers className="mx-auto text-3xl text-violet-600 dark:text-violet-400" />

                  <h3 className="mt-3 text-sm font-black text-slate-950 dark:text-white">
                    Community
                  </h3>

                  <p className="mt-1 text-xs font-medium text-slate-500 dark:text-zinc-500">
                    Connect people
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          Motivation
      ====================================================== */}

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-400">
              <HiOutlineSparkles />
              Our Motivation
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Why We Created ShareBite
            </h2>

            <p className="mt-5 text-sm font-medium leading-8 text-slate-600 dark:text-zinc-400 sm:text-base">
              Every day, safe and usable food remains after household
              meals, restaurant service, university events, office
              programmes and social gatherings. This food is often
              discarded because there is no easy way to find someone
              who can use it before its expiry time.
            </p>

            <p className="mt-4 text-sm font-medium leading-8 text-slate-600 dark:text-zinc-400 sm:text-base">
              ShareBite was created to solve this communication gap.
              Our platform makes it easier for food owners to publish
              surplus food and for nearby community members to discover
              and request it.
            </p>

            <p className="mt-4 text-sm font-medium leading-8 text-slate-600 dark:text-zinc-400 sm:text-base">
              Our goal is not only to build a website. We want to
              encourage responsible consumption, strengthen community
              relationships and help good food reach another table.
            </p>
          </div>

          <div className="space-y-5">
            {[
              "Connect surplus food with people who can use it.",
              "Reduce unnecessary household and community food waste.",
              "Encourage clear and respectful communication.",
              "Support safe and convenient pickup arrangements.",
              "Create awareness about sustainable food consumption.",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 dark:border-zinc-800 dark:bg-zinc-900/60"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-lg text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                  <FiCheckCircle />
                </div>

                <p className="pt-2 text-sm font-bold leading-6 text-slate-700 dark:text-zinc-300">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          What we have developed
      ====================================================== */}

      <section className="bg-slate-50 py-20 dark:bg-[#080a09] sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-emerald-800 shadow-sm dark:border-emerald-900 dark:bg-emerald-950/35 dark:text-emerald-300">
              <MdOutlineDashboard className="text-lg" />
              What We Have Developed
            </div>

            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              ShareBite Website Features
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400 sm:text-base">
              We have developed a modern full-stack food-sharing
              platform with practical features for food owners,
              requesters, volunteers and community members.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {DEVELOPED_FEATURES.map((feature) => (
              <article
                key={feature.id}
                className="group flex min-h-[260px] flex-col items-center rounded-[28px] border border-slate-200 bg-white p-6 text-center shadow-[0_20px_55px_-38px_rgba(15,23,42,0.35)] transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-[0_28px_65px_-34px_rgba(16,185,129,0.35)] dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-emerald-900"
              >
                <div
                  className={`flex size-14 items-center justify-center rounded-2xl text-2xl transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110 ${feature.iconStyle}`}
                >
                  {feature.icon}
                </div>

                <h3 className="mt-5 text-lg font-black text-slate-950 dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          How it works
      ====================================================== */}

      <section className="py-20 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-400">
              <HiOutlineSparkles />
              Simple Sharing Process
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              How ShareBite Works
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400 sm:text-base">
              ShareBite creates a clear connection between a food
              owner and a requester through four simple steps.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {PROCESS_ITEMS.map((item) => (
              <article
                key={item.id}
                className="group relative min-h-[280px] overflow-hidden rounded-[28px] border border-slate-200 bg-white p-7 text-center shadow-[0_20px_55px_-38px_rgba(15,23,42,0.35)] transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300 dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-emerald-900"
              >
                <span className="absolute right-5 top-3 text-5xl font-black text-slate-100 dark:text-zinc-800">
                  {item.step}
                </span>

                <div
                  className={`relative mx-auto flex size-14 items-center justify-center rounded-2xl text-2xl ${item.iconStyle}`}
                >
                  {item.icon}
                </div>

                <h3 className="relative mt-6 text-lg font-black text-slate-950 dark:text-white">
                  {item.title}
                </h3>

                <p className="relative mt-3 text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          Core principles
      ====================================================== */}

      <section className="bg-slate-50 py-20 dark:bg-[#080a09] sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-sky-800 shadow-sm dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-300">
              <FiShield />
              What Guides Us
            </div>

            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Our Core Principles
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400 sm:text-base">
              ShareBite is built around food safety, free sharing,
              dignity, transparency and community responsibility.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {PRINCIPLES.map((principle) => (
              <article
                key={principle.id}
                className="group relative flex min-h-[270px] flex-col items-center overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300 dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-emerald-900"
              >
                <div
                  className={`absolute inset-x-10 top-0 h-1 rounded-b-full bg-linear-to-r ${principle.iconStyle}`}
                />

                <div
                  className={`mt-3 flex size-16 items-center justify-center rounded-[20px] bg-linear-to-br text-3xl text-white shadow-lg transition-transform duration-500 group-hover:scale-110 ${principle.iconStyle}`}
                >
                  {principle.icon}
                </div>

                <h3 className="mt-5 text-lg font-black text-slate-950 dark:text-white">
                  {principle.title}
                </h3>

                <p className="mt-3 text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400">
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          Mission and vision
      ====================================================== */}

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <article className="relative overflow-hidden rounded-[32px] border border-emerald-200 bg-linear-to-br from-emerald-50 via-white to-lime-50/70 p-8 shadow-[0_25px_70px_-42px_rgba(16,185,129,0.50)] dark:border-emerald-900/70 dark:from-emerald-950/30 dark:via-zinc-900 dark:to-zinc-950 sm:p-10">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-700 via-green-600 to-lime-500 text-2xl text-white shadow-lg">
              <HiOutlineSparkles />
            </div>

            <h2 className="mt-6 text-2xl font-black text-slate-950 dark:text-white">
              Our Mission
            </h2>

            <p className="mt-4 text-sm font-medium leading-8 text-slate-600 dark:text-zinc-400 sm:text-base">
              Our mission is to make community food sharing simple,
              accessible and responsible. We aim to help safe surplus
              food reach people who can use it while encouraging
              sustainable consumption, honest communication and
              respectful local participation.
            </p>
          </article>

          <article className="relative overflow-hidden rounded-[32px] border border-sky-200 bg-linear-to-br from-sky-50 via-white to-cyan-50/70 p-8 shadow-[0_25px_70px_-42px_rgba(14,165,233,0.45)] dark:border-sky-900/70 dark:from-sky-950/25 dark:via-zinc-900 dark:to-zinc-950 sm:p-10">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-linear-to-br from-sky-700 via-cyan-600 to-blue-500 text-2xl text-white shadow-lg">
              <FiUsers />
            </div>

            <h2 className="mt-6 text-2xl font-black text-slate-950 dark:text-white">
              Our Vision
            </h2>

            <p className="mt-4 text-sm font-medium leading-8 text-slate-600 dark:text-zinc-400 sm:text-base">
              Our vision is to build communities where safe surplus
              food is valued rather than wasted, people support one
              another with dignity and technology creates meaningful
              connections between food availability and community
              needs.
            </p>
          </article>
        </div>
      </section>

      {/* =====================================================
          Who can use ShareBite
      ====================================================== */}

      <section className="bg-slate-50 py-20 dark:bg-[#080a09] sm:py-24">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-violet-800 shadow-sm dark:border-violet-900 dark:bg-violet-950/30 dark:text-violet-300">
              <FiUsers />
              Built for the Community
            </div>

            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Who Can Use ShareBite?
            </h2>

            <p className="mt-5 text-sm font-medium leading-8 text-slate-600 dark:text-zinc-400 sm:text-base">
              ShareBite welcomes individuals, organisations,
              restaurants, event organisers and volunteers who want to
              take responsible action against food waste.
            </p>

            <Link
              href="/contact"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-emerald-700 transition-colors hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              Contact the ShareBite Team

              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {COMMUNITY_PARTICIPANTS.map((item) => (
              <article
                key={item.id}
                className="flex min-h-[200px] flex-col items-center rounded-[26px] border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-emerald-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-emerald-900 sm:items-start sm:text-left"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-xl text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                  {item.icon}
                </div>

                <h3 className="mt-4 text-base font-black text-slate-950 dark:text-white">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          What ShareBite is not
      ====================================================== */}

      <section className="py-20 sm:py-24">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[34px] border border-orange-200 bg-orange-50/60 p-7 dark:border-orange-900/60 dark:bg-orange-950/15 sm:p-10">
            <h2 className="text-center text-3xl font-black tracking-tight text-slate-950 dark:text-white">
              What ShareBite Is Not
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-center text-sm font-medium leading-8 text-slate-600 dark:text-zinc-400 sm:text-base">
              ShareBite is not an online food marketplace, restaurant
              delivery service or food-selling platform. It connects
              food sharers and requesters so they can arrange
              collection responsibly.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                "Expired, spoiled or contaminated food should never be shared.",
                "ShareBite does not guarantee delivery for every food post.",
                "Food shared through the platform should not be sold.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-orange-200 bg-white p-5 dark:border-orange-900/50 dark:bg-zinc-900"
                >
                  <FiShield className="mt-0.5 shrink-0 text-xl text-orange-600 dark:text-orange-400" />

                  <p className="text-sm font-semibold leading-6 text-slate-600 dark:text-zinc-400">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          Future goals
      ====================================================== */}

      <section className="bg-slate-50 py-20 dark:bg-[#080a09] sm:py-24">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-400">
              <HiOutlineSparkles />
              Looking Ahead
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Our Future Goals
            </h2>

            <p className="mt-5 text-sm font-medium leading-8 text-slate-600 dark:text-zinc-400 sm:text-base">
              ShareBite aims to grow into a trusted community network
              that connects more individuals, restaurants,
              organisations, volunteers and local partners.
            </p>

            <p className="mt-4 text-sm font-medium leading-8 text-slate-600 dark:text-zinc-400 sm:text-base">
              Our long-term goal is to make responsible food sharing a
              normal, safe and accessible part of community life.
            </p>
          </div>

          <div className="space-y-4">
            {[
              "Improved location-based food discovery.",
              "Real-time food and request notifications.",
              "Stronger user verification and reporting systems.",
              "Volunteer pickup and delivery coordination.",
              "Partnerships with restaurants and organisations.",
              "More detailed community impact tracking.",
            ].map((goal) => (
              <div
                key={goal}
                className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/80"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                  <FiCheckCircle />
                </div>

                <p className="pt-1.5 text-sm font-bold leading-6 text-slate-700 dark:text-zinc-300">
                  {goal}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          Developer section
      ====================================================== */}

      <section className="py-20 sm:py-24">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[34px] border border-slate-200 bg-white p-7 text-center shadow-[0_28px_75px_-45px_rgba(15,23,42,0.40)] dark:border-zinc-800 dark:bg-zinc-900/70 sm:p-10">
            <div className="mx-auto flex size-16 items-center justify-center rounded-[20px] bg-linear-to-br from-emerald-700 via-green-600 to-lime-500 text-3xl text-white shadow-lg">
              <MdFoodBank />
            </div>

            <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">
              Project Developer
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
              Developed by Kouser Ahamed
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-sm font-medium leading-8 text-slate-600 dark:text-zinc-400 sm:text-base">
              ShareBite was designed and developed as a modern
              full-stack community platform. The project combines
              secure authentication, food-post management, database
              integration, request coordination, responsive design,
              light and dark themes and community-focused features.
            </p>

            <p className="mx-auto mt-3 max-w-3xl text-sm font-medium leading-8 text-slate-600 dark:text-zinc-400 sm:text-base">
              The platform was developed with a focus on usability,
              accessibility, food-waste reduction and meaningful
              social impact.
            </p>

            <div className="mt-7 flex items-center justify-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className={`flex size-11 items-center justify-center rounded-xl border border-slate-300 text-lg text-slate-600 transition-all duration-300 hover:-translate-y-1 dark:border-zinc-700 dark:text-zinc-400 ${social.className}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          Final CTA
      ====================================================== */}

      <section className="pb-20 sm:pb-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[36px] border border-emerald-200 bg-linear-to-br from-emerald-50 via-white to-sky-50/80 px-5 py-12 text-center shadow-[0_32px_85px_-42px_rgba(16,185,129,0.48)] dark:border-emerald-900/70 dark:from-emerald-950/35 dark:via-zinc-900 dark:to-sky-950/20 sm:px-8 lg:px-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(16,185,129,0.14),transparent_30%),radial-gradient(circle_at_90%_85%,rgba(14,165,233,0.10),transparent_30%)] dark:bg-[radial-gradient(circle_at_10%_20%,rgba(16,185,129,0.07),transparent_30%),radial-gradient(circle_at_90%_85%,rgba(14,165,233,0.05),transparent_30%)]" />

            <div className="relative mx-auto max-w-3xl">
              <div className="mx-auto flex size-16 items-center justify-center rounded-[20px] bg-linear-to-br from-emerald-700 via-green-600 to-lime-500 text-3xl text-white shadow-lg">
                <FiHeart />
              </div>

              <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                Help Good Food Reach Another Table
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600 dark:text-zinc-300 sm:text-base">
                Share safe surplus food, explore available items or
                support the community as a volunteer.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/share-food"
                  className="group inline-flex h-[54px] w-full items-center justify-center gap-3 rounded-xl bg-emerald-700 px-7 text-sm font-extrabold text-white shadow-lg shadow-emerald-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-800 hover:shadow-xl dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400 sm:w-auto"
                >
                  Share Food Now

                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/all-foods"
                  className="group inline-flex h-[54px] w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white/80 px-7 text-sm font-extrabold text-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:text-emerald-700 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900/75 dark:text-white dark:hover:border-emerald-800 dark:hover:text-emerald-400 sm:w-auto"
                >
                  Explore Foods

                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/contact"
                  className="group inline-flex h-[54px] w-full items-center justify-center gap-3 rounded-xl border border-sky-300 bg-sky-50/80 px-7 text-sm font-extrabold text-sky-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-400 hover:bg-sky-100 hover:shadow-md dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-400 dark:hover:border-sky-800 dark:hover:bg-sky-950/50 sm:w-auto"
                >
                  Contact ShareBite

                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;