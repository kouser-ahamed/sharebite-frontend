"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdFoodBank } from "react-icons/md";
import FoodForm from "@/components/FoodForm"; // কম্পোনেন্ট পাথটি চেক করে নিবেন

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
    isHalal: "yes",
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
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-500 dark:border-emerald-400 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-slate-600 dark:text-zinc-400">Loading...</p>
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
      <div className="relative min-h-screen overflow-hidden bg-[#FAFAF7] dark:bg-black px-4 py-8 sm:px-6 lg:px-8">
        {/* Background Pattern */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-50 dark:opacity-10" />

        <div className="relative mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 dark:bg-emerald-950/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50">
                  <MdFoodBank className="text-emerald-500 dark:text-emerald-400 text-sm" />
                  Share Food
                </div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-800 dark:text-white">
                  Share Your <span className="text-emerald-500 dark:text-emerald-400">Food</span>
                </h1>
                <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400 max-w-lg leading-relaxed">
                  Share your homemade food with the community. Help reduce food waste and spread joy!
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 dark:bg-zinc-800/50 px-4 py-2.5 border border-slate-200 dark:border-zinc-800">
                <div className="h-9 w-9 rounded-full bg-emerald-500 dark:bg-emerald-500 flex items-center justify-center text-white font-semibold text-sm">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div className="text-left">
                  <p className="text-xs font-medium text-slate-500 dark:text-zinc-500">Sharing as</p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white truncate max-w-[120px]">
                    {user?.name || "User"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
            <div className="border-b border-slate-200 dark:border-zinc-800 bg-emerald-500 dark:bg-emerald-500 px-6 py-5 sm:px-8">
              <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                Food Details
              </h2>
              <p className="mt-1 text-sm text-emerald-50 dark:text-emerald-100">
                Fill in the details below to share your food with the community.
              </p>
            </div>

            {/* Reusable Form Component */}
            <FoodForm
              formData={formData}
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitBtnText="Share Food"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareFoodPage;