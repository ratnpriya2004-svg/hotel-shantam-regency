import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BedDouble,
  Search,
  Plus,
  RefreshCw,
  Users,
  IndianRupee,
  Pencil,
  Eye,
  X,
  Trash2,
  LoaderCircle,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import { supabase } from "../../lib/supabase";

const ROOM_TABLE = "rooms";

const EMPTY_FORM = {
  room_number: "",
  room_type: "",
  price_per_night: "",
  capacity: "2",
  status: "available",
  description: "",
};

const STATUS_OPTIONS = ["available", "occupied", "maintenance"];

const STATUS_STYLES = {
  available: "bg-emerald-50 text-emerald-700 border-emerald-200",
  occupied: "bg-rose-50 text-rose-700 border-rose-200",
  maintenance: "bg-amber-50 text-amber-800 border-amber-200",
};

const formatPrice = (value) =>
  Number(value || 0).toLocaleString("en-IN");

function StatusBadge({ status }) {
  const normalized = String(status || "unknown").toLowerCase();

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs capitalize ${
        STATUS_STYLES[normalized] || "border-gray-200 bg-gray-50 text-gray-600"
      }`}
    >
      {normalized.replace("-", " ")}
    </span>
  );
}

function MetricCard({ label, value, icon: Icon }) {
  return (
    <article className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <div>
        <p className="font-anta text-xs uppercase tracking-wider text-gray-500">
          {label}
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

function RoomFormModal({
  room,
  saving,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState(() => ({
    ...EMPTY_FORM,
    ...(room || {}),
    price_per_night:
      room?.price_per_night != null ? String(room.price_per_night) : "",
    capacity: room?.capacity != null ? String(room.capacity) : "2",
  }));

  const [formError, setFormError] = useState("");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !saving) onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, saving]);

  function updateField(event) {
    const { name, value } = event.target;

    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    const roomNumber = form.room_number.trim();
    const roomType = form.room_type.trim();
    const price = Number(form.price_per_night);
    const capacity = Number(form.capacity);

    if (!roomNumber || !roomType) {
      setFormError("Room number aur room type required hain.");
      return;
    }

    if (
      form.price_per_night === "" ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      setFormError("Valid room price enter karo.");
      return;
    }

    if (
      form.capacity === "" ||
      !Number.isInteger(capacity) ||
      capacity < 1
    ) {
      setFormError("Capacity kam se kam 1 guest honi chahiye.");
      return;
    }

    const payload = {
      room_number: roomNumber,
      room_type: roomType,
      price_per_night: price,
      capacity,
      status: form.status,
      description: form.description.trim(),
    };

    try {
      await onSubmit(payload);
    } catch (error) {
      setFormError(error.message || "Room save nahi ho paya.");
    }
  }

  const inputClass =
    "mt-1.5 min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-100";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="room-form-title"
        className="max-h-[94dvh] w-full max-w-xl overflow-y-auto rounded-t-2xl border border-gray-200 bg-white shadow-xl sm:rounded-2xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4 sm:px-6">
          <div>
            <p className="font-anta text-xs uppercase tracking-widest text-amber-700">
              Accommodation
            </p>
            <h2
              id="room-form-title"
              className="mt-1 font-anta text-xl text-gray-900"
            >
              {room ? "Edit Room" : "Add Room"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="Close room form"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block text-sm text-gray-700">
              Room Number *
              <input
                name="room_number"
                value={form.room_number}
                onChange={updateField}
                placeholder="e.g. 101"
                required
                className={inputClass}
              />
            </label>

            <label className="block text-sm text-gray-700">
              Room Type *
              <input
                name="room_type"
                value={form.room_type}
                onChange={updateField}
                placeholder="e.g. Deluxe"
                required
                className={inputClass}
              />
            </label>

            <label className="block text-sm text-gray-700">
              Price per Night (₹) *
              <input
                type="number"
                name="price_per_night"
                value={form.price_per_night}
                onChange={updateField}
                min="0"
                step="0.01"
                placeholder="2500"
                required
                className={inputClass}
              />
            </label>

            <label className="block text-sm text-gray-700">
              Guest Capacity *
              <input
                type="number"
                name="capacity"
                value={form.capacity}
                onChange={updateField}
                min="1"
                step="1"
                required
                className={inputClass}
              />
            </label>

            <label className="block text-sm text-gray-700 sm:col-span-2">
              Room Status
              <select
                name="status"
                value={form.status}
                onChange={updateField}
                className={inputClass}
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm text-gray-700 sm:col-span-2">
              Description
              <textarea
                name="description"
                value={form.description}
                onChange={updateField}
                placeholder="Room facilities and other details..."
                rows={3}
                className={`${inputClass} resize-y`}
              />
            </label>
          </div>

          {formError && (
            <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle size={17} className="mt-0.5 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="min-h-10 rounded-lg border border-gray-300 px-4 py-2 font-anta text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-amber-600 px-5 py-2 font-anta text-sm text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving && <LoaderCircle size={16} className="animate-spin" />}
              {saving ? "Saving..." : room ? "Save Changes" : "Add Room"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function RoomDetailsModal({ room, onClose, onEdit }) {
  useEffect(() => {
    if (!room) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [room, onClose]);

  if (!room) return null;

  const details = [
    ["Room Number", room.room_number],
    ["Room Type", room.room_type],
    ["Price per Night", `₹${formatPrice(room.price_per_night)}`],
    ["Capacity", `${room.capacity ?? "—"} guests`],
    ["Description", room.description || "No description provided."],
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
        aria-labelledby="room-details-title"
        className="max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-t-2xl bg-white shadow-xl sm:rounded-2xl"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div>
            <p className="font-anta text-xs uppercase tracking-widest text-amber-700">
              Room information
            </p>
            <h2
              id="room-details-title"
              className="mt-1 font-anta text-xl text-gray-900"
            >
              Room {room.room_number || "Details"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close room details"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            <X size={19} />
          </button>
        </div>

        <div className="divide-y divide-gray-100 px-5">
          {details.map(([label, value]) => (
            <div key={label} className="py-3">
              <p className="text-xs text-gray-500">{label}</p>
              <p className="mt-1 break-words text-sm text-gray-800">{value}</p>
            </div>
          ))}

          <div className="py-3">
            <p className="mb-2 text-xs text-gray-500">Current Status</p>
            <StatusBadge status={room.status} />
          </div>
        </div>

        <div className="flex gap-3 border-t border-gray-200 p-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 font-anta text-sm text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => onEdit(room)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-2.5 font-anta text-sm text-white hover:bg-amber-700"
          >
            <Pencil size={15} />
            Edit Room
          </button>
        </div>
      </section>
    </div>
  );
}

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [editingRoom, setEditingRoom] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadRooms = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    setError("");
    setNotice("");

    try {
      const { data, error: fetchError } = await supabase
        .from(ROOM_TABLE)
        .select("*")
        .order("room_number", { ascending: true });

      if (fetchError) throw fetchError;

      setRooms(data ?? []);
    } catch (err) {
      console.error("Failed to load rooms:", err);
      setError(
        err?.message ||
          "Rooms load nahi ho paaye. Supabase table aur permissions check karo."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadRooms();
  }, [loadRooms]);

  const filteredRooms = useMemo(() => {
    const query = search.trim().toLowerCase();

    return rooms.filter((room) => {
      const matchesSearch = [
        room.room_number,
        room.room_type,
        room.description,
        room.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query);

      const matchesStatus =
        statusFilter === "all" || room.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [rooms, search, statusFilter]);

  const stats = useMemo(
    () => ({
      total: rooms.length,
      available: rooms.filter((room) => room.status === "available").length,
      occupied: rooms.filter((room) => room.status === "occupied").length,
    }),
    [rooms]
  );

  function openAddForm() {
    setEditingRoom(null);
    setSelectedRoom(null);
    setShowForm(true);
    setError("");
    setNotice("");
  }

  function openEditForm(room) {
    setSelectedRoom(null);
    setEditingRoom(room);
    setShowForm(true);
    setError("");
    setNotice("");
  }

  async function handleFormSubmit(payload) {
    setSaving(true);
    setError("");
    setNotice("");

    try {
      if (editingRoom) {
        const { data, error: updateError } = await supabase
          .from(ROOM_TABLE)
          .update(payload)
          .eq("id", editingRoom.id)
          .select()
          .single();

        if (updateError) throw updateError;

        setRooms((current) =>
          current.map((room) =>
            room.id === editingRoom.id ? data : room
          )
        );

        setNotice("Room details updated successfully.");
      } else {
        const { data, error: insertError } = await supabase
          .from(ROOM_TABLE)
          .insert(payload)
          .select()
          .single();

        if (insertError) throw insertError;

        setRooms((current) => [...current, data]);
        setNotice("New room added successfully.");
      }

      setShowForm(false);
      setEditingRoom(null);
    } catch (err) {
      console.error("Failed to save room:", err);
      throw new Error(
        err?.message ||
          "Room save nahi ho paya. Database columns aur permissions check karo."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(room) {
    if (!room?.id || deletingId || saving) return;

    const confirmed = window.confirm(
      `Room ${room.room_number || room.id} delete karna hai? Ye action undo nahi hoga.`
    );

    if (!confirmed) return;

    setDeletingId(room.id);
    setError("");
    setNotice("");

    try {
      const { error: deleteError } = await supabase
        .from(ROOM_TABLE)
        .delete()
        .eq("id", room.id);

      if (deleteError) throw deleteError;

      setRooms((current) =>
        current.filter((item) => item.id !== room.id)
      );

      setSelectedRoom((current) =>
        current?.id === room.id ? null : current
      );

      setNotice(`Room ${room.room_number || ""} deleted successfully.`);
    } catch (err) {
      console.error("Failed to delete room:", err);
      setError(
        err?.message ||
          "Room delete nahi ho paya. Supabase delete permission check karo."
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="min-w-0 space-y-6 font-ibm">
      {/* Heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-anta text-xs uppercase tracking-[0.2em] text-amber-700">
            Accommodation Management
          </p>

          <h1 className="mt-2 font-anta text-2xl text-gray-900 sm:text-3xl">
            Rooms Management
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Manage room details, pricing and availability.
          </p>
        </div>

        <div className="flex w-full gap-2 sm:w-auto">
          <button
            type="button"
            onClick={() => loadRooms(true)}
            disabled={loading || refreshing || saving}
            className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 font-anta text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-60 sm:flex-none sm:px-4"
          >
            <RefreshCw
              size={15}
              className={refreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>

          <button
            type="button"
            onClick={openAddForm}
            className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-amber-600 px-3 py-2 font-anta text-sm text-white transition hover:bg-amber-700 sm:flex-none sm:px-4"
          >
            <Plus size={17} />
            Add Room
          </button>
        </div>
      </div>

      {/* Messages */}
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

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricCard label="Total Rooms" value={loading ? "—" : stats.total} icon={BedDouble} />
        <MetricCard label="Available" value={loading ? "—" : stats.available} icon={BedDouble} />
        <MetricCard label="Occupied" value={loading ? "—" : stats.occupied} icon={Users} />
      </div>

      {/* Room list */}
      <section className="min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-gray-200 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-anta text-lg text-gray-900">All Rooms</h2>
            <p className="mt-1 text-xs text-gray-500">
              {loading ? "Loading rooms..." : `${filteredRooms.length} rooms found`}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative min-w-0 sm:w-64">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search rooms..."
                aria-label="Search rooms"
                className="min-h-10 w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm text-gray-800 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter rooms by status"
              className="min-h-10 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-amber-600"
            >
              <option value="all">All statuses</option>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-52 flex-col items-center justify-center gap-3 text-gray-500">
            <LoaderCircle size={25} className="animate-spin text-amber-700" />
            <p className="text-sm">Loading rooms...</p>
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="flex min-h-52 flex-col items-center justify-center px-5 py-10 text-center">
            <BedDouble size={30} className="text-gray-300" />

            <h3 className="mt-3 font-anta text-base text-gray-800">
              {rooms.length === 0
                ? "No rooms found"
                : "No matching rooms"}
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
              {rooms.length === 0
                ? "Add your first room to start managing room availability."
                : "Try another search term or change the status filter."}
            </p>

            {rooms.length === 0 ? (
              <button
                type="button"
                onClick={openAddForm}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2.5 font-anta text-sm text-white hover:bg-amber-700"
              >
                <Plus size={16} />
                Add Room
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                }}
                className="mt-4 text-sm text-amber-800 underline underline-offset-4"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="divide-y divide-gray-100 md:hidden">
              {filteredRooms.map((room) => (
                <article key={room.id} className="space-y-4 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-anta text-lg text-gray-900">
                        Room {room.room_number || "—"}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {room.room_type || "Unspecified type"}
                      </p>
                    </div>

                    <StatusBadge status={room.status} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Price / Night</p>
                      <p className="mt-1 flex items-center gap-1 text-sm text-gray-800">
                        <IndianRupee size={14} />
                        {formatPrice(room.price_per_night)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Capacity</p>
                      <p className="mt-1 text-sm text-gray-800">
                        {room.capacity ?? "—"} guests
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 border-t border-gray-100 pt-3">
                    <button
                      type="button"
                      onClick={() => setSelectedRoom(room)}
                      className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
                    >
                      <Eye size={14} />
                      View
                    </button>

                    <button
                      type="button"
                      onClick={() => openEditForm(room)}
                      className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-amber-200 px-3 py-2 text-xs text-amber-800 hover:bg-amber-50"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(room)}
                      disabled={deletingId === room.id || saving}
                      className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs text-red-700 hover:bg-red-50 disabled:opacity-50"
                    >
                      {deletingId === room.id ? (
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
              <table className="w-full min-w-[760px] text-left">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    {[
                      "Room",
                      "Type",
                      "Price / Night",
                      "Capacity",
                      "Status",
                      "Actions",
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
                  {filteredRooms.map((room) => (
                    <tr key={room.id} className="transition hover:bg-gray-50/70">
                      <td className="px-4 py-4 text-sm text-gray-900 lg:px-5">
                        {room.room_number || "—"}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-600 lg:px-5">
                        {room.room_type || "—"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600 lg:px-5">
                        ₹{formatPrice(room.price_per_night)}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-600 lg:px-5">
                        {room.capacity ?? "—"} guests
                      </td>

                      <td className="px-4 py-4 lg:px-5">
                        <StatusBadge status={room.status} />
                      </td>

                      <td className="px-4 py-4 lg:px-5">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedRoom(room)}
                            aria-label={`View room ${room.room_number}`}
                            title="View room"
                            className="rounded-lg border border-gray-300 p-2 text-gray-600 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800"
                          >
                            <Eye size={15} />
                          </button>

                          <button
                            type="button"
                            onClick={() => openEditForm(room)}
                            aria-label={`Edit room ${room.room_number}`}
                            title="Edit room"
                            className="rounded-lg border border-gray-300 p-2 text-gray-600 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800"
                          >
                            <Pencil size={15} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(room)}
                            disabled={deletingId === room.id || saving}
                            aria-label={`Delete room ${room.room_number}`}
                            title="Delete room"
                            className="rounded-lg border border-red-200 p-2 text-red-700 hover:bg-red-50 disabled:opacity-50"
                          >
                            {deletingId === room.id ? (
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
      </section>

      {showForm && (
        <RoomFormModal
          key={editingRoom?.id ?? "new-room"}
          room={editingRoom}
          saving={saving}
          onClose={() => {
            if (!saving) {
              setShowForm(false);
              setEditingRoom(null);
            }
          }}
          onSubmit={handleFormSubmit}
        />
      )}

      <RoomDetailsModal
        room={selectedRoom}
        onClose={() => setSelectedRoom(null)}
        onEdit={openEditForm}
      />
    </section>
  );
}

