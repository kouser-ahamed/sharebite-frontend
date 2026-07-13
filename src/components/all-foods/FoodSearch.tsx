"use client";

import React from "react";
import { FiSearch, FiX } from "react-icons/fi";

interface FoodSearchProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const FoodSearch: React.FC<FoodSearchProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="relative w-full">
      <FiSearch
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 dark:text-zinc-500"
        aria-hidden="true"
      />

      <input
        type="search"
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by food name, category, location..."
        aria-label="Search available foods"
        className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-800 dark:bg-black dark:text-white dark:placeholder:text-zinc-500 dark:hover:border-emerald-600 dark:focus:border-emerald-400"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-white"
        >
          <FiX />
        </button>
      )}
    </div>
  );
};

export default FoodSearch;