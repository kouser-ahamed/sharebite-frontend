"use client";

import type { ReactNode } from "react";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  FiCheckCircle,
  FiClipboard,
  FiRefreshCw,
  FiUsers,
  FiXCircle,
} from "react-icons/fi";

import {
  HiOutlineChartBar,
  HiOutlineSparkles,
} from "react-icons/hi2";

import { MdFoodBank } from "react-icons/md";

/* =========================================================
   Types
========================================================= */

interface CommunityImpactData {
  totalFoodPosts: number;
  totalRequests: number;
  totalApproved: number;
  totalRejected: number;
  totalPending: number;
  totalUsers: number;
}

interface CommunityImpactResponse {
  success: boolean;
  message: string;
  data: CommunityImpactData;
}

interface ChartDataItem {
  name: string;
  value: number;
  color: string;
}

interface StatisticCard {
  id: number;
  title: string;
  value: number;
  description: string;
  icon: ReactNode;
  gradient: string;
  glow: string;
}

interface TooltipPayloadItem {
  name?: string;
  value?: number;
  color?: string;

  payload?: {
    name?: string;
    value?: number;
    color?: string;
  };
}

interface ImpactTooltipProps {
  active?: boolean;
  label?: string;
  payload?: TooltipPayloadItem[];
}

/* =========================================================
   Configuration
========================================================= */

const SERVER_URL = (
  process.env.NEXT_PUBLIC_SERVER_URL ||
  "http://localhost:5000"
).replace(/\/+$/, "");

const INITIAL_DATA: CommunityImpactData = {
  totalFoodPosts: 0,
  totalRequests: 0,
  totalApproved: 0,
  totalRejected: 0,
  totalPending: 0,
  totalUsers: 0,
};

/* =========================================================
   Custom chart tooltip
========================================================= */

const ImpactTooltip = ({
  active,
  label,
  payload,
}: ImpactTooltipProps) => {
  if (
    !active ||
    !payload ||
    payload.length === 0
  ) {
    return null;
  }

  const currentItem = payload[0];

  const itemName =
    label ||
    currentItem.payload?.name ||
    currentItem.name ||
    "Total";

  const itemValue =
    currentItem.value ??
    currentItem.payload?.value ??
    0;

  const itemColor =
    currentItem.payload?.color ||
    currentItem.color ||
    "#10b981";

  return (
    <div className="min-w-[145px] rounded-xl border border-slate-200 bg-white/95 px-4 py-3 shadow-xl backdrop-blur-md dark:border-zinc-700 dark:bg-zinc-900/95">
      <div className="flex items-center gap-2">
        <span
          className="size-2.5 rounded-full"
          style={{
            backgroundColor: itemColor,
          }}
        />

        <p className="text-xs font-bold text-slate-600 dark:text-zinc-400">
          {itemName}
        </p>
      </div>

      <p className="mt-1.5 text-xl font-black text-slate-950 dark:text-white">
        {Number(itemValue).toLocaleString()}
      </p>
    </div>
  );
};

/* =========================================================
   Loading skeleton
========================================================= */

const CommunityImpactSkeleton = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 dark:bg-zinc-950 sm:py-24">
      <div className="mx-auto w-full max-w-7xl animate-pulse px-4 sm:px-6 lg:px-4">
        <div className="mx-auto h-9 w-56 rounded-full bg-slate-200 dark:bg-zinc-800" />

        <div className="mx-auto mt-5 h-14 max-w-2xl rounded-2xl bg-slate-200 dark:bg-zinc-800" />

        <div className="mx-auto mt-4 h-5 max-w-xl rounded-lg bg-slate-200 dark:bg-zinc-800" />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {Array.from({
            length: 5,
          }).map((_, index) => (
            <div
              key={index}
              className="h-48 rounded-[28px] bg-slate-200 dark:bg-zinc-800"
            />
          ))}
        </div>

        <div className="mt-10 grid gap-7 lg:grid-cols-2">
          <div className="h-[490px] rounded-[32px] bg-slate-200 dark:bg-zinc-800" />

          <div className="h-[490px] rounded-[32px] bg-slate-200 dark:bg-zinc-800" />
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   Empty chart state
========================================================= */

