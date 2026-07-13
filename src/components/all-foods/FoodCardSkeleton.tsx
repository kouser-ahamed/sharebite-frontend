import React from "react";

const FoodCardSkeleton: React.FC = () => {
  return (
    <div className="min-h-[520px] animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="h-48 bg-slate-200 dark:bg-zinc-800" />

      <div className="space-y-4 p-5">
        <div className="h-5 w-3/4 rounded bg-slate-200 dark:bg-zinc-800" />

        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-slate-100 dark:bg-zinc-800" />
          <div className="h-3 w-4/5 rounded bg-slate-100 dark:bg-zinc-800" />
        </div>

        <div className="h-10 rounded-xl bg-slate-100 dark:bg-zinc-800" />

        <div className="grid grid-cols-2 gap-3">
          <div className="h-16 rounded-xl bg-slate-100 dark:bg-zinc-800" />
          <div className="h-16 rounded-xl bg-slate-100 dark:bg-zinc-800" />
        </div>

        <div className="h-11 rounded-xl bg-slate-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
};

export default FoodCardSkeleton;