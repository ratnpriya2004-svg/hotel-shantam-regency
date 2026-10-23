import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FileBarChart,
  RefreshCw,
  Download,
  MessageSquare,
  CheckCircle2,
  Clock3,
  XCircle,
  TrendingUp,
  CalendarDays,
  AlertCircle,
} from "lucide-react";

import { getEnquiries } from "../services/enquiryService.js";

const GOLD = "#B88A44";

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

function getGuestName(row) {
  return row.name || row.full_name || row.guest_name || "Guest";
}

function getEnquiryType(row) {
  return row.enquiry_type || row.event_type || "General";
}

function getStatus(row) {
  const status = String(row.status || "new").toLowerCase();

  return ["new", "contacted", "follow-up", "converted", "lost"].includes(
    status
  )
    ? status
    : "new";
}

function escapeCSV(value) {
  let text = String(value ?? "");

  // Protect spreadsheet exports from formula injection.
  if (/^[\s]*[=+\-@]/.test(text)) {
    text = `'${text}`;
  }

  return `"${text.replace(/"/g, '""')}"`;
}

function downloadCSV(rows) {
  if (!rows.length) return;

  const columns = [
    ["Guest", getGuestName],
    ["Email", (row) => row.email || ""],
    ["Phone", (row) => row.phone || ""],
    ["Enquiry Type", getEnquiryType],
    ["Status", getStatus],
    ["Received On", (row) => row.created_at || ""],
  ];

  const csv = [
    columns.map(([label]) => escapeCSV(label)).join(","),
    ...rows.map((row) =>
      columns.map(([, getter]) => escapeCSV(getter(row))).join(",")
    ),
  ].join("\r\n");

  const blob = new Blob(["\uFEFF", csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `shantam-enquiry-report-${new Date()
    .toISOString()
    .slice(0, 10)}.csv`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  // Give the browser time to start the download.
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function StatCard({ label, value, icon: Icon, description }) {
  return (
    <article className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-stone-500">{label}</p>

          <p className="mt-3 break-words font-anta text-3xl text-stone-900">
            {value.toLocaleString("en-IN")}
          </p>

          <p className="mt-2 text-xs text-stone-400">{description}</p>
        </div>

        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${GOLD}18`, color: GOLD }}
        >
          <Icon size={21} />
        </div>
      </div>
    </article>
  );
}

const STATUS_CONFIG = [
  {
    key: "new",
    label: "New",
    icon: Clock3,
    color: "#D97706",
    background: "#FFFBEB",
  },
  {
    key: "contacted",
    label: "Contacted",
    icon: MessageSquare,
    color: "#2563EB",
    background: "#EFF6FF",
  },
  {
    key: "follow-up",
    label: "Follow-up",
    icon: RefreshCw,
    color: "#7C3AED",
    background: "#F5F3FF",
  },
  {
    key: "converted",
    label: "Converted",
    icon: CheckCircle2,
    color: "#15803D",
    background: "#F0FDF4",
  },
  {
    key: "lost",
    label: "Lost",
    icon: XCircle,
    color: "#DC2626",
    background: "#FEF2F2",
  },
];

function StatusBadge({ status }) {
  const config =
    STATUS_CONFIG.find((item) => item.key === status) || STATUS_CONFIG[0];

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
      style={{
        color: config.color,
        backgroundColor: config.background,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: config.color }}
      />
      {config.label}
    </span>
  );
}

export default function Reports() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [period, setPeriod] = useState("all");

  const loadReports = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getEnquiries();
      setEnquiries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Unable to load enquiry reports:", err);
      setError(err?.message || "Unable to load report data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  const filteredEnquiries = useMemo(() => {
    const now = new Date();

    return enquiries.filter((item) => {
      if (period === "all") return true;
      if (!item.created_at) return false;

      const date = new Date(item.created_at);

      if (Number.isNaN(date.getTime()) || date > now) return false;

      if (period === "month") {
        const startDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          1
        );

        return date >= startDate;
      }

      if (period === "30days") {
        const cutoff = new Date(now);
        cutoff.setDate(cutoff.getDate() - 30);

        return date >= cutoff;
      }

      return true;
    });
  }, [enquiries, period]);

  const stats = useMemo(() => {
    const result = {
      total: filteredEnquiries.length,
      new: 0,
      contacted: 0,
      followUp: 0,
      converted: 0,
      lost: 0,
    };

    filteredEnquiries.forEach((item) => {
      const status = getStatus(item);

      if (status === "new") result.new += 1;
      if (status === "contacted") result.contacted += 1;
      if (status === "follow-up") result.followUp += 1;
      if (status === "converted") result.converted += 1;
      if (status === "lost") result.lost += 1;
    });

    return result;
  }, [filteredEnquiries]);

  const monthlyActivity = useMemo(() => {
    const buckets = new Map();

    filteredEnquiries.forEach((item) => {
      if (!item.created_at) return;

      const date = new Date(item.created_at);

      if (Number.isNaN(date.getTime())) return;

      const key = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      buckets.set(key, (buckets.get(key) || 0) + 1);
    });

    return Array.from(buckets.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, count]) => {
        const [year, month] = key.split("-").map(Number);

        return {
          month: new Date(year, month - 1, 1).toLocaleDateString("en-IN", {
            month: "short",
            year: "numeric",
          }),
          count,
        };
      });
  }, [filteredEnquiries]);

  const statusRows = [
    { label: "New", value: stats.new, icon: Clock3 },
    { label: "Contacted", value: stats.contacted, icon: MessageSquare },
    { label: "Follow-up", value: stats.followUp, icon: RefreshCw },
    { label: "Converted", value: stats.converted, icon: CheckCircle2 },
    { label: "Lost", value: stats.lost, icon: XCircle },
  ];

  const maxMonthlyCount = Math.max(
    ...monthlyActivity.map((item) => item.count),
    1
  );

  return (
    <div className="min-w-0 space-y-6 pb-6">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p
            className="font-anta text-xs uppercase tracking-[0.2em]"
            style={{ color: GOLD }}
          >
            Business Insights
          </p>

          <h1 className="mt-2 font-anta text-2xl text-stone-900 sm:text-3xl">
            Reports & Analytics
          </h1>

          <p className="mt-2 text-sm text-stone-500">
            Track enquiry performance and export your actual records.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={loadReports}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 transition hover:border-stone-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              size={15}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>

          <button
            type="button"
            onClick={() => downloadCSV(filteredEnquiries)}
            disabled={loading || filteredEnquiries.length === 0}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            style={{ backgroundColor: GOLD }}
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <AlertCircle size={19} className="mt-0.5 shrink-0" />

          <div className="min-w-0 flex-1">
            <p className="font-medium">Unable to load reports</p>
            <p className="mt-1 break-words">{error}</p>

            <button
              type="button"
              onClick={loadReports}
              className="mt-2 font-medium underline underline-offset-2"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* Report period */}
      <section className="flex flex-col justify-between gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:p-5">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${GOLD}18`, color: GOLD }}
          >
            <CalendarDays size={20} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-stone-800">
              Report period
            </h2>
            <p className="mt-1 text-xs text-stone-500">
              Filter records by their submission date.
            </p>
          </div>
        </div>

        <select
          value={period}
          onChange={(event) => setPeriod(event.target.value)}
          className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 outline-none focus:border-amber-600 sm:w-auto"
        >
          <option value="all">All available records</option>
          <option value="month">Current month</option>
          <option value="30days">Last 30 days</option>
        </select>
      </section>

      {loading && enquiries.length === 0 ? (
        <div className="flex min-h-64 items-center justify-center rounded-2xl border border-stone-200 bg-white">
          <div className="flex flex-col items-center gap-3 text-stone-500">
            <RefreshCw
              size={26}
              className="animate-spin"
              style={{ color: GOLD }}
            />
            <p className="text-sm">Loading report data...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Summary cards */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total Enquiries"
              value={stats.total}
              icon={FileBarChart}
              description="Records in selected period"
            />

            <StatCard
              label="New Enquiries"
              value={stats.new}
              icon={MessageSquare}
              description="Awaiting first contact"
            />

            <StatCard
              label="Converted Leads"
              value={stats.converted}
              icon={CheckCircle2}
              description="Successfully converted"
            />

            <StatCard
              label="Lost Leads"
              value={stats.lost}
              icon={XCircle}
              description="Marked as lost"
            />
          </section>

          {/* Status and monthly analytics */}
          <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            <article className="min-w-0 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="font-anta text-lg text-stone-900">
                Enquiry Status Summary
              </h2>

              <p className="mt-1 text-xs text-stone-500">
                Status distribution for the selected period.
              </p>

              <div className="mt-6 space-y-5">
                {statusRows.map((item) => {
                  const Icon = item.icon;
                  const percentage =
                    stats.total > 0
                      ? (item.value / stats.total) * 100
                      : 0;

                  return (
                    <div key={item.label}>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-sm text-stone-600">
                          <Icon size={16} style={{ color: GOLD }} />
                          {item.label}
                        </div>

                        <span className="shrink-0 text-xs text-stone-500">
                          {item.value} · {percentage.toFixed(1)}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-stone-100">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: GOLD,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>

            <article className="min-w-0 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${GOLD}18`, color: GOLD }}
                >
                  <TrendingUp size={20} />
                </div>

                <div>
                  <h2 className="font-anta text-lg text-stone-900">
                    Monthly Enquiry Activity
                  </h2>
                  <p className="mt-1 text-xs text-stone-500">
                    Enquiries grouped by submission month.
                  </p>
                </div>
              </div>

              {monthlyActivity.length === 0 ? (
                <div className="flex min-h-52 flex-col items-center justify-center text-center">
                  <FileBarChart
                    size={30}
                    className="mb-3 text-stone-300"
                  />
                  <p className="text-sm text-stone-600">
                    No activity data available
                  </p>
                  <p className="mt-2 text-xs text-stone-400">
                    Dated enquiries will appear here.
                  </p>
                </div>
              ) : (
                <div className="mt-6 max-h-80 space-y-5 overflow-y-auto pr-1">
                  {monthlyActivity.map((item) => {
                    const width =
                      (item.count / maxMonthlyCount) * 100;

                    return (
                      <div key={item.month}>
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <span className="text-xs text-stone-500">
                            {item.month}
                          </span>

                          <span className="text-xs font-semibold text-stone-700">
                            {item.count}
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-stone-100">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${width}%`,
                              backgroundColor: GOLD,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </article>
          </section>

          {/* Actual report records */}
          <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-2 border-b border-stone-100 p-5 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-anta text-lg text-stone-900">
                  Enquiry Report Records
                </h2>

                <p className="mt-1 text-xs text-stone-500">
                  {filteredEnquiries.length} records in the selected period
                </p>
              </div>

              <span className="text-xs text-stone-400">
                Source: Enquiries database
              </span>
            </div>

            {filteredEnquiries.length === 0 ? (
              <div className="flex min-h-48 flex-col items-center justify-center px-5 py-10 text-center">
                <FileBarChart
                  size={32}
                  className="mb-3 text-stone-300"
                />
                <p className="text-sm font-medium text-stone-700">
                  No enquiry records found
                </p>
                <p className="mt-1 text-xs text-stone-400">
                  Try another report period or refresh the data.
                </p>
              </div>
            ) : (
              <>
                {/* Mobile cards */}
                <div className="divide-y divide-stone-100 md:hidden">
                  {filteredEnquiries.map((item) => (
                    <article key={item.id} className="space-y-3 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="break-words text-sm font-semibold text-stone-800">
                            {getGuestName(item)}
                          </p>
                          <p className="mt-1 break-all text-xs text-stone-500">
                            {item.email || item.phone || "No contact details"}
                          </p>
                        </div>

                        <StatusBadge status={getStatus(item)} />
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
                        <span className="rounded-lg bg-stone-100 px-2.5 py-1 capitalize">
                          {getEnquiryType(item)}
                        </span>

                        <span>{formatDate(item.created_at)}</span>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Tablet and desktop table */}
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full min-w-[650px] text-left">
                    <thead>
                      <tr className="border-b border-stone-100 bg-stone-50 text-[10px] uppercase tracking-[0.12em] text-stone-500">
                        <th className="px-5 py-4 font-semibold">Guest</th>
                        <th className="px-5 py-4 font-semibold">
                          Enquiry Type
                        </th>
                        <th className="px-5 py-4 font-semibold">Date</th>
                        <th className="px-5 py-4 font-semibold">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredEnquiries.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b border-stone-100 last:border-0 hover:bg-stone-50/70"
                        >
                          <td className="px-5 py-4">
                            <p className="text-sm font-medium text-stone-800">
                              {getGuestName(item)}
                            </p>

                            <p className="mt-1 break-all text-xs text-stone-500">
                              {item.email || item.phone || "—"}
                            </p>
                          </td>

                          <td className="px-5 py-4 text-sm capitalize text-stone-600">
                            {getEnquiryType(item)}
                          </td>

                          <td className="px-5 py-4 text-xs text-stone-500">
                            {formatDate(item.created_at)}
                          </td>

                          <td className="px-5 py-4">
                            <StatusBadge status={getStatus(item)} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </section>
        </>
      )}
    </div>
  );
}

