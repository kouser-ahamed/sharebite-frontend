"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
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

interface EditFoodModalProps {
  food: Food;
  isOpen: boolean;
  onClose: () => void;
  onUpdateSuccess: (updatedFood: Food) => void;
  token: string;
}

const EditFoodModal = ({ food, isOpen, onClose, onUpdateSuccess, token }: EditFoodModalProps) => {
  const [formData, setFormData] = useState({
    foodName: "",
    category: "",
    shortDescription: "",
    fullDescription: "",
    location: "",
    imageUrl: "",
    expiryDate: "",
    preparationDate: "",
    servingSize: "",
    contactNumber: "",
    ownerName: "",
    isHalal: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  
  useEffect(() => {
    if (food) {
      setFormData({
        foodName: food.foodName || "",
        category: food.category || "",
        shortDescription: food.shortDescription || "",
        fullDescription: food.fullDescription || "",
        location: food.location || "",
        imageUrl: food.imageUrl || "",
        expiryDate: food.expiryDate ? food.expiryDate.substring(0, 16) : "",
        preparationDate: food.preparationDate ? food.preparationDate.substring(0, 16) : "",
        servingSize: food.servingSize || "",
        contactNumber: food.contactNumber || "",
        ownerName: food.ownerName || "",
        isHalal: food.isHalal || false,
      });
    }
  }, [food]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/foods/${food._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const updatedFood = data.data || { ...food, ...formData };
        onUpdateSuccess(updatedFood);
        onClose();
        toast.success("Food updated successfully!");
      } else {
        toast.error(data.message || "Failed to update food");
      }
    } catch (error) {
      console.error("Error updating food:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-zinc-800">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <MdFoodBank className="text-emerald-500" />
            Edit Food
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 px-5 py-6 sm:px-8 sm:py-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Food Name */}
            <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-4 shadow-sm transition-all hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md md:col-span-2">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-zinc-300">
                <MdFoodBank className="text-emerald-500 dark:text-emerald-400" />
                Food Name <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <input
                type="text"
                name="foodName"
                value={formData.foodName || ""}
                onChange={handleChange}
                placeholder="e.g. Chicken Biryani, Beef Curry"
                className="h-12 w-full rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-black px-4 text-sm outline-none transition placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-800 dark:text-white focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/20 hover:border-emerald-300 dark:hover:border-emerald-500"
                required
              />
            </div>

            {/* Category */}
            <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-4 shadow-sm transition-all hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md md:col-span-2">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-zinc-300">
                <MdCategory className="text-emerald-500 dark:text-emerald-400" />
                Category <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <input
                type="text"
                name="category"
                value={formData.category || ""}
                onChange={handleChange}
                placeholder="e.g. Biryani, Curry, Dessert, Fast Food, etc."
                className="h-12 w-full rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-black px-4 text-sm outline-none transition placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-800 dark:text-white focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/20 hover:border-emerald-300 dark:hover:border-emerald-500"
                required
              />
              <p className="mt-1.5 text-xs text-slate-500 dark:text-zinc-400 flex items-center gap-1">
                <span className="text-emerald-500 dark:text-emerald-400">✦</span> You can enter any category you like
              </p>
            </div>

            {/* Is Halal */}
            <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-4 shadow-sm transition-all hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-zinc-300">
                <MdFoodBank className="text-emerald-500 dark:text-emerald-400" />
                Halal Certified <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <select
                name="isHalal"
                value={formData.isHalal ? "yes" : "no"}
                onChange={(e) => setFormData({ ...formData, isHalal: e.target.value === "yes" })}
                className="h-12 w-full rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-black px-4 text-sm outline-none transition text-slate-800 dark:text-white focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/20 hover:border-emerald-300 dark:hover:border-emerald-500"
                required
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>

            {/* Location */}
            <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-4 shadow-sm transition-all hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-zinc-300">
                <MdLocationOn className="text-emerald-500 dark:text-emerald-400" />
                Location <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location || ""}
                onChange={handleChange}
                placeholder="e.g. Dhanmondi, Dhaka"
                className="h-12 w-full rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-black px-4 text-sm outline-none transition placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-800 dark:text-white focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/20 hover:border-emerald-300 dark:hover:border-emerald-500"
                required
              />
            </div>

            {/* Short Description */}
            <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-4 shadow-sm transition-all hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md md:col-span-2">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-zinc-300">
                <MdDescription className="text-emerald-500 dark:text-emerald-400" />
                Short Description <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <input
                type="text"
                name="shortDescription"
                value={formData.shortDescription || ""}
                onChange={handleChange}
                placeholder="Brief description (e.g. Authentic homemade biryani)"
                className="h-12 w-full rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-black px-4 text-sm outline-none transition placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-800 dark:text-white focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/20 hover:border-emerald-300 dark:hover:border-emerald-500"
                required
                maxLength={100}
              />
              <p className="mt-1.5 text-xs text-slate-500 dark:text-zinc-400">
                {formData.shortDescription.length}/100 characters
              </p>
            </div>

            {/* Full Description */}
            <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-4 shadow-sm transition-all hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md md:col-span-2">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-zinc-300">
                <MdDescription className="text-emerald-500 dark:text-emerald-400" />
                Full Description <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <textarea
                name="fullDescription"
                value={formData.fullDescription || ""}
                onChange={handleChange}
                placeholder="Detailed description about the food, ingredients, cooking method, etc."
                rows={4}
                className="w-full resize-none rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-black px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-800 dark:text-white focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/20 hover:border-emerald-300 dark:hover:border-emerald-500"
                required
              />
            </div>

            {/* Image URL */}
            <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-4 shadow-sm transition-all hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-zinc-300">
                <MdImage className="text-emerald-500 dark:text-emerald-400" />
                Image URL
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl || ""}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="h-12 w-full rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-black px-4 text-sm outline-none transition placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-800 dark:text-white focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/20 hover:border-emerald-300 dark:hover:border-emerald-500"
              />
            </div>

            {/* Preparation Date */}
            <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-4 shadow-sm transition-all hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-zinc-300">
                <FiClock className="text-emerald-500 dark:text-emerald-400" />
                Preparation Date
              </label>
              <input
                type="datetime-local"
                name="preparationDate"
                value={formData.preparationDate || ""}
                onChange={handleChange}
                className="h-12 w-full rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-black px-4 text-sm outline-none transition text-slate-800 dark:text-white focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/20 hover:border-emerald-300 dark:hover:border-emerald-500"
              />
            </div>

            {/* Expiry Date */}
            <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-4 shadow-sm transition-all hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-zinc-300">
                <MdCalendarToday className="text-emerald-500 dark:text-emerald-400" />
                Expiry Date <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <input
                type="datetime-local"
                name="expiryDate"
                value={formData.expiryDate || ""}
                onChange={handleChange}
                className="h-12 w-full rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-black px-4 text-sm outline-none transition text-slate-800 dark:text-white focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/20 hover:border-emerald-300 dark:hover:border-emerald-500"
                required
              />
            </div>

            {/* Serving Size */}
            <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-4 shadow-sm transition-all hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-zinc-300">
                <MdFoodBank className="text-emerald-500 dark:text-emerald-400" />
                Serving Size
              </label>
              <input
                type="text"
                name="servingSize"
                value={formData.servingSize || ""}
                onChange={handleChange}
                placeholder="e.g. 4-6 people, 1 kg"
                className="h-12 w-full rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-black px-4 text-sm outline-none transition placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-800 dark:text-white focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/20 hover:border-emerald-300 dark:hover:border-emerald-500"
              />
            </div>

            {/* Owner Name */}
            <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-4 shadow-sm transition-all hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-zinc-300">
                <MdPerson className="text-emerald-500 dark:text-emerald-400" />
                Your Name <span className="text-red-500 dark:text-red-400">*</span>
              </label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName || ""}
                onChange={handleChange}
                placeholder="Your full name"
                className="h-12 w-full rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-black px-4 text-sm outline-none transition placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-800 dark:text-white focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/20 hover:border-emerald-300 dark:hover:border-emerald-500"
                required
              />
            </div>

            {/* Contact Number */}
            <div className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-4 shadow-sm transition-all hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-zinc-300">
                <MdPerson className="text-emerald-500 dark:text-emerald-400" />
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber || ""}
                onChange={handleChange}
                placeholder="e.g. 017XX-XXXXXX"
                className="h-12 w-full rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-black px-4 text-sm outline-none transition placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-800 dark:text-white focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/20 hover:border-emerald-300 dark:hover:border-emerald-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600 py-4 text-base font-semibold text-white shadow-md transition-all hover:shadow-lg active:scale-[0.98] disabled:opacity-50"
          >
            <MdFoodBank className="inline mr-2 text-xl" />
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditFoodModal;