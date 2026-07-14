"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  FiAlertCircle,
  FiArrowRight,
  FiClock,
  FiLoader,
  FiRefreshCw,
  FiTrendingDown,
} from "react-icons/fi";

import {
  HiOutlineBolt,
  HiOutlineSparkles,
} from "react-icons/hi2";

import { MdFoodBank } from "react-icons/md";

import FoodCard from "@/components/all-foods/FoodCard";
import FoodCardSkeleton from "@/components/all-foods/FoodCardSkeleton";

import type { Food } from "@/types/food";

/* =========================================================
   API response type
========================================================= */

interface ExpiringSoonApiResponse {
  success: boolean;
  message: string;
  data: Food[];
  totalItems: number;
  error?: string;
}

/* =========================================================
   Response helpers
========================================================= */

const isObject = (
  value: unknown
): value is Record<string, unknown> => {
  return (
    typeof value === "object" &&
    value !== null
  );
};

const isValidResponse = (
  value: unknown
): value is ExpiringSoonApiResponse => {
  if (!isObject(value)) {
    return false;
  }

  return (
    value.success === true &&
    Array.isArray(value.data)
  );
};

const getErrorMessage = (
  value: unknown
): string | null => {
  if (!isObject(value)) {
    return null;
  }

  if (
    typeof value.message === "string"
  ) {
    return value.message;
  }

  if (
    typeof value.error === "string"
  ) {
    return value.error;
  }

  return null;
};

/* =========================================================
   Main component
========================================================= */

const ExpiringSoonSection = () => {
  const [foods, setFoods] = useState<
    Food[]
  >([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [refreshKey, setRefreshKey] =
    useState(0);

  /* =======================================================
     Fetch expiring foods
  ======================================================= */

  useEffect(() => {
    const controller =
      new AbortController();

    const fetchExpiringFoods =
      async () => {
        setIsLoading(true);
        setErrorMessage("");

        try {
          const rawServerUrl =
            process.env
              .NEXT_PUBLIC_SERVER_URL;

          if (!rawServerUrl) {
            throw new Error(
              "NEXT_PUBLIC_SERVER_URL is not configured in .env.local"
            );
          }

          const serverUrl =
            rawServerUrl.replace(
              /\/+$/,
              ""
            );

          const response = await fetch(
            `${serverUrl}/api/foods/expiring-soon`,
            {
              method: "GET",
              headers: {
                Accept:
                  "application/json",
              },
              cache: "no-store",
              signal:
                controller.signal,
            }
          );

          const responseText =
            await response.text();

          let parsedResponse: unknown;

          try {
            parsedResponse =
              responseText
                ? JSON.parse(
                    responseText
                  )
                : null;
          } catch {
            throw new Error(
              "Backend returned an invalid response"
            );
          }

          if (!response.ok) {
            throw new Error(
              getErrorMessage(
                parsedResponse
              ) ||
                "Failed to load foods expiring soon"
            );
          }

          if (
            !isValidResponse(
              parsedResponse
            )
          ) {
            throw new Error(
              "Unexpected backend response format"
            );
          }

          /*
            Backend already returns maximum
            4 nearest-expiry items.
          */
          setFoods(
            parsedResponse.data.slice(
              0,
              4
            )
          );
        } catch (error) {
          if (
            error instanceof
              DOMException &&
            error.name === "AbortError"
          ) {
            return;
          }

          console.error(
            "Error loading expiring foods:",
            error
          );

          setFoods([]);

          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Something went wrong while loading foods"
          );
        } finally {
          if (
            !controller.signal.aborted
          ) {
            setIsLoading(false);
          }
        }
      };

    void fetchExpiringFoods();

    return () => {
      controller.abort();
    };
  }, [refreshKey]);

  /* =======================================================
     Retry
  ======================================================= */

  const handleRetry =
    useCallback(() => {
      setRefreshKey(
        (currentKey) =>
          currentKey + 1
      );
    }, []);

  return (
    <section
      id="expiring-soon"
      className="relative overflow-hidden bg-[#fffaf5] py-20 dark:bg-[#070605] sm:py-24"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_15%,rgba(249,115,22,0.12),transparent_30%),radial-gradient(circle_at_92%_82%,rgba(245,158,11,0.10),transparent_30%),radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.05),transparent_35%)] dark:bg-[radial-gradient(circle_at_8%_15%,rgba(249,115,22,0.07),transparent_30%),radial-gradient(circle_at_92%_82%,rgba(245,158,11,0.05),transparent_30%),radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.03),transparent_35%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.025)_1px,transparent_1px)] bg-[size:54px_54px] opacity-60 dark:opacity-15" />

      <div className="pointer-events-none absolute -left-32 top-20 size-96 rounded-full bg-orange-300/15 blur-3xl dark:bg-orange-500/5" />

      <div className="pointer-events-none absolute -right-32 bottom-10 size-96 rounded-full bg-amber-300/15 blur-3xl dark:bg-amber-500/5" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            Section heading
        ====================================================== */}

        <div className="flex flex-col items-center justify-between gap-7 text-center lg:flex-row lg:text-left">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/90 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-orange-700 shadow-sm backdrop-blur-md dark:border-orange-900/70 dark:bg-orange-950/35 dark:text-orange-300">
              <HiOutlineBolt className="text-lg" />

              Urgent Food Pickup
            </div>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
              Save It Before It{" "}
              <span className="bg-linear-to-r from-orange-600 via-amber-500 to-rose-500 bg-clip-text text-transparent dark:from-orange-300 dark:via-amber-300 dark:to-rose-300">
                Goes to Waste
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600 dark:text-zinc-300 sm:text-base">
              These available food items
              have the closest expiry
              times. Requesting them early
              can help prevent safe food
              from becoming unnecessary
              waste.
            </p>
          </div>

          {/* Information badge */}
          <div className="inline-flex shrink-0 items-center gap-3 rounded-2xl border border-orange-200 bg-white/85 px-4 py-3 text-left shadow-sm backdrop-blur-md dark:border-orange-900/70 dark:bg-zinc-900/80">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-600 dark:bg-orange-950/60 dark:text-orange-400">
              <FiTrendingDown />
            </div>

            <div>
              <p className="text-sm font-black text-slate-950 dark:text-white">
                Nearest Expiry First
              </p>

              <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-zinc-400">
                Up to 4 available items
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            Error state
        ====================================================== */}

        {errorMessage &&
          !isLoading && (
            <div className="mt-10 rounded-[24px] border border-rose-200 bg-rose-50/90 p-6 text-center shadow-sm dark:border-rose-900/60 dark:bg-rose-950/20">
              <FiAlertCircle className="mx-auto text-4xl text-rose-500" />

              <h3 className="mt-3 text-lg font-black text-rose-700 dark:text-rose-400">
                Unable to load urgent
                foods
              </h3>

              <p className="mx-auto mt-2 max-w-xl text-sm font-medium leading-6 text-rose-600 dark:text-rose-300">
                {errorMessage}
              </p>

              <button
                type="button"
                onClick={handleRetry}
                className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 text-sm font-bold text-white transition hover:bg-rose-700"
              >
                <FiRefreshCw />

                Try Again
              </button>
            </div>
          )}

        {/* =====================================================
            Food cards
        ====================================================== */}

        {!errorMessage && (
          <div className="mt-12">
            {isLoading ? (
              <div>
                {/* Animated loader */}
                <div className="mb-8 flex flex-col items-center justify-center text-center">
                  <div className="relative flex size-16 items-center justify-center">
                    <div className="absolute inset-0 animate-ping rounded-full bg-orange-400/20" />

                    <div className="relative flex size-14 items-center justify-center rounded-full border border-orange-200 bg-white/90 shadow-lg shadow-orange-500/10 backdrop-blur-md dark:border-orange-900/70 dark:bg-orange-950/40">
                      <FiLoader className="animate-spin text-2xl text-orange-600 dark:text-orange-400" />
                    </div>
                  </div>

                  <p className="mt-4 text-sm font-black text-orange-700 dark:text-orange-300">
                    Loading urgent foods...
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-500 dark:text-zinc-500">
                    Please wait while we fetch foods with the nearest expiry times
                  </p>
                </div>

                {/* Skeleton cards */}
                <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
                  {Array.from({
                    length: 4,
                  }).map(
                    (_, index) => (
                      <FoodCardSkeleton
                        key={index}
                      />
                    )
                  )}
                </div>
              </div>
            ) : foods.length > 0 ? (
              <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
                {foods.map((food) => (
                  <FoodCard
                    key={food._id}
                    food={food}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-[28px] border-2 border-dashed border-orange-200 bg-white/80 px-5 py-14 text-center shadow-sm backdrop-blur-md dark:border-orange-900/60 dark:bg-zinc-900/70 sm:py-16">
                <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-orange-100 text-4xl text-orange-500 dark:bg-orange-950/50 dark:text-orange-400">
                  <MdFoodBank />
                </div>

                <h3 className="mt-5 text-xl font-black text-slate-900 dark:text-white">
                  No urgent pickup needed
                </h3>

                <p className="mx-auto mt-2 max-w-lg text-sm font-medium leading-7 text-slate-500 dark:text-zinc-400">
                  There are currently no
                  available food items
                  approaching their expiry
                  time.
                </p>
              </div>
            )}
          </div>
        )}

        {/* =====================================================
            Bottom button
        ====================================================== */}

        <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-[28px] border border-orange-200 bg-linear-to-br from-orange-50 via-white to-amber-50/80 px-5 py-6 text-center shadow-[0_20px_55px_-35px_rgba(249,115,22,0.38)] dark:border-orange-900/60 dark:from-orange-950/30 dark:via-zinc-900 dark:to-amber-950/20 sm:flex-row sm:px-7 sm:text-left">
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-orange-600 via-amber-500 to-yellow-400 text-2xl text-white shadow-lg">
              <HiOutlineSparkles />
            </div>

            <div>
              <h3 className="text-base font-black text-slate-950 dark:text-white sm:text-lg">
                Looking for more
                available food?
              </h3>

              <p className="mt-1 text-sm font-medium text-slate-500 dark:text-zinc-400">
                Explore every currently
                available food item on
                ShareBite.
              </p>
            </div>
          </div>

          <Link
            href="/all-foods"
            className="group inline-flex h-[52px] w-full shrink-0 items-center justify-center gap-3 rounded-xl bg-emerald-700 px-7 text-sm font-extrabold text-white shadow-lg shadow-emerald-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-800 hover:shadow-xl dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400 sm:w-auto"
          >
            Explore All Foods

            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExpiringSoonSection;