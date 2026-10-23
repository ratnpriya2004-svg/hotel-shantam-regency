import { useState } from "react";

import AdminSidebar from "./components/AdminSidebar.jsx";
import AdminHeader from "./components/AdminHeader.jsx";

import Overview from "./pages/Overview.jsx";
import Enquiries from "./pages/Enquiries.jsx";
import Rooms from "./pages/Rooms.jsx";
import Events from "./pages/Events.jsx";
import Restaurant from "./pages/Restaurant.jsx";
import Guests from "./pages/Guests.jsx";
import Reports from "./pages/Reports.jsx";
import Settings from "./pages/Settings.jsx";

const pages = {
  Overview,
  Enquiries,
  Rooms,
  "Events & Banquets": Events,
  Restaurant,
  Guests,
  Reports,
  Settings,
};

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const CurrentPage = pages[activePage] || Overview;

  function handleNavigate(page) {
    if (!pages[page]) return;

    setActivePage(page);
    setSidebarOpen(false);

    requestAnimationFrame(() => {
      const content = document.getElementById("admin-content");
      if (content) content.scrollTop = 0;
    });
  }

  return (
    <div className="fixed inset-0 flex overflow-hidden bg-white font-serif text-gray-900">
      {/* Sidebar: fixed width */}
      <div className="relative z-50 hidden h-full w-[260px] shrink-0 lg:block">
        <AdminSidebar
          activePage={activePage}
          onNavigate={handleNavigate}
          open={true}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <AdminSidebar
          activePage={activePage}
          onNavigate={handleNavigate}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main content starts after sidebar */}
      <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
        {/* Header */}
        <div className="z-30 h-[68px] shrink-0">
          <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
        </div>

        {/* Scrollable page */}
        <main
          id="admin-content"
          className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto bg-[#F7F7F5]"
        >
          <div className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
            <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <span>Admin</span>
              <span>/</span>
              <span className="font-medium text-gray-900">{activePage}</span>
            </div>

            <CurrentPage onNavigate={handleNavigate} />
          </div>

          <footer className="border-t border-gray-200 bg-white px-4 py-4 text-center text-xs text-gray-500 sm:px-8">
            © {new Date().getFullYear()} Shantam Regency · Admin Management Portal
          </footer>
        </main>
      </div>
    </div>
  );
}
