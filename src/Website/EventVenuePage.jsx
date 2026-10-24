import { useState } from "react";

import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  MapPin,
  Sparkles,
  Users,
  PartyPopper,
  BriefcaseBusiness,
  Baby,
  Cake,
} from "lucide-react";

import Header from "../Component/Header.jsx";
import Footer from "../Component/Footer.jsx";
import BookingEnquiry from "../admin/Components/BookingEnquiry.jsx";

// All 8 event images
import eventVenueImage from "../assets/image/birt.webp";
import conferenceImage from "../assets/image/wor.webp";
import babyCelebrationImage from "../assets/image/baby.webp";
import birthdayDecorImage from "../assets/image/chhi.webp";
import pinkBirthdayImage from "../assets/image/birt.webp";
import venueInteriorImage from "../assets/image/ven.webp";
import conferenceRoomImage from "../assets/image/ch.webp";
import birthdayStageImage from "../assets/image/bir.webp";

// Event categories and details
const eventTypes = [
  {
    number: "01",
    title: "Corporate Events & Conferences",
    category: "Business Gatherings",
    description:
      "Organise professional meetings, conferences, presentations and business gatherings. Discuss your seating layout, presentation requirements, expected attendance and preferred schedule with the hotel team.",
    image: conferenceImage,
    icon: BriefcaseBusiness,
    features: [
      "Business meetings",
      "Conference enquiries",
      "Presentation setup discussion",
      "Guest seating arrangements",
    ],
  },
  {
    number: "02",
    title: "Birthday Celebrations",
    category: "Make a Wish",
    description:
      "Celebrate birthdays with friends and family in a festive setting. Share your decoration theme, preferred date and guest count to discuss suitable arrangements for your special day.",
    image: pinkBirthdayImage,
    icon: Cake,
    features: [
      "Birthday celebrations",
      "Family gatherings",
      "Theme decoration enquiries",
      "Special celebration setup",
    ],
  },
  {
    number: "03",
    title: "Kids' Parties & Baby Celebrations",
    category: "Little Moments, Big Memories",
    description:
      "Make your child's special day memorable with colourful decoration ideas and a joyful atmosphere. Discuss themed backdrops, balloon decorations, seating and other requirements with the team.",
    image: babyCelebrationImage,
    icon: Baby,
    features: [
      "Kids' birthday parties",
      "Baby milestone celebrations",
      "Themed decoration enquiries",
      "Family-friendly gatherings",
    ],
  },
  {
    number: "04",
    title: "Private Parties & Special Occasions",
    category: "Celebrate Together",
    description:
      "Bring friends and family together for anniversaries, reunions and other personal occasions. Share your plans with the team to discuss venue options and possible arrangements.",
    image: birthdayDecorImage,
    icon: PartyPopper,
    features: [
      "Private celebrations",
      "Anniversaries and reunions",
      "Custom decoration enquiries",
      "Indoor event options",
    ],
  },
];

// Gallery with the remaining event images
const venueGallery = [
  {
    image: eventVenueImage,
    title: "Event Venue",
    description:
      "Explore the venue and discuss which setting suits your planned gathering.",
  },
  {
    image: venueInteriorImage,
    title: "Elegant Interior",
    description:
      "Discuss the interior setting and possible arrangements for your event.",
  },
  {
    image: conferenceRoomImage,
    title: "Conference & Function Setup",
    description:
      "Ask the team about seating and presentation requirements.",
  },
  {
    image: birthdayStageImage,
    title: "Celebration Decoration",
    description:
      "Share your preferred decoration style and celebration theme.",
  },
];

const planningSteps = [
  {
    number: "01",
    title: "Share Your Occasion",
    description:
      "Tell us whether you are planning a conference, birthday party, kids' celebration or private gathering.",
  },
  {
    number: "02",
    title: "Discuss Your Requirements",
    description:
      "Share your preferred date, expected guest count, seating needs and decoration ideas.",
  },
  {
    number: "03",
    title: "Explore Venue Options",
    description:
      "Discuss the available venue settings and arrangements suitable for your occasion.",
  },
  {
    number: "04",
    title: "Confirm the Details",
    description:
      "Contact the hotel team to confirm availability, facilities, pricing and final arrangements.",
  },
];

export default function EventVenuePage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  const openEnquiry = () => setBookingOpen(true);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8F5ED] text-[#191919]">
      <Header onBookingClick={openEnquiry} />

      <main>
        {/* ================= HERO SECTION ================= */}

        <section className="relative isolate flex min-h-[330px] items-center justify-center overflow-hidden bg-[#24201A] px-5 pb-8 pt-12 text-center text-white sm:min-h-[370px] sm:px-8 sm:pb-10 sm:pt-14 lg:h-[470px] lg:min-h-0 lg:pt-16">
          <img
            src={eventVenueImage}
            alt="Event venue interior"
            fetchPriority="high"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center brightness-110 contrast-105 saturate-110"
          />

          <div className="absolute inset-0 -z-10 bg-black/15" />

          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/55 via-black/20 to-black/10" />

          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/35 via-transparent to-black/10" />

          <div className="relative mx-auto w-full max-w-4xl translate-y-3 py-5 sm:translate-y-4">
            <div className="mb-5 inline-flex items-center gap-2 border border-[#E5C77F]/65 bg-black/15 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[#FFE6A5] backdrop-blur-sm sm:text-xs">
              <Sparkles size={14} />
              Events & Gatherings
            </div>

            <h1 className="font-serif text-4xl leading-tight drop-shadow-lg sm:text-6xl lg:text-7xl">
              A Venue for Every
              <span className="mt-2 block italic text-[#F3D58B]">
                Special Moment.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/95 sm:mt-6 sm:text-base sm:leading-8">
              From corporate meetings to birthday celebrations, discover
              event possibilities and plan your next memorable gathering
              with our team.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={openEnquiry}
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#E5C77F] bg-[#D6B66D] px-7 py-3 text-sm font-semibold text-black shadow-lg transition duration-300 hover:bg-[#F0D58E]"
              >
                Plan Your Event
                <ArrowUpRight size={17} />
              </button>

              <a
                href="#event-types"
                className="inline-flex min-h-12 items-center justify-center border border-white/75 bg-black/15 px-7 py-3 text-sm text-white transition duration-300 hover:border-[#E5C77F] hover:bg-black/30 hover:text-[#FFE6A5]"
              >
                Explore Events
              </a>
            </div>
          </div>
        </section>

        {/* ================= INTRODUCTION ================= */}

        <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 md:items-end">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#A17D32]">
                Made for Gathering
              </p>

              <h2 className="font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
                Your occasion, your way.
                <span className="mt-2 block italic text-[#A17D32]">
                  Let's make it memorable.
                </span>
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-black/60 sm:text-base sm:leading-8">
              Every gathering has its own character. Whether you are bringing
              colleagues together or celebrating a milestone with loved ones,
              tell us about your event, preferred date and requirements.
              Our team can discuss suitable venue options and possible
              arrangements with you.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-7xl gap-4 sm:grid-cols-3">
            {[
              {
                icon: MapPin,
                title: "Venue Options",
                description:
                  "Explore event spaces and discuss a layout suitable for your occasion.",
              },
              {
                icon: Users,
                title: "Guest Requirements",
                description:
                  "Share your expected guest count and seating preferences.",
              },
              {
                icon: CalendarDays,
                title: "Date & Planning",
                description:
                  "Ask the team about availability and event arrangements.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex gap-4 border border-[#D8C7A3]/70 bg-white p-5 transition duration-300 hover:shadow-md sm:p-6"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#F1E6CE] text-[#92702E]">
                    <Icon size={20} />
                  </span>

                  <div>
                    <h3 className="font-serif text-lg">{item.title}</h3>

                    <p className="mt-2 text-sm leading-6 text-black/60">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= EVENT TYPES ================= */}

        <section
          id="event-types"
          className="scroll-mt-24 px-5 pb-16 sm:px-8 sm:pb-24 lg:px-12"
        >
          <div className="mx-auto mb-8 max-w-7xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#A17D32]">
              Explore Event Possibilities
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl">
              What are you celebrating?
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-black/60 sm:text-base">
              Choose the type of event you are planning and send an enquiry
              to discuss the details.
            </p>
          </div>

          <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-2">
            {eventTypes.map((event) => {
              const Icon = event.icon;

              return (
                <article
                  key={event.number}
                  className="group overflow-hidden border border-black/[0.07] bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.09)]"
                >
                  <div className="relative h-64 overflow-hidden bg-[#E8E0D0] sm:h-80">
                    <img
                      src={event.image}
                      alt={event.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />

                    <span className="absolute left-5 top-5 border border-white/50 bg-black/25 px-3 py-2 text-xs tracking-widest text-white backdrop-blur-sm">
                      EVENT {event.number}
                    </span>

                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#FFE09A]">
                        <Icon size={15} />
                        {event.category}
                      </div>

                      <h3 className="font-serif text-2xl text-white sm:text-3xl">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <p className="text-sm leading-7 text-black/60">
                      {event.description}
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {event.features.map((feature) => (
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
                      className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 border border-[#C7A75D] px-5 py-3.5 text-sm font-semibold transition duration-300 hover:bg-[#D6B66D] hover:text-black sm:w-auto"
                    >
                      Enquire About This Event
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ================= IMAGE GALLERY ================= */}

        <section className="bg-white px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 max-w-3xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#A17D32]">
                A Look Around
              </p>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl">
                Spaces & Celebration Inspiration
              </h2>

              <p className="mt-4 text-sm leading-7 text-black/60 sm:text-base">
                Browse the venue photographs for inspiration. Actual layouts,
                facilities and decoration options should be confirmed with
                the hotel team.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {venueGallery.map((item) => (
                <article
                  key={item.title}
                  className="group overflow-hidden border border-[#D8C7A3]/70 bg-[#F8F5ED]"
                >
                  <div className="h-56 overflow-hidden bg-[#E8E0D0]">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="font-serif text-xl">{item.title}</h3>

                    <p className="mt-2 text-sm leading-6 text-black/60">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= EVENT PLANNING STEPS ================= */}

        <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#A17D32]">
                Simple Planning
              </p>

              <h2 className="font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
                From First Enquiry to Event Day
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-black/60 sm:text-base sm:leading-8">
                Start with a few details about your event. The team can help
                you understand availability and discuss arrangements relevant
                to your plans.
              </p>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {planningSteps.map((step) => (
                <article
                  key={step.number}
                  className="border border-[#D8C7A3]/70 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="mb-5 inline-flex h-10 w-10 items-center justify-center border border-[#C7A75D] font-serif text-lg text-[#92702E]">
                    {step.number}
                  </span>

                  <h3 className="font-serif text-xl">{step.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-black/60">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FINAL ENQUIRY SECTION ================= */}

        <section className="bg-[#EDE5D5] px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-7 md:flex-row md:items-center">
            <div>
              <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#92702E]">
                <CalendarDays size={16} />
                Start Planning
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl">
                Let's Plan Something Memorable
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-black/60">
                Share the occasion, preferred date, expected guest count and
                other requirements. The hotel team can discuss availability,
                facilities and pricing with you.
              </p>
            </div>

            <button
              type="button"
              onClick={openEnquiry}
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 bg-[#171717] px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-[#D6B66D] hover:text-black"
            >
              Send an Enquiry
              <ArrowUpRight size={17} />
            </button>
          </div>
        </section>
      </main>

      <Footer />

      <BookingEnquiry
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  );
}