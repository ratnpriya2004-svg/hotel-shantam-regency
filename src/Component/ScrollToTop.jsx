import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
const { pathname, hash } = useLocation();

useEffect(() => {
// Keep intentional anchor navigation working.
if (hash) {
const targetId = decodeURIComponent(hash.slice(1));


  requestAnimationFrame(() => {
    document.getElementById(targetId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });

  return;
}

// Reset scroll position whenever the page changes.
window.scrollTo({
  top: 0,
  left: 0,
  behavior: "instant",
});

}, [pathname, hash]);

return null;
}
