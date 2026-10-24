import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  Coffee,
  Headphones,
  Hotel,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
  Wifi,
} from "lucide-react";

import Header from "../Component/Header.jsx";
import Footer from "../Component/Footer.jsx";
import BookingEnquiry from "../admin/Components/BookingEnquiry.jsx";
import roomHeroImage from "../assets/image/rooom.webp"

import executiveRoom from "../assets/image/rrrrom.webp";
import deluxeRoom from "../assets/image/rooom.webp";
import premiumRoom from "../assets/image/room.webp";

const roomCategories = [
  {
    number: "01",
    name: "Executive Room",
    subtitle: "Comfort Meets Simplicity",
    description:
      "A welcoming space designed for guests who appreciate comfort, convenience and a relaxing atmosphere after a busy day.",
    image: executiveRoom,
    size: "Contact hotel for details",
    guests: "Confirm occupancy with hotel",
    features: [
      "Comfortable sleeping space",
      "Private room accommodation",
      "Essential guest conveniences",
    ],
  },
  {
    number: "02",
    name: "Deluxe Room",
    subtitle: "A Little More to Enjoy",
    description:
      "Enjoy a thoughtfully presented room experience, ideal for guests looking for a comfortable stay in Bhagalpur.",
    image: deluxeRoom,
    size: "Contact hotel for details",
    guests: "Confirm occupancy with hotel",
    features: [
      "Relaxing room atmosphere",
      "Comfort-focused accommodation",
      "Convenient hotel location",
    ],
  },
  {
    number: "03",
    name: "Premium Room",
    subtitle: "Make Your Stay Special",
    description:
      "Explore another room category at Hotel Shantam Regency and speak with our team about the accommodation that suits your visit.",
    image: premiumRoom,
    size: "Contact hotel for details",
    guests: "Confirm occupancy with hotel",
    features: [
      "Dedicated guest accommodation",
      "Comfortable surroundings",
      "Personalised booking assistance",
    ],
  },
];

const faqs = [
  {
    question: "How can I enquire about room availability?",
    answer:
      "Use the Enquire Now button and share your preferred check-in date, check-out date and guest details. The hotel team can then confirm availability.",
  },
  {
    question: "Are room prices displayed on this page?",
    answer:
      "Prices are not displayed here because rates may depend on the room category, dates and availability. Contact the hotel directly for current pricing.",
  },
  {
    question: "Does submitting an enquiry confirm my booking?",
    answer:
      "No. Submitting an enquiry is only a request. Your reservation is confirmed only after the hotel communicates availability, applicable pricing and confirmation.",
  },
  {
    question: "Can I ask about facilities before booking?",
    answer:
      "Yes. Include your questions in your enquiry or discuss your requirements with the hotel team before making a reservation.",
  },
];

function SectionLabel({ children }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="h-px w-8 bg-[#B69550]" />
      <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#92702E] sm:text-xs">
        {children}
      </span>
    </div>
  );
}

