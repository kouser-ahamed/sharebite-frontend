"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MdFoodBank,
  MdDescription,
  MdLocationOn,
  MdPerson,
  MdCategory,
  MdCalendarToday,
  MdImage,
} from "react-icons/md";
import { FiClock } from "react-icons/fi";

const ShareFoodPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  // Authentication check
  useEffect(() => {
    if (isPending) return;
    if (!user) {
      router.replace("/login");
    }
  }, [isPending, user, router]);

  const [formData, setFormData] = useState({
    foodName: "",
    category: "",
    shortDescription: "",
    fullDescription: "",
    location: "",
    ownerName: "",
    imageUrl: "",
    expiryDate: "",
    preparationDate: "",
    servingSize: "",
    contactNumber: "",
    isHalal: "no",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      foodName,
      category,
      shortDescription,
      fullDescription,
      location,
      ownerName,
      imageUrl,
      expiryDate,
      preparationDate,
      servingSize,
      contactNumber,
      isHalal,
    } = formData;

    // Validation
    if (!foodName.trim()) {
      toast.error("Please enter food name", { position: "top-right", autoClose: 1500 });
      return;
    }
    if (!category.trim()) {
      toast.error("Please enter a category", { position: "top-right", autoClose: 1500 });
      return;
    }
    if (!shortDescription.trim()) {
      toast.error("Please enter a short description", { position: "top-right", autoClose: 1500 });
      return;
    }
    if (!fullDescription.trim()) {
      toast.error("Please enter a full description", { position: "top-right", autoClose: 1500 });
      return;
    }
    if (!location.trim()) {
      toast.error("Please enter the location", { position: "top-right", autoClose: 1500 });
      return;
    }
    if (!ownerName.trim()) {
      toast.error("Please enter your name", { position: "top-right", autoClose: 1500 });
      return;
    }
    if (!expiryDate) {
      toast.error("Please select expiry date", { position: "top-right", autoClose: 1500 });
      return;
    }

    const payload = {
      foodName,
      category: category.trim(),
      shortDescription,
      fullDescription,
      location,
      ownerName,
      imageUrl,
      expiryDate,
      preparationDate,
      servingSize,
      contactNumber,
      isHalal: isHalal === "yes" ? true : false,
      userId: user?.id || "",
      userEmail: user?.email || "",
      status: "available",
    };

    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/food-share`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Food shared successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
        // Reset form
        setFormData({
          foodName: "",
          category: "",
          shortDescription: "",
          fullDescription: "",
          location: "",
          ownerName: "",
          imageUrl: "",
          expiryDate: "",
          preparationDate: "",
          servingSize: "",
          contactNumber: "",
          isHalal: "no",
        });
      } else {
        toast.error(data.message || "Failed to share food", {
          position: "top-right",
          autoClose: 1500,
        });
      }
    } catch (error) {
      toast.error("Something went wrong!", { position: "top-right", autoClose: 1500 });
      console.error("Share food error:", error);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-500 dark:border-emerald-400 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <ToastContainer />
      <div className="relative min-h-screen overflow-hidden bg-[#FAFAF7] dark:bg-slate-900 px-4 py-8 sm:px-6 lg:px-8">
        {/* Background Pattern */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-50 dark:opacity-20" />

        <div className="relative mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  <MdFoodBank className="text-emerald-500 dark:text-emerald-400 text-sm" />
                  Share Food
                </div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-800 dark:text-white">
                  Share Your <span className="text-emerald-500 dark:text-emerald-400">Food</span>
                </h1>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
                  Share your homemade food with the community. Help reduce food waste and spread joy!
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 px-4 py-2.5 border border-slate-200 dark:border-slate-700">
                <div className="h-9 w-9 rounded-full bg-emerald-500 dark:bg-emerald-500 flex items-center justify-center text-white font-semibold text-sm">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div className="text-left">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Sharing as</p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white truncate max-w-[120px]">
                    {user?.name || "User"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
            <div className="border-b border-slate-200 dark:border-slate-700 bg-emerald-500 dark:bg-emerald-500 px-6 py-5 sm:px-8">
              <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                Food Details
              </h2>
              <p className="mt-1 text-sm text-emerald-50 dark:text-emerald-100">
                Fill in the details below to share your food with the community.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 px-5 py-6 sm:px-8 sm:py-8">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Food Name */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-4 shadow-sm transition-all hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md md:col-span-2">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <MdFoodBank className="text-emerald-500 dark:text-emerald-400" />
                    Food Name <span className="text-red-500 dark:text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="foodName"
                    value={formData.foodName}
                    onChange={handleChange}
                    placeholder="e.g. Chicken Biryani, Beef Curry"
                    className="h-12 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 text-sm outline-none transition placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-800 dark:text-white focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/20 hover:border-emerald-300 dark:hover:border-emerald-500"
                    required
                  />
                </div>

                {/* Category - Input Field */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-4 shadow-sm transition-all hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md md:col-span-2">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <MdCategory className="text-emerald-500 dark:text-emerald-400" />
                    Category <span className="text-red-500 dark:text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. Biryani, Curry, Dessert, Fast Food, etc."
                    className="h-12 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 text-sm outline-none transition placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-800 dark:text-white focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/20 hover:border-emerald-300 dark:hover:border-emerald-500"
                    required
                  />
                  <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <span className="text-emerald-500 dark:text-emerald-400">✦</span> You can enter any category you like
                  </p>
                </div>

                {/* Is Halal - Select Box */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-4 shadow-sm transition-all hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <MdFoodBank className="text-emerald-500 dark:text-emerald-400" />
                    Halal Certified <span className="text-red-500 dark:text-red-400">*</span>
                  </label>
                  <select
                    name="isHalal"
                    value={formData.isHalal}
                    onChange={handleChange}
                    className="h-12 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 text-sm outline-none transition text-slate-800 dark:text-white focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/20 hover:border-emerald-300 dark:hover:border-emerald-500"
                    required
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>

                {/* Short Description */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-4 shadow-sm transition-all hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md md:col-span-2">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <MdDescription className="text-emerald-500 dark:text-emerald-400" />
                    Short Description <span className="text-red-500 dark:text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    placeholder="Brief description (e.g. Authentic homemade biryani)"
                    className="h-12 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 text-sm outline-none transition placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-800 dark:text-white focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/20 hover:border-emerald-300 dark:hover:border-emerald-500"
                    required
                    maxLength={100}
                  />
                  <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                    {formData.shortDescription.length}/100 characters
                  </p>
                </div>

                {/* Full Description */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-4 shadow-sm transition-all hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md md:col-span-2">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <MdDescription className="text-emerald-500 dark:text-emerald-400" />
                    Full Description <span className="text-red-500 dark:text-red-400">*</span>
                  </label>
                  <textarea
                    name="fullDescription"
                    value={formData.fullDescription}
                    onChange={handleChange}
                    placeholder="Detailed description about the food, ingredients, cooking method, etc."
                    rows={4}
                    className="w-full resize-none rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-800 dark:text-white focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/20 hover:border-emerald-300 dark:hover:border-emerald-500"
                    required
                  />
                </div>

                {/* Location */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-4 shadow-sm transition-all hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <MdLocationOn className="text-emerald-500 dark:text-emerald-400" />
                    Location <span className="text-red-500 dark:text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Dhanmondi, Dhaka"
                    className="h-12 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 text-sm outline-none transition placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-800 dark:text-white focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/20 hover:border-emerald-300 dark:hover:border-emerald-500"
                    required
                  />
                </div>

                {/* Owner Name */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-4 shadow-sm transition-all hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <MdPerson className="text-emerald-500 dark:text-emerald-400" />
                    Your Name <span className="text-red-500 dark:text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="h-12 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 text-sm outline-none transition placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-800 dark:text-white focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/20 hover:border-emerald-300 dark:hover:border-emerald-500"
                    required
                  />
                </div>

                {/* Image URL */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-4 shadow-sm transition-all hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <MdImage className="text-emerald-500 dark:text-emerald-400" />
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/..."
                    className="h-12 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 text-sm outline-none transition placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-800 dark:text-white focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/20 hover:border-emerald-300 dark:hover:border-emerald-500"
                  />
                </div>

                {/* Preparation Date */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-4 shadow-sm transition-all hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <FiClock className="text-emerald-500 dark:text-emerald-400" />
                    Preparation Date
                  </label>
                  <input
                    type="datetime-local"
                    name="preparationDate"
                    value={formData.preparationDate}
                    onChange={handleChange}
                    className="h-12 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 text-sm outline-none transition text-slate-800 dark:text-white focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/20 hover:border-emerald-300 dark:hover:border-emerald-500"
                  />
                </div>

                {/* Expiry Date */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-4 shadow-sm transition-all hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <MdCalendarToday className="text-emerald-500 dark:text-emerald-400" />
                    Expiry Date <span className="text-red-500 dark:text-red-400">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="h-12 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 text-sm outline-none transition text-slate-800 dark:text-white focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/20 hover:border-emerald-300 dark:hover:border-emerald-500"
                    required
                  />
                </div>

                {/* Serving Size */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-4 shadow-sm transition-all hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <MdFoodBank className="text-emerald-500 dark:text-emerald-400" />
                    Serving Size
                  </label>
                  <input
                    type="text"
                    name="servingSize"
                    value={formData.servingSize}
                    onChange={handleChange}
                    placeholder="e.g. 4-6 people, 1 kg"
                    className="h-12 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 text-sm outline-none transition placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-800 dark:text-white focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/20 hover:border-emerald-300 dark:hover:border-emerald-500"
                  />
                </div>

                {/* Contact Number */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-4 shadow-sm transition-all hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <MdPerson className="text-emerald-500 dark:text-emerald-400" />
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="e.g. 017XX-XXXXXX"
                    className="h-12 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 text-sm outline-none transition placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-800 dark:text-white focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/20 hover:border-emerald-300 dark:hover:border-emerald-500"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600 py-4 text-base font-semibold text-white shadow-md transition-all hover:shadow-lg active:scale-[0.98]"
              >
                <MdFoodBank className="inline mr-2 text-xl" />
                Share Food
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareFoodPage;