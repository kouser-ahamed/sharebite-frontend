"use client";

import React from "react";
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

interface FoodFormData {
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
  isHalal: string;
}

interface FoodFormProps {
  formData: FoodFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitBtnText?: string;
}

const FoodForm: React.FC<FoodFormProps> = ({
  formData,
  onChange,
  onSubmit,
  submitBtnText = "Share Food",
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6 px-5 py-6 sm:px-8 sm:py-8">
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
            value={formData.foodName}
            onChange={onChange}
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
            value={formData.category}
            onChange={onChange}
            placeholder="e.g. Biryani, Curry, Dessert, Fast Food, etc."
            className="h-12 w-full rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-black px-4 text-sm outline-none transition placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-800 dark:text-white focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/20 hover:border-emerald-300 dark:hover:border-emerald-500"
            required
          />
          <p className="mt-1.5 text-xs text-slate-500 dark:text-zinc-400 flex items-center gap-1">
            <span className="text-emerald-500 dark:text-emerald-400">✦</span> You can enter any category you like
          </p>
        </div>

        {/* Halal Certified & Location - Flex Container */}
        <div className="md:col-span-2 flex flex-col sm:flex-row gap-5 w-full overflow-hidden">
          {/* Is Halal */}
          <div className="flex-1 min-w-0 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-4 shadow-sm transition-all hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-zinc-300">
              <MdFoodBank className="text-emerald-500 dark:text-emerald-400" />
              Halal Certified <span className="text-red-500 dark:text-red-400">*</span>
            </label>
            <div className="relative w-full max-w-full overflow-hidden">
              <select
                name="isHalal"
                value={formData.isHalal}
                onChange={onChange}
                className="h-12 w-full max-w-full rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-black px-4 text-sm outline-none transition text-slate-800 dark:text-white focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/20 hover:border-emerald-300 dark:hover:border-emerald-500 truncate"
                required
              >
                <option value="no" className="bg-white dark:bg-zinc-950 text-slate-800 dark:text-white">No</option>
                <option value="yes" className="bg-white dark:bg-zinc-950 text-slate-800 dark:text-white">Yes</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div className="flex-1 min-w-0 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-4 shadow-sm transition-all hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-zinc-300">
              <MdLocationOn className="text-emerald-500 dark:text-emerald-400" />
              Location <span className="text-red-500 dark:text-red-400">*</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={onChange}
              placeholder="e.g. Dhanmondi, Dhaka"
              className="h-12 w-full rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-black px-4 text-sm outline-none transition placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-800 dark:text-white focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/20 hover:border-emerald-300 dark:hover:border-emerald-500"
              required
            />
          </div>
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
            value={formData.shortDescription}
            onChange={onChange}
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
            value={formData.fullDescription}
            onChange={onChange}
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
            value={formData.imageUrl}
            onChange={onChange}
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
            value={formData.preparationDate}
            onChange={onChange}
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
            value={formData.expiryDate}
            onChange={onChange}
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
            value={formData.servingSize}
            onChange={onChange}
            placeholder="e.g. 4-6 people, 1 kg"
            className="h-12 w-full rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-black px-4 text-sm outline-none transition placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-800 dark:text-white focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/20 hover:border-emerald-300 dark:hover:border-emerald-500"
          />
        </div>

        {/* Your Name & Contact Number - Flex Container (Placed at the very end) */}
        <div className="md:col-span-2 flex flex-col sm:flex-row gap-5 w-full">
          {/* Owner Name */}
          <div className="flex-1 min-w-0 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-4 shadow-sm transition-all hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-zinc-300">
              <MdPerson className="text-emerald-500 dark:text-emerald-400" />
              Your Name <span className="text-red-500 dark:text-red-400">*</span>
            </label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={onChange}
              placeholder="Your full name"
              className="h-12 w-full rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-black px-4 text-sm outline-none transition placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-800 dark:text-white focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/20 hover:border-emerald-300 dark:hover:border-emerald-500"
              required
            />
          </div>

          {/* Contact Number */}
          <div className="flex-1 min-w-0 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-4 shadow-sm transition-all hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-zinc-300">
              <MdPerson className="text-emerald-500 dark:text-emerald-400" />
              Contact Number
            </label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={onChange}
              placeholder="e.g. 017XX-XXXXXX"
              className="h-12 w-full rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-black px-4 text-sm outline-none transition placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-800 dark:text-white focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 dark:focus:ring-emerald-400/20 hover:border-emerald-300 dark:hover:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600 py-4 text-base font-semibold text-white shadow-md transition-all hover:shadow-lg active:scale-[0.98]"
      >
        <MdFoodBank className="inline mr-2 text-xl" />
        {submitBtnText}
      </button>
    </form>
  );
};

export default FoodForm;