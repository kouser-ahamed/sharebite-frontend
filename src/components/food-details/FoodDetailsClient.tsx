// "use client";

// import React, {
//   useCallback,
//   useEffect,
//   useState,
// } from "react";
// import Link from "next/link";
// import {
//   FiAlertCircle,
//   FiArrowLeft,
//   FiCalendar,
//   FiCheckCircle,
//   FiClock,
//   FiEye,
//   FiHeart,
//   FiInbox,
//   FiMail,
//   FiMapPin,
//   FiPhone,
//   FiRefreshCw,
//   FiSend,
//   FiTag,
//   FiUser,
//   FiUsers,
//   FiXCircle,
// } from "react-icons/fi";
// import { MdFoodBank } from "react-icons/md";

// import FoodCard from "@/components/all-foods/FoodCard";
// import FoodCardSkeleton from "@/components/all-foods/FoodCardSkeleton";
// import FoodPagination from "@/components/all-foods/FoodPagination";

// import type {
//   Food,
//   FoodsPagination,
// } from "@/types/food";

// /* =========================================================
//    Props and API types
// ========================================================= */

// interface FoodDetailsClientProps {
//   foodId: string;
// }

// interface FoodDetailsApiResponse {
//   success: boolean;
//   message: string;
//   data: Food;
//   error?: string;
// }

// interface RelatedFoodsApiResponse {
//   success: boolean;
//   message: string;
//   data: Food[];
//   pagination: FoodsPagination;
//   error?: string;
// }

// interface InformationItemProps {
//   icon: React.ReactNode;
//   label: string;
//   value: React.ReactNode;
//   className?: string;
// }

// /* =========================================================
//    Initial related pagination
// ========================================================= */

// const initialRelatedPagination: FoodsPagination =
//   {
//     currentPage: 1,
//     itemsPerPage: 8,
//     totalItems: 0,
//     totalPages: 0,
//     hasNextPage: false,
//     hasPreviousPage: false,
//   };

// /* =========================================================
//    Helper functions
// ========================================================= */

// const getServerUrl = (): string => {
//   const serverUrl =
//     process.env.NEXT_PUBLIC_SERVER_URL;

//   if (!serverUrl) {
//     throw new Error(
//       "NEXT_PUBLIC_SERVER_URL is not configured in .env.local"
//     );
//   }

//   return serverUrl.replace(/\/+$/, "");
// };

// const formatDateTime = (
//   dateValue?: string | null
// ): string => {
//   if (!dateValue) {
//     return "Not provided";
//   }

//   const parsedDate = new Date(dateValue);

//   if (
//     Number.isNaN(parsedDate.getTime())
//   ) {
//     return dateValue;
//   }

//   return new Intl.DateTimeFormat(
//     "en-BD",
//     {
//       dateStyle: "medium",
//       timeStyle: "short",
//     }
//   ).format(parsedDate);
// };

// const formatStatus = (
//   status?: string
// ): string => {
//   if (!status) {
//     return "Unknown";
//   }

//   return (
//     status.charAt(0).toUpperCase() +
//     status.slice(1)
//   );
// };

// const getStatusClasses = (
//   status?: string
// ): string => {
//   if (status === "available") {
//     return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400";
//   }

//   if (status === "booked") {
//     return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-400";
//   }

//   return "border-slate-200 bg-slate-100 text-slate-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
// };

// /* =========================================================
//    Reusable information item
// ========================================================= */

// const InformationItem: React.FC<
//   InformationItemProps
// > = ({
//   icon,
//   label,
//   value,
//   className = "",
// }) => {
//   return (
//     <div
//       className={`rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/60 ${className}`}
//     >
//       <div className="flex items-start gap-3">
//         <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-lg text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
//           {icon}
//         </span>

//         <div className="min-w-0">
//           <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-zinc-500">
//             {label}
//           </p>

//           <div className="mt-1 break-words text-sm font-semibold text-slate-700 dark:text-zinc-200">
//             {value}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* =========================================================
//    Main component
// ========================================================= */

// const FoodDetailsClient: React.FC<
//   FoodDetailsClientProps
// > = ({ foodId }) => {
//   const [food, setFood] =
//     useState<Food | null>(null);

//   const [relatedFoods, setRelatedFoods] =
//     useState<Food[]>([]);

//   const [
//     relatedPagination,
//     setRelatedPagination,
//   ] = useState<FoodsPagination>(
//     initialRelatedPagination
//   );

//   const [relatedPage, setRelatedPage] =
//     useState(1);

//   const [isDetailsLoading, setIsDetailsLoading] =
//     useState(true);

//   const [isRelatedLoading, setIsRelatedLoading] =
//     useState(true);

//   const [detailsError, setDetailsError] =
//     useState("");

//   const [relatedError, setRelatedError] =
//     useState("");

//   const [
//     detailsRefreshKey,
//     setDetailsRefreshKey,
//   ] = useState(0);

//   const [
//     relatedRefreshKey,
//     setRelatedRefreshKey,
//   ] = useState(0);

//   /* =======================================================
//      Reset related page when food changes
//   ======================================================= */

//   useEffect(() => {
//     setRelatedPage(1);
//   }, [foodId]);

//   /* =======================================================
//      Fetch selected food details
//   ======================================================= */

//   useEffect(() => {
//     const controller =
//       new AbortController();

//     const fetchFoodDetails =
//       async () => {
//         setIsDetailsLoading(true);
//         setDetailsError("");

//         try {
//           const serverUrl =
//             getServerUrl();

//           const response =
//             await fetch(
//               `${serverUrl}/api/foods/${foodId}`,
//               {
//                 method: "GET",
//                 headers: {
//                   Accept:
//                     "application/json",
//                 },
//                 cache: "no-store",
//                 signal:
//                   controller.signal,
//               }
//             );

//           const result =
//             (await response.json()) as FoodDetailsApiResponse;

//           if (
//             !response.ok ||
//             !result.success
//           ) {
//             throw new Error(
//               result.message ||
//                 "Failed to load food details"
//             );
//           }

//           if (!result.data) {
//             throw new Error(
//               "Food details were not found"
//             );
//           }

//           setFood(result.data);
//         } catch (error) {
//           if (
//             error instanceof DOMException &&
//             error.name ===
//               "AbortError"
//           ) {
//             return;
//           }

//           console.error(
//             "Food details error:",
//             error
//           );

//           setFood(null);

//           setDetailsError(
//             error instanceof Error
//               ? error.message
//               : "Failed to load food details"
//           );
//         } finally {
//           if (
//             !controller.signal
//               .aborted
//           ) {
//             setIsDetailsLoading(
//               false
//             );
//           }
//         }
//       };

//     void fetchFoodDetails();

//     return () => {
//       controller.abort();
//     };
//   }, [
//     foodId,
//     detailsRefreshKey,
//   ]);

//   /* =======================================================
//      Fetch related foods separately

//      Changing related page does not remove or
//      reload the details section at the top.
//   ======================================================= */

//   useEffect(() => {
//     const controller =
//       new AbortController();

//     const fetchRelatedFoods =
//       async () => {
//         setIsRelatedLoading(true);
//         setRelatedError("");

//         try {
//           const serverUrl =
//             getServerUrl();

//           const response =
//             await fetch(
//               `${serverUrl}/api/foods/${foodId}/related?page=${relatedPage}`,
//               {
//                 method: "GET",
//                 headers: {
//                   Accept:
//                     "application/json",
//                 },
//                 cache: "no-store",
//                 signal:
//                   controller.signal,
//               }
//             );

//           const result =
//             (await response.json()) as RelatedFoodsApiResponse;

//           if (
//             !response.ok ||
//             !result.success
//           ) {
//             throw new Error(
//               result.message ||
//                 "Failed to load related foods"
//             );
//           }

//           setRelatedFoods(
//             result.data || []
//           );

//           setRelatedPagination(
//             result.pagination ||
//               initialRelatedPagination
//           );

//           if (
//             result.pagination &&
//             result.pagination
//               .currentPage !==
//               relatedPage
//           ) {
//             setRelatedPage(
//               result.pagination
//                 .currentPage
//             );
//           }
//         } catch (error) {
//           if (
//             error instanceof DOMException &&
//             error.name ===
//               "AbortError"
//           ) {
//             return;
//           }

//           console.error(
//             "Related foods error:",
//             error
//           );

//           setRelatedFoods([]);

//           setRelatedPagination(
//             initialRelatedPagination
//           );

//           setRelatedError(
//             error instanceof Error
//               ? error.message
//               : "Failed to load related foods"
//           );
//         } finally {
//           if (
//             !controller.signal
//               .aborted
//           ) {
//             setIsRelatedLoading(
//               false
//             );
//           }
//         }
//       };

//     void fetchRelatedFoods();

//     return () => {
//       controller.abort();
//     };
//   }, [
//     foodId,
//     relatedPage,
//     relatedRefreshKey,
//   ]);

//   /* =======================================================
//      Related pagination
//   ======================================================= */

//   const handleRelatedPageChange =
//     useCallback(
//       (nextPage: number) => {
//         if (
//           nextPage < 1 ||
//           nextPage >
//             relatedPagination.totalPages ||
//           nextPage === relatedPage
//         ) {
//           return;
//         }

//         setRelatedPage(nextPage);

//         window.setTimeout(() => {
//           document
//             .getElementById(
//               "related-foods"
//             )
//             ?.scrollIntoView({
//               behavior: "smooth",
//               block: "start",
//             });
//         }, 50);
//       },
//       [
//         relatedPage,
//         relatedPagination.totalPages,
//       ]
//     );

//   /* =======================================================
//      Full details loading state
//   ======================================================= */

//   if (isDetailsLoading) {
//     return (
//       <main className="min-h-screen bg-[#FAFAF7] py-8 dark:bg-black">
//         <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
//           <div className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
//             <div className="grid lg:grid-cols-2">
//               <div className="h-80 bg-slate-200 dark:bg-zinc-800 lg:h-[560px]" />

