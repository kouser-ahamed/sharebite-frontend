"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  FiAlertCircle,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiEye,
  FiInbox,
  FiLoader,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiPhone,
  FiShield,
  FiTrash2,
  FiUser,
  FiX,
  FiXCircle,
} from "react-icons/fi";

import { authClient } from "@/lib/auth-client";
import type {
  FoodRequestActionResponse,
  FoodRequestItem,
  FoodRequestListResponse,
  FoodRequestStatus,
  FoodRequestStatusCounts,
} from "@/types/food-request";

const EMPTY_COUNTS: FoodRequestStatusCounts = {
  total: 0,
  pending: 0,
  approved: 0,
  rejected: 0,
};

const getServerUrl = (): string => {
  const rawServerUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  if (!rawServerUrl) {
    throw new Error("NEXT_PUBLIC_SERVER_URL is not configured");
  }

  return rawServerUrl.replace(/\/+$/, "");
};

const formatDate = (value?: string | null): string => {
  if (!value) {
    return "Not provided";
  }

  const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  const parsedDate = dateOnlyMatch
    ? new Date(
        Number(dateOnlyMatch[1]),
        Number(dateOnlyMatch[2]) - 1,
        Number(dateOnlyMatch[3]),
      )
    : new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
    timeStyle: !dateOnlyMatch && value.includes("T") ? "short" : undefined,
  }).format(parsedDate);
};

const getStatusClasses = (status: FoodRequestStatus): string => {
  if (status === "approved") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400";
  }

  if (status === "rejected") {
    return "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-400";
  }

  return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-400";
};

const getFoodStatusClasses = (status?: string): string => {
  if (status === "booked") {
    return "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-400";
  }

  if (status === "available") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400";
  }

  return "border-slate-200 bg-slate-50 text-slate-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
};

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}

const StatCard = ({ label, value, icon }: StatCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {label}
          </p>

          <p className="mt-1 text-2xl font-black text-slate-800 dark:text-white">
            {value}
          </p>
        </div>

        <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-xl text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
          {icon}
        </div>
      </div>
    </div>
  );
};

interface InfoItemProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const InfoItem = ({ label, value, icon }: InfoItemProps) => {
  return (
    <div className="rounded-xl border border-slate-200 p-3 dark:border-zinc-800">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 shrink-0 text-emerald-500">{icon}</span>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {label}
          </p>

          <p className="mt-1 break-words text-sm font-semibold text-slate-700 dark:text-zinc-300">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

interface RequestDetailsModalProps {
  request: FoodRequestItem;
  onClose: () => void;
  onDelete: (request: FoodRequestItem) => void;
}

const RequestDetailsModal = ({
  request,
  onClose,
  onDelete,
}: RequestDetailsModalProps) => {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Food request details"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Request Details
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-800 dark:text-white">
              {request.foodName}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex size-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100 dark:border-zinc-800 dark:hover:bg-zinc-900"
            aria-label="Close modal"
          >
            <FiX />
          </button>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase ${getStatusClasses(
                request.status,
              )}`}
            >
              Request: {request.status}
            </span>

            <span
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase ${getFoodStatusClasses(
                request.foodStatus,
              )}`}
            >
              Food: {request.foodStatus || "unknown"}
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-[180px_1fr]">
            <div className="overflow-hidden rounded-2xl bg-slate-100 dark:bg-zinc-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={request.foodImageUrl || "/assets/logo11.png"}
                alt={request.foodName}
                className="h-full min-h-44 w-full object-cover"
                onError={(event) => {
                  event.currentTarget.src = "/assets/logo11.png";
                }}
              />
            </div>

            <div className="rounded-2xl border border-slate-200 p-4 dark:border-zinc-800">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Food Summary
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-zinc-300">
                {request.foodShortDescription ||
                  "No short description available"}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-zinc-800 dark:text-zinc-300">
                  {request.foodCategory}
                </span>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                  {request.foodIsHalal ? "Halal" : "Halal not specified"}
                </span>
              </div>
            </div>
          </div>

          {request.status === "approved" && (
            <div className="space-y-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/20">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <FiCheckCircle />
                <h3 className="font-bold">Owner Approval Information</h3>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <InfoItem
                  label="Pickup Location"
                  value={request.ownerPickupLocation || "Not provided"}
                  icon={<FiMapPin />}
                />

                <InfoItem
                  label="Pickup Contact"
                  value={request.ownerContactNumber || "Not provided"}
                  icon={<FiPhone />}
                />
              </div>

              <div className="rounded-xl border border-emerald-200 bg-white/70 p-4 dark:border-emerald-900 dark:bg-zinc-950/40">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                  <FiMessageSquare />
                  <p className="text-xs font-bold uppercase tracking-wider">
                    Owner Message
                  </p>
                </div>

                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-emerald-800 dark:text-emerald-300">
                  {request.ownerMessage || "No message provided"}
                </p>
              </div>
            </div>
          )}

          {request.status === "rejected" && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 dark:border-rose-900 dark:bg-rose-950/20">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400">
                <FiXCircle />
                <h3 className="font-bold">Rejection Reason</h3>
              </div>

              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-rose-700 dark:text-rose-300">
                {request.rejectionReason || "No rejection reason was provided"}
              </p>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <InfoItem
              label="Owner"
              value={request.foodOwnerName}
              icon={<FiUser />}
            />

            <InfoItem
              label="Owner Email"
              value={request.foodOwnerEmail}
              icon={<FiMail />}
            />

            <InfoItem
              label="Owner Contact"
              value={request.foodOwnerContactNumber || "Not provided"}
              icon={<FiPhone />}
            />

            <InfoItem
              label="Food Location"
              value={request.foodLocation || "Not provided"}
              icon={<FiMapPin />}
            />

            <InfoItem
              label="Needed Date"
              value={formatDate(request.neededDate)}
              icon={<FiCalendar />}
            />

            <InfoItem
              label="Expiry Date"
              value={formatDate(request.foodExpiryDate)}
              icon={<FiClock />}
            />

            <InfoItem
              label="Halal Status"
              value={request.foodIsHalal ? "Halal" : "Not specified as halal"}
              icon={<FiShield />}
            />

            <InfoItem
              label="Request Date"
              value={formatDate(request.requestDate)}
              icon={<FiClock />}
            />
          </div>

          <div className="rounded-2xl border border-slate-200 p-4 dark:border-zinc-800">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Your Request Note
            </p>

            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700 dark:text-zinc-300">
              {request.requestDescription}
            </p>
          </div>

          <div className="flex justify-end border-t border-slate-200 pt-5 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => onDelete(request)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-5 text-sm font-bold text-rose-700 transition hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950/20 dark:text-rose-400"
            >
              <FiTrash2 />
              {request.status === "pending"
                ? "Cancel and Delete"
                : "Delete Request"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DeleteConfirmModalProps {
  request: FoodRequestItem;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

const DeleteConfirmModal = ({
  request,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) => {
  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Delete food request"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isDeleting) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-rose-50 text-2xl text-rose-600 dark:bg-rose-950/30 dark:text-rose-400">
          <FiTrash2 />
        </div>

        <h2 className="mt-4 text-center text-xl font-bold text-slate-800 dark:text-white">
          {request.status === "pending"
            ? "Cancel This Request?"
            : "Delete This Request?"}
        </h2>

        <p className="mt-2 text-center text-sm leading-6 text-slate-500 dark:text-zinc-400">
          The request for <strong>{request.foodName}</strong> will be
          permanently removed from the food-requests collection.
        </p>

        {request.status === "approved" && (
          <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-700 dark:border-amber-900 dark:bg-amber-950/20 dark:text-amber-400">
            The food will remain booked even after this request record is
            deleted.
          </p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="h-11 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
          >
            Keep Request
          </button>

          <button
            type="button"
            onClick={() => void onConfirm()}
            disabled={isDeleting}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-rose-600 text-sm font-bold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? <FiLoader className="animate-spin" /> : <FiTrash2 />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const MyRequestsClient = () => {
  const sessionResult = authClient.useSession();

  const user = sessionResult.data?.user;
  const userId = user?.id;
  const isSessionPending = sessionResult.isPending;

  const [requests, setRequests] = useState<FoodRequestItem[]>([]);

  const [counts, setCounts] = useState<FoodRequestStatusCounts>(EMPTY_COUNTS);

  const [selectedRequest, setSelectedRequest] =
    useState<FoodRequestItem | null>(null);

  const [deleteRequest, setDeleteRequest] = useState<FoodRequestItem | null>(
    null,
  );

  const [isDeleting, setIsDeleting] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const loadRequests = useCallback(async () => {
    if (!userId) {
      setRequests([]);
      setCounts(EMPTY_COUNTS);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const serverUrl = getServerUrl();

      const { data: tokenData, error: tokenError } = await authClient.token();

      if (tokenError || !tokenData?.token) {
        throw new Error("Unable to verify your login session");
      }

      const response = await fetch(`${serverUrl}/api/my-requests`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${tokenData.token}`,
        },
        cache: "no-store",
      });

      const result = (await response.json()) as FoodRequestListResponse;

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to load your requests");
      }

      setRequests(Array.isArray(result.data) ? result.data : []);

      setCounts(result.statusCounts || EMPTY_COUNTS);
    } catch (error) {
      console.error("My requests error:", error);

      setErrorMessage(
        error instanceof Error ? error.message : "Failed to load your requests",
      );
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (isSessionPending) {
      return;
    }

    void loadRequests();
  }, [isSessionPending, loadRequests]);

  const handleDeleteRequest = async () => {
    if (!deleteRequest) {
      return;
    }

    setIsDeleting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const serverUrl = getServerUrl();

      const { data: tokenData, error: tokenError } = await authClient.token();

      if (tokenError || !tokenData?.token) {
        throw new Error("Unable to verify your login session");
      }

      const response = await fetch(
        `${serverUrl}/api/my-requests/${deleteRequest._id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tokenData.token}`,
          },
        },
      );

      const result = (await response.json()) as FoodRequestActionResponse;

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete the request");
      }

      setSuccessMessage(result.message);
      setSelectedRequest(null);
      setDeleteRequest(null);

      await loadRequests();
    } catch (error) {
      console.error("Delete request error:", error);

      setErrorMessage(
        error instanceof Error ? error.message : "Failed to delete the request",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  if (isSessionPending || isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAFAF7] px-4 dark:bg-black">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <FiLoader className="animate-spin text-2xl text-emerald-500" />

          <p className="font-semibold text-slate-700 dark:text-zinc-300">
            Loading your requests...
          </p>
        </div>
      </main>
    );
  }

  if (!userId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAFAF7] px-4 dark:bg-black">
        <div className="max-w-md rounded-3xl border border-amber-200 bg-white p-8 text-center shadow-sm dark:border-amber-900 dark:bg-zinc-900">
          <FiAlertCircle className="mx-auto text-5xl text-amber-500" />

          <h1 className="mt-4 text-2xl font-bold text-slate-800 dark:text-white">
            Login Required
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">
            Please log in to see the food requests you have sent.
          </p>

          <Link
            href="/login?callbackURL=/my-requests"
            className="mt-5 inline-flex rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white"
          >
            Login to Continue
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAFAF7] py-8 dark:bg-black">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-50 dark:opacity-10" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400">
              <FiInbox />
              Request Dashboard
            </div>

            <h1 className="mt-3 text-3xl font-black text-slate-800 dark:text-white sm:text-4xl">
              My Food Requests
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-zinc-400">
              Track your sent requests and open the view modal to see owner
              pickup instructions or rejection details.
            </p>
          </div>

          <Link
            href="/all-foods"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-emerald-200 bg-white px-5 text-sm font-bold text-emerald-600 transition hover:bg-emerald-50 dark:border-emerald-900 dark:bg-zinc-900 dark:text-emerald-400"
          >
            Browse More Foods
          </Link>
        </div>

        <div className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Requests"
            value={counts.total}
            icon={<FiInbox />}
          />

          <StatCard label="Pending" value={counts.pending} icon={<FiClock />} />

          <StatCard
            label="Approved"
            value={counts.approved}
            icon={<FiCheckCircle />}
          />

          <StatCard
            label="Rejected"
            value={counts.rejected}
            icon={<FiXCircle />}
          />
        </div>

        {errorMessage && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/20 dark:text-rose-400">
            <FiAlertCircle className="mt-0.5 shrink-0" />
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/20 dark:text-emerald-400">
            <FiCheckCircle className="mt-0.5 shrink-0" />
            {successMessage}
          </div>
        )}

        {requests.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-zinc-700 dark:bg-zinc-900">
            <FiInbox className="mx-auto text-6xl text-slate-300 dark:text-zinc-700" />

            <h2 className="mt-4 text-xl font-bold text-slate-700 dark:text-zinc-200">
              No Requests Yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-zinc-400">
              You have not requested any food yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <article
                key={request._id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex flex-col lg:min-h-40 lg:flex-row">
                  <div className="h-56 w-full shrink-0 overflow-hidden bg-slate-100 sm:h-64 lg:h-auto lg:w-52 dark:bg-zinc-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={request.foodImageUrl || "/assets/logo11.png"}
                      alt={request.foodName}
                      className="h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.src = "/assets/logo11.png";
                      }}
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-center p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-black text-slate-800 dark:text-white">
                        {request.foodName}
                      </h2>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 dark:bg-zinc-800 dark:text-zinc-300">
                        {request.foodCategory}
                      </span>

                      <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-zinc-400">
                        <FiMapPin className="text-emerald-500" />
                        {request.foodLocation || "Location not provided"}
                      </span>
                    </div>

                    <p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-6 text-slate-500 dark:text-zinc-400">
                      {request.foodShortDescription ||
                        "No short description available"}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400">
                        <span className="size-2 rounded-full bg-emerald-500" />
                        {request.foodIsHalal ? "Halal" : "Halal not specified"}
                      </span>

                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold capitalize ${getStatusClasses(
                          request.status,
                        )}`}
                      >
                        <span className="size-2 rounded-full bg-current" />
                        {request.status}
                      </span>

                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold capitalize ${getFoodStatusClasses(
                          request.foodStatus,
                        )}`}
                      >
                        <span className="size-2 rounded-full bg-current" />
                        {request.foodStatus || "unknown"}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col justify-between gap-4 border-t border-slate-200 p-5 lg:w-64 lg:border-l lg:border-t-0 dark:border-zinc-800">
                    <div className="rounded-2xl bg-slate-50 p-4 text-xs dark:bg-zinc-800/70">
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-2 text-slate-500 dark:text-zinc-400">
                          <FiCalendar className="text-amber-500" />
                          Needed
                        </span>

                        <span className="font-bold text-slate-700 dark:text-zinc-200">
                          {formatDate(request.neededDate)}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-2 text-slate-500 dark:text-zinc-400">
                          <FiClock className="text-sky-500" />
                          Requested
                        </span>

                        <span className="text-right font-bold text-slate-700 dark:text-zinc-200">
                          {formatDate(request.requestDate)}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-2 text-slate-500 dark:text-zinc-400">
                          <FiClock className="text-rose-500" />
                          Expiry
                        </span>

                        <span className="text-right font-bold text-rose-600 dark:text-rose-400">
                          {formatDate(request.foodExpiryDate)}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedRequest(request)}
                        className="flex size-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-emerald-900 dark:hover:bg-emerald-950/20 dark:hover:text-emerald-400"
                        aria-label="View request details"
                        title="View request details"
                      >
                        <FiEye />
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteRequest(request)}
                        className="flex size-11 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600 transition hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950/20 dark:text-rose-400"
                        aria-label="Delete request"
                        title="Delete request"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {selectedRequest && (
        <RequestDetailsModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onDelete={(request) => {
            setSelectedRequest(null);
            setDeleteRequest(request);
          }}
        />
      )}

      {deleteRequest && (
        <DeleteConfirmModal
          request={deleteRequest}
          isDeleting={isDeleting}
          onClose={() => {
            if (!isDeleting) {
              setDeleteRequest(null);
            }
          }}
          onConfirm={handleDeleteRequest}
        />
      )}
    </main>
  );
};

export default MyRequestsClient;
