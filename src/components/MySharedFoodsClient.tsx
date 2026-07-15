"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { FiEdit, FiTrash2, FiEye, FiMapPin, FiClock } from "react-icons/fi";
import { MdFoodBank } from "react-icons/md";
import EditFoodModal from "./EditFoodModal";
import DeleteFoodModal from "./DeleteFoodModal";

interface Food {
  _id: string;
  foodName: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  location: string;
  ownerName: string;
  imageUrl: string;
  expiryDate: string;
  preparationDate: string;
  servingSize: string;
  contactNumber: string;
  isHalal: boolean;
  userId: string;
  userEmail: string;
  status: string;
  views: number;
  requests: number;
  createdAt: string;
  updatedAt: string;
}

interface MySharedFoodsClientProps {
  initialFoods: Food[];
  token: string;
  userId: string;
}

const MySharedFoodsClient = ({
  initialFoods,
  token,
  userId,
}: MySharedFoodsClientProps) => {
  const [foods, setFoods] = useState<Food[]>(initialFoods);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleUpdateSuccess = (updatedFood: Food) => {
    setFoods((prev) =>
      prev.map((f) => (f._id === updatedFood._id ? updatedFood : f))
    );
    toast.success("Food updated successfully!");
  };

  const handleDeleteSuccess = (id: string) => {
    setFoods((prev) => prev.filter((f) => f._id !== id));
    toast.success("Food deleted successfully!");
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] dark:bg-black px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-4 mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 mb-2">
              <MdFoodBank className="text-emerald-500 dark:text-emerald-400 text-sm" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                My Kitchen
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">
              My Shared Foods
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">
              Manage and track all the food items you have shared
            </p>
          </div>

          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl text-white px-5 py-3 shadow-lg">
            <p className="text-xs opacity-80">Total Items</p>
            <p className="text-2xl font-bold text-center">
              {foods.length}
            </p>
          </div>
        </div>

        {/* Cards */}
        {foods.length === 0 ? (
          <div className="text-center py-16 sm:py-20 bg-white dark:bg-zinc-900 rounded-2xl border-2 border-dashed border-slate-300 dark:border-zinc-700">
            <MdFoodBank className="text-5xl sm:text-6xl text-slate-300 dark:text-zinc-600 mx-auto mb-3" />

            <h3 className="text-lg sm:text-xl font-bold text-slate-600 dark:text-zinc-400">
              No Food Shared Yet
            </h3>

            <p className="text-sm text-slate-400 dark:text-zinc-500 mt-1">
              Start sharing your homemade food with the community!
            </p>

            <Link
              href="/share-food"
              className="mt-4 inline-block px-5 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
            >
              Share Food Now
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {foods.map((food) => (
              <div
                key={food._id}
                className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                {/* md responsive */}
                <div className="flex flex-col lg:flex-row">
                  {/* Image */}
                  <div className="relative w-full lg:w-52 h-56 lg:h-auto shrink-0 bg-slate-100 dark:bg-zinc-800">
                    {food.imageUrl ? (
                      <Image
                        src={food.imageUrl}
                        alt={food.foodName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <MdFoodBank className="text-6xl text-slate-300 dark:text-zinc-600" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5 flex flex-col lg:flex-row gap-5">
                    {/* Left */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                          {food.foodName}
                        </h3>

                        <span className="bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 text-xs px-3 py-1 rounded-full">
                          {food.category}
                        </span>

                        <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-zinc-400">
                          <FiMapPin className="text-emerald-500" />
                          {food.location}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400 line-clamp-2">
                        {food.shortDescription}
                      </p>

                      {/* Badges */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {food.isHalal ? (
                          <span className="inline-flex items-center gap-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            Halal
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 text-xs font-semibold px-3 py-1 rounded-full border border-slate-200 dark:border-zinc-700">
                            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                            Non-Halal
                          </span>
                        )}

                        <span
                          className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full border ${
                            food.status === "available"
                              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                              : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              food.status === "available"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          />
                          {food.status === "available"
                            ? "Available"
                            : "Booked"}
                        </span>
                      </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-full lg:w-auto flex flex-col md:flex-row lg:flex-col gap-4 lg:items-end">
                      {/* Date Card */}
                      <div className="bg-slate-50 dark:bg-zinc-800/50 rounded-xl p-3 min-w-full md:min-w-[260px] lg:min-w-[220px]">
                        <div className="flex items-center gap-2 text-xs mb-2">
                          <FiClock className="text-amber-500" />
                          <span className="text-slate-500 dark:text-zinc-400">
                            Preparation
                          </span>
                          <span className="font-medium text-slate-700 dark:text-zinc-300 ml-auto">
                            {formatDateTime(food.preparationDate)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs">
                          <FiClock className="text-rose-500" />
                          <span className="text-slate-500 dark:text-zinc-400">
                            Expiry
                          </span>
                          <span className="font-medium text-rose-600 dark:text-rose-400 ml-auto">
                            {formatDateTime(food.expiryDate)}
                          </span>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex justify-center md:justify-end gap-2">
                        <Link
                          href={`/all-foods/${food._id}`}
                          className="p-3 rounded-xl border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-800 transition"
                        >
                          <FiEye className="text-lg" />
                        </Link>

                        <button
                          onClick={() => {
                            setSelectedFood(food);
                            setIsEditModalOpen(true);
                          }}
                          className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition"
                        >
                          <FiEdit className="text-lg" />
                        </button>

                        <button
                          onClick={() => {
                            setSelectedFood(food);
                            setIsDeleteModalOpen(true);
                          }}
                          className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-100 transition"
                        >
                          <FiTrash2 className="text-lg" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedFood && (
        <>
          <EditFoodModal
            food={selectedFood}
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onUpdateSuccess={handleUpdateSuccess}
            token={token}
          />
          <DeleteFoodModal
            foodId={selectedFood._id}
            foodName={selectedFood.foodName}
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onDeleteSuccess={handleDeleteSuccess}
            token={token}
          />
        </>
      )}
    </div>
  );
};

export default MySharedFoodsClient;