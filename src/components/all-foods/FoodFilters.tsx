"use client";

import React from "react";
import {
  FiCalendar,
  FiFilter,
  FiMapPin,
  FiRefreshCw,
  FiTag,
} from "react-icons/fi";

interface FoodFiltersProps {
  categories: string[];
  locations: string[];
  category: string;
  location: string;
  expiryDate: string;
  onCategoryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onExpiryDateChange: (value: string) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
  disabled?: boolean;
}

const selectClassName =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition hover:border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-800 dark:bg-black dark:text-zinc-200 dark:hover:border-emerald-600 dark:focus:border-emerald-400";

const FoodFilters: React.FC<FoodFiltersProps> = ({
  categories,
  locations,
  category,
  location,
  expiryDate,
  onCategoryChange,
  onLocationChange,
  onExpiryDateChange,
  onReset,
  hasActiveFilters,
  disabled = false,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
            <FiFilter />
          </span>

          <div>
            <h2 className="text-sm font-bold text-slate-800 dark:text-white">
              Filter Foods
            </h2>

            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Filter by category, location or expiry date
            </p>
          </div>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            disabled={disabled}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-rose-400 dark:hover:bg-rose-950/30"
          >
            <FiRefreshCw />
            Clear
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {/* No category selector is shown when no available category exists. */}
        {categories.length > 0 && (
          <label className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-zinc-400">
              <FiTag className="text-emerald-500" />
              Category
            </span>

            <select
              value={category}
              disabled={disabled}
              onChange={(event) =>
                onCategoryChange(event.target.value)
              }
              className={selectClassName}
            >
              <option value="">All categories</option>

              {categories.map((categoryName) => (
                <option
                  key={categoryName}
                  value={categoryName}
                >
                  {categoryName}
                </option>
              ))}
            </select>
          </label>
        )}

        {/* No location selector is shown when no available location exists. */}
        {locations.length > 0 && (
          <label className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-zinc-400">
              <FiMapPin className="text-emerald-500" />
              Location
            </span>

            <select
              value={location}
              disabled={disabled}
              onChange={(event) =>
                onLocationChange(event.target.value)
              }
              className={selectClassName}
            >
              <option value="">All locations</option>

              {locations.map((locationName) => (
                <option
                  key={locationName}
                  value={locationName}
                >
                  {locationName}
                </option>
              ))}
            </select>
          </label>
        )}

        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-zinc-400">
            <FiCalendar className="text-emerald-500" />
            Expiry date
          </span>

          <input
            type="date"
            value={expiryDate}
            disabled={disabled}
            onChange={(event) =>
              onExpiryDateChange(event.target.value)
            }
            className={selectClassName}
          />
        </label>
      </div>
    </div>
  );
};

export default FoodFilters;