// "use client";

// import React from "react";
// import { useParams } from "next/navigation";
// import FoodDetailsClient from "@/components/food-details/FoodDetailsClient";

// const FoodDetailsPage = () => {
//   const params = useParams<{
//     id: string;
//   }>();

//   const foodId = params?.id;

//   if (!foodId) {
//     return (
//       <main className="flex min-h-screen items-center justify-center bg-[#FAFAF7] px-4 dark:bg-black">
//         <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center dark:border-rose-900 dark:bg-rose-950/20">
//           <h1 className="text-xl font-bold text-rose-700 dark:text-rose-400">
//             Invalid food ID
//           </h1>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <FoodDetailsClient
//       foodId={foodId}
//     />
//   );
// };

// export default FoodDetailsPage;









//=====================




"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FiArrowLeft,
  FiHome,
} from "react-icons/fi";
import { MdFoodBank } from "react-icons/md";

import FoodDetailsClient from "@/components/food-details/FoodDetailsClient";

const FoodDetailsPage = () => {
  const params = useParams<{
    id: string;
  }>();

  const foodId = params?.id;

  if (!foodId) {
    return (
      <main className="relative flex min-h-[calc(100dvh-72px)] items-center justify-center overflow-hidden bg-[#FAFAF7] px-4 py-10 dark:bg-black">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:48px_48px] opacity-60 dark:opacity-10" />

        <div className="relative w-full max-w-xl rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-[0_25px_70px_-35px_rgba(5,150,105,0.35)] dark:border-zinc-800 dark:bg-zinc-900 sm:px-10">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <MdFoodBank />
          </div>

          <h1 className="mt-5 text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
            Food item not found
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm font-medium leading-6 text-slate-500 dark:text-zinc-400">
            This food item may have been removed,
            expired, or the link may be incorrect.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/all-foods"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              <FiArrowLeft />
              View All Foods
            </Link>

            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-emerald-400 hover:text-emerald-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-emerald-700 dark:hover:text-emerald-400"
            >
              <FiHome />
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <FoodDetailsClient
      foodId={foodId}
    />
  );
};

export default FoodDetailsPage;