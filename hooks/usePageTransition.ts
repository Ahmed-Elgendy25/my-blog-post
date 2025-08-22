import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

export interface PageTransitionOptions {
  preloaderDuration?: number;
  onPreloaderComplete?: () => void;
  onContentReveal?: () => void;
}

export const usePageTransition = (options: PageTransitionOptions = {}) => {
  const {
    preloaderDuration = 3000,
    onPreloaderComplete,
    onContentReveal,
  } = options;

  const [isLoading, setIsLoading] = useState(true);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle preloader animation
  const startPreloaderExit = useCallback(() => {
    if (!preloaderRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

    // Reveal content underneath while preloader exits
    if (contentRef.current) {
      tl.set(contentRef.current, { opacity: 1 }, 0);
    }

    // Avoid interaction/repaint delays during the overlap
    tl.set(preloaderRef.current, { pointerEvents: 'none' }, 0);

    // Fade preloader bg to transparent and slide out simultaneously
    tl.to(
      preloaderRef.current,
      { backgroundColor: 'rgba(231,232,226,0)', duration: 0.2 },
      0
    )
      .to(
        preloaderRef.current,
        { yPercent: 100, autoAlpha: 0, duration: 0.8 },
        0
      )
      .add(() => {
        gsap.set(preloaderRef.current, { display: 'none' });
        setIsLoading(false);
        onPreloaderComplete?.();
      });
  }, [onPreloaderComplete]);

  // Animate content reveal
  const revealContent = useCallback(() => {
    if (!contentRef.current) return;

    const tl = gsap.timeline({ defaults: { duration: 0.45, ease: 'power2.out' } });

    tl.to(contentRef.current, {
      clipPath: 'polygon(100% 80%, 100% 100%, 0 100%, 0 60%)',
    })
      .to(contentRef.current, {
        clipPath: 'polygon(100% 40%, 100% 100%, 0 100%, 0 20%)',
      })
      .to(contentRef.current, {
        clipPath: 'polygon(100% 0%, 100% 100%, 0 100%, 0 0%)',
        onComplete: onContentReveal,
      });
  }, [onContentReveal]);

  // Start transition after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      startPreloaderExit();
    }, preloaderDuration);

    return () => clearTimeout(timer);
  }, [preloaderDuration, startPreloaderExit]);

  // Reveal content when preloader is done
  useEffect(() => {
    if (!isLoading) {
      revealContent();
    }
  }, [isLoading, revealContent]);

  return {
    isLoading,
    preloaderRef,
    contentRef,
    startTransition: startPreloaderExit, // Manually trigger the transition if needed
  };
};

export default usePageTransition;
