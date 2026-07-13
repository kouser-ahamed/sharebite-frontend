"use client";

import React from "react";
import { useParams } from "next/navigation";
import FoodDetailsClient from "@/components/food-details/FoodDetailsClient";

const FoodDetailsPage = () => {
  const params = useParams<{
    id: string;
  }>();

  const foodId = params?.id;

  if (!foodId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAFAF7] px-4 dark:bg-black">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center dark:border-rose-900 dark:bg-rose-950/20">
          <h1 className="text-xl font-bold text-rose-700 dark:text-rose-400">
            Invalid food ID
          </h1>
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