import { useState } from "react";
import { supabase } from "./../lib/supabase.js";
import {
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Navigation,
  CheckCircle2,
} from "lucide-react";



const blank = {
  name: "",
  phone: "",
  email: "",
  enquiryType: "Room enquiry",
  eventType: "",
  eventDate: "",
  guests: "",
  message: "",
};

const inputClass =
  "mt-2 block w-full rounded-sm border border-[#E3D3B8] bg-[#FFFAF3] px-4 py-3 text-sm text-[#29342D] placeholder:text-[#AAA397] outline-none transition duration-300 focus:border-[#B9954E] focus:ring-2 focus:ring-[#C6A15B]/15";

const labelClass =
  "block text-xs font-medium tracking-wide text-[#696A62]";

const mapLink =
  "https://www.google.com/maps/search/?api=1&query=7X3P%2BXR%20Bhagalpur%2C%20Bihar";

const hotelPhone = "09334271294";
const hotelPhoneDisplay = "093342 71294";

// Official hotel email add karna jab confirm ho.
const hotelEmail = "";

export default function Contact() {
  const [form, setForm] = useState(blank);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setStatus("");
    setError("");
  };

  const submit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setStatus("");
    setError("");

    const phone = form.phone.trim();
    const digitsOnly = phone.replace(/\D/g, "");

    if (digitsOnly.length < 10 || digitsOnly.length > 15) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (
      form.enquiryType === "Wedding / event enquiry" &&
      form.guests &&
      (!Number.isInteger(Number(form.guests)) ||
        Number(form.guests) < 1 ||
        Number(form.guests) > 10000)
    ) {
      setError("Please enter a valid number of guests.");
      return;
    }

    setIsSubmitting(true);

    try {
      let stayPreferences = null;

      if (form.enquiryType === "Room enquiry") {
        try {
          stayPreferences = JSON.parse(
            sessionStorage.getItem("hotelBookingEnquiry") || "null"
          );
        } catch {
          stayPreferences = null;
        }
      }

      const enquiryData = {
        name: form.name.trim(),
        phone,
        email: form.email.trim() || null,
        enquiry_type: form.enquiryType,
        event_type: form.eventType.trim() || null,
        event_date: form.eventDate || null,
        guests: form.guests ? Number(form.guests) : null,
        message: form.message.trim() || null,
        stay_preferences: stayPreferences,
        status: "New",
      };

      const { error: insertError } = await supabase
        .from("enquiries")
        .insert([enquiryData]);

      if (insertError) {
        console.error("Supabase insert error:", insertError);
        throw insertError;
      }

      setStatus(
        "Your enquiry has been submitted successfully! The hotel team can review it shortly."
      );

      setForm(blank);
      sessionStorage.removeItem("hotelBookingEnquiry");
    } catch (err) {
      console.error("Enquiry submission failed:", err);

      setError(
        "Your enquiry could not be submitted. Please try again. If the problem continues, contact the hotel directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#F7F0E6] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full border border-[#C6A15B]/10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-32 h-64 w-64 rounded-full border border-[#C6A15B]/10"
      />

      <div className="relative mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* LEFT: Contact Information */}
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#B9954E]" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#997B43]">
              Let’s plan your visit
            </p>
          </div>

          <h2 className="max-w-lg font-['IBM_Plex_Serif'] text-4xl leading-[1.15] tracking-tight text-[#29342D] sm:text-5xl lg:text-[58px]">
            We’d love to{" "}
            <span className="italic text-[#997B43]">hear from you.</span>
          </h2>

          <p className="mt-6 max-w-md text-sm leading-7 text-[#696A62]">
            Planning a comfortable stay, a special celebration, or a meal
            with loved ones? Get in touch with Hotel Shantam Regency for
            your enquiry.
          </p>

          <div className="mt-10">
            {/* Address */}
            <div className="group flex gap-4 border-b border-[#E3D3B8] py-5 first:pt-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#DCC9A7] bg-[#FFFAF3] text-[#997B43] transition group-hover:border-[#B9954E]">
                <MapPin size={19} strokeWidth={1.5} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-[#29342D]">
                  Visit us
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#696A62]">
                  Swami Vivekanand Road, Adampur, Bhagalpur, Bihar 812001
                </p>

                <p className="mt-1 text-xs leading-5 text-[#8A877D]">
                  Plus Code: 7X3P+XR Bhagalpur, Bihar
                </p>

                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/map mt-4 inline-flex items-center gap-2 bg-[#29342D] px-4 py-3 text-xs font-medium text-[#FFFAF3] transition duration-300 hover:bg-[#997B43]"
                >
                  <Navigation size={15} />
                  Get Directions
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover/map:translate-x-0.5 group-hover/map:-translate-y-0.5"
                  />
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="group flex gap-4 border-b border-[#E3D3B8] py-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#DCC9A7] bg-[#FFFAF3] text-[#997B43] transition group-hover:border-[#B9954E]">
                <Phone size={19} strokeWidth={1.5} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#29342D]">
                  Call the hotel
                </h3>

                <a
                  href={`tel:${hotelPhone}`}
                  className="mt-2 inline-block text-sm text-[#696A62] transition hover:text-[#997B43]"
                >
                  {hotelPhoneDisplay}
                </a>

                <p className="mt-1 text-xs leading-5 text-[#8A877D]">
                  Please confirm this number with hotel management.
                </p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="group flex gap-4 border-b border-[#E3D3B8] py-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#DCC9A7] bg-[#FFFAF3] text-[#997B43] transition group-hover:border-[#B9954E]">
                <MessageCircle size={19} strokeWidth={1.5} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#29342D]">
                  WhatsApp
                </h3>

                <a
                  href={`https://wa.me/${hotelPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 text-sm text-[#696A62] transition hover:text-[#997B43]"
                >
                  Chat with the hotel
                  <ArrowUpRight size={14} />
                </a>

                <p className="mt-1 text-xs leading-5 text-[#8A877D]">
                  Opens WhatsApp using the listed phone number.
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="group flex gap-4 py-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#DCC9A7] bg-[#FFFAF3] text-[#997B43] transition group-hover:border-[#B9954E]">
                <Mail size={19} strokeWidth={1.5} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#29342D]">
                  Email us
                </h3>

                {hotelEmail ? (
                  <a
                    href={`mailto:${hotelEmail}`}
                    className="mt-2 inline-block break-all text-sm text-[#696A62] transition hover:text-[#997B43]"
                  >
                    {hotelEmail}
                  </a>
                ) : (
                  <p className="mt-2 text-sm text-[#696A62]">
                    Official hotel email to be confirmed.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-start gap-3 border-l-2 border-[#B9954E] bg-[#FFFAF3]/70 px-4 py-4">
            <CheckCircle2
              size={17}
              className="mt-0.5 shrink-0 text-[#997B43]"
            />

            <p className="text-xs leading-6 text-[#696A62]">
              Room availability, event arrangements, and applicable rates
              should be confirmed directly with the hotel team.
            </p>
          </div>
        </div>

        {/* RIGHT: Enquiry Form */}
        <div className="border border-[#E3D3B8] bg-[#FFFAF3] p-5 shadow-[0_15px_50px_rgba(91,69,36,0.05)] sm:p-8 lg:p-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#997B43]">
                Get in touch
              </p>

              <h3 className="mt-3 font-['IBM_Plex_Serif'] text-2xl text-[#29342D] sm:text-3xl">
                Send an enquiry
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#77766D]">
                Share a few details and tell us how we can help.
              </p>
            </div>

            <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#E3D3B8] text-[#997B43] sm:flex">
              <MessageCircle size={21} strokeWidth={1.4} />
            </div>
          </div>

          <div className="my-7 h-px bg-[#E3D3B8]" />

          <form onSubmit={submit}>
            <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
              {/* Name */}
              <label className={labelClass}>
                Full name <span className="text-[#B9954E]">*</span>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={update}
                  autoComplete="name"
                  maxLength={100}
                  className={inputClass}
                  placeholder="Your full name"
                />
              </label>

              {/* Phone */}
              <label className={labelClass}>
                Phone number <span className="text-[#B9954E]">*</span>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={update}
                  autoComplete="tel"
                  inputMode="tel"
                  maxLength={20}
                  className={inputClass}
                  placeholder="Your phone number"
                />
              </label>

              {/* Email */}
              <label className={labelClass}>
                Email address
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={update}
                  autoComplete="email"
                  maxLength={150}
                  className={inputClass}
                  placeholder="you@example.com"
                />
              </label>

              {/* Enquiry Type */}
              <label className={labelClass}>
                Enquiry type <span className="text-[#B9954E]">*</span>
                <select
                  required
                  name="enquiryType"
                  value={form.enquiryType}
                  onChange={update}
                  className={inputClass}
                >
                  <option>Room enquiry</option>
                  <option>Wedding / event enquiry</option>
                  <option>Restaurant enquiry</option>
                  <option>General enquiry</option>
                </select>
              </label>

              {/* Event Fields */}
              {form.enquiryType === "Wedding / event enquiry" && (
                <>
                  <label className={labelClass}>
                    Event type
                    <input
                      name="eventType"
                      value={form.eventType}
                      onChange={update}
                      maxLength={100}
                      className={inputClass}
                      placeholder="Wedding, birthday, meeting..."
                    />
                  </label>

                  <label className={labelClass}>
                    Preferred event date
                    <input
                      type="date"
                      name="eventDate"
                      min={new Date().toLocaleDateString("en-CA")}
                      value={form.eventDate}
                      onChange={update}
                      className={inputClass}
                    />
                  </label>

                  <label className={`${labelClass} sm:col-span-2`}>
                    Estimated number of guests
                    <input
                      type="number"
                      min="1"
                      max="10000"
                      name="guests"
                      value={form.guests}
                      onChange={update}
                      className={inputClass}
                      placeholder="Approximate guest count"
                    />
                  </label>
                </>
              )}

              {/* Message */}
              <label className={`${labelClass} sm:col-span-2`}>
                Message
                <textarea
                  name="message"
                  rows={4}
                  maxLength={2000}
                  value={form.message}
                  onChange={update}
                  className={`${inputClass} resize-y`}
                  placeholder="Tell us about your requirements..."
                />
              </label>
            </div>

            {/* Error */}
            {error && (
              <p
                role="alert"
                className="mt-5 border-l-2 border-red-500 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
              >
                {error}
              </p>
            )}

            {/* Success */}
            {status && (
              <p
                role="status"
                className="mt-5 flex items-start gap-2 border-l-2 border-[#B9954E] bg-[#F7F0E6] px-4 py-3 text-sm leading-6 text-[#29342D]"
              >
                <CheckCircle2
                  size={17}
                  className="mt-1 shrink-0 text-[#997B43]"
                />
                <span>{status}</span>
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group mt-7 inline-flex w-full items-center justify-center gap-3 bg-[#29342D] px-6 py-4 text-sm font-medium text-[#FFFAF3] transition duration-300 hover:bg-[#997B43] focus:outline-none focus:ring-2 focus:ring-[#B9954E] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isSubmitting ? "Submitting..." : "Submit enquiry"}

              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>

            <p className="mt-5 text-[11px] leading-5 text-[#8A877D]">
              Your enquiry will be submitted securely for the hotel team to
              review.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

