import type { Metadata } from "next";
import type { ReactNode } from "react";

import Link from "next/link";

import {
  FiAlertCircle,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiDatabase,
  FiEye,
  FiFileText,
  FiHelpCircle,
  FiImage,
  FiKey,
  FiLock,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiRefreshCw,
  FiServer,
  FiShield,
  FiTrash2,
  FiUser,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";

import { HiOutlineSparkles } from "react-icons/hi2";
import {
  MdFoodBank,
  MdOutlineFastfood,
  MdOutlinePrivacyTip,
} from "react-icons/md";

/* =========================================================
   Metadata
========================================================= */

export const metadata: Metadata = {
  title: "Privacy Policy | ShareBite",
  description:
    "Read the ShareBite Privacy Policy to understand how account, food-post, food-request and platform information may be collected, used and protected.",
};

/* =========================================================
   Types
========================================================= */

interface SummaryItem {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
  iconStyle: string;
}

interface InformationItem {
  id: number;
  title: string;
  description: string;
  examples: string[];
  icon: ReactNode;
  iconStyle: string;
}

interface PolicySection {
  id: string;
  number: string;
  title: string;
  paragraphs: string[];
  points?: string[];
  icon: ReactNode;
  iconStyle: string;
}

/* =========================================================
   Privacy summary
========================================================= */

const PRIVACY_SUMMARY: SummaryItem[] = [
  {
    id: 1,
    title: "Clear Information",
    description:
      "We aim to explain what information ShareBite may process and why it is needed.",
    icon: <FiEye />,
    iconStyle:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400",
  },
  {
    id: 2,
    title: "Secure Access",
    description:
      "Authentication and protected routes help prevent unauthorised access to user features.",
    icon: <FiLock />,
    iconStyle:
      "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400",
  },
  {
    id: 3,
    title: "Responsible Use",
    description:
      "Information should only be used for valid food-sharing and platform purposes.",
    icon: <FiShield />,
    iconStyle:
      "bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-400",
  },
  {
    id: 4,
    title: "User Control",
    description:
      "Users should be able to review and manage information connected to their accounts.",
    icon: <FiUserCheck />,
    iconStyle:
      "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400",
  },
];

/* =========================================================
   Information categories
========================================================= */

const INFORMATION_CATEGORIES: InformationItem[] = [
  {
    id: 1,
    title: "Account and Profile Information",
    description:
      "Information provided when a user creates, signs in to or manages a ShareBite account.",
    examples: [
      "Full name",
      "Email address",
      "Profile image",
      "Authentication and session details",
    ],
    icon: <FiUser />,
    iconStyle:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400",
  },
  {
    id: 2,
    title: "Food Post Information",
    description:
      "Information submitted when a registered user publishes safe surplus food.",
    examples: [
      "Food name and description",
      "Food image and quantity",
      "Preparation and expiry dates",
      "Location, category and halal status",
    ],
    icon: <MdOutlineFastfood />,
    iconStyle:
      "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400",
  },
  {
    id: 3,
    title: "Food Request Information",
    description:
      "Information generated when a user requests food or manages requests received for a post.",
    examples: [
      "Requested food item",
      "Requester and owner details",
      "Request status",
      "Collection-related information",
    ],
    icon: <FiMessageCircle />,
    iconStyle:
      "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400",
  },
  {
    id: 4,
    title: "Technical Information",
    description:
      "Limited technical information may be used to operate, secure and improve the website.",
    examples: [
      "Browser and device information",
      "Authentication cookies or tokens",
      "Session information",
      "Error and security logs",
    ],
    icon: <FiServer />,
    iconStyle:
      "bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-400",
  },
];

/* =========================================================
   Policy sections
========================================================= */

const POLICY_SECTIONS: PolicySection[] = [
  {
    id: "introduction",
    number: "01",
    title: "Introduction",
    icon: <FiFileText />,
    iconStyle:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400",
    paragraphs: [
      "This Privacy Policy explains how ShareBite may collect, use, display, store and protect information when people use our community food-sharing website.",
      "ShareBite connects people who have safe surplus food with community members who can request and collect it. This policy applies to account registration, profiles, food posts, food requests and related website activity.",
    ],
  },
  {
    id: "information-we-collect",
    number: "02",
    title: "Information We May Collect",
    icon: <FiDatabase />,
    iconStyle:
      "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400",
    paragraphs: [
      "The information processed by ShareBite depends on how a person uses the website. Visitors can view public pages, while registered users provide additional information to access protected features.",
    ],
    points: [
      "Name, email address and profile image connected to a user account.",
      "Food names, descriptions, images, quantities and categories.",
      "Food preparation dates, expiry dates and halal status.",
      "General pickup location provided through a food post.",
      "Food-request details and request-management status.",
      "Session, authentication and limited technical information.",
      "Information submitted through future support or contact features.",
    ],
  },
  {
    id: "how-we-use-information",
    number: "03",
    title: "How We May Use Information",
    icon: <FiUserCheck />,
    iconStyle:
      "bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-400",
    paragraphs: [
      "ShareBite may use information to provide its core food-sharing features, manage accounts and support responsible interaction between food owners and requesters.",
    ],
    points: [
      "Create, authenticate and manage user accounts.",
      "Display available food posts and relevant food details.",
      "Allow registered users to request available food.",
      "Help owners review, approve or reject food requests.",
      "Allow users to manage their own shared food posts.",
      "Highlight food items approaching their expiry time.",
      "Maintain platform security and prevent misuse.",
      "Improve website performance, accessibility and usability.",
      "Provide support when backend contact functionality is implemented.",
    ],
  },
  {
    id: "public-information",
    number: "04",
    title: "Information Visible to Other Users",
    icon: <FiEye />,
    iconStyle:
      "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400",
    paragraphs: [
      "Some information needs to be visible to other users so that community food sharing can work properly.",
      "Users should avoid adding unnecessary personal, financial or sensitive information to food descriptions or other public areas.",
    ],
    points: [
      "Food name, image, description, category and quantity.",
      "Preparation date, expiry date and halal status.",
      "General pickup location included with a food post.",
      "The name or profile information displayed for the food owner.",
      "Relevant request information visible to the owner and requester.",
    ],
  },
  {
    id: "location-information",
    number: "05",
    title: "Pickup and Location Information",
    icon: <FiMapPin />,
    iconStyle:
      "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400",
    paragraphs: [
      "ShareBite may display the pickup location entered by a food owner so that interested users can understand where collection will take place.",
      "Users should provide only the location information required for pickup. A precise private residential address should not be placed publicly unless the user considers it safe and necessary.",
    ],
  },
  {
    id: "food-images",
    number: "06",
    title: "Food and Profile Images",
    icon: <FiImage />,
    iconStyle:
      "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950/60 dark:text-fuchsia-400",
    paragraphs: [
      "Users may upload food images and profile images. These images may be stored using an image-hosting or storage service and displayed through the ShareBite website.",
      "Users should only upload images they have permission to use. Images should not contain unnecessary personal documents, private information or identifiable people without permission.",
    ],
  },
  {
    id: "authentication",
    number: "07",
    title: "Authentication, Cookies and Sessions",
    icon: <FiKey />,
    iconStyle:
      "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400",
    paragraphs: [
      "ShareBite may use authentication cookies, tokens or session information to keep users signed in and protect restricted pages.",
      "These technologies support essential website functionality and account security.",
    ],
    points: [
      "Keep a user signed in during an active session.",
      "Protect pages available only to registered users.",
      "Verify requests made to protected backend endpoints.",
      "Prevent unauthorised access to account-specific features.",
      "Remember necessary website preferences where applicable.",
    ],
  },
  {
    id: "sharing-information",
    number: "08",
    title: "When Information May Be Shared",
    icon: <FiUsers />,
    iconStyle:
      "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-400",
    paragraphs: [
      "ShareBite does not intend to sell users' personal information.",
      "Information may be shared only where necessary to provide website features, protect users, comply with legal obligations or operate the platform through trusted services.",
    ],
    points: [
      "With relevant food owners and requesters for food-sharing coordination.",
      "With authentication, hosting, database or image-storage providers.",
      "When required by applicable law or a valid legal request.",
      "When reasonably necessary to investigate misuse, fraud or safety concerns.",
      "During a future organisational change with appropriate privacy safeguards.",
    ],
  },
  {
    id: "storage-security",
    number: "09",
    title: "Data Storage and Security",
    icon: <FiShield />,
    iconStyle:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400",
    paragraphs: [
      "ShareBite uses reasonable technical measures such as authenticated access, protected routes and database controls to reduce unauthorised access.",
      "No website or online storage system can guarantee complete security. Users are responsible for protecting their login information and should never share passwords, verification codes or authentication tokens.",
    ],
  },
  {
    id: "retention",
    number: "10",
    title: "How Long Information May Be Kept",
    icon: <FiClock />,
    iconStyle:
      "bg-teal-100 text-teal-700 dark:bg-teal-950/60 dark:text-teal-400",
    paragraphs: [
      "Information may be kept while a user account remains active or while it is needed to operate food posts, requests, account features and platform security.",
      "Some limited records may remain after content or an account is removed where they are needed for security, dispute resolution, legal compliance or system administration.",
    ],
  },
  {
    id: "user-rights",
    number: "11",
    title: "User Rights and Choices",
    icon: <FiCheckCircle />,
    iconStyle:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400",
    paragraphs: [
      "Depending on available ShareBite features and applicable law, users may have choices concerning their account and personal information.",
    ],
    points: [
      "Review and update available profile information.",
      "Manage food posts created through their own account.",
      "Request correction of inaccurate account information.",
      "Request information about how their data is used.",
      "Request deletion of an account or related information when deletion support becomes available.",
      "Withdraw optional consent where consent is used.",
    ],
  },
  {
    id: "account-deletion",
    number: "12",
    title: "Account and Data Deletion",
    icon: <FiTrash2 />,
    iconStyle:
      "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400",
    paragraphs: [
      "Automated account deletion and complete privacy-request processing are planned for a future version of ShareBite.",
      "When these features are implemented, users may need to verify their identity before account or data deletion to prevent unauthorised requests.",
    ],
  },
  {
    id: "contact-form",
    number: "13",
    title: "Contact Form Information",
    icon: <FiMail />,
    iconStyle:
      "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400",
    paragraphs: [
      "The current ShareBite Contact page is a static interface. Information entered into the form is not currently sent to the backend or stored in the database.",
      "When contact-form backend functionality is introduced, this Privacy Policy should be updated to explain what message information is collected, where it is stored and how long it is retained.",
    ],
  },
  {
    id: "children",
    number: "14",
    title: "Children's Privacy",
    icon: <FiShield />,
    iconStyle:
      "bg-pink-100 text-pink-700 dark:bg-pink-950/60 dark:text-pink-400",
    paragraphs: [
      "ShareBite is intended for users who can responsibly manage an account, publish food information and arrange food collection.",
      "Children should not independently provide personal information or arrange food pickup without appropriate parent or guardian supervision.",
    ],
  },
  {
    id: "third-party-services",
    number: "15",
    title: "Third-Party Services",
    icon: <FiServer />,
    iconStyle:
      "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400",
    paragraphs: [
      "ShareBite may use third-party providers for authentication, website hosting, database services, image storage or other technical functions.",
      "These providers may process limited information according to their own privacy policies and service terms.",
      "External social-media links are controlled by their respective platforms, and ShareBite is not responsible for their privacy practices.",
    ],
  },
  {
    id: "policy-updates",
    number: "16",
    title: "Changes to This Privacy Policy",
    icon: <FiRefreshCw />,
    iconStyle:
      "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400",
    paragraphs: [
      "This Privacy Policy may be updated when ShareBite introduces new features, changes its backend services or modifies the way information is handled.",
      "The revised policy should be published on this page together with an updated effective date.",
    ],
  },
  {
    id: "privacy-contact",
    number: "17",
    title: "Privacy Questions",
    icon: <FiHelpCircle />,
    iconStyle:
      "bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-400",
    paragraphs: [
      "Users may visit the ShareBite Contact page for general questions about this Privacy Policy or the future handling of account information.",
      "Because the Contact form is currently static, direct privacy-request processing is not yet available through the website.",
    ],
  },
];

/* =========================================================
   Privacy Policy page
========================================================= */

const PrivacyPolicyPage = () => {
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
          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-emerald-800 shadow-sm backdrop-blur-md dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
              <HiOutlineSparkles className="text-lg" />
              ShareBite Privacy Policy
            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
              Protecting Your Information and{" "}
              <span className="bg-linear-to-r from-emerald-700 via-green-600 to-lime-600 bg-clip-text text-transparent dark:from-emerald-300 dark:via-green-400 dark:to-lime-300">
                Community Trust
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm font-medium leading-8 text-slate-600 dark:text-zinc-300 sm:text-base lg:mx-0">
              This policy explains how ShareBite may process account,
              profile, food-post, food-request and technical
              information while providing its community food-sharing
              features.
            </p>

            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-8 text-slate-600 dark:text-zinc-400 sm:text-base lg:mx-0">
              We aim to use only the information needed to operate the
              platform, connect food sharers with requesters and
              maintain a safe community experience.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-2 text-xs font-bold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400">
                <FiShield />
                Privacy-focused
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/80 px-3 py-2 text-xs font-bold text-sky-700 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-400">
                <FiLock />
                Protected access
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50/80 px-3 py-2 text-xs font-bold text-violet-700 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-400">
                <FiEye />
                Clear information
              </span>
            </div>

            <p className="mt-6 text-xs font-semibold text-slate-500 dark:text-zinc-500">
              Last updated:{" "}
              <time dateTime="2026-07-15">July 15, 2026</time>
            </p>
          </div>

          {/* Right visual */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="pointer-events-none absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/10" />

            <div className="relative overflow-hidden rounded-[34px] border border-emerald-200 bg-linear-to-br from-emerald-50 via-white to-sky-50/80 p-7 shadow-[0_35px_90px_-42px_rgba(16,185,129,0.55)] dark:border-emerald-900/70 dark:from-emerald-950/35 dark:via-zinc-900 dark:to-sky-950/20 sm:p-9">
              <div className="mx-auto flex size-24 items-center justify-center rounded-[28px] bg-linear-to-br from-emerald-700 via-green-600 to-lime-500 text-5xl text-white shadow-xl shadow-emerald-600/25 dark:from-emerald-500 dark:via-green-500 dark:to-lime-400 dark:text-emerald-950">
                <MdOutlinePrivacyTip />
              </div>

              <h2 className="mt-6 text-center text-2xl font-black text-slate-950 dark:text-white sm:text-3xl">
                Privacy at ShareBite
              </h2>

              <p className="mx-auto mt-3 max-w-md text-center text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400">
                Information should be collected responsibly, used for
                valid platform purposes and protected from
                unauthorised access.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4 rounded-2xl border border-emerald-200 bg-white/70 p-4 dark:border-emerald-900/70 dark:bg-emerald-950/20">
                  <FiCheckCircle className="shrink-0 text-2xl text-emerald-600 dark:text-emerald-400" />

                  <p className="text-sm font-bold text-slate-700 dark:text-zinc-300">
                    Clear purpose for collected information
                  </p>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-sky-200 bg-white/70 p-4 dark:border-sky-900/70 dark:bg-sky-950/20">
                  <FiLock className="shrink-0 text-2xl text-sky-600 dark:text-sky-400" />

                  <p className="text-sm font-bold text-slate-700 dark:text-zinc-300">
                    Protected account and session access
                  </p>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-violet-200 bg-white/70 p-4 dark:border-violet-900/70 dark:bg-violet-950/20">
                  <FiUserCheck className="shrink-0 text-2xl text-violet-600 dark:text-violet-400" />

                  <p className="text-sm font-bold text-slate-700 dark:text-zinc-300">
                    Responsible management of user information
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          Development notice
      ====================================================== */}

      <section className="py-10">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 rounded-[24px] border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/60 dark:bg-amber-950/20 sm:flex-row sm:items-start sm:p-6">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-xl text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
              <FiAlertCircle />
            </div>

            <div>
              <h2 className="text-base font-black text-amber-950 dark:text-amber-300">
                Development-Stage Privacy Notice
              </h2>

              <p className="mt-2 text-sm font-medium leading-7 text-amber-900/80 dark:text-amber-200/80">
                ShareBite is currently under development. The Contact
                form is static and does not currently send or store
                messages. Automated account deletion, advanced privacy
                controls and direct privacy-request processing may be
                implemented in future versions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          Privacy summary
      ====================================================== */}

      <section className="pb-20 pt-10 sm:pb-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-400">
              Our Privacy Approach
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              How ShareBite Approaches Privacy
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400 sm:text-base">
              Our privacy approach is based on transparency, secure
              access, responsible use and appropriate user control.
            </p>
          </div>

          <div className="mt-11 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {PRIVACY_SUMMARY.map((item) => (
              <article
                key={item.id}
                className="group flex min-h-[245px] flex-col items-center rounded-[28px] border border-slate-200 bg-white p-6 text-center shadow-[0_20px_55px_-38px_rgba(15,23,42,0.35)] transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-[0_28px_65px_-34px_rgba(16,185,129,0.30)] dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-emerald-900"
              >
                <div
                  className={`flex size-14 items-center justify-center rounded-2xl text-2xl transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110 ${item.iconStyle}`}
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
        </div>
      </section>

      {/* =====================================================
          Information categories
      ====================================================== */}

      <section className="bg-slate-50 py-20 dark:bg-[#080a09] sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-sky-800 shadow-sm dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-300">
              <FiDatabase />
              Information Categories
            </div>

            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Information ShareBite May Process
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400 sm:text-base">
              Different information is needed for accounts, food
              posts, food requests and website security.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {INFORMATION_CATEGORIES.map((item) => (
              <article
                key={item.id}
                className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_22px_60px_-42px_rgba(15,23,42,0.40)] transition-all duration-500 hover:-translate-y-1.5 hover:border-emerald-300 dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-emerald-900 sm:p-8"
              >
                <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
                  <div
                    className={`flex size-14 shrink-0 items-center justify-center rounded-2xl text-2xl ${item.iconStyle}`}
                  >
                    {item.icon}
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-slate-950 dark:text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {item.examples.map((example) => (
                    <div
                      key={example}
                      className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5 dark:border-zinc-800 dark:bg-zinc-950/70"
                    >
                      <FiCheckCircle className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />

                      <p className="text-xs font-bold leading-5 text-slate-600 dark:text-zinc-400">
                        {example}
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
          Full privacy policy
      ====================================================== */}

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid w-full max-w-7xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[0.29fr_0.71fr] lg:px-8">
          {/* Table of contents */}
          <aside className="lg:sticky lg:top-24">
            <div className="rounded-[26px] border border-slate-200 bg-slate-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/70 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-100 text-xl text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                  <FiFileText />
                </div>

                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400">
                    ShareBite Policy
                  </p>

                  <h2 className="mt-1 text-lg font-black text-slate-950 dark:text-white">
                    Page Contents
                  </h2>
                </div>
              </div>

              <nav
                aria-label="Privacy policy table of contents"
                className="mt-6"
              >
                <ul className="space-y-2">
                  {POLICY_SECTIONS.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-600 transition-all hover:bg-white hover:text-emerald-700 hover:shadow-sm dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-emerald-400"
                      >
                        <span className="font-black text-emerald-600 dark:text-emerald-400">
                          {section.number}
                        </span>

                        <span>{section.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-6 border-t border-slate-200 pt-5 dark:border-zinc-800">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 text-sm font-extrabold text-emerald-700 transition-colors hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  Privacy Questions

                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Policy content */}
          <div className="space-y-6">
            {POLICY_SECTIONS.map((section) => (
              <article
                id={section.id}
                key={section.id}
                className="scroll-mt-28 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_55px_-42px_rgba(15,23,42,0.35)] dark:border-zinc-800 dark:bg-zinc-900/70 sm:p-8"
              >
                <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
                  <div
                    className={`flex size-12 shrink-0 items-center justify-center rounded-2xl text-xl ${section.iconStyle}`}
                  >
                    {section.icon}
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400">
                      Section {section.number}
                    </p>

                    <h2 className="mt-1 text-xl font-black text-slate-950 dark:text-white sm:text-2xl">
                      {section.title}
                    </h2>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-sm font-medium leading-8 text-slate-600 dark:text-zinc-400 sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.points && (
                  <div className="mt-6 space-y-3">
                    {section.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/65"
                      >
                        <FiCheckCircle className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />

                        <p className="text-sm font-semibold leading-6 text-slate-600 dark:text-zinc-400">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          User responsibility section
      ====================================================== */}

      <section className="bg-slate-50 py-20 dark:bg-[#080a09] sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-violet-800 shadow-sm dark:border-violet-900 dark:bg-violet-950/30 dark:text-violet-300">
              <FiUserCheck />
              User Responsibilities
            </div>

            <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Help Protect Your Information
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400 sm:text-base">
              Account security and community privacy also depend on
              responsible user behaviour.
            </p>
          </div>

          <div className="mx-auto mt-11 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
            <article className="flex items-start gap-4 rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-xl text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                <FiKey />
              </div>

              <div>
                <h3 className="text-base font-black text-slate-950 dark:text-white">
                  Keep Login Details Private
                </h3>

                <p className="mt-2 text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400">
                  Never share passwords, verification codes, login
                  links or authentication tokens.
                </p>
              </div>
            </article>

            <article className="flex items-start gap-4 rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-xl text-sky-700 dark:bg-sky-950/60 dark:text-sky-400">
                <FiEye />
              </div>

              <div>
                <h3 className="text-base font-black text-slate-950 dark:text-white">
                  Avoid Sensitive Public Details
                </h3>

                <p className="mt-2 text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400">
                  Do not include passwords, financial details or
                  unnecessary private information in food posts.
                </p>
              </div>
            </article>

            <article className="flex items-start gap-4 rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-xl text-violet-700 dark:bg-violet-950/60 dark:text-violet-400">
                <FiCheckCircle />
              </div>

              <div>
                <h3 className="text-base font-black text-slate-950 dark:text-white">
                  Provide Accurate Information
                </h3>

                <p className="mt-2 text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400">
                  Use accurate profile, food, expiry and pickup
                  information when using ShareBite.
                </p>
              </div>
            </article>

            <article className="flex items-start gap-4 rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-xl text-rose-700 dark:bg-rose-950/60 dark:text-rose-400">
                <FiAlertCircle />
              </div>

              <div>
                <h3 className="text-base font-black text-slate-950 dark:text-white">
                  Report Suspicious Activity
                </h3>

                <p className="mt-2 text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400">
                  Report accounts, requests or food posts that appear
                  unsafe, fraudulent or misleading.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =====================================================
          Contact CTA
      ====================================================== */}

      <section className="py-20 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[36px] border border-emerald-200 bg-linear-to-br from-emerald-50 via-white to-sky-50/80 px-5 py-12 text-center shadow-[0_32px_85px_-42px_rgba(16,185,129,0.48)] dark:border-emerald-900/70 dark:from-emerald-950/35 dark:via-zinc-900 dark:to-sky-950/20 sm:px-8 lg:px-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(16,185,129,0.14),transparent_30%),radial-gradient(circle_at_90%_85%,rgba(14,165,233,0.10),transparent_30%)] dark:bg-[radial-gradient(circle_at_10%_20%,rgba(16,185,129,0.07),transparent_30%),radial-gradient(circle_at_90%_85%,rgba(14,165,233,0.05),transparent_30%)]" />

            <div className="relative mx-auto max-w-3xl">
              <div className="mx-auto flex size-16 items-center justify-center rounded-[20px] bg-linear-to-br from-emerald-700 via-green-600 to-lime-500 text-3xl text-white shadow-lg">
                <MdFoodBank />
              </div>

              <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                Have a Privacy Question?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600 dark:text-zinc-300 sm:text-base">
                Read our Support Centre or visit the Contact page for
                general privacy and account-information questions.
              </p>

              <p className="mx-auto mt-3 max-w-2xl text-xs font-semibold leading-6 text-slate-500 dark:text-zinc-500">
                The current Contact form is static. Direct privacy
                request submission will become available after backend
                implementation.
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
                  href="/support"
                  className="group inline-flex h-[54px] w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white/80 px-7 text-sm font-extrabold text-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:text-emerald-700 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900/75 dark:text-white dark:hover:border-emerald-800 dark:hover:text-emerald-400 sm:w-auto"
                >
                  Visit Support Centre

                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/about-us"
                  className="group inline-flex h-[54px] w-full items-center justify-center gap-3 rounded-xl border border-sky-300 bg-sky-50/80 px-7 text-sm font-extrabold text-sky-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-400 hover:bg-sky-100 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-400 dark:hover:border-sky-800 dark:hover:bg-sky-950/50 sm:w-auto"
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

export default PrivacyPolicyPage;