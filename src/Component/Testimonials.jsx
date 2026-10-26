import React from "react";
import { ArrowUpRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Business Traveller",
    review:
      "A wonderful experience! The rooms were clean, comfortable, and beautifully maintained. The staff was polite and always ready to help.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 2,
    name: "Priya Singh",
    role: "Family Guest",
    review:
      "We had a lovely stay with our family. The atmosphere was peaceful, the service was excellent, and everything was well organised.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "Frequent Traveller",
    review:
      "The hospitality was impressive, and the rooms were spacious. A comfortable place to relax after a long day of travelling.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=13",
  },
  {
    id: 4,
    name: "Ananya Gupta",
    role: "Holiday Guest",
    review:
      "Beautiful ambience, friendly staff, and great attention to detail. I would definitely consider staying here again.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=44",
  },
  {
    id: 5,
    name: "Vikash Kumar",
    role: "Business Guest",
    review:
      "The overall experience was smooth and comfortable. The hotel offers a welcoming environment and attentive service.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=14",
  },
  {
    id: 6,
    name: "Sneha Roy",
    role: "Leisure Traveller",
    review:
      "A pleasant stay with a relaxing atmosphere. The staff made us feel welcome, and the property was well maintained.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=49",
  },
];

function TestimonialCard({ testimonial }) {
  return (
    <article className="testimonial-card group flex h-full w-full flex-col rounded-2xl border border-[#e9e1d5] bg-[#fffdf9] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#b68a45] hover:shadow-xl sm:p-7">
      {/* Quote and Rating */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f4ead9] text-[#a77b36]">
          <Quote size={21} />
        </div>

        <div
          className="flex items-center gap-1"
          aria-label={`${testimonial.rating} out of 5 stars`}
        >
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              size={15}
              fill={index < testimonial.rating ? "currentColor" : "none"}
              className={
                index < testimonial.rating
                  ? "text-[#c49a52]"
                  : "text-gray-300"
              }
            />
          ))}
        </div>
      </div>

      {/* Guest Review */}
      <p className="flex-1 text-sm leading-7 text-[#655e54] sm:text-[15px]">
        “{testimonial.review}”
      </p>

      {/* Guest Profile */}
      <div className="mt-6 flex items-center gap-3 border-t border-[#eee6da] pt-5">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-[#c49a52] bg-[#f4ead9] shadow-sm">
          <img
            src={testimonial.avatar}
            alt={`${testimonial.name} profile`}
            className="h-full w-full rounded-full object-cover"
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-[#292820]">
            {testimonial.name}
          </h3>

          <p className="mt-1 text-xs text-[#8a8174]">
            {testimonial.role}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials({ onBookingClick }) {
  // Duplicate cards for a continuous scrolling effect.
  const scrollingTestimonials = [
    ...testimonials,
    ...testimonials,
  ];

  return (
    <section
      id="testimonials"
      className="overflow-hidden bg-[#f8f5ef] py-16 sm:py-20 lg:py-24"
    >
      {/* Section Heading */}
      <div className="mx-auto mb-10 max-w-7xl px-5 sm:px-8 lg:mb-14">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#a77b36]">
              Guest Experiences
            </span>

            <h2 className="max-w-2xl text-3xl font-semibold leading-tight text-[#263a32] sm:text-4xl lg:text-5xl">
              Stories That Make{" "}
              <span className="font-serif italic text-[#a77b36]">
                Us Special
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#756e63] sm:text-base">
              Discover the experiences and memories our guests associate
              with their stay at Shantam Regency.
            </p>
          </div>

          <button
            type="button"
            onClick={onBookingClick}
            className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-[#263a32] px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#a77b36]"
          >
            Contact Us

            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>

      {/* Animated Cards */}
      <div className="testimonial-slider">
        <div className="testimonial-track">
          {scrollingTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="testimonial-item"
              aria-hidden={index >= testimonials.length}
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>

      {/* Animation CSS */}
      <style>{`
        .testimonial-slider {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 12px 0 24px;
        }

        .testimonial-track {
          display: flex;
          align-items: stretch;
          gap: 24px;
          width: max-content;
          padding: 0 24px;
          animation: testimonialMoveRight 40s linear infinite;
          will-change: transform;
        }

        .testimonial-item {
          display: flex;
          flex: 0 0 320px;
          width: 320px;
          min-width: 0;
        }

        .testimonial-card {
          min-height: 300px;
        }

        @keyframes testimonialMoveRight {
          from {
            transform: translateX(calc(-50% - 12px));
          }

          to {
            transform: translateX(0);
          }
        }

        .testimonial-slider:hover .testimonial-track {
          animation-play-state: paused;
        }

        @media (max-width: 640px) {
          .testimonial-track {
            gap: 16px;
            padding: 0 16px;
            animation-duration: 32s;
          }

          .testimonial-item {
            flex-basis: 280px;
            width: 280px;
          }

          .testimonial-card {
            min-height: 320px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .testimonial-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
