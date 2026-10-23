import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, BedDouble, Sparkles } from "lucide-react";

import executiveRoom from "../assets/image/rrrrom.webp";
import deluxeRoom from "../assets/image/rooom.webp";
import premiumRoom from "../assets/image/room.webp";

const roomCards = [
  {
    name: "Executive Room",
    image: executiveRoom,
    note: "A restful space for your stay.",
    number: "01",
  },
  {
    name: "Deluxe Room",
    image: deluxeRoom,
    note: "Comfort and simplicity, thoughtfully arranged.",
    number: "02",
  },
  {
    name: "Premium Room",
    image: premiumRoom,
    note: "More room to settle in and unwind.",
    number: "03",
  },
];

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.12 }
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
        transform: visible ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 650ms ease ${delay}ms, transform 650ms ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Rooms() {
  return (
    <section
      id="rooms"
      className="overflow-hidden bg-[#F7F0E6] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="mx-auto max-w-[1240px]">
        {/* Section heading */}
        <Reveal className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-[#C6A15B]" />
            <Sparkles size={15} className="text-[#B9954E]" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#997B43]">
              Your Stay, Your Way
            </p>
            <span className="h-px w-9 bg-[#C6A15B]" />
          </div>

          <h2 className="font-['IBM_Plex_Serif'] text-4xl leading-tight tracking-[-0.04em] text-[#29342D] sm:text-5xl lg:text-6xl">
            Find your kind of
            <span className="block italic text-[#B9954E]">
              comfort.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#696A62] sm:text-base">
            Explore our room categories and contact the hotel for current
            rates, availability and confirmed amenities.
          </p>
        </Reveal>

        {/* Room cards */}
        <div className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:gap-8">
          {roomCards.map((room, index) => (
            <Reveal
              key={room.name}
              delay={index * 120}
              className={`min-w-0 ${index === 1 ? "md:mt-8" : ""}`}
            >
              <article className="group h-full">
                {/* Image card */}
                <a
                  href="#contact"
                  aria-label={`Enquire about ${room.name}`}
                  className="relative block overflow-hidden border border-[#DFD0B7] bg-[#EAE0D1] p-1.5"
                >
                  <div className="relative aspect-[4/4.6] overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Soft overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E241E]/45 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Room number */}
                    <span className="absolute left-4 top-4 border border-white/60 bg-[#FFFCF7]/90 px-3 py-2 text-[10px] tracking-[0.18em] text-[#4A4B40] backdrop-blur-sm">
                      ROOM {room.number}
                    </span>

                    {/* Enquiry icon */}
                    <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-[#E5D2A8] bg-[#F7F0E6] text-[#8D6B31] transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#C6A15B] group-hover:text-white">
                      <ArrowUpRight size={19} />
                    </span>

                    {/* Image caption */}
                    <div className="absolute bottom-5 left-5 right-16 translate-y-2 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="font-['IBM_Plex_Serif'] text-xl italic">
                        Discover your stay
                      </p>
                    </div>
                  </div>
                </a>

                {/* Room information */}
                <div className="border-b border-[#DCCDB5] py-5 sm:py-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-['IBM_Plex_Serif'] text-xl tracking-[-0.025em] text-[#29342D] transition-colors duration-300 group-hover:text-[#A9853E] sm:text-2xl">
                        {room.name}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[#77766D]">
                        {room.note}
                      </p>
                    </div>

                    <BedDouble
                      size={22}
                      strokeWidth={1.4}
                      className="mt-1 shrink-0 text-[#B9954E] transition-transform duration-300 group-hover:-translate-y-1"
                    />
                  </div>

                  <a
                    href="#contact"
                    className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-[#8D6B31] transition-colors duration-300 hover:text-[#29342D]"
                  >
                    Enquire about room
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Bottom enquiry panel */}
        <Reveal delay={100} className="mt-10 sm:mt-14">
          <div className="flex flex-col gap-5 border border-[#DFD0B7] bg-[#FFFAF3]/80 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#997B43]">
                <span className="h-px w-6 bg-[#C6A15B]" />
                Plan Your Stay
              </p>

              <h3 className="font-['IBM_Plex_Serif'] text-xl text-[#29342D] sm:text-2xl">
                Looking for the right room?
              </h3>

              <p className="mt-2 max-w-lg text-sm leading-6 text-[#77766D]">
                Contact our team to enquire about room options, current rates
                and availability.
              </p>
            </div>

            <a
              href="#contact"
              className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-3 border border-[#C6A15B] bg-[#C6A15B] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-[#A9853E] hover:bg-[#A9853E]"
            >
              Ask About Rooms
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

