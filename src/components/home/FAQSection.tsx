"use client";

import type { ReactNode } from "react";

import Link from "next/link";
import { useState } from "react";

import {
  FiAlertTriangle,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiHelpCircle,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiMinus,
  FiPackage,
  FiPlus,
  FiShield,
  FiTruck,
  FiUsers,
} from "react-icons/fi";

import {
  HiOutlineHandRaised,
  HiOutlineQuestionMarkCircle,
  HiOutlineSparkles,
} from "react-icons/hi2";

import {
  MdFoodBank,
  MdOutlineRestaurant,
} from "react-icons/md";

/* =========================================================
   Types
========================================================= */

interface FAQItem {
  id: number;
  category: string;
  question: string;
  answer: string;
  icon: ReactNode;
  iconStyle: string;
  accentLine: string;
  activeCardStyle: string;
  activeIconStyle: string;
}

interface TopicCard {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
  iconStyle: string;
  cardStyle: string;
}

/* =========================================================
   Topic cards
========================================================= */

const TOPIC_CARDS: TopicCard[] = [
  {
    id: 1,
    title: "Food Sharing",
    description:
      "Understand who can share food and what items are suitable for posting.",
    icon: <MdFoodBank />,
    iconStyle:
      "from-emerald-600 via-green-500 to-lime-400",
    cardStyle:
      "border-emerald-200 bg-linear-to-br from-emerald-50 via-white to-lime-50/70 dark:border-emerald-900/70 dark:from-emerald-950/35 dark:via-zinc-900 dark:to-zinc-950",
  },
  {
    id: 2,
    title: "Food Safety",
    description:
      "Learn the essential rules for freshness, packaging and expiry information.",
    icon: <FiShield />,
    iconStyle:
      "from-rose-600 via-pink-500 to-orange-400",
    cardStyle:
      "border-rose-200 bg-linear-to-br from-rose-50 via-white to-orange-50/70 dark:border-rose-900/70 dark:from-rose-950/30 dark:via-zinc-900 dark:to-zinc-950",
  },
  {
    id: 3,
    title: "Requests & Pickup",
    description:
      "Find clear information about requests, approvals and food collection.",
    icon: <FiTruck />,
    iconStyle:
      "from-sky-600 via-cyan-500 to-blue-400",
    cardStyle:
      "border-sky-200 bg-linear-to-br from-sky-50 via-white to-cyan-50/70 dark:border-sky-900/70 dark:from-sky-950/30 dark:via-zinc-900 dark:to-zinc-950",
  },
  {
    id: 4,
    title: "Volunteer Support",
    description:
      "Discover how to join field activities and support the ShareBite community.",
    icon: <HiOutlineHandRaised />,
    iconStyle:
      "from-violet-600 via-purple-500 to-fuchsia-400",
    cardStyle:
      "border-violet-200 bg-linear-to-br from-violet-50 via-white to-fuchsia-50/70 dark:border-violet-900/70 dark:from-violet-950/30 dark:via-zinc-900 dark:to-zinc-950",
  },
];

