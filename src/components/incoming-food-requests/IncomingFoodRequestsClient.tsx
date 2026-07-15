// "use client";

// import React, {
//   FormEvent,
//   useCallback,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import Link from "next/link";
// import {
//   FiAlertCircle,
//   FiCalendar,
//   FiCheckCircle,
//   FiClock,
//   FiEye,
//   FiInbox,
//   FiLoader,
//   FiMail,
//   FiMapPin,
//   FiMessageSquare,
//   FiPhone,
//   FiShield,
//   FiTrash2,
//   FiUser,
//   FiX,
//   FiXCircle,
// } from "react-icons/fi";

// import { authClient } from "@/lib/auth-client";
// import type {
//   FoodRequestActionResponse,
//   FoodRequestItem,
//   FoodRequestListResponse,
//   FoodRequestStatus,
//   FoodRequestStatusCounts,
// } from "@/types/food-request";

// const EMPTY_COUNTS: FoodRequestStatusCounts = {
//   total: 0,
//   pending: 0,
//   approved: 0,
//   rejected: 0,
// };

// type DecisionType = "approved" | "rejected";

// interface FoodRequestGroup {
//   foodId: string;
//   foodName: string;
//   foodImageUrl: string;
//   foodCategory: string;
//   foodExpiryDate: string;
//   foodShortDescription: string;
//   foodLocation: string;
//   foodIsHalal: boolean;
//   foodStatus: string;
//   latestRequestDate: string;
//   requests: FoodRequestItem[];
//   pendingCount: number;
//   approvedCount: number;
//   rejectedCount: number;
// }

// type DeleteTarget =
//   | {
//       kind: "single";
//       request: FoodRequestItem;
//     }
//   | {
//       kind: "group";
//       group: FoodRequestGroup;
//     };

// const getServerUrl = (): string => {
//   const rawServerUrl =
//     process.env.NEXT_PUBLIC_SERVER_URL;

//   if (!rawServerUrl) {
//     throw new Error(
//       "NEXT_PUBLIC_SERVER_URL is not configured",
//     );
//   }

//   return rawServerUrl.replace(/\/+$/, "");
// };

// const formatDate = (
//   value?: string | null,
// ): string => {
//   if (!value) {
//     return "Not provided";
//   }

//   const dateOnlyMatch =
//     /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

//   const parsedDate = dateOnlyMatch
//     ? new Date(
//         Number(dateOnlyMatch[1]),
//         Number(dateOnlyMatch[2]) - 1,
//         Number(dateOnlyMatch[3]),
//       )
//     : new Date(value);

//   if (Number.isNaN(parsedDate.getTime())) {
//     return value;
//   }

//   return new Intl.DateTimeFormat("en-BD", {
//     dateStyle: "medium",
//     timeStyle:
//       !dateOnlyMatch && value.includes("T")
//         ? "short"
//         : undefined,
//   }).format(parsedDate);
// };

// const getStatusClasses = (
//   status: FoodRequestStatus,
// ): string => {
//   if (status === "approved") {
//     return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400";
//   }

//   if (status === "rejected") {
//     return "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-400";
//   }

//   return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-400";
// };

// const getFoodStatusClasses = (
//   status?: string,
// ): string => {
//   if (status === "booked") {
//     return "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-400";
//   }

//   if (status === "available") {
//     return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400";
//   }

//   return "border-slate-200 bg-slate-50 text-slate-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
// };

// interface StatCardProps {
//   label: string;
//   value: number;
//   icon: React.ReactNode;
// }

// const StatCard = ({
//   label,
//   value,
//   icon,
// }: StatCardProps) => {
//   return (
//     <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
//       <div className="flex items-center justify-between gap-3">
//         <div>
//           <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
//             {label}
//           </p>

//           <p className="mt-1 text-2xl font-black text-slate-800 dark:text-white">
//             {value}
//           </p>
//         </div>

//         <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-xl text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// };

// interface RequestsTableModalProps {
//   group: FoodRequestGroup;
//   onClose: () => void;
//   onDecision: (
//     request: FoodRequestItem,
//     decision: DecisionType,
//   ) => void;
//   onDeleteRequest: (request: FoodRequestItem) => void;
// }

// const RequestsTableModal = ({
//   group,
//   onClose,
//   onDecision,
//   onDeleteRequest,
// }: RequestsTableModalProps) => {
//   return (
//     <div
//       className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-5"
//       role="dialog"
//       aria-modal="true"
//       aria-label="All requests for this food"
//       onMouseDown={(event) => {
//         if (event.target === event.currentTarget) {
//           onClose();
//         }
//       }}
//     >
//       <div className="max-h-[92vh] w-full max-w-7xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
//         <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-zinc-800">
//           <div className="min-w-0">
//             <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
//               {group.requests.length} Incoming Request
//               {group.requests.length === 1 ? "" : "s"}
//             </p>

//             <h2 className="mt-1 truncate text-xl font-black text-slate-800 dark:text-white sm:text-2xl">
//               {group.foodName}
//             </h2>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             className="flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100 dark:border-zinc-800 dark:hover:bg-zinc-900"
//             aria-label="Close modal"
//           >
//             <FiX />
//           </button>
//         </div>

//         <div className="max-h-[calc(92vh-82px)] overflow-y-auto p-5">
//           <div className="mb-5 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[120px_1fr] dark:border-zinc-800 dark:bg-zinc-900">
//             <div className="h-28 overflow-hidden rounded-xl bg-slate-200 dark:bg-zinc-800">
//               {/* eslint-disable-next-line @next/next/no-img-element */}
//               <img
//                 src={
//                   group.foodImageUrl ||
//                   "/assets/logo11.png"
//                 }
//                 alt={group.foodName}
//                 className="h-full w-full object-cover"
//                 onError={(event) => {
//                   event.currentTarget.src =
//                     "/assets/logo11.png";
//                 }}
//               />
//             </div>

//             <div>
//               <div className="flex flex-wrap items-center gap-2">
//                 <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-zinc-800 dark:text-zinc-300">
//                   {group.foodCategory}
//                 </span>

//                 <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-zinc-400">
//                   <FiMapPin className="text-emerald-500" />
//                   {group.foodLocation ||
//                     "Location not provided"}
//                 </span>

//                 <span
//                   className={`rounded-full border px-3 py-1 text-xs font-bold capitalize ${getFoodStatusClasses(
//                     group.foodStatus,
//                   )}`}
//                 >
//                   {group.foodStatus || "unknown"}
//                 </span>
//               </div>

//               <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-zinc-300">
//                 {group.foodShortDescription ||
//                   "No short description available"}
//               </p>
//             </div>
//           </div>

//           <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-zinc-800">
//             <table className="min-w-[1180px] w-full border-collapse text-left">
//               <thead className="bg-slate-50 dark:bg-zinc-900">
//                 <tr className="border-b border-slate-200 dark:border-zinc-800">
//                   <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
//                     Requester
//                   </th>
//                   <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
//                     Phone
//                   </th>
//                   <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
//                     Email
//                   </th>
//                   <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
//                     Address / Location
//                   </th>
//                   <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
//                     Request Description
//                   </th>
//                   <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
//                     Needed
//                   </th>
//                   <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
//                     Status
//                   </th>
//                   <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {group.requests.map((request) => (
//                   <tr
//                     key={request._id}
//                     className="border-b border-slate-100 align-top last:border-b-0 dark:border-zinc-800"
//                   >
//                     <td className="px-4 py-4">
//                       <div className="flex items-start gap-2">
//                         <FiUser className="mt-0.5 shrink-0 text-emerald-500" />
//                         <div>
//                           <p className="font-bold text-slate-800 dark:text-white">
//                             {request.requesterName}
//                           </p>
//                           <p className="mt-1 text-xs text-slate-400">
//                             {formatDate(request.requestDate)}
//                           </p>
//                         </div>
//                       </div>
//                     </td>

