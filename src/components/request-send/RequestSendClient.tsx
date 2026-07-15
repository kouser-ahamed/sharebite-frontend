"use client";

import React, {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiHome,
  FiLoader,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
  FiUser,
} from "react-icons/fi";
import { MdFoodBank } from "react-icons/md";

import { authClient } from "@/lib/auth-client";
import type { Food } from "@/types/food";

/* =========================================================
   Types
========================================================= */

interface RequestSendClientProps {
  foodId: string;
}

interface FoodDetailsResponse {
  success: boolean;
  message: string;
  data?: Food;
  error?: string;
}

type RequestStatus =
  | "pending"
  | "approved"
  | "rejected";

interface ExistingRequest {
  _id: string;
  foodId: string;
  requesterUserId: string;
  requesterName: string;
  requesterEmail: string;
  phoneNumber: string;
  address: string;
  requestDescription: string;
  neededDate: string;
  status: RequestStatus;
  requestDate: string;
}

interface CheckRequestResponse {
  success: boolean;
  isOwner?: boolean;
  hasRequested: boolean;
  data: ExistingRequest | null;
  message?: string;
}

interface SendRequestResponse {
  success: boolean;
  message: string;
  isOwner?: boolean;
  alreadyRequested?: boolean;
  data?: ExistingRequest;
  error?: string;
}

/* =========================================================
   Helpers
========================================================= */

const getServerUrl = (): string => {
  const rawServerUrl =
    process.env.NEXT_PUBLIC_SERVER_URL;

  if (!rawServerUrl) {
    throw new Error(
      "NEXT_PUBLIC_SERVER_URL is not configured"
    );
  }

  return rawServerUrl.replace(
    /\/+$/,
    ""
  );
};

const formatDate = (
  dateValue?: string | null
): string => {
  if (!dateValue) {
    return "Not provided";
  }

  const parsedDate =
    new Date(dateValue);

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return dateValue;
  }

  return new Intl.DateTimeFormat(
    "en-BD",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  ).format(parsedDate);
};

const toDateInputValue = (
  date: Date
): string => {
  const year =
    date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getDatePart = (
  dateValue?: string | null
): string | undefined => {
  if (!dateValue) {
    return undefined;
  }

  const directDatePart =
    dateValue.slice(0, 10);

  if (
    /^\d{4}-\d{2}-\d{2}$/.test(
      directDatePart
    )
  ) {
    return directDatePart;
  }

  const parsedDate =
    new Date(dateValue);

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return undefined;
  }

  return toDateInputValue(
    parsedDate
  );
};

const getStatusClasses = (
  status: RequestStatus
): string => {
  if (status === "approved") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400";
  }

  if (status === "rejected") {
    return "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-400";
  }

  return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-400";
};

/* =========================================================
   Component
========================================================= */

const RequestSendClient: React.FC<
  RequestSendClientProps