const EmptyChartState = () => {
  return (
    <div className="mt-10 flex min-h-[320px] flex-col items-center justify-center rounded-[32px] border border-slate-200 bg-white/80 px-6 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70">
      <div className="flex size-20 items-center justify-center rounded-full bg-emerald-100 text-4xl text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
        <MdFoodBank />
      </div>

      <h3 className="mt-5 text-xl font-black text-slate-950 dark:text-white">
        Community activity will appear here
      </h3>

      <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 dark:text-zinc-400">
        The charts will update automatically when users share
        food and send requests.
      </p>
    </div>
  );
};

/* =========================================================
   Main component
========================================================= */

const CommunityImpactStatistics = () => {
  const [impactData, setImpactData] =
    useState<CommunityImpactData>(
      INITIAL_DATA,
    );

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const fetchCommunityImpact =
    useCallback(async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `${SERVER_URL}/api/community-impact`,
          {
            method: "GET",

            headers: {
              Accept: "application/json",
            },

            cache: "no-store",
          },
        );

        const result =
          (await response.json()) as CommunityImpactResponse;

        if (
          !response.ok ||
          !result.success
        ) {
          throw new Error(
            result.message ||
              "Unable to load community impact data",
          );
        }

        setImpactData({
          totalFoodPosts:
            Number(
              result.data?.totalFoodPosts,
            ) || 0,

          totalRequests:
            Number(
              result.data?.totalRequests,
            ) || 0,

          totalApproved:
            Number(
              result.data?.totalApproved,
            ) || 0,

          totalRejected:
            Number(
              result.data?.totalRejected,
            ) || 0,

          totalPending:
            Number(
              result.data?.totalPending,
            ) || 0,

          totalUsers:
            Number(
              result.data?.totalUsers,
            ) || 0,
        });
      } catch (fetchError) {
        console.error(
          "Community impact fetch error:",
          fetchError,
        );

        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Something went wrong while loading statistics",
        );
      } finally {
        setIsLoading(false);
      }
    }, []);

  useEffect(() => {
    void fetchCommunityImpact();
  }, [fetchCommunityImpact]);

  const statisticCards =
    useMemo<StatisticCard[]>(
      () => [
        {
          id: 1,
          title: "Total Food Posts",

          value:
            impactData.totalFoodPosts,

          description:
            "Food posts shared by community members",

          icon: <MdFoodBank />,

          gradient:
            "from-emerald-600 via-emerald-500 to-green-400",

          glow: "bg-emerald-400",
        },
        {
          id: 2,
          title: "Total Requests",

          value:
            impactData.totalRequests,

          description:
            "Requests sent for available food",

          icon: <FiClipboard />,

          gradient:
            "from-sky-600 via-cyan-500 to-blue-400",

          glow: "bg-sky-400",
        },
        {
          id: 3,
          title: "Approved Requests",

          value:
            impactData.totalApproved,

          description:
            "Requests approved by food owners",

          icon: <FiCheckCircle />,

          gradient:
            "from-teal-600 via-emerald-500 to-lime-400",

          glow: "bg-teal-400",
        },
        {
          id: 4,
          title: "Rejected Requests",

          value:
            impactData.totalRejected,

          description:
            "Requests that were not approved",

          icon: <FiXCircle />,

          gradient:
            "from-rose-600 via-pink-500 to-orange-400",

          glow: "bg-rose-400",
        },
        {
          id: 5,
          title: "Total Users",

          value:
            impactData.totalUsers,

          description:
            "People connected through ShareBite",

          icon: <FiUsers />,

          gradient:
            "from-violet-600 via-purple-500 to-fuchsia-400",

          glow: "bg-violet-400",
        },
      ],
      [impactData],
    );

  const barChartData =
    useMemo<ChartDataItem[]>(
      () => [
        {
          name: "Food Posts",

          value:
            impactData.totalFoodPosts,

          color: "#10b981",
        },
        {
          name: "Requests",

          value:
            impactData.totalRequests,

          color: "#0ea5e9",
        },
        {
          name: "Approved",

          value:
            impactData.totalApproved,

          color: "#14b8a6",
        },
        {
          name: "Rejected",

          value:
            impactData.totalRejected,

          color: "#f43f5e",
        },
        {
          name: "Users",

          value:
            impactData.totalUsers,

          color: "#8b5cf6",
        },
      ],
      [impactData],
    );

  /*
   * Inner pie:
   * overall platform activity
   */
  const pieInnerData =
    useMemo<ChartDataItem[]>(
      () => [
        {
          name: "Food Posts",

          value:
            impactData.totalFoodPosts,

          color: "#10b981",
        },
        {
          name: "Total Requests",

          value:
            impactData.totalRequests,

          color: "#0ea5e9",
        },
        {
          name: "Community Users",

          value:
            impactData.totalUsers,

          color: "#8b5cf6",
        },
      ],
      [impactData],
    );

  /*
   * Outer pie:
   * request status
   */
  const pieOuterData =
    useMemo<ChartDataItem[]>(
      () => [
        {
          name: "Approved",

          value:
            impactData.totalApproved,

          color: "#14b8a6",
        },
        {
          name: "Rejected",

          value:
            impactData.totalRejected,

          color: "#f43f5e",
        },
        {
          name: "Pending",

          value:
            impactData.totalPending,

          color: "#f59e0b",
        },
      ],
      [impactData],
    );

  const hasChartData =
    barChartData.some(
      (item) => item.value > 0,
    );

  if (isLoading) {
    return <CommunityImpactSkeleton />;
  }

  return (
    <section
      id="community-impact"
      className="relative overflow-hidden bg-white py-20 dark:bg-zinc-950 sm:py-24"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_18%,rgba(16,185,129,0.11),transparent_28%),radial-gradient(circle_at_92%_82%,rgba(139,92,246,0.08),transparent_30%)] dark:bg-[radial-gradient(circle_at_8%_18%,rgba(16,185,129,0.08),transparent_28%),radial-gradient(circle_at_92%_82%,rgba(139,92,246,0.05),transparent_30%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.025)_1px,transparent_1px)] bg-[size:52px_52px] opacity-50 dark:opacity-15" />

      <div className="pointer-events-none absolute -left-28 top-24 size-80 rounded-full bg-emerald-300/15 blur-3xl dark:bg-emerald-500/5" />

      <div className="pointer-events-none absolute -right-28 bottom-16 size-80 rounded-full bg-violet-300/10 blur-3xl dark:bg-violet-500/5" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/90 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-emerald-800 shadow-sm dark:border-emerald-800/60 dark:bg-emerald-950/35 dark:text-emerald-300">
            <HiOutlineSparkles className="text-lg" />

            Live Community Impact
          </div>

          <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
            Together, We Are Making{" "}

            <span className="bg-linear-to-r from-emerald-700 via-green-600 to-lime-600 bg-clip-text text-transparent dark:from-emerald-300 dark:via-emerald-400 dark:to-lime-300">
              a Difference
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm font-medium leading-7 text-slate-700 dark:text-zinc-300 sm:text-base">
            Every shared food post, request and approval helps
            reduce food waste and connects good food with people
            nearby. These numbers come directly from the
            ShareBite database.
          </p>
        </div>

        {/* Error state */}
        {error && (
          <div className="mx-auto mt-10 flex max-w-xl flex-col items-center rounded-2xl border border-rose-200 bg-rose-50 px-6 py-6 text-center dark:border-rose-900/60 dark:bg-rose-950/20">
            <FiXCircle className="text-4xl text-rose-600 dark:text-rose-400" />

            <p className="mt-3 text-sm font-bold text-rose-800 dark:text-rose-300">
              {error}
            </p>

            <button
              type="button"
              onClick={() => {
                void fetchCommunityImpact();
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-rose-700"
            >
              <FiRefreshCw />

              Try Again
            </button>
          </div>
        )}

        {!error && (
          <>
            {/* Statistics cards */}
            <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {statisticCards.map(
                (card) => (
                  <article
                    key={card.id}
                    className="group relative flex min-h-[220px] flex-col items-center justify-center overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/90 p-5 text-center shadow-[0_20px_55px_-28px_rgba(15,23,42,0.35)] backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-[0_28px_65px_-28px_rgba(16,185,129,0.35)] dark:border-zinc-800 dark:bg-zinc-900/85 dark:shadow-[0_20px_55px_-28px_rgba(0,0,0,0.85)] dark:hover:border-emerald-800"
                  >
                    {/* Background glow */}
                    <div
                      className={`pointer-events-none absolute -right-12 -top-12 size-36 rounded-full ${card.glow} opacity-10 blur-3xl transition duration-500 group-hover:opacity-20`}
                    />

                    {/* Centered icon */}
                    <div
                      className={`relative mx-auto flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl bg-linear-to-br ${card.gradient} text-2xl text-white shadow-lg transition duration-500 group-hover:-rotate-3 group-hover:scale-110`}
                    >
                      {card.icon}
                    </div>

                    {/* Centered value */}
                    <p className="relative mt-6 w-full text-center text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                      {card.value.toLocaleString()}
                    </p>

                    {/* Centered title */}
                    <h3 className="relative mt-2 w-full text-center text-sm font-black text-slate-900 dark:text-zinc-100">
                      {card.title}
                    </h3>

                    {/* Centered description */}
                    <p className="relative mx-auto mt-2 w-full max-w-[190px] text-center text-xs font-medium leading-5 text-slate-500 dark:text-zinc-500">
                      {card.description}
                    </p>
                  </article>
                ),
              )}
            </div>

            {hasChartData ? (
              <div className="mt-10 grid gap-7 lg:grid-cols-2">
                {/* Bar chart */}
                <article className="relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_25px_70px_-35px_rgba(15,23,42,0.38)] backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80 dark:shadow-[0_25px_70px_-35px_rgba(0,0,0,0.90)] sm:p-7">
                  <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-emerald-300/10 blur-3xl dark:bg-emerald-500/5" />

                  <div className="relative">
                    <div className="flex items-start gap-3">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-xl text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                        <HiOutlineChartBar />
                      </div>

                      <div>
                        <h3 className="text-xl font-black text-slate-950 dark:text-white">
                          Platform Activity
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-zinc-400">
                          Comparison of food posts, requests,
                          outcomes and users.
                        </p>
                      </div>
                    </div>

                    <div className="mt-7 h-[390px] w-full">
                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                      >
                        <BarChart
                          data={barChartData}
                          margin={{
                            top: 10,
                            right: 5,
                            left: 0,
                            bottom: 10,
                          }}
                        >
                          <CartesianGrid
                            strokeDasharray="4 4"
                            stroke="rgba(148,163,184,0.25)"
                            vertical={false}
                          />

                          <XAxis
                            dataKey="name"
                            tick={{
                              fill: "#64748b",
                              fontSize: 11,
                              fontWeight: 600,
                            }}
                            axisLine={false}
                            tickLine={false}
                            interval={0}
                          />

                          <YAxis
                            width={40}
                            allowDecimals={false}
                            tick={{
                              fill: "#64748b",
                              fontSize: 11,
                              fontWeight: 600,
                            }}
                            axisLine={false}
                            tickLine={false}
                          />

                          <Tooltip
                            content={
                              <ImpactTooltip />
                            }
                            cursor={{
                              fill: "rgba(16,185,129,0.07)",
                            }}
                          />

                          <Legend
                            verticalAlign="top"
                            align="right"
                            iconType="circle"
                            wrapperStyle={{
                              fontSize: "12px",
                              fontWeight: 700,
                              paddingBottom:
                                "15px",
                            }}
                          />

                          <Bar
                            name="Total Count"
                            dataKey="value"
                            fill="#10b981"
                            radius={[
                              10,
                              10,
                              0,
                              0,
                            ]}
                            maxBarSize={58}
                            animationDuration={
                              1200
                            }
                            activeBar={{
                              fill: "#34d399",
                              stroke: "#047857",
                              strokeWidth: 2,
                            }}
                          >
                            {barChartData.map(
                              (item) => (
                                <Cell
                                  key={
                                    item.name
                                  }
                                  fill={
                                    item.color
                                  }
                                />
                              ),
                            )}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </article>

                {/* Two-level pie chart */}
                <article className="relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_25px_70px_-35px_rgba(15,23,42,0.38)] backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80 dark:shadow-[0_25px_70px_-35px_rgba(0,0,0,0.90)] sm:p-7">
                  <div className="pointer-events-none absolute -bottom-20 -left-20 size-64 rounded-full bg-violet-300/10 blur-3xl dark:bg-violet-500/5" />

                  <div className="relative">
                    <div className="flex items-start gap-3">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-xl text-violet-700 dark:bg-violet-950/50 dark:text-violet-400">
                        <MdFoodBank />
                      </div>

                      <div>
                        <h3 className="text-xl font-black text-slate-950 dark:text-white">
                          Community Distribution
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-zinc-400">
                          Inner chart shows platform activity.
                          Outer chart shows request status.
                        </p>
                      </div>
                    </div>

                    <div className="relative mx-auto mt-6 h-[400px] w-full max-w-[500px]">
                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                      >
                        <PieChart>
                          {/* Inner pie */}
                          <Pie
                            name="Platform Activity"
                            data={pieInnerData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="48%"
                            innerRadius="15%"
                            outerRadius="48%"
                            paddingAngle={3}
                            cornerRadius={6}
                            stroke="transparent"
                            isAnimationActive
                            animationDuration={
                              1200
                            }
                          >
                            {pieInnerData.map(
                              (item) => (
                                <Cell
                                  key={
                                    item.name
                                  }
                                  fill={
                                    item.color
                                  }
                                />
                              ),
                            )}
                          </Pie>

                          {/* Outer pie */}
                          <Pie
                            name="Request Status"
                            data={pieOuterData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="48%"
                            innerRadius="58%"
                            outerRadius="78%"
                            paddingAngle={4}
                            cornerRadius={7}
                            stroke="transparent"
                            labelLine={false}
                            label={({
                              percent,
                            }) => {
                              const percentage =
                                (percent ??
                                  0) *
                                100;

                              if (
                                percentage <
                                5
                              ) {
                                return "";
                              }

                              return `${percentage.toFixed(
                                0,
                              )}%`;
                            }}
                            isAnimationActive
                            animationBegin={
                              250
                            }
                            animationDuration={
                              1500
                            }
                          >
                            {pieOuterData.map(
                              (item) => (
                                <Cell
                                  key={
                                    item.name
                                  }
                                  fill={
                                    item.color
                                  }
                                />
                              ),
                            )}
                          </Pie>

                          <Tooltip
                            content={
                              <ImpactTooltip />
                            }
                          />

                          <Legend
                            verticalAlign="bottom"
                            align="center"
                            iconType="circle"
                            wrapperStyle={{
                              fontSize: "11px",
                              fontWeight: 700,
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>

                      {/* Centre content */}
                      <div className="pointer-events-none absolute left-1/2 top-[48%] flex size-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-emerald-200 bg-white/90 text-center shadow-lg backdrop-blur-md dark:border-emerald-900 dark:bg-zinc-950/90">
                        <MdFoodBank className="text-xl text-emerald-600 dark:text-emerald-400" />

                        <span className="mt-0.5 text-[8px] font-black uppercase tracking-[0.1em] text-slate-500 dark:text-zinc-500">
                          Impact
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ) : (
              <EmptyChartState />
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default CommunityImpactStatistics;