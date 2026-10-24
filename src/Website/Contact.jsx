import React, { useState } from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import hotelImage from "../assets/image/hhotel.png";

const PHONE_DISPLAY = "+91 93342 71294";
const PHONE_NUMBER = "919334271294";
const EMAIL = "info@hotelshantamregency.com";
const ADDRESS = "Rani Chandra Koti, Adampur, Bhagalpur, Bihar 812001";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "General Enquiry",
    message: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setError("Please fill in your name, phone number and message.");
      return;
    }

    const message = [
      "Hello Hotel Shantam Regency, I have a contact enquiry.",
      "",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email || "Not provided"}`,
      `Enquiry: ${form.subject}`,
      `Message: ${form.message}`,
    ].join("\n");

    window.open(
      `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      <Header />

      <main className="overflow-hidden bg-[#faf8f3] text-[#24211d]">
        {/* Hero */}
        <section className="relative flex min-h-[390px] items-center justify-center px-5 py-20 text-center text-white sm:min-h-[440px] md:min-h-[490px]">
          <img
            src={hotelImage}
            alt="Hotel Shantam Regency, Bhagalpur"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="relative z-10 mx-auto max-w-4xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-[#e5c58c] sm:text-sm">
              Hotel Shantam Regency · Bhagalpur
            </p>
            <h1 className="font-serif text-4xl leading-tight sm:text-5xl md:text-7xl">
              We’re Here to <span className="text-[#e5c58c]">Help</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/85 sm:text-base md:text-lg">
              Have a question about your stay, dining, wedding or event? Get in touch with our team—we’ll be happy to help you plan your visit.
            </p>
            <a
              href="#contact-form"
              className="mt-8 inline-flex rounded-md bg-[#d5b477] px-7 py-3.5 text-sm font-semibold text-[#171613] transition hover:bg-[#f0d7a4]"
            >
              Send an Enquiry <span className="ml-2">↘</span>
            </a>
          </div>
        </section>

        {/* Intro */}
        <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#a78245]">
              Get in Touch
            </p>
            <h2 className="font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
              Let’s make your next visit special.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#777067] md:text-base md:leading-8">
              Whether you need a room, want to plan a celebration or have a general question, contact Hotel Shantam Regency in Bhagalpur.
            </p>
          </div>

          {/* Contact information cards */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a href={`tel:${PHONE_NUMBER}`} className="group rounded-2xl border border-[#e5ded2] bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f3ead8] text-xl text-[#8a6838]">☎</span>
              <h3 className="mt-5 font-serif text-2xl">Call Us</h3>
              <p className="mt-2 text-sm text-[#777067]">Speak with our team</p>
              <p className="mt-3 text-sm font-semibold text-[#8a6838]">{PHONE_DISPLAY}</p>
            </a>

            <a href={`mailto:${EMAIL}`} className="group rounded-2xl border border-[#e5ded2] bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f3ead8] text-xl text-[#8a6838]">✉</span>
              <h3 className="mt-5 font-serif text-2xl">Email Us</h3>
              <p className="mt-2 text-sm text-[#777067]">Send your questions anytime</p>
              <p className="mt-3 break-words text-sm font-semibold text-[#8a6838]">{EMAIL}</p>
            </a>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Hotel+Shantam+Regency+Rani+Chandra+Koti+Adampur+Bhagalpur+Bihar+812001"
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-[#e5ded2] bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg sm:col-span-2 lg:col-span-1"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f3ead8] text-xl text-[#8a6838]">⌖</span>
              <h3 className="mt-5 font-serif text-2xl">Visit Us</h3>
              <p className="mt-2 text-sm text-[#777067]">Find us in Bhagalpur</p>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#8a6838]">{ADDRESS}</p>
              <span className="mt-3 inline-block text-xs font-bold uppercase tracking-widest text-[#8a6838]">Get Directions ↗</span>
            </a>
          </div>
        </section>

        {/* Form and map */}
        <section id="contact-form" className="scroll-mt-20 bg-[#f0ebe2] px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-2xl border border-[#e5ded2] bg-white p-6 shadow-sm sm:p-9">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#a78245]">Send a Message</p>
              <h2 className="font-serif text-3xl sm:text-4xl">How can we help you?</h2>
              <p className="mt-3 text-sm leading-7 text-[#777067]">
                Fill out the form below. When you submit it, WhatsApp will open with your enquiry ready to send to our team.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold">Full Name *</label>
                    <input id="contact-name" name="name" value={form.name} onChange={handleChange} required placeholder="Enter your name" className="w-full rounded-lg border border-[#ddd4c6] bg-[#fdfcf9] px-4 py-3 text-sm outline-none transition focus:border-[#a78245] focus:ring-2 focus:ring-[#a78245]/15" />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="mb-2 block text-sm font-semibold">Phone Number *</label>
                    <input id="contact-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="Enter your phone number" className="w-full rounded-lg border border-[#ddd4c6] bg-[#fdfcf9] px-4 py-3 text-sm outline-none transition focus:border-[#a78245] focus:ring-2 focus:ring-[#a78245]/15" />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold">Email Address</label>
                    <input id="contact-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="w-full rounded-lg border border-[#ddd4c6] bg-[#fdfcf9] px-4 py-3 text-sm outline-none transition focus:border-[#a78245] focus:ring-2 focus:ring-[#a78245]/15" />
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="mb-2 block text-sm font-semibold">Enquiry Type</label>
                    <select id="contact-subject" name="subject" value={form.subject} onChange={handleChange} className="w-full rounded-lg border border-[#ddd4c6] bg-[#fdfcf9] px-4 py-3 text-sm outline-none transition focus:border-[#a78245] focus:ring-2 focus:ring-[#a78245]/15">
                      <option>General Enquiry</option>
                      <option>Room Booking</option>
                      <option>Wedding Package</option>
                      <option>Banquet Hall</option>
                      <option>Restaurant & Dining</option>
                      <option>Corporate Meeting</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold">Your Message *</label>
                  <textarea id="contact-message" name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell us how we can help..." className="w-full resize-y rounded-lg border border-[#ddd4c6] bg-[#fdfcf9] px-4 py-3 text-sm outline-none transition focus:border-[#a78245] focus:ring-2 focus:ring-[#a78245]/15" />
                </div>

                {error && <p role="alert" className="text-sm font-medium text-red-700">{error}</p>}

                <button type="submit" className="inline-flex w-full items-center justify-center rounded-lg bg-[#1e1c18] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#8a6838] sm:w-auto">
                  Send Enquiry on WhatsApp <span className="ml-2 text-lg">↗</span>
                </button>
                <p className="text-xs leading-5 text-[#8a8175]">Submitting opens WhatsApp; your message is sent only after you press Send there.</p>
              </form>
            </div>

            <div className="flex flex-col overflow-hidden rounded-2xl border border-[#e5ded2] bg-white shadow-sm">
              <div className="p-6 sm:p-8">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#a78245]">Find Our Location</p>
                <h2 className="font-serif text-3xl sm:text-4xl">Visit Hotel Shantam Regency</h2>
                <p className="mt-3 text-sm leading-7 text-[#777067]">{ADDRESS}</p>
                <a href="https://www.google.com/maps/search/?api=1&query=Hotel+Shantam+Regency+Rani+Chandra+Koti+Adampur+Bhagalpur+Bihar+812001" target="_blank" rel="noreferrer" className="mt-5 inline-flex text-xs font-bold uppercase tracking-[0.18em] text-[#8a6838] hover:text-[#b08a4c]">
                  Open in Google Maps ↗
                </a>
              </div>
              <div className="min-h-[320px] flex-1 bg-[#e8e1d5]">
                <iframe
                  title="Map showing Hotel Shantam Regency in Bhagalpur"
                  src="https://maps.google.com/maps?q=Hotel%20Shantam%20Regency%2C%20Rani%20Chandra%20Koti%2C%20Adampur%2C%20Bhagalpur%2C%20Bihar%20812001&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="h-full min-h-[320px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>

        {/* WhatsApp callout */}
        <section className="px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-2xl bg-[#201e19] p-7 text-white sm:p-10 md:flex-row md:items-center">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#e5c58c]">Need a quick answer?</p>
              <h2 className="font-serif text-3xl sm:text-4xl">Let’s talk about your plans.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">Call or message our team for questions about rooms, weddings, events and dining.</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <a href={`tel:${PHONE_NUMBER}`} className="rounded-md border border-white/35 px-5 py-3 text-sm font-semibold transition hover:border-[#e5c58c] hover:text-[#e5c58c]">Call Us</a>
              <a href={`https://wa.me/${PHONE_NUMBER}`} target="_blank" rel="noreferrer" className="rounded-md bg-[#d5b477] px-5 py-3 text-sm font-semibold text-[#171613] transition hover:bg-[#f0d7a4]">WhatsApp ↗</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
