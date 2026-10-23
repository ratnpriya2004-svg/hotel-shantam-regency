import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Search,
  RefreshCw,
  Users,
  Eye,
  X,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Trash2,
  LoaderCircle,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import {
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from "../services/enquiryService.js";

const STATUSES = ["new", "contacted", "follow-up", "converted", "lost"];

const getValue = (...values) =>
  values.find((value) => value !== null && value !== undefined && value !== "") ?? "";

const getName = (item) =>
  getValue(item.name, item.full_name, item.guest_name) || "Guest";

const getEventType = (item) =>
  getValue(item.event_type, item.enquiry_type) || "Event enquiry";

const getEventDate = (item) =>
  getValue(item.event_date, item.preferred_date, item.date);

const getGuestCount = (item) => {
  const count = Number(getValue(item.guests, item.number_of_guests, 0));
  return Number.isFinite(count) && count > 0 ? count : 0;
};

const formatDate = (value) => {
  if (!value) return "Not specified";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not specified";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const isEventEnquiry = (item) => {
  const type = String(
    getValue(item.event_type, item.enquiry_type, item.type)
  ).toLowerCase();

  return [
    "event",
    "banquet",
    "party",
    "wedding",
    "conference",
    "birthday",
    "reception",
    "corporate",
    "function",
  ].some((keyword) => type.includes(keyword));
};

const statusClasses = {
  new: "bg-blue-50 text-blue-700",
  contacted: "bg-amber-50 text-amber-800",
  "follow-up": "bg-purple-50 text-purple-700",
  converted: "bg-green-50 text-green-700",
  lost: "bg-red-50 text-red-700",
};

function MetricCard({ title, value, icon: Icon }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-anta text-xs uppercase tracking-wider text-gray-500">
            {title}
          </p>
          <p className="mt-3 font-anta text-2xl text-gray-900 sm:text-3xl">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
          <Icon size={19} strokeWidth={1.7} />
        </div>
      </div>
    </div>
  );
}

