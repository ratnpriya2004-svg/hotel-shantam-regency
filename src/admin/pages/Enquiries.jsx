import { useEffect, useMemo, useState } from "react";
import {
  Search,
  RefreshCw,
  MessageSquare,
  Phone,
  Mail,
  CalendarDays,
  X,
  Eye,
  CheckCircle2,
} from "lucide-react";

import {
  getEnquiries,
  updateEnquiryStatus,
} from "../services/enquiryService.js";

const STATUS_OPTIONS = [
  "New",
  "Contacted",
  "Follow-up",
  "Converted",
  "Lost",
];

const statusStyles = {
  new: "border-blue-200 bg-blue-50 text-blue-700",
  contacted: "border-amber-200 bg-amber-50 text-amber-800",
  "follow-up": "border-purple-200 bg-purple-50 text-purple-700",
  converted: "border-emerald-200 bg-emerald-50 text-emerald-700",
  lost: "border-rose-200 bg-rose-50 text-rose-700",
};

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getGuestName(enquiry) {
  return (
    enquiry.name ||
    enquiry.full_name ||
    enquiry.guest_name ||
    "Guest"
  );
}

function getEnquiryType(enquiry) {
  return enquiry.enquiry_type || enquiry.event_type || "General";
}

function getStatus(enquiry) {
  const currentStatus = String(enquiry.status || "New").toLowerCase();

  return (
    STATUS_OPTIONS.find(
      (option) => option.toLowerCase() === currentStatus
    ) || "New"
  );
}

function formatStayPreferences(preferences) {
  if (!preferences) return null;

  if (typeof preferences === "string") {
    try {
      preferences = JSON.parse(preferences);
    } catch {
      return preferences;
    }
  }

  if (typeof preferences !== "object") {
    return String(preferences);
  }

  const details = [
    preferences.check_in && `Check-in: ${preferences.check_in}`,
    preferences.check_out && `Check-out: ${preferences.check_out}`,
    preferences.room_type && `Room: ${preferences.room_type}`,
  ].filter(Boolean);

  return details.length ? details.join("\n") : JSON.stringify(preferences, null, 2);
}

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [savingId, setSavingId] = useState(null);
  const [notice, setNotice] = useState("");

  async function loadEnquiries() {
    setLoading(true);
    setError("");
    setNotice("");

    try {
      const data = await getEnquiries();
      setEnquiries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load enquiries:", err);
      setError(err?.message || "Unable to load enquiries.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEnquiries();
  }, []);

  const filteredEnquiries = useMemo(() => {
    const query = search.trim().toLowerCase();

    return enquiries.filter((enquiry) => {
      const status = getStatus(enquiry);

      const matchesStatus =
        statusFilter === "all" ||
        status.toLowerCase() === statusFilter.toLowerCase();

      const searchableText = [
        getGuestName(enquiry),
        enquiry.email,
        enquiry.phone,
        getEnquiryType(enquiry),
        enquiry.message,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesStatus && searchableText.includes(query);
    });
  }, [enquiries, search, statusFilter]);

  async function handleStatusChange(enquiry, newStatus) {
    if (!enquiry.id) {
      setError("This enquiry has no ID, so its status cannot be updated.");
      return;
    }

    if (!STATUS_OPTIONS.includes(newStatus)) {
      setError("Please select a valid enquiry status.");
      return;
    }

    const previousEnquiries = enquiries;
    const previousSelected = selectedEnquiry;

    setSavingId(enquiry.id);
    setError("");
    setNotice("");

    setEnquiries((current) =>
      current.map((item) =>
        item.id === enquiry.id
          ? { ...item, status: newStatus }
          : item
      )
    );

    setSelectedEnquiry((current) =>
      current?.id === enquiry.id
        ? { ...current, status: newStatus }
        : current
    );

    try {
      const updated = await updateEnquiryStatus(enquiry.id, newStatus);

      setEnquiries((current) =>
        current.map((item) =>
          item.id === enquiry.id
            ? { ...item, ...updated, status: newStatus }
            : item
        )
      );

      setSelectedEnquiry((current) =>
        current?.id === enquiry.id
          ? { ...current, ...updated, status: newStatus }
          : current
      );

      setNotice("Enquiry status updated successfully.");
    } catch (err) {
      console.error("Failed to update enquiry status:", err);

      setEnquiries(previousEnquiries);
      setSelectedEnquiry(previousSelected);

      setError(err?.message || "Failed to update enquiry status.");
    } finally {
      setSavingId(null);
    }
  }

  const counts = useMemo(() => {
    return enquiries.reduce(
      (result, enquiry) => {
        const status = getStatus(enquiry).toLowerCase();

        result.total += 1;

        if (Object.prototype.hasOwnProperty.call(result, status)) {
          result[status] += 1;
        }

        return result;
      },
      {
        total: 0,
        new: 0,
        contacted: 0,
        "follow-up": 0,
        converted: 0,
        lost: 0,
      }
    );
  }, [enquiries]);

  const summaryCards = [
    { label: "Total", value: counts.total },
    { label: "New", value: counts.new },
    { label: "Contacted", value: counts.contacted },
    { label: "Follow-up", value: counts["follow-up"] },
    { label: "Converted", value: counts.converted },
    { label: "Lost", value: counts.lost },
  ];

  return (
    <div className="min-w-0 space-y-6">
      {/* Page heading */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-anta text-xs uppercase tracking-[0.16em] text-amber-700">
            Guest Relationship Management
          </p>

          <h1 className="mt-2 font-anta text-2xl text-gray-900 sm:text-3xl">
            Enquiries
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            Manage guest enquiries and track their progress.
          </p>
        </div>

        <button
          type="button"
          onClick={loadEnquiries}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-amber-300 hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={15}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="flex items-start justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700"
        >
          <span className="break-words">{error}</span>

          <button
            type="button"
            onClick={() => setError("")}
            aria-label="Dismiss error"
            className="shrink-0 rounded p-1 hover:bg-rose-100"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Success */}
      {notice && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
        >
          <CheckCircle2 size={17} />
          {notice}
        </div>
      )}

      {/* Summary cards */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {summaryCards.map((item) => {
          const filterValue =
            item.label === "Total" ? "all" : item.label.toLowerCase();

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => setStatusFilter(filterValue)}
              className={`rounded-xl border p-4 text-left transition hover:border-amber-300 hover:bg-amber-50/50 ${
                statusFilter === filterValue
                  ? "border-amber-300 bg-amber-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <p className="text-xs text-gray-500">{item.label}</p>

              <p className="mt-2 font-anta text-2xl text-gray-900">
                {item.value.toLocaleString("en-IN")}
              </p>

              <p className="mt-2 text-[11px] text-gray-500">
                Click to filter
              </p>
            </button>
          );
        })}
      </section>

      {/* Search and results */}
      <section className="min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="relative w-full sm:max-w-sm">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search guest, email, phone..."
              aria-label="Search enquiries"
              className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter enquiries by status"
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-amber-400 sm:w-auto"
          >
            <option value="all">All statuses</option>

            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="space-y-3 p-5" aria-live="polite">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-14 animate-pulse rounded-lg bg-gray-100"
              />
            ))}
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="flex min-h-52 flex-col items-center justify-center px-5 py-10 text-center">
            <MessageSquare size={30} className="mb-3 text-gray-400" />

            <p className="text-sm font-medium text-gray-800">
              {enquiries.length === 0
                ? "No enquiries found in the database."
                : "No enquiries match your search or filter."}
            </p>

            <p className="mt-2 max-w-md text-xs leading-relaxed text-gray-500">
              Actual enquiries available to your application will appear here.
            </p>

            {(search || statusFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                }}
                className="mt-4 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <th className="px-5 py-3 font-medium">Guest</th>
                  <th className="px-5 py-3 font-medium">Enquiry</th>
                  <th className="px-5 py-3 font-medium">Received</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredEnquiries.map((enquiry, index) => {
                  const status = getStatus(enquiry);

                  return (
                    <tr
                      key={enquiry.id ?? `${getGuestName(enquiry)}-${index}`}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-gray-900">
                          {getGuestName(enquiry)}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {enquiry.email || enquiry.phone || "No contact details"}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm capitalize text-gray-700">
                          {getEnquiryType(enquiry)}
                        </p>

                        <p className="mt-1 max-w-[220px] truncate text-xs text-gray-500">
                          {enquiry.message || "No message"}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-xs text-gray-600">
                        {formatDate(enquiry.created_at)}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-xs ${
                            statusStyles[status.toLowerCase()] ||
                            "border-gray-200 bg-gray-50 text-gray-700"
                          }`}
                        >
                          {status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedEnquiry(enquiry)}
                            title="View enquiry details"
                            aria-label={`View ${getGuestName(enquiry)}`}
                            className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800"
                          >
                            <Eye size={15} />
                          </button>

                          <select
                            value={status}
                            disabled={savingId === enquiry.id || !enquiry.id}
                            onChange={(event) =>
                              handleStatusChange(enquiry, event.target.value)
                            }
                            aria-label={`Update status for ${getGuestName(enquiry)}`}
                            className="max-w-[130px] rounded-lg border border-gray-200 bg-white px-2 py-2 text-xs text-gray-700 outline-none focus:border-amber-400 disabled:opacity-50"
                          >
                            {STATUS_OPTIONS.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="border-t border-gray-200 px-4 py-3 text-xs text-gray-500 sm:px-5">
          Showing {filteredEnquiries.length} of {enquiries.length} enquiries
        </div>
      </section>

      {/* Enquiry details modal */}
      {selectedEnquiry && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-3 sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedEnquiry(null);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-detail-title"
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-xl"
          >
            <div className="flex items-start justify-between border-b border-gray-200 p-4 sm:p-5">
              <div>
                <p className="font-anta text-xs uppercase tracking-wide text-amber-800">
                  Enquiry Details
                </p>

                <h2
                  id="enquiry-detail-title"
                  className="mt-2 break-words font-anta text-xl text-gray-900"
                >
                  {getGuestName(selectedEnquiry)}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                aria-label="Close enquiry details"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-5 p-4 sm:p-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex min-w-0 items-start gap-3">
                  <Mail size={17} className="mt-0.5 shrink-0 text-amber-800" />

                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="mt-1 break-all text-sm text-gray-800">
                      {selectedEnquiry.email || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex min-w-0 items-start gap-3">
                  <Phone size={17} className="mt-0.5 shrink-0 text-amber-800" />

                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="mt-1 break-words text-sm text-gray-800">
                      {selectedEnquiry.phone || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex min-w-0 items-start gap-3">
                  <MessageSquare
                    size={17}
                    className="mt-0.5 shrink-0 text-amber-800"
                  />

                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Enquiry type</p>
                    <p className="mt-1 break-words text-sm capitalize text-gray-800">
                      {getEnquiryType(selectedEnquiry)}
                    </p>
                  </div>
                </div>

                <div className="flex min-w-0 items-start gap-3">
                  <CalendarDays
                    size={17}
                    className="mt-0.5 shrink-0 text-amber-800"
                  />

                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Received on</p>
                    <p className="mt-1 text-sm text-gray-800">
                      {formatDate(selectedEnquiry.created_at)}
                    </p>
                  </div>
                </div>
              </div>

              {selectedEnquiry.event_date && (
                <div>
                  <p className="text-xs text-gray-500">Requested event date</p>
                  <p className="mt-1 text-sm text-gray-800">
                    {formatDate(selectedEnquiry.event_date)}
                  </p>
                </div>
              )}

              {selectedEnquiry.guests != null && (
                <div>
                  <p className="text-xs text-gray-500">Guests</p>
                  <p className="mt-1 text-sm text-gray-800">
                    {selectedEnquiry.guests}
                  </p>
                </div>
              )}

              {selectedEnquiry.stay_preferences && (
                <div>
                  <p className="text-xs text-gray-500">Stay preferences</p>
                  <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-relaxed text-gray-700">
                    {formatStayPreferences(selectedEnquiry.stay_preferences)}
                  </p>
                </div>
              )}

              <div>
                <p className="text-xs text-gray-500">Message</p>
                <p className="mt-2 whitespace-pre-wrap break-words rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm leading-relaxed text-gray-700">
                  {selectedEnquiry.message || "No message provided."}
                </p>
              </div>

              <div>
                <label
                  htmlFor="detail-status"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Update enquiry status
                </label>

                <select
                  id="detail-status"
                  value={getStatus(selectedEnquiry)}
                  disabled={savingId === selectedEnquiry.id || !selectedEnquiry.id}
                  onChange={(event) =>
                    handleStatusChange(selectedEnquiry, event.target.value)
                  }
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-amber-400 disabled:opacity-50"
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                {savingId === selectedEnquiry.id && (
                  <p className="mt-2 text-xs text-gray-500">
                    Saving status...
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

