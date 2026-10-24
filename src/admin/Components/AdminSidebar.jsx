import {
  LayoutDashboard,
  MessageSquare,
  BedDouble,
  CalendarDays,
  Utensils,
  Users,
  ChartNoAxesCombined,
  Settings,
  X,
  Hotel,
  Newspaper,
} from "lucide-react";

const menuItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Enquiries", icon: MessageSquare },
  { label: "Blogs", icon: Newspaper }, 
  { label: "Reports", icon: ChartNoAxesCombined },
  { label: "Settings", icon: Settings },
];

export default function AdminSidebar({
  activePage = "Overview",
  onNavigate,
  open = false,
  onClose,
}) {
  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-gray-200 bg-white transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-gray-200 px-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-amber-200 bg-amber-50 text-amber-700">
              <Hotel size={21} />
            </div>

            <div className="min-w-0">
              <h2 className="truncate font-decorative text-2xl text-gray-900">
                Shantam Regency
              </h2>
              <p className="text-[9px] tracking-[0.16em] text-gray-500">
                ADMINISTRATION
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-5">
          <p className="mb-3 px-3 font-changa text-xs tracking-wide text-gray-500">
            MAIN MENU
          </p>

          <div className="space-y-1">
            {menuItems.map(({ label, icon: Icon }) => {
              const selected = activePage === label;

              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    onNavigate?.(label);
                    onClose?.();
                  }}
                  aria-current={selected ? "page" : undefined}
                  className={`flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-left text-sm transition-colors ${
                    selected
                      ? "border-amber-200 bg-amber-50 font-medium text-amber-900"
                      : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon
                    size={18}
                    strokeWidth={1.7}
                    className={selected ? "text-amber-800" : "text-gray-500"}
                  />

                  <span className="flex-1">{label}</span>

                  {selected && (
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-700" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="shrink-0 border-t border-gray-200 p-4">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
            <p className="font-changa text-sm text-gray-800">
              Hotel Management
            </p>
            <p className="mt-1 text-xs leading-5 text-gray-500">
              Manage enquiries and monitor hotel activity from one place.
            </p>
          </div>

          <p className="mt-3 text-center text-[10px] text-gray-500">
            © {new Date().getFullYear()} Shantam Regency
          </p>
        </div>
      </aside>
    </>
  );
}

