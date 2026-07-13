"use client";

import React from "react";
import { FiSliders } from "react-icons/fi";

interface FoodSortSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const FoodSortSelect: React.FC<FoodSortSelectProps> = ({
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <label className="block w-full sm:w-64">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-zinc-400">
        <FiSliders className="text-emerald-500" />
        Sort foods
      </span>

      <select
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition hover:border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-800 dark:bg-black dark:text-zinc-200 dark:hover:border-emerald-600 dark:focus:border-emerald-400"
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="expirySoon">Expiry date: soonest</option>
        <option value="expiryLate">Expiry date: latest</option>
        <option value="nameAscending">Food name: A–Z</option>
        <option value="nameDescending">Food name: Z–A</option>
      </select>
    </label>
  );
};

export default FoodSortSelect;