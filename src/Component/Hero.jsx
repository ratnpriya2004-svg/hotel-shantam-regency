import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import heroImage from "../assets/image/buil.webp";

export default function Hero({ onBookingClick }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="overflow-hidden bg-[#F7F0E6] text-[#29342D]"
    >
      <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-8 sm:px-8 sm:pb-14 sm:pt-10 lg:px-12 lg:pt-12">
        <div className="grid items-center gap-9 md:grid-cols-[0.85fr_1.15fr] md:gap-10 lg:gap-16">
          {/* Left Content */}
          <div
            className={`order-2 transition-all duration-700 ease-out md:order-1 ${
              loaded
                ? "translate-x-0 opacity-100"
                : "-translate-x-5 opacity-0"
            }`}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#C6A15B]" />
              <Sparkles size={15} className="text-[#B9954E]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#997B43] sm:text-xs">
                Welcome to Bhagalpur
              </span>
            </div>

            <h1 className="font-serif text-[clamp(2.8rem,5.3vw,5.2rem)] leading-[1.02] tracking-[-0.045em] text-[#29342D]">
              A stay to
              <span className="mt-1 block italic text-[#B9954E]">
                remember.
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-7 text-[#686A61] sm:text-base sm:leading-8">
              Discover comfortable rooms, thoughtful hospitality and elegant
              spaces for your special gatherings at Hotel Shantam Regency.
            </p>

            {/* Action Buttons */}
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#rooms"
                className="group inline-flex min-h-12 items-center justify-center gap-3 border border-[#B9954E] bg-[#C6A15B] px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-[#A9853E] hover:bg-[#A9853E] sm:px-6"
              >
                Explore Rooms
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>

              <a
                href="#events"
                className="inline-flex min-h-12 items-center justify-center border border-[#D9CBAF] px-5 py-3 text-sm text-[#354139] transition-all duration-300 hover:border-[#B9954E] hover:bg-[#F5EEDF] sm:px-6"
              >
                Plan an Event
              </a>
            </div>

            {/* Location Detail */}
            <div className="mt-8 flex items-center gap-3 border-t border-[#E4DACA] pt-5 text-[10px] uppercase tracking-[0.17em] text-[#77766D] sm:mt-10">
              <MapPin size={16} className="shrink-0 text-[#B9954E]" />
              <span>Adampur · Bhagalpur, Bihar</span>
            </div>
          </div>

          {/* Right Image */}
          <div
            className={`order-1 transition-all delay-150 duration-1000 ease-out md:order-2 ${
              loaded
                ? "translate-x-0 opacity-100"
                : "translate-x-5 opacity-0"
            }`}
          >
            <div className="group relative border border-[#D9CBAF] bg-[#EAE1D3] p-1.5 sm:p-2">
              <div className="relative h-[300px] overflow-hidden sm:h-[420px] md:h-[470px] lg:h-[540px]">
                <img
                  src={heroImage}
                  alt="Interior at Hotel Shantam Regency"
                  fetchPriority="high"
                  className="h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.035]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Image Caption */}
                <div className="absolute bottom-5 left-5 right-5 text-white sm:bottom-7 sm:left-7 sm:right-7">
                  <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[#F0D69B]">
                    Hotel Shantam Regency
                  </p>

                  <h2 className="max-w-md font-serif text-2xl leading-tight sm:text-3xl lg:text-4xl">
                    Comfort, hospitality
                    <span className="block italic text-[#F0D69B]">
                      and memorable moments.
                    </span>
                  </h2>

                  {/* Open Booking Enquiry Popup */}
                  <button
                    type="button"
                    onClick={onBookingClick}
                    className="group/link mt-4 inline-flex items-center gap-2 border border-white/60 bg-white/10 px-4 py-2.5 text-xs text-white backdrop-blur-sm transition-all duration-300 hover:border-[#D9B96D] hover:bg-[#C6A15B]"
                  >
                    Contact the Hotel
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Gold Accent */}
            <div className="ml-auto mt-3 flex w-fit items-center gap-3 border-b border-[#D9CBAF] pb-3 pl-5">
              <Sparkles size={17} className="text-[#B9954E]" />
              <span className="font-serif text-sm text-[#55594F]">
                Stay · Dine · Celebrate
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Information Strip */}
        <div className="mt-9 grid grid-cols-1 gap-3 border-y border-[#E4DACA] py-5 sm:mt-12 sm:grid-cols-3 sm:gap-5">
          {[
            "Comfortable Stays",
            "Gatherings & Celebrations",
            "Warm Hospitality",
          ].map((item, index) => (
            <div
              key={item}
              className={`flex items-center justify-center gap-3 text-center text-[10px] font-medium uppercase tracking-[0.13em] text-[#696A61] sm:text-xs ${
                index !== 0 ? "sm:border-l sm:border-[#E4DACA]" : ""
              }`}
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#C6A15B]" />
              {item}
            </div>
          ))}
        </div>

        {/* Scroll Button */}
        <a
          href="#rooms"
          aria-label="Explore rooms"
          className="mx-auto mt-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#D9CBAF] text-[#997B43] transition-all duration-300 hover:-translate-y-1 hover:bg-[#F5EEDF]"
        >
          <ArrowDown size={16} />
        </a>
      </div>
    </section>
  );
}

