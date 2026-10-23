import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  X,
  Maximize2,
  Images,
  Sparkles,
} from "lucide-react";

import room1 from "../assets/image/living.webp";
import room2 from "../assets/image/main area.webp";
import room3 from "../assets/image/stay.jpg";
import hotelHero from "../assets/image/working.jpg";
import banquetImage from "../assets/image/bouq.webp";
import DinnerImage from "../assets/image/dinner.webp";
import livingImage from "../assets/image/liv.webp";
import FunctionImage from "../assets/image/dec.webp";

const photos = [
  { label: "Hotel Interior", image: room1, category: "Rooms" },
  { label: "Entry gate", image: room2, category: "Rooms" },
  { label: "living Room", image: room3, category: "Rooms" },
  { label: "Working place", image: hotelHero, category: "Interiors" },
  { label: "Banquet Hall", image: banquetImage, category: "Events" },
  { label: "Marriage Lawn", image: DinnerImage, category: "Events" },
  { label: "Restaurant", image: livingImage, category: "Dining" },
  { label: "Restaurant", image: FunctionImage, category: "function" },
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null);

  const isOpen = activeIndex !== null;
  const activePhoto = isOpen ? photos[activeIndex] : null;

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % photos.length);
  };

  const showPrevious = () => {
    setActiveIndex(
      (current) => (current - 1 + photos.length) % photos.length
    );
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") showNext();
      if (event.key === "ArrowLeft") showPrevious();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <section
      id="gallery"
      className="overflow-hidden bg-[#F7F0E6] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="mx-auto max-w-[1240px]">
        {/* Heading */}
        <div className="mb-9 flex flex-col justify-between gap-5 sm:mb-12 sm:flex-row sm:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#C6A15B]" />
              <Sparkles size={15} className="text-[#B9954E]" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#997B43]">
                A Glimpse Inside
              </p>
            </div>

            <h2 className="font-['IBM_Plex_Serif'] text-4xl leading-tight tracking-[-0.04em] text-[#29342D] sm:text-5xl lg:text-6xl">
              Spaces for
              <span className="block italic text-[#B9954E]">
                every occasion.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-[#696A62]">
            Take a closer look at our rooms and interiors. Select any photo
            to open the gallery and explore every image.
          </p>
        </div>

        {/* Static gallery grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-4 md:gap-x-5">
          {photos.map((photo, index) => (
            <figure
              key={`${photo.label}-${index}`}
              className={`gallery-card group min-w-0 ${
                index % 2 === 1 ? "md:mt-9" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Open photo: ${photo.label}`}
                className="relative block w-full overflow-hidden border border-[#DFD0B7] bg-[#EAE0D1] p-1.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B9954E]"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={photo.image}
                    alt={photo.label}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                  <span className="absolute left-3 top-3 bg-[#FFFAF3]/95 px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-[#7D6335]">
                    {photo.category}
                  </span>

                  <span className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-[#D9C59A] bg-[#FFFAF3] text-[#8D6B31] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <Maximize2 size={17} />
                  </span>
                </div>
              </button>

              <figcaption className="flex items-center justify-between gap-2 border-b border-[#DCCDB5] py-4">
                <div>
                  <p className="font-['IBM_Plex_Serif'] text-base text-[#29342D] sm:text-lg">
                    {photo.label}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.13em] text-[#8A8172]">
                    View photograph
                  </p>
                </div>

                <span className="text-[#B9954E] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Gallery footer */}
        <div className="mt-9 flex items-center gap-3 border-t border-[#E3D3B8] pt-5 text-xs leading-6 text-[#77766D]">
          <Images size={18} className="shrink-0 text-[#B9954E]" />
          <p>
            Select a photo to view it in detail. Use the arrows to move
            between photographs.
          </p>
        </div>
      </div>

      {/* Center image popup */}
      {isOpen && activePhoto && (
        <div
          className="gallery-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-[#201F1A]/85 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setActiveIndex(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${activePhoto.label} photo viewer`}
            className="gallery-modal relative w-full max-w-5xl overflow-hidden border border-[#D9C59A]/70 bg-[#F7F0E6] shadow-2xl"
          >
            {/* Popup header */}
            <div className="flex items-center justify-between gap-4 border-b border-[#E3D3B8] px-4 py-3 sm:px-6 sm:py-4">
              <div className="min-w-0">
                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#997B43] sm:text-[10px]">
                  Hotel Shantam Regency
                </p>

                <h3 className="mt-1 truncate font-['IBM_Plex_Serif'] text-lg text-[#29342D] sm:text-2xl">
                  {activePhoto.label}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close gallery"
                className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#D9CBAF] text-[#29342D] transition hover:bg-[#C6A15B] hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Large image */}
            <div className="relative flex h-[55vh] min-h-[250px] max-h-[650px] items-center justify-center overflow-hidden bg-[#E7DDCE] sm:h-[65vh]">
              <img
                key={activePhoto.image}
                src={activePhoto.image}
                alt={activePhoto.label}
                className="gallery-active-image h-full w-full object-contain"
              />

              {/* Previous */}
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Previous photo"
                className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full border border-[#D9CBAF] bg-[#FFFAF3]/95 text-[#29342D] shadow-sm transition hover:scale-105 hover:bg-[#C6A15B] hover:text-white sm:left-5"
              >
                <ArrowLeft size={20} />
              </button>

              {/* Next */}
              <button
                type="button"
                onClick={showNext}
                aria-label="Next photo"
                className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full border border-[#D9CBAF] bg-[#FFFAF3]/95 text-[#29342D] shadow-sm transition hover:scale-105 hover:bg-[#C6A15B] hover:text-white sm:right-5"
              >
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Popup footer */}
            <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
              <p className="text-xs text-[#696A62]">
                Photo {activeIndex + 1} of {photos.length}
              </p>

              <div className="flex flex-wrap justify-end gap-2">
                {photos.map((photo, index) => (
                  <button
                    key={`${photo.label}-dot`}
                    type="button"
                    aria-label={`View ${photo.label}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "w-7 bg-[#B9954E]"
                        : "w-2 bg-[#D3C5AD] hover:bg-[#B9954E]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightweight animations */}
      <style>{`
        .gallery-card {
          animation: galleryReveal 600ms ease both;
        }

        .gallery-modal {
          animation: galleryModalIn 240ms ease both;
        }

        .gallery-active-image {
          animation: galleryImageIn 300ms ease both;
        }

        @keyframes galleryReveal {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes galleryModalIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.985);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes galleryImageIn {
          from {
            opacity: 0.45;
            transform: scale(0.99);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gallery-card,
          .gallery-modal,
          .gallery-active-image {
            animation: none;
          }

          .gallery-card *,
          .gallery-modal * {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}