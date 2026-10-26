import React, { useEffect, useMemo, useState } from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";

import eventVenueImage from "../assets/image/eve.webp";
import conferenceImage from "../assets/image/wor.webp";
import babyCelebrationImage from "../assets/image/baby.webp";
import birthdayDecorImage from "../assets/image/chhi.webp";
import pinkBirthdayImage from "../assets/image/birt.webp";
import venueInteriorImage from "../assets/image/ven.webp";
import conferenceRoomImage from "../assets/image/ch.webp";
import birthdayStageImage from "../assets/image/bir.webp";
import hotelImage from "../assets/image/hhotel.png";
import decorImage from "../assets/image/dec.webp";
import livingImage from "../assets/image/livi.webp";
import bouquetImage from "../assets/image/bouq.webp";
import mapImage from "../assets/image/for map.webp";
import roomImage from "../assets/image/rrrrom.webp";
import workingImage from "../assets/image/working.jpg";
import stayImage from "../assets/image/stay.jpg";
import livingRoomImage from "../assets/image/liv.webp";
import kitchenImage from "../assets/image/luch.webp";
import diningImage from "../assets/image/dinner.webp";
import hotelExteriorImage from "../assets/image/de.webp";

const galleryImages = [
  { image: eventVenueImage, title: "Elegant Event Spaces", category: "Events", description: "Versatile spaces for gatherings, celebrations and special occasions.", size: "md:col-span-2 md:row-span-2", imageClass: "h-80 md:h-full" },
  { image: conferenceImage, title: "Corporate Meetings", category: "Conferences", description: "A professional setting for meetings, seminars and business events.", size: "", imageClass: "h-64" },
  { image: babyCelebrationImage, title: "Beautiful Celebrations", category: "Celebrations", description: "Thoughtfully arranged spaces for moments worth remembering.", size: "", imageClass: "h-64" },
  { image: birthdayDecorImage, title: "Birthday Decorations", category: "Birthdays", description: "Colourful décor to make birthdays extra special.", size: "md:row-span-2", imageClass: "h-72 md:h-full" },
  { image: pinkBirthdayImage, title: "Special Birthday Moments", category: "Birthdays", description: "Celebrate milestones with vibrant themes and beautiful details.", size: "", imageClass: "h-64" },
  { image: venueInteriorImage, title: "Premium Venue Interiors", category: "Venue", description: "Elegant interiors with warm lighting and a welcoming atmosphere.", size: "", imageClass: "h-64" },
  { image: conferenceRoomImage, title: "Meetings & Gatherings", category: "Conferences", description: "Comfortable indoor spaces for business and private gatherings.", size: "md:col-span-2", imageClass: "h-72" },
  { image: birthdayStageImage, title: "Memorable Celebrations", category: "Celebrations", description: "Create beautiful memories with a celebration planned around you.", size: "", imageClass: "h-64" },
  { image: hotelImage, title: "The Shantam Experience", category: "Venue", description: "A closer look at the hotel and its welcoming spaces.", size: "", imageClass: "h-64" },
  { image: decorImage, title: "Celebration Details", category: "Decor", description: "Décor details that bring a special event together.", size: "", imageClass: "h-64" },
  { image: livingImage, title: "Comfortable Lounge", category: "Interiors", description: "Relax in inviting spaces designed for comfort.", size: "", imageClass: "h-64" },
  { image: bouquetImage, title: "Elegant Finishing Touches", category: "Decor", description: "Thoughtful details to complement your occasion.", size: "", imageClass: "h-64" },
  { image: mapImage, title: "Find Us in Bhagalpur", category: "Venue", description: "Plan your visit to Hotel Shantam Regency.", size: "md:col-span-2", imageClass: "h-72" },
  { image: roomImage, title: "A Comfortable Stay", category: "Rooms", description: "A restful setting for guests visiting Bhagalpur.", size: "", imageClass: "h-64" },
  { image: workingImage, title: "Business-Friendly Spaces", category: "Conferences", description: "A practical and comfortable environment for work-related stays.", size: "", imageClass: "h-64" },
  { image: stayImage, title: "Relax and Recharge", category: "Rooms", description: "Make your visit comfortable with a calm place to unwind.", size: "", imageClass: "h-64" },
  { image: livingRoomImage, title: "Warm Interior Design", category: "Interiors", description: "A refined mix of textures, seating and warm tones.", size: "", imageClass: "h-64" },
  { image: kitchenImage, title: "Dining & Hospitality", category: "Dining", description: "Discover the hospitality spaces available at the hotel.", size: "", imageClass: "h-64" },
  { image: diningImage, title: "A Place to Dine", category: "Dining", description: "Enjoy a comfortable dining atmosphere with family and friends.", size: "md:col-span-2", imageClass: "h-72" },
  { image: hotelExteriorImage, title: "Hotel Shantam Regency", category: "Venue", description: "Your destination for stays, celebrations and gatherings in Bhagalpur.", size: "md:col-span-2", imageClass: "h-72" },
];

