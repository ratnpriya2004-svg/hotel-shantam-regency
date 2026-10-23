import { useEffect, useRef, useState } from "react";
import {
  Wifi,
  CarFront,
  Clock3,
  Utensils,
  Coffee,
  Shirt,
  Sparkles,
  HeartPulse,
  Languages,
  Building2,
  Cigarette,
  ConciergeBell,
  X,
  ArrowUpRight,
  Check,
} from "lucide-react";

const facilities = [
  {
    icon: Wifi,
    title: "Free Wi-Fi",
    description: "Complimentary Wi-Fi in guest rooms and public areas.",
  },
  {
    icon: CarFront,
    title: "Car Parking",
    description: "On-site car parking is listed among the property facilities.",
  },
  {
    icon: Clock3,
    title: "24-Hour Check-in",
    description: "The property listing indicates 24-hour check-in.",
  },
  {
    icon: ConciergeBell,
    title: "Front Desk",
    description: "A 24-hour front desk is listed by the property.",
  },
  {
    icon: Utensils,
    title: "Restaurant",
    description: "Restaurant facilities are listed at the property.",
  },
  {
    icon: Coffee,
    title: "Breakfast",
    description: "Breakfast is available. Charges may apply depending on your booking.",
  },
  {
    icon: Shirt,
    title: "Laundry Service",
    description: "Laundry service is listed among the available services.",
  },
  {
    icon: Sparkles,
    title: "Daily Housekeeping",
    description: "Daily housekeeping is listed among the guest services.",
  },
  {
    icon: HeartPulse,
    title: "Medical Assistance",
    description: "Doctor or nurse assistance is listed as an available service.",
  },
  {
    icon: Building2,
    title: "Elevator",
    description: "An elevator is listed among the property facilities.",
  },
  {
    icon: Languages,
    title: "English & Hindi",
    description: "English and Hindi are listed as supported languages.",
  },
  {
    icon: Cigarette,
    title: "Smoking Area",
    description: "A smoking area is listed among the property facilities.",
  },
];

function Reveal({ children, className = "" }) {
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
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: "opacity 600ms ease, transform 600ms ease",
      }}
    >
      {children}
    </div>
  );
}

export default function Facilities() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <section
      id="facilities"
      className="overflow-hidden bg-[#F7F0E6] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <Reveal className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#C6A15B]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#997B43]">
              Comfort & Convenience
            </span>

            <span className="h-px w-8 bg-[#C6A15B]" />
          </div>

          <h2 className="font-['IBM_Plex_Serif'] text-4xl leading-tight tracking-[-0.035em] text-[#29342D] sm:text-5xl lg:text-6xl">
            Everything for
            <span className="mt-1 block italic text-[#B9954E]">
              a comfortable stay.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#696A62] sm:text-base">
            Explore the facilities and guest services listed at Hotel
            Shantam Regency, Bhagalpur.
          </p>
        </Reveal>

        {/* Single clickable card */}
        <Reveal>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            className="group relative block w-full overflow-hidden border border-[#DFD0B7] bg-[#FFFAF3] p-6 text-left transition-all duration-500 hover:-translate-y-1 hover:border-[#C6A15B] hover:shadow-[0_18px_45px_rgba(91,70,35,0.10)] sm:p-9 lg:p-10"
          >
            {/* Decorative gold detail */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-[#C6A15B]/25 transition-transform duration-700 group-hover:scale-125" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-[#D8C5A4] bg-[#F1E7D8] text-[#A9853E] transition-all duration-500 group-hover:bg-[#C6A15B] group-hover:text-white sm:h-20 sm:w-20">
                <Building2 size={32} strokeWidth={1.3} />
              </div>

              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#997B43]">
                  Discover More
                </span>

                <h3 className="mt-2 font-['IBM_Plex_Serif'] text-2xl text-[#29342D] sm:text-3xl">
                  Hotel Facilities
                </h3>

                <p className="mt-3 max-w-lg text-sm leading-7 text-[#696A62]">
                  Wi-Fi, parking, dining, housekeeping and more. Open the
                  facilities guide to explore the complete list.
                </p>

                <span className="mt-5 inline-flex items-center gap-2 border border-[#C6A15B] bg-[#C6A15B] px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#A9853E]">
                  View All Facilities
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </span>
              </div>

              <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#DCC9A7] text-[#A9853E] transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#F1E7D8] sm:flex">
                <ArrowUpRight size={21} />
              </div>
            </div>

            {/* Preview amenities */}
            <div className="relative mt-7 flex flex-wrap gap-2 border-t border-[#E3D3B8] pt-5 sm:mt-8">
              {["Free Wi-Fi", "Parking", "Restaurant", "Housekeeping"].map(
                (item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 border border-[#E4D7C2] bg-[#F7F0E6] px-3 py-2 text-xs text-[#5B645A]"
                  >
                    <Check size={13} className="text-[#B9954E]" />
                    {item}
                  </span>
                )
              )}
            </div>
          </button>
        </Reveal>
      </div>

      {/* Center modal */}
      {isOpen && (
        <div
          className="facilities-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-[#28251F]/70 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="facilities-modal-title"
            className="facilities-modal flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden border border-[#D9C59A] bg-[#F7F0E6] shadow-2xl"
          >
            {/* Modal header */}
            <div className="relative shrink-0 border-b border-[#E3D3B8] px-5 py-5 sm:px-8 sm:py-7">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close facilities"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-[#DCC9A7] bg-[#FFFAF3] text-[#29342D] transition hover:bg-[#C6A15B] hover:text-white sm:right-6 sm:top-6"
              >
                <X size={19} />
              </button>

              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-7 bg-[#C6A15B]" />
                <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#997B43] sm:text-[10px]">
                  Hotel Shantam Regency
                </span>
              </div>

              <h3
                id="facilities-modal-title"
                className="pr-10 font-['IBM_Plex_Serif'] text-3xl text-[#29342D] sm:text-4xl"
              >
                Our Facilities
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#696A62]">
                Explore the amenities and services listed for your stay.
              </p>
            </div>

            {/* Scrollable facilities */}
            <div className="overflow-y-auto px-5 py-5 sm:px-8 sm:py-7">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {facilities.map((facility) => {
                  const Icon = facility.icon;

                  return (
                    <div
                      key={facility.title}
                      className="group flex gap-3 border border-[#E3D3B8] bg-[#FFFAF3] p-4 transition-all duration-300 hover:border-[#C6A15B] hover:shadow-sm"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#E0CFB0] bg-[#F1E7D8] text-[#A9853E] transition-colors duration-300 group-hover:bg-[#C6A15B] group-hover:text-white">
                        <Icon size={20} strokeWidth={1.5} />
                      </div>

                      <div>
                        <h4 className="font-['IBM_Plex_Serif'] text-lg text-[#29342D]">
                          {facility.title}
                        </h4>

                        <p className="mt-1 text-xs leading-6 text-[#696A62]">
                          {facility.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="mt-6 border-t border-[#E3D3B8] pt-5 text-xs leading-6 text-[#77766D]">
                Services and availability may vary. Please contact the hotel
                to confirm specific requirements before your visit.
              </p>
            </div>

            {/* Modal footer */}
            <div className="flex shrink-0 justify-end border-t border-[#E3D3B8] bg-[#FFFAF3] px-5 py-4 sm:px-8">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="border border-[#C6A15B] bg-[#C6A15B] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#A9853E]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .facilities-modal {
          animation: facilitiesModalIn 240ms ease both;
        }

        @keyframes facilitiesModalIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.99);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .facilities-modal {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}