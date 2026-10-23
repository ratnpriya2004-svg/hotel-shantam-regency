import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./Component/Header.jsx";
import Hero from "./Component/Hero.jsx";
import Rooms from "./Component/Rooms.jsx";
import Events from "./Component/Events.jsx";
import Facilities from "./Component/Facilities.jsx";
import Restaurant from "./Component/Restaurant.jsx";
import Gallery from "./Component/Gallery.jsx";
import About from "./Component/About.jsx";
import Contact from "./Component/Contact.jsx";
import Footer from "./Component/Footer.jsx";
import Scroll from "./Component/ScrollToTop.jsx";

import BookingEnquiry from "./admin/Components/BookingEnquiry.jsx";

import AdminLogin from "./admin/AdminLogin.jsx";
import AdminRoute from "./admin/AdminRoute.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";

function HotelWebsite() {
  const [bookingOpen, setBookingOpen] = useState(false);

  const openBooking = () => setBookingOpen(true);
  const closeBooking = () => setBookingOpen(false);

  return (
    <div className="min-h-screen overflow-hidden bg-[#F8F5ED] text-[#1F2D28]">
      <Header onBookingClick={openBooking} />

      <main className="pt-[78px]">
        <Hero onBookingClick={openBooking} />

        <Rooms onBookingClick={openBooking} />

        <Events onBookingClick={openBooking} />

        <Facilities />

        <Restaurant onBookingClick={openBooking} />

        <About />

        <Gallery />

        <Contact onBookingClick={openBooking} />

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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Hotel Website */}
        <Route path="/" element={<HotelWebsite />} />

        {/* Admin Login */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Protected Admin Dashboard */}
        <Route element={<AdminRoute />}>
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />
        </Route>

        {/* Unknown Admin Routes */}
        <Route
          path="/admin/*"
          element={<Navigate to="/admin" replace />}
        />

        {/* Other Website Paths */}
        <Route path="*" element={<HotelWebsite />} />
      </Routes>
    </BrowserRouter>
  );
}

