import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BedDouble,
  Sparkles,
  MoveUpRight,
} from "lucide-react";

import executiveRoom from "../assets/image/rrrrom.webp";
import deluxeRoom from "../assets/image/rooom.webp";
import premiumRoom from "../assets/image/room.webp";

const roomCards = [
  {
    number: "01",
    title: "Executive Room",
    subtitle: "Comfort meets elegance",
    description:
      "A thoughtfully designed space for a relaxing and comfortable stay.",
    image: executiveRoom,
    tag: "BUSINESS & LEISURE",
  },
  {
    number: "02",
    title: "Deluxe Room",
    subtitle: "Your personal retreat",
    description:
      "An inviting atmosphere with a refined look for your time away.",
    image: deluxeRoom,
    tag: "RELAX & UNWIND",
  },
  {
    number: "03",
    title: "Premium Room",
    subtitle: "A little more luxury",
    description:
      "A stylish setting designed to make every moment of your stay special.",
    image: premiumRoom,
    tag: "ELEVATED COMFORT",
  },
];

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    // Show content immediately when reduced motion is preferred
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 700ms ease ${delay}ms, transform 700ms ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function RoomCard({ room, index, onBookingClick }) {
  const [hovered, setHovered] = useState(false);

  const handleEnquiry = () => {
    onBookingClick?.();
  };

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative h-full ${
        index === 1 ? "lg:mt-16" : index === 2 ? "lg:mt-8" : ""
      }`}
    >
      {/* Decorative gold frame */}
      <div
        aria-hidden="true"
        className={`absolute -right-2 -top-2 z-0 h-24 w-24 border-r border-t border-[#C6A15B]/60 transition-all duration-500 sm:-right-3 sm:-top-3 sm:h-28 sm:w-28 ${
          hovered ? "h-32 w-32 border-[#C6A15B]" : ""
        }`}
      />

      {/* Room image */}
      <div className="relative z-10 aspect-[4/5] overflow-hidden bg-[#E8E0D3]">
        <img
          src={room.image}
          alt={`${room.title} at Hotel Shantam Regency`}
          loading="lazy"
          className={`h-full w-full object-cover transition-transform duration-1000 ease-out ${
            hovered ? "scale-105" : "scale-100"
          }`}
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/20 transition-opacity duration-500 group-hover:from-black/95" />

        {/* Category and number */}
        <div className="absolute left-4 right-4 top-4 flex items-start justify-between sm:left-5 sm:right-5 sm:top-5">
          <span className="border border-white/40 bg-black/30 px-3 py-2 text-[9px] font-medium tracking-[0.15em] text-white backdrop-blur-md sm:text-[10px]">
            {room.tag}
          </span>

          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-black/20 text-xs text-white backdrop-blur-sm transition-all duration-500 group-hover:rotate-45 group-hover:border-[#E5C77F] group-hover:bg-[#C6A15B] group-hover:text-black sm:h-10 sm:w-10">
            {room.number}
          </span>
        </div>

        {/* Decorative sparkle */}
        <Sparkles
          aria-hidden="true"
          size={23}
          strokeWidth={1}
          className={`absolute right-5 top-1/2 text-[#E5C77F] transition-all duration-500 ${
            hovered
              ? "-translate-y-1/2 rotate-12 opacity-100"
              : "-translate-y-1/2 translate-x-2 opacity-0"
          }`}
        />

        {/* Room details */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 lg:p-7">
          <div
            className={`mb-3 h-px bg-[#E5C77F] transition-all duration-500 ${
              hovered ? "w-20" : "w-10"
            }`}
          />

          <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-[#E5C77F] sm:text-xs">
            {room.subtitle}
          </p>

          <h3 className="font-serif text-2xl leading-tight text-white sm:text-3xl">
            {room.title}
          </h3>

          {/* Visible on mobile; smoothly revealed on larger screens */}
          <p
            className={`mt-3 max-w-xs text-sm leading-6 text-white/80 transition-all duration-300 ${
              hovered
                ? "translate-y-0 opacity-100"
                : "translate-y-0 opacity-100 sm:translate-y-2 sm:opacity-0"
            }`}
          >
            {room.description}
          </p>

          <button
            type="button"
            onClick={handleEnquiry}
            className="group/enquiry mt-4 inline-flex min-h-10 items-center gap-3 text-xs font-semibold uppercase tracking-[0.13em] text-white transition-colors duration-300 hover:text-[#E5C77F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E5C77F]"
            aria-label={`Enquire about ${room.title}`}
          >
            Enquire Now

            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 transition-all duration-300 group-hover/enquiry:border-[#E5C77F] group-hover/enquiry:bg-[#C6A15B] group-hover/enquiry:text-black">
              <ArrowUpRight size={16} />
            </span>
          </button>
        </div>
      </div>

      {/* Bottom information strip */}
      <div className="relative z-10 flex items-center justify-between gap-3 border-b border-[#C6A15B]/35 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C6A15B]/50 text-[#92713B]">
            <BedDouble size={17} strokeWidth={1.4} />
          </span>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[#191919]">
              {room.title}
            </p>

            <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#77716A]">
              Thoughtful comfort
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleEnquiry}
          aria-label={`Enquire about ${room.title}`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C6A15B]/50 text-[#92713B] transition-all duration-300 hover:rotate-45 hover:bg-[#C6A15B] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#92713B]"
        >
          <MoveUpRight size={17} />
        </button>
      </div>
    </article>
  );
}

export default function Rooms({ onBookingClick }) {
  return (
    <section
      id="rooms"
      className="relative scroll-mt-20 overflow-hidden bg-[#F8F5ED] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-36 h-72 w-72 rounded-full border border-[#C6A15B]/15 sm:h-96 sm:w-96"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-28 h-64 w-64 rounded-full border border-[#C6A15B]/10"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <Reveal>
          <div className="mb-12 flex flex-col gap-6 sm:mb-16 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-[#C6A15B]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#92713B] sm:text-xs">
                  Your stay, your way
                </span>
              </div>

              <h2 className="font-serif text-4xl leading-[1.12] tracking-tight text-[#191919] sm:text-5xl lg:text-7xl">
                Find your kind
                <br />
                of <span className="italic text-[#B18A43]">comfort.</span>
              </h2>
            </div>

            <div className="max-w-sm lg:pb-2">
              <p className="text-sm leading-7 text-[#625D55] sm:text-base">
                Discover thoughtfully designed rooms that bring together
                comfort, simplicity and a welcoming atmosphere.
              </p>

              <div className="mt-5 flex items-center gap-3">
                <span className="h-px w-8 bg-[#C6A15B]" />

                <span className="text-[10px] uppercase tracking-[0.2em] text-[#77716A]">
                  Hotel Shantam Regency
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Room cards */}
        <div className="grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-8">
          {roomCards.map((room, index) => (
            <Reveal
              key={room.number}
              delay={index * 120}
              className="h-full"
            >
              <RoomCard
                room={room}
                index={index}
                onBookingClick={onBookingClick}
              />
            </Reveal>
          ))}
        </div>

        {/* Bottom enquiry panel */}
        <Reveal delay={150}>
          <div className="relative mt-16 overflow-hidden bg-[#171717] px-6 py-8 sm:mt-24 sm:px-10 sm:py-10 lg:mt-28 lg:px-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-16 h-52 w-52 rounded-full border border-[#C6A15B]/20"
            />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-2 text-[#E5C77F]">
                  <Sparkles size={15} />

                  <span className="text-[10px] uppercase tracking-[0.22em]">
                    Need a little help?
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-white sm:text-3xl lg:text-4xl">
                  Let's find your perfect room.
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">
                  Get in touch with our team for room enquiries and assistance
                  with your stay.
                </p>
              </div>

              <button
                type="button"
                onClick={onBookingClick}
                className="group flex min-h-12 shrink-0 items-center justify-center gap-4 self-start border border-[#C6A15B] px-5 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#E5C77F] transition-all duration-300 hover:bg-[#C6A15B] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E5C77F] sm:self-center"
              >
                Ask About Rooms

                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