//               <div className="space-y-5 p-6 sm:p-8">
//                 <div className="h-7 w-28 rounded bg-slate-200 dark:bg-zinc-800" />
//                 <div className="h-10 w-3/4 rounded bg-slate-200 dark:bg-zinc-800" />
//                 <div className="h-5 w-full rounded bg-slate-200 dark:bg-zinc-800" />
//                 <div className="h-5 w-5/6 rounded bg-slate-200 dark:bg-zinc-800" />

//                 <div className="grid gap-4 sm:grid-cols-2">
//                   {Array.from({
//                     length: 6,
//                   }).map(
//                     (_, index) => (
//                       <div
//                         key={index}
//                         className="h-24 rounded-xl bg-slate-200 dark:bg-zinc-800"
//                       />
//                     )
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     );
//   }

//   /* =======================================================
//      Details error state
//   ======================================================= */

//   if (detailsError || !food) {
//     return (
//       <main className="min-h-screen bg-[#FAFAF7] py-8 dark:bg-black">
//         <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
//           <div className="rounded-2xl border border-rose-200 bg-rose-50 px-6 py-16 text-center dark:border-rose-900/60 dark:bg-rose-950/20">
//             <FiAlertCircle className="mx-auto text-5xl text-rose-500" />

//             <h1 className="mt-4 text-2xl font-bold text-rose-700 dark:text-rose-400">
//               Food details unavailable
//             </h1>

//             <p className="mt-2 text-sm text-rose-600 dark:text-rose-300">
//               {detailsError ||
//                 "Food item could not be found"}
//             </p>

//             <div className="mt-6 flex flex-wrap justify-center gap-3">
//               <Link
//                 href="/all-foods"
//                 className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
//               >
//                 <FiArrowLeft />
//                 All Foods
//               </Link>

//               <button
//                 type="button"
//                 onClick={() =>
//                   setDetailsRefreshKey(
//                     (currentKey) =>
//                       currentKey + 1
//                   )
//                 }
//                 className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
//               >
//                 <FiRefreshCw />
//                 Try Again
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="relative min-h-screen overflow-hidden bg-[#FAFAF7] py-8 dark:bg-black">
//       {/* Background */}
//       <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-50 dark:opacity-10" />

//       <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
//         {/* Back button */}
//         <div className="mb-5">
//           <Link
//             href="/all-foods"
//             className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
//           >
//             <FiArrowLeft />
//             Back to All Foods
//           </Link>
//         </div>

//         {/* Main food details */}
//         <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
//           <div className="grid lg:grid-cols-2">
//             {/* Food image */}
//             <div className="relative min-h-80 overflow-hidden bg-slate-100 dark:bg-zinc-950 lg:min-h-[620px]">
//               {/* eslint-disable-next-line @next/next/no-img-element */}
//               <img
//                 src={
//                   food.imageUrl ||
//                   "/assets/logo11.png"
//                 }
//                 alt={food.foodName}
//                 className="absolute inset-0 h-full w-full object-cover"
//                 onError={(event) => {
//                   event.currentTarget.src =
//                     "/assets/logo11.png";
//                 }}
//               />

//               <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

//               <div className="absolute left-4 top-4 flex flex-wrap gap-2">
//                 <span
//                   className={`rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusClasses(
//                     food.status
//                   )}`}
//                 >
//                   {formatStatus(
//                     food.status
//                   )}
//                 </span>

//                 <span className="rounded-full border border-white/30 bg-black/50 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
//                   {food.category}
//                 </span>
//               </div>

//               <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
//                 <span className="inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
//                   <FiEye />
//                   {food.views ?? 0} views
//                 </span>

//                 <span className="inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
//                   <FiInbox />
//                   {food.requests ?? 0} requests
//                 </span>
//               </div>
//             </div>

//             {/* Details content */}
//             <div className="p-6 sm:p-8">
//               <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400">
//                 <MdFoodBank />
//                 Food Details
//               </div>

//               <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white sm:text-4xl">
//                 {food.foodName}
//               </h1>

//               <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-zinc-400">
//                 {food.shortDescription}
//               </p>

//               {/* Request button */}
//               {/* <Link
//                 href={`/request-send/${food._id}`}
//                 className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md sm:w-auto"
//               >
//                 <FiSend />
//                 Request For Food
//               </Link> */}

//               {/* Main information */}
//               <div className="mt-7 grid gap-4 sm:grid-cols-2">
//                 <InformationItem
//                   icon={<FiTag />}
//                   label="Category"
//                   value={food.category}
//                 />

//                 <InformationItem
//                   icon={<FiMapPin />}
//                   label="Location"
//                   value={food.location}
//                 />

//                 <InformationItem
//                   icon={<FiUser />}
//                   label="Owner"
//                   value={food.ownerName}
//                 />

//                 <InformationItem
//                   icon={<FiUsers />}
//                   label="Serving Size"
//                   value={
//                     food.servingSize ||
//                     "Not provided"
//                   }
//                 />

//                 <InformationItem
//                   icon={<FiCalendar />}
//                   label="Preparation Date"
//                   value={formatDateTime(
//                     food.preparationDate
//                   )}
//                 />

//                 <InformationItem
//                   icon={<FiClock />}
//                   label="Expiry Date"
//                   value={formatDateTime(
//                     food.expiryDate
//                   )}
//                 />

