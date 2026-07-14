"use client";

import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import {
  FiAlertCircle,
  FiArrowRight,
  FiLoader,
  FiRefreshCw,
} from "react-icons/fi";
import { MdFoodBank } from "react-icons/md";

import FoodCard from "../all-foods/FoodCard";
import FoodCardSkeleton from "../all-foods/FoodCardSkeleton";

import type { Food } from "@/types/food";

/* =========================================================
   API response type
========================================================= */

interface LatestFoodsApiResponse {
  success: boolean;
  message: string;
  data: Food[];
  totalItems: number;
  error?: string;
}

/* =========================================================
   Server URL helper
========================================================= */

const getServerUrl = (): string => {
  const rawServerUrl =
    process.env.NEXT_PUBLIC_SERVER_URL;

  if (!rawServerUrl) {
    throw new Error(
      "NEXT_PUBLIC_SERVER_URL is not configured in .env.local",
    );
  }

  return rawServerUrl.replace(
    /\/+$/,
    "",
  );
};

/* =========================================================
   Latest foods section
========================================================= */

const LatestFoodsSection = () => {
  const [foods, setFoods] =
    useState<Food[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [refreshKey, setRefreshKey] =
    useState(0);

  const loadLatestFoods =
    useCallback(
      async (
        signal: AbortSignal,
      ) => {
        setIsLoading(true);
        setErrorMessage("");

        try {
          const serverUrl =
            getServerUrl();

          const response =
            await fetch(
              `${serverUrl}/api/foods/latest`,
              {
                method: "GET",

                headers: {
                  Accept:
                    "application/json",
                },

                cache: "no-store",

                signal,
              },
            );

          const responseText =
            await response.text();

          let parsedResponse:
            | LatestFoodsApiResponse
            | null = null;

          try {
            parsedResponse =
              responseText
                ? (JSON.parse(
                    responseText,
                  ) as LatestFoodsApiResponse)
                : null;
          } catch {
            throw new Error(
              "The backend returned an invalid response",
            );
          }

          if (
            !response.ok ||
            !parsedResponse?.success
          ) {
            throw new Error(
              parsedResponse?.message ||
                "Failed to load latest foods",
            );
          }

          setFoods(
            Array.isArray(
              parsedResponse.data,
            )
              ? parsedResponse.data.slice(
                  0,
                  4,
                )
              : [],
          );
        } catch (error) {
          if (
            error instanceof
              DOMException &&
            error.name ===
              "AbortError"
          ) {
            return;
          }

          console.error(
            "Latest foods error:",
            error,
          );

          setFoods([]);

          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Something went wrong while loading the latest foods",
          );
        } finally {
          if (!signal.aborted) {
            setIsLoading(false);
          }
        }
      },
      [],
    );

  useEffect(() => {
    const controller =
      new AbortController();

    void loadLatestFoods(
      controller.signal,
    );

    return () => {
      controller.abort();
    };
  }, [
    loadLatestFoods,
    refreshKey,
  ]);

  return (
    <section
      id="latest-foods"
      className="relative -mt-px overflow-hidden bg-[#F5FAF5] pb-16 pt-24 dark:bg-[#06100B] sm:pb-20 sm:pt-28"
    >
      {/* =====================================================
          Matching wave from Hero section
      ====================================================== */}

      <div className="pointer-events-none absolute -top-px left-0 right-0 z-10 overflow-hidden">
        <svg
          viewBox="0 0 1440 115"
          preserveAspectRatio="none"
          className="h-[88px] w-full sm:h-[105px]"
        >
          <path
            d="M0,0 L1440,0 L1440,22 C1220,65 1030,60 760,30 C520,5 260,80 0,48 Z"
            className="fill-white dark:fill-zinc-950"
          />

          <path
            d="M0,48 C260,80 520,5 760,30 C1030,60 1220,65 1440,22 L1440,52 C1210,90 1020,84 755,56 C500,28 270,100 0,72 Z"
            className="fill-emerald-100/70 dark:fill-emerald-950/40"
          />

          <path
            d="M0,48 C260,80 520,5 760,30 C1030,60 1220,65 1440,22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-emerald-300/70 dark:text-emerald-800/60"
          />
        </svg>
      </div>

      {/* Premium main background */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-[#F8FAF5] via-[#EEF8F0] to-[#F8F6EC] dark:from-[#06100B] dark:via-[#07150E] dark:to-black" />

      {/* Radial background glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(132,204,22,0.10),transparent_32%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.13),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(132,204,22,0.06),transparent_32%)]" />

      {/* Subtle grid pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.035)_1px,transparent_1px)] bg-[size:48px_48px] opacity-50 dark:opacity-15" />

      {/* Decorative glows */}
      <div className="pointer-events-none absolute -left-28 top-24 size-80 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/10" />

      <div className="pointer-events-none absolute -right-24 bottom-0 size-80 rounded-full bg-lime-300/20 blur-3xl dark:bg-lime-500/5" />

      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
        {/* Section heading */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/85 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-emerald-800 shadow-sm backdrop-blur-md dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-300">
            <MdFoodBank className="text-base" />

            Recently Shared
          </div>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            Freshly Shared{" "}
            <span className="text-emerald-700 dark:text-emerald-400">
              Foods
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-6 text-slate-700 dark:text-zinc-300 sm:text-base">
            Discover fresh surplus food
            recently shared by families,
            restaurants, events, and
            community members. Send a
            request before the food is no
            longer available.
          </p>
        </div>

        {/* Error state */}
        {errorMessage &&
          !isLoading && (
            <div className="mb-8 rounded-2xl border border-rose-200 bg-white/85 px-5 py-8 text-center shadow-sm backdrop-blur-md dark:border-rose-900/60 dark:bg-rose-950/20">
              <FiAlertCircle className="mx-auto text-4xl text-rose-500" />

              <h3 className="mt-3 text-lg font-bold text-rose-700 dark:text-rose-400">
                Unable to load latest
                foods
              </h3>

              <p className="mx-auto mt-1 max-w-lg text-sm text-rose-600 dark:text-rose-300">
                {errorMessage}
              </p>

              <button
                type="button"
                onClick={() =>
                  setRefreshKey(
                    (
                      currentKey,
                    ) =>
                      currentKey +
                      1,
                  )
                }
                className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 text-sm font-bold text-white transition hover:bg-rose-700"
              >
                <FiRefreshCw />

                Try Again
              </button>
            </div>
          )}

        {/* Loading state */}
        {isLoading && (
          <div>
            {/* Main loader */}
            <div className="mb-8 flex flex-col items-center justify-center">
              <div className="relative flex size-16 items-center justify-center">
                <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400/20" />

                <div className="relative flex size-14 items-center justify-center rounded-full border border-emerald-200 bg-white/90 shadow-lg shadow-emerald-500/10 backdrop-blur-md dark:border-emerald-800/60 dark:bg-emerald-950/60">
                  <FiLoader className="animate-spin text-2xl text-emerald-700 dark:text-emerald-400" />
                </div>
              </div>

              <p className="mt-4 text-sm font-bold text-emerald-800 dark:text-emerald-300">
                Loading latest foods...
              </p>

              <p className="mt-1 text-xs font-medium text-slate-500 dark:text-zinc-500">
                Please wait while we fetch recently shared foods
              </p>
            </div>

            {/* Loading skeleton cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
              {Array.from(
                {
                  length: 4,
                },
                (
                  _item,
                  index,
                ) => (
                  <FoodCardSkeleton
                    key={index}
                  />
                ),
              )}
            </div>
          </div>
        )}

        {/* Latest food cards */}
        {!isLoading &&
          !errorMessage &&
          foods.length > 0 && (
            <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
              {foods.map(
                (food) => (
                  <FoodCard
                    key={food._id}
                    food={food}
                  />
                ),
              )}
            </div>
          )}

        {/* Empty state */}
        {!isLoading &&
          !errorMessage &&
          foods.length === 0 && (
            <div className="rounded-2xl border-2 border-dashed border-emerald-200 bg-white/75 px-5 py-14 text-center shadow-sm backdrop-blur-md dark:border-emerald-900/60 dark:bg-zinc-900/70">
              <MdFoodBank className="mx-auto text-6xl text-emerald-200 dark:text-emerald-900" />

              <h3 className="mt-4 text-xl font-bold text-slate-800 dark:text-zinc-200">
                No Foods Available Yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-zinc-400">
                No available food has
                been shared recently.
                New posts will appear
                here automatically.
              </p>
            </div>
          )}

        {/* Explore all foods button */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/all-foods"
            className="group inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-700 via-emerald-600 to-green-600 px-7 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1 hover:from-emerald-800 hover:via-emerald-700 hover:to-green-700 hover:shadow-xl hover:shadow-emerald-500/30 dark:from-emerald-600 dark:via-emerald-500 dark:to-green-500 dark:hover:from-emerald-500 dark:hover:via-emerald-400 dark:hover:to-green-400"
          >
            Explore More Shared Foods

            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestFoodsSection;