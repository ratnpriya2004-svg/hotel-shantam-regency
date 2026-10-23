import { useEffect, useState } from "react";
import { ArrowUpRight, RefreshCw, Inbox } from "lucide-react";
import { getEnquiries } from "../services/enquiryService.js";

const statusStyles = {
  new: "border-blue-200 bg-blue-50 text-blue-700",
  contacted: "border-amber-200 bg-amber-50 text-amber-800",
  "follow-up": "border-purple-200 bg-purple-50 text-purple-700",
  converted: "border-emerald-200 bg-emerald-50 text-emerald-700",
  lost: "border-rose-200 bg-rose-50 text-rose-700",
};

function formatDate(date) {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "—";

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
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

function getContact(enquiry) {
  return enquiry.email || enquiry.phone || "No contact details";
}

function getStatus(enquiry) {
  return String(enquiry.status || "new").toLowerCase();
}

export default function RecentEnquiries({ onViewAll }) {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadEnquiries() {
    setLoading(true);
    setError("");

    try {
      const result = await getEnquiries();

      const sortedEnquiries = Array.isArray(result)
        ? [...result].sort(
            (a, b) =>
              new Date(b.created_at || 0).getTime() -
              new Date(a.created_at || 0).getTime()
          )
        : [];

      setEnquiries(sortedEnquiries.slice(0, 5));
    } catch (err) {
      setError(err?.message || "Unable to load enquiries.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEnquiries();
  }, []);

  return (
    <section className="min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Section heading */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 p-4 sm:p-5">
        <div>
          <h2 className="font-anta text-lg text-gray-900">
            Recent Enquiries
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Latest guest enquiry submissions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadEnquiries}
            disabled={loading}
            aria-label="Refresh enquiries"
            title="Refresh enquiries"
            className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
          </button>

          {onViewAll && (
            <button
              type="button"
              onClick={onViewAll}
              className="flex items-center gap-1 rounded-lg border border-amber-200 px-3 py-2 text-sm text-amber-800 transition hover:bg-amber-50"
            >
              View all
              <ArrowUpRight size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="space-y-3 p-5" aria-live="polite">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-12 animate-pulse rounded-lg bg-gray-100"
            />
          ))}
        </div>
      ) : error ? (
        /* Error state */
        <div className="p-8 text-center" role="alert">
          <p className="text-sm text-rose-700">{error}</p>

          <button
            type="button"
            onClick={loadEnquiries}
            className="mt-3 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Try again
          </button>
        </div>
      ) : enquiries.length === 0 ? (
        /* Empty state */
        <div className="flex min-h-48 flex-col items-center justify-center px-5 py-10 text-center">
          <Inbox size={30} className="mb-3 text-gray-400" />

          <p className="text-sm font-medium text-gray-800">
            No enquiries yet
          </p>

          <p className="mt-2 max-w-sm text-sm text-gray-500">
            New guest enquiries will appear here when submitted.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <th className="px-5 py-3 font-medium">Guest</th>
                  <th className="px-5 py-3 font-medium">Enquiry Type</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>

              <tbody>
                {enquiries.map((enquiry, index) => {
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
                          {getContact(enquiry)}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm capitalize text-gray-700">
                        {getEnquiryType(enquiry)}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                        {formatDate(enquiry.created_at)}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-xs capitalize ${
                            statusStyles[status] ||
                            "border-gray-200 bg-gray-50 text-gray-600"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="divide-y divide-gray-100 md:hidden">
            {enquiries.map((enquiry, index) => {
              const status = getStatus(enquiry);

              return (
                <article
                  key={enquiry.id ?? `${getGuestName(enquiry)}-${index}`}
                  className="p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="break-words text-sm font-medium text-gray-900">
                        {getGuestName(enquiry)}
                      </p>

                      <p className="mt-1 break-all text-xs text-gray-500">
                        {getContact(enquiry)}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full border px-2 py-1 text-[11px] capitalize ${
                        statusStyles[status] ||
                        "border-gray-200 bg-gray-50 text-gray-600"
                      }`}
                    >
                      {status}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
                    <span className="capitalize">
                      {getEnquiryType(enquiry)}
                    </span>

                    <span>{formatDate(enquiry.created_at)}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}

