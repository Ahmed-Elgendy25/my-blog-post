"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import Preloader from "./Preloader";
import { usePreloaderContext } from "./PreloaderContext";

function GlobalPreloader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const isInitialLoad = useRef(true);
  const prevPathname = useRef(pathname);
  const { setPreloaderFinished } = usePreloaderContext();

  // Prevent scrolling during preloader
  useEffect(() => {
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
  }, [isLoading, pathname]);

  // Handle preloader exit animation
  const handlePreloaderExit = useCallback(() => {
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
              setPreloaderFinished(true); // Notify that preloader is finished
            },
          });
        } else {
          setTimeout(() => {
            setShowPreloader(false);
            setPreloaderFinished(true); // Notify that preloader is finished
          }, 100);
        }
      });
  }, [setPreloaderFinished]);

  // Start preloader on mount and path changes
  useEffect(() => {
    // On route changes, show preloader again
    if (!isInitialLoad.current && pathname !== prevPathname.current) {
      setIsLoading(true);
      setShowPreloader(true);
      setPreloaderFinished(false); // Reset preloader finished state on navigation
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
  }, [pathname, handlePreloaderExit, setPreloaderFinished]);

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
