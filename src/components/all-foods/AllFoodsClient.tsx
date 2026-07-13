"use client";

import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import { MdFoodBank } from "react-icons/md";
import {
  FiAlertCircle,
  FiRefreshCw,
} from "react-icons/fi";

import FoodCard from "./FoodCard";
import FoodCardSkeleton from "./FoodCardSkeleton";
import FoodFilters from "./FoodFilters";
import FoodPagination from "./FoodPagination";
import FoodSearch from "./FoodSearch";
import FoodSortSelect from "./FoodSortSelect";

import type {
  Food,
  FoodsApiResponse,
  FoodsPagination,
} from "@/types/food";

/* =========================================================
   Initial pagination
========================================================= */

const initialPagination: FoodsPagination = {
  currentPage: 1,
  itemsPerPage: 12,
  totalItems: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

/* =========================================================
   API response helpers
========================================================= */

interface ErrorApiResponse {
  success?: boolean;
  message?: string;
  error?: string;
}

const isObject = (
  value: unknown
): value is Record<string, unknown> => {
  return (
    typeof value === "object" &&
    value !== null
  );
};

const getResponseMessage = (
  value: unknown
): string | null => {
  if (!isObject(value)) {
    return null;
  }

  return typeof value.message === "string"
    ? value.message
    : null;
};

const isValidFoodsResponse = (
  value: unknown
): value is FoodsApiResponse => {
  if (!isObject(value)) {
    return false;
  }

  if (value.success !== true) {
    return false;
  }

  if (!Array.isArray(value.data)) {
    return false;
  }

  if (
    !isObject(value.pagination) ||
    !isObject(value.filterOptions)
  ) {
    return false;
  }

  return true;
};

/* =========================================================
   Component
========================================================= */

const AllFoodsClient: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);

  const [categories, setCategories] = useState<
    string[]
  >([]);

  const [locations, setLocations] = useState<
    string[]
  >([]);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] =
    useState("");

  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [expiryDate, setExpiryDate] =
    useState("");

  const [sortBy, setSortBy] =
    useState("newest");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] =
    useState<FoodsPagination>(
      initialPagination
    );

  const [isLoading, setIsLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [refreshKey, setRefreshKey] =
    useState(0);

  /* =======================================================
     Debounced search
  ======================================================= */

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 400);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [search]);

  /* =======================================================
     Fetch foods
  ======================================================= */

  useEffect(() => {
    const controller =
      new AbortController();

    const fetchFoods = async () => {
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

        const queryParameters =
          new URLSearchParams();

        queryParameters.set(
          "page",
          page.toString()
        );

        queryParameters.set(
          "sort",
          sortBy
        );

        if (debouncedSearch) {
          queryParameters.set(
            "search",
            debouncedSearch
          );
        }

        if (category) {
          queryParameters.set(
            "category",
            category
          );
        }

        if (location) {
          queryParameters.set(
            "location",
            location
          );
        }

        if (expiryDate) {
          queryParameters.set(
            "expiryDate",
            expiryDate
          );
        }

        const requestUrl =
          `${serverUrl}/api/foods?${queryParameters.toString()}`;

        console.log(
          "Foods request URL:",
          requestUrl
        );

        const response = await fetch(
          requestUrl,
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
              ? JSON.parse(responseText)
              : null;
        } catch {
          console.error(
            "Backend raw response:",
            responseText
          );

          throw new Error(
            `Backend returned invalid JSON. HTTP status: ${response.status}`
          );
        }

        console.log(
          "Foods API response:",
          parsedResponse
        );

        /*
          Handles backend 400, 404, 500, 503, etc.
        */
        if (!response.ok) {
          const backendMessage =
            getResponseMessage(
              parsedResponse
            );

          throw new Error(
            backendMessage ||
              `Failed to load foods. HTTP status: ${response.status}`
          );
        }

        /*
          Detects your previous backend response,
          where /api/foods returned a plain array.
        */
        if (
          Array.isArray(
            parsedResponse
          )
        ) {
          throw new Error(
            "The old backend response is still running. Restart the backend and make sure GET /api/foods returns success, data, pagination and filterOptions."
          );
        }

        /*
          Handles a response such as:
          { success: false, message: "..." }
        */
        if (
          isObject(parsedResponse) &&
          parsedResponse.success ===
            false
        ) {
          const errorResponse =
            parsedResponse as ErrorApiResponse;

          throw new Error(
            errorResponse.message ||
              errorResponse.error ||
              "Failed to load foods"
          );
        }

        /*
          Validate successful backend response.
        */
        if (
          !isValidFoodsResponse(
            parsedResponse
          )
        ) {
          console.error(
            "Unexpected backend response format:",
            parsedResponse
          );

          throw new Error(
            "Backend response format is invalid. Expected success, data, pagination and filterOptions."
          );
        }

        const result =
          parsedResponse;

        setFoods(result.data);

        setPagination(
          result.pagination
        );

        setCategories(
          result.filterOptions
            ?.categories || []
        );

        setLocations(
          result.filterOptions
            ?.locations || []
        );

        /*
          Backend may correct an invalid page,
          such as requesting page 5 when only
          page 2 exists.
        */
        if (
          result.pagination
            .currentPage !== page
        ) {
          setPage(
            result.pagination
              .currentPage
          );
        }
      } catch (error) {
        if (
          error instanceof
            DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error(
          "Error loading all foods:",
          error
        );

        setFoods([]);

        setPagination(
          initialPagination
        );

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

    void fetchFoods();

    return () => {
      controller.abort();
    };
  }, [
    page,
    sortBy,
    category,
    location,
    expiryDate,
    debouncedSearch,
    refreshKey,
  ]);

  /* =======================================================
     Search and filter handlers
  ======================================================= */

  const handleSearchChange =
    useCallback(
      (value: string) => {
        setSearch(value);
        setPage(1);
      },
      []
    );

  const handleCategoryChange =
    useCallback(
      (value: string) => {
        setCategory(value);
        setPage(1);
      },
      []
    );

  const handleLocationChange =
    useCallback(
      (value: string) => {
        setLocation(value);
        setPage(1);
      },
      []
    );

  const handleExpiryDateChange =
    useCallback(
      (value: string) => {
        setExpiryDate(value);
        setPage(1);
      },
      []
    );

  const handleSortChange =
    useCallback(
      (value: string) => {
        setSortBy(value);
        setPage(1);
      },
      []
    );

  const resetAllFilters =
    useCallback(() => {
      setSearch("");
      setDebouncedSearch("");
      setCategory("");
      setLocation("");
      setExpiryDate("");
      setSortBy("newest");
      setPage(1);
    }, []);

  /* =======================================================
     Pagination handler
  ======================================================= */

  const handlePageChange =
    useCallback(
      (nextPage: number) => {
        if (
          nextPage < 1 ||
          nextPage >
            pagination.totalPages ||
          nextPage === page
        ) {
          return;
        }

        setPage(nextPage);

        window.setTimeout(() => {
          document
            .getElementById(
              "foods-grid"
            )
            ?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
        }, 50);
      },
      [
        page,
        pagination.totalPages,
      ]
    );

  /* =======================================================
     Computed values
  ======================================================= */

  const hasActiveFilters =
    Boolean(
      search ||
        category ||
        location ||
        expiryDate ||
        sortBy !== "newest"
    );

  const firstVisibleItem =
    pagination.totalItems === 0
      ? 0
      : (pagination.currentPage -
          1) *
          pagination.itemsPerPage +
        1;

  const lastVisibleItem =
    Math.min(
      pagination.currentPage *
        pagination.itemsPerPage,
      pagination.totalItems
    );

  /* =======================================================
     UI
  ======================================================= */

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAFAF7] px-4 py-8 dark:bg-black sm:px-6 lg:px-8">
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-50 dark:opacity-10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-4">
        {/* Header */}
        <section className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-emerald-600 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400">
                <MdFoodBank />
                Community Foods
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white sm:text-4xl">
                Available{" "}
                <span className="text-emerald-500">
                  Foods
                </span>
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                Discover available
                homemade foods shared by
                members of the ShareBite
                community.
              </p>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 dark:border-emerald-900 dark:bg-emerald-950/30">
              <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                Available items
              </p>

              <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                {
                  pagination.totalItems
                }
              </p>
            </div>
          </div>
        </section>

        {/* Search and sorting */}
        <section className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label className="mb-1.5 block text-xs font-semibold text-slate-600 dark:text-zinc-400">
                Search foods
              </label>

              <FoodSearch
                value={search}
                onChange={
                  handleSearchChange
                }
                disabled={isLoading}
              />
            </div>

            <FoodSortSelect
              value={sortBy}
              onChange={
                handleSortChange
              }
              disabled={isLoading}
            />
          </div>
        </section>

        {/* Filters */}
        <section className="mb-6">
          <FoodFilters
            categories={categories}
            locations={locations}
            category={category}
            location={location}
            expiryDate={expiryDate}
            onCategoryChange={
              handleCategoryChange
            }
            onLocationChange={
              handleLocationChange
            }
            onExpiryDateChange={
              handleExpiryDateChange
            }
            onReset={
              resetAllFilters
            }
            hasActiveFilters={
              hasActiveFilters
            }
            disabled={isLoading}
          />
        </section>

        {/* Results information */}
        <section className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p
            className="text-sm text-slate-500 dark:text-zinc-400"
            aria-live="polite"
          >
            {isLoading
              ? "Loading available foods..."
              : pagination.totalItems >
                  0
                ? `Showing ${firstVisibleItem}–${lastVisibleItem} of ${pagination.totalItems} available foods`
                : "No available foods found"}
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={
                resetAllFilters
              }
              disabled={isLoading}
              className="self-start text-xs font-semibold text-emerald-600 transition hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 dark:text-emerald-400 dark:hover:text-emerald-300 sm:self-auto"
            >
              Remove all search and
              filters
            </button>
          )}
        </section>

        {/* Error message */}
        {errorMessage &&
          !isLoading && (
            <section className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center dark:border-rose-900/60 dark:bg-rose-950/20">
              <FiAlertCircle className="mx-auto text-4xl text-rose-500" />

              <h2 className="mt-3 text-lg font-bold text-rose-700 dark:text-rose-400">
                Unable to load foods
              </h2>

              <p className="mx-auto mt-1 max-w-2xl text-sm text-rose-600 dark:text-rose-300">
                {errorMessage}
              </p>

              <button
                type="button"
                onClick={() =>
                  setRefreshKey(
                    (currentKey) =>
                      currentKey + 1
                  )
                }
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
              >
                <FiRefreshCw />
                Try Again
              </button>
            </section>
          )}

        {/* Food cards */}
        <section
          id="foods-grid"
          className="scroll-mt-28"
        >
          {isLoading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
              {Array.from(
                { length: 12 },
                (_, index) => (
                  <FoodCardSkeleton
                    key={index}
                  />
                )
              )}
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
            !errorMessage && (
              <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white px-5 py-16 text-center dark:border-zinc-700 dark:bg-zinc-900 sm:py-20">
                <MdFoodBank className="mx-auto text-6xl text-slate-300 dark:text-zinc-600" />

                <h2 className="mt-4 text-xl font-bold text-slate-700 dark:text-zinc-300">
                  No foods found
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-zinc-500">
                  No available food
                  matches your current
                  search or filters. Try
                  changing the category,
                  location, expiry date or
                  search text.
                </p>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={
                      resetAllFilters
                    }
                    className="mt-5 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )
          )}
        </section>

        {/* Pagination */}
        <FoodPagination
          currentPage={
            pagination.currentPage
          }
          totalPages={
            pagination.totalPages
          }
          hasNextPage={
            pagination.hasNextPage
          }
          hasPreviousPage={
            pagination.hasPreviousPage
          }
          onPageChange={
            handlePageChange
          }
          disabled={isLoading}
        />
      </div>
    </main>
  );
};

export default AllFoodsClient;