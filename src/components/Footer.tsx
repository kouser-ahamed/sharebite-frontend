"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  FiArrowRight,
  FiArrowUp,
  FiChevronRight,
  FiHeart,
  FiInfo,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiShield,
  FiUsers,
} from "react-icons/fi";

import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa6";

import { MdFoodBank } from "react-icons/md";

/* =========================================================
   Footer navigation
========================================================= */

const QUICK_LINKS = [
  {
    id: 1,
    label: "Home",
    href: "/",
  },
  {
    id: 2,
    label: "Available Foods",
    href: "/all-foods",
  },
  {
    id: 3,
    label: "Urgent Food Pickup",
    href: "/#expiring-soon",
  },
  {
    id: 4,
    label: "Volunteer With Us",
    href: "/#volunteer",
  },
];

const INFORMATION_LINKS = [
  {
    id: 1,
    label: "About Us",
    href: "/about-us",
  },
  {
    id: 2,
    label: "Contact",
    href: "/contact",
  },
  {
    id: 3,
    label: "Support",
    href: "/support",
  },
  {
    id: 4,
    label: "Privacy Policy",
    href: "/privacy-policy",
  },
];

const SUPPORT_LINKS = [
  {
    id: 1,
    label: "Frequently Asked Questions",
    href: "/#faq",
  },
  {
    id: 2,
    label: "Help & Support Centre",
    href: "/support",
  },
  {
    id: 3,
    label: "Contact ShareBite",
    href: "/contact",
  },
];

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
   Footer component
========================================================= */

