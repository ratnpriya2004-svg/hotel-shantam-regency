import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Users,
  Search,
  RefreshCw,
  Mail,
  Phone,
  Eye,
  X,
  MessageSquare,
  CalendarDays,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";

import { getEnquiries } from "../services/enquiryService.js";

function getGuestName(guest) {
  return guest.name || guest.full_name || guest.guest_name || "Guest";
}

function formatDate(value) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not available";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function MetricCard({ title, value, icon: Icon }) {
  return (
    <article className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <div className="min-w-0">
        <p className="font-anta text-xs uppercase tracking-wider text-gray-500">
          {title}
        </p>

        <p className="mt-3 font-anta text-2xl text-gray-900 sm:text-3xl">
          {value}
        </p>
      </div>

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
        <Icon size={20} strokeWidth={1.7} />
      </div>
    </article>
  );
}

function GuestDetailsModal({ guest, onClose }) {
  useEffect(() => {
    if (!guest) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [guest, onClose]);

  if (!guest) return null;

  const details = [
    ["Email address", guest.email || "Not provided", Mail],
    ["Phone number", guest.phone || "Not provided", Phone],
    [
      "Enquiry type",
      guest.enquiry_type || guest.event_type || "General",
      MessageSquare,
    ],
    ["Enquiry received", formatDate(guest.created_at), CalendarDays],
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="guest-detail-title"
        className="max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-gray-200 bg-white shadow-xl sm:rounded-2xl"
      >
        <div className="sticky top-0 flex items-start justify-between gap-3 border-b border-gray-200 bg-white px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="font-anta text-xs uppercase tracking-widest text-amber-700">
              Guest profile
            </p>

            <h2
              id="guest-detail-title"
              className="mt-1 break-words font-anta text-xl text-gray-900"
            >
              {getGuestName(guest)}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close guest details"
            className="shrink-0 rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            <X size={19} />
          </button>
        </div>

        <div className="divide-y divide-gray-100 px-5 sm:px-6">
          {details.map(([label, value, Icon]) => (
            <div key={label} className="flex items-start gap-3 py-4">
              <Icon
                size={17}
                className="mt-0.5 shrink-0 text-amber-700"
                strokeWidth={1.7}
              />

              <div className="min-w-0">
                <p className="text-xs text-gray-500">{label}</p>
                <p className="mt-1 break-words text-sm capitalize text-gray-800">
                  {value}
                </p>
              </div>
            </div>
          ))}

          <div className="py-4">
            <p className="text-xs text-gray-500">Message</p>

            <p className="mt-2 whitespace-pre-wrap break-words rounded-lg bg-gray-50 p-4 text-sm leading-6 text-gray-700">
              {guest.message || "No message provided."}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 p-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 font-anta text-sm text-gray-700 transition hover:bg-gray-50"
          >
            Close Details
          </button>
        </div>
      </section>
    </div>
  );
}

export default function Guests() {
  const [guests, setGuests] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [selectedGuest, setSelectedGuest] = useState(null);

  const loadGuests = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    setError("");

    try {
      const enquiries = await getEnquiries();

      const guestRecords = (enquiries || []).filter(
        (item) =>
          item.name ||
          item.full_name ||
          item.guest_name ||
          item.email ||
          item.phone
      );

      setGuests(guestRecords);
    } catch (err) {
      console.error("Failed to load guest records:", err);
      setError(err?.message || "Unable to load guest information.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadGuests();
  }, [loadGuests]);

  const filteredGuests = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return guests;

    return guests.filter((guest) =>
      [
        getGuestName(guest),
        guest.email,
        guest.phone,
        guest.enquiry_type,
        guest.event_type,
        guest.message,
      ].some((value) =>
        String(value || "").toLowerCase().includes(query)
      )
    );
  }, [guests, search]);

  const uniqueGuestCount = useMemo(() => {
    const uniqueContacts = new Set(
      guests.map((guest) => {
        const email = String(guest.email || "").trim().toLowerCase();
        const phone = String(guest.phone || "").replace(/\D/g, "");

        if (email) return `email:${email}`;
        if (phone) return `phone:${phone}`;

        return `record:${guest.id}`;
      })
    );

    return uniqueContacts.size;
  }, [guests]);

  return (
    <section className="min-w-0 space-y-6 font-ibm">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-anta text-xs uppercase tracking-[0.2em] text-amber-700">
            Guest Relationship Management
          </p>

          <h1 className="mt-2 font-anta text-2xl text-gray-900 sm:text-3xl">
            Guests
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
            View guest contact information from submitted enquiries.
          </p>
        </div>

        <button
          type="button"
          onClick={() => loadGuests(true)}
          disabled={loading || refreshing}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 font-anta text-sm text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            size={15}
            className={refreshing ? "animate-spin" : ""}
          />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <MetricCard
          title="Guest Records"
          value={loading ? "—" : guests.length.toLocaleString("en-IN")}
          icon={MessageSquare}
        />

        <MetricCard
          title="Unique Guests by Contact"
          value={loading ? "—" : uniqueGuestCount.toLocaleString("en-IN")}
          icon={Users}
        />
      </div>

      {/* Guest records */}
      <section className="min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div>
            <h2 className="font-anta text-lg text-gray-900">
              Guest Records
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              {loading
                ? "Loading guest records..."
                : `${filteredGuests.length} records found`}
            </p>
          </div>

          <div className="relative w-full sm:max-w-sm">
            <Search
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search guest, email or phone..."
              aria-label="Search guest records"
              className="min-h-10 w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
            />
          </div>
        </div>

        {error ? (
          <div className="p-8 text-center">
            <AlertCircle size={25} className="mx-auto text-red-500" />

            <p className="mt-3 break-words text-sm text-red-700">
              {error}
            </p>

            <button
              type="button"
              onClick={() => loadGuests(true)}
              className="mt-3 text-sm text-amber-800 underline underline-offset-4"
            >
              Try Again
            </button>
          </div>
        ) : loading ? (
          <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-gray-500">
            <LoaderCircle size={25} className="animate-spin text-amber-700" />
            <p className="text-sm">Loading guest records...</p>
          </div>
        ) : filteredGuests.length === 0 ? (
          <div className="flex min-h-48 flex-col items-center justify-center px-5 py-10 text-center">
            <Users size={30} className="text-gray-300" />

            <h3 className="mt-3 font-anta text-base text-gray-800">
              {guests.length === 0
                ? "No guest records found"
                : "No matching guests"}
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
              {guests.length === 0
                ? "Guest information will appear here when contact details are available in your enquiry records."
                : "Try a different keyword or clear your search."}
            </p>

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-3 text-sm text-amber-800 underline underline-offset-4"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Mobile layout */}
            <div className="divide-y divide-gray-100 md:hidden">
              {filteredGuests.map((guest, index) => (
                <article
                  key={guest.id ?? index}
                  className="space-y-4 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="break-words font-anta text-base text-gray-900">
                        {getGuestName(guest)}
                      </h3>

                      <p className="mt-1 break-all text-xs text-gray-500">
                        {guest.email || "No email provided"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedGuest(guest)}
                      aria-label={`View ${getGuestName(guest)} details`}
                      className="shrink-0 rounded-lg border border-gray-300 p-2 text-gray-600 hover:bg-amber-50 hover:text-amber-800"
                    >
                      <Eye size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="flex items-start gap-2">
                      <Phone
                        size={15}
                        className="mt-0.5 shrink-0 text-gray-400"
                      />
                      <p className="break-words text-sm text-gray-700">
                        {guest.phone || "No phone provided"}
                      </p>
                    </div>

                    <div className="flex items-start gap-2">
                      <MessageSquare
                        size={15}
                        className="mt-0.5 shrink-0 text-gray-400"
                      />
                      <p className="break-words text-sm capitalize text-gray-700">
                        {guest.enquiry_type || guest.event_type || "General"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-3">
                    <p className="text-xs text-gray-500">
                      {formatDate(guest.created_at)}
                    </p>

                    <button
                      type="button"
                      onClick={() => setSelectedGuest(guest)}
                      className="font-anta text-xs text-amber-800 hover:underline"
                    >
                      View Details
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Tablet and desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[700px] text-left">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    {[
                      "Guest",
                      "Email",
                      "Phone",
                      "Enquiry Type",
                      "Received",
                      "Details",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="px-4 py-3.5 font-anta text-xs font-normal uppercase tracking-wider text-gray-500 lg:px-5"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredGuests.map((guest, index) => (
                    <tr
                      key={guest.id ?? index}
                      className="transition hover:bg-gray-50/70"
                    >
                      <td className="max-w-[180px] px-4 py-4 text-sm font-medium text-gray-900 lg:px-5">
                        <span className="block truncate">
                          {getGuestName(guest)}
                        </span>
                      </td>

                      <td className="max-w-[200px] px-4 py-4 text-xs text-gray-600 lg:px-5">
                        <span className="block break-all">
                          {guest.email || "—"}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-xs text-gray-600 lg:px-5">
                        {guest.phone || "—"}
                      </td>

                      <td className="px-4 py-4 text-sm capitalize text-gray-600 lg:px-5">
                        {guest.enquiry_type || guest.event_type || "General"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-xs text-gray-600 lg:px-5">
                        {formatDate(guest.created_at)}
                      </td>

                      <td className="px-4 py-4 lg:px-5">
                        <button
                          type="button"
                          onClick={() => setSelectedGuest(guest)}
                          aria-label={`View ${getGuestName(guest)} details`}
                          title="View details"
                          className="rounded-lg border border-gray-300 p-2 text-gray-600 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800"
                        >
                          <Eye size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {!loading && !error && filteredGuests.length > 0 && (
          <div className="border-t border-gray-200 bg-gray-50/70 px-4 py-3 text-xs text-gray-500 sm:px-5">
            Showing {filteredGuests.length} of {guests.length} guest records
          </div>
        )}
      </section>

      <GuestDetailsModal
        guest={selectedGuest}
        onClose={() => setSelectedGuest(null)}
      />
    </section>
  );
}

