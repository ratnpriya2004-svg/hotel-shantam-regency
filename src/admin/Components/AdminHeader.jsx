import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Bell,
  ChevronDown,
  Hotel,
  LogOut,
  UserRound,
} from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function AdminHeader({ onMenuClick }) {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      setShowProfile(false);
      navigate("/admin", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      alert(error.message || "Logout failed. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="relative z-30 flex h-[68px] w-full items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
      {/* Left Section */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-amber-50 hover:text-amber-700 lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-amber-200 bg-amber-50 text-amber-700">
          <Hotel size={20} strokeWidth={1.6} />
        </div>

        <div className="min-w-0">
          <h1 className="truncate font-decorative text-xl leading-tight text-gray-900 sm:text-2xl">
            Shantam Regency
          </h1>

          <p className="text-[9px] tracking-[0.18em] text-gray-500">
            HOTEL MANAGEMENT
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            aria-label="Notifications"
            aria-expanded={showNotifications}
            onClick={() => {
              setShowNotifications((previous) => !previous);
              setShowProfile(false);
            }}
            className="rounded-lg p-2 text-gray-600 transition hover:bg-amber-50 hover:text-amber-700"
          >
            <Bell size={19} strokeWidth={1.7} />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
              <h3 className="font-anta text-sm text-gray-900">
                Notifications
              </h3>

              <p className="mt-2 text-xs text-gray-500">
                You’re all caught up! New notifications will appear here.
              </p>
            </div>
          )}
        </div>

        <div className="hidden h-8 w-px bg-gray-200 md:block" />

        {/* Admin Profile */}
        <div className="relative">
          <button
            type="button"
            aria-label="Administrator account"
            aria-expanded={showProfile}
            onClick={() => {
              setShowProfile((previous) => !previous);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 rounded-lg border border-gray-200 p-1.5 transition hover:border-amber-300 hover:bg-amber-50 sm:px-3 sm:py-2"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 font-anta text-sm text-amber-800">
              A
            </span>

            <span className="hidden text-left sm:block">
              <span className="block font-anta text-xs text-gray-800">
                Administrator
              </span>

              <span className="mt-1 block text-[10px] text-gray-500">
                Admin Account
              </span>
            </span>

            <ChevronDown
              size={14}
              className={`hidden text-gray-500 transition-transform sm:block ${
                showProfile ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div className="absolute right-0 top-12 w-52 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
              <div className="border-b border-gray-100 px-4 py-3">
                <p className="font-anta text-sm text-gray-900">
                  Administrator
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Hotel Admin Panel
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowProfile(false);
                  navigate("/admin/dashboard");
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 transition hover:bg-amber-50"
              >
                <UserRound size={16} />
                Dashboard
              </button>

              <button
                type="button"
                disabled={loggingOut}
                onClick={handleLogout}
                className="flex w-full items-center gap-3 border-t border-gray-100 px-4 py-3 text-sm text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <LogOut size={16} />
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

