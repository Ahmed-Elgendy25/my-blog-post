"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import Preloader from "./Preloader";

function GlobalPreloader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);
  const [shouldExclude, setShouldExclude] = useState(false);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const isInitialLoad = useRef(true);
  const prevPathname = useRef(pathname);

  // Check if we should exclude preloader for this route
  const shouldExcludePreloader = useCallback(() => {
    // Check various ways to detect error/404 pages
    const isNotFoundPage =
      pathname === "/not-found" ||
      pathname.includes("not-found") ||
      pathname.includes("error");

    // Check if URL doesn't match any valid routes (indicates 404)
    const validRoutes = [
      "/",
      "/magazine",
      "/podcast",
      "/authors",
      "/create-article",
      "/dashboard",
      "/signin",
      "/signup",
    ];
    const isValidRoute = validRoutes.some(
      (route) =>
        pathname === route ||
        pathname.startsWith(route + "/") ||
        pathname.startsWith("/magazine/"), // For dynamic magazine routes
    );

    const isPotential404 =
      !isValidRoute &&
      !pathname.startsWith("/_next") &&
      !pathname.startsWith("/api") &&
      !pathname.startsWith("/__nextjs") &&
      pathname !== "/favicon.ico";

    // Check document title if available
    const hasTitleIndicator =
      typeof document !== "undefined" &&
      (document.title.includes("404") ||
        document.title.includes("Not Found") ||
        document.title.includes("Page Not Found") ||
        document.title.includes("Error"));

    const isExcluded =
      isNotFoundPage || isPotential404 || hasTitleIndicator || shouldExclude;

    return isExcluded;
  }, [pathname, shouldExclude]);

  // Use effect to detect 404 pages after component mount
  useEffect(() => {
    // Small delay to allow page to render and set title
    const timer = setTimeout(() => {
      if (typeof document !== "undefined") {
        const has404Title =
          document.title.includes("404") ||
          document.title.includes("Not Found") ||
          document.title.includes("Page Not Found");
        if (has404Title) {
          setShouldExclude(true);
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Prevent scrolling during preloader
  useEffect(() => {
    // Check if we should exclude preloader for this route
    const isExcluded = shouldExcludePreloader();

    if (isExcluded) {
      // Don't apply preloader styles for excluded routes
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        document.body.classList.remove("preloader-active");
      }
      return;
    }

    if (typeof document !== "undefined") {
      if (isLoading) {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        document.body.classList.add("preloader-active");
      } else {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        document.body.classList.remove("preloader-active");
      }
    }

    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        document.body.classList.remove("preloader-active");
      }
    };
  }, [isLoading, pathname, shouldExcludePreloader]);

  // Handle preloader exit animation
  const handlePreloaderExit = () => {
    if (!preloaderRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    // Avoid interaction/repaint delays during the overlap
    tl.set(preloaderRef.current, { pointerEvents: "none" }, 0);

    // Fade preloader bg to transparent and slide out simultaneously
    tl.to(
      preloaderRef.current,
      { backgroundColor: "rgba(231,232,226,0)", duration: 0.2 },
      0,
    )
      .to(
        preloaderRef.current,
        { yPercent: 100, autoAlpha: 0, duration: 0.8 },
        0,
      )
      .add(() => {
        gsap.set(preloaderRef.current, { display: "none" });
        setIsLoading(false);

        // Ensure page content is visible and animate it in
        const pageContent =
          typeof document !== "undefined"
            ? document.querySelector("main")
            : null;
        if (pageContent) {
          gsap.set(pageContent, { opacity: 0 });
          gsap.to(pageContent, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              setShowPreloader(false);
            },
          });
        } else {
          setTimeout(() => {
            setShowPreloader(false);
          }, 100);
        }
      });
  };

  // Start preloader on mount and path changes
  useEffect(() => {
    // Check if we should exclude preloader for this route
    if (shouldExcludePreloader()) {
      setIsLoading(false);
      setShowPreloader(false);
      // Ensure content is visible
      const pageContent =
        typeof document !== "undefined" ? document.querySelector("main") : null;
      if (pageContent) {
        gsap.set(pageContent, { opacity: 1 });
      }
      // Update refs and exit early
      if (isInitialLoad.current) {
        isInitialLoad.current = false;
      }
      prevPathname.current = pathname;
      return;
    }

    // On route changes, show preloader again
    if (!isInitialLoad.current && pathname !== prevPathname.current) {
      setIsLoading(true);
      setShowPreloader(true);
      // Hide content immediately on route change
      const pageContent =
        typeof document !== "undefined" ? document.querySelector("main") : null;
      if (pageContent) {
        gsap.set(pageContent, { opacity: 0 });
      }
    }

    // Set up timer to exit preloader
    const timer = setTimeout(() => {
      handlePreloaderExit();
    }, 3000);

    // Update refs
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
    }
    prevPathname.current = pathname;

    return () => clearTimeout(timer);
  }, [pathname, shouldExcludePreloader]);

  // Early return - don't render the component at all for excluded routes
  if (shouldExcludePreloader()) {
    return null;
  }

  if (!showPreloader) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999]">
      <Preloader preloaderRef={preloaderRef} />
    </div>
  );
}

export default GlobalPreloader;