//                     <td className="px-4 py-4 text-sm font-medium text-slate-600 dark:text-zinc-300">
//                       {request.phoneNumber}
//                     </td>

//                     <td className="max-w-56 break-all px-4 py-4 text-sm text-slate-600 dark:text-zinc-300">
//                       {request.requesterEmail}
//                     </td>

//                     <td className="max-w-64 px-4 py-4 text-sm leading-5 text-slate-600 dark:text-zinc-300">
//                       {request.address}
//                     </td>

//                     <td className="max-w-72 px-4 py-4 text-sm leading-5 text-slate-600 dark:text-zinc-300">
//                       <p className="line-clamp-4">
//                         {request.requestDescription}
//                       </p>
//                     </td>

//                     <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-600 dark:text-zinc-300">
//                       {formatDate(request.neededDate)}
//                     </td>

//                     <td className="px-4 py-4">
//                       <span
//                         className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold capitalize ${getStatusClasses(
//                           request.status,
//                         )}`}
//                       >
//                         {request.status}
//                       </span>
//                     </td>

//                     <td className="px-4 py-4">
//                       <div className="flex justify-end gap-2">
//                         {request.status === "pending" && (
//                           <>
//                             <button
//                               type="button"
//                               onClick={() =>
//                                 onDecision(
//                                   request,
//                                   "approved",
//                                 )
//                               }
//                               className="flex size-9 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-900 dark:bg-emerald-950/20 dark:text-emerald-400"
//                               aria-label="Approve request"
//                               title="Approve request"
//                             >
//                               <FiCheckCircle />
//                             </button>

//                             <button
//                               type="button"
//                               onClick={() =>
//                                 onDecision(
//                                   request,
//                                   "rejected",
//                                 )
//                               }
//                               className="flex size-9 items-center justify-center rounded-lg border border-amber-200 bg-amber-50 text-amber-700 transition hover:bg-amber-100 dark:border-amber-900 dark:bg-amber-950/20 dark:text-amber-400"
//                               aria-label="Reject request"
//                               title="Reject request"
//                             >
//                               <FiXCircle />
//                             </button>
//                           </>
//                         )}

//                         <button
//                           type="button"
//                           onClick={() =>
//                             onDeleteRequest(request)
//                           }
//                           className="flex size-9 items-center justify-center rounded-lg border border-rose-200 bg-rose-50 text-rose-700 transition hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950/20 dark:text-rose-400"
//                           aria-label="Delete request"
//                           title="Delete request"
//                         >
//                           <FiTrash2 />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// interface DecisionModalProps {
//   request: FoodRequestItem;
//   initialDecision: DecisionType;
//   isSubmitting: boolean;
//   onClose: () => void;
//   onSubmit: (
//     decision: DecisionType,
//     values: {
//       pickupLocation: string;
//       contactNumber: string;
//       ownerMessage: string;
//       rejectionReason: string;
//     },
//   ) => Promise<void>;
// }

// const DecisionModal = ({
//   request,
//   initialDecision,
//   isSubmitting,
//   onClose,
//   onSubmit,
// }: DecisionModalProps) => {
//   const [decision, setDecision] =
//     useState<DecisionType>(initialDecision);

//   const [pickupLocation, setPickupLocation] =
//     useState(request.foodLocation || "");

//   const [contactNumber, setContactNumber] =
//     useState(request.foodOwnerContactNumber || "");

//   const [ownerMessage, setOwnerMessage] =
//     useState("");

//   const [rejectionReason, setRejectionReason] =
//     useState("");

//   const handleSubmit = async (
//     event: FormEvent<HTMLFormElement>,
//   ) => {
//     event.preventDefault();

//     await onSubmit(decision, {
//       pickupLocation,
//       contactNumber,
//       ownerMessage,
//       rejectionReason,
//     });
//   };

//   return (
//     <div
//       className="fixed inset-0 z-[115] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
//       role="dialog"
//       aria-modal="true"
//       aria-label="Approve or reject request"
//       onMouseDown={(event) => {
//         if (
//           event.target === event.currentTarget &&
//           !isSubmitting
//         ) {
//           onClose();
//         }
//       }}
//     >
//       <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
//         <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-zinc-800">
//           <div>
//             <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
//               Request Decision
//             </p>

//             <h2 className="mt-1 text-xl font-bold text-slate-800 dark:text-white">
//               {request.requesterName}
//             </h2>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             disabled={isSubmitting}
//             className="flex size-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 disabled:opacity-50 dark:border-zinc-800"
//             aria-label="Close decision modal"
//           >
//             <FiX />
//           </button>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-5 p-5 sm:p-6"
//         >
//           <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900">
//             <p className="font-bold text-slate-700 dark:text-zinc-200">
//               Why the requester needs this food
//             </p>
//             <p className="mt-2 leading-6 text-slate-600 dark:text-zinc-400">
//               {request.requestDescription}
//             </p>
//           </div>

//           <div className="grid grid-cols-2 gap-3">
//             <button
//               type="button"
//               onClick={() => setDecision("approved")}
//               className={`h-11 rounded-xl border text-sm font-bold transition ${
//                 decision === "approved"
//                   ? "border-emerald-600 bg-emerald-600 text-white"
//                   : "border-slate-200 bg-white text-slate-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
//               }`}
//             >
//               Approve
//             </button>

//             <button
//               type="button"
//               onClick={() => setDecision("rejected")}
//               className={`h-11 rounded-xl border text-sm font-bold transition ${
//                 decision === "rejected"
//                   ? "border-rose-600 bg-rose-600 text-white"
//                   : "border-slate-200 bg-white text-slate-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
//               }`}
//             >
//               Reject
//             </button>
//           </div>

//           {decision === "approved" ? (
//             <>
//               <div>
//                 <label
//                   htmlFor="pickupLocation"
//                   className="mb-2 block text-sm font-semibold text-slate-700 dark:text-zinc-300"
//                 >
//                   Pickup Location
//                 </label>

//                 <textarea
//                   id="pickupLocation"
//                   value={pickupLocation}
//                   onChange={(event) =>
//                     setPickupLocation(event.target.value)
//                   }
//                   rows={3}
//                   required
//                   minLength={5}
//                   maxLength={300}
//                   placeholder="Where should the requester collect the food?"
//                   className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="ownerContactNumber"
//                   className="mb-2 block text-sm font-semibold text-slate-700 dark:text-zinc-300"
//                 >
//                   Contact Number
//                 </label>

//                 <input
//                   id="ownerContactNumber"
//                   type="tel"
//                   value={contactNumber}
//                   onChange={(event) =>
//                     setContactNumber(event.target.value)
//                   }
//                   required
//                   minLength={6}
//                   maxLength={20}
//                   placeholder="Contact number for pickup"
//                   className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="ownerMessage"
//                   className="mb-2 block text-sm font-semibold text-slate-700 dark:text-zinc-300"
//                 >
//                   Short Message
//                 </label>

//                 <textarea
//                   id="ownerMessage"
//                   value={ownerMessage}
//                   onChange={(event) =>
//                     setOwnerMessage(event.target.value)
//                   }
//                   rows={4}
//                   required
//                   minLength={3}
//                   maxLength={500}
//                   placeholder="Write pickup instructions or a short message..."
//                   className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
//                 />
//               </div>

//               <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-700 dark:border-amber-900 dark:bg-amber-950/20 dark:text-amber-400">
//                 Approving will book the food and automatically reject the other pending requests for this food.
//               </div>
//             </>
//           ) : (
//             <div>
//               <label
//                 htmlFor="rejectionReason"
//                 className="mb-2 block text-sm font-semibold text-slate-700 dark:text-zinc-300"
//               >
//                 Rejection Reason
//               </label>

