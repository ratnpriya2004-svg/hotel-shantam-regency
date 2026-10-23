import { useEffect, useState } from "react";
import {
  MessageSquare,
  Inbox,
  PhoneCall,
  CheckCircle2,
  RefreshCw,
  CalendarDays,
} from "lucide-react";

import StatCard from "../components/StatCard.jsx";
import EnquiryChart from "../components/EnquiryChart.jsx";
import EnquiryTrend from "../components/EnquiryTrend.jsx";
import RecentEnquiries from "../components/RecentEnquiries.jsx";

import {
  getEnquiries,
  getEnquiryStats,
} from "../services/enquiryService.js";

export default function Overview({ onNavigate }) {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadDashboard() {
    setLoading(true);
    setError("");

    try {
      const [enquiries, enquiryStats] = await Promise.all([
        getEnquiries(),
        getEnquiryStats(),
      ]);

      const records = Array.isArray(enquiries) ? enquiries : [];

      setStats(enquiryStats);

      // Build graph using actual enquiry records.
      const dailyCounts = new Map();

      records.forEach((enquiry) => {
        if (!enquiry.created_at) return;

        const date = new Date(enquiry.created_at);

        if (Number.isNaN(date.getTime())) return;

        const dateKey = [
          date.getFullYear(),
          String(date.getMonth() + 1).padStart(2, "0"),
          String(date.getDate()).padStart(2, "0"),
        ].join("-");

        dailyCounts.set(
          dateKey,
          (dailyCounts.get(dateKey) || 0) + 1
        );
      });

      const actualChartData = Array.from(dailyCounts.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .slice(-7)
        .map(([dateKey, count]) => ({
          label: new Date(`${dateKey}T12:00:00`).toLocaleDateString(
            "en-IN",
            {
              day: "2-digit",
              month: "short",
            }
          ),
          enquiries: count,
        }));

      setChartData(actualChartData);
    } catch (err) {
      setError(err?.message || "Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  const statCards = [
    {
      title: "Total Enquiries",
      value: stats?.total ?? 0,
      icon: MessageSquare,
      subtitle: "All recorded enquiries",
    },
    {
      title: "New Leads",
      value: stats?.new ?? 0,
      icon: Inbox,
      subtitle: "Awaiting initial contact",
    },
    {
      title: "Contacted Leads",
      value: stats?.contacted ?? 0,
      icon: PhoneCall,
      subtitle: "Guests already contacted",
    },
    {
      title: "Converted Leads",
      value: stats?.converted ?? 0,
      icon: CheckCircle2,
      subtitle: "Successfully converted enquiries",
    },
  ];

  if (loading && !stats) {
    return (
      <div className="flex min-h-[35vh] items-center justify-center rounded-2xl border border-gray-200 bg-white">
        <div className="text-center">
          <RefreshCw
            size={28}
            className="mx-auto animate-spin text-[#B7791F]"
          />

          <p className="mt-4 text-sm text-gray-500">
            Loading your hotel dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error && !stats) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Dashboard data unavailable
        </h2>

        <p className="mt-2 break-words text-sm text-rose-700">
          {error}
        </p>

        <button
          type="button"
          onClick={loadDashboard}
          className="mt-4 rounded-lg border border-amber-300 px-4 py-2 text-sm text-amber-800 transition hover:bg-amber-50"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="min-w-0 space-y-6">
      {/* Dashboard heading */}
      <div className="flex min-w-0 flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="font-anta text-xs uppercase tracking-[0.18em] text-amber-700">
            Hotel Management
          </p>

          <h1 className="mt-2 font-anta text-2xl text-gray-900 sm:text-3xl">
            Dashboard Overview
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            Your hotel's enquiry activity, all in one place.
          </p>
        </div>

        <button
          type="button"
          onClick={loadDashboard}
          disabled={loading}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={15}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* Error notification */}
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700"
        >
          Dashboard refresh failed: {error}
        </div>
      )}

      {/* Statistics cards */}
      <section className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </section>

      {/* Enquiry analytics */}
      <section className="grid min-w-0 grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
        <div className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <EnquiryChart data={chartData} />
        </div>

        <div className="min-w-0">
          <EnquiryTrend
            current={stats?.total ?? 0}
            previous={0}
          />
        </div>
      </section>

      {/* Recent enquiry records */}
      <div className="min-w-0">
        <RecentEnquiries
          onViewAll={() => onNavigate?.("Enquiries")}
        />
      </div>

      {/* Dashboard data note */}
      {!loading && (stats?.total ?? 0) === 0 && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <CalendarDays
            size={20}
            className="mt-0.5 shrink-0 text-amber-700"
          />

          <div>
            <p className="text-sm font-medium text-amber-900">
              No enquiries recorded yet
            </p>

            <p className="mt-1 text-sm leading-relaxed text-amber-800">
              Dashboard statistics will update automatically when actual
              guest enquiries are available in your database.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