function EventDetails({ event, onClose }) {
  useEffect(() => {
    if (!event) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [event, onClose]);

  if (!event) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-modal-title"
        className="max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white shadow-xl sm:rounded-2xl"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4">
          <div>
            <p className="font-anta text-xs uppercase tracking-widest text-amber-700">
              Event enquiry
            </p>
            <h2
              id="event-modal-title"
              className="mt-1 font-anta text-xl text-gray-900"
            >
              {getName(event)}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            <X size={19} />
          </button>
        </div>

        <div className="divide-y divide-gray-100 px-5">
          {[
            [Users, "Event type", getEventType(event)],
            [Mail, "Email", event.email],
            [Phone, "Phone", event.phone],
            [Calendar, "Event date", formatDate(getEventDate(event))],
            [Users, "Expected guests", getGuestCount(event) || "Not specified"],
            [
              CheckCircle2,
              "Status",
              String(event.status || "new").replace("-", " "),
            ],
          ].map(([Icon, label, value]) => (
            <div key={label} className="flex items-start gap-3 py-3">
              <Icon size={17} className="mt-0.5 shrink-0 text-gray-400" />
              <div className="min-w-0">
                <p className="text-xs text-gray-500">{label}</p>
                <p className="mt-1 break-words text-sm capitalize text-gray-800">
                  {value || "Not provided"}
                </p>
              </div>
            </div>
          ))}

          <div className="py-4">
            <div className="mb-2 flex items-center gap-2 text-gray-500">
              <MessageSquare size={16} />
              <p className="text-xs">Message</p>
            </div>
            <p className="whitespace-pre-wrap break-words rounded-lg bg-gray-50 p-3 text-sm leading-6 text-gray-700">
              {getValue(event.message, event.description) || "No message provided."}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 p-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 font-anta text-sm text-gray-700 hover:bg-gray-50"
          >
            Close details
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Events() {
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadEvents = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    setError("");
    setNotice("");

    try {
      const data = await getEnquiries();
      setEnquiries(Array.isArray(data) ? data.filter(isEventEnquiry) : []);
    } catch (err) {
      setError(err?.message || "Unable to load enquiries.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return enquiries;

    return enquiries.filter((item) =>
      [
        getName(item),
        item.email,
        item.phone,
        item.event_type,
        item.enquiry_type,
        item.message,
        item.status,
        getEventDate(item),
      ].some((value) => String(value ?? "").toLowerCase().includes(query))
    );
  }, [enquiries, search]);

  const metrics = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return {
      total: enquiries.length,
      upcoming: enquiries.filter((item) => {
        const value = getEventDate(item);
        if (!value) return false;

        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return false;

        date.setHours(0, 0, 0, 0);
        return date >= today;
      }).length,
      guests: enquiries.reduce((sum, item) => sum + getGuestCount(item), 0),
    };
  }, [enquiries]);

  async function handleStatusChange(event, status) {
    if (!event.id || busyId) return;

    const previous = enquiries;
    setBusyId(event.id);
    setError("");
    setNotice("");

    // Update the UI immediately, then roll back if Supabase rejects the change.
    setEnquiries((current) =>
      current.map((item) =>
        item.id === event.id ? { ...item, status } : item
      )
    );

    try {
      const updated = await updateEnquiryStatus(event.id, status);

      setEnquiries((current) =>
        current.map((item) =>
          item.id === event.id ? { ...item, ...updated } : item
        )
      );

      setSelectedEvent((current) =>
        current?.id === event.id ? { ...current, ...updated } : current
      );

      setNotice("Enquiry status updated successfully.");
    } catch (err) {
      setEnquiries(previous);
      setError(err?.message || "Could not update enquiry status.");
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(event) {
    if (!event.id || busyId) return;

    const confirmed = window.confirm(
      `Delete the enquiry from ${getName(event)}? This action cannot be undone.`
    );

    if (!confirmed) return;

    const previous = enquiries;
    setBusyId(event.id);
    setError("");
    setNotice("");

    setEnquiries((current) => current.filter((item) => item.id !== event.id));

    try {
      await deleteEnquiry(event.id);

      if (selectedEvent?.id === event.id) setSelectedEvent(null);

      setNotice("Enquiry deleted successfully.");
    } catch (err) {
      setEnquiries(previous);
      setError(err?.message || "Could not delete this enquiry.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <section className="min-w-0 space-y-6 font-ibm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-anta text-xs uppercase tracking-[0.2em] text-amber-700">
            Hotel Shantam Regency
          </p>
          <h1 className="mt-2 font-anta text-2xl text-gray-900 sm:text-3xl">
            Events & Banquets
          </h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            Review event enquiries and manage their status.
          </p>
        </div>

        <button
          type="button"
          onClick={() => loadEvents(true)}
          disabled={loading || refreshing || Boolean(busyId)}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 font-anta text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-60"
        >
          <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <MetricCard title="Total Enquiries" value={loading ? "—" : metrics.total} icon={CalendarDays} />
        <MetricCard title="Upcoming Events" value={loading ? "—" : metrics.upcoming} icon={Calendar} />
        <MetricCard title="Expected Guests" value={loading ? "—" : metrics.guests.toLocaleString("en-IN")} icon={Users} />
      </div>

      {notice && (
        <div className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span className="break-words">{error}</span>
        </div>
      )}

      <div className="min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-gray-200 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-anta text-lg text-gray-900">Event Enquiries</h2>
            <p className="mt-1 text-xs text-gray-500">
              {loading ? "Loading..." : `${filteredEvents.length} records found`}
            </p>
          </div>

          <div className="relative w-full lg:max-w-sm">
            <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search guest or event..."
              aria-label="Search event enquiries"
              className="min-h-10 w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm text-gray-800 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-gray-500">
            <LoaderCircle size={24} className="animate-spin text-amber-700" />
            <p className="text-sm">Loading event enquiries...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="flex min-h-48 flex-col items-center justify-center px-5 py-10 text-center">
            <CalendarDays size={26} className="text-gray-400" />
            <h3 className="mt-3 font-anta text-base text-gray-800">
              {search ? "No matching enquiries" : "No event enquiries yet"}
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              {search
                ? "Try a different search or clear the search field."
                : "Event enquiries will appear here when available in Supabase."}
            </p>
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-3 text-sm text-amber-800 underline underline-offset-4"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Mobile layout */}
            <div className="divide-y divide-gray-100 md:hidden">
              {filteredEvents.map((event, index) => (
                <article key={event.id ?? index} className="space-y-4 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="break-words font-anta text-base text-gray-900">
                        {getName(event)}
                      </h3>
                      <p className="mt-1 break-all text-xs text-gray-500">
                        {event.email || "No email provided"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedEvent(event)}
                      aria-label={`View ${getName(event)}`}
                      className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50"
                    >
                      <Eye size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-gray-500">Event</p>
                      <p className="mt-1 break-words text-gray-800">{getEventType(event)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Event date</p>
                      <p className="mt-1 text-gray-800">{formatDate(getEventDate(event))}</p>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor={`event-status-${event.id ?? index}`}
                      className="mb-1.5 block text-xs text-gray-500"
                    >
                      Update status
                    </label>
                    <select
                      id={`event-status-${event.id ?? index}`}
                      value={String(event.status || "new").toLowerCase()}
                      onChange={(e) => handleStatusChange(event, e.target.value)}
                      disabled={!event.id || Boolean(busyId)}
                      className="min-h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-800 outline-none focus:border-amber-600 disabled:opacity-60"
                    >
                      {STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-3">
                    <span className="text-xs text-gray-500">
                      {getGuestCount(event) || "—"} guests
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDelete(event)}
                      disabled={!event.id || Boolean(busyId)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs text-red-700 hover:bg-red-50 disabled:opacity-50"
                    >
                      {busyId === event.id ? (
                        <LoaderCircle size={14} className="animate-spin" />
                      ) : (
                        <Trash2 size={14} />
                      )}
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Desktop/tablet table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[900px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    {["Guest", "Event", "Event Date", "Guests", "Status", "Actions"].map((heading) => (
                      <th key={heading} className="px-4 py-3.5 font-anta text-xs font-normal uppercase tracking-wider text-gray-500 lg:px-5">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredEvents.map((event, index) => (
                    <tr key={event.id ?? index} className="hover:bg-gray-50/70">
                      <td className="max-w-[230px] px-4 py-4 lg:px-5">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {getName(event)}
                        </p>
                        <p className="mt-1 truncate text-xs text-gray-500">
                          {event.email || "No email provided"}
                        </p>
                      </td>

                      <td className="px-4 py-4 lg:px-5">
                        <span className="inline-flex max-w-[160px] rounded-md bg-amber-50 px-2.5 py-1 text-xs text-amber-800">
                          <span className="truncate">{getEventType(event)}</span>
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600 lg:px-5">
                        {formatDate(getEventDate(event))}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-600 lg:px-5">
                        {getGuestCount(event) || "—"}
                      </td>

                      <td className="px-4 py-4 lg:px-5">
                        <select
                          value={String(event.status || "new").toLowerCase()}
                          onChange={(e) => handleStatusChange(event, e.target.value)}
                          disabled={!event.id || Boolean(busyId)}
                          aria-label={`Update status for ${getName(event)}`}
                          className={`min-h-9 max-w-36 rounded-lg border border-gray-200 px-2 py-1.5 text-xs outline-none focus:border-amber-600 disabled:opacity-60 ${statusClasses[String(event.status || "new").toLowerCase()] || "bg-gray-50 text-gray-700"}`}
                        >
                          {STATUSES.map((status) => (
                            <option key={status} value={status}>
                              {status.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="px-4 py-4 lg:px-5">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedEvent(event)}
                            aria-label={`View ${getName(event)}`}
                            title="View details"
                            className="rounded-lg border border-gray-300 p-2 text-gray-600 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800"
                          >
                            <Eye size={15} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(event)}
                            disabled={!event.id || Boolean(busyId)}
                            aria-label={`Delete ${getName(event)}`}
                            title="Delete enquiry"
                            className="rounded-lg border border-red-200 p-2 text-red-700 hover:bg-red-50 disabled:opacity-50"
                          >
                            {busyId === event.id ? (
                              <LoaderCircle size={15} className="animate-spin" />
                            ) : (
                              <Trash2 size={15} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {!loading && filteredEvents.length > 0 && (
          <div className="border-t border-gray-200 bg-gray-50/70 px-4 py-3 text-xs text-gray-500 sm:px-5">
            Showing {filteredEvents.length} of {enquiries.length} event enquiries
          </div>
        )}
      </div>

      <EventDetails event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </section>
  );
}

