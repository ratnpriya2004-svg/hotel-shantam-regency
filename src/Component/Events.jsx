import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Heart, Users, Sparkles } from "lucide-react";

import banquetImage from "../assets/image/bouq.webp";
import lawnImage from "../assets/image/dec.webp";

const venues = [
  {
    title: "Banquet Hall",
    text: "A venue to bring people together for celebrations and gatherings.",
    image: banquetImage,
    icon: Users,
    number: "01",
  },
  {
    title: "Marriage Lawn",
    text: "An open-air setting for your special occasion.",
    image: lawnImage,
    icon: Heart,
    number: "02",
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
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 650ms ease ${delay}ms, transform 650ms ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Events() {
  return (
    <section
      id="events"
      className="overflow-hidden bg-[#F1E7D8] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="mx-auto max-w-[1240px]">
        {/* Section heading */}
        <Reveal className="mb-10 flex flex-col justify-between gap-5 sm:mb-12 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#C6A15B]" />
              <Sparkles size={15} className="text-[#B9954E]" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.27em] text-[#997B43]">
                Make It Memorable
              </p>
            </div>

            <h2 className="max-w-2xl font-['IBM_Plex_Serif'] text-4xl leading-tight tracking-[-0.04em] text-[#29342D] sm:text-5xl lg:text-6xl">
              Gather, celebrate,
              <span className="block italic text-[#B9954E]">
                connect.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-[#696A62] sm:text-base">
            Planning a special occasion? Contact the hotel to discuss venue
            options, availability and arrangements for your event.
          </p>
        </Reveal>

        {/* Venue cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {venues.map(({ title, text, image, icon: Icon, number }, index) => (
            <Reveal key={title} delay={index * 130}>
              <article className="group relative h-full overflow-hidden border border-[#D9C5A2] bg-[#E7DDCE] p-1.5">
                <div className="relative min-h-[370px] overflow-hidden sm:min-h-[450px] lg:min-h-[490px]">
                  <img
                    src={image}
                    alt={`${title} at Hotel Shantam Regency`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Subtle image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#201D17]/90 via-[#201D17]/25 to-[#201D17]/5 transition-opacity duration-500 group-hover:opacity-95" />

                  {/* Venue number */}
                  <span className="absolute left-5 top-5 border border-white/60 bg-[#FFFAF3]/90 px-3 py-2 text-[10px] tracking-[0.2em] text-[#72582D] backdrop-blur-sm sm:left-7 sm:top-7">
                    VENUE {number}
                  </span>

                  {/* Venue content */}
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-8 lg:p-9">
                    <Icon
                      size={25}
                      strokeWidth={1.4}
                      className="mb-4 text-[#E9CD91] transition-transform duration-300 group-hover:-translate-y-1"
                    />

                    <h3 className="font-['IBM_Plex_Serif'] text-3xl sm:text-4xl">
                      {title}
                    </h3>

                    <p className="mt-3 max-w-md text-sm leading-7 text-white/85">
                      {text}
                    </p>

                    <a
                      href="#contact"
                      className="group/link mt-6 inline-flex items-center gap-3 border-b border-[#E9CD91] pb-2 text-sm text-white transition-colors duration-300 hover:text-[#E9CD91]"
                    >
                      Enquire About This Venue

                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
                      />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Bottom note */}
        <Reveal delay={100} className="mt-6">
          <div className="flex items-start gap-3 border-t border-[#DCC9A7] pt-5 text-xs leading-6 text-[#77766D]">
            <Sparkles size={16} className="mt-0.5 shrink-0 text-[#B9954E]" />

            <p>
              Venue capacity, packages, facilities and available dates should
              be confirmed directly with hotel management.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

