import Link from "next/link";

import {
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiHeart,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiShield,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

import {
  HiOutlineHandRaised,
  HiOutlineSparkles,
} from "react-icons/hi2";

import {
  MdCampaign,
  MdDeliveryDining,
  MdFoodBank,
  MdOutlineEventAvailable,
} from "react-icons/md";

/* =========================================================
   Volunteer roles
========================================================= */

const VOLUNTEER_ROLES = [
  {
    id: 1,
    title: "Food Collection",
    description:
      "Help collect safe surplus food from nearby homes, restaurants, offices and community events.",
    icon: <MdFoodBank />,
    iconStyle:
      "from-emerald-600 via-green-500 to-lime-400",
    glowStyle: "bg-emerald-400",
  },
  {
    id: 2,
    title: "Safe Delivery",
    description:
      "Support the careful and timely delivery of collected food to approved community members.",
    icon: <MdDeliveryDining />,
    iconStyle:
      "from-sky-600 via-cyan-500 to-blue-400",
    glowStyle: "bg-sky-400",
  },
  {
    id: 3,
    title: "Event Support",
    description:
      "Assist with food-sharing drives, university campaigns, local events and community activities.",
    icon: <MdOutlineEventAvailable />,
    iconStyle:
      "from-violet-600 via-purple-500 to-fuchsia-400",
    glowStyle: "bg-violet-400",
  },
  {
    id: 4,
    title: "Community Awareness",
    description:
      "Encourage responsible food sharing and raise awareness about reducing avoidable food waste.",
    icon: <MdCampaign />,
    iconStyle:
      "from-orange-600 via-amber-500 to-yellow-400",
    glowStyle: "bg-amber-400",
  },
];

/* =========================================================
   Volunteer benefits
========================================================= */

const VOLUNTEER_BENEFITS = [
  {
    id: 1,
    title: "Make a Real Difference",
    description:
      "Your time can help good food reach people instead of becoming unnecessary waste.",
    icon: <FiHeart />,
    iconStyle:
      "bg-rose-100 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400",
  },
  {
    id: 2,
    title: "Support Your Community",
    description:
      "Take part in meaningful local action and connect with people in your surrounding area.",
    icon: <FiUsers />,
    iconStyle:
      "bg-sky-100 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400",
  },
  {
    id: 3,
    title: "Choose Flexible Hours",
    description:
      "Volunteer according to your location, availability and preferred type of field activity.",
    icon: <FiClock />,
    iconStyle:
      "bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400",
  },
  {
    id: 4,
    title: "Build Useful Experience",
    description:
      "Develop teamwork, communication, organisation and responsible community-service skills.",
    icon: <FiTrendingUp />,
    iconStyle:
      "bg-violet-100 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400",
  },
];

/* =========================================================
   Volunteer joining steps
========================================================= */

const VOLUNTEER_STEPS = [
  {
    id: 1,
    number: "01",
    title: "Choose a Role",
    description:
      "Select the volunteer activity that matches your interests, location and availability.",
  },
  {
    id: 2,
    number: "02",
    title: "Contact ShareBite",
    description:
      "Visit the Contact page and send us an email or message expressing your interest.",
  },
  {
    id: 3,
    number: "03",
    title: "Share Your Details",
    description:
      "Mention your name, location, preferred role, available time and contact information.",
  },
  {
    id: 4,
    number: "04",
    title: "Join Field Activities",
    description:
      "Our team can contact you when a suitable community activity becomes available.",
  },
];

/* =========================================================
   Main component
========================================================= */

const VolunteerSection = () => {
  return (
    <section
      id="volunteer"
      className="relative overflow-hidden bg-white py-20 dark:bg-zinc-950 sm:py-24"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(16,185,129,0.12),transparent_30%),radial-gradient(circle_at_90%_80%,rgba(14,165,233,0.08),transparent_30%)] dark:bg-[radial-gradient(circle_at_10%_20%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_90%_80%,rgba(14,165,233,0.05),transparent_30%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.025)_1px,transparent_1px)] bg-[size:52px_52px] opacity-50 dark:opacity-15" />

      <div className="pointer-events-none absolute -left-24 top-20 size-80 rounded-full bg-emerald-300/15 blur-3xl dark:bg-emerald-500/5" />

      <div className="pointer-events-none absolute -right-24 bottom-10 size-80 rounded-full bg-sky-300/10 blur-3xl dark:bg-sky-500/5" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            Section heading
        ====================================================== */}

        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/90 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-emerald-800 shadow-sm dark:border-emerald-800/60 dark:bg-emerald-950/35 dark:text-emerald-300">
            <HiOutlineHandRaised className="text-lg" />

            Volunteer With ShareBite
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
            Turn Your Time Into{" "}
            <span className="bg-linear-to-r from-emerald-700 via-green-600 to-lime-600 bg-clip-text text-transparent dark:from-emerald-300 dark:via-emerald-400 dark:to-lime-300">
              Community Impact
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm font-medium leading-7 text-slate-700 dark:text-zinc-300 sm:text-base">
            You do not need extra food to make a difference.
            Volunteer your time to support food collection, safe
            delivery, community events and awareness activities
            that help reduce food waste.
          </p>
        </div>

        {/* =====================================================
            Main volunteer content
        ====================================================== */}

        <div className="mt-14 grid w-full items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* =====================================================
              Left content
          ====================================================== */}

          <div className="flex w-full min-w-0 flex-col justify-center text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.13em] text-slate-700 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-300">
                <HiOutlineSparkles className="text-lg text-emerald-600 dark:text-emerald-400" />

                Why Volunteer?
              </div>
            </div>

            <h3 className="mt-5 text-2xl font-black leading-tight text-slate-950 dark:text-white sm:text-3xl">
              A small contribution of time can create a meaningful
              result.
            </h3>

            <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400 sm:text-base lg:mx-0">
              Volunteers help connect available food with community
              needs. Your support can improve coordination, reduce
              delays, strengthen local participation and encourage
              responsible food-sharing habits.
            </p>

            {/* Benefit cards */}
            <div className="mx-auto mt-8 grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-2 lg:mx-0">
              {VOLUNTEER_BENEFITS.map((benefit) => (
                <article
                  key={benefit.id}
                  className="group flex min-h-[165px] flex-col items-center rounded-2xl border border-slate-200 bg-white/85 p-4 text-center shadow-sm backdrop-blur-md transition-all duration-300 hover:border-emerald-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/75 dark:hover:border-emerald-800 sm:items-start sm:text-left"
                >
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-xl text-lg ${benefit.iconStyle}`}
                  >
                    {benefit.icon}
                  </div>

                  <h4 className="mt-3 text-sm font-black text-slate-950 dark:text-white">
                    {benefit.title}
                  </h4>

                  <p className="mt-2 text-xs font-medium leading-5 text-slate-500 dark:text-zinc-500">
                    {benefit.description}
                  </p>
                </article>
              ))}
            </div>

            {/* Safety note */}
            <div className="mx-auto mt-6 flex w-full max-w-xl items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 text-left dark:border-emerald-900/60 dark:bg-emerald-950/20 lg:mx-0">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-lg text-white dark:bg-emerald-500 dark:text-emerald-950">
                <FiShield />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-black text-emerald-900 dark:text-emerald-300">
                  Responsible and safe participation
                </p>

                <p className="mt-1 text-xs font-medium leading-5 text-emerald-800/80 dark:text-emerald-400/80">
                  Field activities should follow food-safety,
                  respectful communication and responsible
                  coordination practices.
                </p>
              </div>
            </div>
          </div>

          {/* =====================================================
              Right volunteer role cards
          ====================================================== */}

          <div className="relative w-full min-w-0 self-start">
            {/* Background glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/15 blur-3xl dark:bg-emerald-500/5" />

            {/* Responsive grid */}
            <div className="relative z-10 grid w-full auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7">
              {VOLUNTEER_ROLES.map((role) => (
                <article
                  key={role.id}
                  className="group relative flex h-full min-h-[250px] w-full min-w-0 flex-col items-center justify-center overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/90 p-6 text-center shadow-[0_22px_60px_-32px_rgba(15,23,42,0.38)] backdrop-blur-md transition-[border-color,box-shadow] duration-500 hover:border-emerald-300 hover:shadow-[0_28px_70px_-30px_rgba(16,185,129,0.35)] dark:border-zinc-800 dark:bg-zinc-900/85 dark:shadow-[0_22px_60px_-32px_rgba(0,0,0,0.9)] dark:hover:border-emerald-800"
                >
                  {/* Card glow */}
                  <div
                    className={`pointer-events-none absolute -right-12 -top-12 size-36 rounded-full ${role.glowStyle} opacity-10 blur-3xl transition-opacity duration-500 group-hover:opacity-20`}
                  />

                  {/* Icon */}
                  <div
                    className={`relative flex size-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br ${role.iconStyle} text-3xl text-white shadow-lg transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110`}
                  >
                    {role.icon}
                  </div>

                  {/* Title */}
                  <h3 className="relative mt-5 w-full text-center text-lg font-black text-slate-950 dark:text-white">
                    {role.title}
                  </h3>

                  {/* Description */}
                  <p className="relative mx-auto mt-3 w-full max-w-[270px] text-center text-sm font-medium leading-6 text-slate-600 dark:text-zinc-400">
                    {role.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* =====================================================
            How to join
        ====================================================== */}

        <div className="mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/90 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-sky-800 shadow-sm dark:border-sky-900/60 dark:bg-sky-950/30 dark:text-sky-300">
              <FiMessageSquare className="text-base" />

              How to Join
            </div>

            <h3 className="mt-5 text-2xl font-black text-slate-950 dark:text-white sm:text-3xl">
              Becoming a volunteer is simple
            </h3>

            <p className="mt-3 text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400">
              Contact us with your basic details, and our team can
              connect you with a suitable volunteering opportunity.
            </p>
          </div>

          <div className="relative mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VOLUNTEER_STEPS.map((step) => (
              <article
                key={step.id}
                className="group relative flex min-h-[245px] flex-col items-center overflow-hidden rounded-[26px] border border-slate-200/80 bg-white/90 p-6 text-center shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] transition-[border-color,box-shadow] duration-500 hover:border-emerald-300 hover:shadow-[0_25px_60px_-28px_rgba(16,185,129,0.30)] dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-emerald-800"
              >
                <span className="absolute right-4 top-3 text-4xl font-black text-slate-100 transition-colors group-hover:text-emerald-100 dark:text-zinc-800 dark:group-hover:text-emerald-950">
                  {step.number}
                </span>

                <div className="relative mx-auto flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-lg font-black text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                  {step.id}
                </div>

                <h4 className="relative mt-5 text-base font-black text-slate-950 dark:text-white">
                  {step.title}
                </h4>

                <p className="relative mt-3 text-xs font-medium leading-6 text-slate-500 dark:text-zinc-500">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* =====================================================
            Contact CTA
        ====================================================== */}

        <div className="relative mt-16 overflow-hidden rounded-[32px] border border-emerald-200 bg-linear-to-br from-emerald-700 via-green-700 to-emerald-800 px-5 py-9 text-white shadow-[0_30px_80px_-35px_rgba(5,150,105,0.65)] dark:border-emerald-800 sm:px-8 lg:px-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_90%_90%,rgba(163,230,53,0.18),transparent_30%)]" />

          <div className="pointer-events-none absolute -right-16 -top-16 size-52 rounded-full border-[32px] border-white/5" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                <FiMail className="text-base" />

                Ready to Volunteer?
              </div>

              <h3 className="mt-5 text-2xl font-black sm:text-3xl">
                Send us an email or message through the Contact
                page.
              </h3>

              <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-7 text-emerald-50/85 lg:mx-0">
                Tell us your name, location, preferred volunteer
                role, available time and contact details. Our team
                can review your message and contact you when a
                suitable activity becomes available.
              </p>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-white/85 lg:justify-start">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                  <FiCheckCircle />
                  Your name
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                  <FiMapPin />
                  Your location
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                  <HiOutlineHandRaised />
                  Preferred role
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
                  <FiClock />
                  Availability
                </span>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <Link
                href="/contact"
                className="group inline-flex h-[54px] w-full items-center justify-center gap-3 rounded-xl bg-white px-7 text-sm font-extrabold text-emerald-800 shadow-lg transition-all duration-300 hover:bg-emerald-50 hover:shadow-xl sm:w-auto lg:min-w-[230px]"
              >
                <FiMessageSquare className="text-lg" />

                Contact to Volunteer

                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerSection;