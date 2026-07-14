"use client";

import { useState } from "react";

import {
  Autoplay,
  Keyboard,
  Pagination,
} from "swiper/modules";

import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import type {
  Swiper as SwiperType,
} from "swiper";

import {
  FiArrowLeft,
  FiArrowRight,
  FiHeart,
  FiMapPin,
  FiMessageCircle,
} from "react-icons/fi";

import {
  HiOutlineSparkles,
  HiOutlineUsers,
} from "react-icons/hi2";

import { FaQuoteLeft } from "react-icons/fa6";

/* Swiper styles */
import "swiper/css";
import "swiper/css/pagination";

/* =========================================================
   Testimonial type
========================================================= */

interface Testimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  message: string;
  initials: string;
  avatarGradient: string;
  roleColor: string;
  glowColor: string;
}

/* =========================================================
   Static testimonial data
========================================================= */

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Ayesha Rahman",
    role: "Food Sharer",
    location: "Dhanmondi, Dhaka",
    message:
      "After a family programme, we had several fresh meals left. ShareBite helped us share them with nearby people instead of throwing good food away.",
    initials: "AR",
    avatarGradient:
      "from-emerald-600 to-green-400",
    roleColor:
      "text-emerald-700 dark:text-emerald-400",
    glowColor: "bg-emerald-400",
  },
  {
    id: 2,
    name: "Tanvir Hasan",
    role: "Community Member",
    location: "Mirpur, Dhaka",
    message:
      "The request process was simple and respectful. I could see the food details, send my request, and receive the pickup information after approval.",
    initials: "TH",
    avatarGradient:
      "from-sky-600 to-cyan-400",
    roleColor:
      "text-sky-700 dark:text-sky-400",
    glowColor: "bg-sky-400",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    role: "Food Sharer",
    location: "Uttara, Dhaka",
    message:
      "Sharing food through ShareBite felt meaningful. Something extra for our family became a proper meal for someone else nearby.",
    initials: "NJ",
    avatarGradient:
      "from-violet-600 to-purple-400",
    roleColor:
      "text-violet-700 dark:text-violet-400",
    glowColor: "bg-violet-400",
  },
  {
    id: 4,
    name: "Farhan Ahmed",
    role: "Restaurant Volunteer",
    location: "Banani, Dhaka",
    message:
      "Our restaurant sometimes has safe surplus food at the end of the day. This platform gives us a responsible way to share it completely free.",
    initials: "FA",
    avatarGradient:
      "from-orange-600 to-amber-400",
    roleColor:
      "text-orange-700 dark:text-orange-400",
    glowColor: "bg-orange-400",
  },
  {
    id: 5,
    name: "Samira Islam",
    role: "Community Member",
    location: "Mohammadpur, Dhaka",
    message:
      "What I appreciated most was the dignity of the system. People can request food respectfully without feeling uncomfortable or judged.",
    initials: "SI",
    avatarGradient:
      "from-rose-600 to-pink-400",
    roleColor:
      "text-rose-700 dark:text-rose-400",
    glowColor: "bg-rose-400",
  },
  {
    id: 6,
    name: "Mahmudul Karim",
    role: "Event Organiser",
    location: "Bashundhara, Dhaka",
    message:
      "After an event, we posted the remaining packaged meals. Within a short time, people nearby requested and collected them safely.",
    initials: "MK",
    avatarGradient:
      "from-teal-600 to-emerald-400",
    roleColor:
      "text-teal-700 dark:text-teal-400",
    glowColor: "bg-teal-400",
  },
  {
    id: 7,
    name: "Rafia Sultana",
    role: "Food Sharer",
    location: "Badda, Dhaka",
    message:
      "The platform reminded me that sharing does not need to be complicated. A simple post can prevent waste and help another family.",
    initials: "RS",
    avatarGradient:
      "from-fuchsia-600 to-rose-400",
    roleColor:
      "text-fuchsia-700 dark:text-fuchsia-400",
    glowColor: "bg-fuchsia-400",
  },
  {
    id: 8,
    name: "Imran Hossain",
    role: "Community Volunteer",
    location: "Farmgate, Dhaka",
    message:
      "ShareBite creates a connection between people who have extra food and people who can use it. It feels like a real community initiative.",
    initials: "IH",
    avatarGradient:
      "from-blue-600 to-sky-400",
    roleColor:
      "text-blue-700 dark:text-blue-400",
    glowColor: "bg-blue-400",
  },
  {
    id: 9,
    name: "Jannatul Ferdous",
    role: "Food Sharer",
    location: "Khilgaon, Dhaka",
    message:
      "We shared homemade food after a family gathering. Knowing that it reached people while still fresh made the whole experience special.",
    initials: "JF",
    avatarGradient:
      "from-lime-600 to-emerald-400",
    roleColor:
      "text-lime-700 dark:text-lime-400",
    glowColor: "bg-lime-400",
  },
  {
    id: 10,
    name: "Rakibul Alam",
    role: "Community Member",
    location: "Rampura, Dhaka",
    message:
      "The food information and pickup details were clear. The owner communicated kindly, and the entire process felt safe and organised.",
    initials: "RA",
    avatarGradient:
      "from-indigo-600 to-violet-400",
    roleColor:
      "text-indigo-700 dark:text-indigo-400",
    glowColor: "bg-indigo-400",
  },
  {
    id: 11,
    name: "Sadia Chowdhury",
    role: "Event Volunteer",
    location: "Gulshan, Dhaka",
    message:
      "Instead of disposing of untouched event food, we were able to post it for free. ShareBite made responsible sharing much easier.",
    initials: "SC",
    avatarGradient:
      "from-pink-600 to-orange-400",
    roleColor:
      "text-pink-700 dark:text-pink-400",
    glowColor: "bg-pink-400",
  },
  {
    id: 12,
    name: "Mehedi Hasan",
    role: "Food Sharer",
    location: "Motijheel, Dhaka",
    message:
      "This is not about selling food. It is about helping good food reach another table. That simple purpose encouraged me to start sharing.",
    initials: "MH",
    avatarGradient:
      "from-cyan-600 to-teal-400",
    roleColor:
      "text-cyan-700 dark:text-cyan-400",
    glowColor: "bg-cyan-400",
  },
];

/* =========================================================
   Testimonials section
========================================================= */

const TestimonialsSection = () => {
  const [activeSlide, setActiveSlide] =
    useState(0);

  const [
    swiperInstance,
    setSwiperInstance,
  ] = useState<SwiperType | null>(null);

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-linear-to-br from-[#F8FAF5] via-white to-[#F7F5EC] py-20 dark:from-black dark:via-[#07110C] dark:to-zinc-950 sm:py-24"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_20%,rgba(16,185,129,0.12),transparent_28%),radial-gradient(circle_at_92%_80%,rgba(132,204,22,0.10),transparent_30%)] dark:bg-[radial-gradient(circle_at_8%_20%,rgba(16,185,129,0.10),transparent_28%),radial-gradient(circle_at_92%_80%,rgba(132,204,22,0.05),transparent_30%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.025)_1px,transparent_1px)] bg-[size:52px_52px] opacity-50 dark:opacity-15" />

      <div className="pointer-events-none absolute -left-28 top-20 size-80 rounded-full bg-emerald-300/15 blur-3xl dark:bg-emerald-500/5" />

      <div className="pointer-events-none absolute -right-28 bottom-10 size-80 rounded-full bg-lime-300/15 blur-3xl dark:bg-lime-500/5" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-4">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/85 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.15em] text-emerald-800 shadow-sm backdrop-blur-md dark:border-emerald-800/60 dark:bg-emerald-950/35 dark:text-emerald-300">
            <HiOutlineUsers className="text-lg" />

            Community Voices
          </div>

          <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
            Stories of Food, Kindness{" "}

            <span className="bg-linear-to-r from-emerald-700 via-green-600 to-lime-600 bg-clip-text text-transparent dark:from-emerald-300 dark:via-emerald-400 dark:to-lime-300">
              and Community
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm font-medium leading-7 text-slate-700 dark:text-zinc-300 sm:text-base">
            Small acts of food sharing can
            reduce waste, support another
            person, and build stronger
            connections between people in
            the same community.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-bold text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/20 dark:text-amber-300">
            <HiOutlineSparkles className="text-base" />

            Sample stories for project
            demonstration
          </div>
        </div>

        {/* Slider controls */}
        <div className="mt-12 flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-zinc-400">
            <FiMessageCircle className="text-lg text-emerald-600 dark:text-emerald-400" />

            Story {activeSlide + 1} of{" "}
            {TESTIMONIALS.length}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                swiperInstance?.slidePrev()
              }
              className="flex size-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-800 shadow-sm transition-all duration-300 hover:-translate-x-1 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:border-emerald-500 dark:hover:bg-emerald-600"
              aria-label="Previous testimonial"
            >
              <FiArrowLeft />
            </button>

            <button
              type="button"
              onClick={() =>
                swiperInstance?.slideNext()
              }
              className="flex size-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-800 shadow-sm transition-all duration-300 hover:translate-x-1 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:border-emerald-500 dark:hover:bg-emerald-600"
              aria-label="Next testimonial"
            >
              <FiArrowRight />
            </button>
          </div>
        </div>

        {/* Swiper slider */}
        <div className="mt-7 overflow-hidden">
          <Swiper
            modules={[
              Autoplay,
              Keyboard,
              Pagination,
            ]}
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) =>
              setActiveSlide(
                swiper.realIndex,
              )
            }
            slidesPerView={1}
            slidesPerGroup={1}
            spaceBetween={18}
            speed={850}
            loop={true}
            loopAdditionalSlides={4}
            grabCursor={true}
            watchSlidesProgress={true}
            centeredSlides={false}
            keyboard={{
              enabled: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              reverseDirection: false,
              waitForTransition: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                slidesPerGroup: 1,
                spaceBetween: 20,
              },

              1024: {
                slidesPerView: 4,
                slidesPerGroup: 1,
                spaceBetween: 24,
              },
            }}
            className="testimonial-swiper !overflow-visible !pb-14"
          >
            {TESTIMONIALS.map(
              (testimonial) => (
                <SwiperSlide
                  key={testimonial.id}
                  className="!h-auto"
                >
                  <article className="group relative flex h-full min-h-[390px] flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_20px_55px_-28px_rgba(15,23,42,0.35)] backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-[0_28px_65px_-28px_rgba(16,185,129,0.38)] dark:border-zinc-800 dark:bg-zinc-900/85 dark:shadow-[0_20px_55px_-28px_rgba(0,0,0,0.85)] dark:hover:border-emerald-800">
                    {/* Card glow */}
                    <div
                      className={`pointer-events-none absolute -right-16 -top-16 size-44 rounded-full ${testimonial.glowColor} opacity-10 blur-3xl transition duration-500 group-hover:opacity-20`}
                    />

                    {/* Quote and heart */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-50 text-xl text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                        <FaQuoteLeft />
                      </div>

                      <FiHeart className="text-xl text-rose-400 transition duration-300 group-hover:scale-110 group-hover:fill-rose-400" />
                    </div>

                    {/* Message */}
                    <p className="relative z-10 mt-6 flex-1 text-sm font-medium leading-7 text-slate-700 dark:text-zinc-300">
                      “{testimonial.message}”
                    </p>

                    {/* User information */}
                    <div className="relative z-10 mt-7 border-t border-slate-200 pt-5 dark:border-zinc-800">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex size-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br ${testimonial.avatarGradient} text-sm font-black text-white shadow-lg`}
                        >
                          {testimonial.initials}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-sm font-black text-slate-950 dark:text-white">
                            {testimonial.name}
                          </h3>

                          <p
                            className={`mt-0.5 text-xs font-bold ${testimonial.roleColor}`}
                          >
                            {testimonial.role}
                          </p>

                          <p className="mt-1 flex items-center gap-1 truncate text-xs text-slate-500 dark:text-zinc-500">
                            <FiMapPin className="shrink-0" />

                            {testimonial.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              ),
            )}
          </Swiper>
        </div>
      </div>

      {/* Swiper custom styles */}
      <style jsx global>{`
        .testimonial-swiper
          .swiper-wrapper {
          align-items: stretch;
        }

        .testimonial-swiper
          .swiper-slide {
          height: auto;
        }

        .testimonial-swiper
          .swiper-pagination {
          bottom: 0 !important;
        }

        .testimonial-swiper
          .swiper-pagination-bullet {
          width: 9px;
          height: 9px;
          background: #94a3b8;
          opacity: 0.55;
          transition:
            width 300ms ease,
            opacity 300ms ease,
            background 300ms ease;
        }

        .testimonial-swiper
          .swiper-pagination-bullet-active {
          width: 30px;
          border-radius: 999px;
          background: #059669;
          opacity: 1;
        }

        .dark
          .testimonial-swiper
          .swiper-pagination-bullet {
          background: #52525b;
          opacity: 0.8;
        }

        .dark
          .testimonial-swiper
          .swiper-pagination-bullet-active {
          background: #34d399;
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;