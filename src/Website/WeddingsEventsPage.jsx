import { useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import Header from "../Component/Header.jsx";
import Footer from "../Component/Footer.jsx";
import BookingEnquiry from "../admin/Components/BookingEnquiry.jsx";
import banquetHallImage from "../assets/image/bouq.webp";
import weddingLawnImage from "../assets/image/de.webp";
import eventGalleryImage from "../assets/image/bouq.webp";

const eventSpaces = [
  {
    number: "01",
    title: "Banquet Hall",
    subtitle: "Elegant Indoor Celebrations",
    description:
      "Celebrate your special occasions in an elegant indoor setting. Contact our team to discuss your event requirements, arrangements and availability.",
    image: banquetHallImage,
    features: [
      "Indoor event space",
      "Wedding celebrations",
      "Family functions",
      "Event enquiries",
    ],
  },
  {
    number: "02",
    title: "Wedding Lawn",
    subtitle: "Beautiful Outdoor Gatherings",
    description:
      "Plan a memorable outdoor celebration with your family and guests. Connect with our team to discuss your preferred dates and event arrangements.",
    image: weddingLawnImage,
    features: [
      "Outdoor celebrations",
      "Wedding functions",
      "Special occasions",
      "Event enquiries",
    ],
  },
];

export default function WeddingsEventsPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const openEnquiry = () => setBookingOpen(true);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8F5ED] text-[#191919]">
      <Header onBookingClick={openEnquiry} />

      <main>
        {/* HERO — short, full-width background image */}
        <section className="relative isolate flex min-h-[330px] items-center justify-center overflow-hidden bg-[#24201A] px-5 pt-12 pb-8 text-center text-white sm:min-h-[370px] sm:px-8 sm:pt-14 sm:pb-10 lg:h-[470px] lg:min-h-0 lg:pt-16 lg:pb-10">
          <img
            src={banquetHallImage}
            alt="Banquet hall at Hotel Shantam Regency"
            fetchPriority="high"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center brightness-110 contrast-105 saturate-110"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
          {/* Keep the photograph visible; only add a light text-readability shade. */}
          <div className="absolute inset-0 -z-10 bg-black/15" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/55 via-black/20 to-black/10" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/35 via-transparent to-black/10" />

          <div className="relative mx-auto w-full max-w-4xl translate-y-3 py-5 sm:translate-y-4">
            <div className="mb-5 inline-flex items-center gap-2 border border-[#E5C77F]/65 bg-black/15 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[#FFE6A5] backdrop-blur-[2px] sm:text-xs">
              <Sparkles size={14} />
              Celebrations at Shantam Regency
            </div>

            <h1 className="font-serif text-4xl leading-[1.08] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] sm:text-6xl lg:text-7xl">
              Your Special Day,
              <span className="mt-2 block italic text-[#F3D58B]">
                Beautifully Celebrated.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/95 drop-shadow sm:mt-6 sm:text-base sm:leading-8">
              From wedding celebrations to family gatherings, explore our event
              spaces and connect with our team to plan your occasion.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row">
              <button
                type="button"
                onClick={openEnquiry}
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#E5C77F] bg-[#D6B66D] px-7 py-3 text-sm font-semibold text-black shadow-lg transition-all duration-300 hover:bg-[#F0D58E]"
              >
                Plan Your Event <ArrowUpRight size={17} />
              </button>

              <a
                href="#event-spaces"
                className="inline-flex min-h-12 items-center justify-center border border-white/75 bg-black/15 px-7 py-3 text-sm text-white backdrop-blur-sm transition-all duration-300 hover:border-[#E5C77F] hover:bg-black/30 hover:text-[#FFE6A5]"
              >
                Explore Event Spaces
              </a>
            </div>
          </div>
        </section>

        {/* INTRODUCTION */}
        <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 md:items-end">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#A17D32]">
                Moments That Matter
              </p>
              <h2 className="font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
                A setting for your
                <span className="italic text-[#A17D32]"> celebrations.</span>
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-black/60 sm:text-base sm:leading-8">
              Every celebration starts with a plan. Tell us about your occasion,
              preferred date and requirements so our team can discuss the
              available arrangements with you.
            </p>
          </div>
        </section>

        {/* EVENT SPACES */}
        <section
          id="event-spaces"
          className="scroll-mt-24 px-5 pb-16 sm:px-8 sm:pb-24 lg:px-12"
        >
          <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-2">
            {eventSpaces.map((space) => (
              <article
                key={space.number}
                className="group overflow-hidden border border-black/[0.07] bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.09)]"
              >
                <div className="relative h-64 overflow-hidden bg-[#E8E0D0] sm:h-80">
                  <img
                    src={space.image}
                    alt={space.title}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 border border-white/50 bg-black/25 px-3 py-2 text-xs tracking-widest text-white backdrop-blur-sm">
                    SPACE {space.number}
                  </span>
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#FFE09A]">
                      {space.subtitle}
                    </p>
                    <h3 className="font-serif text-3xl text-white sm:text-4xl">
                      {space.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <p className="text-sm leading-7 text-black/60">
                    {space.description}
                  </p>
                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {space.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-xs text-black/70 sm:text-sm"
                      >
                        <CheckCircle2
                          size={16}
                          className="shrink-0 text-[#A17D32]"
                        />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={openEnquiry}
                    className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 border border-[#C7A75D] px-5 py-3.5 text-sm font-semibold transition-all duration-300 hover:bg-[#D6B66D] hover:text-black sm:w-auto"
                  >
                    Enquire About This Space <ArrowUpRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>


        {/* EVENT PLANNING DETAILS */}
        <section className="bg-white px-5 py-14 sm:px-8 sm:py-18 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#A17D32]">
                Thoughtfully Planned
              </p>
              <h2 className="font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
                Every detail matters on your special day.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-black/60 sm:text-base sm:leading-8">
                From choosing the right event space to discussing your arrangements,
                our team can help you plan the next steps for your celebration.
                Share your requirements and preferred date with us.
              </p>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Choose Your Space",
                  description: "Explore the indoor banquet hall or outdoor wedding lawn for your occasion.",
                },
                {
                  title: "Discuss Your Date",
                  description: "Tell us your preferred date so the team can discuss availability.",
                },
                {
                  title: "Share Requirements",
                  description: "Let us know your event type, guest expectations and arrangement needs.",
                },
                {
                  title: "Plan With Our Team",
                  description: "Connect with the hotel team to discuss the next steps for your event.",
                },
              ].map((item, index) => (
                <article
                  key={item.title}
                  className="border border-[#D8C7A3]/70 bg-[#F8F5ED] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="mb-5 inline-flex h-10 w-10 items-center justify-center border border-[#C7A75D] font-serif text-lg text-[#92702E]">
                    0{index + 1}
                  </span>
                  <h3 className="font-serif text-xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-black/60">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ENQUIRY CTA */}
        <section className="bg-[#EDE5D5] px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-7 md:flex-row md:items-center">
            <div>
              <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#92702E]">
                <CalendarDays size={16} /> Start Planning
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl">
                Let's plan your celebration.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-black/60">
                Share your event date and requirements with our team.
                Availability and arrangements will be discussed after your
                enquiry.
              </p>
            </div>
            <button
              type="button"
              onClick={openEnquiry}
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 bg-[#171717] px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#D6B66D] hover:text-black"
            >
              Send an Enquiry <ArrowUpRight size={17} />
            </button>
          </div>
        </section>

        <p className="px-5 py-5 text-center text-xs leading-6 text-black/45">
          Event availability, facilities, arrangements and pricing must be
          confirmed directly with the hotel.
        </p>
      </main>

      <Footer />
      <BookingEnquiry
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  );
}
