import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { BookingModalProvider } from "@/lib/BookingContext";
import { BookingHubModal } from "./BookingHubModal";
import { MobileStickyBookingBar } from "./MobileStickyBookingBar";
import { GlobalPreloader } from "./GlobalPreloader";

// Layout Component with Global Booking Provider, Modal, Preloader, and Mobile Sticky Bar
function Layout() {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Only play preloader on first session visit or direct reload
    const isLoaded = sessionStorage.getItem("spark_loaded");
    if (isLoaded) {
      setHasLoaded(true);
    }
  }, []);

  const handlePreloaderComplete = () => {
    sessionStorage.setItem("spark_loaded", "true");
    setHasLoaded(true);
  };

  return (
    <BookingModalProvider>
      {!hasLoaded && <GlobalPreloader onComplete={handlePreloaderComplete} />}
      <ScrollToTop />
      <main id="main-content" tabIndex={-1} className="min-h-screen focus:outline-none">
        <Outlet />
      </main>
      <BookingHubModal />
      <MobileStickyBookingBar />
    </BookingModalProvider>
  );
}

export default Layout;