import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  ["Home", "#home"],
  ["Rooms", "#rooms"],
  ["Weddings & Events", "#events"],
  ["Facilities", "#facilities"],
  ["Restaurant", "#restaurant"],
  ["About", "#about"],
  ["Gallery", "#gallery"],
  ["Contact", "#contact"],
];

export default function Header({ onBookingClick }) {
  const [open, setOpen] = useState(false);

  const handleEnquiryClick = () => {
    setOpen(false);

    if (onBookingClick) {
      onBookingClick();
    }
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-[#D9C59A]/50 bg-[#F7F0E6]/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-[78px] max-w-[1440px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-12">

        {/* Hotel Branding */}
        <a
          href="#home"
          onClick={() => setOpen(false)}
          className="group flex shrink-0 flex-col leading-none text-[#26352D]"
          aria-label="Hotel Shantam Regency home"
        >
          <span className="font-display text-[20px] tracking-[0.12em] transition-colors duration-300 group-hover:text-[#A9853E] sm:text-[23px]">
            SHANTAM
          </span>

          <span className="mt-2 text-center text-[9px] tracking-[0.48em] text-[#A9853E]">
            REGENCY
          </span>

          <span className="mx-auto mt-2 h-px w-8 bg-[#C6A15B] transition-all duration-300 group-hover:w-full" />
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D9C59A]/60 text-[#26352D] transition-all duration-300 hover:bg-[#F2E9D8] lg:hidden"
          onClick={() => setOpen((previous) => !previous)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>

        {/* Navigation */}
        <nav
          className={`${
            open ? "flex" : "hidden"
          } absolute left-0 right-0 top-full max-h-[calc(100vh-78px)] flex-col gap-1 overflow-y-auto border-b border-[#D9C59A]/50 bg-[#FFFCF7] px-6 py-5 shadow-lg lg:static lg:max-h-none lg:flex lg:flex-row lg:items-center lg:gap-5 lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none xl:gap-6`}
        >
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="group relative w-fit py-2 text-[13px] font-medium tracking-wide text-[#454A43] transition-colors duration-300 hover:text-[#A9853E] lg:py-3"
            >
              {label}

              <span className="absolute bottom-0 left-0 h-px w-0 bg-[#C6A15B] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          {/* Enquiry Popup Button */}
          <button
            type="button"
            onClick={handleEnquiryClick}
            className="group mt-3 inline-flex items-center justify-center gap-3 rounded-sm border border-[#C6A15B] bg-[#C6A15B] px-5 py-3 text-[13px] font-medium tracking-wide text-white transition-all duration-300 hover:border-[#A9853E] hover:bg-[#A9853E] lg:ml-1 lg:mt-0"
          >
            Enquire Now

            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </button>
        </nav>
      </div>
    </header>
  );
}