//               <textarea
//                 id="rejectionReason"
//                 value={rejectionReason}
//                 onChange={(event) =>
//                   setRejectionReason(event.target.value)
//                 }
//                 rows={5}
//                 required
//                 minLength={3}
//                 maxLength={500}
//                 placeholder="Explain why the request is being rejected..."
//                 className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
//               />
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-6 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
//               decision === "approved"
//                 ? "bg-emerald-600 hover:bg-emerald-700"
//                 : "bg-rose-600 hover:bg-rose-700"
//             }`}
//           >
//             {isSubmitting ? (
//               <>
//                 <FiLoader className="animate-spin" />
//                 Saving Decision...
//               </>
//             ) : decision === "approved" ? (
//               <>
//                 <FiCheckCircle />
//                 Confirm Approval
//               </>
//             ) : (
//               <>
//                 <FiXCircle />
//                 Confirm Rejection
//               </>
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// interface DeleteConfirmModalProps {
//   target: DeleteTarget;
//   isDeleting: boolean;
//   onClose: () => void;
//   onConfirm: () => Promise<void>;
// }

// const DeleteConfirmModal = ({
//   target,
//   isDeleting,
//   onClose,
//   onConfirm,
// }: DeleteConfirmModalProps) => {
//   const isGroup = target.kind === "group";

//   const title = isGroup
//     ? "Delete All Requests for This Food?"
//     : "Delete This Incoming Request?";

//   const foodName = isGroup
//     ? target.group.foodName
//     : target.request.foodName;

//   const requestCount = isGroup
//     ? target.group.requests.length
//     : 1;

//   return (
//     <div
//       className="fixed inset-0 z-[125] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
//       role="dialog"
//       aria-modal="true"
//       aria-label="Delete incoming request"
//       onMouseDown={(event) => {
//         if (
//           event.target === event.currentTarget &&
//           !isDeleting
//         ) {
//           onClose();
//         }
//       }}
//     >
//       <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
//         <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-rose-50 text-2xl text-rose-600 dark:bg-rose-950/30 dark:text-rose-400">
//           <FiTrash2 />
//         </div>

//         <h2 className="mt-4 text-center text-xl font-bold text-slate-800 dark:text-white">
//           {title}
//         </h2>

//         <p className="mt-2 text-center text-sm leading-6 text-slate-500 dark:text-zinc-400">
//           {requestCount} request
//           {requestCount === 1 ? "" : "s"} for{" "}
//           <strong>{foodName}</strong> will be permanently removed from the food-requests collection.
//         </p>

//         <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-700 dark:border-amber-900 dark:bg-amber-950/20 dark:text-amber-400">
//           Deleting an approved request does not change the food back to available. A booked food remains booked.
//         </p>

//         <div className="mt-6 grid grid-cols-2 gap-3">
//           <button
//             type="button"
//             onClick={onClose}
//             disabled={isDeleting}
//             className="h-11 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
//           >
//             Keep Requests
//           </button>