> = ({ foodId }) => {
  const sessionResult =
    authClient.useSession();

  const user =
    sessionResult.data?.user;

  const isSessionPending =
    sessionResult.isPending;

  const [food, setFood] =
    useState<Food | null>(null);

  const [
    existingRequest,
    setExistingRequest,
  ] =
    useState<ExistingRequest | null>(
      null
    );

  const [
    phoneNumber,
    setPhoneNumber,
  ] = useState("");

  const [address, setAddress] =
    useState("");

  const [
    requestDescription,
    setRequestDescription,
  ] = useState("");

  const [neededDate, setNeededDate] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(true);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [
    successMessage,
    setSuccessMessage,
  ] = useState("");

  const isFoodOwner =
    Boolean(
      user?.id &&
      food?.userId &&
      user.id === food.userId
    );

  const minimumNeededDate =
    useMemo(() => {
      return toDateInputValue(
        new Date()
      );
    }, []);

  const maximumNeededDate =
    useMemo(() => {
      return getDatePart(
        food?.expiryDate
      );
    }, [food?.expiryDate]);

  const isFoodExpired =
    Boolean(
      maximumNeededDate &&
      maximumNeededDate <
        minimumNeededDate
    );

  /* =======================================================
     Load food and check previous request
  ======================================================= */

  useEffect(() => {
    if (isSessionPending) {
      return;
    }

    const controller =
      new AbortController();

    const loadPageData =
      async () => {
        setIsLoading(true);
        setErrorMessage("");

        try {
          const serverUrl =
            getServerUrl();

          /*
            Food details are public.
          */
          const foodResponse =
            await fetch(
              `${serverUrl}/api/foods/${foodId}`,
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

          const foodResult =
            (await foodResponse.json()) as FoodDetailsResponse;

          if (
            !foodResponse.ok ||
            !foodResult.success ||
            !foodResult.data
          ) {
            throw new Error(
              foodResult.message ||
                "Food was not found"
            );
          }

          setFood(foodResult.data);

          /*
            Logged-out users can see the food,
            but they cannot check/send requests.
          */
          if (!user) {
            return;
          }

          /*
            The owner can view this page, but the
            request form and request API check are
            not needed for their own food.
          */
          if (
            user.id ===
            foodResult.data.userId
          ) {
            return;
          }

          const {
            data: tokenData,
            error: tokenError,
          } =
            await authClient.token();

          if (
            tokenError ||
            !tokenData?.token
          ) {
            throw new Error(
              "Unable to verify your login session"
            );
          }

          const checkResponse =
            await fetch(
              `${serverUrl}/api/food-requests/check/${foodId}`,
              {
                method: "GET",
                headers: {
                  Accept:
                    "application/json",
                  Authorization:
                    `Bearer ${tokenData.token}`,
                },
                cache: "no-store",
                signal:
                  controller.signal,
              }
            );

          const checkResult =
            (await checkResponse.json()) as CheckRequestResponse;

          if (
            !checkResponse.ok ||
            !checkResult.success
          ) {
            throw new Error(
              checkResult.message ||
                "Failed to check previous request"
            );
          }

          if (
            checkResult.isOwner
          ) {
            return;
          }

          if (
            checkResult.hasRequested &&
            checkResult.data
          ) {
            setExistingRequest(
              checkResult.data
            );

            setPhoneNumber(
              checkResult.data
                .phoneNumber || ""
            );

            setAddress(
              checkResult.data.address ||
                ""
            );

            setRequestDescription(
              checkResult.data
                .requestDescription || ""
            );

            setNeededDate(
              getDatePart(
                checkResult.data
                  .neededDate
              ) || ""
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
            "Request page error:",
            error
          );

          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Failed to load request page"
          );
        } finally {
          if (
            !controller.signal
              .aborted
          ) {
            setIsLoading(false);
          }
        }
      };

    void loadPageData();

    return () => {
      controller.abort();
    };
  }, [
    foodId,
    user,
    isSessionPending,
  ]);

  /* =======================================================
     Submit request
  ======================================================= */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      isSubmitting ||
      existingRequest
    ) {
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");

    if (!user) {
      setErrorMessage(
        "Please log in before sending a food request"
      );

      return;
    }

    if (isFoodOwner) {
      setErrorMessage(
        "You are the owner of this food. You cannot request your own food."
      );

      return;
    }

    if (isFoodExpired) {
      setErrorMessage(
        "This food has already expired. A request cannot be sent."
      );

      return;
    }

    if (!phoneNumber.trim()) {
      setErrorMessage(
        "Phone number is required"
      );

      return;
    }

    if (!address.trim()) {
      setErrorMessage(
        "Address is required"
      );

      return;
    }

    if (
      requestDescription.trim()
        .length < 10
    ) {
      setErrorMessage(
        "Please explain why you need the food using at least 10 characters"
      );

      return;
    }

    if (!neededDate) {
      setErrorMessage(
        "Please select when you need the food"
      );

      return;
    }

    setIsSubmitting(true);

    try {
      const serverUrl =
        getServerUrl();

      const {
        data: tokenData,
        error: tokenError,
      } = await authClient.token();

      if (
        tokenError ||
        !tokenData?.token
      ) {
        throw new Error(
          "Unable to get authentication token"
        );
      }

      const response =
        await fetch(
          `${serverUrl}/api/food-requests/${foodId}`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
              Accept:
                "application/json",
              Authorization:
                `Bearer ${tokenData.token}`,
            },
            body: JSON.stringify({
              phoneNumber:
                phoneNumber.trim(),
              address:
                address.trim(),
              requestDescription:
                requestDescription.trim(),
              neededDate,
            }),
          }
        );

      const result =
        (await response.json()) as SendRequestResponse;

      if (
        response.status === 403 &&
        result.isOwner
      ) {
        throw new Error(
          result.message ||
            "You are the owner of this food. You cannot request your own food."
        );
      }

      if (
        response.status === 409 ||
        result.alreadyRequested
      ) {
        if (result.data) {
          setExistingRequest(
            result.data
          );
        }

        throw new Error(
          "You already sent a request for this food"
        );
      }

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Failed to send food request"
        );
      }

      if (result.data) {
        setExistingRequest(
          result.data
        );
      }

      setSuccessMessage(
        "Your food request was sent successfully. The current status is pending."
      );
    } catch (error) {
      console.error(
        "Food request submit error:",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to send food request"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =======================================================
     Loading UI
  ======================================================= */

  if (
    isSessionPending ||
    isLoading
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAFAF7] px-4 dark:bg-black">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <FiLoader className="animate-spin text-2xl text-emerald-500" />

          <p className="font-semibold text-slate-700 dark:text-zinc-300">
            Loading request page...
          </p>
        </div>
      </main>
    );
  }

  if (!food) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAFAF7] px-4 dark:bg-black">
        <div className="max-w-lg rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center dark:border-rose-900 dark:bg-rose-950/20">
          <FiAlertCircle className="mx-auto text-5xl text-rose-500" />

          <h1 className="mt-4 text-2xl font-bold text-rose-700 dark:text-rose-400">
            Food unavailable
          </h1>

          <p className="mt-2 text-sm text-rose-600 dark:text-rose-300">
            {errorMessage ||
              "This food could not be found"}
          </p>

          <Link
            href="/all-foods"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white"
          >
            <FiArrowLeft />
            Back to All Foods
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAFAF7] py-8 dark:bg-black">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-50 dark:opacity-10" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
        <Link
          href={`/all-foods/${foodId}`}
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
        >
          <FiArrowLeft />
          Back to Food Details
        </Link>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Food information */}
          <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="relative h-72 overflow-hidden bg-slate-100 dark:bg-zinc-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  food.imageUrl ||
                  "/assets/logo11.png"
                }
                alt={food.foodName}
                className="h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.src =
                    "/assets/logo11.png";
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4">
                <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white">
                  {food.category}
                </span>

                <h2 className="mt-2 text-2xl font-bold text-white">
                  {food.foodName}
                </h2>
              </div>
            </div>

            <div className="space-y-4 p-6">
              <p className="text-sm leading-6 text-slate-600 dark:text-zinc-400">
                {food.shortDescription}
              </p>

              <div className="space-y-3 border-t border-slate-200 pt-4 dark:border-zinc-800">
                <div className="flex items-start gap-3 text-sm">
                  <FiUser className="mt-0.5 shrink-0 text-emerald-500" />

                  <div>
                    <p className="text-xs text-slate-400">
                      Owner
                    </p>

                    <p className="font-semibold text-slate-700 dark:text-zinc-200">
                      {food.ownerName}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <FiMapPin className="mt-0.5 shrink-0 text-emerald-500" />

                  <div>
                    <p className="text-xs text-slate-400">
                      Pickup location
                    </p>

                    <p className="font-semibold text-slate-700 dark:text-zinc-200">
                      {food.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <FiClock className="mt-0.5 shrink-0 text-emerald-500" />

                  <div>
                    <p className="text-xs text-slate-400">
                      Food expiry date
                    </p>

                    <p className="font-semibold text-slate-700 dark:text-zinc-200">
                      {formatDate(
                        food.expiryDate
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Request form */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400">
                <MdFoodBank />
                Food Request
              </div>

              <h1 className="mt-3 text-3xl font-bold text-slate-800 dark:text-white">
                Request This Food
              </h1>

              <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">
                Provide your contact and
                delivery information before
                sending the request.
              </p>
            </div>

            {!user ? (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center dark:border-amber-900 dark:bg-amber-950/20">
                <FiAlertCircle className="mx-auto text-4xl text-amber-500" />

                <h2 className="mt-3 text-lg font-bold text-amber-700 dark:text-amber-400">
                  Login required
                </h2>

                <p className="mt-1 text-sm text-amber-600 dark:text-amber-300">
                  Please log in before
                  requesting this food.
                </p>

                <Link
                  href={`/login?callbackURL=/request-send/${foodId}`}
                  className="mt-5 inline-flex rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
                >
                  Login to Continue
                </Link>
              </div>
            ) : isFoodOwner ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-7 text-center dark:border-emerald-900 dark:bg-emerald-950/20">
                <FiCheckCircle className="mx-auto text-5xl text-emerald-500" />

                <h2 className="mt-4 text-xl font-bold text-emerald-700 dark:text-emerald-400">
                  You Are the Owner of This Food
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-emerald-600 dark:text-emerald-300">
                  This food was shared by your
                  account. You cannot send a food
                  request for your own item.
                </p>

                <Link
                  href="/my-shared-foods"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
                >
                  View My Shared Foods
                </Link>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Auto user information */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-zinc-300">
                      Your name
                    </label>

                    <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-slate-100 px-4 text-sm text-slate-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      <FiUser className="text-emerald-500" />
                      <span className="truncate">
                        {user.name}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-zinc-300">
                      Your email
                    </label>

                    <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-slate-100 px-4 text-sm text-slate-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      <FiMail className="shrink-0 text-emerald-500" />
                      <span className="truncate">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-zinc-300"
                  >
                    Phone Number
                  </label>

                  <div className="relative">
                    <FiPhone className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />

                    <input
                      id="phoneNumber"
                      type="tel"
                      inputMode="tel"
                      value={phoneNumber}
                      onChange={(event) =>
                        setPhoneNumber(
                          event.target.value
                        )
                      }
                      placeholder="Enter your phone number"
                      disabled={
                        Boolean(
                          existingRequest
                        )
                      }
                      required
                      maxLength={20}
                      className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:disabled:bg-zinc-800"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor="address"
                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-zinc-300"
                  >
                    Address
                  </label>

                  <div className="relative">
                    <FiHome className="pointer-events-none absolute left-4 top-4 text-emerald-500" />

                    <textarea
                      id="address"
                      value={address}
                      onChange={(event) =>
                        setAddress(
                          event.target.value
                        )
                      }
                      placeholder="Enter your complete address"
                      disabled={
                        Boolean(
                          existingRequest
                        )
                      }
                      required
                      rows={3}
                      maxLength={300}
                      className="w-full resize-none rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:disabled:bg-zinc-800"
                    />
                  </div>

                  <p className="mt-1 text-right text-xs text-slate-400">
                    {address.length}/300
                  </p>
                </div>

                {/* Needed date */}
                <div>
                  <label
                    htmlFor="neededDate"
                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-zinc-300"
                  >
                    When Do You Need the Food?
                  </label>

                  <div className="relative">
                    <FiCalendar className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />

                    <input
                      id="neededDate"
                      type="date"
                      value={neededDate}
                      onChange={(event) =>
                        setNeededDate(
                          event.target.value
                        )
                      }
                      min={minimumNeededDate}
                      max={
                        maximumNeededDate
                      }
                      disabled={
                        Boolean(
                          existingRequest
                        ) ||
                        isFoodExpired
                      }
                      required
                      className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:disabled:bg-zinc-800"
                    />
                  </div>

                  <p className="mt-1 text-xs text-slate-400">
                    Select a date from today
                    through{" "}
                    {formatDate(
                      food.expiryDate
                    )}
                  </p>

                  {isFoodExpired && (
                    <p className="mt-2 text-sm font-semibold text-rose-600 dark:text-rose-400">
                      This food has already
                      expired, so no request
                      date is available.
                    </p>
                  )}
                </div>

                {/* Request description */}
                <div>
                  <label
                    htmlFor="requestDescription"
                    className="mb-2 block text-sm font-semibold text-slate-700 dark:text-zinc-300"
                  >
                    Why Do You Need This Food?
                  </label>

                  <textarea
                    id="requestDescription"
                    value={
                      requestDescription
                    }
                    onChange={(event) =>
                      setRequestDescription(
                        event.target.value
                      )
                    }
                    placeholder="Briefly explain why you need this food..."
                    disabled={
                      Boolean(
                        existingRequest
                      )
                    }
                    required
                    minLength={10}
                    maxLength={1000}
                    rows={5}
                    className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:disabled:bg-zinc-800"
                  />

                  <p className="mt-1 text-right text-xs text-slate-400">
                    {
                      requestDescription.length
                    }
                    /1000
                  </p>
                </div>

                {/* Errors */}
                {errorMessage && (
                  <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/20 dark:text-rose-400">
                    <FiAlertCircle className="mt-0.5 shrink-0 text-lg" />
                    {errorMessage}
                  </div>
                )}

                {/* Success */}
                {successMessage && (
                  <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/20 dark:text-emerald-400">
                    <FiCheckCircle className="mt-0.5 shrink-0 text-lg" />
                    {successMessage}
                  </div>
                )}

                {/* Existing request */}
                {existingRequest && (
                  <div
                    className={`rounded-xl border p-4 ${getStatusClasses(
                      existingRequest.status
                    )}`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold">
                          You already sent a
                          request
                        </p>

                        <p className="mt-1 text-xs">
                          Sent on{" "}
                          {formatDate(
                            existingRequest.requestDate
                          )}
                        </p>
                      </div>

                      <span className="rounded-full border border-current/20 px-3 py-1 text-xs font-bold uppercase">
                        {
                          existingRequest.status
                        }
                      </span>
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    Boolean(
                      existingRequest
                    ) ||
                    isFoodExpired
                  }
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-600 via-emerald-500 to-lime-500 px-6 text-sm font-bold text-white shadow-md shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {isSubmitting ? (
                    <>
                      <FiLoader className="animate-spin" />
                      Sending Request...
                    </>
                  ) : existingRequest ? (
                    <>
                      <FiCheckCircle />
                      You Already Sent Request
                    </>
                  ) : (
                    <>
                      <FiSend />
                      Send Food Request
                    </>
                  )}
                </button>
              </form>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default RequestSendClient;