import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
Menu,
X,
ArrowUpRight,
Hotel,
} from "lucide-react";

const navLinks = [
{ name: "Home", path: "/" },
{ name: "Rooms", path: "/rooms" },
{
name: "Banquet Hall",
path: "/banquet-hall-in-bhagalpur",
},
{
name: "Event Venue",
path: "/event-venue-in-bhagalpur",
},
{ name: "Restaurant", path: "/restaurant" },
{ name: "Gallery", path: "/gallery" },
{ name: "Blog", path: "/blog" },
{
name: "Wedding Package",
path: "/wedding-package-bhagalpur",
},
{ name: "Contact", path: "/contact" },
];

export default function Header({ onBookingClick }) {
const [menuOpen, setMenuOpen] = useState(false);

const location = useLocation();

const isActive = (path) => {
if (path === "/") {
return location.pathname === "/";
}

return location.pathname === path;

};

const closeMenus = () => {
setMenuOpen(false);
};

// FIX: Always scroll to the top when Home is clicked.
const handleHomeClick = () => {
closeMenus();

// If already on the homepage, React Router may not
// change the route, so scroll to the top manually.
if (location.pathname === "/") {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}
};

const handleEnquiry = () => {
closeMenus();
onBookingClick?.();
};

const linkStyle = (path) =>
`relative whitespace-nowrap py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
      isActive(path)
        ? "text-[#D6B66D]"
        : "text-white/75 hover:text-[#E5C77F]"
    }`;

return ( <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#111111]/95 text-white shadow-[0_8px_30px_rgba(0,0,0,0.15)] backdrop-blur-xl"> <div className="mx-auto flex h-[78px] max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">


    {/* LOGO / HOTEL NAME */}
    <Link
      to="/"
      onClick={handleHomeClick}
      aria-label="Hotel Shantam Regency home"
      className="group flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#D6B66D]/60 bg-[#D6B66D]/10 transition-all duration-300 group-hover:border-[#E5C77F] group-hover:bg-[#D6B66D]/20 sm:h-11 sm:w-11">
        <Hotel
          size={22}
          strokeWidth={1.4}
          className="text-[#E5C77F] transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <div className="min-w-0">
        <p className="truncate font-serif text-base tracking-wide text-white sm:text-lg lg:text-xl">
          Shantam Regency
        </p>

        <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.22em] text-[#D6B66D] sm:text-[10px] sm:tracking-[0.28em]">
          Hotel · Bhagalpur
        </p>
      </div>
    </Link>

    {/* DESKTOP NAVIGATION */}
    <nav
      aria-label="Main navigation"
      className="hidden items-center gap-4 xl:flex 2xl:gap-5"
    >
      {navLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          onClick={
            link.path === "/"
              ? handleHomeClick
              : undefined
          }
          className={linkStyle(link.path)}
        >
          {link.name}

          <span
            className={`absolute -bottom-1 left-0 h-px bg-[#D6B66D] transition-all duration-300 ${
              isActive(link.path)
                ? "w-full"
                : "w-0 group-hover:w-full"
            }`}
          />
        </Link>
      ))}
    </nav>

    {/* DESKTOP ENQUIRY BUTTON */}
    <button
      type="button"
      onClick={handleEnquiry}
      className="group hidden shrink-0 items-center gap-2 border border-[#D6B66D] bg-[#D6B66D] px-4 py-3 text-sm font-semibold tracking-wide text-black transition-all duration-300 hover:border-[#E5C77F] hover:bg-[#E5C77F] xl:flex 2xl:px-5"
    >
      Enquire Now

      <ArrowUpRight
        size={15}
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </button>

    {/* MOBILE MENU BUTTON */}
    <button
      type="button"
      onClick={() => setMenuOpen((prev) => !prev)}
      aria-label={
        menuOpen
          ? "Close navigation menu"
          : "Open navigation menu"
      }
      aria-expanded={menuOpen}
      className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/15 text-white transition-all duration-300 hover:border-[#D6B66D] hover:text-[#E5C77F] xl:hidden"
    >
      {menuOpen ? <X size={21} /> : <Menu size={21} />}
    </button>
  </div>

  {/* MOBILE NAVIGATION */}
  <div
    className={`overflow-hidden border-t border-white/10 bg-[#111111] transition-all duration-300 ease-in-out xl:hidden ${
      menuOpen
        ? "max-h-[85svh] overflow-y-auto opacity-100"
        : "max-h-0 border-t-transparent opacity-0"
    }`}
  >
    <nav
      aria-label="Mobile navigation"
      className="mx-auto flex max-w-[1600px] flex-col px-4 pb-5 pt-2 sm:px-6"
    >
      {navLinks.map((link, index) => (
        <Link
          key={link.path}
          to={link.path}
          onClick={
            link.path === "/"
              ? handleHomeClick
              : closeMenus
          }
          style={{
            transitionDelay: menuOpen
              ? `${index * 25}ms`
              : "0ms",
          }}
          className={`flex items-center justify-between border-b border-white/[0.07] py-4 text-base transition-all duration-300 ${
            isActive(link.path)
              ? "pl-2 text-[#E5C77F]"
              : "text-white/75 hover:pl-2 hover:text-[#E5C77F]"
          }`}
        >
          {link.name}

          <ArrowUpRight
            size={15}
            className={
              isActive(link.path)
                ? "text-[#D6B66D]"
                : "text-white/30"
            }
          />
        </Link>
      ))}

      {/* MOBILE ENQUIRY BUTTON */}
      <button
        type="button"
        onClick={handleEnquiry}
        className="group mt-5 flex min-h-12 w-full items-center justify-center gap-2 bg-[#D6B66D] px-5 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#E5C77F]"
      >
        Enquire Now

        <ArrowUpRight
          size={17}
          className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </button>

      <p className="mt-4 text-center text-xs tracking-wide text-white/40">
        Hotel Shantam Regency · Bhagalpur, Bihar
      </p>
    </nav>
  </div>
</header>

);
}
