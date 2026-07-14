"use client";

import Image from "next/image";

import {
  FiHeart,
  FiLoader,
  FiUsers,
} from "react-icons/fi";

import { MdFoodBank } from "react-icons/md";

/* =========================================================
   Types
========================================================= */

type LoaderMode =
  | "page"
  | "section"
  | "inline"
  | "overlay";

type LoaderSize =
  | "sm"
  | "md"
  | "lg";

interface ShareBiteLoaderProps {
  message?: string;
  subMessage?: string;
  mode?: LoaderMode;
  size?: LoaderSize;
  showText?: boolean;
  className?: string;
}

/* =========================================================
   Style helpers
========================================================= */

const MODE_CLASSES: Record<
  LoaderMode,
  string
> = {
  page:
    "min-h-[calc(100vh-72px)] w-full",
  section:
    "min-h-[320px] w-full",
  inline:
    "w-full py-10",
  overlay:
    "absolute inset-0 z-50 min-h-full w-full bg-white/85 backdrop-blur-md dark:bg-[#050706]/85",
};

const SIZE_CLASSES: Record<
  LoaderSize,
  {
    container: string;
    outerRing: string;
    middleRing: string;
    logoBox: string;
    logo: number;
    foodIcon: string;
    heartIcon: string;
    usersIcon: string;
  }
> = {
  sm: {
    container: "size-24",
    outerRing: "inset-0",
    middleRing: "inset-2",
    logoBox: "size-14",
    logo: 50,
    foodIcon: "text-sm",
    heartIcon: "text-xs",
    usersIcon: "text-xs",
  },

  md: {
    container: "size-32",
    outerRing: "inset-0",
    middleRing: "inset-3",
    logoBox: "size-20",
    logo: 72,
    foodIcon: "text-base",
    heartIcon: "text-sm",
    usersIcon: "text-sm",
  },

  lg: {
    container: "size-40",
    outerRing: "inset-0",
    middleRing: "inset-4",
    logoBox: "size-24",
    logo: 88,
    foodIcon: "text-lg",
    heartIcon: "text-base",
    usersIcon: "text-base",
  },
};

/* =========================================================
   Loader component
========================================================= */

const ShareBiteLoader = ({
  message = "Loading ShareBite",
  subMessage = "Preparing fresh food-sharing information for you",
  mode = "section",
  size = "md",
  showText = true,
  className = "",
}: ShareBiteLoaderProps) => {
  const sizeStyles =
    SIZE_CLASSES[size];

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={message}
      className={`relative flex items-center justify-center overflow-hidden ${MODE_CLASSES[mode]} ${className}`}
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/10" />

      <div className="relative flex flex-col items-center justify-center px-4 text-center">
        {/* Main loader visual */}
        <div
          className={`relative flex items-center justify-center ${sizeStyles.container}`}
        >
          {/* Soft pulse */}
          <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400/10" />

          {/* Outer rotating ring */}
          <div
            className={`absolute ${sizeStyles.outerRing} animate-spin rounded-full border-[3px] border-transparent border-r-lime-400 border-t-emerald-600 shadow-[0_0_30px_rgba(16,185,129,0.18)] dark:border-r-lime-400 dark:border-t-emerald-400`}
          />

          {/* Opposite rotating ring */}
          <div
            className={`absolute ${sizeStyles.middleRing} animate-spin rounded-full border-2 border-transparent border-b-sky-400 border-l-green-400 [animation-direction:reverse] [animation-duration:1.8s] dark:border-b-sky-500 dark:border-l-green-500`}
          />

          {/* Orbit dots */}
          <span className="absolute left-1/2 top-0 size-2.5 -translate-x-1/2 rounded-full bg-lime-400 shadow-[0_0_12px_rgba(163,230,53,0.8)]" />

          <span className="absolute bottom-2 left-3 size-2 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.7)]" />

          <span className="absolute bottom-3 right-2 size-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.7)]" />

          {/* Floating food icon */}
          <div className="absolute -left-1 top-7 flex size-8 animate-bounce items-center justify-center rounded-xl border border-emerald-200 bg-white text-emerald-600 shadow-lg [animation-delay:-0.25s] dark:border-emerald-900 dark:bg-zinc-900 dark:text-emerald-400">
            <MdFoodBank
              className={
                sizeStyles.foodIcon
              }
            />
          </div>

          {/* Floating heart icon */}
          <div className="absolute -right-1 top-8 flex size-8 animate-bounce items-center justify-center rounded-xl border border-rose-200 bg-white text-rose-500 shadow-lg [animation-delay:-0.5s] dark:border-rose-900 dark:bg-zinc-900 dark:text-rose-400">
            <FiHeart
              className={
                sizeStyles.heartIcon
              }
            />
          </div>

          {/* Floating community icon */}
          <div className="absolute bottom-0 left-1/2 flex size-8 -translate-x-1/2 animate-bounce items-center justify-center rounded-xl border border-sky-200 bg-white text-sky-500 shadow-lg [animation-delay:-0.75s] dark:border-sky-900 dark:bg-zinc-900 dark:text-sky-400">
            <FiUsers
              className={
                sizeStyles.usersIcon
              }
            />
          </div>

          {/* Logo centre */}
          <div
            className={`relative flex items-center justify-center overflow-hidden rounded-full border-4 border-white bg-white shadow-[0_15px_45px_rgba(16,185,129,0.28)] dark:border-zinc-900 dark:bg-zinc-950 ${sizeStyles.logoBox}`}
          >
            <Image
              src="/assets/logo11.png"
              alt="ShareBite"
              width={sizeStyles.logo}
              height={sizeStyles.logo}
              priority
              className="h-full w-full rounded-full object-cover"
            />

            <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-emerald-500/20" />
          </div>
        </div>

        {/* Loader text */}
        {showText && (
          <div className="mt-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/90 px-4 py-2 shadow-sm backdrop-blur-md dark:border-emerald-900/70 dark:bg-emerald-950/30">
              <FiLoader className="animate-spin text-sm text-emerald-600 dark:text-emerald-400" />

              <span className="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
                Share Food, Share Care
              </span>
            </div>

            <h2 className="mt-4 text-xl font-black tracking-tight text-slate-950 dark:text-white sm:text-2xl">
              {message}
              <span className="text-emerald-600 dark:text-emerald-400">
                ...
              </span>
            </h2>

            <p className="mx-auto mt-2 max-w-md text-xs font-medium leading-6 text-slate-500 dark:text-zinc-400 sm:text-sm">
              {subMessage}
            </p>

            {/* Loading dots */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="size-2 animate-bounce rounded-full bg-emerald-600 [animation-delay:-0.3s] dark:bg-emerald-400" />

              <span className="size-2 animate-bounce rounded-full bg-green-500 [animation-delay:-0.15s] dark:bg-green-400" />

              <span className="size-2 animate-bounce rounded-full bg-lime-500 dark:bg-lime-400" />
            </div>
          </div>
        )}

        <span className="sr-only">
          {message}
        </span>
      </div>
    </div>
  );
};

export default ShareBiteLoader;