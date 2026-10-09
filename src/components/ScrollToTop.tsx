import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// ScrollToTop 组件
// Resets scroll on route change. When the new route carries a hash (e.g. /#intro),
// it lands on that section instead. Same-page #anchor clicks keep the browser's own scrolling.
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const lastPathname = useRef<string | null>(null);

  useEffect(() => {
    const routeChanged = lastPathname.current !== pathname;
    lastPathname.current = pathname;
    if (!routeChanged) return;

    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView({ behavior: "instant" });
        return;
      }
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
