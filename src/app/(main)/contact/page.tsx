import type { Metadata } from "next";
import type { ReactNode } from "react";

import Link from "next/link";

import {
  FiAlertCircle,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiFacebook,
  FiHelpCircle,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiSend,
  FiShield,
  FiUser,
  FiUsers,
} from "react-icons/fi";

import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa6";

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
  title: "Contact Us | ShareBite",
  description:
    "Contact ShareBite for help with food posts, food requests, pickup coordination, volunteering, safety concerns and general platform support.",
};

/* =========================================================
   Types
========================================================= */

interface ContactReason {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
  iconStyle: string;
}

interface SupportOption {
  id: number;
  title: string;
  description: string;
  href: string;
  buttonText: string;
  icon: ReactNode;
  iconStyle: string;
}

/* =========================================================
   Contact reasons
========================================================= */

const CONTACT_REASONS: ContactReason[] = [
  {
    id: 1,
    title: "Food Post Support",
    description:
      "Get help with creating, updating or managing a shared food post.",
    icon: <MdOutlineFastfood />,
    iconStyle:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400",
  },
  {
    id: 2,
    title: "Food Request Support",
    description:
      "Contact us about submitting, reviewing or managing a food request.",
    icon: <FiMessageCircle />,
    iconStyle:
      "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400",
  },
  {
    id: 3,
    title: "Volunteer Enquiries",
    description:
      "Learn how you can support food pickup, delivery and community activities.",
    icon: <MdOutlineVolunteerActivism />,
    iconStyle:
      "bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-400",
  },
  {
    id: 4,
    title: "Safety Concerns",
    description:
      "Report inaccurate food information, unsafe food or suspicious activity.",
    icon: <FiShield />,
    iconStyle:
      "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400",
  },
];

/* =========================================================
   Support options
========================================================= */

const SUPPORT_OPTIONS: SupportOption[] = [
  {
    id: 1,
    title: "Frequently Asked Questions",
    description:
      "Find answers about food sharing, food requests, pickup and volunteering.",
    href: "/#faq",
    buttonText: "Read FAQs",
    icon: <FiHelpCircle />,
    iconStyle:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400",
  },
  {
    id: 2,
    title: "Support Centre",
    description:
      "Explore additional guidance about using ShareBite safely and responsibly.",
    href: "/support",
    buttonText: "Visit Support",
    icon: <FiUsers />,
    iconStyle:
      "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400",
  },
  {
    id: 3,
    title: "About ShareBite",
    description:
      "Learn about our motivation, features, mission and future goals.",
    href: "/about-us",
    buttonText: "About Us",
    icon: <MdFoodBank />,
    iconStyle:
      "bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-400",
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
      "hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:bg-blue-950/30 dark:hover:text-blue-400",
  },
  {
    id: 2,
    label: "GitHub",
    href: "https://github.com/kouser-ahamed",
    icon: <FaGithub />,
    className:
      "hover:border-slate-900 hover:bg-slate-100 hover:text-slate-950 dark:hover:border-white dark:hover:bg-zinc-800 dark:hover:text-white",
  },
  {
    id: 3,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kouser-ahamed",
    icon: <FaLinkedinIn />,
    className:
      "hover:border-sky-500 hover:bg-sky-50 hover:text-sky-700 dark:hover:border-sky-500 dark:hover:bg-sky-950/30 dark:hover:text-sky-400",
  },
];

/* =========================================================
   Contact page
========================================================= */

const ContactPage = () => {
  return (
    <main className="overflow-hidden bg-white dark:bg-[#050706]">
      {/* =====================================================
          Hero section
      ====================================================== */}

      <section className="relative overflow-hidden border-b border-slate-200 py-20 dark:border-zinc-800 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_20%,rgba(16,185,129,0.14),transparent_30%),radial-gradient(circle_at_92%_80%,rgba(14,165,233,0.10),transparent_30%)] dark:bg-[radial-gradient(circle_at_8%_20%,rgba(16,185,129,0.07),transparent_30%),radial-gradient(circle_at_92%_80%,rgba(14,165,233,0.05),transparent_30%)]" />

        <div className="pointer-events-none absolute -left-32 top-8 size-96 rounded-full bg-emerald-300/15 blur-3xl dark:bg-emerald-500/5" />

        <div className="pointer-events-none absolute -right-32 bottom-0 size-96 rounded-full bg-sky-300/15 blur-3xl dark:bg-sky-500/5" />

        <div className="relative mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-emerald-800 shadow-sm backdrop-blur-md dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
            <HiOutlineSparkles className="text-lg" />
            Contact ShareBite
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
            We Are Here to{" "}
            <span className="bg-linear-to-r from-emerald-700 via-green-600 to-lime-600 bg-clip-text text-transparent dark:from-emerald-300 dark:via-green-400 dark:to-lime-300">
              Help Our Community
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-sm font-medium leading-8 text-slate-600 dark:text-zinc-300 sm:text-base">
            Contact the ShareBite team for help with food posts,
            requests, pickup arrangements, volunteering, safety
            concerns or general platform feedback.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-2 text-xs font-bold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400">
              <FiCheckCircle />
              Community-focused support
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/80 px-3 py-2 text-xs font-bold text-sky-700 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-400">
              <FiShield />
              Safety assistance
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50/80 px-3 py-2 text-xs font-bold text-violet-700 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-400">
              <HiOutlineHandRaised />
              Volunteer guidance
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          Contact reasons
      ====================================================== */}

      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-400">
              How We Can Help
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Contact Us About ShareBite
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400 sm:text-base">
              Select the most relevant topic when completing the
              contact form so your message can be handled properly
              after backend support is implemented.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {CONTACT_REASONS.map((reason) => (
              <article
                key={reason.id}
                className="group flex min-h-[230px] flex-col items-center rounded-[26px] border border-slate-200 bg-white p-6 text-center shadow-[0_20px_55px_-38px_rgba(15,23,42,0.35)] transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-[0_28px_65px_-34px_rgba(16,185,129,0.30)] dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-emerald-900"
              >
                <div
                  className={`flex size-14 items-center justify-center rounded-2xl text-2xl transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110 ${reason.iconStyle}`}
                >
                  {reason.icon}
                </div>

                <h3 className="mt-5 text-lg font-black text-slate-950 dark:text-white">
                  {reason.title}
                </h3>

                <p className="mt-3 text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400">
                  {reason.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          Main contact area
      ====================================================== */}

      <section className="bg-slate-50 py-20 dark:bg-[#080a09] sm:py-24">
        <div className="mx-auto grid w-full max-w-7xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          {/* Left information */}
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-400">
              Get in Touch
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Tell Us How We Can Help
            </h2>

            <p className="mt-5 text-sm font-medium leading-8 text-slate-600 dark:text-zinc-400 sm:text-base">
              Share your question, feedback or concern with the
              ShareBite team. You may contact us about food sharing,
              food requests, pickup coordination, volunteering,
              platform usage or community safety.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-xl text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                  <FiMessageCircle />
                </div>

                <div>
                  <h3 className="text-base font-black text-slate-950 dark:text-white">
                    General Support
                  </h3>

                  <p className="mt-2 text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400">
                    Ask questions about using ShareBite, managing food
                    posts or submitting food requests.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-xl text-sky-700 dark:bg-sky-950/60 dark:text-sky-400">
                  <FiClock />
                </div>

                <div>
                  <h3 className="text-base font-black text-slate-950 dark:text-white">
                    Response Availability
                  </h3>

                  <p className="mt-2 text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400">
                    Direct message processing will become available
                    when the contact backend is implemented.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-xl text-rose-700 dark:bg-rose-950/60 dark:text-rose-400">
                  <FiAlertCircle />
                </div>

                <div>
                  <h3 className="text-base font-black text-slate-950 dark:text-white">
                    Food Safety Reports
                  </h3>

                  <p className="mt-2 text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400">
                    Contact support when a food post appears unsafe,
                    inaccurate, expired or inconsistent with
                    ShareBite&apos;s sharing principles.
                  </p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-10 border-t border-slate-200 pt-7 dark:border-zinc-800">
              <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-slate-400 dark:text-zinc-500">
                Connect with the developer
              </p>

              <div className="mt-4 flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className={`flex size-11 items-center justify-center rounded-xl border border-slate-300 bg-white text-lg text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 ${social.className}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Static contact form */}
          <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_28px_80px_-46px_rgba(15,23,42,0.45)] dark:border-zinc-800 dark:bg-zinc-900/80 sm:p-8 lg:p-10">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-700 via-green-600 to-lime-500 text-xl text-white shadow-lg">
                <FiMail />
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                  Send Us a Message
                </h2>

                <p className="mt-2 text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400">
                  Complete the form below with your contact details
                  and message.
                </p>
              </div>
            </div>

            <form className="mt-8 space-y-5">
              {/* Name and email */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-extrabold text-slate-700 dark:text-zinc-300"
                  >
                    Full Name
                  </label>

                  <div className="relative">
                    <FiUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />

                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      autoComplete="name"
                      className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-emerald-500 dark:focus:ring-emerald-950"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-extrabold text-slate-700 dark:text-zinc-300"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      autoComplete="email"
                      className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-emerald-500 dark:focus:ring-emerald-950"
                    />
                  </div>
                </div>
              </div>

              {/* Contact type */}
              <div>
                <label
                  htmlFor="contactType"
                  className="mb-2 block text-sm font-extrabold text-slate-700 dark:text-zinc-300"
                >
                  Contact Topic
                </label>

                <select
                  id="contactType"
                  name="contactType"
                  defaultValue=""
                  className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300 dark:focus:border-emerald-500 dark:focus:ring-emerald-950"
                >
                  <option value="" disabled>
                    Select a contact topic
                  </option>

                  <option value="general">
                    General Question
                  </option>

                  <option value="food-post">
                    Food Post Support
                  </option>

                  <option value="food-request">
                    Food Request Support
                  </option>

                  <option value="pickup">
                    Pickup Coordination
                  </option>

                  <option value="volunteer">
                    Volunteer Enquiry
                  </option>

                  <option value="safety">
                    Food Safety Concern
                  </option>

                  <option value="feedback">
                    Website Feedback
                  </option>
                </select>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-extrabold text-slate-700 dark:text-zinc-300"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Write a short subject"
                  className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-emerald-500 dark:focus:ring-emerald-950"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-extrabold text-slate-700 dark:text-zinc-300"
                >
                  Your Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Describe your question, feedback or concern..."
                  className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium leading-7 text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-emerald-500 dark:focus:ring-emerald-950"
                />
              </div>

              {/* Privacy agreement */}
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  name="privacyAgreement"
                  className="mt-1 size-4 shrink-0 accent-emerald-600"
                />

                <span className="text-xs font-medium leading-6 text-slate-500 dark:text-zinc-400">
                  I understand that this form is currently a static
                  interface and my message will not be submitted
                  until the contact backend is implemented.
                </span>
              </label>

              {/* Static button */}
              <button
                type="button"
                aria-disabled="true"
                title="Contact form submission will be implemented in the future"
                className="group flex h-[54px] w-full cursor-not-allowed items-center justify-center gap-3 rounded-xl bg-emerald-700 px-6 text-sm font-extrabold text-white opacity-80 shadow-lg shadow-emerald-700/20 dark:bg-emerald-500 dark:text-emerald-950"
              >
                <FiSend />

                Send Message

                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-900/60 dark:bg-amber-950/20">
                <FiAlertCircle className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />

                <p className="text-xs font-semibold leading-5 text-amber-800 dark:text-amber-300">
                  This contact form is currently for interface
                  demonstration only. No information is sent to a
                  server or stored in a database.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* =====================================================
          Additional support
      ====================================================== */}

      <section className="py-20 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-sky-700 dark:text-sky-400">
              Explore More Support
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              You May Find Your Answer Here
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400 sm:text-base">
              Explore ShareBite&apos;s information pages for quick
              guidance about the platform and community food sharing.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {SUPPORT_OPTIONS.map((option) => (
              <article
                key={option.id}
                className="group flex min-h-[280px] flex-col items-center rounded-[28px] border border-slate-200 bg-white p-7 text-center shadow-[0_20px_55px_-38px_rgba(15,23,42,0.35)] transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-[0_28px_65px_-34px_rgba(16,185,129,0.30)] dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-emerald-900"
              >
                <div
                  className={`flex size-14 items-center justify-center rounded-2xl text-2xl transition-transform duration-500 group-hover:scale-110 ${option.iconStyle}`}
                >
                  {option.icon}
                </div>

                <h3 className="mt-5 text-lg font-black text-slate-950 dark:text-white">
                  {option.title}
                </h3>

                <p className="mt-3 flex-1 text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400">
                  {option.description}
                </p>

                <Link
                  href={option.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-emerald-700 transition-colors hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  {option.buttonText}

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
                Help Good Food Reach Another Table
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600 dark:text-zinc-300 sm:text-base">
                Explore available food, share safe surplus food or
                learn more about ShareBite&apos;s community mission.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/all-foods"
                  className="group inline-flex h-[54px] w-full items-center justify-center gap-3 rounded-xl bg-emerald-700 px-7 text-sm font-extrabold text-white shadow-lg shadow-emerald-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-800 hover:shadow-xl dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400 sm:w-auto"
                >
                  Explore Available Foods

                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/about-us"
                  className="group inline-flex h-[54px] w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white/80 px-7 text-sm font-extrabold text-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:text-emerald-700 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900/75 dark:text-white dark:hover:border-emerald-800 dark:hover:text-emerald-400 sm:w-auto"
                >
                  Learn About ShareBite

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

export default ContactPage;