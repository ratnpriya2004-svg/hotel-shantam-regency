import { useEffect, useState } from "react";
import { X, Hotel, CalendarDays, Send, CheckCircle } from "lucide-react";
import { supabase } from "../../lib/supabase";

const initialForm = {
  fullName: "",
  phone: "",
  email: "",
  checkIn: "",
  checkOut: "",
  guests: "2",
  roomType: "",
  message: "",
};

export default function BookingEnquiry({ isOpen, onClose }) {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape" && !loading) onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, loading]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccess(false);

    if (formData.checkOut <= formData.checkIn) {
      setErrorMessage("Check-out date must be after check-in date.");
      return;
    }

    const guestCount = Number(formData.guests);

    if (!Number.isInteger(guestCount) || guestCount < 1) {
      setErrorMessage("Please select a valid number of guests.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("enquiries").insert([
        {
          name: formData.fullName.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          enquiry_type: "Room Booking",
          event_type: null,
          event_date: null,
          guests: guestCount,
          message: formData.message.trim() || null,
          stay_preferences: {
            check_in: formData.checkIn,
            check_out: formData.checkOut,
            room_type: formData.roomType || "Not specified",
          },
          status: "New",
        },
      ]);

      if (error) throw error;

      setSuccess(true);
      setFormData(initialForm);
    } catch (error) {
      console.error("Booking enquiry submission failed:", error);

      setErrorMessage(
        error.message ||
          "Unable to submit your enquiry. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="relative my-auto max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[#FFFEFB] shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-amber-100 bg-[#FFFEFB] px-5 py-4 sm:px-7">
          <div>
            <div className="mb-2 flex items-center gap-2 text-amber-700">
              <Hotel size={17} />
              <span className="text-[10px] font-semibold tracking-[0.22em]">
                SHANTAM REGENCY
              </span>
            </div>

            <h2
              id="booking-title"
              className="text-2xl font-semibold text-gray-900 sm:text-3xl"
            >
              Booking Enquiry
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Share your stay requirements with us.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close booking enquiry"
            className="rounded-full border border-gray-200 p-2 text-gray-500 transition hover:bg-amber-50 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {success ? (
          <div className="px-6 py-12 text-center sm:px-10">
            <CheckCircle
              size={54}
              className="mx-auto text-green-600"
            />

            <h3 className="mt-5 text-2xl font-semibold text-gray-900">
              Enquiry Submitted!
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-600">
              Thank you for contacting Shantam Regency. Your enquiry
              has been received successfully. Our team will get in touch
              with you.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-7 rounded-lg bg-amber-700 px-7 py-3 text-sm font-semibold text-white transition hover:bg-amber-800"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <input
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Mobile Number *
                </label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  autoComplete="tel"
                  pattern="[0-9+() -]{10,18}"
                  title="Enter a valid phone number"
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Email Address *
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Check-in Date *
                </label>
                <input
                  required
                  type="date"
                  name="checkIn"
                  min={new Date().toLocaleDateString("en-CA")}
                  value={formData.checkIn}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Check-out Date *
                </label>
                <input
                  required
                  type="date"
                  name="checkOut"
                  min={formData.checkIn || new Date().toLocaleDateString("en-CA")}
                  value={formData.checkOut}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Number of Guests *
                </label>
                <select
                  required
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((guest) => (
                    <option key={guest} value={guest}>
                      {guest} {guest === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Preferred Room Type
                </label>
                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select room type</option>
                  <option value="Standard Room">Standard Room</option>
                  <option value="Deluxe Room">Deluxe Room</option>
                  <option value="Premium Room">Premium Room</option>
                  <option value="Suite">Suite</option>
                  <option value="Not Decided">Not Decided</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Special Requests
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any special requirements?"
                  className={`${inputClass} resize-y`}
                />
              </div>
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {errorMessage}
              </div>
            )}

            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={loading}
                onClick={onClose}
                className="rounded-lg border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-lg bg-amber-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CalendarDays size={17} />
                    Submit Enquiry
                    <Send size={15} />
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-xs text-gray-400">
              This is an enquiry, not a confirmed reservation.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

