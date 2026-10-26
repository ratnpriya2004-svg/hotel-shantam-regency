import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_NAME = "Hotel Shantam Regency";
const SITE_URL = "https://hotel-shantam-regency.vercel.app";

const seoData = {
  "/": {
    title: "Hotel Shantam Regency | Hotel in Bhagalpur",
    description:
      "Explore Hotel Shantam Regency in Bhagalpur for accommodation, dining and event enquiries."
  },

  "/rooms": {
    title: "Hotel Rooms in Bhagalpur | Hotel Shantam Regency",
    description:
      "Explore room options at Hotel Shantam Regency, Bhagalpur. View available accommodation details and make an enquiry."
  },

  "/restaurant": {
    title: "Restaurant in Bhagalpur | Hotel Shantam Regency",
    description:
      "Discover the restaurant at Hotel Shantam Regency, Bhagalpur, and explore dining information."
  },

  "/banquet-hall-in-bhagalpur": {
    title: "Banquet Hall in Bhagalpur | Hotel Shantam Regency",
    description:
      "Explore banquet and event venue information at Hotel Shantam Regency, Bhagalpur, for your event enquiries."
  },

  "/event-venue-in-bhagalpur": {
    title: "Event Venue in Bhagalpur | Hotel Shantam Regency",
    description:
      "Explore event venue information at Hotel Shantam Regency, Bhagalpur, and enquire about your event."
  },

  "/wedding-package-bhagalpur": {
    title: "Wedding Packages in Bhagalpur | Hotel Shantam Regency",
    description:
      "Explore wedding package information at Hotel Shantam Regency, Bhagalpur, and enquire about your celebration."
  },

  "/gallery": {
    title: "Hotel Gallery | Hotel Shantam Regency, Bhagalpur",
    description:
      "View photographs of Hotel Shantam Regency in Bhagalpur."
  },

  "/blog": {
    title: "Hotel Blog | Hotel Shantam Regency, Bhagalpur",
    description:
      "Read articles and updates from Hotel Shantam Regency, Bhagalpur."
  },

  "/contact": {
    title: "Contact Hotel Shantam Regency | Bhagalpur",
    description:
      "Contact Hotel Shantam Regency in Bhagalpur for room, dining and event enquiries."
  },

  "/admin": {
    title: "Admin Login | Hotel Shantam Regency",
    description: "Authorized hotel administration login.",
    noIndex: true
  },

  "/admin/dashboard": {
    title: "Admin Dashboard | Hotel Shantam Regency",
    description: "Hotel administration dashboard.",
    noIndex: true
  },

  "/dashboard": {
    title: "Admin Dashboard | Hotel Shantam Regency",
    description: "Hotel administration dashboard.",
    noIndex: true
  }
};

function getPageSEO(pathname) {
  if (pathname.startsWith("/blog/")) {
    return {
      title: "Hotel Blog Article | Hotel Shantam Regency",
      description:
        "Read articles and updates from Hotel Shantam Regency, Bhagalpur."
    };
  }

  return seoData[pathname] || {
    title: `${SITE_NAME} | Bhagalpur`,
    description:
      "Explore Hotel Shantam Regency in Bhagalpur and discover hotel information."
  };
}

export default function SEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = getPageSEO(pathname);

    document.title = page.title;

    function setMeta(attribute, key, content) {
      let element = document.head.querySelector(
        `meta[${attribute}="${key}"]`
      );

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    }

    setMeta("name", "description", page.description);
    setMeta(
      "name",
      "robots",
      page.noIndex ? "noindex, nofollow" : "index, follow"
    );

    let canonical = document.head.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = `${SITE_URL}${pathname}`;

  }, [pathname]);

  return null;
}

