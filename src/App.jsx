import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./Website/Home.jsx";
import RoomsPage from "./Website/RoomsPage.jsx";
import WeddingsEventsPage from "./Website/WeddingsEventsPage.jsx";

import ScrollToTop from "./Component/ScrollToTop.jsx";

import AdminLogin from "./admin/AdminLogin.jsx";
import AdminRoute from "./admin/AdminRoute.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import EventVenuePage from "./Website/EventVenuePage.jsx";
import RestaurantPage from "./Website/RestaurantPage.jsx";
import GalleryPage from "./Website/GalleryPage.jsx";
import BlogPage from "./Website/BlogPage";
import WeddingPackagePage from "./Website/WeddingPackagePage";
import ContactPage from "./Website/Contact.jsx";
import BlogDetailPage from "./Website/BlogDetailPage.jsx";

export default function App() {
    return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
  <Route path="/" element={<Home />} />

  <Route path="/rooms" element={<RoomsPage />} />

  <Route
    path="/banquet-hall-in-bhagalpur"
    element={<WeddingsEventsPage />}
  />

  <Route
  path="/event-venue-in-bhagalpur"
  element={<EventVenuePage />}
/>

<Route path="/restaurant" element={<RestaurantPage />} />

<Route path="/gallery" element={<GalleryPage />} />

<Route path="/blog" element={<BlogPage />} />

<Route path="/wedding-package-bhagalpur" element={<WeddingPackagePage />} />

{/* Contact Page */} 
<Route path="/contact" element={<ContactPage />} />

<Route path="/blog/:id" element={<BlogDetailPage />} />

  <Route path="/admin" element={<AdminLogin />} />

  <Route element={<AdminRoute />}>
    <Route
      path="/admin/dashboard"
      element={<AdminDashboard />}
    />
    <Route
      path="/dashboard"
      element={<AdminDashboard />}
    />
  </Route>

  <Route
    path="/admin/*"
    element={<Navigate to="/admin" replace />}
  />

  <Route
    path="*"
    element={<Navigate to="/" replace />}
  />
</Routes>

    </BrowserRouter>
  );
}

