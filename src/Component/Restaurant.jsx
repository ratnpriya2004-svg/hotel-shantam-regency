import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  UtensilsCrossed,
  Coffee,
} from "lucide-react";
import restaurantImage from "../assets/image/luch.webp";

export default function Restaurant({ onBookingClick }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="restaurant"
      ref={sectionRef}
      className="overflow-hidden bg-[#F1E7D8] text-[#29342D]"
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 md:grid-cols-2 md:gap-12 lg:px-12 lg:py-24">
        {/* Restaurant Image */}
        <div
          className={`group relative transition-all duration-700 ${
            visible
              ? "translate-x-0 opacity-100"
              : "-translate-x-6 opacity-0"
          }`}
        >
          <div className="relative overflow-hidden border border-[#D9CBAF] bg-[#EAE1D3] p-2">
            <div className="relative h-[320px] overflow-hidden sm:h-[420px] lg:h-[530px]">
              <img
                src={restaurantImage}
                alt="Dining area at Hotel Shantam Regency"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 text-white sm:bottom-7 sm:left-7 sm:right-7">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#F0D69B]">
                    Hotel Shantam Regency
                  </p>

                  <p className="mt-2 font-serif text-2xl sm:text-3xl">
                    A place to dine.
                  </p>
                </div>

                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/60 bg-white/10 backdrop-blur-sm">
                  <UtensilsCrossed size={19} />
                </span>
              </div>
            </div>
          </div>

          {/* Decorative Accent */}
          <div className="absolute -bottom-3 -right-3 -z-0 h-20 w-20 border-b border-r border-[#C6A15B] sm:-bottom-4 sm:-right-4 sm:h-28 sm:w-28" />
        </div>

        {/* Restaurant Content */}
        <div
          className={`relative z-10 transition-all delay-100 duration-700 ${
            visible
              ? "translate-x-0 opacity-100"
              : "translate-x-6 opacity-0"
          }`}
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-9 bg-[#C6A15B]" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#997B43]">
              A Place to Dine
            </p>
          </div>

          <h2 className="max-w-xl font-serif text-4xl leading-tight tracking-[-0.035em] text-[#29342D] sm:text-5xl lg:text-6xl">
            Good food makes
            <span className="block italic text-[#B9954E]">
              every moment better.
            </span>
          </h2>

          <p className="mt-6 max-w-lg text-sm leading-7 text-[#686A61] sm:text-base sm:leading-8">
            Enjoy the convenience of dining at Hotel Shantam Regency.
            Contact the hotel to learn about the current menu, available
            options, restaurant timings and group dining arrangements.
          </p>

          {/* Information Points */}
          <div className="mt-7 grid gap-4 border-y border-[#E4DACA] py-5 sm:grid-cols-2 sm:gap-6">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#D9CBAF] text-[#A9853E]">
                <UtensilsCrossed size={19} />
              </span>

              <div>
                <h3 className="font-serif text-base text-[#29342D]">
                  Restaurant
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#77766D]">
                  On-site dining facility
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#D9CBAF] text-[#A9853E]">
                <Coffee size={19} />
              </span>

              <div>
                <h3 className="font-serif text-base text-[#29342D]">
                  Breakfast
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#77766D]">
                  Availability depends on your booking
                </p>
              </div>
            </div>
          </div>

          {/* Restaurant Enquiry Button */}
          <button
            type="button"
            onClick={onBookingClick}
            className="group mt-8 inline-flex min-h-12 items-center justify-center gap-3 border border-[#C6A15B] bg-[#C6A15B] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-[#A9853E] hover:bg-[#A9853E]"
          >
            Restaurant Enquiry

            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </button>

          <p className="mt-4 text-xs leading-6 text-[#858073]">
            Please contact the hotel to confirm the current menu, prices
            and restaurant timings.
          </p>
        </div>
      </div>
    </section>
  );
}

