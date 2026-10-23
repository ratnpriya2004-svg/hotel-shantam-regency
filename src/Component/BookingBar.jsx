import { useState } from "react";
import {
  CalendarDays,
  Users,
  BedDouble,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const initialBooking = {
  checkIn: "",
  checkOut: "",
  adults: "2",
  children: "0",
  rooms: "1",
};

const fieldClass =
  "w-full min-w-0 cursor-pointer bg-transparent text-sm text-[#29342D] outline-none";

export default function BookingBar() {
  const [booking, setBooking] = useState(initialBooking);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const getToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const today = getToday();

  const updateBooking = (event) => {
    const { name, value } = event.target;

    setBooking((previous) => {
      const updated = {
        ...previous,
        [name]: value,
      };

      // Clear checkout if it is no longer after check-in.
      if (
        name === "checkIn" &&
        updated.checkOut &&
        updated.checkOut <= value
      ) {
        updated.checkOut = "";
      }

      return updated;
    });

    setMessage("");
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!booking.checkIn || !booking.checkOut) {
      setError(true);
      setMessage("Please select both check-in and check-out dates.");
      return;
    }

    if (booking.checkIn < today) {
      setError(true);
      setMessage("Check-in date cannot be in the past.");
      return;
    }

    if (booking.checkOut <= booking.checkIn) {
      setError(true);
      setMessage("Check-out date must be after check-in.");
      return;
    }

    try {
      sessionStorage.setItem(
        "hotelBookingEnquiry",
        JSON.stringify(booking)
      );

      const contactSection = document.getElementById("contact");

      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        setError(false);
        setMessage(
          "Stay preferences saved! Please complete the contact enquiry to request confirmation."
        );
      } else {
        setError(false);
        setMessage(
          "Stay preferences saved. Please contact the hotel to enquire about availability and rates."
        );
      }
    } catch {
      setError(true);
      setMessage(
        "Unable to save your stay preferences. Please try again."
      );
    }
  };

  const fields = [
    {
      name: "adults",
      label: "Adults",
      icon: Users,
      options: [1, 2, 3, 4, 5, 6],
    },
    {
      name: "children",
      label: "Children",
      icon: Users,
      options: [0, 1, 2, 3, 4, 5, 6],
    },
    {
      name: "rooms",
      label: "Rooms",
      icon: BedDouble,
      options: [1, 2, 3, 4, 5],
    },
  ];

  return (
    <section
      id="booking"
      className="relative z-10 mx-auto mt-10 w-[92%] max-w-[1240px] sm:mt-14 lg:mt-16"
    >
      <div className="border border-[#E3D3B8] bg-[#FFFAF3] p-5 shadow-[0_16px_50px_rgba(80,60,30,0.08)] sm:p-7 lg:p-8">
        {/* Heading */}
        <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-[#B9954E]" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#997B43]">
                Your stay, your way
              </p>
            </div>

            <h2 className="font-['IBM_Plex_Serif'] text-2xl text-[#29342D] sm:text-3xl">
              Plan your stay
            </h2>
          </div>

          <p className="max-w-sm text-xs leading-6 text-[#77766D]">
            Share your preferred dates and stay requirements with our hotel
            team.
          </p>
        </div>

        {/* Booking Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:items-end"
        >
          {/* Check-in */}
          <label className="block min-w-0">
            <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#696A62]">
              Check-in
            </span>

            <span className="flex min-h-[50px] min-w-0 items-center gap-3 border border-[#E3D3B8] bg-[#F7F0E6] px-3 transition-colors focus-within:border-[#B9954E]">
              <CalendarDays
                size={17}
                strokeWidth={1.5}
                className="shrink-0 text-[#997B43]"
              />

              <input
                type="date"
                name="checkIn"
                value={booking.checkIn}
                min={today}
                onChange={updateBooking}
                required
                aria-label="Check-in date"
                className={fieldClass}
              />
            </span>
          </label>

          {/* Check-out */}
          <label className="block min-w-0">
            <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#696A62]">
              Check-out
            </span>

            <span className="flex min-h-[50px] min-w-0 items-center gap-3 border border-[#E3D3B8] bg-[#F7F0E6] px-3 transition-colors focus-within:border-[#B9954E]">
              <CalendarDays
                size={17}
                strokeWidth={1.5}
                className="shrink-0 text-[#997B43]"
              />

              <input
                type="date"
                name="checkOut"
                value={booking.checkOut}
                min={booking.checkIn || today}
                onChange={updateBooking}
                required
                aria-label="Check-out date"
                className={fieldClass}
              />
            </span>
          </label>

          {/* Adults, Children and Rooms */}
          {fields.map(({ name, label, icon: Icon, options }) => (
            <label key={name} className="block min-w-0">
              <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#696A62]">
                {label}
              </span>

              <span className="flex min-h-[50px] items-center gap-3 border border-[#E3D3B8] bg-[#F7F0E6] px-3 transition-colors focus-within:border-[#B9954E]">
                <Icon
                  size={17}
                  strokeWidth={1.5}
                  className="shrink-0 text-[#997B43]"
                />

                <select
                  name={name}
                  value={booking[name]}
                  onChange={updateBooking}
                  className={fieldClass}
                  aria-label={label}
                >
                  {options.map((number) => (
                    <option key={number} value={number}>
                      {number}
                    </option>
                  ))}
                </select>
              </span>
            </label>
          ))}

          {/* Submit */}
          <button
            type="submit"
            className="group flex min-h-[50px] items-center justify-center gap-3 bg-[#29342D] px-4 py-3 text-sm font-medium text-[#FFFAF3] transition-colors duration-300 hover:bg-[#997B43] focus:outline-none focus:ring-2 focus:ring-[#B9954E] focus:ring-offset-2 sm:col-span-2 lg:col-span-6"
          >
            Send Stay Enquiry

            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </form>

        {/* Status */}
        {message && (
          <div
            role={error ? "alert" : "status"}
            className={`mt-5 flex items-start gap-3 border-l-2 px-4 py-3 text-sm leading-6 ${
              error
                ? "border-red-500 bg-red-50 text-red-700"
                : "border-[#B9954E] bg-[#F7F0E6] text-[#29342D]"
            }`}
          >
            {!error && (
              <CheckCircle2
                size={17}
                className="mt-1 shrink-0 text-[#997B43]"
              />
            )}

            <p>{message}</p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-5 flex flex-col gap-2 border-t border-[#E3D3B8] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] leading-5 text-[#77766D]">
            Availability and rates are confirmed by the hotel after enquiry.
          </p>

          <p className="text-[10px] uppercase tracking-[0.12em] text-[#997B43]">
            Enquiry only · No online payment
          </p>
        </div>
      </div>
    </section>
  );
}