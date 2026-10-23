import { useCallback, useEffect, useMemo, useState } from "react";
import {
  UtensilsCrossed,
  Search,
  RefreshCw,
  MessageSquare,
  Eye,
  X,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";

import {
  getEnquiries,
  updateEnquiryStatus,
} from "../services/enquiryService.js";

const STATUSES = ["new", "contacted", "follow-up", "converted", "lost"];

const STATUS_STYLES = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  contacted: "bg-amber-50 text-amber-800 border-amber-200",
  "follow-up": "bg-purple-50 text-purple-700 border-purple-200",
  converted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  lost: "bg-red-50 text-red-700 border-red-200",
};

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getName(item) {
  return item.name || item.full_name || item.guest_name || "Guest";
}

function getStatus(item) {
  const status = String(item.status || "new").toLowerCase();

  return STATUSES.includes(status) ? status : "new";
}

function StatusBadge({ status }) {
  const normalized = getStatus({ status });

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs capitalize ${
        STATUS_STYLES[normalized]
      }`}
    >
      {normalized.replace("-", " ")}
    </span>
  );
}

function MetricCard({ title, value, icon: Icon }) {
  return (
    <article className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <div>
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

function EnquiryDetails({ enquiry, onClose }) {
  useEffect(() => {
    if (!enquiry) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [enquiry, onClose]);

  if (!enquiry) return null;

  const details = [
    [Mail, "Email", enquiry.email],
    [Phone, "Phone", enquiry.phone],
    [UtensilsCrossed, "Enquiry type", enquiry.enquiry_type],
    [Calendar, "Received on", formatDate(enquiry.created_at)],
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
        aria-labelledby="restaurant-enquiry-title"
        className="max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-gray-200 bg-white shadow-xl sm:rounded-2xl"
      >
        <div className="sticky top-0 flex items-start justify-between gap-3 border-b border-gray-200 bg-white px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="font-anta text-xs uppercase tracking-widest text-amber-700">
              Restaurant enquiry
            </p>

            <h2
              id="restaurant-enquiry-title"
              className="mt-1 break-words font-anta text-xl text-gray-900"
            >
              {getName(enquiry)}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="shrink-0 rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            <X size={19} />
          </button>
        </div>

        <div className="divide-y divide-gray-100 px-5 sm:px-6">
          {details.map(([Icon, label, value]) => (
            <div key={label} className="flex items-start gap-3 py-3">
              <Icon size={17} className="mt-0.5 shrink-0 text-gray-400" />

              <div className="min-w-0">
                <p className="text-xs text-gray-500">{label}</p>
                <p className="mt-1 break-words text-sm text-gray-800">
                  {value || "Not provided"}
                </p>
              </div>
            </div>
          ))}

          <div className="py-3">
            <p className="mb-2 text-xs text-gray-500">Current status</p>
            <StatusBadge status={enquiry.status} />
          </div>

          <div className="py-4">
            <div className="mb-2 flex items-center gap-2 text-gray-500">
              <MessageSquare size={16} />
              <p className="text-xs">Message</p>
            </div>

            <p className="whitespace-pre-wrap break-words rounded-lg bg-gray-50 p-3 text-sm leading-6 text-gray-700">
              {enquiry.message || "No message provided."}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 p-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 font-anta text-sm text-gray-700 hover:bg-gray-50"
          >
            Close Details
          </button>
        </div>
      </section>
    </div>
  );
}

export default function Restaurant() {
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const loadEnquiries = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    setError("");
    setNotice("");

    try {
      const data = await getEnquiries();

      const restaurantEnquiries = (data || []).filter((item) => {
        const type = String(item.enquiry_type || "").toLowerCase();

        return [
          "restaurant",
          "dining",
          "food",
          "table",
        ].some((keyword) => type.includes(keyword));
      });

      setEnquiries(restaurantEnquiries);
    } catch (err) {
      console.error("Failed to load restaurant enquiries:", err);
      setError(err?.message || "Unable to load restaurant enquiries.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadEnquiries();
  }, [loadEnquiries]);

  const filteredEnquiries = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return enquiries;

    return enquiries.filter((item) =>
      [
        getName(item),
        item.email,
        item.phone,
        item.enquiry_type,
        item.message,
        item.status,
      ].some((value) => String(value || "").toLowerCase().includes(query))
    );
  }, [enquiries, search]);

  const newCount = enquiries.filter(
    (item) => getStatus(item) === "new"
  ).length;

  async function handleStatusChange(item, status) {
    if (!item.id || busyId) return;

    const previous = enquiries;

    setBusyId(item.id);
    setError("");
    setNotice("");

    // Update the interface immediately.
    setEnquiries((current) =>
      current.map((entry) =>
        entry.id === item.id ? { ...entry, status } : entry
      )
    );

    setSelectedEnquiry((current) =>
      current?.id === item.id ? { ...current, status } : current
    );

    try {
      const updated = await updateEnquiryStatus(item.id, status);

      setEnquiries((current) =>
        current.map((entry) =>
          entry.id === item.id ? { ...entry, ...updated } : entry
        )
      );

      setSelectedEnquiry((current) =>
        current?.id === item.id ? { ...current, ...updated } : current
      );

      setNotice("Enquiry status updated successfully.");
    } catch (err) {
      setEnquiries(previous);

      setSelectedEnquiry((current) =>
        current?.id === item.id
          ? { ...current, status: item.status || "new" }
          : current
      );

      setError(err?.message || "Unable to update enquiry status.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <section className="min-w-0 space-y-6 font-ibm">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-anta text-xs uppercase tracking-[0.2em] text-amber-700">
            Food & Dining
          </p>

          <h1 className="mt-2 font-anta text-2xl text-gray-900 sm:text-3xl">
            Restaurant Management
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
            Review restaurant enquiries and manage their status.
          </p>
        </div>

        <button
          type="button"
          onClick={() => loadEnquiries(true)}
          disabled={loading || refreshing || Boolean(busyId)}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 font-anta text-sm text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            size={15}
            className={refreshing ? "animate-spin" : ""}
          />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Feedback */}
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

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <MetricCard
          title="Restaurant Enquiries"
          value={loading ? "—" : enquiries.length.toLocaleString("en-IN")}
          icon={UtensilsCrossed}
        />

        <MetricCard
          title="New Enquiries"
          value={loading ? "—" : newCount.toLocaleString("en-IN")}
          icon={MessageSquare}
        />
      </div>

      {/* Enquiry list */}
      <section className="min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-gray-200 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-anta text-lg text-gray-900">
              Dining Enquiries
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              {loading
                ? "Loading enquiries..."
                : `${filteredEnquiries.length} records found`}
            </p>
          </div>

          <div className="relative w-full lg:max-w-sm">
            <Search
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search restaurant enquiries..."
              aria-label="Search restaurant enquiries"
              className="min-h-10 w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-gray-500">
            <LoaderCircle size={24} className="animate-spin text-amber-700" />
            <p className="text-sm">Loading enquiries...</p>
          </div>
        ) : error && enquiries.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-gray-600">
              Restaurant enquiries could not be loaded.
            </p>

            <button
              type="button"
              onClick={() => loadEnquiries(true)}
              className="mt-3 text-sm text-amber-800 underline underline-offset-4"
            >
              Try again
            </button>
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="flex min-h-48 flex-col items-center justify-center px-5 py-10 text-center">
            <UtensilsCrossed size={30} className="text-gray-300" />

            <h3 className="mt-3 font-anta text-base text-gray-800">
              {search
                ? "No matching enquiries"
                : "No restaurant enquiries found"}
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
              {search
                ? "Try a different keyword or clear your search."
                : "Restaurant-related records will appear here when their enquiry type matches."}
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
            {/* Mobile cards */}
            <div className="divide-y divide-gray-100 md:hidden">
              {filteredEnquiries.map((item, index) => (
                <article
                  key={item.id ?? index}
                  className="space-y-4 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="break-words font-anta text-base text-gray-900">
                        {getName(item)}
                      </h3>

                      <p className="mt-1 break-all text-xs text-gray-500">
                        {item.email || item.phone || "No contact details"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedEnquiry(item)}
                      aria-label={`View ${getName(item)}`}
                      className="shrink-0 rounded-lg border border-gray-300 p-2 text-gray-600 hover:bg-gray-50"
                    >
                      <Eye size={16} />
                    </button>
                  </div>

                  <p className="line-clamp-3 whitespace-pre-wrap break-words text-sm leading-6 text-gray-600">
                    {item.message || "No message provided."}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="mb-1 text-xs text-gray-500">Status</p>
                      <StatusBadge status={item.status} />
                    </div>

                    <p className="text-xs text-gray-500">
                      Received: {formatDate(item.created_at)}
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor={`restaurant-status-${item.id ?? index}`}
                      className="mb-1.5 block text-xs text-gray-500"
                    >
                      Update status
                    </label>

                    <select
                      id={`restaurant-status-${item.id ?? index}`}
                      value={getStatus(item)}
                      disabled={!item.id || Boolean(busyId)}
                      onChange={(event) =>
                        handleStatusChange(item, event.target.value)
                      }
                      className="min-h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-800 outline-none focus:border-amber-600 disabled:opacity-60"
                    >
                      {STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                        </option>
                      ))}
                    </select>

                    {busyId === item.id && (
                      <p className="mt-1.5 text-xs text-gray-500">
                        Saving status...
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {/* Desktop/tablet table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[850px] text-left">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    {[
                      "Guest",
                      "Contact",
                      "Message",
                      "Received",
                      "Status",
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
                  {filteredEnquiries.map((item, index) => (
                    <tr
                      key={item.id ?? index}
                      className="transition hover:bg-gray-50/70"
                    >
                      <td className="max-w-[190px] px-4 py-4 lg:px-5">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {getName(item)}
                        </p>

                        <p className="mt-1 truncate text-xs text-gray-500">
                          {item.enquiry_type || "Restaurant"}
                        </p>
                      </td>

                      <td className="max-w-[180px] px-4 py-4 lg:px-5">
                        <p className="break-all text-xs text-gray-600">
                          {item.email || "—"}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {item.phone || "—"}
                        </p>
                      </td>

                      <td className="max-w-[200px] px-4 py-4 lg:px-5">
                        <p className="line-clamp-2 whitespace-pre-wrap break-words text-sm text-gray-600">
                          {item.message || "—"}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-xs text-gray-600 lg:px-5">
                        {formatDate(item.created_at)}
                      </td>

                      <td className="px-4 py-4 lg:px-5">
                        <div className="space-y-2">
                          <StatusBadge status={item.status} />

                          <select
                            value={getStatus(item)}
                            disabled={!item.id || Boolean(busyId)}
                            onChange={(event) =>
                              handleStatusChange(item, event.target.value)
                            }
                            aria-label={`Update status for ${getName(item)}`}
                            className="block min-h-9 w-36 rounded-lg border border-gray-300 bg-white px-2 text-xs text-gray-700 outline-none focus:border-amber-600 disabled:opacity-60"
                          >
                            {STATUSES.map((status) => (
                              <option key={status} value={status}>
                                {status.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                              </option>
                            ))}
                          </select>

                          {busyId === item.id && (
                            <LoaderCircle
                              size={14}
                              className="animate-spin text-amber-700"
                            />
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-4 lg:px-5">
                        <button
                          type="button"
                          onClick={() => setSelectedEnquiry(item)}
                          aria-label={`View details for ${getName(item)}`}
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

        {!loading && !error && filteredEnquiries.length > 0 && (
          <div className="border-t border-gray-200 bg-gray-50/70 px-4 py-3 text-xs text-gray-500 sm:px-5">
            Showing {filteredEnquiries.length} of {enquiries.length} enquiries
          </div>
        )}
      </section>

      <EnquiryDetails
        enquiry={selectedEnquiry}
        onClose={() => setSelectedEnquiry(null)}
      />
    </section>
  );
}

