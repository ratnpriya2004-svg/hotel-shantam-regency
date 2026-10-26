import React, { useState } from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";

import weddingImage from "../assets/image/m.webp";
import lawnImage from "../assets/image/de.webp";
import stageImage from "../assets/image/event.webp";
import celebrationImage from "../assets/image/dd.webp";
import roomImage from "../assets/image/m.webp";

const inclusions = [
  {
    number: "01",
    title: "10 Guest Rooms",
    description:
      "Convenient accommodation for family and guests, with double occupancy. Standard check-in is 12:00 noon and check-out is 10:00 am. Early arrival is subject to availability.",
  },
  {
    number: "02",
    title: "Wedding Banquet Hall",
    description:
      "A dedicated indoor venue for your wedding ceremony, reception and important family rituals.",
  },
  {
    number: "03",
    title: "Complete Decoration",
    description:
      "Package decoration can include the entrance gate, passage, stage platform, backdrop, side walling, mandap frame and decoration, Maharaja chair and chandani.",
  },
  {
    number: "04",
    title: "Lighting Decoration",
    description:
      "Decorative stage and event lighting, including LED, PAR, Sharpy, metal, LED halogen and fancy LED lights, as arranged for the function.",
  },
  {
    number: "05",
    title: "DJ Sound Setup",
    description:
      "DJ sound arrangement with 2 bass and 2 top speakers with lighting setup. Varmala roses and Samdhi malas are also listed in the package details.",
  },
  {
    number: "06",
    title: "Generator Power Backup",
    description:
      "Power backup support to help keep your celebration running smoothly during the event.",
  },
];

const addOns = [
  ["Haldi stage decoration", "₹18,000"],
  ["Sangeet stage decoration", "₹20,000"],
  ["DJ sound with floor & lights", "₹15,000"],
  ["Mirror entry & passage decoration (20 ft)", "₹20,000"],
  ["Event programme — local / outstation", "₹45,000 / ₹65,000"],
  ["Cold fire (40 pieces × ₹500)", "₹20,000"],
  ["Fan wheel with cold fire for varmala", "₹10,000"],
  ["Dry ice — bride & groom entry (20 pieces)", "₹20,000"],
  ["Blaster paper for entry & stage", "₹10,000"],
  ["Bubble machine", "₹8,000"],
];

const roomRates = [
  ["Executive Room", "₹2,000 / ₹2,500"],
  ["Deluxe Room", "₹2,500 / ₹3,000"],
  ["Premium Room", "₹3,000 / ₹3,500"],
];

const cateringRates = [
  ["Wedding vegetarian menu", "₹950 / ₹1,050 per plate"],
  ["Wedding non-vegetarian menu", "₹1,250 / ₹1,450 per plate"],
  ["Veg / non-veg menu options", "₹850 / ₹950 / ₹1,050 per plate"],
];

const initialForm = {
  functionType: "Wedding",
  date: "",
  rooms: "Up to 10",
  guests: "200–400",
  budget: "₹4–6 Lakh",
  venue: "Both",
  services: ["Decoration", "Catering", "Rooms for guests"],
  name: "",
  phone: "",
  message: "",
};

export default function WeddingPackagePage() {
  const [form, setForm] = useState(initialForm);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const toggleService = (service) => {
    setForm((current) => ({
      ...current,
      services: current.services.includes(service)
        ? current.services.filter((item) => item !== service)
        : [...current.services, service],
    }));
  };

  const submitEnquiry = (event) => {
    event.preventDefault();
    const message = [
      "Hello Hotel Shantam Regency! I would like a wedding package quote.",
      `Function: ${form.functionType}`,
      `Wedding date: ${form.date || "Not decided"}`,
      `Rooms: ${form.rooms}`,
      `Guests: ${form.guests}`,
      `Budget: ${form.budget}`,
      `Venue preference: ${form.venue}`,
      `Services: ${form.services.join(", ") || "Not specified"}`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Additional details: ${form.message || "None"}`,
    ].join("\n");

    window.open(
      `https://wa.me/919334271294?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      <Header />
      <main className="overflow-hidden bg-[#faf8f3] text-[#24211d]">
        {/* Hero */}
        <section className="relative flex min-h-[540px] items-center justify-center px-5 py-20 text-center text-white md:min-h-[650px]">
          <img
            src={weddingImage}
            alt="Wedding celebration at Hotel Shantam Regency"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
          <div className="relative z-10 mx-auto max-w-5xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#e7c98f] sm:text-sm">
              Wedding Season 2025–26 · Limited Dates
            </p>
            <h1 className="font-serif text-4xl leading-tight sm:text-5xl md:text-7xl">
              Your Dream Wedding
              <span className="mt-2 block text-[#e7c98f]">in Bhagalpur</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-white/85 sm:text-base md:text-lg">
              Celebrate under one roof with a wedding banquet hall, marriage lawn,
              guest accommodation, decoration, lights, DJ and power backup at
              Hotel Shantam Regency.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#enquiry"
                className="rounded-md bg-[#d5b477] px-7 py-3.5 text-sm font-semibold text-[#171613] transition hover:bg-[#f0d7a4]"
              >
                Get a Free Quote ↘
              </a>
              <a
                href="https://wa.me/919334271294"
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-white/70 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-[#e7c98f] hover:text-[#e7c98f]"
              >
                WhatsApp Us
              </a>
            </div>
            <div className="mx-auto mt-10 max-w-sm border-t border-white/30 pt-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                Premium Wedding Package starts at
              </p>
              <p className="mt-2 font-serif text-4xl text-[#e7c98f] sm:text-5xl">
                ₹4,00,000 <span className="text-sm">+ applicable taxes</span>
              </p>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:grid-cols-2 md:items-end md:px-8 md:py-20">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#a78245]">
              Celebrate beautifully
            </p>
            <h2 className="font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
              Everything you need for a memorable wedding.
            </h2>
          </div>
          <p className="text-sm leading-8 text-[#777067] md:text-base">
            From the wedding venue and guest rooms to stage decoration and event
            lighting, our premium package brings key arrangements together in
            one place. Share your date and requirements with our team for a
            customised quotation.
          </p>
        </section>

        {/* Package inclusions */}
        <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8 md:pb-24">
          <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#a78245]">
                Premium package
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl">What’s Included</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#777067]">
              Package components and availability should be confirmed with the
              hotel team while requesting your final quote.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {inclusions.map((item) => (
              <article
                key={item.number}
                className="rounded-2xl border border-[#e5ded2] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7"
              >
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#f1e6d2] font-serif text-sm text-[#8a6838]">
                  {item.number}
                </span>
                <h3 className="font-serif text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#777067]">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className="bg-[#f0e9dd] px-5 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#a78245]">
                A glimpse of the celebration
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl">Wedding Moments & Venues</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                [weddingImage, "Wedding venue and celebration"],
                [stageImage, "Wedding stage decoration"],
                [lawnImage, "Marriage lawn setting"],
                [celebrationImage, "Wedding celebration details"],
              ].map(([image, alt], index) => (
                <div
                  key={alt}
                  className={`group overflow-hidden rounded-xl ${index === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}
                >
                  <img
                    src={image}
                    alt={alt}
                    loading="lazy"
                    className={`w-full object-cover transition duration-700 group-hover:scale-105 ${index === 0 ? "h-full min-h-[320px] sm:min-h-[480px]" : "h-56 sm:h-60"}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <div className="mb-9 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#a78245]">
              Clear, helpful estimates
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl">Additional Rates</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#777067]">
              Rates below are indicative figures supplied for the 2025–2026 season.
              Confirm current rates, availability and applicable taxes directly with the hotel.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-[#e5ded2] bg-white">
              <div className="border-b border-[#e5ded2] bg-[#211e19] px-6 py-5 text-white">
                <h3 className="font-serif text-2xl">Wedding Catering</h3>
                <p className="mt-1 text-xs text-white/65">Indicative per-plate rates</p>
              </div>
              {cateringRates.map(([name, rate]) => (
                <div key={name} className="flex items-start justify-between gap-4 border-b border-[#eee8df] px-6 py-5 last:border-0">
                  <span className="text-sm text-[#625a50]">{name}</span>
                  <strong className="text-right text-sm text-[#8a6838]">{rate}</strong>
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#e5ded2] bg-white">
              <div className="border-b border-[#e5ded2] bg-[#211e19] px-6 py-5 text-white">
                <h3 className="font-serif text-2xl">Guest Rooms</h3>
                <p className="mt-1 text-xs text-white/65">Per room, per night · confirm rate option</p>
              </div>
              {roomRates.map(([name, rate]) => (
                <div key={name} className="flex items-start justify-between gap-4 border-b border-[#eee8df] px-6 py-5 last:border-0">
                  <span className="text-sm text-[#625a50]">{name}</span>
                  <strong className="text-right text-sm text-[#8a6838]">{rate}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-[#e5ded2] bg-white">
            <div className="border-b border-[#e5ded2] px-6 py-5 sm:px-8">
              <h3 className="font-serif text-2xl">Optional Add-ons</h3>
              <p className="mt-2 text-sm text-[#777067]">Choose additional services according to your event plan.</p>
            </div>
            <div className="grid sm:grid-cols-2">
              {addOns.map(([name, price]) => (
                <div key={name} className="flex items-start justify-between gap-4 border-b border-[#eee8df] px-6 py-4 last:border-0 sm:even:border-l sm:even:border-l-[#eee8df]">
                  <span className="text-sm leading-6 text-[#625a50]">{name}</span>
                  <strong className="shrink-0 text-sm text-[#8a6838]">{price}</strong>
                </div>
              ))}
            </div>
            <p className="px-6 py-4 text-xs leading-6 text-[#8a8175] sm:px-8">
              All rates are subject to confirmation and applicable taxes. Catering,
              room and add-on prices may vary by menu, date, guest count and availability.
            </p>
          </div>
        </section>

        {/* Enquiry form */}
        <section id="enquiry" className="scroll-mt-24 bg-[#211e19] px-5 py-16 text-white md:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#e5c58c]">
                Tell us your plan
              </p>
              <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
                Let’s plan your special day.
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/70">
                Share your wedding date, guest count and preferred services. Our
                team can follow up with a tailored quote for your celebration in Bhagalpur.
              </p>
              <ul className="mt-7 space-y-4 text-sm text-white/85">
                <li><span className="mr-3 text-[#e5c58c]">✓</span>Free site visit and quote request</li>
                <li><span className="mr-3 text-[#e5c58c]">✓</span>Package options for your budget</li>
                <li><span className="mr-3 text-[#e5c58c]">✓</span>Discuss venue, rooms and event services</li>
              </ul>
              <div className="mt-8 border-t border-white/15 pt-6">
                <p className="text-xs uppercase tracking-[0.2em] text-white/55">Speak with our team</p>
                <a href="tel:+919334271294" className="mt-2 inline-block font-serif text-2xl text-[#e5c58c] hover:text-white">
                  +91 93342 71294
                </a>
                <p className="mt-2 text-sm text-white/65">Rani Chandra Koti, Adampur, Bhagalpur, Bihar 812001</p>
              </div>
            </div>

            <form onSubmit={submitEnquiry} className="rounded-2xl bg-[#faf8f3] p-5 text-[#24211d] sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-xs font-semibold text-[#625a50]">
                  Function
                  <select name="functionType" value={form.functionType} onChange={updateField} className="mt-2 w-full rounded-md border border-[#ddd3c4] bg-white px-3 py-3 text-sm outline-none focus:border-[#a78245]">
                    {["Wedding", "Reception", "Engagement", "Haldi / Mehndi", "Tilak", "Other"].map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
                <label className="text-xs font-semibold text-[#625a50]">
                  Wedding date
                  <input type="date" name="date" value={form.date} onChange={updateField} className="mt-2 w-full rounded-md border border-[#ddd3c4] bg-white px-3 py-3 text-sm outline-none focus:border-[#a78245]" />
                </label>
                <label className="text-xs font-semibold text-[#625a50]">
                  Rooms needed
                  <select name="rooms" value={form.rooms} onChange={updateField} className="mt-2 w-full rounded-md border border-[#ddd3c4] bg-white px-3 py-3 text-sm outline-none focus:border-[#a78245]">
                    {["Not needed", "Up to 10", "10–20", "20+"].map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
                <label className="text-xs font-semibold text-[#625a50]">
                  Number of guests
                  <select name="guests" value={form.guests} onChange={updateField} className="mt-2 w-full rounded-md border border-[#ddd3c4] bg-white px-3 py-3 text-sm outline-none focus:border-[#a78245]">
                    {["Up to 200", "200–400", "400–700", "700+"].map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
                <label className="text-xs font-semibold text-[#625a50]">
                  Your budget
                  <select name="budget" value={form.budget} onChange={updateField} className="mt-2 w-full rounded-md border border-[#ddd3c4] bg-white px-3 py-3 text-sm outline-none focus:border-[#a78245]">
                    {["₹2–4 Lakh", "₹4–6 Lakh", "₹6–10 Lakh", "₹10 Lakh+"].map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
                <label className="text-xs font-semibold text-[#625a50]">
                  Venue preference
                  <select name="venue" value={form.venue} onChange={updateField} className="mt-2 w-full rounded-md border border-[#ddd3c4] bg-white px-3 py-3 text-sm outline-none focus:border-[#a78245]">
                    {["Banquet Hall", "Marriage Lawn / Garden", "Both", "Not sure"].map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
              </div>

              <fieldset className="mt-6">
                <legend className="text-xs font-semibold text-[#625a50]">Services you want</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Decoration", "Catering", "Rooms for guests", "DJ & Lights", "Haldi / Mehndi", "Sangeet", "Photography help", "Special entry effects"].map((service) => (
                    <label key={service} className={`cursor-pointer rounded-full border px-3 py-2 text-xs transition ${form.services.includes(service) ? "border-[#a78245] bg-[#f1e6d2] text-[#6f542e]" : "border-[#ddd3c4] bg-white text-[#625a50] hover:border-[#a78245]"}`}>
                      <input type="checkbox" className="sr-only" checked={form.services.includes(service)} onChange={() => toggleService(service)} />
                      {service}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="text-xs font-semibold text-[#625a50]">
                  Your name
                  <input required name="name" value={form.name} onChange={updateField} placeholder="Enter your name" className="mt-2 w-full rounded-md border border-[#ddd3c4] bg-white px-3 py-3 text-sm outline-none focus:border-[#a78245]" />
                </label>
                <label className="text-xs font-semibold text-[#625a50]">
                  Phone number
                  <input required type="tel" name="phone" value={form.phone} onChange={updateField} placeholder="Enter your phone number" className="mt-2 w-full rounded-md border border-[#ddd3c4] bg-white px-3 py-3 text-sm outline-none focus:border-[#a78245]" />
                </label>
              </div>
              <label className="mt-5 block text-xs font-semibold text-[#625a50]">
                Additional details (optional)
                <textarea name="message" value={form.message} onChange={updateField} rows="3" placeholder="Tell us about your wedding plans..." className="mt-2 w-full resize-y rounded-md border border-[#ddd3c4] bg-white px-3 py-3 text-sm outline-none focus:border-[#a78245]" />
              </label>
              <button type="submit" className="mt-6 w-full rounded-md bg-[#d5b477] px-6 py-4 text-sm font-bold text-[#171613] transition hover:bg-[#e8ca92]">
                Get My Free Wedding Quote ↗
              </button>
              <p className="mt-3 text-center text-[11px] leading-5 text-[#8a8175]">
                Your details will open in a WhatsApp message to the hotel team for follow-up.
              </p>
            </form>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="px-5 py-12 text-center md:py-16">
          <img src={roomImage} alt="Guest room at Hotel Shantam Regency" loading="lazy" className="mx-auto mb-6 h-36 w-56 rounded-lg object-cover shadow-md" />
          <h2 className="font-serif text-3xl sm:text-4xl">Make your wedding a beautiful memory.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#777067]">
            Contact Hotel Shantam Regency to discuss your preferred date, package and venue arrangements.
          </p>
          <a href="tel:+919334271294" className="mt-6 inline-flex rounded-md bg-[#211e19] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#4a4032]">
            Call +91 93342 71294
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
