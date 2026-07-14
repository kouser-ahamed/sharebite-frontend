import type { Metadata } from "next";
import type { ReactNode } from "react";

import Link from "next/link";

import {
  FiAlertTriangle,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiHelpCircle,
  FiMapPin,
  FiMessageCircle,
  FiPackage,
  FiSearch,
  FiShield,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";

import {
  HiOutlineHandRaised,
  HiOutlineSparkles,
} from "react-icons/hi2";

import {
  MdFoodBank,
  MdOutlineFastfood,
  MdOutlineVolunteerActivism,
} from "react-icons/md";

/* =========================================================
   Page metadata
========================================================= */

export const metadata: Metadata = {
  title: "Support Centre | ShareBite",
  description:
    "Find guidance about sharing food, requesting food, pickup coordination, food safety, volunteering and using the ShareBite platform.",
};

/* =========================================================
   Types
========================================================= */

interface SupportTopic {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
  iconStyle: string;
  points: string[];
}

interface QuickLink {
  id: number;
  title: string;
  description: string;
  href: string;
  buttonText: string;
  icon: ReactNode;
  iconStyle: string;
}

interface SafetyItem {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
  iconStyle: string;
}

/* =========================================================
   Support topics
========================================================= */

const SUPPORT_TOPICS: SupportTopic[] = [
  {
    id: 1,
    title: "Sharing Food",
    description:
      "Guidance for creating a clear, responsible and useful food post.",
    icon: <FiPackage />,
    iconStyle:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400",
    points: [
      "Provide the correct food name and description.",
      "Mention the available quantity and serving size.",
      "Add preparation and expiry information.",
      "Provide an accurate pickup location.",
      "Upload a clear and recent food image.",
      "Mention halal status and important ingredients.",
    ],
  },
  {
    id: 2,
    title: "Requesting Food",
    description:
      "Learn how to explore available food and submit a responsible request.",
    icon: <FiMessageCircle />,
    iconStyle:
      "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400",
    points: [
      "Read the complete food details before requesting.",
      "Check the location and pickup availability.",
      "Request only food that you can collect.",
      "Wait for the food owner to review your request.",
      "Communicate respectfully after approval.",
      "Inform the owner if you cannot complete the pickup.",
    ],
  },
  {
    id: 3,
    title: "Pickup Coordination",
    description:
      "Arrange a suitable collection time and location with the food owner.",
    icon: <FiMapPin />,
    iconStyle:
      "bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-400",
    points: [
      "Confirm the pickup time before travelling.",
      "Use a safe and clearly identified collection point.",
      "Avoid unnecessary delays for urgent food items.",
      "Bring a suitable container or carrying bag.",
      "Verify the food post during collection.",
      "Complete the pickup respectfully and responsibly.",
    ],
  },
  {
    id: 4,
    title: "Volunteer Support",
    description:
      "Understand how volunteers can contribute to the ShareBite community.",
    icon: <MdOutlineVolunteerActivism />,
    iconStyle:
      "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950/60 dark:text-fuchsia-400",
    points: [
      "Support local food pickup coordination.",
      "Assist with suitable food delivery activities.",
      "Help organise community food-sharing events.",
      "Promote responsible food-waste awareness.",
      "Guide new users when using the platform.",
      "Report safety concerns to the ShareBite team.",
    ],
  },
];

/* =========================================================
   Safety guidance
========================================================= */

const SAFETY_ITEMS: SafetyItem[] = [
  {
    id: 1,
    title: "Check the Food Information",
    description:
      "Review the preparation date, expiry date, ingredients, quantity and storage information.",
    icon: <FiSearch />,
    iconStyle:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400",
  },
  {
    id: 2,
    title: "Share Only Safe Food",
    description:
      "Expired, spoiled, contaminated or improperly stored food should never be shared.",
    icon: <FiShield />,
    iconStyle:
      "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400",
  },
  {
    id: 3,
    title: "Respect Expiry Time",
    description:
      "Urgent food should be collected and used before its safe consumption period ends.",
    icon: <FiClock />,
    iconStyle:
      "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400",
  },
  {
    id: 4,
    title: "Report Suspicious Posts",
    description:
      "Contact ShareBite when information appears unsafe, inaccurate or intentionally misleading.",
    icon: <FiAlertTriangle />,
    iconStyle:
      "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400",
  },
];

/* =========================================================
   Quick support links
========================================================= */

const QUICK_LINKS: QuickLink[] = [
  {
    id: 1,
    title: "Explore Available Foods",
    description:
      "Browse food currently shared by members of the ShareBite community.",
    href: "/all-foods",
    buttonText: "Explore Foods",
    icon: <MdOutlineFastfood />,
    iconStyle:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400",
  },
  {
    id: 2,
    title: "Frequently Asked Questions",
    description:
      "Read common questions about food sharing, requests, pickup and volunteering.",
    href: "/#faq",
    buttonText: "Read FAQs",
    icon: <FiHelpCircle />,
    iconStyle:
      "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400",
  },
  {
    id: 3,
    title: "Contact ShareBite",
    description:
      "Visit the Contact page for general enquiries, feedback and safety concerns.",
    href: "/contact",
    buttonText: "Contact Us",
    icon: <FiMessageCircle />,
    iconStyle:
      "bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-400",
  },
];

/* =========================================================
   Common questions
========================================================= */

const COMMON_QUESTIONS = [
  {
    id: 1,
    question: "Is food shared through ShareBite free?",
    answer:
      "Yes. ShareBite is designed for free community food sharing. It is not a food-selling marketplace.",
  },
  {
    id: 2,
    question: "Can anyone request an available food item?",
    answer:
      "Registered community members can request available food after checking the food details, location and pickup requirements.",
  },
  {
    id: 3,
    question: "Does ShareBite deliver every food item?",
    answer:
      "No. ShareBite mainly connects food owners and requesters. Pickup or delivery arrangements depend on the people involved and available volunteer support.",
  },
  {
    id: 4,
    question: "What should I do if a food post looks unsafe?",
    answer:
      "Do not request or collect the food. Use the Contact page to report inaccurate, expired, contaminated or suspicious food information.",
  },
  {
    id: 5,
    question: "Can restaurants and organisations use ShareBite?",
    answer:
      "Yes. Individuals, families, restaurants, cafés, offices, events and community organisations may share suitable surplus food responsibly.",
  },
];

/* =========================================================
   Support page
========================================================= */

const SupportPage = () => {
  return (
    <main className="overflow-hidden bg-white dark:bg-[#050706]">
      {/* =====================================================
          Hero section
      ====================================================== */}

      <section className="relative overflow-hidden border-b border-slate-200 py-20 dark:border-zinc-800 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_20%,rgba(16,185,129,0.14),transparent_30%),radial-gradient(circle_at_92%_80%,rgba(14,165,233,0.10),transparent_30%)] dark:bg-[radial-gradient(circle_at_8%_20%,rgba(16,185,129,0.07),transparent_30%),radial-gradient(circle_at_92%_80%,rgba(14,165,233,0.05),transparent_30%)]" />

        <div className="pointer-events-none absolute -left-32 top-8 size-96 rounded-full bg-emerald-300/15 blur-3xl dark:bg-emerald-500/5" />

        <div className="pointer-events-none absolute -right-32 bottom-0 size-96 rounded-full bg-sky-300/15 blur-3xl dark:bg-sky-500/5" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-emerald-800 shadow-sm backdrop-blur-md dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
              <HiOutlineSparkles className="text-lg" />
              ShareBite Support Centre
            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
              Guidance for Safe and{" "}
              <span className="bg-linear-to-r from-emerald-700 via-green-600 to-lime-600 bg-clip-text text-transparent dark:from-emerald-300 dark:via-green-400 dark:to-lime-300">
                Responsible Sharing
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm font-medium leading-8 text-slate-600 dark:text-zinc-300 sm:text-base lg:mx-0">
              Find helpful guidance about sharing food, submitting
              requests, arranging pickup, food safety and volunteering
              through ShareBite.
            </p>

            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-8 text-slate-600 dark:text-zinc-400 sm:text-base lg:mx-0">
              This Support Centre provides general information to help
              community members use the platform clearly, respectfully
              and responsibly.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                href="/#faq"
                className="group inline-flex h-[54px] w-full items-center justify-center gap-3 rounded-xl bg-emerald-700 px-7 text-sm font-extrabold text-white shadow-lg shadow-emerald-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-800 hover:shadow-xl dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400 sm:w-auto"
              >
                Browse FAQs

                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="group inline-flex h-[54px] w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white/80 px-7 text-sm font-extrabold text-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:text-emerald-700 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900/75 dark:text-white dark:hover:border-emerald-800 dark:hover:text-emerald-400 sm:w-auto"
              >
                Contact ShareBite

                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-2 text-xs font-bold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400">
                <FiCheckCircle />
                Sharing guidance
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/80 px-3 py-2 text-xs font-bold text-sky-700 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-400">
                <FiShield />
                Safety information
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50/80 px-3 py-2 text-xs font-bold text-violet-700 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-400">
                <HiOutlineHandRaised />
                Volunteer support
              </span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="pointer-events-none absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/10" />

            <div className="relative overflow-hidden rounded-[34px] border border-emerald-200 bg-linear-to-br from-emerald-50 via-white to-sky-50/80 p-7 shadow-[0_35px_90px_-42px_rgba(16,185,129,0.55)] dark:border-emerald-900/70 dark:from-emerald-950/35 dark:via-zinc-900 dark:to-sky-950/20 sm:p-9">
              <div className="mx-auto flex size-24 items-center justify-center rounded-[28px] bg-linear-to-br from-emerald-700 via-green-600 to-lime-500 text-5xl text-white shadow-xl shadow-emerald-600/25 dark:from-emerald-500 dark:via-green-500 dark:to-lime-400 dark:text-emerald-950">
                <FiHelpCircle />
              </div>

              <h2 className="mt-6 text-center text-2xl font-black text-slate-950 dark:text-white sm:text-3xl">
                How Can We Help?
              </h2>

              <p className="mx-auto mt-3 max-w-md text-center text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400">
                Explore common support topics or visit our Contact page
                when you need additional assistance.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4 rounded-2xl border border-emerald-200 bg-white/75 p-4 dark:border-emerald-900/70 dark:bg-emerald-950/20">
                  <FiPackage className="shrink-0 text-2xl text-emerald-600 dark:text-emerald-400" />

                  <p className="text-sm font-bold text-slate-700 dark:text-zinc-300">
                    Food post and sharing assistance
                  </p>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-sky-200 bg-white/75 p-4 dark:border-sky-900/70 dark:bg-sky-950/20">
                  <FiMessageCircle className="shrink-0 text-2xl text-sky-600 dark:text-sky-400" />

                  <p className="text-sm font-bold text-slate-700 dark:text-zinc-300">
                    Request and pickup guidance
                  </p>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-violet-200 bg-white/75 p-4 dark:border-violet-900/70 dark:bg-violet-950/20">
                  <FiShield className="shrink-0 text-2xl text-violet-600 dark:text-violet-400" />

                  <p className="text-sm font-bold text-slate-700 dark:text-zinc-300">
                    Safety and community support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          Support topics
      ====================================================== */}

      <section className="py-20 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-400">
              Support Topics
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Find the Guidance You Need
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400 sm:text-base">
              These guides explain the main responsibilities of food
              owners, requesters and community volunteers.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {SUPPORT_TOPICS.map((topic) => (
              <article
                key={topic.id}
                className="group rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_22px_60px_-42px_rgba(15,23,42,0.40)] transition-all duration-500 hover:-translate-y-1.5 hover:border-emerald-300 hover:shadow-[0_30px_70px_-40px_rgba(16,185,129,0.35)] dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-emerald-900 sm:p-8"
              >
                <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
                  <div
                    className={`flex size-14 shrink-0 items-center justify-center rounded-2xl text-2xl transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110 ${topic.iconStyle}`}
                  >
                    {topic.icon}
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-slate-950 dark:text-white">
                      {topic.title}
                    </h3>

                    <p className="mt-2 text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400">
                      {topic.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {topic.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-3"
                    >
                      <FiCheckCircle className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />

                      <p className="text-sm font-medium leading-6 text-slate-600 dark:text-zinc-400">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          Food safety
      ====================================================== */}

      <section className="bg-slate-50 py-20 dark:bg-[#080a09] sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-sky-800 shadow-sm dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-300">
              <FiShield />
              Food Safety Guidance
            </div>

            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Safety Comes Before Sharing
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400 sm:text-base">
              Every community member is responsible for checking food
              information and avoiding unsafe sharing practices.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {SAFETY_ITEMS.map((item) => (
              <article
                key={item.id}
                className="group flex min-h-[250px] flex-col items-center rounded-[28px] border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-sky-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-sky-900"
              >
                <div
                  className={`flex size-14 items-center justify-center rounded-2xl text-2xl transition-transform duration-500 group-hover:scale-110 ${item.iconStyle}`}
                >
                  {item.icon}
                </div>

                <h3 className="mt-5 text-lg font-black text-slate-950 dark:text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex items-start gap-4 rounded-[26px] border border-amber-200 bg-amber-50 p-6 dark:border-amber-900/60 dark:bg-amber-950/20 sm:p-8">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-xl text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
              <FiAlertTriangle />
            </div>

            <div>
              <h3 className="text-lg font-black text-amber-900 dark:text-amber-300">
                Important Safety Reminder
              </h3>

              <p className="mt-2 text-sm font-medium leading-7 text-amber-800 dark:text-amber-200/80">
                ShareBite helps connect food owners and requesters, but
                every user must assess the food information and
                condition responsibly. Do not share, request or collect
                expired, spoiled, contaminated or improperly stored
                food.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          Request process
      ====================================================== */}

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="text-center lg:text-left">
            <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-400">
              Request Support
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              From Request to Collection
            </h2>

            <p className="mt-5 text-sm font-medium leading-8 text-slate-600 dark:text-zinc-400 sm:text-base">
              A food request does not automatically confirm that the
              item belongs to the requester. The food owner reviews the
              available requests and approves a suitable community
              member.
            </p>

            <Link
              href="/all-foods"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-emerald-700 transition-colors hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              Explore Available Foods

              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="space-y-4">
            {[
              {
                id: 1,
                title: "Explore Food Details",
                description:
                  "Check the food condition, quantity, location and expiry information.",
                icon: <FiSearch />,
              },
              {
                id: 2,
                title: "Submit a Responsible Request",
                description:
                  "Request only when you are genuinely interested and able to collect the food.",
                icon: <FiMessageCircle />,
              },
              {
                id: 3,
                title: "Wait for Owner Approval",
                description:
                  "The food owner reviews requests and selects a suitable requester.",
                icon: <FiUserCheck />,
              },
              {
                id: 4,
                title: "Confirm Pickup",
                description:
                  "Coordinate the collection time and location after the request is approved.",
                icon: <FiMapPin />,
              },
            ].map((step, index) => (
              <div
                key={step.id}
                className="flex items-start gap-4 rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-lg text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                  {step.icon}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                      STEP {index + 1}
                    </span>
                  </div>

                  <h3 className="mt-1 text-base font-black text-slate-950 dark:text-white">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm font-medium leading-6 text-slate-600 dark:text-zinc-400">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          Common questions
      ====================================================== */}

      <section className="bg-slate-50 py-20 dark:bg-[#080a09] sm:py-24">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-violet-800 shadow-sm dark:border-violet-900 dark:bg-violet-950/30 dark:text-violet-300">
              <FiHelpCircle />
              Common Questions
            </div>

            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Quick Support Answers
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400 sm:text-base">
              Open each question to read a short explanation.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {COMMON_QUESTIONS.map((item) => (
              <details
                key={item.id}
                className="group rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm open:border-emerald-300 dark:border-zinc-800 dark:bg-zinc-900/80 dark:open:border-emerald-900 sm:p-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                  <span className="text-sm font-black text-slate-950 dark:text-white sm:text-base">
                    {item.question}
                  </span>

                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-700 transition-transform duration-300 group-open:rotate-45 dark:bg-emerald-950/60 dark:text-emerald-400">
                    +
                  </span>
                </summary>

                <p className="mt-4 border-t border-slate-200 pt-4 text-sm font-medium leading-7 text-slate-600 dark:border-zinc-800 dark:text-zinc-400">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          Quick links
      ====================================================== */}

      <section className="py-20 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-sky-700 dark:text-sky-400">
              More ShareBite Resources
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Continue to the Right Place
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400 sm:text-base">
              Explore food posts, browse frequently asked questions or
              visit the Contact page for additional assistance.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {QUICK_LINKS.map((item) => (
              <article
                key={item.id}
                className="group flex min-h-[290px] flex-col items-center rounded-[28px] border border-slate-200 bg-white p-7 text-center shadow-[0_20px_55px_-38px_rgba(15,23,42,0.35)] transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-[0_28px_65px_-34px_rgba(16,185,129,0.30)] dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-emerald-900"
              >
                <div
                  className={`flex size-14 items-center justify-center rounded-2xl text-2xl transition-transform duration-500 group-hover:scale-110 ${item.iconStyle}`}
                >
                  {item.icon}
                </div>

                <h3 className="mt-5 text-lg font-black text-slate-950 dark:text-white">
                  {item.title}
                </h3>

                <p className="mt-3 flex-1 text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400">
                  {item.description}
                </p>

                <Link
                  href={item.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-emerald-700 transition-colors hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  {item.buttonText}

                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </article>
            ))}
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
                <MdFoodBank />
              </div>

              <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                Still Need Help?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600 dark:text-zinc-300 sm:text-base">
                Visit the Contact page to share your question,
                feedback, food-safety concern or volunteer enquiry with
                ShareBite.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="group inline-flex h-[54px] w-full items-center justify-center gap-3 rounded-xl bg-emerald-700 px-7 text-sm font-extrabold text-white shadow-lg shadow-emerald-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-800 hover:shadow-xl dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400 sm:w-auto"
                >
                  Contact ShareBite

                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/about-us"
                  className="group inline-flex h-[54px] w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white/80 px-7 text-sm font-extrabold text-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:text-emerald-700 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900/75 dark:text-white dark:hover:border-emerald-800 dark:hover:text-emerald-400 sm:w-auto"
                >
                  About ShareBite

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

export default SupportPage;