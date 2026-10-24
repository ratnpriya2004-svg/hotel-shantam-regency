import { useState } from "react";

import Header from "../Component/Header.jsx";
import Hero from "../Component/Hero.jsx";
import Rooms from "../Component/Rooms.jsx";
import Events from "../Component/Events.jsx";
import Facilities from "../Component/Facilities.jsx";
import Restaurant from "../Component/Restaurant.jsx";
import Gallery from "../Component/Gallery.jsx";
import About from "../Component/About.jsx";
import Contact from "../Component/Contact.jsx";
import Footer from "../Component/Footer.jsx";
import Scroll from "../Component/ScrollToTop.jsx";

import BookingEnquiry from "../admin/Components/BookingEnquiry.jsx";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);

  const openBooking = () => setBookingOpen(true);
  const closeBooking = () => setBookingOpen(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8F5ED] text-[#191919]">
      <Header onBookingClick={openBooking} />

      <main className="pt-[78px]">
        {/* Hero */}
        <Hero onBookingClick={openBooking} />

        {/* Rooms & Suites */}
        <Rooms onBookingClick={openBooking} />

        {/* Weddings & Events */}
        <Events onBookingClick={openBooking} />

        {/* Facilities */}
        <Facilities />

        {/* Restaurant & Dining */}
        <Restaurant onBookingClick={openBooking} />

        {/* About Hotel */}
        <About />

        {/* Gallery */}
        <Gallery />

        {/* Contact & Location */}
        <Contact onBookingClick={openBooking} />

        {/* Scroll to Top */}
        <Scroll />
      </main>

      <Footer />

      {/* Booking Enquiry Popup */}
      <BookingEnquiry
        isOpen={bookingOpen}
        onClose={closeBooking}
      />
    </div>
  );
}

