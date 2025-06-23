'use client'
import Preloader from './_preloader/Preloader'
import { useEffect, useRef, useState } from 'react'
import HeroSection from './HeroSection';
import PostHero from './_posts/PostHero';
import AuthorSection from './_author/AuthorSection';
import gsap from "gsap";


function MainComponent() {
    const [loading, setLoading] = useState(true);
    const preloaderRef = useRef(null);
    const contentRef = useRef(null);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        // Animate preloader out
        gsap.to(preloaderRef.current, {
          opacity: 0,
          duration: 0.8,
          delay:2,
          onComplete: () => {
            setLoading(false); // hide Preloader from DOM
            // Animate content in
            gsap.fromTo(contentRef.current, { opacity: 0, y: 30,duration:2 }, { opacity: 1, y: 0, duration: 1 });
          }
        });
      }, 2000); // 2 seconds preload
  
      return () => clearTimeout(timer);
    }, []);
  

  return (
    <main className="relative">
      {loading && (
        <div ref={preloaderRef}>
          <Preloader />
        </div>
      )}

      {!loading && (
        <div ref={contentRef} >
          <HeroSection />
          <PostHero />
          <AuthorSection />
        </div>
      )}
    </main>
  )
}

export default MainComponent