import React from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";

import restaurantInterior from "../assets/image/kitchen.webp";
import restaurantDining from "../assets/image/dinner.webp";

export default function RestaurantPage() {
  return (
    <div className="min-h-screen bg-[#f8f5ef] text-[#24211e]">
      <Header />

      {/* Hero Section */}
      <section className="relative flex min-h-[550px] items-center overflow-hidden bg-black">
        <img
          src={restaurantDining}
          alt="Hotel Shantam Regency restaurant dining area"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />

        <div className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:px-12">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-[#e0bd78]">
            Dine at Shantam Regency
          </p>

          <h1 className="max-w-3xl font-serif text-5xl leading-tight text-white sm:text-6xl lg:text-7xl">
            Good Food.
            <br />
            <span className="italic text-[#e0bd78]">
              Beautiful Moments.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
            Enjoy a welcoming atmosphere and a comfortable dining experience
            with your family, friends, and colleagues at Hotel Shantam Regency.
          </p>

          <button
            onClick={() =>
              document
                .getElementById("restaurant-contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-8 bg-[#c6a263] px-8 py-4 text-sm font-semibold text-black transition hover:bg-[#dfbd7b]"
          >
            Contact Us
          </button>
        </div>
      </section>

      {/* Restaurant Introduction */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-24">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#a27b3f]">
            Our Restaurant
          </p>

          <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
            A Welcoming Place
            <span className="italic text-[#a27b3f]">
              {" "}to Dine
            </span>
          </h2>

          <p className="mt-6 leading-8 text-[#68615a]">
            Experience a comfortable dining atmosphere at Hotel Shantam
            Regency. Whether you are planning a meal with family, meeting
            friends, or arranging a group gathering, our restaurant offers
            a welcoming setting for your visit.
          </p>

          <p className="mt-4 leading-8 text-[#68615a]">
            For restaurant information, dining arrangements, timings, or
            reservations, please contact our team.
          </p>

          <button
            onClick={() =>
              document
                .getElementById("restaurant-contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-7 bg-[#24221e] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#9a7138]"
          >
            Contact the Restaurant
          </button>
        </div>

        <div className="relative">
          <img
            src={restaurantInterior}
            alt="Restaurant interior at Hotel Shantam Regency"
            className="h-[320px] w-full rounded-sm object-cover shadow-xl sm:h-[430px]"
          />

          <div className="absolute -bottom-5 -left-3 hidden border border-[#c6a263] bg-[#f8f5ef] px-6 py-4 sm:block">
            <p className="font-serif text-xl">
              A Place to Come Together
            </p>

            <p className="mt-1 text-xs text-[#68615a]">
              Comfort · Hospitality · Dining
            </p>
          </div>
        </div>
      </section>

      {/* Restaurant Contact Section */}
      <section
        id="restaurant-contact"
        className="scroll-mt-20 bg-[#24221e] py-20 text-white sm:py-24"
      >
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#e0bd78]">
            Get in Touch
          </p>

          <h2 className="mt-4 font-serif text-4xl sm:text-5xl">
            Contact Hotel Shantam Regency
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/70">
            For room bookings, banquet enquiries or restaurant reservations,
            reach out to us.
          </p>

          <p className="mx-auto mt-3 max-w-2xl leading-7 text-white/70">
            Want to know more about our restaurant or dining arrangements?
            Contact our team for further information.
          </p>

          {/* Contact Buttons */}
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            {/* Call Button */}
            <a
              href="tel:+919334271294"
              className="inline-flex items-center justify-center gap-2 bg-[#c6a263] px-6 py-4 text-sm font-semibold text-[#171714] transition hover:bg-[#dfbd7b]"
            >
              <span aria-hidden="true">☎</span>
              Call: 09334271294
            </a>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/919334271294"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/30 px-6 py-4 text-sm font-semibold text-white transition hover:border-[#e0bd78] hover:bg-white/10"
            >
              <span aria-hidden="true">◉</span>
              WhatsApp
            </a>

            {/* Directions Button */}
            <a
              href="https://maps.google.com/?q=Hotel+Shantam+Regency+Bhagalpur"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/30 px-6 py-4 text-sm font-semibold text-white transition hover:border-[#e0bd78] hover:bg-white/10"
            >
              <span aria-hidden="true">⌖</span>
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="bg-[#eee7dc] px-5 py-14 text-center sm:px-8">
        <h2 className="font-serif text-3xl sm:text-4xl">
          We Look Forward to Welcoming You
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#68615a]">
          Contact Hotel Shantam Regency for restaurant information,
          reservations, and other enquiries. Our team will be happy to assist.
        </p>

        <a
          href="tel:+919334271294"
          className="mt-6 inline-block bg-[#24221e] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#9a7138]"
        >
          Contact Us
        </a>
      </section>

      <Footer />
    </div>
  );
}