//           <button
//             type="button"
//             onClick={() => void onConfirm()}
//             disabled={isDeleting}
//             className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-rose-600 text-sm font-bold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             {isDeleting ? (
//               <FiLoader className="animate-spin" />
//             ) : (
//               <FiTrash2 />
//             )}
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const IncomingFoodRequestsClient = () => {
//   const sessionResult = authClient.useSession();

//   const user = sessionResult.data?.user;
//   const userId = user?.id;
//   const isSessionPending = sessionResult.isPending;

//   const [requests, setRequests] = useState<
//     FoodRequestItem[]
//   >([]);

//   const [counts, setCounts] =
//     useState<FoodRequestStatusCounts>(EMPTY_COUNTS);

//   const [selectedGroup, setSelectedGroup] =
//     useState<FoodRequestGroup | null>(null);

//   const [decisionRequest, setDecisionRequest] =
//     useState<FoodRequestItem | null>(null);

//   const [initialDecision, setInitialDecision] =
//     useState<DecisionType>("approved");

//   const [deleteTarget, setDeleteTarget] =
//     useState<DeleteTarget | null>(null);

//   const [isDeleting, setIsDeleting] =
//     useState(false);

//   const [isSubmittingDecision, setIsSubmittingDecision] =
//     useState(false);

//   const [isLoading, setIsLoading] =
//     useState(true);

//   const [errorMessage, setErrorMessage] =
//     useState("");

//   const [successMessage, setSuccessMessage] =
//     useState("");

//   const groups = useMemo<FoodRequestGroup[]>(() => {
//     const groupMap = new Map<string, FoodRequestItem[]>();

//     for (const request of requests) {
//       const existing = groupMap.get(request.foodId) || [];
//       existing.push(request);
//       groupMap.set(request.foodId, existing);
//     }

//     return Array.from(groupMap.entries())
//       .map(([foodId, foodRequests]) => {
//         const sortedRequests = [...foodRequests].sort(
//           (first, second) =>
//             new Date(second.requestDate).getTime() -
//             new Date(first.requestDate).getTime(),
//         );

//         const firstRequest = sortedRequests[0];

//         return {
//           foodId,
//           foodName: firstRequest.foodName,
//           foodImageUrl: firstRequest.foodImageUrl,
//           foodCategory: firstRequest.foodCategory,
//           foodExpiryDate: firstRequest.foodExpiryDate,
//           foodShortDescription:
//             firstRequest.foodShortDescription,
//           foodLocation: firstRequest.foodLocation,
//           foodIsHalal: firstRequest.foodIsHalal,
//           foodStatus: firstRequest.foodStatus,
//           latestRequestDate: firstRequest.requestDate,
//           requests: sortedRequests,
//           pendingCount: sortedRequests.filter(
//             (request) => request.status === "pending",
//           ).length,
//           approvedCount: sortedRequests.filter(
//             (request) => request.status === "approved",
//           ).length,
//           rejectedCount: sortedRequests.filter(
//             (request) => request.status === "rejected",
//           ).length,
//         };
//       })
//       .sort(
//         (first, second) =>
//           new Date(second.latestRequestDate).getTime() -
//           new Date(first.latestRequestDate).getTime(),
//       );
//   }, [requests]);

//   const loadRequests = useCallback(async () => {
//     if (!userId) {
//       setRequests([]);
//       setCounts(EMPTY_COUNTS);
//       setIsLoading(false);
//       return;
//     }

//     setIsLoading(true);
//     setErrorMessage("");

//     try {
//       const serverUrl = getServerUrl();

//       const {
//         data: tokenData,
//         error: tokenError,
//       } = await authClient.token();

//       if (tokenError || !tokenData?.token) {
//         throw new Error(
//           "Unable to verify your login session",
//         );
//       }

//       const response = await fetch(
//         `${serverUrl}/api/incoming-food-requests`,
//         {
//           method: "GET",
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${tokenData.token}`,
//           },
//           cache: "no-store",
//         },
//       );

//       const result =
//         (await response.json()) as FoodRequestListResponse;

//       if (!response.ok || !result.success) {
//         throw new Error(
//           result.message ||
//             "Failed to load incoming requests",
//         );
//       }

//       setRequests(
//         Array.isArray(result.data)
//           ? result.data
//           : [],
//       );

//       setCounts(
//         result.statusCounts || EMPTY_COUNTS,
//       );
//     } catch (error) {
//       console.error("Incoming requests error:", error);

//       setErrorMessage(
//         error instanceof Error
//           ? error.message
//           : "Failed to load incoming requests",
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (isSessionPending) {
//       return;
//     }

//     void loadRequests();
//   }, [isSessionPending, loadRequests]);

//   const openDecisionModal = (
//     request: FoodRequestItem,
//     decision: DecisionType,
//   ) => {
//     setInitialDecision(decision);
//     setDecisionRequest(request);
//   };

//   const handleDecision = async (
//     decision: DecisionType,
//     values: {
//       pickupLocation: string;
//       contactNumber: string;
//       ownerMessage: string;
//       rejectionReason: string;
//     },
//   ) => {
//     if (!decisionRequest) {
//       return;
//     }

//     setIsSubmittingDecision(true);
//     setErrorMessage("");
//     setSuccessMessage("");

//     try {
//       const serverUrl = getServerUrl();

//       const {
//         data: tokenData,
//         error: tokenError,
//       } = await authClient.token();

//       if (tokenError || !tokenData?.token) {
//         throw new Error(
//           "Unable to verify your login session",
//         );
//       }

//       const requestBody =
//         decision === "approved"
//           ? {
//               decision,
//               pickupLocation:
//                 values.pickupLocation.trim(),
//               contactNumber:
//                 values.contactNumber.trim(),
//               ownerMessage:
//                 values.ownerMessage.trim(),
//             }
//           : {
//               decision,
//               rejectionReason:
//                 values.rejectionReason.trim(),
//             };

//       const response = await fetch(
//         `${serverUrl}/api/incoming-food-requests/${decisionRequest._id}/decision`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             Authorization: `Bearer ${tokenData.token}`,
//           },
//           body: JSON.stringify(requestBody),
//         },
//       );

//       const result =
//         (await response.json()) as FoodRequestActionResponse;

//       if (!response.ok || !result.success) {
//         throw new Error(
//           result.message ||
//             "Failed to save the request decision",
//         );
//       }

//       setSuccessMessage(result.message);
//       setDecisionRequest(null);
//       setSelectedGroup(null);

//       await loadRequests();
//     } catch (error) {
//       console.error("Request decision error:", error);

//       setErrorMessage(
//         error instanceof Error
//           ? error.message
//           : "Failed to save the request decision",
//       );
//     } finally {
//       setIsSubmittingDecision(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!deleteTarget) {
//       return;
//     }

//     setIsDeleting(true);
//     setErrorMessage("");
//     setSuccessMessage("");

//     try {
//       const serverUrl = getServerUrl();

//       const {
//         data: tokenData,
//         error: tokenError,
//       } = await authClient.token();

//       if (tokenError || !tokenData?.token) {
//         throw new Error(
//           "Unable to verify your login session",
//         );
//       }

//       const endpoint =
//         deleteTarget.kind === "single"
//           ? `${serverUrl}/api/incoming-food-requests/${deleteTarget.request._id}`
//           : `${serverUrl}/api/incoming-food-requests/food/${deleteTarget.group.foodId}`;

//       const response = await fetch(endpoint, {
//         method: "DELETE",
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${tokenData.token}`,
//         },
//       });

//       const result =
//         (await response.json()) as FoodRequestActionResponse;

//       if (!response.ok || !result.success) {
//         throw new Error(
//           result.message ||
//             "Failed to delete the request",
//         );
//       }

//       setSuccessMessage(result.message);
//       setDeleteTarget(null);
//       setSelectedGroup(null);

//       await loadRequests();
//     } catch (error) {
//       console.error("Delete incoming request error:", error);

//       setErrorMessage(
//         error instanceof Error
//           ? error.message
//           : "Failed to delete the request",
//       );
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   if (isSessionPending || isLoading) {
//     return (
//       <main className="flex min-h-screen items-center justify-center bg-[#FAFAF7] px-4 dark:bg-black">
//         <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
//           <FiLoader className="animate-spin text-2xl text-emerald-500" />

//           <p className="font-semibold text-slate-700 dark:text-zinc-300">
//             Loading incoming requests...
//           </p>
//         </div>
//       </main>
//     );
//   }

//   if (!userId) {
//     return (
//       <main className="flex min-h-screen items-center justify-center bg-[#FAFAF7] px-4 dark:bg-black">
//         <div className="max-w-md rounded-3xl border border-amber-200 bg-white p-8 text-center shadow-sm dark:border-amber-900 dark:bg-zinc-900">
//           <FiAlertCircle className="mx-auto text-5xl text-amber-500" />

//           <h1 className="mt-4 text-2xl font-bold text-slate-800 dark:text-white">
//             Login Required
//           </h1>

//           <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">
//             Please log in to review requests received for your shared foods.
//           </p>

//           <Link
//             href="/login?callbackURL=/incoming-food-requests"
//             className="mt-5 inline-flex rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white"
//           >
//             Login to Continue
//           </Link>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="relative min-h-screen overflow-hidden bg-[#FAFAF7] py-8 dark:bg-black">
//       <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-50 dark:opacity-10" />

//       <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
//         <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
//           <div>
//             <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400">
//               <FiInbox />
//               Owner Dashboard
//             </div>

//             <h1 className="mt-3 text-3xl font-black text-slate-800 dark:text-white sm:text-4xl">
//               Incoming Food Requests
//             </h1>

//             <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-zinc-400">
//               Each card represents one food. Open the view modal to see every requester in a table and manage their requests.
//             </p>
//           </div>

//           <Link
//             href="/my-shared-foods"
//             className="inline-flex h-11 items-center justify-center rounded-xl border border-emerald-200 bg-white px-5 text-sm font-bold text-emerald-600 transition hover:bg-emerald-50 dark:border-emerald-900 dark:bg-zinc-900 dark:text-emerald-400"
//           >
//             My Shared Foods
//           </Link>
//         </div>

//         <div className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//           <StatCard
//             label="Total Received"
//             value={counts.total}
//             icon={<FiInbox />}
//           />

//           <StatCard
//             label="Pending"
//             value={counts.pending}
//             icon={<FiClock />}
//           />

//           <StatCard
//             label="Approved"
//             value={counts.approved}
//             icon={<FiCheckCircle />}
//           />

//           <StatCard
//             label="Rejected"
//             value={counts.rejected}
//             icon={<FiXCircle />}
//           />
//         </div>

//         {errorMessage && (
//           <div className="mb-5 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/20 dark:text-rose-400">
//             <FiAlertCircle className="mt-0.5 shrink-0" />
//             {errorMessage}
//           </div>
//         )}

//         {successMessage && (
//           <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/20 dark:text-emerald-400">
//             <FiCheckCircle className="mt-0.5 shrink-0" />
//             {successMessage}
//           </div>
//         )}

//         {groups.length === 0 ? (
//           <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-zinc-700 dark:bg-zinc-900">
//             <FiInbox className="mx-auto text-6xl text-slate-300 dark:text-zinc-700" />

//             <h2 className="mt-4 text-xl font-bold text-slate-700 dark:text-zinc-200">
//               No Incoming Requests
//             </h2>

//             <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-zinc-400">
//               No one has requested your shared foods yet.
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {groups.map((group) => (
//               <article
//                 key={group.foodId}
//                 className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
//               >
//                 <div className="flex flex-col lg:min-h-40 lg:flex-row">
//                   <div className="h-56 w-full shrink-0 overflow-hidden bg-slate-100 sm:h-64 lg:h-auto lg:w-52 dark:bg-zinc-800">
//                     {/* eslint-disable-next-line @next/next/no-img-element */}
//                     <img
//                       src={
//                         group.foodImageUrl ||
//                         "/assets/logo11.png"
//                       }
//                       alt={group.foodName}
//                       className="h-full w-full object-cover"
//                       onError={(event) => {
//                         event.currentTarget.src =
//                           "/assets/logo11.png";
//                       }}
//                     />
//                   </div>

//                   <div className="flex min-w-0 flex-1 flex-col justify-center p-5">
//                     <div className="flex flex-wrap items-center gap-2">
//                       <h2 className="text-xl font-black text-slate-800 dark:text-white">
//                         {group.foodName}
//                       </h2>

//                       <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 dark:bg-zinc-800 dark:text-zinc-300">
//                         {group.foodCategory}
//                       </span>

//                       <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-zinc-400">
//                         <FiMapPin className="text-emerald-500" />
//                         {group.foodLocation ||
//                           "Location not provided"}
//                       </span>
//                     </div>

//                     <p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-6 text-slate-500 dark:text-zinc-400">
//                       {group.foodShortDescription ||
//                         "No short description available"}
//                     </p>

//                     <div className="mt-4 flex flex-wrap gap-2">
//                       <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400">
//                         <span className="size-2 rounded-full bg-emerald-500" />
//                         {group.foodIsHalal
//                           ? "Halal"
//                           : "Halal not specified"}
//                       </span>

//                       <span
//                         className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold capitalize ${getFoodStatusClasses(
//                           group.foodStatus,
//                         )}`}
//                       >
//                         <span className="size-2 rounded-full bg-current" />
//                         {group.foodStatus || "unknown"}
//                       </span>

//                       <span className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700 dark:border-sky-900 dark:bg-sky-950/20 dark:text-sky-400">
//                         <FiUser />
//                         {group.requests.length} Request
//                         {group.requests.length === 1 ? "" : "s"}
//                       </span>

//                       {group.pendingCount > 0 && (
//                         <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 dark:border-amber-900 dark:bg-amber-950/20 dark:text-amber-400">
//                           {group.pendingCount} Pending
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex shrink-0 flex-col justify-between gap-4 border-t border-slate-200 p-5 lg:w-64 lg:border-l lg:border-t-0 dark:border-zinc-800">
//                     <div className="rounded-2xl bg-slate-50 p-4 text-xs dark:bg-zinc-800/70">
//                       <div className="flex items-center justify-between gap-3">
//                         <span className="inline-flex items-center gap-2 text-slate-500 dark:text-zinc-400">
//                           <FiClock className="text-sky-500" />
//                           Latest Request
//                         </span>

//                         <span className="text-right font-bold text-slate-700 dark:text-zinc-200">
//                           {formatDate(group.latestRequestDate)}
//                         </span>
//                       </div>

//                       <div className="mt-3 flex items-center justify-between gap-3">
//                         <span className="inline-flex items-center gap-2 text-slate-500 dark:text-zinc-400">
//                           <FiCalendar className="text-rose-500" />
//                           Expiry
//                         </span>

//                         <span className="text-right font-bold text-rose-600 dark:text-rose-400">
//                           {formatDate(group.foodExpiryDate)}
//                         </span>
//                       </div>

//                       <div className="mt-3 grid grid-cols-3 gap-2 text-center">
//                         <div className="rounded-lg bg-white p-2 dark:bg-zinc-900">
//                           <p className="font-black text-amber-600">
//                             {group.pendingCount}
//                           </p>
//                           <p className="mt-0.5 text-[10px] text-slate-400">
//                             Pending
//                           </p>
//                         </div>

//                         <div className="rounded-lg bg-white p-2 dark:bg-zinc-900">
//                           <p className="font-black text-emerald-600">
//                             {group.approvedCount}
//                           </p>
//                           <p className="mt-0.5 text-[10px] text-slate-400">
//                             Approved
//                           </p>
//                         </div>

//                         <div className="rounded-lg bg-white p-2 dark:bg-zinc-900">
//                           <p className="font-black text-rose-600">
//                             {group.rejectedCount}
//                           </p>
//                           <p className="mt-0.5 text-[10px] text-slate-400">
//                             Rejected
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex justify-end gap-3">
//                       <button
//                         type="button"
//                         onClick={() => setSelectedGroup(group)}
//                         className="flex size-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-emerald-900 dark:hover:bg-emerald-950/20 dark:hover:text-emerald-400"
//                         aria-label="View all requests"
//                         title="View all requests"
//                       >
//                         <FiEye />
//                       </button>

//                       <button
//                         type="button"
//                         onClick={() =>
//                           setDeleteTarget({
//                             kind: "group",
//                             group,
//                           })
//                         }
//                         className="flex size-11 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600 transition hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950/20 dark:text-rose-400"
//                         aria-label="Delete all requests for this food"
//                         title="Delete all requests for this food"
//                       >
//                         <FiTrash2 />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </article>
//             ))}
//           </div>
//         )}
//       </div>

//       {selectedGroup && (
//         <RequestsTableModal
//           group={selectedGroup}
//           onClose={() => setSelectedGroup(null)}
//           onDecision={openDecisionModal}
//           onDeleteRequest={(request) =>
//             setDeleteTarget({
//               kind: "single",
//               request,
//             })
//           }
//         />
//       )}

//       {decisionRequest && (
//         <DecisionModal
//           key={`${decisionRequest._id}-${initialDecision}`}
//           request={decisionRequest}
//           initialDecision={initialDecision}
//           isSubmitting={isSubmittingDecision}
//           onClose={() => {
//             if (!isSubmittingDecision) {
//               setDecisionRequest(null);
//             }
//           }}
//           onSubmit={handleDecision}
//         />
//       )}

//       {deleteTarget && (
//         <DeleteConfirmModal
//           target={deleteTarget}
//           isDeleting={isDeleting}
//           onClose={() => {
//             if (!isDeleting) {
//               setDeleteTarget(null);
//             }
//           }}
//           onConfirm={handleDelete}
//         />
//       )}
//     </main>
//   );
// };

// export default IncomingFoodRequestsClient;












"use client";

import React, {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import {
  FiAlertCircle,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiEye,
  FiInbox,
  FiLoader,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiPhone,
  FiShield,
  FiTrash2,
  FiUser,
  FiX,
  FiXCircle,
} from "react-icons/fi";

import { authClient } from "@/lib/auth-client";
import type {
  FoodRequestActionResponse,
  FoodRequestItem,
  FoodRequestListResponse,
  FoodRequestStatus,
  FoodRequestStatusCounts,
} from "@/types/food-request";

const EMPTY_COUNTS: FoodRequestStatusCounts = {
  total: 0,
  pending: 0,
  approved: 0,
  rejected: 0,
};

type DecisionType = "approved" | "rejected";

interface FoodRequestGroup {
  foodId: string;
  foodName: string;
  foodImageUrl: string;
  foodCategory: string;
  foodExpiryDate: string;
  foodShortDescription: string;
  foodLocation: string;
  foodIsHalal: boolean;
  foodStatus: string;
  latestRequestDate: string;
  requests: FoodRequestItem[];
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
}

type DeleteTarget =
  | {
      kind: "single";
      request: FoodRequestItem;
    }
  | {
      kind: "group";
      group: FoodRequestGroup;
    };

const getServerUrl = (): string => {
  const rawServerUrl =
    process.env.NEXT_PUBLIC_SERVER_URL;

  if (!rawServerUrl) {
    throw new Error(
      "NEXT_PUBLIC_SERVER_URL is not configured",
    );
  }

  return rawServerUrl.replace(/\/+$/, "");
};

const formatDate = (
  value?: string | null,
): string => {
  if (!value) {
    return "Not provided";
  }

  const dateOnlyMatch =
    /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  const parsedDate = dateOnlyMatch
    ? new Date(
        Number(dateOnlyMatch[1]),
        Number(dateOnlyMatch[2]) - 1,
        Number(dateOnlyMatch[3]),
      )
    : new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
    timeStyle:
      !dateOnlyMatch && value.includes("T")
        ? "short"
        : undefined,
  }).format(parsedDate);
};

const getStatusClasses = (
  status: FoodRequestStatus,
): string => {
  if (status === "approved") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400";
  }

  if (status === "rejected") {
    return "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-400";
  }

  return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-400";
};

const getFoodStatusClasses = (
  status?: string,
): string => {
  if (status === "booked") {
    return "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-400";
  }

  if (status === "available") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400";
  }

  return "border-slate-200 bg-slate-50 text-slate-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
};

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}

const StatCard = ({
  label,
  value,
  icon,
}: StatCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {label}
          </p>

          <p className="mt-1 text-2xl font-black text-slate-800 dark:text-white">
            {value}
          </p>
        </div>

        <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-xl text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
          {icon}
        </div>
      </div>
    </div>
  );
};

