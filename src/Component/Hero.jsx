import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../assets/image/hhotel.png";

export default function Hero({ onBookingClick }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const actionButton =
    "group inline-flex min-h-12 items-center justify-center gap-2 border px-5 py-3 text-xs font-medium tracking-wide transition-all duration-300 sm:text-sm";

  return (
    <section id="home" className="relative bg-[#f8f6f1] pb-12 text-white">
      {/* Hero image and centered overlapping content */}
      <div className="relative mx-auto h-[min(76svh,760px)] min-h-[500px] w-full overflow-hidden bg-black sm:min-h-[560px] lg:h-[min(82svh,820px)]">
        <img
          src={heroImage}
          alt="Hotel Shantam Regency, Bhagalpur"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[center_45%] brightness-110 contrast-110 saturate-110"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />

        <div
          className={`relative z-10 mx-auto flex h-full w-full max-w-[1440px] items-center justify-center px-5 pb-16 pt-10 text-center transition-all duration-1000 ease-out sm:px-8 lg:px-12 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <div className="w-full max-w-4xl">
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-9 bg-[#D9B96D]" />
              <Sparkles size={16} className="shrink-0 text-[#E5C77F]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#F0D69B] sm:text-xs">
                Welcome to Bhagalpur
              </span>
              <span className="h-px w-9 bg-[#D9B96D]" />
            </div>

            <h1 className="font-serif text-[clamp(3rem,7.5vw,6.5rem)] leading-[0.98] tracking-[-0.04em] text-white drop-shadow-lg">
              A stay to
              <span className="mt-2 block italic text-[#E5C77F]">
                remember.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/95 drop-shadow sm:text-base sm:leading-8 md:text-lg">
              Discover comfortable rooms, thoughtful hospitality and elegant
              spaces for your special gatherings at Hotel Shantam Regency.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#events"
                className={`${actionButton} border-[#D6B66D] bg-[#D6B66D] text-black hover:border-[#E5C77F] hover:bg-[#E5C77F]`}
              >
                Plan Your Wedding
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>

              <button
                type="button"
                onClick={onBookingClick}
                className={`${actionButton} border-white/70 bg-black/20 text-white backdrop-blur-sm hover:border-[#E5C77F] hover:bg-black/40`}
              >
                Contact Hotel
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3 text-xs tracking-wide text-white/95 sm:text-sm">
              <MapPin size={17} className="shrink-0 text-[#E5C77F]" />
              <span>Adampur · Bhagalpur, Bihar</span>
            </div>
          </div>
        </div>

        <a
          href="#rooms"
          aria-label="Scroll to explore rooms"
          className="absolute bottom-5 left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-white/50 bg-black/20 text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#E5C77F] hover:bg-white/10"
        >
          <ArrowDown size={17} />
        </a>
      </div>

      {/* Booking panel intentionally overlaps the hero image, like the reference */}
      <div className="relative z-20 mx-auto -mt-8 w-[calc(100%-2rem)] max-w-5xl rounded-xl border border-black/5 bg-white px-4 py-5 text-[#27231e] shadow-[0_18px_45px_rgba(0,0,0,0.18)] sm:-mt-10 sm:px-6 md:-mt-12 md:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr_0.55fr_auto] lg:items-end lg:gap-4">
          <label className="block text-left text-xs font-medium text-[#625c53]">
            E-mail
            <input
              type="email"
              placeholder="Please enter your E-mail"
              className="mt-2 h-10 w-full rounded-md border border-[#d9d4cb] px-3 text-sm outline-none transition focus:border-[#b99756] focus:ring-2 focus:ring-[#d6b66d]/25"
            />
          </label>

          <label className="block text-left text-xs font-medium text-[#625c53]">
            Room Type
            <select className="mt-2 h-10 w-full rounded-md border border-[#d9d4cb] bg-white px-3 text-sm outline-none focus:border-[#b99756]">
              <option value="">Select a room</option>
              <option>Deluxe Room</option>
              <option>Executive Room</option>
              <option>Suite</option>
            </select>
          </label>

          <label className="block text-left text-xs font-medium text-[#625c53]">
            Check-in
            <input
              type="date"
              className="mt-2 h-10 w-full rounded-md border border-[#d9d4cb] px-3 text-sm outline-none focus:border-[#b99756]"
            />
          </label>

          <label className="block text-left text-xs font-medium text-[#625c53]">
            Check-out
            <input
              type="date"
              className="mt-2 h-10 w-full rounded-md border border-[#d9d4cb] px-3 text-sm outline-none focus:border-[#b99756]"
            />
          </label>

          <label className="block text-left text-xs font-medium text-[#625c53]">
            Guests
            <input
              type="number"
              min="1"
              defaultValue="1"
              className="mt-2 h-10 w-full rounded-md border border-[#d9d4cb] px-3 text-sm outline-none focus:border-[#b99756]"
            />
          </label>

          <button
            type="button"
            onClick={onBookingClick}
            className="inline-flex h-10 items-center justify-center rounded-md bg-[#d92e50] px-6 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#b91f3e] focus:outline-none focus:ring-2 focus:ring-[#d92e50]/40"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Home links should always return to the homepage */}
      <div className="sr-only">
        <Link to="/" aria-label="Home">Home</Link>
      </div>
    </section>
  );
}
