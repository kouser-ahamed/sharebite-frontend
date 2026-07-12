"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { FiAlertTriangle, FiTrash2 } from "react-icons/fi";

interface DeleteFoodModalProps {
  foodId: string;
  foodName: string;
  isOpen: boolean;
  onClose: () => void;
  onDeleteSuccess: (id: string) => void;
  token: string;
}

const DeleteFoodModal = ({
  foodId,
  foodName,
  isOpen,
  onClose,
  onDeleteSuccess,
  token,
}: DeleteFoodModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/foods/${foodId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        onDeleteSuccess(foodId);
        onClose();
        toast.success("Food deleted successfully!");
      } else {
        toast.error(data.message || "Failed to delete food");
      }
    } catch (error) {
      console.error("Error deleting food:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-zinc-800">
        {/* Icon */}
        <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
          <FiTrash2 className="text-3xl text-red-600 dark:text-red-400" />
        </div>

        {/* Header */}
        <h2 className="text-xl font-bold text-slate-800 dark:text-white text-center mb-2">
          Delete Food
        </h2>

        {/* Content */}
        <div className="mb-6 text-center">
          <p className="text-slate-600 dark:text-zinc-400">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-slate-800 dark:text-white">"{foodName}"</span>?
          </p>
          <p className="text-sm text-red-500 dark:text-red-400 mt-2 flex items-center justify-center gap-1">
            <FiAlertTriangle className="text-lg" />
            This action cannot be undone.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 font-semibold hover:bg-slate-50 dark:hover:bg-zinc-800 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="flex-1 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition disabled:opacity-50"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFoodModal;