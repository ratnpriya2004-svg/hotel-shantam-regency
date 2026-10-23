import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  RefreshCw,
  Search,
  Users,
  ClipboardList,
  Clock3,
  CheckCircle2,
  XCircle,
  CalendarDays,
  BedDouble,
  MessageSquare,
  Phone,
  Mail,
  Filter,
  ArrowUpRight,
} from "lucide-react";

const statuses = ["New", "Contacted", "Follow-up", "Converted", "Lost"];

const statusStyles = {
  New: "bg-[#F5E8CF] text-[#86662F] border-[#E7D3AC]",
  Contacted: "bg-[#E4EBF4] text-[#42638A] border-[#CFDCEC]",
  "Follow-up": "bg-[#F6E6D9] text-[#9A5C2C] border-[#EBD0B8]",
  Converted: "bg-[#DFEDE2] text-[#386B49] border-[#C5DDCA]",
  Lost: "bg-[#F3E1DE] text-[#984F47] border-[#E7C9C4]",
};

const readEnquiries = () => {
  try {
    const stored = JSON.parse(
      localStorage.getItem("shantamEnquiries") || "[]"
    );

    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

const formatDate = (date) => {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "—";

  return parsed.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

function StatCard({ title, value, icon: Icon, description }) {
  return (
    <div className="group border border-[#E3D3B8] bg-[#FFFAF3] p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(80,60,30,0.07)] sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-[#77766D]">{title}</p>

          <p className="mt-3 font-['IBM_Plex_Serif'] text-4xl text-[#29342D]">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center border border-[#E3D3B8] bg-[#F7F0E6] text-[#997B43] transition group-hover:border-[#B9954E]">
          <Icon size={21} strokeWidth={1.5} />
        </div>
      </div>

      <p className="mt-4 text-xs leading-5 text-[#8A877D]">
        {description}
      </p>
    </div>
  );
}

export default function Admin() {
  const [leads, setLeads] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedLead, setSelectedLead] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState("");

  const refresh = useCallback(() => {
    setLeads(readEnquiries());
    setLastRefreshed(
      new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, []);

  useEffect(() => {
    refresh();

    // Refresh if another browser tab changes localStorage.
    const handleStorage = (event) => {
      if (event.key === "shantamEnquiries") {
        refresh();
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [refresh]);

  const updateStatus = (id, status) => {
    const next = leads.map((lead) =>
      lead.id === id ? { ...lead, status } : lead
    );

    setLeads(next);

    try {
      localStorage.setItem("shantamEnquiries", JSON.stringify(next));

      if (selectedLead?.id === id) {
        setSelectedLead((previous) =>
          previous ? { ...previous, status } : null
        );
      }
    } catch {
      window.alert("Unable to save the updated status in this browser.");
      refresh();
    }
  };

  const visible = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();

    return leads.filter((lead) => {
      const currentStatus = lead.status || "New";

      const matchesStatus =
        filter === "All" || currentStatus === filter;

      const searchableText = [
        lead.name,
        lead.phone,
        lead.email,
        lead.enquiryType,
        lead.eventType,
        lead.message,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesStatus && searchableText.includes(searchTerm);
    });
  }, [leads, query, filter]);

  const newCount = leads.filter(
    (lead) => (lead.status || "New") === "New"
  ).length;

  const contactedCount = leads.filter(
    (lead) => lead.status === "Contacted"
  ).length;

  const convertedCount = leads.filter(
    (lead) => lead.status === "Converted"
  ).length;

  const todayCount = leads.filter((lead) => {
    if (!lead.createdAt) return false;

    const date = new Date(lead.createdAt);

    if (Number.isNaN(date.getTime())) return false;

    const today = new Date();

    return date.toDateString() === today.toDateString();
  }).length;

  return (
    <div className="min-h-screen bg-[#F7F0E6] text-[#29342D]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#E3D3B8] bg-[#FFFAF3]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
          <a href="/" className="group flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center border border-[#DCC9A7] bg-[#F7F0E6] text-[#997B43]">
              <BedDouble size={22} strokeWidth={1.5} />
            </div>

            <div>
              <p className="font-['IBM_Plex_Serif'] text-lg tracking-wide text-[#29342D] sm:text-xl">
                SHANTAM REGENCY
              </p>

              <p className="mt-1 text-[9px] uppercase tracking-[0.23em] text-[#997B43]">
                Enquiry Management
              </p>
            </div>
          </a>

          <a
            href="/"
            className="inline-flex items-center gap-2 border border-[#E3D3B8] px-3 py-2.5 text-xs transition hover:border-[#B9954E] hover:bg-[#F7F0E6] sm:px-4 sm:text-sm"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">View website</span>
            <span className="sm:hidden">Website</span>
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        {/* Page heading */}
        <section className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-9 bg-[#B9954E]" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#997B43]">
                Admin dashboard
              </p>
            </div>

            <h1 className="font-['IBM_Plex_Serif'] text-3xl leading-tight text-[#29342D] sm:text-4xl lg:text-5xl">
              Enquiry management
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#77766D]">
              Manage guest enquiries, review their details and track their
              progress from one place.
            </p>
          </div>

          <button
            type="button"
            onClick={refresh}
            className="inline-flex items-center justify-center gap-2 self-start border border-[#DCC9A7] bg-[#FFFAF3] px-5 py-3 text-sm transition hover:border-[#B9954E] hover:bg-[#F1E7D8] md:self-auto"
          >
            <RefreshCw size={16} />
            Refresh list
          </button>
        </section>

        {lastRefreshed && (
          <p className="mt-4 text-xs text-[#8A877D]">
            Last refreshed: {lastRefreshed}
          </p>
        )}

        {/* Statistics */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total enquiries"
            value={leads.length}
            icon={ClipboardList}
            description="All enquiries saved in this browser"
          />

          <StatCard
            title="New enquiries"
            value={newCount}
            icon={Clock3}
            description="Waiting for the first response"
          />

          <StatCard
            title="Contacted"
            value={contactedCount}
            icon={Users}
            description="Enquiries already contacted"
          />

          <StatCard
            title="Converted"
            value={convertedCount}
            icon={CheckCircle2}
            description="Enquiries marked as converted"
          />
        </section>

        {/* Today's activity */}
        <section className="mt-5 flex flex-col justify-between gap-3 border border-[#E3D3B8] bg-[#FFFAF3] p-5 sm:flex-row sm:items-center sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-[#F7F0E6] text-[#997B43]">
              <CalendarDays size={19} />
            </div>

            <div>
              <h2 className="text-sm font-semibold">Today’s activity</h2>

              <p className="mt-1 text-xs text-[#77766D]">
                Enquiries received today
              </p>
            </div>
          </div>

          <p className="font-['IBM_Plex_Serif'] text-3xl text-[#997B43]">
            {todayCount}
          </p>
        </section>

        {/* Search and filters */}
        <section className="mt-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#997B43]">
                Guest records
              </p>

              <h2 className="mt-2 font-['IBM_Plex_Serif'] text-2xl text-[#29342D]">
                All enquiries
              </h2>
            </div>

            <p className="text-xs text-[#77766D]">
              Showing{" "}
              <span className="font-semibold text-[#29342D]">
                {visible.length}
              </span>{" "}
              of {leads.length} enquiries
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3 md:flex-row">
            {/* Search */}
            <label className="flex min-h-12 flex-1 items-center gap-3 border border-[#E3D3B8] bg-[#FFFAF3] px-4 transition focus-within:border-[#B9954E]">
              <Search size={18} className="shrink-0 text-[#997B43]" />

              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name, phone, email or enquiry..."
                className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-[#AAA397]"
                aria-label="Search enquiries"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="text-xs text-[#997B43] hover:text-[#29342D]"
                >
                  Clear
                </button>
              )}
            </label>

            {/* Status filter */}
            <label className="flex min-h-12 items-center gap-3 border border-[#E3D3B8] bg-[#FFFAF3] px-4 md:min-w-[210px]">
              <Filter size={17} className="shrink-0 text-[#997B43]" />

              <select
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                className="w-full bg-transparent py-3 text-sm outline-none"
                aria-label="Filter enquiries by status"
              >
                {["All", ...statuses].map((status) => (
                  <option key={status} value={status}>
                    {status === "All" ? "All statuses" : status}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        {/* Enquiry table */}
        <section className="mt-5 overflow-hidden border border-[#E3D3B8] bg-[#FFFAF3]">
          <div className="flex items-center justify-between gap-3 border-b border-[#E3D3B8] px-5 py-4 sm:px-6">
            <div>
              <h3 className="text-sm font-semibold text-[#29342D]">
                Enquiry records
              </h3>

              <p className="mt-1 text-xs text-[#77766D]">
                Select a guest to view full enquiry details.
              </p>
            </div>

            <ClipboardList
              size={20}
              className="shrink-0 text-[#997B43]"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left text-sm">
              <thead className="bg-[#F1E7D8] text-[10px] uppercase tracking-[0.12em] text-[#696A62]">
                <tr>
                  {[
                    "Guest",
                    "Contact details",
                    "Enquiry type",
                    "Received",
                    "Status",
                    "Details",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="whitespace-nowrap px-5 py-4 font-semibold"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {visible.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-t border-[#EDE3D5] align-top transition hover:bg-[#F7F0E6]/70"
                  >
                    {/* Guest */}
                    <td className="px-5 py-5">
                      <p className="font-medium text-[#29342D]">
                        {lead.name || "Unnamed guest"}
                      </p>

                      <p className="mt-1 max-w-[210px] truncate text-xs text-[#8A877D]">
                        {lead.message || "No message provided"}
                      </p>
                    </td>

                    {/* Contact */}
                    <td className="px-5 py-5">
                      <p className="flex items-center gap-2 whitespace-nowrap text-[#29342D]">
                        <Phone
                          size={13}
                          className="shrink-0 text-[#997B43]"
                        />
                        {lead.phone || "—"}
                      </p>

                      <p className="mt-2 flex items-center gap-2 text-xs text-[#77766D]">
                        <Mail
                          size={13}
                          className="shrink-0 text-[#997B43]"
                        />
                        <span className="max-w-[180px] truncate">
                          {lead.email || "No email"}
                        </span>
                      </p>
                    </td>

                    {/* Type */}
                    <td className="px-5 py-5">
                      <p className="max-w-[180px] text-[#29342D]">
                        {lead.enquiryType || "General enquiry"}
                      </p>

                      {lead.eventType && (
                        <p className="mt-1 text-xs text-[#77766D]">
                          {lead.eventType}
                        </p>
                      )}

                      {lead.guests && (
                        <p className="mt-1 text-xs text-[#77766D]">
                          {lead.guests} guests
                        </p>
                      )}
                    </td>

                    {/* Date */}
                    <td className="whitespace-nowrap px-5 py-5 text-xs leading-5 text-[#77766D]">
                      {formatDate(lead.createdAt)}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-5">
                      <select
                        value={lead.status || "New"}
                        onChange={(event) =>
                          updateStatus(lead.id, event.target.value)
                        }
                        aria-label={`Update status for ${lead.name || "guest"}`}
                        className={`max-w-[145px] border px-3 py-2 text-xs font-medium outline-none transition focus:border-[#B9954E] ${
                          statusStyles[lead.status || "New"] ||
                          statusStyles.New
                        }`}
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Details */}
                    <td className="px-5 py-5">
                      <button
                        type="button"
                        onClick={() => setSelectedLead(lead)}
                        className="inline-flex items-center gap-1.5 whitespace-nowrap border border-[#DCC9A7] px-3 py-2 text-xs text-[#997B43] transition hover:bg-[#F1E7D8]"
                      >
                        View <ArrowUpRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}

                {visible.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#E3D3B8] bg-[#F7F0E6] text-[#997B43]">
                        {query || filter !== "All" ? (
                          <Search size={23} />
                        ) : (
                          <ClipboardList size={23} />
                        )}
                      </div>

                      <h3 className="mt-4 font-['IBM_Plex_Serif'] text-xl text-[#29342D]">
                        {query || filter !== "All"
                          ? "No matching enquiries"
                          : "No enquiries yet"}
                      </h3>

                      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#77766D]">
                        {query || filter !== "All"
                          ? "Try a different search term or status filter."
                          : "Submit a test enquiry from the website to see it listed here."}
                      </p>

                      {(query || filter !== "All") && (
                        <button
                          type="button"
                          onClick={() => {
                            setQuery("");
                            setFilter("All");
                          }}
                          className="mt-4 text-sm font-medium text-[#997B43] underline underline-offset-4"
                        >
                          Clear search and filters
                        </button>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Prototype notice */}
        <section className="mt-6 flex items-start gap-3 border border-[#E3D3B8] bg-[#F1E7D8]/70 p-5 sm:p-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#FFFAF3] text-[#997B43]">
            <XCircle size={19} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#29342D]">
              Prototype mode — not production-secure
            </h3>

            <p className="mt-2 text-xs leading-6 text-[#696A62]">
              This dashboard reads and updates enquiries in the current
              browser’s localStorage. It does not receive enquiries from other
              devices or send updates to hotel staff. Anyone using this
              browser can potentially inspect or change the stored data.
              Before launch, connect a secure backend/database and protect
              this page with proper admin authentication and authorization.
            </p>
          </div>
        </section>
      </main>

      {/* Enquiry details modal */}
      {selectedLead && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#18231D]/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedLead(null);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setSelectedLead(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-modal-title"
            className="my-auto w-full max-w-2xl border border-[#E3D3B8] bg-[#FFFAF3] shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#E3D3B8] p-5 sm:p-7">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#997B43]">
                  Guest enquiry
                </p>

                <h2
                  id="enquiry-modal-title"
                  className="mt-2 font-['IBM_Plex_Serif'] text-2xl text-[#29342D] sm:text-3xl"
                >
                  {selectedLead.name || "Unnamed guest"}
                </h2>

                <p className="mt-2 text-xs text-[#77766D]">
                  Received {formatDate(selectedLead.createdAt)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="border border-[#E3D3B8] px-3 py-2 text-sm transition hover:bg-[#F1E7D8]"
              >
                Close
              </button>
            </div>

            <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-7">
              <div className="border border-[#E3D3B8] bg-[#F7F0E6] p-4">
                <p className="text-xs text-[#77766D]">Phone</p>
                <p className="mt-2 break-words text-sm font-medium">
                  {selectedLead.phone || "Not provided"}
                </p>
              </div>

              <div className="border border-[#E3D3B8] bg-[#F7F0E6] p-4">
                <p className="text-xs text-[#77766D]">Email</p>
                <p className="mt-2 break-words text-sm font-medium">
                  {selectedLead.email || "Not provided"}
                </p>
              </div>

              <div className="border border-[#E3D3B8] bg-[#F7F0E6] p-4">
                <p className="text-xs text-[#77766D]">Enquiry type</p>
                <p className="mt-2 text-sm font-medium">
                  {selectedLead.enquiryType || "General enquiry"}
                </p>
              </div>

              <div className="border border-[#E3D3B8] bg-[#F7F0E6] p-4">
                <p className="text-xs text-[#77766D]">Current status</p>

                <div className="mt-2">
                  <span
                    className={`inline-flex border px-3 py-1.5 text-xs font-medium ${
                      statusStyles[selectedLead.status || "New"] ||
                      statusStyles.New
                    }`}
                  >
                    {selectedLead.status || "New"}
                  </span>
                </div>
              </div>

              {selectedLead.stayPreferences && (
                <div className="border border-[#E3D3B8] bg-[#F7F0E6] p-4 sm:col-span-2">
                  <h3 className="flex items-center gap-2 text-sm font-semibold">
                    <BedDouble size={17} className="text-[#997B43]" />
                    Stay preferences
                  </h3>

                  <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {[
                      ["Check-in", selectedLead.stayPreferences.checkIn],
                      ["Check-out", selectedLead.stayPreferences.checkOut],
                      ["Adults", selectedLead.stayPreferences.adults],
                      ["Children", selectedLead.stayPreferences.children],
                      ["Rooms", selectedLead.stayPreferences.rooms],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <p className="text-xs text-[#77766D]">{label}</p>
                        <p className="mt-1 text-sm font-medium">
                          {value || "—"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedLead.eventType && (
                <div className="border border-[#E3D3B8] bg-[#F7F0E6] p-4">
                  <p className="text-xs text-[#77766D]">Event type</p>
                  <p className="mt-2 text-sm font-medium">
                    {selectedLead.eventType}
                  </p>
                </div>
              )}

              {selectedLead.eventDate && (
                <div className="border border-[#E3D3B8] bg-[#F7F0E6] p-4">
                  <p className="text-xs text-[#77766D]">Event date</p>
                  <p className="mt-2 text-sm font-medium">
                    {selectedLead.eventDate}
                  </p>
                </div>
              )}

              {selectedLead.guests && (
                <div className="border border-[#E3D3B8] bg-[#F7F0E6] p-4">
                  <p className="text-xs text-[#77766D]">Estimated guests</p>
                  <p className="mt-2 text-sm font-medium">
                    {selectedLead.guests}
                  </p>
                </div>
              )}

              <div className="border border-[#E3D3B8] bg-[#F7F0E6] p-4 sm:col-span-2">
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  <MessageSquare size={17} className="text-[#997B43]" />
                  Guest message
                </h3>

                <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-[#696A62]">
                  {selectedLead.message || "No message provided."}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-3 border-t border-[#E3D3B8] bg-[#F7F0E6] p-5 sm:flex-row sm:items-center sm:px-7">
              <p className="text-xs text-[#77766D]">
                Update the enquiry status from the main table.
              </p>

              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="bg-[#29342D] px-5 py-3 text-sm text-[#FFFAF3] transition hover:bg-[#997B43]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}