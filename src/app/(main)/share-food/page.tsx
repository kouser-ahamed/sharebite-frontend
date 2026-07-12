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
  MdAdd,
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

      console.log("Token Data:", tokenData);

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-amber-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-500 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
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
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50/60 via-white to-amber-50/40 px-4 py-8 sm:px-6 lg:px-8">
        {/* Background Pattern */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.025)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />

        <div className="relative mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 overflow-hidden rounded-3xl border border-white/70 bg-white/75 p-6 shadow-xl backdrop-blur-xl sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-50 via-amber-50 to-orange-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-700 border border-emerald-200">
                  <MdFoodBank className="text-emerald-600" />
                  Share Food
                </div>
                <h1 className="text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 bg-clip-text text-transparent">
                  Share Your Food
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                  Share your homemade food with the community. Help reduce food waste and spread joy!
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-br from-emerald-50 to-amber-50 px-4 py-2 border border-emerald-100">
                <div className="text-center">
                  <p className="text-xs font-medium text-slate-500">Sharing as</p>
                  <p className="text-sm font-bold text-emerald-700 truncate max-w-[120px]">
                    {user?.name || "User"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-xl backdrop-blur-xl">
            <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 px-6 py-5 sm:px-8">
              <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl">
                Food Details
              </h2>
              <p className="mt-1 text-sm text-white/85">
                Fill in the details below to share your food with the community.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 px-5 py-6 sm:px-8 sm:py-8">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Food Name */}
                <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-white via-emerald-50/30 to-white p-4 shadow-sm md:col-span-2">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <MdFoodBank className="text-emerald-600" />
                    Food Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="foodName"
                    value={formData.foodName}
                    onChange={handleChange}
                    placeholder="e.g. Chicken Biryani, Beef Curry"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    required
                  />
                </div>

                {/* Category - Input Field */}
                <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-white via-amber-50/30 to-white p-4 shadow-sm md:col-span-2">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <MdCategory className="text-amber-600" />
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. Biryani, Curry, Dessert, Fast Food, etc."
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
                    required
                  />
                  <p className="mt-1 text-xs text-slate-400">
                    You can enter any category you like (e.g. Bangladeshi, Indian, Chinese, etc.)
                  </p>
                </div>

                {/* Is Halal - Select Box */}
                <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-white via-emerald-50/30 to-white p-4 shadow-sm">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <MdFoodBank className="text-emerald-600" />
                    Halal Certified <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="isHalal"
                    value={formData.isHalal}
                    onChange={handleChange}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    required
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>

                {/* Short Description */}
                <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-white via-emerald-50/30 to-white p-4 shadow-sm md:col-span-2">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <MdDescription className="text-emerald-600" />
                    Short Description <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    placeholder="Brief description (e.g. Authentic homemade biryani)"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    required
                    maxLength={100}
                  />
                  <p className="mt-1 text-xs text-slate-400">
                    {formData.shortDescription.length}/100 characters
                  </p>
                </div>

                {/* Full Description */}
                <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-white via-amber-50/30 to-white p-4 shadow-sm md:col-span-2">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <MdDescription className="text-amber-600" />
                    Full Description <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="fullDescription"
                    value={formData.fullDescription}
                    onChange={handleChange}
                    placeholder="Detailed description about the food, ingredients, cooking method, etc."
                    rows={4}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
                    required
                  />
                </div>

                {/* Location */}
                <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-white via-cyan-50/30 to-white p-4 shadow-sm">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <MdLocationOn className="text-cyan-600" />
                    Location <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Dhanmondi, Dhaka"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10"
                    required
                  />
                </div>

                {/* Owner Name */}
                <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-white via-purple-50/30 to-white p-4 shadow-sm">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <MdPerson className="text-purple-600" />
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
                    required
                  />
                </div>

                {/* Image URL */}
                <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-white via-pink-50/30 to-white p-4 shadow-sm">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <MdImage className="text-pink-600" />
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/..."
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10"
                  />
                </div>

                {/* Preparation Date */}
                <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-white via-blue-50/30 to-white p-4 shadow-sm">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <FiClock className="text-blue-600" />
                    Preparation Date
                  </label>
                  <input
                    type="datetime-local"
                    name="preparationDate"
                    value={formData.preparationDate}
                    onChange={handleChange}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                {/* Expiry Date */}
                <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-white via-rose-50/30 to-white p-4 shadow-sm">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <MdCalendarToday className="text-rose-600" />
                    Expiry Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
                    required
                  />
                </div>

                {/* Serving Size */}
                <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-white via-orange-50/30 to-white p-4 shadow-sm">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <MdFoodBank className="text-orange-600" />
                    Serving Size
                  </label>
                  <input
                    type="text"
                    name="servingSize"
                    value={formData.servingSize}
                    onChange={handleChange}
                    placeholder="e.g. 4-6 people, 1 kg"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                  />
                </div>

                {/* Contact Number */}
                <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-white via-green-50/30 to-white p-4 shadow-sm">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <MdPerson className="text-green-600" />
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="e.g. 017XX-XXXXXX"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:scale-[1.01] hover:shadow-2xl"
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