/* =========================================================
   FAQ data
========================================================= */

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 1,
    category: "General",
    question: "Is ShareBite completely free to use?",
    answer:
      "Yes. ShareBite is a community-based platform where users can post, request and share safe surplus food without selling it.",
    icon: <FiHelpCircle />,
    iconStyle:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400",
    accentLine:
      "from-emerald-600 via-green-500 to-lime-400",
    activeCardStyle:
      "border-emerald-300 bg-linear-to-br from-emerald-50 via-white to-lime-50/80 dark:border-emerald-900 dark:from-emerald-950/35 dark:via-zinc-900 dark:to-zinc-950",
    activeIconStyle:
      "bg-emerald-700 text-white dark:bg-emerald-500 dark:text-emerald-950",
  },
  {
    id: 2,
    category: "Food Sharing",
    question: "Who can share food on ShareBite?",
    answer:
      "Individuals, families, restaurants, offices, event organisers and community groups can share safe surplus food through ShareBite.",
    icon: <FiUsers />,
    iconStyle:
      "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400",
    accentLine:
      "from-sky-600 via-cyan-500 to-blue-400",
    activeCardStyle:
      "border-sky-300 bg-linear-to-br from-sky-50 via-white to-cyan-50/80 dark:border-sky-900 dark:from-sky-950/35 dark:via-zinc-900 dark:to-zinc-950",
    activeIconStyle:
      "bg-sky-700 text-white dark:bg-sky-500 dark:text-sky-950",
  },
  {
    id: 3,
    category: "Food Types",
    question: "What type of food can be posted?",
    answer:
      "Fresh homemade meals, restaurant surplus, event food, fruits, vegetables, bakery products and sealed packaged food may be posted when they remain safe to consume.",
    icon: <MdOutlineRestaurant />,
    iconStyle:
      "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400",
    accentLine:
      "from-orange-600 via-amber-500 to-yellow-400",
    activeCardStyle:
      "border-orange-300 bg-linear-to-br from-orange-50 via-white to-amber-50/80 dark:border-orange-900 dark:from-orange-950/30 dark:via-zinc-900 dark:to-zinc-950",
    activeIconStyle:
      "bg-orange-600 text-white dark:bg-orange-500 dark:text-orange-950",
  },
  {
    id: 4,
    category: "Food Safety",
    question: "Can expired or unsafe food be shared?",
    answer:
      "No. Expired, spoiled, contaminated or improperly stored food must never be posted. Accurate preparation, storage and expiry information should always be provided.",
    icon: <FiAlertTriangle />,
    iconStyle:
      "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400",
    accentLine:
      "from-rose-600 via-pink-500 to-red-400",
    activeCardStyle:
      "border-rose-300 bg-linear-to-br from-rose-50 via-white to-pink-50/80 dark:border-rose-900 dark:from-rose-950/30 dark:via-zinc-900 dark:to-zinc-950",
    activeIconStyle:
      "bg-rose-600 text-white dark:bg-rose-500 dark:text-rose-950",
  },
  {
    id: 5,
    category: "Requests",
    question: "How does a food request work?",
    answer:
      "A user opens an available food post and submits a request. The food owner then reviews the request and decides whether to approve or reject it.",
    icon: <FiMessageCircle />,
    iconStyle:
      "bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-400",
    accentLine:
      "from-violet-600 via-purple-500 to-fuchsia-400",
    activeCardStyle:
      "border-violet-300 bg-linear-to-br from-violet-50 via-white to-fuchsia-50/80 dark:border-violet-900 dark:from-violet-950/30 dark:via-zinc-900 dark:to-zinc-950",
    activeIconStyle:
      "bg-violet-600 text-white dark:bg-violet-500 dark:text-violet-950",
  },
  {
    id: 6,
    category: "Pickup",
    question: "Who arranges the food pickup?",
    answer:
      "The food owner and approved requester communicate and agree on a safe, convenient pickup location and collection time.",
    icon: <FiMapPin />,
    iconStyle:
      "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-400",
    accentLine:
      "from-cyan-600 via-sky-500 to-blue-400",
    activeCardStyle:
      "border-cyan-300 bg-linear-to-br from-cyan-50 via-white to-sky-50/80 dark:border-cyan-900 dark:from-cyan-950/30 dark:via-zinc-900 dark:to-zinc-950",
    activeIconStyle:
      "bg-cyan-600 text-white dark:bg-cyan-500 dark:text-cyan-950",
  },
  {
    id: 7,
    category: "Delivery",
    question: "Does ShareBite deliver food directly?",
    answer:
      "ShareBite mainly connects food sharers and requesters. Direct delivery is not guaranteed, although volunteers may assist during suitable local activities.",
    icon: <FiTruck />,
    iconStyle:
      "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400",
    accentLine:
      "from-amber-600 via-orange-500 to-yellow-400",
    activeCardStyle:
      "border-amber-300 bg-linear-to-br from-amber-50 via-white to-yellow-50/80 dark:border-amber-900 dark:from-amber-950/30 dark:via-zinc-900 dark:to-zinc-950",
    activeIconStyle:
      "bg-amber-600 text-white dark:bg-amber-500 dark:text-amber-950",
  },
  {
    id: 8,
    category: "Multiple Requests",
    question: "Can several people request the same food?",
    answer:
      "Yes. Several users may request the same food, but the food owner decides which request to approve based on quantity and collection arrangements.",
    icon: <FiUsers />,
    iconStyle:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400",
    accentLine:
      "from-indigo-600 via-blue-500 to-cyan-400",
    activeCardStyle:
      "border-indigo-300 bg-linear-to-br from-indigo-50 via-white to-blue-50/80 dark:border-indigo-900 dark:from-indigo-950/30 dark:via-zinc-900 dark:to-zinc-950",
    activeIconStyle:
      "bg-indigo-600 text-white dark:bg-indigo-500 dark:text-indigo-950",
  },
  {
    id: 9,
    category: "Volunteering",
    question: "How can I become a volunteer?",
    answer:
      "Visit the Contact page and send a message containing your name, location, preferred volunteer role, availability and contact information.",
    icon: <HiOutlineHandRaised />,
    iconStyle:
      "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950/60 dark:text-fuchsia-400",
    accentLine:
      "from-fuchsia-600 via-purple-500 to-pink-400",
    activeCardStyle:
      "border-fuchsia-300 bg-linear-to-br from-fuchsia-50 via-white to-purple-50/80 dark:border-fuchsia-900 dark:from-fuchsia-950/30 dark:via-zinc-900 dark:to-zinc-950",
    activeIconStyle:
      "bg-fuchsia-600 text-white dark:bg-fuchsia-500 dark:text-fuchsia-950",
  },
  {
    id: 10,
    category: "Reporting",
    question: "What should I do if I notice an unsafe food post?",
    answer:
      "Do not request the food. Contact ShareBite through the Contact page and provide the relevant food-post information so the issue can be reviewed.",
    icon: <FiShield />,
    iconStyle:
      "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400",
    accentLine:
      "from-red-600 via-rose-500 to-orange-400",
    activeCardStyle:
      "border-red-300 bg-linear-to-br from-red-50 via-white to-orange-50/80 dark:border-red-900 dark:from-red-950/30 dark:via-zinc-900 dark:to-zinc-950",
    activeIconStyle:
      "bg-red-600 text-white dark:bg-red-500 dark:text-red-950",
  },
];

/* =========================================================
   Main component
========================================================= */

const FAQSection = () => {
  const [activeFaq, setActiveFaq] =
    useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setActiveFaq((currentId) =>
      currentId === id ? null : id,
    );
  };

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[#f8fafc] py-20 dark:bg-[#050706] sm:py-24"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(16,185,129,0.12),transparent_28%),radial-gradient(circle_at_92%_84%,rgba(139,92,246,0.09),transparent_30%),radial-gradient(circle_at_50%_45%,rgba(14,165,233,0.05),transparent_35%)] dark:bg-[radial-gradient(circle_at_8%_12%,rgba(16,185,129,0.07),transparent_28%),radial-gradient(circle_at_92%_84%,rgba(139,92,246,0.05),transparent_30%),radial-gradient(circle_at_50%_45%,rgba(14,165,233,0.03),transparent_35%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.025)_1px,transparent_1px)] bg-[size:54px_54px] dark:bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)]" />

      <div className="pointer-events-none absolute -left-32 top-20 size-96 rounded-full bg-emerald-300/15 blur-3xl dark:bg-emerald-500/5" />

      <div className="pointer-events-none absolute -right-32 bottom-10 size-96 rounded-full bg-violet-300/15 blur-3xl dark:bg-violet-500/5" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            Section heading
        ====================================================== */}

        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/90 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-emerald-800 shadow-sm backdrop-blur-md dark:border-emerald-900/70 dark:bg-emerald-950/40 dark:text-emerald-300">
            <HiOutlineQuestionMarkCircle className="text-lg" />

            ShareBite Help Centre
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
            Answers to Your{" "}
            <span className="bg-linear-to-r from-emerald-700 via-teal-600 to-sky-600 bg-clip-text text-transparent dark:from-emerald-300 dark:via-teal-300 dark:to-sky-300">
              Common Questions
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm font-medium leading-7 text-slate-600 dark:text-zinc-300 sm:text-base">
            Learn about food sharing, safety, requests, pickup,
            delivery and volunteer participation through clear and
            helpful answers.
          </p>
        </div>

        {/* =====================================================
            Topic cards
        ====================================================== */}

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {TOPIC_CARDS.map((topic) => (
            <article
              key={topic.id}
              className={`group relative flex min-h-[225px] flex-col items-center overflow-hidden rounded-[28px] border p-6 text-center shadow-[0_20px_55px_-35px_rgba(15,23,42,0.4)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_65px_-30px_rgba(16,185,129,0.3)] dark:shadow-[0_20px_55px_-35px_rgba(0,0,0,0.95)] ${topic.cardStyle}`}
            >
              <div
                className={`absolute inset-x-10 top-0 h-1 rounded-b-full bg-linear-to-r ${topic.iconStyle}`}
              />

              <div className="pointer-events-none absolute -right-14 -top-14 size-40 rounded-full bg-white/70 blur-3xl dark:bg-white/5" />

              <div
                className={`relative mt-2 flex size-16 items-center justify-center rounded-[20px] bg-linear-to-br ${topic.iconStyle} text-3xl text-white shadow-lg transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110`}
              >
                {topic.icon}
              </div>

              <h3 className="relative mt-5 text-lg font-black text-slate-950 dark:text-white">
                {topic.title}
              </h3>

              <p className="relative mt-3 max-w-[260px] text-sm font-medium leading-6 text-slate-600 dark:text-zinc-400">
                {topic.description}
              </p>
            </article>
          ))}
        </div>

        {/* =====================================================
            FAQ introduction
        ====================================================== */}

        <div className="mt-20 flex flex-col items-center justify-between gap-5 text-center lg:flex-row lg:text-left">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-400">
              <HiOutlineSparkles className="text-base" />

              Frequently Asked Questions
            </div>

            <h3 className="mt-2 text-2xl font-black text-slate-950 dark:text-white sm:text-3xl">
              Everything you need to know
            </h3>

            <p className="mt-2 text-sm font-medium text-slate-500 dark:text-zinc-400">
              Select any question to view its answer.
            </p>
          </div>

          <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/75">
            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-lg text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
              <FiCheckCircle />
            </div>

            <div className="text-left">
              <p className="text-sm font-black text-slate-950 dark:text-white">
                {FAQ_ITEMS.length} Helpful Answers
              </p>

              <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-zinc-500">
                Updated for ShareBite users
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            FAQ card grid
        ====================================================== */}

        <div className="mt-9 grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
          {FAQ_ITEMS.map((faq) => {
            const isOpen = activeFaq === faq.id;

            return (
              <article
                key={faq.id}
                className={`group relative overflow-hidden rounded-[26px] border transition-all duration-300 ${
                  isOpen
                    ? `${faq.activeCardStyle} shadow-[0_24px_65px_-35px_rgba(16,185,129,0.45)] dark:shadow-[0_24px_65px_-35px_rgba(0,0,0,0.95)]`
                    : "border-slate-200 bg-white/90 shadow-[0_15px_45px_-34px_rgba(15,23,42,0.4)] hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_22px_55px_-32px_rgba(15,23,42,0.25)] dark:border-zinc-800 dark:bg-zinc-900/80 dark:shadow-[0_15px_45px_-34px_rgba(0,0,0,0.95)] dark:hover:border-zinc-700"
                }`}
              >
                {/* Coloured top accent */}
                <div
                  className={`absolute inset-x-8 top-0 h-1 rounded-b-full bg-linear-to-r ${faq.accentLine}`}
                />

                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="flex w-full items-start justify-between gap-3 px-4 pb-5 pt-6 text-left sm:gap-5 sm:px-6"
                >
                  <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                    {/* FAQ icon */}
                    <div
                      className={`flex size-12 shrink-0 items-center justify-center rounded-2xl text-xl transition-all duration-300 ${
                        isOpen
                          ? faq.activeIconStyle
                          : faq.iconStyle
                      }`}
                    >
                      {faq.icon}
                    </div>

                    {/* Question */}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-400 dark:text-zinc-500 sm:text-[10px]">
                          {faq.category}
                        </span>

                        <span className="size-1 rounded-full bg-slate-300 dark:bg-zinc-700" />

                        <span className="text-[9px] font-bold text-slate-400 dark:text-zinc-500 sm:text-[10px]">
                          Question{" "}
                          {String(faq.id).padStart(2, "0")}
                        </span>
                      </div>

                      <h4 className="mt-2 text-sm font-black leading-6 text-slate-950 dark:text-white sm:text-base">
                        {faq.question}
                      </h4>
                    </div>
                  </div>

                  {/* Open / close button */}
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-full text-base transition-all duration-300 ${
                      isOpen
                        ? "rotate-180 bg-slate-950 text-white shadow-md dark:bg-white dark:text-zinc-950"
                        : "bg-slate-100 text-slate-600 group-hover:bg-slate-200 dark:bg-zinc-800 dark:text-zinc-300 dark:group-hover:bg-zinc-700"
                    }`}
                  >
                    {isOpen ? <FiMinus /> : <FiPlus />}
                  </div>
                </button>

                {/* Answer */}
                <div
                  id={`faq-answer-${faq.id}`}
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-6 sm:pl-[88px] sm:pr-7">
                      <div className="border-t border-slate-200/80 pt-4 dark:border-zinc-800">
                        <p className="text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400">
                          {faq.answer}
                        </p>

                        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1.5 text-[10px] font-bold text-slate-500 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-500">
                          <FiClock />

                          Quick ShareBite guidance
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* =====================================================
            Support CTA
        ====================================================== */}

        <div className="relative mt-16 overflow-hidden rounded-[34px] border border-emerald-200 bg-linear-to-br from-emerald-50 via-white to-sky-50/80 px-5 py-9 shadow-[0_28px_75px_-38px_rgba(16,185,129,0.38)] dark:border-emerald-900/70 dark:from-emerald-950/35 dark:via-zinc-900 dark:to-sky-950/20 dark:shadow-[0_28px_75px_-38px_rgba(0,0,0,0.95)] sm:px-8 lg:px-10">
          {/* Soft background decorations */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(16,185,129,0.15),transparent_30%),radial-gradient(circle_at_90%_85%,rgba(14,165,233,0.12),transparent_30%)] dark:bg-[radial-gradient(circle_at_10%_20%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_90%_85%,rgba(14,165,233,0.06),transparent_30%)]" />

          <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full border-[42px] border-emerald-200/30 dark:border-emerald-900/20" />

          <div className="pointer-events-none absolute -bottom-24 left-[35%] size-64 rounded-full bg-sky-300/15 blur-3xl dark:bg-sky-500/5" />

          <div className="relative flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-800 shadow-sm backdrop-blur-md dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300">
                <FiMail />

                Need More Help?
              </div>

              <h3 className="mt-5 text-2xl font-black leading-tight text-slate-950 dark:text-white sm:text-3xl">
                Could not find the answer you needed?
              </h3>

              <p className="mt-3 text-sm font-medium leading-7 text-slate-600 dark:text-zinc-300">
                Contact the ShareBite team for help with food posts,
                requests, account support, volunteering or community
                partnerships.
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-2.5 lg:justify-start">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/75 px-3 py-2 text-xs font-bold text-emerald-800 shadow-sm backdrop-blur-md dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
                  <FiPackage />

                  Food posts
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/75 px-3 py-2 text-xs font-bold text-sky-800 shadow-sm backdrop-blur-md dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-300">
                  <FiMessageCircle />

                  Requests
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/75 px-3 py-2 text-xs font-bold text-violet-800 shadow-sm backdrop-blur-md dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-300">
                  <HiOutlineHandRaised />

                  Volunteering
                </span>
              </div>
            </div>

            <Link
              href="/contact"
              className="group inline-flex h-[56px] w-full shrink-0 items-center justify-center gap-3 rounded-xl bg-emerald-700 px-7 text-sm font-extrabold text-white shadow-lg shadow-emerald-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-800 hover:shadow-xl dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400 sm:w-auto lg:min-w-[220px]"
            >
              <FiMessageCircle className="text-lg" />

              Contact Support

              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;