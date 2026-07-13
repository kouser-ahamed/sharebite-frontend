"use client";

import React from "react";
import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

interface FoodPaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

type PageItem =
  | number
  | "left-ellipsis"
  | "right-ellipsis";

const createPageItems = (
  currentPage: number,
  totalPages: number
): PageItem[] => {
  if (totalPages <= 7) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );
  }

  const pageItems: PageItem[] = [1];

  if (currentPage > 4) {
    pageItems.push("left-ellipsis");
  }

  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(
    totalPages - 1,
    currentPage + 1
  );

  for (
    let page = startPage;
    page <= endPage;
    page += 1
  ) {
    pageItems.push(page);
  }

  if (currentPage < totalPages - 3) {
    pageItems.push("right-ellipsis");
  }

  pageItems.push(totalPages);

  return pageItems;
};

const FoodPagination: React.FC<FoodPaginationProps> = ({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
  disabled = false,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const pageItems = createPageItems(
    currentPage,
    totalPages
  );

  const buttonBaseClass =
    "flex h-10 min-w-10 items-center justify-center rounded-xl border text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <nav
      aria-label="Food pagination"
      className="mt-8 flex flex-wrap items-center justify-center gap-2"
    >
      <button
        type="button"
        disabled={
          disabled || !hasPreviousPage
        }
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        aria-label="Previous page"
        className={`${buttonBaseClass} border-slate-200 bg-white px-3 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-400`}
      >
        <FiChevronLeft />
        <span className="hidden sm:inline">
          Previous
        </span>
      </button>

      {pageItems.map((pageItem) => {
        if (typeof pageItem !== "number") {
          return (
            <span
              key={pageItem}
              className="flex h-10 min-w-8 items-center justify-center text-slate-400 dark:text-zinc-500"
            >
              …
            </span>
          );
        }

        const isCurrentPage =
          pageItem === currentPage;

        return (
          <button
            type="button"
            key={pageItem}
            disabled={disabled}
            onClick={() =>
              onPageChange(pageItem)
            }
            aria-current={
              isCurrentPage
                ? "page"
                : undefined
            }
            className={`${buttonBaseClass} ${
              isCurrentPage
                ? "border-emerald-500 bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-400"
            }`}
          >
            {pageItem}
          </button>
        );
      })}

      <button
        type="button"
        disabled={disabled || !hasNextPage}
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        aria-label="Next page"
        className={`${buttonBaseClass} border-slate-200 bg-white px-3 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-400`}
      >
        <span className="hidden sm:inline">
          Next
        </span>
        <FiChevronRight />
      </button>
    </nav>
  );
};

export default FoodPagination;