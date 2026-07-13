"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check } from "@gravity-ui/icons";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUsers,
} from "react-icons/fi";
import { MdFoodBank } from "react-icons/md";
import type { Food } from "@/types/food";

interface FoodCardProps {
  food: Food;
}

const formatDate = (
  dateValue: string | null | undefined
): string => {
  if (!dateValue) {
    return "Not provided";
  }

  const parsedDate = new Date(dateValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Not provided";
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  const [imageFailed, setImageFailed] = useState(false);

  const makingDate =
    food.preparationDate || food.createdAt;

  return (
    <article className="group flex h-full min-h-[520px] w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/10 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-900">
      {/* Fixed image height keeps every card equal. */}
      <div className="relative h-48 w-full shrink-0 overflow-hidden bg-slate-100 dark:bg-zinc-800">
        {food.imageUrl && !imageFailed ? (
          // A regular img supports arbitrary user-provided image hosts.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={food.imageUrl}
            alt={food.foodName}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <MdFoodBank className="text-7xl text-slate-300 dark:text-zinc-600" />
          </div>
        )}

        <div className="absolute left-3 top-3 rounded-full border border-white/40 bg-white/90 px-3 py-1 text-[11px] font-bold text-emerald-700 shadow-sm backdrop-blur-sm dark:border-zinc-700 dark:bg-black/80 dark:text-emerald-400">
          {food.category}
        </div>

        <div className="absolute right-3 top-3">
          {food.isHalal ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
              <Check />
              Halal
            </span>
          ) : (
            <span className="rounded-full bg-slate-700/90 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
              Not Halal
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1">
          <h2 className="line-clamp-1 text-lg font-bold text-slate-800 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
            {food.foodName}
          </h2>

          <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-relaxed text-slate-500 dark:text-zinc-400">
            {food.shortDescription}
          </p>

          <div className="mt-5 space-y-3">
            <div className="flex items-start gap-2 text-xs">
              <FiMapPin className="mt-0.5 shrink-0 text-emerald-500" />

              <div className="min-w-0">
                <p className="text-slate-400 dark:text-zinc-500">
                  Location
                </p>

                <p className="truncate font-semibold text-slate-700 dark:text-zinc-300">
                  {food.location}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-zinc-800/70">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-zinc-500">
                  <FiClock className="text-amber-500" />
                  Making
                </div>

                <p className="mt-1 text-xs font-semibold text-slate-700 dark:text-zinc-300">
                  {formatDate(makingDate)}
                </p>
              </div>

              <div className="rounded-xl bg-rose-50 p-3 dark:bg-rose-950/20">
                <div className="flex items-center gap-1.5 text-[11px] text-rose-500 dark:text-rose-400">
                  <FiCalendar />
                  Expiry
                </div>

                <p className="mt-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
                  {formatDate(food.expiryDate)}
                </p>
              </div>
            </div>

            {food.servingSize && (
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400">
                <FiUsers className="shrink-0 text-emerald-500" />
                <span className="truncate">
                  Serves:{" "}
                  <strong className="font-semibold text-slate-700 dark:text-zinc-300">
                    {food.servingSize}
                  </strong>
                </span>
              </div>
            )}
          </div>
        </div>

        <Link
          href={`/all-foods/${food._id}`}
          className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl bg-linear-to-r from-emerald-600 to-emerald-500  text-sm font-bold text-white shadow-md shadow-emerald-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/25 active:translate-y-0"
        >
          View Details
        </Link>
      </div>
    </article>
  );
};

export default FoodCard;