const categories = ["All", ...new Set(galleryImages.map((item) => item.category))];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const filteredImages = useMemo(
    () => activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  const selectedImage = selectedImageIndex !== null ? filteredImages[selectedImageIndex] : null;

  const openImage = (index) => setSelectedImageIndex(index);
  const closeImage = () => setSelectedImageIndex(null);
  const showNextImage = () => {
    setSelectedImageIndex((current) =>
      current === null ? null : (current + 1) % filteredImages.length
    );
  };
  const showPreviousImage = () => {
    setSelectedImageIndex((current) =>
      current === null ? null : (current - 1 + filteredImages.length) % filteredImages.length
    );
  };

  useEffect(() => {
    if (selectedImageIndex === null) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeImage();
      if (event.key === "ArrowRight") showNextImage();
      if (event.key === "ArrowLeft") showPreviousImage();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedImageIndex, filteredImages.length]);

  useEffect(() => {
    // Reveal each section and each gallery image as it enters the viewport.
    const elements = document.querySelectorAll(".scroll-reveal, .gallery-card");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px 0px" }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [activeCategory]);

  return (
    <>
      <style>{`
        .scroll-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 700ms ease, transform 700ms cubic-bezier(.2,.7,.2,1);
          will-change: opacity, transform;
        }
        .scroll-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .gallery-hero-content {
          animation: galleryHeroEnter 900ms cubic-bezier(.2,.7,.2,1) both;
        }
        .gallery-hero-image {
          animation: galleryImageEnter 1.3s ease-out both;
          transform: scale(1.02);
        }
        .gallery-card {
          opacity: 0;
          transform: translateY(26px) scale(.975);
          transition: opacity 650ms ease, transform 650ms cubic-bezier(.2,.7,.2,1);
          transition-delay: var(--card-delay, 0ms);
          will-change: opacity, transform;
        }
        .gallery-card.is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .gallery-card:focus-visible {
          outline: 3px solid #a78245;
          outline-offset: 4px;
        }
        @keyframes galleryHeroEnter {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes galleryImageEnter {
          from { opacity: .6; transform: scale(1.08); }
          to { opacity: 1; transform: scale(1.02); }
        }
        @keyframes galleryCardEnter {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes galleryModalFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .scroll-reveal, .scroll-reveal.is-visible,
          .gallery-hero-content, .gallery-hero-image, .gallery-card, .gallery-card.is-visible {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
      <Header />
      <main className="overflow-hidden bg-[#faf8f3] text-[#24211d]">
        {/* Gallery Hero - full-width image with centered text, like the reference */}
        <section className="relative flex min-h-[460px] w-full items-center justify-center overflow-hidden px-5 py-20 text-center text-white sm:min-h-[500px] md:min-h-[510px] lg:min-h-[540px]">
          <img
            src={hotelExteriorImage}
            alt="Hotel Shantam Regency"
            className="gallery-hero-image absolute inset-0 h-full w-full object-cover object-center"
          />

          {/* Overlay keeps the heading readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

          <div className="gallery-hero-content relative z-10 mx-auto w-full max-w-6xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#e5c58c] sm:text-sm">
              Hotel Shantam Regency · Bhagalpur
            </p>

            <h1 className="mx-auto max-w-5xl font-serif text-4xl font-medium leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Explore Our Gallery
              <span className="mt-2 block text-[#e5c58c]">
                Moments Worth Remembering
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-white/85 sm:text-base md:text-lg">
              Discover elegant interiors, beautiful event spaces, comfortable rooms
              and memorable celebrations at Hotel Shantam Regency.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="#gallery"
                className="inline-flex items-center rounded-md bg-[#d5b477] px-7 py-3.5 text-sm font-semibold text-[#171613] transition duration-300 hover:bg-[#f0d7a4]"
              >
                Explore Gallery <span className="ml-2 text-lg">↘</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center rounded-md border border-white/70 px-7 py-3.5 text-sm font-semibold text-white transition duration-300 hover:border-[#e5c58c] hover:text-[#e5c58c]"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="scroll-reveal mx-auto grid max-w-7xl gap-8 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-end md:px-8 md:py-24">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.32em] text-[#a78245]">A glimpse inside</p>
            <h2 className="max-w-2xl font-serif text-4xl leading-tight sm:text-5xl md:text-6xl">
              Spaces for work, <span className="text-[#a78245]">stays & celebrations.</span>
            </h2>
          </div>
          <div className="md:justify-self-end md:pb-1">
            <p className="max-w-xl text-sm leading-7 text-[#777067] md:text-base md:leading-8">
              From professional meetings to birthday parties, dining and relaxing interiors, browse the gallery to find the setting that fits your occasion.
            </p>
            <div className="mt-5 flex items-center gap-5 text-xs uppercase tracking-[0.16em] text-[#6f675d]">
              <span><strong className="mr-2 font-serif text-2xl text-[#a78245]">20</strong> Photos</span>
              <span className="h-5 w-px bg-[#d7cfc1]" />
              <span>Hotel · Events · Dining</span>
            </div>
          </div>
        </section>

        {/* Tailwind CSS Grid Gallery */}
        <section id="gallery" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 pb-20 md:px-8 md:pb-28">
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#a78245]">Explore every corner</p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl">Our Photo Gallery</h2>
            </div>
            <p className="max-w-lg text-sm leading-7 text-[#777067]">
              Select a category to explore specific spaces. Tap any photograph to view it in detail.
            </p>
          </div>

          <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-xs font-semibold transition duration-300 ${
                  activeCategory === category
                    ? "border-[#1d1b17] bg-[#1d1b17] text-white"
                    : "border-[#d9d0c1] bg-white/70 text-[#625a50] hover:border-[#a78245] hover:text-[#8a6838]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 auto-rows-[260px] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[250px] lg:gap-5">
            {filteredImages.map((item, index) => (
              <button
                key={`${item.title}-${item.category}`}
                type="button"
                onClick={() => openImage(index)}
                className={`gallery-card group relative isolate block w-full overflow-hidden rounded-2xl bg-[#ded5c7] text-left shadow-sm ring-1 ring-black/5 transition duration-500 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a78245] ${
                  activeCategory === "All" ? item.size : ""
                }`}
                style={{ "--card-delay": `${(index % 8) * 55}ms` }}
                aria-label={`View ${item.title}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading={index < 4 ? "eager" : "lazy"}
                  className={`w-full object-cover transition duration-700 ease-out group-hover:scale-105 ${
                    activeCategory === "All" && item.size.includes("row-span-2")
                      ? "h-full min-h-[520px]"
                      : "h-full min-h-[260px]"
                  }`}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/0 transition duration-300 group-hover:from-black/90 group-hover:via-black/25" />
                <span className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <span className="mb-2 inline-flex rounded-full border border-[#e5c58c]/60 bg-black/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f0d6a5] backdrop-blur-sm">
                    {item.category}
                  </span>
                  <span className="block font-serif text-xl text-white sm:text-2xl">{item.title}</span>
                  <span className="mt-2 block max-w-sm text-xs leading-5 text-white/75 sm:text-sm">{item.description}</span>
                  <span className="mt-4 flex items-center justify-between border-t border-white/25 pt-3 text-[10px] uppercase tracking-[0.22em] text-white/70">
                    <span>View photograph</span>
                    <span className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                  </span>
                </span>
                <span className="absolute right-4 top-4 rounded-full border border-white/35 bg-black/25 px-3 py-1 text-[10px] tracking-widest text-white/90 backdrop-blur-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
          {filteredImages.length === 0 && (
            <p className="py-16 text-center text-sm text-[#777067]">No photos found in this category.</p>
          )}
        </section>

        {/* Full-width image banner with text over image */}
        <section className="scroll-reveal relative isolate overflow-hidden px-5 py-20 text-center text-white md:py-28">
          <img src={eventVenueImage} alt="" aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 -z-10 bg-[#171613]/75" />
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[#e5c58c]">Make it memorable</p>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl md:text-6xl">Your occasion deserves a beautiful setting.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/75 md:text-base">
              Talk to our team about a comfortable stay, a business gathering or a celebration at Hotel Shantam Regency.
            </p>
            <a href="#contact" className="mt-8 inline-flex rounded-full bg-[#d5b477] px-8 py-3.5 text-sm font-semibold text-[#171613] transition hover:bg-[#f0d7a4]">
              Get in Touch <span className="ml-2">↗</span>
            </a>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-reveal bg-[#191814] px-5 py-16 text-white md:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[#d5b477]">We would love to hear from you</p>
              <h2 className="font-serif text-3xl leading-tight md:text-5xl">Let's plan your next visit.</h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65 md:text-base">
                For room bookings, banquet enquiries or restaurant reservations, contact our team. We’ll be happy to help you plan your visit.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <a href="tel:+919334271294" className="inline-flex min-w-48 items-center justify-center rounded-full bg-[#d5b477] px-7 py-3.5 text-sm font-semibold text-[#191814] transition hover:bg-[#ebd4a7]">
                Call 09334271294
              </a>
              <a href="https://wa.me/919334271294" target="_blank" rel="noreferrer" className="inline-flex min-w-48 items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-medium transition hover:border-[#d5b477] hover:text-[#e5c58c]">
                WhatsApp Us ↗
              </a>
              <a href="https://maps.google.com/?q=Hotel+Shantam+Regency+Bhagalpur" target="_blank" rel="noreferrer" className="inline-flex min-w-48 items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-medium transition hover:border-[#d5b477] hover:text-[#e5c58c]">
                Get Directions ↗
              </a>
            </div>
          </div>
          <div className="mx-auto mt-12 h-px max-w-7xl bg-gradient-to-r from-transparent via-[#d5b477]/50 to-transparent" />
          <p className="mt-6 text-center text-[10px] tracking-[0.25em] text-white/40">HOTEL SHANTAM REGENCY · BHAGALPUR</p>
        </section>
      </main>
      <Footer />

      {/* Image lightbox with previous/next navigation */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 backdrop-blur-sm animate-[galleryModalFade_220ms_ease-out] sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.title}
          onClick={closeImage}
        >
          <button
            type="button"
            onClick={(event) => { event.stopPropagation(); closeImage(); }}
            className="absolute right-3 top-3 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/50 text-3xl text-white transition hover:bg-white hover:text-black sm:right-5 sm:top-5"
            aria-label="Close image"
          >
            ×
          </button>

          {filteredImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => { event.stopPropagation(); showPreviousImage(); }}
                className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50 text-3xl text-white transition hover:border-[#e5c58c] hover:bg-[#e5c58c] hover:text-black sm:left-5 sm:h-14 sm:w-14"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(event) => { event.stopPropagation(); showNextImage(); }}
                className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50 text-3xl text-white transition hover:border-[#e5c58c] hover:bg-[#e5c58c] hover:text-black sm:right-5 sm:h-14 sm:w-14"
                aria-label="Next image"
              >
                ›
              </button>
            </>
          )}

          <div className="w-full max-w-5xl px-8 sm:px-16" onClick={(event) => event.stopPropagation()}>
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="mx-auto max-h-[68vh] w-full rounded-xl object-contain sm:max-h-[76vh]"
            />
            <div className="mt-4 text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-[#e5c58c]">{selectedImage.category}</p>
              <h3 className="mt-2 font-serif text-2xl text-white sm:text-3xl">{selectedImage.title}</h3>
              <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-white/70">{selectedImage.description}</p>
              <p className="mt-3 text-xs tracking-widest text-white/50">
                {selectedImageIndex + 1} / {filteredImages.length} &nbsp; · &nbsp; Use ← → keys to navigate &nbsp; · &nbsp; Esc to close
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