interface RequestsTableModalProps {
  group: FoodRequestGroup;
  onClose: () => void;
  onDecision: (
    request: FoodRequestItem,
    decision: DecisionType,
  ) => void;
  onDeleteRequest: (request: FoodRequestItem) => void;
}

const RequestsTableModal = ({
  group,
  onClose,
  onDecision,
  onDeleteRequest,
}: RequestsTableModalProps) => {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-label="All requests for this food"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="max-h-[92vh] w-full max-w-7xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-zinc-800">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              {group.requests.length} Incoming Request
              {group.requests.length === 1 ? "" : "s"}
            </p>

            <h2 className="mt-1 truncate text-xl font-black text-slate-800 dark:text-white sm:text-2xl">
              {group.foodName}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100 dark:border-zinc-800 dark:hover:bg-zinc-900"
            aria-label="Close modal"
          >
            <FiX />
          </button>
        </div>

        <div className="max-h-[calc(92vh-82px)] overflow-y-auto p-5">
          <div className="mb-5 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[120px_1fr] dark:border-zinc-800 dark:bg-zinc-900">
            <div className="h-28 overflow-hidden rounded-xl bg-slate-200 dark:bg-zinc-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  group.foodImageUrl ||
                  "/assets/logo11.png"
                }
                alt={group.foodName}
                className="h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.src =
                    "/assets/logo11.png";
                }}
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-zinc-800 dark:text-zinc-300">
                  {group.foodCategory}
                </span>

                <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-zinc-400">
                  <FiMapPin className="text-emerald-500" />
                  {group.foodLocation ||
                    "Location not provided"}
                </span>

                <span
                  className={`rounded-full border px-3 py-1 text-xs font-bold capitalize ${getFoodStatusClasses(
                    group.foodStatus,
                  )}`}
                >
                  {group.foodStatus || "unknown"}
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-zinc-300">
                {group.foodShortDescription ||
                  "No short description available"}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-zinc-800">
            <table className="min-w-[1180px] w-full border-collapse text-left">
              <thead className="bg-slate-50 dark:bg-zinc-900">
                <tr className="border-b border-slate-200 dark:border-zinc-800">
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Requester
                  </th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Email
                  </th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Address / Location
                  </th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Request Description
                  </th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Needed
                  </th>
                  <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {group.requests.map((request) => (
                  <tr
                    key={request._id}
                    className="border-b border-slate-100 align-top last:border-b-0 dark:border-zinc-800"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-start gap-2">
                        <FiUser className="mt-0.5 shrink-0 text-emerald-500" />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-white">
                            {request.requesterName}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {formatDate(request.requestDate)}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-sm font-medium text-slate-600 dark:text-zinc-300">
                      {request.phoneNumber}
                    </td>

                    <td className="max-w-56 break-all px-4 py-4 text-sm text-slate-600 dark:text-zinc-300">
                      {request.requesterEmail}
                    </td>

                    <td className="max-w-64 px-4 py-4 text-sm leading-5 text-slate-600 dark:text-zinc-300">
                      {request.address}
                    </td>

                    <td className="max-w-72 px-4 py-4 text-sm leading-5 text-slate-600 dark:text-zinc-300">
                      <p className="line-clamp-4">
                        {request.requestDescription}
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-600 dark:text-zinc-300">
                      {formatDate(request.neededDate)}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold capitalize ${getStatusClasses(
                          request.status,
                        )}`}
                      >
                        {request.status}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        {request.status === "pending" && (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                onDecision(
                                  request,
                                  "approved",
                                )
                              }
                              className="flex size-9 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-900 dark:bg-emerald-950/20 dark:text-emerald-400"
                              aria-label="Approve request"
                              title="Approve request"
                            >
                              <FiCheckCircle />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                onDecision(
                                  request,
                                  "rejected",
                                )
                              }
                              className="flex size-9 items-center justify-center rounded-lg border border-amber-200 bg-amber-50 text-amber-700 transition hover:bg-amber-100 dark:border-amber-900 dark:bg-amber-950/20 dark:text-amber-400"
                              aria-label="Reject request"
                              title="Reject request"
                            >
                              <FiXCircle />
                            </button>
                          </>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            onDeleteRequest(request)
                          }
                          className="flex size-9 items-center justify-center rounded-lg border border-rose-200 bg-rose-50 text-rose-700 transition hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950/20 dark:text-rose-400"
                          aria-label="Delete request"
                          title="Delete request"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DecisionModalProps {
  request: FoodRequestItem;
  initialDecision: DecisionType;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (
    decision: DecisionType,
    values: {
      pickupLocation: string;
      contactNumber: string;
      ownerMessage: string;
      rejectionReason: string;
    },
  ) => Promise<void>;
}

const DecisionModal = ({
  request,
  initialDecision,
  isSubmitting,
  onClose,
  onSubmit,
}: DecisionModalProps) => {
  const [decision, setDecision] =
    useState<DecisionType>(initialDecision);

  const [pickupLocation, setPickupLocation] =
    useState(request.foodLocation || "");

  const [contactNumber, setContactNumber] =
    useState(request.foodOwnerContactNumber || "");

  const [ownerMessage, setOwnerMessage] =
    useState("");

  const [rejectionReason, setRejectionReason] =
    useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    await onSubmit(decision, {
      pickupLocation,
      contactNumber,
      ownerMessage,
      rejectionReason,
    });
  };

  return (
    <div
      className="fixed inset-0 z-[115] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Approve or reject request"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !isSubmitting
        ) {
          onClose();
        }
      }}
    >
      <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-zinc-800">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Request Decision
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-800 dark:text-white">
              {request.requesterName}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex size-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 disabled:opacity-50 dark:border-zinc-800"
            aria-label="Close decision modal"
          >
            <FiX />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-5 sm:p-6"
        >
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900">
            <p className="font-bold text-slate-700 dark:text-zinc-200">
              Why the requester needs this food
            </p>
            <p className="mt-2 leading-6 text-slate-600 dark:text-zinc-400">
              {request.requestDescription}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setDecision("approved")}
              className={`h-11 rounded-xl border text-sm font-bold transition ${
                decision === "approved"
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
              }`}
            >
              Approve
            </button>

            <button
              type="button"
              onClick={() => setDecision("rejected")}
              className={`h-11 rounded-xl border text-sm font-bold transition ${
                decision === "rejected"
                  ? "border-rose-600 bg-rose-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
              }`}
            >
              Reject
            </button>
          </div>

          {decision === "approved" ? (
            <>
              <div>
                <label
                  htmlFor="pickupLocation"
                  className="mb-2 block text-sm font-semibold text-slate-700 dark:text-zinc-300"
                >
                  Pickup Location
                </label>

                <textarea
                  id="pickupLocation"
                  value={pickupLocation}
                  onChange={(event) =>
                    setPickupLocation(event.target.value)
                  }
                  rows={3}
                  required
                  minLength={5}
                  maxLength={300}
                  placeholder="Where should the requester collect the food?"
                  className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="ownerContactNumber"
                  className="mb-2 block text-sm font-semibold text-slate-700 dark:text-zinc-300"
                >
                  Contact Number
                </label>

                <input
                  id="ownerContactNumber"
                  type="tel"
                  value={contactNumber}
                  onChange={(event) =>
                    setContactNumber(event.target.value)
                  }
                  required
                  minLength={6}
                  maxLength={20}
                  placeholder="Contact number for pickup"
                  className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="ownerMessage"
                  className="mb-2 block text-sm font-semibold text-slate-700 dark:text-zinc-300"
                >
                  Short Message
                </label>

                <textarea
                  id="ownerMessage"
                  value={ownerMessage}
                  onChange={(event) =>
                    setOwnerMessage(event.target.value)
                  }
                  rows={4}
                  required
                  minLength={3}
                  maxLength={500}
                  placeholder="Write pickup instructions or a short message..."
                  className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                />
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-700 dark:border-amber-900 dark:bg-amber-950/20 dark:text-amber-400">
                Approving will book the food and automatically reject the other pending requests for this food.
              </div>
            </>
          ) : (
            <div>
              <label
                htmlFor="rejectionReason"
                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-zinc-300"
              >
                Rejection Reason
              </label>

              <textarea
                id="rejectionReason"
                value={rejectionReason}
                onChange={(event) =>
                  setRejectionReason(event.target.value)
                }
                rows={5}
                required
                minLength={3}
                maxLength={500}
                placeholder="Explain why the request is being rejected..."
                className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-6 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
              decision === "approved"
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-rose-600 hover:bg-rose-700"
            }`}
          >
            {isSubmitting ? (
              <>
                <FiLoader className="animate-spin" />
                Saving Decision...
              </>
            ) : decision === "approved" ? (
              <>
                <FiCheckCircle />
                Confirm Approval
              </>
            ) : (
              <>
                <FiXCircle />
                Confirm Rejection
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

interface DeleteConfirmModalProps {
  target: DeleteTarget;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

const DeleteConfirmModal = ({
  target,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) => {
  const isGroup = target.kind === "group";

  const title = isGroup
    ? "Delete All Requests for This Food?"
    : "Delete This Incoming Request?";

  const foodName = isGroup
    ? target.group.foodName
    : target.request.foodName;

  const requestCount = isGroup
    ? target.group.requests.length
    : 1;

  return (
    <div
      className="fixed inset-0 z-[125] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Delete incoming request"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !isDeleting
        ) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-rose-50 text-2xl text-rose-600 dark:bg-rose-950/30 dark:text-rose-400">
          <FiTrash2 />
        </div>

        <h2 className="mt-4 text-center text-xl font-bold text-slate-800 dark:text-white">
          {title}
        </h2>

        <p className="mt-2 text-center text-sm leading-6 text-slate-500 dark:text-zinc-400">
          {requestCount} request
          {requestCount === 1 ? "" : "s"} for{" "}
          <strong>{foodName}</strong> will be permanently removed from the food-requests collection.
        </p>

        <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-700 dark:border-amber-900 dark:bg-amber-950/20 dark:text-amber-400">
          Deleting an approved request does not change the food back to available. A booked food remains booked.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="h-11 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
          >
            Keep Requests
          </button>

          <button
            type="button"
            onClick={() => void onConfirm()}
            disabled={isDeleting}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-rose-600 text-sm font-bold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? (
              <FiLoader className="animate-spin" />
            ) : (
              <FiTrash2 />
            )}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const IncomingFoodRequestsClient = () => {
  const sessionResult = authClient.useSession();

  const user = sessionResult.data?.user;
  const userId = user?.id;
  const isSessionPending = sessionResult.isPending;

  const [requests, setRequests] = useState<
    FoodRequestItem[]
  >([]);

  const [counts, setCounts] =
    useState<FoodRequestStatusCounts>(EMPTY_COUNTS);

  const [selectedGroup, setSelectedGroup] =
    useState<FoodRequestGroup | null>(null);

  const [decisionRequest, setDecisionRequest] =
    useState<FoodRequestItem | null>(null);

  const [initialDecision, setInitialDecision] =
    useState<DecisionType>("approved");

  const [deleteTarget, setDeleteTarget] =
    useState<DeleteTarget | null>(null);

  const [isDeleting, setIsDeleting] =
    useState(false);

  const [isSubmittingDecision, setIsSubmittingDecision] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const groups = useMemo<FoodRequestGroup[]>(() => {
    const groupMap = new Map<string, FoodRequestItem[]>();

    for (const request of requests) {
      const existing = groupMap.get(request.foodId) || [];
      existing.push(request);
      groupMap.set(request.foodId, existing);
    }

    return Array.from(groupMap.entries())
      .map(([foodId, foodRequests]) => {
        const sortedRequests = [...foodRequests].sort(
          (first, second) =>
            new Date(second.requestDate).getTime() -
            new Date(first.requestDate).getTime(),
        );

        const firstRequest = sortedRequests[0];

        return {
          foodId,
          foodName: firstRequest.foodName,
          foodImageUrl: firstRequest.foodImageUrl,
          foodCategory: firstRequest.foodCategory,
          foodExpiryDate: firstRequest.foodExpiryDate,
          foodShortDescription:
            firstRequest.foodShortDescription,
          foodLocation: firstRequest.foodLocation,
          foodIsHalal: firstRequest.foodIsHalal,
          foodStatus: firstRequest.foodStatus,
          latestRequestDate: firstRequest.requestDate,
          requests: sortedRequests,
          pendingCount: sortedRequests.filter(
            (request) => request.status === "pending",
          ).length,
          approvedCount: sortedRequests.filter(
            (request) => request.status === "approved",
          ).length,
          rejectedCount: sortedRequests.filter(
            (request) => request.status === "rejected",
          ).length,
        };
      })
      .sort(
        (first, second) =>
          new Date(second.latestRequestDate).getTime() -
          new Date(first.latestRequestDate).getTime(),
      );
  }, [requests]);

  const loadRequests = useCallback(async () => {
    if (!userId) {
      setRequests([]);
      setCounts(EMPTY_COUNTS);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const serverUrl = getServerUrl();

      const {
        data: tokenData,
        error: tokenError,
      } = await authClient.token();

      if (tokenError || !tokenData?.token) {
        throw new Error(
          "Unable to verify your login session",
        );
      }

      const response = await fetch(
        `${serverUrl}/api/incoming-food-requests`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tokenData.token}`,
          },
          cache: "no-store",
        },
      );

      const result =
        (await response.json()) as FoodRequestListResponse;

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to load incoming requests",
        );
      }

      setRequests(
        Array.isArray(result.data)
          ? result.data
          : [],
      );

      setCounts(
        result.statusCounts || EMPTY_COUNTS,
      );
    } catch (error) {
      console.error("Incoming requests error:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to load incoming requests",
      );
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (isSessionPending) {
      return;
    }

    void loadRequests();
  }, [isSessionPending, loadRequests]);

  const openDecisionModal = (
    request: FoodRequestItem,
    decision: DecisionType,
  ) => {
    setInitialDecision(decision);
    setDecisionRequest(request);
  };

  const handleDecision = async (
    decision: DecisionType,
    values: {
      pickupLocation: string;
      contactNumber: string;
      ownerMessage: string;
      rejectionReason: string;
    },
  ) => {
    if (!decisionRequest) {
      return;
    }

    setIsSubmittingDecision(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const serverUrl = getServerUrl();

      const {
        data: tokenData,
        error: tokenError,
      } = await authClient.token();

      if (tokenError || !tokenData?.token) {
        throw new Error(
          "Unable to verify your login session",
        );
      }

      const requestBody =
        decision === "approved"
          ? {
              decision,
              pickupLocation:
                values.pickupLocation.trim(),
              contactNumber:
                values.contactNumber.trim(),
              ownerMessage:
                values.ownerMessage.trim(),
            }
          : {
              decision,
              rejectionReason:
                values.rejectionReason.trim(),
            };

      const response = await fetch(
        `${serverUrl}/api/incoming-food-requests/${decisionRequest._id}/decision`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${tokenData.token}`,
          },
          body: JSON.stringify(requestBody),
        },
      );

      const result =
        (await response.json()) as FoodRequestActionResponse;

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to save the request decision",
        );
      }

      setSuccessMessage(result.message);
      setDecisionRequest(null);
      setSelectedGroup(null);

      await loadRequests();
    } catch (error) {
      console.error("Request decision error:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to save the request decision",
      );
    } finally {
      setIsSubmittingDecision(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    setIsDeleting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const serverUrl = getServerUrl();

      const {
        data: tokenData,
        error: tokenError,
      } = await authClient.token();

      if (tokenError || !tokenData?.token) {
        throw new Error(
          "Unable to verify your login session",
        );
      }

      const endpoint =
        deleteTarget.kind === "single"
          ? `${serverUrl}/api/incoming-food-requests/${deleteTarget.request._id}`
          : `${serverUrl}/api/incoming-food-requests/food/${deleteTarget.group.foodId}`;

      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${tokenData.token}`,
        },
      });

      const result =
        (await response.json()) as FoodRequestActionResponse;

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to delete the request",
        );
      }

      setSuccessMessage(result.message);
      setDeleteTarget(null);
      setSelectedGroup(null);

      await loadRequests();
    } catch (error) {
      console.error("Delete incoming request error:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to delete the request",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  if (isSessionPending || isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAFAF7] px-4 dark:bg-black">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <FiLoader className="animate-spin text-2xl text-emerald-500" />

          <p className="font-semibold text-slate-700 dark:text-zinc-300">
            Loading incoming requests...
          </p>
        </div>
      </main>
    );
  }

  if (!userId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAFAF7] px-4 dark:bg-black">
        <div className="max-w-md rounded-3xl border border-amber-200 bg-white p-8 text-center shadow-sm dark:border-amber-900 dark:bg-zinc-900">
          <FiAlertCircle className="mx-auto text-5xl text-amber-500" />

          <h1 className="mt-4 text-2xl font-bold text-slate-800 dark:text-white">
            Login Required
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">
            Please log in to review requests received for your shared foods.
          </p>

          <Link
            href="/login?callbackURL=/incoming-food-requests"
            className="mt-5 inline-flex rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white"
          >
            Login to Continue
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAFAF7] py-8 dark:bg-black">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-50 dark:opacity-10" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400">
              <FiInbox />
              Owner Dashboard
            </div>

            <h1 className="mt-3 text-3xl font-black text-slate-800 dark:text-white sm:text-4xl">
              Incoming Food Requests
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-zinc-400">
              Each card represents one food. Open the view modal to see every requester in a table and manage their requests.
            </p>
          </div>

          <Link
            href="/my-shared-foods"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-emerald-200 bg-white px-5 text-sm font-bold text-emerald-600 transition hover:bg-emerald-50 dark:border-emerald-900 dark:bg-zinc-900 dark:text-emerald-400"
          >
            My Shared Foods
          </Link>
        </div>

        <div className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Received"
            value={counts.total}
            icon={<FiInbox />}
          />

          <StatCard
            label="Pending"
            value={counts.pending}
            icon={<FiClock />}
          />

          <StatCard
            label="Approved"
            value={counts.approved}
            icon={<FiCheckCircle />}
          />

          <StatCard
            label="Rejected"
            value={counts.rejected}
            icon={<FiXCircle />}
          />
        </div>

        {errorMessage && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/20 dark:text-rose-400">
            <FiAlertCircle className="mt-0.5 shrink-0" />
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/20 dark:text-emerald-400">
            <FiCheckCircle className="mt-0.5 shrink-0" />
            {successMessage}
          </div>
        )}

        {groups.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-zinc-700 dark:bg-zinc-900">
            <FiInbox className="mx-auto text-6xl text-slate-300 dark:text-zinc-700" />

            <h2 className="mt-4 text-xl font-bold text-slate-700 dark:text-zinc-200">
              No Incoming Requests
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-zinc-400">
              No one has requested your shared foods yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {groups.map((group) => (
              <article
                key={group.foodId}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex flex-col lg:min-h-40 lg:flex-row">
                  <div className="h-56 w-full shrink-0 overflow-hidden bg-slate-100 sm:h-64 lg:h-auto lg:w-52 dark:bg-zinc-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        group.foodImageUrl ||
                        "/assets/logo11.png"
                      }
                      alt={group.foodName}
                      className="h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.src =
                          "/assets/logo11.png";
                      }}
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-center p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-black text-slate-800 dark:text-white">
                        {group.foodName}
                      </h2>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 dark:bg-zinc-800 dark:text-zinc-300">
                        {group.foodCategory}
                      </span>

                      <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-zinc-400">
                        <FiMapPin className="text-emerald-500" />
                        {group.foodLocation ||
                          "Location not provided"}
                      </span>
                    </div>

                    <p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-6 text-slate-500 dark:text-zinc-400">
                      {group.foodShortDescription ||
                        "No short description available"}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400">
                        <span className="size-2 rounded-full bg-emerald-500" />
                        {group.foodIsHalal
                          ? "Halal"
                          : "Halal not specified"}
                      </span>

                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold capitalize ${getFoodStatusClasses(
                          group.foodStatus,
                        )}`}
                      >
                        <span className="size-2 rounded-full bg-current" />
                        {group.foodStatus || "unknown"}
                      </span>

                      <span className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700 dark:border-sky-900 dark:bg-sky-950/20 dark:text-sky-400">
                        <FiUser />
                        {group.requests.length} Request
                        {group.requests.length === 1 ? "" : "s"}
                      </span>

                      {group.pendingCount > 0 && (
                        <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 dark:border-amber-900 dark:bg-amber-950/20 dark:text-amber-400">
                          {group.pendingCount} Pending
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col justify-between gap-4 border-t border-slate-200 p-5 lg:w-64 lg:border-l lg:border-t-0 dark:border-zinc-800">
                    <div className="rounded-2xl bg-slate-50 p-4 text-xs dark:bg-zinc-800/70">
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-2 text-slate-500 dark:text-zinc-400">
                          <FiClock className="text-sky-500" />
                          Latest Request
                        </span>

                        <span className="text-right font-bold text-slate-700 dark:text-zinc-200">
                          {formatDate(group.latestRequestDate)}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-2 text-slate-500 dark:text-zinc-400">
                          <FiCalendar className="text-rose-500" />
                          Expiry
                        </span>

                        <span className="text-right font-bold text-rose-600 dark:text-rose-400">
                          {formatDate(group.foodExpiryDate)}
                        </span>
                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                        <div className="rounded-lg bg-white p-2 dark:bg-zinc-900">
                          <p className="font-black text-amber-600">
                            {group.pendingCount}
                          </p>
                          <p className="mt-0.5 text-[10px] text-slate-400">
                            Pending
                          </p>
                        </div>

                        <div className="rounded-lg bg-white p-2 dark:bg-zinc-900">
                          <p className="font-black text-emerald-600">
                            {group.approvedCount}
                          </p>
                          <p className="mt-0.5 text-[10px] text-slate-400">
                            Approved
                          </p>
                        </div>

                        <div className="rounded-lg bg-white p-2 dark:bg-zinc-900">
                          <p className="font-black text-rose-600">
                            {group.rejectedCount}
                          </p>
                          <p className="mt-0.5 text-[10px] text-slate-400">
                            Rejected
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedGroup(group)}
                        className="flex size-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-emerald-900 dark:hover:bg-emerald-950/20 dark:hover:text-emerald-400"
                        aria-label="View all requests"
                        title="View all requests"
                      >
                        <FiEye />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setDeleteTarget({
                            kind: "group",
                            group,
                          })
                        }
                        className="flex size-11 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600 transition hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950/20 dark:text-rose-400"
                        aria-label="Delete all requests for this food"
                        title="Delete all requests for this food"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {selectedGroup && (
        <RequestsTableModal
          group={selectedGroup}
          onClose={() => setSelectedGroup(null)}
          onDecision={openDecisionModal}
          onDeleteRequest={(request) =>
            setDeleteTarget({
              kind: "single",
              request,
            })
          }
        />
      )}

      {decisionRequest && (
        <DecisionModal
          key={`${decisionRequest._id}-${initialDecision}`}
          request={decisionRequest}
          initialDecision={initialDecision}
          isSubmitting={isSubmittingDecision}
          onClose={() => {
            if (!isSubmittingDecision) {
              setDecisionRequest(null);
            }
          }}
          onSubmit={handleDecision}
        />
      )}

      {deleteTarget && (
        <DeleteConfirmModal
          target={deleteTarget}
          isDeleting={isDeleting}
          onClose={() => {
            if (!isDeleting) {
              setDeleteTarget(null);
            }
          }}
          onConfirm={handleDelete}
        />
      )}
    </main>
  );
};

export default IncomingFoodRequestsClient;