"use client";

import Image from "next/image";
import Link from "next/link";

import {
  LuArrowLeft,
  LuHouse,
  LuSearch,
} from "react-icons/lu";

const NotFoundPage = () => {
  return (
    <main className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#F8FAF6] px-4 py-10 transition-colors duration-300 dark:bg-black sm:px-6">
      {/* Soft background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.035)_1px,transparent_1px)] bg-[size:42px_42px] dark:bg-[linear-gradient(rgba(16,185,129,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.018)_1px,transparent_1px)]" />

      <div className="pointer-events-none absolute -left-24 top-10 size-80 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/10" />

      <div className="pointer-events-none absolute -right-24 bottom-10 size-80 rounded-full bg-lime-300/20 blur-3xl dark:bg-lime-500/10" />

      <section className="relative z-10 w-full max-w-3xl rounded-[2rem] border border-white/80 bg-white/85 px-6 py-10 text-center shadow-[0_30px_80px_-35px_rgba(5,150,105,0.4)] backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/85 sm:px-10 sm:py-12">
        <div className="mx-auto flex size-24 items-center justify-center rounded-full border-[8px] border-emerald-100 bg-linear-to-br from-emerald-700 via-green-600 to-lime-500 shadow-lg dark:border-emerald-950 dark:from-emerald-500 dark:via-green-500 dark:to-lime-400">
          <Image
            src="/assets/logo11.png"
            alt="ShareBite logo"
            width={62}
            height={62}
            priority
            className="rounded-full object-cover"
          />
        </div>

        <p className="mt-6 bg-linear-to-r from-emerald-700 via-green-600 to-lime-500 bg-clip-text text-7xl font-black tracking-tight text-transparent dark:from-emerald-400 dark:via-green-400 dark:to-lime-300 sm:text-8xl">
          404
        </p>

        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Page Not Found
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base font-medium leading-7 text-slate-600 dark:text-zinc-400">
          The page may have been moved, removed, or the address may be incorrect.
          Let&apos;s take you back to ShareBite.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-700 via-green-600 to-lime-500 px-6 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:from-emerald-500 dark:via-green-500 dark:to-lime-400 dark:text-black"
          >
            <LuHouse className="text-lg" />
            Back to Home
          </Link>

          <Link
            href="/all-foods"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-sm font-bold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500 hover:text-emerald-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
          >
            <LuSearch className="text-lg" />
            Explore Foods
          </Link>
        </div>

        <Link
          href="/"
          className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-emerald-700 dark:text-zinc-500 dark:hover:text-emerald-400"
        >
          <LuArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
          Return to homepage
        </Link>
      </section>
    </main>
  );
};

export default NotFoundPage;