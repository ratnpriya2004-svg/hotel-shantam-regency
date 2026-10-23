import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import hotelImage from "../assets/image/hero.jpg";

export default function About() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(section);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F7F0E6] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto grid max-w-[1240px] items-center gap-14 md:grid-cols-[1.05fr_.95fr] lg:gap-20">
        {/* LEFT: Hotel Image */}
        <div
          className={`relative mx-auto w-full max-w-[570px] transition-all duration-1000 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          {/* Decorative outline */}
          <div
            aria-hidden="true"
            className="absolute -left-3 -top-3 h-full w-full border border-[#C6A15B]/40 sm:-left-5 sm:-top-5"
          />

          {/* Main image */}
          <div className="relative aspect-[4/4.3] overflow-hidden rounded-t-[48%] bg-[#E3D3B8]">
            <img
              src={hotelImage}
              alt="Hotel Shantam Regency interior"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#29342D]/20 via-transparent to-transparent" />
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-5 -right-2 flex h-28 w-28 flex-col items-center justify-center rounded-full border-[5px] border-[#F7F0E6] bg-[#C6A15B] text-center text-[#29342D] shadow-lg sm:-right-6 sm:h-36 sm:w-36">
            <Sparkles size={19} strokeWidth={1.4} />

            <span className="mt-2 text-[10px] uppercase tracking-wider">
              Made for
            </span>

            <span className="mt-1 font-['IBM_Plex_Serif'] text-lg italic sm:text-xl">
              your moments
            </span>
          </div>

          {/* Image caption */}
          <div className="absolute bottom-5 left-5 max-w-[220px] border-l-2 border-[#C6A15B] pl-3 text-[#FFFAF3]">
            <p className="text-[9px] uppercase tracking-[0.2em]">
              Welcome to
            </p>

            <p className="mt-1 font-['IBM_Plex_Serif'] text-lg">
              Shantam Regency
            </p>
          </div>
        </div>

        {/* RIGHT: About Content */}
        <div
          className={`pt-4 transition-all delay-150 duration-1000 md:pt-0 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          {/* Eyebrow */}
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#B9954E]" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#997B43]">
              About the hotel
            </p>
          </div>

          {/* Heading */}
          <h2 className="max-w-xl font-['IBM_Plex_Serif'] text-4xl leading-[1.2] tracking-tight text-[#29342D] sm:text-5xl lg:text-[56px]">
            Your time here should feel{" "}
            <span className="italic text-[#997B43]">well spent.</span>
          </h2>

          {/* Description */}
          <p className="mt-7 max-w-xl text-sm leading-8 text-[#696A62]">
            Hotel Shantam Regency welcomes guests visiting Bhagalpur, whether
            they are planning a comfortable stay, enjoying a meal, or arranging
            a special gathering.
          </p>

          <p className="mt-4 max-w-xl text-sm leading-8 text-[#696A62]">
            Explore our rooms, dining and event spaces to discover what suits
            your plans. For confirmed details about availability, rates,
            facilities and policies, please contact the hotel directly.
          </p>

          {/* Decorative divider */}
          <div className="my-7 flex items-center gap-3">
            <span className="h-px w-12 bg-[#C6A15B]" />
            <span className="h-1.5 w-1.5 rotate-45 border border-[#B9954E]" />
            <span className="h-px w-12 bg-[#E3D3B8]" />
          </div>

          {/* Feature points */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="border-l border-[#C6A15B] pl-4">
              <h3 className="font-['IBM_Plex_Serif'] text-lg text-[#29342D]">
                Comfortable stays
              </h3>

              <p className="mt-1 text-xs leading-6 text-[#77766D]">
                Explore room options for your visit.
              </p>
            </div>

            <div className="border-l border-[#C6A15B] pl-4">
              <h3 className="font-['IBM_Plex_Serif'] text-lg text-[#29342D]">
                Special gatherings
              </h3>

              <p className="mt-1 text-xs leading-6 text-[#77766D]">
                Enquire about events and celebrations.
              </p>
            </div>
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="group mt-9 inline-flex items-center gap-3 border-b border-[#B9954E] pb-2 text-sm font-medium text-[#29342D] transition-colors hover:text-[#997B43]"
          >
            Speak with our team

            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}