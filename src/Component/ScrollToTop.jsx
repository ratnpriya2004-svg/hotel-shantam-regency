import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Back to top"
      className={`fixed bottom-6 right-5 z-[100] flex h-12 w-12 items-center justify-center border border-[#C6A15B] bg-[#29342D] text-[#FFFAF3] shadow-[0_6px_25px_rgba(41,52,45,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#997B43] focus:outline-none focus:ring-2 focus:ring-[#C6A15B] focus:ring-offset-2 sm:bottom-8 sm:right-8 sm:h-14 sm:w-14 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp
        size={22}
        strokeWidth={1.8}
        className="transition-transform duration-300 group-hover:-translate-y-1"
      />
    </button>
  );
}