function RoomCard({ room, onBookingClick }) {
  return (
    <article className="group overflow-hidden border border-black/[0.08] bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.10)]">
      <div className="relative h-64 overflow-hidden bg-[#E8E0D0] sm:h-80">
        <img
          src={room.image}
          alt={room.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(event) => {
            event.currentTarget.style.opacity = "0";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        <span className="absolute left-5 top-5 border border-white/40 bg-black/30 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-sm">
          Room {room.number}
        </span>

        <div className="absolute bottom-5 left-5 right-5">
          <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#E5C77F]">
            {room.subtitle}
          </p>

          <h3 className="font-serif text-3xl text-white sm:text-4xl">
            {room.name}
          </h3>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <p className="text-sm leading-7 text-black/60">
          {room.description}
        </p>

        <div className="mt-6 space-y-3 border-y border-black/[0.07] py-5">
          <div className="flex items-start gap-3 text-sm text-black/65">
            <BedDouble size={17} className="mt-0.5 shrink-0 text-[#A17D32]" />
            <span>{room.size}</span>
          </div>

          <div className="flex items-start gap-3 text-sm text-black/65">
            <Users size={17} className="mt-0.5 shrink-0 text-[#A17D32]" />
            <span>{room.guests}</span>
          </div>
        </div>

        <h4 className="mt-6 text-xs font-semibold uppercase tracking-[0.15em]">
          Room Highlights
        </h4>

        <ul className="mt-4 space-y-3">
          {room.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-sm text-black/60"
            >
              <Check
                size={15}
                className="mt-0.5 shrink-0 text-[#A17D32]"
              />
              {feature}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onBookingClick}
          className="mt-7 flex min-h-12 w-full items-center justify-between gap-3 border border-[#C7A75D] px-5 py-3 text-sm font-semibold transition-all duration-300 hover:bg-[#D6B66D]"
        >
          Enquire About This Room
          <ArrowUpRight size={17} />
        </button>
      </div>
    </article>
  );
}

export default function RoomsPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const openEnquiry = () => setBookingOpen(true);
  const closeEnquiry = () => setBookingOpen(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8F5ED] text-[#191919]">
      <Header onBookingClick={openEnquiry} />

      <main>
        {/* 1. FULL-WIDTH ROOM HERO: BACKGROUND IMAGE + CENTERED TEXT */}
        <section className="relative flex min-h-[300px] items-center justify-center overflow-hidden bg-[#171717] text-white sm:min-h-[340px] lg:h-[430px] lg:min-h-0">
          <img
            src={roomHeroImage}
            alt="Room at Hotel Shantam Regency"
            className="absolute inset-0 h-full w-full object-cover object-center"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/30" />

          <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-8 text-center sm:px-8 sm:py-10 lg:px-12 lg:py-10">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#E5C77F] sm:w-12" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#E5C77F] sm:text-xs md:text-sm">
                Hotel Shantam Regency · Bhagalpur
              </span>
              <span className="h-px w-8 bg-[#E5C77F] sm:w-12" />
            </div>

            <h1 className="mx-auto max-w-5xl font-serif text-3xl font-medium leading-[1.08] sm:text-4xl md:text-5xl lg:text-6xl">
              Find Your Perfect Stay
              <span className="mt-2 block text-[#E5C77F]">Rooms & Suites</span>
            </h1>

            <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-white sm:mt-5 sm:text-base sm:leading-7 md:text-lg">
              Explore our room categories and discover a welcoming place to stay in Bhagalpur.
              Enquire with our team about room options, availability and current pricing.
            </p>

            <div className="mt-5 flex flex-col items-stretch justify-center gap-3 sm:mt-6 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={openEnquiry}
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-sm bg-[#D6B66D] px-6 py-3.5 text-sm font-semibold text-black transition-colors duration-300 hover:bg-[#E5C77F] sm:px-8 sm:text-base"
              >
                Enquire About Rooms
                <ArrowUpRight size={18} />
              </button>

              <a
                href="#room-collection"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-sm border border-white/70 bg-black/20 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-[#E5C77F] hover:bg-black/40 hover:text-[#E5C77F] sm:px-8 sm:text-base"
              >
                Explore Rooms
                <ArrowDown size={17} />
              </a>
            </div>
          </div>
        </section>

        {/* 2. INTRODUCTION */}
        <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 md:items-end">
            <div>
              <SectionLabel>A Comfortable Stay</SectionLabel>

              <h2 className="max-w-xl font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
                Your comfort is part of
                <span className="italic text-[#A17D32]"> the experience.</span>
              </h2>
            </div>

            <p className="max-w-2xl text-sm leading-8 text-black/60 sm:text-base">
              Whether you are visiting Bhagalpur for work, family or a
              personal occasion, explore the room categories available at
              Hotel Shantam Regency. Our team can help you understand the
              options, applicable rates and availability for your dates.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: BedDouble,
                title: "Room Choices",
                description: "Explore the available room categories.",
              },
              {
                icon: CalendarDays,
                title: "Date-Based Enquiry",
                description: "Share your preferred travel dates.",
              },
              {
                icon: Headphones,
                title: "Direct Assistance",
                description: "Discuss your requirements with the hotel.",
              },
              {
                icon: ShieldCheck,
                title: "Clear Confirmation",
                description: "Confirm price and availability before booking.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="border border-black/[0.07] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#D6B66D]/70 sm:p-6"
                >
                  <Icon size={24} className="text-[#A17D32]" />

                  <h3 className="mt-5 font-serif text-xl">{item.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-black/55">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. ROOM COLLECTION */}
        <section
          id="room-collection"
          className="scroll-mt-24 bg-[#EEE7D9] px-5 py-16 sm:px-8 sm:py-24 lg:px-12"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <SectionLabel>Find Your Room</SectionLabel>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl">
                  Rooms & <span className="italic text-[#A17D32]">Suites</span>
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-7 text-black/55">
                Explore the room categories below and enquire about
                availability and current pricing for your preferred dates.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {roomCategories.map((room) => (
                <RoomCard
                  key={room.number}
                  room={room}
                  onBookingClick={openEnquiry}
                />
              ))}
            </div>

            <p className="mt-7 text-xs leading-6 text-black/45">
              Room sizes, occupancy limits, facilities and rates should be
              confirmed directly with the hotel before booking.
            </p>
          </div>
        </section>

        {/* 4. AMENITIES / WHAT TO ASK ABOUT */}
        <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionLabel>Plan Your Stay</SectionLabel>

              <h2 className="font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
                The details matter.
                <span className="block italic text-[#A17D32]">
                  Ask before you book.
                </span>
              </h2>

              <p className="mt-6 text-sm leading-8 text-black/60 sm:text-base">
                Every traveller has different needs. Before confirming your
                stay, discuss the facilities and services that matter to you
                with our hotel team.
              </p>

              <button
                type="button"
                onClick={openEnquiry}
                className="mt-7 inline-flex min-h-12 items-center gap-3 bg-[#171717] px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#D6B66D] hover:text-black"
              >
                Ask About Facilities
                <ArrowRight size={17} />
              </button>
            </div>

            <div className="border border-black/[0.08] bg-white p-6 sm:p-8">
              <h3 className="font-serif text-2xl">Things to confirm</h3>

              <p className="mt-2 text-sm leading-6 text-black/50">
                Ask our team about these details for your chosen room.
              </p>

              <div className="mt-7 divide-y divide-black/[0.07]">
                {[
                  {
                    icon: Wifi,
                    title: "Internet access",
                    text: "Ask whether Wi-Fi is available and if any conditions apply.",
                  },
                  {
                    icon: Coffee,
                    title: "Food and refreshments",
                    text: "Ask about available dining options and service timings.",
                  },
                  {
                    icon: Clock,
                    title: "Check-in and check-out",
                    text: "Confirm the hotel's applicable timings before arrival.",
                  },
                  {
                    icon: Users,
                    title: "Guest and occupancy policy",
                    text: "Discuss guest numbers and any applicable requirements.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Payment and cancellation",
                    text: "Confirm payment methods, cancellation terms and charges.",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex gap-4 py-5 first:pt-0 last:pb-0"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#F2EBDD]">
                        <Icon size={19} className="text-[#92702E]" />
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold">{item.title}</h4>
                        <p className="mt-1 text-xs leading-6 text-black/55 sm:text-sm">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 5. BOOKING PROCESS */}
        <section className="bg-[#171717] px-5 py-16 text-white sm:px-8 sm:py-24 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <SectionLabel>Simple & Straightforward</SectionLabel>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl">
                How your room enquiry works.
              </h2>

              <p className="mt-5 text-sm leading-7 text-white/55 sm:text-base">
                A simple process to help you enquire about your preferred
                accommodation before making a reservation.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Share Your Dates",
                  text: "Tell us your check-in, check-out and guest requirements.",
                },
                {
                  number: "02",
                  title: "Discuss Availability",
                  text: "The hotel team reviews your enquiry and discusses available options and pricing.",
                },
                {
                  number: "03",
                  title: "Receive Confirmation",
                  text: "Proceed according to the hotel's instructions and wait for explicit booking confirmation.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="border-t border-[#D6B66D]/40 pt-6"
                >
                  <span className="font-serif text-4xl text-[#D6B66D]">
                    {step.number}
                  </span>

                  <h3 className="mt-5 font-serif text-2xl">{step.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-white/55">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 border border-white/10 bg-white/[0.04] p-5 sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl">
                    Ready to enquire?
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/55">
                    Share your requirements with the hotel team.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={openEnquiry}
                  className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 bg-[#D6B66D] px-6 py-4 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#E5C77F]"
                >
                  Start an Enquiry
                  <ArrowUpRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 6. FAQ */}
        <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <SectionLabel>Need to Know</SectionLabel>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl">
                Frequently asked
                <span className="block italic text-[#A17D32]">questions.</span>
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-black/55">
                Find answers to common questions about room enquiries and
                reservations at Hotel Shantam Regency.
              </p>
            </div>

            <div className="border-t border-black/10">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className="border-b border-black/10"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(openFaq === index ? -1 : index)
                    }
                    aria-expanded={openFaq === index}
                    className="flex w-full items-center justify-between gap-5 py-5 text-left sm:py-6"
                  >
                    <span className="text-sm font-semibold leading-6 sm:text-base">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={19}
                      className={`shrink-0 text-[#92702E] transition-transform duration-300 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${
                      openFaq === index
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-6 text-sm leading-7 text-black/55">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. FINAL CTA */}
        <section className="px-5 pb-16 sm:px-8 sm:pb-24 lg:px-12">
          <div className="relative mx-auto max-w-7xl overflow-hidden bg-[#EDE4D2] px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
            <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full border border-[#B69550]/20" />
            <div className="pointer-events-none absolute -right-2 -top-8 h-40 w-40 rounded-full border border-[#B69550]/20" />

            <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div>
                <SectionLabel>Your Stay Awaits</SectionLabel>

                <h2 className="max-w-2xl font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
                  Let's find the right room for your visit.
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-black/55">
                  Submit your enquiry to discuss dates, room preferences,
                  availability and applicable pricing with the hotel.
                </p>
              </div>

              <button
                type="button"
                onClick={openEnquiry}
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 bg-[#171717] px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#D6B66D] hover:text-black"
              >
                Enquire Now
                <ArrowUpRight size={17} />
              </button>
            </div>
          </div>
        </section>

        {/* BOOKING DISCLAIMER */}
        <div className="border-t border-black/[0.06] px-5 py-5 text-center">
          <p className="mx-auto max-w-3xl text-xs leading-6 text-black/45">
            Room enquiries are not confirmed reservations. Room availability,
            pricing, occupancy, facilities and booking conditions must be
            confirmed directly with Hotel Shantam Regency.
          </p>
        </div>
      </main>

      <Footer />

      <BookingEnquiry
        isOpen={bookingOpen}
        onClose={closeEnquiry}
      />
    </div>
  );
}