const Footer = () => {
  const [showScrollButton, setShowScrollButton] =
    useState(false);

  const currentYear = new Date().getFullYear();

  /* =======================================================
     Show scroll-to-top button
  ======================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 450);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, []);

  /* =======================================================
     Smooth scroll to top
  ======================================================= */

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* =====================================================
          Hide right browser scrollbar
          Page scrolling will continue normally
      ====================================================== */}

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        html::-webkit-scrollbar,
        body::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }

        body {
          max-width: 100%;
          overflow-x: hidden;
        }
      `}</style>

      <footer className="relative overflow-x-clip border-t border-slate-200 bg-white dark:border-zinc-800 dark:bg-[#050706]">
        {/* Soft background decoration */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_18%,rgba(16,185,129,0.11),transparent_28%),radial-gradient(circle_at_92%_82%,rgba(14,165,233,0.08),transparent_30%),radial-gradient(circle_at_50%_40%,rgba(132,204,22,0.04),transparent_35%)] dark:bg-[radial-gradient(circle_at_8%_18%,rgba(16,185,129,0.06),transparent_28%),radial-gradient(circle_at_92%_82%,rgba(14,165,233,0.04),transparent_30%),radial-gradient(circle_at_50%_40%,rgba(132,204,22,0.025),transparent_35%)]" />

        <div className="pointer-events-none absolute -left-32 top-16 size-96 rounded-full bg-emerald-300/10 blur-3xl dark:bg-emerald-500/5" />

        <div className="pointer-events-none absolute -right-32 bottom-10 size-96 rounded-full bg-sky-300/10 blur-3xl dark:bg-sky-500/5" />

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-7 pt-16 sm:px-6 sm:pt-20 lg:px-8">
          {/* =====================================================
              Main footer grid
          ====================================================== */}

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.8fr_0.9fr] lg:gap-10 xl:grid-cols-[1.35fr_1.05fr_0.8fr_1fr] xl:gap-12">
            {/* =================================================
                Brand and social information
            ================================================== */}

            <div className="text-center sm:text-left">
              <Link
                href="/"
                aria-label="ShareBite home"
                className="inline-flex items-center gap-3"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-700 via-green-600 to-lime-500 text-2xl text-white shadow-lg shadow-emerald-600/20 dark:from-emerald-500 dark:via-green-500 dark:to-lime-400 dark:text-emerald-950">
                  <MdFoodBank />
                </div>

                <div className="text-left">
                  <p className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                    Share
                    <span className="text-emerald-600 dark:text-emerald-400">
                      Bite
                    </span>
                  </p>

                  <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-400 dark:text-zinc-500">
                    Share Food, Share Care
                  </p>
                </div>
              </Link>

              <p className="mx-auto mt-5 max-w-sm text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400 sm:mx-0">
                ShareBite is a community food-sharing platform
                that connects people who have safe surplus food
                with people who can use it. Our goal is to reduce
                food waste and encourage responsible sharing.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2.5 sm:justify-start">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-2 text-xs font-bold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400">
                  <FiHeart />
                  Community Care
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/80 px-3 py-2 text-xs font-bold text-sky-700 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-400">
                  <FiShield />
                  Safe Sharing
                </span>
              </div>

              {/* Social links */}
              <div className="mt-7">
                <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-slate-400 dark:text-zinc-500">
                  Connect with the developer
                </p>

                <div className="mt-3 flex items-center justify-center gap-3 sm:justify-start">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      title={social.label}
                      className={`flex size-11 items-center justify-center rounded-xl border border-slate-300 bg-transparent text-lg text-slate-600 transition-all duration-300 hover:-translate-y-1 dark:border-zinc-700 dark:text-zinc-400 ${social.className}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* =================================================
                About ShareBite
            ================================================== */}

            <div className="text-center sm:text-left">
              <div className="flex justify-center sm:justify-start">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-100 text-xl text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                  <FiInfo />
                </div>
              </div>

              <h3 className="mt-4 text-base font-black text-slate-950 dark:text-white">
                About ShareBite
              </h3>

              <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-linear-to-r from-emerald-600 to-lime-400 sm:mx-0" />

              <p className="mt-5 text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400">
                ShareBite helps users post available food, send
                food requests and coordinate collection with one
                another. The platform promotes safe, free and
                responsible food sharing.
              </p>

              <div className="mt-5 space-y-3">
                <div className="flex items-start justify-center gap-3 text-left sm:justify-start">
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-sm text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                    <FiUsers />
                  </div>

                  <p className="text-xs font-medium leading-5 text-slate-500 dark:text-zinc-400">
                    Connect local food sharers and requesters.
                  </p>
                </div>

                <div className="flex items-start justify-center gap-3 text-left sm:justify-start">
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sm text-sky-700 dark:bg-sky-950/50 dark:text-sky-400">
                    <FiShield />
                  </div>

                  <p className="text-xs font-medium leading-5 text-slate-500 dark:text-zinc-400">
                    Encourage accurate food and pickup information.
                  </p>
                </div>

                <div className="flex items-start justify-center gap-3 text-left sm:justify-start">
                  <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-sm text-rose-700 dark:bg-rose-950/50 dark:text-rose-400">
                    <FiHeart />
                  </div>

                  <p className="text-xs font-medium leading-5 text-slate-500 dark:text-zinc-400">
                    Reduce waste through community participation.
                  </p>
                </div>
              </div>

              <Link
                href="/about-us"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-emerald-700 transition-colors hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                Learn More About Us

                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* =================================================
                Quick links
            ================================================== */}

            <div className="text-center sm:text-left">
              <h3 className="text-base font-black text-slate-950 dark:text-white">
                Quick Links
              </h3>

              <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-linear-to-r from-emerald-600 to-lime-400 sm:mx-0" />

              <nav
                aria-label="Footer quick links"
                className="mt-6"
              >
                <ul className="space-y-4">
                  {QUICK_LINKS.map((link) => (
                    <li key={link.id}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-400"
                      >
                        <FiChevronRight className="shrink-0 text-emerald-500 transition-transform duration-300 group-hover:translate-x-1" />

                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* =================================================
                Help and support
            ================================================== */}

            <div className="space-y-6">
              <div className="text-center sm:text-left">
                <h3 className="text-base font-black text-slate-950 dark:text-white">
                  Help & Support
                </h3>

                <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-linear-to-r from-sky-600 to-cyan-400 sm:mx-0" />

                <nav
                  aria-label="Footer support links"
                  className="mt-6"
                >
                  <ul className="space-y-4">
                    {SUPPORT_LINKS.map((link) => (
                      <li key={link.id}>
                        <Link
                          href={link.href}
                          className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-sky-700 dark:text-zinc-400 dark:hover:text-sky-400"
                        >
                          <FiChevronRight className="shrink-0 text-sky-500 transition-transform duration-300 group-hover:translate-x-1" />

                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Contact information without background box */}
              <div className="border-t border-slate-200 pt-6 text-center dark:border-zinc-800 sm:text-left">
                <div className="flex justify-center sm:justify-start">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-100 text-lg text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                    <FiMessageCircle />
                  </div>
                </div>

                <h3 className="mt-4 text-base font-black text-slate-950 dark:text-white">
                  Contact ShareBite
                </h3>

                <p className="mt-2 text-xs font-medium leading-5 text-slate-600 dark:text-zinc-400">
                  Get help with food posts, requests,
                  volunteering or platform support.
                </p>

                <div className="mt-4 flex items-start justify-center gap-2 text-left sm:justify-start">
                  <FiMapPin className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />

                  <p className="text-xs font-semibold leading-5 text-slate-500 dark:text-zinc-400">
                    Support is available through our Contact page.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="group mt-5 inline-flex items-center justify-center gap-2 text-sm font-extrabold text-emerald-700 transition-colors hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  <FiMail />

                  Contact Us

                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* =====================================================
              Footer information links
          ====================================================== */}

          <div className="mt-14 border-t border-slate-200 pt-7 dark:border-zinc-800">
            <nav
              aria-label="Footer information and policy links"
              className="mb-6"
            >
              <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3 sm:gap-x-3">
                {INFORMATION_LINKS.map((link, index) => (
                  <li
                    key={link.id}
                    className="flex items-center gap-2 sm:gap-3"
                  >
                    <Link
                      href={link.href}
                      className="text-xs font-bold text-slate-600 transition-colors hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-400 sm:text-sm"
                    >
                      {link.label}
                    </Link>

                    {index <
                      INFORMATION_LINKS.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="size-1 rounded-full bg-slate-300 dark:bg-zinc-700"
                      />
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Copyright and developer */}
            <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-6 text-center dark:border-zinc-800/80 sm:flex-row sm:text-left">
              <p className="text-xs font-medium leading-6 text-slate-500 dark:text-zinc-500">
                © {currentYear} ShareBite. All rights reserved.
              </p>

              <p className="flex flex-wrap items-center justify-center gap-1.5 text-xs font-medium text-slate-500 dark:text-zinc-500">
                Developed with

                <FiHeart className="text-rose-500" />

                by

                <a
                  href="https://www.linkedin.com/in/kouser-ahamed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-extrabold text-emerald-700 transition-colors hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                >
                  Kouser Ahamed
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* =====================================================
          Smooth scroll-to-top arrow
      ====================================================== */}

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Back to top"
        className={`fixed bottom-5 right-4 z-50 flex size-12 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-700 text-xl text-white shadow-[0_15px_35px_-12px_rgba(5,150,105,0.8)] transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-800 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-300/40 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400 sm:bottom-7 sm:right-7 ${
          showScrollButton
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-5 scale-75 opacity-0"
        }`}
      >
        <FiArrowUp />
      </button>
    </>
  );
};

export default Footer;