//                 <InformationItem
//                   icon={<FiPhone />}
//                   label="Contact Number"
//                   value={
//                     food.contactNumber ? (
//                       <a
//                         href={`tel:${food.contactNumber}`}
//                         className="transition hover:text-emerald-600 dark:hover:text-emerald-400"
//                       >
//                         {
//                           food.contactNumber
//                         }
//                       </a>
//                     ) : (
//                       "Not provided"
//                     )
//                   }
//                 />

//                 <InformationItem
//                   icon={<FiMail />}
//                   label="Owner Email"
//                   value={
//                     food.userEmail ? (
//                       <a
//                         href={`mailto:${food.userEmail}`}
//                         className="transition hover:text-emerald-600 dark:hover:text-emerald-400"
//                       >
//                         {food.userEmail}
//                       </a>
//                     ) : (
//                       "Not provided"
//                     )
//                   }
//                 />

//                 <InformationItem
//                   icon={
//                     food.isHalal ? (
//                       <FiCheckCircle />
//                     ) : (
//                       <FiXCircle />
//                     )
//                   }
//                   label="Halal Status"
//                   value={
//                     <span
//                       className={
//                         food.isHalal
//                           ? "text-emerald-600 dark:text-emerald-400"
//                           : "text-rose-600 dark:text-rose-400"
//                       }
//                     >
//                       {food.isHalal
//                         ? "Halal"
//                         : "Not marked as Halal"}
//                     </span>
//                   }
//                 />

//                 <InformationItem
//                   icon={<FiHeart />}
//                   label="Food Status"
//                   value={formatStatus(
//                     food.status
//                   )}
//                 />

                
//               </div>
//               <div className="mt-6 flex justify-center">
//   <Link
//     href={`/request-send/${food._id}`}
//     className="group inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/25 active:translate-y-0 active:scale-[0.98]"
//   >
//     <FiSend className="transition-transform duration-300 group-hover:-rotate-12 group-hover:translate-x-0.5" />

//     Request For Food
//   </Link>
// </div>
//             </div>
//           </div>

//           {/* Full description */}
//           <div className="border-t border-slate-200 p-6 dark:border-zinc-800 sm:p-8">
//             <h2 className="text-xl font-bold text-slate-800 dark:text-white">
//               Full Description
//             </h2>

//             <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-zinc-400 sm:text-base">
//               {food.fullDescription}
//             </p>
//           </div>

//           {/* Additional information */}
//           <div className="border-t border-slate-200 p-6 dark:border-zinc-800 sm:p-8">
//             <h2 className="text-xl font-bold text-slate-800 dark:text-white">
//               Additional Information
//             </h2>

//             <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//               <InformationItem
//                 icon={<FiEye />}
//                 label="Total Views"
//                 value={
//                   food.views ?? 0
//                 }
//               />

//               <InformationItem
//                 icon={<FiInbox />}
//                 label="Total Requests"
//                 value={
//                   food.requests ?? 0
//                 }
//               />

//               <InformationItem
//                 icon={<FiCalendar />}
//                 label="Shared At"
//                 value={formatDateTime(
//                   food.createdAt
//                 )}
//               />

//               <InformationItem
//                 icon={<FiClock />}
//                 label="Last Updated"
//                 value={formatDateTime(
//                   food.updatedAt
//                 )}
//               />
//             </div>
//           </div>
//         </section>

//         {/* Related foods */}
//         <section
//           id="related-foods"
//           className="mt-10 scroll-mt-24"
//         >
//           <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
//             <div>
//               <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400">
//                 <MdFoodBank />
//                 Related Items
//               </div>

//               <h2 className="mt-3 text-2xl font-bold text-slate-800 dark:text-white sm:text-3xl">
//                 More from{" "}
//                 <span className="text-emerald-500">
//                   {food.category}
//                 </span>
//               </h2>

//               <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
//                 Other available foods from
//                 the same category.
//               </p>
//             </div>

//             {!isRelatedLoading &&
//               relatedPagination.totalItems >
//                 0 && (
//                 <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">
//                   {
//                     relatedPagination.totalItems
//                   }{" "}
//                   related items
//                 </p>
//               )}
//           </div>

//           {/* Related error */}
//           {relatedError &&
//             !isRelatedLoading && (
//               <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center dark:border-rose-900/60 dark:bg-rose-950/20">
//                 <FiAlertCircle className="mx-auto text-4xl text-rose-500" />

