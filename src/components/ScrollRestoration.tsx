"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SCROLL_KEY_PREFIX = "nextplay_scroll_";

export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    // Disable browser's auto scroll restoration - we'll handle it manually
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const key = SCROLL_KEY_PREFIX + pathname;
    
    // Restore scroll position when pathname changes
    const savedY = sessionStorage.getItem(key);
    if (savedY) {
      const y = parseInt(savedY, 10);
      if (y > 0) {
        // Multiple attempts to ensure content is loaded
        const restore = () => window.scrollTo({ top: y, behavior: "instant" });
        
        // Immediate attempt
        restore();
        
        // Delayed attempts for async content
        const timers = [
          setTimeout(restore, 50),
          setTimeout(restore, 150),
          setTimeout(restore, 300),
        ];
        
        return () => timers.forEach(clearTimeout);
      }
    }
  }, [pathname]);

  useEffect(() => {
    const key = SCROLL_KEY_PREFIX + pathname;
    
    // Save scroll position periodically and on events
    let ticking = false;
    
    const savePosition = () => {
      sessionStorage.setItem(key, String(window.scrollY));
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          savePosition();
          ticking = false;
        });
      }
    };

    // Listen to scroll events
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Save before page unload
    window.addEventListener("beforeunload", savePosition);
    
    // Save before visibility change (tab switch, app switch on mobile)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        savePosition();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      // Save position when unmounting (navigating away)
      savePosition();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", savePosition);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [pathname]);

  return null;
}