//                 <p className="mt-3 text-sm text-rose-600 dark:text-rose-300">
//                   {relatedError}
//                 </p>

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setRelatedRefreshKey(
//                       (currentKey) =>
//                         currentKey + 1
//                     )
//                   }
//                   className="mt-4 inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
//                 >
//                   <FiRefreshCw />
//                   Try Again
//                 </button>
//               </div>
//             )}

//           {/* Related cards */}
//           {isRelatedLoading ? (
//             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
//               {Array.from({
//                 length: 8,
//               }).map(
//                 (_, index) => (
//                   <FoodCardSkeleton
//                     key={index}
//                   />
//                 )
//               )}
//             </div>
//           ) : relatedFoods.length >
//               0 ? (
//             <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
//               {relatedFoods.map(
//                 (relatedFood) => (
//                   <FoodCard
//                     key={
//                       relatedFood._id
//                     }
//                     food={relatedFood}
//                   />
//                 )
//               )}
//             </div>
//           ) : (
//             !relatedError && (
//               <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white px-5 py-14 text-center dark:border-zinc-700 dark:bg-zinc-900">
//                 <MdFoodBank className="mx-auto text-5xl text-slate-300 dark:text-zinc-600" />

//                 <h3 className="mt-4 text-lg font-bold text-slate-700 dark:text-zinc-300">
//                   No related items
//                 </h3>

//                 <p className="mt-2 text-sm text-slate-500 dark:text-zinc-500">
//                   There are currently no
//                   other available foods in
//                   the {food.category}{" "}
//                   category.
//                 </p>
//               </div>
//             )
//           )}

//           {/* Only related items paginate */}
//           {!relatedError &&
//             relatedPagination.totalPages >
//               1 && (
//               <FoodPagination
//                 currentPage={
//                   relatedPagination.currentPage
//                 }
//                 totalPages={
//                   relatedPagination.totalPages
//                 }
//                 hasNextPage={
//                   relatedPagination.hasNextPage
//                 }
//                 hasPreviousPage={
//                   relatedPagination.hasPreviousPage
//                 }
//                 onPageChange={
//                   handleRelatedPageChange
//                 }
//                 disabled={
//                   isRelatedLoading
//                 }
//               />
//             )}
//         </section>
//       </div>
//     </main>
//   );
// };

// export default FoodDetailsClient;







//=======================================









"use client";

import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiEye,
  FiHeart,
  FiHome,
  FiInbox,
  FiMail,
  FiMapPin,
  FiPhone,
  FiRefreshCw,
  FiSend,
  FiTag,
  FiUser,
  FiUsers,
  FiXCircle,
} from "react-icons/fi";
import { MdFoodBank } from "react-icons/md";

import FoodCard from "@/components/all-foods/FoodCard";
import FoodCardSkeleton from "@/components/all-foods/FoodCardSkeleton";
import FoodPagination from "@/components/all-foods/FoodPagination";

import type {
  Food,
  FoodsPagination,
} from "@/types/food";

/* =========================================================
   Props and API types
========================================================= */

interface FoodDetailsClientProps {
  foodId: string;
}

interface FoodDetailsApiResponse {
  success: boolean;
  message: string;
  data: Food;
  error?: string;
}

interface RelatedFoodsApiResponse {
  success: boolean;
  message: string;
  data: Food[];
  pagination: FoodsPagination;
  error?: string;
}

interface InformationItemProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  className?: string;
}

/* =========================================================
   Initial related pagination
========================================================= */

const initialRelatedPagination: FoodsPagination =
  {
    currentPage: 1,
    itemsPerPage: 8,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  };

/* =========================================================
   Helper functions
========================================================= */

const getServerUrl = (): string => {
  const serverUrl =
    process.env.NEXT_PUBLIC_SERVER_URL;

  if (!serverUrl) {
    throw new Error(
      "NEXT_PUBLIC_SERVER_URL is not configured in .env.local"
    );
  }

  return serverUrl.replace(/\/+$/, "");
};

const formatDateTime = (
  dateValue?: string | null
): string => {
  if (!dateValue) {
    return "Not provided";
  }

  const parsedDate = new Date(dateValue);

  if (
    Number.isNaN(parsedDate.getTime())
  ) {
    return dateValue;
  }

  return new Intl.DateTimeFormat(
    "en-BD",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  ).format(parsedDate);
};

const formatStatus = (
  status?: string
): string => {
  if (!status) {
    return "Unknown";
  }

  return (
    status.charAt(0).toUpperCase() +
    status.slice(1)
  );
};

const getStatusClasses = (
  status?: string
): string => {
  if (status === "available") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400";
  }

  if (status === "booked") {
    return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-400";
  }

  return "border-slate-200 bg-slate-100 text-slate-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
};

const isValidFoodId = (
  value: string
): boolean => {
  return /^[a-f\d]{24}$/i.test(
    value.trim()
  );
};

const isFoodNotFoundResponse = (
  responseStatus: number,
  message?: string
): boolean => {
  const normalizedMessage =
    message?.toLowerCase() || "";

  return (
    responseStatus === 400 ||
    responseStatus === 404 ||
    normalizedMessage.includes(
      "invalid food id"
    ) ||
    normalizedMessage.includes(
      "food not found"
    ) ||
    normalizedMessage.includes(
      "food item not found"
    ) ||
    normalizedMessage.includes(
      "could not be found"
    )
  );
};

/* =========================================================
   Reusable information item
========================================================= */

const InformationItem: React.FC<
  InformationItemProps
> = ({
  icon,
  label,
  value,
  className = "",
}) => {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/60 ${className}`}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-lg text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
          {icon}
        </span>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-zinc-500">
            {label}
          </p>

          <div className="mt-1 break-words text-sm font-semibold text-slate-700 dark:text-zinc-200">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   Main component
========================================================= */

const FoodDetailsClient: React.FC<
  FoodDetailsClientProps
> = ({ foodId }) => {
  const [food, setFood] =
    useState<Food | null>(null);

  const [relatedFoods, setRelatedFoods] =
    useState<Food[]>([]);

  const [
    relatedPagination,
    setRelatedPagination,
  ] = useState<FoodsPagination>(
    initialRelatedPagination
  );

  const [relatedPage, setRelatedPage] =
    useState(1);

  const [isDetailsLoading, setIsDetailsLoading] =
    useState(true);

  const [isRelatedLoading, setIsRelatedLoading] =
    useState(true);

  const [detailsError, setDetailsError] =
    useState("");

  const [
    isFoodNotFound,
    setIsFoodNotFound,
  ] = useState(false);

  const [relatedError, setRelatedError] =
    useState("");

  const [
    detailsRefreshKey,
    setDetailsRefreshKey,
  ] = useState(0);

  const [
    relatedRefreshKey,
    setRelatedRefreshKey,
  ] = useState(0);

  /* =======================================================
     Reset related page when food changes
  ======================================================= */

  useEffect(() => {
    setRelatedPage(1);
  }, [foodId]);

  /* =======================================================
     Fetch selected food details
  ======================================================= */

  useEffect(() => {
    const controller =
      new AbortController();

    const fetchFoodDetails =
      async () => {
        setIsDetailsLoading(true);
        setDetailsError("");
        setIsFoodNotFound(false);
        setFood(null);

        if (!isValidFoodId(foodId)) {
          setIsFoodNotFound(true);
          setIsDetailsLoading(false);

          return;
        }

        try {
          const serverUrl =
            getServerUrl();

          const response =
            await fetch(
              `${serverUrl}/api/foods/${foodId}`,
              {
                method: "GET",
                headers: {
                  Accept:
                    "application/json",
                },
                cache: "no-store",
                signal:
                  controller.signal,
              }
            );

          const result =
            (await response.json()) as FoodDetailsApiResponse;

          if (
            isFoodNotFoundResponse(
              response.status,
              result.message
            )
          ) {
            setIsFoodNotFound(true);

            return;
          }

          if (
            !response.ok ||
            !result.success
          ) {
            throw new Error(
              result.message ||
                "Failed to load food details"
            );
          }

          if (!result.data) {
            setIsFoodNotFound(true);

            return;
          }

          setFood(result.data);
        } catch (error) {
          if (
            error instanceof DOMException &&
            error.name ===
              "AbortError"
          ) {
            return;
          }

          setFood(null);

          setDetailsError(
            error instanceof Error
              ? error.message
              : "Failed to load food details"
          );
        } finally {
          if (
            !controller.signal
              .aborted
          ) {
            setIsDetailsLoading(
              false
            );
          }
        }
      };

    void fetchFoodDetails();

    return () => {
      controller.abort();
    };
  }, [
    foodId,
    detailsRefreshKey,
  ]);

  /* =======================================================
     Fetch related foods separately

     Changing related page does not remove or
     reload the details section at the top.
  ======================================================= */

  useEffect(() => {
    const controller =
      new AbortController();

    const fetchRelatedFoods =
      async () => {
        setRelatedError("");

        if (
          !isValidFoodId(foodId) ||
          !food
        ) {
          setRelatedFoods([]);
          setRelatedPagination(
            initialRelatedPagination
          );
          setIsRelatedLoading(false);

          return;
        }

        setIsRelatedLoading(true);

        try {
          const serverUrl =
            getServerUrl();

          const response =
            await fetch(
              `${serverUrl}/api/foods/${foodId}/related?page=${relatedPage}`,
              {
                method: "GET",
                headers: {
                  Accept:
                    "application/json",
                },
                cache: "no-store",
                signal:
                  controller.signal,
              }
            );

          const result =
            (await response.json()) as RelatedFoodsApiResponse;

          if (
            !response.ok ||
            !result.success
          ) {
            throw new Error(
              result.message ||
                "Failed to load related foods"
            );
          }

          setRelatedFoods(
            result.data || []
          );

          setRelatedPagination(
            result.pagination ||
              initialRelatedPagination
          );

          if (
            result.pagination &&
            result.pagination
              .currentPage !==
              relatedPage
          ) {
            setRelatedPage(
              result.pagination
                .currentPage
            );
          }
        } catch (error) {
          if (
            error instanceof DOMException &&
            error.name ===
              "AbortError"
          ) {
            return;
          }

          setRelatedFoods([]);

          setRelatedPagination(
            initialRelatedPagination
          );

          setRelatedError(
            error instanceof Error
              ? error.message
              : "Failed to load related foods"
          );
        } finally {
          if (
            !controller.signal
              .aborted
          ) {
            setIsRelatedLoading(
              false
            );
          }
        }
      };

    void fetchRelatedFoods();

    return () => {
      controller.abort();
    };
  }, [
    food,
    foodId,
    relatedPage,
    relatedRefreshKey,
  ]);

  /* =======================================================
     Related pagination
  ======================================================= */

  const handleRelatedPageChange =
    useCallback(
      (nextPage: number) => {
        if (
          nextPage < 1 ||
          nextPage >
            relatedPagination.totalPages ||
          nextPage === relatedPage
        ) {
          return;
        }

        setRelatedPage(nextPage);

        window.setTimeout(() => {
          document
            .getElementById(
              "related-foods"
            )
            ?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
        }, 50);
      },
      [
        relatedPage,
        relatedPagination.totalPages,
      ]
    );

  /* =======================================================
     Full details loading state
  ======================================================= */

  if (isDetailsLoading) {
    return (
      <main className="min-h-screen bg-[#FAFAF7] py-8 dark:bg-black">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
          <div className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <div className="grid lg:grid-cols-2">
              <div className="h-80 bg-slate-200 dark:bg-zinc-800 lg:h-[560px]" />

              <div className="space-y-5 p-6 sm:p-8">
                <div className="h-7 w-28 rounded bg-slate-200 dark:bg-zinc-800" />
                <div className="h-10 w-3/4 rounded bg-slate-200 dark:bg-zinc-800" />
                <div className="h-5 w-full rounded bg-slate-200 dark:bg-zinc-800" />
                <div className="h-5 w-5/6 rounded bg-slate-200 dark:bg-zinc-800" />

                <div className="grid gap-4 sm:grid-cols-2">
                  {Array.from({
                    length: 6,
                  }).map(
                    (_, index) => (
                      <div
                        key={index}
                        className="h-24 rounded-xl bg-slate-200 dark:bg-zinc-800"
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =======================================================
     Food not found state
  ======================================================= */

  if (isFoodNotFound) {
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
            Please explore the currently available
            foods.
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

  /* =======================================================
     Details error state
  ======================================================= */

  if (detailsError || !food) {
    return (
      <main className="min-h-screen bg-[#FAFAF7] py-8 dark:bg-black">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-6 py-16 text-center dark:border-rose-900/60 dark:bg-rose-950/20">
            <FiAlertCircle className="mx-auto text-5xl text-rose-500" />

            <h1 className="mt-4 text-2xl font-bold text-rose-700 dark:text-rose-400">
              Food details unavailable
            </h1>

            <p className="mt-2 text-sm text-rose-600 dark:text-rose-300">
              {detailsError ||
                "Food item could not be found"}
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/all-foods"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                <FiArrowLeft />
                All Foods
              </Link>

              <button
                type="button"
                onClick={() =>
                  setDetailsRefreshKey(
                    (currentKey) =>
                      currentKey + 1
                  )
                }
                className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
              >
                <FiRefreshCw />
                Try Again
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAFAF7] py-8 dark:bg-black">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-50 dark:opacity-10" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
        {/* Back button */}
        <div className="mb-5">
          <Link
            href="/all-foods"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
          >
            <FiArrowLeft />
            Back to All Foods
          </Link>
        </div>

        {/* Main food details */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="grid lg:grid-cols-2">
            {/* Food image */}
            <div className="relative min-h-80 overflow-hidden bg-slate-100 dark:bg-zinc-950 lg:min-h-[620px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  food.imageUrl ||
                  "/assets/logo11.png"
                }
                alt={food.foodName}
                className="absolute inset-0 h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.src =
                    "/assets/logo11.png";
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                <span
                  className={`rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusClasses(
                    food.status
                  )}`}
                >
                  {formatStatus(
                    food.status
                  )}
                </span>

                <span className="rounded-full border border-white/30 bg-black/50 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                  {food.category}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                  <FiEye />
                  {food.views ?? 0} views
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                  <FiInbox />
                  {food.requests ?? 0} requests
                </span>
              </div>
            </div>

            {/* Details content */}
            <div className="p-6 sm:p-8">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400">
                <MdFoodBank />
                Food Details
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white sm:text-4xl">
                {food.foodName}
              </h1>

              <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-zinc-400">
                {food.shortDescription}
              </p>

              {/* Request button */}
              {/* <Link
                href={`/request-send/${food._id}`}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md sm:w-auto"
              >
                <FiSend />
                Request For Food
              </Link> */}

              {/* Main information */}
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <InformationItem
                  icon={<FiTag />}
                  label="Category"
                  value={food.category}
                />

                <InformationItem
                  icon={<FiMapPin />}
                  label="Location"
                  value={food.location}
                />

                <InformationItem
                  icon={<FiUser />}
                  label="Owner"
                  value={food.ownerName}
                />

                <InformationItem
                  icon={<FiUsers />}
                  label="Serving Size"
                  value={
                    food.servingSize ||
                    "Not provided"
                  }
                />

                <InformationItem
                  icon={<FiCalendar />}
                  label="Preparation Date"
                  value={formatDateTime(
                    food.preparationDate
                  )}
                />

                <InformationItem
                  icon={<FiClock />}
                  label="Expiry Date"
                  value={formatDateTime(
                    food.expiryDate
                  )}
                />

                <InformationItem
                  icon={<FiPhone />}
                  label="Contact Number"
                  value={
                    food.contactNumber ? (
                      <a
                        href={`tel:${food.contactNumber}`}
                        className="transition hover:text-emerald-600 dark:hover:text-emerald-400"
                      >
                        {
                          food.contactNumber
                        }
                      </a>
                    ) : (
                      "Not provided"
                    )
                  }
                />

                <InformationItem
                  icon={<FiMail />}
                  label="Owner Email"
                  value={
                    food.userEmail ? (
                      <a
                        href={`mailto:${food.userEmail}`}
                        className="transition hover:text-emerald-600 dark:hover:text-emerald-400"
                      >
                        {food.userEmail}
                      </a>
                    ) : (
                      "Not provided"
                    )
                  }
                />

                <InformationItem
                  icon={
                    food.isHalal ? (
                      <FiCheckCircle />
                    ) : (
                      <FiXCircle />
                    )
                  }
                  label="Halal Status"
                  value={
                    <span
                      className={
                        food.isHalal
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-rose-600 dark:text-rose-400"
                      }
                    >
                      {food.isHalal
                        ? "Halal"
                        : "Not marked as Halal"}
                    </span>
                  }
                />

                <InformationItem
                  icon={<FiHeart />}
                  label="Food Status"
                  value={formatStatus(
                    food.status
                  )}
                />

                
              </div>
              <div className="mt-6 flex justify-center">
  <Link
    href={`/request-send/${food._id}`}
    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/25 active:translate-y-0 active:scale-[0.98]"
  >
    <FiSend className="transition-transform duration-300 group-hover:-rotate-12 group-hover:translate-x-0.5" />

    Request For Food
  </Link>
</div>
            </div>
          </div>

          {/* Full description */}
          <div className="border-t border-slate-200 p-6 dark:border-zinc-800 sm:p-8">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              Full Description
            </h2>

            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-zinc-400 sm:text-base">
              {food.fullDescription}
            </p>
          </div>

          {/* Additional information */}
          <div className="border-t border-slate-200 p-6 dark:border-zinc-800 sm:p-8">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              Additional Information
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <InformationItem
                icon={<FiEye />}
                label="Total Views"
                value={
                  food.views ?? 0
                }
              />

              <InformationItem
                icon={<FiInbox />}
                label="Total Requests"
                value={
                  food.requests ?? 0
                }
              />

              <InformationItem
                icon={<FiCalendar />}
                label="Shared At"
                value={formatDateTime(
                  food.createdAt
                )}
              />

              <InformationItem
                icon={<FiClock />}
                label="Last Updated"
                value={formatDateTime(
                  food.updatedAt
                )}
              />
            </div>
          </div>
        </section>

        {/* Related foods */}
        <section
          id="related-foods"
          className="mt-10 scroll-mt-24"
        >
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400">
                <MdFoodBank />
                Related Items
              </div>

              <h2 className="mt-3 text-2xl font-bold text-slate-800 dark:text-white sm:text-3xl">
                More from{" "}
                <span className="text-emerald-500">
                  {food.category}
                </span>
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
                Other available foods from
                the same category.
              </p>
            </div>

            {!isRelatedLoading &&
              relatedPagination.totalItems >
                0 && (
                <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">
                  {
                    relatedPagination.totalItems
                  }{" "}
                  related items
                </p>
              )}
          </div>

          {/* Related error */}
          {relatedError &&
            !isRelatedLoading && (
              <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center dark:border-rose-900/60 dark:bg-rose-950/20">
                <FiAlertCircle className="mx-auto text-4xl text-rose-500" />

                <p className="mt-3 text-sm text-rose-600 dark:text-rose-300">
                  {relatedError}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setRelatedRefreshKey(
                      (currentKey) =>
                        currentKey + 1
                    )
                  }
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
                >
                  <FiRefreshCw />
                  Try Again
                </button>
              </div>
            )}

          {/* Related cards */}
          {isRelatedLoading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
              {Array.from({
                length: 8,
              }).map(
                (_, index) => (
                  <FoodCardSkeleton
                    key={index}
                  />
                )
              )}
            </div>
          ) : relatedFoods.length >
              0 ? (
            <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
              {relatedFoods.map(
                (relatedFood) => (
                  <FoodCard
                    key={
                      relatedFood._id
                    }
                    food={relatedFood}
                  />
                )
              )}
            </div>
          ) : (
            !relatedError && (
              <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white px-5 py-14 text-center dark:border-zinc-700 dark:bg-zinc-900">
                <MdFoodBank className="mx-auto text-5xl text-slate-300 dark:text-zinc-600" />

                <h3 className="mt-4 text-lg font-bold text-slate-700 dark:text-zinc-300">
                  No related items
                </h3>

                <p className="mt-2 text-sm text-slate-500 dark:text-zinc-500">
                  There are currently no
                  other available foods in
                  the {food.category}{" "}
                  category.
                </p>
              </div>
            )
          )}

          {/* Only related items paginate */}
          {!relatedError &&
            relatedPagination.totalPages >
              1 && (
              <FoodPagination
                currentPage={
                  relatedPagination.currentPage
                }
                totalPages={
                  relatedPagination.totalPages
                }
                hasNextPage={
                  relatedPagination.hasNextPage
                }
                hasPreviousPage={
                  relatedPagination.hasPreviousPage
                }
                onPageChange={
                  handleRelatedPageChange
                }
                disabled={
                  isRelatedLoading
                }
              />
            )}
        </section>
      </div>
    </main>
  );
};

export default FoodDetailsClient;